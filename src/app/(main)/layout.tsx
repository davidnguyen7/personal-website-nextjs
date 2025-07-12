import '../globals.css';

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

import {groq} from 'next-sanity';
import {client} from '@/cms/client';
import {Settings} from '@/cms/schema/singletons/Settings';

import Background from '@/components/threejs/Background';
import NavBar from '@/components/navigation/NavBar';
import SocialMediaRedirects from '@/components/SocialMediaRedirects';

const FONT = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'David Nguyen',
  description:
    'The digital home of David Nguyen, a Sydney-based software engineer.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch<Settings>(
    groq`*[_type == "settings"][0]`,
  );
  return (
    <html lang="en">
      <body
        className={
          FONT.className +
          ' text-gray-600 dark:text-gray-400 bg-white dark:bg-black transition-colors duration-150'
        }>
        <Background />
        <div className="container mx-auto flex min-h-screen flex-col space-y-10 p-12 lg:max-w-4xl">
          <div>
            <div className="text-xl font-light text-gray-700 dark:text-gray-200">
              You&apos;ve reached{' '}
              <span className="font-bold text-black dark:text-white">
                David Nguyen&apos;s
              </span>{' '}
              digital home.
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-400">
              A software engineer based in Sydney.
            </div>
            <SocialMediaRedirects
              linkedin={settings?.linkedin}
              github={settings?.github}
            />
          </div>
          <NavBar />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
