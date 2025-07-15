const express = require('express');
const path = require('path');
const router = express.Router();

// Route for A page
router.get('/A', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/a.html'));
});

router.get('/B', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/b.html'));
});

router.get('/C', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/c.html'));
});

router.get('/D', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/d.html'));
});

router.get('/E', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/e.html'));
});

router.get('/F', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/f.html'));
});

router.get('/G', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/g.html'));
});

router.get('/H', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/h.html'));
});

router.get('/I', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/i.html'));
});

router.get('/J', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/j.html'));
});

router.get('/K', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/k.html'));
});

router.get('/L', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/l.html'));
});

router.get('/M', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/m.html'));
});

router.get('/N', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/n.html'));
});

router.get('/O', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/o.html'));
});

router.get('/P', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/p.html'));
});

router.get('/Q', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/q.html'));
});

router.get('/R', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/r.html'));
});

router.get('/S', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/s.html'));
});

router.get('/T', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/t.html'));
});

router.get('/U', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/u.html'));
});

router.get('/V', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/v.html'));
});

router.get('/W', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/w.html'));
});

router.get('/X', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/x.html'));
});

router.get('/Y', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/y.html'));
});

router.get('/Z', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/z.html'));
});

// You can add more (B, C, etc.) here
// router.get('/B', ...)

module.exports = router;
