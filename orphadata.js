const fs = require('fs');
const mysql = require('mysql2/promise');

async function importData() {
  // 1. Read JSON
  const raw = fs.readFileSync('./orphararedata.json', 'utf-8');
  const parsed = JSON.parse(raw);

  const disorders = parsed.data.results; // ← Correct path to the array

  // 2. Connect to MySQL
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12341234', // replace with your real password
    database: 'genesis_db'
  });

  console.log('Connected to MySQL');

  // 3. Insert into database
  for (const disorder of disorders) {
    const id = disorder.ORPHAcode;
    const name = disorder["Preferred term"];

    if (!id || !name) continue; // Skip bad entries

    await db.query(
      'INSERT INTO disorders (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)',
      [id, name]
    );
  }

  console.log(`Imported ${disorders.length} disorders.`);
  await db.end();
}

importData().catch(console.error);
