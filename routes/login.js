const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
/*Login page, user input the email and password. Find email first in database and compare with password
 the  in database. After correct, then user can login account and to go the dashboard.
 Cookie save the user name in the browers.*/ 
router.get('/', function(req,res){
  res.render("login.jade");
});
//to login
router.post('/',async function (req,res) {
      const  email=req.body.email.trim(); 
      const pwd=req.body.password.trim();
      console.log(email);
      console.log(pwd);
console.log('username:'+email+' password:'+pwd);

const people = await prisma.user.findFirst({where: {email: email}} );
console.log(people);
const cq = await bcrypt.compare(pwd, people.password);

  if(!cq){
    console.info("wrong");
    res.render("login.jade", {message:"Password is wrong, please retry."});
    return;
  }
  req.session.user = people;
  res.cookie("username", people.name );
  res.redirect('dashboard');
});
module.exports = router;