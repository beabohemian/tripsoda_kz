import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import GoldPetals from './components/GoldPetals';
import Cover from './components/Cover';
import Greeting from './components/Greeting';
import ParallaxBreak from './components/ParallaxBreak';
import Gallery from './components/Gallery';
import Location from './components/Location';
import RSVP from './components/RSVP';
import Outro from './components/Outro';
import FloatingOrnaments from './components/FloatingOrnaments';
import AdminDashboard from './components/AdminDashboard';
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';

import './index.css';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const isAdmin = window.location.search.includes('admin=true');

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="app-container">
      {/* Intro Overlay */}
      <AnimatePresence>
        {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <MusicPlayer />
      <GoldPetals />
      
      {introDone && (
        <main style={{ position: 'relative', zIndex: 10 }}>
          <FloatingOrnaments />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Cover />
            <Greeting />
            <Countdown />
            <Location />
            <ParallaxBreak />
            <Gallery />
            <RSVP />
            <Outro />
          </motion.div>
          
          <footer style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-darker)' }}>
            <div className="ornament" style={{ margin: '0 auto 2rem', width: '40px' }}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 C55 20, 80 45, 100 50 C80 55, 55 80, 50 100 C45 80, 20 55, 0 50 C20 45, 45 20, 50 0 Z" fill="var(--primary)" />
              </svg>
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '4px', color: 'var(--primary-light)', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Анар
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>
              &copy; 2026 Qyz Uzatu. Барлық құқықтар қорғалған.
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
