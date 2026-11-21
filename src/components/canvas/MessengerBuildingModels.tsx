import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { BuildingItem, DestinationType } from '../../world/types';
import { MESSENGER_PALETTE, CEL_GRADIENT_TEXTURE } from '../../styles/messengerPalette';

interface BuildingProps {
  building: BuildingItem;
  glowIntensity: number;
}

/**
 * InkedMesh renders geometry with discrete cel-shading (MeshToonMaterial)
 * and hand-drawn black ink lines along its edges (EdgesGeometry + LineSegments).
 * Matches the outlined anime aesthetic seen in https://messenger.abeto.co/.
 */
export const InkedMesh: React.FC<{
  geometry: THREE.BufferGeometry;
  color: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  outlineColor?: string;
  thresholdAngle?: number;
}> = ({
  geometry,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  outlineColor = MESSENGER_PALETTE.inkOutline,
  thresholdAngle = 20,
}) => {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry, thresholdAngle),
    [geometry, thresholdAngle]
  );

  const toonMat = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color,
        gradientMap: CEL_GRADIENT_TEXTURE,
      }),
    [color]
  );

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: outlineColor,
        linewidth: 1.5,
      }),
    [outlineColor]
  );

  return (
    <mesh
      geometry={geometry}
      material={toonMat}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    >
      <lineSegments geometry={edges} material={lineMat} />
    </mesh>
  );
};

/**
 * Animated chimney smoke puffs in hand-inked anime style
 */
export const ChimneyWithSmoke: React.FC<{
  position: [number, number, number];
  hasSmoke?: boolean;
}> = ({ position, hasSmoke = true }) => {
  const puffRef1 = useRef<THREE.Mesh>(null);
  const puffRef2 = useRef<THREE.Mesh>(null);
  const puffRef3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!hasSmoke) return;
    const t = clock.getElapsedTime() * 1.5;

    if (puffRef1.current) {
      const p1 = (t % 2.2) / 2.2;
      puffRef1.current.position.y = position[1] + 0.35 + p1 * 0.85;
      puffRef1.current.position.x = position[0] + Math.sin(t * 1.2) * 0.08 * p1;
      const s1 = 0.08 + p1 * 0.14;
      puffRef1.current.scale.set(s1, s1 * 0.9, s1);
      (puffRef1.current.material as THREE.MeshBasicMaterial).opacity = (1 - p1) * 0.7;
    }

    if (puffRef2.current) {
      const p2 = ((t + 0.75) % 2.2) / 2.2;
      puffRef2.current.position.y = position[1] + 0.35 + p2 * 0.85;
      puffRef2.current.position.x = position[0] + Math.sin((t + 0.75) * 1.2) * 0.08 * p2;
      const s2 = 0.08 + p2 * 0.14;
      puffRef2.current.scale.set(s2, s2 * 0.9, s2);
      (puffRef2.current.material as THREE.MeshBasicMaterial).opacity = (1 - p2) * 0.7;
    }

    if (puffRef3.current) {
      const p3 = ((t + 1.5) % 2.2) / 2.2;
      puffRef3.current.position.y = position[1] + 0.35 + p3 * 0.85;
      puffRef3.current.position.x = position[0] + Math.sin((t + 1.5) * 1.2) * 0.08 * p3;
      const s3 = 0.08 + p3 * 0.14;
      puffRef3.current.scale.set(s3, s3 * 0.9, s3);
      (puffRef3.current.material as THREE.MeshBasicMaterial).opacity = (1 - p3) * 0.7;
    }
  });

  const chimneyGeom = useMemo(() => new THREE.BoxGeometry(0.24, 0.65, 0.24), []);
  const potGeom = useMemo(() => new THREE.CylinderGeometry(0.09, 0.08, 0.12, 8), []);

  return (
    <group>
      <InkedMesh
        geometry={chimneyGeom}
        color={MESSENGER_PALETTE.cliffRock}
        position={position}
      />
      <InkedMesh
        geometry={potGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[position[0], position[1] + 0.38, position[2]]}
      />
      {hasSmoke && (
        <>
          <mesh ref={puffRef1}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={MESSENGER_PALETTE.chimneySmoke} transparent opacity={0.6} />
          </mesh>
          <mesh ref={puffRef2}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={MESSENGER_PALETTE.chimneySmoke} transparent opacity={0.6} />
          </mesh>
          <mesh ref={puffRef3}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={MESSENGER_PALETTE.chimneySmoke} transparent opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  );
};

/**
 * Inked multi-pane glowing window
 */
export const InkedWindow: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  glowColor?: string;
  hasFlowerBox?: boolean;
}> = ({
  position,
  rotation = [0, 0, 0],
  size = [0.28, 0.34],
  glowColor = MESSENGER_PALETTE.windowGlowDay,
  hasFlowerBox = false,
}) => {
  const frameGeom = useMemo(() => new THREE.BoxGeometry(size[0] + 0.06, size[1] + 0.06, 0.04), [size]);
  const paneGeom = useMemo(() => new THREE.PlaneGeometry(size[0], size[1]), [size]);
  const flowerBoxGeom = useMemo(() => new THREE.BoxGeometry(size[0] + 0.08, 0.08, 0.12), [size]);

  return (
    <group position={position} rotation={rotation}>
      {/* Outer Inked Frame */}
      <InkedMesh
        geometry={frameGeom}
        color={MESSENGER_PALETTE.timberDarkOak}
        position={[0, 0, 0]}
      />
      {/* Glowing Pane */}
      <mesh geometry={paneGeom} position={[0, 0, 0.025]}>
        <meshBasicMaterial color={glowColor} />
      </mesh>
      {/* Flower Box */}
      {hasFlowerBox && (
        <group position={[0, -size[1] * 0.5 - 0.04, 0.06]}>
          <InkedMesh geometry={flowerBoxGeom} color={MESSENGER_PALETTE.roofTerracotta} />
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial color="#e76f51" />
          </mesh>
        </group>
      )}
    </group>
  );
};

/**
 * Inked arched oak doorway
 */
export const InkedDoorway: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
}> = ({ position, rotation = [0, 0, 0], size = [0.38, 0.65] }) => {
  const frameGeom = useMemo(() => new THREE.BoxGeometry(size[0] + 0.08, size[1] + 0.06, 0.05), [size]);
  const doorGeom = useMemo(() => new THREE.BoxGeometry(size[0], size[1], 0.04), [size]);
  const knobGeom = useMemo(() => new THREE.SphereGeometry(0.025, 6, 6), []);

  return (
    <group position={position} rotation={rotation}>
      <InkedMesh geometry={frameGeom} color={MESSENGER_PALETTE.cliffRockDark} position={[0, size[1] * 0.5, 0]} />
      <InkedMesh geometry={doorGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0, size[1] * 0.5, 0.02]} />
      <mesh geometry={knobGeom} position={[size[0] * 0.32, size[1] * 0.5, 0.05]}>
        <meshBasicMaterial color={MESSENGER_PALETTE.buttonGold} />
      </mesh>
    </group>
  );
};

/**
 * Industrial rust pipework assembly (as seen on the right side of the Messenger globe!)
 */
export const IndustrialPipeCluster: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ position, rotation = [0, 0, 0], scale = 1 }) => {
  const pipeMainGeom = useMemo(() => new THREE.CylinderGeometry(0.14, 0.14, 1.4, 12), []);
  const pipeElbowGeom = useMemo(() => new THREE.TorusGeometry(0.24, 0.12, 8, 16, Math.PI * 0.5), []);
  const tankGeom = useMemo(() => new THREE.CylinderGeometry(0.35, 0.35, 1.1, 16), []);
  const tankDomeGeom = useMemo(() => new THREE.SphereGeometry(0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Storage Tank */}
      <InkedMesh geometry={tankGeom} color={MESSENGER_PALETTE.pipeRustOrange} position={[0, 0.55, 0]} />
      <InkedMesh geometry={tankDomeGeom} color={MESSENGER_PALETTE.pipeRustShadow} position={[0, 1.1, 0]} />

      {/* Main Vertical Pipe */}
      <InkedMesh
        geometry={pipeMainGeom}
        color={MESSENGER_PALETTE.pipeRustOrange}
        position={[0.55, 0.7, 0]}
      />

      {/* Elbow curving out */}
      <InkedMesh
        geometry={pipeElbowGeom}
        color={MESSENGER_PALETTE.pipeRustOrange}
        position={[0.31, 1.4, 0]}
        rotation={[0, 0, Math.PI * 0.5]}
      />

      {/* Horizontal conduit pipe */}
      <InkedMesh
        geometry={pipeMainGeom}
        color={MESSENGER_PALETTE.metalSteel}
        position={[0.2, 0.3, 0.4]}
        rotation={[0, 0, Math.PI * 0.5]}
      />
    </group>
  );
};

/**
 * Floating destination beacon with gentle bobbing motion
 */
export const DestinationBeacon: React.FC<{
  role: DestinationType;
  color: string;
  position: [number, number, number];
}> = ({ color, position }) => {
  const gemRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2.0;
    if (gemRef.current) {
      gemRef.current.position.y = position[1] + Math.sin(t) * 0.15;
      gemRef.current.rotation.y = t * 0.8;
      gemRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.position.y = position[1] + Math.sin(t + 0.8) * 0.12;
      ringRef.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.7) * 0.15;
      ringRef.current.rotation.z = -t * 0.6;
    }
  });

  const octaGeom = useMemo(() => new THREE.OctahedronGeometry(0.24, 0), []);
  const torusGeom = useMemo(() => new THREE.TorusGeometry(0.38, 0.025, 8, 20), []);

  return (
    <group>
      <mesh ref={gemRef} geometry={octaGeom} position={position}>
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ringRef} geometry={torusGeom} position={position}>
        <meshBasicMaterial color={color} transparent opacity={0.65} />
      </mesh>
    </group>
  );
};

/* =========================================================================
   1. PRIMARY FUNCTIONAL DESTINATION BUILDINGS (6 Total)
   ========================================================================= */

/**
 * 1. The Little House (About Me)
 */
export const LittleHouseBuilding: React.FC<BuildingProps> = ({ building, glowIntensity: _glowIntensity }) => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.4, 0.95, 1.2), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.15, 0.75, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.475, 0]} />
      {/* Terracotta Hip Roof */}
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.32, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.61]} />
      <InkedWindow position={[-0.42, 0.55, 0.61]} hasFlowerBox />
      <InkedWindow position={[0.42, 0.55, 0.61]} hasFlowerBox />
      <InkedWindow position={[0.71, 0.55, 0]} rotation={[0, Math.PI * 0.5, 0]} />
      <ChimneyWithSmoke position={[0.42, 1.3, 0.3]} />
      {building.destinationRole && (
        <DestinationBeacon role={building.destinationRole} color="#e76f51" position={[0, 2.3, 0]} />
      )}
    </group>
  );
};

/**
 * 2. The Grand Academy / University (Education)
 */
export const UniversityBuilding: React.FC<BuildingProps> = ({ building }) => {
  const mainHallGeom = useMemo(() => new THREE.BoxGeometry(2.4, 1.3, 1.4), []);
  const porticoGeom = useMemo(() => new THREE.BoxGeometry(1.1, 1.1, 0.4), []);
  const pedimentGeom = useMemo(() => new THREE.ConeGeometry(0.85, 0.45, 4), []);
  const roofGeom = useMemo(() => new THREE.BoxGeometry(2.5, 0.5, 1.5), []);
  const domeGeom = useMemo(() => new THREE.SphereGeometry(0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), []);

  return (
    <group>
      <InkedMesh geometry={mainHallGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.65, 0]} />
      <InkedMesh geometry={porticoGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.55, 0.8]} />
      <InkedMesh
        geometry={pedimentGeom}
        color={MESSENGER_PALETTE.stuccoWhite}
        position={[0, 1.32, 0.8]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedMesh geometry={roofGeom} color={MESSENGER_PALETTE.roofSlateBlue} position={[0, 1.55, 0]} />
      {/* Central Celestial Dome */}
      <InkedMesh geometry={domeGeom} color={MESSENGER_PALETTE.roofVerdigris} position={[0, 1.8, 0]} />
      <InkedDoorway position={[0, 0, 1.01]} size={[0.48, 0.78]} />
      <InkedWindow position={[-0.75, 0.75, 0.71]} />
      <InkedWindow position={[0.75, 0.75, 0.71]} />
      {building.destinationRole && (
        <DestinationBeacon role={building.destinationRole} color="#457b9d" position={[0, 2.65, 0]} />
      )}
    </group>
  );
};

/**
 * 3. The Engineer's Workshop (Experience)
 */
export const WorkshopBuilding: React.FC<BuildingProps> = ({ building }) => {
  const bayGeom = useMemo(() => new THREE.BoxGeometry(1.6, 0.9, 1.3), []);
  const roofGeom = useMemo(() => new THREE.BoxGeometry(1.7, 0.4, 1.4), []);

  return (
    <group>
      <InkedMesh geometry={bayGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.45, 0]} />
      <InkedMesh geometry={roofGeom} color={MESSENGER_PALETTE.roofTerracotta} position={[0, 1.05, 0]} />
      <InkedDoorway position={[0, 0, 0.66]} size={[0.55, 0.7]} />
      <InkedWindow position={[-0.55, 0.5, 0.66]} />
      <InkedWindow position={[0.55, 0.5, 0.66]} />
      {/* Messenger-style Industrial Pipe Work */}
      <IndustrialPipeCluster position={[0.85, 0, 0.2]} scale={0.8} />
      <ChimneyWithSmoke position={[-0.45, 1.25, -0.3]} />
      {building.destinationRole && (
        <DestinationBeacon role={building.destinationRole} color="#d4a373" position={[0, 2.2, 0]} />
      )}
    </group>
  );
};

/**
 * 4. The Innovation House (Projects)
 */
export const InventionHouseBuilding: React.FC<BuildingProps> = ({ building }) => {
  const mainGeom = useMemo(() => new THREE.BoxGeometry(1.5, 1.1, 1.3), []);
  const towerGeom = useMemo(() => new THREE.CylinderGeometry(0.35, 0.4, 1.6, 8), []);
  const spireGeom = useMemo(() => new THREE.ConeGeometry(0.45, 0.8, 8), []);

  return (
    <group>
      <InkedMesh geometry={mainGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.55, 0]} />
      {/* Side Observatory Spire */}
      <InkedMesh geometry={towerGeom} color={MESSENGER_PALETTE.cliffRock} position={[0.85, 0.8, 0.2]} />
      <InkedMesh geometry={spireGeom} color={MESSENGER_PALETTE.roofVerdigris} position={[0.85, 2.0, 0.2]} />
      {/* Industrial Pipes */}
      <IndustrialPipeCluster position={[-0.85, 0, 0]} scale={0.7} />
      <InkedDoorway position={[0, 0, 0.66]} />
      <InkedWindow position={[-0.45, 0.65, 0.66]} />
      <InkedWindow position={[0.45, 0.65, 0.66]} />
      <ChimneyWithSmoke position={[0, 1.25, -0.35]} />
      {building.destinationRole && (
        <DestinationBeacon role={building.destinationRole} color="#9b5de5" position={[0, 2.45, 0]} />
      )}
    </group>
  );
};

/**
 * 5. The High Library (Skills)
 */
export const LibraryBuilding: React.FC<BuildingProps> = ({ building }) => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.8, 1.35, 1.3), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.35, 0.85, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.675, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofSlateBlue}
        position={[0, 1.775, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.66]} size={[0.45, 0.8]} />
      <InkedWindow position={[-0.55, 0.85, 0.66]} />
      <InkedWindow position={[0.55, 0.85, 0.66]} />
      <InkedWindow position={[-0.55, 0.35, 0.66]} />
      <InkedWindow position={[0.55, 0.35, 0.66]} />
      {building.destinationRole && (
        <DestinationBeacon role={building.destinationRole} color="#2a9d8f" position={[0, 2.5, 0]} />
      )}
    </group>
  );
};

/**
 * 6. The Courier Post Office (Contact)
 */
export const PostOfficeBuilding: React.FC<BuildingProps> = ({ building }) => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.4, 0.9, 1.1), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.1, 0.65, 4), []);
  const postBoxGeom = useMemo(() => new THREE.CylinderGeometry(0.12, 0.12, 0.45, 10), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.45, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.22, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.56]} />
      <InkedWindow position={[-0.42, 0.5, 0.56]} hasFlowerBox />
      <InkedWindow position={[0.42, 0.5, 0.56]} hasFlowerBox />
      {/* Red Post Letterbox */}
      <InkedMesh geometry={postBoxGeom} color="#e63946" position={[0.65, 0.22, 0.7]} />
      <ChimneyWithSmoke position={[-0.42, 1.2, 0.2]} />
      {building.destinationRole && (
        <DestinationBeacon role={building.destinationRole} color="#f4a261" position={[0, 2.15, 0]} />
      )}
    </group>
  );
};

/* =========================================================================
   2. DECORATIVE SCENERY BUILDINGS (18 Total)
   ========================================================================= */

/**
 * 7. Grand Town Hall & Clocktower
 */
export const TownHallBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(2.0, 1.1, 1.5), []);
  const towerGeom = useMemo(() => new THREE.BoxGeometry(0.7, 1.9, 0.7), []);
  const spireGeom = useMemo(() => new THREE.ConeGeometry(0.48, 1.0, 4), []);
  const clockGeom = useMemo(() => new THREE.CircleGeometry(0.16, 12), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.55, 0]} />
      <InkedMesh geometry={towerGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 1.85, 0.2]} />
      <InkedMesh
        geometry={spireGeom}
        color={MESSENGER_PALETTE.roofSlateBlue}
        position={[0, 3.3, 0.2]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      {/* Clock Faces */}
      <mesh geometry={clockGeom} position={[0, 2.4, 0.56]}>
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <InkedDoorway position={[0, 0, 0.76]} size={[0.5, 0.8]} />
      <InkedWindow position={[-0.65, 0.65, 0.76]} />
      <InkedWindow position={[0.65, 0.65, 0.76]} />
    </group>
  );
};

/**
 * 8. Cinnamon Hearth Bakery
 */
export const BakeryBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.3, 0.85, 1.1), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.05, 0.65, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.425, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.175, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.56]} />
      <InkedWindow position={[-0.38, 0.48, 0.56]} />
      <InkedWindow position={[0.38, 0.48, 0.56]} />
      <ChimneyWithSmoke position={[0.38, 1.15, -0.25]} />
    </group>
  );
};

/**
 * 9. Weaver's Guildhouse
 */
export const WeaverHouseBuilding: React.FC<BuildingProps> = () => {
  const lowerGeom = useMemo(() => new THREE.BoxGeometry(1.4, 0.75, 1.2), []);
  const upperGeom = useMemo(() => new THREE.BoxGeometry(1.5, 0.75, 1.3), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.2, 0.6, 4), []);

  return (
    <group>
      <InkedMesh geometry={lowerGeom} color={MESSENGER_PALETTE.cliffRock} position={[0, 0.375, 0]} />
      <InkedMesh geometry={upperGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 1.125, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofSlateBlue}
        position={[0, 1.8, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.61]} />
      <InkedWindow position={[-0.45, 1.15, 0.66]} hasFlowerBox />
      <InkedWindow position={[0.45, 1.15, 0.66]} hasFlowerBox />
    </group>
  );
};

/**
 * 10. Herbal Apothecary
 */
export const ApothecaryBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.25, 0.9, 1.05), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.0, 0.65, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.45, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofVerdigris}
        position={[0, 1.225, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.535]} />
      <InkedWindow position={[-0.35, 0.5, 0.535]} hasFlowerBox />
      <InkedWindow position={[0.35, 0.5, 0.535]} hasFlowerBox />
    </group>
  );
};

/**
 * 11. High Meadow Windmill
 */
export const WindmillBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.CylinderGeometry(0.7, 0.9, 1.6, 8), []);
  const capGeom = useMemo(() => new THREE.ConeGeometry(0.75, 0.65, 8), []);
  const sailsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (sailsRef.current) {
      sailsRef.current.rotation.z = clock.getElapsedTime() * 0.7;
    }
  });

  const sailGeom = useMemo(() => new THREE.BoxGeometry(0.18, 1.1, 0.04), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.8, 0]} />
      <InkedMesh geometry={capGeom} color={MESSENGER_PALETTE.roofThatchGold} position={[0, 1.925, 0]} />
      <InkedDoorway position={[0, 0, 0.85]} size={[0.35, 0.65]} />
      {/* 4 Rotating Sails */}
      <group ref={sailsRef} position={[0, 1.65, 0.78]}>
        <InkedMesh geometry={sailGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 0.55, 0]} />
        <InkedMesh geometry={sailGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, -0.55, 0]} />
        <InkedMesh
          geometry={sailGeom}
          color={MESSENGER_PALETTE.timberWeathered}
          position={[0.55, 0, 0]}
          rotation={[0, 0, Math.PI * 0.5]}
        />
        <InkedMesh
          geometry={sailGeom}
          color={MESSENGER_PALETTE.timberWeathered}
          position={[-0.55, 0, 0]}
          rotation={[0, 0, Math.PI * 0.5]}
        />
      </group>
    </group>
  );
};

/**
 * 12. Miller's House
 */
export const MillerHouseBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.35, 0.85, 1.15), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.1, 0.6, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.425, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.15, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.585]} />
      <InkedWindow position={[-0.4, 0.48, 0.585]} />
      <InkedWindow position={[0.4, 0.48, 0.585]} />
      <ChimneyWithSmoke position={[-0.38, 1.15, -0.25]} />
    </group>
  );
};

/**
 * 13. Gardener's Thatched Cottage
 */
export const GardenerCottageBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.2, 0.8, 1.05), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.0, 0.7, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.4, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofThatchGold}
        position={[0, 1.15, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.535]} />
      <InkedWindow position={[-0.35, 0.45, 0.535]} hasFlowerBox />
      <InkedWindow position={[0.35, 0.45, 0.535]} hasFlowerBox />
    </group>
  );
};

/**
 * 14. Red Timber Barn & Hayloft
 */
export const BarnHayloftBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.6, 1.05, 1.25), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.25, 0.65, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.roofTerracotta} position={[0, 0.525, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.timberDarkOak}
        position={[0, 1.375, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.635]} size={[0.55, 0.75]} />
    </group>
  );
};

/**
 * 15. Orchard Cider Shed
 */
export const CiderShedBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.15, 0.75, 0.95), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(0.95, 0.55, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 0.375, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.025, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.485]} />
    </group>
  );
};

/**
 * 16. Apiary Cottage
 */
export const ApiaryCottageBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.1, 0.75, 0.9), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(0.9, 0.55, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.375, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofThatchGold}
        position={[0, 1.025, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.46]} />
      <InkedWindow position={[0.3, 0.42, 0.46]} hasFlowerBox />
    </group>
  );
};

/**
 * 17. Beacon Point Lighthouse
 */
export const LighthouseBuilding: React.FC<BuildingProps> = () => {
  const towerGeom = useMemo(() => new THREE.CylinderGeometry(0.42, 0.62, 2.4, 12), []);
  const galleryGeom = useMemo(() => new THREE.CylinderGeometry(0.55, 0.55, 0.1, 12), []);
  const lampGeom = useMemo(() => new THREE.CylinderGeometry(0.35, 0.35, 0.4, 12), []);
  const domeGeom = useMemo(() => new THREE.SphereGeometry(0.38, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), []);

  return (
    <group>
      <InkedMesh geometry={towerGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 1.2, 0]} />
      <InkedMesh geometry={galleryGeom} color={MESSENGER_PALETTE.roofTerracotta} position={[0, 2.45, 0]} />
      {/* Lantern Room */}
      <InkedMesh geometry={lampGeom} color={MESSENGER_PALETTE.windowGlowNight} position={[0, 2.7, 0]} />
      <InkedMesh geometry={domeGeom} color={MESSENGER_PALETTE.roofTerracotta} position={[0, 2.9, 0]} />
      <InkedDoorway position={[0, 0, 0.6]} size={[0.32, 0.6]} />
    </group>
  );
};

/**
 * 18. Fisherman's Boathouse on Stilts
 */
export const FishermanBoathouse: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.3, 0.8, 1.1), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.05, 0.55, 4), []);
  const stiltGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6), []);

  return (
    <group>
      {/* 4 Timber Stilts */}
      <InkedMesh geometry={stiltGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[-0.5, 0.3, -0.4]} />
      <InkedMesh geometry={stiltGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0.5, 0.3, -0.4]} />
      <InkedMesh geometry={stiltGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[-0.5, 0.3, 0.4]} />
      <InkedMesh geometry={stiltGeom} color={MESSENGER_PALETTE.timberDarkOak} position={[0.5, 0.3, 0.4]} />
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 1.0, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofSlateBlue}
        position={[0, 1.675, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0.6, 0.56]} />
    </group>
  );
};

/**
 * 19. Azure Lagoon Pier Pavilion
 */
export const PierPavilionBuilding: React.FC<BuildingProps> = () => {
  const pillarGeom = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(0.9, 0.5, 6), []);
  const deckGeom = useMemo(() => new THREE.CylinderGeometry(0.8, 0.8, 0.1, 8), []);

  return (
    <group>
      <InkedMesh geometry={deckGeom} color={MESSENGER_PALETTE.timberWeathered} position={[0, 0.05, 0]} />
      <InkedMesh geometry={pillarGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[-0.5, 0.5, -0.3]} />
      <InkedMesh geometry={pillarGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0.5, 0.5, -0.3]} />
      <InkedMesh geometry={pillarGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[-0.5, 0.5, 0.3]} />
      <InkedMesh geometry={pillarGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0.5, 0.5, 0.3]} />
      <InkedMesh geometry={roofGeom} color={MESSENGER_PALETTE.roofVerdigris} position={[0, 1.2, 0]} />
    </group>
  );
};

/**
 * 20. Harbor Master's Customs Office
 */
export const HarborOfficeBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.35, 0.9, 1.15), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.1, 0.6, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWarmCream} position={[0, 0.45, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.2, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.585]} />
      <InkedWindow position={[-0.4, 0.5, 0.585]} />
      <InkedWindow position={[0.4, 0.5, 0.585]} />
    </group>
  );
};

/**
 * 21. Stargazer Dome & Observatory
 */
export const ObservatoryBuilding: React.FC<BuildingProps> = () => {
  const drumGeom = useMemo(() => new THREE.CylinderGeometry(0.85, 0.95, 1.2, 16), []);
  const domeGeom = useMemo(() => new THREE.SphereGeometry(0.82, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), []);
  const scopeGeom = useMemo(() => new THREE.CylinderGeometry(0.08, 0.08, 0.9, 8), []);

  return (
    <group>
      <InkedMesh geometry={drumGeom} color={MESSENGER_PALETTE.cliffRock} position={[0, 0.6, 0]} />
      <InkedMesh geometry={domeGeom} color={MESSENGER_PALETTE.roofVerdigris} position={[0, 1.2, 0]} />
      {/* Brass Telescope Barrel */}
      <InkedMesh
        geometry={scopeGeom}
        color={MESSENGER_PALETTE.buttonGold}
        position={[0, 1.8, 0.3]}
        rotation={[0.6, 0, 0]}
      />
      <InkedDoorway position={[0, 0, 0.96]} size={[0.4, 0.7]} />
    </group>
  );
};

/**
 * 22. Cloudcrest Tea Pavilion
 */
export const TeaHouseBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.2, 0.7, 1.2), []);
  const roofLowerGeom = useMemo(() => new THREE.ConeGeometry(1.2, 0.35, 4), []);
  const roofUpperGeom = useMemo(() => new THREE.ConeGeometry(0.85, 0.45, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.35, 0]} />
      <InkedMesh
        geometry={roofLowerGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 0.875, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedMesh
        geometry={roofUpperGeom}
        color={MESSENGER_PALETTE.roofTerracotta}
        position={[0, 1.35, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.61]} />
    </group>
  );
};

/**
 * 23. Botanical Orangery & Fernhouse
 */
export const GreenhouseBuilding: React.FC<BuildingProps> = () => {
  const plinthGeom = useMemo(() => new THREE.BoxGeometry(1.4, 0.35, 1.1), []);
  const vaultGeom = useMemo(() => new THREE.CylinderGeometry(0.55, 0.55, 1.35, 12, 1, false, 0, Math.PI), []);

  return (
    <group>
      <InkedMesh geometry={plinthGeom} color={MESSENGER_PALETTE.roofTerracotta} position={[0, 0.175, 0]} />
      <InkedMesh
        geometry={vaultGeom}
        color={MESSENGER_PALETTE.oceanFoam}
        position={[0, 0.35, 0]}
        rotation={[0, 0, Math.PI * 0.5]}
      />
      <InkedDoorway position={[0, 0, 0.56]} size={[0.35, 0.55]} />
    </group>
  );
};

/**
 * 24. Bookbinder's Gabled Cottage
 */
export const BookbinderCottageBuilding: React.FC<BuildingProps> = () => {
  const baseGeom = useMemo(() => new THREE.BoxGeometry(1.25, 0.85, 1.05), []);
  const roofGeom = useMemo(() => new THREE.ConeGeometry(1.05, 0.65, 4), []);

  return (
    <group>
      <InkedMesh geometry={baseGeom} color={MESSENGER_PALETTE.stuccoWhite} position={[0, 0.425, 0]} />
      <InkedMesh
        geometry={roofGeom}
        color={MESSENGER_PALETTE.roofSlateBlue}
        position={[0, 1.175, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
      <InkedDoorway position={[0, 0, 0.535]} />
      <InkedWindow position={[-0.35, 0.48, 0.535]} hasFlowerBox />
      <InkedWindow position={[0.35, 0.48, 0.535]} hasFlowerBox />
      <ChimneyWithSmoke position={[0.35, 1.15, -0.25]} />
    </group>
  );
};

/**
 * Universal dispatcher mapping building.type to the corresponding 3D model
 */
export const MessengerBuildingRenderer: React.FC<BuildingProps> = (props) => {
  switch (props.building.type) {
    case 'little-house':
      return <LittleHouseBuilding {...props} />;
    case 'university':
      return <UniversityBuilding {...props} />;
    case 'workshop':
      return <WorkshopBuilding {...props} />;
    case 'invention-house':
      return <InventionHouseBuilding {...props} />;
    case 'library':
      return <LibraryBuilding {...props} />;
    case 'post-office':
      return <PostOfficeBuilding {...props} />;
    case 'town-hall':
      return <TownHallBuilding {...props} />;
    case 'bakery':
      return <BakeryBuilding {...props} />;
    case 'weaver-house':
      return <WeaverHouseBuilding {...props} />;
    case 'apothecary':
      return <ApothecaryBuilding {...props} />;
    case 'windmill':
      return <WindmillBuilding {...props} />;
    case 'miller-house':
      return <MillerHouseBuilding {...props} />;
    case 'cottage-gardener':
      return <GardenerCottageBuilding {...props} />;
    case 'barn-hayloft':
      return <BarnHayloftBuilding {...props} />;
    case 'cider-shed':
      return <CiderShedBuilding {...props} />;
    case 'apiary-cottage':
      return <ApiaryCottageBuilding {...props} />;
    case 'lighthouse':
      return <LighthouseBuilding {...props} />;
    case 'cottage-fisherman':
      return <FishermanBoathouse {...props} />;
    case 'pier-pavilion':
      return <PierPavilionBuilding {...props} />;
    case 'harbor-office':
      return <HarborOfficeBuilding {...props} />;
    case 'observatory':
      return <ObservatoryBuilding {...props} />;
    case 'tea-house':
      return <TeaHouseBuilding {...props} />;
    case 'greenhouse':
      return <GreenhouseBuilding {...props} />;
    case 'cottage-bookbinder':
      return <BookbinderCottageBuilding {...props} />;
    default:
      return <LittleHouseBuilding {...props} />;
  }
};
