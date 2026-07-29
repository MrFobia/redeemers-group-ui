// ─── Case studies — shared source of truth ───────────────────────────────────
// Real project case studies. One data model, reused by the Home teaser, the
// Our Difference teaser, and the full case-studies listing page — so all
// three read from the same list and share the same detail modal.
import imgCaseRanch from "../../assets/case-ranch.jpg";
import imgCaseDuplex from "../../assets/case-duplex.jpg";
import imgCaseTownhome from "../../assets/case-townhome.jpg";
import imgFloor01 from "../../assets/floor-01.jpeg";
import imgFloor02 from "../../assets/floor-02.jpeg";
import imgFloor03 from "../../assets/floor-03.jpeg";
import imgFloor04 from "../../assets/floor-04.jpeg";

export type CaseStudy = {
  tag: string;
  loc: string;
  title: string;
  desc: string;
  img: string;
  stats: [string, string][];
  gallery: { img: string; caption: string }[];
  story: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Crawl Space",
    loc: "Memphis, TN",
    title: "East Memphis Ranch Home",
    desc: "SmartJack + full encapsulation. Done in 2 days.",
    img: imgCaseRanch,
    stats: [["2", "Days to\ncomplete"], ["100%", "Moisture\neliminated"], ["∞", "Lifetime\nwarranty"]],
    gallery: [
      { img: imgCaseRanch, caption: "Crawl space before SmartJack installation" },
      { img: imgFloor01, caption: "SmartJack supports installed under the main beam" },
      { img: imgFloor04, caption: "Full vapor barrier encapsulation, job complete" },
    ],
    story: [
      "The homeowner noticed soft spots in the floor and called after a home inspection flagged a sagging main beam and standing moisture in the crawl space.",
      "Our crew installed a SmartJack support system to level the structure, then fully encapsulated the crawl space to stop the moisture at the source.",
      "The job closed out in two days, with the moisture problem eliminated and a transferable lifetime warranty on the repair.",
    ],
  },
  {
    tag: "Foundation",
    loc: "Memphis, TN",
    title: "Midtown Duplex",
    desc: "6 push piers. Clay soil corrected. Lifetime warranty.",
    img: imgCaseDuplex,
    stats: [["6", "Push piers\ninstalled"], ["1", "Day, tenants\nstayed in place"], ["∞", "Lifetime\nwarranty"]],
    gallery: [
      { img: imgCaseDuplex, caption: "Foundation settlement from clay soil movement" },
      { img: imgFloor02, caption: "Push piers driven to load-bearing strata" },
      { img: imgFloor03, caption: "Foundation lifted and stabilized" },
    ],
    story: [
      "A tenant reported sticking doors and visible wall cracks. Inspection confirmed clay soil movement was pulling the foundation down on one corner.",
      "Six push piers were installed to reach load-bearing soil and lift the structure back into position — all in a single day, with tenants able to stay in place throughout.",
      "The foundation is now backed by our transferable lifetime warranty, regardless of future soil movement.",
    ],
  },
  {
    tag: "Concrete",
    loc: "Nashville, TN",
    title: "Nashville Townhome",
    desc: "Interior drainage + sump. Zero water in 3 years.",
    img: imgCaseTownhome,
    stats: [["1", "Day\ninstall"], ["0", "Water intrusions\nsince"], ["3", "Years and\ncounting"]],
    gallery: [
      { img: imgCaseTownhome, caption: "Recurring water intrusion along the basement wall" },
      { img: imgFloor01, caption: "Interior drainage channel installed at the perimeter" },
      { img: imgFloor04, caption: "Sump pump system tied in, basement sealed" },
    ],
    story: [
      "This townhome had standing water in the basement after every heavy rain, despite prior attempts to seal the walls from the outside.",
      "We installed an interior drainage channel around the perimeter, tied into a new sump pump system, to intercept water before it ever reached the living space.",
      "Three years later, the homeowner reports zero water intrusions — even through several major storm seasons.",
    ],
  },
  {
    tag: "Concrete Leveling",
    loc: "Germantown, TN",
    title: "Germantown Pool Deck",
    desc: "PolyLevel injection. Same-day, no demolition.",
    img: imgFloor03,
    stats: [["4", "Hours to\ncomplete"], ["3\"", "Settlement\ncorrected"], ["0", "Demolition\nrequired"]],
    gallery: [
      { img: imgFloor03, caption: "Pool deck sunk 3 inches on one side" },
      { img: imgFloor02, caption: "PolyLevel foam injected beneath the slab" },
      { img: imgFloor04, caption: "Deck leveled and ready for same-day use" },
    ],
    story: [
      "The pool deck had settled three inches on one side, creating a tripping hazard and pooling water against the house.",
      "Rather than break out and repour the slab, our crew used PolyLevel polyurethane foam injection to lift the deck back to level from underneath.",
      "The whole job took four hours, with no demolition and no mess — the deck was back in use that same day.",
    ],
  },
  {
    tag: "Foundation",
    loc: "Collierville, TN",
    title: "Collierville Garage Repair",
    desc: "Helical piers under the garage slab. Cracks closed.",
    img: imgFloor02,
    stats: [["8", "Helical piers\ninstalled"], ["2", "Days to\ncomplete"], ["∞", "Lifetime\nwarranty"]],
    gallery: [
      { img: imgFloor02, caption: "Diagonal cracking across the garage slab" },
      { img: imgFloor01, caption: "Helical piers installed at the corners" },
      { img: imgFloor03, caption: "Slab stabilized, cracks closed" },
    ],
    story: [
      "Diagonal cracks had opened across the garage floor as one corner of the slab settled unevenly over several years.",
      "Eight helical piers were installed at the corners and load points to stabilize the slab and stop further movement.",
      "The cracks closed under load, and the repair carries the same lifetime warranty as our foundation work on the main house.",
    ],
  },
  {
    tag: "Crawl Space",
    loc: "Marked Tree, AR",
    title: "Marked Tree Crawl Space",
    desc: "Full encapsulation + mold remediation in one visit.",
    img: imgFloor04,
    stats: [["1", "Visit for full\nscope"], ["100%", "Moisture\neliminated"], ["∞", "Lifetime\nwarranty"]],
    gallery: [
      { img: imgFloor04, caption: "Active mold on crawl space joists" },
      { img: imgFloor03, caption: "Mold remediation in progress" },
      { img: imgFloor01, caption: "Sealed, dry crawl space — job complete" },
    ],
    story: [
      "What started as a request to fix a bouncy floor turned up active mold on two joists once the crawl space was opened up.",
      "Rather than scheduling a second visit, the crew scoped mold remediation and full encapsulation into the same engagement.",
      "The homeowners now have a sealed, dry crawl space with drainage matting in place to stop the moisture source for good.",
    ],
  },
];
