'use client';

import { ReactNode } from 'react';
import { AuthKitProvider } from '@farcaster/auth-kit';

const authKitConfig = {};

export default function FarcasterProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <AuthKitProvider config={authKitConfig}>
      {children}
    </AuthKitProvider>
  );
}
