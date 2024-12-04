import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { FarcasterUserByFid, TargetDelegate } from './types';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { useGetConnectionStatus } from '@/app/utils/getConnectionStatus';

interface Props {
  categoryName: string
  handleDelegate: (username: string, target: TargetDelegate, isX?: boolean) => void
  isX?: boolean
}

interface ITwitterResponse
{
  username: string
  displayName: string
}

function extractFarcasterUsername(input: string, isX?: boolean) {
  // Remove leading and trailing whitespace
  const trimmedInput = input.trim();

  if (trimmedInput.includes('@')) {
    return trimmedInput.split('@')[1];
  }
  else if (trimmedInput.includes((isX?'x.com/':'warpcast.com/'))) {
    return trimmedInput.split('warpcast.com/')[1];
  }

  return trimmedInput;
}

export const SocialLookup: React.FC<Props> = ({ categoryName, handleDelegate, isX }) => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState<null | false | FarcasterUserByFid['result']['user'] | ITwitterResponse >(null);
  const { data: connectionStatus } = useGetConnectionStatus();

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(null);
    const value = e.target.value;
    setUsername(value);
    if (value) checkUsernameValidity(extractFarcasterUsername(value,isX));
  };

  const checkUsernameValidity = useCallback(debounce(async (username: string) => {
    try {
      if (isX) {
        console.log("x")
        const response = await fetch('api/checkTwitterUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: `https://x.com/${username}`}),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        const result = await response.json();
        setIsValid(result.data as ITwitterResponse)

      } else {
        const { data } = await axiosInstance.get<FarcasterUserByFid>(`flow/farcaster/user-by-username?username=${username}`);
        setIsValid(data.result.user as FarcasterUserByFid['result']['user']);
      }
    }
    catch {
      setIsValid(false);
    }
  }
  , 1000), []);

  const onDelegate = () => {
    if (!isValid) return;
    if(isX) {
      handleDelegate(extractFarcasterUsername(username), { displayName: isValid.displayName,
        username: isValid.username }, isX);
      return;
    }
    else if('pfp' in isValid) {
    handleDelegate(extractFarcasterUsername(username), { displayName: isValid.displayName,
      profilePicture: isValid.pfp.url,
      username: isValid.username }, isX);
    }
  };

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-8">
      <div className="flex flex-col items-center justify-center">
        {isX?
        <Image
          src="/assets/images/x.svg"
          alt="Twitter Icon"
          width={35}
          height={15}
          />
        :
        <Image
          src="/assets/images/warpcast2.png"
          alt="Farcaster icon"
          width={35}
          height={15}
        />}
        <h2 className="my-2 text-xl font-medium">Delegate on {isX?"X (Twitter)":"Farcaster"}</h2>
      </div>
      <p className="mb-4 text-center text-gray-600">
        <span className="text-sm"> Delegating for </span>
        <br />
        <span className="font-bold text-lg text-red-500">
          {categoryName}
        </span>
        {' '}
        <span className="font-bold text-lg">decision to someone you trust</span>
      </p>
      <p className="mb-4 text-center text-gray-400">
        Enter username or past profile link to delegate voting power to someone on Farcaster
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
                    <div className={`relative ${isX?"mx-1":"size-25"}`}>
                      {!('pfp' in isValid)?<></>:<Image
                        src={isValid.pfp.url}
                        alt="User profile picture"
                        fill
                        className="rounded-full"
                        unoptimized
                      />}
                    </div>
                    {isX?"available on X":"on Farcaster"}
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
