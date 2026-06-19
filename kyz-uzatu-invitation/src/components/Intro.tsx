import React, { useEffect, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

// High-End Magic Sparkle
const MagicSparkle = ({ size, top, left, delay }: any) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ position: 'absolute', top, left, width: size, height: size, color: '#fff', zIndex: 110, pointerEvents: 'none' }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
  </motion.div>
);

// Floating Gold Dust
const GoldDust = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ y: '-10vh', opacity: [0, 0.3, 0] }}
    transition={{ duration: 15, repeat: Infinity, delay, ease: "linear" }}
    style={{ position: 'absolute', left: `${Math.random() * 100}%`, width: '4px', height: '4px', backgroundColor: 'var(--primary)', borderRadius: '50%', filter: 'blur(1px)', zIndex: 5 }}
  />
);

const Intro = ({ onComplete }: { onComplete: () => void }) => {
  const controls = useAnimation();
  const sparkles = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, size: Math.random() * 10 + 5, delay: Math.random() * 3
  })), []);
  
  const dust = useMemo(() => Array.from({ length: 20 }).map((_, i) => i), []);

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Draw the intricate engraving lines
      await controls.start({ 
        pathLength: 1, 
        opacity: [0, 1], 
        transition: { duration: 6, ease: "easeInOut" } 
      });
      // Step 2: Add the "Glow and Shine" (Metallic Engraved Feel)
      await controls.start({ 
        filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))',
        transition: { duration: 2 } 
      });
      await new Promise(r => setTimeout(r, 2000));
      onComplete();
    };
    sequence();
  }, [controls, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'var(--bg-darker)', zIndex: 9999,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div className="luxury-pattern-bg" style={{ position: 'absolute', inset: 0, opacity: 0.08, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--bg-dark) 85%)', zIndex: 2 }} />

      {dust.map(i => <GoldDust key={i} delay={i * 0.8} />)}

      {/* ENGRAVED GOLD JEWELRY ORNAMENT */}
      <motion.div 
        initial={{ scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 5 }}
        style={{ width: '280px', height: '280px', marginBottom: '3rem', zIndex: 20, position: 'relative' }}
      >
        <svg viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="jewelryGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c6218" />
              <stop offset="30%" stopColor="#cfaf72" />
              <stop offset="50%" stopColor="#fff6cd" />
              <stop offset="70%" stopColor="#cfaf72" />
              <stop offset="100%" stopColor="#7c6218" />
            </linearGradient>
            <filter id="engraveShadow">
              <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(44,37,30,0.15)" />
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(255,255,255,0.9)" />
            </filter>
          </defs>
          
          <motion.g filter="url(#engraveShadow)">
            {/* Main Engraved Lines - NO FILL */}
            <motion.path
              d="M100 20 C110 50, 170 60, 185 100 C170 140, 110 150, 100 180 C90 150, 30 140, 15 100 C30 60, 90 50, 100 20 Z"
              fill="none" stroke="url(#jewelryGold)" strokeWidth="1.8"
              initial={{ pathLength: 0 }} animate={controls}
            />
            
            <motion.path
              d="M100 45 C115 65, 145 75, 145 100 C145 125, 115 135, 100 155 C85 135, 55 125, 55 100 C55 75, 85 65, 100 45 Z"
              fill="none" stroke="url(#jewelryGold)" strokeWidth="1.4" opacity="0.7"
              initial={{ pathLength: 0 }} animate={controls}
            />

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 3 }}>
              {/* Detailed Inner Curls (Koshkar-muyiz) */}
              <motion.path
                d="M100 65 C115 65, 130 70, 130 85 C130 100, 115 105, 105 95 C100 90, 100 80, 100 80 C100 90, 95 105, 85 105 C70 105, 70 85, 70 85 C70 70, 85 65, 100 65"
                fill="none" stroke="url(#jewelryGold)" strokeWidth="1.1"
                initial={{ pathLength: 0 }} animate={controls}
              />
              <motion.path
                d="M100 135 C115 135, 130 130, 130 115 C130 100, 115 95, 105 105 C100 110, 100 120, 100 120 C100 110, 95 95, 85 95 C70 95, 70 115, 70 115 C70 130, 85 135, 100 135"
                fill="none" stroke="url(#jewelryGold)" strokeWidth="1.1"
                initial={{ pathLength: 0 }} animate={controls}
              />
              
              {/* Filigree Loops */}
              <motion.path
                d="M40 100 C40 85, 55 80, 65 90 C75 100, 70 110, 60 110 C50 110, 50 100, 50 100 C50 110, 60 115, 70 110 C85 100, 80 80, 60 80"
                fill="none" stroke="url(#jewelryGold)" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={controls}
              />
              <motion.path
                d="M160 100 C160 85, 145 80, 135 90 C125 100, 130 110, 140 110 C150 110, 150 100, 150 100 C150 110, 140 115, 130 110 C115 100, 120 80, 140 80"
                fill="none" stroke="url(#jewelryGold)" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={controls}
              />
            </motion.g>

            {/* Subtle Diamond Points */}
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.path
                key={i}
                d="M-4 0 L0 -6 L4 0 L0 6 Z"
                fill="url(#jewelryGold)"
                style={{ 
                  originX: "0px", originY: "0px",
                  x: 100 + Math.cos(angle * Math.PI / 180) * 85,
                  y: 100 + Math.sin(angle * Math.PI / 180) * 85,
                  rotate: angle + 90
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 4 + i * 0.2 }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
      
      <div style={{ position: 'relative', zIndex: 100, textAlign: 'center' }}>
        {sparkles.map(s => <MagicSparkle key={s.id} {...s} />)}
        
        <motion.h1
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
          className="gold-gradient-text"
          style={{ 
            fontSize: 'var(--size-h1)', 
            fontFamily: 'var(--font-script)', 
            textAlign: 'center', lineHeight: 1.1,
            padding: '0 2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
        >
          <span style={{ display: 'block' }}>Anar</span>
          <span style={{ fontSize: '0.45em', display: 'block', marginTop: '0.5rem', letterSpacing: '6px', fontFamily: 'var(--font-heading)', color: 'inherit' }}>
            Qyz Uzatu
          </span>
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Intro;
