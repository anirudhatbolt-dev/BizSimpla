import { promises as fs } from 'fs';
import path from 'path';
import type { Report } from '@/types/report';

const DIR = path.join(process.cwd(), 'data', 'reports');
const SAFE_SLUG = /^[a-z0-9-]+$/;

// Swap the bodies of these two functions for Supabase later. The page never changes.
export async function getReport(slug: string): Promise<Report | null> {
  if (!SAFE_SLUG.test(slug)) return null;
  try {
    const raw = await fs.readFile(path.join(DIR, `${slug}.json`), 'utf8');
    return { ...(JSON.parse(raw) as Report), slug };
  } catch {
    return null;
  }
}

export async function getAllReportSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(DIR);
    return files.filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
  } catch {
    return [];
  }
}