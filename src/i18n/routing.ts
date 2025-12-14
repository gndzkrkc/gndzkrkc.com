import { defineRouting } from 'next-intl/routing';

export const i18nRoutingConfig = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',

    '/projects/stay-hydrated/': {
      tr: '/projeler/su-gunlugu/',
    },

    '/projects/stay-hydrated/privacy-notice/': {
      tr: '/projeler/su-gunlugu/gizlilik-bildirimi/',
    },

    '/projects/stay-hydrated/localization/': {
      tr: '/projeler/su-gunlugu/yerellestirme/',
    },
  },
});

export type PathnameKey = keyof typeof i18nRoutingConfig.pathnames;
export type Locale = (typeof i18nRoutingConfig.locales)[number];
