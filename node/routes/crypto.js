const crypto = require('crypto');
var dot = require("dotenv").config();

//encrpyt and decrypt users accounts passwords
// aes 256-bit cipher block chaining (cbc) encryption/decryption

let encrypt = (msg,userkey) => {
    let key = crypto.scryptSync(userkey,'salt',32);
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(msg, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    iv = iv.toString('hex')
    console.log('encrypted: ' + encrypted )
    console.log('iv: ' + iv )
    
    return {iv , encrypted};
}

let decrypt = (userkey,en,iv) => {
    let key = crypto.scryptSync(userkey,'salt',32);
    var ive = Buffer.from(iv, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, ive);
    let decrypted = decipher.update(en, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log('decrypted')
    return decrypted;
}
module.exports = {encrypt,decrypt}
