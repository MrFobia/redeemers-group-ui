import { useState, useEffect, useRef, useCallback } from "react";
import { openInspection } from "./components/InspectionModal";
import { motion, useInView, animate, AnimatePresence } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ArrowRight, Play, Download, FileText } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { StickyAnchorBar } from "./components/StickyAnchorBar";
import imgFloor01 from "../assets/floor-01.jpeg";
import imgFloor03 from "../assets/floor-03.jpeg";
import imgFloor04 from "../assets/floor-04.jpeg";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { ProjectGallery } from "./components/ProjectGallery";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}




// ─── NAV TABS data ────────────────────────────────────────────────────────────
const NAV_TABS = [
  { id: "gallery", label: "Project Gallery" },
  { id: "cost", label: "Cost guide" },
  { id: "resources", label: "Resources" },
  { id: "buyer-seller", label: "Buyer & Seller guides" },
  { id: "job-stories", label: "Job stories" },
  { id: "faq", label: "FAQs" },
  { id: "reviews", label: "Reviews" },
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Education Center</span>
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.5vw,80px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 20, maxWidth: 800 }}>
            Homeowner education center
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.5)", lineHeight: 1.75, maxWidth: 560 }}>
            Cost guides, checklists, buyer/seller guides, and everything you need to make informed decisions about your home.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


// ─── 3. PROJECT GALLERY ───────────────────────────────────────────────────────
function GallerySection() {
  return <ProjectGallery id="gallery" />;
}

// ─── 4. COST GUIDE ───────────────────────────────────────────────────────────
const COST_CARDS = [
  { n: "01", title: "Crawl Space Repair", sub: "Costs vary by damage type", desc: "Precise estimate based on specific damage found — joists, beams, encapsulation or SmartJack systems.", range: "$1,800 – $8,500", low: 1800, high: 8500, tag: "Most common" },
  { n: "02", title: "Basement Waterproofing", sub: "Interior vs. exterior", desc: "Interior drainage systems, sump pumps, and wall panels. Exterior excavation when needed.", range: "$3,000 – $12,000", low: 3000, high: 12000, tag: null },
  { n: "03", title: "Foundation Repair", sub: "Pier type and count change everything", desc: "Push piers, helical piers, wall anchors. Cost scales directly with pier count and depth.", range: "$4,500 – $20,000", low: 4500, high: 20000, tag: "High variance" },
  { n: "04", title: "Concrete Leveling", sub: "No two slabs are the same", desc: "Polyurethane foam lifting for driveways, walkways, pool decks, and garage floors.", range: "$800 – $4,200", low: 800, high: 4200, tag: "Fast turnaround" },
  { n: "05", title: "Memphis, TN Guide", sub: "Local pricing for Memphis homeowners", desc: "Clay-heavy soil drives unique pricing in the Memphis metro — what locals actually pay.", range: "$2,000 – $14,000", low: 2000, high: 14000, tag: null },
  { n: "06", title: "Nashville, TN Guide", sub: "Highly variable soil conditions", desc: "Karst limestone bedrock and variable fill soils make Nashville one of the most complex markets.", range: "$3,500 – $18,000", low: 3500, high: 18000, tag: null },
];

function CostCard({ card, index, isActive, onHover }: {
  card: typeof COST_CARDS[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pct = Math.round(((card.low + card.high) / 2 / card.high) * 100);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col h-full overflow-hidden cursor-pointer"
      style={{
        background: CHAR,
        border: `1px solid ${isActive ? "rgba(196,171,108,0.4)" : "rgba(255,255,255,0.06)"}`,
        transition: "border-color .25s",
      }}
    >
      {/* Spotlight */}
      <div style={{
        position: "absolute", inset: 0, opacity: isActive ? 1 : 0,
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(196,171,108,0.08) 0%, transparent 65%)`,
        transition: "opacity .3s",
        pointerEvents: "none",
      }} />

      {/* Top bar accent */}
      <motion.div
        style={{ height: 2, background: SAND, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <div className="flex flex-col flex-1 p-7">
        {/* Number + tag row */}
        <div className="flex items-start justify-between mb-6">
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 13, color: "rgba(196,171,108,0.5)", letterSpacing: 2 }}>{card.n}</span>
          {card.tag && (
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: SAND, letterSpacing: 2, textTransform: "uppercase", border: "1px solid rgba(196,171,108,0.3)", padding: "3px 8px" }}>
              {card.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(18px,1.6vw,22px)", color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
          {card.title}
        </h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13, color: SAND, marginBottom: 10, opacity: 0.8 }}>{card.sub}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.7, flex: 1, marginBottom: 22 }}>{card.desc}</p>

        {/* Price range */}
        <div style={{ marginBottom: 18 }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-0.5px" }}>{card.range}</span>
          </div>
          {/* Bar */}
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: `linear-gradient(90deg, ${SAND}88, ${SAND})`, borderRadius: 2, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? pct / 100 : 0 }}
              transition={{ duration: 1.1, delay: index * 0.07 + 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.25)" }}>Min</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.25)" }}>Max</span>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: isActive ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>Read full guide</span>
          <motion.div animate={{ x: isActive ? 3 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={13} color={SAND} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CostGuideSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="cost" style={{ background: DARK }} className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header */}
        <div ref={titleRef} className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Cost guide</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px" }}>
              What does it<br />really cost?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-3"
          >
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.4)", maxWidth: 260, textAlign: "right", lineHeight: 1.6 }}>
              Real price ranges based on 12,000+ jobs across TN, AR, MS & MO.
            </p>
            <button className="group inline-flex items-center gap-2 px-6 py-3"
              style={{ border: "1px solid rgba(196,171,108,.4)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", cursor: "pointer", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,171,108,.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}>
              View all guides
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" color={SAND} />
            </button>
          </motion.div>
        </div>

        {/* Grid — 3 col row 1, 3 col row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {COST_CARDS.slice(0, 3).map((card, i) => (
            <CostCard key={card.n} card={card} index={i} isActive={activeCard === i} onHover={setActiveCard} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COST_CARDS.slice(3).map((card, i) => (
            <CostCard key={card.n} card={card} index={i + 3} isActive={activeCard === i + 3} onHover={setActiveCard} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── 5. DOWNLOAD RESOURCES ────────────────────────────────────────────────────
const RESOURCE_ITEMS = [
  { pages: "2 pages", title: "Symptom Checklist", desc: "Before your inspection — document every symptom you've noticed around your home." },
  { pages: "8 pages", title: "Buyer & Seller Guide", desc: "Everything you need to know about structural issues when buying or selling a home." },
  { pages: "4 pages", title: "Seasonal Maintenance Plan", desc: "Month-by-month checklist to keep your crawl space and foundation in top condition." },
  { pages: "6 pages", title: "Financing Guide", desc: "Understand all payment options and how to apply for 0% financing for qualified homeowners." },
];

function ResourcesDownloadSection() {
  return (
    <section id="resources" style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-[2px]" style={{ background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Resources</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
              Download what matters
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
              Checklists, guides, and maintenance plans to keep your home strong.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCE_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="group flex flex-col h-full p-7 transition-colors" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                {/* Icon + pages */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: "rgba(26,82,168,.2)", border: "1px solid rgba(26,82,168,.3)" }}>
                    <FileText size={20} color={B} strokeWidth={1.5} />
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: 0.5 }}>{item.pages}</span>
                </div>
                {/* Tag */}
                <div className="inline-flex items-center px-2 py-0.5 mb-4 w-fit" style={{ background: "rgba(196,171,108,.12)", border: "1px solid rgba(196,171,108,.2)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>PDF</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{item.desc}</p>
                <button className="group/btn inline-flex items-center gap-2 px-5 py-2.5 transition-opacity hover:opacity-85 w-fit"
                  style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}>
                  <Download size={13} />
                  Download
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. BUYER & SELLER GUIDES ─────────────────────────────────────────────────
const PERSONA_DATA = {
  buyer: {
    label: "Buying a home",
    icon: "🏠",
    headline: "Know what you're buying before you close",
    subline: "Foundation issues can cost $4,000–$20,000 to fix. These guides help you identify risks, understand costs, and negotiate like a professional.",
    featured: {
      badge: "Most downloaded",
      title: "Complete Buyer's Foundation Guide",
      pages: "12 pages",
      desc: "Everything you need before making an offer. Understand foundation types, common defects, repair costs, and how to negotiate effectively with sellers.",
      topics: ["Foundation crack types & severity ratings", "What general inspectors typically miss", "Real repair cost ranges by issue type", "Negotiation scripts & offer reduction templates"],
    },
    guides: [
      { title: "Pre-Offer Symptom Checklist", pages: "2 pages", desc: "Walk any home with confidence — identify red flags before your inspector does." },
      { title: "Repair Cost Estimator Guide", pages: "5 pages", desc: "Real price ranges for every foundation and crawl space repair type in TN, AR, MS & MO." },
      { title: "What Your Inspector Won't Tell You", pages: "4 pages", desc: "The gap between a home inspection and a structural assessment — and why it matters." },
    ],
  },
  seller: {
    label: "Selling a home",
    icon: "🏡",
    headline: "Protect your sale price before you list",
    subline: "Buyers' agents are trained to spot structural issues and use them to negotiate. Get ahead of it with the right information.",
    featured: {
      badge: "Top rated",
      title: "Seller's Pre-Listing Repair Guide",
      pages: "9 pages",
      desc: "Know exactly what to fix, what to disclose, and how to price your home when structural issues are present. Maximize your net sale price.",
      topics: ["Disclosure requirements by state (TN, AR, MS, MO)", "Fix vs. price reduction: a decision framework", "How buyers' agents view foundation issues", "Pre-sale inspection walkthrough checklist"],
    },
    guides: [
      { title: "Disclosure Requirements by State", pages: "3 pages", desc: "What you're legally required to share in TN, AR, MS & MO when selling a home." },
      { title: "Fix or Price Reduction?", pages: "4 pages", desc: "A clear decision framework when a buyer's inspector flags structural concerns." },
      { title: "Maximize Sale Price Guide", pages: "5 pages", desc: "Which repairs return the most at closing — and which ones you can safely skip." },
    ],
  },
};

function BuyerSellerSection() {
  const [persona, setPersona] = useState<"buyer" | "seller">("buyer");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const data = PERSONA_DATA[persona];

  return (
    <section id="buyer-seller" style={{ background: CHAR }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Buyer &amp; Seller</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,56px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", flex: 1 }}>
              Guides for every<br />side of the table
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.4)", lineHeight: 1.7, maxWidth: 380 }}>
              Whether you're buying or selling, structural issues at closing can make or break the deal. Know your position.
            </p>
          </div>
        </motion.div>

        {/* ── Persona selector tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-3 mb-10"
        >
          {(["buyer", "seller"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPersona(p)}
              className="relative px-6 py-3 flex items-center gap-2.5 transition-all"
              style={{
                fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14,
                background: persona === p ? "#fff" : "transparent",
                color: persona === p ? DARK : "rgba(255,255,255,.45)",
                border: `1.5px solid ${persona === p ? "#fff" : "rgba(255,255,255,.15)"}`,
                cursor: "pointer", letterSpacing: 0.3,
              }}
            >
              <span style={{ fontSize: 16 }}>{PERSONA_DATA[p].icon}</span>
              {PERSONA_DATA[p].label}
              {persona === p && (
                <motion.div
                  layoutId="persona-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: B }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Context strip ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={persona + "-context"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row lg:items-center gap-4 mb-12 p-5"
            style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}
          >
            <div className="flex-1">
              <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 6 }}>{data.headline}</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>{data.subline}</p>
            </div>
            <button
              onClick={openInspection}
              className="inline-flex items-center gap-2 px-5 py-3 shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
            >
              Free inspection first <ArrowRight size={13} />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* ── Content: featured + side guides ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, x: persona === "buyer" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: persona === "buyer" ? 16 : -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-5"
          >
            {/* Featured guide — 3/5 width */}
            <div className="lg:col-span-3 flex flex-col" style={{ background: DARK, border: "1px solid rgba(255,255,255,.08)" }}>
              {/* Visual top */}
              <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 200, background: `linear-gradient(135deg, ${B}22 0%, rgba(196,171,108,.1) 100%)`, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                {/* Decorative document mockup */}
                <div className="relative" style={{ width: 120, height: 155 }}>
                  <div className="absolute inset-0" style={{ background: "#fff", borderRadius: 4, boxShadow: "0 8px 40px rgba(0,0,0,.4)" }} />
                  <div style={{ padding: "16px 14px" }}>
                    <div style={{ height: 6, background: B, borderRadius: 2, marginBottom: 10, width: "70%" }} />
                    {[100, 85, 90, 75, 65].map((w, i) => (
                      <div key={i} style={{ height: 4, background: `rgba(0,0,0,${i === 0 ? .12 : .06})`, borderRadius: 2, marginBottom: 6, width: `${w}%` }} />
                    ))}
                    <div style={{ height: 1, background: "rgba(0,0,0,.08)", margin: "10px 0" }} />
                    {[80, 70].map((w, i) => (
                      <div key={i} style={{ height: 4, background: "rgba(0,0,0,.06)", borderRadius: 2, marginBottom: 6, width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                {/* Badge */}
                <span style={{
                  position: "absolute", top: 16, right: 16,
                  fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
                  color: DARK, letterSpacing: 2, textTransform: "uppercase",
                  background: SAND, padding: "4px 10px",
                }}>{data.featured.badge}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: SAND, letterSpacing: 2.5, textTransform: "uppercase", border: "1px solid rgba(196,171,108,.3)", padding: "3px 8px" }}>PDF</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.3)" }}>{data.featured.pages}</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
                  {data.featured.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 20 }}>
                  {data.featured.desc}
                </p>
                {/* Topics */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {data.featured.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, shrink: 0 }}><path d="M20 6L9 17l-5-5" stroke={SAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{t}</span>
                    </li>
                  ))}
                </ul>
                <button className="inline-flex items-center gap-2 px-6 py-3.5 hover:opacity-90 transition-opacity self-start"
                  style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
                  <Download size={14} /> Download free guide
                </button>
              </div>
            </div>

            {/* Side guides — 2/5 width */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {data.guides.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col flex-1 p-6 group"
                  style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)", cursor: "pointer", transition: "border-color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(196,171,108,.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,.07)")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText size={15} color={SAND} strokeWidth={1.5} />
                      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>PDF</span>
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.25)" }}>{g.pages}</span>
                  </div>
                  <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>{g.title}</h4>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{g.desc}</p>
                  <div className="flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    <Download size={12} color={SAND} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>Download</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

// ─── 7. JOB STORIES ──────────────────────────────────────────────────────────
const JOB_STORIES = [
  { name: "Jennifer M.", type: "Crawl Space", loc: "Memphis, TN", img: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800" },
  { name: "Robert T.", type: "Foundation", loc: "Jonesboro, AR", img: "https://images.unsplash.com/photo-1708214148950-ccbb69d40e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800" },
  { name: "Jennifer M.", type: "Waterproofing", loc: "Memphis, TN", img: "https://images.unsplash.com/photo-1766497278321-dff63e463f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800" },
];

function JobStoriesSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <section id="job-stories" style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-[2px]" style={{ background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Job stories</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              Real jobs, real results
            </h2>
          </div>
          <button onClick={() => onNavigate?.("job-stories")} className="group inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Read all job stories
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOB_STORIES.map((story, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex flex-col gap-0" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                {/* Video thumb */}
                <div className="relative overflow-hidden group" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={story.img} alt={story.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "rgba(10,11,20,.4)" }} />
                  <button onClick={() => setPlaying(playing === i ? null : i)}
                    className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 flex items-center justify-center transition-transform hover:scale-110"
                      style={{ background: playing === i ? SAND : B, borderRadius: "50%" }}>
                      <Play size={20} color="#fff" fill="#fff" />
                    </div>
                  </button>
                </div>
                {/* Tags + name */}
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {[story.type, story.loc].map((t) => (
                      <span key={t} className="px-2.5 py-1" style={{ background: "rgba(255,255,255,.07)", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,.6)" }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{story.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. FAQ ───────────────────────────────────────────────────────────────────
const FAQ_FILTERS = ["All", "Crawl Space", "Basement", "Foundation", "Concrete", "Commercial"];
const FAQS = [
  { q: "How long does crawl space repair take?", a: "Most repairs take 1–2 days. Encapsulation on larger spaces may take 2–3 days. We'll give you a specific timeline during your inspection.", cat: "Crawl Space" },
  { q: "Do you offer financing?", a: "Yes. We work with trusted lenders to make repairs affordable. Flexible terms and competitive rates are available for qualified homeowners.", cat: "All" },
  { q: "What areas do you serve?", a: "We serve communities across Tennessee, Arkansas, Mississippi, and Missouri — including Memphis, Nashville, Jackson, Southaven, Little Rock, Jonesboro, Springfield, and Cape Girardeau.", cat: "All" },
  { q: "Are your installers certified?", a: "Every installer is trained and certified in our methods. We stand behind their work with a lifetime transferable warranty.", cat: "All" },
  { q: "Is a sagging floor a structural emergency?", a: "Not always immediately, but it should be inspected soon. The underlying cause will continue to worsen over time. Early action saves money.", cat: "Crawl Space" },
  { q: "How much does basement waterproofing cost?", a: "Interior waterproofing typically runs $3,000–$10,000 depending on square footage and system type. Exterior waterproofing is more involved. We give a free written quote after inspection.", cat: "Basement" },
  { q: "How are push piers installed?", a: "We drive steel piers through unstable soil to bedrock, then lift and stabilize the foundation. Most installations take 1 day and require no major excavation.", cat: "Foundation" },
  { q: "Will my homeowner's insurance cover this?", a: "Coverage depends on your policy and the cause of damage. We'll provide detailed documentation to help with your claim where applicable.", cat: "All" },
];

function FaqSection() {
  const [open, setOpen] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = FAQS.filter((f) => activeFilter === "All" || f.cat === activeFilter || f.cat === "All");

  return (
    <section id="faq" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-5 h-[1px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>FAQs</span>
            <div className="w-5 h-[1px]" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.5vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Frequently asked questions
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.5)" }}>Find answers about our services and process</p>
        </Reveal>

        {/* Filter pills */}
        <Reveal delay={0.05} className="flex items-center gap-2 flex-wrap justify-center mb-12">
          {FAQ_FILTERS.map((f) => (
            <button key={f} onClick={() => { setActiveFilter(f); setOpen(""); }}
              className="transition-all duration-200 px-5 py-2"
              style={{
                fontFamily: "'Inter',sans-serif", fontWeight: activeFilter === f ? 600 : 400, fontSize: 14,
                color: activeFilter === f ? DARK : "rgba(255,255,255,.6)",
                background: activeFilter === f ? SAND : "transparent",
                border: `1.5px solid ${activeFilter === f ? SAND : "rgba(255,255,255,.15)"}`,
                cursor: "pointer",
              }}>{f}</button>
          ))}
        </Reveal>

        <div className="max-w-[768px] mx-auto">
          <style>{`
            @keyframes rFaqDown { from { height: 0; opacity: 0; } to { height: var(--radix-accordion-content-height); opacity: 1; } }
            @keyframes rFaqUp { from { height: var(--radix-accordion-content-height); opacity: 1; } to { height: 0; opacity: 0; } }
            [data-state=open].rfaq { animation: rFaqDown 0.22s ease-out; }
            [data-state=closed].rfaq { animation: rFaqUp 0.16s ease-in; }
          `}</style>
          <AccordionPrimitive.Root type="single" value={open} onValueChange={setOpen} collapsible>
            {filtered.map((faq, i) => (
              <AccordionPrimitive.Item key={i} value={String(i)} className="mb-3 overflow-hidden"
                style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", flex: 1, paddingRight: 16, lineHeight: 1.4 }}>{faq.q}</span>
                    <div className="shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 group-data-[state=open]:rotate-45"
                      style={{ border: `1.5px solid ${open === String(i) ? SAND : "rgba(255,255,255,.2)"}`, color: open === String(i) ? SAND : "rgba(255,255,255,.4)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden rfaq">
                  <div className="px-6 pb-6 pt-1">
                    <div className="h-px mb-4" style={{ background: "rgba(255,255,255,.06)" }} />
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.8 }}>{faq.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>

          <Reveal delay={0.1}>
            <div className="mt-10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
              <div>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 4 }}>Still have questions?</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)" }}>Our team is available Mon–Sat, 8am–6pm.</p>
              </div>
              <a href="#" className="group inline-flex items-center gap-2 px-6 py-3 shrink-0 transition-opacity hover:opacity-85"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                Contact us
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 9. REVIEWS ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.",
    name: "Victoria E.", loc: "Memphis, TN", stars: 5, img: imgFloor01,
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!",
    name: "Elizabeth N.", loc: "Collierville, TN", stars: 5, img: imgFloor03,
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5, img: imgFloor04,
  },
];

function ReviewsSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [cur, setCur] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section id="reviews" style={{ background: CHAR }} className="py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Reviews</p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              What customers say about us
            </h2>
            {onNavigate && (
              <button
                onClick={() => onNavigate("reviews")}
                className="group inline-flex items-center gap-1.5 mt-4"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Read all reviews
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={scrollPrev}
              className="w-11 h-11 flex items-center justify-center transition-colors"
              style={{ border: "1px solid rgba(255,255,255,.2)", background: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={scrollNext}
              className="w-11 h-11 flex items-center justify-center transition-colors"
              style={{ border: "1px solid rgba(255,255,255,.2)", background: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.45)" }}>
                  <button className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(196,171,108,.25)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.7)", lineHeight: 1.75, flex: 1, marginBottom: 24 }}>{t.quote}</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: B }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 13, color: "#fff" }}>{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{t.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10 px-8">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? SAND : "rgba(255,255,255,.2)" }} />
        ))}
      </div>
    </section>
  );
}

// ─── 10. CTA ─────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0B1C4A" }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt="Schedule inspection" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.86)" }} />
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
            Ready to protect<br />your home?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · No pressure · Same-week availability
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#0B1C4A" }}>
              <span className="relative z-10">Schedule Free Inspection</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color="#0B1C4A" />
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────
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
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="inline-flex items-center gap-2 px-5 py-3" style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
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

// ─── ResourcesPage ────────────────────────────────────────────────────────────
export default function ResourcesPage({ onBack, onNavigate, scrollTo: initialSection }: { onBack: () => void; onNavigate?: (p: string) => void; scrollTo?: string }) {
  const [activeTab, setActiveTab] = useState(initialSection ?? "gallery");

  useEffect(() => {
    if (initialSection) {
      const attempt = () => {
        const el = document.getElementById(initialSection);
        if (el) {
          const offset = 145;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      const t = setTimeout(attempt, 120);
      return () => clearTimeout(t);
    }
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 145;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Track active tab on scroll
  useEffect(() => {
    const sections = NAV_TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const handler = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY + 160 >= sections[i].offsetTop) {
          setActiveTab(NAV_TABS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Resources" />
        <StickyAnchorBar tabs={NAV_TABS} active={activeTab} onChange={scrollTo} />
      </div>

      <div className="w-full min-h-screen pt-[136px] md:pt-[196px]" style={{ background: "#0A0B14" }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Resources</span>
          </div>
        </div>

        <HeroSection />
        <GallerySection />
        <CostGuideSection />
        <ResourcesDownloadSection />
        <BuyerSellerSection />
        <JobStoriesSection onNavigate={onNavigate} />
        <FaqSection />
        <ReviewsSection onNavigate={onNavigate} />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
