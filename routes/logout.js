const express = require('express');
const router = express.Router();
/*Once the user logout the browers cookie will clear the user name and then go back to the Login page.*/ 
router.get('/', function(req, res) {
    res.clearCookie('username');
    res.redirect('/login')
  });
  
  module.exports = router;