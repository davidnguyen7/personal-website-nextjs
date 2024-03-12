'use client';

import {useEffect} from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="space-y-2">
      <div className="text-gray-600 dark:text-gray-400">
        Whoops! An error occured while trying to fetch the page for you - please
        refresh the page and try again!
      </div>
    </main>
  );
}
