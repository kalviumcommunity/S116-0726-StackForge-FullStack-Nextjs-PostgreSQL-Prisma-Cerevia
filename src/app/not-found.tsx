import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* 404 Graphic */}
      <div className="relative mb-6">
        <span className="text-[120px] font-extrabold leading-none tracking-tighter text-muted/30 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-14 w-14 text-orange-500 animate-pulse"
            aria-hidden="true"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-8">
        Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, deleted, or never existed in the first place.
      </p>

      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
