import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Sparkles,
  Instagram,
} from 'lucide-react';

export const SHIV_EMAIL = 'shivkumar6990655@gmail.com';

/**
 * Opens Gmail compose:
 * - On PC: Opens web Gmail compose in a new tab with recipient pre-filled
 * - On Mobile (phone/tablet): Opens the native Gmail app directly
 */
export function openShivGmail(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua));

  if (isMobile) {
    const isAndroid = /Android/i.test(ua);
    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua));

    if (isAndroid) {
      window.location.href = `intent://co?to=${encodeURIComponent(SHIV_EMAIL)}#Intent;scheme=googlegmail;package=com.google.android.gm;fallback=mailto:${encodeURIComponent(SHIV_EMAIL)};end`;
    } else if (isIOS) {
      const start = Date.now();
      window.location.href = `googlegmail:///co?to=${encodeURIComponent(SHIV_EMAIL)}`;
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.location.href = `mailto:${SHIV_EMAIL}`;
        }
      }, 500);
    } else {
      window.location.href = `googlegmail:///co?to=${encodeURIComponent(SHIV_EMAIL)}`;
      setTimeout(() => {
        window.location.href = `mailto:${SHIV_EMAIL}`;
      }, 500);
    }
  } else {
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SHIV_EMAIL)}`;
    window.open(webGmailUrl, '_blank', 'noopener,noreferrer');
  }
}

// Crisp official X (formerly Twitter) icon
const XIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export type PortfolioSection = 'about' | 'education' | 'experience' | 'projects' | 'skills' | 'contact' | 'cv';

const SECTION_COURIER: Record<PortfolioSection, { name: string; icon: string }> = {
  about: { name: 'Mountain Ranger', icon: '👤' },
  education: { name: 'Doctor Frebi', icon: '🎓' },
  experience: { name: 'Executive Lead', icon: '💼' },
  projects: { name: 'Hacker Girl', icon: '📂' },
  skills: { name: 'Systems Engineer', icon: '⚡' },
  contact: { name: 'Dave the Musician', icon: '📬' },
  cv: { name: 'Soto the Fox', icon: '🦊' },
};

interface LetterModalProps {
  isOpen: boolean;
  section: PortfolioSection;
  onClose: () => void;
  onSelectSection?: (section: PortfolioSection) => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({
  isOpen,
  section,
  onClose,
}) => {
  const [projectPage, setProjectPage] = useState(0);
  const [cvViewMode, setCvViewMode] = useState<'doc' | 'pdf'>('doc');

  if (!isOpen) return null;

  const PROJECTS = [
    {
      index: '01',
      tag: 'FINANCIAL ENGINEERING',
      title: 'Shadow Exchange',
      subtitle: 'Stock Exchange Simulator & ATS Dark Pool',
      status: 'LIVE',
      tech: ['Java 21', 'Spring Boot 3.4', 'React 18', 'TypeScript', 'Neon PostgreSQL', 'STOMP WebSockets'],
      metric: '168 Automated Tests · 28 Instruments · In-Memory FIFO Matching Engine',
      description:
        'A simulated institutional equities exchange and alternative trading system (ATS) dark market terminal built to replicate the microstructure of modern electronic communication networks (ECNs). Features sub-millisecond in-memory matching, hidden liquidity crossing, and continuous tick-by-tick Level-2 streaming over persistent WebSockets.',
      features: [
        'High-throughput in-memory FIFO price-time priority limit order book',
        'Hidden liquidity crossing & dark pool execution matching',
        'Persistent Level-2 STOMP WebSockets for tick-by-tick real-time streaming',
        'Concurrency-aware architecture with 168 automated regression tests',
      ],
      liveUrl: 'https://shadow-exchange-live.vercel.app/',
      githubUrl: 'https://github.com/shivkumar077/Shadow-Exchange',
    },
    {
      index: '02',
      tag: 'AEROSPACE SIMULATION',
      title: 'ASTRA',
      subtitle: 'Aerospace Telemetry Streaming & Mission Operations Platform',
      status: 'LIVE',
      tech: ['Java 21', 'Spring Boot 3.3', 'React 18', 'TypeScript', 'Three.js', 'Neon PostgreSQL', 'NASA APIs'],
      metric: '5 Hz Telemetry Streaming · 5 Keplerian Orbital Destinations · 6-Domain Failure Lab',
      description:
        'An aerospace telemetry streaming and spacecraft operations platform designed for simulated space missions. Couples continuous mathematical orbital mechanics propagation with an interactive 3D WebGL mission control console, streaming real-time attitude quaternions, thermal gradients, propulsion delta-v, and power budgets.',
      features: [
        'Two-body Keplerian orbital element propagation engine across 5 orbital destinations',
        'Real-time 5 Hz telemetry feed streaming attitude quaternions and delta-v',
        'Interactive Three.js WebGL 3D mission control viewport with orbital ellipses',
        '6-domain subsystem anomaly and failure simulation diagnostic suite',
      ],
      liveUrl: 'https://astra-nine-liart.vercel.app/',
      githubUrl: 'https://github.com/shivkumar077/Astra',
    },
    {
      index: '03',
      tag: 'RELIABILITY ENGINEERING',
      title: 'ForgeFit',
      subtitle: 'API Resilience Testing Toolkit & Live Operations Console',
      status: 'LIVE',
      tech: ['Python 3.12', 'FastAPI', 'React 18', 'TypeScript', 'Tailwind CSS', 'Prometheus / OTel'],
      metric: 'Deterministic Fault Injection · Dynamic Deadline Clamping · OS fsync Guarantees',
      description:
        'A Python-based API resilience testing toolkit and interactive live operations console engineered to simulate service degradation, inject controlled latency patterns, and evaluate application stability under hostile network conditions. Couples deterministic pseudo-random fault schedules with loopback-guarded pipelines and automated run comparison.',
      features: [
        'Controlled latency injection & pseudo-random fault schedules (step, linear ramp, constant)',
        'Dynamic socket timeout recalculation clamped to remaining scenario deadlines',
        'Microsecond-resolution telemetry exported to Prometheus & OpenTelemetry OTLP',
        'Automated run comparison engine with divergence detection and delta metrics',
      ],
      liveUrl: 'https://forge-fit-gilt.vercel.app/',
      githubUrl: 'https://github.com/shivkumar077/ForgeFit',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10005,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 2.5vw, 16px)',
        backgroundColor: 'rgba(20, 28, 34, 0.45)',
        backdropFilter: 'blur(3px)',
        pointerEvents: 'auto',
        animation: 'letterOverlayFadeIn 0.2s ease',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Hand-drawn Storybook Letter Parchment */}
      <div
        className="portfolio-letter-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: section === 'cv' ? '820px' : '720px',
          maxHeight: '90vh',
          backgroundColor: '#fffef9',
          borderRadius: '20px',
          border: '3px solid #1e252b',
          boxShadow: '6px 6px 0px #1e252b',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
          fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif",
          animation: 'letterCardPop 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Top Header / Letter Postage Stamp Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px clamp(12px, 3vw, 20px)',
            backgroundColor: '#fbf5e6',
            borderBottom: '2.5px solid #1e252b',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Section Stamp Pill & Courier Attribution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: '#f4c430',
                color: '#1e252b',
                border: '1.5px solid #1e252b',
                borderRadius: '8px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '2px 2px 0px #1e252b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✉ LETTER · {section.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: '12px',
                color: '#65737e',
                fontWeight: 600,
              }}
            >
              From: Shiv Kumar · Delivered by {SECTION_COURIER[section]?.name || 'Courier'} {SECTION_COURIER[section]?.icon}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Letter"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #1e252b',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #1e252b',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f4c430';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={18} strokeWidth={2.8} color="#1e252b" />
          </button>
        </div>

        {/* Scrollable Letter Body */}
        <div
          className="portfolio-letter-body"
          style={{
            padding: 'clamp(14px, 3.5vw, 24px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxSizing: 'border-box',
          }}
        >
          {/* SECTION: ABOUT */}
          {section === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    backgroundColor: '#f4c430',
                    border: '2px solid #1e252b',
                    boxShadow: '3px 3px 0px #1e252b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}
                >
                  👨‍💻
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#1e252b',
                      margin: 0,
                      lineHeight: 1.1,
                    }}
                  >
                    Shiv Kumar
                  </h2>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#55636d',
                      fontWeight: 600,
                      margin: '4px 0 0 0',
                    }}
                  >
                    Computer Science & Cloud Computing · Techno India University, Kolkata
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#fcf8ee',
                  border: '2px solid #1e252b',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  boxShadow: '3px 3px 0px #1e252b',
                  fontSize: '14.5px',
                  lineHeight: '1.65',
                  color: '#283138',
                }}
              >
                <p style={{ margin: '0 0 12px 0' }}>
                  <strong>Computer Science, cloud infrastructure, and distributed systems.</strong>
                </p>
                <p style={{ margin: '0 0 12px 0' }}>
                  I'm interested in what happens when ideas meet real-world constraints — when systems have to scale,
                  algorithms have to prove themselves, and software has to work beyond the demo. Most of what I build is
                  an attempt to explore those boundaries in public.
                </p>
                <p style={{ margin: 0 }}>
                  Right now that means pursuing Computer Science specialized in Cloud Computing at Techno India University,
                  developing high-throughput Java systems, order matching engines, and telemetry platforms. Alongside coursework,
                  I design and ship production-grade software — evaluation tooling, cloud microservices, and simulations.
                </p>
              </div>

              {/* Key Badges & Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#65737e', fontWeight: 700, textTransform: 'uppercase' }}>
                    Location
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <MapPin size={16} color="#d9534f" />
                    <strong style={{ fontSize: '13.5px', color: '#1e252b' }}>Bidhannagar, Sector V, Kolkata</strong>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#65737e', fontWeight: 700, textTransform: 'uppercase' }}>
                    Focus Areas
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Sparkles size={16} color="#f4c430" />
                    <strong style={{ fontSize: '13.5px', color: '#1e252b' }}>Java, Distributed Systems, Cloud</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
                <a
                  href="https://github.com/shivkumar077"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Github size={15} /> GitHub Profile ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/shiv-kumar-399a32231/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ExternalLink size={15} /> LinkedIn ↗
                </a>
                <a
                  href="https://x.com/nightcore_077"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <XIcon size={14} /> X ↗
                </a>
                <a
                  href="https://www.instagram.com/nightcore_077/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Instagram size={15} color="#e1306c" /> Instagram ↗
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=shivkumar6990655@gmail.com"
                  onClick={openShivGmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Gmail (Web on PC / App on Phone)"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#f4c430',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Mail size={15} /> Email Shiv →
                </a>
              </div>
            </div>
          )}

          {/* SECTION: EDUCATION */}
          {section === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#8cc48c',
                    border: '2px solid #1e252b',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  🎓
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e252b', margin: 0 }}>
                    Education & Credentials
                  </h2>
                  <p style={{ fontSize: '13px', color: '#55636d', fontWeight: 600, margin: '2px 0 0 0' }}>
                    Academic Foundations in Computer Science & Engineering
                  </p>
                </div>
              </div>

              {/* Education Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 01: Techno India University */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    boxShadow: '3px 3px 0px #1e252b',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          backgroundColor: '#f4c430',
                          border: '1.5px solid #1e252b',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#1e252b',
                        }}
                      >
                        01
                      </span>
                      <strong style={{ fontSize: '16px', color: '#1e252b' }}>Techno India University</strong>
                    </div>
                    <span
                      style={{
                        backgroundColor: '#e7f3ee',
                        color: '#2d6a4f',
                        border: '1.5px solid #2d6a4f',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      2024 — PRESENT (EXPECTED 2028)
                    </span>
                  </div>

                  <p style={{ margin: '8px 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1e252b' }}>
                    B.Tech in Computer Science & Engineering — Specialization in Cloud Computing
                  </p>
                  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#55636d' }}>
                    Kolkata, India · <strong>CGPA: 7.65</strong>
                  </p>

                  <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#333e48', margin: '0 0 10px 0' }}>
                    • Specializing in Cloud Computing architectures, scalable backend systems, and distributed infrastructure.
                    <br />• Rigorous coursework in Java Enterprise Development, Operating Systems, Database Management Systems, and Computer Networks.
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Cloud Computing', 'Java 21', 'Distributed Systems', 'Spring Boot', 'Data Structures'].map((t) => (
                      <span
                        key={t}
                        style={{
                          backgroundColor: '#f6f6f4',
                          border: '1px solid #1e252b',
                          borderRadius: '6px',
                          padding: '2px 7px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#1e252b',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 02: Bright Career School */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    boxShadow: '3px 3px 0px #1e252b',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          backgroundColor: '#f2ebd9',
                          border: '1.5px solid #1e252b',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#1e252b',
                        }}
                      >
                        02
                      </span>
                      <strong style={{ fontSize: '16px', color: '#1e252b' }}>Bright Career School</strong>
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#65737e' }}>2021 — 2023</span>
                  </div>

                  <p style={{ margin: '8px 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1e252b' }}>
                    Higher Secondary School (Class 11th — 12th) · Science Stream (PCM)
                  </p>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#55636d' }}>
                    Kolkata, India · Rigorous curriculum in Physics, Chemistry, and Mathematics (PCM).
                  </p>
                </div>

                {/* 03: Mount Zion School */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    boxShadow: '3px 3px 0px #1e252b',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          backgroundColor: '#f2ebd9',
                          border: '1.5px solid #1e252b',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#1e252b',
                        }}
                      >
                        03
                      </span>
                      <strong style={{ fontSize: '16px', color: '#1e252b' }}>Mount Zion School</strong>
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#65737e' }}>2013 — 2021</span>
                  </div>

                  <p style={{ margin: '8px 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1e252b' }}>
                    Secondary & Middle Schooling (Class 3rd — 10th)
                  </p>
                  <p style={{ margin: '0', fontSize: '13px', color: '#55636d' }}>
                    Kolkata, India · Foundational curriculum in analytical sciences, mathematics, and computing fundamentals.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: EXPERIENCE */}
          {section === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#c25959',
                    color: '#ffffff',
                    border: '2px solid #1e252b',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  💼
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e252b', margin: 0 }}>
                    Professional Experience
                  </h2>
                  <p style={{ fontSize: '13px', color: '#55636d', fontWeight: 600, margin: '2px 0 0 0' }}>
                    Roles, Institutions & Industry Practice
                  </p>
                </div>
              </div>

              {/* Exact user-requested text: 'scqthatic' */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '2.5px solid #1e252b',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '4px 4px 0px #1e252b',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  minHeight: '180px',
                }}
              >
                <span
                  style={{
                    backgroundColor: '#fbf5e6',
                    color: '#1e252b',
                    border: '1.5px solid #1e252b',
                    borderRadius: '8px',
                    padding: '3px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  CURRENT ENGAGEMENT
                </span>

                <h3
                  style={{
                    fontSize: '34px',
                    fontWeight: 800,
                    color: '#1e252b',
                    margin: 0,
                    letterSpacing: '0.04em',
                    textTransform: 'lowercase',
                    fontFamily: "'Chakra Petch', 'Fredoka', sans-serif",
                  }}
                >
                  scqthatic
                </h3>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#65737e',
                    fontWeight: 600,
                    margin: 0,
                    maxWidth: '400px',
                  }}
                >
                  Systems, Reliability & Backend Development
                </p>
              </div>
            </div>
          )}

          {/* SECTION: PROJECTS (Multi-page Storybook Letter!) */}
          {section === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Header with Project Index */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: '#66BDE6',
                      border: '2px solid #1e252b',
                      boxShadow: '2.5px 2.5px 0px #1e252b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                    }}
                  >
                    📂
                  </div>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e252b', margin: 0 }}>
                      Featured Projects
                    </h2>
                    <p style={{ fontSize: '13px', color: '#55636d', fontWeight: 600, margin: '2px 0 0 0' }}>
                      Page {projectPage + 1} of {PROJECTS.length} · {PROJECTS[projectPage].tag}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    backgroundColor: '#f4c430',
                    color: '#1e252b',
                    border: '1.5px solid #1e252b',
                    borderRadius: '8px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: 800,
                    boxShadow: '2px 2px 0px #1e252b',
                  }}
                >
                  W-0{projectPage + 1}
                </span>
              </div>

              {/* Single Project Display Card */}
              {(() => {
                const proj = PROJECTS[projectPage];
                return (
                  <div
                    key={proj.title}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '2.5px solid #1e252b',
                      borderRadius: '16px',
                      padding: '20px 22px',
                      boxShadow: '4px 4px 0px #1e252b',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      animation: 'projectSlideIn 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            color: '#d9534f',
                            textTransform: 'uppercase',
                          }}
                        >
                          {proj.tag}
                        </span>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e252b', margin: '2px 0 0 0' }}>
                          {proj.title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#55636d', fontWeight: 600, margin: '2px 0 0 0' }}>
                          {proj.subtitle}
                        </p>
                      </div>

                      <span
                        style={{
                          backgroundColor: '#e7f3ee',
                          color: '#2d6a4f',
                          border: '1.5px solid #2d6a4f',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        ● {proj.status}
                      </span>
                    </div>

                    {/* Metric Highlight */}
                    <div
                      style={{
                        backgroundColor: '#fbf5e6',
                        border: '1.5px solid #1e252b',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#1e252b',
                      }}
                    >
                      ⚡ {proj.metric}
                    </div>

                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#2b333a', margin: 0 }}>
                      {proj.description}
                    </p>

                    {/* Feature Bullets */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {proj.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: '#3e4850' }}>
                          <span style={{ color: '#f4c430', fontWeight: 900 }}>✦</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            backgroundColor: '#f2ebd9',
                            border: '1.5px solid #1e252b',
                            borderRadius: '6px',
                            padding: '2px 8px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#1e252b',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions: Live Demo & GitHub */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingTop: '6px', borderTop: '1.5px dashed rgba(30, 37, 43, 0.15)' }}>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            backgroundColor: '#f4c430',
                            border: '2px solid #1e252b',
                            borderRadius: '10px',
                            boxShadow: '2px 2px 0px #1e252b',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: '#1e252b',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <ExternalLink size={14} /> Open Live Demo ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            backgroundColor: '#ffffff',
                            border: '2px solid #1e252b',
                            borderRadius: '10px',
                            boxShadow: '2px 2px 0px #1e252b',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: '#1e252b',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Github size={14} /> View Source Code ↗
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Bottom Pagination Bar (Swap through projects) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#fbf5e6',
                  border: '2px solid #1e252b',
                  borderRadius: '14px',
                  boxShadow: '2.5px 2.5px 0px #1e252b',
                }}
              >
                <button
                  disabled={projectPage === 0}
                  onClick={() => setProjectPage((prev) => Math.max(0, prev - 1))}
                  aria-label="Previous Project"
                  title="Previous Project"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    backgroundColor: projectPage === 0 ? '#ebe7dc' : '#ffffff',
                    border: '1.5px solid #1e252b',
                    borderRadius: '8px',
                    boxShadow: projectPage === 0 ? 'none' : '1.5px 1.5px 0px #1e252b',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: projectPage === 0 ? '#999' : '#1e252b',
                    cursor: projectPage === 0 ? 'not-allowed' : 'pointer',
                    opacity: projectPage === 0 ? 0.6 : 1,
                    flexShrink: 0,
                  }}
                >
                  <ChevronLeft size={16} />
                  <span className="project-btn-label">Prev</span>
                </button>

                {/* Page Indicator Bubbles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setProjectPage(i)}
                      style={{
                        width: projectPage === i ? '22px' : '10px',
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: projectPage === i ? '#f4c430' : '#d5cfc0',
                        border: '1.5px solid #1e252b',
                        padding: 0,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      title={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  disabled={projectPage === PROJECTS.length - 1}
                  onClick={() => setProjectPage((prev) => Math.min(PROJECTS.length - 1, prev + 1))}
                  aria-label="Next Project"
                  title="Next Project"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    backgroundColor: projectPage === PROJECTS.length - 1 ? '#ebe7dc' : '#f4c430',
                    border: '1.5px solid #1e252b',
                    borderRadius: '8px',
                    boxShadow: projectPage === PROJECTS.length - 1 ? 'none' : '1.5px 1.5px 0px #1e252b',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: projectPage === PROJECTS.length - 1 ? '#999' : '#1e252b',
                    cursor: projectPage === PROJECTS.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: projectPage === PROJECTS.length - 1 ? 0.6 : 1,
                    flexShrink: 0,
                  }}
                >
                  <span className="project-btn-label">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* SECTION: SKILLS */}
          {section === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#f3c258',
                    border: '2px solid #1e252b',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  ⚡
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e252b', margin: 0 }}>
                    Technical Skills & Stack
                  </h2>
                  <p style={{ fontSize: '13px', color: '#55636d', fontWeight: 600, margin: '2px 0 0 0' }}>
                    Core Engineering Capabilities & Technologies
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px',
                }}
              >
                {/* Languages */}
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1e252b', borderRadius: '12px', padding: '14px', boxShadow: '2.5px 2.5px 0px #1e252b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Code size={16} color="#d9534f" />
                    <strong style={{ fontSize: '14px', color: '#1e252b' }}>Languages</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Java 21', 'Python', 'C++', 'SQL', 'TypeScript', 'JavaScript'].map((s) => (
                      <span key={s} style={{ backgroundColor: '#fbf5e6', border: '1px solid #1e252b', borderRadius: '6px', padding: '2px 7px', fontSize: '11.5px', fontWeight: 700, color: '#1e252b' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1e252b', borderRadius: '12px', padding: '14px', boxShadow: '2.5px 2.5px 0px #1e252b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Briefcase size={16} color="#2d6a4f" />
                    <strong style={{ fontSize: '14px', color: '#1e252b' }}>Backend & Architecture</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Spring Boot 3', 'Spring Data JPA', 'REST APIs', 'STOMP WebSockets', 'FastAPI', 'Microservices'].map((s) => (
                      <span key={s} style={{ backgroundColor: '#e7f3ee', border: '1px solid #1e252b', borderRadius: '6px', padding: '2px 7px', fontSize: '11.5px', fontWeight: 700, color: '#1e252b' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1e252b', borderRadius: '12px', padding: '14px', boxShadow: '2.5px 2.5px 0px #1e252b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <BookOpen size={16} color="#66BDE6" />
                    <strong style={{ fontSize: '14px', color: '#1e252b' }}>Databases & Storage</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['PostgreSQL', 'Neon Serverless', 'Supabase', 'Redis', 'Flyway'].map((s) => (
                      <span key={s} style={{ backgroundColor: '#eef6fb', border: '1px solid #1e252b', borderRadius: '6px', padding: '2px 7px', fontSize: '11.5px', fontWeight: 700, color: '#1e252b' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Frontend & 3D */}
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1e252b', borderRadius: '12px', padding: '14px', boxShadow: '2.5px 2.5px 0px #1e252b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Sparkles size={16} color="#f4c430" />
                    <strong style={{ fontSize: '14px', color: '#1e252b' }}>Frontend & 3D WebGL</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['React 18', 'Three.js', 'WebGL', 'GLSL Shaders', 'Tailwind CSS', 'Vite'].map((s) => (
                      <span key={s} style={{ backgroundColor: '#fff9e6', border: '1px solid #1e252b', borderRadius: '6px', padding: '2px 7px', fontSize: '11.5px', fontWeight: 700, color: '#1e252b' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DevOps & Tools */}
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1e252b', borderRadius: '12px', padding: '14px', boxShadow: '2.5px 2.5px 0px #1e252b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Award size={16} color="#8a5cd0" />
                    <strong style={{ fontSize: '14px', color: '#1e252b' }}>DevOps & Tools</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Postman', 'Prometheus', 'OpenTelemetry'].map((s) => (
                      <span key={s} style={{ backgroundColor: '#f4eefb', border: '1px solid #1e252b', borderRadius: '6px', padding: '2px 7px', fontSize: '11.5px', fontWeight: 700, color: '#1e252b' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Systems */}
                <div style={{ backgroundColor: '#ffffff', border: '2px solid #1e252b', borderRadius: '12px', padding: '14px', boxShadow: '2.5px 2.5px 0px #1e252b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Code size={16} color="#333" />
                    <strong style={{ fontSize: '14px', color: '#1e252b' }}>Core Engineering Concepts</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['DSA', 'OOP', 'DBMS', 'OS', 'Low-Latency Matching', 'Concurrency', 'Telemetry'].map((s) => (
                      <span key={s} style={{ backgroundColor: '#f2f2f0', border: '1px solid #1e252b', borderRadius: '6px', padding: '2px 7px', fontSize: '11.5px', fontWeight: 700, color: '#1e252b' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CONTACT */}
          {section === 'contact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#de794e',
                    border: '2px solid #1e252b',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  📬
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e252b', margin: 0 }}>
                    Get In Touch
                  </h2>
                  <p style={{ fontSize: '13px', color: '#55636d', fontWeight: 600, margin: '2px 0 0 0' }}>
                    Let's Build Something Interesting
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '2.5px solid #1e252b',
                  borderRadius: '16px',
                  padding: 'clamp(14px, 3.5vw, 20px)',
                  boxShadow: '3.5px 3.5px 0px #1e252b',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  maxWidth: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, maxWidth: '100%' }}>
                  <Mail size={18} color="#f4c430" style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                    <span style={{ fontSize: '11px', color: '#65737e', fontWeight: 700, textTransform: 'uppercase' }}>Direct Email</span>
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=shivkumar6990655@gmail.com"
                        onClick={openShivGmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in Gmail (Web on PC / App on Phone)"
                        style={{
                          fontSize: 'clamp(11.5px, 3.4vw, 15px)',
                          fontWeight: 700,
                          color: '#1e252b',
                          textDecoration: 'underline',
                          textDecorationColor: '#f4c430',
                          textUnderlineOffset: '3px',
                          display: 'block',
                          wordBreak: 'break-all',
                          overflowWrap: 'anywhere',
                          maxWidth: '100%',
                        }}
                      >
                        shivkumar6990655@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} color="#2d6a4f" />
                  <div>
                    <span style={{ fontSize: '11px', color: '#65737e', fontWeight: 700, textTransform: 'uppercase' }}>Mobile Phone</span>
                    <div>
                      <a
                        href="tel:+917481865054"
                        style={{ fontSize: '15px', fontWeight: 700, color: '#1e252b', textDecoration: 'none' }}
                      >
                        +91-7481865054
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="#d9534f" />
                  <div>
                    <span style={{ fontSize: '11px', color: '#65737e', fontWeight: 700, textTransform: 'uppercase' }}>Current Location</span>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#1e252b' }}>
                      Bidhannagar, Sector V, Kolkata, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=shivkumar6990655@gmail.com"
                  onClick={openShivGmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Gmail (Web on PC / App on Phone)"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    backgroundColor: '#f4c430',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2.5px 2.5px 0px #1e252b',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Mail size={16} /> Email Shiv →
                </a>
                <a
                  href="https://x.com/nightcore_077"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (formerly Twitter) @nightcore_077"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <XIcon size={15} /> X (@nightcore_077) ↗
                </a>
                <a
                  href="https://www.instagram.com/nightcore_077/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram @nightcore_077"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Instagram size={16} color="#e1306c" /> Instagram ↗
                </a>
                <a
                  href="https://github.com/shivkumar077"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Github size={16} /> GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/shiv-kumar-399a32231/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0px #1e252b',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1e252b',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ExternalLink size={16} /> LinkedIn ↗
                </a>
              </div>
            </div>
          )}

          {/* SECTION: CV DOCUMENT (Read Directly Without Downloading!) */}
          {section === 'cv' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#f4c430',
                      border: '2px solid #1e252b',
                      boxShadow: '2px 2px 0px #1e252b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}
                  >
                    📄
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 800, color: '#1e252b', margin: 0, lineHeight: 1.2 }}>
                      Curriculum Vitae
                    </h2>
                    <p style={{ fontSize: '11.5px', color: '#65737e', fontWeight: 600, margin: '2px 0 0 0', lineHeight: 1.2 }}>
                      Shiv Kumar · Systems & Cloud
                    </p>
                  </div>
                </div>

                {/* View Mode Toggle & Download Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      display: 'flex',
                      backgroundColor: '#f2ebd9',
                      borderRadius: '8px',
                      border: '1.5px solid #1e252b',
                      padding: '2px',
                    }}
                  >
                    <button
                      onClick={() => setCvViewMode('doc')}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: cvViewMode === 'doc' ? '#ffffff' : 'transparent',
                        fontWeight: 700,
                        fontSize: '11px',
                        color: '#1e252b',
                        boxShadow: cvViewMode === 'doc' ? '1px 1px 0px #1e252b' : 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Article View
                    </button>
                    <button
                      onClick={() => setCvViewMode('pdf')}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: cvViewMode === 'pdf' ? '#ffffff' : 'transparent',
                        fontWeight: 700,
                        fontSize: '11px',
                        color: '#1e252b',
                        boxShadow: cvViewMode === 'pdf' ? '1px 1px 0px #1e252b' : 'none',
                        cursor: 'pointer',
                      }}
                    >
                      PDF View
                    </button>
                  </div>

                  <a
                    href="/Shiv_Kumar_CV.pdf"
                    download="Shiv_Kumar_CV.pdf"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 10px',
                      backgroundColor: '#f4c430',
                      border: '1.5px solid #1e252b',
                      borderRadius: '8px',
                      boxShadow: '1.5px 1.5px 0px #1e252b',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#1e252b',
                      textDecoration: 'none',
                    }}
                  >
                    <Download size={13} strokeWidth={2.8} /> Download
                  </a>
                </div>
              </div>

              {/* View 1: Formatted Document View */}
              {cvViewMode === 'doc' ? (
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #1e252b',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '3px 3px 0px #1e252b',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    fontSize: '13.5px',
                    lineHeight: '1.6',
                    color: '#283138',
                  }}
                >
                  {/* Top Bar of CV */}
                  <div style={{ borderBottom: '2px solid #1e252b', paddingBottom: '12px' }}>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#1e252b' }}>
                      Shiv Kumar
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12.5px', color: '#55636d', fontWeight: 600 }}>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=shivkumar6990655@gmail.com"
                        onClick={openShivGmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in Gmail (Web on PC / App on Phone)"
                        style={{ color: '#1e252b', textDecoration: 'none', fontWeight: 700 }}
                      >
                        ✉ shivkumar6990655@gmail.com
                      </a>
                      <span>📞 +91-7481865054</span>
                      <span>📍 Kolkata, India</span>
                      <a href="https://github.com/shivkumar077" target="_blank" rel="noopener noreferrer" style={{ color: '#1e252b', fontWeight: 700 }}>
                        GitHub ↗
                      </a>
                      <a href="https://www.linkedin.com/in/shiv-kumar-399a32231/" target="_blank" rel="noopener noreferrer" style={{ color: '#1e252b', fontWeight: 700 }}>
                        LinkedIn ↗
                      </a>
                      <a href="https://x.com/nightcore_077" target="_blank" rel="noopener noreferrer" style={{ color: '#1e252b', fontWeight: 700 }}>
                        X ↗
                      </a>
                      <a href="https://www.instagram.com/nightcore_077/" target="_blank" rel="noopener noreferrer" style={{ color: '#1e252b', fontWeight: 700 }}>
                        Instagram ↗
                      </a>
                    </div>
                  </div>

                  {/* Profile */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1e252b', margin: '0 0 6px 0' }}>
                      Profile
                    </h4>
                    <p style={{ margin: 0 }}>
                      Computer Science and Engineering undergraduate specializing in Cloud Computing, with interests in backend engineering, distributed systems, simulation platforms, and scalable software architecture. Experienced with Java, Spring Boot, Python, SQL, and modern web technologies, with project work spanning stock-exchange simulation and satellite mission visualization.
                    </p>
                  </div>

                  {/* Education */}
                  <div style={{ borderTop: '1px dashed #d5cfc0', paddingTop: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1e252b', margin: '0 0 6px 0' }}>
                      Education
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <strong>Techno India University — Kolkata, India</strong>
                      <span style={{ color: '#65737e', fontWeight: 600 }}>Expected 2028</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#44515b' }}>
                      B.Tech. in Computer Science and Engineering – Cloud Computing; <strong>CGPA: 7.65</strong>
                    </div>
                  </div>

                  {/* Skills Summary */}
                  <div style={{ borderTop: '1px dashed #d5cfc0', paddingTop: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1e252b', margin: '0 0 6px 0' }}>
                      Skills Summary
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <li><strong>Languages:</strong> Java, Python, C++, SQL, TypeScript, JavaScript</li>
                      <li><strong>Backend:</strong> Spring Boot, Spring Data JPA, REST APIs, STOMP WebSockets</li>
                      <li><strong>Databases:</strong> PostgreSQL, Supabase, Redis</li>
                      <li><strong>Frontend:</strong> TypeScript, React, Tailwind CSS, Three.js</li>
                      <li><strong>Tools & DevOps:</strong> Git, GitHub, Postman, Docker, Kubernetes</li>
                      <li><strong>Core Concepts:</strong> Data Structures & Algorithms, Object-Oriented Programming, DBMS, Backend Architecture</li>
                    </ul>
                  </div>

                  {/* Projects */}
                  <div style={{ borderTop: '1px dashed #d5cfc0', paddingTop: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1e252b', margin: '0 0 6px 0' }}>
                      Featured Projects
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <strong>ASTRA – Satellite Operations and Mission Simulation</strong>
                        <div style={{ fontSize: '12px', color: '#65737e' }}>TypeScript, React, Three.js, Supabase, NASA APIs</div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>
                          Interactive satellite mission simulation platform combining spacecraft visualization, telemetry monitoring, satellite health indicators, and simulated anomaly scenarios.
                        </p>
                      </div>

                      <div>
                        <strong>Shadow Exchange – Stock Exchange Simulator</strong>
                        <div style={{ fontSize: '12px', color: '#65737e' }}>Java 21, Spring Boot, PostgreSQL, STOMP WebSockets</div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>
                          Simulated institutional stock exchange with RESTful APIs, in-memory price-time priority matching engine, dark pool cross-order executions, and tick-by-tick Level-2 WebSocket streaming.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* View 2: Embedded PDF Viewer */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '6px',
                      backgroundColor: '#fbf5e6',
                      border: '1.5px solid #1e252b',
                      borderRadius: '10px',
                      padding: '6px 12px',
                      fontSize: '11.5px',
                      color: '#1e252b',
                      fontWeight: 600,
                    }}
                  >
                    <span>💡 Switch to <strong>Article View</strong> for mobile reading.</span>
                    <a
                      href="/Shiv_Kumar_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1e252b', fontWeight: 800, textDecoration: 'underline' }}
                    >
                      Open Full PDF ↗
                    </a>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '2.5px solid #1e252b',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      height: 'clamp(320px, 58vh, 560px)',
                      boxShadow: '3px 3px 0px #1e252b',
                    }}
                  >
                    <iframe
                      src="/Shiv_Kumar_CV.pdf#toolbar=0&navpanes=0&view=FitH"
                      title="Shiv Kumar CV Document"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .portfolio-letter-card {
          overflow-x: hidden !important;
        }
        .portfolio-letter-card * {
          max-width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .project-btn-label {
            display: none !important;
          }
        }
        @keyframes letterOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes letterCardPop {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes projectSlideIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
