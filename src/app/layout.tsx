import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Joy Game Grid - Fun Online Games',
  description: 'Play fun and engaging online games on Joy Game Grid. Challenge your friends and share your scores!',
  openGraph: {
    title: 'Joy Game Grid - Fun Online Games',
    description: 'Play fun and engaging online games on Joy Game Grid. Challenge your friends and share your scores!',
    url: 'https://joy-grid.com',
    siteName: 'Joy Game Grid',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Joy Game Grid',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joy Game Grid - Fun Online Games',
    description: 'Play fun and engaging online games on Joy Game Grid. Challenge your friends and share your scores!',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 