import React from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import GameCard from '@/components/game/GameCard';
import { games, categories } from '@/data/games';

export default function Home() {
  // 获取热门游戏（这里简单取前5个）
  const popularGames = games.slice(0, 5);
  // 获取今日推荐游戏（这里取第一个）
  const featuredGame = games[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Joy Grid - 你的游戏天堂</title>
        <meta name="description" content="Joy Grid是一个优质的游戏聚合平台，提供各种类型的在线游戏。" />
        <meta name="keywords" content="在线游戏,HTML5游戏,休闲游戏,策略游戏" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 今日推荐 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">今日推荐</h2>
          <GameCard
            id={featuredGame.id}
            title={featuredGame.title}
            description={featuredGame.description}
            imageUrl={featuredGame.imageUrl}
            category={featuredGame.category}
            isFeatured={true}
          />
        </section>

        {/* 热门游戏 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">热门游戏</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGames.map((game) => (
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

        {/* 游戏分类 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">游戏分类</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.id}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-gray-900 font-medium">{category.name}</div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 Joy Grid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 