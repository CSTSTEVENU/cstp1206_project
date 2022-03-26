const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Home' });
});
module.exports = router;
