
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, ArrowUp, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };
  
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="relative w-full overflow-hidden z-10">
      {/* Inspiring gradient background with aurora effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900 opacity-95" />
      
      {/* Aurora-like light effect */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-purple-500/30 to-transparent animate-pulse-slow transform-gpu"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-400/20 to-transparent animate-pulse-slow transform-gpu" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Subtle particle effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 animate-subtle-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Frosted glass separator at the top */}
      <div className="h-px w-full bg-white/20 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Inspirational tagline */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-200 via-purple-100 to-pink-200 bg-clip-text text-transparent">
              Elevate Your Digital Presence
            </h3>
            <p className="mt-4 text-purple-100/80 max-w-2xl mx-auto">
              Join us on a transformative journey through the digital realms of possibility
            </p>
          </div>
          
          {/* Newsletter subscription */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold bg-gradient-to-r from-purple-200 to-pink-100 bg-clip-text text-transparent mb-6 text-center">
              Subscribe to Our Newsletter
            </h4>
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-grow relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 h-12 pr-10 backdrop-blur-xl transition-all duration-300 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-purple-300/30"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 h-5 w-5" />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-8 bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:shadow-glow"
              >
                Subscribe
              </Button>
            </form>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "Github" },
              { icon: Linkedin, label: "LinkedIn" },
            ].map((social, index) => (
              <a 
                key={index}
                href="#" 
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105 hover:border-white/40 hover:shadow-glow"
              >
                <social.icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>
          
          {/* Learn more link and copyright info */}
          <div className="text-center text-white/70 text-sm mb-8 flex flex-col items-center">
            <a 
              href="https://thegreatwork.co/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-3 inline-flex items-center text-purple-200 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-purple-200/50 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                Learn More
              </span>
              <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <div>© 2025 The Great Work Suite. All rights reserved.</div>
          </div>
          
          {/* Back to top button */}
          <div className="flex justify-center">
            <button 
              onClick={handleBackToTop} 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105 hover:border-white/40 hover:shadow-glow"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
