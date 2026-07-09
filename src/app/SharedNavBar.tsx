import { useState, useEffect, useRef } from "react";
import { Logo } from "./components/Logo";
import { InspectionModal, openInspection } from "./components/InspectionModal";

// ─── Brand Tokens ──────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const SAND = "#C4AB6C";

// ─── Page map ─────────────────────────────────────────────────────────────────
export const NAV_PAGE_MAP: Record<string, string> = {
  "Services":      "services-landing",
  "Problem Signs": "problem-signs",
  "Our Difference":"our-difference",
  "Resources":     "resources",
  "Pricing":       "pricing",
  "About":         "about",
  "Careers":       "careers",
  "Service Area":  "service-area",
};


// ─── Resources Dropdown ───────────────────────────────────────────────────────
const CHAR_NAV = "#1E2235";
const MUTED_NAV = "#6B6E85";

const RESOURCES_SECTIONS = [
  { label: "Project gallery",    id: "gallery" },
  { label: "Cost guide",         id: "cost" },
  { label: "Buyer & Seller guides", id: "buyer-seller" },
  { label: "Job stories",        id: "job-stories" },
  { label: "FAQs",               id: "faq" },
  { label: "Reviews",            id: "reviews" },
];

const FEATURED_RESOURCES = [
  { tag: "PDF", pages: "2 pages", title: "Symptom Checklist" },
  { tag: "PDF", pages: "8 pages", title: "Buyer & Seller Guide" },
];

type ResourcesDropdownProps = {
  onNavigate: (p: string) => void;
};

function ResourcesDropdown({ onNavigate }: ResourcesDropdownProps) {
  const [activeTab, setActiveTab] = useState<"resources" | "news">("resources");

  return (
    <div
      style={{
        background: "rgba(10,11,20,.98)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-8 flex gap-0">

        {/* Col 1 — tabs */}
        <div className="w-52 shrink-0 flex flex-col py-2" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 10, paddingLeft: 12 }}>
            Browse
          </p>
          {[{ key: "resources" as const, label: "Resources" }, { key: "news" as const, label: "News / Blog" }].map((tab) => (
            <button
              key={tab.key}
              onMouseEnter={() => setActiveTab(tab.key)}
              onClick={() => { onNavigate(tab.key === "resources" ? "resources" : "news-blog"); }}
              className="flex items-center justify-between w-full px-3 py-3 text-left group transition-all duration-150"
              style={{
                background: activeTab === tab.key ? "rgba(26,82,168,.2)" : "transparent",
                borderLeft: activeTab === tab.key ? `2px solid ${B}` : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: activeTab === tab.key ? 600 : 400, fontSize: 14, color: activeTab === tab.key ? "#fff" : "rgba(255,255,255,.6)" }}>
                {tab.label}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Col 2 — section links */}
        <div className="flex-1 flex flex-col py-2 px-6" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
              {activeTab === "resources" ? "Resources" : "News & Blog"}
            </p>
            <button
              onClick={() => onNavigate("resources")}
              className="group inline-flex items-center gap-1.5"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Go to the page
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mb-4 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
          <div className="flex flex-col gap-1">
            {RESOURCES_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => onNavigate(`resources#${sec.id}`)}
                className="group flex items-center justify-between px-3 py-2 text-left transition-all duration-150"
                style={{ background: "rgba(255,255,255,.04)", cursor: "pointer", border: "none" }}
              >
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)" }}>{sec.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                  <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Col 3 — featured resources */}
        <div className="w-72 shrink-0 flex flex-col py-2 pl-6">
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 12 }}>
            Featured resources
          </p>
          <div className="flex flex-col gap-3">
            {FEATURED_RESOURCES.map((r) => (
              <div key={r.title} className="flex flex-col p-5" style={{ background: CHAR_NAV, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-0.5" style={{ background: "rgba(196,171,108,.15)", border: "1px solid rgba(196,171,108,.25)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 1.5, textTransform: "uppercase" }}>{r.tag}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 500 }}>{r.pages}</span>
                </div>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>{r.title}</p>
                <button className="group inline-flex items-center gap-1.5"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Download
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── About Dropdown ───────────────────────────────────────────────────────────
const ABOUT_TABS = [
  { key: "about" as const,        label: "About",        page: "about" },
  { key: "careers" as const,      label: "Careers",      page: "careers" },
  { key: "service-area" as const, label: "Service Area", page: "service-area" },
  { key: "contact" as const,      label: "Contact us",   page: "contact" },
];

const ABOUT_SECTIONS: Record<"about" | "careers" | "service-area" | "contact", { label: string; id?: string }[]> = {
  "about": [
    { label: "People",      id: "people" },
    { label: "Benefits",    id: "benefits" },
    { label: "Initiatives", id: "initiatives" },
    { label: "Contact us",  id: "contact" },
  ],
  "careers": [
    { label: "Open positions" },
    { label: "Benefits & culture" },
    { label: "How we hire" },
    { label: "Apply now" },
  ],
  "service-area": [
    { label: "Check my area" },
    { label: "Service map" },
    { label: "All cities" },
  ],
  "contact": [
    { label: "Contact information", id: "info" },
    { label: "Locations map",       id: "locations" },
    { label: "Contact form",        id: "form" },
  ],
};

function AboutDropdown({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"about" | "careers" | "service-area" | "contact">("about");

  return (
    <div
      style={{
        background: "rgba(10,11,20,.98)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-8 flex gap-0">

        {/* Col 1 — tabs */}
        <div className="w-52 shrink-0 flex flex-col py-2" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 10, paddingLeft: 12 }}>
            Browse
          </p>
          {ABOUT_TABS.map((tab) => (
            <button
              key={tab.key}
              onMouseEnter={() => setActiveTab(tab.key)}
              onClick={() => onNavigate(tab.page)}
              className="flex items-center justify-between w-full px-3 py-3 text-left group transition-all duration-150"
              style={{
                background: activeTab === tab.key ? "rgba(26,82,168,.2)" : "transparent",
                borderLeft: activeTab === tab.key ? `2px solid ${B}` : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: activeTab === tab.key ? 600 : 400, fontSize: 14, color: activeTab === tab.key ? "#fff" : "rgba(255,255,255,.6)" }}>
                {tab.label}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Col 2 — section links */}
        <div className="flex-1 flex flex-col py-2 px-6" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
              {activeTab === "about" ? "About" : activeTab === "careers" ? "Careers" : activeTab === "service-area" ? "Service Area" : "Contact Us"}
            </p>
            <button
              onClick={() => onNavigate(activeTab)}
              className="group inline-flex items-center gap-1.5"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Go to the page
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mb-4 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
          <div className="flex flex-col gap-1">
            {ABOUT_SECTIONS[activeTab].map((sec) => (
              <button
                key={sec.label}
                onClick={() => onNavigate(sec.id ? `${activeTab}#${sec.id}` : activeTab)}
                className="group flex items-center justify-between px-3 py-2 text-left transition-all duration-150"
                style={{ background: "rgba(255,255,255,.04)", cursor: "pointer", border: "none" }}
              >
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)" }}>{sec.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                  <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Col 3 — highlight */}
        <div className="w-72 shrink-0 flex flex-col py-2 pl-6 min-w-0">
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 12 }}>
            Quick links
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Check my service area", desc: "Enter your ZIP to see local teams, reviews, and services.", page: "service-area" },
              { label: "Meet our team", desc: "The people behind every repair — local experts you can trust.", page: "about" },
            ].map((card) => (
              <button
                key={card.label}
                onClick={() => onNavigate(card.page)}
                className="group flex flex-col p-5 text-left transition-all hover:bg-white/5"
                style={{ background: CHAR_NAV, border: "1px solid rgba(255,255,255,.07)", cursor: "pointer" }}
              >
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>{card.label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.6, marginBottom: 12 }}>{card.desc}</p>
                <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND }}>
                  Go
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Mega Menu data ────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  {
    label: "Foundation Repair",
    signs: ["I see wall cracks", "Doors & windows sticking", "Floors are uneven", "Gaps around door frames", "Stair-step cracks in brick"],
    repairs: ["Push pier systems", "Wall anchors", "Helical piers", "Carbon fiber straps"],
  },
  {
    label: "Crawl Space Repair",
    signs: ["Floors are sagging", "Musty smell from below", "High humidity indoors", "Pest entry through floor", "Condensation under house"],
    repairs: ["SmartJack systems", "Encapsulation", "Moisture barrier", "Crawl space drainage"],
  },
  {
    label: "Waterproofing",
    signs: ["Water in my basement", "Damp or wet walls", "Condensation on pipes", "Puddles after rain", "Efflorescence (white stains)"],
    repairs: ["Interior drainage", "Sump pump install", "Wall membrane systems", "Window well drains"],
  },
  {
    label: "Concrete Services",
    signs: ["Uneven driveway or patio", "Sunken sidewalk slabs", "Pool deck settling", "Trip hazards on walkways", "Garage floor cracks"],
    repairs: ["PolyLevel foam lifting", "Slab leveling", "Mudjacking", "Joint sealing"],
  },
  {
    label: "Mold Prevention",
    signs: ["Musty odor in home", "Visible dark spots on walls", "Allergy symptoms indoors", "Peeling paint or wallpaper", "Stains on ceiling or floor"],
    repairs: ["Mold remediation", "Moisture source removal", "Prevention treatment", "Air quality systems"],
  },
  {
    label: "Commercial services",
    signs: ["Structural settlement", "Loading dock issues", "Warehouse floor damage", "Water intrusion in facility", "Foundation movement"],
    repairs: ["Commercial piers", "Slab stabilization", "Industrial waterproofing", "Structural assessment"],
  },
];

const SUPPORTING_CHIPS = [
  { label: "FAQs",            page: "resources#faq" },
  { label: "Project gallery", page: "resources#gallery" },
  { label: "Cost guide",      page: "resources#cost" },
];

// ─── Mega Menu ─────────────────────────────────────────────────────────────────
function MegaMenu({
  activeCategory,
  onCategoryHover,
  onNavigate,
}: {
  activeCategory: number;
  onCategoryHover: (i: number) => void;
  onNavigate: (p: string) => void;
}) {
  return (
    <div
      style={{
        background: "rgba(10,11,20,.98)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        marginTop: 0,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-8 flex gap-0">

        {/* Col 1: Service categories */}
        <div className="w-56 shrink-0 flex flex-col py-2" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 10, paddingLeft: 12 }}>
            Services
          </p>
          {SERVICE_CATEGORIES.map((cat, i) => (
            <>
              {i === 5 && <div key="divider" className="my-2 mx-3" style={{ height: 1, background: "rgba(255,255,255,.08)" }} />}
              <button
                key={cat.label}
                onMouseEnter={() => onCategoryHover(i)}
                onClick={() => onNavigate("service")}
                className="flex items-center justify-between w-full px-3 py-3 text-left group transition-all duration-150"
                style={{
                  background: activeCategory === i ? "rgba(26,82,168,.2)" : "transparent",
                  borderLeft: activeCategory === i ? `2px solid ${SAND}` : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: activeCategory === i ? 600 : 400, fontSize: 14, color: activeCategory === i ? "#fff" : "rgba(255,255,255,.6)" }}>
                  {cat.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ))}
        </div>

        {/* Col 2: Problem signs — dynamic per active category */}
        <div className="flex-1 flex flex-col py-2 px-6" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate("service")}
              className="group inline-flex items-center gap-1.5"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {SERVICE_CATEGORIES[activeCategory].label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => onNavigate("services-landing")}
              className="group inline-flex items-center gap-1"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              All services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="mb-4" style={{ height: 1, background: "rgba(255,255,255,.07)" }} />
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 10 }}>
            Problem signs
          </p>
          <div className="flex flex-col gap-1.5">
            {SERVICE_CATEGORIES[activeCategory].signs.map((symptom) => (
              <button
                key={symptom}
                onClick={() => onNavigate("problem-sign-inner")}
                className="group flex items-center justify-between px-3 py-2 text-left transition-all duration-150"
                style={{ background: "rgba(255,255,255,.04)", cursor: "pointer", border: "none" }}
              >
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)" }}>{symptom}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                  <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
          <div className="mt-4 mb-1" style={{ height: 1, background: "rgba(255,255,255,.07)" }} />
          <button
            onClick={() => onNavigate("problem-sign-inner")}
            className="group inline-flex items-center gap-1.5 mt-3 self-start"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Explore more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Col 3: Repair types + Supporting — dynamic per active category */}
        <div className="w-72 shrink-0 flex flex-col py-2 pl-6">
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 10 }}>
            Repair types
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {SERVICE_CATEGORIES[activeCategory].repairs.map((rt) => (
              <button
                key={rt}
                onClick={() => onNavigate("service")}
                className="group flex items-center justify-between px-4 py-2.5 text-left transition-all duration-150 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,.12)", cursor: "pointer", background: "none" }}
              >
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{rt}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity">
                  <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginBottom: 16 }} />
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 10 }}>
            Supporting
          </p>
          <div className="flex flex-wrap gap-2">
            {SUPPORTING_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => onNavigate(chip.page)}
                className="px-3 py-1.5 transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.6)", cursor: "pointer" }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared NavBar ─────────────────────────────────────────────────────────────
export default function SharedNavBar({
  onNavigate,
  active,
  transparent = false,
}: {
  onNavigate: (p: string) => void;
  active?: string;
  transparent?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!megaOpen && !resourcesOpen && !aboutOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
        setResourcesOpen(false);
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [megaOpen, resourcesOpen, aboutOpen]);

  const handleNavigate = (p: string) => {
    setMegaOpen(false);
    setResourcesOpen(false);
    setAboutOpen(false);
    setMobileOpen(false);
    onNavigate(p);
  };

  const isTransparent = transparent && !scrolled && !megaOpen && !resourcesOpen && !aboutOpen;

  const links = ["Services", "Problem Signs", "Our Difference", "Resources", "Pricing", "About"];

  return (
    <div ref={navRef} className="relative">
      <nav
        className="w-full transition-all duration-300"
        style={{
          background: isTransparent ? "rgba(10,11,20,0.0)" : "rgba(10,11,20,0.97)",
          backdropFilter: isTransparent ? "none" : "blur(20px)",
          borderBottom: isTransparent ? "1px solid transparent" : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between px-8 md:px-14 py-3 gap-4 lg:gap-6">
          {/* Logo */}
          <button onClick={() => handleNavigate("home")} className="h-14 lg:h-16 xl:h-20 shrink-0" style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Logo light />
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {links.map((l) => {
              const pageKey = NAV_PAGE_MAP[l];
              const isActive = l === active;

              if (l === "Services") {
                return (
                  <button
                    key="Services"
                    onClick={() => { setMegaOpen((prev) => !prev); setResourcesOpen(false); }}
                    className="flex items-center gap-1 transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                      color: megaOpen || isActive ? "#fff" : "rgba(255,255,255,.75)",
                      letterSpacing: ".3px", background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? `2px solid ${SAND}` : megaOpen ? `2px solid ${SAND}` : "2px solid transparent",
                      paddingBottom: 2,
                    }}
                  >
                    Services
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      style={{ transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              }

              if (l === "Resources") {
                return (
                  <button
                    key="Resources"
                    onClick={() => { setResourcesOpen((prev) => !prev); setMegaOpen(false); setAboutOpen(false); }}
                    className="flex items-center gap-1 transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                      color: resourcesOpen || isActive ? "#fff" : "rgba(255,255,255,.75)",
                      letterSpacing: ".3px", background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? `2px solid ${SAND}` : resourcesOpen ? `2px solid ${SAND}` : "2px solid transparent",
                      paddingBottom: 2,
                    }}
                  >
                    Resources
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      style={{ transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              }

              if (l === "About") {
                return (
                  <button
                    key="About"
                    onClick={() => { setAboutOpen((prev) => !prev); setMegaOpen(false); setResourcesOpen(false); }}
                    className="flex items-center gap-1 transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                      color: aboutOpen || isActive ? "#fff" : "rgba(255,255,255,.75)",
                      letterSpacing: ".3px", background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? `2px solid ${SAND}` : aboutOpen ? `2px solid ${SAND}` : "2px solid transparent",
                      paddingBottom: 2,
                    }}
                  >
                    About
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      style={{ transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              }

              return pageKey ? (
                <button key={l} onClick={() => handleNavigate(pageKey)}
                  style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                    color: isActive ? "#fff" : "rgba(255,255,255,.75)", letterSpacing: ".3px",
                    background: "none", border: "none", cursor: "pointer",
                    borderBottom: isActive ? `2px solid ${SAND}` : "2px solid transparent", paddingBottom: 2,
                  }}
                  className="transition-colors hover:opacity-100 whitespace-nowrap">
                  {l}
                </button>
              ) : (
                <a key={l} href="#"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,.75)", letterSpacing: ".3px" }}
                  className="transition-colors hover:opacity-100 whitespace-nowrap">
                  {l}
                </a>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href="tel:+18335841049" className="whitespace-nowrap hidden xl:block" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.55)" }}>
              1-833-584-1049
            </a>
            <button onClick={openInspection} className="whitespace-nowrap px-4 py-2.5 font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: ".4px", border: "none", cursor: "pointer" }}>
              Free Inspection
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-1.5" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setMobileOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {mobileOpen
                ? <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                : <path d="M3 7h18M3 12h18M3 17h18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden px-8 pb-6 flex flex-col gap-4" style={{ background: DARK }}>
            {links.map((l) => {
              const pageKey = NAV_PAGE_MAP[l];
              return pageKey ? (
                <button key={l} onClick={() => handleNavigate(pageKey)}
                  className="py-2 text-left"
                  style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,.7)", fontSize: 15, background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer" }}>
                  {l}
                </button>
              ) : (
                <a key={l} href="#" className="py-2 border-b border-white/5"
                  style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,.7)", fontSize: 15 }}>{l}</a>
              );
            })}
            <button onClick={openInspection} className="mt-2 py-3 text-center font-semibold text-white w-full"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14, border: "none", cursor: "pointer" }}>
              Schedule Free Inspection
            </button>
          </div>
        )}
      </nav>

      {/* Mega menu — z-[200] clears the StickyAnchorBar (z-50) that lives in the fixed header after SharedNavBar */}
      {megaOpen && (
        <div className="absolute left-0 w-full z-[200]">
          <MegaMenu
            activeCategory={activeCategory}
            onCategoryHover={setActiveCategory}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Resources dropdown */}
      {resourcesOpen && (
        <div className="absolute left-0 w-full z-[200]">
          <ResourcesDropdown onNavigate={handleNavigate} />
        </div>
      )}

      {/* About dropdown */}
      {aboutOpen && (
        <div className="absolute left-0 w-full z-[200]">
          <AboutDropdown onNavigate={handleNavigate} />
        </div>
      )}

      <InspectionModal />
    </div>
  );
}
