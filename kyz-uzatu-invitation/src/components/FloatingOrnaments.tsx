import React from 'react';
import { motion } from 'framer-motion';

const SVGOrnament = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#d4af37" strokeWidth="1.5">
      <path d="M50,90 Q50,60 50,50"/>
      <path d="M50,50 C30,50 10,40 20,20 C25,10 40,10 45,25 C47,35 35,40 30,30"/>
      <path d="M50,50 C70,50 90,40 80,20 C75,10 60,10 55,25 C53,35 65,40 70,30"/>
      <path d="M50,50 C40,40 45,20 50,10 C55,20 60,40 50,50 Z"/>
      <path d="M50,70 Q30,70 20,90"/>
      <path d="M50,70 Q70,70 80,90"/>
    </g>
  </svg>
);

const FloatingOrnaments = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      
      {/* Ornament 1 - Top Right Huge */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [15, 18, 15],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '-10%', right: '-20%', width: '500px', height: '500px' }}
      >
        <SVGOrnament />
      </motion.div>

      {/* Ornament 2 - Middle Left Faded */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          rotate: [-10, -8, -10],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: 'absolute', top: '30%', left: '-30%', width: '600px', height: '600px' }}
      >
        <SVGOrnament />
      </motion.div>

      {/* Ornament 3 - Bottom Right */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, -10, 0],
          rotate: [45, 48, 45],
          opacity: [0.04, 0.06, 0.04]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{ position: 'absolute', bottom: '10%', right: '-25%', width: '450px', height: '450px' }}
      >
        <SVGOrnament />
      </motion.div>

    </div>
  );
};

export default FloatingOrnaments;
