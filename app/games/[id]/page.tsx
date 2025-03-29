import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import GameEmbed from '@/components/GameEmbed';
import gamesData from '@/lib/data/games.json';

interface GamePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = gamesData.games.find((g) => g.id === params.id);
  
  if (!game) {
    return {
      title: '游戏未找到 - Joy Grid',
      description: '抱歉，您请求的游戏不存在。',
    };
  }

  return {
    title: `${game.title} - Joy Grid`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Joy Grid`,
      description: game.description,
      images: [
        {
          url: game.imageUrl,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = gamesData.games.find((g) => g.id === params.id);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
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
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
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

        <GameEmbed
          embedUrl={game.embedUrl}
          title={game.title}
        />
      </div>
    </main>
  );
} 