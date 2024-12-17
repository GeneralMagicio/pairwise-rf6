import Image from 'next/image';
import React from 'react';

interface Props {
  onClick: () => void
}

const AttestationError: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="mx-auto w-[300px] overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat shadow-lg md:w-[500px]">
      <div className="px-6 py-10 text-center  md:px-10">
        <Image
          src="/assets/images/ballot-error.svg"
          alt="Celebration"
          width={320}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="mb-4 text-xl font-medium text-dark-500">
          Error attesting your votes
        </h2>
        <p className="mb-6 text-gray-400">
          There was an error attesting your votes. Please try again.
        </p>
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center rounded-lg border border-slate-400 px-4
          py-3 font-semibold text-slate-900"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default AttestationError;
