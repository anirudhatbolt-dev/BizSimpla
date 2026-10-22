import type { MetadataRoute } from 'next';

// If you already have app/robots.ts or public/robots.txt, just add '/reports/' to its disallow list.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/reports/'] } };
}