import { createNavigation } from 'next-intl/navigation';
import { i18nRoutingConfig } from './routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const {
  Link: IntlLink,
  redirect: intlRedirect,
  usePathname: useIntlPathname,
  useRouter: useIntlRouter,
  getPathname: getIntlPathname,
} = createNavigation(i18nRoutingConfig);
