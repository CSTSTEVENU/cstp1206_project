var express = require('express');
var router = express.Router();
const { users: data} = require('../data');
const{ formatUser} = require('../helpers/users');
/* GET users listing. */
router.get('/', 
  function(req, res, next) {
    res.render('users',
        { 
          title: 'Users page',    
          data: data.map(
            (user) => formatUser(user)
          )
        }
      );
  }
);

module.exports = router;
