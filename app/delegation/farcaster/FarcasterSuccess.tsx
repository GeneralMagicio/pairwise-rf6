import React from 'react';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';

interface Props {
  profilePicture: string
  username: string
  displayName: string
  categoryName: string
  onClose: () => void
}

const createWarpcastIntention = (categoryName: string, username: string) => {
  return `https://warpcast.com/~/compose?text=I just delegated on @pairwise for Retro funding 6 ${categoryName} to @${username}. `;
};

const DelegationConfirmation: React.FC<Props> = ({
  profilePicture,
  username,
  displayName,
  categoryName,
  onClose,
}) => {
  const posthog = usePostHog();
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
          <span className="mx-1 text-primary">@pairwise</span>
          's Liquid Democracy Experiment.
          <br />
          <br />
          I chose
          {' '}
          <span className="ml-1 text-primary">
            @
            {username}
          </span>
          {' '}
          to vote (or delegate) for me in the
          <span className="mx-1">
            {categoryName}
          </span>
          category of
          {' '}
          <span className="mx-1 text-primary">@optimism</span>
          's RF6.
          <br />
          <br />
          You can try it out too!
          <br />
          <br />
          https://app.pairwise.vote/
        </p>
      </div>

      <a
        className="w-full"
        target="_blank"
        href={createWarpcastIntention(categoryName, username)}
        onClick={() => {
          posthog.capture('Post of Farcaster');
        }}
      >
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-op-neutral-300 bg-white py-2 transition-colors duration-200 hover:bg-purple-50">
          <WarpcastIcon />
          Post on Farcaster
        </button>
      </a>

      <button onClick={onClose} className="mt-4 w-full text-gray-700 transition-colors duration-200 hover:text-gray-700">
        Close
      </button>
    </div>
  );
};

export default DelegationConfirmation;
