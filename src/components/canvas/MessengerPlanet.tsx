import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WorldDefinition, BuildingItem, NPCEntity } from '../../world/types';
import {
  getSphereTransform,
  getWorldElevation,
  latLonToSpherePosition,
} from '../../world/projection';
import { MESSENGER_PALETTE, CEL_GRADIENT_TEXTURE } from '../../styles/messengerPalette';
import { MessengerBuildingRenderer } from './MessengerBuildingModels';
import { MessengerPropRenderer } from './MessengerPropModels';
import { NPCRenderer } from './NPCModels';
import { PlayerAvatar } from './PlayerAvatar';

interface MessengerPlanetProps {
  world: WorldDefinition;
  isEntering: boolean;
  isEntered: boolean;
  playerPosition: [number, number, number];
  playerRotation: number;
  isWalking: boolean;
  targetPoint: [number, number, number] | null;
  onGroundClick?: (point: [number, number, number]) => void;
  onHoverBuilding?: (building: BuildingItem | null) => void;
  onSelectBuilding?: (building: BuildingItem) => void;
  onSelectNPC?: (npc: NPCEntity) => void;
}

export const MessengerPlanet: React.FC<MessengerPlanetProps> = ({
  world,
  isEntering,
  isEntered,
  playerPosition,
  playerRotation,
  isWalking,
  targetPoint,
  onGroundClick,
  onHoverBuilding,
  onSelectBuilding,
  onSelectNPC,
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const foamRef = useRef<THREE.Mesh>(null);
  const radius = world.planetRadius || 4.4;

  // 1. Procedural Cel-Shaded Island Geometry with Inked Contours
  const terrainGeometry = useMemo(() => {
    const geom = new THREE.SphereGeometry(radius, 96, 96);
    const pos = geom.attributes.position;
    const count = pos.count;

    const colors: number[] = [];
    const tempVec = new THREE.Vector3();

    const cGrass = new THREE.Color(MESSENGER_PALETTE.grassGreen);
    const cHighlight = new THREE.Color(MESSENGER_PALETTE.grassHighlight);
    const cRock = new THREE.Color(MESSENGER_PALETTE.cliffRock);
    const cSand = new THREE.Color(MESSENGER_PALETTE.sandShore);
    const cWater = new THREE.Color(MESSENGER_PALETTE.oceanSurface);

    for (let i = 0; i < count; i++) {
      tempVec.fromBufferAttribute(pos, i);

      const r = tempVec.length();
      const lat = (Math.asin(tempVec.y / r) * 180) / Math.PI;
      const lon = (Math.atan2(tempVec.x, tempVec.z) * 180) / Math.PI;

      const elev = getWorldElevation(lat, lon);
      const newRadius = radius + elev;
      tempVec.normalize().multiplyScalar(newRadius);
      pos.setXYZ(i, tempVec.x, tempVec.y, tempVec.z);

      // Color banding based on elevation
      let chosenColor = cGrass;
      if (elev < -0.2) {
        chosenColor = cWater;
      } else if (elev < 0.05) {
        chosenColor = cSand;
      } else if (elev > 0.38) {
        chosenColor = cRock;
      } else if (tempVec.y > 1.2) {
        chosenColor = cHighlight;
      }

      colors.push(chosenColor.r, chosenColor.g, chosenColor.b);
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();
    return geom;
  }, [radius]);

  // 2. Precompute all 24 Building Transforms
  const buildingTransforms = useMemo(() => {
    return world.buildings.map((building) => {
      const transform = getSphereTransform(
        building.coordinates,
        radius,
        building.rotationY
      );
      return { building, transform };
    });
  }, [world, radius]);

  // 3. Precompute all 35 Prop Transforms
  const propTransforms = useMemo(() => {
    return world.props.map((prop) => {
      const transform = getSphereTransform(
        prop.coordinates,
        radius,
        prop.rotationY
      );
      return { prop, transform };
    });
  }, [world, radius]);

  // 4. Precompute 5 NPC Transforms
  const npcTransforms = useMemo(() => {
    return (world.npcs || []).map((npc) => {
      const transform = getSphereTransform(
        npc.coordinates,
        radius,
        npc.rotationY
      );
      return { npc, transform };
    });
  }, [world, radius]);

  // 5. Water bodies (Azure Lagoon & Whispering Pond)
  const waterFeatures = useMemo(() => {
    return (world.terrainFeatures || [])
      .filter((t) => t.type === 'pond' || t.type === 'lagoon')
      .map((feat) => {
        const elev = getWorldElevation(feat.coordinates.lat, feat.coordinates.lon);
        const pos = latLonToSpherePosition(
          feat.coordinates.lat,
          feat.coordinates.lon,
          radius,
          elev + 0.04
        );
        const normal = pos.clone().normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        return { ...feat, pos, quat };
      });
  }, [world, radius]);

  // 6. Cobblestone Pathways along Terrain Surface
  const pathMeshes = useMemo(() => {
    return world.paths
      .map((p) => {
        const points = p.waypoints.map((wp) => {
          const elev = getWorldElevation(wp.lat, wp.lon);
          return latLonToSpherePosition(wp.lat, wp.lon, radius, elev + 0.028);
        });
        if (points.length < 2) return null;
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 32, p.width * 0.42, 6, false);
        return { id: p.id, geometry, color: p.color };
      })
      .filter(Boolean);
  }, [world, radius]);

  // 7. Player Avatar Transform on Sphere Surface
  const playerTransform = useMemo(() => {
    const lat = 20 - playerPosition[2] * 0.75;
    const lon = 0 + playerPosition[0] * 0.75;
    const elev = getWorldElevation(lat, lon);
    const pos = latLonToSpherePosition(lat, lon, radius, elev + 0.05);
    const normal = pos.clone().normalize();
    const alignQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    const yawQuat = new THREE.Quaternion().setFromAxisAngle(normal, playerRotation);
    const quat = yawQuat.multiply(alignQuat);
    return { pos, quat };
  }, [playerPosition, playerRotation, radius]);

  // Gentle rotation controller
  useFrame((state, delta) => {
    if (!planetGroupRef.current) return;

    if (!isEntered && !isEntering) {
      planetGroupRef.current.rotation.y += delta * 0.048;
    } else if (isEntering) {
      planetGroupRef.current.rotation.y = THREE.MathUtils.damp(
        planetGroupRef.current.rotation.y,
        0,
        3.5,
        delta
      );
    }

    if (foamRef.current) {
      const t = state.clock.getElapsedTime();
      foamRef.current.rotation.z = t * 0.03;
    }
  });

  const foamGeom = useMemo(() => new THREE.RingGeometry(radius * 0.98, radius * 1.08, 48), [radius]);

  return (
    <group ref={planetGroupRef}>
      {/* 1. Main Cel-Shaded Island Terrain Mesh */}
      <mesh
        geometry={terrainGeometry}
        receiveShadow
        castShadow
        onClick={(e) => {
          if (!isEntered) return;
          e.stopPropagation();
          onGroundClick?.([e.point.x, e.point.y, e.point.z]);
        }}
      >
        <meshToonMaterial
          vertexColors
          gradientMap={CEL_GRADIENT_TEXTURE}
        />
      </mesh>

      {/* 2. Topographical Water Features (Whispering Pond & Azure Lagoon) */}
      {waterFeatures.map((water) => (
        <group key={water.id} position={water.pos} quaternion={water.quat}>
          <mesh receiveShadow>
            <cylinderGeometry args={[water.radius, water.radius, 0.04, 24]} />
            <meshBasicMaterial
              color={MESSENGER_PALETTE.oceanSurface}
              transparent
              opacity={0.88}
            />
          </mesh>
          <mesh position={[0, -0.015, 0]} receiveShadow>
            <cylinderGeometry args={[water.radius * 1.15, water.radius * 1.15, 0.035, 24]} />
            <meshToonMaterial color={MESSENGER_PALETTE.sandShore} gradientMap={CEL_GRADIENT_TEXTURE} />
          </mesh>
        </group>
      ))}

      {/* 3. Winding Cobblestone Roads & Highways */}
      {pathMeshes.map(
        (path) =>
          path && (
            <mesh key={path.id} geometry={path.geometry} receiveShadow>
              <meshToonMaterial color={MESSENGER_PALETTE.cobblestoneRoad} gradientMap={CEL_GRADIENT_TEXTURE} />
            </mesh>
          )
      )}

      {/* 4. Ocean Shoreline Foam Disc */}
      <mesh ref={foamRef} geometry={foamGeom} position={[0, -0.2, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <meshBasicMaterial color={MESSENGER_PALETTE.oceanFoam} transparent opacity={0.4} depthWrite={false} />
      </mesh>

      {/* 5. Exactly 24 Canonical Landmark Buildings */}
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
            <MessengerBuildingRenderer building={building} glowIntensity={0.8} />
          </group>
        );
      })}

      {/* 6. Exactly 35 Decorative Props */}
      {propTransforms.map(({ prop, transform }) => (
        <group
          key={prop.id}
          position={transform.position}
          quaternion={transform.quaternion}
          scale={prop.scale || 1.0}
        >
          <MessengerPropRenderer prop={prop} />
        </group>
      ))}

      {/* 7. 5 Animated NPC Guides */}
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

      {/* 8. Walkable Player Character Avatar */}
      {isEntered && (
        <group position={playerTransform.pos} quaternion={playerTransform.quat}>
          <PlayerAvatar
            position={[0, 0, 0]}
            rotationY={0}
            isWalking={isWalking}
            targetPoint={targetPoint}
          />
        </group>
      )}
    </group>
  );
};
