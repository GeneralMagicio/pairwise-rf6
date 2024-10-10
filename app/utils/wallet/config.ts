import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, base, gnosis, mainnet, optimism, polygon } from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

export const projectId = '55df23aa617b4f9c344451b907c660d1';

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
const chains = [optimism, mainnet, arbitrum, polygon, base, gnosis] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  auth: {
    email: false,
    socials: [],
    showWallets: false,
    walletFeatures: false,
  },
  metadata,
  ssr: true,
});
