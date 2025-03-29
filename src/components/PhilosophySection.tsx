
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import CosmicScene from './CosmicScene';
import CustomCursor from './CustomCursor';

interface PhilosophySectionProps {
  id: string;
  className?: string;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  id,
  className
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverWord, setHoverWord] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // Track hover state for key words
  const highlightWord = (word: string) => setHoverWord(word);
  const clearHighlight = () => setHoverWord(null);

  // Function to add hover effects to key words
  const enhanceText = (text: string) => {
    const keyWords = ['philosopher\'s stone', 'transmute', 'modern alchemy'];
    
    // Find key words in the text
    let enhancedText = text;
    
    keyWords.forEach(word => {
      const pattern = new RegExp(`(${word})`, 'gi');
      enhancedText = enhancedText.replace(pattern, `|$1|`);
    });
    
    // Split by marker and render with effects
    return enhancedText.split('|').map((segment, index) => {
      const isKeyword = keyWords.some(w => segment.toLowerCase().includes(w.toLowerCase()));
      
      if (isKeyword) {
        return (
          <span 
            key={index}
            className={cn(
              "transition-all duration-300",
              "relative inline-block",
              hoverWord === segment ? 
                "text-white font-medium" : 
                "text-white/90"
            )}
            onMouseEnter={() => highlightWord(segment)}
            onMouseLeave={clearHighlight}
          >
            {segment}
            {hoverWord === segment && (
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40"
                layoutId="underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </span>
        );
      }
      
      return <span key={index}>{segment}</span>;
    });
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'relative flex items-center justify-center',
        'min-h-screen w-full scroll-snap-section overflow-hidden',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <CosmicScene mousePosition={mousePosition} />
      <CustomCursor mousePosition={mousePosition} />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.19, 1, 0.22, 1], // Custom easing for premium feel
              delay: 0.2 
            }}
            className="z-10 max-w-2xl px-6 md:px-0"
            style={{
              // Subtle parallax effect based on mouse position
              transform: `translate(${
                (mousePosition.x - window.innerWidth / 2) * -0.005
              }px, ${
                (mousePosition.y - window.innerHeight / 2) * -0.005
              }px)`
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.19, 1, 0.22, 1], 
                delay: 0.4 
              }}
              className={cn(
                // Premium frosted glass effect
                "relative backdrop-blur-md rounded-xl p-8 md:p-12",
                "bg-white/[0.08] border border-white/[0.12]", 
                // Shadow and glow effects
                "shadow-[0_20px_80px_-10px_rgba(0,0,0,0.3)]",
                // Inner glow
                "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
                "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
                "overflow-hidden"
              )}
            >
              {/* Subtle inner glow effect */}
              <div className="absolute -inset-[100px] bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_70%)] opacity-70" />
              
              {/* Soft edge lighting */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>
              
              <div className="relative">
                <h2 className="font-inter font-bold text-3xl md:text-4xl mb-8 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-tight">
                  The Modern Alchemy
                </h2>
                
                <div className="space-y-5 text-left font-inter text-[17px] md:text-[18px] tracking-wide leading-relaxed text-white/80">
                  <p className="fade-in">
                    {enhanceText("For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.")}
                  </p>
                  <p className="fade-in">
                    {enhanceText("Today, that ancient pursuit manifests at the intersection of human potential and technological advancement.")}
                  </p>
                  <p className="fade-in">
                    {enhanceText("Our suite of tools embodies this modern alchemy, transforming intention into tangible reality with unprecedented precision.")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhilosophySection;
