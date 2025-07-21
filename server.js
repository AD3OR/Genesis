const express = require('express');
// const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const alpharoutes = require('./routes/alpharoutes');
const partroutes = require('./routes/partroutes');
const proutes = require('./routes/proutes');
const dbroutes = require('./routes/dbroutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', alpharoutes);
app.use('/', partroutes);
app.use('/', proutes)
// app.use('/', dbroutes);

// MySQL connection


// let db;
// async function connectDB() {
//   try {
//     db = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root', // change if needed
//       password: '12341234', // set in installer
//       database: 'genesis_db'
//     });
//     console.log('Connected to MySQL successfully!');
//   } catch (error) {
//     console.error('MySQL connection error:', error);
//   }
// }
// connectDB();


// app.get('/users', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

