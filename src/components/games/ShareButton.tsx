'use client';

import React, { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Game } from '@/lib/data';
import { generateShareText, generateSocialShareUrls } from '@/lib/data';

interface ShareButtonProps {
  game: Game;
}

export default function ShareButton({ game }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shareText = generateShareText(game);
  const shareUrls = generateSocialShareUrls(game, shareText);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: game.title,
          text: shareText,
          url: `https://joy-grid.com${game.playUrl}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText + ' ' + `https://joy-grid.com${game.playUrl}`);
      // Show success message
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ShareIcon className="h-5 w-5 mr-2" />
        Share
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Share Game</h3>
              <div className="flex space-x-4">
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Facebook
                </a>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  Twitter
                </a>
                <a
                  href={shareUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  WhatsApp
                </a>
              </div>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 