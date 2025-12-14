import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'projects.stay-hydrated.privacy-notice',
  });

  return {
    title: `${t('header.title')} | ${t('header.subtitle')}`,
    description: t('abstract.statement'),
  };
}

export default function PrivacyNoticePage() {
  const t = useTranslations('projects.stay-hydrated.privacy-notice');

  return (
    <main className="container max-w-2xl mx-auto">
      {/* HEADER SECTION */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
          {t('header.title')}
        </h1>
        <strong className="block text-2xl font-medium text-muted-foreground/80 mb-4">
          {t('header.subtitle')}
        </strong>
      </header>

      <Separator className="mt-8 mb-16" />

      {/* CONTENT ARTICLE */}
      <article className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed">
        {/* 1. Abstract */}
        <h2>{t('abstract.title')}</h2>
        <p className="font-medium text-foreground">{t('abstract.statement')}</p>

        {/* 2. Data Storage */}
        <h2>{t('data-storage.title')}</h2>
        <p>{t('data-storage.paragraph-1')}</p>
        <p>{t('data-storage.list.intro')}</p>
        <ul>
          <li>{t('data-storage.list.item-1')}</li>
          <li>{t('data-storage.list.item-2')}</li>
          <li>{t('data-storage.list.item-3')}</li>
        </ul>

        {/* 3. Google Services */}
        <h2>{t('google-services.title')}</h2>
        <p>{t('google-services.paragraph')}</p>

        {/* 4. Changes */}
        <h2>{t('changes.title')}</h2>
        <p>{t('changes.paragraph')}</p>
      </article>

      <Separator className="my-8" />

      {/* FOOTER SECTION */}
      <footer className="space-y-8">
        <div className="text-sm text-muted-foreground space-y-3">
          <p>
            <sup>1</sup> {t('footnotes.1')}
          </p>
          <p>
            <sup>2</sup> {t('footnotes.2')}
          </p>
        </div>

        <Separator />

        <div className="text-sm font-medium text-muted-foreground/80">
          <p>{t('footer.last-updated')}</p>
        </div>
      </footer>
    </main>
  );
}
