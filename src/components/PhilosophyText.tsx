
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const PhilosophyText = () => {
  // Track which word is being hovered
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);
  
  // Simplified text content with just the one premium line
  const philosophyText = "For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.";
  
  // Split the text into words for individual hover effects
  const words = philosophyText.split(' ');
  
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
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide leading-relaxed">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <span 
                className={cn(
                  'inline-block metallic-text transition-all duration-300',
                  hoveredWordIndex === index ? 'animate-text-shimmer text-white' : 'text-white/90'
                )}
                onMouseEnter={() => setHoveredWordIndex(index)}
                onMouseLeave={() => setHoveredWordIndex(null)}
              >
                {word}
              </span>
              {index < words.length - 1 && ' '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PhilosophyText;
