
import React from 'react';
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
  return (
    <section 
      id={id}
      className={cn(
        'relative flex items-center justify-center',
        'min-h-screen w-full scroll-snap-section',
        className
      )}
    >
      {/* Sophisticated dark blue/black gradient background */}
      <GradientBackground variant="dark" />
      
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
          {/* Circle container with subtle pulsing animation */}
          <div className={cn(
            "circular-container relative",
            "flex items-center justify-center",
            "w-[800px] h-[800px] max-w-full max-h-full", // 20% larger
            "rounded-full",
            "overflow-hidden"
          )}>
            {/* Subtle circle outline */}
            <div className="absolute inset-0 rounded-full border border-white/15 animate-pulse-slow"></div>
            
            {/* Philosophy text content */}
            <PhilosophyText />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
