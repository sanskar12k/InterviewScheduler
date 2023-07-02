const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      require:true
    }
  });

const interviewSchema = new mongoose.Schema({
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
    },
    taken:{
        type:Boolean,
        default:true
    }
})

const InterviewModel = mongoose.model('Interview', interviewSchema);
const DateModel = mongoose.model('DateModel', dateSchema);
module.exports = {DateModel, InterviewModel};