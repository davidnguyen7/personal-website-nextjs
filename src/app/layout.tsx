import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import PageLink from './PageLink';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'David Nguyen',
  description: "David Nguyen's abode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          ' text-black bg-white dark:text-white dark:bg-black transition-colors duration-150'
        }>
        <div className="container mx-auto flex min-h-screen flex-col space-y-10 p-12 lg:max-w-4xl">
          <div className="space-y-2">
            <div className="text-xl font-light text-gray-700 dark:text-gray-200">
              You&apos;ve reached{' '}
              <span className="font-bold text-black dark:text-white">
                David Nguyen&apos;s
              </span>{' '}
              digital abode.
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              A software engineer based in Sydney.
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-xl font-bold dark:text-gray-400">
            <PageLink href="/">About</PageLink>
            <PageLink href="/projects">Projects</PageLink>
            <PageLink href="/blog">Blog</PageLink>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
