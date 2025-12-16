import { useTranslations } from 'next-intl';
import { IntlLink } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function NotFoundPage() {
  const t = useTranslations('navigation.not-found');

  return (
    <div className="dark relative w-full">
      {/* --- FULL SCREEN BACKGROUND --- */}
      <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-black select-none">
        <Image
          src="/lm-404.jpg"
          alt="Leyla ile Mecnun"
          fill
          preload
          className="sm:blur-0 object-cover object-left opacity-50 blur-[1px]"
        />

        {/* Overlay Layers */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="animate-in zoom-in-95 fade-in fixed inset-0 z-10 flex h-full w-full flex-col items-center justify-end px-4 pb-32 duration-700 sm:justify-center sm:pt-32 sm:pb-0">
        {/* RED DOT */}
        <div className="relative mb-8 flex h-8 w-8">
          <span className="absolute inline-flex h-full w-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex h-8 w-8 rounded-full border-2 border-white/20 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)]"></span>
        </div>

        <h1 className="mb-6 text-center text-2xl font-black tracking-[0.15em] text-white/80 uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] md:text-5xl">
          {t('you-are-here')}
        </h1>

        <p className="mb-12 text-center text-base font-medium tracking-[0.2em] text-white/70 uppercase decoration-red-500/80 decoration-wavy drop-shadow-md md:text-xl">
          {t('page-is-not')}
        </p>

        <Button
          asChild
          variant="outline"
          className="h-auto rounded-full border-white/20 bg-white/10 px-12 py-5 text-sm font-bold tracking-widest text-white uppercase shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <IntlLink href="/">{t('back-to-home')}</IntlLink>
        </Button>
      </div>
    </div>
  );
}
