// ─── Service definitions ──────────────────────────────────────────────────────
// Source of truth: approved sitemap FigJam "Sitemap Redeemers Group - 23 April"
// (node 349:2340). Every `label`/`q`/`title` string below is copied verbatim
// from the sitemap nodes — do NOT reword them without a sitemap change.
//
// TODO(content): the sitemap defines structure only. Every `a`, `blurb`,
// `costRanges`, `costIntro` and `faqs` entry is placeholder copy pending the
// client's content matrix. Titles are final; prose is not.

import imgFoundation from "../../assets/svc-foundation.jpg";
import imgCrawlspace from "../../assets/svc-crawlspace.jpg";
import imgWaterproofing from "../../assets/svc-waterproofing.jpg";
import imgConcrete from "../../assets/svc-concrete.jpg";
import imgMold from "../../assets/svc-mold.jpg";
import imgInsulation from "../../assets/svc-insulation.jpg";
import imgFloor1 from "../../assets/floor-01.jpeg";
import imgFloor2 from "../../assets/floor-02.jpeg";
import imgFloor3 from "../../assets/floor-03.jpeg";
import imgFloor4 from "../../assets/floor-04.jpeg";
import imgCaseDuplex from "../../assets/case-duplex.jpg";
import imgCaseRanch from "../../assets/case-ranch.jpg";
import imgCaseTownhome from "../../assets/case-townhome.jpg";
import iconFoundation from "../../assets/icons/icon-foundation.svg";
import iconCrawlspace from "../../assets/icons/icon-crawlspace.svg";
import iconWaterproofing from "../../assets/icons/icon-waterproofing.svg";
import iconConcrete from "../../assets/icons/icon-concrete.svg";

export type Symptom = { id: string; q: string; a: string; img: string };
export type Solution = { title: string; blurb: string; img: string; note?: string };
export type CostRange = { label: string; range: string; pct: number };
export type Faq = { q: string; a: string };
export type ServiceTab = { id: string; label: string };

export type ServiceDef = {
  slug: string;
  /** Sitemap node label — also the breadcrumb + eyebrow text. */
  name: string;
  iconImg: string | null;
  heroImg: string;
  heroHeadline: string;
  /** Sitemap: "Problem Signs" child. Empty for services with no symptom entry point. */
  symptoms: Symptom[];
  solutionsHeadline: string;
  solutions: Solution[];
  /** Sitemap: "Cost guide" child. null = service has no cost guide node. */
  cost: { headline: string; intro: string; ranges: CostRange[]; calloutLabel: string; calloutValue: string } | null;
  faqs: Faq[];
  ctaHeadline: string;
  tabs: ServiceTab[];
};

// ─── Symptom imagery ──────────────────────────────────────────────────────────
// Homeowners identify their problem by sight, not by reading — every symptom
// surface on the site shows a photo, keyed off the sitemap symptom label so
// components that only hold the label string (ProblemSignsPage,
// ProblemSignInnerPage) resolve the same image as the service pages.
// TODO(content): these are stand-ins from the existing asset pool and repeat
// across symptoms. Replace with the client's real per-symptom photos — the
// whole point of the module is visual recognition.
export const SYMPTOM_IMAGES: Record<string, string> = {
  // Structural Repair
  "Uneven, sloping, or bouncy floors": imgFloor1,
  "Cracks in exterior or interior walls": imgFoundation,
  "Bowing or leaning walls": imgCaseDuplex,
  "Doors or windows that stick": imgCaseTownhome,
  "Separating or tilting chimney": imgCaseRanch,
  "Cracks above garage door": imgFloor2,
  "Sinking Slab": imgConcrete,
  // Crawl Space Repair
  "My floors are sagging, bouncy, or buckling.": imgFloor1,
  "The baseboards have separated from the floor.": imgFloor3,
  "My doors won't close properly": imgCaseTownhome,
  // Waterproofing
  "Water getting in to basement or other.": imgWaterproofing,
  "Water pooling around house.": imgCaseRanch,
  "Damp walls or floor": imgFloor4,
  "Mold & mildew smell": imgMold,
  "White residue on basement walls": imgFloor2,
  "Standing water in crawlspace": imgCrawlspace,
  // Concrete Services
  "Uneven concrete slabs": imgConcrete,
  "Sinking driveway, walkway, patio": imgCaseDuplex,
  "Cracked or sinking pool deck": imgCaseTownhome,
  "Sinking slab foundation": imgFoundation,
  "Void under slab": imgFloor2,
  "Ugly concrete": imgCaseRanch,
};

/** Photo for a symptom label. Falls back to a generic shot for labels that
 *  predate the sitemap (older pages still carry a few shortened variants). */
export function getSymptomImage(label: string): string {
  return SYMPTOM_IMAGES[label] ?? imgInsulation;
}

const SHARED_FAQS: Faq[] = [
  {
    q: "Do you offer financing?",
    a: "Yes. We work with trusted lenders to make repairs affordable. Flexible terms and competitive rates are available for qualified homeowners. Ask about options during your free inspection.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve communities across Tennessee, Arkansas, Mississippi, and Missouri — including Memphis, Nashville, Jackson, Southaven, Little Rock, Jonesboro, Springfield, and Cape Girardeau. Contact us to confirm your location.",
  },
  {
    q: "Are your installers certified?",
    a: "Every installer is trained and certified in our methods. We stand behind their work with a lifetime transferable warranty. Your home is in capable hands.",
  },
  {
    q: "Will my homeowner's insurance cover this?",
    a: "Coverage depends on your policy and the cause of damage. We'll provide detailed documentation to help with your claim. Some repairs — especially water damage — may be partially covered.",
  },
];

// Sitemap tab set for the four residential services: Problem Signs, Cost guide,
// Project gallery, FAQs (+ Overview as the page entry point).
const RESIDENTIAL_TABS: ServiceTab[] = [
  { id: "overview", label: "Overview" },
  { id: "signs", label: "Problem Signs" },
  { id: "cost", label: "Cost Guide" },
  { id: "gallery", label: "Project Gallery" },
  { id: "faq", label: "FAQs" },
];

export const SERVICES: Record<string, ServiceDef> = {
  // ── Structural Repair ──────────────────────────────────────────────────────
  // Sitemap 349:2544 → Slab repair, Crawlspace / joist repair, Garage Lintel
  // repair, Wall stabilization, Problem Signs, Cost guide, Photo Gallery, FAQs.
  "structural-repair": {
    slug: "structural-repair",
    name: "Structural Repair",
    iconImg: iconFoundation,
    heroImg: imgFoundation,
    heroHeadline: "Is your home showing\nthese signs?",
    symptoms: [
      { id: "s1", q: "Uneven, sloping, or bouncy floors", a: "Floors that slope or flex usually mean the structure below has lost support — settled footings, failing piers, or damaged joists. We stabilize the support system and lift the floor back toward level." , img: SYMPTOM_IMAGES["Uneven, sloping, or bouncy floors"] },
      { id: "s2", q: "Cracks in exterior or interior walls", a: "Stair-step cracks in brick and diagonal cracks above openings point to differential settlement. We anchor and stabilize the wall, then address the soil movement causing it." , img: SYMPTOM_IMAGES["Cracks in exterior or interior walls"] },
      { id: "s3", q: "Bowing or leaning walls", a: "Lateral soil pressure pushes foundation walls inward. Wall anchors or carbon fiber straps stop the movement and, in many cases, recover some of the original position." , img: SYMPTOM_IMAGES["Bowing or leaning walls"] },
      { id: "s4", q: "Doors or windows that stick", a: "When frames rack out of square, doors and windows bind. It's a symptom of foundation movement, not a carpentry problem — we correct the structure so the openings sit square again." , img: SYMPTOM_IMAGES["Doors or windows that stick"] },
      { id: "s5", q: "Separating or tilting chimney", a: "A chimney pulling away from the house has its own settling footing. We underpin and re-tie it to the structure before the separation becomes a safety issue." , img: SYMPTOM_IMAGES["Separating or tilting chimney"] },
      { id: "s6", q: "Cracks above garage door", a: "The header above a garage opening carries a long span with little support. Lintel repair restores that carrying capacity and closes the crack path." , img: SYMPTOM_IMAGES["Cracks above garage door"] },
      { id: "s7", q: "Sinking Slab", a: "A slab that has dropped is sitting over voided or compressed soil. We fill the void and lift the slab back to grade, then seal the joints against water re-entry." , img: SYMPTOM_IMAGES["Sinking Slab"] },
    ],
    solutionsHeadline: "Structural Solutions",
    solutions: [
      { title: "Slab Repair", blurb: "Settled and cracked slabs get lifted back to grade and re-supported, so the floor above stops moving and the cracks stop spreading.", img: imgFoundation },
      { title: "Crawlspace / Joist Repair", blurb: "Damaged joists and failing piers under the home are repaired or replaced to restore a firm, level floor and stop the bounce at its source.", img: imgCrawlspace },
      { title: "Garage Lintel Repair", blurb: "The steel lintel over your garage opening carries a long span. We replace or reinforce it so the brick above stops cracking and shifting.", img: imgFloor2 },
      { title: "Wall Stabilization", blurb: "Wall anchors and carbon fiber reinforcement stop bowing and leaning foundation walls, holding them against the soil pressure that moved them.", img: imgFloor1 },
    ],
    cost: {
      headline: "How much does structural repair cost?",
      intro: "Typical range: $4,000 – $25,000 depending on the extent of movement and the repair method. We'll give you an exact number after your free inspection — no obligation.",
      ranges: [
        { label: "Crack & lintel repair", range: "$1,500 – $4,000", pct: 25 },
        { label: "Wall stabilization", range: "$4,000 – $9,000", pct: 50 },
        { label: "Slab lift & re-support", range: "$7,000 – $15,000", pct: 75 },
        { label: "Full foundation underpinning", range: "$15,000 – $25,000+", pct: 100 },
      ],
      calloutLabel: "Cost breakdown",
      calloutValue: "Most homeowners spend\n$7,000 – $15,000",
    },
    faqs: [
      { q: "How long does structural repair take?", a: "Most stabilization jobs take 2–4 days. Larger underpinning projects can run a week. We'll give you a specific timeline during your inspection." },
      ...SHARED_FAQS,
    ],
    ctaHeadline: "Ready to stabilize\nyour foundation?",
    tabs: RESIDENTIAL_TABS,
  },

  // ── Crawl Space Repair ─────────────────────────────────────────────────────
  // Sitemap 349:2543 → Floor joist replacement, Floor joist repair/stabilization,
  // Encapsulation systems, Moisture & Mold Prevention, Lumberkote, Problem Signs,
  // Cost guide, Project gallery, FAQ.
  "crawl-space-repair": {
    slug: "crawl-space-repair",
    name: "Crawl Space Repair",
    iconImg: iconCrawlspace,
    heroImg: imgCrawlspace,
    heroHeadline: "Is your home showing\nthese signs?",
    symptoms: [
      { id: "s1", q: "My floors are sagging, bouncy, or buckling.", a: "This typically means the joists or support beams under your floor have lost strength or support. We repair or replace the failing members and re-support the span so the floor stops moving." , img: SYMPTOM_IMAGES["My floors are sagging, bouncy, or buckling."] },
      { id: "s2", q: "The baseboards have separated from the floor.", a: "A gap opening between baseboard and floor means the floor system is dropping away from the wall. It's a structural symptom, not a trim problem — we lift and re-support the floor first." , img: SYMPTOM_IMAGES["The baseboards have separated from the floor."] },
      { id: "s3", q: "My doors won't close properly", a: "When the floor system settles, door frames rack out of square and stop latching. Correcting the support below brings the openings back into alignment." , img: SYMPTOM_IMAGES["My doors won't close properly"] },
    ],
    solutionsHeadline: "Crawl Space Solutions",
    solutions: [
      { title: "Floor Joist Replacement", blurb: "Joists too far gone to save are fully replaced, restoring the original structural capacity of the floor system above your crawl space.", img: imgFloor1 },
      { title: "Floor Joist Repair/Stabilization", blurb: "When joists are sound but losing support, we sister them and add support beams to stop the flex and restore a firm, level floor.", img: imgFloor3 },
      { title: "Encapsulation Systems", blurb: "Heavy-duty vapor barriers seal moisture out of the crawl space permanently, improving air quality and protecting the structure year-round.", img: imgCrawlspace },
      { title: "Moisture & Mold Prevention", blurb: "We find the moisture source, treat existing growth, and install prevention systems so the problem never returns to your crawl space.", img: imgMold },
      { title: "Lumberkote", blurb: "A protective wood treatment applied to crawl space framing, shielding joists and beams from moisture, rot, and fungal growth.", img: imgInsulation },
    ],
    cost: {
      headline: "How much does crawl space repair cost?",
      intro: "Typical range: $3,000 – $18,000 depending on size and damage level. We'll give you an exact number after your free inspection — no obligation.",
      ranges: [
        { label: "Basic Moisture Control", range: "$1,500 – $3,500", pct: 25 },
        { label: "Partial Encapsulation", range: "$3,500 – $6,000", pct: 50 },
        { label: "Full Encapsulation + Drainage", range: "$6,000 – $10,000", pct: 75 },
        { label: "Joist Replacement + Encapsulation", range: "$10,000 – $18,000", pct: 100 },
      ],
      calloutLabel: "Cost breakdown",
      calloutValue: "Most homeowners spend\n$6,000 – $10,000",
    },
    faqs: [
      { q: "How long does crawl space repair take?", a: "Most repairs take 1–2 days. Full encapsulation on larger spaces may take 2–3 days. We'll give you a specific timeline during your inspection." },
      ...SHARED_FAQS,
    ],
    ctaHeadline: "Ready to fix your\ncrawl space?",
    tabs: RESIDENTIAL_TABS,
  },

  // ── Waterproofing ──────────────────────────────────────────────────────────
  // Sitemap 349:2542 → Interior solutions, Exterior solutions, Problem Signs,
  // Cost guide, Project gallery, FAQs.
  "waterproofing": {
    slug: "waterproofing",
    name: "Waterproofing",
    iconImg: iconWaterproofing,
    heroImg: imgWaterproofing,
    heroHeadline: "Is water getting\ninto your home?",
    symptoms: [
      { id: "s1", q: "Water getting in to basement or other.", a: "Water entering through walls, joints, or the floor means hydrostatic pressure has found a path. Interior drainage plus a sump system gives that water somewhere to go before it reaches your living space." , img: SYMPTOM_IMAGES["Water getting in to basement or other."] },
      { id: "s2", q: "Water pooling around house.", a: "Standing water against the foundation is the source of most basement leaks. Exterior grading, drainage, and downspout management move it away before it can push inward." , img: SYMPTOM_IMAGES["Water pooling around house."] },
      { id: "s3", q: "Damp walls or floor", a: "Persistent dampness without visible water means moisture is wicking through the masonry. Vapor barriers and drainage stop the transfer at the wall." , img: SYMPTOM_IMAGES["Damp walls or floor"] },
      { id: "s4", q: "Mold & mildew smell", a: "A musty smell is active microbial growth feeding on moisture. We remove the water source first, then treat what's already growing." , img: SYMPTOM_IMAGES["Mold & mildew smell"] },
      { id: "s5", q: "White residue on basement walls", a: "That chalky deposit is efflorescence — mineral salts left behind as water passes through the wall. It confirms active water movement even when the wall looks dry." , img: SYMPTOM_IMAGES["White residue on basement walls"] },
      { id: "s6", q: "Standing water in crawlspace", a: "Water sitting in a crawl space rots framing and feeds mold above it. Drainage, a sump, and encapsulation keep the space dry permanently." , img: SYMPTOM_IMAGES["Standing water in crawlspace"] },
    ],
    solutionsHeadline: "Waterproofing Solutions",
    solutions: [
      { title: "Interior Solutions", blurb: "Interior drainage channels, sump pump systems, and vapor barriers capture water at the wall and floor joint and discharge it away from the home.", img: imgWaterproofing },
      { title: "Exterior Solutions", blurb: "Exterior membranes, footing drains, grading, and downspout extensions keep water away from the foundation before it ever reaches the wall.", img: imgFloor4 },
    ],
    cost: {
      headline: "How much does waterproofing cost?",
      intro: "Typical range: $3,000 – $15,000 depending on the water source and whether the fix is interior, exterior, or both. We'll give you an exact number after your free inspection.",
      ranges: [
        { label: "Sump pump system", range: "$1,500 – $3,500", pct: 25 },
        { label: "Interior drainage system", range: "$4,000 – $8,000", pct: 50 },
        { label: "Exterior drainage & grading", range: "$6,000 – $12,000", pct: 75 },
        { label: "Full interior + exterior system", range: "$12,000 – $15,000+", pct: 100 },
      ],
      calloutLabel: "Cost breakdown",
      calloutValue: "Most homeowners spend\n$4,000 – $8,000",
    },
    faqs: [
      { q: "How long does a waterproofing job take?", a: "Interior systems are usually installed in 1–2 days. Exterior excavation work runs longer depending on access and weather. We'll give you a specific timeline during your inspection." },
      ...SHARED_FAQS,
    ],
    ctaHeadline: "Ready to keep water\nout for good?",
    tabs: RESIDENTIAL_TABS,
  },

  // ── Concrete Services ──────────────────────────────────────────────────────
  // Sitemap 349:2550 → Lifting & leveling, Crack & joint repair, Concrete
  // protection systems, Decorative Finishing, Resurfacing needs, Problem Signs,
  // Cost guide, Project gallery, FAQ.
  "concrete-services": {
    slug: "concrete-services",
    name: "Concrete Services",
    iconImg: iconConcrete,
    heroImg: imgConcrete,
    heroHeadline: "Is your concrete\nsinking or cracking?",
    symptoms: [
      { id: "s1", q: "Uneven concrete slabs", a: "Slabs that no longer sit flush with each other have settled over soft or washed-out soil. Lifting restores the original grade and removes the trip hazard." , img: SYMPTOM_IMAGES["Uneven concrete slabs"] },
      { id: "s2", q: "Sinking driveway, walkway, patio", a: "Exterior flatwork settles when the soil beneath compresses or erodes. We fill the void and raise the slab back to level — no tear-out required." , img: SYMPTOM_IMAGES["Sinking driveway, walkway, patio"] },
      { id: "s3", q: "Cracked or sinking pool deck", a: "Pool decks sit on backfilled soil that keeps settling for years. Lifting and joint sealing bring the deck back to grade and keep water out of the sub-base." , img: SYMPTOM_IMAGES["Cracked or sinking pool deck"] },
      { id: "s4", q: "Sinking slab foundation", a: "A settling slab foundation affects everything above it. We stabilize the supporting soil and lift the slab, then address the drainage that caused the loss." , img: SYMPTOM_IMAGES["Sinking slab foundation"] },
      { id: "s5", q: "Void under slab", a: "An unsupported slab will crack under normal loads. Injection fills the void so the slab is fully bearing again before damage develops." , img: SYMPTOM_IMAGES["Void under slab"] },
      { id: "s6", q: "Ugly concrete", a: "Sound but stained, spalled, or dated concrete doesn't need replacing. Resurfacing and decorative finishes restore the look at a fraction of the cost." , img: SYMPTOM_IMAGES["Ugly concrete"] },
    ],
    solutionsHeadline: "Concrete Solutions",
    solutions: [
      { title: "Lifting & Leveling", blurb: "Polyurethane injection fills the void under a settled slab and raises it back to grade in a single visit — no demolition, no replacement.", img: imgConcrete },
      { title: "Crack & Joint Repair", blurb: "Cracks and control joints get cleaned and sealed so water stops reaching the sub-base and washing out the support underneath.", img: imgFloor2 },
      { title: "Concrete Protection Systems", blurb: "Penetrating sealers and coatings shield concrete from water, salt, and freeze-thaw cycles, extending the life of the slab.", img: imgFloor4 },
      { title: "Decorative Finishing", blurb: "Overlays, stains, and textured finishes bring a fresh, finished look to concrete that is structurally sound but visually worn.", img: imgCaseTownhome, note: "Launching later this year" },
      { title: "Resurfacing Needs", blurb: "Spalled and pitted surfaces are resurfaced to a smooth, uniform finish — restoring the slab without the cost of a full replacement.", img: imgCaseRanch, note: "Launching later this year" },
    ],
    cost: {
      headline: "How much does concrete repair cost?",
      intro: "Typical range: $1,000 – $10,000 depending on the square footage lifted and the finish work involved. We'll give you an exact number after your free inspection.",
      ranges: [
        { label: "Crack & joint repair", range: "$500 – $1,500", pct: 25 },
        { label: "Single slab lift", range: "$1,500 – $3,500", pct: 50 },
        { label: "Driveway or patio leveling", range: "$3,500 – $7,000", pct: 75 },
        { label: "Full lift + protection system", range: "$7,000 – $10,000+", pct: 100 },
      ],
      calloutLabel: "Cost breakdown",
      calloutValue: "Most homeowners spend\n$1,500 – $3,500",
    },
    faqs: [
      { q: "How long does concrete lifting take?", a: "Most lifting jobs are done in a single day, and you can walk on the slab within an hour of the injection. We'll confirm the timeline during your inspection." },
      ...SHARED_FAQS,
    ],
    ctaHeadline: "Ready to level\nyour concrete?",
    tabs: RESIDENTIAL_TABS,
  },

  // ── Commercial Services ────────────────────────────────────────────────────
  // Sitemap 349:2548 → Overview, Structural, Concrete Lifting/Leveling,
  // Waterproofing, Commercial project gallery, Request bid.
  // No Problem Signs and no Cost guide node — this page drops both tabs and
  // ends on a bid request instead of a symptom CTA.
  "commercial-services": {
    slug: "commercial-services",
    name: "Commercial Services",
    iconImg: null,
    heroImg: imgCaseDuplex,
    heroHeadline: "Structural repair for\ncommercial properties.",
    symptoms: [],
    solutionsHeadline: "Commercial Solutions",
    solutions: [
      { title: "Structural", blurb: "Foundation stabilization, underpinning, and wall reinforcement for commercial buildings — scheduled around your operations, not the other way around.", img: imgFoundation },
      { title: "Concrete Lifting/Leveling", blurb: "Warehouse floors, loading docks, and parking areas lifted back to grade with minimal downtime and no demolition.", img: imgConcrete },
      { title: "Waterproofing", blurb: "Below-grade waterproofing and drainage systems that protect inventory, equipment, and finished commercial space from water intrusion.", img: imgWaterproofing },
    ],
    cost: null,
    faqs: [
      { q: "Do you work around business hours?", a: "Yes. Commercial work is scheduled around your operating hours — including nights and weekends — to keep disruption to a minimum." },
      { q: "Can you handle multi-property portfolios?", a: "Yes. We work with property managers and owners across multiple sites, with consolidated scheduling and reporting." },
      ...SHARED_FAQS.slice(1),
    ],
    ctaHeadline: "Ready to request\na bid?",
    tabs: [
      { id: "overview", label: "Overview" },
      { id: "solutions", label: "Solutions" },
      { id: "gallery", label: "Project Gallery" },
      { id: "faq", label: "FAQs" },
    ],
  },
};

export const DEFAULT_SERVICE_SLUG = "crawl-space-repair";

export function getService(slug?: string): ServiceDef {
  return SERVICES[slug ?? ""] ?? SERVICES[DEFAULT_SERVICE_SLUG];
}

/** Nav/landing order — matches the sitemap's Services node order. */
export const SERVICE_ORDER = [
  "structural-repair",
  "crawl-space-repair",
  "waterproofing",
  "concrete-services",
  "commercial-services",
];
