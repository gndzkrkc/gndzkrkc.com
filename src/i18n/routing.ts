import { defineRouting } from 'next-intl/routing';

export const i18nRoutingConfig = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',

    '/projects/stay-hydrated/policy/': {
      tr: '/projeler/su-gunlugu/gizlilik-bildirimi/',
    },
  },
});
