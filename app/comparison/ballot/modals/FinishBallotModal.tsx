import Image from 'next/image';
import React from 'react';

interface UnlockBallotProps {
  projectCount: number
  category: string
  onUnlock: () => void
}

const FinishBallot: React.FC<UnlockBallotProps> = ({
  projectCount,
  category,
  onUnlock,
}) => {
  return (
    <div className="mx-auto w-[96] overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat shadow-lg">
      <div className="p-10 text-center">
        <Image
          src="/assets/images/finish-celebration.png"
          alt="Celebration"
          width={320}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="mb-4 text-xl font-medium text-dark-500">
          {
            'Nice work! You\'re ready to unlock your ballot and distribute rewards'
          }
        </h2>
        <p className="mb-6 text-gray-400">
          {`You've ranked all
          ${projectCount}
          projects in the
          ${category}
          category.`}
        </p>
        <button
          onClick={onUnlock}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-white
          transition duration-300 ease-in-out hover:bg-red-600"
        >
          <svg
            className="mr-2 size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          Unlock Ballot
        </button>
      </div>
    </div>
  );
};

export default FinishBallot;
