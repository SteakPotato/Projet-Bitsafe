const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongo structure 
// create users schema & model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'field is required']
    },
    email: {
        type: String,
        required: [true, 'field is required']
    },
    hash: {
        type: String,
        required: [true, 'field is required']
    },
    fullname: {
        type: String,
        required: [true, 'field is required']
    },
    account: [ {
        username: {
            type: String,
        },
        hash:[{ 
            iv:{},
            encrypted:{},
        }],
        titre: {
            type: String,
        },
        url: {
            type: String,
        },
        color: {
            type: String,
        },
        validurl:{
            type: Boolean,
        },
        updatedAt:{
            type: Date,
        }
        
    }]
    
},{timestamps: true});



const User = mongoose.model('User',userSchema);
module.exports = User;
