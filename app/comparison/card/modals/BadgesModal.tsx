import React from "react";
import Image from "next/image";
import { IActiveBadge, getBadgeImage } from "../ActiveBadges";

interface BadgesModalProps {
  badges: IActiveBadge[];
}

const badgeNameNap: Record<string, string> = {
  holder: "Holder",
  delegate: "Delegate",
  badge_holder: "Badgeholder",
  recipient: "Recipient",
};

const BadgesModal = ({ badges }: BadgesModalProps) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center px-6 py-12 bg-conflict-loading bg-no-repeat">
      <h2 className="text-2xl font-semibold text-dark-500">Your Badges</h2>
      <p className="text-gray-400">
        These are the badges associated with your wallet
      </p>
      <div className="w-fll grid grid-cols-4 mt-4 gap-2">
        {badges.map((badge) => (
          <div
            key={`${badge.type}-${badge.variation}`}
            className="flex flex-col border-gray-200 p-2 rounded-lg bg-gray-100 gap-y-4"
          >
            <Image
              src={getBadgeImage(badge)}
              alt={badge.type}
              width={128}
              height={128}
              className="mx-auto"
            />
            <div className="flex flex-col gap-3 justify-between grow">
              <div className="flex items-center gap-2 text-sm">
                <p className="w-12 font-semibold text-dark-500 uppercase">
                  Badge
                </p>
                <p className="text-gray-600">{badgeNameNap[badge.type]}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {badge.variation && (
                  <>
                    <p className="w-12 font-semibold text-dark-500 uppercase">
                      Type
                    </p>
                    <p className="text-gray-600 capitalize">
                      {badge.variation}
                    </p>
                  </>
                )}
              </div>
              <div className="border-t border-gray-200" />
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-dark-500 uppercase font-semibold">
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
