import Image from 'next/image';
import React from 'react';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';

interface Props {
  categoryName: string
  onFindDelegatesTwitter: () => void
  onFindDelegatesFarcaster: () => void
}

const DelegateModal: React.FC<Props> = ({
  categoryName,
  onFindDelegatesFarcaster,
}) => {
  return (
    <div className="mx-auto max-w-[500px] rounded-lg bg-white px-6 py-8 shadow-lg">

      <div className="mb-6">
        <Image
          src="/assets/images/op-voting-char.svg"
          alt="Delegate Decision Characters"
          width={300}
          height={150}
          layout="responsive"
        />
      </div>

      <h2 className="mb-2 text-center text-2xl font-medium">
        Delegate
        {' '}
        <span className="text-red-500">

          {categoryName}

        </span>
        {' '}
        decision
        <br />
        to someone you trust
      </h2>

      <p className="my-2 mb-6 text-center text-gray-500">
        If you don't have the time or resources to actively
        participate in this decision, you can still make your voice
        heard by delegating your voting power to a delegate.
      </p>

      <div className="space-y-4">
        <button
          onClick={onFindDelegatesFarcaster}
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2  py-3 text-white hover:bg-gray-100"
        >
          <WarpcastIcon />
          <span className="text-black">Find delegates on Farcaster</span>
        </button>
      </div>
    </div>
  );
};

export default DelegateModal;
