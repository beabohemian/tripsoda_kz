import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cover = () => {
  const calculateTimeLeft = () => {
    const year = new Date().getFullYear();
    let eventDate = new Date(`${year}-08-15T17:00:00`);
    if (new Date() > eventDate) {
      eventDate = new Date(`${year + 1}-08-15T17:00:00`);
    }
    const difference = +eventDate - +new Date();
    let tl = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      tl = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return tl;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ 
      position: 'relative',
      width: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      overflow: 'hidden'
    }}>
      
      {/* 1. Hero Image - NO CROPPING using width 100% and height auto */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 0
        }}
      >
        <img 
          src="/images/hq-6.jpg" 
          alt="Bride Cover" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
        {/* Dark gradient overlay to blend into the typography and hide sharp edges */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, var(--bg-darker) 10%, transparent)',
          pointerEvents: 'none'
        }} />
      </motion.div>
      
      {/* 2. Central Elegant Typography over the gradient */}
      <div style={{ 
        zIndex: 10, 
        textAlign: 'center', 
        marginTop: '-15%', // Pull typography up over the gradient
        paddingBottom: '3rem',
        position: 'relative'
      }}>
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 0.5 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '8px', color: 'var(--primary-light)', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Қыз ұзату
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 1 }}
          style={{ fontSize: '4.5rem', lineHeight: 1, letterSpacing: '15px', color: '#ffffff', fontWeight: 300, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
        >
          Анар
        </motion.h1>
      </div>

      {/* 3. Bottom Minimalist Info */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.5 }}
        style={{ zIndex: 10, width: '100%', textAlign: 'center', paddingBottom: '5rem' }}
      >
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '2rem' }}>
          15 Тамыз 2026
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '2.5rem', 
          justifyContent: 'center',
          color: 'var(--text-main)'
        }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 300 }}>
                {value.toString().padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {unit === 'days' ? 'күн' : unit === 'hours' ? 'сағ' : unit === 'minutes' ? 'мин' : 'сек'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Cover;
