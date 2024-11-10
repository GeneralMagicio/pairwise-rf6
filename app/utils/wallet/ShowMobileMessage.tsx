'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';

export default function ShowMobileMessage({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const [showMobileMessage] = useState(true);
  return (
    <div className="relative h-screen w-screen">
      {showMobileMessage && (
        <>
          <div className="absolute top-0 aspect-[2/1] w-full">
            <Image className="object-cover" fill src="/assets/images/mobile-header.svg" alt="" />
          </div>
          <div className={`flex h-full flex-col items-center justify-center gap-4 px-4 ${(showMobileMessage) ? 'block sm:hidden' : 'hidden'}`}>
            <Image src="/assets/images/star-blonde.svg" width={100} height={120} alt="" />
            <div className="text-wrap text-center text-xl font-semibold text-dark-500">Change or update your browser for a better experience</div>
            <div className="text-wrap text-center text-base text-gray-400">Pairwise works best on desktop browsers. For the best experience, please switch to your desktop device.</div>
          </div>
        </>
      )}
      <div className={showMobileMessage ? 'hidden sm:block' : 'block'}>
        {children}
      </div>
    </div>
  );
}
