import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GameCard from '@/components/game/GameCard';
import { games, categories } from '@/data/games';

export default function SearchPage() {
  const router = useRouter();
  const { q, category, sort } = router.query;
  const [searchResults, setSearchResults] = useState<typeof games>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('relevance');

  // 处理搜索
  useEffect(() => {
    if (q) {
      let results = games.filter(game =>
        game.title.toLowerCase().includes((q as string).toLowerCase()) ||
        game.description.toLowerCase().includes((q as string).toLowerCase()) ||
        game.category.toLowerCase().includes((q as string).toLowerCase())
      );

      // 按分类筛选
      if (category) {
        results = results.filter(game =>
          game.category.toLowerCase() === (category as string).toLowerCase()
        );
      }

      // 排序
      switch (sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'date':
          results.sort((a, b) => 
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
          );
          break;
        case 'popularity':
          results.sort((a, b) => 1200 - 800); // 这里应该使用实际的流行度数据
          break;
        default:
          // 相关性排序（默认）
          results.sort((a, b) => {
            const aMatch = a.title.toLowerCase().includes((q as string).toLowerCase());
            const bMatch = b.title.toLowerCase().includes((q as string).toLowerCase());
            return bMatch ? 1 : -1;
          });
      }

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [q, category, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>搜索结果 - Joy Grid</title>
        <meta name="description" content={`Joy Grid搜索结果：${q}`} />
        <meta name="keywords" content={`${q},游戏搜索,在线游戏`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 搜索头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            搜索结果：{q}
          </h1>
          <p className="text-gray-600">
            找到 {searchResults.length} 个相关游戏
          </p>
        </div>

        {/* 筛选和排序 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* 分类筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                游戏分类
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  if (e.target.value) {
                    router.push({
                      pathname: '/search',
                      query: { ...router.query, category: e.target.value }
                    });
                  } else {
                    const { category, ...rest } = router.query;
                    router.push({
                      pathname: '/search',
                      query: rest
                    });
                  }
                }}
                className="search-input"
              >
                <option value="">全部分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 排序方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序方式
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  router.push({
                    pathname: '/search',
                    query: { ...router.query, sort: e.target.value }
                  });
                }}
                className="search-input"
              >
                <option value="relevance">相关性</option>
                <option value="rating">评分</option>
                <option value="date">发布日期</option>
                <option value="popularity">流行度</option>
              </select>
            </div>
          </div>
        </div>

        {/* 搜索结果 */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((game) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">未找到相关游戏</p>
            <p className="text-gray-500 mt-2">请尝试其他关键词</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 