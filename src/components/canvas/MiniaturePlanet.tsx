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

/**
 * Spherical Miniature Town Planet (Milestone 02 Path 1)
 *
 * Reads CANONICAL_WORLD and projects each building, path, prop,
 * and terrain feature onto the spherical island with surface-normal alignment.
 */
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

  // Precompute terrain features (hills, ridges) from canonical world definition
  const hillFeatures = useMemo(() => {
    return (world.terrainFeatures || [])
      .filter((t) => t.type === 'hill' || t.type === 'ridge')
      .map((feat) => {
        const height = feat.height || 0.3;
        const pos = latLonToSpherePosition(
          feat.coordinates.lat,
          feat.coordinates.lon,
          world.planetRadius,
          height * 0.4
        );
        const normal = pos.clone().normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        return { ...feat, pos, quat, height };
      });
  }, [world]);

  // Precompute water bodies (lakes, ponds, lagoons) from canonical world definition
  const waterFeatures = useMemo(() => {
    return (world.terrainFeatures || [])
      .filter((t) => t.type === 'pond' || t.type === 'lagoon')
      .map((feat) => {
        const pos = latLonToSpherePosition(
          feat.coordinates.lat,
          feat.coordinates.lon,
          world.planetRadius,
          0.02
        );
        const normal = pos.clone().normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        return { ...feat, pos, quat };
      });
  }, [world]);

  // Precompute path curves along surface
  const pathMeshes = useMemo(() => {
    return world.paths.map((p) => {
      const points = p.waypoints.map((wp) =>
        latLonToSpherePosition(wp.lat, wp.lon, world.planetRadius, 0.025)
      );
      if (points.length < 2) return null;
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 28, p.width * 0.45, 6, false);
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
      planetRef.current.rotation.y += spinVelocity.current * delta;
      spinVelocity.current = THREE.MathUtils.lerp(spinVelocity.current, 0.065, delta * 0.8);
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

    planetRef.current.rotation.y += deltaX * 0.005;
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
      {/* 1. Main Grassy Planet Island */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[world.planetRadius, 64, 64]} />
        <meshStandardMaterial
          color="#8cb33e" // lush storybook meadow green
          roughness={0.85}
          metalness={0.04}
          flatShading={false}
        />
      </mesh>

      {/* 2. Canonical Rolling Hill Mounds & Bluffs */}
      {hillFeatures.map((hill) => (
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

      {/* 3. Canonical Water Features (Whispering Pond & Azure Lagoon) */}
      {waterFeatures.map((water) => (
        <group key={water.id} position={water.pos} quaternion={water.quat}>
          {/* Water Surface */}
          <mesh receiveShadow>
            <cylinderGeometry args={[water.radius, water.radius, 0.05, 20]} />
            <meshStandardMaterial
              color={water.color}
              roughness={0.15}
              metalness={0.2}
              transparent
              opacity={0.88}
            />
          </mesh>
          {/* Sand & Pebble Shoreline Rim */}
          <mesh receiveShadow position={[0, -0.01, 0]}>
            <cylinderGeometry args={[water.radius * 1.14, water.radius * 1.14, 0.04, 20]} />
            <meshStandardMaterial color="#e0cda9" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 4. Canonical Cobblestone Paths & Highways */}
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
