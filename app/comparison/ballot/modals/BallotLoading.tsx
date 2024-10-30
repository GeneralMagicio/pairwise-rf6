import Lottie from 'lottie-react';
import React, { FC } from 'react';
import hourglass from '@/public/assets/json/hourglass.json';

const BallotLoading: FC = () => {
  return (
    <div className="mx-auto flex w-[300px] flex-col items-center justify-center rounded-lg bg-white bg-ballot bg-no-repeat p-6 shadow-lg md:w-[500px]">
      <div className="size-32">
        <Lottie animationData={hourglass} loop={true} autoplay={true} />
      </div>

      <p className="mt-2 text-center text-dark-500">
        Please wait while we update your ballot...
      </p>
    </div>
  );
};

export default BallotLoading;
