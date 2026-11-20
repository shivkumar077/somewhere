import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { BuildingItem } from '../../world/types';
import { Sparkles, Compass, ArrowRight, RotateCcw } from 'lucide-react';

interface WelcomeOverlayProps {
  isEntered: boolean;
  isTransitioning: boolean;
  onEnter: () => void;
  onReturnToOrbit: () => void;
  hoveredBuilding: BuildingItem | null;
  selectedBuilding: BuildingItem | null;
  onClearSelectedBuilding: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  isEntered,
  isTransitioning,
  onEnter,
  onReturnToOrbit,
  hoveredBuilding,
  selectedBuilding,
  onClearSelectedBuilding,
}) => {
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Entrance animation for the 3-line welcome message
  useEffect(() => {
    if (isEntered || isTransitioning) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = welcomeTextRef.current?.querySelectorAll('.welcome-line');
    if (!lines) return;

    gsap.fromTo(
      lines,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.9,
        }
      );
    }
  }, [isEntered, isTransitioning]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header / Branding */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Sparkles size={14} color="#e76f51" />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#4a3b32',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {CONTENT_CONFIG.milestoneTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Center Landing / Arrived State */}
      {isEntered ? (
        <div
          data-testid="arrived-card"
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '28px 36px',
            maxWidth: '460px',
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            pointerEvents: 'auto',
            animation: 'fadeInUp 0.6s ease-out forwards',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 12px',
              borderRadius: '50%',
              backgroundColor: '#faedcd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d66d58',
            }}
          >
            <Compass size={24} />
          </div>

          <h2
            style={{
              margin: '0 0 8px',
              fontSize: '24px',
              fontFamily: "'Fredoka', sans-serif",
              color: '#3d312a',
            }}
          >
            Welcome to Somewhere!
          </h2>

          <p
            style={{
              margin: '0 0 20px',
              fontSize: '14px',
              color: '#6c584c',
              lineHeight: 1.6,
            }}
          >
            You have arrived at <strong>The Town Square</strong>. The miniature world has paused its orbit.
            Milestone 01 foundation is complete — walkable world exploration will arrive in Milestone 02.
          </p>

          <button
            onClick={onReturnToOrbit}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#e76f51',
              color: '#ffffff',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(231, 111, 81, 0.35)',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d65a3c';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e76f51';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <RotateCcw size={16} />
            Return to Orbit
          </button>
        </div>
      ) : (
        /* Left Hero Welcome Message */
        <div
          ref={welcomeTextRef}
          style={{
            maxWidth: '360px',
            pointerEvents: 'none',
            userSelect: 'none',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {CONTENT_CONFIG.welcomeLines.map((line, idx) => (
              <span
                key={idx}
                className="welcome-line"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: 'clamp(38px, 6vw, 56px)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '0.04em',
                  color: '#3d312a',
                  textShadow: '0 2px 12px rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {line}
              </span>
            ))}
          </div>

          <p
            style={{
              marginTop: '12px',
              fontSize: '15px',
              fontWeight: 500,
              color: '#5c4d3c',
              lineHeight: 1.4,
              textShadow: '0 1px 4px rgba(255, 255, 255, 0.9)',
            }}
          >
            {CONTENT_CONFIG.tagline}
          </p>
        </div>
      )}

      {/* Bottom Area: ENTER interaction & Hover/Select Tooltip */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
        }}
      >
        {/* Hovered / Selected Building Card */}
        {(hoveredBuilding || selectedBuilding) && !isEntered && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(10px)',
              padding: '10px 18px',
              borderRadius: '16px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              pointerEvents: 'auto',
              maxWidth: '340px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3d312a',
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {(selectedBuilding || hoveredBuilding)?.name}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#6c584c',
                marginTop: '2px',
              }}
            >
              {(selectedBuilding || hoveredBuilding)?.description}
            </div>
            {selectedBuilding && (
              <button
                onClick={onClearSelectedBuilding}
                style={{
                  marginTop: '6px',
                  fontSize: '11px',
                  color: '#e76f51',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                close
              </button>
            )}
          </div>
        )}

        {/* ENTER Button */}
        {!isEntered && (
          <button
            ref={buttonRef}
            onClick={onEnter}
            disabled={isTransitioning}
            style={{
              pointerEvents: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#e76f51', // warm coral
              color: '#ffffff',
              border: '3px solid #fefae0',
              borderRadius: '32px',
              padding: '16px 36px',
              fontSize: '17px',
              fontWeight: 700,
              fontFamily: "'Fredoka', sans-serif",
              letterSpacing: '0.06em',
              cursor: isTransitioning ? 'default' : 'pointer',
              boxShadow: '0 8px 24px rgba(231, 111, 81, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.backgroundColor = '#d65a3c';
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.backgroundColor = '#e76f51';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
              }
            }}
          >
            <span>{CONTENT_CONFIG.enterButtonText}</span>
            <ArrowRight size={18} />
          </button>
        )}

        {/* Subtle instructions hint */}
        {!isEntered && (
          <div
            style={{
              fontSize: '12px',
              color: '#5c4d3c',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}
          >
            Drag to gently spin • Tap buildings to inspect
          </div>
        )}
      </div>
    </div>
  );
};

