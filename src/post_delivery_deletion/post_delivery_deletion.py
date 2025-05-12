def delete_key(key_id, store):
    if key_id in store: del store[key_id]; print(f"Deleted {key_id}")
