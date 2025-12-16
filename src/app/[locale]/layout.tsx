import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ModeToggle } from '@/components/mode-toggle';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { SITE_CONFIG } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jbMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${jbMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <div className="min-h-screen">
              <BreadcrumbNavigation />
              <ModeToggle />
              <div className="px-6 pt-24 pb-24 md:pb-48">{children}</div>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
