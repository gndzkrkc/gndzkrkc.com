import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  redirects: async () => [
    {
      source: '/stayhydrated/policy',
      destination: '/stay-hydrated/privacy-notice',
      permanent: true,
    },
    {
      source: '/stayhydrated/privacy-policy.html',
      destination: '/stay-hydrated/privacy-notice',
      permanent: true,
    },
  ],
  headers: async () => {
    return [
      {
        // Global security headers
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: ['camera=()', 'microphone=()', 'geolocation=()'].join(', '),
          },
        ],
      },
      {
        // CSP: HTML pages only
        source: '/((?!api|_next/static|_next/image|.*\\..*).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "script-src-attr 'none'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' blob: data:",
              "connect-src 'self' https: wss:",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
