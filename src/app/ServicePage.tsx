import { useState, useEffect, useRef, useCallback } from "react";
import { openInspection } from "./components/InspectionModal";
import imgCrawlspace from "../assets/svc-crawlspace.jpg";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { StickyAnchorBar } from "./components/StickyAnchorBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { ProjectGallery } from "./components/ProjectGallery";

// ─── Brand Tokens (matches homepage) ─────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";


// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
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

// ─── Top bar ──────────────────────────────────────────────────────────────────

// ─── Breadcrumb + Section Tabs ────────────────────────────────────────────────
const SERVICE_TABS = [
  { id: "overview", label: "Crawl Space Repair" },
  { id: "signs", label: "Problem Signs" },
  { id: "cost", label: "Cost Guide" },
  { id: "gallery", label: "Project Gallery" },
  { id: "faq", label: "FAQs" },
];


// ─── Hero: Problem Signs Section ──────────────────────────────────────────────
const SYMPTOMS = [
  { id: "s1", q: "My floors are sagging or bouncy", a: "This typically indicates deteriorating floor joists or support beams in the crawl space. Our SmartJack systems can restore structural integrity and eliminate the bounce permanently." },
  { id: "s2", q: "Moisture or standing water", a: "Excess moisture leads to mold, rot, and pest infestations. We install full encapsulation systems with drainage matting and sump pumps to permanently resolve the moisture source." },
  { id: "s3", q: "I smell mold or mildew", a: "Musty odors signal active mold growth — often in the crawl space. We remediate existing mold and install vapor barriers to prevent recurrence." },
  { id: "s4", q: "High energy bills or drafts", a: "An uninsulated or unencapsulated crawl space bleeds energy. Our crawl space insulation and air sealing solutions can reduce bills significantly." },
  { id: "s5", q: "Pest or insect activity", a: "Damp, open crawl spaces invite termites, rodents, and other pests. Encapsulation removes the environment they need to thrive." },
];

function SymptomAccordion({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [open, setOpen] = useState<string>("s1");
  return (
    <AccordionPrimitive.Root type="single" value={open} onValueChange={(v) => setOpen(v || "")}>
      {SYMPTOMS.map((s) => (
        <AccordionPrimitive.Item key={s.id} value={s.id} style={{ marginBottom: 8 }}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className="w-full flex items-center justify-between px-4 transition-colors text-left group"
              style={{
                height: 45,
                background: open === s.id ? B : "#fff",
                borderRadius: open === s.id ? "4px 4px 0 0" : 4,
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: open === s.id ? "#fff" : CHAR }}>
                {s.q}
              </span>
              <ChevronDown
                size={16}
                className="shrink-0 ml-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                color={open === s.id ? "rgba(255,255,255,.8)" : MUTED}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden rdx-accordion-content">
            <div className="px-4 py-3"
              style={{
                background: "rgba(26,82,168,0.25)",
                border: `1px solid ${B}`,
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
              }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", lineHeight: 1.7, marginBottom: 14 }}>{s.a}</p>
              <button
                onClick={() => onNavigate?.("problem-sign-inner")}
                className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-85"
                style={{
                  background: SAND, color: DARK, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700,
                  padding: "9px 16px", border: "none", cursor: "pointer",
                }}
              >
                See full solution
                <ArrowRight size={14} />
              </button>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

function HeroSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <section
      id="overview"
      className="relative w-full overflow-hidden"
      style={{ minHeight: 680 }}
    >
      {/* Background image */}
      <img
        src={imgCrawlspace}
        alt="Crawl space repair"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay — dark left, fades right */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(120.41deg, rgba(10,11,20,0.88) 8.49%, rgba(10,11,20,0.55) 54.15%, rgba(10,11,20,0.20) 91.51%)" }}
      />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-20 lg:py-28">
        <div style={{ maxWidth: 587 }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-8">
            <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>
              Crawl Space Repair
            </span>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(38px,4.5vw,68px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 32 }}>
            Is your home showing<br />these signs?
          </h1>

          {/* Accordion */}
          <SymptomAccordion onNavigate={onNavigate} />

          {/* Footer link */}
          <p style={{ marginTop: 20, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)" }}>
            {"Can't find your symptom? "}
            <a href="#" style={{ color: "#fff", fontWeight: 600 }}>View all problem signs →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Solutions / Services Grid ────────────────────────────────────────────────
function SolutionsSection() {
  return (
    <section style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Section header */}
        <Reveal className="mb-14">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ display: "block", width: 32, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Crawl Space Repair
            </span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,58px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>
            Crawl Space Solutions
          </h2>
        </Reveal>

        <div className="flex flex-col" style={{ gap: 20 }}>

          {/* Row 1: Left large card + Right 2 stacked cards */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 20 }}>

              {/* LEFT — large card: image top, content bottom */}
              <div className="flex flex-col overflow-hidden" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="relative overflow-hidden shrink-0" style={{ height: 381 }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Floor Joist Repair"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-center" style={{ padding: "40px 40px 44px" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
                    Solution
                  </span>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                    Floor Joist Repair &amp; Replacement
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.75, margin: "0 0 28px" }}>
                    Damaged floor joists lead to sagging, squeaky, and unsafe floors. We repair or fully replace compromised joists to restore structural integrity and stop the problem at its source.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, textDecoration: "none", width: "fit-content" }}>
                    Schedule now
                    <ChevronRight size={16} color={SAND} />
                  </a>
                </div>
              </div>

              {/* RIGHT — 2 stacked smaller cards: image top, content bottom */}
              <div className="flex flex-col" style={{ gap: 20 }}>

                {/* Top small card */}
                <div className="flex flex-col overflow-hidden" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", flex: 1 }}>
                  <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1760776024932-38040caef5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800"
                      alt="Encapsulation Systems"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-center" style={{ padding: "28px 32px 32px" }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
                      Solution
                    </span>
                    <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.3px", margin: "0 0 12px" }}>
                      Encapsulation Systems
                    </h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7, margin: "0 0 20px" }}>
                      Heavy-duty vapor barriers seal moisture out of your crawl space permanently, improving air quality and protecting your home's structure year-round.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, textDecoration: "none", width: "fit-content" }}>
                      Schedule now
                      <ChevronRight size={16} color={SAND} />
                    </a>
                  </div>
                </div>

                {/* Bottom small card */}
                <div className="flex flex-col overflow-hidden" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", flex: 1 }}>
                  <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1708214148950-ccbb69d40e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800"
                      alt="Floor Joist Stabilization"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-center" style={{ padding: "28px 32px 32px" }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
                      Solution
                    </span>
                    <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.3px", margin: "0 0 12px" }}>
                      Floor Joist Stabilization
                    </h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7, margin: "0 0 20px" }}>
                      When joists are structurally sound but losing support, we install sister joists and support beams to stop flex and restore a firm, level floor.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, textDecoration: "none", width: "fit-content" }}>
                      Schedule now
                      <ChevronRight size={16} color={SAND} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

          {/* Row 2: Full-width horizontal card — text left, image right */}
          <Reveal delay={0.08}>
            <div className="flex flex-col md:flex-row overflow-hidden" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", minHeight: 340 }}>
              {/* Text left */}
              <div className="flex flex-col justify-center flex-1" style={{ padding: "48px 40px 52px" }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
                  Solution
                </span>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                  Mold Prevention
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 480 }}>
                  Mold hides before you can see it. We find the moisture source, treat existing growth, and install prevention systems so the problem never returns to your crawl space.
                </p>
                <a href="#" className="inline-flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, textDecoration: "none", width: "fit-content" }}>
                  Schedule now
                  <ChevronRight size={16} color={SAND} />
                </a>
              </div>
              {/* Image right */}
              <div className="relative overflow-hidden shrink-0 w-full md:w-[45%] h-56 md:h-auto" style={{ minHeight: 280 }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1720631618132-83cdab1b237e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mold Prevention"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ─── Problem Signs Section ────────────────────────────────────────────────────
const SIGN_COLS = [
  {
    title: "Moisture & Water",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    items: ["Water in my basement", "Damp or wet walls", "Condensation on pipes", "Puddles after rain", "Efflorescence (white stains)"],
  },
  {
    title: "Structural & Foundation",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="9 22 9 12 15 12 15 22" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    items: ["Sagging or bouncy floors", "Cracks in walls or floor", "Doors that stick or won't close", "Gaps between walls and ceilings", "Visible pier or beam rot"],
  },
  {
    title: "Air Quality & Smell",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17.7 7.7a7.5 7.5 0 1 1-10.5 10.7" stroke={B} strokeWidth="2" strokeLinecap="round" /><path d="M9 12c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3" stroke={B} strokeWidth="2" strokeLinecap="round" /></svg>
    ),
    items: ["Musty or earthy smell", "Allergy or asthma flare-ups", "Visible mold growth", "Pest or insect activity", "High energy bills"],
  },
];

function ProblemSignsSection() {
  return (
    <section id="signs" style={{ background: CHAR }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Problem Signs
          </p>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
            What are you noticing?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED, maxWidth: 560, margin: "0 auto" }}>
            Select a symptom to find the right solution for your home
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SIGN_COLS.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1}>
              <div className="h-full flex flex-col" style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="px-8 py-6 flex items-center gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  <div className="flex items-center justify-center w-12 h-12 shrink-0"
                    style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.2)" }}>
                    {col.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff" }}>
                    {col.title}
                  </h3>
                </div>
                <div className="flex flex-col px-6 py-5 gap-2 flex-1">
                  {col.items.map((item) => (
                    <button key={item} className="group flex items-center justify-between w-full px-4 py-3 transition-colors text-left"
                      style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 4 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{item}</span>
                      <ChevronRight size={14} color={MUTED} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cost Guide Section ───────────────────────────────────────────────────────
const COST_RANGES = [
  { label: "Basic Moisture Control", range: "$1,500 – $3,500", pct: 25 },
  { label: "Partial Encapsulation", range: "$3,500 – $6,000", pct: 50 },
  { label: "Full Encapsulation + Drainage", range: "$6,000 – $10,000", pct: 75 },
  { label: "Full Repair + SmartJack System", range: "$10,000 – $18,000", pct: 100 },
];

function CostBar({ item, i }: { item: typeof COST_RANGES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{item.label}</span>
        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: SAND }}>{item.range}</span>
      </div>
      <div className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,.1)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${B}, ${SAND})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.pct}%` } : {}}
          transition={{ duration: 1, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function CostSection() {
  return (
    <section id="cost" style={{ background: NAVY }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + bars */}
          <Reveal>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
              Cost Guide
            </p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
              How much does crawl space repair cost?
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.6)", lineHeight: 1.75, marginBottom: 32 }}>
              {"Typical range: $3,000 – $18,000 depending on size and damage level. We'll give you an exact number after your free inspection — no obligation."}
            </p>
            <div className="flex flex-col gap-5 mb-10">
              {COST_RANGES.map((item, i) => (
                <CostBar key={item.label} item={item} i={i} />
              ))}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                See full cost guide
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#" className="inline-flex items-center gap-2"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND }}>
                Financing options
                <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* Right: Image + callout */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative overflow-hidden" style={{ borderRadius: 2 }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1745865448615-aa1905c6db7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cost estimation"
                  className="w-full object-cover"
                  style={{ height: 420 }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.65) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
                    Cost breakdown
                  </p>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", lineHeight: 1.1 }}>
                    Most homeowners spend<br />$6,000 – $10,000
                  </p>
                </div>
              </div>
              {/* Financing chip */}
              <div className="absolute -bottom-4 right-4 px-5 py-3 flex items-center gap-3"
                style={{ background: DARK, border: `1px solid ${SAND}30` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND }}>Financing from $79/month available</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Project Gallery ──────────────────────────────────────────────────────────
function GallerySection() {
  return <ProjectGallery id="gallery" />;
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How long does crawl space repair take?",
    a: "Most repairs take 1–2 days. Full encapsulation on larger spaces may take 2–3 days. We'll give you a specific timeline during your inspection.",
  },
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
    q: "What if I need emergency service?",
    a: "Call us immediately if you have water intrusion or structural concerns. We prioritize urgent situations and respond quickly.",
  },
  {
    q: "Will my homeowner's insurance cover this?",
    a: "Coverage depends on your policy and the cause of damage. We'll provide detailed documentation to help with your claim. Some repairs — especially water damage — may be partially covered.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<string>("");
  return (
    <section id="faq" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            FAQs
          </p>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Frequently asked questions
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED }}>
            Find answers about our services and process
          </p>
        </Reveal>

        <div className="max-w-[768px] mx-auto">
          <AccordionPrimitive.Root type="single" value={open} onValueChange={(v) => setOpen(v)} collapsible>
            {FAQS.map((faq, i) => (
              <AccordionPrimitive.Item key={i} value={String(i)}
                className="mb-3 overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,.07)", background: CHAR }}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    className="w-full flex items-center justify-between px-6 py-5 text-left group transition-colors"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
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
                <AccordionPrimitive.Content className="overflow-hidden rdx-accordion-content">
                  <div className="px-6 pb-6 pt-1">
                    <div className="h-px mb-4" style={{ background: "rgba(255,255,255,.06)" }} />
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>{faq.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>

          <Reveal delay={0.1}>
            <div className="mt-14 text-center p-10"
              style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
              <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", marginBottom: 10 }}>
                Still have questions?
              </h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: MUTED, marginBottom: 24 }}>
                Reach out to our team anytime
              </p>
              <a href="#" className="group inline-flex items-center gap-2 px-7 py-3.5 transition-opacity hover:opacity-85"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                Contact Us
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      {/* BG image overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt="Ready to fix your crawl space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.82)" }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Get started today</span>
            <div className="h-[1px] w-8" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 16 }}>
            Ready to fix your<br />crawl space?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · Same-week availability · Lifetime warranty
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
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
            <button onClick={onBack} className="h-20 mb-5 block">
              <Logo light />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              Free Inspection
              <ArrowRight size={13} />
            </a>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.9)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>{col.h}</p>
                <ul className="flex flex-col gap-2">
                  {col.ls.map((l) => (
                    <li key={l}>
                      <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.35)" }}
                        className="hover:text-white/70 transition-colors">{l}</a>
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
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}
                className="hover:text-white/40 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ServicePage ──────────────────────────────────────────────────────────────
export default function ServicePage({ onBack, onNavigate, scrollTo }: { onBack: () => void; onNavigate?: (p: string) => void; scrollTo?: string }) {
  const [activeTab, setActiveTab] = useState(scrollTo ?? "overview");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 160;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Scroll to initial section if coming from nav link
  useEffect(() => {
    if (scrollTo) {
      const attempt = () => {
        const el = document.getElementById(scrollTo);
        if (el) {
          const offset = 160;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      // Delay so page has rendered
      const t = setTimeout(attempt, 120);
      return () => clearTimeout(t);
    }
  }, []);

  // Track active tab on scroll
  useEffect(() => {
    const sections = SERVICE_TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const handler = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY + 160 >= sections[i].offsetTop) {
          setActiveTab(SERVICE_TABS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{`
        @keyframes rdx-slideDown {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes rdx-slideUp {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        [data-state=open].rdx-accordion-content {
          animation: rdx-slideDown 0.24s ease-out;
        }
        [data-state=closed].rdx-accordion-content {
          animation: rdx-slideUp 0.18s ease-in;
        }
      `}</style>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Services" />
        <StickyAnchorBar tabs={SERVICE_TABS} active={activeTab} onChange={scrollToSection} />
      </div>
      <div className="w-full min-h-screen" style={{ background: "#0A0B14", paddingTop: 196 }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <button onClick={() => onNavigate?.("services-landing")}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Services</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Crawl Space Repair</span>
          </div>
        </div>
        <HeroSection onNavigate={onNavigate} />
        <SolutionsSection />
        <div id="signs"><ProblemSignsSection /></div>
        <div id="cost"><CostSection /></div>
        <GallerySection />
        <div id="faq"><FaqSection /></div>
        <CtaBanner />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
