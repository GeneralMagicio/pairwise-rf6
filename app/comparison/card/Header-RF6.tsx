import React from 'react';
import { ConnectButton } from '@/app/utils/wallet/Connect';
import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo';
import Image from 'next/image'

interface HeaderProps {
  progress: number
  category: string
  question: string
  isFirstSelection?: boolean
}

const PAIRWISE_REPORT_URL
  = `https://github.com/GeneralMagicio/pairwise-rf6/issues/new?
  assignees=MoeNick&labels=&projects=&template=report-an-issue.md&title=%5BFeedback%5D+`;

const HeaderRF6: React.FC<HeaderProps> = ({
  isFirstSelection,
  question,
}) => {
  // const [isBarFixed, setIsBarFixed] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsBarFixed(true);
  //     } else {
  //       setIsBarFixed(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className="relative z-40 w-full border-b bg-white">
      <div className="flex flex-col-reverse items-center justify-between px-6 py-4 md:px-12 lg:flex-row lg:px-4">
        {!isFirstSelection && (
          <div className="flex items-center justify-between bg-white px-4 py-2">
            <div className="flex items-center">
              <PwLogo />
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          {/* <span className="rounded-full bg-blue-100 px-3 py-1 text-center text-sm text-blue-link">
            {category}
          </span> */}
          <button>
            <Image src="/assets/images/badges.svg" alt="Badges" width={64} height={16} />
          </button>
          <ConnectButton />
          <button
            className="mr-8 rounded-lg border border-gray-200 p-2 text-sm"
            onClick={() =>
              window.open(PAIRWISE_REPORT_URL + question, '_blank')}
          >
            Report an issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderRF6;
