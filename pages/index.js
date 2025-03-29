import Layout from '@/components/layout';
import GameCard from '@/components/gameCard';
import Link from 'next/link';

export default function Home({ games, categories }) {
  return (
    <Layout>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
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
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await import('@/public/data/games.json');
  
  return {
    props: {
      games: data.games,
      categories: data.categories,
    },
  };
} 