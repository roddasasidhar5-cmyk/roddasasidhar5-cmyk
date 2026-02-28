const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, applyToJob, getAdminApplications } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getAllJobs);
router.get('/admin/applications', authMiddleware, adminMiddleware, getAdminApplications);
router.get('/:id', getJobById);
router.post('/apply', authMiddleware, applyToJob);

module.exports = router;
