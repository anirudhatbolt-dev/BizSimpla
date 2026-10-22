'use client';
import { useEffect, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

export function PageViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track('report_view', { slug });
  }, [slug]);
  return null;
}

export function CtaButton({
  href, slug, location, children, className = '',
}: { href: string; slug: string; location: 'top' | 'bottom'; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('cta_click', { slug, location })}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#111] px-6 py-3 font-semibold text-white transition hover:bg-[#333] print:hidden ${className}`}
    >
      {children}
    </a>
  );
}