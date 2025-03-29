
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
    const points = Array.from({ length: 10 }, () => ({
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
    '#6C3082': { bg: 'from-alchemy-purple/20 to-alchemy-purple-dark/10', glow: 'purple' },
    '#1A73E8': { bg: 'from-alchemy-blue/20 to-alchemy-blue-royal/10', glow: 'blue' },
    '#34A853': { bg: 'from-alchemy-green-emerald/20 to-alchemy-green-teal/10', glow: 'green' }
  };
  
  const bgGradient = colorMap[color]?.bg || 'from-white/10 to-black/20';
  const glowColor = colorMap[color]?.glow || 'purple';

  return (
    <div 
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-500',
        'glass-premium backdrop-blur-xl',
        'flex flex-col p-8 h-full',
        'bg-gradient-to-br',
        bgGradient,
        isHovered && 'scale-[1.02] shadow-2xl',
        'animate-float-slow',
        className
      )}
      style={{
        transform: isHovered 
          ? `perspective(1200px) rotateX(${mousePosition.y * -7}deg) rotateY(${mousePosition.x * 7}deg)` 
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.3s ease-out',
        boxShadow: `0 10px 30px -5px rgba(0,0,0,0.3), 0 0 15px rgba(${color === '#6C3082' ? '108,48,130' : color === '#1A73E8' ? '26,115,232' : '52,168,83'},0.2)`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect behind the card */}
      <div 
        className={cn(
          'absolute -z-10 blur-3xl w-3/4 h-3/4 rounded-full',
          'transition-opacity duration-700',
          isHovered ? 'opacity-40' : 'opacity-25',
          `bg-alchemy-${glowColor}`
        )} 
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Enhanced light refraction layer */}
      <div 
        className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.08 : 0,
          background: isHovered 
            ? `radial-gradient(circle at ${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%, rgba(255,255,255,0.8) 0%, transparent 70%)`
            : 'none'
        }}
      />
      
      {/* Condensation effect */}
      {condensation.map((drop, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            width: `${drop.size}px`,
            height: `${drop.size * (1 + Math.random() * 4)}px`,
            opacity: 0.1 + Math.random() * 0.4
          }}
        />
      ))}
      
      {/* Status badge */}
      <div className={cn(
        'absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm',
        status === 'available' 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
      )}>
        {status === 'available' ? 'Available Now' : 'Coming Soon'}
      </div>
      
      <div className="flex flex-col h-full">
        {/* Product name and tagline */}
        <h3 className="text-3xl font-bold silver-text mb-2">{name}</h3>
        <p className="text-sm text-white/70 mb-8 metallic-text">{tagline}</p>
        
        {/* Description */}
        <p className="text-white/80 mb-8 leading-relaxed">{description}</p>
        
        {/* Features */}
        <div className="mb-8 flex-grow">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-white/70">
                <span className="mr-3 text-white/50">◈</span>
                <span className="metallic-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Button */}
        <Button 
          variant="outline"
          className={cn(
            'mt-auto border-white/10 bg-white/5 hover:bg-white/10',
            'transition-all duration-300 backdrop-blur-sm text-white/90',
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
