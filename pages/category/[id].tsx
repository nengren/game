import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import GameCard from '@/components/game/GameCard';
import { games, categories } from '@/data/games';

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  // 获取分类信息
  const category = categories.find(c => c.id === id);
  
  // 获取该分类下的游戏
  const categoryGames = games.filter(game => 
    game.category.toLowerCase().includes(category?.name.toLowerCase() || '')
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">分类未找到</h1>
          <p className="mt-4">抱歉，您请求的分类不存在。</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{category.name}游戏 - Joy Grid</title>
        <meta name="description" content={`Joy Grid ${category.name}游戏列表，提供各种${category.name}类型的在线游戏。`} />
        <meta name="keywords" content={`${category.name}游戏,在线游戏,HTML5游戏`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 分类标题 */}
        <div className="flex items-center mb-8">
          <span className="text-4xl mr-4">{category.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}游戏</h1>
        </div>

        {/* 游戏网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryGames.map((game) => (
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

        {/* 无游戏提示 */}
        {categoryGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">暂无{category.name}类型的游戏。</p>
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