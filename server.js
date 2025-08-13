const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;
const alpharoutes = require('./routes/alpharoutes');
const partroutes = require('./routes/partroutes');
const proutes = require('./routes/proutes');
const uroutes = require('./routes/uroutes');
const dbroutes = require('./routes/dbroutes');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Raw JSON imported from ORPHADATA

app.get('/disorders', (req, res) => {
  const filePath = path.join(__dirname, 'orphararedata.json');

  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error('Error reading JSON:', err);
      return res.status(500).json({ error: 'Failed to read disorder data' });
    }

    try {
      const parsed = JSON.parse(jsonData);
      const disorders = parsed.data?.results || [];

      // Only send id and name
      const formatted = disorders.map(d => ({
        id: d.ORPHAcode,
        name: d["Preferred term"]
      })).filter(d => d.id && d.name);

      res.json(formatted);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// End

// reading arff (converted to txt)
app.get('/autism', (req, res) => {
  const filePath = path.join(__dirname, 'autismdata.txt');

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      console.error('Error reading TXT file:', err);
      return res.status(500).json({ error: 'Failed to read TXT file' });
    }

    try {
      const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

      // The first line is the header
      const attributes = lines[0].split(',').map(attr => attr.trim());

      // The rest of the lines are the data
      const data = lines.slice(1).map(line => {
        // This is a simple split and may fail on complex CSVs
        return line.split(',').map(cell => cell.trim().replace(/^'|'$/g, ''));
      });

      res.json({ attributes, data });
    } catch (parseErr) {
      console.error('Error parsing CSV:', parseErr);
      res.status(500).json({ error: 'Invalid CSV format' });
    }
  });
});
// end


app.use('/', alpharoutes);
app.use('/', partroutes);
app.use('/', proutes);
app.use('/', uroutes);
app.use('/', dbroutes);

// MySQL connection


let db;
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // change if needed
      password: '12341234', // set in installer
      database: 'genesis_db'
    });
    console.log('Connected to MySQL successfully!');
  } catch (error) {
    console.error('MySQL connection error:', error);
  }
}
connectDB();


app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/aut.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'aut.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

