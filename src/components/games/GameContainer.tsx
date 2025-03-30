import React from 'react';
import { theme } from '@/styles/theme';

interface GameContainerProps {
  children: React.ReactNode;
  title: string;
  description: string;
  controls: {
    desktop: string;
    mobile: string;
  };
  onShare?: () => void;
  isGameOver?: boolean;
  score?: number;
}

export default function GameContainer({
  children,
  title,
  description,
  controls,
  onShare,
  isGameOver,
  score,
}: GameContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/90">{description}</p>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="relative aspect-square max-w-2xl mx-auto">
            {children}
          </div>

          {/* Controls Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Desktop Controls</h3>
              <p className="text-sm text-gray-600">{controls.desktop}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Mobile Controls</h3>
              <p className="text-sm text-gray-600">{controls.mobile}</p>
            </div>
          </div>

          {/* Game Over State */}
          {isGameOver && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Over!</h2>
              {score !== undefined && (
                <p className="text-xl text-gray-600 mb-4">Score: {score}</p>
              )}
              {onShare && (
                <button
                  onClick={onShare}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Share Score
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 