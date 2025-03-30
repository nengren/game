'use client';

import React, { useEffect, useRef, useState } from 'react';
import { theme } from '@/styles/theme';
import { audioManager } from '@/lib/audio';
import { gameStateManager } from '@/lib/gameState';
import GameContainer from './GameContainer';

interface Tile {
  id: number;
  value: number;
  x: number;
  y: number;
}

interface SlidingPuzzleProps {
  difficulty?: 'easy' | 'medium' | 'hard';
}

export default function SlidingPuzzle({ difficulty = 'medium' }: SlidingPuzzleProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [emptyTile, setEmptyTile] = useState<Tile | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const containerRef = useRef<HTMLDivElement>(null);

  const gridSize = {
    easy: 3,
    medium: 4,
    hard: 5,
  }[selectedDifficulty];

  const initializePuzzle = () => {
    const totalTiles = gridSize * gridSize;
    const numbers = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    
    // 随机打乱数字
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // 创建拼图方块
    const newTiles: Tile[] = [];
    for (let i = 0; i < totalTiles - 1; i++) {
      newTiles.push({
        id: i,
        value: numbers[i],
        x: i % gridSize,
        y: Math.floor(i / gridSize),
      });
    }

    // 添加空白方块
    const empty: Tile = {
      id: totalTiles - 1,
      value: 0,
      x: gridSize - 1,
      y: gridSize - 1,
    };

    setTiles(newTiles);
    setEmptyTile(empty);
    setIsSolved(false);
    setMoves(0);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  useEffect(() => {
    initializePuzzle();
    gameStateManager.startGame(selectedDifficulty);
    audioManager.loadSound('move', '/sounds/move.mp3');
    audioManager.loadSound('complete', '/sounds/complete.mp3');
    audioManager.loadMusic('/music/puzzle.mp3');
    audioManager.playMusic();
  }, [selectedDifficulty]);

  useEffect(() => {
    if (startTime && !isSolved) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, isSolved]);

  const checkSolution = () => {
    const isCorrect = tiles.every(
      (tile) => tile.value === tile.y * gridSize + tile.x + 1
    );
    if (isCorrect) {
      setIsSolved(true);
      audioManager.playSound('complete');
      gameStateManager.endGame();
      gameStateManager.saveScore({
        gameId: 'sliding-puzzle',
        playerId: 'anonymous',
        playerName: 'Anonymous',
        score: calculateScore(),
        time: elapsedTime,
        moves,
        difficulty: selectedDifficulty,
        isVerified: false,
      });
    }
  };

  const calculateScore = () => {
    const baseScore = 1000;
    const timePenalty = elapsedTime * 10;
    const movesPenalty = moves * 5;
    return Math.max(0, baseScore - timePenalty - movesPenalty);
  };

  const moveTile = (tile: Tile) => {
    if (!emptyTile || isSolved) return;

    const dx = Math.abs(tile.x - emptyTile.x);
    const dy = Math.abs(tile.y - emptyTile.y);

    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
      const newTiles = tiles.map((t) => {
        if (t.id === tile.id) {
          return { ...t, x: emptyTile.x, y: emptyTile.y };
        }
        return t;
      });

      const newEmptyTile = { ...emptyTile, x: tile.x, y: tile.y };

      setTiles(newTiles);
      setEmptyTile(newEmptyTile);
      setMoves((m) => m + 1);
      audioManager.playSound('move');
      gameStateManager.incrementMoves();
      checkSolution();
    }
  };

  const handleTouchStart = (e: React.TouchEvent, tile: Tile) => {
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart) return;

    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;

    if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
      const tile = tiles.find(
        (t) =>
          t.x === Math.floor((e.touches[0].clientX / containerRef.current!.offsetWidth) * gridSize) &&
          t.y === Math.floor((e.touches[0].clientY / containerRef.current!.offsetHeight) * gridSize)
      );

      if (tile) {
        moveTile(tile);
      }

      setIsDragging(false);
      setDragStart(null);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!emptyTile || isSolved) return;

    let targetTile: Tile | undefined;

    switch (e.key) {
      case 'ArrowUp':
        targetTile = tiles.find(
          (t) => t.x === emptyTile.x && t.y === emptyTile.y + 1
        );
        break;
      case 'ArrowDown':
        targetTile = tiles.find(
          (t) => t.x === emptyTile.x && t.y === emptyTile.y - 1
        );
        break;
      case 'ArrowLeft':
        targetTile = tiles.find(
          (t) => t.x === emptyTile.x + 1 && t.y === emptyTile.y
        );
        break;
      case 'ArrowRight':
        targetTile = tiles.find(
          (t) => t.x === emptyTile.x - 1 && t.y === emptyTile.y
        );
        break;
    }

    if (targetTile) {
      moveTile(targetTile);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emptyTile, tiles, isSolved]);

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(newDifficulty);
    initializePuzzle();
  };

  return (
    <GameContainer
      title="Sliding Puzzle"
      description="Arrange the tiles in numerical order by sliding them into the empty space."
      controls={{
        desktop: "Use arrow keys to move tiles",
        mobile: "Touch and drag tiles to move them",
      }}
      onShare={() => {
        // Share functionality will be implemented later
      }}
      isGameOver={isSolved}
      score={calculateScore()}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Joy Game Grid</h1>
        <p className="text-white/90">Challenge yourself with this fun number puzzle game. Arrange the numbers in order by sliding tiles into the empty space.</p>
      </div>

      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => handleDifficultyChange('easy')}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedDifficulty === 'easy'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          3x3
        </button>
        <button
          onClick={() => handleDifficultyChange('medium')}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedDifficulty === 'medium'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          4x4
        </button>
        <button
          onClick={() => handleDifficultyChange('hard')}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedDifficulty === 'hard'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          5x5
        </button>
      </div>

      <div className="mb-4 flex justify-center gap-8">
        <div className="bg-white rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">{moves}</div>
          <div className="text-sm text-gray-600">Moves</div>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">{elapsedTime}s</div>
          <div className="text-sm text-gray-600">Time</div>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">-</div>
          <div className="text-sm text-gray-600">Best Score</div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-square w-full bg-white rounded-xl shadow-lg overflow-hidden"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="absolute bg-gradient-to-br from-teal-400 to-blue-500 text-white text-2xl font-bold flex items-center justify-center rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              left: `${(tile.x * 100) / gridSize}%`,
              top: `${(tile.y * 100) / gridSize}%`,
              transform: isDragging ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => moveTile(tile)}
            onTouchStart={(e) => handleTouchStart(e, tile)}
          >
            {tile.value}
          </div>
        ))}
        {emptyTile && (
          <div
            className="absolute bg-gray-100 rounded-lg"
            style={{
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              left: `${(emptyTile.x * 100) / gridSize}%`,
              top: `${(emptyTile.y * 100) / gridSize}%`,
            }}
          />
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={initializePuzzle}
          className="px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors duration-200"
        >
          New Game
        </button>
      </div>
    </GameContainer>
  );
} 