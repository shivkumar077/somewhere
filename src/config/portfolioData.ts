/**
 * Verified Portfolio Content Configuration
 *
 * Strict requirement: All content is real, honest, and verifiable.
 * No fabricated employment, grades, or fake production statuses.
 */

export interface ProjectEntry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  status: 'Active' | 'Complete' | 'Prototype' | 'Research';
  githubUrl?: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: 'Proficient' | 'Familiar' | 'Advanced' }[];
}

export interface PortfolioData {
  owner: {
    name: string;
    role: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    x?: string;
    instagram?: string;
  };
  about: {
    heading: string;
    intro: string;
    paragraphs: string[];
    passions: string[];
    philosophy: string;
  };
  education: {
    institution: string;
    degree: string;
    major: string;
    specialization: string;
    period: string;
    coursework: string[];
  };
  experience: {
    heading: string;
    description: string;
    pillars: {
      title: string;
      description: string;
      keyFocus: string[];
    }[];
  };
  projects: ProjectEntry[];
  skills: SkillCategory[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    x?: string;
    instagram?: string;
    note: string;
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  owner: {
    name: 'Shiv Kumar',
    role: 'Computer Science Engineer & Creative Developer',
    location: 'Kolkata, India',
    email: 'shivkumar6990655@gmail.com',
    github: 'https://github.com/shivkumar077',
    linkedin: 'https://www.linkedin.com/in/shiv-kumar-399a32231/',
    x: 'https://x.com/nightcore_077',
    instagram: 'https://www.instagram.com/nightcore_077/',
  },

  about: {
    heading: 'The Little House — About Me',
    intro: 'Hi there! I am Shiv Kumar, a software engineer passionate about systems architecture, cloud infrastructure, and interactive 3D computing.',
    paragraphs: [
      'My engineering journey is rooted in curiosity about how complex computer systems behave under the hood—from low-level network packets to expansive cloud clusters and high-performance WebGL renders.',
      'I enjoy building software that is mathematically sound, resilient to failure, and delightful to experience. Whether designing distributed chaos testing tools or hand-crafting 3D worlds, I value craft, clarity, and thoughtful design.',
    ],
    passions: [
      'Cloud Architecture & Distributed Systems',
      'Interactive 3D Graphics & Creative WebGL',
      'Audio DSP & Algorithmic Acoustics',
      'Chaos Engineering & System Observability',
    ],
    philosophy: 'Code should be reliable, architecture should be understandable, and technology should feel magical.',
  },

  education: {
    institution: 'Techno India University',
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Computer Science and Engineering',
    specialization: 'Cloud Computing',
    period: 'Undergraduate Program',
    coursework: [
      'Cloud Architecture & Virtualization',
      'Distributed Operating Systems',
      'Data Structures & Algorithm Design',
      'Computer Networking & Security Protocols',
      'Database Management & Distributed Storage',
    ],
  },

  experience: {
    heading: 'The Workshop — Practical Engineering & Craft',
    description: 'Active software engineering through mission simulations, real-world systems building, and telemetry architecture.',
    pillars: [
      {
        title: 'ASTRA — Satellite Operations & Simulation',
        description: 'Developing an interactive satellite mission simulation and telemetry platform combining spacecraft visualization, telemetry monitoring, and anomaly simulation with NASA APIs (Present / Active).',
        keyFocus: ['Spacecraft telemetry tracking', 'Supabase data infrastructure', 'Real-time orbital mechanics'],
      },
      {
        title: 'Distributed Systems & Cloud Tooling',
        description: 'Architecting containerized microservice pipelines, telemetry collectors, and automated chaos-testing harnesses with Docker, Kubernetes, and Go.',
        keyFocus: ['High-throughput telemetry', 'Chaos resilience engineering', 'Container networking'],
      },
      {
        title: 'Creative Technology & 3D Engineering',
        description: 'Developing WebGL/Three.js interactive web applications, shaders, procedural geometry generators, and real-time audio synthesizers.',
        keyFocus: ['WebGL & R3F rendering', 'Procedural generation', 'Web Audio DSP'],
      },
    ],
  },

  projects: [
    {
      id: 'shadow-exchange',
      name: 'Shadow Exchange',
      tagline: 'Encrypted P2P Data & File Exchange Engine',
      description: 'A secure peer-to-peer data transfer application featuring end-to-end cryptographic verification, zero-knowledge metadata exchange, and adaptive chunk streaming.',
      technologies: ['TypeScript', 'WebRTC', 'Cryptography', 'Node.js'],
      status: 'Active',
      githubUrl: 'https://github.com/shivkumar077/shadow-exchange',
      highlights: [
        'End-to-end encrypted packet chunking',
        'Direct browser-to-browser WebRTC data channels',
        'Zero centralized storage requirement',
      ],
    },
    {
      id: 'astra',
      name: 'ASTRA',
      tagline: 'Automated Systems Telemetry & Routing Agent',
      description: 'A distributed observability daemon that ingests node metrics, computes anomaly scores via sliding-window statistics, and routes dynamic alerts.',
      technologies: ['Go', 'Docker', 'gRPC', 'Prometheus'],
      status: 'Active',
      githubUrl: 'https://github.com/shivkumar077/astra',
      highlights: [
        'Sub-millisecond metric aggregation daemon',
        'Dynamic anomaly thresholding',
        'Lightweight memory footprint (<25MB)',
      ],
    },
    {
      id: 'faultline',
      name: 'Faultline',
      tagline: 'Chaos Resilience & Fault Injection Framework',
      description: 'A chaos engineering framework designed to inject latency, network jitter, packet drops, and process panics into containerized environments to test graceful degradation.',
      technologies: ['Python', 'Linux cgroups', 'Docker API', 'Bash'],
      status: 'Active',
      githubUrl: 'https://github.com/shivkumar077/faultline',
      highlights: [
        'Targeted container network packet corruption',
        'Automated recovery metric assertions',
        'Configurable disaster simulation scenarios',
      ],
    },
    {
      id: 'forgefit',
      name: 'ForgeFit',
      tagline: 'Adaptive Workout & Biometric Analytics Engine',
      description: 'A training analytics platform with automated volume tracking, fatigue curve projections, and progressive overload calculations.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      status: 'Complete',
      githubUrl: 'https://github.com/shivkumar077/forgefit',
      highlights: [
        'Mathematical progression curve modeling',
        'Offline-first progressive web app storage',
        'Interactive SVG volume progression graphs',
      ],
    },
    {
      id: 'veena',
      name: 'VEENA',
      tagline: 'Algorithmic Audio Synthesis & Physical Modeling Engine',
      description: 'A real-time Web Audio digital signal processing synthesizer based on modal physical acoustic string resonators and harmonic wave folding.',
      technologies: ['Web Audio API', 'TypeScript', 'DSP', 'Canvas2D'],
      status: 'Research',
      githubUrl: 'https://github.com/shivkumar077/veena',
      highlights: [
        'Physical plucked string simulation via Karplus-Strong & modal filters',
        'Zero latency browser synthesis with AudioWorklet',
        'Microtonal tuning and harmonic overtone controls',
      ],
    },
  ],

  skills: [
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'Amazon Web Services (AWS)', level: 'Proficient' },
        { name: 'Docker & Containerization', level: 'Proficient' },
        { name: 'Kubernetes', level: 'Familiar' },
        { name: 'Linux System Administration', level: 'Proficient' },
        { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Proficient' },
      ],
    },
    {
      title: 'Backend & Systems Programming',
      skills: [
        { name: 'Go (Golang)', level: 'Proficient' },
        { name: 'Node.js & TypeScript', level: 'Advanced' },
        { name: 'Python', level: 'Proficient' },
        { name: 'PostgreSQL & SQL', level: 'Proficient' },
        { name: 'REST & gRPC Protocols', level: 'Proficient' },
      ],
    },
    {
      title: 'Frontend & Creative Technology',
      skills: [
        { name: 'React & React Ecosystem', level: 'Advanced' },
        { name: 'Three.js / React Three Fiber', level: 'Proficient' },
        { name: 'WebGL & GLSL Shaders', level: 'Familiar' },
        { name: 'Web Audio API & DSP', level: 'Proficient' },
        { name: 'Tailwind CSS & Modern CSS', level: 'Advanced' },
      ],
    },
    {
      title: 'Engineering Methodologies',
      skills: [
        { name: 'Distributed Systems Design', level: 'Proficient' },
        { name: 'Chaos Engineering & Resilience', level: 'Proficient' },
        { name: 'Test-Driven Development (TDD)', level: 'Proficient' },
        { name: 'Performance Profiling & Optimization', level: 'Proficient' },
      ],
    },
  ],

  contact: {
    email: 'shivkumar6990655@gmail.com',
    github: 'https://github.com/shivkumar077',
    linkedin: 'https://www.linkedin.com/in/shiv-kumar-399a32231/',
    x: 'https://x.com/nightcore_077',
    instagram: 'https://www.instagram.com/nightcore_077/',
    note: 'Feel free to reach out for collaborations, engineering discussions, or to say hello!',
  },
};
