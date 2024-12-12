'use client';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { IReturnTwitterDetails, useTwitterSignIn } from './getConnectionStatus';

interface ICheckTwitterArgs {
  url: string
  text: string
}

interface ITwitterContext {
  username?: string
  displayName?: string
  checkSignInVerificationTweet: (twitterArgs: ICheckTwitterArgs) => Promise<void>
}

const TwitterContext = createContext<ITwitterContext>({
  username: undefined,
  displayName: undefined,
  checkSignInVerificationTweet: async (_twitterArgs: ICheckTwitterArgs) => {},
});

interface IProviderProps {
  children: ReactNode
}

export const TwitterProvider: React.FC<IProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  const { mutateAsync: connectTwitter } = useTwitterSignIn();

  const checkSignInVerificationTweet = useCallback(async (inputs: ICheckTwitterArgs) => {
    try {
      const tweetDetails: IReturnTwitterDetails = await connectTwitter(inputs);
      setDisplayName(tweetDetails.displayName);
      setUsername(tweetDetails.username);
    }
    catch (error: any) {
      console.error(error);
      throw error;
    }
  }, []);

  return (
    <TwitterContext.Provider
      value={{
        username,
        displayName,
        checkSignInVerificationTweet,
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

TwitterContext.displayName = 'Twitter Provider';

export function useTwitter() {
  const context = useContext(TwitterContext);

  if (!context) {
    throw new Error('Profile context not found!');
  }

  return context;
}
