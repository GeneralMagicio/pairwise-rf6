import React from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { shortenWalletAddress } from '@/app/comparison/utils/helpers';

interface Props {
  onCancel: () => void
  onSignIn: () => void
}

const NewWalletModal: React.FC<Props> = ({ onCancel, onSignIn }) => {
  const { address } = useAccount();
  return (
    <div className="relative flex w-[300px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md md:w-[420px]">
      <Image
        src="/assets/images/op-character4.svg"
        alt="vector"
        width={100}
        height={100}
      />
      <h2 className="my-4 text-xl font-medium">New Wallet Detected</h2>
      <h3 className="mb-4 text-lg font-bold text-gray-400">
        {address ? shortenWalletAddress(address) : ''}
      </h3>
      <p className="mb-8 text-gray-400">
        Looks like you’re connected with a different wallet. Please sign in with
        the connected wallet to continue.
      </p>
      <div className="flex w-full justify-between gap-4">
        <button
          onClick={onCancel}
          className="flex w-full items-center justify-center gap-4 rounded-md
         border border-gray-300 py-2 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSignIn}
          className="w-full rounded-md bg-primary py-2 text-white hover:bg-red-600"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default NewWalletModal;
