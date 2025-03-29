
import React, { useRef, useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import MinimalNavigation from '@/components/MinimalNavigation';
import ScrollIndicator from '@/components/ScrollIndicator';
import PhilosophySection from '@/components/PhilosophySection';
import ProductShowcase from '@/components/ProductShowcase';

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    {
      id: 'create',
      variant: 'purple' as const,
      text: 'CREATE',
      tagline: 'Transform your imagination into reality'
    },
    {
      id: 'manifest',
      variant: 'blue' as const,
      text: 'MANIFEST',
      tagline: 'Bring your vision into existence'
    },
    {
      id: 'now',
      variant: 'green' as const,
      text: 'NOW',
      tagline: 'The perfect moment is always present'
    },
    {
      id: 'philosophy',
      variant: 'purple' as const,
      text: 'PHILOSOPHY',
      tagline: 'Modern alchemy for the digital age'
    },
    {
      id: 'products',
      variant: 'purple' as const,
      text: 'PRODUCTS',
      tagline: 'Premium digital transformation tools'
    }
  ];
  
  const handleNavigate = (index: number) => {
    if (containerRef.current) {
      const sectionElement = document.getElementById(sections[index].id);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(index);
  };
  
  const handleScrollToNext = () => {
    const nextSection = (activeSection + 1) % sections.length;
    handleNavigate(nextSection);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // Get the current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        // Find which section is currently in view
        for (let i = 0; i < sections.length; i++) {
          const sectionElement = document.getElementById(sections[i].id);
          if (sectionElement) {
            const { offsetTop, offsetHeight } = sectionElement;
            if (
              scrollPosition >= offsetTop && 
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(i);
              break;
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  return (
    <div 
      ref={containerRef}
      className="scroll-snap-container scrollbar-hidden"
    >
      {sections.slice(0, 3).map((section, index) => (
        <HeroSection
          key={section.id}
          id={section.id}
          variant={section.variant}
          text={section.text}
          tagline={section.tagline}
        />
      ))}
      
      <PhilosophySection id="philosophy" />
      <ProductShowcase />
      
      <MinimalNavigation 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />
      
      <ScrollIndicator 
        onClick={handleScrollToNext} 
        className="fixed" 
      />
    </div>
  );
};

export default Index;
