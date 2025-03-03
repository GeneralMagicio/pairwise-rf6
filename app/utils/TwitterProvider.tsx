'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
// import { useTwitterSignIn } from './getConnectionStatus';

interface ICheckTwitterArgs {
  url: string
  text: string
}

interface ITwitterContext {
  username?: string
  displayName?: string
  // checkSignInVerificationTweet: (twitterArgs: ICheckTwitterArgs) => Promise<void>
  analyzeTweetUrl: (tweetUrl: string) => Promise<{ username: string, displayName: string }>

}

const TwitterContext = createContext<ITwitterContext>({
  username: undefined,
  displayName: undefined,
  // checkSignInVerificationTweet: async (_twitterArgs: ICheckTwitterArgs) => {},
  analyzeTweetUrl: async (tweetUrl: string) => ({ username: '', displayName: '' }),
});

interface IProviderProps {
  children: ReactNode
}

export const TwitterProvider: React.FC<IProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  // const { mutateAsync: connectTwitter } = useTwitterSignIn();

  // const checkSignInVerificationTweet = useCallback(async (inputs: ICheckTwitterArgs) => {
  //   try {
  //     const tweetDetails: IReturnTwitterDetails = await connectTwitter(inputs);
  //     setDisplayName(tweetDetails.displayName);
  //     setUsername(tweetDetails.username);
  //   }
  //   catch (error: any) {
  //     console.error(error);
  //     throw error;
  //   }
  // }, []);

  /**
 * Analyzes a tweet URL and extracts user information
 * @param tweetUrl URL of the tweet
 * @returns Promise resolving to an object containing username and display name
 * @throws Error if URL is invalid or if there's an issue fetching tweet data
 */
  async function analyzeTweetUrl(tweetUrl: string) {
  // Check if URL is provided
    if (!tweetUrl) {
      throw new Error('Tweet URL is required');
    }

    // Validate URL structure (works with both twitter.com and x.com)
    const tweetUrlPattern = /^https?:\/\/(www\.)?(twitter|x)\.com\/([a-zA-Z0-9_]+)\/status\/\d+/;
    const match = tweetUrl.match(tweetUrlPattern);

    if (!match) {
      throw new Error('Invalid tweet URL format. Expected format: https://twitter.com/username/status/123456789');
    }

    // Extract username from the URL
    setUsername(match[3]);
    setDisplayName(match[3]);

    return { username: match[3], displayName: match[3] };
  }

  return (
    <TwitterContext.Provider
      value={{
        username,
        displayName,
        // checkSignInVerificationTweet,
        analyzeTweetUrl,
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
