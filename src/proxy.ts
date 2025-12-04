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
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
