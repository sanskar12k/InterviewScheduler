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
    emp_id:{
        type:Number, 
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema);