
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  className?: string;
  variant: 'purple' | 'blue' | 'green';
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  variant
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Subtle movement based on mouse position
      const moveX = clientX / innerWidth - 0.5;
      const moveY = clientY / innerHeight - 0.5;
      
      // Apply very subtle transform
      backgroundRef.current.style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const gradientClass = {
    'purple': 'purple-gradient',
    'blue': 'blue-gradient',
    'green': 'green-gradient'
  }[variant];
  
  return (
    <div className={cn(
      'fixed inset-0 w-full h-full -z-10',
      'animate-gradient-shift',
      gradientClass,
      className
    )}>
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
      >
        {/* Radial gradient overlays for depth */}
        <div className="absolute inset-0 opacity-40 bg-radial-gradient animate-pulse-slow" />
      </div>
    </div>
  );
};

export default GradientBackground;
