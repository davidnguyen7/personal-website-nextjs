'use client';
import {useLenis} from 'lenis/react';
import {useEffect, useState} from 'react';

interface PageLinksTable {
  [selector: string]: string;
}
const PAGE_LINKS: PageLinksTable = {
  '#aboutme': 'About Me',
  '#projects': 'Projects',
  '#contact': 'Contact',
};

function PageScrollLink({
  location,
  name,
  isActive,
}: {
  location: string;
  name: string;
  isActive: boolean;
}) {
  const lenis = useLenis();
  const scrollToLocation = () => {
    if (lenis) {
      lenis.scrollTo(location);
    }
  };

  return (
    <li>
      <a
        id={location}
        className={isActive ? 'active' : ''}
        onClick={() => scrollToLocation()}>
        {name}
      </a>
    </li>
  );
}

export default function NavigationBar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        let active = null;
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            active = '#' + entry.target.id;
          }
        });
        if (active != null) {
          setActiveLink(active);
        }
      },
      {threshold: [0.5]},
    );

    Object.keys(PAGE_LINKS).map(selector => {
      const element = document.getElementById(selector.split('#')[1]);
      if (element) {
        observer.observe(element);
      }
    });

    observer.observe(document.getElementById('title')!);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <nav>
      <ul>
        {Object.keys(PAGE_LINKS).map(selector => (
          <PageScrollLink
            location={selector}
            name={PAGE_LINKS[selector]}
            key={selector}
            isActive={activeLink === selector}
          />
        ))}
      </ul>
    </nav>
  );
}
