import * as THREE from 'three';
import { CanonicalCoordinates } from './types';

/**
 * Spherical Projection System
 *
 * Converts Canonical Coordinates into 3D Cartesian coordinates
 * on the surface of the miniature planet with proper surface-normal alignment.
 */

export interface SphericalTransform {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  normal: THREE.Vector3;
}

/**
 * Organic Topographical Terrain Elevation Model
 * Gives the miniature planet genuine 3D dimensionality:
 * - Rolling hills and bluffs
 * - Lowland valleys and meadows
 * - Carved depression basins for Whispering Pond and Azure Lagoon
 * - Undulating harmonic countryside contours
 */
export function getWorldElevation(lat: number, lon: number): number {
  let elevation = 0;

  // 1. Stargazer Bluffs (lat: 38 to 55, lon: -155 to -110)
  const dStargazer = Math.hypot(lat - 46, lon - -135);
  if (dStargazer < 28) {
    const factor = Math.cos((dStargazer / 28) * (Math.PI / 2));
    elevation += 0.52 * Math.pow(factor, 1.8);
  }

  // 2. Windmill Ridge (lat: 34 to 52, lon: 95 to 130)
  const dWindmill = Math.hypot(lat - 44, lon - 112);
  if (dWindmill < 25) {
    const factor = Math.cos((dWindmill / 25) * (Math.PI / 2));
    elevation += 0.44 * Math.pow(factor, 1.6);
  }

  // 3. Cloudcrest Knoll (lat: -35 to -15, lon: 45 to 75)
  const dKnoll = Math.hypot(lat - -25, lon - 60);
  if (dKnoll < 22) {
    const factor = Math.cos((dKnoll / 22) * (Math.PI / 2));
    elevation += 0.32 * Math.pow(factor, 2.0);
  }

  // 4. Sunrise Bluff (lat: 48 to 65, lon: -20 to 10)
  const dSunrise = Math.hypot(lat - 56, lon - -5);
  if (dSunrise < 20) {
    const factor = Math.cos((dSunrise / 20) * (Math.PI / 2));
    elevation += 0.38 * Math.pow(factor, 1.5);
  }

  // 5. Town Center Gentle Rise (lat: 14 to 28, lon: -12 to 14)
  const dTown = Math.hypot(lat - 21, lon - 1);
  if (dTown < 18) {
    const factor = Math.cos((dTown / 18) * (Math.PI / 2));
    elevation += 0.08 * factor;
  }

  // 6. Azure Lagoon Depression Basin (lat: -48 to -26, lon: -25 to 5)
  const dLagoon = Math.hypot(lat - -37, lon - -10);
  if (dLagoon < 16) {
    const factor = Math.cos((dLagoon / 16) * (Math.PI / 2));
    elevation -= 0.16 * factor;
  }

  // 7. Whispering Pond Depression Basin (lat: 25 to 35, lon: 28 to 44)
  const dPond = Math.hypot(lat - 30, lon - 36);
  if (dPond < 9) {
    const factor = Math.cos((dPond / 9) * (Math.PI / 2));
    elevation -= 0.08 * factor;
  }

  // 8. Subtle harmonic undulating countryside contours (soft bumps & valleys)
  const radLat = (lat * Math.PI) / 180;
  const radLon = (lon * Math.PI) / 180;
  const harmonic =
    Math.sin(radLat * 4 + radLon * 3) * 0.035 +
    Math.cos(radLat * 6 - radLon * 5) * 0.025;
  elevation += harmonic;

  return elevation;
}

/**
 * Convert lat/lon degrees to Cartesian coordinates on a sphere of given radius.
 * lat: [-90, 90] (0 = equator, 90 = north pole, -90 = south pole)
 * lon: [-180, 180] (0 = prime meridian)
 */
export function latLonToSpherePosition(
  lat: number,
  lon: number,
  radius: number,
  altitude = 0
): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat); // polar angle from +Y
  const theta = THREE.MathUtils.degToRad(lon + 90); // azimuthal angle in XZ plane

  const r = radius + altitude;
  const x = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

/**
 * Computes the full 3D transform (position + orientation) for an entity
 * placed on the sphere, oriented upright relative to the planet's curvature
 * and rotated around its local Y axis by rotationY (in degrees).
 *
 * Automatically factors in the organic terrain elevation model.
 */
export function getSphereTransform(
  coords: CanonicalCoordinates,
  planetRadius: number,
  rotationYDegrees = 0,
  altitudeOffset = 0
): SphericalTransform {
  const naturalElev = getWorldElevation(coords.lat, coords.lon);
  const totalAltitude = (coords.altitude ?? 0) + naturalElev + altitudeOffset;
  const position = latLonToSpherePosition(coords.lat, coords.lon, planetRadius, totalAltitude);

  // Normal vector points outward from sphere center (0, 0, 0)
  const normal = position.clone().normalize();

  // Create orientation: align +Y (up) with the surface normal
  const defaultUp = new THREE.Vector3(0, 1, 0);
  const alignQuat = new THREE.Quaternion().setFromUnitVectors(defaultUp, normal);

  // Apply local Y-rotation (bearing/heading) around the surface normal
  const yawQuat = new THREE.Quaternion().setFromAxisAngle(
    normal,
    THREE.MathUtils.degToRad(rotationYDegrees)
  );

  const finalQuat = yawQuat.multiply(alignQuat);

  return {
    position,
    quaternion: finalQuat,
    normal,
  };
}

/**
 * For the future Walkable World:
 * Returns flat world position and rotation without spherical curving.
 */
export function getFlatWorldTransform(
  coords: CanonicalCoordinates,
  rotationYDegrees = 0
): { position: THREE.Vector3; rotation: THREE.Euler } {
  return {
    position: new THREE.Vector3(coords.flatX, coords.altitude ?? 0, coords.flatZ),
    rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(rotationYDegrees), 0),
  };
}
