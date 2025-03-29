
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AlchemyTextProps {
  text: string;
  tagline?: string;
  variant: 'purple' | 'blue' | 'green';
  className?: string;
}

const AlchemyText: React.FC<AlchemyTextProps> = ({
  text,
  tagline,
  variant,
  className
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate relative mouse position
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (textRef.current) {
      // Apply subtle 3D rotation based on mouse position
      const rotateX = mousePosition.y * 10;
      const rotateY = mousePosition.x * -10;
      
      textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Dynamic shadow based on mouse position
      const shadowX = mousePosition.x * 10;
      const shadowY = mousePosition.y * 10;
      const shadowBlur = 15 + Math.abs(mousePosition.x * 10) + Math.abs(mousePosition.y * 10);
      
      const colorMap = {
        'purple': 'rgba(155, 135, 245, 0.6)',
        'blue': 'rgba(30, 174, 219, 0.6)',
        'green': 'rgba(16, 185, 129, 0.6)'
      };
      
      textRef.current.style.textShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px ${colorMap[variant]},
        0 0 15px rgba(255, 255, 255, 0.2),
        0 0 30px rgba(255, 255, 255, 0.1)
      `;
    }
  }, [mousePosition, variant]);
  
  const textColors = {
    'purple': 'text-alchemy-purple-light',
    'blue': 'text-alchemy-blue-royal',
    'green': 'text-alchemy-green-emerald'
  };
  
  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <div 
        ref={textRef}
        className={cn(
          'text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black',
          'transition-transform duration-200 ease-out select-none',
          'text-3d',
          textColors[variant]
        )}
      >
        {text}
      </div>
      
      {tagline && (
        <div className="text-xl md:text-2xl font-light text-white/60 tracking-wider mt-8 animate-float">
          {tagline}
        </div>
      )}
    </div>
  );
};

export default AlchemyText;
