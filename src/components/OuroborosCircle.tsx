
import React from 'react';
import { cn } from '@/lib/utils';

const OuroborosCircle = () => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <div className="relative w-full h-full">
        {/* Simple, elegant ouroboros SVG - minimalist snake eating its tail */}
        <svg 
          className="absolute inset-0 w-full h-full animate-spin-slow" 
          viewBox="0 0 800 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400 100C565.685 100 700 234.315 700 400C700 565.685 565.685 700 400 700C234.315 700 100 565.685 100 400C100 234.315 234.315 100 400 100Z"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.5"
            strokeLinecap="round"
            className="ouroboros-path"
          />
          
          {/* Snake head at the end of the circle */}
          <path
            d="M150 400C150 400 170 390 180 400C190 410 180 420 180 420"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            strokeLinecap="round"
            className="ouroboros-head"
          />
          
          {/* Snake tail */}
          <path
            d="M180 420C180 420 170 425 160 420"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            strokeLinecap="round"
            className="ouroboros-tail"
          />
          
          {/* Extra subtle details */}
          <circle 
            cx="175" 
            cy="395" 
            r="1" 
            fill="rgba(255, 255, 255, 0.3)"
            className="ouroboros-eye animate-pulse-slow"
          />
        </svg>
      </div>
    </div>
  );
};

export default OuroborosCircle;
