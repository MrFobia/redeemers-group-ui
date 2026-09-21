// ─────────────────────────────────────────────────────────────────────────────
// WORK CONTENT — one model behind every proof page.
//
// Reviews, job stories, case studies and project-gallery entries used to open
// in four different modals (ReviewModal, StoryModal, CaseStudyModal,
// ProjectModal, LocalContentModal). They now each open their own page at
//
//     review/<slug>   job-story/<slug>   case-study/<slug>   project/<slug>
//
// so every piece of proof is linkable, shareable and indexable. This module
// normalises the four existing datasets — plus the per-city items generated in
// localContent.ts for the service-area map — into one `WorkItem` the detail
// page can render, and resolves a slug back to its record.
// ─────────────────────────────────────────────────────────────────────────────
import { CASE_STUDIES, CASE_STUDY_BY_SLUG, caseStudySlug, type CaseStudy } from "./caseStudies";
import { ALL_REVIEWS, REVIEW_BY_SLUG, reviewSlug, type Review } from "./reviews";
import { STORIES, JOB_STORY_BY_SLUG, jobStorySlug, type JobStory } from "./jobStories";
import { GALLERY_ITEMS, PROJECT_BY_SLUG, projectSlug, type GalleryItem } from "./projects";
import { contentForCityItems, type ContentItem, type ContentKind } from "./localContent";
import { CITY_BY_SLUG } from "./serviceAreas";

export type WorkKind = ContentKind; // "review" | "job-story" | "case-study" | "project-gallery"

/** Route segment per kind — the page name half of "<page>/<slug>". */
export const ROUTE_BY_KIND: Record<WorkKind, string> = {
  "review": "review",
  "job-story": "job-story",
  "case-study": "case-study",
  "project-gallery": "project",
};

export const KIND_LABEL: Record<WorkKind, string> = {
  "review": "Review",
  "job-story": "Job Story",
  "case-study": "Case Study",
  "project-gallery": "Project",
};

/** Listing page each kind belongs to — used by the breadcrumb and back link. */
export const KIND_INDEX: Record<WorkKind, { label: string; route: string }> = {
  "review": { label: "Reviews", route: "reviews" },
  "job-story": { label: "Job Stories", route: "job-stories" },
  "case-study": { label: "Case Studies", route: "case-studies" },
  "project-gallery": { label: "Project Gallery", route: "project-gallery" },
};

export type WorkItem = {
  kind: WorkKind;
  slug: string;
  /** H1 of the detail page. */
  title: string;
  /** One-line summary under the title (may be empty for reviews). */
  summary?: string;
  service: string;
  /** "Memphis, TN" — already formatted for display. */
  loc?: string;
  citySlug?: string;
  date?: string;
  duration?: string;
  stars?: number;
  author?: string;
  avatarSrc?: string;
  /** Lead image plus the rest of the gallery, in display order. */
  images: { src: string; caption: string }[];
  /** Multi-paragraph write-up (case studies, projects, generated items). */
  story?: string[];
  /** Customer words, pulled out as the page's pull quote. */
  quote?: string;
  /** Numbers strip — [value, label] pairs, label may contain \n. */
  stats?: [string, string][];
  /** Systems installed — project gallery only. */
  products?: string[];
};

// ─── Adapters ─────────────────────────────────────────────────────────────────

export function caseStudyToWork(c: CaseStudy): WorkItem {
  return {
    kind: "case-study",
    slug: caseStudySlug(c),
    title: c.title,
    summary: c.desc,
    service: c.tag,
    loc: c.loc,
    images: c.gallery.map((g) => ({ src: g.img, caption: g.caption })),
    story: c.story,
    stats: c.stats,
  };
}

export function reviewToWork(r: Review): WorkItem {
  return {
    kind: "review",
    slug: reviewSlug(r),
    title: `${r.service} in ${r.loc}`,
    summary: undefined,
    service: r.service,
    loc: r.loc,
    date: r.date,
    stars: r.stars,
    author: r.name,
    avatarSrc: r.avatar,
    images: [{ src: r.img, caption: `${r.service} project in ${r.loc}` }],
    quote: r.quote,
  };
}

export function jobStoryToWork(s: JobStory): WorkItem {
  // `result` is two sentences ("6 push piers driven to bedrock. Foundation
  // stabilized with lifetime warranty."). The first is the headline, the rest
  // is the deck — using the whole string as an H1 ran four lines deep.
  const [head, ...tail] = s.result.split(/\.\s+/);
  return {
    kind: "job-story",
    slug: jobStorySlug(s),
    title: head.replace(/\.$/, ""),
    summary: tail.length ? tail.join(". ") : undefined,
    service: s.service,
    loc: s.loc,
    date: s.date,
    duration: s.duration,
    author: s.name,
    images: [{ src: s.img, caption: `${s.service} — ${s.loc}` }],
    // `result` is already the headline; repeating it as the body read as a
    // duplicated paragraph under "What happened".
    quote: s.quote,
    stats: [[s.duration.split(" ")[0], `${s.duration.split(" ").slice(1).join(" ") || "days"}\non site`]],
  };
}

export function projectToWork(g: GalleryItem): WorkItem {
  return {
    kind: "project-gallery",
    slug: projectSlug(g),
    title: g.label,
    summary: g.whatWeDid,
    service: g.category,
    loc: g.loc,
    date: g.year,
    images: g.images.length ? g.images : [{ src: g.src, caption: g.label }],
    story: g.story,
    products: g.products,
  };
}

/** Service-area map items are generated per city; their id doubles as the slug. */
export function contentItemToWork(item: ContentItem): WorkItem {
  return {
    kind: item.kind,
    slug: item.id,
    title: item.kind === "review" ? `${item.service} in ${item.city}, ${item.state}` : item.title,
    summary: item.kind === "review" ? undefined : item.body,
    service: item.service,
    loc: `${item.city}, ${item.state}`,
    citySlug: item.citySlug,
    stars: item.stars,
    author: item.author,
    avatarSrc: item.avatar,
    images: item.images,
    story: item.story ?? (item.body ? [item.body] : undefined),
    quote: item.quote,
  };
}

// ─── Resolution ───────────────────────────────────────────────────────────────

/** Generated ids look like "<citySlug>-review-3" / "-job-" / "-case-" / "-gallery-". */
const GENERATED = /^(.*)-(review|job|case|gallery)-(\d+)$/;

function resolveGenerated(slug: string): WorkItem | undefined {
  const m = GENERATED.exec(slug);
  if (!m) return undefined;
  const [, citySlug] = m;
  if (!CITY_BY_SLUG[citySlug]) return undefined;
  const item = contentForCityItems(citySlug).find((i) => i.id === slug);
  return item ? contentItemToWork(item) : undefined;
}

/** Look a piece of work up by kind + slug. Returns undefined for bad URLs. */
export function getWorkItem(kind: WorkKind, slug?: string): WorkItem | undefined {
  if (!slug) return undefined;
  switch (kind) {
    case "case-study": {
      const c = CASE_STUDY_BY_SLUG[slug];
      if (c) return caseStudyToWork(c);
      break;
    }
    case "review": {
      const r = REVIEW_BY_SLUG[slug];
      if (r) return reviewToWork(r);
      // Testimonial rails around the site quote the same customers with a
      // slightly different city string; match on the name half of the slug so
      // those links resolve instead of 404ing.
      const byName = ALL_REVIEWS.find((x) => slug.startsWith(reviewSlug(x).split("-").slice(0, 2).join("-")));
      if (byName) return reviewToWork(byName);
      break;
    }
    case "job-story": {
      const s = JOB_STORY_BY_SLUG[slug];
      if (s) return jobStoryToWork(s);
      break;
    }
    case "project-gallery": {
      const g = PROJECT_BY_SLUG[slug];
      if (g) return projectToWork(g);
      break;
    }
  }
  // Fall through to the per-city generated items (service-area map pins).
  return resolveGenerated(slug);
}

/** Path for a work item, ready to hand to `navigate`. */
export const workPath = (kind: WorkKind, slug: string) => `${ROUTE_BY_KIND[kind]}/${slug}`;

/** Three more pieces of the same kind, preferring the same service. */
export function relatedWork(item: WorkItem, count = 3): WorkItem[] {
  const pool: WorkItem[] =
    item.kind === "case-study" ? CASE_STUDIES.map(caseStudyToWork)
    : item.kind === "review" ? ALL_REVIEWS.map(reviewToWork)
    : item.kind === "job-story" ? STORIES.map(jobStoryToWork)
    : GALLERY_ITEMS.map(projectToWork);

  const others = pool.filter((w) => w.slug !== item.slug);
  const sameService = others.filter((w) => w.service === item.service);
  const rest = others.filter((w) => w.service !== item.service);
  return [...sameService, ...rest].slice(0, count);
}
