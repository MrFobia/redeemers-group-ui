import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { getSymptomImage } from "./data/services";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import iconFoundation from "../assets/icons/icon-foundation.svg";
import iconCrawlspace from "../assets/icons/icon-crawlspace.svg";
import iconWaterproofing from "../assets/icons/icon-waterproofing.svg";
import iconConcrete from "../assets/icons/icon-concrete.svg";
import imgSvcFoundation from "../assets/svc-foundation.jpg";
import imgSvcCrawlspace from "../assets/svc-crawlspace.jpg";
import imgSvcWaterproofing from "../assets/svc-waterproofing.jpg";
import imgSvcConcrete from "../assets/svc-concrete.jpg";

import { B, DARK, NAVY, CHAR, SAND, CREAM, MUTED, SURFACE, ON_DARK, ON_LIGHT } from "./theme";

// Subtle blueprint grid — faint crosshatch used behind hero/section imagery.
function BlueprintGrid({ opacity = 0.05, color = "255,255,255" }: { opacity?: number; color?: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `linear-gradient(rgba(${color},1) 1px, transparent 1px), linear-gradient(90deg, rgba(${color},1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />
  );
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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


// ─── Top Bar ──────────────────────────────────────────────────────────────────

// ─── Symptom Categories Data ──────────────────────────────────────────────────
// Sourced verbatim from the approved Figma sitemap (Problem Signs branch) —
// exactly 4 categories, exact names and symptom wording. Do not add/remove
// categories or reword symptoms without updating the sitemap first.
const CATEGORIES = [
  {
    id: "structural",
    filter: "Structural Repair",
    title: "Structural Repair",
    page: "service/structural-repair",
    img: imgSvcFoundation,
    icon: iconFoundation as string,
    symptoms: [
      "Uneven, sloping, or bouncy floors",
      "Cracks in exterior or interior walls",
      "Bowing or leaning walls",
      "Doors or windows that stick",
      "Separating or tilting chimney",
      "Cracks above garage door",
      "Sinking Slab",
    ],
  },
  {
    id: "crawl",
    filter: "Crawl Space Repair",
    title: "Crawl Space Repair",
    page: "service/crawl-space-repair",
    img: imgSvcCrawlspace,
    icon: iconCrawlspace as string,
    symptoms: [
      "My floors are sagging, bouncy, or buckling.",
      "The baseboards have separated from the floor.",
      "My doors won't close properly",
    ],
  },
  {
    id: "waterproofing",
    filter: "Waterproofing",
    title: "Waterproofing",
    page: "service/waterproofing",
    img: imgSvcWaterproofing,
    icon: iconWaterproofing as string,
    symptoms: [
      "Water getting in to basement or other.",
      "Water pooling around house.",
      "Damp walls or floor",
      "Mold & mildew smell",
      "White residue on basement walls",
      "Standing water in crawlspace",
    ],
  },
  {
    id: "concrete",
    filter: "Concrete",
    title: "Concrete",
    page: "service/concrete-services",
    img: imgSvcConcrete,
    icon: iconConcrete as string,
    symptoms: [
      "Uneven concrete slabs",
      "Sinking driveway, walkway, patio",
      "Cracked or sinking pool deck",
      "Sinking slab foundation",
      "Void under slab",
      "Ugly concrete",
    ],
  },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Above-the-fold must be actionable, not just a photo + headline: client
// feedback was explicit that landing on this page with nothing to click reads
// as "I don't know where I am". These 4 tiles jump straight to the matching
// category card further down — no scroll required to take a first action.
function HeroSection() {
  const jumpTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(`ps-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ background: DARK }}>
      {/* No stock photo behind the copy — a photo-over-text hero was the exact
          complaint ("I see a pretty sunset, I don't know where I am"). Each
          category tile below carries its own real photo instead, at full
          contrast against a solid card. */}
      <BlueprintGrid opacity={0.05} />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 pt-7 pb-9 lg:pt-9 lg:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}
        >
          Diagnosis Guide
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Articulat CF',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(26px,3.4vw,40px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-1px",
            marginBottom: 18,
            maxWidth: 720,
          }}
        >
          What's going on with your home?
        </motion.h1>
        {/* Actionable above the fold: tap a category's logo, jump straight to
            it. No scroll required to know what to do. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-6 md:gap-10"
        >
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#ps-${cat.id}`}
              onClick={jumpTo(cat.id)}
              className="group flex flex-col items-center gap-2.5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center" style={{ width: 40, height: 40, filter: "brightness(0) invert(1)", opacity: 0.85 }}>
                <img src={cat.icon} alt="" className="w-full h-full object-contain" />
              </span>
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.2, textAlign: "center" }}>
                {cat.title}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Category Hero ────────────────────────────────────────────────────────────
// Landing on "Problem Signs > <category>" must answer "am I in the right
// place?" without scrolling: the category's own symptoms are the first thing
// on screen, each with its photo and a direct link to that sign's page. The
// generic diagnosis hero (4 tiles, no specifics) only renders when no category
// is selected.
function CategoryHero({
  cat,
  onSignClick,
  onNavigate,
}: {
  cat: typeof CATEGORIES[0];
  onSignClick?: (label?: string) => void;
  onNavigate?: (p: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: DARK }}>
      <BlueprintGrid opacity={0.05} />

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 pt-8 pb-10 lg:pt-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: which category you're in, and what to do next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:col-start-1 lg:row-start-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 shrink-0">
                <span className="flex items-center justify-center" style={{ width: 22, height: 22, filter: "brightness(0) invert(1)" }}>
                  <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                </span>
              </div>
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
                Problem Signs
              </span>
            </div>

            <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", lineHeight: 1.02, letterSpacing: "-1.2px", marginBottom: 14 }}>
              {cat.title}
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15.5, color: "rgba(255,255,255,.65)", lineHeight: 1.65, maxWidth: 380, marginBottom: 22 }}>
              These are the {cat.symptoms.length} signs we're called out for most in this category. Pick the one that matches
              your home — you'll get what causes it and how it's repaired.
            </p>

            <button
              onClick={() => onNavigate?.(cat.page)}
              className="group inline-flex items-center gap-2.5 px-5 py-3 transition-all hover:bg-white/5"
              style={{ border: `1.5px solid ${SAND}`, background: "transparent", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: "#fff" }}
            >
              See {cat.title} solutions
              <ArrowRight size={14} color={SAND} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right: the category's actual signs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 lg:col-start-5 lg:row-start-1 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {cat.symptoms.map((symptom, i) => {
              const on = hovered === symptom;
              return (
                <button
                  key={symptom}
                  onClick={() => onSignClick?.(symptom)}
                  onMouseEnter={() => setHovered(symptom)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative flex flex-col text-left overflow-hidden transition-all duration-200"
                  style={{ background: CHAR, border: `1.5px solid ${on ? SAND : "rgba(255,255,255,.1)"}`, cursor: "pointer" }}
                >
                  <span className="relative overflow-hidden shrink-0 w-full" style={{ height: 130 }}>
                    <ImageWithFallback
                      src={getSymptomImage(symptom)}
                      alt={symptom}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                      style={{ transform: on ? "scale(1.08)" : "scale(1)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.55) 0%, transparent 55%)" }} />
                  </span>
                  <span className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, lineHeight: 1.35, color: on ? "#fff" : "rgba(255,255,255,.78)", fontWeight: on ? 500 : 400 }}>
                      {symptom}
                    </span>
                    <ChevronRight size={15} color={on ? SAND : "rgba(255,255,255,.3)"} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
// QA pass: the card leads with one large photo instead of a thumbnail per
// symptom — the per-row thumbs were too small to recognise anything and forced
// you to hover every line to use them. Two cards per row, so the photo gets
// real estate.
function CategoryCard({ cat, delay = 0, onSignClick, onNavigate }: { cat: typeof CATEGORIES[0]; delay?: number; onSignClick?: (label?: string) => void; onNavigate?: (p: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [cardHover, setCardHover] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        id={`ps-${cat.id}`}
        className="relative flex flex-col h-full transition-transform duration-300"
        style={{ background: "#fff", border: `1px solid ${cardHover ? B : ON_LIGHT.border}`, scrollMarginTop: 160 }}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        {/* Lead photo — the visual cue for the whole category */}
        <button
          onClick={() => onNavigate ? onNavigate(cat.page) : onSignClick?.()}
          className="group relative w-full overflow-hidden text-left"
          style={{ height: 260, background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <ImageWithFallback
            src={cat.img}
            alt={cat.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.86) 0%, rgba(10,11,20,.12) 65%)" }} />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-7 pb-6">
            <span className="flex items-center justify-center w-10 h-10 shrink-0" style={{ background: "rgba(255,255,255,.12)" }}>
              <img src={cat.icon} alt="" style={{ width: 24, height: 24, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </span>
            <h3
              style={{
                fontFamily: "'Articulat CF',sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
                textTransform: "uppercase",
              }}
            >
              {cat.title}
            </h3>
          </div>
        </button>

        {/* Symptoms — plain rows, no per-row thumbnail */}
        <div className="flex flex-col px-7 py-4 flex-1">
          {cat.symptoms.map((symptom, si) => (
            <button
              key={symptom}
              onClick={() => onSignClick?.(symptom)}
              className="group flex items-center justify-between w-full py-3 text-left transition-colors duration-200"
              style={{ borderBottom: si < cat.symptoms.length - 1 ? `1px solid ${ON_LIGHT.hairline}` : "none", background: "none", cursor: "pointer" }}
              onMouseEnter={() => setHovered(symptom)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 15,
                  color: hovered === symptom ? B : ON_LIGHT.body,
                  fontWeight: hovered === symptom ? 600 : 400,
                  lineHeight: 1.5,
                }}
              >
                {symptom}
              </span>
              <ChevronRight
                size={16}
                className="shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-0.5"
                color={hovered === symptom ? B : MUTED}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate ? onNavigate(cat.page) : onSignClick?.()}
          className="group flex items-center justify-between w-full px-7 py-5 text-left"
          style={{ borderTop: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}
        >
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B }}>
            See {cat.title} solutions
          </span>
          <ArrowRight size={16} color={B} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </Reveal>
  );
}


// ─── Browse Section ───────────────────────────────────────────────────────────
function BrowseSection({ onSignClick, onNavigate, excludeId }: { onSignClick?: (label?: string) => void; onNavigate?: (p: string) => void; excludeId?: string }) {
  // On a category route the hero already carries that category in full, so
  // this grid shows the remaining ones instead of repeating it. The hero's
  // 4 tiles already act as the category filter, so there's no separate
  // filter control here — just the full detail cards (with per-symptom
  // lists the hero tiles don't carry).
  const filtered = CATEGORIES.filter((c) => c.id !== excludeId);

  return (
    <section style={{ background: CREAM }} className="pt-10 pb-20 lg:pt-12 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        {excludeId && (
          <Reveal className="text-center mb-10">
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: MUTED, letterSpacing: 3, textTransform: "uppercase" }}>
              Not what you're seeing? Browse the other categories
            </p>
          </Reveal>
        )}

        {/* Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1180px] mx-auto">
          {filtered.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} delay={i * 0.06} onSignClick={onSignClick} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Can't find it */}
        <Reveal delay={0.1} className="mt-12 text-center">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED }}>
            {"Can't find your symptom? "}
            <a href="tel:+18335841049" style={{ color: B, fontWeight: 600 }}>
              Call us at 1-833-584-1049 →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Quick Diagnostic Banner ──────────────────────────────────────────────────
function DiagnosticBanner() {
  const items = [
    { q: "How urgent is this?", a: "Most structural issues worsen over time. Early inspection saves thousands." },
    { q: "What if I'm not sure?", a: "Our inspectors diagnose the root cause — free, no obligation." },
    { q: "Do you serve my area?", a: "TN · MS · AR and the full Mid-South. Same-week availability." },
  ];

  return (
    <section style={{ background: SURFACE.panel }} className="py-16 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x"
          style={{ borderTop: `1px solid ${ON_DARK.hairline}`, borderBottom: `1px solid ${ON_DARK.hairline}`, divideColor: ON_DARK.hairline }}>
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.08}>
              <div className="relative px-8 py-10 flex flex-col gap-3">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{item.q}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────
// Flat blue closing band — matches the CTA surface used on every other page.
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: SURFACE.cta }}>
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Get started today</span>
            <div className="h-[1px] w-8" style={{ background: SAND }} />
          </div>
          <h2
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px,5vw,72px)",
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-1px",
              marginBottom: 16,
            }}
          >
            Ready to protect<br />your home?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Call us and we'll check — free inspection, no pressure, same-week availability.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); openInspection(); }}
              className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}
            >
              <span className="relative z-10">Schedule Free Inspection</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color={NAVY} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
            </a>
            <a
              href="tel:+19015550100"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,.55)", borderBottom: "1px solid rgba(255,255,255,.2)", paddingBottom: 2 }}
            >
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
    <footer style={{ background: SURFACE.footer }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="lg:w-72 shrink-0">
            <button onClick={onBack} className="h-20 mb-5 block">
              <Logo light />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); openInspection(); }}
              className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}
            >
              Free Inspection
              <ArrowRight size={13} />
            </a>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.9)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>
                  {col.h}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.ls.map((l) => (
                    <li key={l}>
                      <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.35)" }} className="hover:text-white/70 transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}>
            © 2026 Redeemers Structural Solutions. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }} className="hover:text-white/40 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ProblemSignsPage ─────────────────────────────────────────────────────────
export default function ProblemSignsPage({ onBack, onSignClick, onNavigate, scrollTo: initialSection, category }: { onBack: () => void; onSignClick?: (label?: string) => void; onNavigate?: (p: string) => void; scrollTo?: string; category?: string }) {
  // Route "problem-signs/<category-id>" — an unknown id falls back to the
  // generic diagnosis hero rather than rendering an empty category.
  const activeCat = CATEGORIES.find((c) => c.id === category);

  useEffect(() => {
    if (initialSection) {
      const t = setTimeout(() => {
        document.getElementById(initialSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Problem Signs" />
      </div>

      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button
              onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            {activeCat ? (
              <>
                <button
                  onClick={() => onNavigate?.("problem-signs")}
                  style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
                  className="hover:text-white transition-colors"
                >
                  Problem Signs
                </button>
                <ChevronRight size={14} color="rgba(255,255,255,.3)" />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
                  {activeCat.title}
                </span>
              </>
            ) : (
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
                Problem Signs
              </span>
            )}
          </div>
        </div>

        {activeCat
          ? <CategoryHero cat={activeCat} onSignClick={onSignClick} onNavigate={onNavigate} />
          : <HeroSection />}
        <BrowseSection onSignClick={onSignClick} onNavigate={onNavigate} excludeId={activeCat?.id} />
        <DiagnosticBanner />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
