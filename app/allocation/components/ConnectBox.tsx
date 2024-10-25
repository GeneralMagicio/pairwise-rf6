import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from '@worldcoin/idkit';
import { useQueryClient } from '@tanstack/react-query';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { actionId, appId } from '@/app/lib/constants';
import { useGetConnectionStatus, useWorldSignIn, useGetDelegationStatus } from '@/app/utils/getConnectionStatus';
import { CheckIcon } from '@/public/assets/icon-components/Check';
import ActiveBadges, {
  BadgesEnum,
  IActiveBadge,
} from '@/app/comparison/card/ActiveBadges';
import { useGetPublicBadges } from '@/app/utils/getBadges';

interface ConnectBoxProps {
  onConnectWorldID: (isError?: boolean) => void
  onConnectTwitter: () => void
  onConnectFarcaster: () => void
}

const ConnectBox: React.FC<ConnectBoxProps> = ({
  onConnectWorldID,
  onConnectFarcaster,
}) => {
  const { data: badges } = useGetPublicBadges();
  const activeBadges = useMemo(() => {
    if (!badges) return [];
    const {
      recipientsPoints,
      badgeholderPoints,
      holderType,
      delegateType,
    } = badges;
    const activeBadgesArray: IActiveBadge[] = [];
    if (holderType) {
      activeBadgesArray.push({
        type: BadgesEnum.HOLDER,
        variation: holderType,
      });
    }
    if (delegateType) {
      activeBadgesArray.push({
        type: BadgesEnum.DELEGATE,
        variation: delegateType,
      });
    }
    if (badgeholderPoints) {
      activeBadgesArray.push({
        type: BadgesEnum.BADGE_HOLDER,
      });
    }
    if (recipientsPoints) {
      activeBadgesArray.push({
        type: BadgesEnum.RECIPIENT,
      });
    }
    return activeBadgesArray;
  }, [badges]);
  const queryClient = useQueryClient();
  const refresh = useCallback(() => {
    queryClient.refetchQueries({ queryKey: ['connect-status'] });
  }, []);

  const { mutateAsync: worldIdSignIn } = useWorldSignIn();
  const { data: connectionStatus } = useGetConnectionStatus();
  const { data: delegates } = useGetDelegationStatus();

  const handleVerify = async (proof: ISuccessResult) => {
    return (await worldIdSignIn(proof));
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
        onError={() => {
          onConnectWorldID(true);
        }}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => (
          <button
            onClick={open}
            className={`mb-4 flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 font-semibold
            ${
          connectionStatus?.worldId
            ? 'border-[#079455] bg-[#DCFAE6] text-[#079455]'
            : 'border-[#CBD5E0] bg-gray-50 text-gray-700'
          }`}
            disabled={(connectionStatus?.worldId ?? undefined) !== undefined}
          >
            <WorldIdIcon />
            Connect with WorldID
            {connectionStatus?.worldId && <CheckIcon />}
          </button>
        )}
      </IDKitWidget>

      {connectionStatus?.worldId && (
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
          {connectionStatus?.farcaster && delegates?.toYou?.budget.length ? 'You have extra powers now!' : 'Claim more voting power'}
        </p>
        <p className="text-wrap font-medium text-gray-600">
          {connectionStatus?.farcaster
            ? 'Connect your Farcaster account to find out if someone delegated their voting power to you.'
            : 'Some people have delegated their voting power to you. With great power comes great responsibility. Use it wisely.'}
        </p>
        {connectionStatus?.farcaster
          ? (
              <div className="flex w-full items-center justify-between">
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
                        {delegates?.toYou?.budget.length ? `${delegates?.toYou?.budget.length} people delegated to you` : 'You have no delegations'}
                      </span>
                    </p>
                  </div>
                  <button onClick={refresh} className="px-1 text-xs text-gray-600 underline">
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
                <Image
                  src="/assets/images/farcaster.svg"
                  alt="Farcaster Icon"
                  width={20}
                  height={20}
                />
                Connect with Farcaster
              </button>
            )}
      </div>
    </div>
  );
};

export default ConnectBox;
