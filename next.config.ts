import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
              "script-src-attr 'none'",
              `style-src 'self' ${isDev ? "'unsafe-inline'" : ''}`,
              "img-src 'self' blob: data:",
              "connect-src 'self' https: wss:",
              "frame-src 'none'",
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

export default nextConfig;
