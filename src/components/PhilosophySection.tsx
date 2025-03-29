
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
  
  // Effect to handle parallax on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate relative mouse position (-1 to 1)
      const moveX = (clientX / innerWidth - 0.5) * 2;
      const moveY = (clientY / innerHeight - 0.5) * 2;
      
      // Apply parallax to the container
      const textContainer = containerRef.current.querySelector('.philosophy-content');
      if (textContainer) {
        const htmlEl = textContainer as HTMLElement;
        htmlEl.style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
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
          'max-w-3xl mx-auto',
          'flex items-center justify-center',
          'h-full'
        )}
      >
        <div className="philosophy-content relative">
          <div className="circular-container">
            <PhilosophyText />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
