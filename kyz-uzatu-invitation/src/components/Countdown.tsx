import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
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
    <section className="luxury-section" style={{ padding: '4rem 0 8rem' }}>
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        style={{ width: '100%', textAlign: 'center' }}
      >
        <p style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1rem', 
          color: 'var(--primary)', 
          letterSpacing: '6px', 
          textTransform: 'uppercase', 
          marginBottom: '3rem' 
        }}>
          Тойға дейін қалды
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center',
          color: 'var(--text-main)'
        }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 300, color: 'var(--primary-light)' }}>
                {value.toString().padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {unit === 'days' ? 'күн' : unit === 'hours' ? 'сағ' : unit === 'minutes' ? 'мин' : 'сек'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Countdown;
