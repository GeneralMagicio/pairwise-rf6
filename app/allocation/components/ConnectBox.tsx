import React from 'react';
import Image from 'next/image';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { XIcon } from '@/public/assets/icon-components/XIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
import { actionId, appId } from '@/app/lib/constants';
import { axiosInstance } from '@/app/utils/axiosInstance';

interface ConnectBoxProps {
  onConnectWorldID: () => void
  onConnectTwitter: () => void
  onConnectFarcaster: () => void
}

const ConnectBox: React.FC<ConnectBoxProps> = ({
  onConnectWorldID,
  onConnectTwitter,
  onConnectFarcaster,
}) => {
  const handleVerify = async (proof: ISuccessResult) => {
    await axiosInstance.post('flow/connect/wid', {
      proof,
    });
  };
  return (
    <div className="flex max-w-md flex-col gap-4 rounded-xl border bg-white p-6">
      <h2 className="mb-4 w-full border-b pb-2 text-2xl font-medium">Your voting power</h2>

      <div className="">
        <h3 className="mb-2 text-sm font-semibold text-[#404454]">Your badges</h3>
        <button>
          <Image src="/assets/images/badges.svg" alt="Badges" width={92} height={32} />
        </button>
      </div>

      <div className="flex flex-col content-between justify-between">
        <p className="mb-4 text-sm">Increase your voting power by connecting to WorldID</p>
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
              className="flex w-full items-center justify-center gap-2 rounded-md border border-[#CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-[#0F111A]"
            >
              <WorldIdIcon />
              Connect with WorldID
            </button>
          )}
        </IDKitWidget>
      </div>
      <hr />
      <div className="relative my-4 bg-social-gradient">
        <div className="my-[31px] px-4">
          <div className="flex flex-col content-between justify-between gap-4">
            <div className="text-4xl font-bold text-[#2C6074]">Claim more voting power</div>
            <p className="mb-4 w-full">
              Connect your X and Farcaster account to
              find out if someone delegated their voting
              power to you.
            </p>
          </div>

          <button
            onClick={onConnectTwitter}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-md border border-[#CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-[#0F111A]"
          >
            <XIcon />
            Connect with X (Twitter)
          </button>

          <button
            onClick={onConnectFarcaster}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-[#CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-[#0F111A]"
          >
            <WarpcastIcon />
            Connect with Farcaster
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectBox;
