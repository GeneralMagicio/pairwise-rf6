import React from 'react';
import Image from 'next/image';
import { WorldIdIcon } from '@/public/assets/icon-components/WorldIdIcon';
import { XIcon } from '@/public/assets/icon-components/XIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';

interface ConnectBoxProps {
  onConnectWorldID: () => void;
  onConnectTwitter: () => void;
  onConnectFarcaster: () => void;
}

const ConnectBox: React.FC<ConnectBoxProps> = ({
  onConnectWorldID,
  onConnectTwitter,
  onConnectFarcaster
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your voting power</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Your badges</h3>
        <Image src="/path-to-badges-image.png" alt="Badges" width={200} height={50} />
      </div>
      
      <p className="mb-4">Increase your voting power by connecting to WorldID</p>
      
      <button
        onClick={onConnectWorldID}
        className="w-full bg-gray-100 gap-2 text-gray-800 py-2 px-4 rounded-md mb-4 flex items-center justify-center"
      >
        <WorldIdIcon />
        Connect with WorldID
      </button>
      
      <p className="mb-4">Check who delegated their voting power to you? Connect your socials to know more.</p>
      
      <button
        onClick={onConnectTwitter}
        className="w-full bg-gray-100 gap-2 text-gray-800 py-2 px-4 rounded-md mb-2 flex items-center justify-center"
      >
        <XIcon />
        Connect with X (Twitter)
      </button>
      
      <button
        onClick={onConnectFarcaster}
        className="w-full bg-gray-100 text-gray-800 gap-2 py-2 px-4 rounded-md flex items-center justify-center"
      >
        <WarpcastIcon />
        Connect with Farcaster
      </button>
    </div>
  );
};

export default ConnectBox;