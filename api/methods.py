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

    cursor = db.cursor()

    # sanity checks
    sql_query = '''
        SELECT * FROM games WHERE GameID=%(GameID)
    '''   
    cursor.execute(sql_query, request.form)
    db.commit()

    data = cursor.fetchall()
    
    if len(data) == 0:
        return '0'
    
    sql_query = '''
        SELECT * FROM difficulty WHERE Difficulty=%(Difficulty)
    '''

    cursor.execute(sql_query, request.form)
    db.commit()

    data = cursor.fetchall()

    if len(data) == 0:
        return '0'

    

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
