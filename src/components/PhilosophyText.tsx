
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const PhilosophyText = () => {
  // Split the text into individual letters for precise highlighting
  const philosophyText = "For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.";
  
  // Track which letter is being hovered
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  
  // Create an array of all letters with their indices
  const letters = philosophyText.split('').map((letter, index) => ({ letter, index }));
  
  // Group letters into words for better layout management
  const words: { letters: { letter: string, index: number }[], startIndex: number }[] = [];
  let currentWord: { letter: string, index: number }[] = [];
  let wordStartIndex = 0;
  
  letters.forEach((letterObj) => {
    if (letterObj.letter === ' ') {
      if (currentWord.length > 0) {
        words.push({ letters: [...currentWord], startIndex: wordStartIndex });
        currentWord = [];
        wordStartIndex = letterObj.index + 1;
      }
    } else {
      currentWord.push(letterObj);
    }
  });
  
  // Add the last word
  if (currentWord.length > 0) {
    words.push({ letters: currentWord, startIndex: wordStartIndex });
  }
  
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
          {words.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <span className="inline-block">
                {word.letters.map((letterObj) => (
                  <span 
                    key={letterObj.index}
                    className={cn(
                      'inline-block transition-all duration-300',
                      'metallic-text',
                      hoveredLetter === letterObj.index && 'text-gleam'
                    )}
                    onMouseEnter={() => setHoveredLetter(letterObj.index)}
                    onMouseLeave={() => setHoveredLetter(null)}
                  >
                    {letterObj.letter}
                  </span>
                ))}
              </span>
              {wordIndex < words.length - 1 && ' '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PhilosophyText;
