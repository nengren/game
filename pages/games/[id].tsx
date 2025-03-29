import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/layout/Header';

const GameDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // 模拟游戏数据
  const game = {
    id: 1,
    title: '超级冒险',
    developer: '游戏工作室',
    releaseDate: '2024-03-01',
    genre: '动作冒险',
    rating: 4.5,
    description: '这是一个激动人心的冒险游戏，玩家将在游戏中探索神秘的世界，解开各种谜题，战胜强大的敌人。游戏具有精美的画面和流畅的操作体验。',
    features: [
      '精美的3D画面',
      '流畅的操作体验',
      '丰富的剧情内容',
      '多样的游戏玩法'
    ],
    screenshots: [
      '/images/game1-screenshot1.jpg',
      '/images/game1-screenshot2.jpg',
      '/images/game1-screenshot3.jpg'
    ],
    videoUrl: 'https://example.com/game-trailer.mp4'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{game.title} - Joy Grid</title>
        <meta name="description" content={game.description} />
        <meta name="keywords" content={`${game.title},${game.genre},在线游戏,HTML5游戏`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 游戏基本信息 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-[400px]">
            <Image
              src={game.screenshots[0]}
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
                  <p><span className="font-medium">游戏类型：</span>{game.genre}</p>
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
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">游戏描述</h2>
          <p className="text-gray-600">{game.description}</p>
        </div>

        {/* 游戏截图 */}
        <div className="mt-8">
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
        <div className="mt-8">
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
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 Joy Grid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GameDetail; 