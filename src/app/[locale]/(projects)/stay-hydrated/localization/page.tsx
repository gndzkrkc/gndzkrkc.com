import * as React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const HighlightedText = ({
  color,
  className,
  children,
}: {
  color: 'green' | 'orange' | 'yellow';
  className?: string;
  children: React.ReactNode;
}) => {
  const variants: Record<typeof color, string> = {
    // For translation strings
    green:
      'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 m-0.5',
    // For ID strings
    orange:
      'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 m-0.5',
    // For emphasized tags/placeholders
    yellow:
      'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
  };

  return (
    <span
      className={cn(
        'inline-flex p-1 rounded font-mono text-sm',
        variants[color],
        className,
      )}
    >
      {children}
    </span>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    'projects.stay-hydrated.localization.metadata',
  );

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function LocalizationTipsPage() {
  const t = useTranslations('projects.stay-hydrated.localization');

  return (
    <main className="container max-w-2xl mx-auto">
      <article className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed">
        {/* Header Section */}
        <header className="not-prose">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
            {t('header.title')}
          </h1>
          <strong className="block text-2xl font-medium text-muted-foreground/80 mb-4">
            {t('header.subtitle')}
          </strong>
        </header>

        <Separator className="mt-8 mb-16" />

        {/* 1. Be friendly */}
        <h2>{t('sections.friendly.title')}</h2>
        <ul className="list-disc space-y-2">
          <li>{t('sections.friendly.items.0')}</li>
          <li>{t('sections.friendly.items.1')}</li>
        </ul>

        {/* 2. Be creative */}
        <h2 className="mt-8">{t('sections.creative.title')}</h2>
        <ul className="list-disc space-y-2">
          <li>
            {t('sections.creative.items.intro')}
            <br />
            {/* Example strings with styling */}
            <HighlightedText color="green">
              Good morning!
            </HighlightedText> –{' '}
            <HighlightedText color="green">Morning!</HighlightedText>
            <br />
            <HighlightedText color="green">
              Time to drink water!
            </HighlightedText>{' '}
            –{' '}
            <HighlightedText color="green">
              It&apos;s time to drink water.
            </HighlightedText>
            <br />
            <br />
            {t('sections.creative.items.outro')}
          </li>
        </ul>

        {/* 3. Be careful */}
        <h2 className="mt-8">{t('sections.careful.title')}</h2>
        <ul className="list-disc space-y-2">
          <li>
            {t.rich('sections.careful.items.paired', {
              firstId: (chunks) => (
                <HighlightedText color="orange">{chunks}</HighlightedText>
              ),
              secondId: (chunks) => (
                <HighlightedText color="orange">{chunks}</HighlightedText>
              ),
            })}
          </li>

          <li>{t('sections.careful.items.punctuation')}</li>
          <li>{t('sections.careful.items.expert')}</li>

          {/* HTML Entities Tip */}
          <li>
            {t('sections.careful.entities.intro')}
            <div className="my-4">
              <Image
                src="/crowdin_html_tip.png"
                alt="Crowdin HTML Tag Tip"
                width={500}
                height={150}
                className="w-full h-auto rounded-lg shadow-md border"
              />
            </div>

            {t('sections.careful.entities.example')}
            <div className="flex flex-col items-start gap-2 my-2">
              <HighlightedText
                color="green"
                className="flex flex-row flex-wrap items-center gap-1"
              >
                <HighlightedText color="yellow">
                  &amp;lt;b&amp;gt;
                </HighlightedText>
                {t('sections.careful.entities.example-content')}
                <HighlightedText color="yellow">
                  &amp;lt;/b&amp;gt;
                </HighlightedText>
              </HighlightedText>
              <span>{t('sections.careful.entities.result')}</span>
              <HighlightedText
                color="green"
                className="flex flex-row flex-wrap items-center gap-1"
              >
                <HighlightedText color="yellow">&lt;0&gt;</HighlightedText>
                {t('sections.careful.entities.example-content')}
                <HighlightedText color="yellow">&lt;/0&gt;</HighlightedText>
              </HighlightedText>
            </div>
          </li>
        </ul>
      </article>
    </main>
  );
}
