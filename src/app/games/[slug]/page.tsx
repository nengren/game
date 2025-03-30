import React from 'react';
import Image from 'next/image';
import { getGameBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/games/ShareButton';

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Game Image */}
          <div className="relative h-64 lg:h-full">
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Game Info */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {game.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500">{game.description}</p>

            {/* Game Controls */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">How to Play</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Desktop Controls</h3>
                  <p className="mt-1 text-sm text-gray-500">{game.controls.desktop}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Mobile Controls</h3>
                  <p className="mt-1 text-sm text-gray-500">{game.controls.mobile}</p>
                </div>
              </div>
            </div>

            {/* Game Features */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Features</h2>
              <ul className="mt-4 grid grid-cols-2 gap-4">
                {game.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Game Tags */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <div className="mt-8">
              <ShareButton game={game} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 