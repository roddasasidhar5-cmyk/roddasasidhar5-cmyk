const express = require('express');
const router = express.Router();
const { getQuizByCategory, submitQuiz } = require('../controllers/assessmentController');

router.get('/:category', getQuizByCategory);
router.post('/submit', submitQuiz);

module.exports = router;
