
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const PhilosophyText = () => {
  // Split the text into individual words
  const philosophyText = "For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.";
  const words = philosophyText.split(' ');
  
  // Track which word is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide leading-relaxed">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <span 
                className={cn(
                  'inline-block transition-all duration-300',
                  'metallic-text',
                  hoveredIndex === index && 'text-gleam'
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
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
