'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { IDKitWidget, ISuccessResult, useIDKit, VerificationLevel } from '@worldcoin/idkit';
import Modal from '../Modal';
import ConnectLoading from './modals/ConnectLoading';
import NotBadgeHolder from './modals/NotBhModal';
import SignInWithWallet from './modals/SignInModal';
import { LogginToPwBackendState, useAuth } from './AuthProvider';
import NewWalletModal from './modals/NewWalletModal';
import WorldIdSignInSuccessModal from '@/app/allocation/components/WorldIdSignInSuccessModal';
import FarcasterModal from '@/app/allocation/components/FarcasterModal';
import { useWorldSignIn } from '../getConnectionStatus';
import { actionId, appId } from '@/app/lib/constants';

export default function Modals() {
  const path = usePathname();
  const router = useRouter();
  const { address } = useAccount();
  const [isOpenFarcasterModal, setIsOpenFarcasterModal] = useState(false);
  const [isWorldIdSignSuccessModal, setIsWorldIdSignSuccessModal]
    = useState(false);
  const {
    loggedToPw,
    loginInProgress,
    loginAddress,
    setLoginAddress,
    doLoginFlow,
    signOut,
  } = useAuth();

  const { open: isOpen } = useIDKit();

  const { mutateAsync: worldIdSignIn } = useWorldSignIn();

  const handleVerify = async (proof: ISuccessResult) => {
    return (await worldIdSignIn(proof));
  };

  const notBhOpen
    = loggedToPw === LogginToPwBackendState.LoggedIn
    && path === '/' && !isOpenFarcasterModal && !isWorldIdSignSuccessModal && !isOpen;

  const signInModalOpen
    = (address ?? false) && loggedToPw === LogginToPwBackendState.Error;

  const handleNewWalletCancel = () => {
    setLoginAddress({ ...loginAddress, confirmed: true });
  };

  const handleNewWalletSignIn = async () => {
    await signOut();
    setLoginAddress({
      value: address as `0x${string}` | undefined,
      confirmed: true,
    });
    doLoginFlow();
  };

  return (

    <IDKitWidget
      app_id={appId}
      action={actionId}
      onSuccess={() => {
        setIsWorldIdSignSuccessModal(true);
      }}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => (
        <>
          <WorldIdSignInSuccessModal
            isOpen={isWorldIdSignSuccessModal}
            onClose={() => {
              setIsWorldIdSignSuccessModal(false);
            }}
          />
          <FarcasterModal
            isOpen={isOpenFarcasterModal}
            onClose={() => {
              setIsOpenFarcasterModal(false);
            }}
          />
          <Modal
            isOpen={
              loginAddress.value !== address || loginAddress.confirmed === false
            }
            onClose={() => {}}
          >
            <NewWalletModal
              onSignIn={handleNewWalletSignIn}
              onCancel={handleNewWalletCancel}
            />
          </Modal>
          <Modal
            isOpen={notBhOpen}
            onClose={() => {
              router.push('/allocation');
            }}
          >
            {notBhOpen
            && (
              <NotBadgeHolder
                open={() => {
                  open();
                }}
                onConnectFarcaster={() => {
                  setIsOpenFarcasterModal(true);
                }}
                onConnectTwitter={() => {}}
              />
            )}
          </Modal>
          <Modal isOpen={signInModalOpen} onClose={() => {}}>
            {signInModalOpen && <SignInWithWallet />}
          </Modal>
          <Modal isOpen={loginInProgress || false} onClose={() => {}}>
            {loginInProgress && <ConnectLoading />}
          </Modal>
        </>
      )}
    </IDKitWidget>
  );
}
