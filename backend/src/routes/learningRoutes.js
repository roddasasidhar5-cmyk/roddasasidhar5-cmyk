const express = require('express');
const router = express.Router();
const { getAllVideos } = require('../controllers/learningController');

router.get('/videos', getAllVideos);

module.exports = router;
