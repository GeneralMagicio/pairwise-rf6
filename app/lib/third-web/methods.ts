import { Account, inAppWallet, smartWallet } from 'thirdweb/wallets';
import StorageLabel from '../localStorage';
import { client, smartWalletConfig } from '@/app/utils/wallet/provider';

export enum Strategy {
  Google = 'google',
}

export const createEmailEoa = async (
  email: string,
  verificationCode: string
) => {
  const wallet = inAppWallet();
  await wallet.connect({
    client,
    strategy: 'email',
    email,
    verificationCode,
  });
  localStorage.setItem(StorageLabel.LAST_CONNECT_PERSONAL_WALLET_ID, wallet.id);
  return wallet;
};

export const createSocialEoa = async (strategy: Strategy) => {
  const socialEOA = inAppWallet();
  await socialEOA.connect({
    client,
    strategy,
  });
  localStorage.setItem(
    StorageLabel.LAST_CONNECT_PERSONAL_WALLET_ID,
    socialEOA.id
  );
  return socialEOA;
};

export const createSmartWalletFromEOA = async (eoa: Account) => {
  const wallet = smartWallet(smartWalletConfig);
  await wallet.connect({
    personalAccount: eoa,
    client,
  });

  return wallet;
};
