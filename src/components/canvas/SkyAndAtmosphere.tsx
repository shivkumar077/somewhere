import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { AtmospherePhaseConfig } from '../../config/atmosphereConfig';

interface SkyAndAtmosphereProps {
  atmosphere: AtmospherePhaseConfig;
}

export const SkyAndAtmosphere: React.FC<SkyAndAtmosphereProps> = ({ atmosphere }) => {
  return (
    <>
      {/* Dynamic Lighting System */}
      <ambientLight
        color={atmosphere.ambientLightColor}
        intensity={atmosphere.ambientIntensity}
      />

      <hemisphereLight
        args={[
          atmosphere.hemiSkyColor,
          atmosphere.hemiGroundColor,
          atmosphere.hemiIntensity,
        ]}
      />

      <directionalLight
        position={atmosphere.sunPosition}
        color={atmosphere.sunColor}
        intensity={atmosphere.sunIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={35}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.001}
      />

      {/* Gentle Drift Clouds */}
      <CloudField
        tint={atmosphere.cloudsTint}
        opacity={atmosphere.cloudsOpacity}
      />

      {/* Storybook Flying Birds */}
      <FlockOfBirds />

      {/* Night Fireflies */}
      {atmosphere.firefliesOpacity > 0.05 && (
        <FireflySwarm opacity={atmosphere.firefliesOpacity} />
      )}

      {/* Twinkling Night Stars */}
      {atmosphere.starsOpacity > 0.05 && (
        <StarField opacity={atmosphere.starsOpacity} />
      )}
    </>
  );
};

/**
 * Drifting Low-Poly Fluffy Clouds
 */
const CloudField: React.FC<{ tint: string; opacity: number }> = ({ tint, opacity }) => {
  const cloudGroupRef = useRef<THREE.Group>(null);

  // Define 7 whimsical clouds at various altitudes and orbital angles
  const clouds = useMemo(() => {
    return [
      { radius: 7.2, lat: 25, startLon: 15, scale: 0.9, speed: 0.035 },
      { radius: 7.8, lat: -15, startLon: 80, scale: 1.1, speed: 0.04 },
      { radius: 7.5, lat: 45, startLon: 160, scale: 0.85, speed: 0.03 },
      { radius: 8.2, lat: -40, startLon: 240, scale: 1.05, speed: 0.038 },
      { radius: 7.4, lat: 10, startLon: 310, scale: 0.95, speed: 0.042 },
      { radius: 8.0, lat: -60, startLon: 45, scale: 0.8, speed: 0.032 },
    ];
  }, []);

  useFrame((_, delta) => {
    if (cloudGroupRef.current) {
      cloudGroupRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group ref={cloudGroupRef}>
      {clouds.map((cloud, idx) => {
        const phi = THREE.MathUtils.degToRad(90 - cloud.lat);
        const theta = THREE.MathUtils.degToRad(cloud.startLon);
        const x = cloud.radius * Math.sin(phi) * Math.sin(theta);
        const y = cloud.radius * Math.cos(phi);
        const z = cloud.radius * Math.sin(phi) * Math.cos(theta);

        return (
          <group
            key={idx}
            position={[x, y, z]}
            scale={[cloud.scale, cloud.scale * 0.65, cloud.scale]}
          >
            {/* Multi-sphere puffy cloud cluster */}
            <mesh castShadow={false}>
              <sphereGeometry args={[0.6, 7, 7]} />
              <meshStandardMaterial
                color={tint}
                transparent
                opacity={opacity}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[-0.45, -0.05, 0.1]}>
              <sphereGeometry args={[0.42, 6, 6]} />
              <meshStandardMaterial
                color={tint}
                transparent
                opacity={opacity}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[0.45, -0.05, -0.1]}>
              <sphereGeometry args={[0.44, 6, 6]} />
              <meshStandardMaterial
                color={tint}
                transparent
                opacity={opacity}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[0.1, 0.25, 0]}>
              <sphereGeometry args={[0.38, 6, 6]} />
              <meshStandardMaterial
                color={tint}
                transparent
                opacity={opacity}
                roughness={0.9}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

/**
 * Storybook Flying Birds with Organic Wing Flapping
 */
const FlockOfBirds: React.FC = () => {
  const birds = useMemo(() => {
    return [
      { radius: 6.2, lat: 20, speed: 0.16, phase: 0, scale: 0.12 },
      { radius: 6.4, lat: 26, speed: 0.15, phase: 1.2, scale: 0.11 },
      { radius: 6.1, lat: 15, speed: 0.17, phase: 2.5, scale: 0.1 },
      { radius: 6.5, lat: -10, speed: 0.14, phase: 4.0, scale: 0.11 },
    ];
  }, []);

  return (
    <>
      {birds.map((b, i) => (
        <SingleBird key={i} config={b} />
      ))}
    </>
  );
};

const SingleBird: React.FC<{
  config: { radius: number; lat: number; speed: number; phase: number; scale: number };
}> = ({ config }) => {
  const birdRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * config.speed + config.phase;
    const flap = Math.sin(clock.getElapsedTime() * 7 + config.phase) * 0.45;

    if (birdRef.current) {
      // Circular flight path with gentle wave bobbing
      const phi = THREE.MathUtils.degToRad(90 - (config.lat + Math.sin(t * 1.5) * 6));
      const theta = t * 2.5;

      const x = config.radius * Math.sin(phi) * Math.sin(theta);
      const y = config.radius * Math.cos(phi) + Math.sin(t * 3) * 0.3;
      const z = config.radius * Math.sin(phi) * Math.cos(theta);

      birdRef.current.position.set(x, y, z);
      // Orient bird towards flight direction tangent
      birdRef.current.lookAt(
        config.radius * Math.sin(phi) * Math.sin(theta + 0.1),
        y,
        config.radius * Math.sin(phi) * Math.cos(theta + 0.1)
      );
    }

    if (leftWingRef.current) leftWingRef.current.rotation.z = flap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap;
  });

  return (
    <group ref={birdRef} scale={config.scale}>
      {/* Bird Little Body */}
      <mesh>
        <coneGeometry args={[0.3, 1.0, 4]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.7} />
      </mesh>
      {/* Left Wing */}
      <mesh ref={leftWingRef} position={[-0.4, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.04, 0.35]} />
        <meshStandardMaterial color="#e9ecef" roughness={0.7} />
      </mesh>
      {/* Right Wing */}
      <mesh ref={rightWingRef} position={[0.4, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.04, 0.35]} />
        <meshStandardMaterial color="#e9ecef" roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * Subtle Fireflies Floating at Dusk & Night
 */
const FireflySwarm: React.FC<{ opacity: number }> = ({ opacity }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scatter in spherical shell near planet surface (radius 4.6 to 5.4)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.6 + Math.random() * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < phases.length; i++) {
      const idx = i * 3;
      array[idx + 1] += Math.sin(t * 1.5 + phases[i]) * 0.003;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#cbf078"
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/**
 * Twinkling Night Sky Stars
 */
const StarField: React.FC<{ opacity: number }> = ({ opacity }) => {
  const starPositions = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 24 + Math.random() * 6; // distant dome

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[starPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#ffffff"
        transparent
        opacity={opacity * 0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

