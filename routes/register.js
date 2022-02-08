var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const users = []

router.get('/', function(req, res) {
  console.info("I'm in the Register Router");
  res.render('register.jade');
});

router.post('/register', async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  }catch
  {
    res.redirect('/register')
  }
  console.log(users)
})

module.exports = router;