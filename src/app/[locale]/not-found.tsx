import { useTranslations } from 'next-intl';
import { IntlLink } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function NotFoundPage() {
  const t = useTranslations('navigation.not-found');

  return (
    <div className="dark relative w-full">
      {/* --- FULL SCREEN BACKGROUND --- */}
      <div className="fixed inset-0 z-0 w-screen h-screen bg-black select-none overflow-hidden">
        <Image
          src="/lm-404.jpg"
          alt="Leyla ile Mecnun"
          fill
          preload
          className="object-cover object-left opacity-50 blur-[1px] sm:blur-0"
        />

        {/* Overlay Layers */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="fixed inset-0 z-10 flex flex-col items-center w-full h-full px-4 animate-in zoom-in-95 fade-in duration-700 justify-end pb-32 sm:justify-center sm:pb-0 sm:pt-32">
        {/* RED DOT */}
        <div className="relative flex h-8 w-8 mb-8">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
          <span className="relative inline-flex rounded-full h-8 w-8 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)] border-2 border-white/20"></span>
        </div>

        <h1 className="text-2xl md:text-5xl font-black tracking-[0.15em] uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mb-6 text-white/80 text-center">
          {t('you-are-here')}
        </h1>

        <p className="text-base md:text-xl font-medium tracking-[0.2em] uppercase text-white/70 decoration-wavy decoration-red-500/80 drop-shadow-md mb-12 text-center">
          {t('page-is-not')}
        </p>

        <Button
          asChild
          variant="outline"
          className="rounded-full h-auto px-12 py-5 text-sm font-bold tracking-widest uppercase 
                     bg-white/10 backdrop-blur-md border-white/20 text-white 
                     hover:bg-red-600 hover:border-red-600 hover:text-white 
                     transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        >
          <IntlLink href="/">{t('back-to-home')}</IntlLink>
        </Button>
      </div>
    </div>
  );
}
