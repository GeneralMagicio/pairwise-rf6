import React, { useEffect, useState } from 'react';
import { useSignIn, QRCode } from '@farcaster/auth-kit';
import Image from 'next/image';
import Modal from '@/app/utils/Modal';
import styles from '../../styles/Spinner.module.css';

interface FarcasterModalProps {
  isOpen: boolean
  onClose: () => void
}
interface IDelegates {
  username: string
  points: Number
}

const FarcasterModal: React.FC<FarcasterModalProps> = ({ isOpen, onClose }) => {
  const {
    signIn,
    connect,
    isConnected,
    isSuccess,
    url,
    data,
  } = useSignIn({
    onSuccess: ({ fid }) => console.log('Your fid:', fid),
  });

  const [delegates, setDelegateAmount] = useState< IDelegates[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      connect(); // Establish the relay connection when modal opens
    }
  }, [isOpen, connect]);

  useEffect(() => {
    if (isConnected) {
      signIn();
    }
  }, [isConnected, signIn]);

  useEffect(() => {
    if (data && data.username) {
      setDelegateAmount([
        {
          username: 'username1',
          points: 200,
        },
        {
          username: 'username2',
          points: 300,
        },
      ]);
      setIsLoading(false);
    }
  }, [isSuccess]);

  const handleCopyLink = async () => {
    try {
      if (url) await navigator.clipboard.writeText(url);
    }
    catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {url && !isSuccess && (
        <div className="relative flex flex-col items-center space-y-4 p-2 text-center">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 size-8 rounded-full text-sm text-gray-500 shadow-md hover:bg-gray-200"
            aria-label="Close"
          >
            <span className="flex size-full items-center justify-center">&times;</span>
          </button>

          <div className="relative size-auto">
            <QRCode uri={url} />
            <div className="absolute left-1/2 top-1/2 size-1/4 -translate-x-1/2 -translate-y-1/2 bg-white">
              <Image src="/assets/images/farcaster-icon.svg" layout="fill" objectFit="contain" alt="Farcaster Icon" />
            </div>
          </div>
          <p className="text-nowrap text-lg font-semibold">Sign In With Farcaster</p>
          <p className="w-fit text-wrap text-sm text-gray-600">
            Scan the QR code with your phone or enter the link on your mobile browser
          </p>
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-2 rounded-md
            bg-gray-100 px-4 py-2 text-gray-800 shadow-md hover:bg-gray-200"
          >
            <span>Copy link</span>
          </button>
        </div>
      )}
      {isSuccess && data?.username && (
        isLoading
          ? (
              <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-6">

                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center">
                    <div className={styles.spinner}></div>
                  </div>
                  <div className="text-lg text-[#05060B]">Looking for Voting Power on Farcaster</div>
                  <div className="text-wrap text-center text-sm font-normal text-[#636779]">
                    Searching Farcaster for people who delegated voting power to you.
                  </div>
                </div>
              </div>
            )
          : (
              <div>
                {delegates && delegates.length == 0 && (
                  <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-10">
                    <Image src="assets/images/world-star-success.svg" width={100} height={100} alt="" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-sm text-[#232634]">
                        <div>Successfully connected to your Farcaster account</div>
                        <div>
                          @
                          {data.username}
                        </div>
                      </div>
                      <p className="text-wrap text-center text-mxl font-semibold">
                        You currently don’t have any delegations to your Farcaster account
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
                {delegates && delegates.length > 0 && (
                  <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-10">
                    <Image src="assets/images/star-old.svg" width={100} height={100} alt="" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-sm text-[#232634]">
                        <div>Successfully connected to your Farcaster account</div>
                        <div>
                          @
                          {data.username}
                        </div>
                      </div>
                      <p className="text-wrap text-center text-mxl font-semibold">
                        You have been delegated voting power from the users below
                      </p>
                      {delegates.map(({ username, points }) => (
                        <div key={username} className="w-full gap-1 text-wrap text-center text-base text-[#636779]">
                          <span className="text-sm font-bold text-primary">{points.toString()}</span>
                          {' '}
                          from @
                          {username}
                        </div>
                      ))}
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
            )
      )}
    </Modal>
  );
};

export default FarcasterModal;
