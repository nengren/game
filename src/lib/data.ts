import fs from 'fs';
import path from 'path';
import { Game } from '@/types/game';

export interface GamesData {
  games: Game[];
}

// Get all games
export async function getGames(): Promise<Game[]> {
  // In a real application, this would fetch from an API
  return games;
}

// Get a specific game by slug
export async function getGameBySlug(slug: string): Promise<Game | null> {
  const games = await getGames();
  return games.find((game) => game.id === slug) || null;
}

// Get games by category
export async function getGamesByCategory(category: string): Promise<Game[]> {
  const games = await getGames();
  return games.filter(game => game.category === category);
}

// Get featured games
export async function getFeaturedGames(): Promise<Game[]> {
  const games = await getGames();
  return games.slice(0, 3); // Return first 3 games as featured
}

// Generate share image URL
export function generateShareImageUrl(game: Game): string {
  return game.shareImage || game.imageUrl;
}

// Generate share text
export function generateShareText(game: Game): string {
  return `🎮 Check out ${game.title} on Joy Game Grid! Can you beat my score?`;
}

// Generate social media share URLs
export function generateSocialShareUrls(game: Game, shareText: string): Record<string, string> {
  const url = `https://joy-grid.com${game.playUrl}`;
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`
  };
}

const games: Game[] = [
  {
    id: 'sliding-puzzle',
    title: 'Sliding Puzzle',
    description: 'Arrange the tiles in numerical order by sliding them into the empty space.',
    category: 'Puzzle',
    tags: ['Puzzle', 'Brain Teaser', 'Single Player'],
    imageUrl: '/images/games/sliding-puzzle.jpg',
    thumbnailUrl: '/images/games/sliding-puzzle-thumb.jpg',
    playUrl: '/games/sliding-puzzle',
    controls: {
      desktop: 'Use arrow keys to move tiles',
      mobile: 'Touch and drag tiles to move them',
    },
    features: [
      'Three difficulty levels',
      'Timer and move counter',
      'Score tracking',
      'Sound effects',
      'Responsive design',
    ],
    difficulty: 'medium',
    minPlayers: 1,
    maxPlayers: 1,
    isMultiplayer: false,
    hasLeaderboard: true,
    hasAchievements: true,
    hasSound: true,
    hasMusic: true,
    hasTutorial: true,
    releaseDate: '2024-03-20',
    lastUpdated: '2024-03-20',
    version: '1.0.0',
    developer: 'Joy Grid',
    publisher: 'Joy Grid',
    license: 'MIT',
    rating: 4.5,
    playCount: 0,
    averagePlayTime: 5,
    minimumAge: 7,
    languages: ['en'],
    platforms: ['web'],
    requirements: {
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      os: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
      device: ['desktop', 'mobile', 'tablet'],
    },
    social: {
      facebook: 'https://facebook.com/joygrid',
      twitter: 'https://twitter.com/joygrid',
      instagram: 'https://instagram.com/joygrid',
      discord: 'https://discord.gg/joygrid',
    },
    analytics: {
      googleAnalytics: 'UA-XXXXXXXXX-X',
      facebookPixel: 'XXXXXXXXXX',
    },
    seo: {
      title: 'Sliding Puzzle - Joy Grid Games',
      description: 'Play the classic sliding puzzle game online. Arrange numbered tiles in order by sliding them into the empty space.',
      keywords: ['sliding puzzle', 'number puzzle', 'brain game', 'online game'],
      ogImage: '/images/games/sliding-puzzle-og.jpg',
      ogTitle: 'Sliding Puzzle - Joy Grid Games',
      ogDescription: 'Play the classic sliding puzzle game online. Arrange numbered tiles in order by sliding them into the empty space.',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Sliding Puzzle - Joy Grid Games',
      twitterDescription: 'Play the classic sliding puzzle game online. Arrange numbered tiles in order by sliding them into the empty space.',
      twitterImage: '/images/games/sliding-puzzle-og.jpg',
    },
  },
]; 