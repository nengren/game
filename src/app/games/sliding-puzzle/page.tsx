import React from 'react';
import SlidingPuzzle from '@/components/games/SlidingPuzzle';
import GameLayout from '@/components/layouts/GameLayout';

export default function SlidingPuzzlePage() {
  return (
    <GameLayout>
      <div className="container mx-auto min-h-screen py-8">
        <SlidingPuzzle difficulty="medium" />
      </div>
    </GameLayout>
  );
} 