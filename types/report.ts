export type Status = 'strong' | 'opportunity' | 'room_to_grow';

export interface ImageBlock {
  url: string;
  alt: string;
  caption?: string;
  example_only?: boolean;
  size?: 'small' | 'medium' | 'full'; // default full
  border?: boolean; // default true; set false for screenshots that already have their own frame
}

/** Reusable text block: any mix of paragraphs, bullets, a callout and an image. Use **bold** inside strings. */
export interface TextBlock {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: string;
  image?: ImageBlock;
}

export interface Report {
  slug: string;
  header: {
    title: string;
    subtitle?: string;
    date?: string;
    intro?: string;
    video_url?: string; // YouTube, Vimeo, Loom, or any iframe src (e.g. LinkedIn embed src)
  };
  scorecard?: {
    title?: string;
    rows: { check: string; result: string; status: Status }[];
    image?: ImageBlock;
  };
  whats_working?: TextBlock;
  profile_health?: {
    title?: string;
    rows: { priority: string; finding: string; why_it_helps: string; what_to_do: string }[];
  };
  reviews?: TextBlock;
  map_scan?: {
    title?: string;
    intro?: string;
    radius?: string;
    scans?: { keyword: string; images: ImageBlock[] }[];
    caveat?: string;
  };
  scan_recommendations?: TextBlock;
  strong_review?: {
    title?: string;
    example_images?: ImageBlock[]; // 1 or more; stacked with no gap, so 3 images today and 1 later look the same
    hierarchy_image?: ImageBlock;
    note?: string;
  };
  free_steps?: { title?: string; steps: string[] };
  could_mean?: TextBlock;
  how_it_works?: {
    title?: string;
    intro?: string[];
    rows: { feature: string; what_it_does: string; what_it_does_for_you: string }[];
    images?: ImageBlock[];
  };
  plan?: {
    title?: string;
    includes?: string[];
    phases?: { label: string; description: string }[];
  };
  cta?: { heading: string; subtext?: string; button_text: string; button_url?: string; note?: string };
  footer?: {
    method?: string;
    tools?: string[];
    scan_date?: string;
    sources?: { label: string; url?: string }[];
    disclaimer?: string;
  };
}