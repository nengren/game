import Layout from '@/components/layout';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function GamePage({ game }) {
  if (!game) {
    return (
      <Layout title="游戏未找到 - Joy Grid">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">游戏未找到</h1>
          <p className="text-gray-600 mb-4">抱歉，您请求的游戏不存在。</p>
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            返回首页
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${game.title} - Joy Grid`}>
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        返回首页
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{game.title}</h1>
        <p className="text-gray-600 mb-6">{game.description}</p>
        
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {game.category}
          </span>
        </div>

        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={game.embedUrl}
            title={game.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await import('@/public/data/games.json');
  const paths = data.games.map((game) => ({
    params: { id: game.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await import('@/public/data/games.json');
  const game = data.games.find((g) => g.id === params.id);

  return {
    props: {
      game,
    },
  };
} 