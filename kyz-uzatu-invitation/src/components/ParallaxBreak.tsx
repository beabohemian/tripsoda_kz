import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBreak = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale the image dynamically from 2.0x down to 1.0x for a massive zoom effect
  const scale = useTransform(scrollYProgress, [0, 1], [2.0, 1.0]);
  // Move the image aggressively on Y axis for a dramatic parallax feel
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Dim the image slightly as it scrolls up to make text pop
  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0.3]);

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      width: '100%',
      height: '100vh', // Full screen massive WOW effect
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      margin: '6rem 0'
    }}>
      <motion.div style={{
        position: 'absolute',
        top: '-10%', left: '-10%', right: '-10%', bottom: '-10%', // Oversize to allow panning
        backgroundImage: 'url(/images/hq-7.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
        scale,
        y,
        opacity
      }} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ zIndex: 2, textAlign: 'center' }}
      >
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          color: 'var(--primary-light)',
          letterSpacing: '15px',
          textTransform: 'uppercase',
          fontWeight: 300,
          textShadow: '0 8px 30px rgba(0,0,0,1)',
          marginRight: '-15px'
        }}>
          Мәңгілік
        </p>
        <div style={{ width: '1px', height: '100px', backgroundColor: 'var(--primary)', margin: '2.5rem auto', opacity: 0.8 }} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: '#ffffff',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          marginRight: '-8px',
          textShadow: '0 4px 15px rgba(0,0,0,0.8)'
        }}>
          Махаббат
        </p>
      </motion.div>
    </section>
  );
};

export default ParallaxBreak;
