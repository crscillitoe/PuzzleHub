import hashlib
import requests

def is_password_valid(password):
    hash_pass = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()    
    url = "https://api.pwnedpasswords.com/range/" + hash_pass[0:5]
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        if hash_pass[5:] in response.text:
            return False
    return True

print(is_password_valid("123456789"))
print(is_password_valid("watashino_fa3f3ap"))
