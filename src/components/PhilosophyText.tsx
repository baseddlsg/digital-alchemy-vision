
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const PhilosophyText = () => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  
  // Key philosophical terms that should illuminate on hover
  const keyTerms = ['philosopher\'s stone', 'transmute', 'transcendent', 'alchemy', 'tangible reality', 'precision'];
  
  // Process text to add hover effect to key terms
  const processText = (text: string) => {
    let result = text;
    
    keyTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, `<span class="key-term" data-term="$1">$1</span>`);
    });
    
    return result;
  };
  
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('key-term')) {
      setHoveredWord(target.dataset.term || null);
    }
  };
  
  const handleMouseOut = () => {
    setHoveredWord(null);
  };
  
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
      
      <div 
        className="text-container"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <p className={cn(
          'text-xl md:text-2xl font-light',
          'text-white/90 mb-8',
          'tracking-wide leading-relaxed'
        )}>
          <span 
            dangerouslySetInnerHTML={{ 
              __html: processText('For millennia, the philosopher\'s stone has represented humanity\'s quest to transmute base elements into transcendent forms.') 
            }}
          />
        </p>
        
        <p className={cn(
          'text-xl md:text-2xl font-light',
          'text-white/90 mb-8',
          'tracking-wide leading-relaxed'
        )}>
          <span 
            dangerouslySetInnerHTML={{ 
              __html: processText('Today, that ancient pursuit manifests at the intersection of human potential and technological advancement.') 
            }}
          />
        </p>
        
        <p className={cn(
          'text-xl md:text-2xl font-light',
          'text-white/90',
          'tracking-wide leading-relaxed'
        )}>
          <span 
            dangerouslySetInnerHTML={{ 
              __html: processText('Our suite of tools embodies this modern alchemy, transforming intention into tangible reality with unprecedented precision.') 
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default PhilosophyText;
