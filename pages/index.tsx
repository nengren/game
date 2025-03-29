import React from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Joy Grid - 你的游戏天堂</title>
        <meta name="description" content="Joy Grid是一个优质的游戏聚合平台，提供各种类型的在线游戏。" />
        <meta name="keywords" content="在线游戏,HTML5游戏,休闲游戏,策略游戏" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Joy-Grid</h1>
        <p className="mb-6">网站正在建设中...</p>
        
        {/* 如果需要轮播图功能，可以替换为简单的图片展示
        <div className="flex overflow-x-auto gap-4 pb-4">
          <div className="flex-shrink-0">
            <Image 
              src="/placeholder.jpg" 
              alt="Placeholder" 
              width={300} 
              height={200} 
              className="rounded-lg"
            />
          </div>
          <div className="flex-shrink-0">
            <Image 
              src="/placeholder2.jpg" 
              alt="Placeholder" 
              width={300} 
              height={200}
              className="rounded-lg" 
            />
          </div>
        </div>
        */}
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