from flask import request
from datetime import datetime

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /login
# Required POST parameters:
#   Username: string
#   Password: string
# Returns on success:
#   Accept: bool - True
#   Token: string - Encrypted token for future user validation
# Returns on failure:
#   Accept: bool - False
#   Token: string - Empty string
@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    return 'TODO'

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /getLeaderboards
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   List (length 10) <
#       Username: string
#       Time: TimeString
#   >
# Returns on failure:
#   No return, throw error on failure.
@app.route('/getLeaderboards', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_leaderboards():
    return 'TODO'

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /changePassword
# Required POST parameters:
#   OldPassword: string
#   NewPassword: string
# Returns on success:
#   1
# Returns on failure:
#   Incorrect Old Password: -1
#   Invalid New Password: -2
#   Throw an error on any other failure
@app.route('/changePassword', methods=['POST'])
@cross_origin(supports_credentials=True)
def change_password():
    return 'TODO'

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /getPersonalBest
# Required POST parameters:
#   GameID
#   Difficulty
# Returns on success:
#   PersonalBest: TimeString (return -1 if no time on record)
# Returns on failure:
#   No return, throw error on failure.
@app.route('/getPersonalBest', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_personal_best():
    return 'TODO'
