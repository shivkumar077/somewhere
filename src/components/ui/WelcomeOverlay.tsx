import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT_CONFIG } from '../../config/contentConfig';
import { BuildingItem } from '../../world/types';
import { ArrowRight, MapPin } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { MESSENGER_PALETTE } from '../../styles/messengerPalette';

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

  // Cinematic staggered entrance for the 3-line block title matching Messenger
  useEffect(() => {
    if (isEntered || isTransitioning) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = welcomeTextRef.current?.querySelectorAll('.welcome-line');
    if (!lines) return;

    gsap.fromTo(
      lines,
      { y: 36, opacity: 0, scale: 0.88 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.16,
        ease: 'back.out(1.5)',
        delay: 0.2,
      }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.85, opacity: 0, y: 16 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'back.out(1.6)',
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
      {/* Top Header Spacing */}
      <div style={{ height: '44px' }} />

      {/* Chunky Block Title: HELLO / THERE / YOU (Recreating the Messenger 3x3 block presentation) */}
      <div
        ref={welcomeTextRef}
        style={{
          position: 'absolute',
          top: isShortLandscape
            ? 'clamp(20px, 4.5vh, 32px)'
            : 'clamp(36px, 6.5vh, 72px)',
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
            gap: isShortLandscape ? '2px' : '4px',
          }}
        >
          {CONTENT_CONFIG.welcomeLines.map((line, idx) => (
            <span
              key={idx}
              className="welcome-line"
              style={{
                fontFamily: "'Chakra Petch', 'Russo One', 'Impact', sans-serif",
                fontSize: isShortLandscape
                  ? 'clamp(24px, 5.8vh, 34px)'
                  : isSmallMobile
                  ? 'clamp(32px, 9.4vw, 44px)'
                  : 'clamp(44px, 6.4vw, 76px)',
                fontWeight: 900,
                letterSpacing: '0.1em',
                color: '#f8f8f8',
                WebkitTextStroke: '2.5px #1e252b',
                textShadow:
                  '4px 4px 0px #1e252b, 6px 6px 0px rgba(30, 37, 43, 0.25)',
                display: 'inline-block',
                textTransform: 'uppercase',
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Area: ENTER button & Landmark Tooltip */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isShortLandscape ? '6px' : '10px',
          width: '100%',
          pointerEvents: 'none',
          marginBottom: isShortLandscape ? '2px' : '12px',
        }}
      >
        {/* Hovered / Selected Landmark Inspection Card */}
        {activeBuilding && (
          <div
            data-testid="building-tooltip"
            style={{
              backgroundColor: '#fffdfa',
              border: '2px solid #1e252b',
              borderRadius: '12px',
              boxShadow: '4px 4px 0px #1e252b',
              padding: '10px 18px',
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
                backgroundColor: MESSENGER_PALETTE.stuccoWarmCream,
                color: MESSENGER_PALETTE.timberDarkOak,
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #1e252b',
                marginBottom: '4px',
              }}
            >
              <MapPin size={10} color={MESSENGER_PALETTE.roofTerracotta} />
              <span>{activeBuilding.category}</span>
            </div>

            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: "'Chakra Petch', 'Fredoka', sans-serif",
                color: '#1e252b',
              }}
            >
              {activeBuilding.name}
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#556062',
                marginTop: '2px',
                lineHeight: 1.3,
              }}
            >
              {activeBuilding.description}
            </div>

            {selectedBuilding && (
              <button
                onClick={onClearSelectedBuilding}
                aria-label="Close building inspection details"
                style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: MESSENGER_PALETTE.roofTerracotta,
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

        {/* ENTER Button — Warm Gold Modular Block Call to Action matching Messenger */}
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
            backgroundColor: MESSENGER_PALETTE.buttonGold,
            color: MESSENGER_PALETTE.buttonText,
            border: '2.5px solid #1e252b',
            borderRadius: '10px',
            boxShadow: '4px 4px 0px #1e252b',
            padding: isShortLandscape
              ? '8px 24px'
              : isSmallMobile
              ? '10px 28px'
              : 'clamp(11px, 2.2vw, 15px) clamp(28px, 4vw, 42px)',
            fontSize:
              isShortLandscape || isSmallMobile
                ? '15px'
                : 'clamp(15px, 2.1vw, 18px)',
            fontWeight: 900,
            fontFamily: "'Chakra Petch', 'Russo One', 'Fredoka', sans-serif",
            letterSpacing: '0.12em',
            cursor: isTransitioning ? 'default' : 'pointer',
            transition:
              'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease, box-shadow 0.15s ease',
            minHeight: isShortLandscape ? '40px' : '44px',
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = MESSENGER_PALETTE.buttonGoldHover;
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '5px 5px 0px #1e252b';
            }
          }}
          onMouseLeave={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = MESSENGER_PALETTE.buttonGold;
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '4px 4px 0px #1e252b';
            }
          }}
        >
          <span>ENTER</span>
          <ArrowRight size={18} strokeWidth={3} color="#1e252b" />
        </button>
      </div>
    </div>
  );
};
