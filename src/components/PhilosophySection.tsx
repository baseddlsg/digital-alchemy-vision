
import React from 'react';
import { cn } from '@/lib/utils';
import LiquidCircle from './LiquidCircle';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PhilosophySectionProps {
  className?: string;
  id: string;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ className, id }) => {
  return (
    <section 
      id={id}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'min-h-screen w-full scroll-snap-section',
        'p-6 md:p-12',
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full -z-10 philosophy-gradient opacity-95" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 z-10">
        <div className="flex-1 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <LiquidCircle />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white text-opacity-20 text-4xl font-light">∞</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <Card className="bg-black/30 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
                <span className="text-gradient-primary">Philosophy</span>
              </h2>
              
              <Separator className="mb-6 bg-white/10" />
              
              <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light mb-8">
                The philosopher's stone isn't hidden in ancient texts or distant mountains. 
                It exists within the intersection of human potential and technological advancement.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light mb-8">
                Our suite of tools illuminates this crossroads, enabling you to transform 
                intention into tangible reality with unprecedented precision.
              </p>
              
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 bg-alchemy-blue-royal rounded-full"></div>
                  <span className="text-sm uppercase tracking-widest text-white/60">Transform</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 bg-alchemy-purple-light rounded-full"></div>
                  <span className="text-sm uppercase tracking-widest text-white/60">Create</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 bg-alchemy-green-emerald rounded-full"></div>
                  <span className="text-sm uppercase tracking-widest text-white/60">Manifest</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
