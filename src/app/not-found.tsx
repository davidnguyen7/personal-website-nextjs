import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div className="mb-4 dark:text-gray-400">
        You&apos;ve wandered off the path - straight into a <b>404</b> error.
      </div>
      <Link href="/">Shall I lead you back to the front door?</Link>
    </div>
  );
}
