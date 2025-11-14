# Backend (Fixed)

What I changed and how to run the backend:

## Fixes applied
1. `server.js` was updated to:
   - Load `.env` relative to the backend folder (`dotenv.config({ path: path.join(__dirname, '.env') })`).
   - Better MongoDB connection logging and helpful hints when connection fails.
   - Added endpoints for diagnostics: `GET /` and `GET /statements` to list saved statements.
   - Ensures `uploads/` directory is created automatically.
   - Improved OCR fallback handling and safer parsing of account numbers & transactions.

2. `package.json` main was set to `server.js` and `start` script ensured.

## How to run locally
1. Open a terminal and go to the backend folder:
   ```bash
   cd bank-project/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure `.env` exists with `MONGO_URI` (it is present in the project). If you use MongoDB Atlas, ensure your IP is allowed in the cluster network access list.
4. Start the server:
   ```bash
   npm run dev   # if you have nodemon installed (script uses nodemon)
   # or
   npm start
   ```
5. Endpoints:
   - `POST /upload` — upload PDF/image using form field `file`
   - `GET /statements` — list recent saved statements
   - `GET /statements/:id` — fetch a saved statement by id

## Troubleshooting MongoDB connection
- If you see connection errors, check:
  - Is `MONGO_URI` correct in `backend/.env`?
  - If using Atlas, add your IP (or 0.0.0.0/0 for testing) to the project's Network Access list.
  - If using a local MongoDB, ensure `mongod` is running and `MONGO_URI` points to `mongodb://127.0.0.1:27017/bankDB`.