'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { usePostHog } from 'posthog-js/react';
import { CoinbaseIcon } from '@/public/assets/icon-components/CoinbaseIcon';
import { MetaMaskIcon } from '@/public/assets/icon-components/MetaMaskIcon';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRight';
import { WalletConnectIcon } from '@/public/assets/icon-components/WalletConnectIcon';
import { ZerionIcon } from '@/public/assets/icon-components/ZerionIcon';
import { ConnectedButton } from './ConnectedButton';
import { useAuth } from './AuthProvider';
// import { loginToAgora } from './agora-login'

export const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { signOut, loginAddress } = useAuth();
  const posthog = usePostHog();

  const logout = async () => {
    await disconnectAsync();
    signOut();
  };
  // const { signMessageAsync } = useSignMessage()

  function handleOpen() {
    posthog.capture('Connect');
    try {
      open();
    }
    catch (_e) {
      open();
    }
  }

  // useEffect(() => {
  //   if (!address || !chainId) return

  //   const func = async () => {
  //     const payload = await loginToAgora(address, chainId, signMessageAsync)
  //     // console.log(loggedIn)
  //   }

  //   func()
  // }, [isConnected, address, chainId, signMessageAsync])

  if (isConnected && loginAddress.value) return (
    <ConnectedButton onLogout={logout} wallet={loginAddress.value} />
  );

  return (
    <button
      onClick={handleOpen}
      className="flex h-max items-center gap-2 rounded-full
     bg-primary px-4 py-1.5 font-semibold text-white shadow-md transition duration-300
     hover:bg-red-600 sm:px-6 sm:py-2 md:px-8 md:py-3"
    >
      <span className="ml-2">Connect</span>
      <ArrowRightIcon />
    </button>
  );
};

const ConnectWalletModal = () => {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white shadow-lg">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Connect wallet</h2>

        <div className="space-y-3">
          <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4 transition-colors
           hover:bg-gray-200"
          >
            <div className="flex items-center">
              <MetaMaskIcon />
              <span className="ml-2 text-lg">MetaMask</span>
            </div>
            <span className="rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-600">Popular</span>
          </button>

          <button className="flex w-full items-center rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <ZerionIcon />
            <span className="ml-2 text-lg">Zerion</span>
          </button>

          <button className="flex w-full items-center rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <CoinbaseIcon />
            <span className="ml-2 text-lg">Coinbase Wallet</span>
          </button>

          <button className="flex w-full items-center rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200">
            <WalletConnectIcon />
            <span className="ml-2 text-lg">WalletConnect</span>
          </button>
        </div>

        <div className="mt-6">
          <a href="#" className="text-red-500 hover:underline">Need help?</a>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
