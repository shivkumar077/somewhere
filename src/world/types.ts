/**
 * CANONICAL WORLD ARCHITECTURE SPECIFICATION
 *
 * CRITICAL ARCHITECTURAL CONTRACT:
 * Both the spherical miniature planet renderer (Milestone 01/02)
 * AND the walkable living town renderer (Milestone 03 / Prompt 05)
 * read this SAME canonical definition.
 *
 * If a building or prop is added, moved, or deleted here,
 * both views reflect that change automatically.
 */

export type BuildingCategory =
  | 'civic'
  | 'residential'
  | 'commercial'
  | 'landmark'
  | 'agriculture'
  | 'coastal'
  | 'craft'
  | 'scholarly'
  | 'sanctuary';

export type DestinationType =
  | 'about'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact';

export type BuildingType =
  | 'little-house'
  | 'university'
  | 'workshop'
  | 'invention-house'
  | 'library'
  | 'post-office'
  | 'town-hall'
  | 'windmill'
  | 'bakery'
  | 'observatory'
  | 'cottage-gardener'
  | 'cottage-bookbinder'
  | 'cottage-fisherman'
  | 'greenhouse'
  | 'tea-house'
  | 'lighthouse'
  | 'blacksmith-workshop'
  | 'weaver-house'
  | 'apothecary'
  | 'miller-house'
  | 'barn-hayloft'
  | 'cider-shed'
  | 'apiary-cottage'
  | 'pier-pavilion'
  | 'harbor-office';

export type PropType =
  | 'tree-round'
  | 'tree-pine'
  | 'tree-blossom'
  | 'tree-willow'
  | 'tree-apple'
  | 'bush-flower'
  | 'lantern'
  | 'bench'
  | 'fence'
  | 'bridge'
  | 'well'
  | 'fountain'
  | 'cart'
  | 'market-stall'
  | 'rowboat'
  | 'barrel-stack'
  | 'garden-plot'
  | 'flower-patch'
  | 'chimney-smoke';

export interface CanonicalCoordinates {
  /**
   * Latitude in degrees (-90 to +90) on the sphere
   */
  lat: number;
  /**
   * Longitude in degrees (-180 to +180) on the sphere
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

export interface BuildingRenderingConfig {
  lodLevel: 'low' | 'medium' | 'high';
  castShadow: boolean;
  receiveShadow: boolean;
  hasWindowGlow: boolean;
  glowColorOverride?: string;
}

export interface BuildingItem {
  id: string;
  name: string;
  type: BuildingType;
  category: BuildingCategory;
  destinationRole?: DestinationType; // Exactly 6 primary functional destinations
  assetKey: string;
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
    residentOrPurpose?: string;
    milestoneIntroduced?: number;
    interactionTargetId?: string;
    amenities?: string[];
    tags?: string[];
  };
  rendering?: BuildingRenderingConfig;
}

export interface PropItem {
  id: string;
  type: PropType;
  assetKey?: string;
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

export interface TerrainFeature {
  id: string;
  name: string;
  type: 'hill' | 'ridge' | 'pond' | 'lagoon' | 'plaza-stone';
  coordinates: CanonicalCoordinates;
  radius: number;
  height?: number;
  color: string;
}

export interface DistrictItem {
  id: string;
  title: string;
  description: string;
  centerCoordinates: CanonicalCoordinates;
  colorTag: string;
}

export interface NPCEntity {
  id: string;
  name: string;
  role: string;
  coordinates: CanonicalCoordinates;
  rotationY: number;
  dialogue: string[];
  guidedDestination?: DestinationType;
  destinationHint?: DestinationType;
  visualTheme: {
    jacketColor: string;
    hatColor?: string;
    pantsColor?: string;
  };
}

export interface WorldDefinition {
  version: string;
  name: string;
  planetRadius: number; // for spherical projection
  flatWorldBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  districts: DistrictItem[];
  buildings: BuildingItem[];
  props: PropItem[];
  paths: PathSegment[];
  terrainFeatures: TerrainFeature[];
  npcs: NPCEntity[];
}
