
import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import GradientBackground from './GradientBackground';

const products = [
  {
    name: "Transformation",
    tagline: "Premium Digital Alchemy Suite",
    description: "Transform your digital assets into refined experiences with our flagship suite of tools.",
    features: [
      "Advanced metamorphosis algorithms",
      "Multi-layer refinement process",
      "Real-time artifact elimination",
      "Seamless integration workflow"
    ],
    color: "#6C3082",
    status: 'available' as const
  },
  {
    name: "Distillation",
    tagline: "Extract Digital Essence",
    description: "Distill the core elements of your digital presence into pure, potent expressions.",
    features: [
      "Precision content extraction",
      "Semantic purification engine",
      "Adaptive essence mapping",
      "Context-aware refinement"
    ],
    color: "#1A73E8",
    status: 'coming-soon' as const
  },
  {
    name: "Projection",
    tagline: "Extend Your Digital Reach",
    description: "Project your digital presence across platforms with unparalleled clarity and consistency.",
    features: [
      "Cross-medium transmission",
      "Adaptive scaling technology",
      "Retention optimization",
      "Impression enhancement suite"
    ],
    color: "#34A853",
    status: 'coming-soon' as const
  },
  {
    name: "Culmination",
    tagline: "Complete Digital Transcendence",
    description: "Achieve digital transcendence through our most advanced alchemical process.",
    features: [
      "Holistic integration framework",
      "Synergistic amplification",
      "Presence harmonization",
      "Perpetual refinement cycle"
    ],
    color: "#6C3082",
    status: 'coming-soon' as const
  }
];

const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
  
  // Parallax effect on scroll with improved behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax when the section is in view
      if (scrollPosition + viewportHeight < sectionTop || scrollPosition > sectionTop + sectionRef.current.offsetHeight) {
        return;
      }
      
      const scrollRelative = scrollPosition - sectionTop + viewportHeight / 2;
      
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Apply different, more subtle parallax rates to each card
        const parallaxRate = 0.02 * (index % 2 === 0 ? 1 : -1);
        const yOffset = scrollRelative * parallaxRate;
        
        if (Math.abs(yOffset) < 15) { // Limit the parallax effect
          card.style.transform = `translateY(${yOffset}px)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      id="products" 
      className="relative min-h-screen w-full scroll-snap-section flex flex-col items-center justify-start py-24 px-6 overflow-visible"
      ref={sectionRef}
      style={{
        scrollMarginTop: '4rem', // Add scroll margin to improve anchoring
      }}
    >
      {/* Enhanced background with gradient transition from philosophy section */}
      <GradientBackground variant="purple" className="opacity-90" />
      
      {/* Enhanced particle effects with more depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/5 animate-subtle-pulse"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
        
        {/* Depth elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-alchemy-purple-deep/20 to-transparent opacity-30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 opacity-40" />
      </div>
      
      {/* Section header with improved visibility */}
      <div 
        className={cn(
          "text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000 ease-out w-full",
          "delay-300 pt-10"
        )}
        ref={el => cardsRef.current[0] = el}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 silver-text">
          Our Products
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto text-lg metallic-text">
          Digital alchemy solutions crafted for the modern age
        </p>
      </div>
      
      {/* Products grid with improved layout and visibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl w-full">
        {products.map((product, index) => (
          <div
            key={product.name}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-1000 ease-out",
              `delay-${(index + 1) * 200}`
            )}
            style={{
              animation: 'float-slow 6s ease-in-out infinite',
              animationDelay: `${index * 1.2}s`
            }}
            ref={el => cardsRef.current[index + 1] = el}
          >
            <ProductCard
              name={product.name}
              tagline={product.tagline}
              description={product.description}
              features={product.features}
              color={product.color}
              status={product.status}
              className="transform-gpu"
            />
          </div>
        ))}
      </div>
      
      {/* Add bottom padding to ensure proper spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default ProductShowcase;
