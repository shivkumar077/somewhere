import React, { useMemo } from 'react';
import * as THREE from 'three';
import { WorldDefinition, BuildingItem } from './types';
import { getFlatWorldTransform } from './projection';
import { BuildingRenderer } from '../components/canvas/BuildingModels';
import { PropRenderer } from '../components/canvas/PropModels';

interface WalkableWorldRendererProps {
  world: WorldDefinition;
  glowIntensity: number;
  lanternGlowIntensity: number;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
}

/**
 * ARCHITECTURAL PROOF: The Walkable World Renderer (Milestone 02 Path 2)
 *
 * Consumes the exact SAME Canonical World Definition (CANONICAL_WORLD)
 * without any duplicated or hardcoded data.
 *
 * Whereas MiniaturePlanet maps canonical coordinates onto a sphere of radius R,
 * WalkableWorldRenderer maps the canonical flatX and flatZ coordinates
 * directly onto the explorable planar terrain grid.
 */
export const WalkableWorldRenderer: React.FC<WalkableWorldRendererProps> = ({
  world,
  glowIntensity,
  lanternGlowIntensity,
  onHoverBuilding,
  onSelectBuilding,
}) => {
  // Compute flat transforms for all buildings from canonical world data
  const buildingTransforms = useMemo(() => {
    return world.buildings.map((building) => {
      const transform = getFlatWorldTransform(building.coordinates, building.rotationY);
      return { building, transform };
    });
  }, [world]);

  // Compute flat transforms for all props from canonical world data
  const propTransforms = useMemo(() => {
    return world.props.map((prop) => {
      const transform = getFlatWorldTransform(prop.coordinates, prop.rotationY);
      return { prop, transform };
    });
  }, [world]);

  // Compute planar path curves
  const pathMeshes = useMemo(() => {
    return world.paths.map((p) => {
      const points = p.waypoints.map((wp) => new THREE.Vector3(wp.flatX, 0.02, wp.flatZ));
      if (points.length < 2) return null;
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 24, p.width * 0.45, 6, false);
      return { id: p.id, geometry, color: p.color };
    }).filter(Boolean);
  }, [world]);

  const { minX, maxX, minZ, maxZ } = world.flatWorldBounds;
  const terrainWidth = maxX - minX;
  const terrainDepth = maxZ - minZ;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Explorable Planar Grass Meadow Terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[terrainWidth, terrainDepth, 32, 32]} />
        <meshStandardMaterial color="#8cb33e" roughness={0.9} />
      </mesh>

      {/* 2. Flat Cobblestone Paths */}
      {pathMeshes.map((path) => path && (
        <mesh key={path.id} geometry={path.geometry} receiveShadow>
          <meshStandardMaterial color={path.color} roughness={0.95} />
        </mesh>
      ))}

      {/* 3. Canonical Buildings on Flat Grid */}
      {buildingTransforms.map(({ building, transform }) => {
        const scaleVal = building.scale || 1.0;
        const scaleVector: [number, number, number] = Array.isArray(scaleVal)
          ? scaleVal
          : [scaleVal, scaleVal, scaleVal];

        return (
          <group
            key={building.id}
            position={transform.position}
            rotation={transform.rotation}
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
            <BuildingRenderer building={building} glowIntensity={glowIntensity} />
          </group>
        );
      })}

      {/* 4. Canonical Props on Flat Grid */}
      {propTransforms.map(({ prop, transform }) => {
        const scaleVal = prop.scale || 1.0;
        const scaleVector: [number, number, number] = Array.isArray(scaleVal)
          ? scaleVal
          : [scaleVal, scaleVal, scaleVal];

        return (
          <group
            key={prop.id}
            position={transform.position}
            rotation={transform.rotation}
            scale={scaleVector}
          >
            <PropRenderer prop={prop} lanternGlowIntensity={lanternGlowIntensity} />
          </group>
        );
      })}
    </group>
  );
};
