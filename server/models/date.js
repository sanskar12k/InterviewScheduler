const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Candidate = require('./candidate');
// const User = require('./user');
const dateSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    // user:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"User",
    //   required:true
    // }
  });

// const interviewSchema = new mongoose.Schema({
//     candidate:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Candidate"
//     },
//     taken:{
//         type:Boolean,
//         default:false
//     }
// })

// const InterviewModel = mongoose.model('InterviewModel', interviewSchema);
const DateModel = mongoose.model('DateModel', dateSchema);
module.exports = {DateModel};