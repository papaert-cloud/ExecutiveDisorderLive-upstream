import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import audioRoutes from "./routes/audio";
import dropboxRoutes from "./routes/dropbox";
import videoRoutes from "./routes/video";

export async function registerRoutes(app: Express): Promise<Server> {
  // Audio generation routes
  app.use("/api/audio", audioRoutes);
  
  // Dropbox file access routes
  app.use("/api/dropbox", dropboxRoutes);
  
  // Video generation routes
  app.use("/api/video", videoRoutes);

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
