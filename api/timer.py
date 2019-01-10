from api import app
from flask import jsonify
from flask import abort
from flask import request
from flask_cors import cross_origin
from random import randint
from api.database import get_db
from api.auth import decrypt_token
from api.auth import get_user_id

xstr = lambda s: s or ""

# ============================================================ #
# /startTimer
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   Returns puzzle seed for given game id and difficulty
# Returns on failure:
#   -1

@app.route('/api/startTimer', methods=['POST'])
@cross_origin(supports_credentials=True)
def start_timer():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return '-1'
    except:
        return '-1'

    try:
        game_id = request.json["GameID"]
    except:
        abort(500, 'GameID not found')

    try:
        difficulty = request.json["Difficulty"]
    except:
        abort(500, 'Difficulty not found')

    db = get_db()

    if (timer_sanity_checks(db, request.json) != 0):
        return '-1'

    new_timer = {
        "user_id":user_id,
        "game_id":game_id,
        "difficulty":difficulty,
        "seed":randint(0, 2000000000)
    }

    cursor = db.cursor()
    sql_query = '''
        SELECT * FROM timers WHERE 
            UserID=%(user_id)s AND 
            GameID=%(game_id)s AND 
            Difficulty=%(difficulty)s;
    '''
    cursor.execute(sql_query, new_timer);
    data = cursor.fetchall()
    cursor.close()
    
    # entry does not already exist in timers db, so create it
    if len(data) == 0:

        cursor = db.cursor()
        sql_query = '''
            INSERT INTO timers (UserID, GameID, Difficulty, Seed, TimeStarted)
            VALUES (%(user_id)s, %(game_id)s, %(difficulty)s, %(seed)s, NOW(3));
        '''
        cursor.execute(sql_query, new_timer)
        db.commit()
        cursor.close()

    else:

        cursor = db.cursor()
        sql_query = '''
            UPDATE timers SET Seed=%(seed)s, TimeStarted=NOW(3) WHERE 
                UserID=%(user_id)s AND
                GameID=%(game_id)s AND
                Difficulty=%(difficulty)s;        
        '''
        cursor.execute(sql_query, new_timer)
        db.commit()
        cursor.close()

    return jsonify({"seed":new_timer['seed']})

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /stopTimer
# Required POST parameters:
#   GameID: int
#   Difficulty: int
#   BoardSolution: string
# Returns on success:
#   TimeElapsed: TimeString (HH:MM:SS.mmm)
#   NewRecord: Bool - Indicates if the current time is better than the previous
# Returns on failure:
#   -1
@app.route('/api/stopTimer', methods=['POST'])
@cross_origin(supports_credentials=True)
def stop_timer():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return -1
    except:
        return '-1'

    try:
        game_id = request.json["GameID"]
    except:
        abort(500, 'GameID not found')

    try:
        difficulty = request.json["Difficulty"]
    except:
        abort(500, 'Difficulty not found')

    try:
        board_solution = request.json["BoardSolution"]
    except:
        abort(500, 'BoardSolution not found')

    db = get_db()

    if (timer_sanity_checks(db, request.json) != 0):
        return '-1'

    cursor = db.cursor()
    sql_query = '''
        SELECT Seed, TIMEDIFF(NOW(3), TimeStarted) AS TimeElapsed FROM timers
        WHERE
            UserID = %(user_id)s AND
            GameID = %(game_id)s AND
            Difficulty = %(difficulty)s;
    '''
    query_model = {
        "user_id":user_id,
        "game_id":game_id,
        "difficulty":difficulty
    }
    cursor.execute(sql_query, query_model)

    data = cursor.fetchall()
    if len(data) == 0:
        return -1
    cursor.close()

    seed = (data[0])[0]
    time_elapsed = (data[0])[1]
    better_daily = False
    better_weekly = False
    better_monthly = False

    # Check if a leaderboard entry exists
    for leaderboard in ['dailyLeaderboards', 'weeklyLeaderboards', 'monthlyLeaderboards']:
        cursor = db.cursor()
        sql_query = '''
            SELECT TimeElapsed
            FROM ''' + leaderboard + '''
            WHERE
                UserID=%(user_id)s AND 
                GameID=%(game_id)s AND 
                Difficulty=%(difficulty)s;
        '''
        cursor.execute(sql_query, query_model)
        data = cursor.fetchall()
        cursor.close()

        new_record = False

        if len(data) == 0:
            # Insert new leaderboard entry for this user
            new_record = True
            sql_query = '''
                INSERT INTO ''' + leaderboard + ''' (UserID, GameID, Difficulty, Seed, TimeElapsed, BoardSolution)
                VALUES (%(user_id)s, %(game_id)s, %(difficulty)s, %(seed)s, %(time_elapsed)s, %(board_solution)s);
            '''
        else:
            previous_time_elapsed = (data[0])[0]
            print(previous_time_elapsed)
            if time_elapsed < previous_time_elapsed:
                new_record = True
                sql_query = '''
                    UPDATE ''' + leaderboard + '''
                    SET Seed = %(seed)s,
                        TimeElapsed = %(time_elapsed)s,
                        BoardSolution = %(board_solution)s
                    WHERE
                        UserID=%(user_id)s AND 
                        GameID=%(game_id)s AND 
                        Difficulty=%(difficulty)s;
                '''

        if new_record:
            cursor = db.cursor()
            
            if leaderboard == 'dailyLeaderboards':
                better_daily = True
            elif leaderboard == 'weeklyLeaderboards':
                better_weekly = True
            elif leaderboard == 'monthlyLeaderboards':
                better_monthly = True

            query_model = {
                "user_id":user_id,
                "game_id":game_id,
                "difficulty":difficulty,
                "seed":seed,
                "time_elapsed":time_elapsed,
                "board_solution":board_solution
            }
            cursor.execute(sql_query, query_model)
            db.commit()
            cursor.close()

    return jsonify({"TimeElapsed":str(time_elapsed)[:-3], "Daily":better_daily, "Weekly":better_weekly, "Monthly":better_monthly})

# ------------------------------------------------------------ #
def timer_sanity_checks(db, form_values):

    # GameID sanity check
    cursor = db.cursor()
    sql_query = '''
        SELECT * FROM games WHERE GameID=%(GameID)s;
    '''
    cursor.execute(sql_query, form_values)
    data = cursor.fetchall()
    if len(data) == 0:
        return 1
    cursor.close()

    # Difficulty sanity check
    cursor = db.cursor()
    sql_query = '''
        SELECT * FROM difficulties WHERE Difficulty=%(Difficulty)s;
    '''
    cursor.execute(sql_query, form_values)
    data = cursor.fetchall()
    if len(data) == 0:
        return 1
    cursor.close()

    return 0

# ------------------------------------------------------------ #
