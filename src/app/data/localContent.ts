// ─────────────────────────────────────────────────────────────────────────────
// LOCAL CONTENT ITEMS — one record per published piece, with a map position.
//
// PLACEHOLDER GENERATION. The counts in CITY_CONTENT are the contract; this file
// expands each count into individual items so the map can drop a pin per piece
// and open a modal for it. When the CMS lands, replace `contentForCityItems`
// with a real query filtered by citySlug — nothing else has to change.
// ─────────────────────────────────────────────────────────────────────────────

import { contentForCity, coordsForCity, CITY_BY_SLUG, type LatLng, type StateAbbr } from "./serviceAreas";
import imgFloor01 from "../../assets/floor-01.jpeg";
import imgFloor02 from "../../assets/floor-02.jpeg";
import imgFloor03 from "../../assets/floor-03.jpeg";
import imgFloor04 from "../../assets/floor-04.jpeg";
import imgRevAvatar from "../../assets/rev-avatar.png";

export type ContentKind = "review" | "job-story" | "case-study" | "project-gallery";

export type ContentItem = {
  id: string;
  kind: ContentKind;
  citySlug: string;
  city: string;
  state: StateAbbr;
  county: string;
  pos: LatLng;
  service: string;
  title: string;
  /** Gallery shown in the modal. */
  images: { src: string; caption: string }[];
  meta: string;
  /** Job story / project gallery: what was done. */
  body?: string;
  /** Review + job story: customer words. */
  quote?: string;
  author?: string;
  avatar?: string;
  stars?: number;
  /** Case study: multi-paragraph write-up. */
  story?: string[];
};

const IMGS = [imgFloor01, imgFloor02, imgFloor03, imgFloor04];

export const KIND_META: Record<ContentKind, { label: string; accent: string }> = {
  "review":          { label: "Review",          accent: "#4ADE80" },
  "job-story":       { label: "Job Story",       accent: "#C4AB6C" },
  "case-study":      { label: "Case Study",      accent: "#A78BFA" },
  "project-gallery": { label: "Project Gallery", accent: "#60A5FA" },
};

// ─── Template pools ───────────────────────────────────────────────────────────
const REVIEWS = [
  { author: "Victoria E.", stars: 5, service: "Foundation", quote: "Joe was very thorough with explaining everything and even came back a second time to clarify. I called three other companies — Redeemers gave me confidence." },
  { author: "Elizabeth N.", stars: 5, service: "Concrete", quote: "The crew were excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new." },
  { author: "Marcus B.", stars: 5, service: "Crawl Space", quote: "Our energy bills dropped the first month and the musty smell is completely gone. Highly recommend to any homeowner around here." },
  { author: "Diana P.", stars: 5, service: "Waterproofing", quote: "The inspector found water intrusion I didn't even know I had. Fixed it before it became a major problem. Grateful for the thoroughness." },
  { author: "Thomas R.", stars: 5, service: "Concrete", quote: "They fixed it in one morning and it looks better than it did when it was new. Fair price, no surprises on the invoice." },
  { author: "Linda H.", stars: 5, service: "Waterproofing", quote: "On time every day, kept me informed of every step, and the basement has been dry through two major storms since." },
  { author: "David K.", stars: 5, service: "Foundation", quote: "The crack in my living room wall had been growing for two years. They diagnosed the cause correctly and fixed it permanently." },
  { author: "Sandra M.", stars: 5, service: "Crawl Space", quote: "After two flooded seasons I finally have a dry space. Professional team, and they cleaned up everything when they were done." },
];

const JOB_STORIES = [
  { title: "Push piers driven to bedrock", service: "Foundation", duration: "1 day", body: "Clay soil movement confirmed after three contractors disagreed on the cause. Six steel piers installed and the foundation stabilized under a lifetime transferable warranty.", quote: "They explained it clearly, showed me the evidence, and fixed it the right way." },
  { title: "SmartJack system and full encapsulation", service: "Crawl Space", duration: "2 days", body: "Soft spots in the floor turned out to be six broken joists plus active mold. Joists sistered, SmartJacks set, and the crawl space sealed end to end.", quote: "I could feel the difference the first morning I walked in. No more bounce, no more smell." },
  { title: "Interior drainage and dual sump pumps", service: "Waterproofing", duration: "3 days", body: "Perimeter drainage channel tied into a dual sump system with battery backup, plus wall panels to keep the finished space dry.", quote: "It has stayed dry through every storm since, including a week of heavy rain." },
  { title: "Driveway slab foam-leveled", service: "Concrete", duration: "4 hours", body: "A three-inch void under the slab was filled with expanding polyurethane and the surface lifted back to level. No demolition needed.", quote: "Back in use the same afternoon and it drains away from the house now." },
  { title: "Bowing wall stabilized with anchors", service: "Foundation", duration: "1 day", body: "Wall anchor system installed to stop lateral movement. No yard excavation required and the wall has held position since.", quote: "We were terrified about the cost. The free inspection made everything clear." },
  { title: "Mold remediation with source correction", service: "Mold", duration: "2 days", body: "Active growth on two joists treated, the moisture source corrected, and the space encapsulated so it cannot come back.", quote: "Air quality testing came back clean. They found something I never would have." },
];

const CASE_STUDIES = [
  {
    title: "150-year-old home, full encapsulation", service: "Crawl Space",
    story: [
      "The homeowner had lived with buckling antique hardwood for two winters before calling. Moisture readings under the floor were off the scale.",
      "We installed a CleanSpace moisture barrier, a SmartSump pump and a SaniDry dehumidifier, sealing the space and giving the water somewhere to go.",
      "The floors stopped moving within the season and the system carries a transferable warranty for the next owner.",
    ],
  },
  {
    title: "Remodel uncovers a failing crawl space", service: "Crawl Space",
    story: [
      "The customer was midway through remodeling when the contractors pulled up the flooring and found the crawl space below in far worse shape than anyone expected.",
      "We scoped drainage, encapsulation and joist repair into a single visit so the remodel could continue on schedule.",
      "The remodel finished on time and the structural work stayed inside the original quote.",
    ],
  },
  {
    title: "Pool deck lifted without demolition", service: "Concrete",
    story: [
      "One side of the pool deck had settled three inches, leaving a lip that was both a trip hazard and a drainage problem.",
      "Polyurethane foam was injected through small ports and the slab raised back to level in a single morning.",
      "No demolition, no replacement pour, and the deck was usable again the same day.",
    ],
  },
  {
    title: "Commercial warehouse kept operating", service: "Commercial",
    story: [
      "Sixteen push piers were needed under a working warehouse where downtime was not an option.",
      "We sequenced the work around the client's production schedule, keeping the floor open throughout.",
      "Production never stopped and the building has held level since the piers were set.",
    ],
  },
  {
    title: "Wet basement to finished living space", service: "Waterproofing",
    story: [
      "Two floods in two years had written off the basement entirely for this family.",
      "Interior drainage, a dual sump with battery backup and full wall panels turned it into dry, usable square footage.",
      "They finished the space the following year and it has stayed dry since.",
    ],
  },
];

const GALLERY = [
  { title: "Brick wall with visible cracking", service: "Foundation", body: "Stair-step cracking through the mortar joints, photographed before and after the pier install." },
  { title: "Gap between window frame and brick", service: "Foundation", body: "Separation at the window header closed up once the foundation was lifted back to level." },
  { title: "Crawl space before encapsulation", service: "Crawl Space", body: "Standing water and a torn vapor barrier, documented at the initial inspection." },
  { title: "Sealed and dry crawl space", service: "Crawl Space", body: "The same space after barrier, drainage matting and dehumidifier were installed." },
  { title: "Sunken driveway slab", service: "Concrete", body: "Three inches of settlement with water pooling against the garage." },
  { title: "Interior drainage channel", service: "Waterproofing", body: "Perimeter channel cut and tied into the sump discharge line." },
];

// ─── Deterministic helpers ────────────────────────────────────────────────────
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Scatter a pin a few hundred metres off the city centre so markers don't stack. */
function scatter(base: LatLng, seed: number): LatLng {
  const a = (seed % 360) * (Math.PI / 180);
  const r = 0.012 + ((seed % 7) * 0.006);
  return [base[0] + Math.sin(a) * r, base[1] + Math.cos(a) * r * 1.2];
}

function galleryFor(seed: number, count: number, caption: string) {
  return Array.from({ length: count }, (_, i) => ({
    src: IMGS[(seed + i) % IMGS.length],
    caption: i === 0 ? caption : `${caption} — view ${i + 1}`,
  }));
}

// ─── Expansion ────────────────────────────────────────────────────────────────
/** All published items for a city, ready to pin on the map. */
export function contentForCityItems(citySlug: string): ContentItem[] {
  const counts = contentForCity(citySlug);
  const base = coordsForCity(citySlug);
  const city = CITY_BY_SLUG[citySlug];
  if (!counts || !base || !city) return [];

  const seed = hash(citySlug);
  const items: ContentItem[] = [];
  const common = { citySlug, city: city.name, state: city.state, county: city.county };

  for (let i = 0; i < counts.reviews; i++) {
    const t = REVIEWS[(seed + i) % REVIEWS.length];
    items.push({
      ...common, id: `${citySlug}-review-${i}`, kind: "review",
      pos: scatter(base, seed + i * 37), service: t.service,
      title: t.author, author: t.author, stars: t.stars, quote: t.quote,
      avatar: imgRevAvatar,
      images: galleryFor(seed + i, 1, `${t.service} project in ${city.name}`),
      meta: `${t.stars} stars · Verified customer`,
    });
  }

  for (let i = 0; i < counts.jobStories; i++) {
    const t = JOB_STORIES[(seed + i) % JOB_STORIES.length];
    items.push({
      ...common, id: `${citySlug}-job-${i}`, kind: "job-story",
      pos: scatter(base, seed + 100 + i * 53), service: t.service,
      title: t.title, body: t.body, quote: t.quote,
      images: galleryFor(seed + i + 1, 2, `${t.title} — ${city.name}, ${city.state}`),
      meta: `${t.duration} on site`,
    });
  }

  for (let i = 0; i < counts.caseStudies; i++) {
    const t = CASE_STUDIES[(seed + i) % CASE_STUDIES.length];
    items.push({
      ...common, id: `${citySlug}-case-${i}`, kind: "case-study",
      pos: scatter(base, seed + 200 + i * 71), service: t.service,
      title: t.title, story: t.story,
      images: galleryFor(seed + i + 2, 3, `${t.title} — ${city.name}, ${city.state}`),
      meta: `Case study · ${city.name}, ${city.state}`,
    });
  }

  for (let i = 0; i < counts.projectGallery; i++) {
    const t = GALLERY[(seed + i) % GALLERY.length];
    items.push({
      ...common, id: `${citySlug}-gallery-${i}`, kind: "project-gallery",
      pos: scatter(base, seed + 300 + i * 91), service: t.service,
      title: t.title, body: t.body,
      images: galleryFor(seed + i + 3, 3, t.title),
      meta: `Project gallery · ${city.name}, ${city.state}`,
    });
  }

  return items;
}
