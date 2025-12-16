import { useTranslations } from 'next-intl';
import { IntlLink } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Construction, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PersonJsonLd from '@/components/person-json-ld';
import { SITE_CONFIG, SOCIAL_LINKS, CONTACT } from '@/lib/constants';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-20 py-12">
      {/* PERSON SCHEMA for SEO */}
      <PersonJsonLd
        name={SITE_CONFIG.name}
        url={SITE_CONFIG.url}
        title={`${t('hero.role')} | ${t('hero.focus')}`}
        description={t('hero.subtitle')}
        // TODO: Add avatar image url later
        email={`mailto:${CONTACT.email}`}
        sameAs={Object.values(SOCIAL_LINKS)}
      />

      {/* 1. HERO SECTION */}
      <section className="flex max-w-3xl flex-col items-center space-y-10 text-center">
        <div className="space-y-6">
          <h1 className="text-foreground text-4xl font-extralight tracking-[0.2em] uppercase sm:text-6xl">
            {SITE_CONFIG.name}
          </h1>

          <h2 className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-sm font-light tracking-[0.3em] uppercase sm:flex-row sm:gap-3 sm:text-base">
            <span>{t('hero.role')}</span>
            <span className="text-muted-foreground/40 hidden sm:block">|</span>
            <span className="hidden sm:block">{t('hero.focus')}</span>
          </h2>
        </div>

        {/* Under Construction Badge */}
        <div className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-amber-200 bg-amber-100 px-5 py-2 text-amber-700 shadow-sm transition-transform hover:scale-105 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          <Construction className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide uppercase">
            {t('status.badge')}
          </span>
        </div>

        <p className="text-foreground/70 mx-auto max-w-lg text-lg leading-relaxed font-light">
          {t('status.text')}
        </p>
      </section>

      {/* 2. FEATURED PROJECTS */}
      <section className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-md duration-700">
        <div className="mb-6 flex items-center justify-center">
          <h3 className="text-muted-foreground text-[10px] font-bold tracking-[0.4em] uppercase">
            {t('featured.title')}
          </h3>
        </div>

        {/* Stay Hydrated */}
        <IntlLink href="/stay-hydrated/" className="group block">
          <Card className="border-border/60 hover:border-foreground/10 dark:hover:shadow-primary/5 bg-card/50 relative overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center gap-6 p-6">
              <div className="bg-card flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl p-2 shadow-sm transition-transform duration-500 group-hover:scale-105">
                <div className="relative h-full w-full">
                  <Image
                    src="/stay-hydrated.png"
                    alt="Stay Hydrated Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    preload
                  />
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <CardTitle className="group-hover:text-primary flex items-center gap-2 text-lg font-light tracking-wider uppercase transition-colors">
                  {t('featured.stay-hydrated-title')}
                  <ArrowRight className="text-muted-foreground h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm leading-relaxed font-light">
                  {t('featured.stay-hydrated-desc')}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </IntlLink>
      </section>

      {/* 3. SOCIAL LINKS */}
      <section className="flex flex-wrap justify-center gap-4">
        {[
          {
            href: SOCIAL_LINKS.github,
            icon: Github,
            label: 'github',
            external: true,
          },
          {
            href: SOCIAL_LINKS.linkedin,
            icon: Linkedin,
            label: 'linkedin',
            external: true,
          },
          {
            href: `mailto:${CONTACT.email}`,
            icon: Mail,
            label: 'email',
            external: false,
          },
        ].map(({ href, icon: Icon, label, external }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            asChild
            className="border-muted-foreground/20 hover:border-foreground/40 rounded-full px-8 transition-colors"
          >
            <Link
              href={href}
              {...(external && { target: '_blank', rel: 'me noopener' })}
            >
              <Icon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs font-normal tracking-widest uppercase">
                {t(`links.${label}`)}
              </span>
            </Link>
          </Button>
        ))}
      </section>
    </main>
  );
}
