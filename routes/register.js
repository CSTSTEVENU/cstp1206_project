var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()

router.get('/', function(req, res) {
  console.info("I'm in the Register Router");
  res.render('register.jade');
});

router.post('/', async (req, res) => {
  try{
    if (req.body.pwd !== req.body.cmpwd){
      res.render("register.jade", {message:"The passwords are not match."});
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR:[
          {name: req.body.username},
          {password: req.body.pwd}
        ]
      }
    });

    if (user){
      res.render("register.jade", {message:"User name or email is already registered, please try use different user name/email."});
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.pwd, 10)
    var newUser = await prisma.user.create({data:{
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }});
    res.redirect('/login');
  }catch(error)
  {
    console.error(error);
    res.redirect('/register');
  }
  console.log(newUser)
})

module.exports = router;