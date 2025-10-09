import OpenAI from "openai";
import fs from 'fs';
import https from 'https';
import { characters } from "../client/src/data/characters.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function downloadImage(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function generate3DStyleCharacters() {
  console.log('Generating 3D-styled character portraits with DALL-E 3...\n');
  
  if (!fs.existsSync('client/public/characters')) {
    fs.mkdirSync('client/public/characters', { recursive: true });
  }

  for (const character of characters) {
    console.log(`Generating 3D portrait for ${character.name}...`);
    
    const prompt = `Pixar-style 3D rendered character portrait of ${character.appearance}, ${character.personality}, 
      smooth CGI animation quality, subsurface scattering, professional 3D modeling, cinematic lighting, 
      political satire character, humorous exaggerated features, against a neutral gradient background, 
      centered composition, portrait orientation, high quality render`;

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "vivid"
      });

      const imageUrl = response.data?.[0]?.url;
      if (imageUrl) {
        const filename = `client/public/characters/${character.id}-3d.png`;
        await downloadImage(imageUrl, filename);
        console.log(`✓ Generated 3D portrait for ${character.name}`);
      }
    } catch (error) {
      console.error(`Failed to generate portrait for ${character.name}:`, error);
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n✓ 3D character generation complete!');
}

// Run the generation
generate3DStyleCharacters().catch(console.error);