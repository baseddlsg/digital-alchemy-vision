
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const RefinedGeometricElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate relative mouse position (-1 to 1)
      const moveX = (clientX / innerWidth - 0.5) * 2;
      const moveY = (clientY / innerHeight - 0.5) * 2;
      
      // Apply different parallax factors to each corner element
      const elements = containerRef.current.querySelectorAll('.corner-element');
      elements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        
        // Different movement factor for each corner
        const moveFactors = [
          { x: -15, y: -15 }, // top-left
          { x: 15, y: -15 },  // top-right
          { x: -15, y: 15 },  // bottom-left
          { x: 15, y: 15 }    // bottom-right
        ];
        
        const factor = moveFactors[index % 4];
        htmlEl.style.transform = `translate(${moveX * factor.x}px, ${moveY * factor.y}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Top Left - Hexagon */}
      <div className="corner-element absolute top-[10%] left-[10%]">
        <svg width="100" height="87" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-morph"
          />
        </svg>
      </div>
      
      {/* Top Right - Triangle */}
      <div className="corner-element absolute top-[10%] right-[10%]">
        <svg width="90" height="78" viewBox="0 0 90 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M45 0L90 78H0L45 0Z" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-spin"
          />
        </svg>
      </div>
      
      {/* Bottom Left - Circle */}
      <div className="corner-element absolute bottom-[10%] left-[10%]">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle 
            cx="35" 
            cy="35" 
            r="34.5" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-pulse"
          />
        </svg>
      </div>
      
      {/* Bottom Right - Square */}
      <div className="corner-element absolute bottom-[10%] right-[10%]">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect 
            x="0.5" 
            y="0.5" 
            width="69" 
            height="69" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5"
            className="animate-geometric-rotate"
          />
        </svg>
      </div>
      
      {/* Central Circle Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="circular-outline animate-subtle-pulse" />
      </div>
    </div>
  );
};

export default RefinedGeometricElements;
