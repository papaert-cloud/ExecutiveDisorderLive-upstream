import React, { useState, useEffect } from "react";
import { useGameState } from "../../lib/stores/useGameState";
import { useCharacters } from "../../lib/stores/useCharacters";
import { useResources } from "../../lib/stores/useResources";
import { decisionCards } from "../../data/cards.ts";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

export default function GameplayScene2D() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { turn, nextTurn, endGame } = useGameState();
  const { selectedCharacter } = useCharacters();
  const { resources, updateResources } = useResources();

  const currentCard = decisionCards[currentCardIndex] || null;

  const handleDecision = (option: any) => {
    console.log('Decision made:', option.text);
    
    // Apply resource changes
    updateResources(option.effects);
    
    // Move to next card
    const nextIndex = (currentCardIndex + 1) % decisionCards.length;
    setCurrentCardIndex(nextIndex);
    
    // Advance turn
    nextTurn();

    // Check for game end conditions
    const totalResources = Object.values(resources).reduce((sum: number, val: number) => sum + val, 0);
    if (totalResources <= 100 || turn >= 50) {
      setTimeout(() => endGame(), 1000);
    }
  };

  if (!selectedCharacter || !currentCard) {
    return null;
  }

  const resourceConfig = [
    { key: 'popularity', color: '#ef4444', icon: '👥', label: 'Popularity' },
    { key: 'stability', color: '#3b82f6', icon: '🛡️', label: 'Stability' },
    { key: 'media', color: '#8b5cf6', icon: '📺', label: 'Media' },
    { key: 'economy', color: '#059669', icon: '💰', label: 'Economy' }
  ];

  return (
    <div className="w-full h-full overflow-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
          <p className="text-gray-400">Turn {turn} / 50</p>
        </div>
        
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: selectedCharacter.themeColor }}
        >
          {selectedCharacter.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {resourceConfig.map((config) => {
          const value = resources[config.key as keyof typeof resources];
          const barColor = value < 25 ? '#dc2626' : value < 50 ? '#f59e0b' : config.color;

          return (
            <Card key={config.key} className="bg-gray-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{config.icon}</span>
                <span className="text-2xl font-bold text-white">{Math.round(value)}</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{config.label}</p>
              <Progress value={value} className="h-2" style={{ backgroundColor: barColor }} />
            </Card>
          );
        })}
      </div>

      {/* Decision Card */}
      <Card className="bg-gray-800 p-6 max-w-3xl mx-auto">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
          currentCard.category === 'crisis' ? 'bg-red-600 text-white' :
          currentCard.category === 'economic' ? 'bg-green-600 text-white' :
          currentCard.category === 'foreign' ? 'bg-blue-600 text-white' :
          currentCard.category === 'social' ? 'bg-purple-600 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {currentCard.category.toUpperCase()}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">{currentCard.title}</h3>
        <p className="text-gray-300 mb-6">{currentCard.description}</p>

        <div className="space-y-3">
          {currentCard.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleDecision(option)}
              variant="outline"
              className="w-full text-left justify-start h-auto py-4 px-4 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              <div className="w-full">
                <p className="mb-2">{option.text}</p>
                <div className="flex gap-3 text-xs">
                  {Object.entries(option.effects).map(([resource, value]) => {
                    const effectColor = (value as number) > 0 ? 'text-green-400' : 'text-red-400';
                    const effectSign = (value as number) > 0 ? '+' : '';
                    
                    return (
                      <span key={resource} className={effectColor}>
                        {resource.slice(0, 3)}: {effectSign}{value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
