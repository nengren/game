export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  thumbnailUrl: string;
  playUrl: string;
  controls: {
    desktop: string;
    mobile: string;
  };
  features: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  minPlayers: number;
  maxPlayers: number;
  isMultiplayer: boolean;
  hasLeaderboard: boolean;
  hasAchievements: boolean;
  hasSound: boolean;
  hasMusic: boolean;
  hasTutorial: boolean;
  releaseDate: string;
  lastUpdated: string;
  version: string;
  developer: string;
  publisher: string;
  license: string;
  rating: number;
  playCount: number;
  averagePlayTime: number;
  minimumAge: number;
  languages: string[];
  platforms: string[];
  requirements: {
    browser: string[];
    os: string[];
    device: string[];
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    discord: string;
  };
  analytics: {
    googleAnalytics: string;
    facebookPixel: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
}

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  id: number;
  value: number;
  currentPosition: Position;
  targetPosition: Position;
}

export interface GameState {
  tiles: Tile[];
  emptyTilePosition: Position;
  moves: number;
  timeElapsed: number;
  isComplete: boolean;
  gridSize: number;
}

export interface GameScore {
  moves: number;
  time: number;
  date: string;
  difficulty: string;
}

export interface GameAchievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  isSecret: boolean;
  unlockedAt?: string;
}

export interface GameLeaderboard {
  gameId: string;
  difficulty: string;
  timeRange: 'daily' | 'weekly' | 'monthly' | 'allTime';
  scores: GameScore[];
  lastUpdated: string;
}

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  isSoundEnabled: boolean;
  isTimerEnabled: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameStats {
  bestScore: number;
  bestTime: number;
  totalGames: number;
  totalMoves: number;
  totalTime: number;
  winRate: number;
} 