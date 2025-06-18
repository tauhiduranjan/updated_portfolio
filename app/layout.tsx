import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MusicPlayer from './components/MusicPlayer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tauhidur Anjan - Portfolio',
  description: 'CS Graduate Portfolio showcasing projects, experience, and music production',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta property="og:title" content="Tauhidur Anjan - Portfolio" />
        <meta property="og:description" content="CS Graduate Portfolio showcasing projects, experience, and music production" />
        <meta property="og:image" content="/artboard.jpg" />
        <meta property="og:url" content="https://tauhiduranjan.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={`${inter.variable} font-sans bg-dark text-white [&_h1]:font-satoshi [&_h2]:font-satoshi [&_h3]:font-satoshi [&_h4]:font-satoshi [&_h5]:font-satoshi [&_h6]:font-satoshi`}>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
} 