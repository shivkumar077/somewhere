import React, { useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { AtmospherePhaseConfig } from '../../config/atmosphereConfig';
import { WorldDefinition, BuildingItem } from '../../world/types';
import { SkyAndAtmosphere } from './SkyAndAtmosphere';
import { MiniaturePlanet } from './MiniaturePlanet';
import { TextSomewhere3D } from './TextSomewhere3D';
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
 * - Desktop/widescreen (aspect > 1.2): standard cinematic orbit distance
 * - Tablets (aspect 0.75 - 1.2): dynamic distance compensation
 * - Narrow phones & foldables (aspect < 0.75): adaptive distance to frame planet
 * - Mobile landscape (height < 500): low Y offset
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
      const z = aspect < 1.0 ? 6.4 * (1.1 / Math.max(0.48, aspect)) : 6.4;
      const y = aspect < 1.0 ? 1.9 : 2.6;
      return {
        pos: new THREE.Vector3(0.4, y, z),
        lookAt: new THREE.Vector3(0, 0.4, 0),
      };
    } else {
      // Planet orbit view
      // Keep entire planet (diameter 8.8) framed nicely inside view
      const zMultiplier = aspect < 1.15 ? 1.15 / Math.max(0.45, aspect) : 1.0;
      const z = 12.2 * zMultiplier;
      const y = aspect < 1.0 ? 0.7 : 1.8;
      const lookAtY = aspect < 1.0 ? 0.2 : 0;
      return {
        pos: new THREE.Vector3(0, y, z),
        lookAt: new THREE.Vector3(0, lookAtY, 0),
      };
    }
  }, [isEntering, isEntered, aspect, viewMode]);

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
        camera={{ position: [0, 1.8, 12.2], fov: 42, near: 0.1, far: 120 }}
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

        <OrbitControls
          enablePan={viewMode === 'walkable'}
          enableZoom={!isEntering && !isEntered}
          minDistance={viewMode === 'walkable' ? 8 : 6}
          maxDistance={viewMode === 'walkable' ? 50 : 35}
          minPolarAngle={viewMode === 'walkable' ? 0.2 : Math.PI / 4}
          maxPolarAngle={viewMode === 'walkable' ? Math.PI / 2.2 : (3 * Math.PI) / 4}
          rotateSpeed={0.6}
          dampingFactor={0.06}
          enableDamping
        />

        {/* Dynamic Sky, Lights, Clouds, Birds, Stars */}
        <SkyAndAtmosphere atmosphere={atmosphere} />

        {/* Responsive Dimensional 3D Typography */}
        {!isEntered && viewMode === 'miniature' && (
          <TextSomewhere3D atmosphereMode={atmosphere.mode} />
        )}

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
