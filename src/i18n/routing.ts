import { defineRouting } from 'next-intl/routing';

export const i18nRoutingConfig = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'never',
  pathnames: {
    '/': '/',
  },
});
