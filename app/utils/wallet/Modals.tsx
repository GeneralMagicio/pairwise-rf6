'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import Modal from '../Modal';
import ConnectLoading from './modals/ConnectLoading';
import NotBadgeHolder from './modals/NotBhModal';
import SignInWithWallet from './modals/SignInModal';
import { LogginToPwBackendState, useAuth } from './AuthProvider';
import NewWalletModal from './modals/NewWalletModal';

export default function Modals() {
  const path = usePathname();
  const { address } = useAccount();
  const {
    loggedToPw,
    loginInProgress,
    loginAddress,
    setLoginAddress,
    doLoginFlow,
    signOut,
  } = useAuth();

  const notBhOpen
    = loggedToPw === LogginToPwBackendState.LoggedIn
    && !path?.includes('comparison');

  const signInModalOpen
    = (!!address ?? false) && loggedToPw === LogginToPwBackendState.Error;

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
    <>
      <Modal
        isOpen={
          loginAddress.value !== address && loginAddress.confirmed === false
        }
        onClose={() => {}}
      >
        <NewWalletModal
          onSignIn={handleNewWalletSignIn}
          onCancel={handleNewWalletCancel}
        />
      </Modal>
      <Modal isOpen={notBhOpen} onClose={() => {}}>
        {notBhOpen && <NotBadgeHolder />}
      </Modal>
      <Modal isOpen={signInModalOpen} onClose={() => {}}>
        {signInModalOpen && <SignInWithWallet />}
      </Modal>
      <Modal isOpen={loginInProgress || false} onClose={() => {}}>
        {loginInProgress && <ConnectLoading />}
      </Modal>
    </>
  );
}
