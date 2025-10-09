import React from "react";
import { useCharacters } from "../../lib/stores/useCharacters";
import { useGameState } from "../../lib/stores/useGameState";
import { characters } from "../../data/characters";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

// Helper function to get the right character image based on selected style
function getCharacterImage(characterId: string): string {
  // Check for 3D variant first
  const threeDVariant = `/characters/${characterId}-3d.png`;
  
  // Check for style preferences from A/B testing
  const savedStyles = localStorage.getItem('characterStyles');
  if (savedStyles) {
    try {
      const styles = JSON.parse(savedStyles);
      const selectedStyle = styles[characterId];
      if (selectedStyle) {
        // Use the selected style variant
        return `/characters/${characterId}-${selectedStyle}.png`;
      }
    } catch (e) {
      console.error('Failed to parse saved styles:', e);
    }
  }
  
  // Try 3D variant, then fallback to default portrait
  return threeDVariant;
}

export default function CharacterSelection2D() {
  const { selectedCharacter, setSelectedCharacter } = useCharacters();
  const { setGamePhase } = useGameState();

  const handleStartGame = () => {
    if (selectedCharacter) {
      console.log('Starting game with:', selectedCharacter.name);
      setGamePhase('playing');
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-8" style={{
      backgroundImage: 'url(/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="Executive Disorder" className="h-32 w-auto mb-4 drop-shadow-2xl" />
        <h1 className="game-title text-5xl font-bold text-white text-center mb-2">Choose Your Leader</h1>
        <p className="text-gray-300 text-center mb-2 text-lg drop-shadow-md">Select a political character to begin your campaign</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {characters.map((character) => (
          <Card
            key={character.id}
            className={`cursor-pointer transition-all transform hover:scale-105 ${
              selectedCharacter?.id === character.id
                ? 'ring-4 ring-yellow-400 bg-gray-800/95 shadow-2xl'
                : 'bg-gray-900/90 hover:bg-gray-800/95 backdrop-blur-sm'
            }`}
            onClick={() => setSelectedCharacter(character)}
          >
            <div className="p-4">
              <div className="w-full aspect-square rounded-lg mb-3 overflow-hidden">
                <img 
                  src={getCharacterImage(character.id)}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const sibling = e.currentTarget.nextSibling as HTMLElement;
                    sibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center text-4xl" style={{ backgroundColor: character.themeColor }}>
                  {character.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              </div>
              
              <h3 className="character-name text-white font-bold text-sm mb-1">{character.name}</h3>
              <p className="text-gray-400 text-xs mb-3">{character.title}</p>
              
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(character.startingStats).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between">
                    <span className="text-gray-400 capitalize">{stat.slice(0, 3)}:</span>
                    <span className="text-white font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedCharacter && (
        <Card className="bg-gray-900/95 backdrop-blur-md p-6 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="w-48 h-48 rounded-lg mx-auto mb-4 overflow-hidden shadow-2xl">
                <img 
                  src={getCharacterImage(selectedCharacter.id)}
                  alt={selectedCharacter.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const sibling = e.currentTarget.nextSibling as HTMLElement;
                    sibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center text-6xl" style={{ backgroundColor: selectedCharacter.themeColor }}>
                  {selectedCharacter.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="character-name text-3xl font-bold text-white mb-2">{selectedCharacter.name}</h2>
              <p className="text-gray-300 mb-4">{selectedCharacter.fullBio}</p>
              
              <h3 className="text-lg font-semibold text-white mb-2">Special Abilities</h3>
              <ul className="text-sm text-gray-300 mb-6">
                {selectedCharacter.abilities.map((ability: string, index: number) => (
                  <li key={index} className="mb-1">• {ability}</li>
                ))}
              </ul>
              
              <Button
                onClick={handleStartGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Start Campaign
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
