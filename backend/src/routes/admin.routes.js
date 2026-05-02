const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const adminController = require('../controllers/admin.controller');

// Admin protected routes
router.get('/users', authenticateToken, authorizeAdmin, adminController.getAllUsers);
router.get('/users/:id', authenticateToken, authorizeAdmin, adminController.getUserById);
router.put('/users/:id', authenticateToken, authorizeAdmin, adminController.updateUser);
router.delete('/users/:id', authenticateToken, authorizeAdmin, adminController.deleteUser);

router.get('/pdfs', authenticateToken, authorizeAdmin, adminController.getAllPDFs);
router.delete('/pdfs/:id', authenticateToken, authorizeAdmin, adminController.deletePDFAdmin);

router.get('/stats', authenticateToken, authorizeAdmin, adminController.getStats);

module.exports = router;
