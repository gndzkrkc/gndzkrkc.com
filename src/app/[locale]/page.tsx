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

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 space-y-20">
      {/* PERSON SCHEMA for SEO */}
      <PersonJsonLd
        name="Gündüz Karakeçe"
        url="https://gndzkrkc.com"
        title={`${t('hero.role')} | ${t('hero.focus')}`}
        description={t('hero.subtitle')}
        // TODO: Add avatar image url later
        email="mailto:contact@gndzkrkc.com"
        sameAs={[
          'https://github.com/gndzkrkc',
          'https://www.linkedin.com/in/gndzkrkc/',
        ]}
      />

      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center space-y-10 max-w-3xl">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extralight tracking-[0.2em] text-foreground uppercase">
            Gündüz Karakeçe
          </h1>

          <h2 className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground font-light tracking-[0.3em] uppercase">
            <span>{t('hero.role')}</span>
            <span className="hidden sm:block text-muted-foreground/40">|</span>
            <span className="hidden sm:block">{t('hero.focus')}</span>
          </h2>
        </div>

        {/* Under Construction Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shadow-sm transition-transform hover:scale-105 cursor-default">
          <Construction className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide uppercase">
            {t('status.badge')}
          </span>
        </div>

        <p className="text-lg text-foreground/70 font-light leading-relaxed max-w-lg mx-auto">
          {t('status.text')}
        </p>
      </section>

      {/* 2. FEATURED PROJECTS */}
      <section className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-center mb-6">
          <h3 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.4em]">
            {t('featured.title')}
          </h3>
        </div>

        {/* Stay Hydrated */}
        <IntlLink href="/stay-hydrated/" className="block group">
          <Card className="relative overflow-hidden border-border/60 transition-all duration-500 hover:border-foreground/10 hover:shadow-xl dark:hover:shadow-primary/5 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-6 p-6">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-card shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                <div className="relative h-full w-full">
                  <Image
                    src="/stay-hydrated.png"
                    alt="Stay Hydrated Logo"
                    fill
                    className="object-contain"
                    preload
                  />
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg font-light tracking-wider uppercase group-hover:text-primary transition-colors flex items-center gap-2">
                  {t('featured.stay-hydrated-title')}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm font-light leading-relaxed">
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
            href: 'https://github.com/gndzkrkc',
            icon: Github,
            label: 'github',
            external: true,
          },
          {
            href: 'https://www.linkedin.com/in/gndzkrkc/',
            icon: Linkedin,
            label: 'linkedin',
            external: true,
          },
          {
            href: 'mailto:contact@gndzkrkc.com',
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
            className="rounded-full px-8 border-muted-foreground/20 hover:border-foreground/40 transition-colors"
          >
            <Link href={href} {...(external && { target: '_blank' })}>
              <Icon className="h-4 w-4 mr-2 opacity-70" />
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
