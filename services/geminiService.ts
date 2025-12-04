import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (name: string, category: string, features: string): Promise<string> => {
  if (!apiKey) return "AI Description unavailable (Missing API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, SEO-friendly e-commerce product description (max 80 words) for a product named "${name}" in the category "${category}". Key features: ${features}. Return only the description text.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate description.";
  }
};

export const getShoppingAssistantResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string,
  inventory: Product[]
): Promise<string> => {
  if (!apiKey) return "I'm sorry, I can't help right now (Missing API Key).";

  try {
    const inventoryContext = inventory.map(p => `${p.name} ($${p.price}, ${p.category})`).join(", ");
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are Lumina, a helpful AI shopping assistant for an e-commerce store. 
        You have access to the current store inventory: [${inventoryContext}].
        Always be polite, concise, and helpful. 
        If a user asks for a product, recommend specific items from the inventory list provided.
        If the user asks about something not in stock, suggest the closest alternative or say we don't have it.
        Keep responses under 50 words unless detail is requested.`
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I didn't catch that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to my brain right now.";
  }
};