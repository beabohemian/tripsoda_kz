import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        pathLength: 1,
        opacity: [0, 1],
        transition: { duration: 3.5, ease: [0.25, 0.1, 0.25, 1] }
      });
      await controls.start({
        fill: 'rgba(212, 175, 55, 0.85)',
        filter: 'drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.8))',
        transition: { duration: 2, ease: 'easeOut' }
      });
      await new Promise(resolve => setTimeout(resolve, 800));
      onComplete();
    };
    sequence();
  }, [controls, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#050404',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Background pattern directly in Intro */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 C60 30 90 40 50 90 C10 40 40 30 50 10' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px',
        zIndex: -1
      }} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3 }}
        style={{ width: '150px', marginBottom: '3rem' }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 0px 4px rgba(212, 175, 55, 0.3))' }}>
          <motion.path
            d="M50 5 C75 25, 95 50, 50 95 C5 50, 25 25, 50 5 Z"
            fill="transparent"
            stroke="url(#liquidGoldIntro)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
          />
          <motion.path
            d="M50 20 C65 35, 80 50, 50 80 C20 50, 35 35, 50 20 Z"
            fill="transparent"
            stroke="url(#liquidGoldIntro)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.5 }}
          />
          <defs>
            <linearGradient id="liquidGoldIntro" x1="0%" y1="0%" x2="100%" y2="100%">
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
        style={{ 
          fontSize: '5rem', 
          fontFamily: 'var(--font-script)', 
          fontWeight: 300,
          textShadow: '0 5px 25px rgba(212, 175, 55, 0.3)',
          textAlign: 'center',
          lineHeight: 1.2
        }}
      >
        Anar<br />Qyz Uzatu
      </motion.h1>
    </motion.div>
  );
};

export default Intro;
