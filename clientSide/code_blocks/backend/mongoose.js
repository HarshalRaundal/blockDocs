const mongoose = require('mongoose');
const { URL } = require('./KEYS');
// const URL ='mongodb+srv://blockDocs:Pass%40123@cluster0.po6kssg.mongodb.net/blockDocs?retryWrites=true&w=majority';

const mongoClient = async () =>{
    await mongoose.connect(URL ,{useNewUrlParser : true},(err,result) =>{
        if (err) {
            console.log('----',err);
        }
        else{
        console.log('Conneted to database!');}
    });
}

module.exports = mongoClient;