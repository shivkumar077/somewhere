import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PropItem } from '../../world/types';
import { ANIME_PALETTE } from '../../styles/painterlyPalette';

interface PropProps {
  prop: PropItem;
  lanternGlowIntensity: number;
}

/**
 * SOFT PAINTERLY ANIME PROPS & VEGETATION
 * Layered organic silhouettes, multi-tonal foliage clumps, natural stone, and warm timber.
 */
export const PropRenderer: React.FC<PropProps> = ({ prop, lanternGlowIntensity }) => {
  const { type, color, secondaryColor } = prop;

  switch (type) {
    case 'tree-round':
      return <AnimeRoundTree color={color || ANIME_PALETTE.grass.meadow} />;
    case 'tree-pine':
      return <AnimePineTree color={color || ANIME_PALETTE.grass.forestCanopy} />;
    case 'tree-blossom':
      return <AnimeBlossomTree color={color || ANIME_PALETTE.foliage.blossomPink} />;
    case 'tree-apple':
      return (
        <AnimeAppleTree
          color={color || ANIME_PALETTE.grass.sunlit}
          appleColor={secondaryColor || ANIME_PALETTE.foliage.flowerPoppy}
        />
      );
    case 'tree-willow':
      return <AnimeWeepingWillow color={color || ANIME_PALETTE.foliage.willowPale} />;
    case 'lantern':
      return <StreetLantern glowIntensity={lanternGlowIntensity} />;
    case 'fountain':
      return <StoneFountain />;
    case 'market-stall':
      return <MarketStall color={color || ANIME_PALETTE.roof.terracottaWarm} />;
    case 'cart':
      return <TimberCart color={color || ANIME_PALETTE.earth.timberWarm} />;
    case 'bridge':
      return <StoneArchBridge color={color || ANIME_PALETTE.earth.fieldstone} />;
    case 'rowboat':
      return <Rowboat color={color || ANIME_PALETTE.earth.timberWarm} />;
    case 'bench':
      return <ParkBench color={color || ANIME_PALETTE.earth.timberDark} />;
    case 'well':
      return <VillageWell />;
    case 'garden-plot':
      return <GardenPlot />;
    case 'fence':
      return <TimberFence />;
    case 'barrel-stack':
      return <BarrelStack />;
    case 'flower-patch':
      return (
        <FlowerPatch
          color={color || ANIME_PALETTE.foliage.flowerPoppy}
          secondaryColor={secondaryColor || ANIME_PALETTE.foliage.flowerButtercup}
        />
      );
    default:
      return <AnimeRoundTree color={color || ANIME_PALETTE.grass.meadow} />;
  }
};

/**
 * 1. ANIME ROUND TREE
 * Multi-clump layered foliage with warm timber gnarled trunk and subtle wind sway
 */
export const AnimeRoundTree: React.FC<{ color: string }> = ({ color }) => {
  const canopyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (canopyRef.current) {
      const t = clock.getElapsedTime();
      canopyRef.current.rotation.z = Math.sin(t * 1.1) * 0.025;
      canopyRef.current.rotation.x = Math.cos(t * 0.9) * 0.018;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Gnarled Timber Trunk with Root Flare */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.16, 0.9, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.92} />
      </mesh>
      {/* Branch Split */}
      <mesh position={[0.06, 0.85, 0]} rotation={[0, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.4, 6]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.92} />
      </mesh>

      {/* Layered Foliage Cloud Clumps */}
      <group position={[0, 1.25, 0]} ref={canopyRef}>
        {/* Main Central Crown Clump */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.55, 12, 10]} />
          <meshStandardMaterial color={color} roughness={0.88} />
        </mesh>
        {/* Upper Sunlit Highlight Clump */}
        <mesh position={[0.08, 0.52, 0.05]} castShadow>
          <sphereGeometry args={[0.38, 10, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.grass.sunlit} roughness={0.85} />
        </mesh>
        {/* Left Side Clump */}
        <mesh position={[-0.32, 0.12, 0.12]} castShadow receiveShadow>
          <sphereGeometry args={[0.42, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.88} />
        </mesh>
        {/* Right Side Clump */}
        <mesh position={[0.35, 0.08, -0.08]} castShadow receiveShadow>
          <sphereGeometry args={[0.44, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.88} />
        </mesh>
        {/* Deep Understory Shaded Clump */}
        <mesh position={[0, -0.12, 0]} receiveShadow>
          <sphereGeometry args={[0.48, 10, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.grass.shadowGreen} roughness={0.92} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * 2. ANIME BLOSSOM TREE (Cherry / Apricot Blossom)
 */
export const AnimeBlossomTree: React.FC<{ color: string }> = ({ color }) => {
  const canopyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (canopyRef.current) {
      const t = clock.getElapsedTime();
      canopyRef.current.rotation.z = Math.sin(t * 1.0) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.15, 1.0, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.92} />
      </mesh>
      <group position={[0, 1.35, 0]} ref={canopyRef}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.56, 12, 10]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
        <mesh position={[0.28, 0.15, 0.15]} castShadow>
          <sphereGeometry args={[0.42, 10, 8]} />
          <meshStandardMaterial color={ANIME_PALETTE.foliage.blossomApricot} roughness={0.85} />
        </mesh>
        <mesh position={[-0.3, 0.1, -0.1]} castShadow>
          <sphereGeometry args={[0.44, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
        <mesh position={[0.05, 0.5, -0.05]} castShadow>
          <sphereGeometry args={[0.35, 10, 8]} />
          <meshStandardMaterial color="#fff0f3" roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * 3. ANIME APPLE TREE (Orchard)
 */
export const AnimeAppleTree: React.FC<{ color: string; appleColor?: string }> = ({
  color,
  appleColor = ANIME_PALETTE.foliage.flowerPoppy,
}) => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.84, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.92} />
      </mesh>
      <group position={[0, 1.15, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.52, 12, 10]} />
          <meshStandardMaterial color={color} roughness={0.88} />
        </mesh>
        {/* Red Apples scattered across canopy */}
        {[
          [0.32, 0.1, 0.3],
          [-0.34, 0.05, 0.22],
          [0.1, 0.32, 0.35],
          [-0.2, 0.25, -0.32],
          [0.28, -0.05, -0.3],
          [-0.15, -0.1, 0.38],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color={appleColor} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * 4. ANIME WEEPING WILLOW (Streams & Ponds)
 */
export const AnimeWeepingWillow: React.FC<{ color: string }> = ({ color }) => {
  const willowRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (willowRef.current) {
      willowRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.03;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Curved Gnarled Trunk */}
      <mesh position={[0, 0.55, 0]} rotation={[0.1, 0, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.18, 1.1, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
      </mesh>

      {/* Cascading Canopy */}
      <group position={[0.08, 1.4, 0.08]} ref={willowRef}>
        <mesh castShadow>
          <sphereGeometry args={[0.58, 12, 10]} />
          <meshStandardMaterial color={color} roughness={0.88} />
        </mesh>
        {/* Drooping curtain tendrils */}
        {[0, 60, 120, 180, 240, 300].map((ang, i) => {
          const rad = (ang * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.sin(rad) * 0.44, -0.28, Math.cos(rad) * 0.44]}
              rotation={[0.15, rad, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.12, 0.04, 0.65, 6]} />
              <meshStandardMaterial color={color} roughness={0.88} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

/**
 * 5. ANIME PINE TREE (High Bluffs & Crags)
 */
export const AnimePineTree: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Straight Pine Trunk */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.9, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
      </mesh>

      {/* 3 Tiered Layered Pine Cones */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.55, 0.65, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.42, 0.58, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.6, 0]} castShadow>
        <coneGeometry args={[0.28, 0.5, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.grass.meadow} roughness={0.88} />
      </mesh>
    </group>
  );
};

/**
 * 6. TOWN SQUARE STONE FOUNTAIN
 */
export const StoneFountain: React.FC = () => {
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (rippleRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.03;
      rippleRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Lower Octagonal Basin */}
      <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.72, 0.28, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      {/* Shimmering Pool Water */}
      <mesh position={[0, 0.24, 0]} ref={rippleRef} receiveShadow>
        <cylinderGeometry args={[0.56, 0.56, 0.04, 8]} />
        <meshStandardMaterial
          color={ANIME_PALETTE.water.lagoonShallow}
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Central Carved Baluster */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.42, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.9} />
      </mesh>
      {/* Upper Tier Water Bowl */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.16, 0.14, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      {/* Brass Spire Finial */}
      <mesh position={[0, 0.76, 0]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.foliage.autumnGold} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};

/**
 * 7. VILLAGE WELL
 */
export const VillageWell: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Well Cylinder */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.44, 10]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.fieldstone} roughness={0.95} />
      </mesh>
      {/* Two Timber Support Posts */}
      {[-0.28, 0.28].map((px, i) => (
        <mesh key={i} position={[px, 0.58, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 6]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
        </mesh>
      ))}
      {/* Gabled Shingle Roof */}
      <mesh position={[0, 0.98, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.48, 0.32, 4]} />
        <meshStandardMaterial color={ANIME_PALETTE.roof.terracottaDeep} roughness={0.88} />
      </mesh>
    </group>
  );
};

/**
 * 8. STONE ARCH BRIDGE
 */
export const StoneArchBridge: React.FC<{ color?: string }> = ({
  color = ANIME_PALETTE.earth.fieldstone,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Curved Deck */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.14, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      {/* Stone Parapets on both sides */}
      {[-0.24, 0.24].map((pz, i) => (
        <mesh key={i} position={[0, 0.3, pz]} castShadow>
          <boxGeometry args={[1.2, 0.18, 0.08]} />
          <meshStandardMaterial color={color} roughness={0.95} />
        </mesh>
      ))}
      {/* Keystone Arch Opening */}
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.56, 12, 1, false, 0, Math.PI]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

/**
 * 9. STREET LANTERN
 */
export const StreetLantern: React.FC<{ glowIntensity: number }> = ({ glowIntensity }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Cast Iron Post */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.045, 0.9, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
      </mesh>
      {/* Glass Lantern Housing */}
      <mesh position={[0, 0.96, 0]} castShadow>
        <boxGeometry args={[0.15, 0.18, 0.15]} />
        <meshStandardMaterial
          color={ANIME_PALETTE.lighting.lanternCore}
          emissive={ANIME_PALETTE.lighting.lanternCore}
          emissiveIntensity={Math.max(0.35, glowIntensity * 1.1)}
          roughness={0.2}
        />
      </mesh>
      {/* Iron Cap */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <coneGeometry args={[0.12, 0.09, 4]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
      </mesh>
    </group>
  );
};

/**
 * 10. TIMBER CART
 */
export const TimberCart: React.FC<{ color?: string }> = ({
  color = ANIME_PALETTE.earth.timberWarm,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Cart Bed */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.18, 0.48]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Twin Wooden Wheels */}
      {[-0.28, 0.28].map((wz, i) => (
        <mesh key={i} position={[0, 0.18, wz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 10]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
        </mesh>
      ))}
      {/* Draft Shafts */}
      <mesh position={[0.48, 0.18, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.4, 0.03, 0.32]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
      </mesh>
    </group>
  );
};

/**
 * 11. COASTAL ROWBOAT
 */
export const Rowboat: React.FC<{ color?: string }> = ({
  color = ANIME_PALETTE.earth.timberWarm,
}) => {
  const boatRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (boatRef.current) {
      boatRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.4) * 0.015;
      boatRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2) * 0.03;
    }
  });

  return (
    <group position={[0, 0, 0]} ref={boatRef}>
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.82, 8]} />
        <meshStandardMaterial color={color} roughness={0.88} />
      </mesh>
      {/* Wooden Thwart Bench */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <boxGeometry args={[0.15, 0.02, 0.38]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.9} />
      </mesh>
    </group>
  );
};

/**
 * 12. PARK BENCH
 */
export const ParkBench: React.FC<{ color?: string }> = ({
  color = ANIME_PALETTE.earth.timberDark,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Seat Planks */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.58, 0.03, 0.22]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.32, -0.1]} castShadow>
        <boxGeometry args={[0.58, 0.18, 0.03]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Legs */}
      {[-0.24, 0.24].map((lx, i) => (
        <mesh key={i} position={[lx, 0.09, 0]} castShadow>
          <boxGeometry args={[0.04, 0.18, 0.2]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 13. MARKET STALL
 */
export const MarketStall: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Timber Table */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.48, 0.52]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.9} />
      </mesh>
      {/* Striped Canopy Awning */}
      <mesh position={[0, 0.72, 0]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.92, 0.04, 0.62]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * 14. TIMBER FENCE
 */
export const TimberFence: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 2 Cross Rails */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.95, 0.04, 0.03]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[0.95, 0.04, 0.03]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberLight} roughness={0.92} />
      </mesh>
      {/* 3 Upright Pickets */}
      {[-0.42, 0, 0.42].map((px, i) => (
        <mesh key={i} position={[px, 0.22, 0]} castShadow>
          <boxGeometry args={[0.05, 0.44, 0.04]} />
          <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 15. BARREL STACK
 */
export const BarrelStack: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[-0.14, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.32, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.9} />
      </mesh>
      <mesh position={[0.14, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.32, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberWarm} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.38, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.32, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.9} />
      </mesh>
    </group>
  );
};

/**
 * 16. GARDEN PLOT
 */
export const GardenPlot: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Soil Bed */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[0.95, 0.06, 0.65]} />
        <meshStandardMaterial color={ANIME_PALETTE.earth.timberDark} roughness={0.98} />
      </mesh>
      {/* Green Vegetable Sprouts */}
      {[-0.3, 0, 0.3].map((sx, i) =>
        [-0.18, 0.18].map((sz, j) => (
          <mesh key={`${i}-${j}`} position={[sx, 0.1, sz]} castShadow>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color={ANIME_PALETTE.grass.meadow} />
          </mesh>
        ))
      )}
    </group>
  );
};

/**
 * 17. FLOWER PATCH
 */
export const FlowerPatch: React.FC<{ color: string; secondaryColor: string }> = ({
  color,
  secondaryColor,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Earthy Base */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <cylinderGeometry args={[0.32, 0.36, 0.03, 8]} />
        <meshStandardMaterial color={ANIME_PALETTE.grass.shadowGreen} roughness={0.95} />
      </mesh>
      {/* Multi-Tonal Flowers */}
      {[
        [-0.12, 0.08, -0.08],
        [0.1, 0.07, 0.1],
        [-0.05, 0.09, 0.12],
        [0.14, 0.06, -0.1],
        [0, 0.1, 0],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[0.045, 6, 6]} />
            <meshStandardMaterial color={i % 2 === 0 ? color : secondaryColor} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
