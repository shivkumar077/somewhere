import React from 'react';
import { AtmosphereMode } from '../../config/atmosphereConfig';
import { Sun, Sunset, Moon, Clock, RefreshCw } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';

interface AtmosphereControlsProps {
  currentMode: AtmosphereMode;
  isAuto: boolean;
  localTimeFormatted: string;
  onSetMode: (mode: AtmosphereMode, isAuto: boolean) => void;
}

export const AtmosphereControls: React.FC<AtmosphereControlsProps> = ({
  currentMode,
  isAuto,
  localTimeFormatted,
  onSetMode,
}) => {
  const { isNarrowFoldable, isMobile, isSmallMobile } = useResponsive();

  return (
    <div
      data-testid="atmosphere-controls"
      style={{
        position: 'absolute',
        top: 'max(14px, var(--sat))',
        right: 'max(14px, var(--sar))',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
        pointerEvents: 'auto',
      }}
    >
      {/* Time & Phase Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(8px)',
          padding: isNarrowFoldable ? '3px 6px' : isSmallMobile ? '4px 8px' : '5px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          fontSize: isNarrowFoldable ? '10px' : isSmallMobile ? '11px' : '12px',
          color: '#4a3b32',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Clock size={isNarrowFoldable ? 10 : 12} color="#e76f51" />
        <span>{localTimeFormatted}</span>
        {isAuto && !isNarrowFoldable && (
          <span
            style={{
              backgroundColor: '#e76f51',
              color: '#fff',
              fontSize: '9px',
              padding: '1px 5px',
              borderRadius: '8px',
              marginLeft: '2px',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Auto
          </span>
        )}
      </div>

      {/* Atmospheric Phase Selector Buttons */}
      <div
        role="group"
        aria-label="Atmosphere presets"
        style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(8px)',
          padding: isNarrowFoldable ? '2px' : '3px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
          gap: isNarrowFoldable ? '1px' : '2px',
        }}
      >
        <button
          onClick={() => onSetMode('day', false)}
          title="Daylight"
          aria-label="Set atmosphere to bright daytime"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: currentMode === 'day' && !isAuto ? '#faedcd' : 'transparent',
            border: 'none',
            borderRadius: '16px',
            padding: isNarrowFoldable ? '5px 6px' : isMobile ? '7px 9px' : '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: currentMode === 'day' && !isAuto ? '#d4a373' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            minHeight: isNarrowFoldable ? '28px' : '34px',
          }}
        >
          <Sun size={14} color="#e76f51" />
          {!isMobile && <span>Day</span>}
        </button>

        <button
          onClick={() => onSetMode('evening', false)}
          title="Sunset"
          aria-label="Set atmosphere to golden sunset"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: currentMode === 'evening' && !isAuto ? '#fcd5ce' : 'transparent',
            border: 'none',
            borderRadius: '16px',
            padding: isNarrowFoldable ? '5px 6px' : isMobile ? '7px 9px' : '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: currentMode === 'evening' && !isAuto ? '#b56576' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            minHeight: isNarrowFoldable ? '28px' : '34px',
          }}
        >
          <Sunset size={14} color="#f4a261" />
          {!isMobile && <span>Sunset</span>}
        </button>

        <button
          onClick={() => onSetMode('night', false)}
          title="Night"
          aria-label="Set atmosphere to starlit night"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: currentMode === 'night' && !isAuto ? '#d8e2dc' : 'transparent',
            border: 'none',
            borderRadius: '16px',
            padding: isNarrowFoldable ? '5px 6px' : isMobile ? '7px 9px' : '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: currentMode === 'night' && !isAuto ? '#2b2d42' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            minHeight: isNarrowFoldable ? '28px' : '34px',
          }}
        >
          <Moon size={14} color="#457b9d" />
          {!isMobile && <span>Night</span>}
        </button>

        <button
          onClick={() => onSetMode(currentMode, true)}
          title="Sync with your browser local time"
          aria-label="Synchronize atmosphere with local device time"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: isAuto ? '#e76f51' : 'transparent',
            border: 'none',
            borderRadius: '16px',
            padding: isNarrowFoldable ? '5px 6px' : isMobile ? '7px 9px' : '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: isAuto ? '#ffffff' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            minHeight: isNarrowFoldable ? '28px' : '34px',
          }}
        >
          <RefreshCw size={12} color={isAuto ? '#ffffff' : '#6c584c'} />
          {!isMobile && <span>Sync</span>}
        </button>
      </div>
    </div>
  );
};
