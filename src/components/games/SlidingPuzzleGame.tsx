'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Tile, GameState, GameSettings } from '@/types/game';
import {
  createInitialTiles,
  shuffleTiles,
  isValidMove,
  isPuzzleComplete,
  calculateScore,
  formatTime,
  saveScore,
  getBestScore,
  getGridSize,
} from '@/utils/gameUtils';

interface SlidingPuzzleGameProps {
  onComplete?: (score: number) => void;
}

export default function SlidingPuzzleGame({ onComplete }: SlidingPuzzleGameProps) {
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'medium',
    isSoundEnabled: true,
    isTimerEnabled: true,
  });

  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    emptyTilePosition: { row: 0, col: 0 },
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    gridSize: getGridSize(settings.difficulty),
  });

  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const gridSize = getGridSize(settings.difficulty);
    const initialTiles = createInitialTiles(gridSize);
    const shuffledTiles = shuffleTiles(initialTiles, gridSize);

    setGameState({
      tiles: shuffledTiles,
      emptyTilePosition: { row: gridSize - 1, col: gridSize - 1 },
      moves: 0,
      timeElapsed: 0,
      isComplete: false,
      gridSize,
    });

    setIsActive(true);
    const best = getBestScore(settings.difficulty);
    setBestScore(best ? calculateScore(best.moves, best.time) : null);
  }, [settings.difficulty]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !gameState.isComplete && settings.isTimerEnabled) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, gameState.isComplete, settings.isTimerEnabled]);

  // Initialize game on mount and difficulty change
  useEffect(() => {
    initializeGame();
  }, [settings.difficulty, initializeGame]);

  // Handle tile click
  const handleTileClick = (tile: Tile) => {
    if (gameState.isComplete) return;

    const { row: emptyRow, col: emptyCol } = gameState.emptyTilePosition;
    const { row: tileRow, col: tileCol } = tile.currentPosition;

    if (Math.abs(emptyRow - tileRow) + Math.abs(emptyCol - tileCol) === 1) {
      const newTiles = gameState.tiles.map(t => {
        if (t.id === tile.id) {
          return {
            ...t,
            currentPosition: { ...gameState.emptyTilePosition },
          };
        }
        return t;
      });

      const newState = {
        ...gameState,
        tiles: newTiles,
        emptyTilePosition: tile.currentPosition,
        moves: gameState.moves + 1,
      };

      if (isPuzzleComplete(newTiles)) {
        newState.isComplete = true;
        setIsActive(false);
        const score = calculateScore(newState.moves, newState.timeElapsed);
        saveScore({
          moves: newState.moves,
          time: newState.timeElapsed,
          date: new Date().toISOString(),
          difficulty: settings.difficulty,
        });
        onComplete?.(score);
      }

      setGameState(newState);
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isComplete) return;

      const { row, col } = gameState.emptyTilePosition;
      let targetPosition;

      switch (e.key) {
        case 'ArrowUp':
          targetPosition = { row: row - 1, col };
          break;
        case 'ArrowDown':
          targetPosition = { row: row + 1, col };
          break;
        case 'ArrowLeft':
          targetPosition = { row, col: col - 1 };
          break;
        case 'ArrowRight':
          targetPosition = { row, col: col + 1 };
          break;
        default:
          return;
      }

      const tileToMove = gameState.tiles.find(
        t =>
          t.currentPosition.row === targetPosition.row &&
          t.currentPosition.col === targetPosition.col
      );

      if (tileToMove) {
        handleTileClick(tileToMove);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">数字华容道</h1>
        <p className="text-white/90">
          通过滑动方块，将数字按顺序排列。
        </p>
      </div>

      <div className="mb-4 flex justify-center gap-4">
        {(['easy', 'medium', 'hard'] as const).map(difficulty => (
          <button
            key={difficulty}
            onClick={() => setSettings(prev => ({ ...prev, difficulty }))}
            className={`px-4 py-2 rounded-lg font-medium ${
              settings.difficulty === difficulty
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {difficulty === 'easy' ? '3x3' : difficulty === 'medium' ? '4x4' : '5x5'}
          </button>
        ))}
      </div>

      <div className="mb-4 flex justify-center gap-8">
        <div className="bg-white rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">{gameState.moves}</div>
          <div className="text-sm text-gray-600">步数</div>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {formatTime(gameState.timeElapsed)}
          </div>
          <div className="text-sm text-gray-600">时间</div>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {bestScore ? bestScore : '-'}
          </div>
          <div className="text-sm text-gray-600">最高分</div>
        </div>
      </div>

      <div className="relative aspect-square w-full bg-white rounded-xl shadow-lg overflow-hidden p-2">
        <div className="relative w-full h-full">
          {gameState.tiles.map(tile => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              className="absolute bg-gradient-to-br from-teal-400 to-blue-500 text-white text-2xl font-bold flex items-center justify-center rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              style={{
                width: `${96 / gameState.gridSize}%`,
                height: `${96 / gameState.gridSize}%`,
                left: `${(tile.currentPosition.col * 96) / gameState.gridSize + 2}%`,
                top: `${(tile.currentPosition.row * 96) / gameState.gridSize + 2}%`,
                fontSize: `${24 / gameState.gridSize}rem`,
              }}
            >
              {tile.value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors duration-200"
        >
          重新开始
        </button>
      </div>
    </div>
  );
} 