/**
 * SOFT PAINTERLY ANIME COLOR PALETTE
 * Inspired by 1980s-90s animated classics (Studio Ghibli, nostalgic countryside backgrounds,
 * watercolor and gouache illustrations).
 *
 * Strict constraint: Natural, warm, harmonious tones. No neon, plastic, or cyberpunk colors.
 */

export const ANIME_PALETTE = {
  // 1. Grassy Meadow & Hillside Greens
  grass: {
    sunlit: '#9dc257',      // Warm sunlit grass highlights
    meadow: '#7ca54c',      // Standard lush pasture green
    deepMeadow: '#5b823e',  // Mid-tone field green
    shadowGreen: '#3b5f36', // Ambient occlusion and valley shadow
    forestCanopy: '#2d4e32',// Deep canopy green
    mossStone: '#6e8554',   // Moss creeping on stone foundations
  },

  // 2. Foliage & Botanical Tones
  foliage: {
    leafLight: '#a3cc59',
    leafMid: '#69993e',
    leafDark: '#39602f',
    autumnGold: '#d99e32',
    blossomPink: '#f4b8c5',
    blossomApricot: '#f7cbac',
    willowPale: '#88b57b',
    flowerPoppy: '#c84b31',
    flowerCornflower: '#48729c',
    flowerButtercup: '#f2be3b',
    flowerLavender: '#9384b0',
  },

  // 3. Earth, Cobblestone, Wood & Stone
  earth: {
    cobbleLight: '#d1be9d', // Warm sunlit cobblestone
    cobbleMid: '#b09d7d',   // Main earthen street
    cobbleDark: '#857357',  // Cobblestone mortar & curb
    sandShore: '#eedcbd',   // Lagoon and pond shore sand
    timberLight: '#8a6042', // Sun-bleached wood beams
    timberWarm: '#68432a',  // Rich walnut/chestnut framing
    timberDark: '#442817',  // Shadowed eaves and joists
    fieldstone: '#968f84',  // Chiseled limestone foundations
    fieldstoneShadow: '#6e675d',
  },

  // 4. Roof Tiles & Chimney Clay
  roof: {
    terracottaWarm: '#c45e41', // Ghibli cottage clay tile
    terracottaSoft: '#d67558', // Sunlit ridge tile
    terracottaDeep: '#9c432d', // Shaded clay tile
    slateBlueGrey: '#4d5d68',  // Weathered academic/library slate
    slateDeep: '#36424a',
    copperVerdigris: '#529685',// Aged copper dome patina
    thatchStraw: '#c99f57',    // Rustic mill thatch
  },

  // 5. Walls & Half-Timbered Plaster
  wall: {
    creamPlaster: '#f7f2e4',   // Sunlit lime plaster
    warmIvory: '#eee5cb',      // Weathered cottage wall
    ochrePlaster: '#e5c992',   // Warm honey-tinted plaster
    rosePlaster: '#ebcfc4',    // Soft blush coastal plaster
    sagePlaster: '#cedbce',    // Herb cottage plaster
  },

  // 6. Water & Sky Reflections
  water: {
    lagoonSurface: '#499ca3',  // Muted turquoise lagoon
    lagoonShallow: '#68b5bb',  // Clear sandy shallows
    lagoonDeep: '#2c6870',     // Deep azure lake core
    foamRim: '#e8f7f5',        // Soft shoreline rim
  },

  // 7. Warm Sunlight & Night Glow
  lighting: {
    sunWarmth: '#fff6e0',      // Soft golden afternoon sunlight
    ambientSky: '#d8eaf5',      // Gentle atmospheric fill
    windowGlow: '#fed061',     // Warm paper lantern / candlelight
    lanternCore: '#ffe08a',    // Street lantern heart
  },
} as const;
