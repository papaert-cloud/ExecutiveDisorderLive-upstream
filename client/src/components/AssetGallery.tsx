import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChevronLeft, ChevronRight, Download, Grid, List } from 'lucide-react';

interface AssetManifest {
  characters: {
    main: Array<{ id: string; name: string; emotions: string[] }>;
    staff: Array<{ id: string; name: string; description: string }>;
    stakeholders: Array<{ id: string; name: string; description: string }>;
    crisis: Array<{ id: string; name: string; description: string }>;
  };
  scenes: Array<{ id: string; desc: string }>;
  generated: string;
}

export default function AssetGallery() {
  const [manifest, setManifest] = useState<AssetManifest | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('characters');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load manifest
    fetch('/assets/manifest.json')
      .then(res => res.json())
      .then(data => setManifest(data))
      .catch(err => console.error('Failed to load manifest:', err));
  }, []);

  const renderCharacterGrid = () => {
    if (!manifest) return null;

    return (
      <div className="space-y-8">
        {/* Main Characters */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Main Characters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {manifest.characters.main.map(char => (
              <div key={char.id}>
                <h4 className="text-white font-semibold mb-2">{char.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {char.emotions.map(emotion => (
                    <Card 
                      key={emotion}
                      className="cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                      onClick={() => setSelectedImage(`/assets/characters/main/${char.id}/${emotion}.png`)}
                    >
                      <img 
                        src={`/assets/characters/main/${char.id}/${emotion}.png`}
                        alt={`${char.name} - ${emotion}`}
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = `/characters/${char.id}.png`; // Fallback
                        }}
                      />
                      <p className="text-xs text-center text-gray-400 p-1">{emotion}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Staff & Advisors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {manifest.characters.staff.map(staff => (
              <Card 
                key={staff.id}
                className="cursor-pointer hover:ring-2 hover:ring-blue-400"
                onClick={() => setSelectedImage(`/assets/characters/staff/${staff.id}.png`)}
              >
                <img 
                  src={`/assets/characters/staff/${staff.id}.png`}
                  alt={staff.name}
                  className="w-full h-40 object-cover rounded-t"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="p-2">
                  <p className="text-white font-semibold text-sm">{staff.name}</p>
                  <p className="text-gray-400 text-xs">{staff.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSceneGrid = () => {
    if (!manifest) return null;

    return (
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Crisis Scenes & Backgrounds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manifest.scenes.map(scene => (
            <Card 
              key={scene.id}
              className="cursor-pointer hover:ring-2 hover:ring-blue-400"
              onClick={() => setSelectedImage(`/assets/scenes/${scene.id}.png`)}
            >
              <img 
                src={`/assets/scenes/${scene.id}.png`}
                alt={scene.id}
                className="w-full h-64 object-cover rounded-t"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="p-4">
                <p className="text-white font-semibold">{scene.id.replace(/-/g, ' ').toUpperCase()}</p>
                <p className="text-gray-400 text-sm mt-1">{scene.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="game-title text-5xl mb-4 text-white">Executive Disorder Asset Gallery</h1>
          <p className="text-gray-300 text-lg">Professional Game Assets & Resources</p>
          {manifest && (
            <p className="text-gray-400 text-sm mt-2">
              Generated: {new Date(manifest.generated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* View Controls */}
        <div className="flex justify-end mb-6 gap-2">
          <Button
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Grid size={16} /> Grid View
          </Button>
          <Button
            onClick={() => setViewMode('list')}
            variant={viewMode === 'list' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <List size={16} /> List View
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="scenes">Scenes</TabsTrigger>
            <TabsTrigger value="ui">UI Elements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="mt-0">
            {renderCharacterGrid()}
          </TabsContent>
          
          <TabsContent value="scenes" className="mt-0">
            {renderSceneGrid()}
          </TabsContent>
          
          <TabsContent value="ui" className="mt-0">
            <Card className="p-8 bg-gray-800/50 backdrop-blur">
              <h3 className="text-xl text-white mb-4">UI Elements & Components</h3>
              <p className="text-gray-400">Card designs, buttons, transitions, and interface elements</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Crisis Alert Card</p>
                </div>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Decision Button</p>
                </div>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Resource Meter</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage} 
                alt="Preview"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <Button
                className="absolute top-4 right-4"
                onClick={(e) => {
                  e.stopPropagation();
                  const a = document.createElement('a');
                  a.href = selectedImage;
                  a.download = selectedImage.split('/').pop() || 'asset.png';
                  a.click();
                }}
              >
                <Download size={20} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}