const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const AnnsSchema = new Schema({
    subject: String,
    text: {
        type: String,
        required: true
    },
    sDate: String,
    fDate: String,
    author: String
    
});


module.exports=mongoose.model('announcement', AnnsSchema);