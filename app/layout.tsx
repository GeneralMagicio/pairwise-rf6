import { ReactNode } from 'react';
import '@smastrom/react-rating/style.css';
import { Inter } from 'next/font/google';
import AppKitProvider from './utils/wallet/provider';
import FarcasterProvider from '@/app/utils/FarcasterProvider';
import ShowMobileMessage from './utils/wallet/ShowMobileMessage';
import { TimeIcon } from '@/public/assets/icon-components/Time';
import { PHProvider } from './utils/PHProvider';
import { TwitterProvider } from './utils/TwitterProvider';
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
        <div className="flex items-center justify-center gap-4 bg-primary p-2 font-medium text-white">
          <TimeIcon fill="#fff" />
          <p> Voting on RF6 has ended, but you can explore the app and see the experience. </p>
        </div>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8LG5FMQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          >
          </iframe>
        </noscript>
        <ShowMobileMessage>
          <AppKitProvider>
            <PHProvider>
              <FarcasterProvider>
                <TwitterProvider>
                  {children}
                </TwitterProvider>
              </FarcasterProvider>
            </PHProvider>
          </AppKitProvider>
        </ShowMobileMessage>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
