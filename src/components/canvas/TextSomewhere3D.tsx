import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

interface TextSomewhere3DProps {
  atmosphereMode: 'day' | 'evening' | 'night';
}

/**
 * 3D Dimensional Storybook Typography
 * Floating playfully and gracefully above the miniature world,
 * fully integrated into the 3D scene.
 */
export const TextSomewhere3D: React.FC<TextSomewhere3DProps> = ({ atmosphereMode }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Colors adaptive to atmosphere
  const textColor = atmosphereMode === 'night' ? '#faedcd' : '#fffdf7';
  const outlineColor = atmosphereMode === 'night' ? '#1f2438' : '#7f5539';
  const shadowColor = atmosphereMode === 'night' ? '#0b0e14' : '#582f0e';

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle breathing float
      const t = clock.getElapsedTime() * 0.8;
      groupRef.current.position.y = 5.2 + Math.sin(t) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 5.2, 0]}>
      <Float
        speed={1.5}
        rotationIntensity={0.12}
        floatIntensity={0.2}
      >
        {/* Drop Shadow Offset Layer */}
        <Text
          position={[0.04, -0.06, -0.08]}
          fontSize={1.25}
          letterSpacing={0.16}
          color={shadowColor}
          fillOpacity={0.45}
        >
          SOMEWHERE
        </Text>

        {/* Main Dimensional Front Text */}
        <Text
          position={[0, 0, 0]}
          fontSize={1.25}
          letterSpacing={0.16}
          color={textColor}
          outlineWidth={0.045}
          outlineColor={outlineColor}
        >
          SOMEWHERE
        </Text>
      </Float>
    </group>
  );
};

