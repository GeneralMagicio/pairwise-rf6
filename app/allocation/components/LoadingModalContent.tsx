import Lottie from 'lottie-react';
import React from 'react';
import spinner from './small-spinner-animation.json';

interface ModalProps {
  isFarcaster?: boolean
}
const LoadingModalContent: React.FC<ModalProps> = ({ isFarcaster }) => {
  const socialConnectionName = isFarcaster ? 'Farcaster' : 'X';
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-6">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <Lottie
          animationData={spinner}
          loop={true}
          autoplay={true}
        />
        <div className="text-lg text-dark-900">
          Looking for Voting Power on
          {' '}
          {socialConnectionName}
        </div>
        <div className="text-wrap text-center text-sm font-normal text-[#636779]">
          Searching
          {' '}
          {socialConnectionName}
          {' '}
          for people who delegated voting power to you.
        </div>
      </div>
    </div>
  );
};

export default LoadingModalContent;
