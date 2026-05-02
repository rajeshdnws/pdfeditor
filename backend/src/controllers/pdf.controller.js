const fs = require('fs');
const path = require('path');

// Mock database - replace with actual database calls
const pdfs = [];

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newPDF = {
      id: Date.now().toString(),
      userId: req.user.id,
      filename: req.file.originalname,
      filepath: req.file.path,
      size: req.file.size,
      uploadedAt: new Date(),
      updatedAt: new Date()
    };

    pdfs.push(newPDF);

    res.status(201).json({
      message: 'PDF uploaded successfully',
      pdf: newPDF
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listPDFs = async (req, res) => {
  try {
    const userPDFs = pdfs.filter(pdf => pdf.userId === req.user.id);
    res.json({
      message: 'PDFs retrieved successfully',
      pdfs: userPDFs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPDF = async (req, res) => {
  try {
    const pdf = pdfs.find(p => p.id === req.params.id && p.userId === req.user.id);
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.json({
      message: 'PDF retrieved successfully',
      pdf: pdf
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePDF = async (req, res) => {
  try {
    const pdf = pdfs.find(p => p.id === req.params.id && p.userId === req.user.id);
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    // Update allowed fields
    if (req.body.filename) {
      pdf.filename = req.body.filename;
    }

    pdf.updatedAt = new Date();

    res.json({
      message: 'PDF updated successfully',
      pdf: pdf
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePDF = async (req, res) => {
  try {
    const index = pdfs.findIndex(p => p.id === req.params.id && p.userId === req.user.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const pdf = pdfs[index];

    // Delete file from storage
    if (fs.existsSync(pdf.filepath)) {
      fs.unlinkSync(pdf.filepath);
    }

    pdfs.splice(index, 1);

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const downloadPDF = async (req, res) => {
  try {
    const pdf = pdfs.find(p => p.id === req.params.id && p.userId === req.user.id);
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    if (!fs.existsSync(pdf.filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(pdf.filepath, pdf.filename);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadPDF,
  listPDFs,
  getPDF,
  updatePDF,
  deletePDF,
  downloadPDF
};
