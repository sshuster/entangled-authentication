
# Entanglion Backend

This is the Python/SQLite backend for the Entanglion web application.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the server:
   ```
   python app.py
   ```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login existing user
- `GET /api/user` - Get current user info (requires token)

## Database

The application uses SQLite for data storage. The database file `database.db` will be created automatically when the application runs for the first time.
