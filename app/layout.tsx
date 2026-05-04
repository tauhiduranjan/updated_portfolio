import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tauhidur Anjan — Portfolio',
  description: 'CS student portfolio of Tauhidur Anjan. Projects, experience, and skills.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta property="og:title" content="Tauhidur Anjan — Portfolio" />
        <meta property="og:description" content="CS student portfolio of Tauhidur Anjan. Projects, experience, and skills." />
        <meta property="og:image" content="/artboard.jpg" />
        <meta property="og:url" content="https://tauhiduranjan.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
