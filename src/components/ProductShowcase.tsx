
import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

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
  
  return (
    <div 
      id="products" 
      className="relative min-h-screen w-full scroll-snap-section flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background element - subtle particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/5 animate-subtle-pulse"
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Section header */}
      <div 
        className={cn(
          "text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000 ease-out",
          "delay-300"
        )}
        ref={el => cardsRef.current[0] = el}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white/50 mb-4 silver-text">
          Our Products
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg">
          Digital alchemy solutions crafted for the modern age
        </p>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl w-full">
        {products.map((product, index) => (
          <div
            key={product.name}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-1000 ease-out",
              `delay-${(index + 1) * 200}`
            )}
            ref={el => cardsRef.current[index + 1] = el}
          >
            <ProductCard
              name={product.name}
              tagline={product.tagline}
              description={product.description}
              features={product.features}
              color={product.color}
              status={product.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
