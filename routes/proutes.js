const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/pasp', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pasp.html'));
});

router.get('/pphen', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pphen.html'));
});

router.get('/pbrac', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pbrac.html'));
});

router.get('/pgene', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pgene.html'));
});

module.exports = router;