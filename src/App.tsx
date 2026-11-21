import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { LetterModal, PortfolioSection } from './components/LetterModal';
import { WorldNPCBadges } from './components/WorldNPCBadges';

interface MenuItem {
  num: string;
  title: string;
  id: PortfolioSection;
}

const MENU_ITEMS: MenuItem[] = [
  { num: '01', title: 'ABOUT', id: 'about' },
  { num: '02', title: 'EDUCATION', id: 'education' },
  { num: '03', title: 'EXPERIENCE', id: 'experience' },
  { num: '04', title: 'PROJECTS', id: 'projects' },
  { num: '05', title: 'SKILLS', id: 'skills' },
  { num: '06', title: 'CONTACT', id: 'contact' },
  { num: '07', title: 'CV DOCUMENT', id: 'cv' },
];

// Ensure default character is a stylish boy preset in localStorage
try {
  const saved = localStorage.getItem('App3D_data');
  if (saved) {
    const data = JSON.parse(saved);
    if (data.modelFiles && Array.isArray(data.modelFiles)) {
      if (
        data.modelFiles.includes('hair1') ||
        data.modelFiles.includes('hair2') ||
        data.modelFiles.includes('bottom1') ||
        data.modelFiles.includes('bottom2')
      ) {
        data.modelFiles = ['base', 'hair7', 'top7', 'bottom7', 'shoes1'];
        localStorage.setItem('App3D_data', JSON.stringify(data));
      }
    }
  } else {
    localStorage.setItem(
      'App3D_data',
      JSON.stringify({
        modelFiles: ['base', 'hair7', 'top7', 'bottom7', 'shoes1'],
      })
    );
  }
} catch (e) {}

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Storybook Letter Modal State
  const [letterState, setLetterState] = useState<{
    isOpen: boolean;
    section: PortfolioSection;
  }>({
    isOpen: false,
    section: 'about',
  });

  // Immediate smooth unlock when closing letter modal
  const handleCloseLetter = () => {
    setLetterState((prev) => ({ ...prev, isOpen: false }));
    window.dispatchEvent(new CustomEvent('portfolio_modal_closed'));
    try {
      const chars = (window as any)._characters;
      if (chars) {
        if (chars.mesh) chars.mesh.interactingElement = null;
        if (typeof chars.unlockCamera === 'function') chars.unlockCamera();
        if (typeof chars.enable === 'function') chars.enable();
      }
      (window as any)._sprintActive = false;
    } catch (e) {}
  };

  // Toggle on event from the top-right button
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener('toggle_portfolio_notebook', handleToggle);
    window.addEventListener('ui_quest_log_toggle', handleToggle);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        handleCloseLetter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('toggle_portfolio_notebook', handleToggle);
      window.removeEventListener('ui_quest_log_toggle', handleToggle);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Notify 3D engine so the top-right button knows state
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('portfolio_menu_state_changed', { detail: { isOpen } })
    );
  }, [isOpen]);

  // When clicking an item in the 3-line menu:
  // Close menu and summon the corresponding NPC to run to the player under 2-3s!
  const handleMenuItemClick = (sectionId: PortfolioSection) => {
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent('summon_portfolio_npc', { detail: { section: sectionId } })
    );
  };

  return (
    <>
      {/* 3D World NPC Floating Billboard Badges & Fast Sprint Delivery */}
      <WorldNPCBadges
        onOpenLetter={(section) => setLetterState({ isOpen: true, section })}
      />

      {/* Storybook Letter Modal */}
      <LetterModal
        isOpen={letterState.isOpen}
        section={letterState.section}
        onClose={handleCloseLetter}
        onSelectSection={(sec) => setLetterState({ isOpen: true, section: sec })}
      />

      {/* 3-Lines Navigation Menu Popup */}
      {isOpen && (
        <>
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
            {/* Header: Sticker Tag & Download CV Button */}
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

              <a
                href="/Shiv_Kumar_CV.pdf"
                download="Shiv_Kumar_CV.pdf"
                aria-label="Download Shiv Kumar's CV"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: '#ffffff',
                  color: '#1e252b',
                  border: '1.5px solid #1e252b',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '1.5px 1.5px 0px #1e252b',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4c430';
                  e.currentTarget.style.transform = 'translate(-1px, -1px)';
                  e.currentTarget.style.boxShadow = '2.5px 2.5px 0px #1e252b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '1.5px 1.5px 0px #1e252b';
                }}
              >
                <Download size={12} strokeWidth={2.8} />
                <span>DOWNLOAD CV</span>
              </a>
            </div>

            {/* List of Titles: Clicking any summons the NPC runner! */}
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
                    data-section={item.id}
                    data-testid={`menu-item-${item.id}`}
                    onClick={() => handleMenuItemClick(item.id)}
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
                        fontSize: '17px',
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
          width: 295px;
        }

        /* Mobile screens: Positioned right below the top-right button */
        @media (max-width: 639px) {
          .portfolio-popup-card {
            top: 80px;
            right: 16px;
            width: min(290px, calc(100vw - 32px));
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
