import {Metadata} from 'next';
import {IBM_Plex_Sans} from 'next/font/google';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

import AnimationWrapper from './_components/AnimationWrapper';

const IbmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'David Nguyen',
  description:
    'The website of David Nguyen, a Sydney-based software developer.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={IbmPlexSans.className}>
        <AnimationWrapper>{children}</AnimationWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
