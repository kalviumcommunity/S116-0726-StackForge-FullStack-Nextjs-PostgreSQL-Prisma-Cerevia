import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 rounded-lg px-1 py-1 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 ${className}`}
      aria-label="Cerevia Home"
    >
      <div className={`flex shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-background/80 text-foreground shadow-sm ${dimensions[size]}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5/6 w-5/6"
        >
          <path d="M8 5.5a4.5 4.5 0 1 0 0 13" />
          <path d="M8 5.5h7.5a4.5 4.5 0 0 1 0 9H8" />
        </svg>
      </div>
      {showText && (
        <span className="pt-0.5 font-sans text-[14px] font-semibold uppercase tracking-[0.24em] text-foreground">
          Cerevia
        </span>
      )}
    </Link>
  );
}
