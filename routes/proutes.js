const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/pasp.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pasp.html'));
});

router.get('/pphen.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pphen.html'));
});

router.get('/pbrac.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pbrac.html'));
});

router.get('/pgene.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pgene.html'));
});

module.exports = router;