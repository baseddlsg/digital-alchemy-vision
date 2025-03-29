
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GeometricElementsProps {
  className?: string;
}

const GeometricElements: React.FC<GeometricElementsProps> = ({
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate relative mouse position
      const moveX = (clientX / innerWidth - 0.5) * 2;
      const moveY = (clientY / innerHeight - 0.5) * 2;
      
      // Apply subtle parallax movement to each element
      const elements = containerRef.current.querySelectorAll('.geometric-element');
      elements.forEach((el, index) => {
        const depth = 1 - (index * 0.2);
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${moveX * 15 * depth}px, ${moveY * 15 * depth}px)`;
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
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {/* Hexagon */}
      <div className="geometric-element absolute left-[15%] top-[20%]">
        <svg width="120" height="104" viewBox="0 0 120 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M60 0L119.5 26V78L60 104L0.5 78V26L60 0Z" 
            stroke="rgba(155, 135, 245, 0.15)" 
            strokeWidth="1"
            className="animate-pulse-slow"
          />
        </svg>
      </div>
      
      {/* Triangle */}
      <div className="geometric-element absolute right-[20%] top-[30%]">
        <svg width="100" height="87" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M50 0L100 86.6H0L50 0Z" 
            stroke="rgba(30, 174, 219, 0.15)" 
            strokeWidth="1"
            className="animate-spin-slow"
          />
        </svg>
      </div>
      
      {/* Circle */}
      <div className="geometric-element absolute left-[25%] bottom-[25%]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle 
            cx="40" 
            cy="40" 
            r="39.5" 
            stroke="rgba(16, 185, 129, 0.15)" 
            strokeWidth="1"
            className="animate-pulse-slow"
          />
        </svg>
      </div>
      
      {/* Tetrahedron (Wireframe) */}
      <div className="geometric-element absolute right-[15%] bottom-[20%]">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M60 10L10 100M60 10L110 100M10 100H110M60 10L60 100" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="1"
            className="animate-spin-slow"
          />
        </svg>
      </div>
      
      {/* Square */}
      <div className="geometric-element absolute left-[60%] top-[15%]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect 
            x="0.5" 
            y="0.5" 
            width="79" 
            height="79" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default GeometricElements;
