import { useEnsName } from 'wagmi';
import { shortenWalletAddress } from '@/app/comparison/utils/helpers';

export function ENSResolver(address: string): string {
  const {
    data: ensName,
    error,
  } = useEnsName({
    address,
    chainId: 1,
  });

  if (error) return shortenWalletAddress(address);

  return ensName ? ensName : shortenWalletAddress(address);
}
