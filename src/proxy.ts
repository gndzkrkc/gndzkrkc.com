import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { i18nRoutingConfig } from '@/i18n/routing';

export function proxy(request: NextRequest) {
  const i18nMiddleware = createMiddleware(i18nRoutingConfig);
  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - `/api/**` (API routes)
     * - `/_next/static/**` (static assets)
     * - `/_next/image/**` (image optimization requests)
     * - Any path containing a dot (e.g. `favicon.ico`)
     *
     * Also skip prefetch requests:
     * - When `next-router-prefetch` header exists
     * - When `purpose: prefetch`
     */
    {
      source: '/((?!api|_next/static|_next/image|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
