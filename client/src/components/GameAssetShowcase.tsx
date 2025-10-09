import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Camera, Film, Music, Gamepad2, Image, Mic, 
  Video, Palette, Type, Box, Sparkles, ChevronRight 
} from 'lucide-react';

// Sample showcase of what we currently have
export default function GameAssetShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('characters');

  const assetCategories = [
    {
      id: 'characters',
      title: 'Character Portraits',
      icon: <Camera className="w-6 h-6" />,
      status: 'In Progress',
      count: '10 characters × 4 emotions',
      samples: [
        '/characters/rex-scaleston-3d.png',
        '/characters/donald-executive-3d.png',
        '/characters/potus-9000-3d.png',
        '/characters/alexandria-sanders-3d.png'
      ]
    },
    {
      id: 'scenes',
      title: 'Crisis Scenes',
      icon: <Film className="w-6 h-6" />,
      status: 'Generating',
      count: '5 backgrounds',
      description: 'Press conferences, Oval Office, Breaking News, Protests'
    },
    {
      id: 'music',
      title: 'Music & SFX',
      icon: <Music className="w-6 h-6" />,
      status: 'Planned',
      count: '15+ tracks',
      description: 'Main menu, gameplay, crisis themes, decision sounds'
    },
    {
      id: 'animations',
      title: 'Cinematics',
      icon: <Video className="w-6 h-6" />,
      status: 'Planned',
      count: 'Opening, endings, transitions',
      description: 'Opening sequence, multiple endings, scene transitions'
    },
    {
      id: 'ui',
      title: 'UI Elements',
      icon: <Palette className="w-6 h-6" />,
      status: 'Active',
      count: '50+ components',
      description: 'Cards, buttons, meters, alerts, overlays'
    },
    {
      id: 'fonts',
      title: '3D Marquee Fonts',
      icon: <Type className="w-6 h-6" />,
      status: 'Completed',
      count: '3 font families',
      description: 'Bungee Shade, Bungee Inline, Rubik Glitch'
    },
    {
      id: 'models',
      title: '3D Models',
      icon: <Box className="w-6 h-6" />,
      status: 'Planned',
      count: 'Props & items',
      description: 'Office props, podiums, flags, decorations'
    },
    {
      id: 'memes',
      title: 'Meme Wars',
      icon: <Sparkles className="w-6 h-6" />,
      status: 'Planned',
      count: 'Social media mockups',
      description: 'Tweet templates, viral memes, social reactions'
    }
  ];

  const currentAssets = {
    characters: [
      { name: "Rex Scaleston III", emotions: ["neutral", "happy", "angry", "stressed"], ready: true },
      { name: "Ronald T. Goldenberg", emotions: ["neutral", "happy"], ready: true },
      { name: "POTUS-9000", emotions: ["neutral"], ready: true },
      { name: "Alexandria Sanders-Warren", emotions: ["neutral"], ready: true },
      { name: "Richard M. Moneybags III", emotions: ["neutral"], ready: true }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="game-title text-6xl mb-4 text-white">
            Executive Disorder
          </h1>
          <p className="text-xl text-gray-300 mb-2">Professional Asset Production Status</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
              ✓ 40% Complete
            </div>
            <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
              🎨 AAA Quality Assets
            </div>
            <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full">
              🎮 Unity Ready
            </div>
          </div>
        </div>

        {/* Asset Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {assetCategories.map(category => (
            <Card 
              key={category.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedCategory === category.id 
                  ? 'ring-4 ring-yellow-400 bg-gray-800/95' 
                  : 'bg-gray-900/80 hover:bg-gray-800/90'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-start justify-between mb-4">
                {category.icon}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  category.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  category.status === 'Active' || category.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                  category.status === 'Generating' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {category.status}
                </span>
              </div>
              <h3 className="text-white font-bold mb-1">{category.title}</h3>
              <p className="text-gray-400 text-sm">{category.count}</p>
            </Card>
          ))}
        </div>

        {/* Character Showcase */}
        {selectedCategory === 'characters' && (
          <Card className="bg-gray-900/90 backdrop-blur p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Character Portrait System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl text-white mb-4">✅ Currently Generated:</h3>
                <ul className="space-y-2">
                  {currentAssets.characters.map(char => (
                    <li key={char.name} className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                      <span className="text-white">{char.name}</span>
                      <div className="flex gap-1">
                        {char.emotions.map(emotion => (
                          <span key={emotion} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-white mb-4">🎯 Target Quality:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="/assets/characters/main/rex-scaleston/neutral.png"
                      alt="Target quality"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/characters/rex-scaleston-3d.png';
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-2">Photorealistic Portrait</p>
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="/assets/characters/main/rex-scaleston/stressed.png"
                      alt="Stressed emotion"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/characters/rex-scaleston.png';
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-2">Emotional Variants</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Scenes Showcase */}
        {selectedCategory === 'scenes' && (
          <Card className="bg-gray-900/90 backdrop-blur p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Crisis Scene Backgrounds</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['Press Conference', 'Oval Office Crisis', 'Breaking News', 'Protests', 'War Room', 'Meme Wars'].map(scene => (
                <div key={scene} className="relative">
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Generating: {scene}</span>
                  </div>
                  <p className="text-white mt-2 text-sm">{scene}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mt-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur p-6">
          <h3 className="text-xl font-bold text-white mb-4">🚀 Asset Generation Pipeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">Active: Character portraits with emotions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400">Next: Crisis scenes & backgrounds</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400">Queue: Staff, stakeholders, UI</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}