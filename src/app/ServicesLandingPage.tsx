import React from "react";
import { openInspection } from "./components/InspectionModal";
import { ChevronRight } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { AnnouncementBar } from "./components/AnnouncementBar";

// ─── Design tokens ────────────────────────────────────────────────────────────
const B     = "#1A52A8";
const DARK  = "#0A0B14";
const NAVY  = "#0B1C4A";
const CHAR  = "#1E2235";
const SAND  = "#C4AB6C";
const MUTED = "#6B6E85";
const WHITE = "#FFFFFF";
const CF    = "'Articulat CF',sans-serif";
const INTER = "'Inter',sans-serif";


// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = [
    { head: "Services",  links: ["Crawl Space Repair", "Waterproofing", "Foundation Repair", "Concrete Services", "Mold Prevention", "Commercial"] },
    { head: "Company",   links: ["About Us", "Our Difference", "Resources", "Careers", "Financing"] },
    { head: "Locations", links: ["Tennessee", "Mississippi", "Arkansas", "Missouri"] },
    { head: "Contact",   links: ["1-833-584-1049", "info@redeemersgroup.com", "Schedule Inspection", "Customer Portal"] },
  ];
  return (
    <footer style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,.07)", padding: "64px 56px 40px" }}>
      <div className="max-w-[1280px] mx-auto">
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
      background: "rgba(196,171,108,.15)", border: "1px solid rgba(196,171,108,.35)",
      fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND,
      letterSpacing: 2.5, textTransform: "uppercase",
    }}>
      {label}
    </span>
  );
}

function SymptomChips({ items }: { items: string[] }) {
  return (
    <div>
      <p style={{ fontFamily: INTER, fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        Common Symptoms
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map(s => (
          <span key={s} style={{
            padding: "4px 12px",
            background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
            fontFamily: INTER, fontSize: 12, color: "rgba(255,255,255,.6)",
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardCTAs({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onNavigate}
        style={{ display: "inline-flex", alignItems: "center", gap: 10, background: B, fontFamily: INTER, fontWeight: 600, fontSize: 14, color: WHITE, padding: "12px 22px", border: "none", cursor: "pointer" }}
        className="hover:opacity-90 transition-opacity"
      >
        Free inspection
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        onClick={onNavigate}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, padding: 0 }}
        className="hover:opacity-80 transition-opacity"
      >
        View more
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

function ExploreLink({ onNavigate }: { onNavigate: () => void }) {
  return (
    <button
      onClick={onNavigate}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, padding: 0 }}
      className="hover:opacity-80 transition-opacity"
    >
      Explore service
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
}

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = {
  crawlSpace: {
    category: "Crawl Space Repair",
    title: "Floor joist repair\n& encapsulation",
    body: "Sagging floors, wood rot, and moisture infiltration — all solved with SmartJack systems and full crawl space encapsulation backed by a lifetime warranty.",
    symptoms: ["My floors are sagging", "I smell mold", "Wood rot", "Energy loss", "Pests / vapor"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  waterproofing: {
    category: "Waterproofing",
    title: "Interior drainage\nsolutions",
    body: "Interior drainage channels, sump pumps, and wall encapsulation stop water at the source before it damages your home.",
    symptoms: ["Water intrusion", "Damp walls", "Mold & mildew", "Efflorescence"],
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  foundation: {
    category: "Foundation Repair",
    title: "Slab repair\n& stabilization",
    body: "From sinking piers to bowing walls — we restore your foundation to its original position using helical piers and carbon fiber reinforcement.",
    symptoms: ["Wall cracks", "Sticking doors / windows", "Uneven floors", "Bowing walls"],
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  concrete: {
    category: "Concrete Services",
    title: "Lifting\n& leveling",
    body: "PolyLevel foam injection lifts and levels sinking slabs — driveways, walkways, and pool decks — in hours, not days.",
    symptoms: ["Uneven slabs", "Sinking driveway", "Cracked pool deck", "Trip hazards"],
    img: "https://images.unsplash.com/photo-1583599740042-a9b67f5b8299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  mold: {
    category: "Mold Prevention",
    title: "I smell something musty",
    body: "Mold hides before you can see it. We find the moisture source and treat it before it spreads through your home — then seal it permanently.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  commercial: {
    category: "Commercial Services",
    title: "Geotechnical &\nstructural solutions",
    body: "As a foundation repair specialist, we provide foundation and concrete services for existing residential, commercial, and industrial structures — backed by engineering-grade systems.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
};

// ─── Page sections ────────────────────────────────────────────────────────────

function IntroSection() {
  return (
    <section style={{ background: DARK, padding: "96px 56px 80px" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center">
          <div className="flex-1">
            <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
              Services
            </p>
            <h1 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(36px,4.5vw,64px)", color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>
              What can we<br />help you fix?
            </h1>
          </div>
          <div className="flex-1 lg:max-w-[480px]">
            <p style={{ fontFamily: INTER, fontSize: 18, color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>
              From sagging floors to flooded basements — every problem has a permanent solution, backed by our lifetime warranty and 17 years of experience.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {["Crawl Space", "Waterproofing", "Foundation", "Concrete"].map(s => (
                <span key={s} style={{
                  padding: "6px 14px", background: "rgba(196,171,108,.12)", border: "1px solid rgba(196,171,108,.3)",
                  fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase",
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

function WhatWeHandleSection({ onNavigate }: { onNavigate: () => void }) {
  return (
    <section style={{ background: DARK, padding: "96px 56px 96px" }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Solutions
          </p>
          <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
            What we handle
          </h2>
          <p style={{ fontFamily: INTER, fontSize: 17, color: MUTED, lineHeight: 1.6 }}>
            Every home needs different care — here's what we specialize in.
          </p>
        </div>

        {/* Bento grid row 1: 2 columns */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">

          {/* Left column */}
          <div className="flex flex-col gap-6 flex-1">

            {/* Card A — Crawl Space (tall, content + image) */}
            <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "40px 40px 32px" }}>
                <div style={{ marginBottom: 20 }}>
                  <CategoryBadge label={SERVICES.crawlSpace.category} />
                </div>
                <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 16, whiteSpace: "pre-line" }}>
                  {SERVICES.crawlSpace.title}
                </h3>
                <p style={{ fontFamily: INTER, fontSize: 15, color: MUTED, lineHeight: 1.65, marginBottom: 28 }}>
                  {SERVICES.crawlSpace.body}
                </p>
                <div style={{ marginBottom: 28 }}>
                  <SymptomChips items={SERVICES.crawlSpace.symptoms} />
                </div>
                <CardCTAs onNavigate={onNavigate} />
              </div>
              <div style={{ height: 320, flexShrink: 0, position: "relative" }}>
                <ImageWithFallback
                  src={SERVICES.crawlSpace.img}
                  alt="Crawl space repair"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,34,53,0.7) 0%, transparent 40%)" }} />
              </div>
            </div>

            {/* Card B — Concrete (horizontal: image left, content right) */}
            <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", display: "flex", minHeight: 280 }}>
              <div style={{ width: 220, flexShrink: 0, position: "relative" }} className="hidden md:block">
                <ImageWithFallback
                  src={SERVICES.concrete.img}
                  alt="Concrete services"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(10,11,20,0.3)" }} />
              </div>
              <div style={{ flex: 1, padding: "32px 32px" }}>
                <div style={{ marginBottom: 16 }}>
                  <CategoryBadge label={SERVICES.concrete.category} />
                </div>
                <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.5vw,30px)", color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12, whiteSpace: "pre-line" }}>
                  {SERVICES.concrete.title}
                </h3>
                <div style={{ marginBottom: 20 }}>
                  <SymptomChips items={SERVICES.concrete.symptoms} />
                </div>
                <CardCTAs onNavigate={onNavigate} />
              </div>
            </div>

          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 flex-1">

            {/* Card C — Waterproofing (horizontal: image left, content right) */}
            <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", display: "flex", minHeight: 280 }}>
              <div style={{ width: 220, flexShrink: 0, position: "relative" }} className="hidden md:block">
                <ImageWithFallback
                  src={SERVICES.waterproofing.img}
                  alt="Waterproofing"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(10,11,20,0.3)" }} />
              </div>
              <div style={{ flex: 1, padding: "32px 32px" }}>
                <div style={{ marginBottom: 16 }}>
                  <CategoryBadge label={SERVICES.waterproofing.category} />
                </div>
                <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.5vw,30px)", color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12, whiteSpace: "pre-line" }}>
                  {SERVICES.waterproofing.title}
                </h3>
                <div style={{ marginBottom: 20 }}>
                  <SymptomChips items={SERVICES.waterproofing.symptoms} />
                </div>
                <CardCTAs onNavigate={onNavigate} />
              </div>
            </div>

            {/* Card D — Foundation (tall, content + image) */}
            <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ padding: "40px 40px 32px" }}>
                <div style={{ marginBottom: 20 }}>
                  <CategoryBadge label={SERVICES.foundation.category} />
                </div>
                <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 16, whiteSpace: "pre-line" }}>
                  {SERVICES.foundation.title}
                </h3>
                <p style={{ fontFamily: INTER, fontSize: 15, color: MUTED, lineHeight: 1.65, marginBottom: 28 }}>
                  {SERVICES.foundation.body}
                </p>
                <div style={{ marginBottom: 28 }}>
                  <SymptomChips items={SERVICES.foundation.symptoms} />
                </div>
                <CardCTAs onNavigate={onNavigate} />
              </div>
              <div style={{ height: 280, flexShrink: 0, position: "relative" }}>
                <ImageWithFallback
                  src={SERVICES.foundation.img}
                  alt="Foundation repair"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,34,53,0.7) 0%, transparent 40%)" }} />
              </div>
            </div>

          </div>
        </div>

        {/* Bento grid row 2: 2 equal cards (Mold + Commercial) */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Card E — Mold Prevention (image left, content right) */}
          <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", display: "flex", flex: 1, minHeight: 340 }}>
            <div style={{ flex: 1, position: "relative" }} className="hidden md:block">
              <ImageWithFallback
                src={SERVICES.mold.img}
                alt="Mold prevention"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(10,11,20,0.35)" }} />
            </div>
            <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
              <CategoryBadge label={SERVICES.mold.category} />
              <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.2vw,32px)", color: WHITE, lineHeight: 1.15, letterSpacing: "-0.5px", margin: 0 }}>
                {SERVICES.mold.title}
              </h3>
              <p style={{ fontFamily: INTER, fontSize: 15, color: MUTED, lineHeight: 1.65, margin: 0 }}>
                {SERVICES.mold.body}
              </p>
              <ExploreLink onNavigate={onNavigate} />
            </div>
          </div>

          {/* Card F — Commercial (content left, image right) */}
          <div style={{ background: NAVY, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", display: "flex", flex: 1, minHeight: 340 }}>
            <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
              <CategoryBadge label={SERVICES.commercial.category} />
              <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.2vw,32px)", color: WHITE, lineHeight: 1.15, letterSpacing: "-0.5px", margin: 0 }}>
                {SERVICES.commercial.title}
              </h3>
              <p style={{ fontFamily: INTER, fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.65, margin: 0 }}>
                {SERVICES.commercial.body}
              </p>
              <ExploreLink onNavigate={onNavigate} />
            </div>
            <div style={{ flex: 1, position: "relative" }} className="hidden md:block">
              <ImageWithFallback
                src={SERVICES.commercial.img}
                alt="Commercial services"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(11,28,74,0.5)" }} />
            </div>
          </div>

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
    <section style={{ background: CHAR, borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "40px 56px" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: SAND, lineHeight: 1, marginBottom: 6 }}>
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
    <section style={{ background: "#00519F", padding: "96px 56px", position: "relative", overflow: "hidden" }}>
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
          <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: WHITE, fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "#00519F", padding: "15px 28px", textDecoration: "none" }}
            className="hover:opacity-95 transition-opacity">
            Schedule Free Inspection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#00519F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: DARK }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={onBack}
              style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">
              Home
            </button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
              Services
            </span>
          </div>
        </div>

        <IntroSection />
        <TrustBar />
        <WhatWeHandleSection onNavigate={() => onNavigate("service")} />
        <CTASection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
