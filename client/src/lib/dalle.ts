import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// This is using OpenAI's API integration from blueprint:javascript_openai
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateCharacterPortrait(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error('Failed to generate image:', error);
    throw error;
  }
}

export async function generateLogo(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024", // Wide format for logo
      quality: "standard",
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error('Failed to generate logo:', error);
    throw error;
  }
}