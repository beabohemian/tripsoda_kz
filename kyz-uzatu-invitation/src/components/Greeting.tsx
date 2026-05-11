import React from 'react';
import { motion } from 'framer-motion';

const Greeting = () => {
  return (
    <section className="luxury-section" style={{ minHeight: '80vh', justifyContent: 'center', overflow: 'hidden' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '400px', textAlign: 'center', zIndex: 1 }}
      >
        <div className="ornament" style={{ margin: '0 auto 2.5rem', width: '50px', opacity: 0.8 }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 C55 20, 80 45, 100 50 C80 55, 55 80, 50 100 C45 80, 20 55, 0 50 C20 45, 45 20, 50 0 Z" fill="var(--primary)" />
          </svg>
        </div>
        
        <h2 style={{ fontSize: '1rem', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '4rem', textTransform: 'uppercase', fontWeight: 300 }}>
          Шақыру
        </h2>

        <div style={{ lineHeight: '2.4', fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 300 }}>
          <p>Құрметті ағайын-туыс,</p>
          <p>бауырлар, құда-жекжат,</p>
          <p>нағашы-жиен, бөлелер,</p>
          <p>құрбы-құрдас, дос жарандар,</p>
          <p>ұжымдастар, көршілер!</p>
          
          <div style={{ margin: '4rem 0' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--primary-light)', fontSize: '1.2rem', marginBottom: '1rem' }}>
              Сіз(дер)ді аяулы қызымыз
            </p>
            
            <h3 style={{ fontSize: '2.8rem', color: '#ffffff', margin: '2rem 0', fontFamily: 'var(--font-heading)', letterSpacing: '4px', fontWeight: 300 }}>
              Анардың
            </h3>

            <p>ұзату тойына арналған</p>
            <p>ақ дастарханымыздың қадірлі</p>
            <p>қонағы болуға шақырамыз!</p>
          </div>

          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Той иесі
            </p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--primary-light)', fontWeight: 300, letterSpacing: '2px' }}>
              Шолпан
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Greeting;
