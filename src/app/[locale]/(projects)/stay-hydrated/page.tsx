import Link from 'next/link';
import Image from 'next/image';
import { IntlLink } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Shield,
  ShieldCheck,
  Mail,
  Zap,
  Sparkles,
  LucideIcon,
  Star,
  Download,
  MessageSquareText,
  Users,
  Globe,
  HeartPulse,
  Cloud,
  Palette,
  Lightbulb,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_CONFIG, STAY_HYDRATED } from '@/lib/constants';

// --- Types & Configuration ---

const FEATURE_ITEMS: {
  id: string;
  Icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}[] = [
  {
    id: 'performance',
    Icon: Zap,
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/20',
  },
  {
    id: 'privacy',
    Icon: ShieldCheck,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
  {
    id: 'reminders',
    Icon: Sparkles,
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
  },
];

// --- Sub-Components ---

const StatItem = ({
  value,
  label,
  icon: Icon,
  iconColorClass,
  className = '',
}: {
  value: string;
  label: string;
  icon: LucideIcon;
  iconColorClass: string;
  className?: string;
}) => (
  <div className={`flex flex-col items-start px-6 ${className}`}>
    <div className="flex items-center gap-1.5">
      <span className="text-2xl font-medium">{value}</span>
      <Icon className={`h-5 w-5 ${iconColorClass}`} />
    </div>
    <span className="text-muted-foreground mt-1 text-xs font-medium tracking-wide uppercase">
      {label}
    </span>
  </div>
);

const ExtraFeatureHighlight = ({
  Icon,
  title,
  description,
}: {
  Icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <div className="bg-card flex items-start space-x-3 rounded-xl border p-4">
    <Icon className="mt-1 h-5 w-5 shrink-0 text-blue-500" />
    <div>
      <p className="text-foreground m-0 font-semibold">{title}</p>
      <p className="text-muted-foreground m-0 mt-0.5 text-sm">{description}</p>
    </div>
  </div>
);

// --- Main Component ---

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'projects.stay-hydrated.header',
  });

  return {
    title: `${t('title')} | ${SITE_CONFIG.name}`,
    description: t('subtitle'),
  };
}

export default function StayHydratedPage() {
  const t = useTranslations('projects.stay-hydrated');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <main className="container mx-auto max-w-2xl space-y-12 selection:bg-blue-100 selection:text-blue-900">
      {/* HEADER */}
      <section className="flex flex-col items-center space-y-6 text-center">
        <div className="bg-card ring-accent flex h-32 w-32 items-center justify-center overflow-hidden rounded-4xl p-4 shadow-md ring-1">
          <Image
            src="/stay-hydrated.png"
            alt={t('header.title')}
            width={96} // Equivalent to h-24
            height={96} // Equivalent to h-24
            className="h-24 w-24 object-cover"
            preload
          />
        </div>

        <header className="mt-3 space-y-3">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            {t('header.title')}
          </h1>
          <strong className="text-muted-foreground mx-auto block max-w-lg text-xl font-medium">
            {t('header.subtitle')}
          </strong>
        </header>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="text-muted-foreground px-3 py-1">
            {t('badges.category')}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground px-3 py-1">
            {t('badges.freemium')}
          </Badge>
          <Badge
            variant="secondary"
            className="border border-green-200 bg-green-100 px-3 py-1 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
          >
            {t('badges.android')}
          </Badge>
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURE_ITEMS.map(({ id, Icon, iconBg, iconColor }) => (
          <div
            key={id}
            className="group bg-card/50 hover:bg-card relative flex flex-row items-center rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-col sm:p-5"
          >
            <div
              className={`mr-4 flex h-12 w-12 shrink-0 items-center justify-center sm:mr-0 sm:mb-3 ${iconBg} rounded-2xl transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>

            <div className="flex flex-col text-left sm:text-center">
              <h3 className="text-foreground font-medium">
                {t(`features.${id}.title`)}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed sm:mt-1">
                {t(`features.${id}.description`)}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* STATS & DOWNLOAD CARD */}
      <section className="bg-muted/30 flex flex-col items-center justify-between gap-8 rounded-3xl border p-6 sm:p-8 md:flex-row">
        <div className="divide-border flex w-full justify-center divide-x md:w-auto md:justify-start">
          {/* 1. Rating */}
          <StatItem
            value="~4.8"
            label={t('stats.ratings')}
            icon={Star}
            iconColorClass="fill-amber-500 text-amber-500"
            className="first:pl-0"
          />

          {/* 2. Reviews (Hidden on mobile) */}
          <StatItem
            value={t('stats.reviews-val')}
            label={t('stats.reviews')}
            icon={MessageSquareText}
            iconColorClass="text-blue-500"
            className="hidden sm:flex"
          />

          {/* 3. Downloads */}
          <StatItem
            value={t('stats.downloads-val')}
            label={t('stats.downloads')}
            icon={Download}
            iconColorClass="text-green-500"
            className="last:pr-0"
          />
        </div>

        {/* Google Play CTA */}
        <Link
          href={STAY_HYDRATED.playStoreUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="shrink-0 transition-transform hover:scale-105 active:scale-95"
          aria-label={t('cta.download')}
        >
          <Image
            src={`/GetItOnGooglePlay_Badge_${locale}.svg`}
            alt={t('cta.download')}
            width={646}
            height={250}
            className="h-13 w-auto"
            preload
          />
        </Link>
      </section>

      {/* DESCRIPTION ARTICLE */}
      <article className="prose prose-zinc dark:prose-invert my-8 max-w-none text-left leading-relaxed md:my-16">
        <h2>{t('description.why-title')}</h2>
        <p>
          {t('description.paragraph-1')} {t('description.paragraph-1-continue')}
        </p>
        <p>{t('description.paragraph-2')}</p>

        {/* EXTRA FEATURES LIST */}
        <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ExtraFeatureHighlight
            Icon={HeartPulse}
            title={t('description.features.health')}
            description={t('description.features.health-desc')}
          />
          <ExtraFeatureHighlight
            Icon={Lightbulb}
            title={t('description.features.guidance')}
            description={t('description.features.guidance-desc')}
          />
          <ExtraFeatureHighlight
            Icon={Cloud}
            title={t('description.features.backup')}
            description={t('description.features.backup-desc')}
          />
          <ExtraFeatureHighlight
            Icon={Palette}
            title={t('description.features.customizations')}
            description={t('description.features.customizations-desc')}
          />
        </div>
      </article>

      {/* CONTRIBUTION SECTION */}
      <section className="bg-muted/30 mb-8 space-y-4 rounded-3xl border p-6 sm:p-8 md:mb-16">
        <h2 className="text-xl font-semibold">
          {t('description.contribution.title')}
        </h2>

        <p className="text-muted-foreground max-w-prose">
          {t('description.contribution.paragraph')}
        </p>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Button asChild>
            <Link
              href={STAY_HYDRATED.crowdinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="mr-2 h-4 w-4" />
              {t('description.contribution.crowdin-cta')}
            </Link>
          </Button>

          <Button asChild variant="outline">
            <IntlLink href="/stay-hydrated/localization/">
              <Users className="mr-2 h-4 w-4" />
              {t('description.contribution.localization-tips-cta')}
            </IntlLink>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-muted-foreground flex flex-col items-center justify-between gap-6 pt-4 text-sm sm:flex-row">
        <div className="flex gap-6">
          <IntlLink
            href="/stay-hydrated/privacy-notice/"
            className="hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Shield className="h-4 w-4" /> {t('footer.privacy-notice')}
          </IntlLink>
          <Link
            href={`mailto:${STAY_HYDRATED.supportEmail}`}
            className="hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Mail className="h-4 w-4" /> {t('footer.support')}
          </Link>
        </div>
        <p>{t('footer.copyright', { year })}</p>
      </footer>
    </main>
  );
}
