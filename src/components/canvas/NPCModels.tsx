import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NPCEntity } from '../../world/types';

interface NPCProps {
  npc: NPCEntity;
  playerPosition: [number, number, number];
  onSelectNPC?: (npc: NPCEntity) => void;
}

export const NPCRenderer: React.FC<NPCProps> = ({ npc, playerPosition, onSelectNPC }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + npc.coordinates.flatX;

    // Idle breathing bob
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2.5) * 0.03;

      // When player is within 6 units, smoothly turn toward player
      const dx = playerPosition[0] - npc.coordinates.flatX;
      const dz = playerPosition[2] - npc.coordinates.flatZ;
      const dist = Math.hypot(dx, dz);

      if (dist < 6.0) {
        const targetYaw = Math.atan2(dx, dz);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetYaw,
          0.08
        );
      } else {
        // Return to canonical rotation
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          THREE.MathUtils.degToRad(npc.rotationY),
          0.04
        );
      }
    }
  });

  const distToPlayer = Math.hypot(
    playerPosition[0] - npc.coordinates.flatX,
    playerPosition[2] - npc.coordinates.flatZ
  );
  const isNearby = distToPlayer < 3.8;

  return (
    <group
      position={[npc.coordinates.flatX, 0, npc.coordinates.flatZ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectNPC?.(npc);
      }}
    >
      {/* Interactive Speech Prompt Badge when Nearby */}
      {isNearby && (
        <group position={[0, 1.85, 0]}>
          <mesh>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#faedcd" emissive="#ffd166" emissiveIntensity={0.6} />
          </mesh>
          <pointLight color="#ffe57f" intensity={0.5} distance={2.0} />
        </group>
      )}

      {/* Main NPC Body */}
      <group ref={groupRef} rotation={[0, THREE.MathUtils.degToRad(npc.rotationY), 0]}>
        {/* Soft Shadow Disc */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.28, 16]} />
          <meshBasicMaterial color="#2b2018" transparent opacity={0.25} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.1, 0.22, 0]} castShadow>
          <boxGeometry args={[0.12, 0.4, 0.12]} />
          <meshStandardMaterial color={npc.visualTheme.pantsColor || '#2f3e46'} roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.22, 0]} castShadow>
          <boxGeometry args={[0.12, 0.4, 0.12]} />
          <meshStandardMaterial color={npc.visualTheme.pantsColor || '#2f3e46'} roughness={0.8} />
        </mesh>

        {/* Torso / Jacket */}
        <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.44, 0.22]} />
          <meshStandardMaterial color={npc.visualTheme.jacketColor} roughness={0.7} />
        </mesh>

        {/* Collar / Scarf */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[0.28, 0.08, 0.2]} />
          <meshStandardMaterial color="#f7ede2" roughness={0.7} />
        </mesh>

        {/* Head & Hat */}
        <group ref={headRef} position={[0, 1.05, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#fad2a4" roughness={0.6} />
          </mesh>

          {/* Stylized Hat / Cap */}
          {npc.visualTheme.hatColor && (
            <mesh position={[0, 0.1, 0]} castShadow>
              <coneGeometry args={[0.19, 0.18, 12]} />
              <meshStandardMaterial color={npc.visualTheme.hatColor} roughness={0.7} />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
};
