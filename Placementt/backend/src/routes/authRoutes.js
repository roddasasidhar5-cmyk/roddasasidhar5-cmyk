const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin only routes
router.get('/users', protect, admin, authController.getUsers);
router.delete('/users/:id', protect, admin, authController.deleteUser);

module.exports = router;
