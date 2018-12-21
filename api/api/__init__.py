from flask import Flask

# TODO - remove this line before going to production
from flask_cors import CORS

app = Flask(__name__)

# TODO - remove this line before going to production
CORS(app, support_credentials=True)

import api.timer
import api.test_queries
