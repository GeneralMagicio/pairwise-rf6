'use client';

import dynamic from 'next/dynamic';
import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo';
import { LandingPart1 } from './landing/part1';
import { LandingPart2 } from './landing/part2';
import { LandingPart3 } from './landing/part3';
import { ConnectButton } from './utils/wallet/Connect';
import { LandingPart0 } from './landing/part0';
import { LandingPartDelegate } from './landing/partDelegate';

const NoSSRModals = dynamic(() => import('./utils/wallet/Modals'), {
  ssr: false,
});

const Landing = () => {
  return (
    <div className="relative w-full bg-[#F2F3F8] bg-river-left-right bg-river bg-no-repeat">
      <NoSSRModals />
      <div className="mx-[120px] w-[90%] space-y-8 pt-4 sm:w-[85%]">
        <div className="sticky top-0 z-[5] flex h-24 w-full items-center justify-between">
          <span className="flex size-32 items-center sm:size-40 md:size-60 lg:size-full">
            <span className="bg-[#F2F3F8]">
              <PwLogo />
            </span>
          </span>
          <ConnectButton />
        </div>
        <LandingPart0 />
        <LandingPartDelegate />
        <LandingPart1 />
        <LandingPart2 />
        <LandingPart3 />
      </div>
    </div>
  );
};

export default Landing;
