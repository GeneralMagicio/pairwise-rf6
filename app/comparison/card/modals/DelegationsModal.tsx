import React from 'react';
import Image from 'next/image';
import ActiveBadges, { IActiveBadge } from '@/app/comparison/card/ActiveBadges';
import { ISocialDelegateResponse } from '@/app/utils/getConnectionStatus';

interface IDelegationsModalProps {
  category: string | undefined
  badges: IActiveBadge[]
  delegates: ISocialDelegateResponse | undefined
  onClose: () => void
}

const DelegationsModal = ({
  category,
  badges,
  delegates,
  onClose,
}: IDelegationsModalProps) => {
  return (
    <div className="flex w-[360px] flex-col items-center justify-center gap-4 bg-conflict-loading bg-no-repeat px-6 py-12 md:w-[480px]">
      <Image
        src="/assets/images/op-character8.svg"
        alt="Delegations"
        width={128}
        height={128}
      />
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-dark-500">
          You are voting on category
        </p>
        <p className="text-lg font-semibold text-primary">
          "
          {category}
          "
        </p>
      </div>
      {badges.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-400">Your badges</p>
          <div className="mr-3 flex items-center">
            <ActiveBadges activeBadges={badges} />
          </div>
        </div>
      )}
      <div className="w-full border-b border-gray-200" />
      <div className="flex flex-col items-center gap-6 px-6">
        <p className="text-center font-light text-gray-400">
          and on behalf of
          {' '}
          <strong className="text-dark-500">
            {delegates?.toYou?.uniqueDelegators}
            {' '}
            people
            {' '}
          </strong>
          {' '}
          who delegated their decision making power to you
        </p>
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/assets/images/farcaster.svg"
            alt="Farcaster Icon"
            width={32}
            height={32}
          />
          <div className="flex flex-col items-end justify-center gap-2">
            <div className="flex items-center justify-center gap-2 rounded-full border border-[#079455] bg-[#17B26A] px-4 py-1">
              <p className="text-sm text-gray-50">
                <span className="font-semibold">
                  {delegates?.toYou?.uniqueDelegators
                    ? `${(delegates?.toYou?.uniqueDelegators <= 1)
                      ? 'someone delegated to you'
                      : `${delegates?.toYou?.uniqueDelegators} people delegated to you`}`
                    : 'You have no delegations'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary p-4 font-semibold text-white"
      >
        Got it
      </button>
    </div>
  );
};

export default DelegationsModal;
