/*App File  */

// setup environment according to profile 
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const createError = require('http-errors');
const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash =require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

//Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
const editprofileRouter = require('./routes/editprofile');
const foldermanagerRouter = require('./routes/foldermanager');
const whiteboardRouter = require('./routes/whiteboard');
const logoutRouter = require('./routes/logout');
const contactRouter = require('./routes/contact');
const aboutRouter = require('./routes/about');
const communityRouter = require('./routes/community');

const app = express();

//Bcrypt
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
const users = []

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

// Authenticate
app.get('/', checkAuthenticated, (req, res) => {
  
  res.render('index.jade',{name: req.cookies.username})
})

function isAuthenticated(req){
  let userName = req.cookies.username
  return userName !== undefined
}

function checkAuthenticated(req, res, next){
  if(isAuthenticated(req)){
    return next()
  }
  else{
    res.redirect('/login')
  }
}

// app.use
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/editprofile', editprofileRouter);
app.use('/foldermanager', foldermanagerRouter);
app.use('/whiteboard', whiteboardRouter);
app.use('/logout', logoutRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/community', communityRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("/", function(req,res){
res.render("index.jade");
});

module.exports = app;