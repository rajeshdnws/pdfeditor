const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeUser } = require('../middleware/auth');
const pdfController = require('../controllers/pdf.controller');
const multer = require('multer');
const path = require('path');

// Multer setup for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Protected routes
router.post('/upload', authenticateToken, authorizeUser, upload.single('file'), pdfController.uploadPDF);
router.get('/list', authenticateToken, authorizeUser, pdfController.listPDFs);
router.get('/:id', authenticateToken, authorizeUser, pdfController.getPDF);
router.put('/:id', authenticateToken, authorizeUser, pdfController.updatePDF);
router.delete('/:id', authenticateToken, authorizeUser, pdfController.deletePDF);
router.post('/:id/download', authenticateToken, authorizeUser, pdfController.downloadPDF);

module.exports = router;
