
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhancePostContent = async (title: string, rawContent: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance the following post for a professional Bengali website. 
      Title: ${title}
      Raw Content: ${rawContent}
      
      Requirements:
      1. Make it more engaging, professional, and grammatically perfect in Bengali.
      2. Keep it concise (max 200 words).
      3. Use standard Bengali vocabulary (Shuddho Bhasha).
      4. Return only the enhanced text.`,
    });

    return response.text || rawContent;
  } catch (error) {
    console.error("Gemini Enhancement Error:", error);
    return rawContent;
  }
};
