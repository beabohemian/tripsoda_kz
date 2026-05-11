import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBreak = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.8, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0.4]);

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      width: '100%',
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      margin: '4rem 0'
    }}>
      <motion.div style={{
        position: 'absolute',
        top: '-10%', left: '-10%', right: '-10%', bottom: '-10%',
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
          fontSize: '2.5rem',
          color: 'var(--primary-light)',
          letterSpacing: '12px',
          textTransform: 'uppercase',
          fontWeight: 300,
          textShadow: '0 8px 30px rgba(0,0,0,1)',
          marginRight: '-12px'
        }}>
          Суреттер
        </p>
      </motion.div>
    </section>
  );
};

export default ParallaxBreak;
