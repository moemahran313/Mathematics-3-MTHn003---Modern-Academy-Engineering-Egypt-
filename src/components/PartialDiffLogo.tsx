import React from 'react';

interface PartialDiffLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
  badgeText?: string;
}

/**
 * Greek Alpha (α) / Mathematical Symbol Logo Component
 * Renders the sleek mathematical Greek symbol alpha (α) with smooth vector loops and modern gradient styling.
 */
export const PartialDiffLogo: React.FC<PartialDiffLogoProps> = ({
  className = 'w-6 h-6',
  size,
  showText = false,
  textClassName = 'text-base font-extrabold tracking-tight text-slate-100',
  badgeText,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 via-teal-500/10 to-cyan-500/20 border border-teal-500/30 text-teal-400 shadow-sm transition-transform group-hover:scale-105 ${
          typeof size === 'number' ? '' : 'p-2'
        }`}
        style={style}
      >
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="alphaGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="60%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="alphaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#2dd4bf" floodOpacity="0.35" />
            </filter>
          </defs>
          {/* Mathematical Greek Alpha (α) Symbol */}
          <path
            d="M 405 150 C 370 150 330 190 290 250 C 255 195 210 160 160 160 C 95 160 50 205 50 270 C 50 335 95 380 160 380 C 210 380 255 345 290 290 C 330 350 370 390 405 390 C 420 390 432 380 435 365 C 438 350 430 338 415 335 C 385 330 350 295 320 250 C 350 205 385 170 415 165 C 430 162 438 150 435 135 C 432 120 420 110 405 110 C 390 110 375 125 360 145 M 160 210 C 190 210 220 235 250 270 C 220 305 190 330 160 330 C 125 330 100 305 100 270 C 100 235 125 210 160 210 Z"
            fill="url(#alphaGrad)"
            filter="url(#alphaGlow)"
          />
        </svg>
      </div>

      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className={textClassName}>Math 3 Reference</h1>
            {badgeText && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-400/10 text-teal-300 border border-teal-400/30 font-mono font-bold">
                {badgeText}
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">
            Differential Equations & Transforms
          </span>
        </div>
      )}
    </div>
  );
};
