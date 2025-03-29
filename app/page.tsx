import { Metadata } from 'next';
import Link from 'next/link';
import GameCard from '@/components/GameCard';
import gamesData from '@/lib/data/games.json';

export const metadata: Metadata = {
  title: 'Joy Grid - 你的游戏天堂',
  description: 'Joy Grid是一个免费的游戏聚合平台，提供各种精彩的HTML5游戏。随时随地享受游戏乐趣！',
  keywords: 'HTML5游戏,在线游戏,免费游戏,休闲游戏',
  openGraph: {
    title: 'Joy Grid - 你的游戏天堂',
    description: 'Joy Grid是一个免费的游戏聚合平台，提供各种精彩的HTML5游戏。随时随地享受游戏乐趣！',
    url: 'https://www.joy-grid.com',
    siteName: 'Joy Grid',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Joy Grid',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* 英雄区域 */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到 Joy Grid
        </h1>
        <p className="text-xl text-gray-600">
          你的游戏天堂，随时随地享受精彩游戏体验
        </p>
      </section>

      {/* 游戏分类 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">游戏分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gamesData.categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* 热门游戏 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">热门游戏</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gamesData.games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              category={game.category}
            />
          ))}
        </div>
      </section>
    </main>
  );
} 