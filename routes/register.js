const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()
/* Allow the user to create an account by Email, once the account be created successfully, the user own 
Your Degsin folder is also created.*/
router.get('/', function(req, res) {
  console.info("I'm in the Register Router");
  res.render('register.jade');
});

router.post('/', async (req, res) => {
  try{

    const user = await prisma.user.findFirst({
      where: {
        OR:[
          {name: req.body.username},
          {email: req.body.email}
        ]
      }
    });

    if (user){
      res.render("register.jade", {message:"User name or email is already registered, please try use different user name/email."});
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.pwd, 10)
    const newUser = await prisma.user.create({data:{
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }});
    
    await prisma.folder.create({data:{
      folderName: "Your Design",
      user_id: newUser.id,
      isDefault: true
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