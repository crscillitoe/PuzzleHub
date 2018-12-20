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
# TODO - /startTimer
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   Returns puzzle for given game id and difficulty
# Returns on failure:
#   0
@app.route('/startTimer', methods=['POST'])
@cross_origin(supports_credentials=True)
def start_timer():
    return 'TODO'

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /stopTimer
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   TimeElapsed: int - Time elapsed (milliseconds)
# Returns on failure:
#   Error
@app.route('/stopTimer', methods=['POST'])
@cross_origin(supports_credentials=True)
def stop_timer():
    return 'TODO'

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# TODO - /getLeaderboards
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   List <
#       Username: string
#       Score: <TBD>
#   >
# Returns on failure:
#   Error
@app.route('/getLeaderboards', methods=['POST'])
@cross_origin(supports_credentials=True)
def stop_timer():
    return 'TODO'
