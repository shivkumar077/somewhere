/**
 * Central configuration for editable copy, typography, and story milestones.
 * Allows copy changes without rebuilding 3D models or animation timelines.
 */

export interface ContentConfig {
  siteTitle: string;
  tagline: string;
  welcomeLines: [string, string, string];
  enterButtonText: string;
  milestoneTitle: string;
  milestoneDescription: string;
  footerCredit: string;
}

export const CONTENT_CONFIG: ContentConfig = {
  siteTitle: 'Shiv Kumar | Portfolio',
  tagline: '',
  welcomeLines: [
    'HELLO',
    'THERE',
    'YOU',
  ],
  enterButtonText: 'ENTER',
  milestoneTitle: 'Milestone',
  milestoneDescription: 'The Rotating Miniature Town',
  footerCredit: 'Crafted with care',
};
