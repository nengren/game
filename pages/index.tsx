import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Joy-Grid
          </h1>
          <p className="text-xl text-gray-600">
            网站正在建设中...
          </p>
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
} 