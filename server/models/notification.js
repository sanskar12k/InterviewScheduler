//NOTIFICATION
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  iTrack: {
    type: String,
    required: true
  },
  specialisation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Notification", notifSchema);
