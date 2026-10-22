import { ArrowRight, ArrowUpLeft, Star, Sun } from 'lucide-react';
import type { ImageBlock, Report } from '@/types/report';
import { toEmbedUrl } from '@/lib/analytics';
import {
  Box, Bullets, Callout, DataTable, Numbered, Paragraphs, RichText, Section, StatusChip, TextSection,
} from './blocks';
import { ReportImage } from './ReportImage';
import { CtaButton } from './Tracking';

/** Same soft gradient as the banner; reused by the closing CTA card. */
const BRAND_GRADIENT =
  'radial-gradient(circle at 15% 20%, #fff6a8 0, transparent 50%), radial-gradient(circle at 85% 30%, #c9b8f5 0, transparent 55%), radial-gradient(circle at 60% 90%, #f9b4e6 0, transparent 55%), #fbe3c6';

export const DEFAULT_BOOKING_URL = 'https://cal.com/onekadian/bizsimpler';
const bookingUrl = (r: Report) => r.cta?.button_url ?? DEFAULT_BOOKING_URL;

/** Same brand bar as the homepage. Uses your existing globals.css classes. */
export function SiteBar({ report }: { report: Report }) {
  return (
    <header className="site-header print:hidden">
      <div className="site-header-inner">
        <a className="brand" href="/" aria-label="Biz Simpler. home">
          <span className="brand-mark"><Star className="h-4 w-4 fill-current" /></span>
          <span>Biz Simpler<span className="brand-dot">.</span></span>
        </a>
        <CtaButton href={bookingUrl(report)} slug={report.slug} location="top" className="!px-4 !py-2 text-sm">
          {report.cta?.button_text ?? 'Book a call'} <ArrowRight className="h-4 w-4" />
        </CtaButton>
      </div>
    </header>
  );
}

/** Images stacked edge to edge, so several slices read as one picture. One image works the same. */
function ImageStack({ images }: { images: ImageBlock[] }) {
  return <div>{images.map((img) => <ReportImage key={img.url} image={img} />)}</div>;
}

// 1. Header
export function HeaderSection({ report }: { report: Report }) {
  const h = report.header;
  return (
    <>
      <div className="relative overflow-hidden px-6 py-10 sm:py-14" style={{ background: BRAND_GRADIENT }}>
        <Sun className="absolute right-6 top-6 h-8 w-8 text-[#f5c451]" aria-hidden />
        <p className="relative font-heading text-5xl font-bold leading-[1.05] text-[#2b2b2b] sm:text-6xl">
          Biz Simpler<br />Report <ArrowUpLeft className="inline h-8 w-8 -translate-y-1" aria-hidden />
        </p>
      </div>
      <div className="space-y-5 px-5 pt-8 sm:px-10">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-bold leading-tight text-[#2b2b2b] sm:text-4xl">{h.title}</h1>
          {h.subtitle && <p className="text-lg text-neutral-600">{h.subtitle}</p>}
          {h.date && <p className="text-sm text-neutral-500">{h.date}</p>}
        </div>
        {h.intro && <Callout text={h.intro} />}
        {h.video_url && (
          <div className="aspect-video overflow-hidden border-2 border-[#111] print:hidden">
            <iframe src={toEmbedUrl(h.video_url)} title={`${h.title} video`} loading="lazy" allowFullScreen className="h-full w-full" />
          </div>
        )}
      </div>
    </>
  );
}

// 2. Scorecard
export function ScorecardSection({ report }: { report: Report }) {
  const s = report.scorecard;
  if (!s?.rows?.length) return null;
  return (
    <Section id="scorecard" title={s.title}>
      <DataTable
        rows={s.rows}
        columns={[
          { key: 'check', label: 'Check' },
          { key: 'result', label: 'Result' },
          { key: 'status', label: 'Status', render: (r) => <StatusChip status={r.status} /> },
        ]}
      />
      {s.image && <ReportImage image={s.image} priority />}
    </Section>
  );
}

// 4. Profile health check
export function ProfileHealthSection({ report }: { report: Report }) {
  const p = report.profile_health;
  if (!p?.rows?.length) return null;
  return (
    <Section id="profile-health" title={p.title ?? 'Profile health check'}>
      <DataTable
        variant="ruled"
        rows={p.rows}
        columns={[
          { key: 'priority', label: 'Priority' },
          { key: 'finding', label: 'What we found' },
          { key: 'why_it_helps', label: 'Why it helps' },
          { key: 'what_to_do', label: 'What to do' },
        ]}
      />
    </Section>
  );
}

// 6. Local map scan
export function MapScanSection({ report }: { report: Report }) {
  const m = report.map_scan;
  if (!m || !(m.scans?.length || m.intro || m.caveat)) return null;
  return (
    <Section id="map-scan" title={m.title ?? 'Local map scan'}>
      {m.intro && <p className="text-center leading-relaxed text-neutral-800"><RichText text={m.intro} /></p>}
      {m.radius && <p className="text-center text-sm text-neutral-500">{m.radius}</p>}
      {m.scans?.map((scan, i) => (
        <div key={scan.keyword} className="space-y-3">
          <p className="text-neutral-800"><span>{i + 1}. </span><strong className="font-semibold text-[#111]">{scan.keyword}</strong></p>
          <ImageStack images={scan.images} />
        </div>
      ))}
      {m.caveat && <Callout text={m.caveat} />}
    </Section>
  );
}

// 8. What a strong review looks like
export function StrongReviewSection({ report }: { report: Report }) {
  const s = report.strong_review;
  if (!s || !(s.example_images?.length || s.hierarchy_image || s.note)) return null;
  return (
    <Section id="strong-review" title={s.title ?? 'What a strong review looks like'}>
      {s.hierarchy_image && <ReportImage image={s.hierarchy_image} />}
      {s.note && <Callout text={s.note} />}
      {s.example_images && s.example_images.length > 0 && <ImageStack images={s.example_images} />}
    </Section>
  );
}

// 9. Free steps
export function FreeStepsSection({ report }: { report: Report }) {
  const f = report.free_steps;
  if (!f?.steps?.length) return null;
  return <Section id="free-steps" title={f.title ?? 'Free steps this week'}><Box align="left"><Numbered items={f.steps} /></Box></Section>;
}

// 11. How BizSimpler works
export function HowItWorksSection({ report }: { report: Report }) {
  const h = report.how_it_works;
  if (!h?.rows?.length) return null;
  return (
    <Section id="how-it-works" title={h.title ?? 'How BizSimpler works'}>
      {h.intro && h.intro.length > 0 && (
        <Box>{h.intro.map((p, i) => <p key={i}><RichText text={p} /></p>)}</Box>
      )}
      <DataTable
        variant="ruled"
        rows={h.rows}
        columns={[
          { key: 'feature', label: 'Feature' },
          { key: 'what_it_does', label: 'What it does' },
          { key: 'what_it_does_for_you', label: 'What it does for you' },
        ]}
      />
      {h.images?.map((img) => <ReportImage key={img.url} image={img} />)}
    </Section>
  );
}

// 12. What you get and the 90-day plan
export function PlanSection({ report }: { report: Report }) {
  const p = report.plan;
  if (!p || !(p.includes?.length || p.phases?.length)) return null;
  return (
    <Section id="plan" title={p.title ?? 'What you get and the 90-day plan'}>
      {p.includes && <Bullets items={p.includes} />}
      {p.phases && (
        <div className="space-y-3">
          {p.phases.map((ph) => (
            <div key={ph.label} className="break-inside-avoid border-[3px] border-[#e4e4e4]">
              <p className="bg-[#fce6c4] px-4 py-2 font-heading font-bold">{ph.label}</p>
              <p className="p-4 text-neutral-700"><RichText text={ph.description} /></p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

// 13. CTA
export function CtaSection({ report }: { report: Report }) {
  const c = report.cta;
  if (!c) return null;
  return (
    <section className="mt-12 rounded-3xl px-6 py-12 text-center sm:px-10 sm:py-14" style={{ background: BRAND_GRADIENT }}>
      <h2 className="mx-auto max-w-md font-heading text-3xl font-bold leading-tight text-[#2b2b2b] sm:text-4xl">
        <RichText text={c.heading} />
      </h2>
      {c.subtext && <p className="mx-auto mt-3 max-w-md leading-relaxed text-neutral-700"><RichText text={c.subtext} /></p>}
      <CtaButton
        href={bookingUrl(report)}
        slug={report.slug}
        location="bottom"
        className="group mt-7 !px-8 !py-4 text-lg shadow-lg shadow-black/10 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a5af8]"
      >
        {c.button_text} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </CtaButton>
      {c.note && <p className="mt-4 text-sm text-neutral-600">{c.note}</p>}
    </section>
  );
}

// 14. Footer
export function ReportFooter({ report }: { report: Report }) {
  const f = report.footer;
  if (!f || !(f.method || f.tools?.length || f.scan_date || f.sources?.length || f.disclaimer)) return null;
  return (
    <footer className="mt-10 space-y-3 border-t-2 border-[#e4e4e4] pt-6 text-xs leading-relaxed text-neutral-500">
      {f.method && <p><strong className="text-neutral-700">Method:</strong> <RichText text={f.method} /></p>}
      {f.tools?.length && <p><strong className="text-neutral-700">Tools used:</strong> {f.tools.join(', ')}</p>}
      {f.scan_date && <p><strong className="text-neutral-700">Scan date:</strong> {f.scan_date}</p>}
      {f.sources?.length && (
        <div>
          <p className="font-semibold text-neutral-700">Sources</p>
          <ul className="list-disc pl-5">
            {f.sources.map((s) => (
              <li key={s.label}>
                {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a> : s.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {f.disclaimer && <p><RichText text={f.disclaimer} /></p>}
    </footer>
  );
}

export { TextSection };