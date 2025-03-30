import React from 'react';
import Link from 'next/link';

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-400">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-white font-bold text-xl">
              Joy Grid
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/games"
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                All Games
              </Link>
              <Link
                href="/leaderboard"
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/80">
            <p>© 2024 Joy Grid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 