import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // 1. Slow, glowing draw (Liquid Gold feel)
      await controls.start({
        pathLength: 1,
        opacity: [0, 1],
        transition: { duration: 3.5, ease: [0.25, 0.1, 0.25, 1] }
      });
      // 2. Slow fill and glow
      await controls.start({
        fill: 'rgba(212, 175, 55, 0.85)',
        filter: 'drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.8))',
        transition: { duration: 2, ease: 'easeOut' }
      });
      // 3. Pause
      await new Promise(resolve => setTimeout(resolve, 800));
      // 4. Fade out completely
      onComplete();
    };
    sequence();
  }, [controls, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2, ease: 'easeInOut' } }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#050404', // Absolute deepest black for contrast
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3 }}
        style={{ width: '150px', marginBottom: '3rem' }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 0px 4px rgba(212, 175, 55, 0.3))' }}>
          {/* Outer elegant curve */}
          <motion.path
            d="M50 5 C75 25, 95 50, 50 95 C5 50, 25 25, 50 5 Z"
            fill="transparent"
            stroke="url(#liquidGold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
          />
          {/* Inner detailed curve */}
          <motion.path
            d="M50 20 C65 35, 80 50, 50 80 C20 50, 35 35, 50 20 Z"
            fill="transparent"
            stroke="url(#liquidGold)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.5 }}
          />
          <defs>
            <linearGradient id="liquidGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cfaf72" />
              <stop offset="50%" stopColor="#fff6cd" />
              <stop offset="100%" stopColor="#c39d50" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 3, delay: 1, ease: 'easeOut' }}
        className="gold-gradient-text"
        style={{ fontSize: '3.5rem', letterSpacing: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', fontWeight: 300 }}
      >
        Анар
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        style={{ 
          color: '#f3cfbe', // Rose Gold / Peach
          fontSize: '1.8rem', 
          fontFamily: 'var(--font-script)', 
          marginTop: '1rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}
      >
        Anar Qyz Uzatu
      </motion.p>
    </motion.div>
  );
};

export default Intro;
