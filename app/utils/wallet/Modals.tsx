'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { IDKitWidget, ISuccessResult, useIDKit, VerificationLevel } from '@worldcoin/idkit';
import Modal from '../Modal';
import ConnectLoading from './modals/ConnectLoading';
import BadgeHolderModal from './modals/NotBhModal';
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
  const [isWorldIdSignErrorModal, setIsWorldIdSignErrorModal] = useState(false);
  const {
    loggedToPw,
    loginInProgress,
    loginAddress,
    setLoginAddress,
    doLoginFlow,
    signOut,
    loggedToAgora,
  } = useAuth();

  const { open: isOpen } = useIDKit();

  const { mutateAsync: worldIdSignIn } = useWorldSignIn();

  const handleVerify = async (proof: ISuccessResult) => {
    return (await worldIdSignIn(proof));
  };

  const bhOpen = typeof loggedToAgora === 'object'
    && loggedToPw === LogginToPwBackendState.LoggedIn && path === '/' && !isOpenFarcasterModal && !isWorldIdSignSuccessModal && !isOpen && !isWorldIdSignErrorModal;

  const signInModalOpen
    = !!address && (loggedToAgora === 'error' || loggedToPw === LogginToPwBackendState.Error);

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

      {isWorldIdSignSuccessModal && (
        <WorldIdSignInSuccessModal
          isOpen={isWorldIdSignSuccessModal}
          onClose={() => {
            setIsWorldIdSignSuccessModal(false);
          }}
        />
      )}
      {isWorldIdSignErrorModal && (
        <WorldIdSignInSuccessModal
          isOpen={isWorldIdSignErrorModal}
          onClose={() => {
            setIsWorldIdSignErrorModal(false);
          }}
          isError
        />
      )}
      <IDKitWidget
        app_id={appId}
        action={actionId}
        onSuccess={() => {
          setIsWorldIdSignSuccessModal(true);
        }}
        handleVerify={handleVerify}
        onError={() => {
          setIsWorldIdSignErrorModal(true);
        }}
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => (
          <>
            <Modal
              isOpen={bhOpen}
              onClose={() => {
                router.push('/allocation');
              }}
            >
              {bhOpen
              && (
                <BadgeHolderModal
                  open={() => {
                    open();
                  }}
                  onConnectFarcaster={() => {
                    setIsOpenFarcasterModal(true);
                  }}

                />
              )}
            </Modal>
          </>
        )}
      </IDKitWidget>
      {isOpenFarcasterModal && (
        <FarcasterModal
          isOpen={isOpenFarcasterModal}
          onClose={() => {
            setIsOpenFarcasterModal(false);
          }}
        />
      )}
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

      <Modal isOpen={signInModalOpen} onClose={() => {}}>
        {signInModalOpen && <SignInWithWallet />}
      </Modal>
      <Modal isOpen={loginInProgress || false} onClose={() => {}}>
        {loginInProgress && <ConnectLoading />}
      </Modal>
    </>
  );
}
