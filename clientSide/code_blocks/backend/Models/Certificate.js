const mongoose = require('mongoose');
const { Schema } = mongoose;

const certificateSchema = new Schema({
  studentId : String,
  studentName : String,
  issueDate : String,
  studentMeta :String,
  issuerMeta : String,
  body: String,
  certificateHash:String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('certificates',certificateSchema);