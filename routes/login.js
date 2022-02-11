 const  express = require('express');
 const router = express.Router();

// const  bodyParser = require('body-parser')
// const  app=express();
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
      const  email=req.body.email.trim();
      const pwd=req.body.password.trim();
console.log('username:'+email+'password:'+pwd);

// const selectSQL = "select * from user where username = '"+name+"'";
const people = await prisma.user.findFirst({where: {email: email}} );
// const people = getUser(name);
console.log(people);
  if(people.password === pwd){
    res.render('index.jade')
    //res.redirect("/users")
   //res.render('users.jade')// after , we can get the data in index page shows 
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
//     const  name=req.body.username.trim();
//     const  password=req.body.password.trim();
//     const  user={name:name,password:password};
//     connection.query('insert into user set ?',user,function (err,rs) {
//         if (err) throw  err;
//         console.log('ok');
//        res.render('ok',{title:'Welcome User',message:name});
//     })
// })

// const  server=app.listen(3000,function () {
//     console.log("login server start......");
// })

module.exports = router;