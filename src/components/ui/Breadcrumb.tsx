'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();

  // If we are on public landing page, do not render breadcrumbs
  if (pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  const formatSegment = (segment: string) => {
    // Replace hyphens/underscores and capitalize words
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground select-none">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1 py-0.5"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join('/')}`;

          return (
            <li key={href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 shrink-0 opacity-70" />
              {isLast ? (
                <span className="font-semibold text-foreground truncate max-w-[150px] sm:max-w-xs" aria-current="page">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1 py-0.5"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
