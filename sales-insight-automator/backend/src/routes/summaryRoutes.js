const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const validateFile = require('../middlewares/fileValidation');
const rateLimiter = require('../middlewares/rateLimiter');

// POST /api/v1/summary/generate
router.post(
  '/generate',
  rateLimiter,            // 1. Check rate limit
  validateFile,           // 2. Extract and validate file buffer
  summaryController.generateSummary // 3. Execute business logic
);

module.exports = router;
