const Course = require('../models/Course');
const Video = require('../models/Video');

// Get all categorized courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get videos (optionally filtered by category or course)
exports.getVideos = async (req, res) => {
    try {
        const { category, courseId } = req.query;
        let query = {};
        if (category && category !== 'All') query.category = category;
        if (courseId) query.courseId = courseId;
        
        const videos = await Video.find(query).populate('courseId').sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin: Add a new video
exports.addVideo = async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Admin: Add a new course
exports.addCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
