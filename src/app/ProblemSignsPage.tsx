import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
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
const CATEGORIES = [
  {
    id: "crawl",
    filter: "Crawl Space",
    title: "Crawl Space",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    symptoms: [
      "My floors are sagging or bouncy",
      "I smell mold or mildew",
      "High humidity or condensation",
      "Pest or insect activity below",
      "Moisture or standing water",
      "Soft or weak floors underfoot",
    ],
  },
  {
    id: "basement",
    filter: "Basement",
    title: "Basement & Waterproofing",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    symptoms: [
      "Water in my basement",
      "Damp or wet walls",
      "Puddles after rain",
      "Efflorescence (white stains)",
      "Condensation on pipes",
      "Musty odor in basement",
    ],
  },
  {
    id: "foundation",
    filter: "Foundation",
    title: "Foundation & Structural",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="19" width="20" height="2" rx="1" stroke={B} strokeWidth="2" />
        <path d="M12 3L4 19M12 3l8 16" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    symptoms: [
      "Cracks in walls or floors",
      "Doors that stick or won't close",
      "Gaps between walls and ceilings",
      "Bowing or leaning walls",
      "Uneven or sloping floors",
      "Visible pier or beam rot",
    ],
  },
  {
    id: "concrete",
    filter: "Concrete",
    title: "Concrete & Leveling",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h18M3 6h18M3 18h18" stroke={B} strokeWidth="2" strokeLinecap="round" />
        <path d="M7 9v6M17 9v6" stroke={B} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    symptoms: [
      "Uneven driveway or sidewalk",
      "Sinking or sunken slabs",
      "Trip hazards on walkways",
      "Pool deck settling",
      "Cracked garage floor",
      "Steps pulling away from house",
    ],
  },
  {
    id: "mold",
    filter: "All",
    title: "Mold & Air Quality",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M17.7 7.7a7.5 7.5 0 1 1-10.5 10.7" stroke={B} strokeWidth="2" strokeLinecap="round" />
        <path d="M9 12c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3" stroke={B} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    symptoms: [
      "Musty or earthy smell indoors",
      "Allergy or asthma flare-ups",
      "Visible mold growth on walls",
      "Dark spots on walls or ceiling",
      "Poor indoor air quality",
      "Condensation on windows",
    ],
  },
  {
    id: "commercial",
    filter: "Commercial",
    title: "Commercial Properties",
    page: "service",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="15" rx="1" stroke={B} strokeWidth="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={B} strokeWidth="2" />
        <line x1="12" y1="12" x2="12" y2="16" stroke={B} strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" stroke={B} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    symptoms: [
      "Structural wall cracks in building",
      "Floor settling in commercial space",
      "Water intrusion in warehouse",
      "Foundation movement or shifting",
      "Concrete damage on property",
      "Building envelope issues",
    ],
  },
];

const FILTERS = ["All", "Crawl Space", "Basement", "Foundation", "Concrete", "Commercial"];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
        alt="Problem Signs"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(10,11,20,0.88) 0%,rgba(10,11,20,0.60) 55%,rgba(10,11,20,0.35) 100%)" }} />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px",
        }}
      />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-24 lg:py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}
        >
          Diagnosis Guide
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Articulat CF',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px,5vw,64px)",
            color: "#fff",
            lineHeight: 1.0,
            letterSpacing: "-1px",
            marginBottom: 24,
            maxWidth: 720,
          }}
        >
          What's going on<br />with your home?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.65)", lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}
        >
          Find your symptom below. We'll tell you exactly what it means — and how to fix it permanently.
        </motion.p>
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center gap-8 flex-wrap"
        >
          {[["12,000+", "Homes repaired"], ["18+", "Years experience"], ["4.9★", "Google rating"]].map(([val, label]) => (
            <div key={label} className="flex items-center gap-3">
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: SAND }}>{val}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)", letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, delay = 0, onSignClick, onNavigate }: { cat: typeof CATEGORIES[0]; delay?: number; onSignClick?: () => void; onNavigate?: (p: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Reveal delay={delay}>
      <div
        className="flex flex-col h-full"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,.09)" }}
      >
        {/* Card Header */}
        <div
          className="flex items-center gap-4 px-8 py-6"
          style={{ borderBottom: "1px solid rgba(0,0,0,.06)" }}
        >
          <div
            className="flex items-center justify-center w-12 h-12 shrink-0"
            style={{ background: "rgba(26,82,168,.07)", border: "1px solid rgba(26,82,168,.14)" }}
          >
            {cat.icon}
          </div>
          <h3
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: CHAR,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            {cat.title}
          </h3>
        </div>

        {/* Symptoms list */}
        <div className="flex flex-col px-6 py-5 gap-2 flex-1">
          {cat.symptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={onSignClick}
              className="group flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200"
              style={{
                background: hovered === symptom ? `rgba(26,82,168,.07)` : "rgba(0,0,0,.025)",
                borderRadius: 4,
                borderLeft: hovered === symptom ? `3px solid ${B}` : "3px solid transparent",
              }}
              onMouseEnter={() => setHovered(symptom)}
              onMouseLeave={() => setHovered(null)}
            >
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
              <ChevronRight
                size={15}
                className="shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-0.5"
                color={hovered === symptom ? B : MUTED}
              />
            </button>
          ))}
        </div>

        {/* Card Footer CTA */}
        <div className="px-8 py-5" style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}>
          <button
            onClick={() => onNavigate ? onNavigate(cat.page) : onSignClick?.()}
            className="group inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            See all {cat.title.split(" ")[0]} solutions
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Browse Section ───────────────────────────────────────────────────────────
function BrowseSection({ onSignClick, onNavigate }: { onSignClick?: () => void; onNavigate?: (p: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.filter === activeFilter || c.filter === "All");

  return (
    <section style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        {/* Section header */}
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-6" style={{ background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Problem Signs
            </span>
            <div className="h-[1px] w-6" style={{ background: B }} />
          </div>
          <h2
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px,4vw,56px)",
              color: CHAR,
              lineHeight: 1.05,
              letterSpacing: "-1px",
              marginBottom: 16,
            }}
          >
            Browse by category
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED, maxWidth: 520, margin: "0 auto" }}>
            Each symptom links directly to the relevant service page
          </p>
        </Reveal>

        {/* Filter Pills */}
        <Reveal delay={0.05} className="flex items-center gap-2 flex-wrap mb-12 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="transition-all duration-200 px-5 py-2"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: activeFilter === f ? 600 : 400,
                fontSize: 14,
                color: activeFilter === f ? "#fff" : CHAR,
                background: activeFilter === f ? CHAR : "transparent",
                border: `1.5px solid ${activeFilter === f ? CHAR : "rgba(0,0,0,.18)"}`,
                letterSpacing: ".2px",
              }}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
export default function ProblemSignsPage({ onBack, onSignClick, onNavigate }: { onBack: () => void; onSignClick?: () => void; onNavigate?: (p: string) => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Problem Signs" />
      </div>

      <div className="w-full min-h-screen" style={{ background: "#0A0B14", paddingTop: 148 }}>
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
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
              Problem Signs
            </span>
          </div>
        </div>

        <HeroSection />
        <BrowseSection onSignClick={onSignClick} onNavigate={onNavigate} />
        <DiagnosticBanner />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
