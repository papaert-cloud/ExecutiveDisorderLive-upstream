import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface StyleVariant {
  pixar?: { style: string; file: string };
  claymation?: { style: string; file: string };
  lowpoly?: { style: string; file: string };
  realistic3d?: { style: string; file: string };
  voxel?: { style: string; file: string };
}

interface CharacterManifest {
  [characterId: string]: StyleVariant;
}

export default function CharacterABTest() {
  const [manifest, setManifest] = useState<CharacterManifest>({});
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  
  const characterIds = Object.keys(manifest);
  const currentCharacterId = characterIds[currentCharacterIndex];
  const currentVariants = manifest[currentCharacterId] || {};
  const styleKeys = Object.keys(currentVariants);

  useEffect(() => {
    // Load the manifest
    fetch('/characters/manifest.json')
      .then(res => res.json())
      .then(data => {
        setManifest(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load character manifest:', err);
        setLoading(false);
      });
  }, []);

  const handleStyleSelect = (characterId: string, styleKey: string) => {
    setSelectedStyles(prev => ({
      ...prev,
      [characterId]: styleKey
    }));
  };

  const handleNext = () => {
    setCurrentCharacterIndex((prev) => 
      prev < characterIds.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentCharacterIndex((prev) => 
      prev > 0 ? prev - 1 : prev
    );
  };

  const handleSaveSelection = () => {
    // Save the selected styles to localStorage for now
    localStorage.setItem('characterStyles', JSON.stringify(selectedStyles));
    alert('Style preferences saved! The game will use your selected styles.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading character variants...</div>
      </div>
    );
  }

  if (characterIds.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">No character variants found. Please generate them first.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="game-title text-5xl mb-4 text-white">Character Style A/B Testing</h1>
          <p className="text-gray-300 text-lg">
            Choose your preferred 3D style for each character ({currentCharacterIndex + 1} of {characterIds.length})
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentCharacterIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft /> Previous
          </Button>
          
          <h2 className="character-name text-3xl text-white">
            {currentCharacterId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          
          <Button
            onClick={handleNext}
            disabled={currentCharacterIndex >= characterIds.length - 1}
            className="flex items-center gap-2"
          >
            Next <ChevronRight />
          </Button>
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {styleKeys.map((styleKey) => {
            const variant = currentVariants[styleKey as keyof StyleVariant];
            if (!variant) return null;
            
            const isSelected = selectedStyles[currentCharacterId] === styleKey;
            
            return (
              <Card
                key={styleKey}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-4 ring-yellow-400 transform scale-105' 
                    : 'hover:ring-2 hover:ring-purple-400'
                }`}
                onClick={() => handleStyleSelect(currentCharacterId, styleKey)}
              >
                <div className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <img 
                      src={`/${variant.file.replace('client/public/', '')}`}
                      alt={`${currentCharacterId} - ${variant.style}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">Image not generated</div>';
                      }}
                    />
                  </div>
                  <h3 className="text-white font-bold text-center text-sm">
                    {variant.style}
                  </h3>
                  {isSelected && (
                    <div className="text-center text-yellow-400 text-xs mt-2">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selection Summary */}
        <Card className="bg-gray-800/80 backdrop-blur-md p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Your Selections</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {characterIds.map((charId, index) => (
              <div 
                key={charId}
                className={`text-sm p-2 rounded ${
                  selectedStyles[charId] 
                    ? 'bg-green-600/30 text-green-400' 
                    : 'bg-gray-700/50 text-gray-400'
                }`}
              >
                <div className="font-semibold truncate">
                  {index + 1}. {charId.slice(0, 10)}...
                </div>
                <div className="text-xs">
                  {selectedStyles[charId] || 'Not selected'}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Save Button */}
        <div className="text-center">
          <Button 
            onClick={handleSaveSelection}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            disabled={Object.keys(selectedStyles).length < characterIds.length}
          >
            <Save className="mr-2" />
            Save Style Preferences ({Object.keys(selectedStyles).length}/{characterIds.length})
          </Button>
        </div>
      </div>
    </div>
  );
}