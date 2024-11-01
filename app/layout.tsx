import { ReactNode } from 'react';
import '@smastrom/react-rating/style.css';
import { Inter } from 'next/font/google';
import AppKitProvider from './utils/wallet/provider';
import FarcasterProvider from '@/app/utils/FarcasterProvider';
import type { Metadata } from 'next';
import './globals.css';

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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N8LG5FMQ');
          `,
        }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8LG5FMQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          >
          </iframe>
        </noscript>
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
