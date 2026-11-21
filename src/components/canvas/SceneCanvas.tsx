import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { AtmospherePhaseConfig } from '../../config/atmosphereConfig';
import { WorldDefinition, BuildingItem, NPCEntity } from '../../world/types';
import { SkyAndAtmosphere } from './SkyAndAtmosphere';
import { PainterlyPlanet } from './PainterlyPlanet';

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
 * Continuous Camera Controller:
 * Handles the seamless zoom journey from planet orbit down to the ground-level town square.
 *
 * CRITICAL ARCHITECTURAL CONTRACT:
 * No scene swapping. The visitor literally watches the camera glide from space into the village.
 */
const ContinuousCameraController: React.FC<{
  isEntering: boolean;
  isEntered: boolean;
  playerPosition: [number, number, number];
}> = ({ isEntering, isEntered, playerPosition }) => {
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  const currentLookAt = useRef(new THREE.Vector3(0, -0.4, 0));

  // Compute adaptive orbit framing distance based on screen aspect ratio
  const orbitTargets = useMemo(() => {
    const baseDistance = 17.4;
    let z = baseDistance;
    let y = 0.6;
    let lookAtY = -0.4;

    if (aspect < 1.2) {
      // Mobile portrait / tablet: increase distance to guarantee comfortable breathing room
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
  }, [aspect, size.height]);

  // Initial mount positioning & Return to Orbit animation
  useEffect(() => {
    if (isEntered || isEntering) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      camera.position.copy(orbitTargets.pos);
      camera.lookAt(orbitTargets.lookAt);
      currentLookAt.current.copy(orbitTargets.lookAt);
    } else {
      gsap.to(camera.position, {
        x: orbitTargets.pos.x,
        y: orbitTargets.pos.y,
        z: orbitTargets.pos.z,
        duration: 1.6,
        ease: 'power2.out',
      });
      gsap.to(currentLookAt.current, {
        x: orbitTargets.lookAt.x,
        y: orbitTargets.lookAt.y,
        z: orbitTargets.lookAt.z,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          camera.lookAt(currentLookAt.current);
        },
      });
    }
  }, [orbitTargets, camera, isEntering, isEntered]);

  // Continuous Camera Fly-In Zoom (when ENTER is clicked)
  useEffect(() => {
    if (!isEntering) return;

    // Target position: Town Square (lat 20, lon 0)
    // Camera arrives at [0, 2.8, 6.2] looking at [0, 1.4, 4.4]
    const townArrivalPos = new THREE.Vector3(0, 2.8, 6.2);
    const townArrivalLookAt = new THREE.Vector3(0, 1.4, 4.4);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      camera.position.copy(townArrivalPos);
      camera.lookAt(townArrivalLookAt);
      currentLookAt.current.copy(townArrivalLookAt);
    } else {
      gsap.to(camera.position, {
        x: townArrivalPos.x,
        y: townArrivalPos.y,
        z: townArrivalPos.z,
        duration: 2.2,
        ease: 'power2.inOut',
      });
      gsap.to(currentLookAt.current, {
        x: townArrivalLookAt.x,
        y: townArrivalLookAt.y,
        z: townArrivalLookAt.z,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(currentLookAt.current);
        },
      });
    }
  }, [isEntering, camera]);

  // Third-person follow camera tracking when walking inside the town
  useFrame((_, delta) => {
    if (!isEntered) return;

    // Follow camera offset based on playerPosition:
    const targetCamX = playerPosition[0] * 0.75;
    const targetCamY = 2.8 + playerPosition[1] * 0.5;
    const targetCamZ = 6.2 + playerPosition[2] * 0.75;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 4.5, delta);

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      playerPosition[0] * 0.75,
      5.5,
      delta
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      1.2 + playerPosition[1] * 0.5,
      5.5,
      delta
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      4.2 + playerPosition[2] * 0.75,
      5.5,
      delta
    );

    camera.lookAt(currentLookAt.current);
  });

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
        {/* Continuous Camera Controller (Seamless Zoom Journey) */}
        <ContinuousCameraController
          isEntering={isEntering}
          isEntered={isEntered}
          playerPosition={playerPosition}
        />

        {/* Dynamic Sky, Lights, Clouds, Birds, Stars */}
        <SkyAndAtmosphere atmosphere={atmosphere} />

        {/* ONE UNIFIED PHYSICAL WORLD (Rendered continuously at all scales) */}
        <PainterlyPlanet
          world={world}
          glowIntensity={atmosphere.windowGlowIntensity}
          lanternGlowIntensity={atmosphere.lanternGlowIntensity}
          isEntering={isEntering}
          isEntered={isEntered}
          playerPosition={playerPosition}
          playerRotation={playerRotation}
          isWalking={isWalking}
          targetPoint={targetPoint}
          onHoverBuilding={onHoverBuilding}
          onSelectBuilding={onSelectBuilding}
          onSelectNPC={onSelectNPC}
        />
      </Canvas>
    </div>
  );
};
