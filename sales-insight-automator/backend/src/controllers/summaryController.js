const fileParser = require('../services/fileParser');
const aiService = require('../services/aiService');
const emailService = require('../services/emailService');

const generateSummary = async (req, res, next) => {
  try {
    const { email } = req.body;
    const file = req.file;

    // 1. Validate Email Presence
    if (!email) {
      return res.status(400).json({ success: false, error: 'Recipient email address is required.' });
    }
    
    // Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address format.' });
    }

    // 2. Parse CSV/XLSX File into JSON array
    let parsedData;
    try {
      if (!file) {
         return res.status(400).json({ success: false, error: 'No file provided.' });
      }
      parsedData = await fileParser.parseFile(file);
    } catch (parseError) {
      return res.status(400).json({ success: false, error: `File parsing error: ${parseError.message}` });
    }

    // Ensure parser didn't return empty array
    if (!parsedData || parsedData.length === 0) {
      return res.status(400).json({ success: false, error: 'The uploaded file is empty or contains no readable data.' });
    }

    // Note: AI parsing can take a few seconds, but standard HTTP requests can hold open 
    // unless timeout requires async queue (e.g., BullMQ). Vercel limits 10s for free, Render usually 100s.
    
    // 3. Generate AI Summary
    const summaryText = await aiService.generateSummary(parsedData);

    // 4. Send the Email
    await emailService.sendSummaryEmail(email, summaryText);

    // 5. Return Success Response
    return res.status(200).json({
      success: true,
      summary: summaryText,
      message: `Executive summary is being generated and will be sent to ${email}.`,
      data: {
        // Return a quick snippet for the frontend to show optionally
        summaryPreview: summaryText.substring(0, 150) + '...'
      }
    });

  } catch (error) {
    // 6. Delegate generic errors to the centralized error handler in server.js
    next(error);
  }
};

module.exports = {
  generateSummary
};
