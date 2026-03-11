const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter to allow only .csv and .xlsx
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype) || file.originalname.endsWith('.csv') || file.originalname.endsWith('.xlsx')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV and XLSX files are allowed.'), false);
  }
};

// Set up multer with limits and filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter
});

// Middleware to handle single file upload
const validateFile = (req, res, next) => {
  const uploadSingle = upload.single('file');
  
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'File size exceeds the 5MB limit.' });
      }
      return res.status(400).json({ success: false, error: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file (CSV or XLSX).' });
    }
    
    next();
  });
};

module.exports = validateFile;
