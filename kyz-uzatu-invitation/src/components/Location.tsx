import React from 'react';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <section className="luxury-section" style={{ padding: '6rem 1.5rem 8rem', backgroundColor: 'var(--bg-darker)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
      >
        <div className="ornament" style={{ margin: '0 auto 2.5rem', width: '40px', opacity: 0.9 }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 C55 20, 80 45, 100 50 C80 55, 55 80, 50 100 C45 80, 20 55, 0 50 C20 45, 45 20, 50 0 Z" fill="var(--primary)" />
          </svg>
        </div>

        <p style={{ fontSize: 'var(--size-small)', color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 500, fontFamily: 'var(--font-heading)' }}>
          Адрес
        </p>

        <h3 style={{ fontSize: 'var(--size-h2)', color: 'var(--text-main)', marginBottom: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '2px' }}>
          «Алтын» мейрамханасы
        </h3>

        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: 'var(--size-body)', color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 400, fontFamily: 'var(--font-body)', lineHeight: '1.8' }}>
            Алматы қаласы,<br/>Ашимова 241
          </p>
        </div>

        <a 
          href="https://2gis.kz/almaty/search/%D0%90%D1%88%D0%B8%D0%BC%D0%BE%D0%B2%D0%B0%20241" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ 
            display: 'inline-block', 
            textDecoration: 'none',
            padding: '1.2rem 3rem',
            fontSize: 'var(--size-small)',
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            border: '1px solid var(--primary)'
          }}
        >
          2GIS Картадан көру
        </a>
      </motion.div>
    </section>
  );
};

export default Location;
