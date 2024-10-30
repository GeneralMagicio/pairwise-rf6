import Image from 'next/image';
import React from 'react';

interface UnlockBallotProps {
  onClick: () => void
}

const BALLOT_REPPORT_URL
  = `https://github.com/GeneralMagicio/pairwise-rpgf5/issues/new?assignees=MoeNick&labels=P0&projects=&
  template=report-error-on-updating-ballot.md&title=%5BError+updating+ballot%5D+`;

const BallotError: React.FC<UnlockBallotProps> = ({ onClick }) => {
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
          Error updating ballot!
        </h2>
        <p className="mb-6 text-gray-400">
          We encountered a problem updating your ballot.
          <br />
          Please retry updating.
        </p>
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4
          py-3 text-white transition duration-300 ease-in-out hover:bg-red-600"
        >
          Retry ballot update
        </button>
        <button
          onClick={() => window.open(BALLOT_REPPORT_URL, '_blank')}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-white px-4
          py-3 font-semibold text-primary transition duration-300 ease-in-out"
        >
          Report an issue
        </button>
      </div>
    </div>
  );
};

export default BallotError;
