
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import GradientBackground from './GradientBackground';
import RefinedGeometricElements from './RefinedGeometricElements';
import PhilosophyText from './PhilosophyText';
import OuroborosCircle from './OuroborosCircle';

interface PhilosophySectionProps {
  className?: string;
  id: string;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  className,
  id
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add subtle liquid background animation
    const section = sectionRef.current;
    if (!section) return;
    
    // This stays empty but gives us the ref for potential future enhancements
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className={cn(
        'relative flex items-center justify-center',
        'min-h-screen w-full scroll-snap-section',
        className
      )}
    >
      {/* Sophisticated dark blue/black gradient background with subtle liquid effect */}
      <GradientBackground variant="dark" className="animate-subtle-pulse" />
      
      {/* Refined geometric elements in corners */}
      <RefinedGeometricElements />
      
      <div className={cn(
        'z-10 px-4',
        'mx-auto',
        'flex items-center justify-center',
        'h-full w-full'
      )}>
        <div className={cn(
          "relative",
          "flex items-center justify-center",
          "max-w-3xl w-full h-full"
        )}>
          {/* Ouroboros container replacing the circular container */}
          <div className={cn(
            "circular-container relative",
            "flex items-center justify-center",
            "w-[800px] h-[800px] max-w-full max-h-full", // 20% larger
            "rounded-full",
            "overflow-hidden"
          )}>
            {/* Ouroboros circle outline */}
            <OuroborosCircle />
            
            {/* Philosophy text content */}
            <PhilosophyText />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
