
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import GradientBackground from './GradientBackground';
import RefinedGeometricElements from './RefinedGeometricElements';
import PhilosophyText from './PhilosophyText';

interface PhilosophySectionProps {
  className?: string;
  id: string;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  className,
  id
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle parallax on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate relative mouse position (-1 to 1)
      const moveX = (clientX / innerWidth - 0.5) * 2;
      const moveY = (clientY / innerHeight - 0.5) * 2;
      
      // Apply parallax to the text container
      const textContainer = containerRef.current.querySelector('.philosophy-content');
      if (textContainer) {
        const htmlEl = textContainer as HTMLElement;
        htmlEl.style.transform = `translate(${moveX * 15}px, ${moveY * 15}px)`;
      }
      
      // Add metallic highlight effect based on cursor position
      if (circleRef.current) {
        // Calculate angle from center to cursor
        const angle = Math.atan2(moveY, moveX) * (180 / Math.PI);
        
        // Update the metallic highlight based on cursor position
        circleRef.current.style.background = `
          radial-gradient(
            circle at ${50 + moveX * 30}% ${50 + moveY * 30}%,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 30%,
            rgba(255, 255, 255, 0) 70%
          )
        `;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      id={id}
      className={cn(
        'relative flex items-center justify-center',
        'min-h-screen w-full scroll-snap-section',
        className
      )}
    >
      <GradientBackground variant="purple" />
      <RefinedGeometricElements />
      
      <div 
        ref={containerRef}
        className={cn(
          'z-10 px-4',
          'mx-auto',
          'flex items-center justify-center',
          'h-full w-full'
        )}
      >
        <div 
          className={cn(
            "philosophy-content relative",
            "flex items-center justify-center",
            "max-w-3xl w-full h-full"
          )}
        >
          <div 
            ref={circleRef}
            className={cn(
              "circular-container relative",
              "flex items-center justify-center",
              "w-[700px] h-[700px] max-w-full max-h-full",
              "rounded-full",
              "overflow-hidden"
            )}
          >
            <div className="absolute inset-0 rounded-full border border-white/15 animate-pulse-slow"></div>
            <PhilosophyText />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
