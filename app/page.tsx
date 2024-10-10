'use client';

import dynamic from 'next/dynamic';
import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo';
import { LandingPart1 } from './landing/part1';
import { LandingPart2 } from './landing/part2';
import { LandingPart3 } from './landing/part3';
import { ConnectButton } from './utils/wallet/Connect';

const NoSSRModals = dynamic(() => import('./utils/wallet/Modals'), {
  ssr: false,
});

const Landing = () => {
  return (
    <div className="w-full bg-[#F2F3F8]">
      <NoSSRModals />
      <div className="mx-auto w-[90%] space-y-8 pt-4 sm:w-[85%]">
        <div className="sticky top-0 z-[5] flex h-24 w-full items-center justify-between bg-[#F2F3F8]">
          <span className="flex size-32 items-center sm:size-40 md:size-60 lg:size-full">
            <PwLogo />
          </span>
          <ConnectButton />
        </div>
        <LandingPart1 />
        <LandingPart2 />
        <LandingPart3 />
      </div>
    </div>
  );
};

export default Landing;
