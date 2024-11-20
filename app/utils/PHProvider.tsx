'use client';
// import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, useEffect, useState } from 'react';

export function PHProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (window !== undefined) {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <PostHogProvider client={window.posthog}>{children}</PostHogProvider>;
}
