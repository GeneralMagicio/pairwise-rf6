import React from 'react';
import Image from 'next/image';
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { XIcon } from '@/public/assets/icon-components/XIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
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
    const res = await fetch('/api/verifyWorldCoin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ proof }),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('Verification failed!');
    }
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
          <Image
            src="/assets/images/badges.svg"
            alt="Badges"
            width={64}
            height={16}
          />
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
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-md border border-[#CBD5E0] bg-gray-50 px-4 py-2 font-semibold text-gray-700"
          >
            <WorldIdIcon />
            Connect with WorldID
          </button>
        )}
      </IDKitWidget>

      <hr className="my-6" />

      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-xl bg-voting-power bg-cover bg-no-repeat p-4">
        <p className="text-4xl font-bold text-[#2C6074]">
          You have extra powers now!
        </p>
        <p className="font-medium text-gray-600">
          Some people have delegated their voting power to you. With great power
          comes great responsibility. Use it wisely.
        </p>

        <button
          onClick={onConnectTwitter}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[##CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-gray-800"
        >
          <XIcon />
          Connect with X (Twitter)
        </button>

        <button
          onClick={onConnectFarcaster}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[##CBD5E0] bg-gray-100 px-4 py-2 font-semibold text-gray-800"
        >
          <WarpcastIcon />
          Connect with Farcaster
        </button>
      </div>
    </div>
  );
};

export default ConnectBox;
