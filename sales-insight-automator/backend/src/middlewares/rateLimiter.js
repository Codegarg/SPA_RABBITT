const rateLimit = require('express-rate-limit');

const summaryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` to allow for testing
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

module.exports = summaryRateLimiter;
