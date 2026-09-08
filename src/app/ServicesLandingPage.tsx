import React, { useState } from "react";
import { motion } from "motion/react";
import { openInspection } from "./components/InspectionModal";
import { ChevronRight } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { SERVICES as SERVICE_DEFS } from "./data/services";

// ─── Design tokens ────────────────────────────────────────────────────────────
import { B, DARK, NAVY, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";
const WHITE = "#FFFFFF";
const CF    = "'Articulat CF',sans-serif";
const INTER = "'Inter',sans-serif";


// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = [
    { head: "Services",  links: ["Structural Repair", "Crawl Space Repair", "Waterproofing", "Concrete Services", "Commercial Services"] },
    { head: "Company",   links: ["About Us", "Our Difference", "Resources", "Careers", "Financing"] },
    { head: "Locations", links: ["Tennessee", "Mississippi", "Arkansas", "Missouri"] },
    { head: "Contact",   links: ["1-833-584-1049", "info@redeemersgroup.com", "Schedule Inspection", "Customer Portal"] },
  ];
  return (
    <footer style={{ background: SURFACE.footer, borderTop: "1px solid rgba(255,255,255,.07)" }} className="pt-16 pb-10 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {cols.map(col => (
            <div key={col.head}>
              <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
                {col.head}
              </p>
              <div className="flex flex-col gap-3">
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.55)", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: INTER, fontSize: 12, color: "rgba(255,255,255,.3)" }}>
            © 2026 Redeemers Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy policy", "Terms of service", "Cookies settings"].map(l => (
              <a key={l} href="#" style={{ fontFamily: INTER, fontSize: 12, color: "rgba(255,255,255,.3)", textDecoration: "underline" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function CategoryBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block", padding: "5px 14px",
      background: "rgba(0,80,159,.08)", border: "1px solid rgba(0,80,159,.25)",
      fontFamily: CF, fontWeight: 700, fontSize: 10, color: B,
      letterSpacing: 2.5, textTransform: "uppercase",
    }}>
      {label}
    </span>
  );
}


// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = {
  crawlSpace: {
    category: "Crawl Space Repair",
    title: "Floor joist repair\n& encapsulation",
    body: "Sagging floors, wood rot, and moisture infiltration — all solved with SmartJack systems and full crawl space encapsulation backed by a lifetime warranty.",
    symptoms: SERVICE_DEFS["crawl-space-repair"].symptoms.map((s) => s.q),
    img: SERVICE_DEFS["crawl-space-repair"].heroImg,
  },
  waterproofing: {
    category: "Waterproofing",
    title: "Interior drainage\nsolutions",
    body: "Interior drainage channels, sump pumps, and wall encapsulation stop water at the source before it damages your home.",
    symptoms: SERVICE_DEFS["waterproofing"].symptoms.slice(0, 4).map((s) => s.q),
    img: SERVICE_DEFS["waterproofing"].heroImg,
  },
  foundation: {
    // Sitemap calls this service line "Structural Repair" — the home node's
    // older "Foundation repair" label is not used anywhere on the site.
    category: "Structural Repair",
    title: "Slab repair\n& stabilization",
    body: "From sinking piers to bowing walls — we restore your foundation to its original position using helical piers and carbon fiber reinforcement.",
    symptoms: SERVICE_DEFS["structural-repair"].symptoms.slice(0, 4).map((s) => s.q),
    img: SERVICE_DEFS["structural-repair"].heroImg,
  },
  concrete: {
    category: "Concrete Services",
    title: "Lifting\n& leveling",
    body: "PolyLevel foam injection lifts and levels sinking slabs — driveways, walkways, and pool decks — in hours, not days.",
    symptoms: SERVICE_DEFS["concrete-services"].symptoms.slice(0, 4).map((s) => s.q),
    img: SERVICE_DEFS["concrete-services"].heroImg,
  },
  commercial: {
    category: "Commercial Services",
    title: "Geotechnical &\nstructural solutions",
    body: "As a foundation repair specialist, we provide foundation and concrete services for existing residential, commercial, and industrial structures — backed by engineering-grade systems.",
    img: SERVICE_DEFS["commercial-services"].heroImg,
  },
};

// ─── Page sections ────────────────────────────────────────────────────────────

function IntroSection() {
  return (
    <section style={{ background: SURFACE.base }} className="py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start lg:items-center">
          <div className="flex-1">
            <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
              Services
            </p>
            <h1 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>
              What can we<br />help you fix?
            </h1>
          </div>
          <div className="flex-1 lg:max-w-[480px]">
            <p style={{ fontFamily: INTER, fontSize: 18, color: "rgba(62,60,73,.6)", lineHeight: 1.7 }}>
              From sagging floors to flooded basements — every problem has a permanent solution, backed by our lifetime warranty and 17 years of experience.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {["Crawl Space", "Waterproofing", "Foundation", "Concrete"].map(s => (
                <span key={s} style={{
                  padding: "6px 14px", background: "rgba(0,80,159,.12)", border: "1px solid rgba(0,80,159,.3)",
                  fontFamily: CF, fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2.5, textTransform: "uppercase",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Each card routes to its own service page — slugs match data/services.ts and
// the sitemap's Services branch (five services, no Mold Prevention).
const CARD_SLUGS = {
  crawlSpace: "crawl-space-repair",
  waterproofing: "waterproofing",
  foundation: "structural-repair",
  concrete: "concrete-services",
  commercial: "commercial-services",
} as const;

// Compact scan tile — one per service line, text only. Client QA (Rosie +
// Paula): the earlier full-width row version forced a long scroll before a
// homeowner could see all five options, which defeats the "that's not me...
// that's me" scan — it has to land in one glance. A 3-column grid puts all
// five on screen together instead of stacked one under the other; body and
// symptom list are trimmed to what fits a short tile (2-line clamp, top 2
// symptoms) — "View more" still leads to the full list on the detail page.
// The photo isn't gone — it floats near the cursor on hover
// (HoverImagePreview) instead of living in the tile.
function ServiceRow({
  category, title, body, symptoms, onNavigate, onHover, active,
}: {
  category: string; title: string; body: string; symptoms?: string[]; onNavigate: () => void; onHover: () => void; active: boolean;
}) {
  // Client QA: the tile only offered "Free inspection" — which actually
  // navigated to the service page rather than opening the inspection modal,
  // and gave homeowners no way to just read about the service first. Now the
  // whole tile still navigates on click (browsing gesture), but the two
  // bottom links are real and distinct: "Free inspection" opens the modal,
  // "View service" is the explicit link to the detail page. Both stop
  // propagation so they don't double-fire the tile's own onClick.
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onNavigate}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigate(); }}
      onMouseEnter={onHover}
      onFocus={onHover}
      className="group flex flex-col h-full text-left transition-colors"
      style={{ padding: "22px 22px 20px", minHeight: 210, border: `1px solid ${ON_LIGHT.border}`, background: active ? ON_LIGHT.wash : SURFACE.base, cursor: "pointer" }}
    >
      <div style={{ marginBottom: 10 }}>
        <CategoryBadge label={category} />
      </div>
      <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: 20, color: CHAR, lineHeight: 1.2, letterSpacing: "-0.3px", marginBottom: 8, whiteSpace: "pre-line" }}>
        {title}
      </h3>
      <p style={{
        fontFamily: INTER, fontSize: 14, color: MUTED, lineHeight: 1.55, marginBottom: symptoms ? 12 : 0,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {body}
      </p>
      {symptoms && (
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 16 }}>
          {symptoms.slice(0, 2).map((s) => (
            <span key={s} style={{ padding: "3px 10px", background: ON_LIGHT.wash, border: `1px solid ${ON_LIGHT.border}`, fontFamily: INTER, fontSize: 11, color: ON_LIGHT.body }}>
              {s}
            </span>
          ))}
          {symptoms.length > 2 && (
            <span style={{ padding: "3px 10px", fontFamily: INTER, fontSize: 11, color: MUTED }}>+{symptoms.length - 2} more</span>
          )}
        </div>
      )}
      <div className="mt-auto flex items-center gap-4 flex-wrap">
        {symptoms && (
          <button
            onClick={(e) => { e.stopPropagation(); openInspection(); }}
            style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Free inspection
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(); }}
          className="group/link inline-flex items-center gap-1.5"
          style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          {symptoms ? "View service" : "Explore service"}
          <ChevronRight size={14} color={B} className="transition-transform group-hover/link:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

// Pinned panel that fills the empty space beside the (narrower) grid, and
// crossfades to whichever tile is hovered/focused. Client QA: a floating
// cursor-follow preview left that space blank — the photo belongs in it.
function ServiceImagePanel({ items, active }: { items: { img: string; alt: string }[]; active: number }) {
  return (
    <div className="hidden lg:block relative flex-1 overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={it.alt}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <ImageWithFallback src={it.img} alt={it.alt} className="absolute inset-0 w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

const HANDLE_ROWS = [
  { key: "crawlSpace", alt: "Crawl space repair" },
  { key: "waterproofing", alt: "Waterproofing" },
  { key: "foundation", alt: "Foundation repair" },
  { key: "concrete", alt: "Concrete services" },
  { key: "commercial", alt: "Commercial services" },
] as const;

function WhatWeHandleSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section style={{ background: SURFACE.alt }} className="py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Section header */}
        <div className="text-center mb-10">
          <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>
            Common Problems
          </p>
          <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(28px,3.4vw,46px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            What we handle
          </h2>
          <p style={{ fontFamily: INTER, fontSize: 16, color: MUTED, lineHeight: 1.6 }}>
            Every home needs different care — find what matches yours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-[680px] shrink-0">
            {HANDLE_ROWS.map((row, i) => {
              const s = SERVICES[row.key];
              return (
                <ServiceRow
                  key={row.key}
                  category={s.category}
                  title={s.title}
                  body={s.body}
                  symptoms={"symptoms" in s ? s.symptoms : undefined}
                  onNavigate={() => onNavigate(`service/${CARD_SLUGS[row.key]}`)}
                  active={activeIdx === i}
                  onHover={() => setActiveIdx(i)}
                />
              );
            })}
          </div>
          <ServiceImagePanel
            items={HANDLE_ROWS.map((row) => ({ img: SERVICES[row.key].img, alt: row.alt }))}
            active={activeIdx}
          />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { num: "12,250+", label: "Homes protected" },
    { num: "17 yrs",  label: "In business" },
    { num: "4.9★",   label: "Average rating" },
    { num: "Lifetime", label: "Warranty" },
  ];
  return (
    <section style={{ background: SURFACE.base, borderTop: "1px solid rgba(62,60,73,.06)", borderBottom: "1px solid rgba(62,60,73,.06)" }} className="py-8 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: B, lineHeight: 1, marginBottom: 6 }}>
                {s.num}
              </p>
              <p style={{ fontFamily: INTER, fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ background: "#00509F", position: "relative", overflow: "hidden" }} className="py-16 lg:py-20 px-8 md:px-14">
      {/* Ghost text */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(80px,12vw,160px)", color: "rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: "-4px", userSelect: "none", whiteSpace: "nowrap" }}>
          Get Started
        </p>
      </div>
      <div className="max-w-[768px] mx-auto text-center" style={{ position: "relative" }}>
        <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
          Free Inspection
        </p>
        <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 20 }}>
          Ready to protect<br />your home?
        </h2>
        <p style={{ fontFamily: INTER, fontSize: 17, color: "rgba(255,255,255,.7)", lineHeight: 1.6, marginBottom: 40 }}>
          Free inspection · No pressure · Same-week availability
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: WHITE, fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "#00509F", padding: "15px 28px", textDecoration: "none" }}
            className="hover:opacity-95 transition-opacity">
            Schedule Free Inspection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#00509F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="tel:+18335841049" style={{ fontFamily: INTER, fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,.7)", borderBottom: "1px solid rgba(255,255,255,.3)", paddingBottom: 2, textDecoration: "none" }}>
            or call 1-833-584-1049
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesLandingPage({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (p: string) => void;
}) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? onBack} active="Services" />
      </div>

      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[{ label: "Home", onClick: onBack }, { label: "Services" }]} />

        <IntroSection />
        <TrustBar />
        <WhatWeHandleSection onNavigate={onNavigate} />
        <CTASection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
