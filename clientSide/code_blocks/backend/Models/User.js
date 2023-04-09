const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    publicAddress : {
        type : String,
        required :true,
        unique:true
    },
    nonce : {
        type : String,
        required:true
    },
    username : {
        type:String
    }
});

module.exports = mongoose.model('users' , userSchema);