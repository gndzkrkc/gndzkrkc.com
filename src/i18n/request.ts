import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { i18nRoutingConfig } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(i18nRoutingConfig.locales, requested)
    ? requested
    : i18nRoutingConfig.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
