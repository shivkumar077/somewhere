/**
 * Types defining the canonical world data.
 *
 * CRITICAL ARCHITECTURAL CONTRACT:
 * Both the spherical miniature planet renderer (Milestone 01)
 * AND the future walkable first/third-person world renderer (Milestone 02)
 * read this SAME canonical definition.
 *
 * If a building or prop is added, moved, or deleted here,
 * both views reflect that change.
 */

export type BuildingType =
  | 'town-hall'
  | 'windmill'
  | 'bakery'
  | 'observatory'
  | 'cottage'
  | 'greenhouse'
  | 'tea-house'
  | 'lighthouse'
  | 'watermill';

export type PropType =
  | 'tree-round'
  | 'tree-pine'
  | 'tree-blossom'
  | 'bush-flower'
  | 'lantern'
  | 'bench'
  | 'fence'
  | 'bridge'
  | 'well'
  | 'cart'
  | 'pond'
  | 'flower-patch'
  | 'chimney-smoke';

export interface CanonicalCoordinates {
  /**
   * Latitude in degrees (-90 to +90) on the sphere,
   * or maps to north/south in flat terrain coordinate system.
   */
  lat: number;
  /**
   * Longitude in degrees (-180 to +180) on the sphere,
   * or maps to east/west in flat terrain coordinate system.
   */
  lon: number;
  /**
   * Elevation / height offset from surface (0 = grounded)
   */
  altitude?: number;
  /**
   * Equivalent flat world coordinates (x, z) for walkable world
   */
  flatX: number;
  flatZ: number;
}

export interface BuildingItem {
  id: string;
  name: string;
  type: BuildingType;
  description: string;
  coordinates: CanonicalCoordinates;
  rotationY: number; // in degrees
  scale?: [number, number, number] | number;
  visualTheme: {
    wallColor: string;
    roofColor: string;
    trimColor: string;
    accentColor?: string;
    windowGlowColor?: string;
  };
  metadata: {
    storySnippet: string;
    residentOrPurpose: string;
    milestoneIntroduced: number;
    interactionTargetId?: string;
  };
}

export interface PropItem {
  id: string;
  type: PropType;
  coordinates: CanonicalCoordinates;
  rotationY: number; // in degrees
  scale?: [number, number, number] | number;
  color?: string;
  secondaryColor?: string;
}

export interface PathWaypoint {
  lat: number;
  lon: number;
  flatX: number;
  flatZ: number;
}

export interface PathSegment {
  id: string;
  name: string;
  color: string;
  width: number;
  waypoints: PathWaypoint[];
}

export interface LandmarkItem {
  id: string;
  title: string;
  coordinates: CanonicalCoordinates;
  description: string;
}

export interface WorldDefinition {
  version: string;
  name: string;
  planetRadius: number; // for spherical projection
  flatWorldBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  buildings: BuildingItem[];
  props: PropItem[];
  paths: PathSegment[];
  landmarks: LandmarkItem[];
}

