const csv = require('csv-parser');
const xlsx = require('xlsx');
const stream = require('stream');

/**
 * Parses a CSV buffer into a JSON array
 */
const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    
    bufferStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

/**
 * Parses an XLSX buffer into a JSON array
 */
const parseXLSX = (buffer) => {
  try {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const results = xlsx.utils.sheet_to_json(sheet);
    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Parses uploaded file buffer based on mimetype and extension
 */
const parseFile = async (file) => {
  if (file.mimetype === 'text/csv' || file.originalname.toLowerCase().endsWith('.csv')) {
    return await parseCSV(file.buffer);
  } else if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype === 'application/vnd.ms-excel' ||
    file.originalname.toLowerCase().endsWith('.xlsx')
  ) {
    return await parseXLSX(file.buffer);
  } else {
    throw new Error('Unsupported file type for parsing.');
  }
};

module.exports = {
  parseFile
};
