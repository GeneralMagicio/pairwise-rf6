import React from 'react';
import Image from 'next/image';
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { XIcon } from '@/public/assets/icon-components/XIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
import { actionId, appId } from '@/app/lib/constants';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { CheckIcon } from '@/public/assets/icon-components/Check';
import ActiveBadges, {
  BadgesEnum,
  IActiveBadge,
} from '@/app/comparison/card/ActiveBadges';

interface ConnectBoxProps {
  onConnectWorldID: () => void
  onConnectTwitter: () => void
  onConnectFarcaster: () => void
}

const activeBadges: IActiveBadge[] = [
  {
    type: BadgesEnum.HOLDER,
    variation: 'whale',
  },
  {
    type: BadgesEnum.DELEGATE,
    variation: 'whale',
  },
  {
    type: BadgesEnum.BADGE_HOLDER,
  },
  {
    type: BadgesEnum.RECIPIENT,
  },
];

const ConnectBox: React.FC<ConnectBoxProps> = ({
  onConnectWorldID,
  onConnectTwitter,
  onConnectFarcaster,
}) => {
  const connected = false; // tempo variable

  const handleVerify = async (proof: ISuccessResult) => {
    await axiosInstance.post('flow/connect/wid', {
      proof,
    });
  };
  return (
    <div className="max-w-md rounded-xl border bg-white p-6">
      <h2 className="mb-4 w-full border-b pb-2 text-2xl font-semibold text-gray-700">
        Your voting power
      </h2>

      <div className="mb-2">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">
          Your badges
        </h3>
        <button>
          <ActiveBadges activeBadges={activeBadges} />
        </button>
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Increase your voting power by connecting to WorldID
      </p>

      <IDKitWidget
        app_id={appId}
        action={actionId}
        onSuccess={() => {
          onConnectWorldID();
        }}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => (
          <button
            onClick={open}
            className={`mb-4 flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 font-semibold
            ${
          connected
            ? 'border-[#079455] bg-[#DCFAE6] text-[#079455]'
            : 'border-[#CBD5E0] bg-gray-50 text-gray-700'
          }`}
          >
            <WorldIdIcon />
            Connect with WorldID
            {connected && <CheckIcon />}
          </button>
        )}
      </IDKitWidget>

      {connected && (
        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            Your WorldID verification badge
          </p>
          <Image
            src="/assets/images/wid-badge.svg"
            alt="Arrow right"
            width={32}
            height={32}
          />
        </div>
      )}

      <hr className="my-6" />

      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-xl bg-voting-power bg-cover bg-no-repeat p-4">
        <p className="text-4xl font-bold text-[#2C6074]">
          {connected ? 'You have extra powers now!' : 'Claim more voting power'}
        </p>
        <p className="font-medium text-gray-600">
          {connected
            ? 'Connect your X and Farcaster account to find out if someone delegated their voting power to you.'
            : 'Some people have delegated their voting power to you. With great power comes great responsibility. Use it wisely.'}
        </p>
        {connected
          ? (
              <div className="flex w-full items-center justify-between">
                <XIcon />
                <div className="flex flex-col items-end justify-center gap-2">
                  <div className="flex items-center justify-center gap-2 rounded-full border border-[#079455] bg-[#17B26A] px-4 py-1">
                    <p className="text-sm text-gray-50">
                      <span className="font-semibold"> 5 people</span>
                      {' '}
                      delegated to
                      you
                    </p>
                  </div>
                  <button className="px-1 text-xs text-gray-600 underline">
                    Refresh
                  </button>
                </div>
              </div>
            )
          : (
              <button
                onClick={onConnectTwitter}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[##CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-gray-800"
              >
                <XIcon />
                Connect with X (Twitter)
              </button>
            )}
        {connected
          ? (
              <div className="flex w-full items-center justify-between">
                <WarpcastIcon />
                <div className="flex flex-col items-end justify-center gap-2">
                  <div className="flex items-center justify-center gap-2 rounded-full border border-[#079455] bg-[#17B26A] px-4 py-1">
                    <p className="text-sm text-gray-50">
                      <span className="font-semibold"> 5 people</span>
                      {' '}
                      delegated to
                      you
                    </p>
                  </div>
                  <button className="px-1 text-xs text-gray-600 underline">
                    Refresh
                  </button>
                </div>
              </div>
            )
          : (
              <button
                onClick={onConnectFarcaster}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[##CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-gray-800"
              >
                <WarpcastIcon />
                Connect with Farcaster
              </button>
            )}
      </div>
    </div>
  );
};

export default ConnectBox;
