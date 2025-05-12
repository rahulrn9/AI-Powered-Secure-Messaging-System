def block_if_malicious(ip, feed):
    if ip in feed: print(f"Blocked {ip}")
