import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredGames = [
    {
      id: 1,
      title: '超级冒险',
      image: '/images/game1.jpg',
      description: '一个激动人心的冒险游戏'
    },
    {
      id: 2,
      title: '策略大师',
      image: '/images/game2.jpg',
      description: '考验你的战略思维'
    },
    // 更多游戏...
  ];

  const categories = [
    { id: 1, name: '动作', icon: '🎮' },
    { id: 2, name: '冒险', icon: '🗺️' },
    { id: 3, name: '策略', icon: '⚔️' },
    { id: 4, name: '模拟', icon: '🏢' },
    { id: 5, name: '角色扮演', icon: '👤' },
    { id: 6, name: '休闲', icon: '🎲' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Joy Grid - 你的游戏天堂</title>
        <meta name="description" content="Joy Grid是一个优质的游戏聚合平台，提供各种类型的在线游戏。" />
        <meta name="keywords" content="在线游戏,HTML5游戏,休闲游戏,策略游戏" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* 搜索区域 */}
        <div className="bg-primary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                发现精彩游戏
              </h1>
              <div className="max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="搜索游戏..."
                  className="w-full px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 轮播区域 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Slider {...sliderSettings}>
            {featuredGames.map((game) => (
              <div key={game.id} className="relative h-[400px]">
                <Image
                  src={game.image}
                  alt={game.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                  <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                  <p className="text-white/80">{game.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 游戏分类 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">游戏分类</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="text-gray-900 font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 Joy Grid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 