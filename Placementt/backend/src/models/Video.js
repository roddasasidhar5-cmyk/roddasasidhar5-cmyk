const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  category: { type: String }, // e.g., 'DSA', 'Interview Prep'
  channel: { type: String },
  duration: { type: String },
  views: { type: String },
  thumbnail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
