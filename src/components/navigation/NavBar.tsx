import NavLink from './NavLink';

export default function NavBar() {
  return (
    <nav className="flex flex-wrap gap-4 text-xl font-bold dark:text-gray-400">
      <NavLink href="/">About</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </nav>
  );
}
