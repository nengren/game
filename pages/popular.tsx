import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import GameCard from '@/components/game/GameCard';
import { games } from '@/data/games';

export default function PopularGames() {
  const [page, setPage] = useState(1);
  const gamesPerPage = 12;
  const totalPages = Math.ceil(games.length / gamesPerPage);

  // 在实际应用中，这里应该从API获取分页数据
  const paginatedGames = games.slice(0, page * gamesPerPage);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>热门游戏 - Joy Grid</title>
        <meta name="description" content="Joy Grid热门游戏列表，包含最受欢迎和最新上线的游戏。" />
        <meta name="keywords" content="热门游戏,在线游戏,HTML5游戏" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">热门游戏</h1>

        {/* 游戏网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedGames.map((game) => (
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

        {/* 加载更多按钮 */}
        {page < totalPages && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              加载更多
            </button>
          </div>
        )}
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