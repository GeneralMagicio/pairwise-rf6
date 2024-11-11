import React from 'react';
import Image from 'next/image';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';

interface Props {
  categoryName: string
  onClose: () => void
}

const createWarpcastIntention = (categoryName: string) => {
  return `https://warpcast.com/~/compose?text=I voted in @pairwise Liquid Democracy Experiment, ranking the ${categoryName} category of @optimism RF6.`;
};

const AskDelegations: React.FC<Props> = ({
  categoryName,
  onClose,
}) => {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-lg bg-white px-6 py-10 shadow-lg">
      <Image src="/assets/images/finish-celebration.png" width={300} height={150} alt="celebrate" />

      <p className="mb-4 text-center text-lg font-semibold">
        Successfully voted in&nbsp;
        <span className="text-primary">{categoryName}</span>
      </p>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-wrap text-center text-sm text-gray-400">
          Would you like to receive more delegations in our Liquid Democracy Experiment?
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg border-2 border-op-neutral-300 p-3 pb-14">
          <p className="text-gray-400">
            I voted in
            <span className="mx-1 inline text-primary">@pairwise</span>
            Liquid Democracy Experiment, ranking the
            <span className="mx-1 inline">
              {categoryName}
            </span>
            category of
            {' '}
            <span className="mx-1 text-primary">@optimism</span>
            RF6.
          </p>
        </div>

        <a className="w-full" target="_blank" href={createWarpcastIntention(categoryName)}>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-op-neutral-300 bg-white py-2 transition-colors duration-200 hover:bg-purple-50">
            <WarpcastIcon />
            Post on Farcaster
          </button>
        </a>
        <button onClick={onClose} className="w-full rounded-lg border-2 border-op-neutral-300 py-2 text-gray-700 transition-colors duration-200 hover:bg-purple-50 hover:text-gray-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default AskDelegations;
