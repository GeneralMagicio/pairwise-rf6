import { optimism, optimismSepolia } from 'thirdweb/chains';

export const starColor = {
  1: '#FF1D1D',
  2: '#FF8C22',
  3: '#F8CE00',
  4: '#46C34C',
  5: '#479F78',
};

export const starHoverColor = {
  1: '#FF9999',
  2: '#FFB570',
  3: '#FFE870',
  4: '#B2E6B4',
  5: '#479F7899',
};

export const appId = (process.env.NEXT_PUBLIC_WORLD_APP_ID as `app_${string}`)!;
export const actionId = process.env.NEXT_PUBLIC_WORLD_ACTION_ID!;
export const brandColor = {
  primary: '#FF0420',
};

const getActiveChain = (chain?: string) => {
  switch (chain) {
    case 'optimism':
      return optimism;
    case 'optimism-sepolia':
      return optimismSepolia;
    default:
      return optimismSepolia;
  }
};

export const activeChain = getActiveChain(
  process.env.NEXT_PUBLIC_THIRDWEB_ACTIVE_CHAIN
);
export const factoryAddress
  = process.env.NEXT_PUBLIC_THIRDWEB_FACTORY_ADDRESS
  || '0xE424DC62723a40FCE052c5300699C28A3bD7cc01';
export const clientId
  = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
  || 'ab996cc033833508e203e80eecca234f';
