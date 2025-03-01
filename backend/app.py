
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import jwt
import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Secret key for JWT
SECRET_KEY = "your-secret-key"  # Should be a real secret in production

# Create database connection
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Initialize database
def init_db():
    conn = get_db_connection()
    conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create games table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        created_by INTEGER NOT NULL,
        data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users (id)
    )
    ''')
    
    # Create user_games junction table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS user_games (
        user_id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        role TEXT NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, game_id),
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (game_id) REFERENCES games (id)
    )
    ''')
    
    conn.commit()
    conn.close()

# Initialize the database on startup
init_db()

# Authentication middleware
def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header[7:]
        
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            conn = get_db_connection()
            current_user = conn.execute('SELECT * FROM users WHERE id = ?', (data['user_id'],)).fetchone()
            conn.close()
            
            if not current_user:
                return jsonify({'error': 'User not found!'}), 401
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

# Authentication routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    # Check if user already exists
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    
    if user:
        conn.close()
        return jsonify({'error': 'User already exists'}), 409
    
    # Create new user
    password_hash = generate_password_hash(password)
    
    try:
        conn.execute('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                  (name, email, password_hash))
        conn.commit()
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, SECRET_KEY, algorithm='HS256')
        
        conn.close()
        
        return jsonify({
            'token': token,
            'user': {
                'name': name,
                'email': email
            },
            'message': 'User registered successfully'
        }), 201
        
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400
    
    email = data.get('email')
    password = data.get('password')
    
    # Check if user exists
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    
    if not user or not check_password_hash(user['password_hash'], password):
        conn.close()
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Generate JWT token
    token = jwt.encode({
        'user_id': user['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, SECRET_KEY, algorithm='HS256')
    
    conn.close()
    
    return jsonify({
        'token': token,
        'user': {
            'name': user['name'],
            'email': user['email']
        },
        'message': 'Login successful'
    }), 200

@app.route('/api/user', methods=['GET'])
def get_user():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Token is missing'}), 401
    
    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]
            
        data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = data['user_id']
        
        conn = get_db_connection()
        user = conn.execute('SELECT id, name, email, created_at FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'created_at': user['created_at']
            }
        }), 200
        
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

# Game routes
@app.route('/api/games', methods=['GET'])
@token_required
def get_games(current_user):
    conn = get_db_connection()
    
    # Get all games the user is a part of
    games_data = conn.execute('''
        SELECT g.id, g.name, g.status, g.created_at, g.updated_at, u.name as creator_name, ug.role
        FROM games g
        JOIN user_games ug ON g.id = ug.game_id
        JOIN users u ON g.created_by = u.id
        WHERE ug.user_id = ?
    ''', (current_user['id'],)).fetchall()
    
    conn.close()
    
    games = []
    for game in games_data:
        games.append({
            'id': game['id'],
            'name': game['name'],
            'status': game['status'],
            'creator_name': game['creator_name'],
            'role': game['role'],
            'created_at': game['created_at'],
            'updated_at': game['updated_at']
        })
    
    return jsonify({'games': games}), 200

@app.route('/api/games', methods=['POST'])
@token_required
def create_game(current_user):
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Game name is required'}), 400
    
    game_name = data.get('name')
    player_count = data.get('player_count', 2)
    
    # Initialize game data with default state
    game_data = {
        'board': 'quantum_realm',
        'player_count': player_count,
        'current_turn': 0,
        'players': [
            {
                'id': current_user['id'],
                'name': current_user['name'],
                'role': 'quantum_operator',
                'position': 'start',
                'collected_particles': []
            }
        ],
        'quantum_particles': [
            {'id': 1, 'type': 'photon', 'position': 'sector_a'},
            {'id': 2, 'type': 'electron', 'position': 'sector_b'},
            {'id': 3, 'type': 'qubit', 'position': 'sector_c'},
            {'id': 4, 'type': 'entangled_pair', 'position': 'sector_d'}
        ],
        'events': []
    }
    
    conn = get_db_connection()
    
    try:
        # Create new game
        cursor = conn.execute('''
            INSERT INTO games (name, status, created_by, data)
            VALUES (?, ?, ?, ?)
        ''', (game_name, 'waiting', current_user['id'], json.dumps(game_data)))
        
        game_id = cursor.lastrowid
        
        # Add creator to the game
        conn.execute('''
            INSERT INTO user_games (user_id, game_id, role)
            VALUES (?, ?, ?)
        ''', (current_user['id'], game_id, 'quantum_operator'))
        
        conn.commit()
        
        conn.close()
        
        return jsonify({
            'game': {
                'id': game_id,
                'name': game_name,
                'status': 'waiting',
                'data': game_data
            },
            'message': 'Game created successfully'
        }), 201
        
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/games/<int:game_id>', methods=['GET'])
@token_required
def get_game(current_user, game_id):
    conn = get_db_connection()
    
    # Check if user is part of the game
    user_game = conn.execute('''
        SELECT * FROM user_games
        WHERE user_id = ? AND game_id = ?
    ''', (current_user['id'], game_id)).fetchone()
    
    if not user_game:
        conn.close()
        return jsonify({'error': 'Game not found or you do not have access'}), 404
    
    # Get game details
    game = conn.execute('''
        SELECT g.*, u.name as creator_name
        FROM games g
        JOIN users u ON g.created_by = u.id
        WHERE g.id = ?
    ''', (game_id,)).fetchone()
    
    if not game:
        conn.close()
        return jsonify({'error': 'Game not found'}), 404
    
    # Get all players in the game
    players = conn.execute('''
        SELECT u.id, u.name, ug.role
        FROM user_games ug
        JOIN users u ON ug.user_id = u.id
        WHERE ug.game_id = ?
    ''', (game_id,)).fetchall()
    
    conn.close()
    
    game_data = json.loads(game['data'])
    
    return jsonify({
        'game': {
            'id': game['id'],
            'name': game['name'],
            'status': game['status'],
            'creator_name': game['creator_name'],
            'created_at': game['created_at'],
            'updated_at': game['updated_at'],
            'data': game_data,
            'players': [
                {
                    'id': player['id'],
                    'name': player['name'],
                    'role': player['role']
                } for player in players
            ]
        }
    }), 200

@app.route('/api/games/<int:game_id>/join', methods=['POST'])
@token_required
def join_game(current_user, game_id):
    conn = get_db_connection()
    
    # Check if game exists
    game = conn.execute('SELECT * FROM games WHERE id = ?', (game_id,)).fetchone()
    
    if not game:
        conn.close()
        return jsonify({'error': 'Game not found'}), 404
    
    # Check if user is already in the game
    user_game = conn.execute('''
        SELECT * FROM user_games
        WHERE user_id = ? AND game_id = ?
    ''', (current_user['id'], game_id)).fetchone()
    
    if user_game:
        conn.close()
        return jsonify({'error': 'You are already in this game'}), 409
    
    # Check if game is full
    player_count = conn.execute('''
        SELECT COUNT(*) as count
        FROM user_games
        WHERE game_id = ?
    ''', (game_id,)).fetchone()['count']
    
    game_data = json.loads(game['data'])
    max_players = game_data.get('player_count', 4)
    
    if player_count >= max_players:
        conn.close()
        return jsonify({'error': 'Game is full'}), 409
    
    # Determine role
    roles = ['quantum_operator', 'navigation_engineer', 'particle_collector', 'quantum_physicist']
    assigned_roles = conn.execute('''
        SELECT role
        FROM user_games
        WHERE game_id = ?
    ''', (game_id,)).fetchall()
    
    assigned_role_list = [role['role'] for role in assigned_roles]
    available_roles = [role for role in roles if role not in assigned_role_list]
    
    if not available_roles:
        assigned_role = 'observer'  # Default if all roles are taken
    else:
        assigned_role = available_roles[0]
    
    try:
        # Add user to game
        conn.execute('''
            INSERT INTO user_games (user_id, game_id, role)
            VALUES (?, ?, ?)
        ''', (current_user['id'], game_id, assigned_role))
        
        # Update game data
        game_data['players'].append({
            'id': current_user['id'],
            'name': current_user['name'],
            'role': assigned_role,
            'position': 'start',
            'collected_particles': []
        })
        
        # If game now has enough players, update status
        if player_count + 1 >= 2:  # Minimum 2 players to start
            game_data['status'] = 'ready'
            conn.execute('''
                UPDATE games
                SET status = 'ready', data = ?
                WHERE id = ?
            ''', (json.dumps(game_data), game_id))
        else:
            conn.execute('''
                UPDATE games
                SET data = ?
                WHERE id = ?
            ''', (json.dumps(game_data), game_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Successfully joined game',
            'role': assigned_role,
            'game_data': game_data
        }), 200
        
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/games/<int:game_id>/start', methods=['POST'])
@token_required
def start_game(current_user, game_id):
    conn = get_db_connection()
    
    # Check if game exists and user is the creator
    game = conn.execute('''
        SELECT *
        FROM games
        WHERE id = ? AND created_by = ?
    ''', (game_id, current_user['id'])).fetchone()
    
    if not game:
        conn.close()
        return jsonify({'error': 'Game not found or you are not the creator'}), 404
    
    if game['status'] != 'ready' and game['status'] != 'waiting':
        conn.close()
        return jsonify({'error': 'Game cannot be started in its current state'}), 409
    
    # Update game status to 'in_progress'
    game_data = json.loads(game['data'])
    game_data['status'] = 'in_progress'
    game_data['started_at'] = datetime.datetime.utcnow().isoformat()
    game_data['events'].append({
        'type': 'game_start',
        'timestamp': datetime.datetime.utcnow().isoformat(),
        'description': 'Game started by ' + current_user['name']
    })
    
    conn.execute('''
        UPDATE games
        SET status = 'in_progress', data = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ''', (json.dumps(game_data), game_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': 'Game started successfully',
        'game_data': game_data
    }), 200

@app.route('/api/games/<int:game_id>/move', methods=['POST'])
@token_required
def make_move(current_user, game_id):
    data = request.get_json()
    
    if not data or 'action' not in data:
        return jsonify({'error': 'Action is required'}), 400
    
    action = data.get('action')
    target = data.get('target')
    
    conn = get_db_connection()
    
    # Check if game exists and user is part of it
    user_game = conn.execute('''
        SELECT ug.role, g.data, g.status
        FROM user_games ug
        JOIN games g ON ug.game_id = g.id
        WHERE ug.user_id = ? AND ug.game_id = ?
    ''', (current_user['id'], game_id)).fetchone()
    
    if not user_game:
        conn.close()
        return jsonify({'error': 'Game not found or you are not part of it'}), 404
    
    if user_game['status'] != 'in_progress':
        conn.close()
        return jsonify({'error': 'Game is not in progress'}), 409
    
    game_data = json.loads(user_game['data'])
    
    # Find the current player
    current_player = None
    player_index = -1
    for i, player in enumerate(game_data['players']):
        if player['id'] == current_user['id']:
            current_player = player
            player_index = i
            break
    
    if not current_player:
        conn.close()
        return jsonify({'error': 'Player not found in game data'}), 500
    
    # Process the action based on player's role
    if action == 'move':
        if not target:
            conn.close()
            return jsonify({'error': 'Target location is required for move action'}), 400
        
        # Update player position
        game_data['players'][player_index]['position'] = target
        
        # Check if player landed on a quantum particle
        for particle_index, particle in enumerate(game_data['quantum_particles']):
            if particle['position'] == target:
                # Collect the particle
                game_data['players'][player_index]['collected_particles'].append(particle)
                game_data['quantum_particles'].pop(particle_index)
                
                # Add event
                game_data['events'].append({
                    'type': 'particle_collected',
                    'timestamp': datetime.datetime.utcnow().isoformat(),
                    'player_id': current_user['id'],
                    'player_name': current_user['name'],
                    'particle_type': particle['type'],
                    'position': target
                })
                break
        
    elif action == 'use_quantum_gate':
        if not target:
            conn.close()
            return jsonify({'error': 'Target player is required for quantum gate action'}), 400
        
        # Apply quantum gate effect
        game_data['events'].append({
            'type': 'quantum_gate_used',
            'timestamp': datetime.datetime.utcnow().isoformat(),
            'player_id': current_user['id'],
            'player_name': current_user['name'],
            'target_player': target
        })
        
    elif action == 'end_turn':
        # Move to next player's turn
        game_data['current_turn'] = (game_data['current_turn'] + 1) % len(game_data['players'])
        
        # Add event
        game_data['events'].append({
            'type': 'turn_ended',
            'timestamp': datetime.datetime.utcnow().isoformat(),
            'player_id': current_user['id'],
            'player_name': current_user['name'],
            'next_player': game_data['players'][game_data['current_turn']]['name']
        })
    
    # Check win condition
    all_particles_collected = len(game_data['quantum_particles']) == 0
    any_player_at_start = any(player['position'] == 'start' and len(player['collected_particles']) > 0 for player in game_data['players'])
    
    if all_particles_collected and any_player_at_start:
        game_data['status'] = 'completed'
        game_data['winner'] = current_user['id']
        game_data['completed_at'] = datetime.datetime.utcnow().isoformat()
        
        # Add event
        game_data['events'].append({
            'type': 'game_completed',
            'timestamp': datetime.datetime.utcnow().isoformat(),
            'winner_id': current_user['id'],
            'winner_name': current_user['name']
        })
        
        conn.execute('''
            UPDATE games
            SET status = 'completed', data = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (json.dumps(game_data), game_id))
    else:
        conn.execute('''
            UPDATE games
            SET data = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (json.dumps(game_data), game_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': 'Move processed successfully',
        'game_data': game_data
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
