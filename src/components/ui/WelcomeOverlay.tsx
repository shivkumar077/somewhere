import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { BuildingItem } from '../../world/types';
import { ArrowRight, MapPin } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';

interface WelcomeOverlayProps {
  isEntered: boolean;
  isTransitioning: boolean;
  onEnter: () => void;
  hoveredBuilding: BuildingItem | null;
  selectedBuilding: BuildingItem | null;
  onClearSelectedBuilding: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  isEntered,
  isTransitioning,
  onEnter,
  hoveredBuilding,
  selectedBuilding,
  onClearSelectedBuilding,
}) => {
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isShortLandscape, isSmallMobile } = useResponsive();

  // Staggered entrance for the compact 3-line welcome message
  useEffect(() => {
    if (isEntered || isTransitioning) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = welcomeTextRef.current?.querySelectorAll('.welcome-line');
    if (!lines) return;

    gsap.fromTo(
      lines,
      { y: 28, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'back.out(1.3)',
        delay: 0.15,
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
          delay: 0.65,
        }
      );
    }
  }, [isEntered, isTransitioning]);

  if (isEntered) {
    return null;
  }

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
      {/* Top Header Placeholder (Keeps top spacing consistent) */}
      <div style={{ height: '40px' }} />

      {/* Centered Welcome Typography: HELLO / THERE / YOU */}
      <div
        ref={welcomeTextRef}
        style={{
          position: 'absolute',
          top: isShortLandscape
            ? 'clamp(28px, 6vh, 44px)'
            : 'clamp(52px, 8.5vh, 92px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 12,
          width: '100%',
          maxWidth: '92vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: 0.88,
          }}
        >
          {CONTENT_CONFIG.welcomeLines.map((line, idx) => (
            <span
              key={idx}
              className="welcome-line"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: isShortLandscape
                  ? 'clamp(20px, 4.8vh, 26px)'
                  : isSmallMobile
                  ? 'clamp(28px, 8vw, 36px)'
                  : 'clamp(34px, 5.2vw, 56px)',
                fontWeight: 700,
                letterSpacing: '0.03em',
                color: '#34261f',
                textShadow:
                  '0 2px 14px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(0, 0, 0, 0.12)',
                display: 'inline-block',
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Area: ENTER interaction & Hover/Select Tooltip */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isShortLandscape ? '6px' : '10px',
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Hovered / Selected Building Card */}
        {activeBuilding && (
          <div
            data-testid="building-tooltip"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
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

        {/* ENTER Button - Primary Interaction */}
        <button
          ref={buttonRef}
          onClick={onEnter}
          disabled={isTransitioning}
          aria-label="Enter"
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
              ? '8px 22px'
              : isSmallMobile
              ? '10px 24px'
              : 'clamp(11px, 2.2vw, 14px) clamp(26px, 3.8vw, 36px)',
            fontSize: isShortLandscape || isSmallMobile ? '14px' : 'clamp(14px, 2vw, 16px)',
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            letterSpacing: '0.06em',
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
      </div>
    </div>
  );
};
