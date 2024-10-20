import React from 'react';
import Image from 'next/image';
import { IActiveBadge, getBadgeImage } from '../ActiveBadges';

interface BadgesModalProps {
  badges: IActiveBadge[]
}

const badgeNameNap: Record<string, string> = {
  holder: 'Holder',
  delegate: 'Delegate',
  badge_holder: 'Badgeholder',
  recipient: 'Recipient',
};

const BadgesModal = ({ badges }: BadgesModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-conflict-loading bg-no-repeat px-6 py-12">
      <h2 className="text-2xl font-semibold text-dark-500">Your Badges</h2>
      <p className="text-gray-400">
        These are the badges associated with your wallet
      </p>
      <div className="w-fll mt-4 grid grid-cols-4 gap-2">
        {badges.map(badge => (
          <div
            key={`${badge.type}-${badge.variation}`}
            className="flex flex-col gap-y-4 rounded-lg border-gray-200 bg-gray-100 p-2"
          >
            <Image
              src={getBadgeImage(badge)}
              alt={badge.type}
              width={128}
              height={128}
              className="mx-auto"
            />
            <div className="flex grow flex-col justify-between gap-3">
              <div className="flex items-center gap-2 text-sm">
                <p className="w-12 font-semibold uppercase text-dark-500">
                  Badge
                </p>
                <p className="text-gray-600">{badgeNameNap[badge.type]}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {badge.variation && (
                  <>
                    <p className="w-12 font-semibold uppercase text-dark-500">
                      Type
                    </p>
                    <p className="capitalize text-gray-600">
                      {badge.variation}
                    </p>
                  </>
                )}
              </div>
              <div className="border-t border-gray-200" />
              <div className="flex flex-col gap-2 text-sm">
                <p className="font-semibold uppercase text-dark-500">
                  Badge info
                </p>
                <p className="text-gray-600">Recipient in Round 4</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesModal;
