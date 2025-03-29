
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  className?: string;
  variant: 'purple' | 'blue' | 'green' | 'dark';
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  variant
}) => {
  const gradientClass = {
    'purple': 'purple-gradient',
    'blue': 'blue-gradient',
    'green': 'green-gradient',
    'dark': 'dark-gradient liquid-effect', // Added liquid effect
  }[variant];
  
  return (
    <div className={cn(
      'fixed inset-0 w-full h-full -z-10',
      'animate-gradient-shift',
      gradientClass,
      className
    )}>
      <div className="absolute inset-0 w-full h-full">
        {/* Radial gradient overlays for depth */}
        <div className="absolute inset-0 opacity-40 bg-radial-gradient animate-subtle-pulse" />
        
        {/* Subtle liquid animation overlay for dark variant */}
        {variant === 'dark' && (
          <div className="absolute inset-0 opacity-10 liquid-overlay animate-subtle-flow" />
        )}
      </div>
    </div>
  );
};

export default GradientBackground;
