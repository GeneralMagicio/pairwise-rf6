'use client';

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import { WalletId, createWallet } from 'thirdweb/wallets';
import { useActiveWallet, useConnect, useDisconnect as useThirdwebDisconnect } from 'thirdweb/react';
import { AxiosError } from 'axios';
import { usePostHog } from 'posthog-js/react';
import {
  isLoggedIn,
  loginToPwBackend,
  logoutFromPwBackend,
} from './pw-login';
import { API_URL, axiosInstance } from '../axiosInstance';
import { usePrevious } from '../methods';
import StorageLabel from '@/app/lib/localStorage';
import { client, smartWalletConfig } from './provider';
import { getMessageAndSignature, isLoggedInToAgora, loginToAgora, signOutFromAgora } from './agora-login';
import { JWTPayload } from './types';

export enum LogginToPwBackendState {
  Initial,
  Error,
  LoggedIn,
}

interface AuthContextType {
  loginInProgress: boolean | null
  setLoginInProgress: (bool: boolean | null) => void
  loggedToPw: LogginToPwBackendState
  setLoggedToPw: (bool: LogginToPwBackendState) => void
  isNewUser: boolean
  setIsNewUser: (bool: boolean) => void
  loggedToAgora: 'initial' | 'error' | JWTPayload
  setLoggedToAgora: (value: AuthContextType['loggedToAgora']) => void
  loginAddress: { value: `0x${string}` | undefined, confirmed: boolean }
  setLoginAddress: (value: AuthContextType['loginAddress']) => void
  isAutoConnecting: boolean
  setIsAutoConnecting: (bool: boolean) => void
}

const AuthContext = React.createContext<AuthContextType>({
  loginInProgress: null,
  setLoginInProgress: () => {},
  loggedToPw: LogginToPwBackendState.Initial,
  isNewUser: false,
  setLoggedToPw: () => {},
  setIsNewUser: () => {},
  loginAddress: { value: undefined, confirmed: true },
  setLoginAddress: () => {},
  isAutoConnecting: false,
  setIsAutoConnecting: () => {},
  loggedToAgora: 'initial',
  setLoggedToAgora: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginInProgress, setLoginInProgress] = useState<boolean | null>(null);
  const [loggedToPw, setLoggedToPw] = useState(LogginToPwBackendState.Initial);
  const [isAutoConnecting, setIsAutoConnecting] = useState(false);
  const [loggedToAgora, setLoggedToAgora] = useState<AuthContextType['loggedToAgora']>('initial');

  const [isNewUser, setIsNewUser] = useState(false);

  const [loginAddress, setLoginAddress] = useState<
    AuthContextType['loginAddress']
  >({ confirmed: true, value: undefined });

  useAuth();

  return (
    <AuthContext.Provider
      value={{
        loginInProgress,
        setLoginInProgress,
        loggedToAgora,
        setLoggedToAgora,
        loggedToPw,
        setLoggedToPw,
        isNewUser,
        setIsNewUser,
        loginAddress,
        setLoginAddress,
        isAutoConnecting,
        setIsAutoConnecting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {
    loggedToPw,
    setLoggedToPw,
    setIsNewUser,
    isNewUser,
    loginInProgress,
    setLoginInProgress,
    loginAddress,
    setLoginAddress,
    isAutoConnecting,
    setIsAutoConnecting,
    loggedToAgora,
    setLoggedToAgora,
  } = useContext(AuthContext);

  // const [loginFlowDangling, setLoginFlowDangling] = useState(false)
  const { address: connectedAddress, chainId } = useAccount();
  const prevAddress = usePrevious(connectedAddress);
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();
  const path = usePathname();
  const { connect } = useConnect();
  const wallet = useActiveWallet();
  const { disconnect } = useThirdwebDisconnect();
  const posthog = usePostHog();

  const clearLocalStorage = () => {
    localStorage.removeItem(StorageLabel.AUTH);
    localStorage.removeItem(StorageLabel.AGORA_SIWE_JWT);
    localStorage.removeItem(StorageLabel.LOGGED_IN_ADDRESS);
    localStorage.removeItem(StorageLabel.LAST_CONNECT_PERSONAL_WALLET_ID);
  };

  const signOut = async (redirectToLanding: boolean = true) => {
    signOutFromAgora();
    setLoggedToAgora('initial');
    clearLocalStorage();
    if (wallet) disconnect(wallet);
    logoutFromPwBackend();
    setLoginAddress({ value: undefined, confirmed: true });
    setLoggedToPw(LogginToPwBackendState.Initial);
    setIsNewUser(false);
    if (redirectToLanding) router.push('/');
  };

  useEffect(() => {
    const loggedInAddress = localStorage.getItem(StorageLabel.LOGGED_IN_ADDRESS);
    if (loggedInAddress)
      setLoginAddress({
        value: loggedInAddress as `0x${string}`,
        confirmed: true,
      });
  }, []);

  useEffect(() => {
    if (!prevAddress && !loginAddress.value && connectedAddress) {
      setLoginAddress({
        value: connectedAddress as `0x${string}` | undefined,
        confirmed: true,
      });
    }
    else if (
      prevAddress
      && connectedAddress !== prevAddress
      && !path?.includes('comparison')
    ) {
      signOut();
    }
    else if (
      prevAddress
      && connectedAddress !== prevAddress
      && path?.includes('comparison')
    ) {
      setLoginAddress({ ...loginAddress, confirmed: false });
    }
  }, [connectedAddress, prevAddress, path]);

  const checkLoggedInToPwAndAgora = useCallback(async () => {
    if (!loginAddress.value) return;

    const loggedInToAgora = await isLoggedInToAgora(loginAddress.value);
    if (loggedInToAgora) setLoggedToAgora(loggedInToAgora);
    else setLoggedToAgora('error');

    const validToken = await isLoggedIn();
    if (validToken) {
      setLoggedToPw(LogginToPwBackendState.LoggedIn);
    }
    else {
      setLoggedToPw(LogginToPwBackendState.Error);
    }
  }, [
    loginAddress.value,
  ]);

  useEffect(() => {
    checkLoggedInToPwAndAgora();
  }, [checkLoggedInToPwAndAgora]);

  const doLoginFlow = useCallback(async (addressParam?: `0x${string}`) => {
    console.log('Running the check login flow');
    const address = addressParam ?? connectedAddress as `0x${string}`;
    if (loginInProgress || !address || !chainId) return;
    // setLoginAddress({value: connectedAddress, confirmed: false})
    let message;
    let signature;

    try {
      console.log('chking agora exp');
      const loggedInToAgora = await isLoggedInToAgora(address);
      if (loggedInToAgora) setLoggedToAgora(loggedInToAgora);
      else {
        const { message: val1, signature: val2 } = await getMessageAndSignature(address, chainId, signMessageAsync);
        message = val1;
        signature = val2;
        console.log('loggin to agora');
        setLoginInProgress(true);
        posthog.identify(address);
        const res = await loginToAgora(message, signature);
        setLoggedToAgora(res);
      }
    }
    catch (e) {
      console.log('agora err');
      setLoggedToAgora('error');
      setLoginInProgress(false);
      return;
    }

    try {
      console.log('Checking pw token if exists?');
      const validToken = await isLoggedIn();
      if (validToken) {
        console.log('vt:', validToken);
        setLoggedToPw(LogginToPwBackendState.LoggedIn);
      }
      else {
        if (!message || !signature) {
          const { message: val1, signature: val2 } = await getMessageAndSignature(address, chainId, signMessageAsync);
          message = val1;
          signature = val2;
        }
        setLoginInProgress(true);
        console.log('Logging to pw');
        const res = await loginToPwBackend(
          chainId,
          address,
          message,
          signature
        );
        if (res.isNewUser) {
          setIsNewUser(true);
        }
        setLoggedToPw(LogginToPwBackendState.LoggedIn);
      }
    }
    catch (e) {
      console.log('pw error', e);
      setLoggedToPw(LogginToPwBackendState.Error);
      return;
    }
    finally {
      setLoginInProgress(false);
    }
  }, [chainId, connectedAddress]);

  // Set up axios interceptors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error: AxiosError) {
        if (error.response && error.response.status === 401) {
          // check the base url to prevent signing out when getting 401 from other origins
          if (error?.config?.baseURL?.includes(API_URL)) {
            await disconnectAsync();
            signOut();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const main = async () => {
      try {
        const personalWalletId = localStorage.getItem(
          StorageLabel.LAST_CONNECT_PERSONAL_WALLET_ID
        );

        if (!personalWalletId) return;
        setIsAutoConnecting(true);
        const personalWallet = createWallet(personalWalletId as WalletId);
        const personalAccount = await personalWallet.autoConnect({
          client: client,
        });
        const smartWallet = createWallet('smart', smartWalletConfig);
        await smartWallet.connect({ personalAccount, client: client });
        await connect(smartWallet);
      }
      finally {
        setIsAutoConnecting(false);
      }
    };

    main();
  }, [setIsAutoConnecting, connect]);

  // useEffect(() => {
  //   if (address) {
  //     console.log('running because address is', address)
  //     checkLoginFlow()
  //   }
  // }, [address])

  return {
    loggedToPw,
    isNewUser,
    loggedToAgora,
    loginInProgress,
    signOut,
    loginAddress,
    setLoginAddress,
    isAutoConnecting,
    doLoginFlow,
  };
};
