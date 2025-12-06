'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, SunMoon } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

const SCROLL_THRESHOLD = 90;

const THEMES = {
  system: { next: 'light', icon: SunMoon },
  light: { next: 'dark', icon: Sun },
  dark: { next: 'system', icon: Moon },
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const visibleRef = useRef(true);

  const t = useTranslations('theme-toggle');

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

  const current = THEMES[theme as keyof typeof THEMES] ?? THEMES.system;

  return (
    <div
      className={`fixed top-8 right-8 z-50 flex flex-col gap-2 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
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
