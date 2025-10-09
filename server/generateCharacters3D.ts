import OpenAI from "openai";
import fs from 'fs';
import https from 'https';
import { characters } from "../client/src/data/characters.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Different 3D style variations for A/B testing
const styleVariants = {
  pixar: {
    name: "Pixar 3D",
    prompt: "Pixar-style 3D rendered character portrait, smooth CGI animation quality, subsurface scattering, professional 3D modeling, cinematic lighting, depth of field, rendered in Blender or Maya, high polygon count",
  },
  claymation: {
    name: "Claymation 3D",
    prompt: "Claymation style 3D character, stop-motion animation aesthetic, textured clay material, fingerprint details, soft studio lighting, tactile surface quality, Wallace and Gromit style, handcrafted appearance",
  },
  lowpoly: {
    name: "Low-Poly 3D",
    prompt: "Low-poly 3D character portrait, geometric faceted style, flat shaded polygons, vibrant colors, game asset quality, isometric perspective, minimal polygon count, stylized 3D render",
  },
  realistic3d: {
    name: "Realistic 3D",
    prompt: "Photorealistic 3D rendered character portrait, ray-traced lighting, 8K textures, ultra-detailed skin shader, volumetric lighting, depth of field, professional CGI quality, octane render",
  },
  voxel: {
    name: "Voxel Art 3D",
    prompt: "Voxel art 3D character portrait, cubic pixel style, Minecraft aesthetic, blocky 3D render, isometric view, bright colors, game asset style, MagicaVoxel render",
  }
};

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

async function generateCharacterPortrait(character: any, styleKey: string) {
  const style = styleVariants[styleKey as keyof typeof styleVariants];
  
  // Build the character-specific prompt
  const characterPrompt = `${style.prompt}, ${character.appearance}, ${character.personality}, 
    political satire character, humorous exaggerated features, against a neutral background, 
    centered composition, portrait orientation, professional quality`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: characterPrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid"
    });

    const imageUrl = response.data?.[0]?.url;
    if (imageUrl) {
      const filename = `client/public/characters/${character.id}-${styleKey}.png`;
      await downloadImage(imageUrl, filename);
      console.log(`✓ Generated ${style.name} portrait for ${character.name}`);
      return filename;
    }
  } catch (error) {
    console.error(`Failed to generate ${style.name} portrait for ${character.name}:`, error);
    throw error;
  }
}

async function generateAllCharacterVariants() {
  console.log('Starting 3D-styled character generation with DALL-E 3...\n');
  
  // Create directories if they don't exist
  if (!fs.existsSync('client/public/characters')) {
    fs.mkdirSync('client/public/characters', { recursive: true });
  }

  const results: any = {};
  
  for (const character of characters) {
    console.log(`\nGenerating portraits for ${character.name}...`);
    results[character.id] = {};
    
    // Generate each style variant for this character
    for (const [styleKey, style] of Object.entries(styleVariants)) {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
        const filename = await generateCharacterPortrait(character, styleKey);
        results[character.id][styleKey] = {
          style: style.name,
          file: filename
        };
      } catch (error) {
        console.error(`Failed ${style.name} for ${character.name}`);
      }
    }
  }

  // Save the results manifest
  fs.writeFileSync(
    'client/public/characters/manifest.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✓ Character generation complete! Manifest saved to manifest.json');
}

// Run the generation
generateAllCharacterVariants().catch(console.error);