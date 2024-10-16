import Image from 'next/image';
import React from 'react';
interface LoadedModalContentProps {
  numDelegates: number
  onClose: () => void
  username: string
  displayName: string
  isFarcaster?: boolean
}

const LoadedModalContent: React.FC<LoadedModalContentProps> = ({ isFarcaster, numDelegates, onClose, username }) => {
  const socialConnectionName = isFarcaster ? 'Farcaster' : 'X';
  return (
    <div>
      {(numDelegates == 0) && (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-10">
          <Image src="assets/images/world-star-success.svg" width={100} height={100} alt="" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-center text-sm text-[#232634]">
              <div>
                Successfully connected to your
                {socialConnectionName}
                {' '}
                account
              </div>
              <div className="text-center">
                @
                {username}
              </div>
            </div>
            <p className="text-wrap text-center text-mxl font-semibold">
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
            onClick={onClose}
          >
            <p className="p-0.5">Done</p>
          </button>
        </div>
      )}
      {numDelegates && (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-10">
          <Image src="assets/images/star-old.svg" width={100} height={100} alt="" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-[#232634]">
              <div>Successfully connected to your Farcaster account</div>
              <div>
                <div></div>
                @
                {username}
              </div>
            </div>
            <p className="text-wrap text-center text-mxl font-semibold">
              You have been delegated voting power from the users below
            </p>

          </div>
          <div className="w-full text-center font-semibold text-primary">
            <div className="text-base ">Your current voting power</div>
            <div className="p-3 text-5xl font-bold text-primary">{20000}</div>
          </div>
          <button
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-white"
            onClick={onClose}
          >
            <p className="p-0.5">Done</p>
          </button>
        </div>
      )}
    </div>
  );
};
export default LoadedModalContent;
