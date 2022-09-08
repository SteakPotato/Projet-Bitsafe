const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

//action for registering a user
//bycrypt to hash the pswd to db

//login 
router.get('/login',(req,res)=>{
    res.render('login')
})
//register 
router.get('/register',(req,res)=>{
    res.render('register')
    })


router.post('/register',(req,res)=>{
    const {username,fullname,email, password,password2} = req.body ;
    let errors = [];
    //(/^
   // (?=.*\d)                //should contain at least one digit
   // (?=.*[a-z])             //should contain at least one lower case
    //(?=.*[A-Z])             //should contain at least one upper case
    //[a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,200}$/;
    var reEmail = /^\S+@\S+$/;
    console.log(re.test(password))

    //password validation
    if(!username || !fullname || !email || !password || !password2 ){
        errors.push({msg : "Please fill in all fields"})
    }
    if(password != password2 ){
      errors.push({msg : "Passwords dont match"})
    }
    if(re.test(password) == false) {
      errors.push({msg : 'Password Require at least 8 characters (1 digit, 1 lower case, 1 upper case) '});
    }
    if(reEmail.test(email) == false){
      errors.push({msg : 'Email not valid'});
    }
    User.findOne({ $or:[{username:username},{email:email}]}).exec((err,user)=>{ 
    if(user) {
          errors.push({msg: 'Email or Username already registered'});
      }

    if(errors.length > 0){
      res.render('register', {
        errors : errors,
        name : fullname,
        username : username,
        email : email,
        password : password,
        password2 : password2})
    }
    else {
      bcrypt.genSalt(10,(err,salt)=> {
      bcrypt.hash(password,salt,(err,hash)=> {
        //hash pass and save
          let userOptions = {fullname : fullname,username : username,email : email, hash : hash }
          const newUser = new User (userOptions)
          newUser.save().then((value)=>{
              console.log(value)
              //setter for flash
              req.flash('success_msg','You have now registered!')
              res.redirect('/users/login');
              })
              .catch(value=> console.log(value));
          });
        })
      }
  })
})

router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect: '/users/login',
    failureFlash : true
  })(req,res,next)
  })

//logout
router.get('/logout',(req,res)=>{
req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/users/login');
 })

module.exports  = router;