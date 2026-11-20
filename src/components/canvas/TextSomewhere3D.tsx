import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

interface TextSomewhere3DProps {
  atmosphereMode: 'day' | 'evening' | 'night';
}

/**
 * 3D Dimensional Storybook Typography
 * Dynamically scales and positions based on viewport dimensions
 * so it never collides or overflows on mobile, tablets, or ultrawide screens.
 */
export const TextSomewhere3D: React.FC<TextSomewhere3DProps> = ({ atmosphereMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const aspect = size.width / Math.max(1, size.height);

  // Adaptively scale typography to never exceed available viewport width
  // Standard text width is ~8.2 units at font size 1.25.
  const textScale = Math.min(1.0, Math.max(0.45, viewport.width / 9.6));

  // In portrait mode, adjust Y position relative to planet top (radius 4.4)
  const baseY = aspect < 1.0 ? 4.9 : 5.2;

  // Colors adaptive to atmosphere
  const textColor = atmosphereMode === 'night' ? '#faedcd' : '#fffdf7';
  const outlineColor = atmosphereMode === 'night' ? '#1f2438' : '#7f5539';
  const shadowColor = atmosphereMode === 'night' ? '#0b0e14' : '#582f0e';

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle breathing float
      const t = clock.getElapsedTime() * 0.8;
      groupRef.current.position.y = baseY + Math.sin(t) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, baseY, 0]}
      scale={[textScale, textScale, textScale]}
    >
      <Float
        speed={1.5}
        rotationIntensity={0.08}
        floatIntensity={0.16}
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
