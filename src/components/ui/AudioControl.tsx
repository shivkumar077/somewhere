import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import { useResponsive } from '../../hooks/useResponsive';

export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isNarrowFoldable, isSmallMobile } = useResponsive();

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <button
      data-testid="audio-toggle"
      onClick={handleToggle}
      aria-label={isPlaying ? 'Mute soothing background music' : 'Play soothing background music'}
      title={isPlaying ? 'Mute audio' : 'Play peaceful ambient music'}
      style={{
        pointerEvents: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(8px)',
        padding: isNarrowFoldable || isSmallMobile ? '6px 8px' : '6px 12px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
        color: isPlaying ? '#e76f51' : '#7f6f62',
        fontSize: isNarrowFoldable ? '10px' : '11px',
        fontWeight: 600,
        fontFamily: "'Fredoka', sans-serif",
        transition: 'all 0.2s ease',
        minHeight: '28px',
        minWidth: isNarrowFoldable || isSmallMobile ? '30px' : 'auto',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        e.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.82)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isPlaying ? (
        <Volume2 size={isNarrowFoldable || isSmallMobile ? 12 : 14} color="#e76f51" />
      ) : (
        <VolumeX size={isNarrowFoldable || isSmallMobile ? 12 : 14} color="#7f6f62" />
      )}
      {!isNarrowFoldable && !isSmallMobile && (
        <span>{isPlaying ? 'Sound On' : 'Sound Off'}</span>
      )}
    </button>
  );
};
