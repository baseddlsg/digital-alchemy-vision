
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
  onClick?: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ className, onClick }) => {
  return (
    <div 
      className={cn(
        'absolute bottom-8 left-1/2 -translate-x-1/2',
        'flex flex-col items-center gap-2 cursor-pointer',
        'animate-float',
        className
      )}
      onClick={onClick}
    >
      <div className="text-xs uppercase tracking-widest text-white/40">Scroll</div>
      <ChevronDown className="w-5 h-5 text-white/40" />
    </div>
  );
};

export default ScrollIndicator;
