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
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1">
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
  <div className="flex items-start space-x-3 p-4 bg-card rounded-xl border">
    <Icon className="h-5 w-5 mt-1 text-blue-500 shrink-0" />
    <div>
      <p className="font-semibold text-foreground m-0">{title}</p>
      <p className="text-sm text-muted-foreground mt-0.5 m-0">{description}</p>
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
    <main className="container max-w-2xl mx-auto space-y-12 selection:bg-blue-100 selection:text-blue-900">
      {/* HEADER */}
      <section className="space-y-6 flex flex-col items-center text-center">
        <div className="h-32 w-32 bg-card rounded-4xl shadow-md flex items-center justify-center p-4 ring-1 ring-accent overflow-hidden">
          <Image
            src="/stay-hydrated.png"
            alt={t('header.title')}
            width={96} // Equivalent to h-24
            height={96} // Equivalent to h-24
            className="h-24 w-24 object-cover"
            preload
          />
        </div>

        <header className="space-y-3 mt-3">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {t('header.title')}
          </h1>
          <strong className="block text-xl font-medium text-muted-foreground max-w-lg mx-auto">
            {t('header.subtitle')}
          </strong>
        </header>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="px-3 py-1 text-muted-foreground">
            {t('badges.category')}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-muted-foreground">
            {t('badges.freemium')}
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
          >
            {t('badges.android')}
          </Badge>
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {FEATURE_ITEMS.map(({ id, Icon, iconBg, iconColor }) => (
          <div
            key={id}
            className="group relative flex flex-row sm:flex-col items-center p-4 sm:p-5 rounded-2xl border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`h-12 w-12 shrink-0 flex items-center justify-center mr-4 sm:mr-0 sm:mb-3 ${iconBg} rounded-2xl transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>

            <div className="flex flex-col text-left sm:text-center">
              <h3 className="font-medium text-foreground">
                {t(`features.${id}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 sm:mt-1">
                {t(`features.${id}.description`)}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* STATS & DOWNLOAD CARD */}
      <section className="bg-muted/30 border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex w-full md:w-auto justify-center md:justify-start divide-x divide-border">
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
            value={t('stats.reviews_val')}
            label={t('stats.reviews')}
            icon={MessageSquareText}
            iconColorClass="text-blue-500"
            className="hidden sm:flex"
          />

          {/* 3. Downloads */}
          <StatItem
            value={t('stats.downloads_val')}
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
          className="transition-transform hover:scale-105 active:scale-95 shrink-0"
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
      <article className="prose prose-zinc dark:prose-invert max-w-none text-left leading-relaxed my-8 md:my-16">
        <h2>{t('description.why-title')}</h2>
        <p>
          {t('description.paragraph-1')} {t('description.paragraph-1-continue')}
        </p>
        <p>{t('description.paragraph-2')}</p>

        {/* EXTRA FEATURES LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
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
            Icon={Palette}
            title={t('description.features.customizations')}
            description={t('description.features.customizations-desc')}
          />
          <ExtraFeatureHighlight
            Icon={Cloud}
            title={t('description.features.backup')}
            description={t('description.features.backup-desc')}
          />
        </div>
      </article>

      {/* CONTRIBUTION SECTION */}
      <section className="border rounded-3xl p-6 sm:p-8 bg-muted/30 space-y-4 mb-8 md:mb-16">
        <h2 className="text-xl font-semibold">
          {t('description.contribution.title')}
        </h2>

        <p className="text-muted-foreground max-w-prose">
          {t('description.contribution.paragraph')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button asChild>
            <Link
              href={STAY_HYDRATED.crowdinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-4 w-4 mr-2" />
              {t('description.contribution.crowdin-cta')}
            </Link>
          </Button>

          <Button asChild variant="outline">
            <IntlLink href="/stay-hydrated/localization/">
              <Users className="h-4 w-4 mr-2" />
              {t('description.contribution.localization-tips-cta')}
            </IntlLink>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-muted-foreground pt-4">
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
