
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
            "w-[800px] h-[800px] max-w-full max-h-full", 
            "rounded-full",
            "overflow-hidden"
          )}>
            {/* Ouroboros SVG */}
            <div className="absolute inset-0 w-full h-full animate-spin-very-slow pointer-events-none">
              <svg 
                viewBox="0 0 800 800" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle 
                  cx="400" 
                  cy="400" 
                  r="399" 
                  stroke="rgba(255, 255, 255, 0.15)" 
                  strokeWidth="1"
                />
                <path
                  d="M400,120 C330,120 270,150 220,200 C170,250 140,310 140,380 C140,450 170,510 220,560 C270,610 330,640 400,640 C470,640 530,610 580,560 C630,510 660,450 660,380 C660,310 630,250 580,200 C530,150 470,120 400,120 M400,120 C420,120 435,135 435,155 C435,175 420,190 400,190 C380,190 365,175 365,155 C365,135 380,120 400,120 Z"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1"
                  fill="none"
                  className="ouroboros-path"
                />
                {/* Snake head */}
                <path
                  d="M140,380 C130,380 120,370 120,360 C120,350 130,340 140,340 C150,340 160,350 160,360 C160,370 150,380 140,380 Z"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Snake eye */}
                <circle
                  cx="135"
                  cy="355"
                  r="2"
                  fill="rgba(255, 255, 255, 0.15)"
                />
              </svg>
            </div>
            
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
