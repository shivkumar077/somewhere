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
  const { type, visualTheme, destinationRole } = building;

  return (
    <group>
      {/* 1. Building 3D Geometry */}
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
          case 'weaver-house':
            return <WeaverGuildhouse theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'greenhouse':
            return <GreenhouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'tea-house':
            return <TeaHouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          case 'lighthouse':
            return <LighthouseBuilding theme={visualTheme} glowIntensity={glowIntensity} />;
          default:
            return <GardenerCottage theme={visualTheme} glowIntensity={glowIntensity} />;
        }
      })()}

      {/* 2. Destination Marker Beacon for the 6 Primary Functional Buildings */}
      {destinationRole && (
        <DestinationBeacon role={destinationRole} />
      )}
    </group>
  );
};

/**
 * Grand Town Hall with Arched Portico, 3-Tier Clocktower & Weathervane
 */
const TownHallBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation Plinth */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.2, 1.25]} />
        <meshStandardMaterial color="#c2b8a3" roughness={0.9} />
      </mesh>

      {/* Main Civic Hall Body */}
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.72, 1.05]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Hall Gabled Roof */}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.95, 0.55, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Front Arched Portico Colonnade */}
      <group position={[0, 0.35, 0.58]}>
        {[-0.45, -0.15, 0.15, 0.45].map((colX, idx) => (
          <mesh key={idx} position={[colX, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.5, 8]} />
            <meshStandardMaterial color="#ded6c5" roughness={0.8} />
          </mesh>
        ))}
        {/* Portico Architrave */}
        <mesh position={[0, 0.27, 0]} castShadow>
          <boxGeometry args={[1.05, 0.08, 0.18]} />
          <meshStandardMaterial color="#c2b8a3" roughness={0.8} />
        </mesh>
      </group>

      {/* Central 3-Tier Clock Tower */}
      <mesh position={[0, 1.05, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.54, 0.95, 0.54]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Clock Face Room with Decorative Cornice */}
      <mesh position={[0, 1.58, 0.15]} castShadow>
        <boxGeometry args={[0.48, 0.32, 0.48]} />
        <meshStandardMaterial color="#c2b8a3" roughness={0.8} />
      </mesh>

      {/* Clock Tower Octagonal Spire */}
      <mesh position={[0, 1.95, 0.15]} castShadow>
        <coneGeometry args={[0.38, 0.75, 8]} />
        <meshStandardMaterial color={theme.accentColor || '#f4a261'} roughness={0.4} />
      </mesh>

      {/* Brass Weathervane Finial */}
      <mesh position={[0, 2.4, 0.15]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.22, 6]} />
        <meshStandardMaterial color="#ffd166" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Clock Face on Front */}
      <mesh position={[0, 1.25, 0.43]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.35 * glowIntensity}
          roughness={0.5}
        />
      </mesh>

      {/* Arched Entrance Double Door */}
      <mesh position={[0, 0.32, 0.54]}>
        <boxGeometry args={[0.32, 0.44, 0.04]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>

      {/* Stained Glass Windows on Flanks */}
      {[-0.42, 0.42].map((wx, idx) => (
        <mesh key={idx} position={[wx, 0.52, 0.54]}>
          <boxGeometry args={[0.22, 0.3, 0.03]} />
          <meshStandardMaterial
            color={theme.windowGlowColor}
            emissive={theme.windowGlowColor}
            emissiveIntensity={0.85 * glowIntensity}
            roughness={0.3}
          />
        </mesh>
      ))}
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
      {/* Stone Base Plinth */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.72, 0.2, 8]} />
        <meshStandardMaterial color="#bcc5b9" roughness={0.9} />
      </mesh>

      {/* Tapered Octagonal Body */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.58, 1.15, 8]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Conical Cap */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.48, 0.5, 8]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Window */}
      <mesh position={[0, 0.85, 0.48]}>
        <boxGeometry args={[0.18, 0.25, 0.04]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.85 * glowIntensity}
        />
      </mesh>

      {/* Timber Door */}
      <mesh position={[0, 0.3, 0.57]}>
        <boxGeometry args={[0.22, 0.4, 0.04]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>

      {/* Rotating Blades Assembly */}
      <group position={[0, 1.38, 0.44]}>
        {/* Hub Shaft */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.16, 8]} />
          <meshStandardMaterial color="#4a3525" />
        </mesh>

        <group ref={bladesRef}>
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
            <group key={idx} rotation={[0, 0, angle]}>
              {/* Spar Arm */}
              <mesh position={[0, 0.5, 0.02]} castShadow>
                <boxGeometry args={[0.04, 1.0, 0.02]} />
                <meshStandardMaterial color="#5c4033" />
              </mesh>
              {/* Canvas Sail */}
              <mesh position={[0.09, 0.56, 0.025]} castShadow>
                <boxGeometry args={[0.16, 0.72, 0.01]} />
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
      smokePuff1.current.position.y = 1.45 + ((t % 2) * 0.28);
      const s1 = 0.08 + ((t % 2) * 0.09);
      smokePuff1.current.scale.set(s1, s1, s1);
    }
    if (smokePuff2.current) {
      smokePuff2.current.position.y = 1.45 + (((t + 1) % 2) * 0.28);
      const s2 = 0.08 + (((t + 1) % 2) * 0.09);
      smokePuff2.current.scale.set(s2, s2, s2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main Bakery House */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.6, 0.85]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Steep Tiled Roof */}
      <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.74, 0.5, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Brick Chimney */}
      <mesh position={[0.28, 0.95, 0.16]} castShadow>
        <boxGeometry args={[0.18, 0.6, 0.18]} />
        <meshStandardMaterial color="#9c4132" roughness={0.9} />
      </mesh>

      {/* Chimney Smoke Puffs */}
      <mesh ref={smokePuff1} position={[0.28, 1.45, 0.16]}>
        <sphereGeometry args={[1, 7, 7]} />
        <meshStandardMaterial color="#f0eded" transparent opacity={0.65} roughness={0.9} />
      </mesh>
      <mesh ref={smokePuff2} position={[0.28, 1.55, 0.16]}>
        <sphereGeometry args={[1, 7, 7]} />
        <meshStandardMaterial color="#f0eded" transparent opacity={0.5} roughness={0.9} />
      </mesh>

      {/* Bakery Window with Warm Glow */}
      <mesh position={[-0.2, 0.38, 0.44]}>
        <boxGeometry args={[0.32, 0.28, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={glowIntensity}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0.24, 0.28, 0.44]}>
        <boxGeometry args={[0.2, 0.4, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>

      {/* Storybook Bread Signboard */}
      <mesh position={[-0.2, 0.65, 0.48]}>
        <boxGeometry args={[0.26, 0.11, 0.02]} />
        <meshStandardMaterial color="#f4a261" roughness={0.5} />
      </mesh>
    </group>
  );
};

/**
 * Weaver's Guildhouse with Blue-Slate Gables
 */
const WeaverGuildhouse: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.16, 0.75]} />
        <meshStandardMaterial color="#b7b7a4" roughness={0.85} />
      </mesh>

      {/* Main Timber Body */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.52, 0.7]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Steep Gable Roof */}
      <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.66, 0.46, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Woven Banner on Front Wall */}
      <mesh position={[0, 0.48, 0.36]} castShadow>
        <boxGeometry args={[0.28, 0.24, 0.02]} />
        <meshStandardMaterial color={theme.accentColor || '#e76f51'} roughness={0.8} />
      </mesh>

      {/* Glowing Window */}
      <mesh position={[-0.22, 0.36, 0.36]}>
        <boxGeometry args={[0.18, 0.22, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.85 * glowIntensity}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0.22, 0.26, 0.36]}>
        <boxGeometry args={[0.18, 0.36, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Stargazer Observatory Dome
 */
const ObservatoryBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Tower Body */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.56, 0.95, 16]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Copper Hemispherical Dome */}
      <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.54, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.4} />
      </mesh>

      {/* Telescope Tube */}
      <mesh position={[0.22, 1.35, 0.22]} rotation={[-Math.PI / 4, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.5, 8]} />
        <meshStandardMaterial color={theme.accentColor || '#ffd166'} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Observation Slit / Window */}
      <mesh position={[0, 0.6, 0.54]}>
        <boxGeometry args={[0.18, 0.28, 0.04]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.85 * glowIntensity}
        />
      </mesh>
    </group>
  );
};

/**
 * Herbalist's Cottage with Flower Planters
 */
const GardenerCottage: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Cottage Block */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.52, 0.72]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Steep Roof */}
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.66, 0.44, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Chimney */}
      <mesh position={[-0.24, 0.8, -0.1]} castShadow>
        <boxGeometry args={[0.14, 0.45, 0.14]} />
        <meshStandardMaterial color="#8a5a44" roughness={0.9} />
      </mesh>

      {/* Window */}
      <mesh position={[0.2, 0.35, 0.37]}>
        <boxGeometry args={[0.22, 0.22, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.9 * glowIntensity}
        />
      </mesh>

      {/* Planter Box under Window */}
      <mesh position={[0.2, 0.2, 0.39]} castShadow>
        <boxGeometry args={[0.24, 0.08, 0.08]} />
        <meshStandardMaterial color="#55a630" roughness={0.8} />
      </mesh>

      {/* Door */}
      <mesh position={[-0.18, 0.24, 0.37]}>
        <boxGeometry args={[0.18, 0.35, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Scholar / Bookbinder Cottage with Dormer
 */
const BookbinderCottage: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Cottage Block */}
      <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.56, 0.7]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Gable Roof */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.65, 0.46, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Attic Dormer Window */}
      <mesh position={[0, 0.72, 0.28]} castShadow>
        <boxGeometry args={[0.24, 0.24, 0.18]} />
        <meshStandardMaterial color={theme.wallColor} />
      </mesh>
      <mesh position={[0, 0.72, 0.38]}>
        <boxGeometry args={[0.16, 0.16, 0.02]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.85 * glowIntensity}
        />
      </mesh>

      {/* Lower Window */}
      <mesh position={[0.2, 0.34, 0.36]}>
        <boxGeometry args={[0.2, 0.2, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.9 * glowIntensity}
        />
      </mesh>

      {/* Door */}
      <mesh position={[-0.18, 0.24, 0.36]}>
        <boxGeometry args={[0.18, 0.36, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Fisherman's Boathouse with Stilt Base & Timber Dock
 */
const FishermanBoathouse: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Timber Stilt Pilings */}
      {[-0.35, 0.35].map((px, i) =>
        [-0.28, 0.28].map((pz, j) => (
          <mesh key={`${i}-${j}`} position={[px, 0.12, pz]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.24, 6]} />
            <meshStandardMaterial color="#495057" roughness={0.9} />
          </mesh>
        ))
      )}

      {/* Decking Plinth */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.06, 0.76]} />
        <meshStandardMaterial color="#6c584c" roughness={0.85} />
      </mesh>

      {/* Boathouse Body */}
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.76, 0.5, 0.64]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Salt-Air Slate Roof */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.62, 0.4, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Boathouse Window */}
      <mesh position={[0.18, 0.52, 0.33]}>
        <boxGeometry args={[0.18, 0.18, 0.03]} />
        <meshStandardMaterial
          color={theme.windowGlowColor}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.85 * glowIntensity}
        />
      </mesh>

      {/* Doorway facing pier */}
      <mesh position={[-0.16, 0.44, 0.33]}>
        <boxGeometry args={[0.18, 0.32, 0.03]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Sunlit Botanical Orangery / Greenhouse
 */
const GreenhouseBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Brick Plinth */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.2, 0.7]} />
        <meshStandardMaterial color="#c77dff" roughness={0.8} />
      </mesh>

      {/* Glass Solarium Frame */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.86, 0.48, 0.62]} />
        <meshStandardMaterial
          color={theme.roofColor}
          transparent
          opacity={0.65}
          roughness={0.2}
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.45 * glowIntensity}
        />
      </mesh>

      {/* Glass Gable Roof */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <coneGeometry args={[0.58, 0.38, 4]} />
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
      {/* Wooden Deck */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.12, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Posts */}
      {[
        [-0.38, -0.38],
        [0.38, -0.38],
        [-0.38, 0.38],
        [0.38, 0.38],
      ].map(([px, pz], i) => (
        <mesh key={i} position={[px, 0.46, pz]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.64, 6]} />
          <meshStandardMaterial color={theme.trimColor} />
        </mesh>
      ))}

      {/* Inner Chamber */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.52, 0.58]} />
        <meshStandardMaterial
          color="#faedcd"
          emissive={theme.windowGlowColor}
          emissiveIntensity={0.65 * glowIntensity}
          roughness={0.7}
        />
      </mesh>

      {/* Tiered Curved Roof */}
      <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.8, 0.35, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.5} />
      </mesh>
    </group>
  );
};

/**
 * Beacon Lighthouse & Lookout
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
      {/* Pier Base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.7, 0.16, 12]} />
        <meshStandardMaterial color="#6c757d" roughness={0.9} />
      </mesh>

      {/* Tower Body */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.48, 1.2, 12]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Red Storybook Band */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.28, 12]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Lantern Room */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.24, 10]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          emissive="#fff3b0"
          emissiveIntensity={1.3 * glowIntensity}
        />
      </mesh>

      {/* Point Light Source */}
      <pointLight
        ref={lightRef}
        position={[0, 1.45, 0]}
        color="#ffea75"
        distance={4.5}
        decay={2}
      />

      {/* Domed Cap */}
      <mesh position={[0, 1.58, 0]} castShadow>
        <coneGeometry args={[0.32, 0.22, 10]} />
        <meshStandardMaterial color={theme.trimColor} roughness={0.4} />
      </mesh>
    </group>
  );
};

/**
 * -------------------------------------------------------------
 * THE SIX PRIMARY FUNCTIONAL DESTINATION BUILDINGS (Prompt 05)
 * -------------------------------------------------------------
 */

/**
 * Floating Destination Crest Beacon for Primary Functional Buildings
 */
const DestinationBeacon: React.FC<{ role: string }> = ({ role }) => {
  const beaconRef = useRef<THREE.Group>(null);

  const beaconColors: Record<string, string> = {
    about: '#e76f51',
    education: '#2a9d8f',
    experience: '#e9c46a',
    projects: '#9d4edd',
    skills: '#0ea5e9',
    contact: '#f4a261',
  };

  const color = beaconColors[role] || '#f4a261';

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      const t = clock.getElapsedTime();
      beaconRef.current.position.y = 2.1 + Math.sin(t * 2.2) * 0.08;
      beaconRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group ref={beaconRef} position={[0, 2.1, 0]}>
      <mesh castShadow>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      <pointLight color={color} intensity={0.4} distance={2.5} />
    </group>
  );
};

/**
 * 1. Little House — About Me
 * A cozy storybook cottage with timber porch, warm chimney smoke, and blossoming planter boxes.
 */
const LittleHouseBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Foundation */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.16, 1.05]} />
        <meshStandardMaterial color="#c2b8a3" roughness={0.9} />
      </mesh>

      {/* Main Cozy Timber Wall Body */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.08, 0.64, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.75} />
      </mesh>

      {/* Terracotta Gable Roof */}
      <mesh position={[0, 0.95, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.82, 0.52, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Cozy Front Porch */}
      <group position={[0, 0.28, 0.52]}>
        {[-0.28, 0.28].map((px, i) => (
          <mesh key={i} position={[px, 0, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.42, 6]} />
            <meshStandardMaterial color={theme.trimColor} roughness={0.8} />
          </mesh>
        ))}
        {/* Porch Awning */}
        <mesh position={[0, 0.22, 0]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.72, 0.06, 0.24]} />
          <meshStandardMaterial color={theme.roofColor} roughness={0.65} />
        </mesh>
      </group>

      {/* Warm Front Door */}
      <mesh position={[0, 0.32, 0.48]}>
        <boxGeometry args={[0.22, 0.44, 0.02]} />
        <meshStandardMaterial color="#6f4e37" roughness={0.6} />
      </mesh>

      {/* Glowing Storybook Window */}
      <mesh position={[0.34, 0.45, 0.48]}>
        <boxGeometry args={[0.22, 0.24, 0.02]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={theme.windowGlowColor || '#ffe57f'}
          emissiveIntensity={1.2 * glowIntensity}
          roughness={0.2}
        />
      </mesh>

      {/* Stone Chimney */}
      <mesh position={[-0.34, 0.92, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.52, 0.18]} />
        <meshStandardMaterial color="#8d8174" roughness={0.9} />
      </mesh>
    </group>
  );
};

/**
 * 2. University — Education (Techno India University)
 * Classical storybook collegiate hall with pillared portico, pediment, and bell cupola.
 */
const UniversityBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stepped Stone Plinth */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.16, 1.3]} />
        <meshStandardMaterial color="#ded6c5" roughness={0.85} />
      </mesh>

      {/* Main Academic Hall */}
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.84, 1.1]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Hall Hip Roof */}
      <mesh position={[0, 1.15, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.15, 0.52, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Classical Pillared Portico */}
      <group position={[0, 0.42, 0.6]}>
        {[-0.45, -0.15, 0.15, 0.45].map((colX, idx) => (
          <mesh key={idx} position={[colX, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.68, 8]} />
            <meshStandardMaterial color="#ede8dd" roughness={0.65} />
          </mesh>
        ))}
        {/* Triangular Classical Pediment */}
        <mesh position={[0, 0.44, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.62, 0.28, 3]} />
          <meshStandardMaterial color="#ded6c5" roughness={0.7} />
        </mesh>
      </group>

      {/* Central Scholar's Bell Cupola */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.38, 8]} />
        <meshStandardMaterial color="#ede8dd" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.24, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#588157" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Glowing Arched Hall Windows */}
      {[-0.48, 0.48].map((wx, idx) => (
        <mesh key={idx} position={[wx, 0.54, 0.56]}>
          <boxGeometry args={[0.18, 0.32, 0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={theme.windowGlowColor || '#ffe57f'}
            emissiveIntensity={1.2 * glowIntensity}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 3. Workshop — Experience (Practical Systems & Craft)
 * An artisanal engineering workshop with stepped saw-tooth roof, copper forge chimney, and timber beam.
 */
const WorkshopBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Plinth */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.16, 1.15]} />
        <meshStandardMaterial color="#a69c8a" roughness={0.9} />
      </mesh>

      {/* Timber & Brick Workshop Main Structure */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.64, 1.0]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.8} />
      </mesh>

      {/* Stepped Clerestory Sawtooth Roof */}
      <mesh position={[-0.2, 0.94, 0]} rotation={[0, 0, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.12, 1.05]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>
      <mesh position={[0.28, 0.84, 0]} rotation={[0, 0, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.1, 1.05]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Copper Forge Exhaust Flue */}
      <mesh position={[0.38, 1.1, 0.25]} castShadow>
        <cylinderGeometry args={[0.09, 0.12, 0.65, 8]} />
        <meshStandardMaterial color="#b05d3b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Timber Workbeam & Pulley */}
      <mesh position={[-0.45, 0.65, 0.58]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.35]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.8} />
      </mesh>

      {/* Glowing Forge Window */}
      <mesh position={[0, 0.44, 0.51]}>
        <boxGeometry args={[0.35, 0.28, 0.02]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#f4a261"
          emissiveIntensity={1.4 * glowIntensity}
        />
      </mesh>
    </group>
  );
};

/**
 * 4. Invention House — Projects (Shadow Exchange, ASTRA, Faultline, ForgeFit, VEENA)
 * Whimsical inventor's laboratory with rotating rooftop brass gyroscope and copper dome.
 */
const InventionHouseBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  const gyroRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gyroRef.current) {
      gyroRef.current.rotation.y = clock.getElapsedTime() * 1.2;
      gyroRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stone Base */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.82, 0.2, 12]} />
        <meshStandardMaterial color="#b5aa99" roughness={0.9} />
      </mesh>

      {/* Octagonal Laboratory Tower */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.72, 0.8, 8]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Copper Hemispherical Dome */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <sphereGeometry args={[0.62, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#588157" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Whimsical Inventor's Gyroscope Assembly */}
      <group ref={gyroRef} position={[0, 1.48, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.22, 0.03, 8, 20]} />
          <meshStandardMaterial color="#f4a261" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.15, 0.025, 8, 20]} />
          <meshStandardMaterial color="#ffd166" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#e76f51" emissive="#e76f51" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Glowing Round Porthole Windows */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0]} position={[0, 0.6, 0]}>
          <mesh position={[0, 0, 0.69]}>
            <circleGeometry args={[0.12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#a0e7e5"
              emissiveIntensity={1.3 * glowIntensity}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/**
 * 5. Library — Skills & Technical Knowledge
 * Grand storybook library with vaulted entry arch, stone book motif, and lantern skylight.
 */
const LibraryBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Foundation & Wide Entrance Steps */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.16, 1.25]} />
        <meshStandardMaterial color="#c7bcab" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.04, 0.65]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.22]} />
        <meshStandardMaterial color="#b3a594" roughness={0.9} />
      </mesh>

      {/* Main Stone Library Hall */}
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.42, 0.84, 1.05]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Mansard / Curved Library Roof */}
      <mesh position={[0, 1.15, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.1, 0.54, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.65} />
      </mesh>

      {/* Lantern Skylight */}
      <mesh position={[0, 1.36, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.22, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffe57f"
          emissiveIntensity={1.2 * glowIntensity}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Grand Arch Entryway */}
      <mesh position={[0, 0.42, 0.54]} castShadow>
        <boxGeometry args={[0.36, 0.52, 0.04]} />
        <meshStandardMaterial color="#4a3b32" roughness={0.6} />
      </mesh>

      {/* Book Symbol Plaque over Lintel */}
      <mesh position={[0, 0.74, 0.55]} castShadow>
        <boxGeometry args={[0.24, 0.12, 0.04]} />
        <meshStandardMaterial color="#f4a261" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Tall Arched Reading Windows */}
      {[-0.45, 0.45].map((wx, i) => (
        <mesh key={i} position={[wx, 0.55, 0.54]}>
          <boxGeometry args={[0.2, 0.38, 0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={theme.windowGlowColor || '#ffeaa7'}
            emissiveIntensity={1.2 * glowIntensity}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 6. Post Office — Contact
 * Village mailhouse with postal horn crest, red mail collection box, and delivery awning.
 */
const PostOfficeBuilding: React.FC<{ theme: BuildingItem['visualTheme']; glowIntensity: number }> = ({
  theme,
  glowIntensity,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Foundation */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.16, 1.05]} />
        <meshStandardMaterial color="#c2b8a3" roughness={0.9} />
      </mesh>

      {/* Main Mailhouse Body */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.64, 0.95]} />
        <meshStandardMaterial color={theme.wallColor} roughness={0.7} />
      </mesh>

      {/* Storybook Gable Roof with Dormer */}
      <mesh position={[0, 0.96, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.88, 0.55, 4]} />
        <meshStandardMaterial color={theme.roofColor} roughness={0.6} />
      </mesh>

      {/* Striped Postal Awning over Counter Window */}
      <mesh position={[0.28, 0.58, 0.52]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.42, 0.06, 0.22]} />
        <meshStandardMaterial color="#d66d58" roughness={0.6} />
      </mesh>

      {/* Postal Counter Window */}
      <mesh position={[0.28, 0.42, 0.48]}>
        <boxGeometry args={[0.32, 0.24, 0.02]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={theme.windowGlowColor || '#ffe57f'}
          emissiveIntensity={1.1 * glowIntensity}
        />
      </mesh>

      {/* Entrance Door */}
      <mesh position={[-0.26, 0.34, 0.48]}>
        <boxGeometry args={[0.22, 0.46, 0.02]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.7} />
      </mesh>

      {/* Scarlet Storybook Pillar Mailbox */}
      <group position={[-0.52, 0.22, 0.56]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.42, 10]} />
          <meshStandardMaterial color="#d62828" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.08, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d62828" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
