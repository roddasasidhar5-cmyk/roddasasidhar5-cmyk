const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.get('/courses', learningController.getCourses);
router.get('/videos', learningController.getVideos);

// Admin only routes
router.post('/courses', protect, admin, learningController.addCourse);
router.post('/videos', protect, admin, learningController.addVideo);

module.exports = router;
