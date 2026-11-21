import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from './config/portfolioData';
import {
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Mail,
  ExternalLink,
  X,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

type TabKey = 'about' | 'experience' | 'projects' | 'education' | 'skills' | 'contact';

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: 'about', label: 'About', icon: User },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'projects', label: 'Projects', icon: FolderGit2 },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'skills', label: 'Skills', icon: Cpu },
  { key: 'contact', label: 'Contact', icon: Mail },
];

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [copied, setCopied] = useState(false);

  // Listen to the in-game three-line button toggle event
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

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.owner.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      {/* Portfolio Notebook Modal Drawer (Replaces Checklist) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notebook-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(20, 28, 34, 0.45)',
            backdropFilter: 'blur(6px)',
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out',
            boxSizing: 'border-box',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#fffef9',
              borderRadius: '20px',
              border: '3px solid #1e252b',
              boxShadow: '6px 6px 0px #1e252b',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
            }}
          >
            {/* Notebook Header & Paper Spiral Accent */}
            <div
              style={{
                backgroundColor: '#fbf5e6',
                borderBottom: '2.5px solid #1e252b',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: '#f4c430',
                    color: '#1e252b',
                    border: '1.5px solid #1e252b',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                  }}
                >
                  PORTFOLIO
                </span>
                <h2
                  id="notebook-title"
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#1e252b',
                    letterSpacing: '0.03em',
                  }}
                >
                  SHIV KUMAR'S NOTEBOOK
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Notebook"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #1e252b',
                  boxShadow: '2px 2px 0px #1e252b',
                  cursor: 'pointer',
                  color: '#1e252b',
                  transition: 'transform 0.1s ease',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.92)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Navigation Tabs (Inside the Checklist Notepad) */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                padding: '8px 12px',
                backgroundColor: '#f4efe2',
                borderBottom: '2px solid #1e252b',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {TABS.map(({ key, label, icon: Icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      border: '2px solid #1e252b',
                      backgroundColor: isActive ? '#f4c430' : '#ffffff',
                      color: '#1e252b',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '12px',
                      boxShadow: isActive ? '2px 2px 0px #1e252b' : '1px 1px 0px rgba(30, 37, 43, 0.4)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.12s ease',
                      transform: isActive ? 'translateY(-1px)' : 'none',
                    }}
                  >
                    <Icon size={14} strokeWidth={2.5} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Notebook Content Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px',
                backgroundColor: '#fffef9',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              {/* TAB: ABOUT */}
              {activeTab === 'about' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div
                    style={{
                      padding: '16px',
                      backgroundColor: '#fbf6ea',
                      borderRadius: '12px',
                      border: '2px solid #1e252b',
                    }}
                  >
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1e252b' }}>
                      {PORTFOLIO_DATA.about.heading}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                      {PORTFOLIO_DATA.about.intro}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
                      <p key={idx} style={{ margin: 0, fontSize: '13.5px', lineHeight: '1.6', color: '#444' }}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Core Passions */}
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1e252b' }}>
                      CORE FOCUS & PASSIONS
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {PORTFOLIO_DATA.about.passions.map((passion) => (
                        <span
                          key={passion}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#eaf4f4',
                            border: '1.5px solid #1e252b',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1e252b',
                          }}
                        >
                          <Sparkles size={12} color="#1b4965" />
                          {passion}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Philosophy Quote */}
                  <blockquote
                    style={{
                      margin: '6px 0 0 0',
                      padding: '12px 16px',
                      backgroundColor: '#fff2b2',
                      borderLeft: '4px solid #1e252b',
                      borderRadius: '0 8px 8px 0',
                      fontStyle: 'italic',
                      fontSize: '13px',
                      color: '#1e252b',
                      fontWeight: 600,
                    }}
                  >
                    "{PORTFOLIO_DATA.about.philosophy}"
                  </blockquote>
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div
                    style={{
                      padding: '14px',
                      backgroundColor: '#fbf6ea',
                      borderRadius: '12px',
                      border: '2px solid #1e252b',
                    }}
                  >
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e252b' }}>
                      {PORTFOLIO_DATA.experience.heading}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#444', lineHeight: '1.5' }}>
                      {PORTFOLIO_DATA.experience.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {PORTFOLIO_DATA.experience.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '2px solid #1e252b',
                          borderRadius: '12px',
                          padding: '14px',
                          boxShadow: '3px 3px 0px rgba(30, 37, 43, 0.15)',
                        }}
                      >
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1e252b' }}>
                          {pillar.title}
                        </h4>
                        <p style={{ margin: '0 0 8px 0', fontSize: '13px', lineHeight: '1.5', color: '#555' }}>
                          {pillar.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {pillar.keyFocus.map((focus) => (
                            <span
                              key={focus}
                              style={{
                                backgroundColor: '#f0f3f4',
                                border: '1px solid #1e252b',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: '#1e252b',
                              }}
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {PORTFOLIO_DATA.projects.map((proj) => (
                    <div
                      key={proj.id}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #1e252b',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '3px 3px 0px rgba(30, 37, 43, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                        <div>
                          <h4 style={{ margin: '0 0 2px 0', fontSize: '16px', color: '#1e252b' }}>
                            {proj.name}
                          </h4>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#e76f51' }}>
                            {proj.tagline}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '3px 7px',
                            borderRadius: '6px',
                            backgroundColor: proj.status === 'Complete' ? '#d8f3dc' : '#fff3b0',
                            border: '1.5px solid #1e252b',
                            color: '#1e252b',
                          }}
                        >
                          {proj.status}
                        </span>
                      </div>

                      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#444' }}>
                        {proj.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              backgroundColor: '#eaf4f4',
                              border: '1px solid #1e252b',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#1e252b',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {proj.highlights && proj.highlights.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                          {proj.highlights.map((h, hIdx) => (
                            <div key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555' }}>
                              <CheckCircle2 size={13} color="#2a9d8f" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            alignSelf: 'flex-start',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '5px 10px',
                            borderRadius: '6px',
                            backgroundColor: '#1e252b',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontSize: '11px',
                            fontWeight: 700,
                            marginTop: '4px',
                          }}
                        >
                          <Github size={12} />
                          <span>View on GitHub</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: EDUCATION */}
              {activeTab === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div
                    style={{
                      padding: '16px',
                      backgroundColor: '#fbf6ea',
                      borderRadius: '12px',
                      border: '2px solid #1e252b',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#1e252b' }}>
                          {PORTFOLIO_DATA.education.institution}
                        </h3>
                        <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 600, color: '#e76f51' }}>
                          {PORTFOLIO_DATA.education.degree} — {PORTFOLIO_DATA.education.major}
                        </p>
                      </div>
                      <span
                        style={{
                          backgroundColor: '#f4c430',
                          border: '1.5px solid #1e252b',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#1e252b',
                        }}
                      >
                        {PORTFOLIO_DATA.education.period}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', color: '#444' }}>
                      <strong>Specialization:</strong> {PORTFOLIO_DATA.education.specialization}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e252b' }}>
                      KEY COURSEWORK & ACADEMIC FOUNDATIONS
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                      {PORTFOLIO_DATA.education.coursework.map((course, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: '#ffffff',
                            border: '1.5px solid #1e252b',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            color: '#333',
                          }}
                        >
                          <CheckCircle2 size={14} color="#2a9d8f" />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SKILLS */}
              {activeTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {PORTFOLIO_DATA.skills.map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #1e252b',
                        borderRadius: '12px',
                        padding: '14px',
                        boxShadow: '3px 3px 0px rgba(30, 37, 43, 0.15)',
                      }}
                    >
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e252b' }}>
                        {cat.title}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {cat.skills.map((s) => (
                          <span
                            key={s.name}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: '#fbf6ea',
                              border: '1.5px solid #1e252b',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#1e252b',
                            }}
                          >
                            <span>{s.name}</span>
                            <span
                              style={{
                                fontSize: '9px',
                                padding: '1px 4px',
                                borderRadius: '4px',
                                backgroundColor: s.level === 'Advanced' ? '#2a9d8f' : '#f4a261',
                                color: '#ffffff',
                                fontWeight: 800,
                              }}
                            >
                              {s.level}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: CONTACT */}
              {activeTab === 'contact' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div
                    style={{
                      padding: '16px',
                      backgroundColor: '#fbf6ea',
                      borderRadius: '12px',
                      border: '2px solid #1e252b',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#1e252b' }}>
                      Let's Connect & Build Together
                    </h3>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#444', lineHeight: '1.5' }}>
                      {PORTFOLIO_DATA.contact.note}
                    </p>
                  </div>

                  {/* Contact Links */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Email Card */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #1e252b',
                        borderRadius: '10px',
                        boxShadow: '2px 2px 0px #1e252b',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Mail size={18} color="#e76f51" />
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>EMAIL</div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e252b' }}>
                            {PORTFOLIO_DATA.owner.email}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={handleCopyEmail}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#ffffff',
                            border: '1.5px solid #1e252b',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {copied ? <Check size={12} color="#2a9d8f" /> : <Copy size={12} />}
                          <span>{copied ? 'COPIED!' : 'COPY'}</span>
                        </button>
                        <a
                          href={`mailto:${PORTFOLIO_DATA.owner.email}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#f4c430',
                            border: '1.5px solid #1e252b',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#1e252b',
                            textDecoration: 'none',
                          }}
                        >
                          <span>SEND</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>

                    {/* GitHub Card */}
                    <a
                      href={PORTFOLIO_DATA.owner.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #1e252b',
                        borderRadius: '10px',
                        boxShadow: '2px 2px 0px #1e252b',
                        textDecoration: 'none',
                        color: '#1e252b',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Github size={18} />
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>GITHUB</div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700 }}>
                            github.com/shivkumar077
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={14} />
                    </a>

                    {/* LinkedIn Card */}
                    <a
                      href={PORTFOLIO_DATA.owner.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #1e252b',
                        borderRadius: '10px',
                        boxShadow: '2px 2px 0px #1e252b',
                        textDecoration: 'none',
                        color: '#1e252b',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Linkedin size={18} color="#0077b5" />
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#888' }}>LINKEDIN</div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700 }}>
                            linkedin.com/in/shivkumar077
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
