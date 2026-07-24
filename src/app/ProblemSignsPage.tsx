import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { Breadcrumbs } from "./components/Breadcrumbs";
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
// Exactly the 4 categories of the approved sitemap (Sitemap Redeemers Group —
// 23 April), with its literal wording. Mold and Commercial are NOT problem-sign
// categories there: mold lives inside Waterproofing ("Mold & mildew smell") and
// Commercial is a service, not a symptom. Do not add a 5th category without
// updating the sitemap first.
// TODO(content): replace the placeholder `img` of each symptom with the client's
// own photo of that specific symptom.
const CATEGORIES = [
  {
    id: "structural",
    title: "Structural Repair",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="19" width="20" height="2" rx="1" stroke={B} strokeWidth="2" />
        <path d="M12 3L4 19M12 3l8 16" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    symptoms: [
      { label: "Uneven, sloping, or bouncy floors", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Cracks in exterior or interior walls", img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Bowing or leaning walls", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Doors or windows that stick", img: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Separating or tilting chimney", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Cracks above garage door", img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Sinking Slab", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
    ],
  },
  {
    id: "crawl-space",
    title: "Crawl Space Repair",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    symptoms: [
      { label: "My floors are sagging, bouncy, or buckling.", img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "The baseboards have separated from the floor.", img: "https://images.unsplash.com/photo-1595514535415-dae8580c416c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "My doors won't close properly", img: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
    ],
  },
  {
    id: "waterproofing",
    title: "Waterproofing",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    symptoms: [
      { label: "Water getting in to basement or other.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Water pooling around house.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Damp walls or floor", img: "https://images.unsplash.com/photo-1523575166462-af02fa789cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Mold & mildew smell", img: "https://images.unsplash.com/photo-1595514535415-dae8580c416c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "White residue on basement walls", img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Standing water in crawlspace", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
    ],
  },
  {
    id: "concrete",
    title: "Concrete",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h18M3 6h18M3 18h18" stroke={B} strokeWidth="2" strokeLinecap="round" />
        <path d="M7 9v6M17 9v6" stroke={B} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    symptoms: [
      { label: "Uneven concrete slabs", img: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Sinking driveway, walkway, patio", img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Cracked or sinking pool deck", img: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Sinking slab foundation", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Void under slab", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
      { label: "Ugly concrete", img: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" },
    ],
  },
];

type Category = typeof CATEGORIES[number];

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Deliberately short: on a 13" laptop the symptom explorer below has to be
// visible without scrolling. The stats row that used to live here was removed —
// it repeats the homepage and was pushing the actionable content under the fold.
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
        alt="Problem Signs"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(10,11,20,0.90) 0%,rgba(10,11,20,0.68) 55%,rgba(10,11,20,0.45) 100%)" }} />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 pt-8 pb-10 lg:pt-10 lg:pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Articulat CF',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(30px,3.4vw,46px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-1px",
            margin: "10px 0 12px",
            maxWidth: 720,
          }}
        >
          What's going on with your home?
        </motion.h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.7)", lineHeight: 1.6, maxWidth: 460 }}>
            Pick the sign you're seeing. We'll show you what it means and how we fix it.
          </p>
          <button
            onClick={openInspection}
            className="shrink-0 px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14, letterSpacing: ".4px", border: "none", cursor: "pointer" }}
          >
            Schedule Free Inspection
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Symptom Explorer ─────────────────────────────────────────────────────────
// Option A of the client's two mockups, the one they leaned to: the symptom list
// on the left, one representative photo on the right that swaps as you hover a
// symptom ("I want to see the picture of the crack in the wall that looks like
// the crack in the wall I have"). Scoped to one category at a time so arriving
// from Services > Waterproofing shows waterproofing signs and nothing else.
function SymptomExplorer({
  initialCategory,
  onSignClick,
  onNavigate,
}: {
  initialCategory?: string;
  onSignClick?: () => void;
  onNavigate?: (p: string) => void;
}) {
  const startIndex = Math.max(0, CATEGORIES.findIndex((c) => c.id === initialCategory));
  const [activeCat, setActiveCat] = useState<Category>(CATEGORIES[startIndex]);
  const [activeSymptom, setActiveSymptom] = useState(CATEGORIES[startIndex].symptoms[0]);

  const selectCategory = (cat: Category) => {
    setActiveCat(cat);
    setActiveSymptom(cat.symptoms[0]);
  };

  return (
    <section style={{ background: CREAM }} className="py-10 lg:py-14">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        {/* Category selector — the 4 categories of the approved sitemap */}
        <div className="flex items-stretch gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCat.id;
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat)}
                className="flex items-center gap-2.5 px-5 py-3 transition-all duration-200"
                style={{
                  background: isActive ? CHAR : "#fff",
                  border: `1.5px solid ${isActive ? CHAR : "rgba(0,0,0,.14)"}`,
                  cursor: "pointer",
                }}
              >
                <span className="shrink-0 flex items-center" style={{ width: 20, height: 20, filter: isActive ? "brightness(0) invert(1)" : "none" }}>
                  {cat.icon}
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: isActive ? 600 : 400, fontSize: 14, color: isActive ? "#fff" : CHAR }}>
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Left: symptom list · Right: photo of the hovered symptom */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 items-start">
          <div className="flex flex-col gap-1.5">
            {activeCat.symptoms.map((symptom) => {
              const isActive = symptom.label === activeSymptom.label;
              return (
                <button
                  key={symptom.label}
                  onClick={onSignClick}
                  onMouseEnter={() => setActiveSymptom(symptom)}
                  onFocus={() => setActiveSymptom(symptom)}
                  className="group flex items-center justify-between w-full px-5 py-4 text-left transition-all duration-200"
                  style={{
                    background: isActive ? "#fff" : "rgba(255,255,255,.55)",
                    border: "1px solid rgba(0,0,0,.07)",
                    borderLeft: isActive ? `3px solid ${B}` : "3px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.45, color: isActive ? CHAR : "#444", fontWeight: isActive ? 600 : 400 }}>
                    {symptom.label}
                  </span>
                  <ChevronRight size={16} className="shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-0.5" color={isActive ? B : MUTED} />
                </button>
              );
            })}

            <button
              onClick={() => (onNavigate ? onNavigate(activeCat.page) : onSignClick?.())}
              className="group inline-flex items-center gap-2 mt-3 self-start transition-opacity hover:opacity-80"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              See all {activeCat.title} solutions
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Photo panel — sticky so it stays beside the list while scanning */}
          <div className="relative overflow-hidden lg:sticky lg:top-[172px]" style={{ border: "1px solid rgba(0,0,0,.07)", aspectRatio: "4 / 3" }}>
            <ImageWithFallback
              key={activeSymptom.img}
              src={activeSymptom.img}
              alt={activeSymptom.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0" style={{ background: "linear-gradient(180deg,rgba(10,11,20,0) 0%,rgba(10,11,20,.88) 100%)", paddingTop: 80 }}>
              <div className="px-6 pb-5">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: "clamp(18px,2vw,24px)", color: "#fff", lineHeight: 1.15 }}>
                  {activeSymptom.label}
                </p>
                <button
                  onClick={onSignClick}
                  className="group inline-flex items-center gap-2 mt-2.5"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  See what this means
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8" style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED }}>
          {"Can't find your symptom? "}
          <a href="tel:+18335841049" style={{ color: B, fontWeight: 600 }}>
            Call us at 1-833-584-1049 →
          </a>
        </p>
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
              <div className="px-8 py-10 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 rounded-full" style={{ background: SAND }} />
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{item.q}</p>
                </div>
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
export default function ProblemSignsPage({
  onBack,
  onSignClick,
  onNavigate,
  // Set when the visitor arrives from a specific service, so the explorer opens
  // on that service's signs instead of the first category — the client flagged
  // that the two entry paths used to land on different-looking pages.
  initialCategory,
}: {
  onBack: () => void;
  onSignClick?: () => void;
  onNavigate?: (p: string) => void;
  initialCategory?: string;
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Problem Signs" />
      </div>

      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: "#0A0B14" }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3">
            <Breadcrumbs
              items={[{ label: "Home", page: "home" }, { label: "Problem Signs" }]}
              onNavigate={onNavigate ?? (() => onBack())}
            />
          </div>
        </div>

        <HeroSection />
        <SymptomExplorer initialCategory={initialCategory} onSignClick={onSignClick} onNavigate={onNavigate} />
        <DiagnosticBanner />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
