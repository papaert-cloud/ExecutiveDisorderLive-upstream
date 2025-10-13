import { Router } from "express";
import { getDropboxClient } from "../lib/dropbox";

const router = Router();

// Cache for loaded cards to avoid repeated Dropbox requests
let cardsCache: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// List files in a Dropbox folder
router.get("/list/:path(*)", async (req, res) => {
  try {
    const dbx = await getDropboxClient();
    const path = req.params.path ? `/${req.params.path}` : '';
    
    const response = await dbx.filesListFolder({ path });
    res.json(response.result);
  } catch (error: any) {
    console.error('Dropbox list error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a temporary link to a Dropbox file
router.get("/link/:path(*)", async (req, res) => {
  try {
    const dbx = await getDropboxClient();
    const path = `/${req.params.path}`;
    
    const response = await dbx.filesGetTemporaryLink({ path });
    res.json({ link: response.result.link });
  } catch (error: any) {
    console.error('Dropbox link error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Download a file from Dropbox
router.get("/download/:path(*)", async (req, res) => {
  try {
    const dbx = await getDropboxClient();
    const path = `/${req.params.path}`;
    
    const response = await dbx.filesDownload({ path });
    const fileBlob = (response.result as any).fileBinary;
    
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileBlob);
  } catch (error: any) {
    console.error('Dropbox download error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve image from Dropbox
router.get("/image/:path(*)", async (req, res) => {
  try {
    const dbx = await getDropboxClient();
    const path = `/${req.params.path}`;
    
    const response = await dbx.filesDownload({ path });
    const fileBlob = (response.result as any).fileBinary;
    
    // Determine content type from file extension
    const ext = path.split('.').pop()?.toLowerCase();
    const contentType = ext === 'png' ? 'image/png' : 
                       ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                       ext === 'gif' ? 'image/gif' :
                       ext === 'webp' ? 'image/webp' : 'image/png';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(fileBlob);
  } catch (error: any) {
    console.error('Dropbox image error:', error);
    // Return a 1x1 transparent PNG on error
    const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    res.setHeader('Content-Type', 'image/png');
    res.send(transparentPng);
  }
});

// Get JSON data from Dropbox
router.get("/json/:path(*)", async (req, res) => {
  try {
    const dbx = await getDropboxClient();
    const path = `/${req.params.path}`;
    
    const response = await dbx.filesDownload({ path });
    const fileBlob = (response.result as any).fileBinary;
    
    // Convert ArrayBuffer/Buffer to string properly
    let textContent: string;
    if (Buffer.isBuffer(fileBlob)) {
      textContent = fileBlob.toString('utf8');
    } else if (fileBlob instanceof ArrayBuffer) {
      textContent = Buffer.from(fileBlob).toString('utf8');
    } else {
      textContent = String(fileBlob);
    }
    
    // Parse JSON and return
    const jsonData = JSON.parse(textContent);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes cache
    res.json(jsonData);
  } catch (error: any) {
    console.error('Dropbox JSON error:', error);
    res.status(404).json({ error: 'JSON file not found', message: error.message });
  }
});

// Load all cards from Dropbox and convert to game format
router.get("/cards/all", async (req, res) => {
  try {
    // Check cache first
    const now = Date.now();
    if (cardsCache && (now - cacheTimestamp < CACHE_DURATION)) {
      console.log(`✅ Serving ${cardsCache.length} cards from cache`);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(cardsCache);
    }
    
    const dbx = await getDropboxClient();
    const cardsPath = '/Replit/ExecutiveDisorder_Assets/10_Game_Data/JSON/cards';
    
    // List all card files
    const listResponse = await dbx.filesListFolder({ path: cardsPath });
    const cardFiles = listResponse.result.entries.filter(entry => 
      entry['.tag'] === 'file' && entry.name.endsWith('.json')
    );
    
    console.log(`Found ${cardFiles.length} card files in Dropbox, converting...`);
    
    // Download and convert each card
    const gameCards = [];
    for (const file of cardFiles) {
      try {
        const filePath = (file as any).path_lower || (file as any).path_display;
        if (!filePath) continue;
        
        const downloadResponse = await dbx.filesDownload({ path: filePath });
        const fileBlob = (downloadResponse.result as any).fileBinary;
        
        let textContent: string;
        if (Buffer.isBuffer(fileBlob)) {
          textContent = fileBlob.toString('utf8');
        } else if (fileBlob instanceof ArrayBuffer) {
          textContent = Buffer.from(fileBlob).toString('utf8');
        } else {
          textContent = String(fileBlob);
        }
        
        const dropboxCard = JSON.parse(textContent);
        
        // Map theme to category
        const themeToCategory: Record<string, string> = {
          'economic_crisis': 'economic',
          'budget_crisis': 'economic',
          'trade_war': 'foreign',
          'diplomatic_disaster': 'foreign',
          'constitutional_crisis': 'domestic',
          'bureaucratic_nightmare': 'domestic',
          'legislative_chaos': 'domestic',
          'social_media': 'social',
          'culture_war': 'social',
          'nuclear_option': 'crisis',
          'war_games': 'crisis',
          'space_force_shenanigans': 'crisis',
          'military_industrial_complex': 'foreign'
        };
        
        const category = themeToCategory[dropboxCard.theme] || 'domestic';
        
        // Convert to game card format with safe defaults
        const choices = dropboxCard.choices || dropboxCard.options || [];
        
        const gameCard = {
          id: dropboxCard.id || file.name.replace('.json', ''),
          title: dropboxCard.title || 'Untitled Decision',
          description: dropboxCard.description || 'A critical decision awaits...',
          category: category,
          options: choices.map((choice: any) => {
            // Handle different field name variations
            const choiceText = choice.text || choice.choiceText || 'Make a choice';
            const effects = choice.effects || choice.resourceEffects || {};
            
            return {
              text: choiceText,
              effects: {
                popularity: effects.Popularity || effects.popularity || 0,
                stability: effects.Stability || effects.stability || 0,
                media: effects.MediaTrust || effects.media || 0,
                economy: effects.EconomicHealth || effects.economy || 0
              }
            };
          }).filter((opt: any) => opt && opt.text) // Remove any invalid options
        };
        
        gameCards.push(gameCard);
      } catch (error) {
        console.error(`Error processing card ${file.name}:`, error);
      }
    }
    
    console.log(`✅ Successfully converted ${gameCards.length} cards`);
    
    // Cache the results
    cardsCache = gameCards;
    cacheTimestamp = Date.now();
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(gameCards);
  } catch (error: any) {
    console.error('❌ Error loading cards from Dropbox:', error);
    res.status(500).json({ error: 'Failed to load cards', message: error.message });
  }
});

export default router;
