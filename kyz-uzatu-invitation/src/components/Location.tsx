import React from 'react';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <section className="luxury-section" style={{ overflow: 'hidden' }}>
      

      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
      >
        <div className="ornament" style={{ margin: '0 auto 2.5rem', width: '40px', opacity: 0.8 }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 C55 20, 80 45, 100 50 C80 55, 55 80, 50 100 C45 80, 20 55, 0 50 C20 45, 45 20, 50 0 Z" fill="var(--primary)" />
          </svg>
        </div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--primary)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '4rem', fontWeight: 300 }}>
          Мекен-жайы
        </p>

        {/* Venue Name Placeholder added here */}
        <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 300, letterSpacing: '2px' }}>
          [Мейрамхана аты]
        </h3>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 300 }}>
          Ашимова 241
        </p>

        <p style={{ fontSize: '1rem', color: 'var(--primary-light)', marginBottom: '4rem', fontWeight: 300, letterSpacing: '2px' }}>
          Сағат: 17:00
        </p>

        <a 
          href="https://2gis.kz/almaty/search/%D0%90%D1%88%D0%B8%D0%BC%D0%BE%D0%B2%D0%B0%20241" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          2GIS Картадан көру
        </a>
      </motion.div>
    </section>
  );
};

export default Location;
