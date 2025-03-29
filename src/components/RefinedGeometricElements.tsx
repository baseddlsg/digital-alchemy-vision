
import React from 'react';
import { cn } from '@/lib/utils';

const RefinedGeometricElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Left - Hexagon */}
      <div className="absolute top-[5%] left-[5%]">
        <svg width="120" height="104" viewBox="0 0 120 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M60 0L112 30V90L60 120L8 90V30L60 0Z" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="0.5"
            className="animate-geometric-morph"
          />
          <path 
            d="M60 15L97.5 37.5V82.5L60 105L22.5 82.5V37.5L60 15Z" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-spin"
          />
        </svg>
      </div>
      
      {/* Top Right - Triangle */}
      <div className="absolute top-[5%] right-[5%]">
        <svg width="100" height="87" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M50 0L100 87H0L50 0Z" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="0.5"
            className="animate-geometric-spin"
          />
          <path 
            d="M50 20L87.5 87H12.5L50 20Z" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-morph"
          />
        </svg>
      </div>
      
      {/* Bottom Left - Circle */}
      <div className="absolute bottom-[5%] left-[5%]">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle 
            cx="50" 
            cy="50" 
            r="49.5" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="0.5"
            className="animate-geometric-pulse"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-rotate"
          />
        </svg>
      </div>
      
      {/* Bottom Right - Square */}
      <div className="absolute bottom-[5%] right-[5%]">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect 
            x="0.5" 
            y="0.5" 
            width="89" 
            height="89" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="0.5"
            className="animate-geometric-rotate"
          />
          <rect 
            x="20" 
            y="20" 
            width="50" 
            height="50" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-morph"
          />
        </svg>
      </div>
      
      {/* Central Circle Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="circular-outline animate-pulse-slow" />
      </div>
    </div>
  );
};

export default RefinedGeometricElements;
