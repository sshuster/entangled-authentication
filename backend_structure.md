
# Entanglion Python/SQLite Backend Structure

This file outlines the backend structure that needs to be implemented separately from this frontend. The backend would be built with Python and SQLite.

## Backend Structure

```
backend/
├── app.py                 # Main application file
├── database.py            # Database connection and models
├── routes/
│   ├── __init__.py
│   ├── auth.py            # Authentication routes
│   ├── profile.py         # User profile routes
│   └── game.py            # Game state routes
├── models/
│   ├── __init__.py
│   ├── user.py            # User model
│   └── game.py            # Game model
├── services/
│   ├── __init__.py
│   ├── auth_service.py    # Authentication business logic
│   └── game_service.py    # Game business logic
└── utils/
    ├── __init__.py
    └── helpers.py         # Helper functions
```

## Tech Stack

- **Framework**: Flask or FastAPI
- **Database**: SQLite (can be upgraded to PostgreSQL later)
- **Authentication**: JWT tokens
- **API**: RESTful API

## Main Routes

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login existing user
- `POST /api/logout` - Logout user
- `GET /api/user` - Get current user info

### Game

- `GET /api/games` - Get user's games
- `POST /api/games` - Create a new game
- `GET /api/games/:id` - Get specific game
- `PUT /api/games/:id` - Update game state
- `DELETE /api/games/:id` - Delete a game

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/achievements` - Get user achievements

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Games Table

```sql
CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    status TEXT NOT NULL,
    data TEXT NOT NULL, -- JSON data for game state
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User_Games Table (Junction Table)

```sql
CREATE TABLE user_games (
    user_id INTEGER,
    game_id INTEGER,
    role TEXT,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (game_id) REFERENCES games (id)
);
```

### Achievements Table

```sql
CREATE TABLE achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);
```

### User_Achievements Table (Junction Table)

```sql
CREATE TABLE user_achievements (
    user_id INTEGER,
    achievement_id INTEGER,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, achievement_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (achievement_id) REFERENCES achievements (id)
);
```

## Implementation Notes

1. Use password hashing for security (bcrypt recommended)
2. Implement JWT token authentication
3. Use SQLite for development, can migrate to PostgreSQL for production
4. For game state, store as JSON in the database
5. Implement proper error handling and validation
6. Add rate limiting for API endpoints
