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
      <div className={`flex items-center justify-center shrink-0 ${dimensions[size]}`}>
        {/* Modern Cerevia Blue Gradient Star Brand Mark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="cereviaBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />   {/* Indigo */}
              <stop offset="50%" stopColor="#3B82F6" />  {/* Blue */}
              <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
            </linearGradient>
          </defs>

          {/* Concentric Modern C Paths */}
          <path
            d="M 72 32 A 28 28 0 1 0 72 68 M 62 40 A 18 18 0 1 0 62 60"
            stroke="url(#cereviaBlueGradient)"
            strokeWidth="7.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Center Star (4-point sparkle) */}
          <path
            d="M 38 50 Q 46 50 46 42 Q 46 50 54 50 Q 46 50 46 58 Q 46 50 38 50"
            fill="#22D3EE"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="font-sans text-[17px] font-extrabold tracking-[0.18em] text-foreground uppercase leading-none">
            Cerevia
          </span>
          <span className="font-sans text-[6.5px] font-extrabold tracking-[0.25em] text-muted-foreground uppercase mt-1.5 leading-none">
            Learn. Level Up. Lead.
          </span>
        </div>
      )}
    </Link>
  );
}
