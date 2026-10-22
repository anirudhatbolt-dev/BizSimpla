import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import { getAllReportSlugs, getReport } from '@/lib/reports';
import { PageViewTracker } from '@/components/report/Tracking';
import {
  CtaSection, FreeStepsSection, HeaderSection, HowItWorksSection, MapScanSection,
  PlanSection, ProfileHealthSection, ReportFooter, ScorecardSection, SiteBar, StrongReviewSection, TextSection,
} from '@/components/report/sections';

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', weight: ['500', '700'] });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllReportSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const report = await getReport((await params).slug);
  return {
    title: report ? `${report.header.title} | Biz Simpler Report` : 'Report',
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) notFound();

  return (
    <div className={`${heading.variable} ${body.variable} min-h-screen bg-[#f3f3f3] font-body print:bg-white`} style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
      <style>{`.font-heading{font-family:var(--font-heading),system-ui,sans-serif}@media print{@page{margin:14mm}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`}</style>
      <PageViewTracker slug={slug} />
      <SiteBar report={report} />
      <main className="mx-auto my-0 max-w-[760px] overflow-hidden bg-white sm:my-6 sm:rounded-3xl print:my-0 print:max-w-none print:rounded-none">
        <HeaderSection report={report} />
        <div className="px-5 pb-10 sm:px-10">
          <ScorecardSection report={report} />
          <TextSection block={report.whats_working} fallbackTitle="What's working" id="working" />
          <ProfileHealthSection report={report} />
          <TextSection block={report.reviews} fallbackTitle="What we found in the reviews" id="reviews" />
          <MapScanSection report={report} />
          <TextSection block={report.scan_recommendations} fallbackTitle="What the scan tool recommends" id="recommendations" />
          <StrongReviewSection report={report} />
          <FreeStepsSection report={report} />
          <TextSection block={report.could_mean} fallbackTitle="What this could mean for you" id="could-mean" />
          <HowItWorksSection report={report} />
          <PlanSection report={report} />
          <CtaSection report={report} />
          <ReportFooter report={report} />
        </div>
      </main>
    </div>
  );
}