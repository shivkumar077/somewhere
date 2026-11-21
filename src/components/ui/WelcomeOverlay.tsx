import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { BuildingItem } from '../../world/types';
import { ArrowRight, MapPin } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { ANIME_PALETTE } from '../../styles/painterlyPalette';

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

  // Cinematic staggered entrance for the 3-line illustrated anime title
  useEffect(() => {
    if (isEntered || isTransitioning) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = welcomeTextRef.current?.querySelectorAll('.welcome-line');
    if (!lines) return;

    gsap.fromTo(
      lines,
      { y: 32, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        delay: 0.2,
      }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.88, opacity: 0, y: 15 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'back.out(1.5)',
          delay: 0.75,
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
        padding:
          'max(14px, var(--sat)) max(14px, var(--sar)) max(14px, var(--sab)) max(14px, var(--sal))',
        zIndex: 10,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Top Header Spacing (Leaves clear breathing room for Audio and Atmosphere controls) */}
      <div style={{ height: '44px' }} />

      {/* Cinematic Illustrated Opening Title: HELLO / THERE / YOU */}
      <div
        ref={welcomeTextRef}
        style={{
          position: 'absolute',
          top: isShortLandscape
            ? 'clamp(24px, 5.5vh, 38px)'
            : 'clamp(44px, 7.5vh, 84px)',
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
            lineHeight: 0.9,
          }}
        >
          {CONTENT_CONFIG.welcomeLines.map((line, idx) => (
            <span
              key={idx}
              className="welcome-line"
              style={{
                fontFamily: "'Fredoka', 'Cinzel', serif, sans-serif",
                fontSize: isShortLandscape
                  ? 'clamp(22px, 5.2vh, 28px)'
                  : isSmallMobile
                  ? 'clamp(30px, 8.8vw, 40px)'
                  : 'clamp(38px, 5.6vw, 64px)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#fffbf2',
                textShadow:
                  '0 3px 0 #7c5138, 0 5px 12px rgba(60, 40, 25, 0.28), 0 1px 3px rgba(0, 0, 0, 0.2)',
                display: 'inline-block',
                textTransform: 'uppercase',
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Area: ENTER button & Building Hover Tooltip */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isShortLandscape ? '6px' : '10px',
          width: '100%',
          pointerEvents: 'none',
          marginBottom: isShortLandscape ? '2px' : '10px',
        }}
      >
        {/* Hovered / Selected Landmark Inspection Card */}
        {activeBuilding && (
          <div
            data-testid="building-tooltip"
            style={{
              backgroundColor: 'rgba(255, 253, 248, 0.96)',
              backdropFilter: 'blur(10px)',
              padding: '10px 18px',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(60, 40, 25, 0.15)',
              border: '2px solid rgba(238, 229, 203, 0.95)',
              textAlign: 'center',
              pointerEvents: 'auto',
              maxWidth: 'min(380px, 92vw)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: ANIME_PALETTE.wall.warmIvory,
                color: ANIME_PALETTE.earth.timberWarm,
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '10px',
                marginBottom: '4px',
              }}
            >
              <MapPin size={10} color={ANIME_PALETTE.roof.terracottaWarm} />
              <span>{activeBuilding.category}</span>
            </div>

            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#34261f',
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
                  color: ANIME_PALETTE.roof.terracottaWarm,
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

        {/* ENTER Button — Warm Storybook Terracotta Call to Action */}
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
            backgroundColor: ANIME_PALETTE.roof.terracottaWarm,
            color: '#fffef9',
            border: '2px solid #fff5ea',
            borderRadius: '32px',
            padding: isShortLandscape
              ? '8px 22px'
              : isSmallMobile
              ? '10px 24px'
              : 'clamp(11px, 2.2vw, 14px) clamp(26px, 3.8vw, 36px)',
            fontSize:
              isShortLandscape || isSmallMobile
                ? '14px'
                : 'clamp(14px, 2vw, 16px)',
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            letterSpacing: '0.06em',
            cursor: isTransitioning ? 'default' : 'pointer',
            boxShadow:
              '0 8px 24px rgba(196, 94, 65, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            transition:
              'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease',
            minHeight: '44px',
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = '#af4c31';
              e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor =
                ANIME_PALETTE.roof.terracottaWarm;
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
