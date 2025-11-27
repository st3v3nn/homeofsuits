import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStylingAdvice = async (
  productName: string, 
  productDescription: string, 
  userQuery: string
): Promise<string> => {
  
  if (!process.env.API_KEY) {
    return "Our AI Stylist is currently offline. Please contact support for assistance.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a world-class men's fashion stylist working for "Home of Suits".
      The customer is looking at this product:
      Name: ${productName}
      Description: ${productDescription}

      The customer asks: "${userQuery}"

      Provide a helpful, sophisticated, and concise answer (max 100 words). 
      Suggest matching accessories (ties, shoes, pocket squares) if relevant.
      Maintain a luxury, helpful tone.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I'm sorry, I couldn't generate a styling tip right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the styling server. Please try again later.";
  }
};
