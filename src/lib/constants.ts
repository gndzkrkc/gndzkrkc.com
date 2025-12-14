/**
 * Site-wide constants and configuration
 *
 * Centralized location for URLs, contact information, and other
 * repeated values used throughout the application.
 */

export const SITE_CONFIG = {
  name: 'Gündüz Karakeçe',
  url: 'https://gndzkrkc.com',
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/gndzkrkc',
  linkedin: 'https://www.linkedin.com/in/gndzkrkc/',
} as const;

export const CONTACT = {
  email: 'contact@gndzkrkc.com',
} as const;

export const STAY_HYDRATED = {
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=gndzkrkc.stayhydrated',
  crowdinUrl: 'https://crowdin.com/project/stayhydrated',
  supportEmail: 'stayhydrated@gndzkrkc.com',
} as const;
