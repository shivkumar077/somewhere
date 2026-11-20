import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { BuildingItem } from '../../world/types';

interface BuildingProps {
  building: BuildingItem;
  glowIntensity: number;
}

/**
 * Storybook Hand-Crafted Stylized Buildings
 * Clean geometry, soft bevels, pastel palettes, and warm glowing windows.
 */

export const BuildingRenderer: React.FC<BuildingProps> = ({ building, glowIntensity }) => {
  const { type, visualTheme } = building;

  switch (type) {
    case 'town-hall':
      return <TownHallBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'windmill':
      return <WindmillBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'bakery':
      return <BakeryBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'observatory':
      return <ObservatoryBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'cottage':
      return <CottageBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'greenhouse':
      return <GreenhouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'tea-house':
      return <TeaHouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    case 'lighthouse':
      return <LighthouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
    default:
      return <CottageBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
  }
};

/**
 * Town Hall with Clock Tower & Weathervane
 */
const TownHallBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation Plinth */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.16, 1.1]} />
        <meshStandardMaterial color="#c2b8a3" roughness={0.9} />
      </mesh>

      {/* Main Hall Body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.65, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Main Hall Gabled Roof */}
      <mesh position={[0, 0.95, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.85, 0.5, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Central Clock Tower */}
      <mesh position={[0, 0.9, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.8, 0.48]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Clock Tower Spire */}
      <mesh position={[0, 1.55, 0.1]} castShadow>
        <coneGeometry args={[0.34, 0.65, 4]} />
        <meshStandardMaterial color={theme.accentColor || '#e8a838'} roughness={0.4} />
      </mesh>

      {/* Clock Face */}
      <mesh position={[0, 1.05, 0.35]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.25 * glowIntensity}
          roughness={0.5}
        />
      </mesh>

      {/* Arched Entrance Door */}
      <mesh position={[0, 0.3, 0.49]}>
        <boxGeometry args={[0.26, 0.4, 0.04]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>

      {/* Glowing Windows */}
      <mesh position={[-0.32, 0.45, 0.48]}>
        <boxGeometry args={[0.18, 0.22, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.8 * glowIntensity}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.32, 0.45, 0.48]}>
        <boxGeometry args={[0.18, 0.22, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.8 * glowIntensity}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

/**
 * Whispering Hill Windmill with Rotating Blades
 */
const WindmillBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  const bladesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z -= delta * 0.9;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.62, 0.16, 8]} />
        <meshStandardMaterial color="#bcc5b9" roughness={0.9} />
      </mesh>

      {/* Tapered Body */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.52, 1.0, 8]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Conical Roof Cap */}
      <mesh position={[0, 1.32, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.44, 0.45, 8]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Small Arch Window */}
      <mesh position={[0, 0.75, 0.44]}>
        <boxGeometry args={[0.16, 0.22, 0.04]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.8 * glowIntensity}
        />
      </mesh>

      {/* Tiny Door */}
      <mesh position={[0, 0.26, 0.51]}>
        <boxGeometry args={[0.2, 0.35, 0.04]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>

      {/* Rotating Blades Assembly */}
      <group position={[0, 1.25, 0.4]}>
        {/* Hub Shaft */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.14, 8]} />
          <meshStandardMaterial color="#4a3525" />
        </mesh>

        <group ref={bladesRef}>
          {/* 4 Wooden Sail Blades */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
            <group key={idx} rotation={[0, 0, angle]}>
              {/* Spar Arm */}
              <mesh position={[0, 0.46, 0.02]} castShadow>
                <boxGeometry args={[0.04, 0.9, 0.02]} />
                <meshStandardMaterial color="#5c4033" />
              </mesh>
              {/* Canvas Cloth Sail */}
              <mesh position={[0.08, 0.52, 0.025]} castShadow>
                <boxGeometry args={[0.14, 0.65, 0.01]} />
                <meshStandardMaterial color="#fefae0" roughness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};

/**
 * Cinnamon Hearth Bakery with Chimney & Puffed Smoke
 */
const BakeryBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  const smokePuff1 = useRef<THREE.Mesh>(null);
  const smokePuff2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 1.5;
    if (smokePuff1.current) {
      smokePuff1.current.position.y = 1.35 + ((t % 2) * 0.25);
      const s1 = 0.08 + ((t % 2) * 0.08);
      smokePuff1.current.scale.set(s1, s1, s1);
    }
    if (smokePuff2.current) {
      smokePuff2.current.position.y = 1.35 + (((t + 1) % 2) * 0.25);
      const s2 = 0.08 + (((t + 1) % 2) * 0.08);
      smokePuff2.current.scale.set(s2, s2, s2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main Bakery House */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.55, 0.8]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Steep Tiled Roof */}
      <mesh position={[0, 0.82, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.68, 0.45, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Brick Chimney */}
      <mesh position={[0.26, 0.85, 0.15]} castShadow>
        <boxGeometry args={[0.16, 0.55, 0.16]} />
        <meshStandardMaterial color="#9c4132" roughness={0.9} />
      </mesh>

      {/* Chimney Smoke Puffs */}
      <mesh ref={smokePuff1} position={[0.26, 1.35, 0.15]}>
        <sphereGeometry args={[1, 7, 7]} />
        <meshStandardMaterial color="#f0eded" transparent opacity={0.65} roughness={0.9} />
      </mesh>
      <mesh ref={smokePuff2} position={[0.26, 1.45, 0.15]}>
        <sphereGeometry args={[1, 7, 7]} />
        <meshStandardMaterial color="#f0eded" transparent opacity={0.5} roughness={0.9} />
      </mesh>

      {/* Bakery Window with Warm Glow */}
      <mesh position={[-0.18, 0.35, 0.41]}>
        <boxGeometry args={[0.3, 0.25, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={glowIntensity}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0.22, 0.24, 0.41]}>
        <boxGeometry args={[0.18, 0.35, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>

      {/* Storybook Bread / Croissant Signboard */}
      <mesh position={[-0.18, 0.6, 0.44]}>
        <boxGeometry args={[0.24, 0.1, 0.02]} />
        <meshStandardMaterial color="#f4a261" roughness={0.5} />
      </mesh>
    </group>
  );
};

/**
 * Stargazer Dome / Observatory
 */
const ObservatoryBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Tower Body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.52, 0.85, 16]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Copper Hemispherical Dome */}
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.4} />
      </mesh>

      {/* Telescope Tube poking out */}
      <mesh position={[0.2, 1.25, 0.2]} rotation={[-Math.PI / 4, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.45, 8]} />
        <meshStandardMaterial color={theme.accentColor || '#ffd166'} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Observation Slit / Window */}
      <mesh position={[0, 0.55, 0.5]}>
        <boxGeometry args={[0.16, 0.25, 0.04]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.8 * glowIntensity}
        />
      </mesh>
    </group>
  );
};

/**
 * Cozy Storybook Cottage
 */
const CottageBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Cottage Main Block */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.5, 0.68]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Steep Roof */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.62, 0.4, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Chimney */}
      <mesh position={[-0.22, 0.75, -0.1]} castShadow>
        <boxGeometry args={[0.12, 0.4, 0.12]} />
        <meshStandardMaterial color="#8a5a44" roughness={0.9} />
      </mesh>

      {/* Window */}
      <mesh position={[0.18, 0.32, 0.35]}>
        <boxGeometry args={[0.2, 0.2, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.9 * glowIntensity}
        />
      </mesh>

      {/* Cottage Door */}
      <mesh position={[-0.16, 0.22, 0.35]}>
        <boxGeometry args={[0.16, 0.3, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Sunlit Orangery / Greenhouse
 */
const GreenhouseBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Low Brick Base */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.2, 0.65]} />
        <meshStandardMaterial color="#c77dff" roughness={0.8} />
      </mesh>

      {/* Glass Solarium Frame */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.82, 0.45, 0.58]} />
        <meshStandardMaterial
          color={theme.roofColor}
          transparent
          opacity={0.65}
          roughness={0.2}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.4 * glowIntensity}
        />
      </mesh>

      {/* Glass Gable Roof */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.55, 0.35, 4]} />
        <meshStandardMaterial
          color={theme.roofColor}
          transparent
          opacity={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

/**
 * Cloudcrest Tea Pavilion
 */
const TeaHouseBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Raised Wooden Deck */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.12, 0.9]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Corner Posts */}
      {[
        [-0.35, -0.35],
        [0.35, -0.35],
        [-0.35, 0.35],
        [0.35, 0.35],
      ].map(([px, pz], i) => (
        <mesh key={i} position={[px, 0.45, pz]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.6, 6]} />
          <meshStandardMaterial color={theme.trimColor} />
        </mesh>
      ))}

      {/* Inner Tea Room */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.5, 0.55]} />
        <meshStandardMaterial
          color="#faedcd"
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.6 * glowIntensity}
          roughness={0.7}
        />
      </mesh>

      {/* Curved Pavilion Roof */}
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.75, 0.32, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.5} />
      </mesh>
    </group>
  );
};

/**
 * Beacon Lookout & Pier
 */
const LighthouseBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = (0.8 + Math.sin(clock.getElapsedTime() * 3) * 0.4) * glowIntensity;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Pier Decking */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.65, 0.14, 12]} />
        <meshStandardMaterial color="#6c757d" roughness={0.9} />
      </mesh>

      {/* Lighthouse Tower */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.45, 1.1, 12]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Red Storybook Band */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.375, 0.375, 0.25, 12]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Lantern Room */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.22, 10]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          emissive="#fff3b0"
          emissiveIntensity={1.2 * glowIntensity}
        />
      </mesh>

      {/* Lantern Light Source */}
      <pointLight
        ref={lightRef}
        position={[0, 1.35, 0]}
        color="#ffea75"
        distance={4}
        decay={2}
      />

      {/* Domed Roof Cap */}
      <mesh position={[0, 1.48, 0]} castShadow>
        <coneGeometry args={[0.3, 0.2, 10]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.4} />
      </mesh>
    </group>
  );
};

