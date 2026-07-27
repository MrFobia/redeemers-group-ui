import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { getSymptomImage, getService } from "./data/services";
import {
  getProblemSign,
  getMechanism,
  getSignImage,
  getSignSummary,
  type DiagramKind,
  type ProblemSignDef,
} from "./data/problemSigns";
import SharedNavBar from "./SharedNavBar";
import imgFloor01 from "../assets/floor-01.jpeg";
import imgFloor02 from "../assets/floor-02.jpeg";
import imgFloor03 from "../assets/floor-03.jpeg";
import imgFloor04 from "../assets/floor-04.jpeg";
import imgRevAvatar from "../assets/rev-avatar.png";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



// ─── Page Data ────────────────────────────────────────────────────────────────
// Per-sign content (headline, lede, failure mechanism, root causes) lives in
// data/problemSigns.ts so this page renders any sitemap problem sign.

const TESTIMONIALS = [
  {
    quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.",
    name: "Victoria E.",
    loc: "Memphis, TN",
    stars: 5,
    img: imgFloor01,
    avatar: imgRevAvatar,
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!",
    name: "Elizabeth N.",
    loc: "Collierville, TN",
    stars: 5,
    img: imgFloor03,
    avatar: imgRevAvatar,
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.",
    loc: "Marked Tree, AR",
    stars: 5,
    img: imgFloor04,
    avatar: imgRevAvatar,
  },
];

const FAQS = [
  {
    q: "How much does it cost to fix sagging floors?",
    a: "The cost depends on how many joists are affected and whether moisture control is also needed. Most crawl space floor repairs fall between $1,500 and $6,000. We provide a full written quote after the free inspection — no commitment required.",
  },
  {
    q: "Is a sagging floor a structural emergency?",
    a: "Not always immediately, but it should be inspected soon. The underlying cause — usually moisture or pest damage — will continue to worsen over time. Early action saves significant money and prevents the issue from spreading to adjacent joists and beams.",
  },
  {
    q: "Can sagging floors be fixed without tearing up my flooring?",
    a: "Yes. In most cases we access the joists from below through the crawl space. SmartJack installation and joist sistering are both done without touching your finished floors above.",
  },
  {
    q: "How long does a crawl space floor repair take?",
    a: "Most repairs are completed in a single day. Larger jobs involving full encapsulation and multiple SmartJacks may take 2 days. We give you a specific timeline during the free inspection.",
  },
  {
    q: "Will my homeowner's insurance cover this?",
    a: "It depends on the cause and your policy. Damage from sudden events may be covered; gradual moisture damage usually isn't. We provide full documentation to help you file a claim where applicable.",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ sign }: { sign: ProblemSignDef }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 560 }}>
      <ImageWithFallback
        src={getSignImage(sign)}
        alt={sign.label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(10,11,20,0.92) 0%,rgba(10,11,20,0.72) 55%,rgba(10,11,20,0.45) 100%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-24 lg:py-32">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
          {getService(sign.service).name}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,64px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 24, maxWidth: 700 }}>
          {sign.label}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.65)", lineHeight: 1.75, maxWidth: 560, marginBottom: 36 }}>
          {getSignSummary(sign)}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58 }}
          className="flex items-center gap-4 flex-wrap">
          <a href="#" className="group relative overflow-hidden px-7 py-4 inline-flex items-center gap-3"
            style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}>
            <span className="relative z-10">Schedule Free Inspection</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color={NAVY} />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
          </a>
          <a href="tel:+18335841049" className="px-7 py-4 inline-flex items-center gap-2 transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,.35)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,.85)" }}>
            Call local team
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Diagnostic Section (76:6107) ────────────────────────────────────────────
const RELATED_TAGS = ["I smell mold", "Wood rot", "Energy loss", "Pests / vapor"];
// Labels verbatim from the sitemap's Structural Repair problem signs — the
// shortened variants used before didn't match anything in the sitemap and had
// no symptom photo to resolve.
const OTHER_STRUCTURAL = [
  "Cracks in exterior or interior walls",
  "Bowing or leaning walls",
  "Doors or windows that stick",
  "Separating or tilting chimney",
  "Cracks above garage door",
  "Sinking Slab",
];

// Redesign brief: the old module was a dark card whose purpose was unreadable —
// a list of unrelated-looking rows with 64px thumbnails too small to identify
// anything. This version states the job of the section in plain language
// ("here is what you told us, here is what else to look for before the
// inspection"), drops the thumbnails from the rows, and promotes the photo to a
// single large preview that swaps as you read down the list. Light surface, so
// it sits between the dark hero and the cream self-diagnosis section as a
// deliberate step down rather than a second wall of black.
function DiagnosticSection() {
  const [activeRow, setActiveRow] = useState<string>(OTHER_STRUCTURAL[0]);

  const LINE = "rgba(10,11,20,.1)";
  const LINE_SOFT = "rgba(10,11,20,.07)";
  const INK = "#3D4152";

  return (
    <section style={{ background: "#fff", borderBottom: `1px solid ${LINE}` }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-16 lg:py-24">

        {/* Section header — says out loud what this module is for */}
        <Reveal className="mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: CF, fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Before your inspection
            </span>
          </div>
          <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(30px,3.6vw,46px)", color: CHAR, lineHeight: 1.06, letterSpacing: "-1px", marginBottom: 14, maxWidth: 720 }}>
            Sagging floors rarely show up alone
          </h2>
          <p style={{ fontFamily: INTER, fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 620 }}>
            The same moisture or settlement that drops your floor usually leaves marks elsewhere in the house.
            Walk this list before we arrive — every extra sign you spot makes the inspection faster and the quote more accurate.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── Left: your symptom + related tags + CTA ── */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            <Reveal delay={0.05}>
              <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: MUTED, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                Also happening in your home?
              </p>
              <p style={{ fontFamily: INTER, fontSize: 13.5, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>
                These travel with sagging floors — tap any to read that problem sign.
              </p>
              <div className="flex flex-wrap gap-2">
                {RELATED_TAGS.map((tag) => (
                  <button key={tag} className="group flex items-center gap-1.5 px-3 py-2 transition-all duration-200 hover:border-[rgba(26,82,168,.5)]"
                    style={{ background: "#fff", border: `1px solid ${LINE}`, fontFamily: INTER, fontSize: 13, color: INK, cursor: "pointer" }}>
                    {tag}
                    <ChevronRight size={12} color={B} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="h-px" style={{ background: LINE_SOFT }} />

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3">
                <a href="#" className="group relative overflow-hidden px-6 py-3.5 inline-flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
                  style={{ background: B, fontFamily: INTER, fontWeight: 600, fontSize: 14, color: "#fff" }}>
                  Schedule free inspection
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
                <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, textAlign: "center" }}>
                  or call{" "}
                  <a href="tel:+19015550100" style={{ color: B, fontWeight: 600 }}>(901) 555-0100</a>
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right: text list drives one large preview ── */}
          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-12" style={{ border: `1px solid ${LINE}` }}>

              {/* List — text only, no thumbnails */}
              <div
                className="md:col-span-6 lg:col-span-5 flex flex-col"
                onMouseLeave={() => setActiveRow(OTHER_STRUCTURAL[0])}
              >
                <div className="px-6 py-4" style={{ borderBottom: `1px solid ${LINE_SOFT}` }}>
                  <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 10.5, color: MUTED, letterSpacing: 2.5, textTransform: "uppercase" }}>
                    Other structural signs
                  </p>
                </div>

                {OTHER_STRUCTURAL.map((symptom, i) => {
                  const on = activeRow === symptom;
                  return (
                    <button
                      key={symptom}
                      className="group flex items-center justify-between gap-3 px-6 py-4 text-left w-full transition-all duration-200"
                      style={{
                        background: on ? "rgba(26,82,168,.05)" : "transparent",
                        borderTop: i > 0 ? `1px solid ${LINE_SOFT}` : "none",
                        borderLeft: `3px solid ${on ? B : "transparent"}`,
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setActiveRow(symptom)}
                      onFocus={() => setActiveRow(symptom)}
                    >
                      <span className="flex items-baseline gap-3 min-w-0">
                        <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: on ? B : "rgba(10,11,20,.25)", letterSpacing: 1 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: INTER, fontSize: 15, lineHeight: 1.45, color: on ? CHAR : INK, fontWeight: on ? 600 : 400 }}>
                          {symptom}
                        </span>
                      </span>
                      <ChevronRight size={16} color={on ? B : "rgba(10,11,20,.25)"} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}

                <div className="mt-auto px-6 py-4" style={{ borderTop: `1px solid ${LINE_SOFT}` }}>
                  <a href="#" className="group inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                    style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: B }}>
                    Browse all problem signs
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Large preview — swaps with the hovered row */}
              <div className="hidden md:block md:col-span-6 lg:col-span-7 relative" style={{ borderLeft: `1px solid ${LINE}`, background: CREAM, minHeight: 420 }}>
                <motion.div
                  key={activeRow}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={getSymptomImage(activeRow)}
                    alt={activeRow}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>

                {/* Caption plate — keeps the label readable over any photo */}
                <div className="absolute left-0 right-0 bottom-0 px-6 py-5"
                  style={{ background: "linear-gradient(180deg,rgba(11,28,74,0) 0%,rgba(11,28,74,.88) 60%)" }}>
                  <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6 }}>
                    What it looks like
                  </p>
                  <motion.p
                    key={`cap-${activeRow}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ fontFamily: CF, fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.3px" }}
                  >
                    {activeRow}
                  </motion.p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Self-Diagnosis Guide (76:6506) ──────────────────────────────────────────
// Redesign brief: the old layout was two identical bordered cards side by
// side — the tell-tale sign of a generic comparison-card template. This
// version treats it as one diagnostic instrument instead of two disconnected
// boxes: a severity rule ties both ends together, the panel is asymmetric
// (quiet reading zone vs. a dominant action zone) rather than twin cards, and
// the action zone borrows the site's own steel-bracket motif (used across
// the SmartJack / pier photography) as a cut corner — not a stock icon.
const CF = "'Articulat CF',sans-serif";
const INTER = "'Inter',sans-serif";

function SelfDiagnosisSection() {
  const waitItems = [
    "Slight bounce in one area only, no visible slope",
    "No moisture, mold smell, or water history in crawl space",
    "Problem has been stable for months without getting worse",
  ];
  const urgentItems = [
    "Floor is visibly sloping toward one corner or wall",
    "You smell mold or see moisture in the crawl space",
    "More than one room is affected or it's getting worse",
  ];

  return (
    <section style={{ background: CREAM }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-16 lg:py-28">

        {/* Header */}
        <Reveal className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: CF, fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Self-diagnosis guide
            </span>
          </div>
          <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
            Is your floor situation urgent?
          </h2>
          <p style={{ fontFamily: INTER, fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 600 }}>
            Not every bouncy floor is an emergency, but some are. Use this quick checklist to understand where you stand.
          </p>
        </Reveal>

        {/* Severity rule — reads left→right as one scale, not two separate topics */}
        <Reveal delay={0.05} className="mb-3">
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: B, letterSpacing: 2, textTransform: "uppercase" }}>Low urgency</span>
            <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: "#A3823F", letterSpacing: 2, textTransform: "uppercase" }}>High urgency</span>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mb-14">
          <div className="relative h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${B} 0%, rgba(107,110,133,.3) 48%, ${SAND} 100%)` }}>
            <div className="absolute rounded-full" style={{ top: -3, left: 0, width: 9, height: 9, background: B }} />
            <div className="absolute rounded-full" style={{ top: -3, right: 0, width: 9, height: 9, background: SAND }} />
          </div>
        </Reveal>

        {/* Diagnostic panel — asymmetric 5/7 split, one bordered instrument */}
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ border: "1px solid rgba(10,11,20,.1)", background: "#fff" }}>

          {/* Quiet zone */}
          <Reveal className="lg:col-span-5">
            <div className="h-full px-8 md:px-10 py-10 lg:py-12 flex flex-col justify-center" style={{ borderRight: "1px solid rgba(10,11,20,.1)" }}>
              <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10, display: "block" }}>
                Low urgency
              </span>
              <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: 24, color: CHAR, lineHeight: 1.15, marginBottom: 4 }}>
                Can wait a few weeks
              </h3>
              <div className="mt-6 flex flex-col">
                {waitItems.map((item, i) => (
                  <div key={item} className="flex items-start gap-3 py-3.5"
                    style={{ borderTop: i > 0 ? "1px solid rgba(10,11,20,.07)" : "none" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ marginTop: 2 }}>
                      <circle cx="12" cy="12" r="9" stroke={B} strokeWidth="1.6" opacity="0.4" />
                      <path d="M8.5 12.5l2.2 2.2 4.8-5" stroke={B} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: INTER, fontSize: 14.5, lineHeight: 1.6, color: "#3D4152" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Dominant action zone — cut corner references the steel angle
              brackets used throughout the site's own repair photography. The
              accent line sits outside the clipped box (as a sibling) so the
              clip-path never slices through it. */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative h-full">
              <div className="absolute pointer-events-none" style={{
                top: 0, right: 0, width: 74, height: 2, background: SAND,
                transformOrigin: "100% 0%", transform: "rotate(45deg)",
              }} />
              <div className="relative h-full overflow-hidden" style={{ background: NAVY, clipPath: "polygon(0 0, calc(100% - 52px) 0, 100% 52px, 100% 100%, 0 100%)" }}>

              <div className="px-8 md:px-12 py-10 lg:py-12 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2.5 mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>
                    High urgency
                  </span>
                </div>
                <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: 26, color: "#fff", lineHeight: 1.15, marginBottom: 20, maxWidth: 380 }}>
                  Any of these? Stop reading and call.
                </h3>

                <div className="flex flex-col gap-3.5 mb-8">
                  {urgentItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ marginTop: 3 }}>
                        <path d="M12 9v3.5M12 15.5h.01M10.6 4.6L2.9 17.7a1.6 1.6 0 001.38 2.4h15.44a1.6 1.6 0 001.38-2.4L13.4 4.6a1.6 1.6 0 00-2.8 0z"
                          stroke={SAND} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontFamily: INTER, fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,.75)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
                  <a href="tel:+18335841049" className="group inline-flex items-baseline gap-3 transition-opacity hover:opacity-85">
                    <span style={{ fontFamily: INTER, fontSize: 12, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Call now</span>
                    <span style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(24px,2.6vw,34px)", color: "#fff", letterSpacing: "-0.5px" }}>
                      1-833-584-1049
                    </span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Explainer Section ────────────────────────────────────────────────────────
// Redesign brief: the previous layout was image-on-top + three numbered boxes —
// the default "features list" shape that reads as template filler. This version
// is built as a section drawing of the house, which is what a homeowner is
// actually being shown: a measured deflection diagram (drawn live, with the
// dimension the inspector would call out), and root causes stacked by the
// elevation where we find them, each opening to the site evidence and photo.
// Technical monospace metadata + hairline rules carry the engineering language
// the rest of the site already uses in its bracket/pier motifs.
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

// Shared drawing vocabulary so every variant reads as the same set of plans:
// hairline construction lines, dashed datum, sand for the failure, blue for the
// dimension the inspector calls out.
const DRAW = {
  line: "rgba(255,255,255,.22)",
  datum: "rgba(255,255,255,.28)",
  label: "rgba(255,255,255,.4)",
  faint: "rgba(255,255,255,.32)",
};

function SheetLabel({ x, y, children, anchor = "start", dim = false }:
  { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; dim?: boolean }) {
  return (
    <text x={x} y={y} fill={dim ? DRAW.faint : DRAW.label} textAnchor={anchor}
      style={{ fontFamily: MONO, fontSize: 9, letterSpacing: 1 }}>
      {children}
    </text>
  );
}

/** Section drawing for a failure mechanism. One variant per DiagramKind — the
 *  copy changes per problem sign, the physics changes per mechanism. */
function SectionDiagram({ kind }: { kind: DiagramKind }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const draw = (delay: number, duration = 1.4) => ({
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : {},
    transition: { duration, ease: [0.22, 1, 0.36, 1] as const, delay },
  });
  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : {},
    transition: { duration: 0.5, delay },
  });

  return (
    <div ref={ref} className="relative w-full" style={{ maxWidth: 460 }}>
      <svg viewBox="0 0 460 150" className="w-full h-auto" fill="none">

        {kind === "joist-deflection" && (
          <>
            <line x1="14" y1="34" x2="446" y2="34" stroke={DRAW.datum} strokeWidth="1" strokeDasharray="4 5" />
            <SheetLabel x={14} y={24}>AS BUILT — LEVEL</SheetLabel>
            <motion.path d="M14 34 C 130 34, 150 104, 230 104 C 310 104, 330 34, 446 34"
              stroke={SAND} strokeWidth="2.4" strokeLinecap="round" {...draw(0.25, 1.5)} />
            {[150, 230, 310].map((x, i) => (
              <motion.g key={x} {...fade(0.9 + i * 0.09)}>
                <line x1={x} y1="6" x2={x} y2="22" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                <path d={`M${x - 3} 19 L${x} 24 L${x + 3} 19`} stroke="rgba(255,255,255,.35)" strokeWidth="1" />
              </motion.g>
            ))}
            <motion.g {...fade(1.5)}>
              <line x1="230" y1="34" x2="230" y2="104" stroke={B} strokeWidth="1" />
              <line x1="224" y1="34" x2="236" y2="34" stroke={B} strokeWidth="1.4" />
              <line x1="224" y1="104" x2="236" y2="104" stroke={B} strokeWidth="1.4" />
              <text x="216" y="69" fill="#fff" textAnchor="middle" transform="rotate(-90 216 69)"
                style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.2 }}>DEFLECTION</text>
            </motion.g>
            <line x1="14" y1="132" x2="446" y2="132" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
            <SheetLabel x={14} y={146} dim>CRAWL SPACE GRADE</SheetLabel>
            {[60, 400].map((x) => (
              <rect key={x} x={x - 9} y="104" width="18" height="28" fill="none" stroke={DRAW.line} strokeWidth="1" />
            ))}
            <motion.rect x="221" y="112" width="18" height="20" fill="rgba(196,171,108,.14)" stroke={SAND} strokeWidth="1" {...fade(1.3)} />
          </>
        )}

        {kind === "differential-settlement" && (
          <>
            <line x1="14" y1="38" x2="446" y2="38" stroke={DRAW.datum} strokeWidth="1" strokeDasharray="4 5" />
            <SheetLabel x={14} y={30}>AS BUILT — LEVEL</SheetLabel>
            {/* Wall elevation — the right end rides the settled footing down */}
            <motion.path d="M34 38 L230 38 C 320 38, 366 50, 418 70"
              stroke={SAND} strokeWidth="2.2" strokeLinecap="round" {...draw(0.2, 1.2)} />
            <motion.path d="M34 38 L34 108" stroke={DRAW.line} strokeWidth="1.2" {...draw(0.5, 0.5)} />
            <motion.path d="M34 108 L230 108 C 320 108, 366 120, 418 140"
              stroke={DRAW.line} strokeWidth="1.2" {...draw(0.4, 1.2)} />
            {/* Stair-step crack — the readout the homeowner actually sees */}
            <motion.path d="M286 112 L286 96 L306 96 L306 80 L326 80 L326 64 L346 64 L346 50"
              stroke={SAND} strokeWidth="2.2" strokeLinejoin="miter" {...draw(1, 1.1)} />
            <motion.g {...fade(1.5)}>
              <line x1="434" y1="38" x2="434" y2="76" stroke={B} strokeWidth="1" />
              <line x1="428" y1="38" x2="440" y2="38" stroke={B} strokeWidth="1.4" />
              <line x1="428" y1="76" x2="440" y2="76" stroke={B} strokeWidth="1.4" />
              <text x="422" y="57" fill="#fff" textAnchor="middle" transform="rotate(-90 422 57)"
                style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.2 }}>DROP</text>
            </motion.g>
            <rect x="52" y="108" width="26" height="12" fill="none" stroke={DRAW.line} strokeWidth="1" />
            <motion.rect x="352" y="126" width="42" height="14" fill="rgba(196,171,108,.14)" stroke={SAND} strokeWidth="1" {...fade(1.2)} />
            <SheetLabel x={446} y={122} anchor="end" dim>SETTLED FOOTING</SheetLabel>
            <SheetLabel x={14} y={146} dim>BEARING SOIL</SheetLabel>
          </>
        )}

        {kind === "lateral-pressure" && (
          <>
            <SheetLabel x={14} y={18}>BACKFILL</SheetLabel>
            <SheetLabel x={446} y={18} anchor="end">INSIDE FACE</SheetLabel>
            {/* Plumb reference vs the wall that moved */}
            <line x1="250" y1="20" x2="250" y2="130" stroke={DRAW.datum} strokeWidth="1" strokeDasharray="4 5" />
            <motion.path d="M250 20 C 250 50, 300 62, 300 75 C 300 88, 250 100, 250 130"
              stroke={SAND} strokeWidth="2.4" strokeLinecap="round" {...draw(0.3, 1.4)} />
            {/* Soil pressure, heaviest at mid-height */}
            {[40, 60, 75, 90, 110].map((y, i) => {
              const len = 34 + (1 - Math.abs(75 - y) / 42) * 46;
              return (
                <motion.g key={y} {...fade(0.85 + i * 0.08)}>
                  <line x1={150} y1={y} x2={150 + len} y2={y} stroke="rgba(255,255,255,.3)" strokeWidth="1" />
                  <path d={`M${150 + len - 5} ${y - 3} L${150 + len} ${y} L${150 + len - 5} ${y + 3}`} stroke="rgba(255,255,255,.3)" strokeWidth="1" />
                </motion.g>
              );
            })}
            <motion.g {...fade(1.5)}>
              <line x1="250" y1="75" x2="300" y2="75" stroke={B} strokeWidth="1" />
              <line x1="250" y1="69" x2="250" y2="81" stroke={B} strokeWidth="1.4" />
              <line x1="300" y1="69" x2="300" y2="81" stroke={B} strokeWidth="1.4" />
              <text x="312" y="79" fill="#fff" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.2 }}>BOW</text>
            </motion.g>
            <line x1="14" y1="130" x2="446" y2="130" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
            <SheetLabel x={14} y={144} dim>FOOTING</SheetLabel>
          </>
        )}

        {kind === "hydrostatic" && (
          <>
            <SheetLabel x={14} y={18}>SATURATED SOIL</SheetLabel>
            <SheetLabel x={446} y={18} anchor="end">BASEMENT</SheetLabel>
            {/* Wall + floor slab in section */}
            <motion.path d="M262 22 L262 112 L446 112" stroke={DRAW.line} strokeWidth="1.6" {...draw(0.2)} />
            {/* Water table */}
            <motion.path d="M14 54 L246 54" stroke={B} strokeWidth="1.6" {...draw(0.5, 0.9)} />
            <SheetLabel x={14} y={46}>WATER TABLE</SheetLabel>
            {[68, 84, 100].map((y, i) => (
              <motion.g key={y} {...fade(0.9 + i * 0.1)}>
                <line x1={186} y1={y} x2={246} y2={y} stroke="rgba(26,82,168,.75)" strokeWidth="1" />
                <path d={`M241 ${y - 3} L246 ${y} L241 ${y + 3}`} stroke="rgba(26,82,168,.75)" strokeWidth="1" />
              </motion.g>
            ))}
            {/* The path in: cove joint */}
            <motion.path d="M262 112 C 276 112, 284 118, 300 118" stroke={SAND} strokeWidth="2.4" strokeLinecap="round" {...draw(1.2, 0.8)} />
            <motion.circle cx="262" cy="112" r="9" fill="none" stroke={SAND} strokeWidth="1" {...fade(1.5)} />
            <motion.g {...fade(1.7)}>
              <line x1="271" y1="112" x2="330" y2="132" stroke={SAND} strokeWidth="0.8" />
              <text x="334" y="136" fill="#fff" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1 }}>COVE JOINT</text>
            </motion.g>
            <line x1="14" y1="130" x2="246" y2="130" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
            <SheetLabel x={14} y={144} dim>FOOTING DRAIN</SheetLabel>
          </>
        )}

        {kind === "humidity" && (
          <>
            <SheetLabel x={14} y={18}>LIVING SPACE</SheetLabel>
            {/* Subfloor over the crawl space */}
            <motion.path d="M20 44 L440 44" stroke={DRAW.line} strokeWidth="1.6" {...draw(0.2, 0.9)} />
            <motion.path d="M20 122 L440 122" stroke="rgba(255,255,255,.18)" strokeWidth="1" {...draw(0.35, 0.9)} />
            <SheetLabel x={20} y={136} dim>OPEN EARTH FLOOR</SheetLabel>
            {/* Vapor rising — stack effect */}
            {[80, 150, 220, 290, 360].map((x, i) => (
              <motion.path key={x}
                d={`M${x} 118 C ${x - 10} 100, ${x + 10} 82, ${x} 60`}
                stroke="rgba(196,171,108,.7)" strokeWidth="1.4" strokeLinecap="round"
                {...draw(0.6 + i * 0.12, 1)} />
            ))}
            {[80, 150, 220, 290, 360].map((x, i) => (
              <motion.path key={`h${x}`} d={`M${x - 4} 65 L${x} 58 L${x + 4} 65`} stroke="rgba(196,171,108,.7)" strokeWidth="1.4" {...fade(1.2 + i * 0.08)} />
            ))}
            {/* Vents pulling humid air in */}
            {[20, 440].map((x) => (
              <rect key={x} x={x - 4} y="96" width="8" height="16" fill="none" stroke={DRAW.line} strokeWidth="1" />
            ))}
            <motion.g {...fade(1.7)}>
              <text x="230" y="34" fill="#fff" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.2 }}>
                UP INTO THE ROOMS ABOVE
              </text>
            </motion.g>
          </>
        )}

        {kind === "slab-void" && (
          <>
            <line x1="14" y1="30" x2="446" y2="30" stroke={DRAW.datum} strokeWidth="1" strokeDasharray="4 5" />
            <SheetLabel x={14} y={22}>ORIGINAL GRADE</SheetLabel>
            {/* Two slabs — the right one dropped into the void */}
            <motion.path d="M14 38 L222 38 L222 52 L14 52 Z" stroke={DRAW.line} strokeWidth="1.4" {...draw(0.2)} />
            {/* The slab that dropped into the void */}
            <motion.path d="M232 44 L446 60 L446 74 L232 58 Z" stroke={SAND} strokeWidth="1.8" {...draw(0.45)} />
            {/* Void below */}
            <motion.path d="M236 60 C 292 96, 382 100, 446 80"
              stroke={SAND} strokeWidth="1.4" strokeDasharray="5 4" {...draw(0.9, 1.1)} />
            <motion.g {...fade(1.4)}>
              <text x="336" y="114" fill="#fff" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.2 }}>VOID</text>
            </motion.g>
            {/* Water washing the sub-base out */}
            {[110, 158].map((x, i) => (
              <motion.g key={x} {...fade(1.1 + i * 0.12)}>
                <line x1={x} y1="66" x2={x + 56} y2="78" stroke="rgba(26,82,168,.8)" strokeWidth="1" />
                <path d={`M${x + 50} 72 L${x + 56} 78 L${x + 48} 79`} stroke="rgba(26,82,168,.8)" strokeWidth="1" />
              </motion.g>
            ))}
            <SheetLabel x={14} y={100} dim>SUB-BASE WASHING OUT</SheetLabel>
            <line x1="14" y1="126" x2="446" y2="126" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
            <SheetLabel x={14} y={140} dim>UNDISTURBED SOIL</SheetLabel>
          </>
        )}

        {kind === "surface-wear" && (
          <>
            <text x="14" y="30" fill={SAND} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: 1 }}>
              WEAR LAYER — FAILING
            </text>
            {/* Flaking top layer */}
            <motion.path d="M14 52 L446 52" stroke={SAND} strokeWidth="2" strokeDasharray="14 7 4 9 20 5" {...draw(0.25, 1.2)} />
            {[70, 130, 190, 250, 310, 370].map((x, i) => (
              <motion.path key={x} d={`M${x} 52 l6 -8 l7 6 l6 -7`} stroke="rgba(196,171,108,.6)" strokeWidth="1.2" {...fade(0.8 + i * 0.07)} />
            ))}
            {/* Sound slab under it */}
            <motion.path d="M14 64 L446 64 L446 112 L14 112 Z" stroke={DRAW.line} strokeWidth="1.4" {...draw(0.5)} />
            <SheetLabel x={230} y={92} anchor="middle" dim>SOUND SLAB — FULLY SUPPORTED</SheetLabel>
            {/* Thickness call-out: the damage stops at the top of the slab */}
            <motion.g {...fade(1.5)}>
              <line x1="432" y1="52" x2="432" y2="64" stroke={B} strokeWidth="1" />
              <line x1="426" y1="52" x2="438" y2="52" stroke={B} strokeWidth="1.4" />
              <line x1="426" y1="64" x2="438" y2="64" stroke={B} strokeWidth="1.4" />
              <text x="420" y="42" fill="#fff" textAnchor="end" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.2 }}>
                DAMAGE STOPS HERE
              </text>
            </motion.g>
            <line x1="14" y1="130" x2="446" y2="130" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
            <SheetLabel x={14} y={144} dim>SUB-BASE</SheetLabel>
          </>
        )}
      </svg>
    </div>
  );
}

function ExplainerSection({ sign }: { sign: ProblemSignDef }) {
  const [open, setOpen] = useState(0);
  const mech = getMechanism(sign);
  const causes = mech.causes;

  return (
    <section style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }} className="py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Drawing-sheet header rule */}
        <Reveal>
          <div className="flex items-center justify-between pb-3 mb-12 lg:mb-16 flex-wrap gap-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
              Section A–A · {mech.sheetTitle}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,.3)", letterSpacing: 2, textTransform: "uppercase" }}>
              {mech.sheetSystem}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

          {/* ── Left: the explanation, drawn ── */}
          <div className="lg:col-span-6">
            <Reveal>
              <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(36px,4.4vw,58px)", color: "#fff", lineHeight: 0.98, letterSpacing: "-1.6px", marginBottom: 28 }}>
                {sign.headline[0]}<br />{sign.headline[1]}<br />
                <span style={{ color: SAND }}>{sign.headline[2]}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="mb-10">
              <SectionDiagram kind={mech.diagram} />
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ fontFamily: INTER, fontSize: 16.5, color: "rgba(255,255,255,.62)", lineHeight: 1.8, maxWidth: 520 }}>
                {sign.lede.map((para, i) => (
                  <p key={i} style={{ marginBottom: i < sign.lede.length - 1 ? 16 : 0 }}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Good-news plate — steel-bracket cut corner, same motif as the urgency panel */}
            <Reveal delay={0.14}>
              <div className="relative mt-10 px-7 py-6" style={{ background: NAVY, clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)", maxWidth: 520 }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute top-0 right-0">
                  <path d="M0 0h40v40" stroke={SAND} strokeWidth="1.2" />
                  <path d="M11 0v11M0 11h11" stroke={SAND} strokeWidth="1.2" opacity="0.5" />
                </svg>
                <p style={{ fontFamily: MONO, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
                  {mech.repairable.label}
                </p>
                <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 19, color: "#fff", lineHeight: 1.35, maxWidth: 380 }}>
                  {mech.repairable.text}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right: root causes stacked by elevation ── */}
          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="flex items-baseline justify-between mb-5">
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,.4)", letterSpacing: 2, textTransform: "uppercase" }}>
                Root causes
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,.25)", letterSpacing: 2 }}>
                {String(causes.length).padStart(2, "0")} · MOST COMMON
              </span>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {causes.map((cause, i) => {
                const on = open === i;
                return (
                  <div key={cause.title} style={{ borderBottom: "1px solid rgba(255,255,255,.09)" }}>
                    <button
                      onClick={() => setOpen(on ? -1 : i)}
                      onMouseEnter={() => setOpen(i)}
                      className="group w-full text-left flex items-start gap-5 py-6 transition-colors duration-200"
                      style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      {/* Elevation tick — reads as a dimension leader, not a badge */}
                      <span className="shrink-0 flex flex-col items-start pt-1" style={{ width: 66 }}>
                        <span style={{ fontFamily: MONO, fontSize: 11, color: on ? SAND : "rgba(255,255,255,.38)", letterSpacing: 0.5, transition: "color .2s" }}>
                          {cause.elev}
                        </span>
                        <span className="mt-2 h-px w-full" style={{ background: on ? SAND : "rgba(255,255,255,.15)", transition: "background .2s" }} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-3 flex-wrap">
                          <span style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: on ? "#fff" : "rgba(255,255,255,.72)", letterSpacing: "-0.4px", transition: "color .2s" }}>
                            {cause.title}
                          </span>
                          <span className="px-2 py-0.5" style={{ fontFamily: MONO, fontSize: 9.5, color: on ? SAND : "rgba(255,255,255,.35)", letterSpacing: 1.5, textTransform: "uppercase", border: `1px solid ${on ? "rgba(196,171,108,.45)" : "rgba(255,255,255,.14)"}`, transition: "all .2s" }}>
                            {cause.tag}
                          </span>
                        </span>
                        <span className="block mt-1.5" style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,.3)", letterSpacing: 1.2, textTransform: "uppercase" }}>
                          {cause.layer}
                        </span>
                      </span>

                      {/* Plus/minus drawn as a hairline, no icon library look */}
                      <span className="relative shrink-0 mt-2" style={{ width: 14, height: 14 }}>
                        <span className="absolute" style={{ top: 6.5, left: 0, width: 14, height: 1.4, background: on ? SAND : "rgba(255,255,255,.45)" }} />
                        <span className="absolute transition-transform duration-300" style={{ top: 0, left: 6.3, width: 1.4, height: 14, background: on ? SAND : "rgba(255,255,255,.45)", transform: on ? "scaleY(0)" : "scaleY(1)" }} />
                      </span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pb-7 pl-0 sm:pl-[86px]">
                        <p style={{ fontFamily: INTER, fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 16, maxWidth: 460 }}>
                          {cause.desc}
                        </p>
                        <div className="relative overflow-hidden" style={{ height: 190 }}>
                          <ImageWithFallback
                            src={cause.img}
                            alt={cause.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.85) 0%,rgba(10,11,20,.05) 65%)" }} />
                          <div className="absolute left-4 right-4 bottom-3.5">
                            <p style={{ fontFamily: MONO, fontSize: 9.5, color: SAND, letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 4 }}>
                              What we find on site
                            </p>
                            <p style={{ fontFamily: INTER, fontSize: 13.5, color: "rgba(255,255,255,.9)", lineHeight: 1.5 }}>
                              {cause.evidence}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <Reveal delay={0.12}>
              <p className="mt-6" style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,.28)", letterSpacing: 1.4, lineHeight: 1.7 }}>
                {mech.footnote}
              </p>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Slider ──────────────────────────────────────────────────────
function TestimonialsSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section style={{ background: CREAM }} className="py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Reviews</p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              What Customers Say About Us
            </h2>
            {onNavigate && (
              <button
                onClick={() => onNavigate("reviews")}
                className="group inline-flex items-center gap-1.5 mt-4"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Read all reviews
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => emblaApi?.scrollPrev()}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{ border: `1.5px solid ${CHAR}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => emblaApi?.scrollNext()}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{ border: `1.5px solid ${CHAR}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)" }}>
              {/* Image thumb */}
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.45)" }}>
                  <button className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                {/* Quote mark */}
                <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(26,82,168,.15)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.75, flex: 1, marginBottom: 24 }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,.07)" }}>
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "#eee" }}>
                    <ImageWithFallback src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{t.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10 px-8">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(0,0,0,.15)" }} />
        ))}
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FaqSection() {
  const [open, setOpen] = useState<string>("");
  return (
    <section style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-[1px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>FAQs</span>
            <div className="w-6 h-[1px]" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Sagging floors frequently asked questions
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED }}>
            Find answers about our services and process
          </p>
        </Reveal>

        <div className="max-w-[768px] mx-auto">
          <style>{`
            @keyframes slideDown { from { height: 0; opacity: 0; } to { height: var(--radix-accordion-content-height); opacity: 1; } }
            @keyframes slideUp { from { height: var(--radix-accordion-content-height); opacity: 1; } to { height: 0; opacity: 0; } }
            [data-state=open].rdx-content { animation: slideDown 0.22s ease-out; }
            [data-state=closed].rdx-content { animation: slideUp 0.16s ease-in; }
          `}</style>
          <AccordionPrimitive.Root type="single" value={open} onValueChange={(v) => setOpen(v)} collapsible>
            {FAQS.map((faq, i) => (
              <AccordionPrimitive.Item key={i} value={String(i)} className="mb-3 overflow-hidden"
                style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 17, color: "#fff", flex: 1, paddingRight: 16, lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div className="shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 group-data-[state=open]:rotate-45"
                      style={{ border: `1.5px solid ${open === String(i) ? SAND : "rgba(255,255,255,.2)"}`, color: open === String(i) ? SAND : MUTED }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden rdx-content">
                  <div className="px-6 pb-6 pt-1">
                    <div className="h-px mb-4" style={{ background: "rgba(255,255,255,.06)" }} />
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>{faq.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={imgFloor03}
          alt="Ready to fix your floors"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.84)" }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Get started today</span>
            <div className="h-[1px] w-8" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 16 }}>
            Ready to fix your<br />sagging floors?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · Same-week availability · Lifetime warranty on every repair
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}>
              <span className="relative z-10">Schedule Free Inspection</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color={NAVY} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
            </a>
            <a href="tel:+19015550100"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,.55)", borderBottom: "1px solid rgba(255,255,255,.2)", paddingBottom: 2 }}>
              or call (901) 555-0100
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = [
    { h: "Services", ls: ["Crawl Space", "Basement Waterproofing", "Foundation Repair", "Concrete Leveling", "Mold Prevention", "Insulation"] },
    { h: "Company", ls: ["About Us", "Our Work", "Blog", "Careers", "Financing", "Contact"] },
    { h: "Service Areas", ls: ["Mississippi", "Tennessee", "Arkansas", "Missouri"] },
    { h: "Careers", ls: ["Why Work With Us", "Job Positions", "Benefits", "Training Program"] },
  ];
  return (
    <footer style={{ background: "#060710" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="lg:w-72 shrink-0">
            <button onClick={onBack} className="h-20 mb-5 block"><Logo light /></button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              Free Inspection <ArrowRight size={13} />
            </a>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.9)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>{col.h}</p>
                <ul className="flex flex-col gap-2">
                  {col.ls.map((l) => (
                    <li key={l}><a href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.35)" }} className="hover:text-white/70 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}>© 2026 Redeemers Structural Solutions. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }} className="hover:text-white/40 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ProblemSignInnerPage ─────────────────────────────────────────────────────
export default function ProblemSignInnerPage({ onBack, onNavigate, slug }: { onBack: () => void; onNavigate?: (p: string) => void; slug?: string }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  // Route is "problem-sign-inner/<sign-slug>"; unknown or missing slugs fall
  // back to the default sign so the page never renders empty.
  const sign = getProblemSign(slug);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Problem Signs" />
      </div>

      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: "#0A0B14" }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2 flex-wrap">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Problem Signs</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>{sign.label}</span>
          </div>
        </div>

        <HeroSection sign={sign} />
        <DiagnosticSection />
        <SelfDiagnosisSection />
        <ExplainerSection sign={sign} />
        <TestimonialsSection onNavigate={onNavigate} />
        <FaqSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
