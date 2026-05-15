import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  // Use exactly the 7 new high quality photos provided by the user, zero duplicates
  const photos = [
    '/images/hq-1.jpg',
    '/images/hq-2.jpg',
    '/images/hq-3.jpg',
    '/images/hq-4.jpg',
    '/images/hq-5.jpg',
    '/images/hq-8.jpg',
    '/images/hq-9.jpg',
  ];

  return (
    <section className="luxury-section" style={{ backgroundColor: 'transparent' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div className="ornament" style={{ margin: '0 auto 2.5rem', width: '40px', opacity: 0.8 }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 C55 20, 80 45, 100 50 C80 55, 55 80, 50 100 C45 80, 20 55, 0 50 C20 45, 45 20, 50 0 Z" fill="var(--primary)" />
          </svg>
        </div>
        {/* Removed Russian Gallery title as requested */}

        {/* 2-Column Staggered Grid (Masonry feel) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {photos.map((src, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, delay: (idx % 2) * 0.2, ease: "easeOut" }}
              style={{
                width: '100%',
                marginTop: idx % 2 === 1 ? '3rem' : '0', // Stagger the second column down
                position: 'relative'
              }}
            >
              <img 
                src={src} 
                alt={`Gallery ${idx + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '2px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  // Removed grayscale filter to maintain the high quality original colors the user wants
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
