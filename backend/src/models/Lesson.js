const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  durationSeconds: { type: Number, default: 30 },
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
