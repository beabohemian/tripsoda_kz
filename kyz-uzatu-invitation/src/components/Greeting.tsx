import React from 'react';
import { motion } from 'framer-motion';

const Greeting = () => {
  return (
    <section className="luxury-section" style={{ minHeight: '80vh', justifyContent: 'center', backgroundColor: 'var(--bg-darker)', padding: '6rem 1.5rem' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '400px', textAlign: 'center', zIndex: 1 }}
      >
        <div className="ornament" style={{ margin: '0 auto 2.5rem', width: '50px', opacity: 0.9 }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 C55 20, 80 45, 100 50 C80 55, 55 80, 50 100 C45 80, 20 55, 0 50 C20 45, 45 20, 50 0 Z" fill="var(--primary)" />
          </svg>
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '8px', color: 'var(--primary)', marginBottom: '4rem', textTransform: 'uppercase', fontWeight: 400 }}>
          Шақыру
        </h2>

        <div style={{ 
          fontFamily: "var(--font-body)", 
          lineHeight: '2.2', 
          fontSize: 'var(--size-body)', 
          color: 'var(--text-main)', 
          fontWeight: 400 
        }}>
          <p>Құрметті ағайын-туыс,</p>
          <p>бауырлар, құда-жекжат,</p>
          <p>нағашы-жиен, бөлелер,</p>
          <p>құрбы-құрдас, дос жарандар,</p>
          <p>ұжымдастар, көршілер!</p>
          
          <div style={{ margin: '4rem 0' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--primary-light)', fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              Сіз(дер)ді аяулы қызымыз
            </p>
            
            <h3 style={{ 
              fontSize: 'clamp(2.8rem, 11vw, 3.8rem)', 
              color: 'var(--text-main)', 
              margin: '1.5rem 0', 
              fontFamily: 'var(--font-heading)', 
              fontStyle: 'italic',
              fontWeight: 500, 
              letterSpacing: 'normal' 
            }}>
              Анардың
            </h3>

            <p style={{ fontSize: 'var(--size-body)', letterSpacing: '0.5px' }}>ұзату тойына арналған</p>
            <p style={{ fontSize: 'var(--size-body)', letterSpacing: '0.5px' }}>ақ дастарханымыздың қадірлі</p>
            <p style={{ fontSize: 'var(--size-body)', letterSpacing: '0.5px' }}>қонағы болуға шақырамыз!</p>
          </div>

          <div style={{ marginTop: '6rem', paddingTop: '3rem', borderTop: '1px solid rgba(176, 142, 47, 0.25)' }}>
            <p style={{ fontSize: 'var(--size-small)', color: 'var(--text-muted)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Той иесі
            </p>
            <p style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 400, fontFamily: 'var(--font-heading)' }}>
              Шолпан
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Greeting;
