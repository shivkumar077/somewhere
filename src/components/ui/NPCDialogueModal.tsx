import React, { useEffect } from 'react';
import { NPCEntity, DestinationType } from '../../world/types';
import { MessageCircle, X, Navigation } from 'lucide-react';

interface NPCDialogueModalProps {
  npc: NPCEntity | null;
  onClose: () => void;
  onNavigateToDestination?: (dest: DestinationType) => void;
}

export const NPCDialogueModal: React.FC<NPCDialogueModalProps> = ({
  npc,
  onClose,
  onNavigateToDestination,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'KeyE') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!npc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(520px, 92vw)',
        zIndex: 45,
        backgroundColor: '#fffdfa',
        borderRadius: '20px',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18)',
        border: '3px solid #faedcd',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        animation: 'slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: npc.visualTheme.jacketColor,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MessageCircle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: "'Fredoka', sans-serif", color: '#3d312a' }}>
              {npc.name}
            </div>
            <div style={{ fontSize: '11px', color: '#8d5b4c', fontWeight: 600, textTransform: 'uppercase' }}>
              {npc.role}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close dialogue"
          style={{
            background: '#faedcd',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#5c4d3c',
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ fontSize: '14px', color: '#4a3b32', lineHeight: 1.6 }}>
        {npc.dialogue.map((line, idx) => (
          <p key={idx} style={{ margin: '4px 0' }}>
            "{line}"
          </p>
        ))}
      </div>

      {npc.guidedDestination && onNavigateToDestination && (
        <button
          onClick={() => {
            onNavigateToDestination(npc.guidedDestination!);
            onClose();
          }}
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#e76f51',
            color: '#ffffff',
            border: 'none',
            borderRadius: '16px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(231, 111, 81, 0.3)',
          }}
        >
          <Navigation size={14} />
          <span>Walk to {npc.guidedDestination.toUpperCase()}</span>
        </button>
      )}
    </div>
  );
};
