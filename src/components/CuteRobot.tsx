export function CuteRobot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8439c5" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="secondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e3e3e3" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="200" cy="225" r="120" fill="#8439c5" opacity="0.1" className="animate-pulse" />

        {/* Antenna with orb */}
        <g className="animate-float">
          <line x1="200" y1="90" x2="200" y2="50" stroke="#8439c5" strokeWidth="4" strokeLinecap="round" />
          <circle cx="200" cy="40" r="10" fill="url(#primaryGrad)" filter="url(#glow)">
            <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Small orbiting particles */}
          <circle cx="215" cy="40" r="3" fill="#e3e3e3" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 200 40" to="360 200 40" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="185" cy="40" r="3" fill="#e3e3e3" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="180 200 40" to="540 200 40" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Head */}
        <g className="animate-float-slow">
          <rect x="130" y="90" width="140" height="130" rx="30" fill="url(#secondaryGrad)" stroke="#8439c5" strokeWidth="3" />

          {/* Eyes container */}
          <g>
            {/* Left eye */}
            <ellipse cx="165" cy="140" rx="20" ry="25" fill="#2b2929" />
            <ellipse cx="165" cy="140" rx="15" ry="20" fill="#8439c5" className="animate-pulse" />
            <circle cx="167" cy="137" r="6" fill="#ffffff" opacity="0.9" />
            <circle cx="170" cy="143" r="3" fill="#ffffff" opacity="0.6" />

            {/* Right eye */}
            <ellipse cx="235" cy="140" rx="20" ry="25" fill="#2b2929" />
            <ellipse cx="235" cy="140" rx="15" ry="20" fill="#8439c5" className="animate-pulse" />
            <circle cx="237" cy="137" r="6" fill="#ffffff" opacity="0.9" />
            <circle cx="240" cy="143" r="3" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Cute smile */}
          <path
            d="M 155 175 Q 200 195 245 175"
            stroke="#8439c5"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Blush marks */}
          <ellipse cx="125" cy="165" rx="12" ry="8" fill="#8439c5" opacity="0.3" />
          <ellipse cx="275" cy="165" rx="12" ry="8" fill="#8439c5" opacity="0.3" />
        </g>

        {/* Body */}
        <g>
          <rect x="110" y="230" width="180" height="150" rx="25" fill="url(#secondaryGrad)" stroke="#8439c5" strokeWidth="3" />

          {/* Display panel */}
          <rect x="140" y="260" width="120" height="80" rx="10" fill="#2b2929" stroke="#8439c5" strokeWidth="2" />

          {/* Display content - animated bars */}
          <g>
            <rect x="155" y="275" width="30" height="10" rx="2" fill="#8439c5" opacity="0.8">
              <animate attributeName="width" values="30;50;30" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="155" y="295" width="40" height="10" rx="2" fill="#a855f7" opacity="0.8">
              <animate attributeName="width" values="40;60;40" dur="2.5s" repeatCount="indefinite" />
            </rect>
            <rect x="155" y="315" width="35" height="10" rx="2" fill="#8439c5" opacity="0.8">
              <animate attributeName="width" values="35;55;35" dur="3s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* Control buttons */}
          <circle cx="160" cy="360" r="8" fill="#8439c5" opacity="0.6" />
          <circle cx="200" cy="360" r="8" fill="#a855f7" opacity="0.6" />
          <circle cx="240" cy="360" r="8" fill="#8439c5" opacity="0.6" />
        </g>

        {/* Arms */}
        <g>
          {/* Left arm */}
          <rect x="85" y="250" width="30" height="80" rx="15" fill="url(#secondaryGrad)" stroke="#8439c5" strokeWidth="2" className="animate-wave-left" style={{ transformOrigin: "100px 250px" }} />
          <circle cx="100" cy="335" r="15" fill="#8439c5" opacity="0.8" />

          {/* Right arm */}
          <rect x="285" y="250" width="30" height="80" rx="15" fill="url(#secondaryGrad)" stroke="#8439c5" strokeWidth="2" className="animate-wave-right" style={{ transformOrigin: "300px 250px" }} />
          <circle cx="300" cy="335" r="15" fill="#8439c5" opacity="0.8" />
        </g>

        {/* Legs */}
        <g>
          {/* Left leg */}
          <rect x="140" y="385" width="40" height="50" rx="10" fill="url(#secondaryGrad)" stroke="#8439c5" strokeWidth="2" />
          <ellipse cx="160" cy="440" rx="25" ry="12" fill="#2b2929" stroke="#8439c5" strokeWidth="2" />

          {/* Right leg */}
          <rect x="220" y="385" width="40" height="50" rx="10" fill="url(#secondaryGrad)" stroke="#8439c5" strokeWidth="2" />
          <ellipse cx="240" cy="440" rx="25" ry="12" fill="#2b2929" stroke="#8439c5" strokeWidth="2" />
        </g>

        {/* Floating hearts */}
        <g className="animate-float-up" opacity="0.6">
          <path d="M 320 180 C 320 170, 330 170, 330 180 C 330 170, 340 170, 340 180 C 340 195, 330 200, 330 210 C 330 200, 320 195, 320 180 Z" fill="#8439c5" opacity="0.4" />
        </g>
        <g className="animate-float-up-delayed" opacity="0.6">
          <path d="M 60 200 C 60 190, 70 190, 70 200 C 70 190, 80 190, 80 200 C 80 215, 70 220, 70 230 C 70 220, 60 215, 60 200 Z" fill="#a855f7" opacity="0.4" />
        </g>
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes wave-left {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes wave-right {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes float-up {
          0% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        @keyframes float-up-delayed {
          0% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-wave-left {
          animation: wave-left 2s ease-in-out infinite;
        }
        .animate-wave-right {
          animation: wave-right 2s ease-in-out infinite 1s;
        }
        .animate-float-up {
          animation: float-up 4s ease-in-out infinite;
        }
        .animate-float-up-delayed {
          animation: float-up-delayed 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}
