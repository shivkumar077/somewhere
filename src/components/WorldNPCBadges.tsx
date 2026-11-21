import React, { useEffect, useState, useRef } from 'react';
import { PortfolioSection } from './LetterModal';

interface NPCConfig {
  id: string;
  section: PortfolioSection;
  label: string;
  name: string;
  icon: string;
  fallbackPos: [number, number, number];
  color: string;
}

const NPC_CONFIGS: NPCConfig[] = [
  {
    id: 'threekid',
    section: 'projects',
    label: 'PROJECTS',
    name: 'Hacker Girl',
    icon: '📂',
    fallbackPos: [30.0128, 18.6118, -4.71063],
    color: '#66BDE6',
  },
  {
    id: 'female-scientist',
    section: 'education',
    label: 'EDUCATION',
    name: 'Doctor Frebi',
    icon: '🎓',
    fallbackPos: [-7.46008, -7.60516, -19.6894],
    color: '#8cc48c',
  },
  {
    id: 'boss',
    section: 'experience',
    label: 'EXPERIENCE',
    name: 'Executive Lead',
    icon: '💼',
    fallbackPos: [-4.04907, 1.05824, 25.4517],
    color: '#c25959',
  },
  {
    id: 'mountainman',
    section: 'about',
    label: 'ABOUT',
    name: 'Mountain Ranger',
    icon: '👤',
    fallbackPos: [-8.17226, 32.3472, -1.76941],
    color: '#f4c430',
  },
  {
    id: 'factory-worker-a',
    section: 'skills',
    label: 'SKILLS',
    name: 'Systems Engineer',
    icon: '⚡',
    fallbackPos: [4.16546, 4.2699, -23.5919],
    color: '#f3c258',
  },
  {
    id: 'musician',
    section: 'contact',
    label: 'CONTACT',
    name: 'Dave the Musician',
    icon: '📬',
    fallbackPos: [15.0288, -14.7864, -7.09569],
    color: '#de794e',
  },
  {
    id: 'diver',
    section: 'cv',
    label: 'CV DOCUMENT',
    name: 'Captain Steve',
    icon: '📄',
    fallbackPos: [15.8793, 16.9006, 11.2543],
    color: '#4db6ac',
  },
];

interface ScreenBadge {
  id: string;
  section: PortfolioSection;
  label: string;
  name: string;
  icon: string;
  color: string;
  screenX: number;
  screenY: number;
  distance: number;
  isClose: boolean;
  visible: boolean;
}

interface WorldNPCBadgesProps {
  onOpenLetter: (section: PortfolioSection) => void;
}

export const WorldNPCBadges: React.FC<WorldNPCBadgesProps> = ({ onOpenLetter }) => {
  const [badges, setBadges] = useState<ScreenBadge[]>([]);
  const [deliveryToast, setDeliveryToast] = useState<{ text: string; sub: string } | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Sprinting animation states
  const activeSprintRef = useRef<{
    npcId: string;
    section: PortfolioSection;
    startTime: number;
    duration: number;
    startPos: { x: number; y: number; z: number };
    targetOffset: { x: number; y: number; z: number };
    npcObj: any;
    originalPos?: { x: number; y: number; z: number };
  } | null>(null);

  // Proximity interaction listener (Press 'E' to interact when close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        const closest = badges.find((b) => b.isClose);
        if (closest) {
          triggerHandOff(closest.section, closest.name);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [badges]);

  // Handle letter open trigger
  const triggerHandOff = (section: PortfolioSection, npcName: string) => {
    setDeliveryToast({
      text: `✉ Letter Delivered by ${npcName}!`,
      sub: `Here is Shiv's ${section.toUpperCase()} portfolio letter!`,
    });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setDeliveryToast(null), 3500);

    // Open Letter Modal
    onOpenLetter(section);
  };

  // Listen for custom summon events (from 3-line menu)
  useEffect(() => {
    const handleSummon = (e: any) => {
      const section = (e.detail?.section || 'education').toLowerCase() as PortfolioSection;
      summonNPC(section);
    };

    const handleOpenLetterEvent = (e: any) => {
      const sec = (e.detail?.section || 'about').toLowerCase() as PortfolioSection;
      onOpenLetter(sec);
    };

    window.addEventListener('summon_portfolio_npc', handleSummon);
    window.addEventListener('open_portfolio_letter', handleOpenLetterEvent);

    return () => {
      window.removeEventListener('summon_portfolio_npc', handleSummon);
      window.removeEventListener('open_portfolio_letter', handleOpenLetterEvent);
    };
  }, []);

  // Summon function: NPC sprints to player under 2-3 seconds
  const summonNPC = (section: PortfolioSection) => {
    const config = NPC_CONFIGS.find((c) => c.section === section);
    if (!config) return;

    const scene = (window as any)._planetScene;
    const playerObj = (window as any)._characters?.mesh?._localObject;
    const camera = (window as any)._camera;

    if (!scene || !playerObj) {
      // Fallback: immediate open if 3D scene not ready
      triggerHandOff(section, config.name);
      return;
    }

    // Find the NPC mesh in the scene
    const npcEntry = scene.npcs?.find((n: any) => n.options?.id === config.id);
    const npcMesh = npcEntry?.mesh;

    const playerPos = playerObj.position;

    // Show delivery announcement toast
    setDeliveryToast({
      text: `🏃 ${config.name} is running to deliver your letter!`,
      sub: `Arriving in ~2 seconds with Shiv's ${section.toUpperCase()} letter...`,
    });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setDeliveryToast(null), 4000);

    if (npcMesh) {
      // Calculate a spawn point 12 units away from the player in view
      let forward = { x: 0, y: 0, z: 1 };
      if (camera) {
        forward.x = playerPos.x - camera.position.x;
        forward.y = playerPos.y - camera.position.y;
        forward.z = playerPos.z - camera.position.z;
        const len = Math.hypot(forward.x, forward.y, forward.z) || 1;
        forward.x /= len;
        forward.y /= len;
        forward.z /= len;
      }

      const spawnDistance = 12;
      const startX = playerPos.x + forward.x * spawnDistance;
      const startY = playerPos.y + forward.y * spawnDistance;
      const startZ = playerPos.z + forward.z * spawnDistance;

      const origPos = { x: npcMesh.position.x, y: npcMesh.position.y, z: npcMesh.position.z };

      // Teleport to sprint start
      npcMesh.position.set(startX, startY, startZ);

      // Start sprint loop (duration 2.2 seconds)
      activeSprintRef.current = {
        npcId: config.id,
        section: section,
        startTime: performance.now(),
        duration: 2200, // ~2.2 seconds!
        startPos: { x: startX, y: startY, z: startZ },
        targetOffset: { x: forward.x * 1.3, y: forward.y * 1.3, z: forward.z * 1.3 },
        npcObj: npcMesh,
        originalPos: origPos,
      };
    } else {
      // If NPC mesh not found, trigger hand-off after 2 seconds
      setTimeout(() => {
        triggerHandOff(section, config.name);
      }, 2000);
    }
  };

  // Main 3D projection & sprint animation loop
  useEffect(() => {
    let animId: number;

    const updateLoop = () => {
      const scene = (window as any)._planetScene;
      const camera = (window as any)._camera;
      const playerObj = (window as any)._characters?.mesh?._localObject;

      const now = performance.now();

      // Handle active sprint animation
      if (activeSprintRef.current && playerObj) {
        const sprint = activeSprintRef.current;
        const elapsed = now - sprint.startTime;
        const progress = Math.min(1, elapsed / sprint.duration);

        // Ease-out cubic sprint curve
        const ease = 1 - Math.pow(1 - progress, 2.5);

        const currentTargetX = playerObj.position.x + sprint.targetOffset.x;
        const currentTargetY = playerObj.position.y + sprint.targetOffset.y;
        const currentTargetZ = playerObj.position.z + sprint.targetOffset.z;

        const curX = sprint.startPos.x + (currentTargetX - sprint.startPos.x) * ease;
        const curY = sprint.startPos.y + (currentTargetY - sprint.startPos.y) * ease;
        const curZ = sprint.startPos.z + (currentTargetZ - sprint.startPos.z) * ease;

        // Add running stride bobbing
        const bob = Math.sin(progress * Math.PI * 14) * 0.12;

        sprint.npcObj.position.set(curX, curY + bob, curZ);

        // Sprint completed!
        if (progress >= 1) {
          const config = NPC_CONFIGS.find((c) => c.section === sprint.section);
          triggerHandOff(sprint.section, config?.name || 'Messenger');

          // Return NPC smoothly after 5 seconds
          const origPos = sprint.originalPos;
          const mesh = sprint.npcObj;
          setTimeout(() => {
            if (origPos && mesh) {
              mesh.position.set(origPos.x, origPos.y, origPos.z);
            }
          }, 5000);

          activeSprintRef.current = null;
        }
      }

      // Project each NPC's head position to 2D screen coordinates
      if (camera && typeof camera.project === 'function') {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const playerPos = playerObj?.position;

        const updatedBadges: ScreenBadge[] = [];

        NPC_CONFIGS.forEach((cfg) => {
          let worldX = cfg.fallbackPos[0];
          let worldY = cfg.fallbackPos[1];
          let worldZ = cfg.fallbackPos[2];

          // Try getting live position from scene NPC mesh
          if (scene && scene.npcs) {
            const entry = scene.npcs.find((n: any) => n.options?.id === cfg.id);
            if (entry && entry.mesh) {
              worldX = entry.mesh.position.x;
              worldY = entry.mesh.position.y;
              worldZ = entry.mesh.position.z;
            }
          }

          // Offset above character's head
          const headY = worldY + 1.85;

          // Distance to player
          let dist = 100;
          if (playerPos) {
            dist = Math.hypot(worldX - playerPos.x, worldY - playerPos.y, worldZ - playerPos.z);
          }

          // Vector to project
          const v = { x: worldX, y: headY, z: worldZ };
          camera.project(v);

          // Check if inside camera view frustum
          const visible = v.z < 1.0 && v.z > -1.0 && dist < 42;
          const screenX = (v.x * 0.5 + 0.5) * width;
          const screenY = (-(v.y * 0.5) + 0.5) * height;

          updatedBadges.push({
            id: cfg.id,
            section: cfg.section,
            label: cfg.label,
            name: cfg.name,
            icon: cfg.icon,
            color: cfg.color,
            screenX,
            screenY,
            distance: dist,
            isClose: dist < 3.2,
            visible,
          });
        });

        setBadges(updatedBadges);
      }

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* Floating 3D NPC Head Badges */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9990,
          overflow: 'hidden',
        }}
      >
        {badges.map((b) => {
          if (!b.visible) return null;

          // Clamp screen coordinates so badges don't fly wildly off-screen
          const x = Math.max(40, Math.min(window.innerWidth - 40, b.screenX));
          const y = Math.max(30, Math.min(window.innerHeight - 30, b.screenY));

          // Scale smoothly based on distance
          const scale = Math.max(0.72, Math.min(1.05, 1.2 - b.distance * 0.02));

          return (
            <div
              key={b.id}
              onClick={() => triggerHandOff(b.section, b.name)}
              className="npc-overhead-badge"
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -100%) scale(${scale})`,
                pointerEvents: 'auto',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                userSelect: 'none',
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Comic Banner Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: b.isClose ? '#f4c430' : '#fffef9',
                  color: '#1e252b',
                  border: '2.5px solid #1e252b',
                  borderRadius: '12px',
                  padding: b.isClose ? '5px 12px' : '4px 10px',
                  boxShadow: '3px 3px 0px #1e252b',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: b.isClose ? '13px' : '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  animation: b.isClose ? 'badgePulse 1.2s infinite' : 'none',
                }}
              >
                <span style={{ fontSize: '14px' }}>{b.icon}</span>
                <span>{b.label}</span>
                {b.isClose && (
                  <span
                    style={{
                      backgroundColor: '#1e252b',
                      color: '#ffffff',
                      borderRadius: '6px',
                      padding: '1px 6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      marginLeft: '4px',
                    }}
                  >
                    PRESS E / CLICK
                  </span>
                )}
              </div>

              {/* Sub-label showing NPC identity */}
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 2px #000',
                  marginTop: '2px',
                  backgroundColor: 'rgba(30, 37, 43, 0.65)',
                  padding: '1px 6px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                {b.name}
              </span>

              {/* Downward comic pointer arrow */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #1e252b',
                  marginTop: '1px',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Delivery Toast Notification */}
      {deliveryToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10006,
            backgroundColor: '#fffef9',
            border: '3px solid #1e252b',
            borderRadius: '16px',
            padding: '12px 20px',
            boxShadow: '5px 5px 0px #1e252b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            fontFamily: "'Fredoka', sans-serif",
            animation: 'toastPopIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            pointerEvents: 'auto',
            textAlign: 'center',
            maxWidth: '90vw',
          }}
        >
          <strong style={{ fontSize: '15px', color: '#1e252b' }}>
            {deliveryToast.text}
          </strong>
          <span style={{ fontSize: '12.5px', color: '#55636d', fontWeight: 600 }}>
            {deliveryToast.sub}
          </span>
        </div>
      )}

      <style>{`
        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
            background-color: #f7d25e;
          }
        }
        @keyframes toastPopIn {
          from {
            opacity: 0;
            transform: translate(-50%, 15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
        .npc-overhead-badge:hover {
          transform: translate(-50%, -105%) scale(1.1) !important;
        }
      `}</style>
    </>
  );
};
