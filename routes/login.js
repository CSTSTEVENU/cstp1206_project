 var  express = require('express');
 var router = express.Router();

// var  bodyParser = require('body-parser')
// var  app=express();
const { PrismaClient } = require( '@prisma/client');
const { render } = require('../app');
const prisma = new PrismaClient()
// app.set('view engine', 'jade'); 
// app.set('views', __dirname);
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

// function getUser(email){
//   const people = await prisma.user.findFirst({where: {email: email}} );
//   return people;
// }

//to login
router.post('/',async function (req,res) {
      var  name=req.body.email.trim();
      var pwd=req.body.password.trim();
console.log('username:'+name+'password:'+pwd);

// var selectSQL = "select * from user where username = '"+name+"'";
const people = await prisma.user.findFirst({where: {email: name}} );
//// const people = getUser(name);
console.info(people);
  if(people.password === pwd){
   res.render('index.jade')
  }
  else{
    console.info("wrong");
  }
})

// connection.query(selectSQL,function (err,rs) {
//     if (err) throw  err;
//                 if (rs.length==0){
//         res.render('error',{title:'WARNING',message:'Sorry, username: '+name+ ' not exit.'});
//         return;
//                         }
//     console.log(rs);
//     console.log('ok');
//     res.render('ok',{title:'Welcome User',message:name});
// })
// })

// //create account page
// app.get('/register',function (req,res) {
//     res.render('register',{title:'create account'});
//   })


// // create an account 
// app.post('/register',function (req,res) {
//     var  name=req.body.username.trim();
//     var  password=req.body.password.trim();
//     var  user={name:name,password:password};
//     connection.query('insert into user set ?',user,function (err,rs) {
//         if (err) throw  err;
//         console.log('ok');
//        res.render('ok',{title:'Welcome User',message:name});
//     })
// })

// var  server=app.listen(3000,function () {
//     console.log("login server start......");
// })

module.exports = router;