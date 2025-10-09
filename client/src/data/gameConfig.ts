export const gameConfig = {
  // Game mechanics
  maxTurns: 50,
  criticalResourceThreshold: 10,
  gameEndResourceTotal: 80,
  
  // UI settings
  cardDisplayTime: 3000,
  transitionDuration: 1000,
  particleEffectDuration: 2000,
  
  // Audio settings
  backgroundMusicVolume: 0.3,
  sfxVolume: 0.8,
  
  // Visual settings
  cameraSettings: {
    position: [0, 2, 8],
    fov: 45,
    near: 0.1,
    far: 1000
  },
  
  // Time of day progression
  timeOfDayTurns: {
    morning: 0,
    afternoon: 15,
    night: 35
  },
  
  // Resource colors
  resourceColors: {
    popularity: '#ef4444',
    stability: '#3b82f6',
    media: '#8b5cf6',
    economy: '#059669'
  },
  
  // Game endings based on resource totals
  endings: {
    triumphant: { threshold: 280, title: "Triumphant Victory", description: "A legendary presidency remembered for generations." },
    successful: { threshold: 240, title: "Successful Term", description: "A competent leader who got things done." },
    moderate: { threshold: 200, title: "Moderate Success", description: "Mixed results with some notable achievements." },
    controversial: { threshold: 160, title: "Controversial Term", description: "A polarizing presidency with lasting debates." },
    struggling: { threshold: 120, title: "Struggling Administration", description: "Faced significant challenges and criticism." },
    disaster: { threshold: 0, title: "Political Disaster", description: "A cautionary tale for future leaders." }
  }
};

export const cardCategories = [
  'domestic',
  'foreign', 
  'economic',
  'social',
  'crisis'
] as const;

export type CardCategory = typeof cardCategories[number];
