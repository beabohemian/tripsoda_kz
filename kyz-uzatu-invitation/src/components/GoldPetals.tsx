import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const GoldPetals = () => {
  // Use 30 very small, subtle bokeh particles instead of large SVGs
  const particles = useMemo(() => Array.from({ length: 30 }), []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 50,
      mixBlendMode: 'screen'
    }}>
      {particles.map((_, i) => {
        const startX = Math.random() * 100;
        const duration = 15 + Math.random() * 25; // extremely slow
        const delay = Math.random() * -30; // Negative delay to pre-populate screen
        const size = 2 + Math.random() * 5; // Very small particles
        const blur = Math.random() > 0.5 ? '2px' : '0px'; // Cinematic depth of field
        const opacityPeak = 0.3 + Math.random() * 0.5;

        return (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: `${startX}vw`, opacity: 0 }}
            animate={{ 
              y: '-10vh', // Floating UPWARDS slowly like embers/magic dust
              x: `${startX + (Math.random() * 20 - 10)}vw`,
              opacity: [0, opacityPeak, opacityPeak, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: '#d4af37',
              filter: `blur(${blur}) drop-shadow(0 0 ${size * 2}px rgba(212, 175, 55, 0.8))`
            }}
          />
        );
      })}
    </div>
  );
};

export default GoldPetals;
