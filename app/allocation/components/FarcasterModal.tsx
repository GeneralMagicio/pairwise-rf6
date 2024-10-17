'use client';
import React, { useEffect, useState } from 'react';
import { useSignIn, QRCode } from '@farcaster/auth-kit';
import Image from 'next/image';
import Modal from '@/app/utils/Modal';
import LoadingModalContent from './LoadingModalContent';
import LoadedModalContent from './LoadedModalContent';

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
    onSuccess: ({ fid }) => { console.log(fid); },
  });
  const [delegates, setDelegateAmount] = useState< IDelegates[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [hasSignedIn, setHasSignedIn] = useState(false);

  useEffect(() => {
    if (isOpen && !isConnected) {
      // Establish the relay connection when modal opens
      connect();
    }
  }, [isOpen, isConnected]);

  useEffect(() => {
    if (isConnected && !isSuccess && !hasSignedIn) {
      console.log('connected');
      signIn();
      setHasSignedIn(true);
    }
  }, [isConnected, signIn, isSuccess, hasSignedIn]);

  useEffect(() => {
    if (data) {
      console.log('set data');
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
  }, [data]);

  const handleCopyLink = async () => {
    try {
      if (url) await navigator.clipboard.writeText(url);
    }
    catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      {url && !isSuccess && (
        <div className="relative flex flex-col items-center space-y-4 p-2 text-center">
          <div className="relative size-auto">
            <QRCode uri={url} />
            <div className="absolute left-1/2 top-1/2 size-1/4 -translate-x-1/2 -translate-y-1/2 bg-white">
              <Image src="/assets/images/farcaster-icon.svg" layout="fill" objectFit="contain" alt="Farcaster Icon" />
            </div>
          </div>
          <p className="text-nowrap text-lg font-semibold">Sign In With Farcaster</p>
          <p className="w-min grow text-wrap text-sm text-gray-600">
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
      {isSuccess && data?.username && data?.displayName && (
        isLoading
          ? (
              <LoadingModalContent isFarcaster />
            )
          : (
              <LoadedModalContent
                isFarcaster
                numDelegates={delegates?.length ?? 0}
                onClose={onClose}
                displayName={data?.displayName}
                username={data?.displayName}
              />
            )
      )}
    </Modal>
  );
};

export default FarcasterModal;
