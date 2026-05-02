const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeUser } = require('../middleware/auth');
const userController = require('../controllers/user.controller');

// User protected routes
router.get('/profile', authenticateToken, authorizeUser, userController.getProfile);
router.put('/profile', authenticateToken, authorizeUser, userController.updateProfile);
router.post('/change-password', authenticateToken, authorizeUser, userController.changePassword);

module.exports = router;
