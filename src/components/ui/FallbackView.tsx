import React from 'react';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { Sparkles, AlertCircle } from 'lucide-react';

interface FallbackViewProps {
  reason?: string;
}

export const FallbackView: React.FC<FallbackViewProps> = ({ reason }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#fefae0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        fontFamily: "'Fredoka', sans-serif",
        color: '#4a3b32',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          padding: '36px',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
          border: '3px solid #faedcd',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#faedcd',
            padding: '8px 16px',
            borderRadius: '20px',
            color: '#d66d58',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={16} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>
            {CONTENT_CONFIG.siteTitle}
          </span>
        </div>

        <h1 style={{ fontSize: '32px', margin: '0 0 12px', color: '#283618' }}>
          Welcome, Traveler
        </h1>

        <p style={{ fontSize: '15px', color: '#606c38', lineHeight: 1.6, margin: '0 0 20px' }}>
          We could not initialize the interactive 3D miniature world because hardware acceleration or WebGL is disabled or unsupported on this device.
        </p>

        {reason && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '8px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={16} />
            <span>{reason}</span>
          </div>
        )}

        <div style={{ fontSize: '13px', color: '#8d99ae' }}>
          Please try enabling hardware acceleration in your browser settings to explore the rotating 3D town.
        </div>
      </div>
    </div>
  );
};

