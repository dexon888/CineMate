const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',       // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'cinemate',
  password: 'Wambink@01',   // Replace with your PostgreSQL password
  port: 5432,
});

// Endpoint to get user profile
app.get('/profile/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const result = await pool.query('SELECT * FROM profiles WHERE uid = $1', [uid]);
    console.log('Fetched profile:', result.rows[0]);  // Log fetched profile
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update user profile
app.post('/profile/:uid', async (req, res) => {
  const { uid } = req.params;
  const { genres, actors, directors } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO profiles (uid, genres, actors, directors) VALUES ($1, $2, $3, $4) ON CONFLICT (uid) DO UPDATE SET genres = $2, actors = $3, directors = $4 RETURNING *',
      [uid, genres, actors, directors]
    );
    console.log('Updated profile:', result.rows[0]);  // Log updated profile
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
