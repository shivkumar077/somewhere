import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BlockTransitionProps {
  isActive: boolean;
  onTransitionPeak?: () => void;
  onTransitionComplete?: () => void;
}

/**
 * Playful storybook block-style transition.
 * Staggers a grid of whimsical pastel tiles with soft spring easing.
 */
export const BlockTransition: React.FC<BlockTransitionProps> = ({
  isActive,
  onTransitionPeak,
  onTransitionComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const tiles = containerRef.current.querySelectorAll('.transition-tile');

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onTransitionComplete?.();
      },
    });

    // 1. Reset tiles
    gsap.set(tiles, {
      scale: 0,
      opacity: 0,
      transformOrigin: 'center center',
    });

    // 2. Animate in with organic radial / grid stagger
    tl.to(tiles, {
      scale: 1.02,
      opacity: 1,
      duration: 0.45,
      stagger: {
        grid: [5, 6],
        from: 'center',
        amount: 0.35,
        ease: 'power2.out',
      },
      onComplete: () => {
        onTransitionPeak?.();
      },
    })
      // 3. Animate out gracefully
      .to(tiles, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        stagger: {
          grid: [5, 6],
          from: 'edges',
          amount: 0.3,
          ease: 'power2.in',
        },
      });

    return () => {
      tl.kill();
    };
  }, [isActive, onTransitionPeak, onTransitionComplete]);

  if (!isActive) return null;

  // 5 rows x 6 columns grid of pastel storybook blocks
  const rows = 5;
  const cols = 6;
  const tileColors = [
    '#f4a261', // warm apricot
    '#e76f51', // terracotta
    '#2a9d8f', // sage teal
    '#e9c46a', // buttercup
    '#8ab17d', // meadow green
    '#d68c99', // dusty rose
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const color = tileColors[i % tileColors.length];
        return (
          <div
            key={i}
            className="transition-tile"
            style={{
              backgroundColor: color,
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '4px',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
};

