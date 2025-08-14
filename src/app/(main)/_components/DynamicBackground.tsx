'use client';
import dynamic from 'next/dynamic';

// Client component wrapper needed for dynamic to work properly, see:
// https://github.com/vercel/next.js/issues/49454#issuecomment-1830053413
const LazyBackground = dynamic(() => import('./Background'));

export default function DynamicBackground() {
  return <LazyBackground />;
}
