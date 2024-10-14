import React from 'react';
import Image from 'next/image';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { XIcon } from '@/public/assets/icon-components/XIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';
import { actionId, appId } from '@/app/lib/constants';

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
    const res = await fetch("/api/verifyWorldCoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({proof}),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Verification failed!");
    }
  };
  return (
    <div className="max-w-md rounded-lg border bg-white p-6">
      <h2 className="mb-4 w-full border-b pb-2 text-2xl font-medium">Your voting power</h2>

      <div className="mb-2">
        <h3 className="mb-2 text-lg font-semibold">Your badges</h3>
        <button>
          <Image src="/assets/images/badges.svg" alt="Badges" width={64} height={16} />
        </button>
      </div>

      <p className="mb-4">Increase your voting power by connecting to WorldID</p>

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
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-800"
              >
                <WorldIdIcon />
                Connect with WorldID
              </button>
              )}
            </IDKitWidget>
      

      <p className="mb-4 w-full border-t pt-4">
        Check who delegated their voting power
        to you? Connect your socials to know more.
      </p>

      <button
        onClick={onConnectTwitter}
        className="mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-800"
      >
        <XIcon />
        Connect with X (Twitter)
      </button>

      <button
        onClick={onConnectFarcaster}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-800"
      >
        <WarpcastIcon />
        Connect with Farcaster
      </button>
    </div>
  );
};

export default ConnectBox;
