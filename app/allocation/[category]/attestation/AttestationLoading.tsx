import React, { FC } from 'react';
import SmallSpinner from '@/app/components/SmallSpinner';

const AttestationLoading: FC = () => {
  return (
    <div className="mx-auto flex w-[300px] flex-col items-center justify-center rounded-lg bg-white bg-ballot bg-no-repeat p-6 shadow-lg md:w-[500px]">
      <div className="size-32">
        <SmallSpinner />
      </div>

      <p className="mt-2 text-center text-dark-500">
        Submitting your vote, please wait...
      </p>
    </div>
  );
};

export default AttestationLoading;
