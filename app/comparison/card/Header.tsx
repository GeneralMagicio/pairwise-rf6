import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ConnectButton } from '@/app/utils/wallet/Connect';

const PAIRWISE_REPORT_URL = 'https://github.com/GeneralMagicio/pairwise-rf6/issues/new?assignees=MoeNick&labels=&projects=&template=report-an-issue.md&title=%5BFeedback%5D+';

interface HeaderProps {
  progress: number
  category: string
  question: string
  isFirstSelection?: boolean
}

const OPCharacter: React.FC = () => (
  <Image
    src="/assets/images/op-character3.svg"
    alt="op character"
    width={60}
    height={48}
    unoptimized
  />
);

const Header: React.FC<HeaderProps> = ({
  progress,
  category,
  question,
  isFirstSelection,
}) => {
  const [isBarFixed, setIsBarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsBarFixed(true);
      }
      else {
        setIsBarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative z-40 w-full bg-white">
      <div className="flex flex-col-reverse items-center justify-between px-6 py-4 md:px-12 lg:flex-row lg:px-4">
        {!isFirstSelection && (
          <div className="flex items-center justify-between bg-white px-4 py-2">
            <div className="flex items-center">
              <OPCharacter />
              <span className="ml-2 text-lg font-bold italic text-primary">
                IMPACT = PROFIT
              </span>
            </div>
          </div>
        )}
        <div className={`py-2 ${isFirstSelection ? 'px-0' : 'px-4'}`}>
          <h2 className="text-center text-xl font-semibold">{question}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-center text-sm text-blue-link">
            {category}
          </span>
          <ConnectButton />
          <button
            className="rounded-lg border border-gray-200 p-2 text-sm"
            onClick={() =>
              window.open(PAIRWISE_REPORT_URL, '_blank')}
          >
            Report an issue
          </button>
        </div>
      </div>

      <div
        className={`h-2 bg-red-100 ${
          isBarFixed ? 'fixed left-0 top-0 z-50 w-full' : ''
        }`}
      >
        <div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default Header;
