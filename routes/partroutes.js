const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/Head', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/head.html'));
});

router.get('/Chest', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/chest.html'));
});



module.exports = router;