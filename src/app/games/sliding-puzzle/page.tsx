import React from 'react';
import SlidingPuzzle from '@/components/games/SlidingPuzzle';

export default function SlidingPuzzlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-400">
      <SlidingPuzzle difficulty="medium" />
    </div>
  );
} 