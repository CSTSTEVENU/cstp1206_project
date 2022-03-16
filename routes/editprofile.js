
var express = require('express');
var router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editprofile', { user: req.session.user });
});
router.post('/',async function(req,res,next){
    try{
        
        data = {};
        if (req.body.pwd){
            const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
            data["password"] = hashedPassword;
        }

        if (req.body.username !== req.session.user.name){
            data["name"] = req.body.username;
            
        }
        if (data){
            console.info(data);
            await prisma.user.update({data:data, where:{id:req.session.user.id}});
            req.session.user.name = req.body.username;
        }
        res.redirect('/dashboard');
      }catch(error)
      {
        console.error(error);
        res.redirect('/login');
      }
    
});
module.exports = router;