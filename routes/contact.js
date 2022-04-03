const express = require('express');
const router = express.Router();
router.get('/', function(req, res) {
  console.log('CONTACT GET');
  res.render('contact', { title: 'Contact' });
});

module.exports = router;