import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import '../globals.css';
import NavLink from '../../components/NavLink';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import Background from '@/components/Background';
import {client} from '@/cms/client';
import {groq} from 'next-sanity';
import {Settings} from '@/cms/schema/singletons/Settings';
import LinkedinLink from '@/components/socialmedia/LinkedinLink';
import GithubLink from '@/components/socialmedia/GithubLink';

const inter = Inter({subsets: ['latin']});

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
          inter.className +
          ' text-black bg-white dark:text-white dark:bg-black transition-colors duration-150'
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
            <div className="mt-4 flex flex-wrap gap-4">
              {settings?.linkedin ? (
                <LinkedinLink id={settings.linkedin} />
              ) : null}
              {settings?.github ? <GithubLink id={settings.github} /> : null}
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-xl font-bold dark:text-gray-400">
            <NavLink href="/">About</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </nav>
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
