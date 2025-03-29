
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="z-10 max-w-2xl px-6 md:px-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="glass rounded-xl p-8 md:p-10 backdrop-blur-lg bg-black/40 border border-white/10"
            >
              <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                The Modern Alchemy
              </h2>
              
              <div className="space-y-4 text-left font-inter text-base md:text-lg tracking-wide leading-relaxed text-white/80">
                <p className="fade-in">
                  For millennia, the philosopher's stone has represented humanity's quest to transmute base elements into transcendent forms.
                </p>
                <p className="fade-in">
                  Today, that ancient pursuit manifests at the intersection of human potential and technological advancement.
                </p>
                <p className="fade-in">
                  Our suite of tools embodies this modern alchemy, transforming intention into tangible reality with unprecedented precision.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhilosophySection;
