
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
  status: 'available' | 'coming-soon';
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  tagline,
  description,
  features,
  color,
  status,
  className
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [condensation, setCondensation] = useState<{ x: number, y: number, size: number }[]>([]);
  
  // Generate initial condensation points
  useEffect(() => {
    const points = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 30,
      size: 1 + Math.random() * 3
    }));
    setCondensation(points);
  }, []);
  
  // Animate condensation occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setCondensation(prev => 
        prev.map(point => ({
          ...point,
          y: point.y + (0.2 + Math.random() * 0.5),
          size: point.size > 0.5 ? point.size - 0.1 : point.size
        }))
      );
      
      // Add new condensation occasionally
      if (Math.random() > 0.7) {
        setCondensation(prev => [
          ...prev,
          {
            x: Math.random() * 100,
            y: 0,
            size: 1 + Math.random() * 3
          }
        ]);
      }
      
      // Remove condensation that has moved off the card
      setCondensation(prev => prev.filter(point => point.y < 100 && point.size > 0.3));
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle mouse movement for light refraction effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      setMousePosition({ x, y });
    }
  };
  
  // Color mapping
  const colorMap: Record<string, { bg: string, glow: string }> = {
    '#6C3082': { bg: 'from-alchemy-purple/10 to-alchemy-purple-dark/5', glow: 'purple' },
    '#1A73E8': { bg: 'from-alchemy-blue/10 to-alchemy-blue-royal/5', glow: 'blue' },
    '#34A853': { bg: 'from-alchemy-green-emerald/10 to-alchemy-green-teal/5', glow: 'green' }
  };
  
  const bgGradient = colorMap[color]?.bg || 'from-white/5 to-black/10';
  const glowColor = colorMap[color]?.glow || 'purple';

  return (
    <div 
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-300',
        'border border-white/10 backdrop-blur-xl',
        'flex flex-col p-6 h-full',
        'bg-gradient-to-br',
        bgGradient,
        isHovered && 'scale-[1.02] shadow-lg',
        className
      )}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.2s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect behind the card */}
      <div 
        className={cn(
          'absolute -z-10 blur-3xl opacity-20 w-3/4 h-3/4 rounded-full',
          'transition-opacity duration-700',
          isHovered ? 'opacity-40' : 'opacity-20',
          `bg-alchemy-${glowColor}`
        )} 
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Condensation effect */}
      {condensation.map((drop, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            width: `${drop.size}px`,
            height: `${drop.size * (1 + Math.random() * 3)}px`,
            opacity: 0.1 + Math.random() * 0.3
          }}
        />
      ))}
      
      {/* Light refraction effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
            : 'none'
        }}
      />
      
      {/* Status badge */}
      <div className={cn(
        'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium',
        status === 'available' 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
      )}>
        {status === 'available' ? 'Available Now' : 'Coming Soon'}
      </div>
      
      <div className="flex flex-col h-full">
        {/* Product name and tagline */}
        <h3 className="text-2xl font-bold silver-text mb-1">{name}</h3>
        <p className="text-sm text-white/60 mb-6">{tagline}</p>
        
        {/* Description */}
        <p className="text-white/80 mb-6 leading-relaxed">{description}</p>
        
        {/* Features */}
        <div className="mb-6 flex-grow">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-white/70">
                <span className="mr-2 text-white/40">◊</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Button */}
        <Button 
          variant="outline"
          className={cn(
            'mt-auto border-white/10 bg-white/5 hover:bg-white/10',
            'transition-all duration-300 backdrop-blur-sm',
            status === 'coming-soon' && 'opacity-50 cursor-not-allowed'
          )}
          disabled={status === 'coming-soon'}
        >
          {status === 'available' ? 'Learn More' : 'Notify Me'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
