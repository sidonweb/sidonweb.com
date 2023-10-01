'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';


const navItems = {
  '/': {
    name: 'home',
    isExternal: false,
    externalUrl:'',
  },
  '/projects': {
    name: 'projects',
    isExternal: false,
    externalUrl:'',
  },
  '/blog': {
    name: 'blog',
    isExternal: false,
    externalUrl:'',
  },
  '/resume': {
    name: 'resume',
    isExternal: true, // Add this flag to indicate it's an external link
    externalUrl: 'https://drive.google.com/file/d/1vorlySmGaCtmWZx1GZYrDyfk7KBFx5qk/view?usp=drivesdk',
  },
};

export default function Navbar() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/projects/')) {
    pathname = '/projects';
  }



  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              {Object.entries(navItems).map(([path, { name, isExternal, externalUrl }]) => {
                const isActive = path === pathname;
                return isExternal ? (
                  <a
                    key={path}
                    href={externalUrl} // Use the external URL for the "Resume" link
                    className={clsx(
                      'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
                      {
                        'text-neutral-500': !isActive,
                      }
                    )}
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer"
                  >
                    <span className="relative py-1 px-2">{name}</span>
                  </a>
                ) : (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
                      {
                        'text-neutral-500': !isActive,
                      }
                    )}
                  >
                    <span className="relative py-1 px-2">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
                          layoutId="sidebar"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
