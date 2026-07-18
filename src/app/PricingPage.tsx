import { useState, useEffect, useRef } from "react";
import { openInspection } from "./components/InspectionModal";
import { motion, useInView } from "motion/react";
import { ChevronRight, ArrowRight, FileText, Download, MapPin } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { StickyAnchorBar } from "./components/StickyAnchorBar";
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



// ─── Nav Tabs ─────────────────────────────────────────────────────────────────
const PRICING_TABS = [
  { id: "buyer-seller",    label: "Buyer & Seller Guides" },
  { id: "cost-by-service", label: "Cost by Service" },
  { id: "cost-by-city",    label: "Cost by City" },
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: DARK, paddingTop: 80, paddingBottom: 88 }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,11,20,0) 0%, rgba(10,11,20,.95) 100%)" }} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span style={{ display: "block", width: 32, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Pricing
            </span>
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,80px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 20, maxWidth: 760 }}>
            Transparent pricing<br />for every homeowner
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            No hidden fees, no surprise quotes. Understand what structural repairs actually cost — broken down by service and by city — before we ever knock on your door.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
              Schedule Free Inspection
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#cost-by-service" className="inline-flex items-center gap-2"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,.5)", borderBottom: "1px solid rgba(255,255,255,.2)", paddingBottom: 2 }}>
              View cost guides
            </a>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={0.15} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,.06)" }}>
            {[
              { num: "$0",    label: "Inspection fee" },
              { num: "48h",   label: "Avg. estimate turnaround" },
              { num: "0%",    label: "Financing available" },
              { num: "100%",  label: "Price-match guarantee" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 px-6 text-center" style={{ background: CHAR }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,44px)", color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>
                  {s.num}
                </span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 6 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 2. BUYER & SELLER GUIDES ─────────────────────────────────────────────────
const BUYER_SELLER_ITEMS = [
  { pages: "2 pages", title: "Symptom Checklist", desc: "Before your inspection — document every symptom you've noticed around your home." },
  { pages: "5 pages", title: "Buyer & Seller Guide", desc: "What to look for in a foundation inspection before closing on a home." },
  { pages: "3 pages", title: "Pre-Sale Inspection Guide", desc: "What sellers need to disclose and fix before listing to maximize value." },
  { pages: "4 pages", title: "Negotiation Toolkit", desc: "Use repair estimates to negotiate price reductions when buying a home." },
];

function BuyerSellerSection() {
  return (
    <section id="buyer-seller" style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ display: "block", width: 28, height: 2, background: SAND, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
                Buyer &amp; Seller
              </span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              Buyer &amp; seller guides
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.7, marginTop: 12, maxWidth: 520 }}>
              Downloadable guides to help buyers and sellers navigate structural issues during a real estate transaction.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BUYER_SELLER_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="flex flex-col h-full p-7" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: "rgba(26,82,168,.2)", border: "1px solid rgba(26,82,168,.3)" }}>
                    <FileText size={20} color={B} strokeWidth={1.5} />
                  </div>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,.3)" }}>
                    {item.pages}
                  </span>
                </div>
                <div className="inline-flex items-center px-2 py-0.5 mb-4 w-fit" style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.2)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>PDF</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>
                  {item.desc}
                </p>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 w-fit transition-opacity hover:opacity-85"
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

// ─── 3. COST BY SERVICE ───────────────────────────────────────────────────────
const COST_BY_SERVICE = [
  { title: "Crawl Space Repair", range: "$2,500 – $9,000", sub: "Varies by moisture damage & joist condition", desc: "Encapsulation, joist repair, and vapor barriers. Price depends on square footage and damage severity." },
  { title: "Basement Waterproofing", range: "$3,000 – $14,000", sub: "Interior vs. exterior makes a difference", desc: "Drainage systems, sump pumps, and wall sealants. Exterior excavation adds cost." },
  { title: "Foundation Repair", range: "$4,000 – $20,000+", sub: "Pier type and count change everything", desc: "Helical or push piers installed beneath your foundation. Complex jobs or multiple piers raise the total." },
  { title: "Concrete Leveling", range: "$800 – $3,500", sub: "No two slabs are the same", desc: "PolyLevel foam injection raises sunken concrete quickly. Size, access, and void depth affect the final number." },
  { title: "Mold Remediation", range: "$1,200 – $5,500", sub: "Depends on area affected and severity", desc: "Safe removal of mold growth in crawl spaces and basements, plus prevention treatments." },
  { title: "Insulation Replacement", range: "$1,500 – $6,000", sub: "Improves comfort and energy efficiency", desc: "Crawl space insulation removal and replacement with closed-cell spray foam or rigid boards." },
];

function CostByServiceSection() {
  return (
    <section id="cost-by-service" style={{ background: CHAR }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ display: "block", width: 28, height: 2, background: SAND, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
                Cost by service
              </span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              What does it really cost?
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.7, marginTop: 12, maxWidth: 520 }}>
              Typical ranges for TN, MS, and AR homeowners. Every home is different — your free inspection gives you an exact number.
            </p>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 px-6 py-3 shrink-0"
            style={{ border: `1.5px solid rgba(255,255,255,.2)`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.7)" }}>
            Get exact quote
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COST_BY_SERVICE.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07}>
              <div className="flex flex-col h-full p-8" style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="inline-flex items-center px-2 py-0.5 mb-5 w-fit" style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.18)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>Cost guide</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.5vw,32px)", color: SAND, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 8 }}>
                  {card.range}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
                  {card.sub}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>
                  {card.desc}
                </p>
                <button className="group inline-flex items-center gap-1.5"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Read full guide
                  <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" color={SAND} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. COST BY CITY ──────────────────────────────────────────────────────────
const COST_BY_CITY = [
  {
    city: "Memphis, TN",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    range: "$2,800 – $18,000",
    note: "High clay soil drives foundation movement more than most TN cities.",
  },
  {
    city: "Nashville, TN",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    range: "$3,200 – $20,000",
    note: "Variable soil conditions and older housing stock push average costs slightly higher.",
  },
  {
    city: "Jonesboro, AR",
    img: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    range: "$2,500 – $14,000",
    note: "Flat terrain reduces excavation costs; crawl space moisture is the most common issue.",
  },
  {
    city: "Little Rock, AR",
    img: "https://images.unsplash.com/photo-1549517045-bc93de075e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    range: "$2,600 – $15,500",
    note: "Mixed soil types across the metro. Basement waterproofing is among the most common repairs.",
  },
  {
    city: "Jackson, MS",
    img: "https://images.unsplash.com/photo-1580216643062-cf460548a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    range: "$2,400 – $13,500",
    note: "High humidity creates crawl space moisture issues nearly year-round. Encapsulation is most common.",
  },
  {
    city: "Chattanooga, TN",
    img: "https://images.unsplash.com/photo-1570149329479-2f7f2e92f2fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    range: "$2,700 – $16,000",
    note: "Hillside homes and limestone bedrock make foundation pier installation more complex.",
  },
];

function CostByCitySection() {
  return (
    <section id="cost-by-city" style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ display: "block", width: 28, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Cost by city
            </span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
            Local pricing for your market
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.7, marginTop: 12, maxWidth: 540 }}>
            Repair costs differ by market due to soil type, local labor rates, and common damage patterns. Here's what homeowners in our service area actually pay.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COST_BY_CITY.map((item, i) => (
            <Reveal key={item.city} delay={i * 0.07}>
              <div className="flex flex-col overflow-hidden" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                {/* City image */}
                <div className="relative overflow-hidden shrink-0" style={{ height: 160 }}>
                  <ImageWithFallback src={item.img} alt={item.city} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "rgba(10,11,20,.45)" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center gap-2">
                    <MapPin size={14} color={SAND} />
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                      {item.city}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2vw,30px)", color: SAND, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 8 }}>
                    {item.range}
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>
                    {item.note}
                  </p>
                  <button className="group inline-flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    View {item.city} guide
                    <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" color={SAND} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.86)" }} />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Get your exact number
            </span>
            <div className="h-[1px] w-8" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 16 }}>
            Ranges are a start.<br />Your home is unique.
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · No pressure · Same-week availability
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = [
    { h: "Services", ls: ["Crawl Space", "Basement Waterproofing", "Foundation Repair", "Concrete Leveling", "Mold Prevention", "Insulation"] },
    { h: "Company", ls: ["About Us", "Our Work", "Blog", "Careers", "Financing", "Contact"] },
    { h: "Service Areas", ls: ["Mississippi", "Tennessee", "Arkansas", "Missouri"] },
    { h: "Pricing", ls: ["Cost by Service", "Cost by City", "Buyer & Seller Guides", "Financing Options"] },
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
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              Free Inspection <ArrowRight size={13} />
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

// ─── PricingPage ──────────────────────────────────────────────────────────────
export default function PricingPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState("buyer-seller");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 155;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handler = () => {
      for (let i = PRICING_TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(PRICING_TABS[i].id);
        if (el && window.scrollY + 200 >= el.offsetTop) {
          setActiveTab(PRICING_TABS[i].id);
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
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Pricing" />
        <StickyAnchorBar tabs={PRICING_TABS} active={activeTab} onChange={scrollTo} />
      </div>
      <div className="w-full min-h-screen pt-[136px] md:pt-[196px]" style={{ background: DARK }}>
        <HeroSection />
        <BuyerSellerSection />
        <CostByServiceSection />
        <CostByCitySection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
