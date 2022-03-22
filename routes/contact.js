var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  console.log('CONTACT GET');
  res.render('contact');
});

module.exports = router;