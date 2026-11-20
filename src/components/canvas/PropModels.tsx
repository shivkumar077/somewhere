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
    case 'tree-apple':
      return <AppleTree color={color || '#52b788'} />;
    case 'tree-willow':
      return <WeepingWillow color={color || '#74c69d'} />;
    case 'lantern':
      return <StreetLantern glowIntensity={lanternGlowIntensity} />;
    case 'fountain':
      return <StoneFountain />;
    case 'market-stall':
      return <MarketStall color={color || '#e76f51'} />;
    case 'cart':
      return <TimberCart />;
    case 'bridge':
      return <StoneArchBridge />;
    case 'rowboat':
      return <Rowboat color={color || '#7f5539'} />;
    case 'bench':
      return <ParkBench color={color || '#7f5539'} />;
    case 'well':
      return <VillageWell />;
    case 'garden-plot':
      return <GardenPlot />;
    case 'fence':
      return <TimberFence />;
    case 'barrel-stack':
      return <BarrelStack />;
    case 'flower-patch':
      return <FlowerPatch color={color || '#f72585'} secondaryColor={secondaryColor || '#ffd166'} />;
    default:
      return <RoundTree color={color || '#7cb518'} />;
  }
};

/**
 * Town Center Stone Fountain
 */
const StoneFountain: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Outer Stone Basin */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.68, 0.24, 16]} />
        <meshStandardMaterial color="#b7b7a4" roughness={0.85} />
      </mesh>
      {/* Water Pool */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.54, 0.54, 0.04, 16]} />
        <meshStandardMaterial color="#48cae4" roughness={0.15} metalness={0.2} transparent opacity={0.88} />
      </mesh>
      {/* Central Pillar */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.4, 8]} />
        <meshStandardMaterial color="#a5a58d" roughness={0.8} />
      </mesh>
      {/* Upper Spire Bowl */}
      <mesh position={[0, 0.54, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.14, 0.12, 12]} />
        <meshStandardMaterial color="#b7b7a4" roughness={0.85} />
      </mesh>
      {/* Spire Finial */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#e9c46a" metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
};

/**
 * Storybook Market Stall with Striped Awning
 */
const MarketStall: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Wooden Table Counter */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.36, 0.35]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.8} />
      </mesh>
      {/* Corner Posts */}
      {[-0.26, 0.26].map((x, i) =>
        [-0.14, 0.14].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.44, z]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.52, 6]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
        ))
      )}
      {/* Striped Canopy Awning */}
      <mesh position={[0, 0.72, 0]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.68, 0.04, 0.42]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Fruit / Vegetable Crates */}
      <mesh position={[-0.14, 0.38, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#f4a261" />
      </mesh>
      <mesh position={[0.14, 0.38, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#2a9d8f" />
      </mesh>
    </group>
  );
};

/**
 * Rustic Timber Cart
 */
const TimberCart: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Cart Box Bed */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.16, 0.32]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.85} />
      </mesh>
      {/* Wooden Wheels */}
      {[-0.18, 0.18].map((z, i) => (
        <mesh key={i} position={[0, 0.12, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.03, 10]} />
          <meshStandardMaterial color="#4e342e" roughness={0.9} />
        </mesh>
      ))}
      {/* Pull Handle Shafts */}
      <mesh position={[0.3, 0.12, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.32, 0.03, 0.18]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
    </group>
  );
};

/**
 * Stone Arch Bridge
 */
const StoneArchBridge: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Main Arch Span */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.1, 0.34]} />
        <meshStandardMaterial color="#a5a58d" roughness={0.85} />
      </mesh>
      {/* Stone Parapet Rails */}
      {[-0.16, 0.16].map((z, idx) => (
        <mesh key={idx} position={[0, 0.26, z]} castShadow>
          <boxGeometry args={[0.85, 0.14, 0.05]} />
          <meshStandardMaterial color="#b7b7a4" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Docked Rowboat
 */
const Rowboat: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Boat Hull */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.14, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Seat Planks */}
      <mesh position={[0, 0.13, 0]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.24]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      {/* Oars */}
      <mesh position={[0, 0.16, 0.12]} rotation={[0.1, 0.2, 0]} castShadow>
        <boxGeometry args={[0.55, 0.02, 0.03]} />
        <meshStandardMaterial color="#e9c46a" />
      </mesh>
    </group>
  );
};

/**
 * Apple Orchard Tree with Tiny Red Apples
 */
const AppleTree: React.FC<{ color: string }> = ({ color }) => {
  const crownRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crownRef.current) {
      crownRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.13, 0.75, 6]} />
        <meshStandardMaterial color="#6f4e37" roughness={0.9} />
      </mesh>

      <group ref={crownRef} position={[0, 0.92, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.46, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
        {/* Tiny Red Apples */}
        {[
          [-0.2, -0.05, 0.2],
          [0.22, 0.08, -0.15],
          [-0.1, 0.18, 0.25],
          [0.18, -0.1, 0.22],
        ].map(([ax, ay, az], i) => (
          <mesh key={i} position={[ax, ay, az]} castShadow>
            <sphereGeometry args={[0.045, 6, 6]} />
            <meshStandardMaterial color="#e63946" roughness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * Weeping Willow Tree near Lagoon
 */
const WeepingWillow: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Gnarled Trunk */}
      <mesh position={[0.04, 0.4, 0]} rotation={[0, 0, 0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.14, 0.8, 6]} />
        <meshStandardMaterial color="#583101" roughness={0.9} />
      </mesh>

      {/* Cascading Canopy */}
      <group position={[0, 0.95, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.48, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
        {/* Drooping Foliage Clusters */}
        {[
          [-0.25, -0.18, 0.1],
          [0.28, -0.2, -0.08],
          [0, -0.22, 0.26],
          [-0.12, -0.25, -0.22],
        ].map(([dx, dy, dz], idx) => (
          <mesh key={idx} position={[dx, dy, dz]} castShadow>
            <cylinderGeometry args={[0.18, 0.12, 0.35, 6]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * Raised Wooden Garden Allotment Plot
 */
const GardenPlot: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Timber Edging */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.12, 0.42]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      {/* Dark Soil */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.54, 0.06, 0.34]} />
        <meshStandardMaterial color="#3e2723" roughness={0.95} />
      </mesh>
      {/* Vegetable Heads (Cabbages / Carrots) */}
      {[-0.16, 0, 0.16].map((vx, i) =>
        [-0.08, 0.08].map((vz, j) => (
          <mesh key={`${i}-${j}`} position={[vx, 0.16, vz]} castShadow>
            <sphereGeometry args={[0.045, 5, 5]} />
            <meshStandardMaterial color={j === 0 ? '#55a630' : '#2d6a4f'} />
          </mesh>
        ))
      )}
    </group>
  );
};

/**
 * Rustic Stack of Wooden Barrels
 */
const BarrelStack: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[-0.1, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.24, 8]} />
        <meshStandardMaterial color="#6d4c41" roughness={0.85} />
      </mesh>
      <mesh position={[0.1, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.24, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.22, 8]} />
        <meshStandardMaterial color="#795548" roughness={0.85} />
      </mesh>
    </group>
  );
};

/**
 * Timber Post and Rail Fence
 */
const TimberFence: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 2 Posts */}
      {[-0.24, 0.24].map((px, i) => (
        <mesh key={i} position={[px, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.32, 6]} />
          <meshStandardMaterial color="#6f4e37" />
        </mesh>
      ))}
      {/* 2 Rails */}
      {[0.12, 0.24].map((ry, i) => (
        <mesh key={i} position={[0, ry, 0]} castShadow>
          <boxGeometry args={[0.54, 0.025, 0.02]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Stylized Round Tree
 */
const RoundTree: React.FC<{ color: string }> = ({ color }) => {
  const crownRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crownRef.current) {
      crownRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 6]} />
        <meshStandardMaterial color="#6f4e37" roughness={0.9} />
      </mesh>

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
 * Tiered Pine Tree
 */
const PineTree: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#583101" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.42, 0.45, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.32, 0.4, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.2, 0.35, 6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Blossom Tree
 */
const BlossomTree: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0.02, 0.35, 0]} rotation={[0, 0, 0.08]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.11, 0.7, 6]} />
        <meshStandardMaterial color="#5c4d3c" roughness={0.9} />
      </mesh>

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
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.04, 0.7, 6]} />
        <meshStandardMaterial color="#2b2d42" metalness={0.5} roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.03]} />
        <meshStandardMaterial color="#2b2d42" />
      </mesh>

      <mesh position={[0.06, 0.68, 0]} castShadow>
        <boxGeometry args={[0.08, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#ffdd59"
          emissive="#ffba08"
          emissiveIntensity={1.5 * glowIntensity}
          roughness={0.3}
        />
      </mesh>

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
 * Park Bench
 */
const ParkBench: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.03, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.22, -0.06]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.12, 0.03]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
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
 * Village Well
 */
const VillageWell: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.36, 10]} />
        <meshStandardMaterial color="#8d99ae" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 10]} />
        <meshStandardMaterial color="#48cae4" roughness={0.1} />
      </mesh>
      <mesh position={[-0.18, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#7f5539" />
      </mesh>
      <mesh position={[0.18, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#7f5539" />
      </mesh>
      <mesh position={[0, 0.68, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.2, 4]} />
        <meshStandardMaterial color="#9d4edd" roughness={0.6} />
      </mesh>
    </group>
  );
};

/**
 * Flower Patch
 */
const FlowerPatch: React.FC<{ color: string; secondaryColor: string }> = ({ color, secondaryColor }) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.04, 6]} />
        <meshStandardMaterial color="#55a630" roughness={0.9} />
      </mesh>
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
