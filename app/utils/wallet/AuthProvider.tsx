'use client';

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import { getMessageAndSignature, isLoggedIn, loginToPwBackend, logoutFromPwBackend } from './pw-login';
import { axiosInstance } from '../axiosInstance';
import { usePrevious } from '../methods';

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
  loginAddress: { value: `0x${string}` | undefined, confirmed: boolean }
  setLoginAddress: (value: AuthContextType['loginAddress']) => void
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
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginInProgress, setLoginInProgress] = useState<boolean | null>(
    null,
  );
  const [loggedToPw, setLoggedToPw] = useState(
    LogginToPwBackendState.Initial,
  );

  const [isNewUser, setIsNewUser] = useState(false);

  const [loginAddress, setLoginAddress] = useState<AuthContextType['loginAddress']>({ confirmed: true, value: undefined });

  useAuth();

  return (
    <AuthContext.Provider
      value={{
        loginInProgress,
        setLoginInProgress,
        loggedToPw,
        setLoggedToPw,
        isNewUser,
        setIsNewUser,
        loginAddress,
        setLoginAddress,
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
    // setShowBhModal,
  } = useContext(AuthContext);

  // const [loginFlowDangling, setLoginFlowDangling] = useState(false)
  const { address: connectedAddress, chainId } = useAccount();
  const prevAddress = usePrevious(connectedAddress);
  const { signMessageAsync } = useSignMessage();

  const router = useRouter();
  const path = usePathname();

  const signOut = async (redirectToLanding: boolean = true) => {
    logoutFromPwBackend();
    setLoginAddress({ value: undefined, confirmed: true });
    setLoggedToPw(LogginToPwBackendState.Initial);
    setIsNewUser(false);
    if (redirectToLanding) router.push('/');
  };

  useEffect(() => {
    const loggedInAddress = localStorage.getItem('loggedInAddress');
    if (loggedInAddress) setLoginAddress({ value: loggedInAddress as `0x${string}`, confirmed: true });
  }, []);

  useEffect(() => {
    if (!prevAddress && !loginAddress.value && connectedAddress) {
      setLoginAddress({ value: connectedAddress, confirmed: true });
    }
    else if (prevAddress && connectedAddress !== prevAddress && !path?.includes('comparison')) {
      signOut();
    }
    else if (prevAddress && connectedAddress !== prevAddress && path?.includes('comparison')) {
      setLoginAddress({ ...loginAddress, confirmed: false });
    }
  }, [connectedAddress, prevAddress, path]);

  const redirectToComparisonPage = useCallback(() => {
    if (loggedToPw !== LogginToPwBackendState.LoggedIn) return;
    router.push('/allocation');
  }, [loggedToPw, router]);

  const checkLoggedInToPw = useCallback(async () => {
    if (!loginAddress.value) return;

    const validToken = await isLoggedIn();
    if (validToken) {
      setLoggedToPw(LogginToPwBackendState.LoggedIn);
    }
    else setLoggedToPw(LogginToPwBackendState.Error);
  }, [loginAddress.value]);

  useEffect(() => {
    checkLoggedInToPw();
  }, [checkLoggedInToPw]);

  const doLoginFlow = useCallback(async (addressParam?: `0x${string}`) => {
    console.log('Running the check login flow');
    const address = addressParam ?? connectedAddress;
    if (loginInProgress || !address || !chainId) return;
    // setLoginAddress({value: connectedAddress, confirmed: false})
    let message;
    let signature;

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

  useEffect(() => {
    if (loggedToPw === LogginToPwBackendState.LoggedIn) {
      redirectToComparisonPage();
    }
  }, [loggedToPw, redirectToComparisonPage]);

  // Set up axios interceptors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        if (error.response && error.response.status === 401) {
          signOut();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  // useEffect(() => {
  //   if (address) {
  //     console.log('running because address is', address)
  //     checkLoginFlow()
  //   }
  // }, [address])

  return {
    loggedToPw,
    isNewUser,
    loginInProgress,
    signOut,
    loginAddress,
    setLoginAddress,
    redirectToComparisonPage,
    // setShowBhModal,
    doLoginFlow,
  };
};
