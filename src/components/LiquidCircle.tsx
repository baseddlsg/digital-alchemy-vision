
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LiquidCircleProps {
  className?: string;
}

const LiquidCircle: React.FC<LiquidCircleProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  
  // Liquid simulation parameters
  const particles: { x: number, y: number, vx: number, vy: number }[] = [];
  const particleCount = 100;
  const centerX = useRef(0);
  const centerY = useRef(0);
  const radius = useRef(150);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match its display size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      
      centerX.current = canvas.width / 2;
      centerY.current = canvas.height / 2;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles in a circle
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const x = centerX.current + Math.cos(angle) * radius.current;
      const y = centerY.current + Math.sin(angle) * radius.current;
      
      particles.push({
        x,
        y,
        vx: 0,
        vy: 0
      });
    }
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    // Touch move handler for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
        e.preventDefault();
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient for liquid
      const gradient = ctx.createRadialGradient(
        centerX.current, centerY.current, 0,
        centerX.current, centerY.current, radius.current * 1.5
      );
      
      gradient.addColorStop(0, 'rgba(155, 135, 245, 0.8)'); // Inner color (purple)
      gradient.addColorStop(0.5, 'rgba(51, 195, 240, 0.6)'); // Middle color (blue)
      gradient.addColorStop(1, 'rgba(20, 184, 166, 0.4)'); // Outer color (green)
      
      ctx.fillStyle = gradient;
      
      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        const angle = (i / particleCount) * Math.PI * 2;
        
        // Target position is on the circle
        const targetX = centerX.current + Math.cos(angle) * radius.current;
        const targetY = centerY.current + Math.sin(angle) * radius.current;
        
        // Spring force to return to the circle
        const springFactor = 0.01;
        const springX = (targetX - particle.x) * springFactor;
        const springY = (targetY - particle.y) * springFactor;
        
        // Mouse influence
        const mouseInfluence = 100;
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let mouseFactor = 0;
        if (distance < mouseInfluence) {
          mouseFactor = 1 - (distance / mouseInfluence);
        }
        
        const mouseForceX = -dx * mouseFactor * 0.02;
        const mouseForceY = -dy * mouseFactor * 0.02;
        
        // Update velocity with spring force and mouse influence
        particle.vx = particle.vx * 0.9 + springX + mouseForceX;
        particle.vy = particle.vy * 0.9 + springY + mouseForceY;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
      }
      
      // Draw the liquid shape
      ctx.beginPath();
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        if (i === 0) {
          ctx.moveTo(particle.x, particle.y);
        } else {
          const prevParticle = particles[i - 1];
          const cpX = (prevParticle.x + particle.x) / 2;
          const cpY = (prevParticle.y + particle.y) / 2;
          ctx.quadraticCurveTo(prevParticle.x, prevParticle.y, cpX, cpY);
        }
      }
      
      // Connect the last and first particles
      const firstParticle = particles[0];
      const lastParticle = particles[particleCount - 1];
      const cpX = (lastParticle.x + firstParticle.x) / 2;
      const cpY = (lastParticle.y + firstParticle.y) / 2;
      ctx.quadraticCurveTo(lastParticle.x, lastParticle.y, cpX, cpY);
      
      ctx.closePath();
      ctx.fill();
      
      // Add a subtle glow
      ctx.shadowColor = 'rgba(155, 135, 245, 0.6)';
      ctx.shadowBlur = 30;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Reflection effect
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.arc(centerX.current, centerY.current - 20, radius.current * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'w-full h-full max-w-[400px] max-h-[400px]',
        'rounded-full',
        className
      )}
    />
  );
};

export default LiquidCircle;
