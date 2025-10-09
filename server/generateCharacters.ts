import OpenAI from "openai";
import fs from 'fs';
import https from 'https';
import { characters } from "../client/src/data/characters.js";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function generateCharacterPortrait(character: any): Promise<void> {
  const prompt = `Political satirical character portrait for a video game. Character: ${character.name}, ${character.title}. ${character.shortBio} Style: Colorful cartoon illustration, exaggerated features, humorous political satire, professional game art quality, vibrant colors, clear facial features, head and shoulders portrait, simple background`;
  
  console.log(`Generating portrait for ${character.name}...`);
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data?.[0]?.url;
    if (imageUrl) {
      const filename = `client/public/characters/${character.id}.png`;
      await downloadImage(imageUrl, filename);
      console.log(`✓ Generated portrait for ${character.name}`);
    }
  } catch (error) {
    console.error(`Failed to generate portrait for ${character.name}:`, error);
  }
}

async function generateLogo(): Promise<void> {
  const prompt = `Logo for "EXECUTIVE DISORDER" political satire video game. Features a comedic presidential seal where the eagle is replaced with a cartoon rubber chicken holding broken gavels, surrounded by flying papers and chaos, metallic gold embossed text saying "EXECUTIVE DISORDER", red white and blue with gold accents, professional game logo design, dramatic lighting, high quality render, centered composition`;
  
  console.log('Generating game logo...');
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3", 
      prompt: prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    });

    const imageUrl = response.data?.[0]?.url;
    if (imageUrl) {
      await downloadImage(imageUrl, 'client/public/logo.png');
      console.log('✓ Generated game logo');
    }
  } catch (error) {
    console.error('Failed to generate logo:', error);
  }
}

export async function generateAllAssets() {
  console.log('Starting asset generation with DALL-E 3...\n');
  
  // Generate logo first
  await generateLogo();
  
  // Generate character portraits
  for (const character of characters) {
    await generateCharacterPortrait(character);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n✅ Asset generation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllAssets().catch(console.error);
}