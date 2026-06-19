import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

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

const Cover = () => {
  const sparkles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, size: Math.random() * 8 + 4, delay: Math.random() * 2
  })), []);

  return (
    <section style={{ 
      position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', 
      overflow: 'hidden', backgroundColor: 'var(--bg-darker)'
    }}>
      
      {/* 1. Subtle Texture Background */}
      <div className="luxury-pattern-bg" style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: 1 }} />

      {/* 2. Hero Image with Deep Shadow */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}
        style={{ width: '100%', position: 'relative', zIndex: 2 }}
      >
        <img src="/images/hq-6.jpg" alt="Bride Cover" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background: 'linear-gradient(to top, var(--bg-darker) 20%, transparent)',
          pointerEvents: 'none'
        }} />
      </motion.div>
      
      {/* 3. The 3D Presence Title (Fixed Visibility) */}
      <div style={{ 
        zIndex: 10, textAlign: 'center', marginTop: '-30%', paddingBottom: '8rem', position: 'relative', width: '100%'
      }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {sparkles.map(s => <MagicSparkle key={s.id} {...s} />)}

          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 2.5, delay: 0.5 }}
            className="gold-gradient-text"
            style={{ 
              fontFamily: 'var(--font-script)', 
              fontSize: 'var(--size-h1)', 
              lineHeight: 1.1, // Fixed tight line-height
              textTransform: 'none', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              padding: '0 1rem'
            }}
          >
            <span style={{ display: 'block' }}>Anar</span>
            <span style={{ 
              fontSize: '0.45em', 
              display: 'block', 
              marginTop: '0.5rem', 
              letterSpacing: '8px', 
              fontFamily: 'var(--font-heading)', 
              color: 'inherit' // Ensure gold gradient applies
            }}>
              Qyz Uzatu
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 2, delay: 2 }}
            style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--primary), transparent)', margin: '2rem auto 0', opacity: 0.5 }}
          />
        </div>
      </div>

    </section>
  );
};

export default Cover;
