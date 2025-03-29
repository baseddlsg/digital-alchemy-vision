
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
    
    trailsRef.current = [...trailsRef.current, newTrail].slice(-10);
    setTrails(trailsRef.current);
    
    // Clear old trails
    const trailInterval = setInterval(() => {
      trailsRef.current = trailsRef.current.slice(1);
      setTrails([...trailsRef.current]);
      
      if (trailsRef.current.length === 0) {
        clearInterval(trailInterval);
      }
    }, 100);
    
    return () => clearInterval(trailInterval);
  }, [mousePosition]);

  if (!cursorVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Custom cursor dot */}
      <motion.div
        className="absolute rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] mix-blend-screen"
        style={{
          width: 10,
          height: 10,
          top: mousePosition.y - 5,
          left: mousePosition.x - 5
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Larger, softer glow */}
      <motion.div
        className="absolute rounded-full bg-white/20 backdrop-blur-sm"
        style={{
          width: 30,
          height: 30,
          top: mousePosition.y - 15,
          left: mousePosition.x - 15
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Particle trails */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="absolute rounded-full bg-white"
          style={{
            width: 3,
            height: 3,
            top: trail.y - 1.5,
            left: trail.x - 1.5
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
