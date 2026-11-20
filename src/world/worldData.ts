import { WorldDefinition } from './types';

/**
 * THE CANONICAL WORLD MANIFEST — SOMEWHERE
 *
 * This dataset is the definitive single source of truth for the entire town.
 * Both the rotating miniature planet renderer (Milestone 01/02) and the future
 * walkable exploration town derive their buildings, districts, props,
 * roads, and terrain features from here.
 */

export const CANONICAL_WORLD: WorldDefinition = {
  version: '2.0.0',
  name: 'Somewhere Village',
  planetRadius: 4.4, // standard radius for miniature sphere
  flatWorldBounds: {
    minX: -45,
    maxX: 45,
    minZ: -45,
    maxZ: 45,
  },

  districts: [
    {
      id: 'district-town-square',
      title: 'Town Center & Market Plaza',
      description: 'The civic and commercial heart where cobblestone lanes meet around the central fountain.',
      centerCoordinates: { lat: 22, lon: 10, flatX: 0, flatZ: 0 },
      colorTag: '#d66d58',
    },
    {
      id: 'district-mill-meadows',
      title: 'Meadow Mill & Allotments',
      description: 'Sun-drenched grassy knolls with the village windmill, apple orchards, and vegetable plots.',
      centerCoordinates: { lat: 40, lon: 110, flatX: 20, flatZ: 15 },
      colorTag: '#4f7d6a',
    },
    {
      id: 'district-harbor-lagoon',
      title: 'Harbor & Azure Lagoon',
      description: 'Tranquil coastal headlands, boat piers, stone bridges, and the historic beacon lighthouse.',
      centerCoordinates: { lat: -40, lon: -10, flatX: -5, flatZ: -25 },
      colorTag: '#0ea5e9',
    },
    {
      id: 'district-stargazer-bluffs',
      title: 'Stargazer Bluffs & Tea Terraces',
      description: 'High crags and misty slopes home to the astronomical observatory, tea pavilion, and orangery.',
      centerCoordinates: { lat: 45, lon: -135, flatX: -22, flatZ: 10 },
      colorTag: '#7b2cbf',
    },
  ],

  buildings: [
    // --- DISTRICT 1: TOWN CENTER & MARKET PLAZA ---
    {
      id: 'building-town-hall',
      name: 'The Grand Town Hall & Clocktower',
      type: 'town-hall',
      category: 'civic',
      assetKey: 'mesh-town-hall-grand',
      description: 'The civic crown of Somewhere, featuring an arched portico, bell spire, and brass weathervane.',
      coordinates: { lat: 24, lon: 12, altitude: 0.02, flatX: 0, flatZ: 0 },
      rotationY: 15,
      scale: 1.2,
      visualTheme: {
        wallColor: '#f7efe1', // alabaster cream
        roofColor: '#d66d58', // warm terracotta coral
        trimColor: '#5c3a21', // deep timber
        accentColor: '#f4a261', // brass clock & finial
        windowGlowColor: '#ffe57f',
      },
      metadata: {
        storySnippet: 'Its warm chimes mark the rhythm of village days and joyful gatherings.',
        residentOrPurpose: 'Civic Archives & Mayor Ren',
        milestoneIntroduced: 1,
        interactionTargetId: 'town-hall',
        amenities: ['Town Bell', 'Public Notice Board', 'Clock Gallery'],
        tags: ['Civic', 'Landmark', 'Center'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-bakery',
      name: 'Cinnamon Hearth Bakery',
      type: 'bakery',
      category: 'commercial',
      assetKey: 'mesh-bakery-hearth',
      description: 'A cozy timber bakery where warm cardamom buns and sourdough loaves are baked fresh daily.',
      coordinates: { lat: 14, lon: -38, altitude: 0, flatX: -12, flatZ: 8 },
      rotationY: 30,
      scale: 0.98,
      visualTheme: {
        wallColor: '#faedcd', // butter cream
        roofColor: '#bf573f', // toasted terracotta
        trimColor: '#6f4e37',
        accentColor: '#e9c46a',
        windowGlowColor: '#ffba49',
      },
      metadata: {
        storySnippet: 'Sweet smoke curls into the morning breeze before the sun clears the ridge.',
        residentOrPurpose: 'Master Baker Pippin',
        milestoneIntroduced: 1,
        amenities: ['Wood Oven', 'Bread Stand', 'Pastry Window'],
        tags: ['Shop', 'Food', 'Cozy'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-weaver-house',
      name: "The Weaver's Guildhouse",
      type: 'weaver-house',
      category: 'residential',
      assetKey: 'mesh-weaver-house',
      description: 'A handsome timber-frame home with steep slate gables and woven botanical tapestries.',
      coordinates: { lat: 18, lon: -12, altitude: 0, flatX: -6, flatZ: 4 },
      rotationY: -10,
      scale: 0.95,
      visualTheme: {
        wallColor: '#f4ede2',
        roofColor: '#5c677d', // slate grey-blue
        trimColor: '#473322',
        accentColor: '#e76f51',
        windowGlowColor: '#ffe8a1',
      },
      metadata: {
        storySnippet: 'Loom shuttles click rhythmically weaving fine linens and story blankets.',
        residentOrPurpose: 'Lyra the Weaver',
        milestoneIntroduced: 2,
        amenities: ['Loom Workshop', 'Fabric Display'],
        tags: ['Craft', 'Artisan'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // --- DISTRICT 2: MEADOW MILL & ALLOTMENTS ---
    {
      id: 'building-windmill',
      name: 'Whispering Hill Windmill',
      type: 'windmill',
      category: 'agriculture',
      assetKey: 'mesh-windmill-hill',
      description: 'Perched upon a breezy knoll, with four rotating canvas blades grinding golden grain.',
      coordinates: { lat: 42, lon: 114, altitude: 0.12, flatX: 18, flatZ: 14 },
      rotationY: -45,
      scale: 1.08,
      visualTheme: {
        wallColor: '#e9ecef', // chalk white stone
        roofColor: '#4f7d6a', // moss pine green
        trimColor: '#4a3525',
        accentColor: '#f4a261',
        windowGlowColor: '#ffe599',
      },
      metadata: {
        storySnippet: 'The turning sails hum a gentle, hypnotic lullaby with every northern breeze.',
        residentOrPurpose: 'The Miller & Meadow Watcher',
        milestoneIntroduced: 1,
        amenities: ['Millstones', 'Flour Sacks', 'Weather Cock'],
        tags: ['Agriculture', 'Kinetic', 'Landmark'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-cottage-gardener',
      name: "The Herbalist's Cottage",
      type: 'cottage-gardener',
      category: 'residential',
      assetKey: 'mesh-cottage-gardener',
      description: 'A storybook timber cottage with floral window planters and drying lavender bundles.',
      coordinates: { lat: 32, lon: 92, altitude: 0.05, flatX: 14, flatZ: 6 },
      rotationY: 70,
      scale: 0.92,
      visualTheme: {
        wallColor: '#fff1e6', // blush peach
        roofColor: '#6d597a', // dusty plum slate
        trimColor: '#355070',
        windowGlowColor: '#ffd89b',
      },
      metadata: {
        storySnippet: 'Drying mint, chamomile, and elderberry infuse the parlor with soothing warmth.',
        residentOrPurpose: 'Botanist Flora',
        milestoneIntroduced: 2,
        amenities: ['Herb Garden', 'Potting Shed', 'Flower Trellis'],
        tags: ['Residential', 'Botanical'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // --- DISTRICT 3: HARBOR & AZURE LAGOON ---
    {
      id: 'building-lighthouse',
      name: 'Beacon Lookout & Pier',
      type: 'lighthouse',
      category: 'coastal',
      assetKey: 'mesh-lighthouse-beacon',
      description: 'A round stone tower with red and cream storybook bands and a warm pulsing beacon light.',
      coordinates: { lat: -48, lon: -12, altitude: 0.1, flatX: -4, flatZ: -28 },
      rotationY: 140,
      scale: 1.1,
      visualTheme: {
        wallColor: '#f8f9fa',
        roofColor: '#e63946', // storybook red band
        trimColor: '#1d3557', // navy trim
        accentColor: '#f1faee',
        windowGlowColor: '#fff3b0',
      },
      metadata: {
        storySnippet: 'Its beacon guides fireflies and nighttime voyagers safely past the reefs.',
        residentOrPurpose: 'Keeper Sam',
        milestoneIntroduced: 1,
        amenities: ['Beacon Lamp', 'Lookout Balcony', 'Signal Bell'],
        tags: ['Coastal', 'Light', 'Navigation'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-cottage-fisherman',
      name: "The Fisherman's Boathouse",
      type: 'cottage-fisherman',
      category: 'coastal',
      assetKey: 'mesh-cottage-fisherman',
      description: 'A weather-worn cedar cottage on timber stilts beside the calm turquoise lagoon.',
      coordinates: { lat: -28, lon: -56, altitude: 0.02, flatX: -14, flatZ: -16 },
      rotationY: 85,
      scale: 0.9,
      visualTheme: {
        wallColor: '#dedbd2',
        roofColor: '#52796f', // seafoam slate
        trimColor: '#2f3e46',
        windowGlowColor: '#ffeaa7',
      },
      metadata: {
        storySnippet: 'Cedar shingles silvered by lagoon spray, surrounded by nets and rowboat oars.',
        residentOrPurpose: 'Milo the Angler & Mapmaker',
        milestoneIntroduced: 2,
        amenities: ['Rowboat Pier', 'Fish Smokehouse', 'Net Racks'],
        tags: ['Coastal', 'Waterfront'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // --- DISTRICT 4: STARGAZER BLUFFS & TEA SANCTUARIES ---
    {
      id: 'building-observatory',
      name: 'Stargazer Dome & Observatory',
      type: 'observatory',
      category: 'landmark',
      assetKey: 'mesh-observatory-dome',
      description: 'A cylindrical stone tower crowned with an oxidized copper hemisphere and brass celestial telescope.',
      coordinates: { lat: 52, lon: -115, altitude: 0.16, flatX: -20, flatZ: -16 },
      rotationY: 70,
      scale: 1.05,
      visualTheme: {
        wallColor: '#dedbd2', // weathered light stone
        roofColor: '#588157', // copper patina
        trimColor: '#3a5a40',
        accentColor: '#ffd166',
        windowGlowColor: '#a0e7e5',
      },
      metadata: {
        storySnippet: 'Nightly charting the constellations and wandering comets of the northern sky.',
        residentOrPurpose: 'Astronomer Celeste',
        milestoneIntroduced: 1,
        amenities: ['Telescope', 'Star Charts', 'Astrolabe Terrace'],
        tags: ['Science', 'Sky', 'Night'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-tea-house',
      name: 'Cloudcrest Tea Pavilion',
      type: 'tea-house',
      category: 'commercial',
      assetKey: 'mesh-tea-pavilion',
      description: 'An open-air timber gazebo with curved tiered eaves overlooking misty mountain slopes.',
      coordinates: { lat: 34, lon: -164, altitude: 0.08, flatX: -26, flatZ: 20 },
      rotationY: -15,
      scale: 0.92,
      visualTheme: {
        wallColor: '#d4a373', // natural timber
        roofColor: '#b56576', // blossom rose
        trimColor: '#6f1d1b',
        windowGlowColor: '#ffe3a8',
      },
      metadata: {
        storySnippet: 'Warm matcha and quiet contemplation as evening mist rolls over the ridge.',
        residentOrPurpose: 'Tea Master Ren',
        milestoneIntroduced: 1,
        amenities: ['Tea Deck', 'Stone Hearth', 'Tatami Terrace'],
        tags: ['Peaceful', 'Scenic'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-greenhouse',
      name: 'Sunlit Botanical Orangery',
      type: 'greenhouse',
      category: 'landmark',
      assetKey: 'mesh-greenhouse-orangery',
      description: 'A light-filled solarium of arched timber frames and semi-opaque glass panes conserving rare flora.',
      coordinates: { lat: -32, lon: 110, altitude: 0.06, flatX: 22, flatZ: -20 },
      rotationY: -40,
      scale: 0.95,
      visualTheme: {
        wallColor: '#fdf0d5',
        roofColor: '#8ecae6', // glass tint
        trimColor: '#2b580c',
        windowGlowColor: '#caffbf',
      },
      metadata: {
        storySnippet: 'Hummingbirds and exotic night-blooming orchids thrive in its year-round spring warmth.',
        residentOrPurpose: 'Horticultural Conservatory',
        milestoneIntroduced: 1,
        amenities: ['Orchid Nursery', 'Fern Bench', 'Glass Solarium'],
        tags: ['Botanical', 'Glass', 'Lush'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
    {
      id: 'building-cottage-bookbinder',
      name: "The Scholar's Gable",
      type: 'cottage-bookbinder',
      category: 'residential',
      assetKey: 'mesh-cottage-bookbinder',
      description: 'A cozy two-story cottage with dormer windows, towering bookshelves, and leatherbound archives.',
      coordinates: { lat: -16, lon: 42, altitude: 0.03, flatX: 10, flatZ: -10 },
      rotationY: -115,
      scale: 0.92,
      visualTheme: {
        wallColor: '#fcf6bd',
        roofColor: '#b7b7a4', // slate shingle
        trimColor: '#4a4e69',
        windowGlowColor: '#ffd166',
      },
      metadata: {
        storySnippet: 'Home to the village chronicler who records memories and local folklore.',
        residentOrPurpose: 'Archivist Corin',
        milestoneIntroduced: 2,
        amenities: ['Library Dormer', 'Press Table', 'Ink Bench'],
        tags: ['Books', 'History'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
  ],

  terrainFeatures: [
    // Hills and Ridges
    { id: 'hill-windmill', name: 'Windmill Ridge', type: 'hill', coordinates: { lat: 43, lon: 112, flatX: 19, flatZ: 14 }, radius: 1.55, height: 0.42, color: '#8cb33e' },
    { id: 'hill-observatory', name: 'Stargazer Peak', type: 'ridge', coordinates: { lat: 54, lon: -112, flatX: -21, flatZ: -15 }, radius: 1.45, height: 0.38, color: '#7ba035' },
    { id: 'hill-tea-knoll', name: 'Cloudcrest Knoll', type: 'hill', coordinates: { lat: 32, lon: -162, flatX: -25, flatZ: 19 }, radius: 1.25, height: 0.3, color: '#8cb33e' },
    { id: 'hill-orangery', name: 'Fern Slope', type: 'hill', coordinates: { lat: -34, lon: 106, flatX: 21, flatZ: -22 }, radius: 1.35, height: 0.26, color: '#97be44' },
    { id: 'hill-south-pasture', name: 'South Orchard Pasture', type: 'hill', coordinates: { lat: -56, lon: 66, flatX: 16, flatZ: -36 }, radius: 1.6, height: 0.32, color: '#83a838' },
    { id: 'hill-east-bluff', name: 'Sunrise Bluff', type: 'hill', coordinates: { lat: 10, lon: 142, flatX: 28, flatZ: 6 }, radius: 1.35, height: 0.28, color: '#8cb33e' },

    // Water bodies
    { id: 'water-whispering-pond', name: 'Whispering Pond', type: 'pond', coordinates: { lat: -25, lon: -55, flatX: -13, flatZ: -16 }, radius: 1.2, color: '#38bdf8' },
    { id: 'water-beacon-lagoon', name: 'Azure Beacon Lagoon', type: 'lagoon', coordinates: { lat: -45, lon: -20, flatX: -6, flatZ: -26 }, radius: 1.1, color: '#0ea5e9' },
  ],

  paths: [
    // Connected Highway: High Street to Windmill
    {
      id: 'path-high-street',
      name: 'Cobblestone High Street',
      color: '#e2d4c0',
      width: 0.24,
      waypoints: [
        { lat: 21, lon: 12, flatX: 0, flatZ: -2 },
        { lat: 18, lon: -2, flatX: -2, flatZ: 1 },
        { lat: 16, lon: -20, flatX: -6, flatZ: 4 },
        { lat: 14, lon: -35, flatX: -11, flatZ: 7 },
      ],
    },
    // High Street to Windmill Ridge
    {
      id: 'path-windmill-ridge',
      name: 'Mill Ridge Walk',
      color: '#ded1bd',
      width: 0.2,
      waypoints: [
        { lat: 22, lon: 18, flatX: 2, flatZ: 2 },
        { lat: 26, lon: 44, flatX: 6, flatZ: 5 },
        { lat: 31, lon: 70, flatX: 10, flatZ: 8 },
        { lat: 36, lon: 92, flatX: 14, flatZ: 11 },
        { lat: 41, lon: 112, flatX: 18, flatZ: 14 },
      ],
    },
    // Town Square down to Harbor Pier
    {
      id: 'path-harbor-ramble',
      name: 'Harbor Descent',
      color: '#e2d4c0',
      width: 0.22,
      waypoints: [
        { lat: 19, lon: 10, flatX: 0, flatZ: -4 },
        { lat: 8, lon: 18, flatX: 3, flatZ: -9 },
        { lat: -4, lon: 24, flatX: 6, flatZ: -14 },
        { lat: -16, lon: 36, flatX: 9, flatZ: -18 },
        { lat: -32, lon: 15, flatX: 4, flatZ: -23 },
        { lat: -44, lon: -8, flatX: -2, flatZ: -27 },
      ],
    },
    // Lakeside Meadow Run to Angler's Pier
    {
      id: 'path-lake-run',
      name: 'Cloverfold Bank Trail',
      color: '#ded1bd',
      width: 0.18,
      waypoints: [
        { lat: 14, lon: -35, flatX: -11, flatZ: 7 },
        { lat: 2, lon: -44, flatX: -12, flatZ: -2 },
        { lat: -12, lon: -50, flatX: -13, flatZ: -9 },
        { lat: -25, lon: -54, flatX: -14, flatZ: -15 },
      ],
    },
    // Mountain Path up to Observatory
    {
      id: 'path-stargazer-ascent',
      name: 'Stargazer Switchback',
      color: '#d6c7b2',
      width: 0.18,
      waypoints: [
        { lat: 18, lon: -38, flatX: -12, flatZ: 9 },
        { lat: 28, lon: -62, flatX: -15, flatZ: -2 },
        { lat: 38, lon: -88, flatX: -18, flatZ: -9 },
        { lat: 50, lon: -112, flatX: -20, flatZ: -15 },
      ],
    },
  ],

  props: [
    // --- TOWN CENTER PLAZA ORNAMENTS ---
    { id: 'fountain-town', type: 'fountain', assetKey: 'prop-stone-fountain', coordinates: { lat: 20, lon: 10, flatX: 0, flatZ: -3 }, rotationY: 0, scale: 1.05 },
    { id: 'market-stall-1', type: 'market-stall', assetKey: 'prop-market-stall', coordinates: { lat: 22, lon: 4, flatX: -2, flatZ: -1 }, rotationY: -15, scale: 0.95, color: '#e76f51' },
    { id: 'market-stall-2', type: 'market-stall', assetKey: 'prop-market-stall', coordinates: { lat: 23, lon: 18, flatX: 2, flatZ: 0 }, rotationY: 25, scale: 0.95, color: '#2a9d8f' },
    { id: 'cart-plaza', type: 'cart', assetKey: 'prop-timber-cart', coordinates: { lat: 17, lon: 6, flatX: -1, flatZ: -5 }, rotationY: 55, scale: 0.88 },
    { id: 'bench-plaza-1', type: 'bench', assetKey: 'prop-bench', coordinates: { lat: 20, lon: 16, flatX: 2, flatZ: -3 }, rotationY: 45, scale: 0.85 },
    { id: 'bench-plaza-2', type: 'bench', assetKey: 'prop-bench', coordinates: { lat: 19, lon: 3, flatX: -2, flatZ: -3 }, rotationY: -45, scale: 0.85 },
    { id: 'lantern-plaza-1', type: 'lantern', assetKey: 'prop-lantern-iron', coordinates: { lat: 22, lon: 13, flatX: 1, flatZ: -1 }, rotationY: 0, scale: 0.85 },
    { id: 'lantern-plaza-2', type: 'lantern', assetKey: 'prop-lantern-iron', coordinates: { lat: 21, lon: 6, flatX: -1, flatZ: -2 }, rotationY: 0, scale: 0.85 },

    // --- BAKERY & WEAVER STREET DETAILS ---
    { id: 'lantern-bakery', type: 'lantern', assetKey: 'prop-lantern-iron', coordinates: { lat: 12, lon: -35, flatX: -10, flatZ: 7 }, rotationY: 45, scale: 0.82 },
    { id: 'barrel-bakery', type: 'barrel-stack', assetKey: 'prop-barrels', coordinates: { lat: 15, lon: -42, flatX: -13, flatZ: 9 }, rotationY: 20, scale: 0.85 },
    { id: 'flower-bakery', type: 'flower-patch', assetKey: 'prop-flower-patch', coordinates: { lat: 11, lon: -43, flatX: -13, flatZ: 6 }, rotationY: 60, color: '#f72585' },
    { id: 'tree-bakery-apple', type: 'tree-apple', assetKey: 'prop-tree-apple', coordinates: { lat: 16, lon: -32, flatX: -9, flatZ: 11 }, rotationY: 90, scale: 1.05, color: '#52b788' },

    // --- WINDMILL & MEADOW DETAILS ---
    { id: 'garden-plot-mill', type: 'garden-plot', assetKey: 'prop-garden-plot', coordinates: { lat: 35, lon: 98, flatX: 16, flatZ: 8 }, rotationY: 15, scale: 0.95 },
    { id: 'fence-mill-1', type: 'fence', assetKey: 'prop-timber-fence', coordinates: { lat: 38, lon: 104, flatX: 17, flatZ: 10 }, rotationY: 20, scale: 0.9 },
    { id: 'tree-mill-pine-1', type: 'tree-pine', assetKey: 'prop-tree-pine', coordinates: { lat: 46, lon: 104, flatX: 16, flatZ: 18 }, rotationY: 120, scale: 1.15, color: '#1b4332' },
    { id: 'tree-mill-pine-2', type: 'tree-pine', assetKey: 'prop-tree-pine', coordinates: { lat: 44, lon: 126, flatX: 20, flatZ: 16 }, rotationY: 30, scale: 1.0, color: '#2d6a4f' },
    { id: 'tree-mill-apple', type: 'tree-apple', assetKey: 'prop-tree-apple', coordinates: { lat: 36, lon: 124, flatX: 21, flatZ: 11 }, rotationY: 190, scale: 0.95, color: '#7cb518' },
    { id: 'lantern-windmill', type: 'lantern', assetKey: 'prop-lantern-iron', coordinates: { lat: 39, lon: 110, flatX: 17, flatZ: 13 }, rotationY: -30, scale: 0.85 },

    // --- HARBOR & LAGOON DETAILS ---
    { id: 'bridge-harbor', type: 'bridge', assetKey: 'prop-stone-bridge', coordinates: { lat: -36, lon: -15, flatX: -4, flatZ: -24 }, rotationY: 35, scale: 1.1 },
    { id: 'rowboat-lagoon', type: 'rowboat', assetKey: 'prop-rowboat', coordinates: { lat: -42, lon: -28, flatX: -8, flatZ: -26 }, rotationY: -65, scale: 0.85, color: '#7f5539' },
    { id: 'tree-willow-lagoon', type: 'tree-willow', assetKey: 'prop-tree-willow', coordinates: { lat: -27, lon: -48, flatX: -11, flatZ: -14 }, rotationY: 85, scale: 1.1, color: '#74c69d' },
    { id: 'barrel-harbor', type: 'barrel-stack', assetKey: 'prop-barrels', coordinates: { lat: -46, lon: -16, flatX: -5, flatZ: -28 }, rotationY: 110, scale: 0.9 },
    { id: 'lantern-lighthouse', type: 'lantern', assetKey: 'prop-lantern-iron', coordinates: { lat: -45, lon: -10, flatX: -3, flatZ: -26 }, rotationY: 90, scale: 0.85 },

    // --- STARGAZER BLUFFS & TEA DETAILS ---
    { id: 'tree-blossom-tea-1', type: 'tree-blossom', assetKey: 'prop-tree-blossom', coordinates: { lat: 38, lon: -154, flatX: -24, flatZ: 23 }, rotationY: 33, scale: 1.1, color: '#ff758f' },
    { id: 'tree-blossom-tea-2', type: 'tree-blossom', assetKey: 'prop-tree-blossom', coordinates: { lat: 30, lon: -172, flatX: -27, flatZ: 17 }, rotationY: 110, scale: 1.0, color: '#ffb3c1' },
    { id: 'bench-tea', type: 'bench', assetKey: 'prop-bench', coordinates: { lat: 32, lon: -158, flatX: -23, flatZ: 18 }, rotationY: -15, scale: 0.85 },
    { id: 'tree-observatory-pine', type: 'tree-pine', assetKey: 'prop-tree-pine', coordinates: { lat: 56, lon: -106, flatX: -18, flatZ: -12 }, rotationY: 60, scale: 1.25, color: '#1b4332' },
    { id: 'tree-observatory-pine-2', type: 'tree-pine', assetKey: 'prop-tree-pine', coordinates: { lat: 48, lon: -126, flatX: -24, flatZ: -18 }, rotationY: 140, scale: 1.15, color: '#2d6a4f' },

    // --- BOTANICAL GREENHOUSE DETAILS ---
    { id: 'tree-greenhouse-round', type: 'tree-round', assetKey: 'prop-tree-round', coordinates: { lat: -36, lon: 98, flatX: 19, flatZ: -24 }, rotationY: 85, scale: 1.1, color: '#74c69d' },
    { id: 'flower-greenhouse', type: 'flower-patch', assetKey: 'prop-flower-patch', coordinates: { lat: -28, lon: 118, flatX: 24, flatZ: -17 }, rotationY: 145, color: '#7209b7' },

    // --- SOUTHERN RIDGE FLOWER FIELDS ---
    { id: 'tree-south-blossom', type: 'tree-blossom', assetKey: 'prop-tree-blossom', coordinates: { lat: -58, lon: 58, flatX: 15, flatZ: -34 }, rotationY: 45, scale: 1.0, color: '#f7a8b8' },
    { id: 'tree-south-round', type: 'tree-round', assetKey: 'prop-tree-round', coordinates: { lat: -64, lon: 72, flatX: 18, flatZ: -37 }, rotationY: 130, scale: 1.05, color: '#52b788' },
  ],
};
