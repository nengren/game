import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getGames } from '@/lib/data';

export default async function HomePage() {
  const games = await getGames();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-blue-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Joy Grid Games</h1>
          <p className="text-xl text-white/90">Play amazing HTML5 games for free!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src={game.thumbnailUrl}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h2>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 