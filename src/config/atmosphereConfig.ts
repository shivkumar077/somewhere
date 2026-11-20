export type AtmosphereMode = 'day' | 'evening' | 'night';

export interface AtmospherePhaseConfig {
  mode: AtmosphereMode;
  displayName: string;
  skyTopColor: string;
  skyBottomColor: string;
  ambientLightColor: string;
  ambientIntensity: number;
  sunColor: string;
  sunIntensity: number;
  sunPosition: [number, number, number];
  hemiSkyColor: string;
  hemiGroundColor: string;
  hemiIntensity: number;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  windowGlowIntensity: number;
  lanternGlowIntensity: number;
  starsOpacity: number;
  firefliesOpacity: number;
  cloudsTint: string;
  cloudsOpacity: number;
}

export const ATMOSPHERE_PRESETS: Record<AtmosphereMode, AtmospherePhaseConfig> = {
  day: {
    mode: 'day',
    displayName: 'Bright Day',
    skyTopColor: '#7ec8e3', // soft pastel cerulean
    skyBottomColor: '#d6efff', // pale morning mist
    ambientLightColor: '#fff5e6', // warm soft ambient
    ambientIntensity: 0.85,
    sunColor: '#fff9e6', // crisp warm sun
    sunIntensity: 1.4,
    sunPosition: [8, 12, 10],
    hemiSkyColor: '#bde0fe',
    hemiGroundColor: '#a7c957',
    hemiIntensity: 0.6,
    fogColor: '#c5e2f7',
    fogNear: 15,
    fogFar: 45,
    windowGlowIntensity: 0.1,
    lanternGlowIntensity: 0.05,
    starsOpacity: 0.0,
    firefliesOpacity: 0.0,
    cloudsTint: '#ffffff',
    cloudsOpacity: 0.88,
  },
  evening: {
    mode: 'evening',
    displayName: 'Golden Sunset',
    skyTopColor: '#4a4063', // twilight violet-indigo
    skyBottomColor: '#f49068', // radiant peachy coral
    ambientLightColor: '#e07a5f', // warm terracotta ambient
    ambientIntensity: 0.7,
    sunColor: '#ff9248', // golden hour amber
    sunIntensity: 1.6,
    sunPosition: [12, 5, 8], // low sun angle for long romantic shadows
    hemiSkyColor: '#e07a5f',
    hemiGroundColor: '#606c38',
    hemiIntensity: 0.5,
    fogColor: '#f28e6b',
    fogNear: 14,
    fogFar: 42,
    windowGlowIntensity: 0.65,
    lanternGlowIntensity: 0.8,
    starsOpacity: 0.35,
    firefliesOpacity: 0.6,
    cloudsTint: '#fed1b2',
    cloudsOpacity: 0.85,
  },
  night: {
    mode: 'night',
    displayName: 'Starlit Night',
    skyTopColor: '#0a0e1a', // deep midnight navy
    skyBottomColor: '#1d2a44', // mystical twilight indigo
    ambientLightColor: '#2b3a67', // gentle moonlight fill
    ambientIntensity: 0.45,
    sunColor: '#9bb2e5', // silvery moon key light
    sunIntensity: 0.85,
    sunPosition: [-8, 10, -6],
    hemiSkyColor: '#1a2744',
    hemiGroundColor: '#1b3b22',
    hemiIntensity: 0.35,
    fogColor: '#141c2e',
    fogNear: 12,
    fogFar: 38,
    windowGlowIntensity: 1.0,
    lanternGlowIntensity: 1.0,
    starsOpacity: 0.95,
    firefliesOpacity: 0.95,
    cloudsTint: '#3d4d6e',
    cloudsOpacity: 0.45,
  },
};

/**
 * Determine atmosphere state based on visitor local browser hour [0..23].
 * - Day: 06:00 to 17:00
 * - Evening: 17:00 to 20:30
 * - Night: 20:30 to 06:00
 */
export function getAtmosphereFromLocalTime(date: Date = new Date()): AtmosphereMode {
  const hours = date.getHours() + date.getMinutes() / 60;
  if (hours >= 6 && hours < 17) {
    return 'day';
  } else if (hours >= 17 && hours < 20.5) {
    return 'evening';
  } else {
    return 'night';
  }
}

