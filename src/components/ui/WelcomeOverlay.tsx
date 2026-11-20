import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { BuildingItem } from '../../world/types';
import { Sparkles, Compass, ArrowRight, RotateCcw } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';

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
  const { isNarrowFoldable, isSmallMobile, isShortLandscape } = useResponsive();

  // Entrance animation for the 3-line welcome message
  useEffect(() => {
    if (isEntered || isTransitioning) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = welcomeTextRef.current?.querySelectorAll('.welcome-line');
    if (!lines) return;

    gsap.fromTo(
      lines,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.25,
      }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.5)',
          delay: 0.75,
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
        padding: 'max(14px, var(--sat)) max(14px, var(--sar)) max(14px, var(--sab)) max(14px, var(--sal))',
        zIndex: 10,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Top Header / Branding */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <div
            data-testid="milestone-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.78)',
              backdropFilter: 'blur(8px)',
              padding: isNarrowFoldable ? '3px 8px' : isSmallMobile ? '4px 10px' : '5px 12px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Sparkles size={isNarrowFoldable ? 11 : isSmallMobile ? 12 : 14} color="#e76f51" />
            <span
              style={{
                fontSize: isNarrowFoldable ? '9px' : isSmallMobile ? '10px' : '11px',
                fontWeight: 700,
                color: '#4a3b32',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {isNarrowFoldable ? 'M01' : CONTENT_CONFIG.milestoneTitle}
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
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: isShortLandscape ? '14px 24px' : 'clamp(20px, 4vw, 32px)',
            maxWidth: 'min(440px, 92vw)',
            maxHeight: '85vh',
            overflowY: 'auto',
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            pointerEvents: 'auto',
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        >
          <div
            style={{
              width: isShortLandscape ? '36px' : '44px',
              height: isShortLandscape ? '36px' : '44px',
              margin: '0 auto 10px',
              borderRadius: '50%',
              backgroundColor: '#faedcd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d66d58',
            }}
          >
            <Compass size={isShortLandscape ? 18 : 22} />
          </div>

          <h2
            style={{
              margin: '0 0 6px',
              fontSize: isShortLandscape ? '18px' : 'clamp(20px, 3.5vw, 24px)',
              fontFamily: "'Fredoka', sans-serif",
              color: '#3d312a',
            }}
          >
            Welcome to Somewhere!
          </h2>

          <p
            style={{
              margin: isShortLandscape ? '0 0 12px' : '0 0 18px',
              fontSize: isShortLandscape ? '12px' : '14px',
              color: '#6c584c',
              lineHeight: 1.5,
            }}
          >
            You have arrived at <strong>The Town Square</strong>. The miniature world has paused its orbit.
            Milestone 01 foundation is complete — walkable world exploration will arrive in Milestone 02.
          </p>

          <button
            onClick={onReturnToOrbit}
            aria-label="Return to planet orbit view"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#e76f51',
              color: '#ffffff',
              border: 'none',
              borderRadius: '24px',
              padding: isShortLandscape ? '8px 18px' : '11px 22px',
              fontSize: isShortLandscape ? '12px' : '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(231, 111, 81, 0.35)',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
              minHeight: '38px',
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
            <RotateCcw size={15} />
            <span>Return to Orbit</span>
          </button>
        </div>
      ) : (
        /* Left Hero Welcome Message */
        <div
          ref={welcomeTextRef}
          style={{
            maxWidth: 'min(380px, 85vw)',
            pointerEvents: 'none',
            userSelect: 'none',
            marginBottom: isShortLandscape ? '4px' : '8px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {CONTENT_CONFIG.welcomeLines.map((line, idx) => (
              <span
                key={idx}
                className="welcome-line"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: isShortLandscape
                    ? 'clamp(20px, 4.5vh, 28px)'
                    : 'clamp(28px, 6.5vw, 54px)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '0.04em',
                  color: '#3d312a',
                  textShadow: '0 2px 10px rgba(255, 255, 255, 0.85), 0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {line}
              </span>
            ))}
          </div>

          <p
            style={{
              marginTop: isShortLandscape ? '4px' : '8px',
              fontSize: isShortLandscape ? '12px' : 'clamp(12px, 2.5vw, 15px)',
              fontWeight: 500,
              color: '#5c4d3c',
              lineHeight: 1.35,
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
          gap: isShortLandscape ? '6px' : '10px',
          width: '100%',
        }}
      >
        {/* Hovered / Selected Building Card */}
        {(hoveredBuilding || selectedBuilding) && !isEntered && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '16px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              pointerEvents: 'auto',
              maxWidth: 'min(320px, 90vw)',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#3d312a',
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {(selectedBuilding || hoveredBuilding)?.name}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: '#6c584c',
                marginTop: '2px',
                lineHeight: 1.3,
              }}
            >
              {(selectedBuilding || hoveredBuilding)?.description}
            </div>
            {selectedBuilding && (
              <button
                onClick={onClearSelectedBuilding}
                aria-label="Close building inspection details"
                style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: '#e76f51',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '4px',
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
            aria-label="Enter Somewhere Village"
            style={{
              pointerEvents: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#e76f51', // warm coral
              color: '#ffffff',
              border: '2px solid #fefae0',
              borderRadius: '32px',
              padding: isShortLandscape
                ? '9px 22px'
                : isSmallMobile
                ? '12px 24px'
                : 'clamp(12px, 2.5vw, 15px) clamp(24px, 4vw, 36px)',
              fontSize: isShortLandscape || isSmallMobile ? '14px' : 'clamp(14px, 2.2vw, 17px)',
              fontWeight: 700,
              fontFamily: "'Fredoka', sans-serif",
              letterSpacing: '0.05em',
              cursor: isTransitioning ? 'default' : 'pointer',
              boxShadow: '0 6px 20px rgba(231, 111, 81, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.backgroundColor = '#d65a3c';
                e.currentTarget.style.transform = 'scale(1.04) translateY(-1px)';
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
            <ArrowRight size={16} />
          </button>
        )}

        {/* Subtle instructions hint */}
        {!isEntered && (
          <div
            style={{
              fontSize: isShortLandscape ? '10px' : '11px',
              color: '#5c4d3c',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Drag to gently spin • Tap buildings to inspect
          </div>
        )}
      </div>
    </div>
  );
};
