import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Joy Grid - 游戏集合</title>
        <meta name="description" content="发现精彩游戏，开启欢乐时光" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">欢迎来到 Joy Grid</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 游戏卡片 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/games/game1.jpg" alt="超级冒险" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">超级冒险</h2>
              <p className="text-gray-600 mb-4">一个激动人心的冒险游戏，玩家需要在充满挑战的世界中探索、战斗和收集宝藏。</p>
              <Link href="/games/1" className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                开始游戏
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/games/game2.jpg" alt="赛车大师" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">赛车大师</h2>
              <p className="text-gray-600 mb-4">体验极速竞速的快感，在各种赛道上展现你的驾驶技巧。</p>
              <Link href="/games/2" className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                开始游戏
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/images/games/game3.jpg" alt="益智拼图" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">益智拼图</h2>
              <p className="text-gray-600 mb-4">考验智力的拼图游戏，通过移动方块来还原图片。</p>
              <Link href="/games/3" className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                开始游戏
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 Joy Grid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 