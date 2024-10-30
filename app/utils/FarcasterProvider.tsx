'use client';

import { ReactNode } from 'react';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { ToastContainer } from 'react-toastify';

const authKitConfig = {};

export default function FarcasterProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <AuthKitProvider config={authKitConfig}>
      <ToastContainer />
      {children}
    </AuthKitProvider>
  );
}
