
import React from 'react';
import { cn } from '@/lib/utils';
import GradientBackground from './GradientBackground';
import AlchemyText from './AlchemyText';

interface HeroSectionProps {
  variant: 'purple' | 'blue' | 'green';
  text: string;
  tagline: string;
  className?: string;
  id: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  variant,
  text,
  tagline,
  className,
  id
}) => {
  return (
    <section 
      id={id}
      className={cn(
        'relative flex items-center justify-center',
        'h-screen w-full scroll-snap-section',
        className
      )}
    >
      <GradientBackground variant={variant} />
      
      <div className="z-10 px-4">
        <AlchemyText
          variant={variant}
          text={text}
          tagline={tagline}
        />
      </div>
    </section>
  );
};

export default HeroSection;
