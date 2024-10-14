import Lottie from 'lottie-react';
import React, { FC } from 'react';
import hourglass from '@/public/assets/json/hourglass.json';

const CoILoadingModal: FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center rounded-lg bg-white
     bg-conflict-loading bg-no-repeat p-6 shadow-lg"
    >
      <div className="size-32">
        <Lottie
          animationData={hourglass}
          loop={true}
          autoplay={true}
        />
      </div>

      <p className="mt-6 text-center text-gray-400">
        Hold on...Loading Project
      </p>
    </div>
  );
};

export default CoILoadingModal;
