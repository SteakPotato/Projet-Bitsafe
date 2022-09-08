const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
var dot = require("dotenv").config();

//passport config:
require('./config/passport')(passport)

// set up express app
const app = express();

// connect to mongodb
const mongoUrl = "mongodb+srv://" +process.env.bd + "@cluster0.chluy.mongodb.net/"+process.env.bd_name+"?retryWrites=true&w=majority"
mongoose.connect((mongoUrl),{useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false});
var db = mongoose.connection;
db.on("error", (error) => {console.log(error)});
db.on("open", (error) => {console.log("Connected to MongoDB database.")});


//EJS
app.set('view engine','ejs',{layout: false});
//app.use(expressEjsLayout);

// let the app parse json bodies and www-form-urlencoded
app.use(express.urlencoded({extended : true}));
app.use(express.json());


//express session
app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized : true
 }));
 
 app.use(passport.initialize());
 app.use(passport.session());

 //use flash et set up flash by passing the key
 app.use(flash());
 app.use((req,res,next)=> {
   //getter for the msg
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error  = req.flash('error');
 next();
 })
  
 //public for client
 app.use(express.static(__dirname + '/public'));

// initialize routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/sendemail',require('./routes/sendemail'));
app.use('/dashboard',require('./routes/dashboard'));




// error handling 
 app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});
 // listen for requests
 app.listen(4000, function(){
  var current = new Date();
  console.log('Server on : ' + current.toLocaleTimeString());
});


