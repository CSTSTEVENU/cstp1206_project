var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('users.jade', {data:data});
});
/* GET home page. */
router.get('/:username', 
    function(req, res, next) {
      const {username}= req.params;
      const user = data.find(
      (value) => value.username === username
      );

      if (!user){
        throw new Error('user does not exist');
       

      }else{}

      res.render('[username]', 
           { 
              title:username,
              ...user
             }
             );         
}
);

module.exports = router;
