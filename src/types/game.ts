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

export interface GameScore {
  gameId: string;
  playerId: string;
  playerName: string;
  score: number;
  time: number;
  moves: number;
  difficulty: string;
  date: string;
  platform: string;
  device: string;
  browser: string;
  isVerified: boolean;
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

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
  time: number;
  moves: number;
  difficulty: string;
  soundEnabled: boolean;
  musicEnabled: boolean;
  tutorialShown: boolean;
  achievements: GameAchievement[];
  currentLevel: number;
  lives: number;
  powerUps: string[];
  settings: {
    volume: number;
    language: string;
    theme: string;
    controls: string;
  };
} 