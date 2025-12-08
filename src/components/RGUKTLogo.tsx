export function RGUKTLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* RGUKT Logo SVG - Simplified version */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" stroke="url(#logoGradient)" strokeWidth="3" fill="none" />

        {/* Inner shield shape */}
        <path
          d="M 50 15 L 70 25 L 70 50 Q 70 75 50 85 Q 30 75 30 50 L 30 25 Z"
          fill="url(#logoGradient)"
          opacity="0.2"
        />
        <path
          d="M 50 15 L 70 25 L 70 50 Q 70 75 50 85 Q 30 75 30 50 L 30 25 Z"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
        />

        {/* Book symbol */}
        <rect x="40" y="35" width="20" height="30" rx="2" fill="currentColor" opacity="0.8" />
        <line x1="50" y1="35" x2="50" y2="65" stroke="url(#logoGradient)" strokeWidth="2" />

        {/* RGUKT text */}
        <text
          x="50"
          y="95"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="url(#logoGradient)"
          fontFamily="Arial, sans-serif"
        >
          RGUKT
        </text>
      </svg>
    </div>
  );
}
