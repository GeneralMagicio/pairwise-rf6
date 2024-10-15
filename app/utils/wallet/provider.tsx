'use client';

import React, { ReactNode } from 'react';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';
import { createThirdwebClient } from 'thirdweb';
import { ThirdwebProvider } from 'thirdweb/react';
import { config, projectId, metadata } from './config';
import { AuthProvider } from './AuthProvider';
import {
  activeChain,
  clientId,
  factoryAddress,
} from '../../lib/constants';

export const smartWalletConfig = {
  factoryAddress: factoryAddress,
  chain: activeChain,
  gasless: true,
};

export const client = createThirdwebClient({ clientId });

// import { siweProviderConfig } from "./SiweProviderConfig";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  metadata,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
    // 'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18'
  ],
  wagmiConfig: config,
  projectId,
  themeMode: 'light',
  allowUnsupportedChain: false,
  allWallets: 'HIDE',
  enableOnramp: false,
  enableSwaps: false,

  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ThirdwebProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ThirdwebProvider>
    </WagmiProvider>
  );
}
