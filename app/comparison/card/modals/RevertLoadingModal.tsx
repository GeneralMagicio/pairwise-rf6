import Lottie from 'lottie-react';
import React, { FC } from 'react';
import back from '@/public/assets/json/back.json';
import styles from '@/app/styles/Animation.module.css';

const RevertLoadingModal: FC = () => {
  return (
    <div className="mx-auto flex w-[300px] flex-col items-center justify-center rounded-lg bg-white bg-ballot bg-no-repeat p-6 shadow-lg md:w-[500px]">
      <div className={`size-24 ${styles.container}`}>
        <Lottie animationData={back} loop={true} autoplay={true} />
      </div>

      <p className="mt-6 text-center text-gray-400">
        Reverting back to last action...
      </p>
    </div>
  );
};

export default RevertLoadingModal;
