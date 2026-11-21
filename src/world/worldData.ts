import { WorldDefinition } from './types';
import { ANIME_PALETTE } from '../styles/painterlyPalette';

/**
 * THE CANONICAL WORLD MANIFEST — SOMEWHERE (v4.0.0)
 *
 * Soft Painterly Anime World Architecture
 *
 * CRITICAL ARCHITECTURAL CONTRACT:
 * Both the miniature planet overview and the close-up walkable world
 * consume this exact SAME canonical definition and the exact SAME 3D models.
 *
 * Target: 24 carefully composed buildings (6 primary functional destinations + 18 decorative structures)
 * arranged into 4 storybook countryside districts.
 */

export const CANONICAL_WORLD: WorldDefinition = {
  version: '4.0.0',
  name: 'Somewhere Countryside Village',
  planetRadius: 4.8, // calibrated radius for contoured miniature planet
  flatWorldBounds: {
    minX: -45,
    maxX: 45,
    minZ: -45,
    maxZ: 45,
  },

  districts: [
    {
      id: 'district-town-square',
      title: 'Town Center & Market Quarter',
      description: 'The civic and commercial heart where cobblestone lanes meet around the central stone fountain.',
      centerCoordinates: { lat: 20, lon: 0, flatX: 0, flatZ: 0 },
      colorTag: ANIME_PALETTE.roof.terracottaWarm,
    },
    {
      id: 'district-mill-meadows',
      title: 'Meadow Mill & Farmstead Allotments',
      description: 'Sun-drenched grassy knolls with the village windmill, miller house, apple orchards, and clover apiary.',
      centerCoordinates: { lat: 38, lon: 105, flatX: 20, flatZ: 15 },
      colorTag: ANIME_PALETTE.grass.meadow,
    },
    {
      id: 'district-harbor-lagoon',
      title: 'Harbor & Azure Lagoon',
      description: 'Tranquil coastal headlands, boat piers, stone bridges, fisherman boathouse, and the beacon lighthouse.',
      centerCoordinates: { lat: -38, lon: -12, flatX: -5, flatZ: -24 },
      colorTag: ANIME_PALETTE.water.lagoonSurface,
    },
    {
      id: 'district-stargazer-bluffs',
      title: 'Stargazer Bluffs & Tea Terraces',
      description: 'High crags and misty slopes home to the brass observatory, tea pavilion, and botanical greenhouse.',
      centerCoordinates: { lat: 42, lon: -130, flatX: -22, flatZ: 10 },
      colorTag: ANIME_PALETTE.foliage.flowerLavender,
    },
  ],

  buildings: [
    // =========================================================================
    // THE SIX PRIMARY FUNCTIONAL DESTINATIONS (Mandatory Portfolio Landmarks)
    // =========================================================================

    // 1. Little House — About Me
    {
      id: 'building-little-house',
      name: 'The Little House — About Me',
      type: 'little-house',
      category: 'residential',
      destinationRole: 'about',
      assetKey: 'mesh-little-house',
      description: 'A welcoming Ghibli-style cottage introducing Shiv Kumar, his personal background, passions, and engineering journey.',
      coordinates: { lat: 26, lon: 4, altitude: 0.05, flatX: 0, flatZ: 12 },
      rotationY: 180,
      scale: 1.05,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.warmIvory,
        roofColor: ANIME_PALETTE.roof.terracottaWarm,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.flowerPoppy,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Home to software engineer Shiv Kumar. Welcome inside!',
        residentOrPurpose: 'Shiv Kumar (About Me)',
        milestoneIntroduced: 3,
        interactionTargetId: 'about',
        amenities: ['Personal Journal', 'Philosophy Board', 'Reading Armchair', 'Geranium Flower Box'],
        tags: ['Primary Destination', 'About Me', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // 2. University — Education (Techno India University)
    {
      id: 'building-university',
      name: 'University Hall — Education',
      type: 'university',
      category: 'scholarly',
      destinationRole: 'education',
      assetKey: 'mesh-university',
      description: 'Techno India University — B.Tech Computer Science and Engineering, Specialization: Cloud Computing.',
      coordinates: { lat: 28, lon: -40, altitude: 0.06, flatX: -18, flatZ: -6 },
      rotationY: 85,
      scale: 1.15,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.creamPlaster,
        roofColor: ANIME_PALETTE.roof.slateBlueGrey,
        trimColor: ANIME_PALETTE.roof.copperVerdigris,
        accentColor: ANIME_PALETTE.earth.fieldstone,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Techno India University: Academic foundation in Computer Science & Cloud Computing.',
        residentOrPurpose: 'Academic Faculty & Research',
        milestoneIntroduced: 3,
        interactionTargetId: 'education',
        amenities: ['Lecture Auditorium', 'Cloud Computing Lab', 'Curriculum Archive'],
        tags: ['Primary Destination', 'Education', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // 3. Workshop — Experience (Practical Systems & Craft)
    {
      id: 'building-workshop',
      name: 'The Workshop — Practical Engineering',
      type: 'workshop',
      category: 'craft',
      destinationRole: 'experience',
      assetKey: 'mesh-workshop',
      description: 'Practical engineering experience: independent systems development, open source, and architectural craft.',
      coordinates: { lat: 24, lon: 82, altitude: 0.04, flatX: 16, flatZ: 6 },
      rotationY: -80,
      scale: 1.08,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.ochrePlaster,
        roofColor: ANIME_PALETTE.roof.terracottaDeep,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.earth.timberLight,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Where code is forged with care. Practical engineering, microservices, and telemetry.',
        residentOrPurpose: 'Master Tinkerer & Engineering Guild',
        milestoneIntroduced: 3,
        interactionTargetId: 'experience',
        amenities: ['Waterwheel Mechanism', 'Architecture Drafting Table', 'Build Pipeline Forge'],
        tags: ['Primary Destination', 'Experience', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // 4. Invention House — Projects (Shadow Exchange, ASTRA, Faultline, ForgeFit, VEENA)
    {
      id: 'building-invention-house',
      name: 'Invention House — Projects',
      type: 'invention-house',
      category: 'landmark',
      destinationRole: 'projects',
      assetKey: 'mesh-invention-house',
      description: 'Interactive showcase of 5 core projects: Shadow Exchange, ASTRA, Faultline, ForgeFit, and VEENA.',
      coordinates: { lat: 16, lon: 98, altitude: 0.05, flatX: 20, flatZ: -8 },
      rotationY: -110,
      scale: 1.12,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.warmIvory,
        roofColor: ANIME_PALETTE.foliage.leafMid,
        trimColor: ANIME_PALETTE.roof.copperVerdigris,
        accentColor: ANIME_PALETTE.foliage.autumnGold,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Discover 5 original engineering projects across P2P crypto, telemetry, chaos engineering, and audio DSP.',
        residentOrPurpose: 'Inventor Labs (Shiv Kumar Projects)',
        milestoneIntroduced: 3,
        interactionTargetId: 'projects',
        amenities: ['Project Display Pedestals', 'Telemetry Terminal', 'Audio Resonator'],
        tags: ['Primary Destination', 'Projects', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // 5. Library — Skills & Technical Knowledge
    {
      id: 'building-library',
      name: 'The Great Library — Skills & Knowledge',
      type: 'library',
      category: 'scholarly',
      destinationRole: 'skills',
      assetKey: 'mesh-library',
      description: 'A repository of technical capabilities: Cloud & Systems, WebGL & 3D, Backend Engineering, and Tooling.',
      coordinates: { lat: 34, lon: -15, altitude: 0.05, flatX: -8, flatZ: -16 },
      rotationY: 45,
      scale: 1.18,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.creamPlaster,
        roofColor: ANIME_PALETTE.roof.slateBlueGrey,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.flowerCornflower,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Centuries of systems wisdom, distributed patterns, and graphics engineering codices.',
        residentOrPurpose: 'Scholars & Systems Architects',
        milestoneIntroduced: 3,
        interactionTargetId: 'skills',
        amenities: ['Skill Matrix Codex', 'Architectural Blueprints', 'Reading Gallery'],
        tags: ['Primary Destination', 'Skills', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // 6. Post Office — Contact & Channels
    {
      id: 'building-post-office',
      name: 'The Post Office — Contact',
      type: 'post-office',
      category: 'civic',
      destinationRole: 'contact',
      assetKey: 'mesh-post-office',
      description: 'Get in touch with Shiv Kumar: Email, GitHub, LinkedIn, X, Instagram, and Résumé download.',
      coordinates: { lat: 14, lon: -14, altitude: 0.03, flatX: -10, flatZ: 8 },
      rotationY: 60,
      scale: 1.04,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.rosePlaster,
        roofColor: ANIME_PALETTE.roof.terracottaWarm,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.flowerPoppy,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Send a message across the ether! Direct email dispatch and networking connections.',
        residentOrPurpose: 'Postmistress Clara & Postal Network',
        milestoneIntroduced: 3,
        interactionTargetId: 'contact',
        amenities: ['Direct Mail Dispatch', 'GitHub Portal', 'LinkedIn Connection Board', 'X & Instagram Feeds', 'Résumé Postbox'],
        tags: ['Primary Destination', 'Contact', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // =========================================================================
    // 18 DECORATIVE SCENERY BUILDINGS (Creating an Inhabited, Charming World)
    // =========================================================================

    // 7. Town Hall (Town Center Civic Clocktower)
    {
      id: 'building-town-hall',
      name: 'Town Hall & Belltower',
      type: 'town-hall',
      category: 'civic',
      assetKey: 'mesh-town-hall',
      description: 'The civic gathering place with a three-tier belltower, arched portico, and municipal clock.',
      coordinates: { lat: 22, lon: -2, altitude: 0.04, flatX: -2, flatZ: -4 },
      rotationY: 0,
      scale: 1.2,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.creamPlaster,
        roofColor: ANIME_PALETTE.roof.slateBlueGrey,
        trimColor: ANIME_PALETTE.earth.fieldstone,
        accentColor: ANIME_PALETTE.roof.copperVerdigris,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Where village councils convene and the bell tolls at noon and dusk.',
        amenities: ['Chime Clock', 'Arched Arcade', 'Town Notice Board'],
        tags: ['Civic', 'Landmark', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 8. Rustic Windmill (Meadow Ridge)
    {
      id: 'building-windmill',
      name: 'Old Meadow Windmill',
      type: 'windmill',
      category: 'landmark',
      assetKey: 'mesh-windmill',
      description: 'A four-sailed timber and stone windmill grinding grain on the breezy meadow crest.',
      coordinates: { lat: 44, lon: 115, altitude: 0.12, flatX: 24, flatZ: 20 },
      rotationY: 205,
      scale: 1.15,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.fieldstone,
        roofColor: ANIME_PALETTE.roof.terracottaDeep,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.wall.creamPlaster,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'The turning sails hum softly in the afternoon breeze across the barley fields.',
        amenities: ['Turning Canvas Sails', 'Flour Sacks', 'Stone Base'],
        tags: ['Agriculture', 'Landmark', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 9. Village Bakery (Town Square)
    {
      id: 'building-bakery',
      name: 'Sunbeam Bakery',
      type: 'bakery',
      category: 'commercial',
      assetKey: 'mesh-bakery',
      description: 'Filled with the scent of crusty sourdough and morning brioche, featuring a brick oven chimney.',
      coordinates: { lat: 18, lon: 14, altitude: 0.03, flatX: 8, flatZ: 2 },
      rotationY: -70,
      scale: 1.0,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.ochrePlaster,
        roofColor: ANIME_PALETTE.roof.terracottaWarm,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.autumnGold,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Hot sourdough and apple tartlets fresh from the hearth every dawn.',
        amenities: ['Stone Bread Hearth', 'Display Windows', 'Flour Barrels'],
        tags: ['Commercial', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 10. Stargazer Observatory (High Bluffs)
    {
      id: 'building-observatory',
      name: 'Stargazer Observatory',
      type: 'observatory',
      category: 'landmark',
      assetKey: 'mesh-observatory',
      description: 'A domed celestial observatory perched atop the high limestone crags for nocturnal star charting.',
      coordinates: { lat: 46, lon: -138, altitude: 0.22, flatX: -26, flatZ: 14 },
      rotationY: 135,
      scale: 1.16,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.fieldstone,
        roofColor: ANIME_PALETTE.roof.copperVerdigris,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.lighting.lanternCore,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Mapping constellations and tracking passing comets over the sleeping village.',
        amenities: ['Refractor Telescope', 'Celestial Globes', 'Dome Aperture'],
        tags: ['Landmark', 'Scholarly', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 11. Gardener\'s Cottage (Allotment Meadows)
    {
      id: 'building-cottage-gardener',
      name: "Flora's Gardener Cottage",
      type: 'cottage-gardener',
      category: 'residential',
      assetKey: 'mesh-cottage-gardener',
      description: 'Half-timbered cottage surrounded by vegetable beds, climbing pea trellises, and sunflower borders.',
      coordinates: { lat: 36, lon: 92, altitude: 0.06, flatX: 15, flatZ: 14 },
      rotationY: 110,
      scale: 0.98,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.warmIvory,
        roofColor: ANIME_PALETTE.roof.thatchStraw,
        trimColor: ANIME_PALETTE.earth.timberLight,
        accentColor: ANIME_PALETTE.foliage.leafMid,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Home to the village botanist, tending heritage heirloom vegetables and sweet peas.',
        amenities: ['Raised Garden Beds', 'Watering Cans', 'Trellis Vines'],
        tags: ['Residential', 'Agriculture', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 12. Bookbinder's Cottage (Town Center)
    {
      id: 'building-cottage-bookbinder',
      name: "Old Tom's Bookbinder Cottage",
      type: 'cottage-bookbinder',
      category: 'craft',
      assetKey: 'mesh-cottage-bookbinder',
      description: 'Charming half-timbered craft dwelling with paper drying racks and leather tanning pots.',
      coordinates: { lat: 12, lon: 6, altitude: 0.03, flatX: 4, flatZ: 14 },
      rotationY: 195,
      scale: 0.95,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.creamPlaster,
        roofColor: ANIME_PALETTE.roof.slateBlueGrey,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.earth.timberDark,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Hand-sewing leather folios and binding ancient parchment scrolls.',
        amenities: ['Paper Press', 'Leather Stacks', 'Drying Frame'],
        tags: ['Craft', 'Residential', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 13. Fisherman's Boathouse (Harbor Lagoon)
    {
      id: 'building-cottage-fisherman',
      name: "Gull's Rest Boathouse",
      type: 'cottage-fisherman',
      category: 'coastal',
      assetKey: 'mesh-cottage-fisherman',
      description: 'Weathered cedar-shake stilted boathouse hovering above the tidal waters of Azure Lagoon.',
      coordinates: { lat: -32, lon: -6, altitude: 0.01, flatX: -2, flatZ: -20 },
      rotationY: -15,
      scale: 1.02,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.timberLight,
        roofColor: ANIME_PALETTE.roof.slateBlueGrey,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.water.lagoonSurface,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Tying fishing nets and mending oars while listening to the gentle lapping tide.',
        amenities: ['Mooring Cleats', 'Net Drying Racks', 'Lantern Post'],
        tags: ['Coastal', 'Residential', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 14. Botanical Greenhouse (Stargazer Bluffs)
    {
      id: 'building-greenhouse',
      name: 'Botanical Glasshouse',
      type: 'greenhouse',
      category: 'agriculture',
      assetKey: 'mesh-greenhouse',
      description: 'A curved iron-and-glass winter garden sheltering exotic potted citrus and fern varieties.',
      coordinates: { lat: 38, lon: -120, altitude: 0.15, flatX: -18, flatZ: 14 },
      rotationY: 100,
      scale: 1.05,
      visualTheme: {
        wallColor: ANIME_PALETTE.roof.copperVerdigris,
        roofColor: ANIME_PALETTE.water.lagoonShallow,
        trimColor: ANIME_PALETTE.earth.fieldstone,
        accentColor: ANIME_PALETTE.foliage.leafLight,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Warm and humid inside even on frosty autumn mornings, smelling of jasmine and damp soil.',
        amenities: ['Glass Roof Ribs', 'Seed Trays', 'Iron Stove'],
        tags: ['Agriculture', 'Sanctuary', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 15. Valley Tea House (Stargazer Terraces)
    {
      id: 'building-tea-house',
      name: 'Misty Valley Tea Pavilion',
      type: 'tea-house',
      category: 'sanctuary',
      assetKey: 'mesh-tea-house',
      description: 'Open-air cedar tea house with paper shoji partitions and a viewing deck overlooking the stream.',
      coordinates: { lat: 40, lon: -145, altitude: 0.18, flatX: -24, flatZ: 4 },
      rotationY: 70,
      scale: 1.08,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.timberLight,
        roofColor: ANIME_PALETTE.roof.slateDeep,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.foliage.blossomPink,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Sipping roasted green tea and watching clouds tumble across the western valley.',
        amenities: ['Tatami Hearth', 'Viewing Balcony', 'Paper Lanterns'],
        tags: ['Sanctuary', 'Landmark', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 16. Azure Beacon Lighthouse (Harbor Headland)
    {
      id: 'building-lighthouse',
      name: 'Azure Beacon Lighthouse',
      type: 'lighthouse',
      category: 'landmark',
      assetKey: 'mesh-lighthouse',
      description: 'Tapered stone beacon tower warning coastal sailors with its rotating lantern gallery.',
      coordinates: { lat: -44, lon: -20, altitude: 0.08, flatX: -8, flatZ: -28 },
      rotationY: 30,
      scale: 1.25,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.creamPlaster,
        roofColor: ANIME_PALETTE.roof.terracottaDeep,
        trimColor: ANIME_PALETTE.earth.fieldstone,
        accentColor: ANIME_PALETTE.lighting.lanternCore,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Guiding night voyagers across the misty bay with its faithful sweeping light.',
        amenities: ['Fresnel Lantern Room', 'Spiral Stairs', 'Fog Bell'],
        tags: ['Landmark', 'Coastal', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 17. Blacksmith's Forge (Craft Quarter)
    {
      id: 'building-blacksmith-workshop',
      name: "Vulcan's Blacksmith Forge",
      type: 'blacksmith-workshop',
      category: 'craft',
      assetKey: 'mesh-blacksmith-workshop',
      description: 'Heavy stone smithy with open glowing hearth, water trough, and ringing iron anvil.',
      coordinates: { lat: 20, lon: 70, altitude: 0.04, flatX: 12, flatZ: 2 },
      rotationY: -65,
      scale: 1.05,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.fieldstoneShadow,
        roofColor: ANIME_PALETTE.roof.slateDeep,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.roof.terracottaDeep,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Forging iron gate hinges, plowshares, and replacement mill gears.',
        amenities: ['Stone Forge', 'Bellows', 'Heavy Anvil'],
        tags: ['Craft', 'Commercial', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 18. Weaver's Guildhouse (Coastal Terrace)
    {
      id: 'building-weaver-house',
      name: "The Weaver's Guildhouse",
      type: 'weaver-house',
      category: 'craft',
      assetKey: 'mesh-weaver-house',
      description: 'Loom workshop with high clerestory windows, drying lines of indigo wool, and linen racks.',
      coordinates: { lat: -25, lon: -18, altitude: 0.03, flatX: -10, flatZ: -16 },
      rotationY: 25,
      scale: 1.0,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.rosePlaster,
        roofColor: ANIME_PALETTE.roof.terracottaSoft,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.flowerCornflower,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Spinning sheep wool and weaving soft throws on antique foot-treadle looms.',
        amenities: ['Treadle Loom', 'Dye Vats', 'Yarn Spools'],
        tags: ['Craft', 'Residential', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 19. Herbalist & Apothecary (Market Lane)
    {
      id: 'building-apothecary',
      name: 'Wild Thyme Apothecary',
      type: 'apothecary',
      category: 'commercial',
      assetKey: 'mesh-apothecary',
      description: 'Timber shopfront with overhanging second floor, bundles of dried lavender under the eaves, and ceramic elixir jars.',
      coordinates: { lat: 16, lon: -6, altitude: 0.03, flatX: -4, flatZ: 6 },
      rotationY: 40,
      scale: 0.98,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.sagePlaster,
        roofColor: ANIME_PALETTE.roof.terracottaWarm,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.foliage.leafMid,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Bottling elderberry syrup, chamomile balms, and wild mint tisanes.',
        amenities: ['Herb Drying Racks', 'Mortar & Pestle', 'Elixir Shelves'],
        tags: ['Commercial', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 20. Miller's House (Meadow Stream)
    {
      id: 'building-miller-house',
      name: "Miller's Half-Timber Cottage",
      type: 'miller-house',
      category: 'residential',
      assetKey: 'mesh-miller-house',
      description: 'Charming riverside home of the miller family, with stone chimney and flower garden overlooking the millrace.',
      coordinates: { lat: 40, lon: 125, altitude: 0.09, flatX: 22, flatZ: 10 },
      rotationY: 175,
      scale: 1.0,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.creamPlaster,
        roofColor: ANIME_PALETTE.roof.thatchStraw,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.flowerButtercup,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Watching the stream turn the wheel while baking rye biscuits by the hearth.',
        amenities: ['Riverside Porch', 'Flour Sack Platform', 'Herb Pots'],
        tags: ['Residential', 'Agriculture', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 21. Meadow Hayloft Barn (Farm Allotments)
    {
      id: 'building-barn-hayloft',
      name: 'Timber Hayloft Barn',
      type: 'barn-hayloft',
      category: 'agriculture',
      assetKey: 'mesh-barn-hayloft',
      description: 'Spacious rustic barn with curved timber roof beams, hay pulley hoist, and field equipment lean-to.',
      coordinates: { lat: 48, lon: 100, altitude: 0.11, flatX: 18, flatZ: 25 },
      rotationY: -45,
      scale: 1.12,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.timberWarm,
        roofColor: ANIME_PALETTE.roof.terracottaDeep,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.roof.thatchStraw,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Sheltering fragrant summer timothy hay and resting draught horses.',
        amenities: ['Hay Pulley', 'Tack Room', 'Double Barn Doors'],
        tags: ['Agriculture', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 22. Orchard Cider Press (Apple Grove)
    {
      id: 'building-cider-shed',
      name: 'Orchard Cider Press Shed',
      type: 'cider-shed',
      category: 'agriculture',
      assetKey: 'mesh-cider-shed',
      description: 'Open-sided timber shed surrounded by sweet apple trees, housing the oak press and barrel racks.',
      coordinates: { lat: 32, lon: 75, altitude: 0.05, flatX: 13, flatZ: 20 },
      rotationY: 130,
      scale: 0.92,
      visualTheme: {
        wallColor: ANIME_PALETTE.earth.timberLight,
        roofColor: ANIME_PALETTE.roof.terracottaSoft,
        trimColor: ANIME_PALETTE.earth.timberDark,
        accentColor: ANIME_PALETTE.foliage.autumnGold,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Pressing sweet autumn russets and honeycrisps into cloudy golden cider.',
        amenities: ['Oak Screw Press', 'Cider Barrels', 'Fruit Crates'],
        tags: ['Agriculture', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 23. Clover Apiary Shelter (Meadow Slope)
    {
      id: 'building-apiary-cottage',
      name: 'Honeybee Apiary Cottage',
      type: 'apiary-cottage',
      category: 'agriculture',
      assetKey: 'mesh-apiary-cottage',
      description: 'Small cedar cottage surrounded by straw bee skeps, lavender beds, and buzzing clover.',
      coordinates: { lat: 42, lon: 85, altitude: 0.08, flatX: 14, flatZ: 26 },
      rotationY: -100,
      scale: 0.88,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.ochrePlaster,
        roofColor: ANIME_PALETTE.roof.thatchStraw,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.foliage.flowerButtercup,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Bottling wild clover honey and molding fragrant beeswax tapers.',
        amenities: ['Bee Skeps', 'Smoker Kit', 'Honey Jars'],
        tags: ['Agriculture', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },

    // 24. Lagoon Pier Pavilion (Harbor Promenade)
    {
      id: 'building-pier-pavilion',
      name: 'Lagoon Pier Pavilion',
      type: 'pier-pavilion',
      category: 'coastal',
      assetKey: 'mesh-pier-pavilion',
      description: 'Open hexagonal cedar gazebo resting on stone pilings at the water\'s edge, ideal for watching sunset ripples.',
      coordinates: { lat: -28, lon: -2, altitude: 0.02, flatX: 2, flatZ: -22 },
      rotationY: 45,
      scale: 1.04,
      visualTheme: {
        wallColor: ANIME_PALETTE.wall.warmIvory,
        roofColor: ANIME_PALETTE.roof.copperVerdigris,
        trimColor: ANIME_PALETTE.earth.timberWarm,
        accentColor: ANIME_PALETTE.water.lagoonSurface,
        windowGlowColor: ANIME_PALETTE.lighting.windowGlow,
      },
      metadata: {
        storySnippet: 'Listening to waves gently splash against the pilings under the twilight sky.',
        amenities: ['Benches', 'Mooring Cleats', 'Brass Bell'],
        tags: ['Coastal', 'Landmark', 'Scenery'],
      },
      rendering: { lodLevel: 'high', castShadow: true, receiveShadow: true, hasWindowGlow: true },
    },
  ],

  npcs: [
    {
      id: 'npc-barnaby',
      name: 'Barnaby the Elder',
      role: 'Town Elder & Historian',
      coordinates: { lat: 20, lon: 2, altitude: 0.04, flatX: 1.2, flatZ: 2.2 },
      rotationY: 160,
      dialogue: [
        'Welcome, traveler! You stand in our village square.',
        'This town was built by engineer Shiv Kumar to share his craft with wanderers from afar.',
        'Down the road sits The Little House where you can learn about Shiv himself. Or visit the University on the western rise!',
      ],
      destinationHint: 'about',
      visualTheme: {
        jacketColor: '#5c7a52',
        hatColor: '#8a6042',
        pantsColor: '#442817',
      },
    },
    {
      id: 'npc-timothy',
      name: 'Timothy the Scholar',
      role: 'Head Academic Guide',
      coordinates: { lat: 27, lon: -35, altitude: 0.06, flatX: -14, flatZ: -4 },
      rotationY: 80,
      dialogue: [
        'Greetings! If you seek knowledge of Shiv\'s academic journey, University Hall is just behind me.',
        'He completed his B.Tech in Computer Science with a specialization in Cloud Computing at Techno India University.',
        'Beyond the rise lies the Great Library, chronicling all his skills in WebGL, systems architecture, and backend engineering!',
      ],
      destinationHint: 'education',
      visualTheme: {
        jacketColor: '#4d5d68',
        hatColor: '#36424a',
        pantsColor: '#2b363d',
      },
    },
    {
      id: 'npc-maeve',
      name: 'Maeve the Crafter',
      role: 'Master of the Workshop',
      coordinates: { lat: 23, lon: 75, altitude: 0.04, flatX: 13, flatZ: 5 },
      rotationY: -75,
      dialogue: [
        'Hear that waterwheel spinning? That is Shiv\'s Workshop where real software is crafted.',
        'No corporate fluff or fabricated titles here — only pure systems engineering, open source contributions, and deep craft.',
        'And just down the lane is the Invention House, housing 5 verified software projects!',
      ],
      destinationHint: 'experience',
      visualTheme: {
        jacketColor: '#c45e41',
        hatColor: '#d67558',
        pantsColor: '#68432a',
      },
    },
    {
      id: 'npc-pip',
      name: 'Pip the Inventor',
      role: 'Tinkerer & Project Enthusiast',
      coordinates: { lat: 17, lon: 92, altitude: 0.05, flatX: 17, flatZ: -6 },
      rotationY: -120,
      dialogue: [
        'Aha! You made it to the Invention House!',
        'Inside you will find Shadow Exchange, ASTRA, Faultline, ForgeFit, and VEENA.',
        'Every single project has live source code you can inspect on GitHub!',
      ],
      destinationHint: 'projects',
      visualTheme: {
        jacketColor: '#d99e32',
        hatColor: '#499ca3',
        pantsColor: '#39602f',
      },
    },
    {
      id: 'npc-clara',
      name: 'Clara the Postmistress',
      role: 'Chief Courier',
      coordinates: { lat: 15, lon: -10, altitude: 0.03, flatX: -7, flatZ: 6 },
      rotationY: 55,
      dialogue: [
        'Letters, dispatches, and electronic pigeon notes!',
        'Step into the Post Office anytime to send Shiv an email at shivkumar6990655@gmail.com.',
        'You can also find his GitHub, LinkedIn, and grab a copy of his verified résumé!',
      ],
      destinationHint: 'contact',
      visualTheme: {
        jacketColor: '#c84b31',
        hatColor: '#f7f2e4',
        pantsColor: '#48729c',
      },
    },
  ],

  terrainFeatures: [
    {
      id: 'terrain-town-hill',
      type: 'hill',
      name: 'Town Center Gentle Rise',
      coordinates: { lat: 20, lon: 0, altitude: 0, flatX: 0, flatZ: 0 },
      radius: 2.2,
      height: 0.2,
      color: ANIME_PALETTE.grass.meadow,
    },
    {
      id: 'terrain-windmill-ridge',
      type: 'ridge',
      name: 'Windmill Ridge',
      coordinates: { lat: 42, lon: 110, altitude: 0, flatX: 20, flatZ: 15 },
      radius: 2.8,
      height: 0.55,
      color: ANIME_PALETTE.grass.sunlit,
    },
    {
      id: 'terrain-stargazer-peak',
      type: 'hill',
      name: 'Stargazer Peak',
      coordinates: { lat: 46, lon: -135, altitude: 0, flatX: -22, flatZ: 10 },
      radius: 2.5,
      height: 0.65,
      color: ANIME_PALETTE.earth.fieldstone,
    },
    {
      id: 'terrain-cloudcrest-knoll',
      type: 'hill',
      name: 'Cloudcrest Knoll',
      coordinates: { lat: -25, lon: 60, altitude: 0, flatX: 18, flatZ: -18 },
      radius: 2.2,
      height: 0.35,
      color: ANIME_PALETTE.grass.deepMeadow,
    },
    {
      id: 'terrain-fern-slope',
      type: 'hill',
      name: 'Fern Slope',
      coordinates: { lat: 5, lon: -80, altitude: 0, flatX: -25, flatZ: -8 },
      radius: 2.1,
      height: 0.3,
      color: ANIME_PALETTE.grass.forestCanopy,
    },
    {
      id: 'terrain-sunrise-bluff',
      type: 'ridge',
      name: 'Sunrise Bluff',
      coordinates: { lat: 55, lon: -10, altitude: 0, flatX: 0, flatZ: 30 },
      radius: 2.4,
      height: 0.45,
      color: ANIME_PALETTE.grass.sunlit,
    },
    {
      id: 'terrain-whispering-pond',
      type: 'pond',
      name: 'Whispering Pond',
      coordinates: { lat: 30, lon: 35, altitude: 0, flatX: 8, flatZ: -12 },
      radius: 1.4,
      height: 0.05,
      color: ANIME_PALETTE.water.lagoonShallow,
    },
    {
      id: 'terrain-azure-lagoon',
      type: 'lagoon',
      name: 'Azure Lagoon',
      coordinates: { lat: -38, lon: -10, altitude: 0, flatX: -5, flatZ: -25 },
      radius: 2.4,
      height: 0.08,
      color: ANIME_PALETTE.water.lagoonSurface,
    },
  ],

  paths: [
    {
      id: 'path-high-street',
      name: 'Civic High Street',
      color: ANIME_PALETTE.earth.cobbleMid,
      width: 0.38,
      waypoints: [
        { lat: 10, lon: 0, flatX: 0, flatZ: 14 },
        { lat: 18, lon: 0, flatX: 0, flatZ: 6 },
        { lat: 24, lon: 0, flatX: 0, flatZ: -2 },
        { lat: 32, lon: -10, flatX: -6, flatZ: -12 },
      ],
    },
    {
      id: 'path-academic-walk',
      name: 'Scholar\'s Way',
      color: ANIME_PALETTE.earth.cobbleLight,
      width: 0.32,
      waypoints: [
        { lat: 20, lon: 0, flatX: 0, flatZ: 2 },
        { lat: 24, lon: -20, flatX: -10, flatZ: -2 },
        { lat: 28, lon: -40, flatX: -18, flatZ: -6 },
        { lat: 34, lon: -15, flatX: -8, flatZ: -16 },
      ],
    },
    {
      id: 'path-craftsmans-trail',
      name: 'Craftsman\'s Riverside Way',
      color: ANIME_PALETTE.earth.cobbleMid,
      width: 0.34,
      waypoints: [
        { lat: 20, lon: 0, flatX: 0, flatZ: 2 },
        { lat: 22, lon: 40, flatX: 8, flatZ: 4 },
        { lat: 24, lon: 80, flatX: 16, flatZ: 6 },
        { lat: 18, lon: 100, flatX: 20, flatZ: -8 },
      ],
    },
    {
      id: 'path-meadow-lane',
      name: 'Windmill Meadow Lane',
      color: ANIME_PALETTE.earth.cobbleDark,
      width: 0.3,
      waypoints: [
        { lat: 24, lon: 80, flatX: 16, flatZ: 6 },
        { lat: 34, lon: 95, flatX: 18, flatZ: 14 },
        { lat: 42, lon: 110, flatX: 22, flatZ: 18 },
      ],
    },
    {
      id: 'path-harbor-descent',
      name: 'Lagoon Harbor Path',
      color: ANIME_PALETTE.earth.cobbleMid,
      width: 0.32,
      waypoints: [
        { lat: 16, lon: -10, flatX: -6, flatZ: 6 },
        { lat: -10, lon: -12, flatX: -6, flatZ: -10 },
        { lat: -26, lon: -10, flatX: -4, flatZ: -18 },
        { lat: -36, lon: -8, flatX: -4, flatZ: -24 },
      ],
    },
  ],

  props: [
    // 1. Town Square Centerpiece: Stone Fountain
    {
      id: 'prop-town-fountain',
      type: 'fountain',
      coordinates: { lat: 20, lon: 0, altitude: 0.04, flatX: 0, flatZ: 0 },
      rotationY: 0,
      scale: 1.15,
      color: ANIME_PALETTE.earth.fieldstone,
      secondaryColor: ANIME_PALETTE.water.lagoonShallow,
    },

    // 2. Village Well by Little House
    {
      id: 'prop-village-well',
      type: 'well',
      coordinates: { lat: 28, lon: 12, altitude: 0.04, flatX: 5, flatZ: 12 },
      rotationY: 45,
      scale: 0.95,
      color: ANIME_PALETTE.earth.fieldstone,
      secondaryColor: ANIME_PALETTE.earth.timberWarm,
    },

    // 3. Stone Bridge across River
    {
      id: 'prop-river-bridge',
      type: 'bridge',
      coordinates: { lat: 26, lon: 45, altitude: 0.03, flatX: 10, flatZ: 8 },
      rotationY: 85,
      scale: 1.1,
      color: ANIME_PALETTE.earth.fieldstone,
      secondaryColor: ANIME_PALETTE.earth.cobbleLight,
    },

    // 4. Harbor Stone Bridge
    {
      id: 'prop-harbor-bridge',
      type: 'bridge',
      coordinates: { lat: -22, lon: -8, altitude: 0.02, flatX: -3, flatZ: -14 },
      rotationY: 15,
      scale: 1.05,
      color: ANIME_PALETTE.earth.fieldstone,
      secondaryColor: ANIME_PALETTE.earth.cobbleLight,
    },

    // 5. Market Stalls in Town Square
    {
      id: 'prop-market-produce',
      type: 'market-stall',
      coordinates: { lat: 22, lon: 10, altitude: 0.03, flatX: 4, flatZ: -2 },
      rotationY: -45,
      scale: 0.95,
      color: ANIME_PALETTE.roof.terracottaWarm,
      secondaryColor: ANIME_PALETTE.foliage.autumnGold,
    },
    {
      id: 'prop-market-pottery',
      type: 'market-stall',
      coordinates: { lat: 18, lon: -8, altitude: 0.03, flatX: -3, flatZ: 3 },
      rotationY: 35,
      scale: 0.95,
      color: ANIME_PALETTE.water.lagoonSurface,
      secondaryColor: ANIME_PALETTE.wall.creamPlaster,
    },

    // 6. Timber Carts
    {
      id: 'prop-timber-cart-mill',
      type: 'cart',
      coordinates: { lat: 38, lon: 100, altitude: 0.08, flatX: 16, flatZ: 16 },
      rotationY: 60,
      scale: 0.9,
      color: ANIME_PALETTE.earth.timberWarm,
    },
    {
      id: 'prop-timber-cart-post',
      type: 'cart',
      coordinates: { lat: 12, lon: -16, altitude: 0.03, flatX: -8, flatZ: 10 },
      rotationY: -30,
      scale: 0.85,
      color: ANIME_PALETTE.earth.timberLight,
    },

    // 7. Coastal Rowboats
    {
      id: 'prop-rowboat-lagoon-1',
      type: 'rowboat',
      coordinates: { lat: -35, lon: -4, altitude: 0.01, flatX: -1, flatZ: -23 },
      rotationY: 45,
      scale: 0.95,
      color: ANIME_PALETTE.earth.timberWarm,
    },
    {
      id: 'prop-rowboat-lagoon-2',
      type: 'rowboat',
      coordinates: { lat: -40, lon: -14, altitude: 0.01, flatX: -6, flatZ: -26 },
      rotationY: -20,
      scale: 0.9,
      color: ANIME_PALETTE.water.lagoonDeep,
    },

    // 8. Park Benches
    {
      id: 'prop-bench-square-1',
      type: 'bench',
      coordinates: { lat: 21, lon: -4, altitude: 0.03, flatX: -2, flatZ: 1 },
      rotationY: 90,
      scale: 0.9,
      color: ANIME_PALETTE.earth.timberDark,
    },
    {
      id: 'prop-bench-square-2',
      type: 'bench',
      coordinates: { lat: 19, lon: 4, altitude: 0.03, flatX: 2, flatZ: -1 },
      rotationY: -90,
      scale: 0.9,
      color: ANIME_PALETTE.earth.timberDark,
    },
    {
      id: 'prop-bench-pond',
      type: 'bench',
      coordinates: { lat: 32, lon: 30, altitude: 0.03, flatX: 6, flatZ: -14 },
      rotationY: 135,
      scale: 0.9,
      color: ANIME_PALETTE.earth.timberWarm,
    },

    // 9. Street Lanterns
    {
      id: 'prop-lantern-sq-1',
      type: 'lantern',
      coordinates: { lat: 17, lon: 1, altitude: 0.03, flatX: 1, flatZ: 4 },
      rotationY: 0,
      scale: 1.0,
      color: ANIME_PALETTE.earth.timberDark,
    },
    {
      id: 'prop-lantern-sq-2',
      type: 'lantern',
      coordinates: { lat: 23, lon: -1, altitude: 0.03, flatX: -1, flatZ: -4 },
      rotationY: 180,
      scale: 1.0,
      color: ANIME_PALETTE.earth.timberDark,
    },
    {
      id: 'prop-lantern-house',
      type: 'lantern',
      coordinates: { lat: 24, lon: 5, altitude: 0.04, flatX: 2, flatZ: 10 },
      rotationY: 45,
      scale: 1.0,
      color: ANIME_PALETTE.earth.timberDark,
    },
    {
      id: 'prop-lantern-library',
      type: 'lantern',
      coordinates: { lat: 32, lon: -12, altitude: 0.04, flatX: -6, flatZ: -14 },
      rotationY: -45,
      scale: 1.0,
      color: ANIME_PALETTE.earth.timberDark,
    },
    {
      id: 'prop-lantern-workshop',
      type: 'lantern',
      coordinates: { lat: 22, lon: 78, altitude: 0.04, flatX: 14, flatZ: 4 },
      rotationY: 70,
      scale: 1.0,
      color: ANIME_PALETTE.earth.timberDark,
    },

    // 10. Flower Patches & Botanical Gardens
    {
      id: 'prop-flower-patch-house',
      type: 'flower-patch',
      coordinates: { lat: 25, lon: 1, altitude: 0.04, flatX: -2, flatZ: 11 },
      rotationY: 20,
      scale: 1.1,
      color: ANIME_PALETTE.foliage.flowerPoppy,
      secondaryColor: ANIME_PALETTE.foliage.flowerButtercup,
    },
    {
      id: 'prop-flower-patch-square',
      type: 'flower-patch',
      coordinates: { lat: 22, lon: 5, altitude: 0.03, flatX: 3, flatZ: 1 },
      rotationY: -40,
      scale: 1.05,
      color: ANIME_PALETTE.foliage.flowerCornflower,
      secondaryColor: ANIME_PALETTE.foliage.flowerLavender,
    },
    {
      id: 'prop-flower-patch-pond',
      type: 'flower-patch',
      coordinates: { lat: 28, lon: 36, altitude: 0.02, flatX: 7, flatZ: -10 },
      rotationY: 60,
      scale: 1.2,
      color: ANIME_PALETTE.foliage.flowerLavender,
      secondaryColor: ANIME_PALETTE.foliage.blossomPink,
    },
    {
      id: 'prop-flower-patch-tea',
      type: 'flower-patch',
      coordinates: { lat: 38, lon: -142, altitude: 0.16, flatX: -22, flatZ: 2 },
      rotationY: -15,
      scale: 1.1,
      color: ANIME_PALETTE.foliage.blossomPink,
      secondaryColor: ANIME_PALETTE.foliage.blossomApricot,
    },

    // 11. Soft Layered Anime Trees
    // Round Leafy Trees
    {
      id: 'prop-tree-square-north',
      type: 'tree-round',
      coordinates: { lat: 28, lon: -2, altitude: 0.04, flatX: -2, flatZ: 2 },
      rotationY: 25,
      scale: 1.15,
      color: ANIME_PALETTE.grass.sunlit,
    },
    {
      id: 'prop-tree-house-east',
      type: 'tree-round',
      coordinates: { lat: 27, lon: 8, altitude: 0.04, flatX: 3, flatZ: 14 },
      rotationY: 110,
      scale: 1.2,
      color: ANIME_PALETTE.grass.meadow,
    },
    {
      id: 'prop-tree-post-west',
      type: 'tree-round',
      coordinates: { lat: 13, lon: -18, altitude: 0.03, flatX: -12, flatZ: 6 },
      rotationY: 45,
      scale: 1.08,
      color: ANIME_PALETTE.grass.deepMeadow,
    },
    {
      id: 'prop-tree-univ-forecourt',
      type: 'tree-round',
      coordinates: { lat: 26, lon: -32, altitude: 0.05, flatX: -14, flatZ: -8 },
      rotationY: 160,
      scale: 1.25,
      color: ANIME_PALETTE.grass.sunlit,
    },

    // Apple Trees (Meadows & Orchard)
    {
      id: 'prop-tree-apple-1',
      type: 'tree-apple',
      coordinates: { lat: 34, lon: 70, altitude: 0.05, flatX: 12, flatZ: 18 },
      rotationY: 30,
      scale: 1.05,
      color: ANIME_PALETTE.grass.meadow,
      secondaryColor: ANIME_PALETTE.foliage.flowerPoppy,
    },
    {
      id: 'prop-tree-apple-2',
      type: 'tree-apple',
      coordinates: { lat: 30, lon: 78, altitude: 0.05, flatX: 14, flatZ: 22 },
      rotationY: 85,
      scale: 1.0,
      color: ANIME_PALETTE.grass.sunlit,
      secondaryColor: ANIME_PALETTE.foliage.flowerPoppy,
    },

    // Blossom Trees (Tea Terraces & Gardens)
    {
      id: 'prop-tree-blossom-tea',
      type: 'tree-blossom',
      coordinates: { lat: 42, lon: -140, altitude: 0.17, flatX: -22, flatZ: 6 },
      rotationY: 40,
      scale: 1.18,
      color: ANIME_PALETTE.foliage.blossomPink,
    },
    {
      id: 'prop-tree-blossom-library',
      type: 'tree-blossom',
      coordinates: { lat: 36, lon: -20, altitude: 0.05, flatX: -10, flatZ: -18 },
      rotationY: -70,
      scale: 1.12,
      color: ANIME_PALETTE.foliage.blossomApricot,
    },

    // Weeping Willows (Pond & Stream)
    {
      id: 'prop-tree-willow-pond',
      type: 'tree-willow',
      coordinates: { lat: 31, lon: 38, altitude: 0.02, flatX: 9, flatZ: -10 },
      rotationY: 15,
      scale: 1.3,
      color: ANIME_PALETTE.foliage.willowPale,
    },
    {
      id: 'prop-tree-willow-workshop',
      type: 'tree-willow',
      coordinates: { lat: 25, lon: 65, altitude: 0.03, flatX: 11, flatZ: 6 },
      rotationY: -55,
      scale: 1.2,
      color: ANIME_PALETTE.foliage.willowPale,
    },

    // Pine Trees (High Bluffs & Crags)
    {
      id: 'prop-tree-pine-bluff-1',
      type: 'tree-pine',
      coordinates: { lat: 48, lon: -130, altitude: 0.2, flatX: -24, flatZ: 12 },
      rotationY: 0,
      scale: 1.25,
      color: ANIME_PALETTE.grass.forestCanopy,
    },
    {
      id: 'prop-tree-pine-bluff-2',
      type: 'tree-pine',
      coordinates: { lat: 44, lon: -125, altitude: 0.18, flatX: -20, flatZ: 16 },
      rotationY: 60,
      scale: 1.15,
      color: ANIME_PALETTE.grass.forestCanopy,
    },
    {
      id: 'prop-tree-pine-windmill',
      type: 'tree-pine',
      coordinates: { lat: 46, lon: 118, altitude: 0.14, flatX: 26, flatZ: 22 },
      rotationY: 120,
      scale: 1.2,
      color: ANIME_PALETTE.grass.forestCanopy,
    },
  ],
};
