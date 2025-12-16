'use client';

import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { useIntlPathname, useIntlRouter } from '@/i18n/navigation';
import { Locale, i18nRoutingConfig } from '@/i18n/routing';
import { Button } from './ui/button';

const SCROLL_THRESHOLD = 30;

const THEMES = {
  system: { next: 'light', icon: SunMoon },
  light: { next: 'dark', icon: Sun },
  dark: { next: 'system', icon: Moon },
} as const;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const visibleRef = useRef(true);

  const t = useTranslations('mode-toggle');
  const locale = useLocale() as Locale;
  const router = useIntlRouter();
  const pathname = useIntlPathname();
  const { locales, pathnames } = i18nRoutingConfig;

  const nextLocale = locales[(locales.indexOf(locale) + 1) % locales.length];
  const nextLocaleName =
    new Intl.DisplayNames([nextLocale], {
      type: 'language',
    }).of(nextLocale) ?? nextLocale.toUpperCase();

  const switchLanguage = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.replace(pathname, { locale: nextLocale, scroll: false });
      });
    } else {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleScroll = () => {
      const shouldBeVisible = window.scrollY < SCROLL_THRESHOLD;

      if (visibleRef.current !== shouldBeVisible) {
        visibleRef.current = shouldBeVisible;
        setVisible(shouldBeVisible);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  // Hide on undefined routes (e.g. 404s).
  if (!Object.keys(pathnames).includes(pathname)) {
    return null;
  }

  const current = THEMES[theme as keyof typeof THEMES] ?? THEMES.system;

  return (
    <div
      className={`fixed top-8 right-6 z-50 flex flex-col gap-2 transition-opacity duration-300 lg:right-8 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={switchLanguage}
        aria-label={t('aria-switch-language-to', { language: nextLocaleName })}
        className="text-xs font-medium uppercase shadow-xl"
      >
        {locale}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(current.next)}
        aria-label={t(`aria-switch-to-${current.next}`)}
        className="shadow-xl"
      >
        <current.icon className="h-5 w-5" />
      </Button>
    </div>
  );
}
