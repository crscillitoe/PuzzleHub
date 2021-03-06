import json
import base64
import hashlib
from Crypto.Cipher import AES
from Crypto import Random
from api.config import get_config_path

with open(get_config_path()) as f:
    json_data = json.load(f)

BLOCK_SIZE = 16

pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
unpad = lambda s: s[:-ord(s[len(s) - 1:])]

password = json_data['encryption_password']

def get_user_id(encrypted_token):
    token = decrypt_token(encrypted_token)
    try:
        token_data = json.loads(token)
        return token_data['user_id']
    except:
        return -1

def decrypt_token(token):
    private_key = hashlib.sha256(password.encode("utf-8")).digest()
    token = base64.b64decode(token)
    iv = token[:16]
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return bytes.decode(unpad(cipher.decrypt(token[16:])))
    
def encrypt_token(token):
    private_key = hashlib.sha256(password.encode("utf-8")).digest()
    token = pad(token)
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return base64.b64encode(iv + cipher.encrypt(token))
