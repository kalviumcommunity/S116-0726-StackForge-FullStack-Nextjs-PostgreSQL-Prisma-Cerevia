import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-16 w-16',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 rounded-md transition-opacity duration-300 hover:opacity-90 ${className}`}
      aria-label="Cerevia Home"
    >
      <div className={`flex items-center justify-center shrink-0 ${dimensions[size]}`}>
        {/* Luxury Cerevia Serif C Brand Mark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="cereviaGoldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9C7A3C" />
              <stop offset="35%" stopColor="#DFBA73" />
              <stop offset="70%" stopColor="#E5D9C4" />
              <stop offset="100%" stopColor="#C5A880" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Handcrafted outer thin gold arc */}
          <path
            d="M 64.5 13.5 A 39 39 0 1 0 64.5 86.5"
            stroke="url(#cereviaGoldGradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Elegant serif letter C vector path */}
          <path
            d="M 60.5 37 L 61 27 C 57 24.5, 53 24, 48.5 24 C 33.5 24, 25 35, 25 50 C 25 65, 33.5 76, 48.5 76 C 54 76, 58.5 74, 61 70 L 60 69 C 57.5 71.2, 53.5 72.2, 48.5 72.2 C 38 72.2, 32 63.5, 32 50 C 32 36.5, 38 27.8, 48.5 27.8 C 53 27.8, 56.5 28.8, 58.5 30.5 L 58 37 Z"
            fill="url(#cereviaGoldGradient)"
          />

          {/* Accent Gold dot */}
          <circle
            cx="75"
            cy="58"
            r="4.5"
            fill="url(#cereviaGoldGradient)"
            filter="url(#goldGlow)"
          />
        </svg>
      </div>
      {showText && (
        <span className="font-serif text-[17px] font-medium tracking-[0.2em] text-foreground uppercase pt-0.5">
          Cerevia
        </span>
      )}
    </Link>
  );
}
