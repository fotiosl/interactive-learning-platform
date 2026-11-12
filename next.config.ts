import fs from 'fs';
import path from 'path';
import type { NextConfig } from 'next';

const isLinkedNodeModules = (() => {
  try {
    return fs.lstatSync(path.join(process.cwd(), 'node_modules')).isSymbolicLink();
  } catch {
    return false;
  }
})();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  enablePrerenderSourceMaps: false,
  env: {
    NEXT_PUBLIC_APP_MODE: 'public',
  },
  images: {
    unoptimized: true,
  },
  ...(process.env.STANDALONE === 'true' ? { output: 'standalone' } : {}),
  ...(isLinkedNodeModules ? { turbopack: { root: path.resolve(process.cwd(), '..') } } : {}),
  outputFileTracingIncludes: {
    '/*': ['./src/data/students/**/*.json'],
  },
  experimental: {
    serverSourceMaps: false,
    preloadEntriesOnStart: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
