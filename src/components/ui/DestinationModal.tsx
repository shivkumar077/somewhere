import React, { useEffect } from 'react';
import { BuildingItem } from '../../world/types';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { X, ExternalLink, BookOpen, GraduationCap, Wrench, Sparkles, Code2, Mail, Check, Github, Linkedin } from 'lucide-react';

interface DestinationModalProps {
  building: BuildingItem | null;
  onClose: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({ building, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!building || !building.destinationRole) return null;

  const role = building.destinationRole;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="destination-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 16, 14, 0.55)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#fffdfa',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.22)',
          border: '3px solid #faedcd',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#faedcd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #ecd9b7',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e76f51',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              {role === 'about' && <Sparkles size={20} />}
              {role === 'education' && <GraduationCap size={20} />}
              {role === 'experience' && <Wrench size={20} />}
              {role === 'projects' && <Code2 size={20} />}
              {role === 'skills' && <BookOpen size={20} />}
              {role === 'contact' && <Mail size={20} />}
            </div>
            <div>
              <h2
                id="destination-title"
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontFamily: "'Fredoka', sans-serif",
                  color: '#3d312a',
                }}
              >
                {building.name}
              </h2>
              <span style={{ fontSize: '12px', color: '#7f6f62', fontWeight: 500 }}>
                {building.description}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#5c4d3c',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* 1. ABOUT ME */}
          {role === 'about' && (
            <div>
              <p style={{ fontSize: '15px', color: '#4a3b32', lineHeight: 1.6, marginTop: 0 }}>
                {PORTFOLIO_DATA.about.intro}
              </p>
              {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
                <p key={idx} style={{ fontSize: '14px', color: '#5c4d3c', lineHeight: 1.6 }}>
                  {p}
                </p>
              ))}

              <h4 style={{ fontFamily: "'Fredoka', sans-serif", color: '#3d312a', margin: '20px 0 10px' }}>
                Engineering Passions
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {PORTFOLIO_DATA.about.passions.map((passion, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#f7efe1',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: '#4a3b32',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Check size={16} color="#e76f51" />
                    <span>{passion}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '20px',
                  padding: '14px 18px',
                  backgroundColor: '#edf6f9',
                  borderRadius: '14px',
                  borderLeft: '4px solid #2a9d8f',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  color: '#264653',
                }}
              >
                "{PORTFOLIO_DATA.about.philosophy}"
              </div>
            </div>
          )}

          {/* 2. EDUCATION */}
          {role === 'education' && (
            <div>
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '18px', borderRadius: '16px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Fredoka', sans-serif", color: '#166534' }}>
                  {PORTFOLIO_DATA.education.institution}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#15803d', marginTop: '4px' }}>
                  {PORTFOLIO_DATA.education.degree} in {PORTFOLIO_DATA.education.major}
                </div>
                <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>
                  Specialization: {PORTFOLIO_DATA.education.specialization}
                </div>
              </div>

              <h4 style={{ fontFamily: "'Fredoka', sans-serif", color: '#3d312a', margin: '22px 0 10px' }}>
                Core Academic Coursework
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#5c4d3c', fontSize: '14px', lineHeight: 1.8 }}>
                {PORTFOLIO_DATA.education.coursework.map((course, idx) => (
                  <li key={idx}><strong>{course}</strong></li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. EXPERIENCE */}
          {role === 'experience' && (
            <div>
              <p style={{ fontSize: '14px', color: '#5c4d3c', lineHeight: 1.6, marginTop: 0 }}>
                {PORTFOLIO_DATA.experience.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
                {PORTFOLIO_DATA.experience.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#fbf8f3',
                      border: '1px solid #faedcd',
                      borderRadius: '16px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: "'Fredoka', sans-serif", color: '#3d312a' }}>
                      {pillar.title}
                    </div>
                    <p style={{ fontSize: '13px', color: '#6c584c', margin: '6px 0 10px', lineHeight: 1.5 }}>
                      {pillar.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {pillar.keyFocus.map((focus, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            backgroundColor: '#faedcd',
                            color: '#5c3a21',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '10px',
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

          {/* 4. PROJECTS */}
          {role === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    backgroundColor: '#fefefe',
                    border: '1.5px solid #faedcd',
                    borderRadius: '16px',
                    padding: '18px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 2px', fontSize: '17px', fontFamily: "'Fredoka', sans-serif", color: '#3d312a' }}>
                        {proj.name}
                      </h3>
                      <span style={{ fontSize: '12px', color: '#e76f51', fontWeight: 600 }}>
                        {proj.tagline}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          backgroundColor: proj.status === 'Active' ? '#e0f2fe' : proj.status === 'Complete' ? '#dcfce7' : '#fef3c7',
                          color: proj.status === 'Active' ? '#0369a1' : proj.status === 'Complete' ? '#15803d' : '#b45309',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '10px',
                        }}
                      >
                        {proj.status}
                      </span>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#4a3b32', display: 'flex', alignItems: 'center' }}
                          title="View GitHub repository"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: '#5c4d3c', margin: '10px 0', lineHeight: 1.5 }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {proj.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          backgroundColor: '#f1faee',
                          color: '#1d3557',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '8px',
                          border: '1px solid #e2ece9',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '12px', color: '#7f6f62' }}>
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* 5. SKILLS */}
          {role === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {PORTFOLIO_DATA.skills.map((category, idx) => (
                <div key={idx}>
                  <h4 style={{ fontFamily: "'Fredoka', sans-serif", color: '#3d312a', margin: '0 0 10px', fontSize: '15px' }}>
                    {category.title}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {category.skills.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          backgroundColor: '#fbf8f3',
                          border: '1px solid #faedcd',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '13px', color: '#3d312a', fontWeight: 600 }}>{s.name}</span>
                        <span style={{ fontSize: '10px', color: '#8d5b4c', fontWeight: 700, textTransform: 'uppercase' }}>
                          {s.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. CONTACT */}
          {role === 'contact' && (
            <div>
              <p style={{ fontSize: '14px', color: '#5c4d3c', lineHeight: 1.6, marginTop: 0 }}>
                {PORTFOLIO_DATA.contact.note}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    backgroundColor: '#faedcd',
                    borderRadius: '16px',
                    color: '#4a3b32',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Mail size={20} color="#e76f51" />
                  <span>Email: {PORTFOLIO_DATA.contact.email}</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    backgroundColor: '#edf6f9',
                    borderRadius: '16px',
                    color: '#264653',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Github size={20} color="#2a9d8f" />
                  <span>GitHub: github.com/shivkumar077</span>
                  <ExternalLink size={14} style={{ marginLeft: 'auto' }} />
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    backgroundColor: '#fdf0ed',
                    borderRadius: '16px',
                    color: '#9d0208',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Linkedin size={20} color="#d62828" />
                  <span>LinkedIn: linkedin.com/in/shivkumar077</span>
                  <ExternalLink size={14} style={{ marginLeft: 'auto' }} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
