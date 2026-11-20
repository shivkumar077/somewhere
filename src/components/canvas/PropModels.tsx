import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PropItem } from '../../world/types';

interface PropProps {
  prop: PropItem;
  lanternGlowIntensity: number;
}

export const PropRenderer: React.FC<PropProps> = ({ prop, lanternGlowIntensity }) => {
  const { type, color, secondaryColor } = prop;

  switch (type) {
    case 'tree-round':
      return <RoundTree color={color || '#7cb518'} />;
    case 'tree-pine':
      return <PineTree color={color || '#2d6a4f'} />;
    case 'tree-blossom':
      return <BlossomTree color={color || '#f7a8b8'} />;
    case 'lantern':
      return <StreetLantern glowIntensity={lanternGlowIntensity} />;
    case 'bench':
      return <ParkBench color={color || '#7f5539'} />;
    case 'well':
      return <VillageWell />;
    case 'flower-patch':
      return <FlowerPatch color={color || '#f72585'} secondaryColor={secondaryColor || '#ffd166'} />;
    default:
      return <RoundTree color={color || '#7cb518'} />;
  }
};

/**
 * Stylized Round Tree (Fluffy cloud-like canopy)
 */
const RoundTree: React.FC<{ color: string }> = ({ color }) => {
  const crownRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crownRef.current) {
      // Gentle wind breeze sway
      const t = clock.getElapsedTime() * 1.2;
      crownRef.current.rotation.z = Math.sin(t) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Wooden Trunk */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 6]} />
        <meshStandardMaterial color="#6f4e37" roughness={0.9} />
      </mesh>

      {/* Fluffy Rounded Foliage Cluster */}
      <group ref={crownRef} position={[0, 0.85, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.42, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
        <mesh position={[-0.15, 0, 0.1]} castShadow receiveShadow>
          <sphereGeometry args={[0.3, 7, 7]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
        <mesh position={[0.16, 0.05, -0.08]} castShadow receiveShadow>
          <sphereGeometry args={[0.32, 7, 7]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Storybook Tiered Pine Tree
 */
const PineTree: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Trunk */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#583101" roughness={0.9} />
      </mesh>

      {/* Tier 1 Cone */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.42, 0.45, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Tier 2 Cone */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.32, 0.4, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>

      {/* Tier 3 Cone Top */}
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.2, 0.35, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Whimsical Blossom Tree
 */
const BlossomTree: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Curved Trunk */}
      <mesh position={[0.02, 0.35, 0]} rotation={[0, 0, 0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.11, 0.7, 6]} />
        <meshStandardMaterial color="#5c4d3c" roughness={0.9} />
      </mesh>

      {/* Pastel Flower Canopy */}
      <group position={[0, 0.9, 0]}>
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.45, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0.18, -0.05, 0.12]} castShadow receiveShadow>
          <sphereGeometry args={[0.3, 6, 6]} />
          <meshStandardMaterial color="#ffe5ec" roughness={0.6} />
        </mesh>
        <mesh position={[-0.15, -0.02, -0.1]} castShadow receiveShadow>
          <sphereGeometry args={[0.32, 6, 6]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Street Lantern that Illuminates at Evening and Night
 */
const StreetLantern: React.FC<{ glowIntensity: number }> = ({ glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Iron Post */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.04, 0.7, 6]} />
        <meshStandardMaterial color="#2b2d42" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Curved Arm */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.03]} />
        <meshStandardMaterial color="#2b2d42" />
      </mesh>

      {/* Glass Lantern Housing */}
      <mesh position={[0.06, 0.68, 0]} castShadow>
        <boxGeometry args={[0.08, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#ffdd59"
          emissive="#ffba08"
          emissiveIntensity={1.5 * glowIntensity}
          roughness={0.3}
        />
      </mesh>

      {/* Point light for nighttime illumination */}
      <pointLight
        position={[0.06, 0.68, 0]}
        color="#ffaa33"
        intensity={glowIntensity * 1.5}
        distance={2.5}
        decay={2}
      />
    </group>
  );
};

/**
 * Wooden Park Bench
 */
const ParkBench: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Seat Slat */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.03, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.22, -0.06]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.12, 0.03]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.16, 0.06, 0]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.14]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.16, 0.06, 0]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.14]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};

/**
 * Town Square Stone Well
 */
const VillageWell: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Ring */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.36, 10]} />
        <meshStandardMaterial color="#8d99ae" roughness={0.9} />
      </mesh>
      {/* Water inside */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 10]} />
        <meshStandardMaterial color="#48cae4" roughness={0.1} />
      </mesh>
      {/* Timber Roof Posts */}
      <mesh position={[-0.18, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#7f5539" />
      </mesh>
      <mesh position={[0.18, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#7f5539" />
      </mesh>
      {/* Well Canopy */}
      <mesh position={[0, 0.68, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.2, 4]} />
        <meshStandardMaterial color="#9d4edd" roughness={0.6} />
      </mesh>
    </group>
  );
};

/**
 * Colorful Flower Patch
 */
const FlowerPatch: React.FC<{ color: string; secondaryColor: string }> = ({ color, secondaryColor }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Green foliage base */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.04, 6]} />
        <meshStandardMaterial color="#55a630" roughness={0.9} />
      </mesh>
      {/* Flower Buds */}
      <mesh position={[-0.06, 0.07, 0.04]} castShadow>
        <sphereGeometry args={[0.04, 5, 5]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0.06, 0.08, -0.04]} castShadow>
        <sphereGeometry args={[0.04, 5, 5]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.5} />
      </mesh>
      <mesh position={[0.02, 0.09, 0.05]} castShadow>
        <sphereGeometry args={[0.045, 5, 5]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
};

