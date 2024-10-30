import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { shortenWalletAddress } from '@/app/comparison/utils/helpers';
import { BadgeData, getBadgeAmount, getBadgeMedal, useGetPublicBadges } from '../../getBadges';
import BadgeCard, { BadgeCardEntryType } from '../../BadgeCard';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { useGetConnectionStatus, useGetDelegationStatus } from '../../getConnectionStatus';
import { CheckIcon } from '@/public/assets/icon-components/Check';

interface BhModalProps {
  onConnectFarcaster: () => void
  open: () => void
}

const BadgeHolderModal: React.FC<BhModalProps> = (
  { onConnectFarcaster, open }
) => {
  const { address } = useAccount();
  const { data: badges } = useGetPublicBadges();
  const { data: connectionStatus } = useGetConnectionStatus();
  const { data: delegates } = useGetDelegationStatus();

  const badgeCards = useMemo(() => {
    if (!badges) return null;
    const {
      delegateAmount,
      holderAmount,
      holderType,
      delegateType,
      worldCoinVerified,
      ...rest
    }: BadgeData = badges;
    const badgePoints = { ...rest };
    return Object.entries(badgePoints).map(([el1, el2]) => {
      const [key, value] = [
        el1,
        el2,
      ] as BadgeCardEntryType;
      return (
        <BadgeCard
          key={key}
          points={value}
          type={key}
          medal={getBadgeMedal(key, badges)}
          amount={getBadgeAmount(
            key,
            badges,
          )}
        />
      );
    });
  }, [badges]);
  const router = useRouter();
  return (
    <div className="relative flex max-w-3xl flex-col items-center justify-center gap-6 rounded-lg bg-voting-power bg-cover bg-no-repeat px-24 py-8 text-center">
      <h2 className="w-fit text-wrap text-4xl font-bold">Welcome to the Pairwise voting for "Retro Funding 6"</h2>
      {badges && Object.keys(badges).length > 0
        ? (
            <div className="flex flex-col justify-center">
              <div className="flex flex-col gap-2 text-base">

                <h2 className="w-full text-lg font-semibold text-gray-700">
                  Your voting power
                </h2>
                <div className="text-gray-400">{address ? shortenWalletAddress(address) : null}</div>
              </div>
              <div className="flex flex-row gap-3">{badgeCards}</div>
            </div>
          )
        : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="/assets/images/noBadges.svg" alt="no badges" width={144} height={112} />
              <div className="flex flex-col gap-2 text-base">
                <div className="text-gray-400">{address ? shortenWalletAddress(address) : null}</div>
                <div className="text-primary">No voting power associated with this address</div>
              </div>
            </div>
          )}

      <div className="flex w-full flex-col items-center justify-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-semibold text-dark-900">Claim more voting power!</div>
          <div className="text-center text-sm text-gray-400">
            <div>Check who delegated their voting power to you.</div>
            <div>Connects other accounts to claim more.</div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start gap-2">

          <div>
            <button
              onClick={() => {
                open();
              }}
              className={`flex w-full items-center justify-center gap-2 rounded-md border border-[#CBD5E0] ${
                connectionStatus?.worldId
                  ? 'border-[#079455] bg-[#DCFAE6] text-[#079455]'
                  : 'border-[#CBD5E0] bg-gray-50 text-gray-700'
              } px-4 py-2 font-semibold`}
              disabled={(connectionStatus?.worldId ?? undefined) !== undefined}
            >
              <WorldIdIcon />
              Connect with WorldID
              {connectionStatus?.worldId && <CheckIcon />}
            </button>
            {connectionStatus?.worldId && (
              <div className="flex w-full items-center justify-center">
                <p className="text-center text-sm font-medium text-[#079455]">
                  Your voting power increased. You earned a new Badge.
                </p>

              </div>
            )}
          </div>
          <div>
            <button
              onClick={onConnectFarcaster}
              className={`flex w-full items-center ${
                connectionStatus?.farcaster
                  ? 'border-[#079455] bg-[#DCFAE6] text-[#079455]'
                  : 'border-[#CBD5E0] bg-gray-100 text-gray-700'
              } justify-center gap-2 rounded-lg border px-4 py-2 font-semibold`}
              disabled={(connectionStatus?.farcaster ?? undefined) !== undefined}
            >
              <WarpcastIcon />
              Connect with Farcaster
              {connectionStatus?.farcaster && <CheckIcon />}
            </button>
            {connectionStatus?.farcaster && (
              <div className="flex w-full items-center justify-center">
                <p className="text-center text-sm font-medium text-[#079455]">
                  <span className="font-semibold">
                    {delegates?.toYou?.uniqueDelegators
                      ? `${(delegates?.toYou?.uniqueDelegators <= 1)
                        ? 'someone delegated to you'
                        : `${delegates?.toYou?.uniqueDelegators} people delegated to you`}`
                      : 'You have no delegations'}
                  </span>
                </p>
              </div>
            )}
          </div>

          {(connectionStatus?.farcaster
          && connectionStatus?.worldId)
            ? (
                <button
                  onClick={() => {
                    router.push('/allocation');
                  }}
                  className="w-3/5 rounded-md bg-primary px-4
              py-2 text-white hover:bg-red-600 "
                >
                  Continue →
                </button>
              )
            : (
                <button
                  onClick={() => {
                    router.push('/allocation');
                  }}
                  className="w-full justify-center px-1 text-xs text-gray-600 underline"
                >
                  <p>I&#39;ll do it later</p>
                </button>
              )}
        </div>
      </div>
    </div>
  );
};

export default BadgeHolderModal;
