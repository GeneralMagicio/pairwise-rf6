import Image from 'next/image';
import React from 'react';

interface Props {
  onClick: () => void
  categoryName: string
}

const BallotErrorDelegated: React.FC<Props> = ({ onClick, categoryName }) => {
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
          Cannot update ballot!
        </h2>
        <p className="mb-6 text-gray-400">
          You delegated voting for
          {' '}
          <span className="font-bold">
            {' '}
            {categoryName}
            {' '}
          </span>
          {' '}
          to someone else. If you want to rank this category and update ballot, revoke your delegation first.
          {' '}
        </p>
        <button
          onClick={onClick}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary px-4
          py-3 font-semibold text-white transition duration-300 ease-in-out"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default BallotErrorDelegated;
