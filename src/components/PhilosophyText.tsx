
import React from 'react';
import { cn } from '@/lib/utils';

const PhilosophyText = () => {
  // Simplified text content with just the one premium line
  const philosophyText = "For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.";
  
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-black',
        'text-white/50 mb-16',
        'tracking-tight',
        'animate-float-slow',
        'silver-text'
      )}>
        Philosophy
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <p className={cn(
          'text-2xl md:text-3xl lg:text-4xl font-bold', // Increased font weight
          'text-white/90',
          'tracking-wide leading-relaxed',
          'metallic-text',
          'hover:animate-text-shimmer key-term' // Added hover effect
        )}>
          {philosophyText}
        </p>
      </div>
    </div>
  );
};

export default PhilosophyText;
