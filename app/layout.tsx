import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Providers from '@/components/providers/providers';
import SocketConnector from '@/components/socket-connector';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GGPG',
  description: 'Greenwich Gradual Project Gallery'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={'h-full w-full'} suppressHydrationWarning={true}>
      <body
        className={`${inter.className} h-full w-full`}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <SocketConnector />
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
