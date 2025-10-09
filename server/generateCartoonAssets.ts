import OpenAI from "openai";
import fs from 'fs';
import https from 'https';
import { characters } from "../client/src/data/characters.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cartoon emotional expressions
const cartoonEmotions = {
  neutral: "calm cartoon expression, slight smile, looking forward",
  happy: "big cartoon smile, sparkly eyes, radiating joy, exaggerated happiness",
  angry: "cartoon angry face, steam coming from ears, red face, exaggerated frown",
  stressed: "cartoon panic expression, sweat drops, frazzled hair, wide eyes"
};

async function downloadImage(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = filename.substring(0, filename.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
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

async function generateCartoonPortrait(
  character: any,
  emotion: string,
  emotionDesc: string
) {
  const prompt = `Cartoon political satire character portrait: ${character.appearance}, ${character.personality},
    ${emotionDesc}, funny cartoon style, exaggerated features for comedy, 
    bright vibrant colors, thick outlines, comic book style, 
    political cartoon aesthetic, humorous and playful, 
    simple background, Saturday morning cartoon quality,
    NOT realistic, NOT photographic, cartoon animation style`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    const imageUrl = response.data?.[0]?.url;
    if (imageUrl) {
      const filename = `client/public/characters/${character.id}-${emotion}.png`;
      await downloadImage(imageUrl, filename);
      console.log(`✓ Generated ${emotion} cartoon for ${character.name}`);
      return true;
    }
  } catch (error) {
    console.error(`Failed to generate ${emotion} for ${character.name}:`, error);
    return false;
  }
}

async function generateCartoonScenes() {
  const scenes = [
    {
      id: 'press-conference',
      prompt: 'Cartoon style White House press room, exaggerated perspective, bright colors, comic book style, funny political cartoon aesthetic'
    },
    {
      id: 'oval-office',
      prompt: 'Cartoon Oval Office, exaggerated furniture, bright patriotic colors, humorous details, political satire cartoon style'
    },
    {
      id: 'breaking-news',
      prompt: 'Cartoon TV news studio, exaggerated "BREAKING NEWS" graphics, comic style, bright red and blue, satirical news show aesthetic'
    },
    {
      id: 'social-media',
      prompt: 'Cartoon social media interface, exaggerated like buttons and emoji reactions, meme war battlefield, comic style'
    },
    {
      id: 'protest',
      prompt: 'Cartoon protest scene, funny exaggerated signs, colorful crowd, political satire cartoon style, humorous activism'
    }
  ];

  for (const scene of scenes) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: scene.prompt,
        n: 1,
        size: "1792x1024",
        quality: "standard",
        style: "vivid"
      });

      const imageUrl = response.data?.[0]?.url;
      if (imageUrl) {
        await downloadImage(imageUrl, `client/public/scenes/${scene.id}.png`);
        console.log(`✓ Generated cartoon scene: ${scene.id}`);
      }
    } catch (error) {
      console.error(`Failed to generate scene ${scene.id}:`, error);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function generateAllCartoonAssets() {
  console.log('🎨 CARTOON ASSET GENERATION - EXECUTIVE DISORDER 🎮\n');
  console.log('Creating fun, satirical cartoon-style assets...\n');

  // Create directories
  if (!fs.existsSync('client/public/scenes')) {
    fs.mkdirSync('client/public/scenes', { recursive: true });
  }

  // Generate cartoon portraits with emotions for all characters
  for (const character of characters) {
    console.log(`\n🎭 Generating cartoon portraits for ${character.name}...`);
    
    for (const [emotion, emotionDesc] of Object.entries(cartoonEmotions)) {
      await generateCartoonPortrait(character, emotion, emotionDesc);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
    }
  }

  // Generate cartoon scenes
  console.log('\n\n🎬 Generating cartoon scene backgrounds...\n');
  await generateCartoonScenes();

  console.log('\n\n✅ CARTOON GENERATION COMPLETE!');
  console.log('🎨 All assets are fun, cartoon-style political satire');
}

// Run the generation
generateAllCartoonAssets().catch(console.error);