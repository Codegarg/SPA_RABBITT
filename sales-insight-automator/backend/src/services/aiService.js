const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateSummary = async (salesData) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('API Key for AI service is missing.');
    }

    // Initialize the SDK with the provided API key
    const ai = new GoogleGenerativeAI(apiKey);
    
    // Simplify data payload to reduce tokens and speed up AI comprehension
    // We convert the first 100 rows to a dense string instead of raw JSON
    const dataSlice = salesData.slice(0, 100);
    const headers = Object.keys(dataSlice[0] || {}).join(',');
    const rows = dataSlice.map(row => Object.values(row).join(',')).join('\n');
    const dataString = `${headers}\n${rows}`;
    
    const promptText = `
You are a senior business analyst. Analyze this sales data (CSV format) and generate a professional executive summary.
Focus on: Revenue, Top Product, Regional Trends, and Anomalies.
Return summary as plain text.

Sales Data:
${dataString}
`;

    // Using fallback strategy for models
    const modelNames = ["gemini-1.5-flash", "gemini-pro", "gemini-2.0-flash"];
    let lastError;
    
    for (const modelName of modelNames) {
      try {
        console.log(`[AI] Attempting summary with model: ${modelName}`);
        const model = ai.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        return response.text();
      } catch (err) {
        console.error(`[AI] Model ${modelName} failed:`, err.message);
        lastError = err;
        continue; // Try next model
      }
    }
    
    throw lastError;
  } catch (error) {
    console.error('AI Generation Error:', error);
    // Expose the specific error message to help the user troubleshoot in the UI
    throw new Error(`AI Error: ${error.message || 'Unknown generation failure'}`);
  }
};

module.exports = {
  generateSummary
};
