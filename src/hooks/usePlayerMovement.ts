import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { WorldDefinition, BuildingItem, NPCEntity, DestinationType } from '../world/types';

interface MovementState {
  position: [number, number, number];
  rotationY: number;
  isWalking: boolean;
  targetPoint: [number, number, number] | null;
  nearbyDestination: BuildingItem | null;
  nearbyNPC: NPCEntity | null;
}

export function usePlayerMovement(world: WorldDefinition, isActive: boolean) {
  const [state, setState] = useState<MovementState>({
    position: [0, 0, 0], // Town Square starting position
    rotationY: 0,
    isWalking: false,
    targetPoint: null,
    nearbyDestination: null,
    nearbyNPC: null,
  });

  const positionRef = useRef(new THREE.Vector3(0, 0, 0));
  const rotationRef = useRef(0);
  const targetPointRef = useRef<THREE.Vector3 | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastTimeRef = useRef(performance.now());

  // Building collision obstacles (center x, z, radius)
  const collisionObstacles = useRef<{ x: number; z: number; radius: number }[]>([]);

  useEffect(() => {
    collisionObstacles.current = world.buildings.map((b) => {
      const scale = typeof b.scale === 'number' ? b.scale : 1.0;
      return {
        x: b.coordinates.flatX,
        z: b.coordinates.flatZ,
        radius: 1.55 * scale,
      };
    });
  }, [world]);

  // Keyboard input listeners
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(code)) {
        keysPressed.current[code] = true;
        // Any keyboard press cancels click-to-move target
        targetPointRef.current = null;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      if (keysPressed.current[code]) {
        keysPressed.current[code] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      keysPressed.current = {};
    };
  }, [isActive]);

  // Set click / tap navigation target
  const setMoveTarget = useCallback((x: number, z: number) => {
    if (!isActive) return;
    targetPointRef.current = new THREE.Vector3(x, 0, z);
  }, [isActive]);

  // Navigate directly to a primary functional destination
  const navigateToDestination = useCallback((destRole: DestinationType) => {
    const building = world.buildings.find((b) => b.destinationRole === destRole);
    if (building) {
      // Walk towards front of building (offset by ~2.2 units)
      const targetX = building.coordinates.flatX;
      const targetZ = building.coordinates.flatZ + 2.2;
      setMoveTarget(targetX, targetZ);
    }
  }, [world, setMoveTarget]);

  // Main simulation tick
  useEffect(() => {
    if (!isActive) return;

    let animId: number;

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      let moveX = 0;
      let moveZ = 0;
      let walking = false;
      const speed = 4.8; // units per second

      const k = keysPressed.current;
      const up = k['KeyW'] || k['ArrowUp'];
      const down = k['KeyS'] || k['ArrowDown'];
      const left = k['KeyA'] || k['ArrowLeft'];
      const right = k['KeyD'] || k['ArrowRight'];

      if (up || down || left || right) {
        if (up) moveZ -= 1;
        if (down) moveZ += 1;
        if (left) moveX -= 1;
        if (right) moveX += 1;

        const len = Math.hypot(moveX, moveZ);
        if (len > 0) {
          moveX = (moveX / len) * speed * delta;
          moveZ = (moveZ / len) * speed * delta;
          walking = true;
          rotationRef.current = Math.atan2(moveX, moveZ);
        }
      } else if (targetPointRef.current) {
        // Click-to-move path interpolation
        const currentPos = positionRef.current;
        const target = targetPointRef.current;
        const dx = target.x - currentPos.x;
        const dz = target.z - currentPos.z;
        const dist = Math.hypot(dx, dz);

        if (dist > 0.25) {
          walking = true;
          const step = Math.min(speed * delta, dist);
          moveX = (dx / dist) * step;
          moveZ = (dz / dist) * step;
          rotationRef.current = Math.atan2(dx, dz);
        } else {
          targetPointRef.current = null;
        }
      }

      if (walking) {
        const nextX = positionRef.current.x + moveX;
        const nextZ = positionRef.current.z + moveZ;

        // Collision avoidance against buildings
        let collides = false;
        for (const obs of collisionObstacles.current) {
          const d = Math.hypot(nextX - obs.x, nextZ - obs.z);
          if (d < obs.radius) {
            collides = true;
            // Slide along boundary
            const pushAngle = Math.atan2(nextZ - obs.z, nextX - obs.x);
            positionRef.current.x = obs.x + Math.cos(pushAngle) * obs.radius;
            positionRef.current.z = obs.z + Math.sin(pushAngle) * obs.radius;
            break;
          }
        }

        if (!collides) {
          // Clamp to world bounds
          const b = world.flatWorldBounds;
          positionRef.current.x = Math.max(b.minX + 2, Math.min(b.maxX - 2, nextX));
          positionRef.current.z = Math.max(b.minZ + 2, Math.min(b.maxZ - 2, nextZ));
        }
      }

      // Check proximity to functional destinations (~3.8 units)
      let closestDest: BuildingItem | null = null;
      let minDestDist = 4.2;

      for (const b of world.buildings) {
        if (!b.destinationRole) continue;
        const dist = Math.hypot(
          positionRef.current.x - b.coordinates.flatX,
          positionRef.current.z - b.coordinates.flatZ
        );
        if (dist < minDestDist) {
          minDestDist = dist;
          closestDest = b;
        }
      }

      // Check proximity to NPCs (~3.4 units)
      let closestNPC: NPCEntity | null = null;
      let minNPCDist = 3.6;

      for (const npc of world.npcs || []) {
        const dist = Math.hypot(
          positionRef.current.x - npc.coordinates.flatX,
          positionRef.current.z - npc.coordinates.flatZ
        );
        if (dist < minNPCDist) {
          minNPCDist = dist;
          closestNPC = npc;
        }
      }

      setState({
        position: [positionRef.current.x, positionRef.current.y, positionRef.current.z],
        rotationY: rotationRef.current,
        isWalking: walking,
        targetPoint: targetPointRef.current
          ? [targetPointRef.current.x, targetPointRef.current.y, targetPointRef.current.z]
          : null,
        nearbyDestination: closestDest,
        nearbyNPC: closestNPC,
      });

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isActive, world]);

  return {
    ...state,
    setMoveTarget,
    navigateToDestination,
  };
}
