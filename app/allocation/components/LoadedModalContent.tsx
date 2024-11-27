import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
interface LoadedModalContentProps {
  numDelegates: number
  onClose: () => void
  username: string
  displayName: string
  isFarcaster?: boolean
}

const LoadedModalContent: React.FC<LoadedModalContentProps> = (
  { isFarcaster,
    numDelegates,
    displayName,
    onClose,
    username }) => {
  const socialConnectionName = isFarcaster ? 'Farcaster' : 'X';
  const router = useRouter();
  const path = usePathname();
  const onSuccess = () => {
    if (isFarcaster && path !== '/allocation') {
      router.push('/allocation');
    }
    onClose();
  };
  return (
    <div>
      {(numDelegates == 0) && (
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-10">
          <Image src="assets/images/star-old.svg" width={100} height={100} alt="" />
          <div className="flex flex-col items-center gap-4">
            <div className="py-2 text-sm text-[#232634]">
              <div>
                Successfully connected to your
                {' '}
                {socialConnectionName}
                {' '}
                account
              </div>

            </div>
            <div className="align-center flex flex-row justify-center">
              <div className="m-auto">
                {isFarcaster
                  ? <Image src="/assets/images/farcaster.svg" width={32} height={32} alt="World ID Icon" />
                  : <Image src="/assets/images/x.svg" width={32} height={32} alt="X Icon" />}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-[#344054]">{username}</div>
                <div className="text-xs font-medium text-[#636779]">
                  @
                  {displayName}
                </div>
              </div>
            </div>
            <p className="text-wrap text-center text-2xl font-semibold">
              You currently don’t have any delegations to your
              {' '}
              {socialConnectionName}
              {' '}
              account
            </p>
            <p className="text-wrap text-center text-sm text-[#636779]">
              You can always check back later if someone has delegated you voting power
            </p>
          </div>
          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-white"
            onClick={onSuccess}
          >
            <p className="p-0.5">Ok</p>
          </button>
        </div>
      )}
      {(numDelegates != 0) && (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-10">
          <Image src="assets/images/world-star-success.svg" width={100} height={100} alt="" />
          <div className="flex flex-col items-center gap-2">
            <div className="py-2 text-sm text-[#232634]">
              <div>
                Successfully connected to your
                {socialConnectionName}
                {' '}
                account
              </div>
              <div className="align-center flex flex-row justify-center">
                <div>
                  {isFarcaster
                    ? <Image src="/assets/images/farcaster.svg" width={32} height={32} alt="World ID Icon" />
                    : <Image src="/assets/images/x.svg" width={32} height={32} alt="X Icon" />}
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-[#344054]">{username}</div>
                  <div className="text-xs font-medium text-[#636779]">
                    @
                    {displayName}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-wrap text-center text-mxl font-semibold">
              You have been delegated voting power from
              {' '}
              {numDelegates}
              {' '}
              users
            </p>
          </div>
          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-white"
            onClick={onSuccess}
          >
            <p className="p-0.5">Done</p>
          </button>
        </div>
      )}
    </div>
  );
};
export default LoadedModalContent;
