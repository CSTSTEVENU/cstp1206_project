var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Express' });
// });

<<<<<<< HEAD
// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'Express' });
// });

=======
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/contactus', function(req, res, next) {
  res.render('contactus.jade');
});
>>>>>>> f86f9c9241ed9d03e1aaf353ee4b8fd1b716314d

module.exports = router;
