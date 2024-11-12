'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useSignIn, QRCode } from '@farcaster/auth-kit';
import Image from 'next/image';
import Modal from '@/app/utils/Modal';
import LoadingModalContent from './LoadingModalContent';
import LoadedModalContent from './LoadedModalContent';
import { IUpdateFarcasterProps, useFarcasterSignIn, useGetDelegationStatus } from '@/app/utils/getConnectionStatus';
interface FarcasterModalProps {
  isOpen: boolean
  onClose: () => void
}

const FarcasterModal: React.FC<FarcasterModalProps> = ({ isOpen, onClose }) => {
  const { isPending: loading, isError, mutateAsync: connectFarcaster } = useFarcasterSignIn();
  const [terminate, setTerminate] = useState(false);
  const onSuccessCallback = useCallback(
    async ({ message, signature, custody }: IUpdateFarcasterProps) => {
      if (terminate) return;
      await connectFarcaster({ message, signature, custody });
      setTerminate(true);
    }, [terminate]);
  const { isLoading, data: delegates } = useGetDelegationStatus();

  const {
    signIn,
    connect,
    isConnected,
    isSuccess,
    url,
    data,
    isPolling,
  } = useSignIn({
    onSuccess: onSuccessCallback,
  });

  useEffect(() => {
    if (isOpen) {
      connect();
    }
  }, [isOpen, connect]);

  useEffect(() => {
    if (isOpen && isConnected && !isPolling && !isSuccess && !terminate) {
      signIn();
    }
  }, [isOpen, isPolling, isConnected, isSuccess, signIn, terminate]);

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
      {url && (!isSuccess || isError) && (
        <div className="flex w-[300px] flex-col items-center space-y-4 px-6 pb-6 pt-16 text-center md:w-[420px]">
          <div className="relative size-auto">
            <QRCode uri={url} />
            <div className="absolute left-1/2 top-1/2 size-1/4 -translate-x-1/2 -translate-y-1/2 bg-white">
              <Image src="/assets/images/farcaster-icon.svg" layout="fill" objectFit="contain" alt="Farcaster Icon" />
            </div>
          </div>
          <p className="text-nowrap text-lg font-semibold">Sign In With Farcaster</p>
          <p className="w-full max-w-xs text-wrap text-sm text-gray-600">
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
      {!loading && isSuccess && !isError && data?.username && data?.displayName && (
        isLoading
          ? (
              <LoadingModalContent isFarcaster />
            )
          : (
              <LoadedModalContent
                isFarcaster
                numDelegates={delegates?.toYou?.budget.length ?? 0}
                onClose={onClose}
                displayName={data?.displayName}
                username={data?.username}
              />
            )
      )}
    </Modal>
  );
};

export default FarcasterModal;
