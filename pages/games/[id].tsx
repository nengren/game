import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import GameEmbed from '@/components/game/GameEmbed';
import { games } from '@/data/games';

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;

  // 在实际应用中，这里应该从API获取游戏数据
  const game = games.find(g => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">游戏未找到</h1>
          <p className="mt-4">抱歉，您请求的游戏不存在。</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{game.title} - Joy Grid</title>
        <meta name="description" content={game.description} />
        <meta name="keywords" content={`${game.title},${game.category},在线游戏,HTML5游戏`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 游戏基本信息 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-[400px]">
            <Image
              src={game.imageUrl}
              alt={game.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{game.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">游戏信息</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">开发商：</span>{game.developer}</p>
                  <p><span className="font-medium">发布日期：</span>{game.releaseDate}</p>
                  <p><span className="font-medium">游戏类型：</span>{game.category}</p>
                  <p><span className="font-medium">评分：</span>{game.rating}/5</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">游戏特点</h2>
                <ul className="list-disc list-inside space-y-2">
                  {game.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 游戏描述 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">游戏描述</h2>
          <p className="text-gray-600">{game.description}</p>
        </div>

        {/* 游戏截图 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">游戏截图</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {game.screenshots.map((screenshot, index) => (
              <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src={screenshot}
                  alt={`${game.title}截图${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 游戏视频 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">游戏预告片</h2>
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={game.videoUrl}
              title={`${game.title}预告片`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* 游戏嵌入 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">开始游戏</h2>
          <GameEmbed gameUrl={game.gameUrl} title={game.title} />
        </div>
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