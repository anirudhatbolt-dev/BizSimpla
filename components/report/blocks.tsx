import { Fragment, type ReactNode } from 'react';
import type { Status, TextBlock } from '@/types/report';
import { ReportImage } from './ReportImage';

/** Renders **bold** and {{purple accent}} markup from JSON strings. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\{\{[^}]+\}\})/).map((part, i) => {
        if (part.startsWith('**')) return <strong key={i} className="font-semibold text-[#111]">{part.slice(2, -2)}</strong>;
        if (part.startsWith('{{')) return <span key={i} className="text-[#7a5af8]">{part.slice(2, -2)}</span>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((p, i) => <p key={i} className="leading-relaxed text-neutral-700"><RichText text={p} /></p>)}
  </div>
);

export const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 text-left">
    {items.map((b, i) => (
      <li key={i} className="flex gap-3 leading-relaxed text-neutral-700">
        <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2b2b2b]" aria-hidden />
        <span><RichText text={b} /></span>
      </li>
    ))}
  </ul>
);

export const Numbered = ({ items }: { items: string[] }) => (
  <ol className="list-decimal space-y-2 pl-6 text-left leading-relaxed text-neutral-800">
    {items.map((s, i) => <li key={i} className="pl-1"><RichText text={s} /></li>)}
  </ol>
);

/** The bordered, centered text box used across the template. */
export const Box = ({ children, align = 'center' }: { children: ReactNode; align?: 'center' | 'left' }) => (
  <div className={`break-inside-avoid space-y-3 border-2 border-[#e0e0e0] bg-white p-4 ${align === 'left' ? 'text-left' : 'text-center'} text-sm leading-relaxed text-neutral-800 sm:p-5 sm:text-base`}>
    {children}
  </div>
);

export const Callout = ({ text }: { text: string }) => (
  <Box><p><RichText text={text} /></p></Box>
);

const CHIP: Record<Status, { label: string; cls: string }> = {
  strong: { label: 'Strong', cls: 'bg-emerald-100 text-emerald-800' },
  opportunity: { label: 'Opportunity', cls: 'bg-amber-100 text-amber-800' },
  room_to_grow: { label: 'Room to grow', cls: 'bg-rose-100 text-rose-800' },
};

export function StatusChip({ status }: { status: Status }) {
  const c = CHIP[status] ?? CHIP.opportunity;
  return <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${c.cls}`}>{c.label}</span>;
}

/** soft = thick light borders, centered (scorecard). ruled = thin dark borders, left-aligned (text-heavy tables). */
export function DataTable<T extends object>({
  columns, rows, variant = 'soft',
}: { columns: { key: keyof T; label: string; render?: (row: T) => ReactNode }[]; rows: T[]; variant?: 'soft' | 'ruled' }) {
  const ruled = variant === 'ruled';
  const border = ruled ? 'border border-[#2b2b2b]' : 'border-[3px] border-[#e4e4e4]';
  return (
    <div className="overflow-x-auto print:overflow-visible">
      <table className={`w-full border-collapse text-sm print:min-w-0 sm:text-base ${ruled ? 'min-w-[560px] text-left' : 'min-w-[360px]'}`}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className={`${border} bg-[#fdf3dc] p-3 font-semibold ${ruled ? 'text-left' : 'text-center'}`}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="break-inside-avoid">
              {columns.map((c, i) => (
                <td
                  key={String(c.key)}
                  className={`${border} p-3 ${ruled ? 'align-middle' : 'align-top'} ${i === 0 ? 'bg-[#fce6c4] font-semibold' : 'bg-white'} ${ruled ? '' : 'text-center'}`}
                >
                  {c.render ? c.render(row) : <RichText text={String(row[c.key] ?? '')} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Every section: one gap above (mt-10), centered heading, and a single gap (space-y-5) between its items. */
export function Section({ id, title, children }: { id?: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-10">
      {title && <h2 className="mb-5 text-center font-heading text-2xl font-bold leading-tight text-[#2b2b2b] sm:text-4xl"><RichText text={title} /></h2>}
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function TextSection({ block, fallbackTitle, id }: { block?: TextBlock; fallbackTitle: string; id?: string }) {
  if (!block || !(block.paragraphs?.length || block.bullets?.length || block.callout || block.image)) return null;
  return (
    <Section id={id} title={block.title ?? fallbackTitle}>
      {(block.paragraphs?.length || block.bullets?.length) && (
        <Box align={block.bullets?.length ? 'left' : 'center'}>
          {block.paragraphs?.map((p, i) => <p key={i}><RichText text={p} /></p>)}
          {block.bullets && <Bullets items={block.bullets} />}
        </Box>
      )}
      {block.callout && <Callout text={block.callout} />}
      {block.image && <ReportImage image={block.image} />}
    </Section>
  );
}