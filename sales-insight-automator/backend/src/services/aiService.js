const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateSummary = async (salesData) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('API Key for AI service is missing.');
    }

    // Initialize the SDK with the provided API key
    const ai = new GoogleGenerativeAI(apiKey);
    
    // Convert sales data to a formatted string. 
    // We limit to the first 1000 rows to ensure we don't exceed token limits.
    const dataString = JSON.stringify(salesData.slice(0, 1000));
    
    const promptText = `
You are a senior business analyst.

Analyze the following sales dataset and generate a professional executive summary including:

• Key revenue insights
• Top performing product category
• Regional performance trends
• Any anomalies or cancellations
• A concise executive conclusion.

Return the summary as plain text.

Sales Data:
${dataString}
`;

    // Using gemini-2.5-flash as the fast, default model
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
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
