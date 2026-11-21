import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldDefinition, BuildingItem, NPCEntity } from '../../world/types';
import {
  getSphereTransform,
  getWorldElevation,
  latLonToSpherePosition,
} from '../../world/projection';
import { BuildingRenderer } from './BuildingModels';
import { PropRenderer } from './PropModels';
import { NPCRenderer } from './NPCModels';
import { PlayerAvatar } from './PlayerAvatar';
import { ANIME_PALETTE } from '../../styles/painterlyPalette';

interface PainterlyPlanetProps {
  world: WorldDefinition;
  glowIntensity: number;
  lanternGlowIntensity: number;
  isEntering?: boolean;
  isEntered?: boolean;
  playerPosition?: [number, number, number];
  playerRotation?: number;
  isWalking?: boolean;
  targetPoint?: [number, number, number] | null;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
  onSelectNPC?: (npc: NPCEntity) => void;
}

/**
 * PAINTERLY ANIME PLANET (One Continuous World)
 *
 * CRITICAL ARCHITECTURAL CONTRACT:
 * This component is the single physical world rendered at all camera scales:
 * - Miniature overview (landing)
 * - Mid-zoom fly-in
 * - Close-up walkable exploration
 *
 * All 24 buildings, 35 props, 5 NPCs, rolling hills, rivers, and paths live here.
 */
export const PainterlyPlanet: React.FC<PainterlyPlanetProps> = ({
  world,
  glowIntensity,
  lanternGlowIntensity,
  isEntering = false,
  isEntered = false,
  playerPosition = [0, 0, 0],
  playerRotation = 0,
  isWalking = false,
  targetPoint = null,
  onHoverBuilding,
  onSelectBuilding,
  onSelectNPC,
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);

  // 1. Procedural Contoured Anime Terrain Geometry with Vertex Coloring
  const terrainGeometry = useMemo(() => {
    const radius = world.planetRadius;
    const geom = new THREE.SphereGeometry(radius, 96, 96);
    const posAttr = geom.attributes.position;
    const vertex = new THREE.Vector3();
    const colors: number[] = [];

    // Color definitions
    const cSunlit = new THREE.Color(ANIME_PALETTE.grass.sunlit);
    const cMeadow = new THREE.Color(ANIME_PALETTE.grass.meadow);
    const cShadow = new THREE.Color(ANIME_PALETTE.grass.shadowGreen);
    const cRock = new THREE.Color(ANIME_PALETTE.earth.fieldstone);
    const cSand = new THREE.Color(ANIME_PALETTE.earth.sandShore);
    const tempColor = new THREE.Color();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const normal = vertex.clone().normalize();

      // Convert unit normal to spherical lat/lon
      const phi = Math.acos(Math.max(-1, Math.min(1, normal.y))); // 0 to PI
      const theta = Math.atan2(normal.x, normal.z); // -PI to PI
      const lat = 90 - (phi * 180) / Math.PI;
      const lon = (theta * 180) / Math.PI - 90;

      // Evaluate continuous topographical elevation
      const elev = getWorldElevation(lat, lon);
      const newRadius = radius + elev;
      vertex.copy(normal.multiplyScalar(newRadius));
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);

      // Painterly anime vertex coloring based on elevation & terrain feature
      if (elev < -0.06) {
        // Sunken lagoon / pond shore bed
        tempColor.copy(cSand);
      } else if (elev > 0.36) {
        // High bluffs & limestone crags
        const blend = Math.min(1, (elev - 0.36) / 0.25);
        tempColor.copy(cMeadow).lerp(cRock, blend);
      } else if (elev > 0.18) {
        // Sun-drenched rolling crests
        const blend = (elev - 0.18) / 0.18;
        tempColor.copy(cMeadow).lerp(cSunlit, blend);
      } else if (elev < 0.02) {
        // Sheltered valleys & damp ground
        tempColor.copy(cMeadow).lerp(cShadow, 0.45);
      } else {
        // Standard lush meadow pasture
        tempColor.copy(cMeadow);
      }

      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();
    return geom;
  }, [world.planetRadius]);

  // 2. Precompute all 24 Building Transforms using Canonical Coordinates & Elevation
  const buildingTransforms = useMemo(() => {
    return world.buildings.map((building) => {
      const transform = getSphereTransform(
        building.coordinates,
        world.planetRadius,
        building.rotationY
      );
      return { building, transform };
    });
  }, [world]);

  // 3. Precompute all 35 Prop Transforms
  const propTransforms = useMemo(() => {
    return world.props.map((prop) => {
      const transform = getSphereTransform(
        prop.coordinates,
        world.planetRadius,
        prop.rotationY
      );
      return { prop, transform };
    });
  }, [world]);

  // 4. Precompute 5 NPC Transforms
  const npcTransforms = useMemo(() => {
    return (world.npcs || []).map((npc) => {
      const transform = getSphereTransform(
        npc.coordinates,
        world.planetRadius,
        npc.rotationY
      );
      return { npc, transform };
    });
  }, [world]);

  // 5. Water bodies (Azure Lagoon & Whispering Pond)
  const waterFeatures = useMemo(() => {
    return (world.terrainFeatures || [])
      .filter((t) => t.type === 'pond' || t.type === 'lagoon')
      .map((feat) => {
        const elev = getWorldElevation(feat.coordinates.lat, feat.coordinates.lon);
        const pos = latLonToSpherePosition(
          feat.coordinates.lat,
          feat.coordinates.lon,
          world.planetRadius,
          elev + 0.04
        );
        const normal = pos.clone().normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        return { ...feat, pos, quat };
      });
  }, [world]);

  // 6. Cobblestone Pathways along Terrain Surface
  const pathMeshes = useMemo(() => {
    return world.paths.map((p) => {
      const points = p.waypoints.map((wp) => {
        const elev = getWorldElevation(wp.lat, wp.lon);
        return latLonToSpherePosition(wp.lat, wp.lon, world.planetRadius, elev + 0.028);
      });
      if (points.length < 2) return null;
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 32, p.width * 0.42, 6, false);
      return { id: p.id, geometry, color: p.color };
    }).filter(Boolean);
  }, [world]);

  // 7. Player Avatar Transform on Sphere Surface
  const playerTransform = useMemo(() => {
    // Player starts at Town Square (lat 20, lon 0)
    // Offset by playerPosition[0] (flatX) and playerPosition[2] (flatZ)
    const lat = 20 - playerPosition[2] * 0.75;
    const lon = 0 + playerPosition[0] * 0.75;
    const elev = getWorldElevation(lat, lon);
    const pos = latLonToSpherePosition(lat, lon, world.planetRadius, elev + 0.05);
    const normal = pos.clone().normalize();
    const alignQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    const yawQuat = new THREE.Quaternion().setFromAxisAngle(normal, playerRotation);
    const quat = yawQuat.multiply(alignQuat);
    return { pos, quat };
  }, [playerPosition, playerRotation, world.planetRadius]);

  // Gentle automatic rotation on landing screen; eases toward town center when entering
  useFrame((_, delta) => {
    if (!planetGroupRef.current) return;

    if (!isEntering && !isEntered) {
      // Gentle constant rotation showing off the countryside world
      planetGroupRef.current.rotation.y += 0.045 * delta;
    } else {
      // Smoothly align rotation.y to face town square (0)
      planetGroupRef.current.rotation.y = THREE.MathUtils.damp(
        planetGroupRef.current.rotation.y,
        0,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={planetGroupRef}>
      {/* 1. Main Contoured Anime Countryside Planet Mesh with Painterly Vertex Colors */}
      <mesh geometry={terrainGeometry} receiveShadow castShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.92}
          metalness={0.02}
          flatShading={false}
        />
      </mesh>

      {/* 2. Topographical Water Features (Whispering Pond & Azure Lagoon) */}
      {waterFeatures.map((water) => (
        <group key={water.id} position={water.pos} quaternion={water.quat}>
          {/* Translucent Turquoise Water Mirror */}
          <mesh receiveShadow>
            <cylinderGeometry args={[water.radius, water.radius, 0.04, 24]} />
            <meshStandardMaterial
              color={water.color}
              roughness={0.18}
              metalness={0.15}
              transparent
              opacity={0.88}
            />
          </mesh>
          {/* Sandy Shoreline Ring */}
          <mesh position={[0, -0.015, 0]} receiveShadow>
            <cylinderGeometry args={[water.radius * 1.15, water.radius * 1.15, 0.035, 24]} />
            <meshStandardMaterial color={ANIME_PALETTE.earth.sandShore} roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* 3. Winding Cobblestone Roads & Highways */}
      {pathMeshes.map(
        (path) =>
          path && (
            <mesh key={path.id} geometry={path.geometry} receiveShadow>
              <meshStandardMaterial color={path.color} roughness={0.94} />
            </mesh>
          )
      )}

      {/* 4. Exactly 24 Buildings from Canonical World Definition */}
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
            <BuildingRenderer building={building} glowIntensity={glowIntensity} />
          </group>
        );
      })}

      {/* 5. Exactly 35 Decorative Props & Anime Trees */}
      {propTransforms.map(({ prop, transform }) => (
        <group
          key={prop.id}
          position={transform.position}
          quaternion={transform.quaternion}
          scale={prop.scale || 1.0}
        >
          <PropRenderer prop={prop} lanternGlowIntensity={lanternGlowIntensity} />
        </group>
      ))}

      {/* 6. Charming Animated NPC Guides */}
      {npcTransforms.map(({ npc, transform }) => (
        <group
          key={npc.id}
          position={transform.position}
          quaternion={transform.quaternion}
          onClick={(e) => {
            e.stopPropagation();
            onSelectNPC?.(npc);
          }}
        >
          <NPCRenderer npc={npc} playerPosition={playerPosition} />
        </group>
      ))}

      {/* 7. Explorable 3D Player Character Avatar */}
      <group position={playerTransform.pos} quaternion={playerTransform.quat}>
        <PlayerAvatar
          position={[0, 0, 0]}
          rotationY={0}
          isWalking={isWalking}
          targetPoint={targetPoint}
        />
      </group>
    </group>
  );
};
