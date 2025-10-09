import OpenAI from "openai";
import fs from 'fs';
import https from 'https';
import { characters } from "../client/src/data/characters.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Mature editorial emotional expressions
const editorialEmotions = {
  neutral: "composed professional expression, subtle confidence, direct gaze",
  happy: "sardonic half-smile, knowing look, triumphant gleam in eyes", 
  angry: "furrowed brow, pursed lips, seething intensity, controlled rage",
  stressed: "anxious tension, sweat bead on forehead, tight jaw, worried eyes"
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

async function generateEditorialPortrait(
  character: any,
  emotion: string,
  emotionDesc: string
) {
  // Editorial caricature prompt inspired by The Economist and New Yorker
  const prompt = `Editorial political caricature portrait in the style of The Economist magazine cover illustration.
    ${character.appearance}, ${character.personality}, ${emotionDesc}.
    Sophisticated ink and gouache editorial illustration, cross-hatching details,
    limited patriotic color palette with muted tones, dramatic three-point studio lighting,
    plain parchment background, head-and-shoulders portrait composition,
    semi-realistic proportions with subtle exaggerated features for political satire,
    mature newsweekly aesthetic, refined painterly rendering,
    professional editorial caricature for serious political magazine.
    NOT childish, NOT cartoon, NOT anime, NOT Pixar, NOT juvenile.
    Sophisticated political satire art.`;

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
      const filename = `client/public/characters/${character.id}-${emotion}.png`;
      await downloadImage(imageUrl, filename);
      console.log(`✓ Generated ${emotion} editorial portrait for ${character.name}`);
      return true;
    }
  } catch (error) {
    console.error(`Failed to generate ${emotion} for ${character.name}:`, error);
    return false;
  }
}

async function generateEditorialScenes() {
  const scenes = [
    {
      id: 'press-conference',
      prompt: 'White House press room editorial illustration, The Economist style, ink wash and limited colors, sophisticated political setting, serious newsmagazine aesthetic'
    },
    {
      id: 'oval-office', 
      prompt: 'Oval Office editorial illustration, New Yorker magazine style, sophisticated ink and watercolor, dramatic lighting, presidential grandeur with satirical edge'
    },
    {
      id: 'breaking-news',
      prompt: 'TV news studio editorial illustration, serious newsweekly style, professional broadcast setting, limited color palette, mature political satire aesthetic'
    },
    {
      id: 'social-media',
      prompt: 'Social media chaos editorial illustration, The Economist style caricature, phones and screens with political content, sophisticated satire of digital age'
    },
    {
      id: 'protest',
      prompt: 'Political protest editorial illustration, New Yorker style, crowds with signs, ink and limited colors, mature satirical commentary on democracy'
    }
  ];

  for (const scene of scenes) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: scene.prompt,
        n: 1,
        size: "1792x1024",
        quality: "hd",
        style: "vivid"
      });

      const imageUrl = response.data?.[0]?.url;
      if (imageUrl) {
        await downloadImage(imageUrl, `client/public/scenes/${scene.id}.png`);
        console.log(`✓ Generated editorial scene: ${scene.id}`);
      }
    } catch (error) {
      console.error(`Failed to generate scene ${scene.id}:`, error);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function generateAllEditorialAssets() {
  console.log('📰 EDITORIAL ASSET GENERATION - EXECUTIVE DISORDER 🎨\n');
  console.log('Creating mature, sophisticated political satire in The Economist/New Yorker style...\n');

  // Create directories
  if (!fs.existsSync('client/public/scenes')) {
    fs.mkdirSync('client/public/scenes', { recursive: true });
  }

  // Test with first character to confirm style
  console.log('🎯 Testing editorial style with first character...\n');
  const testCharacter = characters[0];
  
  for (const [emotion, emotionDesc] of Object.entries(editorialEmotions)) {
    await generateEditorialPortrait(testCharacter, emotion, emotionDesc);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✅ Test complete! Check the generated images for ' + testCharacter.name);
  console.log('If style is approved, run full generation for all characters.\n');

  // Ask for confirmation before proceeding
  console.log('To generate all characters, uncomment the code below and run again.\n');

  /* UNCOMMENT TO GENERATE ALL CHARACTERS
  // Generate editorial portraits for remaining characters
  for (let i = 1; i < characters.length; i++) {
    const character = characters[i];
    console.log(`\n📰 Generating editorial portraits for ${character.name}...`);
    
    for (const [emotion, emotionDesc] of Object.entries(editorialEmotions)) {
      await generateEditorialPortrait(character, emotion, emotionDesc);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Generate editorial scenes
  console.log('\n\n🏛️ Generating editorial scene backgrounds...\n');
  await generateEditorialScenes();

  console.log('\n\n✅ EDITORIAL GENERATION COMPLETE!');
  console.log('📰 All assets are mature, sophisticated political satire');
  */
}

// Run the generation
generateAllEditorialAssets().catch(console.error);