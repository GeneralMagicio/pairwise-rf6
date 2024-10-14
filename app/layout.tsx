import { ReactNode } from 'react';
import '@smastrom/react-rating/style.css';
import { Inter } from 'next/font/google';
import AppKitProvider from './utils/wallet/provider';
import type { Metadata } from 'next';
import './globals.css';
import FarcasterProvider from '@/app/utils/FarcasterProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pairwise',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <AppKitProvider>
          <FarcasterProvider>
            {children}
          </FarcasterProvider>
        </AppKitProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
