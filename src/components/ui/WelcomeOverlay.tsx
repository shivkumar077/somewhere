import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { BuildingItem } from '../../world/types';
import { Sparkles, Compass, ArrowRight, RotateCcw, MapPin, Layers } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { ViewMode } from '../canvas/SceneCanvas';

interface WelcomeOverlayProps {
  isEntered: boolean;
  isTransitioning: boolean;
  viewMode?: ViewMode;
  onToggleViewMode?: () => void;
  onEnter: () => void;
  onReturnToOrbit: () => void;
  hoveredBuilding: BuildingItem | null;
  selectedBuilding: BuildingItem | null;
  onClearSelectedBuilding: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  isEntered,
  isTransitioning,
  viewMode = 'miniature',
  onToggleViewMode,
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

  const activeBuilding = selectedBuilding || hoveredBuilding;

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
              {isNarrowFoldable ? 'M02' : 'MILESTONE 02'}
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: isShortLandscape ? '14px 24px' : 'clamp(20px, 4vw, 32px)',
            maxWidth: 'min(460px, 92vw)',
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
              margin: isShortLandscape ? '0 0 10px' : '0 0 16px',
              fontSize: isShortLandscape ? '12px' : '14px',
              color: '#6c584c',
              lineHeight: 1.5,
            }}
          >
            You have arrived at <strong>The Town Square</strong>.
            The canonical manifest defines 11 architectural landmarks across 4 districts.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '12px',
            }}
          >
            {/* View Mode Toggle: Spherical Miniature vs Flat Walkable World */}
            <button
              onClick={onToggleViewMode}
              aria-label="Toggle between Spherical Miniature and Walkable Grid renderer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: viewMode === 'walkable' ? '#2a9d8f' : '#faedcd',
                color: viewMode === 'walkable' ? '#ffffff' : '#5c3a21',
                border: 'none',
                borderRadius: '20px',
                padding: '9px 18px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Layers size={14} />
              <span>{viewMode === 'walkable' ? 'View: Walkable Grid (Active)' : 'Preview: Walkable Grid'}</span>
            </button>

            {/* Return to Orbit Button */}
            <button
              onClick={onReturnToOrbit}
              aria-label="Return to planet orbit view"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#e76f51',
                color: '#ffffff',
                border: 'none',
                borderRadius: '20px',
                padding: '9px 18px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(231, 111, 81, 0.35)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d65a3c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e76f51';
              }}
            >
              <RotateCcw size={14} />
              <span>Return to Orbit</span>
            </button>
          </div>
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
        {activeBuilding && !isEntered && (
          <div
            data-testid="building-tooltip"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(10px)',
              padding: '10px 18px',
              borderRadius: '18px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              pointerEvents: 'auto',
              maxWidth: 'min(360px, 92vw)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#faedcd',
                color: '#8d5b4c',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '10px',
                marginBottom: '4px',
              }}
            >
              <MapPin size={10} />
              <span>{activeBuilding.category}</span>
            </div>

            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3d312a',
                fontFamily: "'Fredoka', sans-serif",
              }}
            >
              {activeBuilding.name}
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#6c584c',
                marginTop: '3px',
                lineHeight: 1.35,
              }}
            >
              {activeBuilding.description}
            </div>

            {activeBuilding.metadata.storySnippet && (
              <div
                style={{
                  fontSize: '10px',
                  color: '#8a7968',
                  fontStyle: 'italic',
                  marginTop: '4px',
                }}
              >
                "{activeBuilding.metadata.storySnippet}"
              </div>
            )}

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
                  padding: '2px 6px',
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
              backgroundColor: '#e76f51',
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
