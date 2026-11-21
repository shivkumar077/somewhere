import React, { useState, useCallback, useMemo } from 'react';
import { CANONICAL_WORLD } from './world/worldData';
import { DestinationModal } from './components/ui/DestinationModal';
import { BuildingItem, DestinationType } from './world/types';
import {
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Mail,
  ExternalLink,
} from 'lucide-react';

const DESTINATIONS: { role: DestinationType; label: string; icon: any; buildingId: string }[] = [
  { role: 'about', label: 'About', icon: User, buildingId: 'building-little-house' },
  { role: 'education', label: 'Education', icon: GraduationCap, buildingId: 'building-university' },
  { role: 'experience', label: 'Experience', icon: Briefcase, buildingId: 'building-workshop' },
  { role: 'projects', label: 'Projects', icon: FolderGit2, buildingId: 'building-invention-house' },
  { role: 'skills', label: 'Skills', icon: Cpu, buildingId: 'building-library' },
  { role: 'contact', label: 'Contact', icon: Mail, buildingId: 'building-post-office' },
];

export const App: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem | null>(null);

  const buildingsByRole = useMemo(() => {
    const map = new Map<string, BuildingItem>();
    for (const b of CANONICAL_WORLD.buildings) {
      if (b.destinationRole) map.set(b.destinationRole, b);
      map.set(b.id, b);
    }
    return map;
  }, []);

  const handleOpenRole = useCallback(
    (role: DestinationType) => {
      const b = buildingsByRole.get(role);
      if (b) setSelectedBuilding(b);
    },
    [buildingsByRole]
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'max(14px, env(safe-area-inset-top)) max(14px, env(safe-area-inset-right)) max(14px, env(safe-area-inset-bottom)) max(14px, env(safe-area-inset-left))',
        boxSizing: 'border-box',
        fontFamily: "'Chakra Petch', 'Russo One', sans-serif",
      }}
    >
      {/* Top Floating Portfolio Navigation Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {/* Brand Block Badge */}
        <div
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f4c430',
            color: '#1e252b',
            border: '2.5px solid #1e252b',
            borderRadius: '10px',
            boxShadow: '3px 3px 0px #1e252b',
            padding: '6px 14px',
            fontWeight: 900,
            fontSize: '14px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          <span>SHIV KUMAR</span>
          <span
            style={{
              backgroundColor: '#1e252b',
              color: '#f4c430',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '11px',
            }}
          >
            PORTFOLIO
          </span>
        </div>

        {/* Portfolio Destination Pills */}
        <nav
          aria-label="Portfolio Destinations"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
            backgroundColor: 'rgba(255, 253, 250, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '2px solid #1e252b',
            borderRadius: '12px',
            boxShadow: '3px 3px 0px #1e252b',
            padding: '4px 6px',
          }}
        >
          {DESTINATIONS.map(({ role, label, icon: Icon }) => (
            <button
              key={role}
              onClick={() => handleOpenRole(role)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1.5px solid transparent',
                backgroundColor: 'transparent',
                color: '#1e252b',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f4c430';
                e.currentTarget.style.borderColor = '#1e252b';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon size={14} strokeWidth={2.5} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Bottom Info Hint */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            backgroundColor: 'rgba(30, 37, 43, 0.85)',
            color: '#f8f8f8',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <span>DRAG TO ROTATE WORLD • CLICK ANY DESTINATION ABOVE TO EXPLORE</span>
        </div>

        <a
          href="https://github.com/shivkumar077/somewhere"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#fffdfa',
            color: '#1e252b',
            border: '2px solid #1e252b',
            borderRadius: '8px',
            boxShadow: '2px 2px 0px #1e252b',
            padding: '5px 10px',
            fontSize: '11px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <span>GITHUB</span>
          <ExternalLink size={12} />
        </a>
      </footer>

      {/* Destination Modal Drawer */}
      <DestinationModal
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
      />
    </div>
  );
};
