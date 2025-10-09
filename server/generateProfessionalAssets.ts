import OpenAI from "openai";
import fs from 'fs';
import https from 'https';
import { characters } from "../client/src/data/characters.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Emotional states for each character portrait
const emotionalStates = {
  neutral: "neutral expression, professional demeanor, direct eye contact",
  happy: "genuine smile, bright eyes, positive energy, slight laugh lines",
  angry: "furrowed brow, tense jaw, intense stare, visible frustration",
  stressed: "exhausted look, disheveled hair, bags under eyes, sweating, loosened tie"
};

// Additional character types
const staffTypes = [
  { id: "chief-of-staff", name: "Chief of Staff", description: "Professional middle-aged woman, sharp business suit, confident posture" },
  { id: "press-secretary", name: "Press Secretary", description: "Young professional man, perfectly groomed, media-ready appearance" },
  { id: "campaign-manager", name: "Campaign Manager", description: "Experienced political operative, slightly disheveled from long hours" },
  { id: "policy-advisor", name: "Policy Advisor", description: "Intellectual appearance, glasses, holding documents" },
  { id: "security-chief", name: "Security Chief", description: "Former military, earpiece, stern expression, dark suit" }
];

const stakeholderTypes = [
  { id: "news-anchor", name: "News Anchor", description: "Polished TV personality, perfect makeup and hair, professional broadcast attire" },
  { id: "board-member", name: "Board Member", description: "Wealthy elderly businessman, expensive suit, calculating expression" },
  { id: "union-leader", name: "Union Leader", description: "Working-class representative, strong build, determined expression" },
  { id: "tech-ceo", name: "Tech CEO", description: "Young tech billionaire, casual but expensive clothing, confident smirk" },
  { id: "foreign-diplomat", name: "Foreign Diplomat", description: "Distinguished international representative, formal diplomatic attire" }
];

const crisisCharacters = [
  { id: "protester-leader", name: "Protest Leader", description: "Passionate activist with megaphone, protest signs visible" },
  { id: "whistleblower", name: "Whistleblower", description: "Nervous government employee, shadowy lighting, anonymous feel" },
  { id: "investigative-journalist", name: "Investigative Journalist", description: "Determined reporter with notepad, press badge visible" },
  { id: "scandal-victim", name: "Scandal Victim", description: "Distressed citizen affected by political decisions" },
  { id: "opposition-leader", name: "Opposition Leader", description: "Rival political figure, aggressive posture, challenging expression" }
];

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

async function generatePhotorealisticPortrait(
  name: string, 
  description: string, 
  emotion: string, 
  emotionDesc: string,
  outputPath: string
) {
  const prompt = `Professional photorealistic portrait photograph of ${description}, ${emotionDesc}, 
    high-end political photography style, studio lighting, sharp focus, 8K resolution, 
    professional photographer quality, neutral gray background, formal business attire, 
    realistic skin texture and details, natural lighting, depth of field, 
    shot with professional camera, editorial photography style, no cartoon or stylized elements`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural"  // Use natural style for photorealism
    });

    const imageUrl = response.data?.[0]?.url;
    if (imageUrl) {
      await downloadImage(imageUrl, outputPath);
      console.log(`✓ Generated ${emotion} portrait for ${name}`);
      return true;
    }
  } catch (error) {
    console.error(`Failed to generate ${emotion} portrait for ${name}:`, error);
    return false;
  }
}

async function generateSceneBackground(sceneName: string, description: string, outputPath: string) {
  const prompt = `Professional photorealistic scene: ${description}, 
    cinematic quality, high resolution 8K, professional photography, 
    depth of field, dramatic lighting, no people in frame, 
    ready for character compositing, wide angle shot`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",  // Wide format for backgrounds
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data?.[0]?.url;
    if (imageUrl) {
      await downloadImage(imageUrl, outputPath);
      console.log(`✓ Generated scene: ${sceneName}`);
      return true;
    }
  } catch (error) {
    console.error(`Failed to generate scene ${sceneName}:`, error);
    return false;
  }
}

async function generateAllAssets() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('     PROFESSIONAL ASSET GENERATION - EXECUTIVE DISORDER     ');
  console.log('═══════════════════════════════════════════════════════════\n');

  // 1. Main character portraits with emotions
  console.log('📸 GENERATING MAIN CHARACTER PORTRAITS (4 emotions each)...\n');
  for (const character of characters.slice(0, 3)) { // Start with first 3 to test
    console.log(`\n👤 ${character.name}`);
    for (const [emotion, emotionDesc] of Object.entries(emotionalStates)) {
      await generatePhotorealisticPortrait(
        character.name,
        character.appearance,
        emotion,
        emotionDesc,
        `client/public/assets/characters/main/${character.id}/${emotion}.png`
      );
      await new Promise(resolve => setTimeout(resolve, 3000)); // Rate limiting
    }
  }

  // 2. Staff portraits
  console.log('\n\n📋 GENERATING STAFF PORTRAITS...\n');
  for (const staff of staffTypes.slice(0, 2)) { // Start with first 2
    await generatePhotorealisticPortrait(
      staff.name,
      staff.description,
      'neutral',
      emotionalStates.neutral,
      `client/public/assets/characters/staff/${staff.id}.png`
    );
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // 3. Crisis scenes
  console.log('\n\n🎬 GENERATING CRISIS SCENE BACKGROUNDS...\n');
  const scenes = [
    { 
      id: 'press-conference', 
      desc: 'White House press briefing room, empty podium with presidential seal, rows of empty chairs, dramatic lighting'
    },
    { 
      id: 'oval-office-crisis', 
      desc: 'Oval Office during crisis, papers scattered on resolute desk, multiple phones, urgent atmosphere, evening lighting through windows'
    },
    { 
      id: 'breaking-news', 
      desc: 'TV news studio with breaking news graphics, multiple screens showing crisis footage, red alert styling'
    },
    { 
      id: 'protest-scene', 
      desc: 'View from government building of massive protests outside, signs and crowds visible through windows'
    },
    { 
      id: 'war-room', 
      desc: 'Situation room with multiple screens, conference table, crisis management setup, dim dramatic lighting'
    }
  ];

  for (const scene of scenes.slice(0, 2)) { // Start with first 2
    await generateSceneBackground(
      scene.id,
      scene.desc,
      `client/public/assets/scenes/${scene.id}.png`
    );
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // 4. Generate asset manifest
  const manifest = {
    characters: {
      main: characters.map(c => ({
        id: c.id,
        name: c.name,
        emotions: Object.keys(emotionalStates)
      })),
      staff: staffTypes,
      stakeholders: stakeholderTypes,
      crisis: crisisCharacters
    },
    scenes: scenes,
    generated: new Date().toISOString()
  };

  fs.writeFileSync(
    'client/public/assets/manifest.json',
    JSON.stringify(manifest, null, 2)
  );

  console.log('\n\n✅ ASSET GENERATION COMPLETE!');
  console.log('📁 Assets saved to: client/public/assets/');
  console.log('📋 Manifest saved to: client/public/assets/manifest.json');
  console.log('\n═══════════════════════════════════════════════════════════');
}

// Run the generation
generateAllAssets().catch(console.error);