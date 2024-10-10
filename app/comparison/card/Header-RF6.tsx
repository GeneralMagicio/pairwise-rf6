import React from 'react';
import { ConnectButton } from '@/app/utils/wallet/Connect';
import { PwLogo } from '@/public/assets/icon-components/PairwiseLogo';

interface HeaderProps {
  progress: number
  category: string
  question: string
  isFirstSelection?: boolean
}

const HeaderRF6: React.FC<HeaderProps> = ({
  category,
  isFirstSelection,
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
          <span className="rounded-full bg-blue-100 px-3 py-1 text-center text-sm text-blue-link">
            {category}
          </span>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default HeaderRF6;
