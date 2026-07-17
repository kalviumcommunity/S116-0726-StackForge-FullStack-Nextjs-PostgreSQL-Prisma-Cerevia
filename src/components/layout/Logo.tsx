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
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Elegant serif letter C */}
          <text
            x="48"
            y="65"
            fontFamily="var(--font-serif), Georgia, serif"
            fontSize="52"
            fontWeight="300"
            textAnchor="middle"
            fill="url(#cereviaGoldGradient)"
            letterSpacing="-0.05em"
          >
            C
          </text>

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
