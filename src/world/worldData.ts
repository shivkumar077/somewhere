import { WorldDefinition } from './types';

/**
 * THE CANONICAL WORLD DEFINITION
 *
 * This dataset is the single source of truth for the SOMEWHERE universe.
 * Both the rotating miniature planet (Milestone 01) and the future
 * walkable exploration town (Milestone 02) derive their buildings,
 * landmarks, props, and paths from here.
 */

export const CANONICAL_WORLD: WorldDefinition = {
  version: '1.0.0',
  name: 'Somewhere Village',
  planetRadius: 4.4, // standard radius for miniature sphere
  flatWorldBounds: {
    minX: -40,
    maxX: 40,
    minZ: -40,
    maxZ: 40,
  },
  buildings: [
    {
      id: 'building-town-hall',
      name: 'The Town Bell & Hall',
      type: 'town-hall',
      description: 'The civic heart of Somewhere, with a gentle clock and copper weathervane.',
      coordinates: { lat: 24, lon: 10, altitude: 0, flatX: 0, flatZ: 0 },
      rotationY: 15,
      scale: 1.15,
      visualTheme: {
        wallColor: '#f7efe1', // warm alabaster cream
        roofColor: '#d66d58', // warm terracotta coral
        trimColor: '#6c4a3b', // deep timber
        accentColor: '#e8a838', // brass clock
        windowGlowColor: '#ffdd80',
      },
      metadata: {
        storySnippet: 'Where the clock chimes softly on the hour and friendly notices are posted.',
        residentOrPurpose: 'Mayor & Town Archivist',
        milestoneIntroduced: 1,
        interactionTargetId: 'town-hall',
      },
    },
    {
      id: 'building-windmill',
      name: 'Whispering Hill Windmill',
      type: 'windmill',
      description: 'Perched upon a breezy knoll, milling grain for the village bakers.',
      coordinates: { lat: 42, lon: 115, altitude: 0.1, flatX: 18, flatZ: 14 },
      rotationY: -45,
      scale: 1.05,
      visualTheme: {
        wallColor: '#e9ecef', // chalk white
        roofColor: '#4f7d6a', // moss pine green
        trimColor: '#5c4033',
        accentColor: '#f4a261',
        windowGlowColor: '#ffe599',
      },
      metadata: {
        storySnippet: 'Its wooden blades turn gently, humming a quiet tune with the northern breeze.',
        residentOrPurpose: 'The Miller & Meadow Watcher',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-bakery',
      name: 'Cinnamon Hearth Bakery',
      type: 'bakery',
      description: 'Warm smells of cardamom buns and sourdough drift from the brick chimney.',
      coordinates: { lat: 12, lon: -42, altitude: 0, flatX: -12, flatZ: 8 },
      rotationY: 28,
      scale: 0.95,
      visualTheme: {
        wallColor: '#faedcd', // butter cream
        roofColor: '#bf573f', // toasted terracotta
        trimColor: '#784d34',
        accentColor: '#e9c46a',
        windowGlowColor: '#ffba49',
      },
      metadata: {
        storySnippet: 'Fresh warm loaves every morning before the sun clears the mist.',
        residentOrPurpose: 'Master Baker Pippin',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-observatory',
      name: 'Stargazer Dome',
      type: 'observatory',
      description: 'A round stone tower with an oxidized copper dome pointing toward celestial wonders.',
      coordinates: { lat: 52, lon: -115, altitude: 0.15, flatX: -20, flatZ: -16 },
      rotationY: 70,
      scale: 1.0,
      visualTheme: {
        wallColor: '#dedbd2', // weathered light stone
        roofColor: '#588157', // copper patina
        trimColor: '#3a5a40',
        accentColor: '#ffd166',
        windowGlowColor: '#80e5ff',
      },
      metadata: {
        storySnippet: 'Where nocturnal dreamers map the gentle constellations of the northern sky.',
        residentOrPurpose: 'Astronomer Celeste',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-cottage-garden',
      name: 'Rosebriar Cottage',
      type: 'cottage',
      description: 'A cozy timber cottage framed by flower boxes and rambling roses.',
      coordinates: { lat: -18, lon: 38, altitude: 0, flatX: 10, flatZ: -12 },
      rotationY: -110,
      scale: 0.9,
      visualTheme: {
        wallColor: '#fff1e6', // soft blush peach
        roofColor: '#6d597a', // dusty plum slate
        trimColor: '#355070',
        windowGlowColor: '#ffd89b',
      },
      metadata: {
        storySnippet: 'A kettle is almost always on the stove, waiting for guests.',
        residentOrPurpose: 'Flora the Botanist',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-cottage-creek',
      name: 'Cloverfold Cottage',
      type: 'cottage',
      description: 'Nestled beside the crystal pond with a mossy wooden water wheel.',
      coordinates: { lat: -26, lon: -62, altitude: 0, flatX: -14, flatZ: -18 },
      rotationY: 85,
      scale: 0.88,
      visualTheme: {
        wallColor: '#e8e8e4',
        roofColor: '#77878b', // blue-grey slate
        trimColor: '#4a4e69',
        windowGlowColor: '#ffeaa7',
      },
      metadata: {
        storySnippet: 'Home of the village cartographer and quiet dreamer.',
        residentOrPurpose: 'Milo the Mapmaker',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-greenhouse',
      name: 'Sunlit Orangery',
      type: 'greenhouse',
      description: 'A glass-framed conservatory protecting delicate moonflower ferns.',
      coordinates: { lat: -32, lon: 110, altitude: 0.05, flatX: 22, flatZ: -20 },
      rotationY: -40,
      scale: 0.92,
      visualTheme: {
        wallColor: '#fdf0d5',
        roofColor: '#8ecae6', // glass tint
        trimColor: '#2b580c',
        windowGlowColor: '#caffbf',
      },
      metadata: {
        storySnippet: 'Warm even during winter, filled with sweet jasmine fragrance.',
        residentOrPurpose: 'Horticulture Society',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-tea-house',
      name: 'Cloudcrest Tea Pavilion',
      type: 'tea-house',
      description: 'An open-air wooden gazebo overlooking the rolling miniature hills.',
      coordinates: { lat: 34, lon: -165, altitude: 0.08, flatX: -26, flatZ: 20 },
      rotationY: -15,
      scale: 0.88,
      visualTheme: {
        wallColor: '#d4a373', // natural pine timber
        roofColor: '#b56576', // soft blossom pink-rose
        trimColor: '#6f1d1b',
        windowGlowColor: '#ffe3a8',
      },
      metadata: {
        storySnippet: 'Serving steamed matcha and quiet moments of contemplation.',
        residentOrPurpose: 'Tea Master Ren',
        milestoneIntroduced: 1,
      },
    },
    {
      id: 'building-lighthouse',
      name: 'Beacon Lookout & Pier',
      type: 'lighthouse',
      description: 'A stout round beacon warning travelers of the tranquil lagoon reef.',
      coordinates: { lat: -48, lon: -12, altitude: 0.1, flatX: -4, flatZ: -28 },
      rotationY: 140,
      scale: 1.08,
      visualTheme: {
        wallColor: '#f8f9fa',
        roofColor: '#e63946', // storybook red stripes
        trimColor: '#1d3557',
        accentColor: '#f1faee',
        windowGlowColor: '#fff3b0',
      },
      metadata: {
        storySnippet: 'Guiding drifting fireflies and night sky voyagers safe home.',
        residentOrPurpose: 'Lighthouse Keeper Sam',
        milestoneIntroduced: 1,
      },
    },
  ],

  props: [
    // Trees around Town Hall
    { id: 'tree-th-1', type: 'tree-round', coordinates: { lat: 26, lon: 20, flatX: 3, flatZ: 2 }, rotationY: 10, scale: 1.0, color: '#7cb518' },
    { id: 'tree-th-2', type: 'tree-blossom', coordinates: { lat: 22, lon: 0, flatX: -3, flatZ: 2 }, rotationY: 45, scale: 0.95, color: '#f7a8b8' },
    { id: 'tree-th-3', type: 'tree-pine', coordinates: { lat: 18, lon: 22, flatX: 4, flatZ: -3 }, rotationY: 80, scale: 1.1, color: '#2d6a4f' },
    
    // Windmill Hill grove
    { id: 'tree-wm-1', type: 'tree-pine', coordinates: { lat: 46, lon: 105, flatX: 16, flatZ: 18 }, rotationY: 120, scale: 1.15, color: '#1b4332' },
    { id: 'tree-wm-2', type: 'tree-round', coordinates: { lat: 38, lon: 125, flatX: 22, flatZ: 12 }, rotationY: 200, scale: 0.85, color: '#95d5b2' },
    { id: 'tree-wm-3', type: 'tree-pine', coordinates: { lat: 45, lon: 128, flatX: 20, flatZ: 17 }, rotationY: 30, scale: 1.0, color: '#2d6a4f' },

    // Bakery orchard
    { id: 'tree-bk-1', type: 'tree-round', coordinates: { lat: 16, lon: -35, flatX: -10, flatZ: 12 }, rotationY: 90, scale: 1.05, color: '#52b788' },
    { id: 'tree-bk-2', type: 'tree-blossom', coordinates: { lat: 8, lon: -50, flatX: -15, flatZ: 5 }, rotationY: 15, scale: 0.9, color: '#ffb3c1' },

    // Observatory crags
    { id: 'tree-ob-1', type: 'tree-pine', coordinates: { lat: 56, lon: -105, flatX: -18, flatZ: -12 }, rotationY: 60, scale: 1.2, color: '#1b4332' },
    { id: 'tree-ob-2', type: 'tree-pine', coordinates: { lat: 48, lon: -128, flatX: -24, flatZ: -18 }, rotationY: 140, scale: 1.1, color: '#2d6a4f' },

    // Garden cottage surroundings
    { id: 'tree-cg-1', type: 'tree-blossom', coordinates: { lat: -14, lon: 46, flatX: 13, flatZ: -9 }, rotationY: 75, scale: 1.0, color: '#ffccd5' },
    { id: 'tree-cg-2', type: 'tree-round', coordinates: { lat: -22, lon: 30, flatX: 8, flatZ: -15 }, rotationY: 190, scale: 0.9, color: '#74c69d' },

    // Tea house bamboo/blossoms
    { id: 'tree-thp-1', type: 'tree-blossom', coordinates: { lat: 38, lon: -155, flatX: -24, flatZ: 24 }, rotationY: 33, scale: 1.05, color: '#ff758f' },
    { id: 'tree-thp-2', type: 'tree-round', coordinates: { lat: 30, lon: -175, flatX: -28, flatZ: 18 }, rotationY: 110, scale: 0.95, color: '#52b788' },

    // Lighthouse headland
    { id: 'tree-lh-1', type: 'tree-pine', coordinates: { lat: -42, lon: -20, flatX: -6, flatZ: -24 }, rotationY: 210, scale: 0.85, color: '#2d6a4f' },
    { id: 'tree-lh-2', type: 'tree-pine', coordinates: { lat: -52, lon: -4, flatX: -2, flatZ: -31 }, rotationY: 40, scale: 0.95, color: '#1b4332' },

    // Greenhouse arboretum
    { id: 'tree-gh-1', type: 'tree-round', coordinates: { lat: -36, lon: 100, flatX: 19, flatZ: -24 }, rotationY: 85, scale: 1.1, color: '#74c69d' },
    { id: 'tree-gh-2', type: 'tree-blossom', coordinates: { lat: -28, lon: 122, flatX: 25, flatZ: -16 }, rotationY: 165, scale: 0.9, color: '#f7a8b8' },

    // Scattered round trees on southern hemisphere to make all rotations charming
    { id: 'tree-south-1', type: 'tree-round', coordinates: { lat: -60, lon: 60, flatX: 15, flatZ: -35 }, rotationY: 45, scale: 0.95, color: '#52b788' },
    { id: 'tree-south-2', type: 'tree-pine', coordinates: { lat: -65, lon: 75, flatX: 18, flatZ: -38 }, rotationY: 130, scale: 1.05, color: '#2d6a4f' },
    { id: 'tree-south-3', type: 'tree-blossom', coordinates: { lat: -55, lon: -140, flatX: -20, flatZ: -34 }, rotationY: 80, scale: 0.9, color: '#ffb3c1' },
    { id: 'tree-south-4', type: 'tree-round', coordinates: { lat: -48, lon: -155, flatX: -24, flatZ: -30 }, rotationY: 220, scale: 1.0, color: '#7cb518' },

    // Street Lanterns (glow warm at evening/night!)
    { id: 'lantern-th-1', type: 'lantern', coordinates: { lat: 21, lon: 13, flatX: 1, flatZ: -2 }, rotationY: 0, scale: 0.8 },
    { id: 'lantern-th-2', type: 'lantern', coordinates: { lat: 21, lon: 6, flatX: -1, flatZ: -2 }, rotationY: 0, scale: 0.8 },
    { id: 'lantern-bk', type: 'lantern', coordinates: { lat: 10, lon: -38, flatX: -11, flatZ: 6 }, rotationY: 45, scale: 0.8 },
    { id: 'lantern-cg', type: 'lantern', coordinates: { lat: -16, lon: 34, flatX: 9, flatZ: -10 }, rotationY: 120, scale: 0.8 },
    { id: 'lantern-wm', type: 'lantern', coordinates: { lat: 39, lon: 110, flatX: 16, flatZ: 12 }, rotationY: -30, scale: 0.8 },
    { id: 'lantern-lh', type: 'lantern', coordinates: { lat: -45, lon: -15, flatX: -5, flatZ: -26 }, rotationY: 90, scale: 0.8 },

    // Benches
    { id: 'bench-th', type: 'bench', coordinates: { lat: 20, lon: 16, flatX: 2, flatZ: -3 }, rotationY: 40, scale: 0.85 },
    { id: 'bench-tea', type: 'bench', coordinates: { lat: 32, lon: -160, flatX: -23, flatZ: 17 }, rotationY: -10, scale: 0.85 },
    { id: 'bench-lake', type: 'bench', coordinates: { lat: -22, lon: -55, flatX: -11, flatZ: -15 }, rotationY: 110, scale: 0.85 },

    // Town Well in square
    { id: 'well-town', type: 'well', coordinates: { lat: 18, lon: 10, flatX: 0, flatZ: -3 }, rotationY: 0, scale: 0.9 },

    // Flower patches
    { id: 'flower-1', type: 'flower-patch', coordinates: { lat: 23, lon: 17, flatX: 2.5, flatZ: 1 }, rotationY: 20, color: '#f72585' },
    { id: 'flower-2', type: 'flower-patch', coordinates: { lat: 11, lon: -44, flatX: -13, flatZ: 7 }, rotationY: 65, color: '#ffd166' },
    { id: 'flower-3', type: 'flower-patch', coordinates: { lat: -17, lon: 41, flatX: 11, flatZ: -11 }, rotationY: 130, color: '#7209b7' },
    { id: 'flower-4', type: 'flower-patch', coordinates: { lat: 41, lon: 118, flatX: 19, flatZ: 13 }, rotationY: 0, color: '#4cc9f0' },
  ],

  paths: [
    {
      id: 'path-main-street',
      name: 'Cobblestone High Street',
      color: '#e2d4c0',
      width: 0.22,
      waypoints: [
        { lat: 18, lon: 10, flatX: 0, flatZ: -3 },
        { lat: 15, lon: -10, flatX: -3, flatZ: 1 },
        { lat: 13, lon: -30, flatX: -8, flatZ: 5 },
        { lat: 11, lon: -40, flatX: -11, flatZ: 7 },
      ],
    },
    {
      id: 'path-mill-trail',
      name: 'Windmill Ridge Path',
      color: '#ded1bd',
      width: 0.18,
      waypoints: [
        { lat: 22, lon: 18, flatX: 2, flatZ: 2 },
        { lat: 28, lon: 45, flatX: 7, flatZ: 5 },
        { lat: 34, lon: 80, flatX: 12, flatZ: 9 },
        { lat: 40, lon: 112, flatX: 17, flatZ: 13 },
      ],
    },
    {
      id: 'path-south-ramble',
      name: 'Blossom Way',
      color: '#e2d4c0',
      width: 0.18,
      waypoints: [
        { lat: 16, lon: 12, flatX: 1, flatZ: -4 },
        { lat: 5, lon: 22, flatX: 4, flatZ: -7 },
        { lat: -8, lon: 30, flatX: 7, flatZ: -10 },
        { lat: -16, lon: 36, flatX: 9, flatZ: -11 },
      ],
    },
    {
      id: 'path-lake-run',
      name: 'Cloverfold Trail',
      color: '#ded1bd',
      width: 0.18,
      waypoints: [
        { lat: 11, lon: -40, flatX: -11, flatZ: 7 },
        { lat: -2, lon: -48, flatX: -12, flatZ: -4 },
        { lat: -14, lon: -54, flatX: -13, flatZ: -11 },
        { lat: -24, lon: -60, flatX: -14, flatZ: -17 },
      ],
    },
  ],

  landmarks: [
    {
      id: 'landmark-town-square',
      title: 'The Sunlit Square',
      coordinates: { lat: 20, lon: 10, flatX: 0, flatZ: -2 },
      description: 'The cobblestone plaza where community gatherings and morning tea take place.',
    },
    {
      id: 'landmark-crystal-pond',
      title: 'Whispering Pond',
      coordinates: { lat: -20, lon: -55, flatX: -12, flatZ: -14 },
      description: 'Tranquil spring water reflecting the shifting clouds and evening stars.',
    },
    {
      id: 'landmark-star-ridge',
      title: 'Stargazer Ridge',
      coordinates: { lat: 50, lon: -110, flatX: -18, flatZ: -14 },
      description: 'The highest grassy knoll, closest to the wandering moon and comets.',
    },
  ],
};

