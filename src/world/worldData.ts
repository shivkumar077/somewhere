import { WorldDefinition } from './types';

/**
 * THE CANONICAL WORLD MANIFEST — SOMEWHERE
 *
 * This dataset is the definitive single source of truth for the entire town.
 * Both the rotating miniature planet renderer (Milestone 01/02) and the
 * walkable living town (Milestone 03 / Prompt 05) derive their buildings,
 * districts, props, roads, terrain features, and NPCs from here.
 */

export const CANONICAL_WORLD: WorldDefinition = {
  version: '3.0.0',
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
    // =========================================================================
    // THE SIX PRIMARY FUNCTIONAL DESTINATIONS (Prompt 05 Core Requirement)
    // =========================================================================

    // 1. Little House — About Me
    {
      id: 'building-little-house',
      name: 'The Little House — About Me',
      type: 'little-house',
      category: 'residential',
      destinationRole: 'about',
      assetKey: 'mesh-little-house',
      description: 'A welcoming home introducing Shiv Kumar, his personal background, passions, and engineering journey.',
      coordinates: { lat: 28, lon: 2, altitude: 0, flatX: 0, flatZ: 12 },
      rotationY: 180,
      scale: 1.05,
      visualTheme: {
        wallColor: '#faedcd',
        roofColor: '#d66d58',
        trimColor: '#5c3a21',
        accentColor: '#f4a261',
        windowGlowColor: '#ffe57f',
      },
      metadata: {
        storySnippet: 'Home to software engineer Shiv Kumar. Welcome inside!',
        residentOrPurpose: 'Shiv Kumar (About Me)',
        milestoneIntroduced: 3,
        interactionTargetId: 'about',
        amenities: ['Personal Journal', 'Philosophy Board', 'Reading Armchair'],
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
      coordinates: { lat: 30, lon: -42, altitude: 0.02, flatX: -18, flatZ: -6 },
      rotationY: 85,
      scale: 1.15,
      visualTheme: {
        wallColor: '#f7efe1',
        roofColor: '#2a9d8f',
        trimColor: '#1d3557',
        accentColor: '#e9c46a',
        windowGlowColor: '#ffe57f',
      },
      metadata: {
        storySnippet: 'Techno India University: Academic rigor in Computer Science & Cloud Computing.',
        residentOrPurpose: 'Prof. Orion & Faculty',
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
      coordinates: { lat: 26, lon: 86, altitude: 0, flatX: 16, flatZ: 6 },
      rotationY: -80,
      scale: 1.08,
      visualTheme: {
        wallColor: '#e8dbce',
        roofColor: '#b05d3b',
        trimColor: '#4a3b32',
        accentColor: '#f4a261',
        windowGlowColor: '#f4a261',
      },
      metadata: {
        storySnippet: 'Where code is forged with care. Practical engineering, microservices, and telemetry.',
        residentOrPurpose: 'Master Tinkerer & Engineering Guild',
        milestoneIntroduced: 3,
        interactionTargetId: 'experience',
        amenities: ['Testing Harness', 'Architecture Drafting Table', 'Build Pipeline'],
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
      coordinates: { lat: 18, lon: 104, altitude: 0.02, flatX: 20, flatZ: -8 },
      rotationY: -110,
      scale: 1.12,
      visualTheme: {
        wallColor: '#ede0d4',
        roofColor: '#588157',
        trimColor: '#7b2cbf',
        accentColor: '#ffd166',
        windowGlowColor: '#a0e7e5',
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
      name: 'The Grand Library — Skills & Knowledge',
      type: 'library',
      category: 'civic',
      destinationRole: 'skills',
      assetKey: 'mesh-library',
      description: 'Comprehensive technical skills organized into Cloud, Systems, WebGL/Frontend, and Methodologies.',
      coordinates: { lat: -14, lon: 30, altitude: 0, flatX: -14, flatZ: 15 },
      rotationY: -35,
      scale: 1.14,
      visualTheme: {
        wallColor: '#dedbd2',
        roofColor: '#3a5a40',
        trimColor: '#344e41',
        accentColor: '#f4a261',
        windowGlowColor: '#ffeaa7',
      },
      metadata: {
        storySnippet: 'Scrolls of technical knowledge: AWS, Kubernetes, Docker, Go, TypeScript, Three.js, and TDD.',
        residentOrPurpose: 'Archivist Scribe (Skills Directory)',
        milestoneIntroduced: 3,
        interactionTargetId: 'skills',
        amenities: ['Cloud Architecture Tomes', 'Language Reference Stacks', 'Methodology Scrolls'],
        tags: ['Primary Destination', 'Skills', 'Core'],
      },
      rendering: {
        lodLevel: 'high',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    // 6. Post Office — Contact
    {
      id: 'building-post-office',
      name: 'The Post Office — Contact',
      type: 'post-office',
      category: 'commercial',
      destinationRole: 'contact',
      assetKey: 'mesh-post-office',
      description: 'Direct communication channels: Email, GitHub, LinkedIn, and Résumé.',
      coordinates: { lat: -32, lon: 8, altitude: 0, flatX: 4, flatZ: -16 },
      rotationY: 10,
      scale: 1.05,
      visualTheme: {
        wallColor: '#faedcd',
        roofColor: '#d62828',
        trimColor: '#5c3a21',
        accentColor: '#f4a261',
        windowGlowColor: '#ffe57f',
      },
      metadata: {
        storySnippet: 'Send a message, review GitHub repositories, or connect on LinkedIn.',
        residentOrPurpose: 'Postmaster Jasper (Contact Desk)',
        milestoneIntroduced: 3,
        interactionTargetId: 'contact',
        amenities: ['Postal Counter', 'Telegraph Key', 'Direct Mailbox'],
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
    // DECORATIVE LANDMARK & SCENERY BUILDINGS (Populated Storybook Village)
    // =========================================================================

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
        wallColor: '#f7efe1',
        roofColor: '#d66d58',
        trimColor: '#5c3a21',
        accentColor: '#f4a261',
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
      coordinates: { lat: 14, lon: -38, altitude: 0, flatX: -11, flatZ: 6 },
      rotationY: 30,
      scale: 0.98,
      visualTheme: {
        wallColor: '#faedcd',
        roofColor: '#bf573f',
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
      coordinates: { lat: 18, lon: -12, altitude: 0, flatX: -6, flatZ: 3 },
      rotationY: -10,
      scale: 0.95,
      visualTheme: {
        wallColor: '#f4ede2',
        roofColor: '#5c677d',
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

    {
      id: 'building-windmill',
      name: 'High Meadow Windmill',
      type: 'windmill',
      category: 'agriculture',
      assetKey: 'mesh-windmill-timber',
      description: 'A round stone windmill perched high on Meadow Ridge with four slatted timber sails catching the valley wind.',
      coordinates: { lat: 42, lon: 115, altitude: 0.18, flatX: 18, flatZ: 14 },
      rotationY: -45,
      scale: 1.1,
      visualTheme: {
        wallColor: '#e9d8a6',
        roofColor: '#9c6644',
        trimColor: '#6f4e37',
        accentColor: '#f4a261',
        windowGlowColor: '#ffba49',
      },
      metadata: {
        storySnippet: 'Its steady four-blade sails turn gently with every passing valley breeze.',
        residentOrPurpose: 'Miller Jonathan',
        milestoneIntroduced: 1,
        amenities: ['Grain Silo', 'Wind Vane', 'Grindstone Chamber'],
        tags: ['Windmill', 'Foliage', 'Skyline'],
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
      name: "The Gardener's Thatched Cottage",
      type: 'cottage-gardener',
      category: 'residential',
      assetKey: 'mesh-cottage-gardener',
      description: 'A sunlit cottage with an organic rounded thatched roof and flourishing climbing honeysuckle.',
      coordinates: { lat: 34, lon: 95, altitude: 0.05, flatX: 12, flatZ: 11 },
      rotationY: 45,
      scale: 0.92,
      visualTheme: {
        wallColor: '#faedcd',
        roofColor: '#cb997e',
        trimColor: '#5c3a21',
        windowGlowColor: '#ffe57f',
      },
      metadata: {
        storySnippet: 'Surrounded by thriving lavender beds, chamomile herbs, and apple trees.',
        residentOrPurpose: 'Flora the Herbalist',
        milestoneIntroduced: 2,
        amenities: ['Seed Drying Shed', 'Herb Press', 'Window Planters'],
        tags: ['Garden', 'Flora', 'Cottage'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },

    {
      id: 'building-lighthouse',
      name: 'Beacon Point Lighthouse',
      type: 'lighthouse',
      category: 'landmark',
      assetKey: 'mesh-lighthouse-beacon',
      description: 'A tall coastal stone lighthouse standing guard over the azure lagoon and distant reefs.',
      coordinates: { lat: -48, lon: -12, altitude: 0.08, flatX: -2, flatZ: -28 },
      rotationY: 20,
      scale: 1.15,
      visualTheme: {
        wallColor: '#ffffff',
        roofColor: '#b7094c',
        trimColor: '#001219',
        accentColor: '#ffea75',
        windowGlowColor: '#fff3b0',
      },
      metadata: {
        storySnippet: 'A faithful revolving beacon cutting through sea mist and guiding night travelers.',
        residentOrPurpose: 'Keeper Silas & Harbor Watch',
        milestoneIntroduced: 1,
        amenities: ['Fresnel Lantern', 'Fog Horn', 'Signal Gallery'],
        tags: ['Harbor', 'Coast', 'Beacon'],
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
        roofColor: '#52796f',
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
        wallColor: '#dedbd2',
        roofColor: '#588157',
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
      category: 'sanctuary',
      assetKey: 'mesh-tea-pavilion',
      description: 'A tranquil open timber pavilion with gently curved pagoda eaves, surrounded by pink blossom petals.',
      coordinates: { lat: 34, lon: -160, altitude: 0.12, flatX: -25, flatZ: 20 },
      rotationY: -25,
      scale: 0.95,
      visualTheme: {
        wallColor: '#faedcd',
        roofColor: '#9d0208',
        trimColor: '#370617',
        accentColor: '#ffba08',
        windowGlowColor: '#ffea75',
      },
      metadata: {
        storySnippet: 'Steam curls gracefully from iron kettles over glowing cherry charcoal.',
        residentOrPurpose: 'Master Oolong & Village Guests',
        milestoneIntroduced: 2,
        amenities: ['Tea Hearth', 'Blossom Viewing Deck', 'Wind Chimes'],
        tags: ['Tea', 'Zen', 'Pagoda'],
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
      name: 'Botanical Orangery & Fernhouse',
      type: 'greenhouse',
      category: 'landmark',
      assetKey: 'mesh-greenhouse-glass',
      description: 'A Victorian-style curved glass solarium conserving exotic alpine mosses, ferns, and citrus trees.',
      coordinates: { lat: -32, lon: 110, altitude: 0.08, flatX: 22, flatZ: -20 },
      rotationY: -55,
      scale: 1.05,
      visualTheme: {
        wallColor: '#f7ede2',
        roofColor: '#2a9d8f',
        trimColor: '#1b4332',
        accentColor: '#e76f51',
        windowGlowColor: '#a7c957',
      },
      metadata: {
        storySnippet: 'Translucent glass arches warm year-round blooms from tropical climes.',
        residentOrPurpose: 'Botanist Rowan',
        milestoneIntroduced: 2,
        amenities: ['Exotic Fern Collection', 'Glass Solarium', 'Water Lily Cistern'],
        tags: ['Glasshouse', 'Flora', 'Nature'],
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
      name: "The Bookbinder's Cottage",
      type: 'cottage-bookbinder',
      category: 'residential',
      assetKey: 'mesh-cottage-bookbinder',
      description: 'A cozy steep-gabled cottage with leaded diamond-pane windows and parchment press.',
      coordinates: { lat: 46, lon: -140, altitude: 0.1, flatX: -26, flatZ: 10 },
      rotationY: 15,
      scale: 0.9,
      visualTheme: {
        wallColor: '#ede0d4',
        roofColor: '#7f5539',
        trimColor: '#4a3b32',
        windowGlowColor: '#ffe57f',
      },
      metadata: {
        storySnippet: 'Shelves bowed under marbled leather bindings, inkwells, and field maps.',
        residentOrPurpose: 'Elias the Chronicler',
        milestoneIntroduced: 2,
        amenities: ['Parchment Press', 'Binding Bench', 'Map Library'],
        tags: ['Books', 'Cozy', 'Craft'],
      },
      rendering: {
        lodLevel: 'medium',
        castShadow: true,
        receiveShadow: true,
        hasWindowGlow: true,
      },
    },
  ],

  // =========================================================================
  // CHARMING NPC GUIDES (Prompt 05 Core Requirement)
  // =========================================================================
  npcs: [
    {
      id: 'npc-mayor',
      name: 'Mayor Ren',
      role: 'Village Guide',
      coordinates: { lat: 20, lon: 10, flatX: 1.5, flatZ: -2 },
      rotationY: 180,
      guidedDestination: 'about',
      dialogue: [
        'Welcome to Somewhere Village! I am Mayor Ren.',
        'Take your time walking our cobblestone paths—the Little House is just up north!',
        'You can use WASD, Arrow keys, or click anywhere on the grass to explore.',
      ],
      visualTheme: { jacketColor: '#d66d58', hatColor: '#5c3a21', pantsColor: '#2f3e46' },
    },
    {
      id: 'npc-professor',
      name: 'Professor Orion',
      role: 'Dean of Cloud Computing',
      coordinates: { lat: 28, lon: -38, flatX: -16, flatZ: -4 },
      rotationY: 110,
      guidedDestination: 'education',
      dialogue: [
        'Greetings scholar! Techno India University stands right here.',
        'Here we study distributed computing, virtualization, and systems algorithms.',
        'Step up to the University portico to review Shiv’s academic curriculum!',
      ],
      visualTheme: { jacketColor: '#2a9d8f', hatColor: '#1d3557', pantsColor: '#457b9d' },
    },
    {
      id: 'npc-tinkerer',
      name: 'Master Tinkerer',
      role: 'Systems Craftsman',
      coordinates: { lat: 24, lon: 82, flatX: 14, flatZ: 4.5 },
      rotationY: -60,
      guidedDestination: 'experience',
      dialogue: [
        'Welcome to the Workshop! No fake corporate titles here—just genuine systems craft.',
        'We build telemetry daemons, chaos engineering tools, and real-time audio synthesizers.',
        'The Invention House next door showcases 5 full engineering projects!',
      ],
      visualTheme: { jacketColor: '#e9c46a', hatColor: '#6f4e37', pantsColor: '#3d312a' },
    },
    {
      id: 'npc-archivist',
      name: 'Archivist Scribe',
      role: 'Keeper of Knowledge',
      coordinates: { lat: -12, lon: 28, flatX: -12, flatZ: 13.5 },
      rotationY: 35,
      guidedDestination: 'skills',
      dialogue: [
        'Welcome to the Library! Inside you will find categorized scrolls of technical knowledge.',
        'From AWS, Docker, and Kubernetes to Go, TypeScript, and Three.js WebGL graphics.',
      ],
      visualTheme: { jacketColor: '#7b2cbf', hatColor: '#3c096c', pantsColor: '#240046' },
    },
    {
      id: 'npc-postmaster',
      name: 'Postmaster Jasper',
      role: 'Village Courier',
      coordinates: { lat: -30, lon: 8, flatX: 3, flatZ: -14 },
      rotationY: 15,
      guidedDestination: 'contact',
      dialogue: [
        'Letters, telegrams, and code repositories! The Post Office is open for contact.',
        'You can reach Shiv directly via email, GitHub, or LinkedIn.',
        'Click the Post Office or press [E] to view full contact channels!',
      ],
      visualTheme: { jacketColor: '#e76f51', hatColor: '#d62828', pantsColor: '#1f2421' },
    },
  ],

  terrainFeatures: [
    { id: 'hill-windmill', name: 'Windmill Ridge', type: 'hill', coordinates: { lat: 43, lon: 112, flatX: 19, flatZ: 14 }, radius: 1.55, height: 0.42, color: '#8cb33e' },
    { id: 'hill-observatory', name: 'Stargazer Peak', type: 'ridge', coordinates: { lat: 54, lon: -112, flatX: -21, flatZ: -15 }, radius: 1.45, height: 0.38, color: '#7ba035' },
    { id: 'hill-tea-knoll', name: 'Cloudcrest Knoll', type: 'hill', coordinates: { lat: 32, lon: -162, flatX: -25, flatZ: 19 }, radius: 1.25, height: 0.3, color: '#8cb33e' },
    { id: 'hill-orangery', name: 'Fern Slope', type: 'hill', coordinates: { lat: -34, lon: 106, flatX: 21, flatZ: -22 }, radius: 1.35, height: 0.26, color: '#97be44' },
    { id: 'hill-south-pasture', name: 'South Orchard Pasture', type: 'hill', coordinates: { lat: -56, lon: 66, flatX: 16, flatZ: -36 }, radius: 1.6, height: 0.32, color: '#83a838' },
    { id: 'hill-east-bluff', name: 'Sunrise Bluff', type: 'hill', coordinates: { lat: 10, lon: 142, flatX: 28, flatZ: 6 }, radius: 1.35, height: 0.28, color: '#8cb33e' },
    { id: 'water-whispering-pond', name: 'Whispering Pond', type: 'pond', coordinates: { lat: -25, lon: -55, flatX: -13, flatZ: -16 }, radius: 1.2, color: '#38bdf8' },
    { id: 'water-beacon-lagoon', name: 'Azure Beacon Lagoon', type: 'lagoon', coordinates: { lat: -45, lon: -20, flatX: -6, flatZ: -26 }, radius: 1.1, color: '#0ea5e9' },
  ],

  paths: [
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
