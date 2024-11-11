import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { FarcasterUserByFid, TargetDelegate } from './types';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { useGetConnectionStatus } from '@/app/utils/getConnectionStatus';

interface Props {
  categoryName: string
  handleDelegate: (username: string, target: TargetDelegate) => void
}

function extractFarcasterUsername(input: string) {
  // Remove leading and trailing whitespace
  const trimmedInput = input.trim();

  if (trimmedInput.includes('@')) {
    return trimmedInput.split('@')[1];
  }
  else if (trimmedInput.includes('warpcast.com/')) {
    return trimmedInput.split('warpcast.com/')[1];
  }

  return trimmedInput;
}

export const FarcasterLookup: React.FC<Props> = ({ categoryName, handleDelegate }) => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState<null | false | FarcasterUserByFid['result']['user']>(null);
  const { data: connectionStatus } = useGetConnectionStatus();

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(null);
    const value = e.target.value;
    setUsername(value);
    if (value) checkUsernameValidity(extractFarcasterUsername(value));
  };

  const checkUsernameValidity = useCallback(debounce(async (username: string) => {
    try {
      const { data } = await axiosInstance.get<FarcasterUserByFid>(`flow/farcaster/user-by-username?username=${username}`);
      setIsValid(data.result.user);
    }
    catch {
      setIsValid(false);
    }
  }
  , 1000), []);

  const onDelegate = () => {
    if (!isValid) return;
    handleDelegate(extractFarcasterUsername(username), { displayName: isValid.displayName,
      profilePicture: isValid.pfp.url,
      username: isValid.username });
  };

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/images/warpcast2.png"
          alt="Farcaster icon"
          width={35}
          height={15}
        />
        <h2 className="my-2 text-xl font-medium">Delegate with Farcaster</h2>
      </div>
      <p className="mb-4 text-center text-gray-600">
        <span className="text-sm"> Delegating for </span>
        <br />
        <span className="font-bold text-red-500">
          {categoryName}
        </span>
        <span className="font-bold"> category</span>
      </p>
      <p className="mb-4 text-center text-gray-600">
        Enter username or paste profile link to delegate your voting power to someone you trust
      </p>
      <input
        type="text"
        className="w-full rounded-md border p-2"
        placeholder="Enter username or paste profile link here"
        value={username}
        onChange={handleUsernameChange}
      />
      <div className="h-8 self-start text-sm">
        {isValid
          ? (isValid.username === connectionStatus?.farcaster?.metadata['username'])
              ? <span className="text-primary"> You can&#39;t delegate to yourself.</span>
              : (
                  <div className="flex size-full items-center text-teal-600">
                    <span>{`@${isValid.username}`}</span>
                    <div className="relative mx-1 size-[25px]">
                      <Image
                        src={isValid.pfp.url}
                        alt="User profile picture"
                        fill
                        className="rounded-full"
                        unoptimized
                      />
                    </div>
                    on Farcaster
                  </div>
                )

          : isValid === false ? <span className="text-primary"> No user found with this username  </span> : null}
      </div>
      <button
        onClick={onDelegate}
        className={`w-full rounded-md ${isValid
        && (isValid.username !== connectionStatus?.farcaster?.metadata['username'])
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-400'}  py-2  transition-colors`}
      >
        Delegate
      </button>
    </div>
  );
};
