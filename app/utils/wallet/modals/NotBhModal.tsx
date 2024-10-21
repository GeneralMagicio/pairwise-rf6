import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { useAuth } from '../AuthProvider';
import { shortenWalletAddress } from '../ConnectedButton';
import { BadgeData, getBadgeAmount, getBadgeMedal, useGetPublicBadges } from '../../getBadges';
import BadgeCard, { BadgeCardEntryType } from '../../BadgeCard';
import { XIcon } from '@/public/assets/icon-components/XIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';

interface SignedModalProps {
  onConnectTwitter: () => void
  onConnectFarcaster: () => void
  open: () => void
}
const NotBadgeHolder: React.FC<SignedModalProps> = (
  { onConnectFarcaster, onConnectTwitter }
) => {
  const { redirectToComparisonPage } = useAuth();
  const { address } = useAccount();
  const { data: badges } = useGetPublicBadges();

  const isWorldCoinVerified = badges?.worldCoinVerified ?? false;
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
          worldCoinVerified={isWorldCoinVerified}
        />
      );
    });
  }, [badges]);
  return (
    <div className="relative flex flex-col items-center justify-center gap-6 rounded-lg bg-white bg-social-gradient px-24 py-14 text-center">
      <h2 className="w-fit text-wrap text-4xl font-bold">Welcome to the Pairwise voting for "Retro Funding 6"</h2>
      {badges && Object.keys(badges).length > 0
        ? (
            <div className="items-between flex flex-col justify-center">
              <div className="flex flex-col gap-2 text-base">

                <h2 className="w-full pb-2 text-lg font-semibold text-gray-700">
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
        <div className="justify-cneter flex flex-col items-center gap-2">
          <div className="text-2xl text-dark-900">Claim more voting power!</div>
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
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-md border border-[#CBD5E0] bg-gray-50 px-4 py-2 font-semibold text-gray-700"
            >
              <WorldIdIcon />
              Connect with WorldID
            </button>
            <button
              onClick={onConnectTwitter}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[##CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-gray-800"
            >
              <XIcon />
              Connect with X (Twitter)
            </button>
          </div>
          <div>
            <button
              onClick={onConnectFarcaster}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[##CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-gray-800"
            >
              <WarpcastIcon />
              Connect with Farcaster
            </button>
          </div>
          <button
            onClick={() => {
              redirectToComparisonPage();
            }}
            className="w-3/5 rounded-md bg-primary px-4
              py-2 text-white hover:bg-red-600 "
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotBadgeHolder;
