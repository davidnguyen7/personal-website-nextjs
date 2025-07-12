'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`transition-colors ${pathname === href ? 'text-black dark:text-white' : 'hover:text-black active:text-black dark:hover:text-white dark:active:text-white text-gray-500 dark:text-gray-400'}`}>
      {children}
    </Link>
  );
}
