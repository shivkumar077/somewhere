import * as THREE from 'three';

/**
 * MESSENGER AESTHETIC ART BIBLE & PALETTE
 * Extracted directly from https://messenger.abeto.co/ and the user's reference screenshots:
 * - Hand-inked cel-shaded anime style
 * - Vibrant turquoise ocean with foam ripples
 * - Off-white stucco, warm terracotta clay, slate blue, and industrial rust-orange pipes
 * - Crisp ink line outlines (#1e252b)
 * - Warm golden yellow button (#f4c430)
 */

export const MESSENGER_PALETTE = {
  // Atmosphere & Ocean
  oceanSurface: '#56b4ad',
  oceanDeep: '#439791',
  oceanFoam: '#b2ece7',
  skyBackground: '#5bb8b2',

  // Terrain & Rocks
  cliffRock: '#7b8789',
  cliffRockDark: '#556062',
  sandShore: '#ded6c3',
  cobblestoneRoad: '#c2bcb0',
  grassGreen: '#618a52',
  grassHighlight: '#7ca86b',
  grassShadow: '#446637',

  // Architecture (Cel-Shaded Stucco & Timber)
  stuccoWhite: '#f4f2ec',
  stuccoWarmCream: '#eae4d3',
  stuccoShadow: '#b0aaa0',
  timberDarkOak: '#423329',
  timberWeathered: '#615246',

  // Roofs & Accents
  roofTerracotta: '#c85a3a',
  roofTerracottaShadow: '#963e26',
  roofSlateBlue: '#465566',
  roofSlateBlueShadow: '#2f3b47',
  roofVerdigris: '#568a7c',
  roofThatchGold: '#d6a858',

  // Industrial & Utility Elements (as seen in Messenger's orange pipe plant)
  pipeRustOrange: '#d96c3b',
  pipeRustShadow: '#9c451e',
  metalSteel: '#889296',
  telegraphPole: '#3d312a',
  telegraphWire: '#1e252b',

  // Windows, Emissives & Accents
  windowGlowDay: '#ffeaa7',
  windowGlowNight: '#ffb703',
  chimneySmoke: '#eef2f5',

  // Ink Outline & Shading
  inkOutline: '#1e252b',
  dropShadow: 'rgba(20, 25, 30, 0.35)',

  // Yellow Entry Button
  buttonGold: '#f4c430',
  buttonGoldHover: '#ffcf3d',
  buttonGoldShadow: '#a17812',
  buttonText: '#1e252b',
} as const;

/**
 * Creates a discrete stepped 3-tone gradient texture for Three.js MeshToonMaterial
 * This ensures authentic cel-shading with sharp light-to-shadow transition bands.
 */
export function createCelGradientTexture(): THREE.DataTexture {
  // 3 distinct discrete tones: Shadow (110), Midtone (200), Highlight (255)
  const colors = new Uint8Array([110, 110, 110, 255, 200, 200, 200, 255, 255, 255, 255, 255]);
  const texture = new THREE.DataTexture(colors, 3, 1, THREE.RGBAFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

export const CEL_GRADIENT_TEXTURE = createCelGradientTexture();
