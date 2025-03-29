import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
}

const CustomCursor: React.FC<CustomCursorProps> = ({ mousePosition }) => {
  const [cursorVisible, setCursorVisible] = useState(false);
  const trailsRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const nextIdRef = useRef(0);

  // Hide default cursor when component mounts
  useEffect(() => {
    document.body.style.cursor = 'none';
    setCursorVisible(true);
    
    // Reset cursor on unmount
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);
  
  // Update trails on mouse movement
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;
    
    // Add new position to trails
    const newTrail = {
      x: mousePosition.x,
      y: mousePosition.y,
      id: nextIdRef.current++
    };
    
    // Keep fewer trails for more minimalist effect
    trailsRef.current = [...trailsRef.current, newTrail].slice(-6); // Reduced from 10
    setTrails(trailsRef.current);
    
    // Clear old trails
    const trailInterval = setInterval(() => {
      trailsRef.current = trailsRef.current.slice(1);
      setTrails([...trailsRef.current]);
      
      if (trailsRef.current.length === 0) {
        clearInterval(trailInterval);
      }
    }, 120); // Slightly longer interval
    
    return () => clearInterval(trailInterval);
  }, [mousePosition]);

  if (!cursorVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Custom cursor dot - more refined */}
      <motion.div
        className="absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] mix-blend-screen"
        style={{
          width: 8, // Smaller
          height: 8, // Smaller
          top: mousePosition.y - 4,
          left: mousePosition.x - 4
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 0.15, ease: "easeOut" }} // Improved easing
      />
      
      {/* Larger, softer glow - more subtle */}
      <motion.div
        className="absolute rounded-full bg-white/10 backdrop-blur-[2px]" // More subtle blur
        style={{
          width: 25, // Slightly smaller
          height: 25, // Slightly smaller
          top: mousePosition.y - 12.5,
          left: mousePosition.x - 12.5
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }} // More subtle
        transition={{ duration: 0.25, ease: "easeOut" }} // Improved easing
      />
      
      {/* Minimal particle trails */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="absolute rounded-full bg-white"
          style={{
            width: 2, // Smaller
            height: 2, // Smaller
            top: trail.y - 1,
            left: trail.x - 1
          }}
          initial={{ opacity: 0.5 }} // Less visible
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }} // Improved easing
        />
      ))}
    </div>
  );
};

export default CustomCursor;
