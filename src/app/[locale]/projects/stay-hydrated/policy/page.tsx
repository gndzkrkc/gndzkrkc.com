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
    namespace: 'projects.stay-hydrated.privacy-policy',
  });

  return {
    title: `${t('header.title')} | ${t('header.subtitle')}`,
    description: t('abstract.statement'),
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('projects.stay-hydrated.privacy-policy');

  return (
    <main className="container max-w-2xl mx-auto">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
          {t('header.title')}
        </h1>
        <span className="block text-2xl font-semibold text-muted-foreground/80 mb-4">
          {t('header.subtitle')}
        </span>
      </div>

      <Separator className="my-8" />

      {/* CONTENT ARTICLE */}
      <article className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed">
        {/* 1. Abstract */}
        <h3>{t('abstract.title')}</h3>
        <p className="font-medium text-foreground">{t('abstract.statement')}</p>

        {/* 2. Data Storage */}
        <h3>{t('data-storage.title')}</h3>
        <p>{t('data-storage.paragraph-1')}</p>
        <p>{t('data-storage.list.intro')}</p>
        <ul>
          <li>{t('data-storage.list.item-1')}</li>
          <li>{t('data-storage.list.item-2')}</li>
          <li>{t('data-storage.list.item-3')}</li>
        </ul>

        {/* 3. Google Services */}
        <h3>{t('google-services.title')}</h3>
        <p>{t('google-services.paragraph')}</p>

        {/* 4. Changes */}
        <h3>{t('changes.title')}</h3>
        <p>{t('changes.paragraph')}</p>
      </article>

      <Separator className="my-8" />

      {/* FOOTER / FOOTNOTES */}
      <div className="text-sm text-muted-foreground space-y-3">
        <p>
          <sup>1</sup> {t('footnotes.1')}
        </p>
        <p>
          <sup>2</sup> {t('footnotes.2')}
        </p>
      </div>

      <Separator className="my-8" />

      <div className="text-sm font-medium text-muted-foreground/80">
        <p>{t('footer.last-updated')}</p>
      </div>
    </main>
  );
}
