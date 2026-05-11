import React from 'react';
import { motion } from 'framer-motion';

const Outro = () => {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh', // Full screen epic finale
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5rem'
    }}>
      {/* Gentle Swaying (살랑살랑) Background Animation */}
      <motion.div
        initial={{ scale: 1.15, x: 0, y: 0 }}
        animate={{ 
          x: ['0%', '-1.5%', '0%', '1.5%', '0%'], // Swaying left and right
          y: ['0%', '1%', '0%', '-1%', '0%']      // Drifting up and down slightly
        }}
        transition={{ 
          duration: 25, 
          ease: "easeInOut",
          repeat: Infinity 
        }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/images/outro-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* Epic Typography Overlaid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        style={{ zIndex: 10, textAlign: 'center', width: '90%', maxWidth: '400px' }}
      >
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          color: 'var(--primary)',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          fontWeight: 300
        }}>
          Күтеміз
        </p>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.5rem',
          color: '#ffffff',
          fontWeight: 300,
          lineHeight: '1.4',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          marginBottom: '3rem'
        }}>
          Ең жақсысы <br/> әлі алда
        </h2>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--primary-light)',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 300
        }}>
          Алматыда кездескенше
        </p>
      </motion.div>
    </section>
  );
};

export default Outro;
