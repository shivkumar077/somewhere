import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { AtmospherePhaseConfig } from '../../config/atmosphereConfig';
import { WorldDefinition, BuildingItem, NPCEntity } from '../../world/types';
import { SkyAndAtmosphere } from './SkyAndAtmosphere';
import { MiniaturePlanet } from './MiniaturePlanet';
import { WalkableWorldRenderer } from '../../world/WalkableWorldRenderer';

export type ViewMode = 'miniature' | 'walkable';

interface SceneCanvasProps {
  world: WorldDefinition;
  atmosphere: AtmospherePhaseConfig;
  isEntering: boolean;
  isEntered: boolean;
  viewMode?: ViewMode;
  playerPosition: [number, number, number];
  playerRotation: number;
  isWalking: boolean;
  targetPoint: [number, number, number] | null;
  onGroundClick?: (x: number, z: number) => void;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
  onSelectNPC?: (npc: NPCEntity) => void;
}

/**
 * Third-Person Camera Follow Controller
 * Smoothly follows player position and lookAt during walkable town exploration.
 */
const ThirdPersonFollowCamera: React.FC<{
  playerPosition: [number, number, number];
  isEntered: boolean;
}> = ({ playerPosition, isEntered }) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((_, delta) => {
    if (!isEntered) return;
    // Follow camera offset: 4.8 units above, 7.8 units behind
    const targetCamX = playerPosition[0];
    const targetCamY = playerPosition[1] + 4.8;
    const targetCamZ = playerPosition[2] + 7.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 5, delta);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, playerPosition[0], 6, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, playerPosition[1] + 1.2, 6, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, playerPosition[2], 6, delta);

    camera.lookAt(currentLookAt.current);
  });

  return null;
};

/**
 * Camera Animator for Landing Planet Orbit
 */
const LandingCameraController: React.FC<{
  isEntering: boolean;
  isEntered: boolean;
}> = ({ isEntering, isEntered }) => {
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(1, size.height);

  const targets = useMemo(() => {
    if (isEntering) {
      // Swop-in towards town center
      return {
        pos: new THREE.Vector3(0, 5.2, 9.2),
        lookAt: new THREE.Vector3(0, 1.0, 0),
      };
    } else {
      // Planet orbit view with generous breathing room around edges
      const baseDistance = 17.4;
      let z = baseDistance;
      let y = 0.6;
      let lookAtY = -0.4;

      if (aspect < 1.2) {
        // Portrait / square tablets & phones: scale distance inversely to fit width
        const scale = 1.18 / Math.max(0.46, aspect);
        z = baseDistance * scale;
        y = 0.4;
        lookAtY = -0.5;
      } else if (size.height < 520 && aspect > 1.3) {
        // Short mobile landscape
        z = 15.8;
        y = 0.35;
        lookAtY = -0.25;
      }

      return {
        pos: new THREE.Vector3(0, y, z),
        lookAt: new THREE.Vector3(0, lookAtY, 0),
      };
    }
  }, [isEntering, aspect, size.height]);

  useEffect(() => {
    if (isEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      camera.position.copy(targets.pos);
      camera.lookAt(targets.lookAt);
    } else {
      gsap.to(camera.position, {
        x: targets.pos.x,
        y: targets.pos.y,
        z: targets.pos.z,
        duration: isEntering ? 1.8 : 1.4,
        ease: isEntering ? 'power3.inOut' : 'power2.out',
        onUpdate: () => {
          camera.lookAt(targets.lookAt);
        },
      });
    }
  }, [targets, camera, isEntering, isEntered]);

  return null;
};

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  world,
  atmosphere,
  isEntering,
  isEntered,
  playerPosition,
  playerRotation,
  isWalking,
  targetPoint,
  onGroundClick,
  onHoverBuilding,
  onSelectBuilding,
  onSelectNPC,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, ${atmosphere.skyTopColor} 0%, ${atmosphere.skyBottomColor} 100%)`,
        transition: 'background 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.6, 17.4], fov: 40, near: 0.1, far: 140 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        {/* Camera controllers: Landing Orbit vs Third-Person Walkable Follow */}
        {!isEntered ? (
          <LandingCameraController isEntering={isEntering} isEntered={isEntered} />
        ) : (
          <ThirdPersonFollowCamera playerPosition={playerPosition} isEntered={isEntered} />
        )}

        {/* Dynamic Sky, Lights, Clouds, Birds, Stars */}
        <SkyAndAtmosphere atmosphere={atmosphere} />

        {/* CANONICAL RENDERING PATH SELECTION */}
        {!isEntered ? (
          /* Path 1: Miniature Spherical Island (Landing Scene) */
          <MiniaturePlanet
            world={world}
            glowIntensity={atmosphere.windowGlowIntensity}
            lanternGlowIntensity={atmosphere.lanternGlowIntensity}
            isEntering={isEntering}
            onHoverBuilding={onHoverBuilding}
            onSelectBuilding={onSelectBuilding}
          />
        ) : (
          /* Path 2: The Living Walkable Town (Explorable Scene) */
          <WalkableWorldRenderer
            world={world}
            glowIntensity={atmosphere.windowGlowIntensity}
            lanternGlowIntensity={atmosphere.lanternGlowIntensity}
            playerPosition={playerPosition}
            playerRotation={playerRotation}
            isWalking={isWalking}
            targetPoint={targetPoint}
            onGroundClick={onGroundClick}
            onHoverBuilding={onHoverBuilding}
            onSelectBuilding={onSelectBuilding}
            onSelectNPC={onSelectNPC}
          />
        )}
      </Canvas>
    </div>
  );
};
