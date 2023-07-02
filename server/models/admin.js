//INTERVIEWER 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phNumber: {
        type: String
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AdminModel', adminSchema);