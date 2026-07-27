// ─── Problem sign definitions ─────────────────────────────────────────────────
// Source of truth for the problem-sign inner pages. Every `label` is copied
// verbatim from the approved sitemap (see data/services.ts SYMPTOM_IMAGES for
// the same label set) — do NOT reword them without a sitemap change.
//
// Structure: a sign never carries its own physics. It points at a FAILURE
// MECHANISM — the thing actually happening under the house — and the mechanism
// supplies the section drawing, the root causes, and the repairable promise.
// Several signs share one mechanism (a sticking door and a stair-step crack are
// the same differential settlement seen from two rooms), so adding a new sign
// is a two-line entry, not a new component.
//
// TODO(content): headlines, ledes, cause prose and site evidence are written to
// the sitemap's structure but are placeholder copy pending the client's content
// matrix. The mechanism → sign mapping is final.

import { getSymptomImage } from "./services";
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

/** Which section drawing the explainer renders. One per mechanism. */
export type DiagramKind =
  | "joist-deflection"
  | "differential-settlement"
  | "lateral-pressure"
  | "hydrostatic"
  | "humidity"
  | "slab-void"
  | "surface-wear";

export type RootCause = {
  title: string;
  /** Short qualifier shown in the outlined chip. */
  tag: string;
  /** Elevation where an inspector finds it — drives the dimension tick. */
  elev: string;
  /** Building layer at that elevation. */
  layer: string;
  desc: string;
  /** What the crew physically sees on site. Keep concrete and checkable. */
  evidence: string;
  img: string;
};

export type Mechanism = {
  id: string;
  /** Left label on the drawing-sheet rule. */
  sheetTitle: string;
  /** Right label on the drawing-sheet rule — the system under discussion. */
  sheetSystem: string;
  diagram: DiagramKind;
  causes: RootCause[];
  /** The "this is fixable" plate at the end of the left column. */
  repairable: { label: string; text: string };
  /** Quiet mono line under the causes. */
  footnote: string;
};

export type ProblemSignDef = {
  slug: string;
  /** Verbatim sitemap label. */
  label: string;
  /** Service slug this sign belongs to — used for breadcrumbs and cross-links. */
  service: string;
  mechanism: string;
  /** Explainer headline, three lines; the third renders in sand. */
  headline: [string, string, string];
  /** Explainer body, one entry per paragraph. */
  lede: [string, string];
  /** Hero sub-headline. Falls back to the opening sentence of the lede. */
  summary?: string;
};

// ─── Failure mechanisms ───────────────────────────────────────────────────────
export const MECHANISMS: Record<string, Mechanism> = {
  "joist-decay": {
    id: "joist-decay",
    sheetTitle: "What's happening underneath",
    sheetSystem: "Crawl space / floor system",
    diagram: "joist-deflection",
    causes: [
      {
        title: "Moisture",
        tag: "The #1 driver",
        elev: "−3'-6\"",
        layer: "Crawl space air / soil",
        desc: "Crawl space humidity causes wood to absorb water, swell, and eventually rot from the inside out.",
        evidence: "Damp soil, condensation on ductwork, a musty smell at the vent.",
        img: imgFloor2,
      },
      {
        title: "Pests",
        tag: "Silent, years long",
        elev: "−1'-8\"",
        layer: "Joist / sill plate",
        desc: "Termites and wood-boring insects hollow out floor joists over years, leaving them unable to bear load.",
        evidence: "Mud tubes on piers, joists that sound hollow when tapped.",
        img: imgCrawlspace,
      },
      {
        title: "Undersized framing",
        tag: "Built to old code",
        elev: "0'-0\"",
        layer: "Finished floor",
        desc: "Older homes often have undersized joists by today's load-bearing standards — designed for lighter loads.",
        evidence: "Long spans with no mid-support, piers spaced 10 ft or wider.",
        img: imgFloor1,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "Joists are fixed from below — your finished floors stay where they are, and most jobs close in a single day.",
    },
    footnote: "Most homes we inspect show two of the three at once.",
  },

  "differential-settlement": {
    id: "differential-settlement",
    sheetTitle: "What's moving below grade",
    sheetSystem: "Footing / bearing soil",
    diagram: "differential-settlement",
    causes: [
      {
        title: "Soil moisture swing",
        tag: "Seasonal, repeating",
        elev: "−4'-0\"",
        layer: "Bearing soil",
        desc: "Clay soils swell when wet and shrink when dry. One side of the house rides that cycle harder than the other, and the footing follows it down.",
        evidence: "Gaps at the foundation edge in summer, doors that bind after heavy rain.",
        img: imgFoundation,
      },
      {
        title: "Poor drainage",
        tag: "Accelerator",
        elev: "0'-0\"",
        layer: "Grade / downspouts",
        desc: "Water discharged next to the foundation washes fines out of the bearing soil, leaving the footing sitting on less than it was designed for.",
        evidence: "Downspouts ending at the wall, soil sloping back toward the house.",
        img: imgCaseRanch,
      },
      {
        title: "Fill or undercompacted soil",
        tag: "Built-in from day one",
        elev: "−6'-0\"",
        layer: "Original fill",
        desc: "Ground that was filled and never properly compacted keeps consolidating for decades under the weight of the structure.",
        evidence: "Movement concentrated on the newer wing or the downhill corner.",
        img: imgCaseDuplex,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "Piers carry the load down to stable soil and hold it there — the movement stops, and the openings come back toward square.",
    },
    footnote: "Cracks are the readout, not the failure. The footing is.",
  },

  "lateral-pressure": {
    id: "lateral-pressure",
    sheetTitle: "What's pushing on the wall",
    sheetSystem: "Foundation wall / backfill",
    diagram: "lateral-pressure",
    causes: [
      {
        title: "Saturated backfill",
        tag: "The #1 driver",
        elev: "−5'-0\"",
        layer: "Backfill against wall",
        desc: "Wet soil weighs far more than dry soil and pushes sideways with it. The wall carries that pressure across its weakest span — the middle.",
        evidence: "Horizontal crack at mid-height, wall damp after storms.",
        img: imgCaseDuplex,
      },
      {
        title: "Frost and freeze-thaw",
        tag: "Winter cycles",
        elev: "−2'-6\"",
        layer: "Upper backfill",
        desc: "Water in the soil expands as it freezes, driving the top of the wall inward a fraction each winter and never letting it back out.",
        evidence: "Movement worst in the upper third of the wall.",
        img: imgFloor4,
      },
      {
        title: "Surcharge load",
        tag: "Often overlooked",
        elev: "0'-0\"",
        layer: "Grade above wall",
        desc: "Driveways, patios, and vehicles parked close to the house add load on top of the backfill, and all of it transfers to the wall.",
        evidence: "Bowing concentrated on the driveway side of the house.",
        img: imgConcrete,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "Anchors and carbon fiber hold the wall against the soil — installed from inside, with no excavation in most cases.",
    },
    footnote: "A bowing wall rarely stops on its own. It stops when it's held.",
  },

  hydrostatic: {
    id: "hydrostatic",
    sheetTitle: "How water is getting in",
    sheetSystem: "Below grade / drainage",
    diagram: "hydrostatic",
    causes: [
      {
        title: "Hydrostatic pressure",
        tag: "The #1 driver",
        elev: "−6'-0\"",
        layer: "Water table",
        desc: "Groundwater rising against the foundation finds the cove joint, tie holes, and cracks — the only path it needs is a hairline.",
        evidence: "Water appearing at the wall-floor joint first, worst after rain.",
        img: imgWaterproofing,
      },
      {
        title: "Failed or missing footing drain",
        tag: "Original system, aged out",
        elev: "−7'-0\"",
        layer: "Footing drain",
        desc: "Perimeter drains silt up and stop carrying water away. Once they're blind, everything they used to move sits against the wall.",
        evidence: "Standing water in the window well, saturated soil at the footing.",
        img: imgCrawlspace,
      },
      {
        title: "Surface water at the wall",
        tag: "Cheapest to fix",
        elev: "0'-0\"",
        layer: "Grade / gutters",
        desc: "Roof runoff and negative grading deliver hundreds of gallons straight to the foundation during a single storm.",
        evidence: "Pooling within 3 ft of the wall, splash staining on the brick.",
        img: imgCaseRanch,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "Interior drainage and a sump give the water a route out — the wall stays dry without excavating the whole perimeter.",
    },
    footnote: "Dry the source first. Sealing a wall from inside never holds alone.",
  },

  humidity: {
    id: "humidity",
    sheetTitle: "Where the moisture comes from",
    sheetSystem: "Crawl space / indoor air",
    diagram: "humidity",
    causes: [
      {
        title: "Open earth floor",
        tag: "The #1 driver",
        elev: "−3'-6\"",
        layer: "Crawl space soil",
        desc: "Bare soil releases gallons of water vapor a day into the crawl space, and the stack effect pulls it up into the rooms above.",
        evidence: "No vapor barrier, or a torn one with soil showing through.",
        img: imgMold,
      },
      {
        title: "Vented crawl space",
        tag: "Outdated code",
        elev: "−2'-0\"",
        layer: "Foundation vents",
        desc: "Open vents were meant to dry the space out. In a humid summer they do the opposite — warm wet air condenses on cool framing.",
        evidence: "Beads of water on ductwork, damp joists near the vents.",
        img: imgCrawlspace,
      },
      {
        title: "Organic material",
        tag: "The fuel",
        elev: "−1'-8\"",
        layer: "Joist / subfloor",
        desc: "Wood framing, paper-faced insulation, and construction debris feed growth as soon as the humidity stays above 60%.",
        evidence: "Fallen insulation, discoloration on the subfloor underside.",
        img: imgInsulation,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "Encapsulation seals the ground and the vents, then a dehumidifier holds the space dry — the smell leaves with the moisture.",
    },
    footnote: "Roughly half the air you breathe upstairs starts down here.",
  },

  "slab-void": {
    id: "slab-void",
    sheetTitle: "What's under the slab",
    sheetSystem: "Slab / sub-base",
    diagram: "slab-void",
    causes: [
      {
        title: "Washed-out sub-base",
        tag: "The #1 driver",
        elev: "−0'-8\"",
        layer: "Sub-base",
        desc: "Water running under the slab carries fine soil away with it, leaving the concrete spanning a void it was never designed to span.",
        evidence: "Hollow sound when tapped, joints open along the drainage path.",
        img: imgConcrete,
      },
      {
        title: "Consolidating fill",
        tag: "First 10 years",
        elev: "−2'-0\"",
        layer: "Backfill",
        desc: "Fill placed during construction keeps compressing under its own weight, dropping the slab that sits on it a little at a time.",
        evidence: "Settlement concentrated over trench lines and utility runs.",
        img: imgCaseDuplex,
      },
      {
        title: "Poor surface drainage",
        tag: "Keeps it going",
        elev: "0'-0\"",
        layer: "Grade / joints",
        desc: "Unsealed joints and grade sloping toward the slab keep feeding water into the sub-base after every repair.",
        evidence: "Open control joints, water tracking toward the low corner.",
        img: imgCaseRanch,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "Polyurethane injection fills the void and lifts the slab back to grade in one visit — no demolition, no replacement.",
    },
    footnote: "Lifting without sealing the water path buys a few seasons, not a fix.",
  },

  "surface-wear": {
    id: "surface-wear",
    sheetTitle: "What the surface is telling you",
    sheetSystem: "Slab / wear layer",
    diagram: "surface-wear",
    causes: [
      {
        title: "Freeze-thaw scaling",
        tag: "The #1 driver",
        elev: "0'-0\"",
        layer: "Wear surface",
        desc: "Water absorbed into the top layer expands as it freezes and pops the surface off in flakes, exposing the aggregate underneath.",
        evidence: "Pitted, flaking surface worst at the edges and joints.",
        img: imgConcrete,
      },
      {
        title: "De-icing salt",
        tag: "Winter damage",
        elev: "−0'-1\"",
        layer: "Wear surface",
        desc: "Salt accelerates the same cycle and attacks the cement paste, so the surface breaks down years faster than the slab below it.",
        evidence: "Damage concentrated where cars park and drip.",
        img: imgFloor2,
      },
      {
        title: "Weak original finish",
        tag: "Built in",
        elev: "−0'-2\"",
        layer: "Placement / cure",
        desc: "Concrete overworked or finished with water on the surface cures with a weak top layer that was never going to last.",
        evidence: "Uniform dusting across an otherwise sound slab.",
        img: imgFloor3,
      },
    ],
    repairable: {
      label: "The repairable part",
      text: "A sound slab doesn't need replacing. Resurfacing and sealing restore the finish for a fraction of a tear-out.",
    },
    footnote: "Check the structure first — ugly and failing are not the same thing.",
  },
};

// ─── Signs ────────────────────────────────────────────────────────────────────
// One entry per sitemap symptom label. Adding a sign = one entry here.
const RAW_SIGNS: Omit<ProblemSignDef, "slug">[] = [
  // ── Structural Repair ──
  {
    label: "Uneven, sloping, or bouncy floors",
    service: "structural-repair",
    mechanism: "joist-decay",
    headline: ["Your floor isn't", "the problem.", "What holds it up is."],
    lede: [
      "Wooden floor joists sit in the crawl space, carrying everything above them. When they absorb moisture over years, they weaken, rot, and stop holding that load — the floor follows them down.",
      "The process is invisible until the symptoms arrive. By the time you feel the bounce or see the slope, the joists have usually been failing for a long time.",
    ],
  },
  {
    label: "Cracks in exterior or interior walls",
    service: "structural-repair",
    mechanism: "differential-settlement",
    headline: ["The crack is", "not the damage.", "It's the readout."],
    lede: [
      "Walls crack where the structure is being pulled apart. One part of the foundation is sitting lower than the rest, and the masonry above splits along the line of least resistance to follow it.",
      "That's why patching never holds. Until the footing stops moving, the same crack reopens — usually within a season or two.",
    ],
  },
  {
    label: "Bowing or leaning walls",
    service: "structural-repair",
    mechanism: "lateral-pressure",
    headline: ["Nothing inside", "moved that wall.", "The soil did."],
    lede: [
      "Wet soil against a foundation wall pushes sideways with thousands of pounds of force. The wall carries that load across its weakest point — the middle of the span — and bows inward.",
      "Movement is slow, seasonal, and cumulative. A wall that has moved once will keep moving every wet winter until something holds it.",
    ],
  },
  {
    label: "Doors or windows that stick",
    service: "structural-repair",
    mechanism: "differential-settlement",
    headline: ["It's not the door.", "The opening", "is out of square."],
    lede: [
      "Door and window frames are built square and stay square as long as the structure under them does. When one part of the foundation settles, the frame racks into a parallelogram and the door binds on the jamb.",
      "Planing the door treats the symptom for a season. The frame keeps moving as long as the footing does.",
    ],
  },
  {
    label: "Separating or tilting chimney",
    service: "structural-repair",
    mechanism: "differential-settlement",
    headline: ["Your chimney", "sits on its own", "footing — and it's moving."],
    lede: [
      "A masonry chimney is heavy and usually carried by a small, shallow footing of its own. When the soil under it gives way, the chimney settles at a different rate than the house and pulls away from the wall.",
      "The gap is the visible part. The safety issue is the flue and the tie-back holding all that masonry to the structure.",
    ],
  },
  {
    label: "Cracks above garage door",
    service: "structural-repair",
    mechanism: "differential-settlement",
    headline: ["The widest span", "in your house", "sits over that door."],
    lede: [
      "The header above a garage opening carries brick and roof load across the longest unsupported span in the wall. When the footing at either end drops, or the lintel corrodes and deflects, the masonry above cracks first.",
      "Those cracks track the movement below. Repointing them without restoring the support underneath just resets the clock.",
    ],
  },
  {
    label: "Sinking Slab",
    service: "structural-repair",
    mechanism: "slab-void",
    headline: ["The slab didn't fail.", "The ground under it", "went missing."],
    lede: [
      "Concrete is strong in compression and weak in bending. As long as it is fully supported, it holds. When water washes the sub-base out from under it, the slab is left spanning a void and starts to drop and crack.",
      "The void keeps growing while the surface still looks intact — which is why the drop often seems to happen suddenly.",
    ],
  },

  // ── Crawl Space Repair ──
  {
    label: "My floors are sagging, bouncy, or buckling.",
    service: "crawl-space-repair",
    mechanism: "joist-decay",
    headline: ["Your floor isn't", "the problem.", "What holds it up is."],
    lede: [
      "Wooden floor joists sit in the crawl space, carrying everything above them. When they absorb moisture over years, they weaken, rot, and stop holding that load — the floor follows them down.",
      "The process is invisible until the symptoms arrive. By the time you feel the bounce or see the slope, the joists have usually been failing for a long time.",
    ],
  },
  {
    label: "The baseboards have separated from the floor.",
    service: "crawl-space-repair",
    mechanism: "joist-decay",
    headline: ["The wall stayed.", "The floor", "dropped away from it."],
    lede: [
      "Baseboard is fastened to the wall, and the wall is carried by the foundation. The floor is carried by joists in the crawl space. When those joists lose support, the floor drops and the trim it was touching stays put.",
      "That gap is a measurement — it tells you roughly how far the floor system has already moved.",
    ],
  },
  {
    label: "My doors won't close properly",
    service: "crawl-space-repair",
    mechanism: "joist-decay",
    headline: ["The door is fine.", "The floor under it", "isn't level anymore."],
    lede: [
      "Interior door frames are set plumb against a level floor. When the joists below settle, the frame tips out of plumb and the door stops meeting the latch — usually in the rooms furthest from a support pier.",
      "Rehanging the door hides it briefly. The floor keeps going until the support underneath is restored.",
    ],
  },

  // ── Waterproofing ──
  {
    label: "Water getting in to basement or other.",
    service: "waterproofing",
    mechanism: "hydrostatic",
    headline: ["Water doesn't", "break in.", "It finds a path."],
    lede: [
      "Groundwater around your foundation is under pressure. It doesn't need a hole — the cove joint where the wall meets the floor, a form tie, or a hairline crack is enough to carry it inside.",
      "The wall isn't failing structurally. It's simply the last thing standing between a saturated soil column and your basement.",
    ],
  },
  {
    label: "Water pooling around house.",
    service: "waterproofing",
    mechanism: "hydrostatic",
    headline: ["What pools outside", "is already", "pushing inside."],
    lede: [
      "Water standing against the foundation is the loading condition every basement leak starts from. It saturates the backfill, raises the pressure on the wall, and looks for the shortest path through.",
      "Fixing it at the surface — grade, gutters, discharge — is the cheapest work we do, and it removes most of the load before it ever reaches the wall.",
    ],
  },
  {
    label: "Damp walls or floor",
    service: "waterproofing",
    mechanism: "hydrostatic",
    headline: ["No puddle,", "no leak —", "and still wet."],
    lede: [
      "Masonry wicks water. When the soil outside stays saturated, moisture moves through the wall by capillary action and evaporates on the inside face, so the surface feels damp without a drop ever running.",
      "That constant transfer feeds mold, ruins finishes, and quietly raises the humidity of the whole house.",
    ],
  },
  {
    label: "Mold & mildew smell",
    service: "waterproofing",
    mechanism: "humidity",
    headline: ["That smell is", "biological.", "Something is feeding."],
    lede: [
      "A musty odor is active microbial growth releasing gases. It needs three things to keep going: moisture, organic material, and time — and a damp crawl space or basement supplies all three.",
      "Air moves upward through a house, so what grows below grade ends up in the air you breathe on the main floor.",
    ],
  },
  {
    label: "White residue on basement walls",
    service: "waterproofing",
    mechanism: "hydrostatic",
    headline: ["That chalk", "is the water's", "return receipt."],
    lede: [
      "Efflorescence is mineral salt left behind when water passes through masonry and evaporates on the inside face. The powder is harmless; what it proves is not.",
      "It confirms active water movement through the wall even on the days the surface looks completely dry.",
    ],
  },
  {
    label: "Standing water in crawlspace",
    service: "waterproofing",
    mechanism: "hydrostatic",
    headline: ["Water down there", "doesn't stay", "down there."],
    lede: [
      "A crawl space holding water is a reservoir sitting directly under your floor system. It rots joists and sill plates from below and evaporates into the rooms above every warm day.",
      "It also means the perimeter drainage has stopped working — the water arriving has nowhere else to go.",
    ],
  },

  // ── Concrete Services ──
  {
    label: "Uneven concrete slabs",
    service: "concrete-services",
    mechanism: "slab-void",
    headline: ["The concrete", "is fine.", "The ground gave out."],
    lede: [
      "Adjacent slabs start life flush. They separate when the soil under one of them compresses or washes away and that slab drops, leaving a lip at the joint.",
      "The slab itself is usually still sound — which is why lifting it back to grade beats replacing it in most cases.",
    ],
  },
  {
    label: "Sinking driveway, walkway, patio",
    service: "concrete-services",
    mechanism: "slab-void",
    headline: ["Flatwork settles", "because the soil", "under it moved."],
    lede: [
      "Driveways and patios sit on backfill that keeps compressing for years, and on soil that water runs through every storm. Both leave the slab spanning ground that is no longer there.",
      "Once a slab is unsupported, normal use does the rest — vehicles and foot traffic crack what the void started.",
    ],
  },
  {
    label: "Cracked or sinking pool deck",
    service: "concrete-services",
    mechanism: "slab-void",
    headline: ["Pool decks sit", "on backfill —", "and backfill keeps sinking."],
    lede: [
      "The ground around a pool was excavated and refilled. That fill consolidates for years afterward, and splash-out water accelerates it, so the deck drops toward the shell.",
      "The result is a lip at the coping, cracked panels, and water running back toward the house instead of away from it.",
    ],
  },
  {
    label: "Sinking slab foundation",
    service: "concrete-services",
    mechanism: "slab-void",
    headline: ["A settling slab", "takes the whole", "house with it."],
    lede: [
      "When the slab a house sits on drops, everything tied to it moves — walls, openings, plumbing penetrations. The slab is not just paving here; it is the foundation.",
      "The cause is the same as any other settled slab: the supporting soil compressed or washed out and the concrete is spanning the difference.",
    ],
  },
  {
    label: "Void under slab",
    service: "concrete-services",
    mechanism: "slab-void",
    headline: ["The damage", "you can't see", "is the void."],
    lede: [
      "A void under concrete is the stage before the crack. The slab still looks level and still carries load — right up until the unsupported span exceeds what the concrete can bridge.",
      "Filling it early is the cheapest repair on this page. Waiting turns it into a lift, a crack repair, or a replacement.",
    ],
  },
  {
    label: "Ugly concrete",
    service: "concrete-services",
    mechanism: "surface-wear",
    headline: ["Worn on top", "doesn't mean", "failed underneath."],
    lede: [
      "Scaling, pitting, and staining live in the top fraction of an inch. The structural slab below is often perfectly sound and fully supported.",
      "That distinction decides the whole job: a sound slab gets resurfaced, a moving one gets lifted first.",
    ],
  },
];

export const slugifySign = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const PROBLEM_SIGNS: ProblemSignDef[] = RAW_SIGNS.map((s) => ({ ...s, slug: slugifySign(s.label) }));

export const DEFAULT_SIGN_SLUG = slugifySign("Uneven, sloping, or bouncy floors");

export function getProblemSign(slug?: string): ProblemSignDef {
  return (
    PROBLEM_SIGNS.find((s) => s.slug === slug) ??
    PROBLEM_SIGNS.find((s) => s.slug === DEFAULT_SIGN_SLUG)!
  );
}

/** Sign resolved by its verbatim sitemap label — for surfaces that only hold the label. */
export function getProblemSignByLabel(label: string): ProblemSignDef | undefined {
  return PROBLEM_SIGNS.find((s) => s.label === label);
}

export function getMechanism(sign: ProblemSignDef): Mechanism {
  return MECHANISMS[sign.mechanism] ?? MECHANISMS["joist-decay"];
}

/** Hero sub-headline. Until the content matrix lands, the first sentence of
 *  the lede is the honest summary — it already states the mechanism. */
export function getSignSummary(sign: ProblemSignDef): string {
  if (sign.summary) return sign.summary;
  const first = sign.lede[0].match(/^.*?[.!?](\s|$)/);
  return (first ? first[0] : sign.lede[0]).trim();
}

/** Hero photo for a sign — reuses the shared symptom image map. */
export function getSignImage(sign: ProblemSignDef): string {
  return getSymptomImage(sign.label);
}
