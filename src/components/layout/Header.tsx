'use client';

import React from 'react';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <HomeIcon className="h-8 w-8 text-gray-900" />
              <span className="ml-2 text-xl font-bold text-gray-900">Joy Game Grid</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/games" className="text-gray-600 hover:text-gray-900">
              Games
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 