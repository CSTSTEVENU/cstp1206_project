const express = require('express');
const router = express.Router();
/* GET users listing. */

router.get('/', function(req, res) {
  res.render('users.jade');
});
/* GET home page. */
router.get('/:username', 
    function(req, res) {
      const {username}= req.params;
      const user = data.find(
      (value) => value.username === username
      );

      if (!user){
        throw new Error('user does not exist');
       

      }

      res.render('[username]', 
           { 
              title:username,
              ...user
             }
             );         
}
);

module.exports = router;
