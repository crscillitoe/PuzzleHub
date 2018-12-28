from flask import request
from datetime import datetime

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /getPersonalBest
# Required POST parameters:
#   GameID
#   Difficulty
# Returns on success:
#   PersonalBest: TimeString (return -1 if no time on record)
# Returns on failure:
#   No return, throw error on failure.
@app.route('/api/getPersonalBest', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_personal_best():
    return 'TODO'
