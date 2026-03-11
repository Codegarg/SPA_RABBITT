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

    // Using gemini-1.5-flash (Production standard for speed and stability)
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate AI summary.');
  }
};

module.exports = {
  generateSummary
};
