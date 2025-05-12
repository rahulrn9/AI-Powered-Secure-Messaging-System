// src/encryption/encryption.js
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Exported function
export function encryptMessage(message, key) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Auto-run example when invoked directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const key = Buffer.alloc(32, 0);  // 256-bit zero key
  const ct  = encryptMessage('Hello, Secure World!', key);
  console.log('Ciphertext:', ct);
}
