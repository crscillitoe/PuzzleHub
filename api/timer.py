import math
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
def convert_to_puzzle_hub_date(date):
    return date.total_seconds()
#
#    hours = int(total_seconds / 3600)
#    total_seconds -= (hours * 3600)
#
#    minutes = int(total_seconds / 60)
#    total_seconds -= (minutes * 60)
#
#    millis = int(1000 * (total_seconds - int(total_seconds)))
#
#    if hours > 0:
#        return '{}:{:02d}:{:02d}.{:03d}'.format(hours, minutes, int(total_seconds), millis)
#    else:
#        return '{:02d}:{:02d}.{:03d}'.format(minutes, int(total_seconds), millis)

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
#   Seed: int
#   GameID: int
#   Difficulty: int
#   BoardSolution: string
# Returns on success:
#   TimeElapsed: TimeString (HH:MM:SS.mmm)
#   NewRecord: Bool - Indicates if the current time is better than the previous
#   XPGain: Number - amount of xp gained
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

    try:
        user_seed = request.json["Seed"]
    except:
        abort(500, 'Seed not found')

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

    if user_seed != seed:
        abort(500, 'seed error')

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

    cursor = db.cursor()
    sql_query = '''
        INSERT INTO matchHistory
        (UserID, GameID, Difficulty, Seed, TimeElapsed, Date)
        VALUES
        (%(user_id)s, %(game_id)s, %(difficulty)s, %(seed)s, %(time_elapsed)s, NOW(3))
    '''
    query_model = {
        "user_id":user_id,
        "game_id":game_id,
        "difficulty":difficulty,
        "seed":seed,
        "time_elapsed":time_elapsed,
    }
    cursor.execute(sql_query, query_model)
    db.commit()
    cursor.close()

    seconds_elapsed = math.ceil(time_elapsed.total_seconds())
    xp_gain = calculate_xp_gain(difficulty, seconds_elapsed)

    cursor = db.cursor()
    sql_query = '''
        UPDATE accountData
        SET XP = XP + %(xp_gain)s
        WHERE UserID = %(user_id)s
    '''
    query_model = {
        "user_id":user_id,
        "xp_gain":xp_gain
    }
    cursor.execute(sql_query, query_model)
    db.commit()
    cursor.close()

    time_str = convert_to_puzzle_hub_date(time_elapsed)

    return jsonify({"TimeElapsed":time_str, "Daily":better_daily, "Weekly":better_weekly, "Monthly":better_monthly, "XPGain":xp_gain})


def calculate_xp_gain(diff, time_elapsed_seconds):
    if time_elapsed_seconds > 120:
        time_multiplier = 120
    elif time_elapsed_seconds == 0:
        time_multiplier = 1
    else:
        time_multiplier = time_elapsed_seconds

    if time_elapsed_seconds > 600:
        time_elapsed_seconds_real = 600
    else:
        time_elapsed_seconds_real = time_elapsed_seconds

    if diff == 1:
        diff_multiplier = 0.81
    elif diff == 2:
        diff_multiplier = 2.32
    elif diff == 3:
        diff_multiplier = 3.3
    elif diff == 4:
        diff_multiplier = 5.6

    time_multiplier = math.log(time_multiplier, 1.05)
    xp_gain = 50 + math.ceil(1.2 * time_multiplier) * 1
    if time_elapsed_seconds > 120:
        xp_gain = xp_gain + math.ceil((time_elapsed_seconds_real - 120)/2)

    xp_gain = math.ceil(xp_gain * diff_multiplier)

    return xp_gain

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
