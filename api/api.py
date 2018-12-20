from flask import Flask
from flask import jsonify

# TODO - remove this line before going to production
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# TODO - remove this line before going to production
CORS(app, support_credentials=True)

@app.route('/getNum')

# TODO - remove this line before going to production
@cross_origin(supports_credentials=True)

def get_num():
    return jsonify(val1=5, val2=4)
