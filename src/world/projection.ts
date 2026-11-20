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
 */
export function getSphereTransform(
  coords: CanonicalCoordinates,
  planetRadius: number,
  rotationYDegrees = 0,
  altitudeOffset = 0
): SphericalTransform {
  const totalAltitude = (coords.altitude ?? 0) + altitudeOffset;
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
 * For the future Walkable World (Milestone 02):
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

