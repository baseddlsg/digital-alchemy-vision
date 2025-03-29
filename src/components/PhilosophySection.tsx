
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import GradientBackground from './GradientBackground';
import GeometricElements from './GeometricElements';

interface PhilosophySectionProps {
  className?: string;
  id: string;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  className,
  id
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle text illumination on cursor proximity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;
      
      const { clientX, clientY } = e;
      const textElements = textRef.current.querySelectorAll('.illuminated-text');
      
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from cursor to element center
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Proximity threshold (px)
        const threshold = 200;
        
        // Calculate illumination based on proximity
        const illumination = Math.max(0, 1 - (distance / threshold));
        
        // Apply illumination effect
        const htmlEl = element as HTMLElement;
        htmlEl.style.opacity = (0.8 + (illumination * 0.2)).toString();
        htmlEl.style.textShadow = `0 0 ${illumination * 10}px rgba(255, 255, 255, ${illumination * 0.5})`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      id={id}
      className={cn(
        'relative flex items-center justify-center',
        'min-h-screen w-full scroll-snap-section',
        className
      )}
    >
      <GradientBackground variant="purple" />
      <GeometricElements />
      
      <div 
        ref={textRef}
        className={cn(
          'z-10 px-4',
          'max-w-3xl mx-auto',
          'flex flex-col items-center justify-center'
        )}
      >
        <h2 className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-black',
          'text-white mb-12',
          'tracking-tight leading-tight',
          'transform translate-z-30',
          'relative text-3d'
        )}>
          <span className="illuminated-text opacity-80">Philosophy</span>
        </h2>
        
        <p className={cn(
          'text-lg md:text-xl font-light',
          'text-white/80 mb-6',
          'tracking-wide leading-relaxed',
          'transform translate-z-20'
        )}>
          <span className="illuminated-text opacity-80">For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.</span>
        </p>
        
        <p className={cn(
          'text-lg md:text-xl font-light',
          'text-white/80 mb-6',
          'tracking-wide leading-relaxed',
          'transform translate-z-20'
        )}>
          <span className="illuminated-text opacity-80">Today, that ancient pursuit manifests at the intersection of human potential and technological advancement.</span>
        </p>
        
        <p className={cn(
          'text-lg md:text-xl font-light',
          'text-white/80',
          'tracking-wide leading-relaxed',
          'transform translate-z-20'
        )}>
          <span className="illuminated-text opacity-80">Our suite of tools embodies this modern alchemy, transforming intention into tangible reality with unprecedented precision.</span>
        </p>
      </div>
    </section>
  );
};

export default PhilosophySection;
