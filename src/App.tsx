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
      {isOpen && (
        <>
          {/* Transparent click-outside catcher (no darkening/blackout) */}
          <div
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              backgroundColor: 'transparent',
              pointerEvents: 'auto',
            }}
          />

          {/* Compact Pop-up Card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="portfolio-popup-card"
            style={{
              position: 'fixed',
              zIndex: 10000,
              backgroundColor: 'rgba(12, 16, 25, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: '1.5px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0, 0, 0, 0.25)',
              padding: '14px 18px 12px 18px',
              pointerEvents: 'auto',
              boxSizing: 'border-box',
              animation: 'popupCardIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              userSelect: 'none',
            }}
          >
            {/* Header: Tag & Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                borderBottom: '1.5px solid rgba(255, 255, 255, 0.12)',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Chakra Petch', 'Russo One', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  fontWeight: 800,
                  color: '#f4c430',
                  textTransform: 'uppercase',
                }}
              >
                // PORTFOLIO
              </span>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
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
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* List of Titles */}
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
                const isLast = index === MENU_ITEMS.length - 1;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(index)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '9px 4px',
                      borderBottom: isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease',
                      transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                    }}
                  >
                    {/* Number Prefix (01, 02...) */}
                    <span
                      style={{
                        fontFamily: "'Chakra Petch', monospace",
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: isHovered ? '#f4c430' : 'rgba(165, 176, 195, 0.75)',
                        marginRight: '14px',
                        minWidth: '22px',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {item.num}
                    </span>

                    {/* Main Title */}
                    <span
                      style={{
                        fontFamily: "'Chakra Petch', 'Fredoka', 'Plus Jakarta Sans', sans-serif",
                        fontSize: '17px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        color: isHovered ? '#f4c430' : '#ffffff',
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>
        </>
      )}

      {/* Responsive Placement & Animations */}
      <style>{`
        /* Desktop & Tablet: Anchored to the left of the side button */
        .portfolio-popup-card {
          top: 48px;
          right: 110px;
          width: 290px;
        }

        /* Mobile screens: Positioned below the top-right button */
        @media (max-width: 639px) {
          .portfolio-popup-card {
            top: 80px;
            right: 16px;
            width: min(280px, calc(100vw - 32px));
          }
        }

        @keyframes popupCardIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};
