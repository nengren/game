import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Joy Grid - 你的游戏天堂',
    template: '%s | Joy Grid',
  },
  description: 'Joy Grid是一个免费的游戏聚合平台，提供各种精彩的HTML5游戏。随时随地享受游戏乐趣！',
  keywords: 'HTML5游戏,在线游戏,免费游戏,休闲游戏',
  authors: [{ name: 'Joy Grid Team' }],
  creator: 'Joy Grid Team',
  publisher: 'Joy Grid',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-gray-900">
                Joy Grid
              </a>
            </div>
          </nav>
        </header>

        {children}

        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Joy Grid. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 