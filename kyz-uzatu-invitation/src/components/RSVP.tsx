import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const RSVP = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  // Use the latest URL provided by the user
  const DB_URL = "https://script.google.com/macros/s/AKfycbxLusa5dzkNaI3sDrQKt1kqrlyF5Hr5Vk9y5NRcKBVpL-XO8XjbFLLQSLtNGRc_8yPV1A/exec";

  const handleFormSubmit = (e: React.FormEvent) => {
    if (!name.trim()) {
      e.preventDefault();
      setShowNameError(true);
      return;
    }
    setIsSubmitting(true);
    // Let the form submit to the hidden iframe
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      style={{ 
        minHeight: '80vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        backgroundColor: 'var(--bg-dark)'
      }}
    >
      <iframe 
        name="rsvp_iframe" 
        id="rsvp_iframe" 
        style={{ display: 'none' }} 
        onLoad={handleIframeLoad}
      ></iframe>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          width: '100%', 
          maxWidth: '350px', 
          padding: '3rem 1.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(176, 142, 47, 0.25)',
          backgroundColor: 'var(--bg-darker)',
          boxShadow: '0 15px 35px rgba(44, 37, 30, 0.08)',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Сауалнама
        </p>

        <p style={{ color: 'var(--text-main)', marginBottom: '3rem', textAlign: 'center', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: 300 }}>
          Төмендегі сауалнаманы толтырып,<br/>тойға қатысуыңызды растауыңызды сұраймыз.
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '1rem 0' }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-light)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Рахмет!</h3>
            <p style={{ color: 'var(--text-main)', fontWeight: 300 }}>Жауабыңыз қабылданды.</p>
          </motion.div>
        ) : (
          <form 
            ref={formRef}
            action={DB_URL}
            method="POST"
            target="rsvp_iframe"
            onSubmit={handleFormSubmit}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            <input type="hidden" name="timestamp" value={new Date().toLocaleString()} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Аты-жөніңізді жазыңыз
              </label>
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim()) setShowNameError(false);
                }}
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `1px solid ${showNameError ? '#ff4d4d' : 'rgba(176, 142, 47, 0.4)'}`,
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300
                }}
                placeholder="Мысалы: Асан Үсенов"
                required
              />
              {showNameError && (
                <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  Атыңызды енгізіңіз
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Тойға келесіз бе?
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    {attendance === 'yes' && <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', borderRadius: '50%' }} />}
                  </div>
                  <input 
                    type="radio" name="attendance" value="yes"
                    checked={attendance === 'yes'} onChange={() => setAttendance('yes')}
                    style={{ display: 'none' }}
                  />
                  <span style={{ color: 'var(--text-main)', fontWeight: 300, fontSize: '1rem' }}>Иә, келемін</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    {attendance === 'no' && <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary)', borderRadius: '50%' }} />}
                  </div>
                  <input 
                    type="radio" name="attendance" value="no"
                    checked={attendance === 'no'} onChange={() => setAttendance('no')}
                    style={{ display: 'none' }}
                  />
                  <span style={{ color: 'var(--text-main)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.4 }}>Өкінішке орай, келе алмаймын</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ marginTop: '2rem', padding: '1.2rem 2rem', fontSize: '1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Жіберілуде...' : 'Жіберу'}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default RSVP;
