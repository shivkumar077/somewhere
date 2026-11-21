import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { BuildingItem, DestinationType } from '../../world/types';
import { ANIME_PALETTE } from '../../styles/painterlyPalette';

interface BuildingProps {
  building: BuildingItem;
  glowIntensity: number;
}

/**
 * Animated stylized chimney smoke puff
 */
export const ChimneyWithSmoke: React.FC<{
  position: [number, number, number];
  chimneyColor?: string;
  hasSmoke?: boolean;
}> = ({ position, chimneyColor = ANIME_PALETTE.earth.fieldstone, hasSmoke = true }) => {
  const puffRef1 = useRef<THREE.Mesh>(null);
  const puffRef2 = useRef<THREE.Mesh>(null);
  const puffRef3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!hasSmoke) return;
    const t = clock.getElapsedTime() * 1.4;

    if (puffRef1.current) {
      const p1 = (t % 2.4) / 2.4;
      puffRef1.current.position.y = position[1] + 0.35 + p1 * 0.9;
      puffRef1.current.position.x = position[0] + Math.sin(t * 1.2) * 0.08 * p1;
      const s1 = 0.08 + p1 * 0.14;
      puffRef1.current.scale.set(s1, s1 * 0.9, s1);
      (puffRef1.current.material as THREE.MeshStandardMaterial).opacity = (1 - p1) * 0.55;
    }

    if (puffRef2.current) {
      const p2 = ((t + 0.8) % 2.4) / 2.4;
      puffRef2.current.position.y = position[1] + 0.35 + p2 * 0.9;
      puffRef2.current.position.x = position[0] + Math.sin((t + 0.8) * 1.2) * 0.08 * p2;
      const s2 = 0.08 + p2 * 0.14;
      puffRef2.current.scale.set(s2, s2 * 0.9, s2);
      (puffRef2.current.material as THREE.MeshStandardMaterial).opacity = (1 - p2) * 0.55;
    }

    if (puffRef3.current) {
      const p3 = ((t + 1.6) % 2.4) / 2.4;
      puffRef3.current.position.y = position[1] + 0.35 + p3 * 0.9;
      puffRef3.current.position.x = position[0] + Math.sin((t + 1.6) * 1.2) * 0.08 * p3;
      const s3 = 0.08 + p3 * 0.14;
      puffRef3.current.scale.set(s3, s3 * 0.9, s3);
      (puffRef3.current.material as THREE.MeshStandardMaterial).opacity = (1 - p3) * 0.55;
    }
  });

  return (
    <group>
      {/* Stone / Brick Chimney Stack */}
      <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.65, 0.22]} />
        <meshStandardMaterial color={chimneyColor} roughness={0.92} />
      </mesh>
      {/* Chimney Terracotta Pot Top */}
      <mesh position={[position[0], position[1] + 0.36, position[2]]} castShadow>
        <cylinderGeometry args={[0.09, 0.08, 0.1, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.roof.terracottaDeep} roughness={0.9} />
      </mesh>

      {/* Gentle Rising Smoke Puffs */}
      {hasSmoke && (
        <>
          <mesh ref={puffRef1}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial
              color="#fbfaf8"
              roughness={0.9}
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
          <mesh ref={puffRef2}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial
              color="#fbfaf8"
              roughness={0.9}
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
          <mesh ref={puffRef3}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial
              color="#fbfaf8"
              roughness={0.9}
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

/**
 * Divided window with warm painterly night glow & wooden sill / flower box
 */
export const AnimeWindow: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  hasFlowerBox?: boolean;
  glowIntensity: number;
  glowColor?: string;
  frameColor?: string;
  flowerColor?: string;
}> = ({
  position,
  rotation = [0, 0, 0],
  size = [0.24, 0.34],
  hasFlowerBox = false,
  glowIntensity,
  glowColor = ANIME_PALETTE.lighting.windowGlow,
  frameColor = ANIME_PALETTE.earth.timberDark,
  flowerColor = ANIME_PALETTE.foliage.flowerPoppy,
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Wooden Window Frame */}
      <mesh castShadow>
        <boxGeometry args={[size[0] + 0.05, size[1] + 0.05, 0.03]} />
        <meshStandardMaterial color={frameColor} roughness={0.9} />
      </mesh>
      {/* Glass Pane with Warm Window Glow */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          color={glowIntensity > 0.4 ? glowColor : '#526978'}
          emissive={glowColor}
          emissiveIntensity={Math.max(0.15, glowIntensity * 0.9)}
          roughness={0.4}
        />
      </mesh>
      {/* Window Cross-Mullions */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.02, size[1], 0.01]} />
        <meshStandardMaterial color={frameColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[size[0], 0.02, 0.01]} />
        <meshStandardMaterial color={frameColor} roughness={0.9} />
      </mesh>

      {/* Flower Box with colorful blossoms */}
      {hasFlowerBox && (
        <group position={[0, -size[1] / 2 - 0.05, 0.06]}>
          <mesh castShadow>
            <boxGeometry args={[size[0] + 0.08, 0.09, 0.1]} />
            <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.9} />
          </mesh>
          {/* Green Foliage Soil Top */}
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[size[0] + 0.06, 0.03, 0.08]} />
            <meshStandardMaterial color={ANIME_PALETTE.grass.shadowGreen} roughness={0.9} />
          </mesh>
          {/* Flower Petals */}
          {[-0.08, 0, 0.08].map((fx, i) => (
            <mesh key={i} position={[fx, 0.08, (i % 2) * 0.02]}>
              <sphereGeometry args={[0.035, 6, 6]} />
              <meshStandardMaterial color={i === 1 ? ANIME_PALETTE.foliage.flowerButtercup : flowerColor} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

/**
 * Weathered Arched Oak Doorway with Stone Step & Iron Handle
 */
export const AnimeDoorway: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  doorColor?: string;
  frameColor?: string;
}> = ({
  position,
  rotation = [0, 0, 0],
  doorColor = ANIME_PALETTE.earth.timberWarm,
  frameColor = ANIME_PALETTE.earth.fieldstone,
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Stone Arch Jamb */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.48, 0.76, 0.05]} />
        <meshStandardMaterial color={frameColor} roughness={0.92} />
      </mesh>
      {/* Wooden Door Plank Leaf */}
      <mesh position={[0, 0.36, 0.02]} castShadow>
        <boxGeometry args={[0.38, 0.7, 0.03]} />
        <meshStandardMaterial color={doorColor} roughness={0.85} />
      </mesh>
      {/* Brass / Iron Ring Handle */}
      <mesh position={[0.12, 0.34, 0.04]} castShadow>
        <torusGeometry args={[0.025, 0.008, 6, 10]} />
        <meshStandardMaterial color="#4a3b32" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Stone Doorstep */}
      <mesh position={[0, 0.03, 0.06]} receiveShadow>
        <boxGeometry args={[0.54, 0.06, 0.16]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
    </group>
  );
};

/**
 * 1. THE LITTLE HOUSE — ABOUT ME (Cozy Ghibli-Style Cottage)
 */
export const LittleHouseBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Natural River-Rock Plinth Foundation */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.24, 1.25]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>

      {/* 2. Main Plastered Cottage Body with Timber Corner Posts */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.38, 0.78, 1.15]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>

      {/* Timber Corner Posts */}
      {[-0.67, 0.67].map((cx, idx) =>
        [-0.56, 0.56].map((cz, idz) => (
          <mesh key={`${idx}-${idz}`} position={[cx, 0.62, cz]} castShadow>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color={theme.trimColor} roughness={0.9} />
          </mesh>
        ))
      )}

      {/* Half-Timbered Horizontal Wall Beam */}
      <mesh position={[0, 0.65, 0.58]} castShadow>
        <boxGeometry args={[1.38, 0.06, 0.04]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.9} />
      </mesh>

      {/* 3. Flared Clay Terracotta Shingle Roof */}
      <group position={[0, 1.22, 0]}>
        {/* Main Gable Roof */}
        <mesh rotation={[0, 0, 0]} castShadow receiveShadow>
          <coneGeometry args={[1.05, 0.72, 4]} />
          <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
        </mesh>
        {/* Roof Overhang Eaves */}
        <mesh position={[0, -0.28, 0]} castShadow>
          <boxGeometry args={[1.52, 0.08, 1.28]} />
          <meshStandardMaterial color={theme.trimColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Attic Dormer Window */}
      <group position={[0, 1.15, 0.45]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.38, 0.36]} />
          <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.24, 0]} castShadow>
          <coneGeometry args={[0.3, 0.24, 4]} />
          <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
        </mesh>
        <AnimeWindow
          position={[0, 0.02, 0.18]}
          size={[0.18, 0.22]}
          hasFlowerBox={true}
          glowIntensity={glowIntensity}
          glowColor={theme.windowGlowColor}
        />
      </group>

      {/* 4. Arched Oak Door on Front Face */}
      <AnimeDoorway position={[-0.28, 0.12, 0.58]} doorColor={ANIME_PALETTE.earth.timberWarm} />

      {/* Ground-floor Window with Geranium Flower Box */}
      <AnimeWindow
        position={[0.34, 0.6, 0.58]}
        size={[0.26, 0.34]}
        hasFlowerBox={true}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
        flowerColor={ANIME_PALETTE.foliage.flowerPoppy}
      />

      {/* Side Wall Window */}
      <AnimeWindow
        position={[0.69, 0.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[0.24, 0.3]}
        hasFlowerBox={false}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />

      {/* 5. Fieldstone Chimney with Rising Smoke Puffs */}
      <ChimneyWithSmoke position={[0.48, 1.35, -0.26]} chimneyColor={ANIME_PALETTE.earth.fieldstone} hasSmoke={true} />

      {/* Front Entrance Garden Porch Trellis */}
      <group position={[-0.28, 0.45, 0.72]}>
        <mesh position={[-0.24, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 6]} />
          <meshStandardMaterial color={theme.trimColor} roughness={0.9} />
        </mesh>
        <mesh position={[0.24, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 6]} />
          <meshStandardMaterial color={theme.trimColor} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.16, 0]} castShadow>
          <boxGeometry args={[0.55, 0.05, 0.28]} />
          <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * 2. THE UNIVERSITY — EDUCATION (Charming Academic Hall with Arcade Portico & Clock Spire)
 */
export const UniversityBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation Terrace */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.3, 1.5]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>

      {/* Main Academic Wing Body */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.9, 1.3]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Slate Hip Roof */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.4, 0.68, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.85} />
      </mesh>

      {/* Arched Stone Colonnade Portico on Front */}
      <group position={[0, 0.45, 0.72]}>
        {[-0.6, -0.2, 0.2, 0.6].map((colX, idx) => (
          <mesh key={idx} position={[colX, 0, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.065, 0.6, 8]} />
            <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.9} />
          </mesh>
        ))}
        {/* Entablature Header */}
        <mesh position={[0, 0.34, 0]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.22]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.9} />
        </mesh>
      </group>

      {/* Large Arched Double Entrance Doors */}
      <AnimeDoorway position={[0, 0.15, 0.66]} doorColor={ANIME_PALETTE.earth.timberDark} />

      {/* Upper Story Multi-Pane Windows */}
      {[-0.65, 0.65].map((wx, idx) => (
        <AnimeWindow
          key={idx}
          position={[wx, 0.82, 0.66]}
          size={[0.26, 0.42]}
          hasFlowerBox={false}
          glowIntensity={glowIntensity}
          glowColor={theme.windowGlowColor}
          frameColor={theme.trimColor}
        />
      ))}

      {/* Central Verdigris Copper Cupola & Astronomical Astrolabe */}
      <group position={[0, 1.88, 0]}>
        {/* Octagonal Bell/Clock Chamber */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.32, 0.42, 8]} />
          <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
        </mesh>
        {/* Copper Verdigris Spire Dome */}
        <mesh position={[0, 0.34, 0]} castShadow>
          <coneGeometry args={[0.34, 0.48, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.roof.copperVerdigris} roughness={0.65} />
        </mesh>
        {/* Golden Astronomical Armillary Ring */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <torusGeometry args={[0.07, 0.012, 6, 12]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.autumnGold} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Ivy Climber Accent on Side Stone */}
      <mesh position={[-1.02, 0.65, 0.35]}>
        <boxGeometry args={[0.04, 0.7, 0.3]} />
        <meshStandardMaterial color={ANIME_PALETTE.grass.forestCanopy} roughness={0.95} />
      </mesh>
    </group>
  );
};

/**
 * 3. THE WORKSHOP — EXPERIENCE (Artisan Craftsperson Atelier with Working Waterwheel)
 */
export const WorkshopBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x += 0.8 * delta; // gentle rotation
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Forge Base */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.24, 1.3]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstoneShadow} roughness={0.95} />
      </mesh>

      {/* Main Timber Workshop Body */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.82, 1.15]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>

      {/* Steep Gable Roof with Terracotta Tiles */}
      <mesh position={[0, 1.28, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.12, 0.68, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>

      {/* Working Wooden Waterwheel on Side Face */}
      <group position={[0.88, 0.38, 0]} ref={wheelRef}>
        {/* Central Hub */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
        </mesh>
        {/* Outer Wheel Rim */}
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.42, 0.035, 6, 16]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.9} />
        </mesh>
        {/* 8 Wooden Paddles / Buckets */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
          const rad = (ang * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[0, Math.sin(rad) * 0.42, Math.cos(rad) * 0.42]}
              rotation={[rad, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.18, 0.02, 0.12]} />
              <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
            </mesh>
          );
        })}
      </group>

      {/* Open Lean-to Forge Shed on Left with Anvil */}
      <group position={[-0.95, 0.4, 0]}>
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0.25]} castShadow>
          <boxGeometry args={[0.6, 0.04, 1.1]} />
          <meshStandardMaterial color={theme.roofColor} roughness={0.9} />
        </mesh>
        {/* Anvil on Tree Stump */}
        <mesh position={[0, -0.15, 0.1]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.22, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.02, 0.1]} castShadow>
          <boxGeometry args={[0.18, 0.08, 0.1]} />
          <meshStandardMaterial color="#44484d" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      {/* Heavy Furnace Chimney with Steady Smoke */}
      <ChimneyWithSmoke position={[-0.55, 1.35, -0.32]} chimneyColor={ANIME_PALETTE.earth.fieldstoneShadow} hasSmoke={true} />

      {/* Main Workshop Sliding Timber Doors */}
      <AnimeDoorway position={[0, 0.12, 0.58]} doorColor={ANIME_PALETTE.earth.timberDark} />

      {/* Workshop Window */}
      <AnimeWindow
        position={[0.42, 0.65, 0.58]}
        size={[0.24, 0.32]}
        hasFlowerBox={true}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />

      {/* Skylight Dormers on Roof */}
      <mesh position={[0, 1.25, 0.4]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.45, 0.25, 0.1]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * 4. THE INVENTION HOUSE — PROJECTS (Whimsical Multi-Tier Tinker Atelier)
 */
export const InventionHouseBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  const vaneRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (vaneRef.current) {
      vaneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.4 + 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Ground Tier */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.65, 0.36, 1.35]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>

      {/* First Story Workshop */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.65, 1.2]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>

      {/* Overhanging Second Story (Jettying) */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.62, 0.6, 1.32]} />
        <meshStandardMaterial color={ANIME_PALETTE.wall.ochrePlaster} roughness={0.85} />
      </mesh>

      {/* Steep Mansard Gabled Roof */}
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.18, 0.72, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.85} />
      </mesh>

      {/* Whimsical Round Brass Telescope Cupola */}
      <group position={[0.42, 1.95, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.28, 0.45, 10]} />
          <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.28, 0]} castShadow>
          <sphereGeometry args={[0.28, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={ANIME_PALETTE.roof.copperVerdigris} roughness={0.6} />
        </mesh>
        {/* Brass Telescope Tube pointing skyward */}
        <mesh position={[0.1, 0.28, 0.1]} rotation={[0.45, 0.3, 0.45]} castShadow>
          <cylinderGeometry args={[0.035, 0.05, 0.38, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.autumnGold} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Rooftop Weathervane */}
      <group position={[-0.35, 2.22, 0]} ref={vaneRef}>
        <mesh castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.6} />
        </mesh>
        {/* Arrow pointer */}
        <mesh position={[0.08, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <coneGeometry args={[0.04, 0.16, 4]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.autumnGold} roughness={0.4} />
        </mesh>
      </group>

      {/* Project Glass Bay Window on Front */}
      <group position={[0, 0.62, 0.65]}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.45, 0.22]} />
          <meshStandardMaterial
            color={theme.windowGlowColor}
            emissive={theme.windowGlowColor}
            emissiveIntensity={Math.max(0.2, glowIntensity)}
            roughness={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.72, 0.06, 0.26]} />
          <meshStandardMaterial color={theme.trimColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Wooden Balcony on Second Floor */}
      <group position={[0, 1.05, 0.7]}>
        <mesh castShadow>
          <boxGeometry args={[0.85, 0.06, 0.24]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.12, 0.1]} castShadow>
          <boxGeometry args={[0.85, 0.2, 0.03]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.9} />
        </mesh>
      </group>

      <AnimeDoorway position={[-0.45, 0.18, 0.68]} doorColor={ANIME_PALETTE.earth.timberDark} />
      <ChimneyWithSmoke position={[-0.55, 1.8, -0.35]} chimneyColor={ANIME_PALETTE.earth.fieldstone} hasSmoke={true} />
    </group>
  );
};

/**
 * 5. THE LIBRARY — SKILLS & KNOWLEDGE (Round Scholarly Rotunda with Slate Dome)
 */
export const LibraryBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Curved Stone Base Plinth */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.15, 0.36, 16]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>

      {/* Main Classical Rotunda Body */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.96, 0.98, 1.0, 16]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Slate Dome Roof */}
      <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.02, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.85} />
      </mesh>

      {/* Lantern Skylight Cupola atop Dome */}
      <group position={[0, 2.05, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.24, 0.35, 10]} />
          <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.24, 0]} castShadow>
          <coneGeometry args={[0.26, 0.28, 10]} />
          <meshStandardMaterial color={ANIME_PALETTE.roof.copperVerdigris} roughness={0.65} />
        </mesh>
        {/* Owl / Spire finial */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.autumnGold} />
        </mesh>
      </group>

      {/* Tall Arched Stained Glass Windows around Rotunda */}
      {[0, 60, 120, 180, 240, 300].map((ang, i) => {
        const rad = (ang * Math.PI) / 180;
        const wx = Math.sin(rad) * 0.94;
        const wz = Math.cos(rad) * 0.94;
        return (
          <AnimeWindow
            key={i}
            position={[wx, 0.9, wz]}
            rotation={[0, rad, 0]}
            size={[0.28, 0.52]}
            hasFlowerBox={false}
            glowIntensity={glowIntensity}
            glowColor={theme.windowGlowColor}
            frameColor={theme.trimColor}
          />
        );
      })}

      {/* Grand Stone Entrance Stairs & Arched Portico */}
      <group position={[0, 0, 0.98]}>
        {/* Sweeping Steps */}
        <mesh position={[0, 0.08, 0.2]} receiveShadow>
          <boxGeometry args={[0.78, 0.16, 0.4]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
        </mesh>
        <AnimeDoorway position={[0, 0.18, 0.02]} doorColor={ANIME_PALETTE.earth.timberDark} />
      </group>
    </group>
  );
};

/**
 * 6. THE POST OFFICE — CONTACT (Rural Mail Hall with Dovecote & Postboxes)
 */
export const PostOfficeBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.24, 1.2]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>

      {/* Main Cottage Wall Body */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.38, 0.78, 1.1]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>

      {/* Gabled Terracotta Tile Roof */}
      <mesh position={[0, 1.22, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.05, 0.68, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>

      {/* Postal Pigeon Dovecote Loft atop Ridge */}
      <group position={[0.3, 1.55, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.24, 0]} castShadow>
          <coneGeometry args={[0.26, 0.24, 4]} />
          <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
        </mesh>
        {/* Tiny flight perches */}
        <mesh position={[0, 0.02, 0.19]} castShadow>
          <boxGeometry args={[0.24, 0.03, 0.08]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} />
        </mesh>
      </group>

      {/* Painted Post Office Signboard */}
      <group position={[0, 0.95, 0.58]}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.16, 0.04]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.55, 0.1]} />
          <meshStandardMaterial color={ANIME_PALETTE.wall.creamPlaster} roughness={0.7} />
        </mesh>
      </group>

      {/* Red Vintage Postbox outside the entrance */}
      <group position={[0.42, 0.25, 0.68]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.42, 10]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.flowerPoppy} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.23, 0]} castShadow>
          <sphereGeometry args={[0.08, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.flowerPoppy} roughness={0.7} />
        </mesh>
        {/* Black Letter Slot */}
        <mesh position={[0, 0.14, 0.08]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      <AnimeDoorway position={[-0.24, 0.12, 0.56]} doorColor={ANIME_PALETTE.earth.timberWarm} />
      <AnimeWindow
        position={[0.28, 0.58, 0.56]}
        size={[0.24, 0.32]}
        hasFlowerBox={true}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />
      <ChimneyWithSmoke position={[-0.45, 1.35, -0.28]} chimneyColor={ANIME_PALETTE.earth.fieldstone} hasSmoke={true} />
    </group>
  );
};

/**
 * 7. TOWN HALL & BELLTOWER (Civic Landmark)
 */
export const TownHallBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.3, 1.35]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.65, 0.85, 1.2]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.18, 0.65, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.85} />
      </mesh>

      {/* 3-Tier Central Clocktower */}
      <group position={[0, 1.7, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.7, 0.55]} />
          <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
        </mesh>
        {/* Clock Face on Front */}
        <mesh position={[0, 0.12, 0.28]} castShadow>
          <circleGeometry args={[0.16, 16]} />
          <meshStandardMaterial color={ANIME_PALETTE.wall.creamPlaster} roughness={0.6} />
        </mesh>
        {/* Copper Bellchamber Spire */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <coneGeometry args={[0.38, 0.65, 4]} />
          <meshStandardMaterial color={ANIME_PALETTE.roof.copperVerdigris} roughness={0.65} />
        </mesh>
      </group>

      <AnimeDoorway position={[0, 0.15, 0.62]} doorColor={ANIME_PALETTE.earth.timberDark} />
      {[-0.5, 0.5].map((wx, i) => (
        <AnimeWindow
          key={i}
          position={[wx, 0.7, 0.62]}
          size={[0.26, 0.38]}
          hasFlowerBox={false}
          glowIntensity={glowIntensity}
          glowColor={theme.windowGlowColor}
        />
      ))}
    </group>
  );
};

/**
 * 8. RUSTIC WINDMILL (Meadow Ridge)
 */
export const WindmillBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  const sailsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (sailsRef.current) {
      sailsRef.current.rotation.z += 0.6 * delta; // gentle turning sails
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Tapered Tower Base */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.88, 1.7, 12]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.92} />
      </mesh>
      {/* Conical Thatched / Tiled Cap */}
      <mesh position={[0, 1.95, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.74, 0.65, 12]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>

      {/* Rotating 4-Blade Canvas Sails */}
      <group position={[0, 1.82, 0.65]}>
        {/* Windshaft Axle */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.22, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
        </mesh>
        <group ref={sailsRef} position={[0, 0, 0.12]}>
          {[0, 90, 180, 270].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            return (
              <group key={i} rotation={[0, 0, rad]}>
                {/* Timber Spar */}
                <mesh position={[0, 0.6, 0]} castShadow>
                  <boxGeometry args={[0.05, 1.2, 0.03]} />
                  <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
                </mesh>
                {/* White Sail Cloth Lattice */}
                <mesh position={[0.1, 0.65, 0.01]} castShadow>
                  <planeGeometry args={[0.18, 0.95]} />
                  <meshStandardMaterial
                    color="#f8f6f0"
                    roughness={0.9}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      <AnimeDoorway position={[0, 0, 0.82]} doorColor={ANIME_PALETTE.earth.timberWarm} />
      <AnimeWindow position={[0, 1.1, 0.68]} size={[0.2, 0.28]} glowIntensity={glowIntensity} glowColor={theme.windowGlowColor} />
    </group>
  );
};

/**
 * 9. VILLAGE BAKERY (Town Square)
 */
export const BakeryBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.45, 0.2, 1.15]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.76, 1.05]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.02, 0.62, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>

      {/* Striped Bakery Awning over Window */}
      <group position={[0.28, 0.55, 0.58]} rotation={[0.3, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.03, 0.26]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.flowerPoppy} roughness={0.8} />
        </mesh>
      </group>

      <AnimeDoorway position={[-0.32, 0.1, 0.54]} doorColor={ANIME_PALETTE.earth.timberWarm} />
      <AnimeWindow
        position={[0.28, 0.55, 0.54]}
        size={[0.3, 0.32]}
        hasFlowerBox={true}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />
      <ChimneyWithSmoke position={[-0.45, 1.25, -0.28]} chimneyColor={ANIME_PALETTE.roof.terracottaDeep} hasSmoke={true} />
    </group>
  );
};

/**
 * 10. STARGAZER OBSERVATORY (High Bluffs)
 */
export const ObservatoryBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.95, 1.3, 16]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.65} />
      </mesh>
      {/* Open Viewing Shutter Slit with Telescope */}
      <mesh position={[0, 1.55, 0.7]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.11, 0.5, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.foliage.autumnGold} metalness={0.7} roughness={0.3} />
      </mesh>
      <AnimeDoorway position={[0, 0, 0.92]} doorColor={ANIME_PALETTE.earth.timberDark} />
      <AnimeWindow
        position={[0, 0.65, 0.86]}
        size={[0.22, 0.32]}
        hasFlowerBox={false}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />
    </group>
  );
};

/**
 * 11. GARDENER'S COTTAGE (Allotments)
 */
export const GardenerCottage: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.7, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.92, 0.58, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.95} />
      </mesh>
      <AnimeDoorway position={[-0.22, 0, 0.49]} doorColor={ANIME_PALETTE.earth.timberWarm} />
      <AnimeWindow
        position={[0.26, 0.52, 0.49]}
        size={[0.22, 0.28]}
        hasFlowerBox={true}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />
      <ChimneyWithSmoke position={[0.38, 1.15, -0.22]} chimneyColor={ANIME_PALETTE.earth.fieldstone} hasSmoke={true} />
    </group>
  );
};

/**
 * 12. BOOKBINDER'S COTTAGE
 */
export const BookbinderCottage: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.68, 0.9]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.88, 0.55, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>
      <AnimeDoorway position={[-0.2, 0, 0.46]} doorColor={ANIME_PALETTE.earth.timberDark} />
      <AnimeWindow
        position={[0.24, 0.5, 0.46]}
        size={[0.22, 0.28]}
        hasFlowerBox={false}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />
      <ChimneyWithSmoke position={[0.34, 1.1, -0.2]} chimneyColor={ANIME_PALETTE.earth.fieldstone} hasSmoke={true} />
    </group>
  );
};

/**
 * 13. FISHERMAN'S BOATHOUSE (Lagoon Stilt House)
 */
export const FishermanBoathouse: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme, glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stilt Pilings */}
      {[-0.5, 0.5].map((px, i) =>
        [-0.4, 0.4].map((pz, j) => (
          <mesh key={`${i}-${j}`} position={[px, -0.2, pz]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.45, 6]} />
            <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[1.3, 0.08, 1.1]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.75, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.08, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.88, 0.55, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.9} />
      </mesh>
      <AnimeDoorway position={[0, 0.08, 0.49]} doorColor={ANIME_PALETTE.earth.timberWarm} />
      <AnimeWindow
        position={[0.3, 0.55, 0.49]}
        size={[0.22, 0.28]}
        hasFlowerBox={false}
        glowIntensity={glowIntensity}
        glowColor={theme.windowGlowColor}
      />
    </group>
  );
};

/**
 * 14. BOTANICAL GREENHOUSE
 */
export const GreenhouseBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme: _theme, glowIntensity: _glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.2, 1.0]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      {/* Curved Glass Barrel Vault */}
      <mesh position={[0, 0.58, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 1.35, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color={ANIME_PALETTE.water.lagoonShallow}
          roughness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>
      {/* Potted Palm Silhouettes inside */}
      {[-0.3, 0, 0.3].map((px, i) => (
        <mesh key={i} position={[px, 0.35, 0]}>
          <sphereGeometry args={[0.14, 6, 6]} />
          <meshStandardMaterial color={ANIME_PALETTE.grass.forestCanopy} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 15. VALLEY TEA HOUSE
 */
export const TeaHouseBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Raised Cedar Deck */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[1.45, 0.14, 1.25]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.9} />
      </mesh>
      {/* Shoji Screen Pavilion Body */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.65, 1.0]} />
        <meshStandardMaterial color={ANIME_PALETTE.wall.creamPlaster} roughness={0.7} />
      </mesh>
      {/* Flared Curved Hip Roof */}
      <mesh position={[0, 1.08, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.05, 0.52, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.85} />
      </mesh>
    </group>
  );
};

/**
 * 16. AZURE BEACON LIGHTHOUSE
 */
export const LighthouseBuilding: React.FC<{
  theme: BuildingItem['visualTheme'];
  glowIntensity: number;
}> = ({ theme }) => {
  const lightRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (lightRef.current) {
      lightRef.current.rotation.y += 1.2 * delta; // sweeping beacon
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.82, 0.4, 12]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      {/* Tapered White & Terracotta Tower */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.65, 1.6, 12]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      {/* Terracotta Stripe Band */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.51, 0.55, 0.35, 12]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>
      {/* Glass Lantern Gallery Room */}
      <group position={[0, 2.15, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.38, 10]} />
          <meshStandardMaterial
            color={ANIME_PALETTE.lighting.lanternCore}
            emissive={ANIME_PALETTE.lighting.lanternCore}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.28, 0]} castShadow>
          <coneGeometry args={[0.42, 0.35, 10]} />
          <meshStandardMaterial color={ANIME_PALETTE.roof.copperVerdigris} roughness={0.65} />
        </mesh>
        <group ref={lightRef}>
          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.1, 0.4, 6]} />
            <meshBasicMaterial color={ANIME_PALETTE.lighting.lanternCore} transparent opacity={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

/**
 * 17. BLACKSMITH'S FORGE
 */
export const BlacksmithForge: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.72, 1.05]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.95, 0.58, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.9} />
      </mesh>
      <ChimneyWithSmoke position={[0.4, 1.15, -0.25]} chimneyColor={ANIME_PALETTE.earth.fieldstoneShadow} hasSmoke={true} />
      <AnimeDoorway position={[-0.2, 0, 0.54]} doorColor={ANIME_PALETTE.earth.timberDark} />
    </group>
  );
};

/**
 * 18. WEAVER'S GUILDHOUSE
 */
export const WeaverGuildhouse: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.72, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.92, 0.58, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>
      <AnimeDoorway position={[0, 0, 0.49]} doorColor={ANIME_PALETTE.earth.timberWarm} />
    </group>
  );
};

/**
 * 19. APOTHECARY & HERBALIST
 */
export const ApothecaryBuilding: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.65, 0.9]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      {/* Overhanging Attic */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.45, 1.0]} />
        <meshStandardMaterial color={ANIME_PALETTE.wall.sagePlaster} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.9, 0.55, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>
      <AnimeDoorway position={[-0.2, 0, 0.46]} doorColor={ANIME_PALETTE.earth.timberDark} />
    </group>
  );
};

/**
 * 20. MILLER'S HOUSE
 */
export const MillerHouse: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.68, 0.9]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.88, 0.55, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.95} />
      </mesh>
      <AnimeDoorway position={[0, 0, 0.46]} doorColor={ANIME_PALETTE.earth.timberWarm} />
    </group>
  );
};

/**
 * 21. MEADOW HAYLOFT BARN
 */
export const BarnHayloft: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.8, 1.1]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.9} />
      </mesh>
      {/* Curved Gambrel Roof */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.1, 0.65, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>
      {/* Double Barn Doors */}
      <mesh position={[0, 0.35, 0.56]} castShadow>
        <boxGeometry args={[0.65, 0.65, 0.04]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
      </mesh>
    </group>
  );
};

/**
 * 22. ORCHARD CIDER PRESS SHED
 */
export const CiderShed: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* 4 Timber Posts supporting Roof */}
      {[-0.45, 0.45].map((px, i) =>
        [-0.35, 0.35].map((pz, j) => (
          <mesh key={`${i}-${j}`} position={[px, 0.35, pz]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.7, 6]} />
            <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.75, 0.45, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.88} />
      </mesh>
    </group>
  );
};

/**
 * 23. HONEYBEE APIARY COTTAGE
 */
export const ApiaryCottage: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.6, 0.8]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.74, 0.48, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.95} />
      </mesh>
    </group>
  );
};

/**
 * 24. LAGOON PIER PAVILION
 */
export const PierPavilion: React.FC<{ theme: BuildingItem['visualTheme'] }> = ({ theme }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Hexagonal Stilt Deck */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.1, 6]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.9} />
      </mesh>
      {/* 6 Perimeter Posts */}
      {[0, 60, 120, 180, 240, 300].map((ang, i) => {
        const rad = (ang * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.sin(rad) * 0.62, 0.52, Math.cos(rad) * 0.62]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
            <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
          </mesh>
        );
      })}
      {/* Hexagonal Copper/Slate Roof */}
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.82, 0.55, 6]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * Floating Category Beacon Crest for the 6 Primary Destinations
 */
export const DestinationBeacon: React.FC<{ role: DestinationType }> = ({ role }) => {
  const beaconRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!beaconRef.current) return;
    const t = clock.getElapsedTime();
    beaconRef.current.position.y = 2.45 + Math.sin(t * 2.2) * 0.08;
    beaconRef.current.rotation.y = t * 0.9;
  });

  const color =
    role === 'about'
      ? ANIME_PALETTE.roof.terracottaWarm
      : role === 'education'
      ? ANIME_PALETTE.water.lagoonSurface
      : role === 'experience'
      ? ANIME_PALETTE.foliage.autumnGold
      : role === 'projects'
      ? ANIME_PALETTE.foliage.leafMid
      : role === 'skills'
      ? ANIME_PALETTE.roof.slateBlueGrey
      : ANIME_PALETTE.foliage.flowerPoppy;

  return (
    <group ref={beaconRef} position={[0, 2.45, 0]}>
      {/* Floating Diamond / Gemstone Crest */}
      <mesh castShadow>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.65}
          roughness={0.25}
        />
      </mesh>
      {/* Soft Luminous Outer Halo */}
      <mesh>
        <torusGeometry args={[0.26, 0.018, 6, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
    </group>
  );
};

/**
 * MAIN BUILDING RENDERER SWITCHBOARD
 * Dispatches to the exact handcrafted model for all 24 buildings
 */
export const BuildingRenderer: React.FC<BuildingProps> = ({ building, glowIntensity }) => {
  const { type, visualTheme, destinationRole } = building;

  return (
    <group>
      {(() => {
        switch (type) {
          case 'little-house':
            return <LittleHouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'university':
            return <UniversityBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'workshop':
            return <WorkshopBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'invention-house':
            return <InventionHouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'library':
            return <LibraryBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'post-office':
            return <PostOfficeBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'town-hall':
            return <TownHallBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'windmill':
            return <WindmillBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'bakery':
            return <BakeryBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'observatory':
            return <ObservatoryBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'cottage-gardener':
            return <GardenerCottage theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'cottage-bookbinder':
            return <BookbinderCottage theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'cottage-fisherman':
            return <FishermanBoathouse theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'greenhouse':
            return <GreenhouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'tea-house':
            return <TeaHouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'lighthouse':
            return <LighthouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'blacksmith-workshop':
            return <BlacksmithForge theme={visualTheme} />;
          case 'weaver-house':
            return <WeaverGuildhouse theme={visualTheme} />;
          case 'apothecary':
            return <ApothecaryBuilding theme={visualTheme} />;
          case 'miller-house':
            return <MillerHouse theme={visualTheme} />;
          case 'barn-hayloft':
            return <BarnHayloft theme={visualTheme} />;
          case 'cider-shed':
            return <CiderShed theme={visualTheme} />;
          case 'apiary-cottage':
            return <ApiaryCottage theme={visualTheme} />;
          case 'pier-pavilion':
            return <PierPavilion theme={visualTheme} />;
          default:
            return <GardenerCottage theme={visualTheme} glowIntensity={glowIntensity} />;
        }
      })()}

      {/* Destination Marker Beacon for the 6 Primary Functional Buildings */}
      {destinationRole && <DestinationBeacon role={destinationRole} />}
    </group>
  );
};
