
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
  const sections = ['CREATE', 'MANIFEST', 'NOW'];
  
  return (
    <div className={cn(
      'fixed top-8 right-12 z-30',
      'flex items-center gap-4',
      className
    )}>
      {sections.map((section, index) => (
        <button
          key={section}
          className={cn(
            'w-3 h-3 rounded-full transition-all duration-300',
            'hover:bg-white/60',
            activeSection === index ? 'bg-white/80' : 'bg-white/20'
          )}
          onClick={() => onNavigate(index)}
          aria-label={`Navigate to ${section} section`}
        />
      ))}
    </div>
  );
};

export default MinimalNavigation;
