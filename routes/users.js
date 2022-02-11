var express = require('express');
var router = express.Router();

/* GET users listing. */


const data = [{
  "id": 1,
  "first_name": "Gunilla",
  "last_name": "Brogan",
  "email": "gbrogan0@purevolume.com",
  "city": "Skaryszew",
  "color": "Indigo"
}, {
  "id": 2,
  "first_name": "Sheeree",
  "last_name": "Avramovsky",
  "email": "savramovsky1@latimes.com",
  "city": "Siaton",
  "color": "Crimson"
}, {
  "id": 3,
  "first_name": "Katey",
  "last_name": "Crier",
  "email": "kcrier2@amazon.de",
  "city": "Dongpu",
  "color": "Pink"
}, {
  "id": 4,
  "first_name": "Savina",
  "last_name": "Bridgstock",
  "email": "sbridgstock3@amazon.de",
  "city": "Íasmos",
  "color": "Crimson"
}, {
  "id": 5,
  "first_name": "Gerard",
  "last_name": "Bagot",
  "email": "gbagot4@parallels.com",
  "city": "Daxing",
  "color": "Green"
}, {
  "id": 6,
  "first_name": "Kinnie",
  "last_name": "Jeacocke",
  "email": "kjeacocke5@qq.com",
  "city": "Остров Пасхи",
  "color": "Red"
}, {
  "id": 7,
  "first_name": "Yoko",
  "last_name": "Harston",
  "email": "yharston6@hexun.com",
  "city": "Chabařovice",
  "color": "Yellow"
}, {
  "id": 8,
  "first_name": "Oona",
  "last_name": "Grigolon",
  "email": "ogrigolon7@mapquest.com",
  "city": "Partesh",
  "color": "Indigo"
}, {
  "id": 9,
  "first_name": "Sutherlan",
  "last_name": "Ohlsen",
  "email": "sohlsen8@pagesperso-orange.fr",
  "city": "San Francisco",
  "color": "Puce"
}, {
  "id": 10,
  "first_name": "Anne",
  "last_name": "Dodshun",
  "email": "adodshun9@youtube.com",
  "city": "Guiwu",
  "color": "Maroon"
}]

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
