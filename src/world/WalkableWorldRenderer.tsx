import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { WorldDefinition, BuildingItem, NPCEntity } from './types';
import { getFlatWorldTransform } from './projection';
import { BuildingRenderer } from '../components/canvas/BuildingModels';
import { PropRenderer } from '../components/canvas/PropModels';
import { PlayerAvatar } from '../components/canvas/PlayerAvatar';
import { NPCRenderer } from '../components/canvas/NPCModels';

interface WalkableWorldRendererProps {
  world: WorldDefinition;
  glowIntensity: number;
  lanternGlowIntensity: number;
  playerPosition: [number, number, number];
  playerRotation: number;
  isWalking: boolean;
  targetPoint: [number, number, number] | null;
  onGroundClick?: (x: number, z: number) => void;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
  onSelectNPC?: (npc: NPCEntity) => void;
}

/**
 * THE WALKABLE LIVING TOWN RENDERER (Milestone 03 / Prompt 05)
 *
 * Consumes the exact SAME Canonical World Definition (CANONICAL_WORLD).
 * Displays all 6 primary functional destinations, decorative landmarks,
 * cobblestone roads, water features, animated NPCs, and the player avatar.
 */
export const WalkableWorldRenderer: React.FC<WalkableWorldRendererProps> = ({
  world,
  glowIntensity,
  lanternGlowIntensity,
  playerPosition,
  playerRotation,
  isWalking,
  targetPoint,
  onGroundClick,
  onHoverBuilding,
  onSelectBuilding,
  onSelectNPC,
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
      const points = p.waypoints.map((wp) => new THREE.Vector3(wp.flatX, 0.025, wp.flatZ));
      if (points.length < 2) return null;
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 28, p.width * 0.45, 6, false);
      return { id: p.id, geometry, color: p.color };
    }).filter(Boolean);
  }, [world]);

  const { minX, maxX, minZ, maxZ } = world.flatWorldBounds;
  const terrainWidth = maxX - minX;
  const terrainDepth = maxZ - minZ;

  const handlePlanePointerDown = (e: ThreeEvent<PointerEvent>) => {
    // Left click or tap on ground triggers navigation
    if (e.button === 0 && onGroundClick) {
      e.stopPropagation();
      onGroundClick(e.point.x, e.point.z);
    }
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Explorable Planar Grass Meadow Terrain with Navigation Raycasting */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onPointerDown={handlePlanePointerDown}
      >
        <planeGeometry args={[terrainWidth, terrainDepth, 32, 32]} />
        <meshStandardMaterial color="#8cb33e" roughness={0.9} />
      </mesh>

      {/* 2. Topographical Water Bodies (Whispering Pond & Azure Lagoon) */}
      {world.terrainFeatures
        .filter((t) => t.type === 'pond' || t.type === 'lagoon')
        .map((water) => (
          <group key={water.id} position={[water.coordinates.flatX, 0.03, water.coordinates.flatZ]}>
            <mesh receiveShadow>
              <cylinderGeometry args={[water.radius * 1.5, water.radius * 1.5, 0.06, 24]} />
              <meshStandardMaterial
                color={water.color}
                roughness={0.15}
                metalness={0.25}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Pebble Rim */}
            <mesh position={[0, -0.01, 0]}>
              <cylinderGeometry args={[water.radius * 1.68, water.radius * 1.68, 0.05, 24]} />
              <meshStandardMaterial color="#e0cda9" roughness={0.9} />
            </mesh>
          </group>
        ))}

      {/* 3. Cobblestone Highways & Winding Paths */}
      {pathMeshes.map((path) => path && (
        <mesh key={path.id} geometry={path.geometry} receiveShadow>
          <meshStandardMaterial color={path.color} roughness={0.95} />
        </mesh>
      ))}

      {/* 4. Town Center Plaza Decorative Stone Rim */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.5, 32]} />
        <meshStandardMaterial color="#ded1bd" roughness={0.9} />
      </mesh>

      {/* 5. All Canonical Buildings (6 Functional Destinations + Decorative Scenery) */}
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

      {/* 6. Charming NPC Guides */}
      {world.npcs?.map((npc) => (
        <NPCRenderer
          key={npc.id}
          npc={npc}
          playerPosition={playerPosition}
          onSelectNPC={onSelectNPC}
        />
      ))}

      {/* 7. Canonical Storybook Props & Foliage */}
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

      {/* 8. The Player Character Avatar */}
      <PlayerAvatar
        position={playerPosition}
        rotationY={playerRotation}
        isWalking={isWalking}
        targetPoint={targetPoint}
      />
    </group>
  );
};
