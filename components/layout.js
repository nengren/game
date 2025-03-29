import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, title = 'Joy Grid - 你的游戏天堂' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Joy Grid是一个免费的游戏聚合平台，提供各种精彩的HTML5游戏。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Joy Grid
              </Link>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Joy Grid. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 