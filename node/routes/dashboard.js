const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const User = require('../model/user');
//var dot = require("dotenv").config();
const cryp = require('./crypto')
const {ensureAuthenticated} = require("../config/auth.js")


//all dashboards routes and action
router.get('/home',ensureAuthenticated, (req,res)=>{
    res.render('partials/home',{
        user:req.user
    });
})
router.get('/accounts',ensureAuthenticated, (req,res)=>{
    res.render('partials/accounts',{
        user:req.user
    });
})
router.get('/generates', ensureAuthenticated, (req,res)=>{
    res.render('partials/generates');
})

router.get('/',ensureAuthenticated,(req,res) => {
    res.render('dashboard',{
        user:req.user
    });
})

router.get('/editForm',ensureAuthenticated,(req,res) => {
    let iv = req.user.account[req.query.num].hash[0].iv;
    let encryptedHash = req.user.account[req.query.num].hash[0].encrypted;
    let decrypt = cryp.decrypt(req.user.hash,encryptedHash,iv);
    res.render('partials/editForm',{
        user:req.user,
        id:req.user.account[req.query.num]._id,
        number:req.query.num,
        hash:decrypt
    });
})

router.get('/addForm',ensureAuthenticated,(req,res) => {
    res.render('partials/addForm',{
        user:req.user
    });
})
//delete an account
router.delete('/accounts',ensureAuthenticated,(req,res)=>{
    let option = {new: true}
    let filter = {username:req.user.username}
    let query = {"$pull": { account:{"_id":req.user.account[req.body.id].id }}}

    User.findOneAndUpdate(filter,query,option,(er,test) => {
        if(er){
            console.log(er)
        }
        else{
            console.log(test)
        }
    }).then(value  => {res.status(204).send("deleted"); } )
})

//post the edits data
router.post('/editForm',ensureAuthenticated,(req,res)=>{
    let option = {new: true}
    let filter = {username:req.user.username, 'account._id':req.user.account[req.body.id].id}
    let encrypted;

    //if we change the password encrpyt it else return the original
    let color = req.user.account[req.body.id].color;
    let iv = req.user.account[req.body.id].hash[0].iv;
    let encryptedHash = req.user.account[req.body.id].hash[0].encrypted;
    let decrypt = cryp.decrypt(req.user.hash,encryptedHash,iv);

    if(req.body.hash == decrypt){
        encrypted = req.user.account[req.body.id].hash
    }
    else{
        encrypted = cryp.encrypt(req.body.hash,req.user.hash);
    }
    let imgurl = null;
    if(req.body.imgurl){
        imgurl = req.body.imgurl;
    }
    let query = { "$set":{
        'account.$.username':req.body.email,
        'account.$.hash':encrypted,
        'account.$.titre':req.body.titre,
        'account.$.url':req.body.url,
        'account.$.validurl':req.body.validurl,
        'account.$.color':color,
        'account.$.imgurl':imgurl,
        'account.$.updatedAt': new Date(),
    }}

    User.findOneAndUpdate(filter,query,option,(er,test) => {
        if(er){
            console.log(er)
        }
        else{
            console.log(test)
        }
    }).then(value  => {res.status(204).send(value); } )
    
})

//post new data
router.post('/addForm',ensureAuthenticated,(req,res)=>{
    let option = {new: true}
    let filter = {username:req.user.username}
    let colorArray = ['#2D3142','#FC9F5B','#889696','#A34100','#0F5FA6','#CBE896', '#F4EF88','#9B2915','#FFCABB','#A63A50',];
    let randomColor = Math.floor(Math.random() * colorArray.length);
    let newColor = colorArray[randomColor];
    console.log("account : " + req.body.titre);
    let encrypted = cryp.encrypt(req.body.hash,req.user.hash);

    let imgurl = null;
    if(req.body.imgurl){
        imgurl = req.body.imgurl;
    }
    let query = { "$addToSet":{ account:{
        username:req.body.email,
        hash:encrypted,
        titre:req.body.titre,
        url:req.body.url,
        validurl:req.body.validurl,
        color:newColor,
        imgurl:imgurl,
        updatedAt: new Date(),
    }}}

    User.findOneAndUpdate(filter,query,option,(er,test) => {
        if(er){
            console.log(er)
        }
        else{
            console.log(test)
        }
    }).then(value  => {res.status(204).send(value); } )
    

})

module.exports = router; 