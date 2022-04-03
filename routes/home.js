const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Scrapbook Team8 showing you a different way to scrapbook digitally' });
});
module.exports = router;
