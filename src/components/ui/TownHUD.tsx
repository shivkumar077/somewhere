import React from 'react';
import { BuildingItem, NPCEntity, DestinationType } from '../../world/types';
import {
  RotateCcw,
  Compass,
  Home,
  GraduationCap,
  Wrench,
  Sparkles,
  BookOpen,
  Mail,
  MessageCircle,
  LucideIcon,
} from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';

interface TownHUDProps {
  nearbyDestination: BuildingItem | null;
  nearbyNPC: NPCEntity | null;
  onOpenDestination: (building: BuildingItem) => void;
  onOpenNPC: (npc: NPCEntity) => void;
  onNavigateToDestination: (dest: DestinationType) => void;
  onReturnToOrbit: () => void;
  playerPosition: [number, number, number];
}

const DESTINATION_SUBTITLES: Record<DestinationType, string> = {
  about: 'About Shiv Kumar • Passions & Philosophy',
  education: 'Techno India University • B.Tech CSE',
  experience: 'Practical Systems Engineering & Open Source',
  projects: '5 Verified Software Projects & Repositories',
  skills: 'Cloud, Systems & WebGL Architecture',
  contact: 'Get in Touch • Social & Résumé',
};

const DESTINATION_ITEMS: {
  role: DestinationType;
  label: string;
  sub: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { role: 'about', label: 'Little House', sub: 'About Me', icon: Home, color: '#e76f51' },
  { role: 'education', label: 'University', sub: 'Education', icon: GraduationCap, color: '#457b9d' },
  { role: 'experience', label: 'Workshop', sub: 'Experience', icon: Wrench, color: '#d4a373' },
  { role: 'projects', label: 'Invention House', sub: 'Projects', icon: Sparkles, color: '#9b5de5' },
  { role: 'skills', label: 'Library', sub: 'Skills', icon: BookOpen, color: '#2a9d8f' },
  { role: 'contact', label: 'Post Office', sub: 'Contact', icon: Mail, color: '#f4a261' },
];

export const TownHUD: React.FC<TownHUDProps> = ({
  nearbyDestination,
  nearbyNPC,
  onOpenDestination,
  onOpenNPC,
  onNavigateToDestination,
  onReturnToOrbit,
}) => {
  const { isMobile, isShortLandscape, isSmallMobile } = useResponsive();

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
        zIndex: 20,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Top Left Navigation Header (offset to accommodate persistent AudioControl) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'auto',
          marginLeft: isSmallMobile ? '40px' : '48px',
        }}
      >
        <button
          onClick={onReturnToOrbit}
          aria-label="Return to planet orbit view"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(10px)',
            color: '#5c3a21',
            border: '2px solid rgba(250, 237, 205, 0.9)',
            borderRadius: '24px',
            padding: isSmallMobile ? '6px 10px' : '7px 14px',
            fontSize: isSmallMobile ? '11px' : '12px',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#faedcd';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.94)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <RotateCcw size={14} color="#e76f51" />
          <span>Return to Orbit</span>
        </button>

        <div
          style={{
            display: isSmallMobile || isShortLandscape ? 'none' : 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '5px 10px',
            fontSize: '11px',
            color: '#7f5539',
            border: '1px solid rgba(250, 237, 205, 0.6)',
          }}
        >
          <Compass size={12} color="#2a9d8f" />
          <span>Living Town</span>
        </div>
      </div>

      {/* Center Proximity Prompts */}
      <div
        style={{
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
          marginBottom: isShortLandscape ? '2px' : '12px',
          maxWidth: 'min(440px, 92vw)',
        }}
      >
        {/* Destination Proximity Prompt */}
        {nearbyDestination && nearbyDestination.destinationRole && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenDestination(nearbyDestination)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpenDestination(nearbyDestination);
              }
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '2px solid #e76f51',
              borderRadius: '24px',
              padding: isSmallMobile ? '8px 14px' : '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(231, 111, 81, 0.22)',
              cursor: 'pointer',
              animation: 'bounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#fde2e4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={15} color="#e76f51" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: isSmallMobile ? '12px' : '13px',
                  fontWeight: 700,
                  fontFamily: "'Fredoka', sans-serif",
                  color: '#2b2d42',
                  lineHeight: 1.2,
                }}
              >
                Press [E] or Click to Explore {nearbyDestination.name}
              </div>
              <div style={{ fontSize: '10px', color: '#6c584c', marginTop: '2px' }}>
                {DESTINATION_SUBTITLES[nearbyDestination.destinationRole] || nearbyDestination.category}
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#e76f51',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '10px',
                flexShrink: 0,
              }}
            >
              Enter
            </div>
          </div>
        )}

        {/* NPC Proximity Prompt */}
        {!nearbyDestination && nearbyNPC && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenNPC(nearbyNPC)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpenNPC(nearbyNPC);
              }
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '2px solid #2a9d8f',
              borderRadius: '24px',
              padding: isSmallMobile ? '8px 14px' : '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(42, 157, 143, 0.22)',
              cursor: 'pointer',
              animation: 'bounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#d8f3dc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MessageCircle size={15} color="#2a9d8f" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: isSmallMobile ? '12px' : '13px',
                  fontWeight: 700,
                  fontFamily: "'Fredoka', sans-serif",
                  color: '#2b2d42',
                  lineHeight: 1.2,
                }}
              >
                Press [E] to talk with {nearbyNPC.name}
              </div>
              <div style={{ fontSize: '10px', color: '#6c584c', marginTop: '2px' }}>
                {nearbyNPC.role} • Guide
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#2a9d8f',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '10px',
                flexShrink: 0,
              }}
            >
              Talk
            </div>
          </div>
        )}
      </div>

      {/* Bottom Compass Navigation Bar & Controls Hint */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isShortLandscape ? '4px' : '8px',
          width: '100%',
        }}
      >
        {/* Controls Hint */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(8px)',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: isSmallMobile ? '10px' : '11px',
            color: '#6c584c',
            border: '1px solid rgba(250, 237, 205, 0.8)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>
            {isMobile
              ? '👆 Tap ground to walk • Tap any landmark below to travel'
              : '⌨️ WASD / Arrows to Walk • Click Ground to Move • Press [E] to Interact'}
          </span>
        </div>

        {/* 6 Destination Compass Pills */}
        <nav
          aria-label="Town Destinations Compass"
          style={{
            display: 'flex',
            gap: isSmallMobile ? '3px' : '6px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '100%',
            pointerEvents: 'auto',
          }}
        >
          {DESTINATION_ITEMS.map((item) => {
            const isNearby = nearbyDestination?.destinationRole === item.role;
            const Icon = item.icon;

            return (
              <button
                key={item.role}
                onClick={() => {
                  if (isNearby && nearbyDestination) {
                    onOpenDestination(nearbyDestination);
                  } else {
                    onNavigateToDestination(item.role);
                  }
                }}
                aria-label={`Travel to ${item.label} (${item.sub})`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isSmallMobile ? '3px' : '5px',
                  backgroundColor: isNearby ? item.color : 'rgba(255, 255, 255, 0.94)',
                  color: isNearby ? '#ffffff' : '#3d312a',
                  border: isNearby ? `2px solid ${item.color}` : '1px solid rgba(230, 220, 205, 0.85)',
                  borderRadius: '18px',
                  padding: isSmallMobile ? '4px 7px' : '6px 11px',
                  fontSize: isSmallMobile ? '10px' : '11px',
                  fontWeight: 600,
                  fontFamily: "'Fredoka', sans-serif",
                  cursor: 'pointer',
                  boxShadow: isNearby
                    ? `0 4px 12px ${item.color}55`
                    : '0 2px 6px rgba(0,0,0,0.06)',
                  transform: isNearby ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!isNearby) {
                    e.currentTarget.style.backgroundColor = '#faedcd';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isNearby) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.94)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <Icon size={13} color={isNearby ? '#ffffff' : item.color} />
                <span>{item.sub}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
