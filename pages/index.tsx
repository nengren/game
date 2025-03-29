import React from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GameCard from '@/components/game/GameCard';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';
import { games, categories } from '@/data/games';

export default function Home() {
  // 获取热门游戏（这里简单取前8个）
  const popularGames = games.slice(0, 8);
  // 获取最新游戏（这里取最后4个）
  const latestGames = games.slice(-4);
  // 获取今日推荐游戏（这里取第一个）
  const featuredGame = games[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Joy Grid - 你的游戏天堂</title>
        <meta name="description" content="Joy Grid是一个优质的游戏聚合平台，提供各种类型的在线游戏。" />
        <meta name="keywords" content="在线游戏,HTML5游戏,休闲游戏,策略游戏" />
        <meta property="og:title" content="Joy Grid - 你的游戏天堂" />
        <meta property="og:description" content="Joy Grid是一个优质的游戏聚合平台，提供各种类型的在线游戏。" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.joy-grid.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 特色轮播图 */}
        <FeaturedCarousel />

        {/* 今日推荐 */}
        <section className="mb-12">
          <h2 className="section-title">今日推荐</h2>
          <GameCard
            id={featuredGame.id}
            title={featuredGame.title}
            description={featuredGame.description}
            imageUrl={featuredGame.imageUrl}
            category={featuredGame.category}
            rating={featuredGame.rating}
            popularity={1000}
            releaseDate={featuredGame.releaseDate}
            isFeatured={true}
          />
        </section>

        {/* 最新游戏 */}
        <section className="mb-12">
          <h2 className="section-title">最新上线</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                category={game.category}
                rating={game.rating}
                popularity={800}
                releaseDate={game.releaseDate}
              />
            ))}
          </div>
        </section>

        {/* 热门游戏 */}
        <section className="mb-12">
          <h2 className="section-title">热门游戏</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                category={game.category}
                rating={game.rating}
                popularity={1200}
                releaseDate={game.releaseDate}
              />
            ))}
          </div>
        </section>

        {/* 游戏分类 */}
        <section>
          <h2 className="section-title">游戏分类</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="card p-4 text-center group hover:bg-primary/5 transition-colors"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-gray-900 font-medium">{category.name}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 