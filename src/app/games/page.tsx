import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getGames } from '@/lib/data';

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">All Games</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Game
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Link
                key={game.id}
                href={game.playUrl}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={game.thumbnailUrl}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{game.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{game.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {game.category}
                    </span>
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Controls:</h4>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Desktop: {game.controls.desktop}</p>
                      <p>Mobile: {game.controls.mobile}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 