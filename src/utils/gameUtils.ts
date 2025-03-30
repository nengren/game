import { GameState, Tile, GameScore } from '@/types/game';

export function createInitialTiles(gridSize: number): Tile[] {
  const tiles: Tile[] = [];
  const totalTiles = gridSize * gridSize;

  for (let i = 0; i < totalTiles - 1; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    tiles.push({
      id: i + 1,
      value: i + 1,
      currentPosition: { row, col },
      correctPosition: { row, col },
    });
  }

  return tiles;
}

export function shuffleTiles(tiles: Tile[], gridSize: number): Tile[] {
  const shuffled = [...tiles];
  let currentIndex = shuffled.length;

  // Fisher-Yates shuffle algorithm
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap positions
    const tempPos = { ...shuffled[currentIndex].currentPosition };
    shuffled[currentIndex].currentPosition = { ...shuffled[randomIndex].currentPosition };
    shuffled[randomIndex].currentPosition = tempPos;
  }

  // Ensure the puzzle is solvable
  if (!isSolvable(shuffled, gridSize)) {
    // Swap last two tiles to make it solvable
    const lastIndex = shuffled.length - 1;
    const secondLastIndex = lastIndex - 1;
    const tempPos = { ...shuffled[lastIndex].currentPosition };
    shuffled[lastIndex].currentPosition = { ...shuffled[secondLastIndex].currentPosition };
    shuffled[secondLastIndex].currentPosition = tempPos;
  }

  return shuffled;
}

export function isSolvable(tiles: Tile[], gridSize: number): boolean {
  let inversions = 0;
  const flatTiles = tiles.map(tile => ({
    value: tile.value,
    position: tile.currentPosition.row * gridSize + tile.currentPosition.col
  }));

  for (let i = 0; i < flatTiles.length - 1; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i].value > flatTiles[j].value && 
          flatTiles[i].position < flatTiles[j].position) {
        inversions++;
      }
    }
  }

  // For odd grid sizes, the number of inversions must be even for the puzzle to be solvable
  if (gridSize % 2 === 1) {
    return inversions % 2 === 0;
  }

  // For even grid sizes, the puzzle is solvable if:
  // - the empty tile is on an even row from the bottom and inversions is odd, or
  // - the empty tile is on an odd row from the bottom and inversions is even
  const emptyRow = gridSize - 1;
  const rowFromBottom = gridSize - emptyRow;
  return rowFromBottom % 2 === inversions % 2;
}

export function isValidMove(
  emptyPosition: { row: number; col: number },
  tilePosition: { row: number; col: number }
): boolean {
  const rowDiff = Math.abs(emptyPosition.row - tilePosition.row);
  const colDiff = Math.abs(emptyPosition.col - tilePosition.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

export function isPuzzleComplete(tiles: Tile[]): boolean {
  return tiles.every(tile => 
    tile.currentPosition.row === tile.correctPosition.row &&
    tile.currentPosition.col === tile.correctPosition.col
  );
}

export function calculateScore(moves: number, timeElapsed: number): number {
  const baseScore = 10000;
  const movesPenalty = moves * 10;
  const timePenalty = timeElapsed * 5;
  return Math.max(0, baseScore - movesPenalty - timePenalty);
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function saveScore(score: GameScore): void {
  const scores = getScores();
  scores.push(score);
  scores.sort((a, b) => {
    if (a.moves === b.moves) {
      return a.time - b.time;
    }
    return a.moves - b.moves;
  });
  localStorage.setItem('slidingPuzzleScores', JSON.stringify(scores));
}

export function getScores(): GameScore[] {
  const scoresJson = localStorage.getItem('slidingPuzzleScores');
  return scoresJson ? JSON.parse(scoresJson) : [];
}

export function getBestScore(difficulty: string): GameScore | null {
  const scores = getScores().filter(score => score.difficulty === difficulty);
  return scores.length > 0 ? scores[0] : null;
}

export function getGridSize(difficulty: 'easy' | 'medium' | 'hard'): number {
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
} 