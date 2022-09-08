const User = require('../model/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email',passReqToCallback: true},(req,input,password,done)=>{
            //match username or email
            User.findOne({ $or:[{username:input},{email:input}]}).then((user)=>{
                if(!user){
                    return done(null,false,{message:'Username or Email incorrect'});
                }
                //match passwords
                bcrypt.compare(password,user.hash,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'Password incorrect'});
                    }
                })
            }).catch((err)=>{console.log(err)})
        })
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    })
}