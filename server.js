const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const alpharoutes = require('./routes/alpharoutes');
const partroutes = require('./routes/partroutes');
const proutes = require('./routes/proutes');
const uroutes = require('./routes/uroutes');


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

// Raw JSON Imported from ORPHAGENES
app.get('/genes', (req, res) => {
  // Use the correct filename for the gene data
  const filePath = path.join(__dirname, 'orphagenes.json');

  // Read the JSON file
  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    // Check for errors during file reading
    if (err) {
      console.error('Error reading JSON:', err);
      return res.status(500).json({ error: 'Failed to read gene data' });
    }

    try {
      const parsed = JSON.parse(jsonData);
      const genes = parsed.data?.results || [];
      const formatted = genes.map(g => ({
        id: g.HGNC,
        name: g.name,
        symbol: g.symbol
      })).filter(g => g.id && g.name && g.symbol);

      res.json(formatted);
    } catch (parseErr) {

      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});
// end

// Raw JSON Imported from ORPHAPHENOTYPES
app.get('/phenotypes', (req, res) => {
  const filePath = path.join(__dirname, 'orphaphenotype.json');

  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error('Error reading JSON:', err);
      return res.status(500).json({ error: 'Failed to read disorder data' });
    }

    try {
      const parsed = JSON.parse(jsonData);
      const phenotypes = parsed.data?.results || [];

      // Only send id and name
      const formatted = phenotypes.map(d => ({
        id: d.HPOId,
        name: d["HPOTerm"]
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
app.get('/autismdata', (req, res) => {
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


// Reading RESEARCHERS
app.get('/researchers', (req, res) => {
  const filePath = path.join(__dirname, 'researchers.json');

  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error('Error reading JSON:', err);
      return res.status(500).json({ error: 'Failed to read researcher data' });
    }

    try {
      const parsed = JSON.parse(jsonData);

      const formatted = parsed.map(d => ({
        id: d.id,
        name: d.name
      })).filter(d => d.id && d.name);

      res.json(formatted);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// end

// dataset download function
app.get('/download/autismdata.txt', (req, res) => {
  const filePath = path.join(__dirname, 'autismdata.txt');
  // Use res.download to send the file to the user
  res.download(filePath, 'autismdata.txt', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Could not download the file.');
    }
  });
});


app.use('/', alpharoutes);
app.use('/', partroutes);
app.use('/', proutes);
app.use('/', uroutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/asperger', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'asperger.html'));
});

app.get('/autism', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'autism.html'));
});

app.get('/angelman', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'angelman.html'));
});

app.get('/baber', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'baber.html'));
});

app.get('/brachydactyly', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'brachydactyly.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});



app.get('/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  // Here, you would implement logic to serve a page based on the search term.
  // For this example, we'll just send a generic message.
  res.sendFile(path.join(__dirname, 'views', `${searchTerm}.html`));
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
