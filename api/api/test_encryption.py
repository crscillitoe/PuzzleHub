from api import app
from flask import jsonify
from flask import abort
from flask import request
from flask_cors import cross_origin
from api.auth import decrypt_token
from api.auth import encrypt_token

# ============================================================ #
# /encryptString
# Required POST parameters:
#   String: string
# Returns on success:
#   EncryptedString: string
# Returns on failure:
#   aborts on failure
@app.route('/encryptString', methods=['POST'])
@cross_origin(supports_credentials=True)
def encrypt_string():
    try:
        to_encrypt = request.form['String']
    except:
        abort(500, 'variable String not present')

    to_return = encrypt_token(to_encrypt).decode()

    return jsonify(EncryptedString=to_return)

# ============================================================ #
# /decryptString
# Required POST parameters:
#   String: string
# Returns on success:
#   DecryptedString: string
# Returns on failure:
#   aborts on failure
@app.route('/decryptString', methods=['POST'])
@cross_origin(supports_credentials=True)
def decrypt_string():
    try:
        to_decrypt = request.form['String']
    except:
        abort(500, 'variable String not present')

    to_return = decrypt_token(to_decrypt)

    return jsonify(DecryptedString=to_return)
