import Head from 'next/head'
import Link from 'next/link'

export default function GameDetail({ game }) {
  if (!game) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">游戏未找到</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{game.title} - Joy Grid</title>
        <meta name="description" content={game.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {game.category}
              </span>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={game.url}
                className="w-full h-96"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            返回首页
          </Link>
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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const games = [
    {
      id: '1',
      title: '超级冒险',
      description: '一个激动人心的冒险游戏，玩家需要在充满挑战的世界中探索、战斗和收集宝藏。',
      category: '冒险',
      image: '/images/games/game1.jpg',
      url: '/games/game1/game.html'
    },
    {
      id: '2',
      title: '赛车大师',
      description: '体验极速竞速的快感，在各种赛道上展现你的驾驶技巧。',
      category: '赛车',
      image: '/images/games/game2.jpg',
      url: '/games/game2/game.html'
    },
    {
      id: '3',
      title: '益智拼图',
      description: '考验智力的拼图游戏，通过移动方块来还原图片。',
      category: '益智',
      image: '/images/games/game3.jpg',
      url: '/games/game3/game.html'
    }
  ]

  const game = games.find(g => g.id === params.id)

  return {
    props: {
      game
    }
  }
} 