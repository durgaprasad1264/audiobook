
import { GoogleGenAI } from "@google/genai";
import { Tone } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function rewriteText(text: string, tone: Tone): Promise<string> {
  const prompt = `
    You are an expert copy editor specializing in tone adaptation for audiobooks.
    Your task is to rewrite the following text to have a "${tone.name}" tone.
    - The rewritten text must preserve the original meaning, characters, and plot points.
    - Enhance the stylistic quality to match the requested tone. For example, for "Suspenseful", use shorter sentences, foreshadowing, and evocative language. For "Inspiring", use uplifting words and a more powerful structure.
    - Do not add any extra commentary, introductions, or conclusions.
    - Only provide the rewritten text as a single block of text. Do not wrap it in quotes or markdown.
    
    Original Text:
    """
    ${text}
    """
    
    Rewritten Text with a ${tone.name} tone:
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const rewrittenText = response.text.trim();
    if (!rewrittenText) {
        throw new Error("The AI returned an empty response. Please try again.");
    }
    return rewrittenText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error("Invalid API Key. Please check your configuration.");
    }
    throw new Error("Failed to rewrite text. The AI service may be temporarily unavailable.");
  }
}
