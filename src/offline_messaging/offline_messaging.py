from Crypto.Cipher import AES
def store(msg, key, path):
    c=AES.new(key,AES.MODE_EAX); ct,tag=c.encrypt_and_digest(msg)
    open(path,'wb').write(c.nonce+tag+ct)
