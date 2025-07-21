const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/pasp.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pasp.html'));
});

router.get('/pbrac.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pbrac.html'));
});


module.exports = router;