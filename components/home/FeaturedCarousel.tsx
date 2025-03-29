import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { games } from '@/data/games';

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredGames = games.slice(0, 5); // 获取前5个游戏作为特色游戏

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredGames.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredGames.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredGames.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-[500px] rounded-xl overflow-hidden mb-12">
      {/* 轮播图 */}
      <div className="relative h-full">
        {featuredGames.map((game, index) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={game.imageUrl}
              alt={game.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* 游戏信息 */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-bold mb-4">{game.title}</h2>
                <p className="text-lg mb-6 line-clamp-2">{game.description}</p>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-primary/90 px-3 py-1 rounded-full text-sm">
                    {game.category}
                  </span>
                  <span className="text-sm">
                    评分：{game.rating}/5
                  </span>
                </div>
                <Link
                  href={`/games/${game.id}`}
                  className="btn-primary inline-block"
                >
                  立即玩
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel; 