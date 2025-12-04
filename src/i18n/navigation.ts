import { createNavigation } from 'next-intl/navigation';
import { i18nRoutingConfig } from './routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(i18nRoutingConfig);
