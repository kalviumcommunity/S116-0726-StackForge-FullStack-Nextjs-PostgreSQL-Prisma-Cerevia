'use client';

import * as React from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => {
      // Functional update avoids a dependency on `matches` (which would
      // re-subscribe the listener on every toggle) and skips redundant renders.
      setMatches((prev) => (prev === media.matches ? prev : media.matches));
    };

    listener(); // sync to the current media state on mount / query change
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
