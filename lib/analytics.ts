type Props = Record<string, string | number | boolean>;
type Loose = {
  gtag?: (...a: unknown[]) => void;
  plausible?: (e: string, o?: { props: Props }) => void;
  posthog?: { capture?: (e: string, p?: Props) => void };
};

// Does nothing until gtag, plausible or posthog exists on the page.
export function track(event: string, props: Props = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Loose;
  try {
    w.gtag?.('event', event, props);
    w.plausible?.(event, { props });
    w.posthog?.capture?.(event, props);
  } catch {}
}

const YT = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/;
const LOOM = /loom\.com\/(?:share|embed)\/([\w]+)/;

export function toEmbedUrl(url: string): string {
  const yt = url.match(YT);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(VIMEO);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  const lm = url.match(LOOM);
  if (lm) return `https://www.loom.com/embed/${lm[1]}`;
  return url; // LinkedIn embed src or any other iframe src
}