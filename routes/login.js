const  express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const { render } = require('../app');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
router.get('/', function(req,res){
  res.render("login.jade");
});
//to login
router.post('/',async function (req,res) {
      // const str = undefined;
      // str.trim();
      // const email = undefined; 
      // const str = email || '';
      const  email=req.body.email.trim(); //表示去掉空格
      const pwd=req.body.password.trim();
      // const  email=req.body.email;
      // const pwd=req.body.password;
      console.log(email);
      console.log(pwd);
console.log('username:'+email+' password:'+pwd);

// const selectSQL = "select * from user where username = '"+name+"'";
const people = await prisma.user.findFirst({where: {email: email}} );
// const people = getUser(name);
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