import React from 'react';
import Image from 'next/image';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';

interface Props {
  profilePicture: string
  username: string
  displayName: string
  categoryName: string
}

const DelegationConfirmation: React.FC<Props> = ({
  profilePicture,
  username,
  displayName,
  categoryName,
}) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-lg bg-white px-6 py-8 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm text-gray-400">Successfully delegated to</h2>
      </div>

      <div className="mb-4 flex items-center">
        <div className="relative mr-3 size-10 rounded-full">
          <Image
            src={profilePicture}
            alt={displayName}
            fill
            unoptimized
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="font-medium">{displayName}</h3>
          <p className="text-gray-500">
            @
            {username}
          </p>
        </div>
      </div>

      <p className="mb-4 text-center text-base font-medium">
        You have successfully delegated your voting decisions
      </p>

      <div className="mb-4 rounded-lg border-2 border-op-neutral-300 p-3 pb-14">
        <p className="text-gray-400">
          I just delegated on
          {' '}
          <span className="text-primary">@pairwise</span>
          {' '}
          for Retro Funding 6
          {' '}
          {categoryName}
          {' '}
          to
          {' '}
          <span className="text-primary">
            @
            {username}
          </span>
          .
        </p>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-op-neutral-300 bg-white py-2 transition-colors duration-200 hover:bg-purple-50">
        <WarpcastIcon />
        Post on Farcaster
      </button>

      <button className="mt-4 w-full text-gray-700 transition-colors duration-200 hover:text-gray-700">
        Close
      </button>
    </div>
  );
};

export default DelegationConfirmation;
