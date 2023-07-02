//CANDIDATE 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateModel, InterviewModel } = require('./date')
const User = require('./user');
const candSchema = new Schema({
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
        unique: [true, "Email already exist"]
    },
    phNumber: {
        type: String
    },
    specialisation:
    {
        type: String,
        require:true
    },
    interViewerList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    GoNgo:{
        type:Number,
        default:-1
    },
    dateNdTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DateModel',
    },
    status:{
        type:[Number],
        default:[-1, -1, -1]
    },
    comment:{
        type:[String]
    },
    interViewer:{
        type:Boolean,
        default:0
    }
})

module.exports = mongoose.model('Candidate', candSchema);