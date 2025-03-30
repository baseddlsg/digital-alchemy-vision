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
  const [condensation, setCondensation] = useState<{ x: number, y: number, size: number, opacity: number }[]>([]);
  
  useEffect(() => {
    const points = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 40,
      size: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.4
    }));
    setCondensation(points);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCondensation(prev => 
        prev.map(point => ({
          ...point,
          y: point.y + (0.3 + Math.random() * 0.5),
          size: point.size > 0.5 ? point.size - 0.1 : point.size,
          opacity: Math.max(0.1, point.opacity - 0.02)
        }))
      );
      
      if (Math.random() > 0.6) {
        setCondensation(prev => [
          ...prev,
          {
            x: Math.random() * 100,
            y: 0,
            size: 1 + Math.random() * 4,
            opacity: 0.2 + Math.random() * 0.5
          }
        ]);
      }
      
      setCondensation(prev => prev.filter(point => point.y < 100 && point.opacity > 0.1));
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      setMousePosition({ x, y });
    }
  };
  
  const colorMap: Record<string, { bg: string, glow: string, shadow: string }> = {
    '#6C3082': { 
      bg: 'from-alchemy-purple/20 to-alchemy-purple-dark/10', 
      glow: 'purple',
      shadow: '108,48,130'
    },
    '#1A73E8': { 
      bg: 'from-alchemy-blue/20 to-alchemy-blue-royal/10', 
      glow: 'blue',
      shadow: '26,115,232'
    },
    '#34A853': { 
      bg: 'from-alchemy-green-emerald/20 to-alchemy-green-teal/10', 
      glow: 'green',
      shadow: '52,168,83'
    }
  };
  
  const bgGradient = colorMap[color]?.bg || 'from-white/10 to-black/20';
  const glowColor = colorMap[color]?.glow || 'purple';
  const shadowColor = colorMap[color]?.shadow || '108,48,130';

  return (
    <div 
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-500',
        'glass-premium backdrop-blur-2xl',
        'flex flex-col p-5',
        'bg-gradient-to-br',
        bgGradient,
        isHovered && 'scale-[1.02]',
        'animate-float-slow',
        className
      )}
      style={{
        transform: isHovered 
          ? `perspective(1200px) rotateX(${mousePosition.y * -7}deg) rotateY(${mousePosition.x * 7}deg)` 
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.3s ease-out',
        boxShadow: `
          0 15px 35px -5px rgba(0,0,0,0.4), 
          0 5px 20px rgba(${shadowColor},0.25),
          0 0 15px rgba(${shadowColor},0.15),
          0 0 8px rgba(${shadowColor},0.08)
        `,
        border: '1px solid rgba(255,255,255,0.15)',
        maxHeight: '380px',
        height: '100%'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          'absolute -z-10 blur-3xl w-3/4 h-3/4 rounded-full',
          'transition-opacity duration-700',
          isHovered ? 'opacity-50' : 'opacity-30',
          `bg-alchemy-${glowColor}`
        )} 
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div 
        className="absolute inset-0 bg-white/5 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.15 : 0.08,
          background: isHovered 
            ? `radial-gradient(circle at ${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%, rgba(255,255,255,0.9) 0%, transparent 70%)`
            : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 80%)'
        }}
      />
      
      <div className="absolute inset-0 bg-noise-pattern opacity-15" />
      
      {condensation.map((drop, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white/50"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            width: `${drop.size}px`,
            height: `${drop.size * (1 + Math.random() * 4)}px`,
            opacity: drop.opacity,
            filter: 'blur(0.5px)'
          }}
        />
      ))}
      
      <div className={cn(
        'absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-xl',
        status === 'available' 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
      )}>
        {status === 'available' ? 'Available Now' : 'Coming Soon'}
      </div>
      
      <div className="flex flex-col h-full z-10">
        <h3 className="text-xl font-bold silver-text mb-1.5">{name}</h3>
        <p className="text-xs text-white/70 mb-2 metallic-text">{tagline}</p>
        
        <p className="text-white/80 mb-3 text-sm leading-relaxed">{description}</p>
        
        <div className="mb-3 flex-grow">
          <ul className="space-y-1.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-xs text-white/70">
                <span className="mr-2 text-white/50">◈</span>
                <span className="metallic-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {status === 'available' ? (
          <a 
            href="https://thegreatwork.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto"
          >
            <Button 
              variant="outline"
              className={cn(
                'w-full border-white/10 bg-white/5 hover:bg-white/10',
                'transition-all duration-300 backdrop-blur-xl text-white/90 text-sm',
                'h-8 px-3 py-1'
              )}
            >
              Use Now
            </Button>
          </a>
        ) : (
          <Button 
            variant="outline"
            className={cn(
              'mt-auto border-white/10 bg-white/5 hover:bg-white/10',
              'transition-all duration-300 backdrop-blur-xl text-white/90 text-sm',
              'h-8 px-3 py-1',
              'opacity-50 cursor-not-allowed'
            )}
            disabled
          >
            Notify Me
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
