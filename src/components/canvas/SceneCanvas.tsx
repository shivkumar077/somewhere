import React, { useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { AtmospherePhaseConfig } from '../../config/atmosphereConfig';
import { WorldDefinition, BuildingItem } from '../../world/types';
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
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
}

/**
 * Camera Animator handles responsive framing across ALL aspect ratios:
 * - Desktop/widescreen: comfortable orbit distance with generous breathing room
 * - Tablets & phones: dynamic distance scaling so planet diameter (8.8) is never cropped
 * - Short landscape: adapted elevation and lookAt target
 */
const CameraController: React.FC<{
  isEntering: boolean;
  isEntered: boolean;
  viewMode: ViewMode;
}> = ({ isEntering, isEntered, viewMode }) => {
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(1, size.height);

  const targets = useMemo(() => {
    if (viewMode === 'walkable') {
      // Walkable world overview camera
      return {
        pos: new THREE.Vector3(0, 14, 26),
        lookAt: new THREE.Vector3(0, 0, 0),
      };
    }

    if (isEntering || isEntered) {
      // Entered town close-up view
      const z = aspect < 1.0 ? 8.2 * (1.1 / Math.max(0.48, aspect)) : 8.2;
      const y = aspect < 1.0 ? 1.6 : 2.4;
      return {
        pos: new THREE.Vector3(0.4, y, z),
        lookAt: new THREE.Vector3(0, 0.4, 0),
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
  }, [isEntering, isEntered, aspect, viewMode, size.height]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      camera.position.copy(targets.pos);
      camera.lookAt(targets.lookAt);
    } else {
      gsap.to(camera.position, {
        x: targets.pos.x,
        y: targets.pos.y,
        z: targets.pos.z,
        duration: isEntering || isEntered ? 2.0 : 1.5,
        ease: isEntering || isEntered ? 'power3.inOut' : 'power2.out',
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
  viewMode = 'miniature',
  onHoverBuilding,
  onSelectBuilding,
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
        <CameraController isEntering={isEntering} isEntered={isEntered} viewMode={viewMode} />

        {/* OrbitControls enabled ONLY in walkable exploration preview */}
        {viewMode === 'walkable' && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            minDistance={8}
            maxDistance={50}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2.2}
            rotateSpeed={0.6}
            dampingFactor={0.06}
            enableDamping
          />
        )}

        {/* Dynamic Sky, Lights, Clouds, Birds, Stars */}
        <SkyAndAtmosphere atmosphere={atmosphere} />

        {/* CANONICAL RENDERING PATH SELECTION */}
        {viewMode === 'miniature' ? (
          /* Path 1: Miniature Spherical Island */
          <MiniaturePlanet
            world={world}
            glowIntensity={atmosphere.windowGlowIntensity}
            lanternGlowIntensity={atmosphere.lanternGlowIntensity}
            isEntering={isEntering || isEntered}
            onHoverBuilding={onHoverBuilding}
            onSelectBuilding={onSelectBuilding}
          />
        ) : (
          /* Path 2: Flat Walkable Ground World Preview */
          <WalkableWorldRenderer
            world={world}
            glowIntensity={atmosphere.windowGlowIntensity}
            lanternGlowIntensity={atmosphere.lanternGlowIntensity}
            onHoverBuilding={onHoverBuilding}
            onSelectBuilding={onSelectBuilding}
          />
        )}
      </Canvas>
    </div>
  );
};
