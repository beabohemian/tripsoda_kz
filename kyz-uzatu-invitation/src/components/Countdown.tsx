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
    <section className="luxury-section" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-dark)' }}>
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        style={{ width: '100%', textAlign: 'center' }}
      >
        {/* Unified Date & Time Block - Standardized h2/h3 */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'var(--size-h2)', 
            color: 'var(--primary-light)', 
            letterSpacing: '2px', 
            marginBottom: '0.5rem',
            fontWeight: 700 
          }}>
            15 Тамыз 2026
          </p>
          <p style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.2rem', 
            color: 'var(--text-main)', 
            letterSpacing: '4px', 
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
            Сағат: 17:00
          </p>
          <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--primary)', margin: '1.5rem auto', opacity: 0.3 }} />
        </div>

        {/* Countdown Block - Reduced Gap and Proportional Sizes */}
        <p style={{ 
          fontFamily: 'var(--font-body)', 
          fontSize: 'var(--size-small)', 
          color: 'var(--primary)', 
          letterSpacing: '4px', 
          textTransform: 'uppercase', 
          marginBottom: '2.5rem',
          fontWeight: 400
        }}>
          Тойға дейін қалды
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '1.2rem', 
          justifyContent: 'center',
          color: 'var(--text-main)'
        }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary-light)', lineHeight: 1 }}>
                {value.toString().padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-body)' }}>
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
