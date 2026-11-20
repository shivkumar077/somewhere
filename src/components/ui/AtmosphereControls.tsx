import React from 'react';
import { AtmosphereMode } from '../../config/atmosphereConfig';
import { Sun, Sunset, Moon, Clock } from 'lucide-react';

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
  return (
    <div
      style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        pointerEvents: 'auto',
      }}
    >
      {/* Time & Phase Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
          color: '#4a3b32',
          fontWeight: 600,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Clock size={13} color="#e76f51" />
        <span>{localTimeFormatted}</span>
        {isAuto && (
          <span
            style={{
              backgroundColor: '#e76f51',
              color: '#fff',
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '10px',
              marginLeft: '4px',
              textTransform: 'uppercase',
            }}
          >
            Auto
          </span>
        )}
      </div>

      {/* Atmospheric Phase Selector Buttons */}
      <div
        style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '4px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          gap: '4px',
        }}
      >
        <button
          onClick={() => onSetMode('day', false)}
          title="Daylight"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: currentMode === 'day' && !isAuto ? '#faedcd' : 'transparent',
            border: 'none',
            borderRadius: '18px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: currentMode === 'day' && !isAuto ? '#d4a373' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Sun size={14} color="#e76f51" />
          <span>Day</span>
        </button>

        <button
          onClick={() => onSetMode('evening', false)}
          title="Sunset"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: currentMode === 'evening' && !isAuto ? '#fcd5ce' : 'transparent',
            border: 'none',
            borderRadius: '18px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: currentMode === 'evening' && !isAuto ? '#b56576' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Sunset size={14} color="#f4a261" />
          <span>Sunset</span>
        </button>

        <button
          onClick={() => onSetMode('night', false)}
          title="Night"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: currentMode === 'night' && !isAuto ? '#d8e2dc' : 'transparent',
            border: 'none',
            borderRadius: '18px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: currentMode === 'night' && !isAuto ? '#2b2d42' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Moon size={14} color="#457b9d" />
          <span>Night</span>
        </button>

        <button
          onClick={() => onSetMode(currentMode, true)}
          title="Sync with your browser local time"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: isAuto ? '#e76f51' : 'transparent',
            border: 'none',
            borderRadius: '18px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: isAuto ? '#ffffff' : '#6c584c',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <span>Sync</span>
        </button>
      </div>
    </div>
  );
};

