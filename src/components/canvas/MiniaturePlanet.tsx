import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { WorldDefinition, BuildingItem } from '../../world/types';
import { getSphereTransform, latLonToSpherePosition } from '../../world/projection';
import { BuildingRenderer } from './BuildingModels';
import { PropRenderer } from './PropModels';

interface MiniaturePlanetProps {
  world: WorldDefinition;
  glowIntensity: number;
  lanternGlowIntensity: number;
  isEntering?: boolean;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
}

export const MiniaturePlanet: React.FC<MiniaturePlanetProps> = ({
  world,
  glowIntensity,
  lanternGlowIntensity,
  isEntering = false,
  onHoverBuilding,
  onSelectBuilding,
}) => {
  const planetRef = useRef<THREE.Group>(null);
  const [isUserDragging, setIsUserDragging] = useState(false);
  const previousPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const spinVelocity = useRef(0.06);

  // Precompute building transforms from canonical coordinates
  const buildingTransforms = useMemo(() => {
    return world.buildings.map((building) => {
      const transform = getSphereTransform(
        building.coordinates,
        world.planetRadius,
        building.rotationY
      );
      return {
        building,
        transform,
      };
    });
  }, [world]);

  // Precompute prop transforms from canonical coordinates
  const propTransforms = useMemo(() => {
    return world.props.map((prop) => {
      const transform = getSphereTransform(
        prop.coordinates,
        world.planetRadius,
        prop.rotationY
      );
      return {
        prop,
        transform,
      };
    });
  }, [world]);

  // Precompute decorative hill mounds on the globe
  const hillMounds = useMemo(() => {
    return [
      { lat: 45, lon: 110, radius: 1.4, height: 0.35, color: '#8cb33e' }, // Windmill hill
      { lat: 55, lon: -110, radius: 1.3, height: 0.3, color: '#7ba035' }, // Observatory ridge
      { lat: 30, lon: -160, radius: 1.1, height: 0.25, color: '#8cb33e' }, // Tea knoll
      { lat: -35, lon: 105, radius: 1.2, height: 0.2, color: '#97be44' }, // Greenhouse slope
      { lat: -55, lon: 65, radius: 1.5, height: 0.28, color: '#83a838' }, // South pasture
      { lat: 10, lon: 140, radius: 1.3, height: 0.22, color: '#8cb33e' }, // Far east knoll
    ].map((hill, i) => {
      const pos = latLonToSpherePosition(hill.lat, hill.lon, world.planetRadius, hill.height * 0.4);
      const normal = pos.clone().normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      return { ...hill, id: `hill-${i}`, pos, quat };
    });
  }, [world.planetRadius]);

  // Precompute water pond features
  const ponds = useMemo(() => {
    return [
      // Whispering pond near Cloverfold cottage
      { lat: -22, lon: -55, radius: 1.1, color: '#38bdf8' },
      // Lagoon near lighthouse
      { lat: -45, lon: -22, radius: 0.9, color: '#0ea5e9' },
    ].map((pond, i) => {
      const pos = latLonToSpherePosition(pond.lat, pond.lon, world.planetRadius, 0.02);
      const normal = pos.clone().normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      return { ...pond, id: `pond-${i}`, pos, quat };
    });
  }, [world.planetRadius]);

  // Precompute path curves along surface
  const pathMeshes = useMemo(() => {
    return world.paths.map((p) => {
      const points = p.waypoints.map((wp) =>
        latLonToSpherePosition(wp.lat, wp.lon, world.planetRadius, 0.025)
      );
      if (points.length < 2) return null;
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 24, p.width * 0.45, 6, false);
      return {
        id: p.id,
        geometry,
        color: p.color,
      };
    }).filter(Boolean);
  }, [world]);

  // Gentle continuous rotation
  useFrame((_, delta) => {
    if (!planetRef.current) return;

    if (!isUserDragging && !isEntering) {
      // Natural continuous rotation
      planetRef.current.rotation.y += spinVelocity.current * delta;
      // Damping any leftover drag velocity back to default
      spinVelocity.current = THREE.MathUtils.lerp(spinVelocity.current, 0.07, delta * 0.8);
    }
  });

  // Pointer drag to spin world
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsUserDragging(true);
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isUserDragging || !planetRef.current || isEntering) return;
    const deltaX = e.clientX - previousPointer.current.x;
    previousPointer.current = { x: e.clientX, y: e.clientY };

    planetRef.current.rotation.y += deltaX * 0.006;
    spinVelocity.current = deltaX * 0.03;
  };

  const handlePointerUp = () => {
    setIsUserDragging(false);
  };

  return (
    <group
      ref={planetRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 1. Main Grassy Planet Sphere */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[world.planetRadius, 64, 64]} />
        <meshStandardMaterial
          color="#8cb33e" // lush storybook meadow green
          roughness={0.85}
          metalness={0.05}
          flatShading={false}
        />
      </mesh>

      {/* 2. Rolling Hill Mounds */}
      {hillMounds.map((hill) => (
        <mesh
          key={hill.id}
          position={hill.pos}
          quaternion={hill.quat}
          scale={[hill.radius, hill.height, hill.radius]}
          receiveShadow
          castShadow
        >
          <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={hill.color} roughness={0.9} />
        </mesh>
      ))}

      {/* 3. Water Ponds */}
      {ponds.map((pond) => (
        <group key={pond.id} position={pond.pos} quaternion={pond.quat}>
          {/* Water Surface */}
          <mesh receiveShadow>
            <cylinderGeometry args={[pond.radius, pond.radius, 0.05, 16]} />
            <meshStandardMaterial
              color={pond.color}
              roughness={0.2}
              metalness={0.2}
              transparent
              opacity={0.88}
            />
          </mesh>
          {/* Sandy/Pebble Shore Ring */}
          <mesh receiveShadow position={[0, -0.01, 0]}>
            <cylinderGeometry args={[pond.radius * 1.15, pond.radius * 1.15, 0.04, 16]} />
            <meshStandardMaterial color="#e0cda9" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 4. Cobblestone Paths */}
      {pathMeshes.map((path) => path && (
        <mesh key={path.id} geometry={path.geometry} receiveShadow>
          <meshStandardMaterial color={path.color} roughness={0.95} />
        </mesh>
      ))}

      {/* 5. Buildings from Canonical World Definition */}
      {buildingTransforms.map(({ building, transform }) => {
        const scaleVal = building.scale || 1.0;
        const scaleVector: [number, number, number] = Array.isArray(scaleVal)
          ? scaleVal
          : [scaleVal, scaleVal, scaleVal];

        return (
          <group
            key={building.id}
            position={transform.position}
            quaternion={transform.quaternion}
            scale={scaleVector}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverBuilding?.(building);
            }}
            onPointerOut={() => {
              onHoverBuilding?.(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBuilding?.(building);
            }}
          >
            <BuildingRenderer
              building={building}
              glowIntensity={glowIntensity}
            />
          </group>
        );
      })}

      {/* 6. Props from Canonical World Definition */}
      {propTransforms.map(({ prop, transform }) => {
        const scaleVal = prop.scale || 1.0;
        const scaleVector: [number, number, number] = Array.isArray(scaleVal)
          ? scaleVal
          : [scaleVal, scaleVal, scaleVal];

        return (
          <group
            key={prop.id}
            position={transform.position}
            quaternion={transform.quaternion}
            scale={scaleVector}
          >
            <PropRenderer
              prop={prop}
              lanternGlowIntensity={lanternGlowIntensity}
            />
          </group>
        );
      })}
    </group>
  );
};
