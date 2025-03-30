import fs from 'fs';
import path from 'path';

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructions: string;
  playUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  controls: {
    desktop: string;
    mobile: string;
  };
  features: string[];
  category: string;
  tags: string[];
  featured: boolean;
  shareImage: string;
}

export interface GamesData {
  games: Game[];
}

// Get all games
export async function getGames(): Promise<Game[]> {
  const filePath = path.join(process.cwd(), 'public/games/games.json');
  const jsonData = await fs.promises.readFile(filePath, 'utf8');
  const data: GamesData = JSON.parse(jsonData);
  return data.games;
}

// Get a specific game by slug
export async function getGameBySlug(slug: string): Promise<Game | null> {
  const games = await getGames();
  return games.find(game => game.slug === slug) || null;
}

// Get games by category
export async function getGamesByCategory(category: string): Promise<Game[]> {
  const games = await getGames();
  return games.filter(game => game.category === category);
}

// Get featured games
export async function getFeaturedGames(): Promise<Game[]> {
  const games = await getGames();
  return games.filter(game => game.featured);
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