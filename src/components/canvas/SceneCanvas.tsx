import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { AtmospherePhaseConfig } from '../../config/atmosphereConfig';
import { WorldDefinition, BuildingItem } from '../../world/types';
import { SkyAndAtmosphere } from './SkyAndAtmosphere';
import { MiniaturePlanet } from './MiniaturePlanet';
import { TextSomewhere3D } from './TextSomewhere3D';

interface SceneCanvasProps {
  world: WorldDefinition;
  atmosphere: AtmospherePhaseConfig;
  isEntering: boolean;
  isEntered: boolean;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
}

/**
 * Camera Animator handles the cinematic fly-in transition
 * towards the town when ENTER is clicked, and zooms back out when returning to orbit.
 */
const CameraController: React.FC<{
  isEntering: boolean;
  isEntered: boolean;
}> = ({ isEntering, isEntered }) => {
  const { camera } = useThree();
  const initialCamPos = useRef(new THREE.Vector3(0, 1.8, 12.2));
  const enteredCamPos = useRef(new THREE.Vector3(0.5, 2.6, 6.4));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isEntering || isEntered) {
      if (prefersReducedMotion) {
        camera.position.copy(enteredCamPos.current);
        camera.lookAt(0, 0.8, 0);
      } else {
        gsap.to(camera.position, {
          x: enteredCamPos.current.x,
          y: enteredCamPos.current.y,
          z: enteredCamPos.current.z,
          duration: 2.2,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.lookAt(0, 0.5, 0);
          },
        });
      }
    } else {
      if (prefersReducedMotion) {
        camera.position.copy(initialCamPos.current);
        camera.lookAt(0, 0, 0);
      } else {
        gsap.to(camera.position, {
          x: initialCamPos.current.x,
          y: initialCamPos.current.y,
          z: initialCamPos.current.z,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            camera.lookAt(0, 0, 0);
          },
        });
      }
    }
  }, [isEntering, isEntered, camera]);

  return null;
};

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  world,
  atmosphere,
  isEntering,
  isEntered,
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
        camera={{ position: [0, 1.8, 12.2], fov: 42, near: 0.1, far: 80 }}
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
        <CameraController isEntering={isEntering} isEntered={isEntered} />

        <OrbitControls
          enablePan={false}
          enableZoom={!isEntering && !isEntered}
          minDistance={8}
          maxDistance={18}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
          rotateSpeed={0.6}
          dampingFactor={0.06}
          enableDamping
        />

        {/* Dynamic Sky, Lights, Clouds, Birds, Stars */}
        <SkyAndAtmosphere atmosphere={atmosphere} />

        {/* Dimensional 3D Typography */}
        {!isEntered && (
          <TextSomewhere3D atmosphereMode={atmosphere.mode} />
        )}

        {/* The Canonical Miniature Town Planet */}
        <MiniaturePlanet
          world={world}
          glowIntensity={atmosphere.windowGlowIntensity}
          lanternGlowIntensity={atmosphere.lanternGlowIntensity}
          isEntering={isEntering || isEntered}
          onHoverBuilding={onHoverBuilding}
          onSelectBuilding={onSelectBuilding}
        />
      </Canvas>
    </div>
  );
};

