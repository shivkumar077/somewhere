import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PortfolioSection } from './LetterModal';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const vAdd = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const vSub = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const vMul = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s });
const vDot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;
const vLen = (a: Vec3): number => Math.hypot(a.x, a.y, a.z) || 1e-6;
const vNorm = (a: Vec3): Vec3 => {
  const l = vLen(a);
  return { x: a.x / l, y: a.y / l, z: a.z / l };
};

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
    id: 'mountainman',
    section: 'about',
    label: 'ABOUT',
    name: 'Mountain Ranger',
    icon: '👤',
    fallbackPos: [-8.17226, 32.3472, -1.76941],
    color: '#f4c430',
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
    id: 'threekid',
    section: 'projects',
    label: 'PROJECTS',
    name: 'Hacker Girl',
    icon: '📂',
    fallbackPos: [30.0128, 18.6118, -4.71063],
    color: '#66BDE6',
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
    id: 'suto',
    section: 'cv',
    label: 'CV DOCUMENT',
    name: 'Suto the Cat',
    icon: '🐱',
    fallbackPos: [15.8793, 16.9006, 11.2543],
    color: '#ff85a2',
  },
];

interface LoadedCat {
  wrapper: THREE.Group;
  model: THREE.Object3D;
  mixer: THREE.AnimationMixer;
  action: THREE.AnimationAction;
}

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
  lod: 'close' | 'medium' | 'far';
}

interface ActiveSprint {
  npcId: string;
  section: PortfolioSection;
  npcName: string;
  startTime: number;
  duration: number;
  spawnPoint: Vec3;
  targetPoint: Vec3;
  planetRadius: number;
  npcMesh: any;
  originalPos: Vec3;
  stage: 'running' | 'handing' | 'done';
}

interface WorldNPCBadgesProps {
  onOpenLetter: (section: PortfolioSection) => void;
}

export const WorldNPCBadges: React.FC<WorldNPCBadgesProps> = ({ onOpenLetter }) => {
  const [badges, setBadges] = useState<ScreenBadge[]>([]);
  const [deliveryToast, setDeliveryToast] = useState<{
    text: string;
    sub: string;
    distance?: string;
  } | null>(null);

  const activeSprintRef = useRef<ActiveSprint | null>(null);
  const catRef = useRef<LoadedCat | null>(null);

  // Preload stylized toon cat model (Suto)
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/toon_cat_free.glb',
      (gltf) => {
        const catModel = gltf.scene;
        // Scale to clearly visible cute cat proportions (~0.85m tall)
        catModel.scale.set(0.26, 0.26, 0.26);
        // Face forward along Z
        catModel.rotation.y = Math.PI;

        // Apply hand-drawn cel-shaded art style matching the website
        catModel.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.geometry) {
              if (!child.geometry.updateRanges) child.geometry.updateRanges = [];
              if (child.geometry.attributes) {
                Object.values(child.geometry.attributes).forEach((attr: any) => {
                  if (attr && !attr.updateRanges) attr.updateRanges = [];
                });
              }
            }
            const oldMap = child.material?.map;
            if (oldMap && !oldMap.updateRanges) oldMap.updateRanges = [];
            child.material = new THREE.MeshToonMaterial({
              map: oldMap || null,
              color: 0xfff3e6, // cute warm cream/calico coat
            });
            if (child.material.map && !child.material.map.updateRanges) {
              child.material.map.updateRanges = [];
            }
          }
        });

        const wrapper = new THREE.Group();
        wrapper.name = 'suto_cat_courier';
        wrapper.position.set(15.8793, 16.9006, 11.2543);
        wrapper.add(catModel);
        wrapper.visible = true; // Always visible in world!

        const mixer = new THREE.AnimationMixer(catModel);
        let action: any = null;
        if (gltf.animations && gltf.animations.length > 0) {
          action = mixer.clipAction(gltf.animations[0]);
          action.setEffectiveTimeScale(1.3); // bouncy, cute energetic cat trot/run!
          action.play();
        }

        catRef.current = { wrapper, model: catModel, mixer, action };
      },
      undefined,
      (err) => console.warn('Failed to load Suto cat model:', err)
    );
  }, []);

  // Press E to interact when close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        const closest = badges.find((b) => b.isClose);
        if (closest && !activeSprintRef.current) {
          triggerHandOff(closest.section, closest.name);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [badges]);

  // Direct hand-off when interacting close up
  const triggerHandOff = (section: PortfolioSection, npcName: string) => {
    const isCat = section === 'cv';
    setDeliveryToast({
      text: isCat ? `🐱 CV Delivered by Suto!` : `✉ Letter Delivered by ${npcName}!`,
      sub: isCat
        ? `Suto: "Meow! Here is Shiv's CV document!"`
        : `Here is Shiv's ${section.toUpperCase()} portfolio letter!`,
    });
    setTimeout(() => setDeliveryToast(null), 3000);
    onOpenLetter(section);
  };

  // Listen for summon, open, and modal close events
  useEffect(() => {
    const handleSummon = (e: any) => {
      const section = (e.detail?.section || 'about').toLowerCase() as PortfolioSection;
      summonNPC(section);
    };

    const handleOpenLetterEvent = (e: any) => {
      // If a sprint is currently running, ignore premature open events
      if (activeSprintRef.current) return;
      const sec = (e.detail?.section || 'about').toLowerCase() as PortfolioSection;
      onOpenLetter(sec);
    };

    const handleModalClosed = () => {
      // Instantly release sprint lock and unlock character controls
      (window as any)._sprintActive = false;
      try {
        const chars = (window as any)._characters;
        if (chars) {
          if (chars.mesh) chars.mesh.interactingElement = null;
          if (typeof chars.unlockCamera === 'function') chars.unlockCamera();
          if (typeof chars.enable === 'function') chars.enable();
        }
      } catch (err) {}

      // Keep Suto sitting happily with the player for 10s after closing so user clearly sees Suto!
      setTimeout(() => {
        if (activeSprintRef.current) {
          const s = activeSprintRef.current;
          if (s.npcId === 'suto' && catRef.current) {
            // Suto gently returns to his home station
            catRef.current.wrapper.position.set(15.8793, 16.9006, 11.2543);
            catRef.current.wrapper.visible = true;
          } else if (s.originalPos && s.npcMesh) {
            s.npcMesh.position.set(s.originalPos.x, s.originalPos.y, s.originalPos.z);
            if (s.npcMesh._targetPosition) {
              s.npcMesh._targetPosition.set(s.originalPos.x, s.originalPos.y, s.originalPos.z);
            }
            s.npcMesh._visibilityThreshold = 35;
          }
          activeSprintRef.current = null;
        }
      }, 10000);
    };

    window.addEventListener('summon_portfolio_npc', handleSummon);
    window.addEventListener('open_portfolio_letter', handleOpenLetterEvent);
    window.addEventListener('portfolio_modal_closed', handleModalClosed);

    return () => {
      window.removeEventListener('summon_portfolio_npc', handleSummon);
      window.removeEventListener('open_portfolio_letter', handleOpenLetterEvent);
      window.removeEventListener('portfolio_modal_closed', handleModalClosed);
    };
  }, []);

  // Summon NPC with a clear, cinematic sprint across the terrain (taking ~4s)
  const summonNPC = (section: PortfolioSection) => {
    const config = NPC_CONFIGS.find((c) => c.section === section) || NPC_CONFIGS[0];

    const scene = (window as any)._planetScene;
    const playerObj = (window as any)._characters?.mesh?._localObject;
    const camera = (window as any)._camera;

    if (!scene || !playerObj) {
      triggerHandOff(section, config.name);
      return;
    }

    const npcEntry = scene.npcs?.find((n: any) => n.options?.id === config.id);
    let npcMesh = npcEntry?.mesh;

    // Suto the cat uses our high-quality rigged and running toon cat model
    if (section === 'cv' && catRef.current) {
      npcMesh = catRef.current.wrapper;
      catRef.current.wrapper.visible = true;
      if (scene && catRef.current.wrapper.parent !== scene) {
        scene.add(catRef.current.wrapper);
      }
      if (catRef.current.action) {
        catRef.current.action.reset().play();
      }
    }

    const pPos: Vec3 = {
      x: playerObj.position.x,
      y: playerObj.position.y,
      z: playerObj.position.z,
    };
    const planetRadius = vLen(pPos);
    const playerUp = vNorm(pPos);

    // Compute view direction from camera through player
    let camPos: Vec3 = { x: 0, y: 0, z: 0 };
    if (camera) {
      camPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    }
    const camToPlayer = vNorm(vSub(pPos, camPos));

    // Remove vertical component to get tangential forward vector on spherical ground
    const dot = vDot(camToPlayer, playerUp);
    let forwardTangent = vSub(camToPlayer, vMul(playerUp, dot));
    if (vLen(forwardTangent) < 0.01) {
      forwardTangent = { x: 0, y: 0, z: 1 };
    }
    forwardTangent = vNorm(forwardTangent);

    // Collider & Raycaster from physics engine for exact terrain snapping
    const collider = (window as any)._characters?.mesh?._collisionPhysics?._collider;
    const raycaster = (window as any)._characters?.mesh?._collisionPhysics?._rayCaster;

    const snapToGround = (pt: Vec3): Vec3 => {
      if (collider && raycaster && playerObj) {
        try {
          const Vec3 = playerObj.position.constructor;
          const up = vNorm(pt);
          const r = vLen(pt);
          const origin = new Vec3(up.x * (r + 15), up.y * (r + 15), up.z * (r + 15));
          const dir = new Vec3(-up.x, -up.y, -up.z);
          raycaster.set(origin, dir);
          const hits = raycaster.intersectObject(collider, false);
          if (hits && hits[0]) {
            return { x: hits[0].point.x, y: hits[0].point.y, z: hits[0].point.z };
          }
        } catch {
          // fallback
        }
      }
      return pt;
    };

    // Spawn in direct line-of-sight in front of the camera & player
    const isCat = section === 'cv';
    const spawnDist = isCat ? 6.5 : 10.0;
    const rawSpawn = vAdd(pPos, vMul(forwardTangent, spawnDist));
    const spawnPoint = snapToGround(vMul(vNorm(rawSpawn), planetRadius));

    // Stop 1.3 units right in front of the player
    const rawTarget = vAdd(pPos, vMul(forwardTangent, 1.3));
    const targetPoint = snapToGround(vMul(vNorm(rawTarget), planetRadius));

    if (npcMesh) {
      const origPos: Vec3 = {
        x: npcMesh.position.x,
        y: npcMesh.position.y,
        z: npcMesh.position.z,
      };

      // Set global flag to avoid premature dialog popups
      (window as any)._sprintActive = true;
      npcMesh._sprintActive = true;
      npcMesh._visibilityThreshold = 9999;

      npcMesh.position.set(spawnPoint.x, spawnPoint.y, spawnPoint.z);
      if (npcMesh._targetPosition) {
        npcMesh._targetPosition.set(spawnPoint.x, spawnPoint.y, spawnPoint.z);
      }
      if (typeof npcMesh.lookAt === 'function') {
        npcMesh.lookAt(pPos.x, pPos.y, pPos.z);
      }

      activeSprintRef.current = {
        npcId: config.id,
        section: section,
        npcName: config.name,
        startTime: performance.now(),
        duration: isCat ? 2200 : 3200,
        spawnPoint,
        targetPoint,
        planetRadius,
        npcMesh,
        originalPos: origPos,
        stage: 'running',
      };
    } else {
      setTimeout(() => triggerHandOff(section, config.name), 2500);
    }
  };

  // Main animation frame loop
  useEffect(() => {
    let animId: number;

    const updateLoop = () => {
      const scene = (window as any)._planetScene;
      const camera = (window as any)._camera;
      const playerObj = (window as any)._characters?.mesh?._localObject;
      const collider = (window as any)._characters?.mesh?._collisionPhysics?._collider;
      const raycaster = (window as any)._characters?.mesh?._collisionPhysics?._rayCaster;
      const now = performance.now();

      // Handle active sprint animation
      if (activeSprintRef.current && playerObj) {
        const sprint = activeSprintRef.current;
        const elapsed = now - sprint.startTime;
        const progress = Math.min(1, elapsed / sprint.duration);

        if (sprint.stage === 'running') {
          // Advance Suto the cat's running animation mixer if sprinting
          if (sprint.npcId === 'suto' && catRef.current?.mixer) {
            catRef.current.mixer.update(0.024);
          }
          // Dynamic HUD readout showing runner approaching
          const remainingMeters = Math.max(1, Math.round((1 - progress) * 14));
          const isCat = sprint.npcId === 'fox' || sprint.section === 'cv';
          setDeliveryToast({
            text: isCat
              ? `🐾 Suto is coming to deliver your CV!`
              : `🏃 ${sprint.npcName} is running to you!`,
            sub: isCat
              ? `Delivering Shiv's CV document...`
              : `Delivering Shiv's ${sprint.section.toUpperCase()} letter...`,
            distance: `${remainingMeters}m away`,
          });

          // Smooth spherical ground progression
          const basePos = vNorm(
            vAdd(
              vMul(sprint.spawnPoint, 1 - progress),
              vMul(sprint.targetPoint, progress)
            )
          );
          let surfacePos = vMul(basePos, sprint.planetRadius);
          if (collider && raycaster) {
            try {
              const Vec3 = playerObj.position.constructor;
              const origin = new Vec3(basePos.x * (sprint.planetRadius + 15), basePos.y * (sprint.planetRadius + 15), basePos.z * (sprint.planetRadius + 15));
              const dir = new Vec3(-basePos.x, -basePos.y, -basePos.z);
              raycaster.set(origin, dir);
              const hits = raycaster.intersectObject(collider, false);
              if (hits && hits[0]) {
                surfacePos = { x: hits[0].point.x, y: hits[0].point.y, z: hits[0].point.z };
              }
            } catch {
              // fallback to spherical surface
            }
          }

          // Running stride bobbing (running gait)
          const strideBob = Math.sin(progress * Math.PI * 24) * 0.16;
          const currentUp = basePos;
          const finalPos = vAdd(surfacePos, vMul(currentUp, strideBob));

          sprint.npcMesh.position.set(finalPos.x, finalPos.y, finalPos.z);
          if (sprint.npcMesh._targetPosition) {
            sprint.npcMesh._targetPosition.set(finalPos.x, finalPos.y, finalPos.z);
          }
          if (sprint.npcMesh.up) {
            sprint.npcMesh.up.set(currentUp.x, currentUp.y, currentUp.z);
          }
          if (typeof sprint.npcMesh.lookAt === 'function') {
            sprint.npcMesh.lookAt(playerObj.position.x, playerObj.position.y, playerObj.position.z);
          }
          if (typeof sprint.npcMesh.updateMatrix === 'function') {
            sprint.npcMesh.updateMatrix();
          }

          // Runner has arrived right in front of the player!
          if (progress >= 1) {
            sprint.stage = 'handing';
            sprint.npcMesh._sprintActive = false;

            // Pin at delivery target position right in front of player
            sprint.npcMesh.position.set(sprint.targetPoint.x, sprint.targetPoint.y, sprint.targetPoint.z);
            if (sprint.npcMesh._targetPosition) {
              sprint.npcMesh._targetPosition.set(sprint.targetPoint.x, sprint.targetPoint.y, sprint.targetPoint.z);
            }
            if (typeof sprint.npcMesh.lookAt === 'function') {
              sprint.npcMesh.lookAt(playerObj.position.x, playerObj.position.y, playerObj.position.z);
            }

            const isCat = sprint.npcId === 'suto' || sprint.section === 'cv';
            setDeliveryToast({
              text: isCat ? `🐱 CV Delivered by Suto!` : `✉ Letter Handed to You!`,
              sub: isCat
                ? `Suto: "Meow! Here is Shiv's CV document! Ready to read!"`
                : `${sprint.npcName}: "Special delivery! Here is Shiv's ${sprint.section.toUpperCase()} letter!"`,
              distance: 'Delivered',
            });

            // Hand-off pause: let the user see Suto standing right in front of them with the letter!
            setTimeout(() => {
              (window as any)._sprintActive = false;
              onOpenLetter(sprint.section);
              setDeliveryToast(null);
            }, 1000);
          }
        } else if (sprint.stage === 'handing') {
          // Keep NPC stationary right in front of player facing them during hand-off
          sprint.npcMesh.position.set(sprint.targetPoint.x, sprint.targetPoint.y, sprint.targetPoint.z);
          if (sprint.npcMesh._targetPosition) {
            sprint.npcMesh._targetPosition.set(sprint.targetPoint.x, sprint.targetPoint.y, sprint.targetPoint.z);
          }
          if (typeof sprint.npcMesh.lookAt === 'function') {
            sprint.npcMesh.lookAt(playerObj.position.x, playerObj.position.y, playerObj.position.z);
          }
        }
      }

      // Ensure Suto is permanently added to scene and animated
      if (scene && catRef.current) {
        if (catRef.current.wrapper.parent !== scene) {
          scene.add(catRef.current.wrapper);
        }
        if (catRef.current.mixer) {
          catRef.current.mixer.update(0.018);
        }
      }

      // Check if world is still loading or loader envelope is active
      const loaderEl = document.getElementById('loader');
      const isLoaderVisible = loaderEl ? (
        parseFloat(window.getComputedStyle(loaderEl).opacity) > 0.02 &&
        window.getComputedStyle(loaderEl).display !== 'none'
      ) : false;

      // DO NOT show badges before the full map is loaded!
      // If loader is visible or player character is not yet instantiated, hide all badges
      if (isLoaderVisible || !playerObj || (!(window as any)._isWorldLoaded && loaderEl)) {
        setBadges((prev) => (prev.length > 0 ? [] : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      // Project NPC Head Badges to 2D Screen Coordinates
      if (camera && playerObj) {
        try {
          const Vec3 = playerObj.position.constructor;
          const width = window.innerWidth;
          const height = window.innerHeight;
          const playerPos = playerObj.position;

          const updatedBadges: ScreenBadge[] = [];

          NPC_CONFIGS.forEach((cfg) => {
            let worldX = cfg.fallbackPos[0];
            let worldY = cfg.fallbackPos[1];
            let worldZ = cfg.fallbackPos[2];

            if (cfg.id === 'suto') {
              if (catRef.current && catRef.current.wrapper) {
                worldX = catRef.current.wrapper.position.x;
                worldY = catRef.current.wrapper.position.y;
                worldZ = catRef.current.wrapper.position.z;
              }
            } else if (scene && scene.npcs) {
              const entry = scene.npcs.find((n: any) => n.options?.id === cfg.id);
              if (entry && entry.mesh) {
                worldX = entry.mesh.position.x;
                worldY = entry.mesh.position.y;
                worldZ = entry.mesh.position.z;
              }
            }

            const headY = cfg.id === 'suto' ? worldY + 0.95 : cfg.id === 'fox' ? worldY + 1.15 : worldY + 1.85;

            let dist = 100;
            if (playerPos) {
              dist = Math.hypot(worldX - playerPos.x, worldY - playerPos.y, worldZ - playerPos.z);
            }

            const v = new Vec3(worldX, headY, worldZ);
            v.project(camera);

            const isSprinting = activeSprintRef.current?.npcId === cfg.id;
            // Progressive LOD culling: faraway badges over planet horizon (>24m) are culled for 60 FPS
            const visible = v.z < 1.0 && v.z > -1.0 && (dist < 24 || isSprinting);
            const screenX = (v.x * 0.5 + 0.5) * width;
            const screenY = (-(v.y * 0.5) + 0.5) * height;

            // Level of Detail (LOD):
            // - 'close': within 3.8m or sprinting -> full interactive comic banner with 'PRESS E / CLICK'
            // - 'medium': 3.8m to 14m -> clean compact title badge with icon
            // - 'far': 14m to 24m -> lightweight mini comic pin dot
            let lod: 'close' | 'medium' | 'far' = 'medium';
            if (dist < 3.8 || isSprinting) {
              lod = 'close';
            } else if (dist >= 14) {
              lod = 'far';
            }

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
              lod,
            });
          });

          setBadges(updatedBadges);
        } catch {
          // Ignore projection frame errors
        }
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

          const x = Math.max(40, Math.min(window.innerWidth - 40, b.screenX));
          const y = Math.max(30, Math.min(window.innerHeight - 30, b.screenY));
          const scale = Math.max(0.72, Math.min(1.05, 1.2 - b.distance * 0.02));

          const isRunner = activeSprintRef.current?.npcId === b.id;

          return (
            <div
              key={b.id}
              onClick={() => {
                if (!activeSprintRef.current) {
                  triggerHandOff(b.section, b.name);
                }
              }}
              className="npc-overhead-badge"
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -100%) scale(${isRunner ? 1.2 : scale})`,
                pointerEvents: 'auto',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                userSelect: 'none',
                transition: 'transform 0.08s ease-out',
                zIndex: isRunner ? 9995 : 9990,
              }}
            >
              {/* Level of Detail (LOD) Rendering */}
              {b.lod === 'far' ? (
                /* Far LOD (14m - 24m): Ultra-lightweight comic pin dot for 60fps */
                <div
                  title={`${b.label} - ${b.name}`}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#fffef9',
                    border: '2px solid #1e252b',
                    boxShadow: '1.5px 1.5px 0px #1e252b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  {b.icon}
                </div>
              ) : (
                /* Medium & Close LOD: Hand-Drawn Comic Storybook Banner */
                <>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: isRunner ? '#f4c430' : b.isClose ? '#f4c430' : '#fffef9',
                      color: '#1e252b',
                      border: '2.5px solid #1e252b',
                      borderRadius: '12px',
                      padding: b.isClose || isRunner ? '4px 11px' : '3px 8px',
                      boxShadow: '2.5px 2.5px 0px #1e252b',
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: b.isClose || isRunner ? '12.5px' : '11px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      animation: b.isClose || isRunner ? 'badgePulse 1.2s infinite' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>{isRunner ? (b.id === 'fox' || b.id === 'suto' ? '🐱' : '🏃') : b.icon}</span>
                    <span>{isRunner ? (b.id === 'fox' || b.id === 'suto' ? 'SUTO DELIVERING CV' : `DELIVERING ${b.label}`) : b.label}</span>
                    {b.isClose && !isRunner && (
                      <span
                        style={{
                          backgroundColor: '#1e252b',
                          color: '#ffffff',
                          borderRadius: '6px',
                          padding: '1px 5px',
                          fontSize: '10px',
                          fontWeight: 800,
                          marginLeft: '3px',
                        }}
                      >
                        PRESS E / CLICK
                      </span>
                    )}
                  </div>

                  {/* Character Identity Tag (shown when close or sprinting) */}
                  {b.lod === 'close' && (
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        color: '#ffffff',
                        textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 2px #000',
                        marginTop: '2px',
                        backgroundColor: (b.id === 'fox' || b.id === 'suto') && isRunner ? 'rgba(235, 94, 140, 0.95)' : isRunner ? 'rgba(217, 83, 79, 0.9)' : 'rgba(30, 37, 43, 0.65)',
                        padding: '1.5px 7px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      {b.id === 'fox' || b.id === 'suto' ? '🐾 Suto the Cat' : b.name}
                    </span>
                  )}

                  {/* Pointer Arrow */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid #1e252b',
                      marginTop: '1px',
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Cinematic Delivery Toast Notification */}
      {deliveryToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10006,
            backgroundColor: '#fffef9',
            border: '3px solid #1e252b',
            borderRadius: '16px',
            padding: '12px 24px',
            boxShadow: '6px 6px 0px #1e252b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            fontFamily: "'Fredoka', sans-serif",
            animation: 'toastPopIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            pointerEvents: 'auto',
            textAlign: 'center',
            maxWidth: '92vw',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong style={{ fontSize: '16px', color: '#1e252b' }}>
              {deliveryToast.text}
            </strong>
            {deliveryToast.distance && (
              <span
                style={{
                  backgroundColor: '#f4c430',
                  color: '#1e252b',
                  border: '1.5px solid #1e252b',
                  borderRadius: '8px',
                  padding: '2px 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  boxShadow: '1.5px 1.5px 0px #1e252b',
                }}
              >
                {deliveryToast.distance}
              </span>
            )}
          </div>
          <span style={{ fontSize: '13px', color: '#55636d', fontWeight: 600 }}>
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
