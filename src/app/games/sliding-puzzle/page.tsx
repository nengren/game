import React from 'react';
import GameLayout from '@/components/layouts/GameLayout';
import SlidingPuzzleGame from '@/components/games/SlidingPuzzleGame';

export default function SlidingPuzzlePage() {
  return (
    <GameLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-400 py-8">
        <SlidingPuzzleGame />
      </div>
    </GameLayout>
  );
} 