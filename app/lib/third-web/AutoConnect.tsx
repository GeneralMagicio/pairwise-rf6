'use client';

import React, { ReactNode, useState } from 'react';

export enum LogginToPwBackendState {
  Initial,
  Error,
  LoggedIn,
}

const AuthContext = React.createContext<{
  isAutoConnecting: boolean | null;
  setIsAutoConnecting: (bool: boolean | null) => void;
  loggedToPw: LogginToPwBackendState;
  isNewUser: boolean;
  setLoggedToPw: (bool: LogginToPwBackendState) => void;
  setIsNewUser: (bool: boolean) => void;
}>({
  isAutoConnecting: null,
  setIsAutoConnecting: () => {},
  loggedToPw: LogginToPwBackendState.Initial,
  isNewUser: false,
  setLoggedToPw: () => {},
  setIsNewUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAutoConnecting, setIsAutoConnecting] = useState<boolean | null>(
    null
  );
  const [loggedToPw, setLoggedToPw] = useState(LogginToPwBackendState.Initial);
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAutoConnecting,
        setIsAutoConnecting,
        loggedToPw,
        setLoggedToPw,
        isNewUser,
        setIsNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
