import { Router } from "express";
import { getDropboxClient } from "../lib/dropbox";

const router = Router();

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

export default router;
