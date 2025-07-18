const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// let db;

(async () => {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12341234',
    database: 'genesis_db'
  });
})();

router.get('/api/users/:letter', async (req, res) => {
  const letter = req.params.letter
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE name LIKE ?",
      [`${letter}%`]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
