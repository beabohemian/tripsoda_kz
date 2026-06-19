import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play()
          .then(() => {
            console.log("Audio started successfully on interaction.");
            // Remove listener after success
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
          })
          .catch(e => console.log("Still blocked or error:", e));
      }
    };

    // Try playing immediately (might work on some browsers/settings)
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction...");
        // Add listeners to play on first click/touch anywhere on the page
        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);
      });
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the global click listener from firing
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
      alignItems: 'center'
    }}>
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          backgroundColor: 'rgba(234, 226, 213, 0.85)',
          border: '1px solid var(--primary)',
          color: 'var(--primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 15px rgba(44, 37, 30, 0.12)'
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

      <audio 
        ref={audioRef}
        loop
        autoPlay
        src="/music.mp3"
      />
    </div>
  );
};

export default MusicPlayer;
