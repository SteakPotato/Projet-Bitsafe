var mailer = require("nodemailer");
var api = require("googleapis");
var dot = require("dotenv").config();
const express = require('express');
const router = express.Router();

//routes and request for sending an email through the form

const oAuth2Client = new api.google.auth.OAuth2(
    process.env.oauthId,
    process.env.oauthSecret,
    process.env.redirect_url
    )
    
oAuth2Client.setCredentials({
    refresh_token: process.env.oauthRefreshToken
})

let sendMail = (req) => {
    try {
        const accessToken = oAuth2Client.getAccessToken((err, token) => {
            console.log("new access_token: "+token)
        })
        var smtpTransport = mailer.createTransport({
            //host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: "Gmail",
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.oauthId,
                clientSecret: process.env.oauthSecret,
                refreshToken: process.env.oauthRefreshToken,
                accessToken: accessToken,
            }
        });
        var text =`
        Name : ${req.body.name} 
        Email : (${req.body.email}) 
        Says: ${req.body.message}`
    
        var contactMail = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: req.body.subject,
            text: text,
        }
        var text =`<p>Your message has been received ! Please wait for our reply</p>
        <p>Your Message : ${req.body.message}</p>`
    
        var confirmEmail = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Confirmation : " + req.body.subject,
            html: text
        }
    
        smtpTransport.sendMail(contactMail, function(error, response){
            if(error){
                console.log("Error : " +error);
            }else{
                console.log("Message sent");
            }
    
        });
        smtpTransport.sendMail(confirmEmail, function(error, response){
            if(error){
                console.log("Error : " +error);
            }else{
                console.log("Message sent");
            }
            smtpTransport.close();
        });
    } catch (error) {console.log(error)}
    // Use Smtp Protocol to send Email
}

router.post('/', (req, res) => {
    sendMail(req)
    res.redirect('/');
});
module.exports = router;