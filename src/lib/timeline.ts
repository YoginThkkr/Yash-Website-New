import type { Portfolio, Sticker } from "../types/portfolio";

export interface TimelineEntry {
  key: string;
  years: string;
  title: string;
  subtitle: string;
  location: string;
  points: string[];
  sticker: Sticker;
  kind: "work" | "study";
  sortKey: number;
}

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

/** "May 2024 — Present" -> 2024.33 (used only for ordering) */
function startValue(period: string): number {
  const year = period.match(/\d{4}/);
  if (!year) return 0;
  const month = MONTHS.findIndex((m) => period.toLowerCase().startsWith(m));
  return Number(year[0]) + (month >= 0 ? month / 12 : 0);
}

/** "May 2024 — Present" -> "2024 – Now", "August 2018 — December 2018" -> "2018" */
function shortYears(period: string): string {
  const years = period.match(/\d{4}/g) ?? [];
  const ongoing = /present|now/i.test(period);
  const first = years[0];
  const last = years[years.length - 1];
  if (!first || !last) return period;
  if (ongoing) return `${first} – Now`;
  if (first === last) return first;
  return `${first} – ${last}`;
}

const FALLBACK: Sticker = { label: "★", shape: "circle", color: "#F5F5F5" };

/** Education and experience merged into one oldest-first story. */
export function buildTimeline(data: Portfolio): TimelineEntry[] {
  const work: TimelineEntry[] = data.experience.map((job) => ({
    key: `work-${job.company}-${job.period}`,
    years: shortYears(job.period),
    title: job.company,
    subtitle: job.role,
    location: job.location,
    points: (job.points ?? job.highlights).slice(0, 3),
    sticker: job.sticker ?? FALLBACK,
    kind: "work",
    sortKey: startValue(job.period),
  }));

  const study: TimelineEntry[] = data.education.map((item) => ({
    key: `study-${item.institution}-${item.period}`,
    years: shortYears(item.period),
    title: item.institution.split(",")[0],
    subtitle: item.credential,
    location: item.institution.split(",").slice(1).join(",").trim(),
    points: item.note ? [item.note] : [],
    sticker: item.sticker ?? FALLBACK,
    kind: "study",
    sortKey: startValue(item.period),
  }));

  return [...work, ...study].sort((a, b) => a.sortKey - b.sortKey);
}
