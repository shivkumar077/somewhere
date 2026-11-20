import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlayerAvatarProps {
  position: [number, number, number];
  rotationY: number;
  isWalking: boolean;
  targetPoint?: [number, number, number] | null;
}

/**
 * Stylized Storybook Player Avatar
 *
 * Friendly, charming, optimized character representing the portfolio owner.
 * Features procedural limb animation for walking/idle, direction facing,
 * and a pulsating click/tap target indicator ring.
 */
export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  position,
  rotationY,
  isWalking,
  targetPoint,
}) => {
  const avatarGroupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const targetRingRef = useRef<THREE.Mesh>(null);

  const walkCycle = useRef(0);

  useFrame((_, delta) => {
    // 1. Procedural Limb Animation
    if (isWalking) {
      walkCycle.current += delta * 11;
      const legAngle = Math.sin(walkCycle.current) * 0.45;
      const armAngle = Math.sin(walkCycle.current) * 0.4;

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = legAngle;
        rightLegRef.current.rotation.x = -legAngle;
      }

      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -armAngle;
        rightArmRef.current.rotation.x = armAngle;
      }

      // Gentle vertical bob while walking
      if (avatarGroupRef.current) {
        avatarGroupRef.current.position.y = Math.abs(Math.sin(walkCycle.current)) * 0.06;
      }
    } else {
      // Idle breathing and gentle limb settle
      walkCycle.current += delta * 2.2;
      const breath = Math.sin(walkCycle.current) * 0.02;

      if (avatarGroupRef.current) {
        avatarGroupRef.current.position.y = breath;
      }

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
      }

      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 10);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 10);
      }
    }

    // 2. Click/Tap Navigation Indicator Pulse
    if (targetRingRef.current && targetPoint) {
      const pulse = 1 + Math.sin(walkCycle.current * 4) * 0.15;
      targetRingRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position}>
      {/* Target Marker Ring when navigating by Click / Tap */}
      {targetPoint && (
        <mesh
          ref={targetRingRef}
          position={[targetPoint[0] - position[0], 0.03, targetPoint[2] - position[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.3, 0.42, 24]} />
          <meshBasicMaterial color="#e76f51" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Main Character Body with Rotation */}
      <group ref={avatarGroupRef} rotation={[0, rotationY, 0]}>
        {/* Soft Contact Shadow Disc under feet */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.32, 16]} />
          <meshBasicMaterial color="#2b2018" transparent opacity={0.3} />
        </mesh>

        {/* Left Leg */}
        <mesh ref={leftLegRef} position={[-0.11, 0.26, 0]} castShadow>
          <boxGeometry args={[0.13, 0.44, 0.14]} />
          <meshStandardMaterial color="#3d312a" roughness={0.8} />
        </mesh>

        {/* Right Leg */}
        <mesh ref={rightLegRef} position={[0.11, 0.26, 0]} castShadow>
          <boxGeometry args={[0.13, 0.44, 0.14]} />
          <meshStandardMaterial color="#3d312a" roughness={0.8} />
        </mesh>

        {/* Torso with Warm Storybook Sweater/Jacket */}
        <mesh position={[0, 0.68, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.36, 0.46, 0.24]} />
          <meshStandardMaterial color="#264653" roughness={0.7} />
        </mesh>

        {/* Cozy Scarf / Collar */}
        <mesh position={[0, 0.92, 0]} castShadow>
          <boxGeometry args={[0.32, 0.1, 0.24]} />
          <meshStandardMaterial color="#e76f51" roughness={0.8} />
        </mesh>

        {/* Left Arm */}
        <mesh ref={leftArmRef} position={[-0.24, 0.68, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.12]} />
          <meshStandardMaterial color="#2a9d8f" roughness={0.7} />
        </mesh>

        {/* Right Arm */}
        <mesh ref={rightArmRef} position={[0.24, 0.68, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.12]} />
          <meshStandardMaterial color="#2a9d8f" roughness={0.7} />
        </mesh>

        {/* Traveler's Backpack */}
        <mesh position={[0, 0.72, -0.16]} castShadow>
          <boxGeometry args={[0.26, 0.32, 0.14]} />
          <meshStandardMaterial color="#b07d62" roughness={0.8} />
        </mesh>

        {/* Stylized Head */}
        <mesh position={[0, 1.12, 0]} castShadow>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#fad2a4" roughness={0.6} />
        </mesh>

        {/* Cozy Beanie / Hair */}
        <mesh position={[0, 1.22, -0.02]} castShadow>
          <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#493829" roughness={0.8} />
        </mesh>

        {/* Small Lantern clipped to belt */}
        <mesh position={[0.18, 0.52, 0.12]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.1, 8]} />
          <meshStandardMaterial
            color="#f4a261"
            emissive="#ffe57f"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};
