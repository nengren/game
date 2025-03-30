'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-gray-500">
              Joy Game Grid is a collection of fun and engaging games for everyone.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/games" className="text-base text-gray-500 hover:text-gray-900">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/games?category=puzzle" className="text-base text-gray-500 hover:text-gray-900">
                  Puzzle Games
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://twitter.com/joygrid" className="text-base text-gray-500 hover:text-gray-900">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com/joygrid" className="text-base text-gray-500 hover:text-gray-900">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Joy Game Grid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 