// src/ai/contextSuggestions.js
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const API_URL  = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const HF_TOKEN = process.env.HF_API_TOKEN;

if (!HF_TOKEN) {
  console.error("❌  Please set HF_API_TOKEN (with inference scope).");
  process.exit(1);
}

export async function getSuggestions(msg) {
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch(API_URL, {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        inputs: msg,
        parameters: { candidate_labels: ["Sensitive","Normal"] }
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
    const json = await res.json();
    console.log("Zero-shot result:", json);
    return json;

  } catch (err) {
    if (err.name === "AbortError") {
      console.warn("⏱  Request timed out; returning stub");
    } else {
      console.warn("⚠️  HF API failed; returning stub:", err.message);
    }
    return [
      { label: "Normal",    score: 0.7 },
      { label: "Sensitive", score: 0.3 },
    ];
  } finally {
    clearTimeout(timeout);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  (async () => {
    await getSuggestions("Transfer $10,000 to account 12345.");
  })();
}
