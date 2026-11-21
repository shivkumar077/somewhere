import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MenuItem {
  num: string;
  title: string;
  id: string;
}

const MENU_ITEMS: MenuItem[] = [
  { num: '01', title: 'ABOUT', id: 'about' },
  { num: '02', title: 'EDUCATION', id: 'education' },
  { num: '03', title: 'EXPERIENCE', id: 'experience' },
  { num: '04', title: 'PROJECTS', id: 'projects' },
  { num: '05', title: 'SKILLS', id: 'skills' },
  { num: '06', title: 'CONTACT', id: 'contact' },
];

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Toggle on event from the top-right 3-line button
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener('toggle_portfolio_notebook', handleToggle);
    window.addEventListener('ui_quest_log_toggle', handleToggle);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('toggle_portfolio_notebook', handleToggle);
      window.removeEventListener('ui_quest_log_toggle', handleToggle);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Portfolio Fullscreen / Slide Menu Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(10, 14, 23, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'max(24px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right)) max(24px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left))',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            animation: 'menuFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            overflowY: 'auto',
          }}
        >
          {/* Menu Wrapper */}
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxSizing: 'border-box',
              padding: 'clamp(8px, 2vw, 24px)',
            }}
          >
            {/* Header with Title Tag & Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 'clamp(14px, 3vh, 28px)',
                borderBottom: '1.5px solid rgba(255, 255, 255, 0.15)',
                marginBottom: '4px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Chakra Petch', 'Russo One', sans-serif",
                  fontSize: 'clamp(11px, 2vw, 14px)',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  color: '#f4c430',
                  textTransform: 'uppercase',
                }}
              >
                // SHIV KUMAR PORTFOLIO
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  padding: '8px 14px',
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4c430';
                  e.currentTarget.style.color = '#10141d';
                  e.currentTarget.style.borderColor = '#f4c430';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            {/* List of Titles matching reference image */}
            <nav
              aria-label="Portfolio sections"
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {MENU_ITEMS.map((item, index) => {
                const isHovered = hoveredIdx === index;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(index)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'clamp(14px, 2.8vh, 26px) 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      cursor: 'pointer',
                      transition: 'transform 0.18s ease, padding 0.18s ease',
                      transform: isHovered ? 'translateX(10px)' : 'translateX(0px)',
                      userSelect: 'none',
                    }}
                  >
                    {/* Number Prefix (01, 02, ...) */}
                    <span
                      style={{
                        fontFamily: "'Chakra Petch', 'Plus Jakarta Sans', monospace",
                        fontSize: 'clamp(12px, 1.8vw, 17px)',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: isHovered ? '#f4c430' : 'rgba(165, 176, 195, 0.75)',
                        marginRight: 'clamp(16px, 3.5vw, 36px)',
                        minWidth: 'clamp(24px, 3vw, 36px)',
                        transition: 'color 0.18s ease',
                      }}
                    >
                      {item.num}
                    </span>

                    {/* Main Title (ABOUT, EDUCATION, ...) */}
                    <span
                      style={{
                        fontFamily: "'Chakra Petch', 'Fredoka', 'Plus Jakarta Sans', sans-serif",
                        fontSize: 'clamp(26px, 6vw, 56px)',
                        fontWeight: 900,
                        letterSpacing: '0.04em',
                        color: isHovered ? '#f4c430' : '#ffffff',
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                        transition: 'color 0.18s ease',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Global CSS animation */}
      <style>{`
        @keyframes menuFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};
