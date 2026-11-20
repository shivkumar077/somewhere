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
  siteTitle: 'SOMEWHERE',
  tagline: 'An illustrated miniature world',
  welcomeLines: [
    'HELLO',
    'THERE',
    'YOU',
  ],
  enterButtonText: 'ENTER SOMEWHERE',
  milestoneTitle: 'MILESTONE 01',
  milestoneDescription: 'The Rotating Miniature Town',
  footerCredit: 'Crafted with care for Somewhere — Milestone 01',
};

