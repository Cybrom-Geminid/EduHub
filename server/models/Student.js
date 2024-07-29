const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;