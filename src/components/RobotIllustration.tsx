export function RobotIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-float"
      >
        {/* Glow effect */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Glow circle */}
        <circle cx="200" cy="200" r="150" fill="url(#glow)" className="animate-pulse" />

        {/* Antenna */}
        <line x1="200" y1="80" x2="200" y2="50" stroke="url(#robotGradient)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="200" cy="45" r="8" fill="#06b6d4" className="animate-pulse">
          <animate attributeName="fill" values="#06b6d4;#a855f7;#ec4899;#06b6d4" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Head */}
        <rect x="140" y="80" width="120" height="100" rx="20" fill="#1a1a1a" stroke="url(#robotGradient)" strokeWidth="4" />

        {/* Eyes */}
        <circle cx="170" cy="120" r="15" fill="#06b6d4" className="animate-pulse">
          <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="230" cy="120" r="15" fill="#a855f7" className="animate-pulse">
          <animate attributeName="r" values="15;17;15" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        {/* Eye pupils */}
        <circle cx="172" cy="122" r="6" fill="#ffffff" />
        <circle cx="232" cy="122" r="6" fill="#ffffff" />

        {/* Smile */}
        <path d="M 170 150 Q 200 165 230 150" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Body */}
        <rect x="130" y="190" width="140" height="150" rx="25" fill="#1a1a1a" stroke="url(#robotGradient)" strokeWidth="4" />

        {/* Chest panel */}
        <rect x="160" y="220" width="80" height="80" rx="10" fill="#0a0a0a" stroke="#a855f7" strokeWidth="2" />

        {/* LED indicators */}
        <circle cx="180" cy="240" r="4" fill="#06b6d4" className="animate-pulse" />
        <circle cx="200" cy="240" r="4" fill="#a855f7" className="animate-pulse" />
        <circle cx="220" cy="240" r="4" fill="#ec4899" className="animate-pulse" />

        {/* Display lines */}
        <line x1="170" y1="260" x2="230" y2="260" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
        <line x1="170" y1="270" x2="210" y2="270" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
        <line x1="170" y1="280" x2="220" y2="280" stroke="#ec4899" strokeWidth="2" opacity="0.6" />

        {/* Left arm */}
        <rect x="85" y="210" width="40" height="90" rx="15" fill="#1a1a1a" stroke="url(#robotGradient)" strokeWidth="3">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 105 210;-10 105 210;0 105 210"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        <circle cx="105" cy="305" r="18" fill="#1a1a1a" stroke="#a855f7" strokeWidth="3" />

        {/* Right arm */}
        <rect x="275" y="210" width="40" height="90" rx="15" fill="#1a1a1a" stroke="url(#robotGradient)" strokeWidth="3">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 295 210;10 295 210;0 295 210"
            dur="3s"
            begin="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        <circle cx="295" cy="305" r="18" fill="#1a1a1a" stroke="#ec4899" strokeWidth="3" />

        {/* Legs */}
        <rect x="160" y="345" width="35" height="50" rx="12" fill="#1a1a1a" stroke="#06b6d4" strokeWidth="3" />
        <rect x="205" y="345" width="35" height="50" rx="12" fill="#1a1a1a" stroke="#06b6d4" strokeWidth="3" />

        {/* Floating sparkles */}
        <circle cx="100" cy="150" r="3" fill="#a855f7" opacity="0.8">
          <animate attributeName="cy" values="150;140;150" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="180" r="3" fill="#06b6d4" opacity="0.8">
          <animate attributeName="cy" values="180;170;180" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="280" r="2" fill="#ec4899" opacity="0.8">
          <animate attributeName="cy" values="280;270;280" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
