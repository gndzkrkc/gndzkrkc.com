import type { MetadataRoute } from 'next';
import {
  i18nRoutingConfig,
  type PathnameKey,
  type Locale,
} from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Get the localized pathname for a given route and locale.
 */
function getLocalizedPath(pathname: PathnameKey, locale: Locale): string {
  const pathnameConfig = i18nRoutingConfig.pathnames[pathname];

  // If the pathname has locale-specific paths, use them
  if (typeof pathnameConfig === 'object' && locale in pathnameConfig) {
    return pathnameConfig[locale as keyof typeof pathnameConfig] as string;
  }

  // Otherwise, return the default pathname (used for default locale or non-localized paths)
  return pathname;
}

/**
 * Build the full URL with locale prefix.
 */
function buildUrl(path: string, locale: Locale): string {
  const localizedPath = path === '/' ? '' : path;
  return `${SITE_CONFIG.url}/${locale}${localizedPath}`;
}

/**
 * Generate alternates object for a given pathname.
 */
function generateAlternates(
  pathname: PathnameKey,
): Record<string, string> | undefined {
  const alternates: Record<string, string> = {};

  for (const locale of i18nRoutingConfig.locales) {
    const localizedPath = getLocalizedPath(pathname, locale);
    alternates[locale] = buildUrl(localizedPath, locale);
  }

  // Add x-default pointing to the default locale
  const defaultPath = getLocalizedPath(
    pathname,
    i18nRoutingConfig.defaultLocale,
  );
  alternates['x-default'] = buildUrl(
    defaultPath,
    i18nRoutingConfig.defaultLocale,
  );

  return alternates;
}

/**
 * Calculate URL depth (number of path segments).
 * '/' = 0, '/stay-hydrated/' = 1, '/stay-hydrated/privacy-notice/' = 2
 */
function getUrlDepth(path: string): number {
  return path.split('/').filter(Boolean).length;
}

/**
 * Derive SEO config from URL depth.
 * Deeper pages = lower priority & less frequent updates.
 *
 * Depth 0 (home):     priority 1.0, weekly
 * Depth 1:            priority 0.8, monthly
 * Depth 2:            priority 0.6, monthly
 * Depth 3+:           priority 0.4, yearly
 */
function getRouteConfig(route: PathnameKey): {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
} {
  const depth = getUrlDepth(route);

  // Priority: starts at 1.0, decreases by 0.2 per level, minimum 0.2
  // Round to 1 decimal place to avoid floating-point precision issues
  const priority = Math.max(0.2, Math.round((1.0 - depth * 0.2) * 10) / 10);

  // Change frequency based on depth
  const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
    depth === 0 ? 'weekly' : depth <= 2 ? 'monthly' : 'yearly';

  return { changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: PathnameKey[] = Object.keys(
    i18nRoutingConfig.pathnames,
  ) as PathnameKey[];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const { changeFrequency, priority } = getRouteConfig(route);

    // Generate entries for each locale
    for (const locale of i18nRoutingConfig.locales) {
      const localizedPath = getLocalizedPath(route, locale);

      sitemapEntries.push({
        url: buildUrl(localizedPath, locale),
        changeFrequency,
        priority,
        alternates: {
          languages: generateAlternates(route),
        },
      });
    }
  }

  return sitemapEntries;
}
