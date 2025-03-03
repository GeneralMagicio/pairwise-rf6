import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { TargetDelegate } from './types';
import { useGetConnectionStatus } from '@/app/utils/getConnectionStatus';

interface Props {
  categoryName: string
  handleDelegate: (username: string, target: TargetDelegate) => void
}

/**
 * Validates if a string represents a valid Twitter username (handle)
 *
 * Twitter usernames:
 * - Must be between 1-15 characters long
 * - Can only contain letters, numbers, and underscores
 * - May be entered with or without the '@' prefix
 *
 * @param input - The string to validate as a Twitter username (with or without '@')
 * @returns boolean - True if valid, false otherwise
 */
function isValidTwitterUsername(input: string): boolean {
  // If the input starts with '@', remove it for validation
  const handle = input.startsWith('@') ? input.substring(1) : input;

  // Check if the handle is less than 3 chars
  if (handle.length < 3) {
    return false;
  }

  // Check if the handle exceeds maximum length (15 characters)
  if (handle.length > 15) {
    return false;
  }

  // Check if the handle contains only alphanumeric characters and underscores
  const validCharsRegex = /^[A-Za-z0-9_]+$/;
  return validCharsRegex.test(handle);
}

function extractTwitterUsername(profileUrl: string) {
  const username = profileUrl.trim().split('/').at(-1);

  return username || '';
}

export const TwitterLookup: React.FC<Props> = ({ categoryName, handleDelegate }) => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState<null | false | { username: string }>(null);
  const { data: connectionStatus } = useGetConnectionStatus();

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(null);
    const value = e.target.value;
    setUsername(value);
    if (value) checkUsernameValidity(extractTwitterUsername(value));
  };

  const checkUsernameValidity = useCallback(debounce(async (username: string) => {
    // try {
    //   const { data } = await axiosInstance.get<FarcasterUserByFid>
    // (`flow/farcaster/user-by-username?username=${username}`);
    //   setIsValid(data.result.user);
    // }
    // catch {
    //   setIsValid(false);
    // }
    if (isValidTwitterUsername(username)) {
      setIsValid({ username });
    }
    else setIsValid(false);
  }
  , 1000), []);

  const onDelegate = () => {
    if (!isValid) return;
    handleDelegate(extractTwitterUsername(username), { displayName: isValid.username,
      profilePicture: '/assets/images/X.svg',
      username: isValid.username });
  };

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/images/X.svg"
          alt="X icon"
          width={35}
          height={15}
        />
        <h2 className="my-2 text-xl font-medium">Delegate with X(Twitter)</h2>
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
          ? (isValid.username
          && connectionStatus?.twitter?.username
          && isValid.username.toLowerCase() === connectionStatus?.twitter?.username.toLowerCase())
              ? <span className="text-primary"> You can&#39;t delegate to yourself.</span>
              : (
                  <div className="flex size-full items-center text-teal-600">
                    <span className="mr-1">{`@${isValid.username}`}</span>
                    on X (Twitter)
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
