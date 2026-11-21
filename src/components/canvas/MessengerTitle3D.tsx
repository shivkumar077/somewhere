import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MESSENGER_PALETTE, CEL_GRADIENT_TEXTURE } from '../../styles/messengerPalette';

interface MessengerTitle3DProps {
  isEntered: boolean;
  isEntering: boolean;
}

/**
 * Recreates the exact bold, modular, chunky block lettering seen in https://messenger.abeto.co/
 * Each letter is composed of crisp 3D extruded blocks with hand-inked line edges and cel-shading.
 * Text:
 *   HELLO
 *   THERE
 *   YOU
 */

// Grid definition for modular block letters: 5x5 or segment blocks
// We define each letter as a collection of modular box segments: [x, y, w, h] normalized to [-0.5, 0.5]
const LETTER_SEGMENTS: Record<string, [number, number, number, number][]> = {
  H: [
    [-0.32, 0, 0.28, 1.0], // left column
    [0.32, 0, 0.28, 1.0],  // right column
    [0, 0, 0.40, 0.26],    // middle crossbar
  ],
  E: [
    [-0.32, 0, 0.28, 1.0], // left column
    [0.10, 0.37, 0.60, 0.26],  // top bar
    [0.05, 0, 0.50, 0.24],     // middle bar
    [0.10, -0.37, 0.60, 0.26], // bottom bar
  ],
  L: [
    [-0.32, 0, 0.28, 1.0], // left column
    [0.10, -0.37, 0.60, 0.26], // bottom bar
  ],
  O: [
    [-0.32, 0, 0.26, 1.0], // left column
    [0.32, 0, 0.26, 1.0],  // right column
    [0, 0.37, 0.42, 0.26],  // top bar
    [0, -0.37, 0.42, 0.26], // bottom bar
  ],
  T: [
    [0, 0.37, 0.90, 0.26],  // top bar
    [0, -0.13, 0.30, 0.74], // center stem
  ],
  R: [
    [-0.32, 0, 0.28, 1.0], // left column
    [0.10, 0.37, 0.56, 0.26], // top bar
    [0.32, 0.16, 0.26, 0.40], // top-right loop side
    [0.06, 0.02, 0.50, 0.22], // middle bar
    [0.26, -0.28, 0.30, 0.46], // bottom-right leg
  ],
  Y: [
    [-0.24, 0.26, 0.28, 0.50], // top-left stem
    [0.24, 0.26, 0.28, 0.50],  // top-right stem
    [0, 0.04, 0.48, 0.24],    // junction
    [0, -0.28, 0.30, 0.46],    // bottom stem
  ],
  U: [
    [-0.32, 0.08, 0.28, 0.84], // left column
    [0.32, 0.08, 0.28, 0.84],  // right column
    [0, -0.37, 0.42, 0.26],    // bottom bar
  ],
};

const BLOCK_DEPTH = 0.55;

/**
 * Single 3D Block Letter with cel-shading and hand-inked line edges
 */
const BlockLetter: React.FC<{
  char: string;
  position: [number, number, number];
  scale?: number;
}> = ({ char, position, scale = 1.0 }) => {
  const segments = LETTER_SEGMENTS[char] || LETTER_SEGMENTS.O;

  const letterMesh = useMemo(() => {
    const group = new THREE.Group();

    // Cel-shaded material for front and sides
    const faceMaterial = new THREE.MeshToonMaterial({
      color: MESSENGER_PALETTE.stuccoWhite,
      gradientMap: CEL_GRADIENT_TEXTURE,
    });

    const edgeLineMaterial = new THREE.LineBasicMaterial({
      color: MESSENGER_PALETTE.inkOutline,
      linewidth: 2,
    });

    segments.forEach(([cx, cy, w, h]) => {
      const geom = new THREE.BoxGeometry(w, h, BLOCK_DEPTH);
      const mesh = new THREE.Mesh(geom, faceMaterial);
      mesh.position.set(cx, cy, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Add crisp inked outlines
      const edges = new THREE.EdgesGeometry(geom, 20);
      const line = new THREE.LineSegments(edges, edgeLineMaterial);
      mesh.add(line);

      group.add(mesh);
    });

    return group;
  }, [segments]);

  return (
    <primitive
      object={letterMesh}
      position={position}
      scale={[scale, scale, scale]}
    />
  );
};

export const MessengerTitle3D: React.FC<MessengerTitle3DProps> = ({
  isEntered,
  isEntering,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating idle motion
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!isEntered && !isEntering) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.03;
    } else {
      // Fade/scale out cleanly when entering town
      groupRef.current.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 0.12);
      groupRef.current.position.z += 0.2;
    }
  });

  if (isEntered) return null;

  // Layout parameters matching the 3-row Messenger grid
  // In Messenger: 3 rows centered directly in front of the globe
  // Row 1: H E L L O (5 chars)
  // Row 2: T H E R E (5 chars)
  // Row 3: Y O U     (3 chars, centered)

  const letterW = 0.95;
  const rowSpacing = 1.35;
  const colSpacing = 1.05;

  const row1 = ['H', 'E', 'L', 'L', 'O'];
  const row2 = ['T', 'H', 'E', 'R', 'E'];
  const row3 = ['Y', 'O', 'U'];

  return (
    <group ref={groupRef} position={[0, 0.2, 5.2]}>
      {/* Row 1: HELLO */}
      <group position={[0, rowSpacing, 0]}>
        {row1.map((char, i) => {
          const x = (i - 2) * colSpacing;
          return <BlockLetter key={`r1-${i}`} char={char} position={[x, 0, 0]} scale={letterW} />;
        })}
      </group>

      {/* Row 2: THERE */}
      <group position={[0, 0, 0]}>
        {row2.map((char, i) => {
          const x = (i - 2) * colSpacing;
          return <BlockLetter key={`r2-${i}`} char={char} position={[x, 0, 0]} scale={letterW} />;
        })}
      </group>

      {/* Row 3: YOU */}
      <group position={[0, -rowSpacing, 0]}>
        {row3.map((char, i) => {
          const x = (i - 1) * (colSpacing * 1.35); // wider spacing for 3 letters to balance grid
          return <BlockLetter key={`r3-${i}`} char={char} position={[x, 0, 0]} scale={letterW * 1.15} />;
        })}
      </group>
    </group>
  );
};
