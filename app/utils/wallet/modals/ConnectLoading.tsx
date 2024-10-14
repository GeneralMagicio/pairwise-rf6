import React from 'react';
import Lottie from 'lottie-react';
import spinner from './spinner-animation.json';

const ConnectLoading: React.FC = () => {
  return (
    <div className="relative flex w-[300px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md md:w-[420px]">
      {/* <Image
        src="assets/images/vector3.svg"
        alt="vector"
        width={220}
        height={220}
        className="absolute -left-16 -top-16 overflow-hidden"
      /> */ }
      <div className="size-32">
        <Lottie
          animationData={spinner}
          loop={true}
          autoplay={true}
        />
      </div>
      <h2 className="mb-1 text-base font-medium text-gray-500">Signing in...</h2>
      <p className="mb-2 text-base text-gray-500">
        Please check your wallet and sign in to continue
      </p>
    </div>
  );
};

export default ConnectLoading;
