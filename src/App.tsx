import React, { useState, useEffect } from 'react';

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

  // Toggle on event from the top-right button
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

  // Notify 3D engine so the top-right button morphs into 'X' when open
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('portfolio_menu_state_changed', { detail: { isOpen } })
    );
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          {/* Transparent click-outside dismisser (no darkening/blackout) */}
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

          {/* Hand-drawn Storybook Pop-up Card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="portfolio-popup-card"
            style={{
              position: 'fixed',
              zIndex: 10000,
              backgroundColor: '#fffef9',
              borderRadius: '18px',
              border: '3px solid #1e252b',
              boxShadow: '5px 5px 0px #1e252b',
              padding: '14px 16px 12px 16px',
              pointerEvents: 'auto',
              boxSizing: 'border-box',
              animation: 'popupCardIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              userSelect: 'none',
              fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
            }}
          >
            {/* Header: Sticker Tag (No separate X button needed) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                borderBottom: '2px dashed rgba(30, 37, 43, 0.2)',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  backgroundColor: '#f4c430',
                  color: '#1e252b',
                  border: '1.5px solid #1e252b',
                  borderRadius: '8px',
                  padding: '3px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  boxShadow: '1.5px 1.5px 0px #1e252b',
                }}
              >
                ✦ PORTFOLIO
              </span>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#848d97',
                  letterSpacing: '0.04em',
                }}
              >
                SELECT SECTION
              </span>
            </div>

            {/* List of Titles matching hand-drawn website theme */}
            <nav
              aria-label="Portfolio sections"
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '2px',
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
                      padding: '8px 8px',
                      borderRadius: '10px',
                      backgroundColor: isHovered ? '#fbf4df' : 'transparent',
                      borderBottom: isLast ? 'none' : '1.5px dashed rgba(30, 37, 43, 0.12)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                    }}
                  >
                    {/* Number Badge */}
                    <span
                      style={{
                        backgroundColor: isHovered ? '#f4c430' : '#f2ebd9',
                        color: '#1e252b',
                        border: '1.5px solid #1e252b',
                        borderRadius: '6px',
                        padding: '2px 6px',
                        fontFamily: "'Chakra Petch', sans-serif",
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        marginRight: '12px',
                        minWidth: '22px',
                        textAlign: 'center',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      {item.num}
                    </span>

                    {/* Main Title */}
                    <span
                      style={{
                        fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                        color: '#1e252b',
                        lineHeight: 1.15,
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
        /* Desktop & Tablet: Anchored to the left of the top-right button */
        .portfolio-popup-card {
          top: 48px;
          right: 115px;
          width: 285px;
        }

        /* Mobile screens: Positioned right below the top-right button */
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
