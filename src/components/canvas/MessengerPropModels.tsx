import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PropItem } from '../../world/types';
import { MESSENGER_PALETTE } from '../../styles/messengerPalette';
import { InkedMesh } from './MessengerBuildingModels';

/**
 * Telegraph Pole with crossbars and insulator pins (classic anime countryside detail)
 */
export const TelegraphPoleProp: React.FC<{
  position?: [number, number, number];
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => {
  const poleGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.05, 1.6, 8), []);
  const barGeom = useMemo(() => new THREE.BoxGeometry(0.48, 0.04, 0.04), []);
  const pinGeom = useMemo(() => new THREE.CylinderGeometry(0.015, 0.015, 0.08, 6), []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Main Pole */}
      <InkedMesh geometry={poleGeom} color={MESSENGER_PALETTE.telegraphPole} position={[0, 0.8, 0]} />
      {/* Upper Crossbar */}
      <InkedMesh geometry={barGeom} color={MESSENGER_PALETTE.telegraphPole} position={[0, 1.45, 0]} />
      {/* Lower Crossbar */}
      <InkedMesh geometry={barGeom} color={MESSENGER_PALETTE.telegraphPole} position={[0, 1.25, 0]} />
      {/* Ceramic Insulator Pins */}
      <InkedMesh geometry={pinGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[-0.2, 1.5, 0]} />
      <InkedMesh geometry={pinGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0.2, 1.5, 0]} />
      <InkedMesh geometry={pinGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[-0.2, 1.3, 0]} />
      <InkedMesh geometry={pinGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0.2, 1.3, 0]} />
    </group>
  );
};

/**
 * Cel-shaded anime round tree with hand-inked layered foliage clumps
 */
export const AnimeRoundTree: React.FC<{
  position?: [number, number, number];
  scale?: number;
  foliageColor?: string;
}> = ({ position = [0, 0, 0], scale = 1, foliageColor = MESSENGER_PALETTE.grassGreen }) => {
  const trunkGeom = useMemo(() => new THREE.CylinderGeometry(0.1, 0.14, 0.9, 8), []);
  const clumpGeom = useMemo(() => new THREE.SphereGeometry(0.45, 8, 8), []);

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <InkedMesh geometry={trunkGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0, 0.45, 0]} />
      {/* Layered Foliage Clumps */}
      <InkedMesh geometry={clumpGeom} color={foliageColor} position={[0, 1.1, 0]} scale={[1.1, 0.95, 1.1]} />
      <InkedMesh geometry={clumpGeom} color={foliageColor} position={[-0.2, 1.3, 0.1]} scale={0.75} />
      <InkedMesh geometry={clumpGeom} color={MESSENGER_PALETTE.grassHighlight} position={[0.2, 1.35, -0.1]} scale={0.8} />
      <InkedMesh geometry={clumpGeom} color={MESSENGER_PALETTE.grassShadow} position={[0, 0.9, 0.2]} scale={0.65} />
    </group>
  );
};

/**
 * Cel-shaded apple tree with bright red apples
 */
export const AnimeAppleTree: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  const appleGeom = useMemo(() => new THREE.SphereGeometry(0.045, 6, 6), []);

  return (
    <group position={position} scale={scale}>
      <AnimeRoundTree position={[0, 0, 0]} foliageColor={MESSENGER_PALETTE.grassHighlight} />
      {/* Scattered red apples */}
      <mesh geometry={appleGeom} position={[-0.22, 1.05, 0.4]}>
        <meshBasicMaterial color="#e63946" />
      </mesh>
      <mesh geometry={appleGeom} position={[0.25, 1.15, 0.35]}>
        <meshBasicMaterial color="#e63946" />
      </mesh>
      <mesh geometry={appleGeom} position={[0.35, 0.95, -0.1]}>
        <meshBasicMaterial color="#e63946" />
      </mesh>
      <mesh geometry={appleGeom} position={[-0.3, 1.25, -0.2]}>
        <meshBasicMaterial color="#e63946" />
      </mesh>
    </group>
  );
};

/**
 * Tiered anime pine tree
 */
export const AnimePineTree: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  const trunkGeom = useMemo(() => new THREE.CylinderGeometry(0.08, 0.12, 0.8, 8), []);
  const tier1Geom = useMemo(() => new THREE.ConeGeometry(0.65, 0.6, 6), []);
  const tier2Geom = useMemo(() => new THREE.ConeGeometry(0.5, 0.55, 6), []);
  const tier3Geom = useMemo(() => new THREE.ConeGeometry(0.35, 0.5, 6), []);

  return (
    <group position={position} scale={scale}>
      <InkedMesh geometry={trunkGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0, 0.4, 0]} />
      <InkedMesh geometry={tier1Geom} color={MESSENGER_PALETTE.grassShadow} position={[0, 0.85, 0]} />
      <InkedMesh geometry={tier2Geom} color={MESSENGER_PALETTE.grassGreen} position={[0, 1.2, 0]} />
      <InkedMesh geometry={tier3Geom} color={MESSENGER_PALETTE.grassHighlight} position={[0, 1.55, 0]} />
    </group>
  );
};

/**
 * Pastel blossom tree
 */
export const AnimeBlossomTree: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  return <AnimeRoundTree position={position} scale={scale} foliageColor="#f4a5ae" />;
};

/**
 * Weeping Willow framing water bodies
 */
export const AnimeWillowTree: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  const trunkGeom = useMemo(() => new THREE.CylinderGeometry(0.12, 0.18, 1.1, 8), []);
  const canopyGeom = useMemo(() => new THREE.SphereGeometry(0.65, 8, 8), []);
  const boughGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.08, 0.75, 6), []);

  return (
    <group position={position} scale={scale}>
      <InkedMesh geometry={trunkGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0, 0.55, 0]} />
      <InkedMesh geometry={canopyGeom} color={MESSENGER_PALETTE.grassHighlight} position={[0, 1.35, 0]} />
      {/* Drooping boughs */}
      <InkedMesh geometry={boughGeom} color={MESSENGER_PALETTE.grassGreen} position={[-0.45, 0.9, 0]} />
      <InkedMesh geometry={boughGeom} color={MESSENGER_PALETTE.grassGreen} position={[0.45, 0.9, 0]} />
      <InkedMesh geometry={boughGeom} color={MESSENGER_PALETTE.grassGreen} position={[0, 0.9, -0.45]} />
      <InkedMesh geometry={boughGeom} color={MESSENGER_PALETTE.grassGreen} position={[0, 0.9, 0.45]} />
    </group>
  );
};

/**
 * Town Center Stone Fountain with animated water ripples
 */
export const StoneFountainProp: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  const basinGeom = useMemo(() => new THREE.CylinderGeometry(0.85, 0.95, 0.35, 12), []);
  const columnGeom = useMemo(() => new THREE.CylinderGeometry(0.16, 0.22, 0.85, 8), []);
  const upperBasinGeom = useMemo(() => new THREE.CylinderGeometry(0.45, 0.52, 0.2, 10), []);

  const waterRippleRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (waterRippleRef.current) {
      const t = clock.getElapsedTime() * 2;
      const s = 0.92 + Math.sin(t) * 0.04;
      waterRippleRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={position}>
      {/* Outer Stone Basin */}
      <InkedMesh geometry={basinGeom} color={MESSENGER_PALETTE.cliffRock} position={[0, 0.175, 0]} />
      {/* Water Pool */}
      <mesh ref={waterRippleRef} position={[0, 0.3, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <circleGeometry args={[0.78, 16]} />
        <meshBasicMaterial color={MESSENGER_PALETTE.oceanSurface} />
      </mesh>
      {/* Central Spire Column */}
      <InkedMesh geometry={columnGeom} color={MESSENGER_PALETTE.cliffRockDark} position={[0, 0.6, 0]} />
      <InkedMesh geometry={upperBasinGeom} color={MESSENGER_PALETTE.cliffRock} position={[0, 0.95, 0]} />
    </group>
  );
};

/**
 * Cobblestone Bridge spanning water
 */
export const StoneBridgeProp: React.FC<{
  position?: [number, number, number];
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => {
  const archGeom = useMemo(() => new THREE.BoxGeometry(0.85, 0.22, 1.8), []);
  const railGeom = useMemo(() => new THREE.BoxGeometry(0.1, 0.25, 1.8), []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <InkedMesh geometry={archGeom} color={MESSENGER_PALETTE.cobblestoneRoad} position={[0, 0.15, 0]} />
      <InkedMesh geometry={railGeom} color={MESSENGER_PALETTE.cliffRock} position={[-0.4, 0.35, 0]} />
      <InkedMesh geometry={railGeom} color={MESSENGER_PALETTE.cliffRock} position={[0.4, 0.35, 0]} />
    </group>
  );
};

/**
 * Moored Rowboat in harbor
 */
export const RowboatProp: React.FC<{
  position?: [number, number, number];
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => {
  const hullGeom = useMemo(() => new THREE.BoxGeometry(0.48, 0.24, 1.1), []);
  const benchGeom = useMemo(() => new THREE.BoxGeometry(0.42, 0.04, 0.15), []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <InkedMesh geometry={hullGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 0.12, 0]} />
      <InkedMesh geometry={benchGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0, 0.18, 0]} />
    </group>
  );
};

/**
 * Rustic timber bench
 */
export const TimberBenchProp: React.FC<{
  position?: [number, number, number];
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => {
  const seatGeom = useMemo(() => new THREE.BoxGeometry(0.55, 0.05, 0.2), []);
  const backGeom = useMemo(() => new THREE.BoxGeometry(0.55, 0.25, 0.04), []);
  const legGeom = useMemo(() => new THREE.BoxGeometry(0.06, 0.2, 0.18), []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <InkedMesh geometry={seatGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 0.2, 0]} />
      <InkedMesh geometry={backGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 0.34, -0.09]} />
      <InkedMesh geometry={legGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[-0.22, 0.1, 0]} />
      <InkedMesh geometry={legGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0.22, 0.1, 0]} />
    </group>
  );
};

/**
 * Wrought iron street lantern
 */
export const IronLanternProp: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  const postGeom = useMemo(() => new THREE.CylinderGeometry(0.03, 0.04, 1.1, 8), []);
  const lampGeom = useMemo(() => new THREE.BoxGeometry(0.18, 0.22, 0.18), []);

  return (
    <group position={position}>
      <InkedMesh geometry={postGeom} color={MESSENGER_PALETTE.cliffRockDark} position={[0, 0.55, 0]} />
      <InkedMesh geometry={lampGeom} color={MESSENGER_PALETTE.windowGlowDay} position={[0, 1.15, 0]} />
    </group>
  );
};

/**
 * Universal prop renderer
 */
export const MessengerPropRenderer: React.FC<{ prop: PropItem }> = ({ prop }) => {
  const scale = typeof prop.scale === 'number' ? prop.scale : prop.scale?.[0] || 1.0;

  switch (prop.type) {
    case 'tree-round':
      return <AnimeRoundTree scale={scale} />;
    case 'tree-apple':
      return <AnimeAppleTree scale={scale} />;
    case 'tree-pine':
      return <AnimePineTree scale={scale} />;
    case 'tree-blossom':
      return <AnimeBlossomTree scale={scale} />;
    case 'tree-willow':
      return <AnimeWillowTree scale={scale} />;
    case 'fountain':
      return <StoneFountainProp />;
    case 'bridge':
      return <StoneBridgeProp />;
    case 'rowboat':
      return <RowboatProp />;
    case 'bench':
      return <TimberBenchProp />;
    case 'lantern':
      return <IronLanternProp />;
    default:
      return <TelegraphPoleProp />;
  }
};
