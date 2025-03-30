
import React from 'react';
import { cn } from '@/lib/utils';

interface MinimalNavigationProps {
  className?: string;
  activeSection: number;
  onNavigate: (index: number) => void;
}

const MinimalNavigation: React.FC<MinimalNavigationProps> = ({
  className,
  activeSection,
  onNavigate
}) => {
  const sections = ['CREATE', 'MANIFEST', 'NOW', 'PHILOSOPHY', 'PRODUCTS'];
  
  return (
    <div className={cn(
      'fixed top-8 right-12 z-30',
      'flex items-center gap-4',
      className
    )}>
      {sections.map((section, index) => {
        // Define color variants based on section
        let dotColor = 'bg-white/80';
        if (activeSection === index) {
          // Enhanced colors based on section type
          if (index === 0 || index === 3 || index === 4) {
            dotColor = 'bg-alchemy-purple/80'; // Purple sections
          } else if (index === 1) {
            dotColor = 'bg-alchemy-blue-royal/80'; // Blue section
          } else if (index === 2) {
            dotColor = 'bg-alchemy-green-emerald/80'; // Green section
          }
        }
        
        return (
          <button
            key={section}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              'hover:bg-white/60 shadow-glow',
              activeSection === index ? dotColor : 'bg-white/20'
            )}
            onClick={() => onNavigate(index)}
            aria-label={`Navigate to ${section} section`}
          />
        );
      })}
    </div>
  );
};

export default MinimalNavigation;
