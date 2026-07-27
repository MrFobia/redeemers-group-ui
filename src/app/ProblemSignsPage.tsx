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

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";

// ─── Blueprint corner marks ───────────────────────────────────────────────────
// Camera-viewfinder-style corner brackets used across the "Blueprint industrial"
// system to make cards read as technical/structural rather than generic SaaS.
function CornerMarks({ color = SAND, size = 14 }: { color?: string; size?: number }) {
  const arm = size;
  const stroke = 1.5;
  const corners = [
    { top: -1, left: -1, borderTop: stroke, borderLeft: stroke },
    { top: -1, right: -1, borderTop: stroke, borderRight: stroke },
    { bottom: -1, left: -1, borderBottom: stroke, borderLeft: stroke },
    { bottom: -1, right: -1, borderBottom: stroke, borderRight: stroke },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          className="absolute pointer-events-none"
          style={{ width: arm, height: arm, borderColor: color, ...c }}
        />
      ))}
    </>
  );
}

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
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
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
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
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
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
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
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
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

const FILTERS = ["All", ...CATEGORIES.map((c) => c.filter)];

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
      <div
        className="absolute pointer-events-none"
        style={{ top: -120, right: -120, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,82,168,.25) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 pt-12 pb-14 lg:pt-16 lg:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}
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
            fontSize: "clamp(30px,4.2vw,50px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-1px",
            marginBottom: 14,
            maxWidth: 720,
          }}
        >
          What's going on with your home?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.6, maxWidth: 520, marginBottom: 28 }}
        >
          Pick what you're seeing — we'll show you exactly what it means and how to fix it.
        </motion.p>

        {/* Actionable above the fold: tap a category, jump straight to it. No scroll required to know what to do.
            Each tile carries its own real photo — high-contrast solid card body underneath, not text-over-photo. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat, i) => (
            <a
              key={cat.id}
              href={`#ps-${cat.id}`}
              onClick={jumpTo(cat.id)}
              className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: CHAR, border: "1.5px solid rgba(255,255,255,.1)" }}
            >
              <CornerMarks color="rgba(196,171,108,.55)" size={9} />

              {/* Photo block — real, high-contrast, no text laid over it */}
              <div className="relative w-full overflow-hidden" style={{ height: 96 }}>
                <ImageWithFallback
                  src={cat.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(30,34,53,.95) 0%, rgba(30,34,53,.15) 100%)" }} />
                <span
                  className="absolute top-2 left-2"
                  style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: SAND, letterSpacing: 1.5 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="absolute bottom-2 left-2 flex items-center justify-center w-8 h-8 shrink-0"
                  style={{ background: "rgba(10,11,20,.85)", border: "1.5px solid rgba(196,171,108,.5)" }}
                >
                  <span className="flex items-center justify-center" style={{ width: 20, height: 20, filter: "brightness(0) invert(1)" }}>
                    <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                  </span>
                </div>
              </div>

              {/* Solid card body — full contrast, no photo behind text */}
              <div className="flex flex-col gap-2 px-4 pt-3 pb-4">
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.2 }}>
                  {cat.title}
                </span>
                <span className="flex items-center gap-1.5 transition-transform duration-200 group-hover:translate-x-1" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND }}>
                  See signs <ArrowRight size={11} />
                </span>
              </div>
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
  const others = CATEGORIES.filter((c) => c.id !== cat.id);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: DARK }}>
      <BlueprintGrid opacity={0.05} />
      <div
        className="absolute pointer-events-none"
        style={{ top: -140, right: -120, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,82,168,.25) 0%, transparent 70%)" }}
      />

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
              <div className="flex items-center justify-center w-10 h-10 shrink-0"
                style={{ background: "rgba(10,11,20,.85)", border: `1.5px solid ${SAND}` }}>
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

          </motion.div>

          {/* Right: the category's actual signs — first thing on screen, and on
              mobile they come before the CTA so the fold still shows content. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 lg:col-start-5 lg:row-start-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
          >
            {cat.symptoms.map((symptom, i) => {
              const on = hovered === symptom;
              return (
                <button
                  key={symptom}
                  onClick={() => onSignClick?.(symptom)}
                  onMouseEnter={() => setHovered(symptom)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative flex items-center gap-3 p-3 text-left transition-all duration-200"
                  style={{ background: CHAR, border: `1.5px solid ${on ? SAND : "rgba(255,255,255,.1)"}`, cursor: "pointer" }}
                >
                  <span className="relative overflow-hidden shrink-0" style={{ width: 58, height: 46 }}>
                    <ImageWithFallback
                      src={getSymptomImage(symptom)}
                      alt={symptom}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                      style={{ transform: on ? "scale(1.08)" : "scale(1)" }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 10, color: on ? SAND : "rgba(255,255,255,.35)", letterSpacing: 1.5 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block mt-0.5" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, lineHeight: 1.35, color: on ? "#fff" : "rgba(255,255,255,.78)", fontWeight: on ? 500 : 400 }}>
                      {symptom}
                    </span>
                  </span>
                  <ChevronRight size={15} color={on ? SAND : "rgba(255,255,255,.3)"} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </motion.div>

          {/* Actions + category switch — sits under the heading on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:-mt-2"
          >
            <button
              onClick={() => onNavigate?.(cat.page)}
              className="group inline-flex items-center gap-2.5 px-5 py-3 transition-all hover:bg-white/5"
              style={{ border: `1.5px solid ${SAND}`, background: "transparent", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: "#fff" }}
            >
              See {cat.title} solutions
              <ArrowRight size={14} color={SAND} className="transition-transform group-hover:translate-x-1" />
            </button>

            {/* Switch category without scrolling back up */}
            <div className="mt-7 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>
                Other categories
              </p>
              <div className="flex flex-wrap gap-2">
                {others.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => onNavigate?.(`problem-signs/${o.id}`)}
                    className="transition-colors hover:text-white hover:border-white/30"
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,.7)", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.12)", padding: "6px 12px", cursor: "pointer" }}
                  >
                    {o.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, index, delay = 0, onSignClick, onNavigate }: { cat: typeof CATEGORIES[0]; index: number; delay?: number; onSignClick?: (label?: string) => void; onNavigate?: (p: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [cardHover, setCardHover] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={delay}>
      <div
        id={`ps-${cat.id}`}
        className="group/card relative flex flex-col h-full transition-transform duration-300"
        style={{ background: "#fff", border: `1.5px solid ${cardHover ? B : "rgba(11,28,74,.14)"}`, scrollMarginTop: 160 }}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <CornerMarks color={cardHover ? SAND : "rgba(11,28,74,.3)"} />

        {/* Diagonal sand accent stripe */}
        <div
          className="absolute top-0 right-0 overflow-hidden pointer-events-none"
          style={{ width: 64, height: 64 }}
        >
          <div
            className="absolute transition-colors duration-300"
            style={{
              top: 10, right: -34, width: 96, height: 14,
              background: cardHover ? SAND : "rgba(11,28,74,.1)",
              transform: "rotate(45deg)",
            }}
          />
        </div>

        {/* Card Header */}
        <div
          className="relative flex items-center gap-4 px-7 pt-7 pb-5"
          style={{ borderBottom: "1px dashed rgba(11,28,74,.16)" }}
        >
          <span
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: 12,
              color: SAND,
              letterSpacing: 2,
            }}
          >
            {num}
          </span>
          <div
            className="flex items-center justify-center w-12 h-12 shrink-0 transition-colors duration-300"
            style={{ background: "rgba(26,82,168,.06)", border: `1.5px dashed ${cardHover ? B : "rgba(26,82,168,.3)"}` }}
          >
            <img src={cat.icon} alt="" style={{ width: 26, height: 26, objectFit: "contain" }} />
          </div>
          <h3
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: 23,
              color: CHAR,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
            }}
          >
            {cat.title}
          </h3>
        </div>

        {/* Symptoms list */}
        <div className="relative flex flex-col px-7 py-5 gap-0.5 flex-1">
          {cat.symptoms.map((symptom, si) => (
            <button
              key={symptom}
              onClick={() => onSignClick?.(symptom)}
              className="group flex items-center justify-between w-full py-2.5 text-left transition-all duration-200"
              style={{
                borderBottom: si < cat.symptoms.length - 1 ? "1px dashed rgba(11,28,74,.1)" : "none",
              }}
              onMouseEnter={() => setHovered(symptom)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="flex items-center gap-3">
                {/* Thumbnail per symptom — recognition is visual first. */}
                <span
                  className="relative overflow-hidden shrink-0 transition-all duration-200"
                  style={{ width: 52, height: 40, border: `1px solid ${hovered === symptom ? B : "rgba(11,28,74,.12)"}` }}
                >
                  <ImageWithFallback
                    src={getSymptomImage(symptom)}
                    alt={symptom}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: hovered === symptom ? "scale(1.08)" : "scale(1)" }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 14,
                    color: hovered === symptom ? CHAR : "#444",
                    fontWeight: hovered === symptom ? 500 : 400,
                    lineHeight: 1.5,
                  }}
                >
                  {symptom}
                </span>
              </span>
              <ChevronRight
                size={15}
                className="shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-0.5"
                color={hovered === symptom ? B : MUTED}
              />
            </button>
          ))}
        </div>

        {/* Photo-strip footer CTA */}
        <button
          onClick={() => onNavigate ? onNavigate(cat.page) : onSignClick?.()}
          className="group relative w-full overflow-hidden text-left"
          style={{ height: 84, borderTop: `1.5px solid ${cardHover ? B : "rgba(11,28,74,.14)"}` }}
        >
          <ImageWithFallback
            src={cat.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: cardHover ? "rgba(11,28,74,.72)" : "rgba(10,11,20,.6)" }} />
          <div className="relative h-full flex items-center justify-between px-7">
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              See {cat.title} solutions
            </span>
            <span
              className="flex items-center justify-center w-8 h-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              style={{ background: SAND }}
            >
              <ArrowRight size={14} color={NAVY} />
            </span>
          </div>
        </button>
      </div>
    </Reveal>
  );
}

// ─── Browse Section ───────────────────────────────────────────────────────────
function BrowseSection({ onSignClick, onNavigate, excludeId }: { onSignClick?: (label?: string) => void; onNavigate?: (p: string) => void; excludeId?: string }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // On a category route the hero already carries that category in full, so the
  // unfiltered grid below shows the remaining ones instead of repeating it.
  // Picking its own chip brings the full card back.
  const filtered = activeFilter === "All"
    ? CATEGORIES.filter((c) => c.id !== excludeId)
    : CATEGORIES.filter((c) => c.filter === activeFilter || c.filter === "All");

  return (
    <section style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        {/* No repeated "Browse by category" intro here — the hero already
            states the page's purpose and shows these same 4 categories as
            actionable tiles. Repeating title+icon+photo again immediately
            below was flagged as content duplication; this section now goes
            straight to the filter + the full detail cards (which carry the
            per-symptom lists the hero tiles don't). */}
        {excludeId && activeFilter === "All" && (
          <Reveal className="text-center mb-6">
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: MUTED, letterSpacing: 3, textTransform: "uppercase" }}>
              Not what you're seeing? Browse the other categories
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05} className="flex items-center gap-2 flex-wrap mb-12 justify-center">
          {FILTERS.map((f) => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="relative transition-all duration-200 px-5 py-2.5"
                style={{
                  fontFamily: "'Articulat CF',sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: active ? "#fff" : CHAR,
                  background: active ? NAVY : "transparent",
                  border: `1.5px solid ${active ? NAVY : "rgba(11,28,74,.2)"}`,
                }}
              >
                {active && <CornerMarks color={SAND} size={7} />}
                {f}
              </button>
            );
          })}
        </Reveal>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={CATEGORIES.findIndex((c) => c.id === cat.id)} delay={i * 0.06} onSignClick={onSignClick} onNavigate={onNavigate} />
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
    <section style={{ background: DARK }} className="py-16 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x"
          style={{ borderTop: "1px solid rgba(255,255,255,.07)", borderBottom: "1px solid rgba(255,255,255,.07)", divideColor: "rgba(255,255,255,.07)" }}>
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.08}>
              <div className="relative px-8 py-10 flex flex-col gap-3">
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: SAND, letterSpacing: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
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
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt="Schedule an inspection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.84)" }} />
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
    <footer style={{ background: "#060710" }}>
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

      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: "#0A0B14" }}>
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
