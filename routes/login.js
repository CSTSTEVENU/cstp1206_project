var  express = require('express');
var router = express.Router();

var  bodyParser = require('body-parser')
var  app=express();
var mysql=require('mysql');
app.set('view engine', 'jade'); 
app.set('views', __dirname);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//mysql
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "12345",
//     database : 'movierecommend',
//     port:'3306',
// });
// connection.connect();

// //login_page
// app.get('/login',function (req,res) {
//     res.render('login');
// })

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    insecureAuth : true
});
conn.connect((err) =>{
    if(err){ 
        throw err;
    }
    console.log("connected!");
});

//to login
app.post('/login',function (req,res) {
      var  name=req.body.username.trim();
      var pwd=req.body.pwd.trim();
console.log('username:'+name+'password:'+pwd);

var selectSQL = "select * from user where username = '"+name+"' and password = '"+pwd+"'";
connection.query(selectSQL,function (err,rs) {
    if (err) throw  err;
                if (rs.length==0){
        res.render('error',{title:'WARNING',message:'Sorry, username: '+name+ ' not exit.'});
        return;
                        }
    console.log(rs);
    console.log('ok');
    res.render('ok',{title:'Welcome User',message:name});
})
})

//create account page
app.get('/register',function (req,res) {
    res.render('register',{title:'create account'});
  })


// create an account 
app.post('/register',function (req,res) {
    var  name=req.body.username.trim();
    var  pwd=req.body.pwd.trim();
    var  user={username:name,password:pwd};
    connection.query('insert into user set ?',user,function (err,rs) {
        if (err) throw  err;
        console.log('ok');
       res.render('ok',{title:'Welcome User',message:name});
    })
})

// var  server=app.listen(3000,function () {
//     console.log("login server start......");
// })

module.exports = router;