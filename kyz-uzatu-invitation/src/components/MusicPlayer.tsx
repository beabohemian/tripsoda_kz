import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '2rem', 
      left: '1.5rem', 
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem'
    }}>
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          backgroundColor: 'rgba(26, 8, 8, 0.8)',
          border: '1px solid var(--primary)',
          color: 'var(--primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            style={{ 
              color: 'var(--primary-light)', 
              fontSize: '0.7rem', 
              letterSpacing: '1px',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(26, 8, 8, 0.6)',
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              backdropFilter: 'blur(3px)'
            }}
          >
            Music On
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef}
        loop
        src="/music.mp3" // public/music.mp3 파일 필요
      />
    </div>
  );
};

export default MusicPlayer;
