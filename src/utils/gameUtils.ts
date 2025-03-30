import { GameState, Tile, GameScore, Position, Difficulty } from '@/types/game';

export const getGridSize = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 3;
    case 'medium':
      return 4;
    case 'hard':
      return 5;
    default:
      return 4;
  }
};

export const createInitialTiles = (gridSize: number): Tile[] => {
  const tiles: Tile[] = [];
  const totalTiles = gridSize * gridSize - 1; // One less for empty space

  for (let i = 0; i < totalTiles; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    tiles.push({
      id: i + 1,
      value: i + 1,
      currentPosition: { row, col },
      targetPosition: { row, col },
    });
  }

  return tiles;
};

export const shuffleTiles = (tiles: Tile[], gridSize: number): Tile[] => {
  const shuffled = [...tiles];
  let currentIndex = shuffled.length;

  // Fisher-Yates shuffle algorithm
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap positions
    const tempPosition = { ...shuffled[currentIndex].currentPosition };
    shuffled[currentIndex].currentPosition = { ...shuffled[randomIndex].currentPosition };
    shuffled[randomIndex].currentPosition = tempPosition;
  }

  // Ensure puzzle is solvable
  if (!isSolvable(shuffled, gridSize)) {
    // Swap first two tiles if puzzle is not solvable
    const tempPosition = { ...shuffled[0].currentPosition };
    shuffled[0].currentPosition = { ...shuffled[1].currentPosition };
    shuffled[1].currentPosition = tempPosition;
  }

  return shuffled;
};

const isSolvable = (tiles: Tile[], gridSize: number): boolean => {
  let inversions = 0;
  const flattenedTiles = tiles.map(tile => ({
    value: tile.value,
    position: tile.currentPosition.row * gridSize + tile.currentPosition.col,
  }));

  for (let i = 0; i < flattenedTiles.length - 1; i++) {
    for (let j = i + 1; j < flattenedTiles.length; j++) {
      if (
        flattenedTiles[i].value > flattenedTiles[j].value &&
        flattenedTiles[i].position < flattenedTiles[j].position
      ) {
        inversions++;
      }
    }
  }

  // For odd grid sizes, number of inversions must be even
  if (gridSize % 2 === 1) {
    return inversions % 2 === 0;
  }

  // For even grid sizes, number of inversions + row of empty space from bottom must be odd
  const emptyRow = gridSize - 1; // Empty space is always at the bottom right
  return (inversions + (gridSize - 1 - emptyRow)) % 2 === 1;
};

export const isPuzzleComplete = (tiles: Tile[]): boolean => {
  return tiles.every(
    tile =>
      tile.currentPosition.row === tile.targetPosition.row &&
      tile.currentPosition.col === tile.targetPosition.col
  );
};

export const calculateScore = (moves: number, time: number): number => {
  // Base score is 10000
  // Subtract 10 points per move
  // Subtract 5 points per second
  const baseScore = 10000;
  const movesPenalty = moves * 10;
  const timePenalty = time * 5;
  return Math.max(0, baseScore - movesPenalty - timePenalty);
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const STORAGE_KEY = 'sliding-puzzle-scores';

export const saveScore = (score: GameScore): void => {
  try {
    const scoresString = localStorage.getItem(STORAGE_KEY);
    const scores = scoresString ? JSON.parse(scoresString) : [];
    scores.push(score);
    scores.sort((a: GameScore, b: GameScore) => calculateScore(b.moves, b.time) - calculateScore(a.moves, a.time));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 10))); // Keep top 10 scores
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

export const getBestScore = (difficulty: string): GameScore | null => {
  try {
    const scoresString = localStorage.getItem(STORAGE_KEY);
    if (!scoresString) return null;

    const scores: GameScore[] = JSON.parse(scoresString);
    return scores.find(score => score.difficulty === difficulty) || null;
  } catch (error) {
    console.error('Error getting best score:', error);
    return null;
  }
};

export function isValidMove(
  emptyPosition: { row: number; col: number },
  tilePosition: { row: number; col: number }
): boolean {
  const rowDiff = Math.abs(emptyPosition.row - tilePosition.row);
  const colDiff = Math.abs(emptyPosition.col - tilePosition.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
} 