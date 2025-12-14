'use client';

import { IntlLink, useIntlPathname } from '@/i18n/navigation';
import { i18nRoutingConfig, type PathnameKey } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BreadcrumbNavigation() {
  const t = useTranslations('navigation');
  const pathname = useIntlPathname();
  const { pathnames } = i18nRoutingConfig;

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const items: { path: PathnameKey; name: string }[] = [];

  // Build paths from one level up, check each against pathnames
  for (let i = segments.length - 2; i >= 0; i--) {
    const path = `/${segments.slice(0, i + 1).join('/')}/` as PathnameKey;

    if (path in pathnames) {
      const name = t.has(`routes.${path}`) ? t(`routes.${path}`) : segments[i];
      if (name) items.unshift({ path, name });
    }
  }

  const parentLink = items.at(-1);

  return (
    <nav
      className="mx-auto max-w-4xl px-6 pt-8 text-muted-foreground"
      aria-label={t('aria-backward-nav')}
    >
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Button variant="outline" size="sm" asChild>
            <IntlLink href="/" aria-label={t('aria-go-home')}>
              <Home className="size-4" />
            </IntlLink>
          </Button>
        </li>

        {parentLink && (
          <>
            <ChevronRight className="size-4" aria-hidden="true" />
            <li>
              <Button variant="outline" size="sm" asChild>
                <IntlLink
                  href={parentLink.path}
                  aria-label={t('aria-go-to', { page: parentLink.name })}
                >
                  {parentLink.name}
                </IntlLink>
              </Button>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
