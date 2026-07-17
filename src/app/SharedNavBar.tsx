import { useState, useEffect, useRef } from "react";
import { Home, Layers, Droplets, Grid3x3, Leaf, Building2 } from "lucide-react";
import { Logo } from "./components/Logo";
import { InspectionModal, openInspection } from "./components/InspectionModal";
import imgSvcFoundation from "../assets/svc-foundation.jpg";
import imgSvcCrawlspace from "../assets/svc-crawlspace.jpg";
import imgSvcWaterproofing from "../assets/svc-waterproofing.jpg";
import imgSvcConcrete from "../assets/svc-concrete.jpg";
import imgSvcMold from "../assets/svc-mold.jpg";
import iconFoundation from "../assets/icons/icon-foundation.svg";
import iconCrawlspace from "../assets/icons/icon-crawlspace.svg";
import iconWaterproofing from "../assets/icons/icon-waterproofing.svg";
import iconConcrete from "../assets/icons/icon-concrete.svg";

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
// Symptom labels shortened to 2-4 words per approved symptom-driven sitemap.
// Icon per category for visual scanning; accent color stays on-brand (SAND/B),
// not a per-category rainbow — client flagged that as off-brand ("no lo veo
// dentro del lenguaje visual de la página").
// TODO(content): validate final symptom labels against approved sitemap doc.
// TODO(routing): every symptom currently routes to "problem-sign-inner" and every
// category to "service" (only Crawl Space page exists). Wire real routes when
// remaining service pages are built.
const SERVICE_CATEGORIES = [
  {
    label: "Foundation Repair",
    icon: Home,
    iconImg: iconFoundation as string,
    img: imgSvcFoundation as string,
    tagline: "Stop the cracks before they spread.",
    signs: ["Cracks in walls", "Sticking doors & windows", "Uneven floors", "Gaps at door frames", "Stair-step brick cracks"],
  },
  {
    label: "Crawl Space Repair",
    icon: Layers,
    iconImg: iconCrawlspace as string,
    img: imgSvcCrawlspace as string,
    tagline: "Dry, sealed, and structurally sound below your home.",
    signs: ["Sagging floors", "Musty smell", "High indoor humidity", "Standing water below", "Baseboard separation"],
  },
  {
    label: "Waterproofing",
    icon: Droplets,
    iconImg: iconWaterproofing as string,
    img: imgSvcWaterproofing as string,
    tagline: "Keep water out of your basement for good.",
    signs: ["Wet basement", "Damp walls", "Puddles after rain", "White wall stains", "Condensation on pipes"],
  },
  {
    label: "Concrete Services",
    icon: Grid3x3,
    iconImg: iconConcrete as string,
    img: imgSvcConcrete as string,
    tagline: "Level driveways, walkways, and slabs.",
    signs: ["Uneven driveway", "Sunken sidewalk", "Pool deck settling", "Trip hazards", "Cracked garage floor"],
  },
  {
    label: "Commercial Services",
    icon: Building2,
    iconImg: null as string | null,
    img: imgSvcFoundation as string,
    tagline: "Structural repair for commercial properties.",
    signs: ["Structural settlement", "Warehouse floor damage", "Water intrusion", "Loading dock issues"],
  },
  {
    label: "Mold Prevention",
    icon: Leaf,
    iconImg: null as string | null,
    img: imgSvcMold as string,
    tagline: "Find the moisture source, stop mold at the root.",
    signs: ["Musty odor", "Dark spots on walls", "Indoor allergies", "Peeling paint", "Ceiling stains"],
  },
];

// ─── Mega Menu ─────────────────────────────────────────────────────────────────
// Image-forward cards, not a text list — Jonathan: "our consumer doesn't wanna
// read, they wanna see." Only the 5 protagonist services get a card; problem
// signs stay hidden until the card itself is hovered (second level, optional),
// so the menu doesn't overwhelm on open.
const MEGA_MENU_SERVICES = SERVICE_CATEGORIES.slice(0, 5);

function MegaMenu({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div
      role="menu"
      aria-label="Services"
      style={{
        background: "rgba(10,11,20,.98)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-8">
        <div className="flex items-center justify-between mb-6">
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
            Services
          </p>
          <button
            onClick={() => onNavigate("services-landing")}
            className="group inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            All services
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {MEGA_MENU_SERVICES.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                onClick={() => onNavigate("service")}
                className="group relative overflow-hidden cursor-pointer"
                style={{ height: 260, border: "1px solid rgba(255,255,255,.08)" }}
              >
                <img src={c.img} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,20,.15) 0%, rgba(10,11,20,.9) 100%)" }} />

                {/* Icon chip */}
                <div className="absolute top-3 left-3 flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,.95)" }}>
                  {c.iconImg ? <img src={c.iconImg} alt="" className="w-6 h-6 object-contain" /> : <Icon size={17} color={B} strokeWidth={2.25} />}
                </div>

                {/* Default state: label only */}
                <div className="absolute inset-x-0 bottom-0 p-4 transition-opacity duration-200 group-hover:opacity-0">
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1.2 }}>{c.label}</p>
                </div>

                {/* Hover reveal: problem signs */}
                <div
                  className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(10,11,20,.94)" }}
                >
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 10 }}>{c.label}</p>
                  <div className="flex flex-col gap-1 mb-3">
                    {c.signs.slice(0, 4).map((symptom) => (
                      <button
                        key={symptom}
                        onClick={(e) => { e.stopPropagation(); onNavigate("problem-sign-inner"); }}
                        className="text-left transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,.65)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-1 self-start"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND }}
                  >
                    View all
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<number | null>(null);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);

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

  // Escape closes any open dropdown and restores focus to the Services trigger
  useEffect(() => {
    if (!megaOpen && !resourcesOpen && !aboutOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setResourcesOpen(false);
        setAboutOpen(false);
        servicesBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [megaOpen, resourcesOpen, aboutOpen]);

  const handleNavigate = (p: string) => {
    setMegaOpen(false);
    setResourcesOpen(false);
    setAboutOpen(false);
    setMobileOpen(false);
    onNavigate(p);
  };

  const isTransparent = transparent && !scrolled && !megaOpen && !resourcesOpen && !aboutOpen && !mobileOpen;

  const links = ["Services", "Problem Signs", "Our Difference", "Resources", "Pricing", "About"];

  return (
    <div
      ref={navRef}
      className="relative"
      onMouseLeave={() => { setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); }}
    >
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
                    ref={servicesBtnRef}
                    aria-haspopup="menu"
                    aria-expanded={megaOpen}
                    onMouseEnter={() => { setMegaOpen(true); setResourcesOpen(false); setAboutOpen(false); }}
                    onClick={() => { setMegaOpen((prev) => !prev); setResourcesOpen(false); setAboutOpen(false); }}
                    className="flex items-center gap-1 transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                      color: megaOpen || isActive ? "#fff" : "rgba(255,255,255,.75)",
                      letterSpacing: ".3px", background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? `2px solid ${SAND}` : "2px solid transparent",
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
                    onMouseEnter={() => { setResourcesOpen(true); setMegaOpen(false); setAboutOpen(false); }}
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
                    onMouseEnter={() => { setAboutOpen(true); setMegaOpen(false); setResourcesOpen(false); }}
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
          <div className="lg:hidden px-8 pb-6 flex flex-col gap-1" style={{ background: DARK }}>
            {links.map((l) => {
              const pageKey = NAV_PAGE_MAP[l];

              // Services → tap opens the 5 protagonist services as compact
              // icon+name cards (Rosie spec pt.9); tap a service expands an
              // accordion with its symptom sub-links, no hover required.
              if (l === "Services") {
                return (
                  <div key="Services" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <button
                      onClick={() => { setMobileServicesOpen((o) => !o); setMobileCategoryOpen(null); }}
                      aria-expanded={mobileServicesOpen}
                      className="w-full py-3 flex items-center justify-between text-left"
                      style={{ fontFamily: "'Inter',sans-serif", color: mobileServicesOpen ? "#fff" : "rgba(255,255,255,.7)", fontSize: 15, background: "none", border: "none", cursor: "pointer" }}>
                      Services
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="pb-3 flex flex-col gap-1.5">
                        {MEGA_MENU_SERVICES.map((cat, i) => {
                          const Icon = cat.icon;
                          const isOpen = mobileCategoryOpen === i;
                          return (
                            <div key={cat.label}>
                              <button
                                onClick={() => setMobileCategoryOpen(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                className="w-full py-2.5 pl-3 pr-2 flex items-center gap-3 text-left"
                                style={{
                                  background: isOpen ? "rgba(26,82,168,.2)" : "transparent",
                                  borderLeft: isOpen ? `2px solid ${B}` : "2px solid rgba(255,255,255,.1)",
                                  cursor: "pointer",
                                }}>
                                <span className="flex items-center justify-center shrink-0" style={{ width: 28, height: 28, borderRadius: 6, background: isOpen ? "rgba(26,82,168,.3)" : "rgba(255,255,255,.05)" }}>
                                  {cat.iconImg ? <img src={cat.iconImg} alt="" className="w-4 h-4 object-contain" /> : <Icon size={14} color={isOpen ? "#fff" : "rgba(255,255,255,.55)"} strokeWidth={2.25} />}
                                </span>
                                <span className="flex-1" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: isOpen ? "#fff" : "rgba(255,255,255,.7)", fontWeight: isOpen ? 600 : 400 }}>
                                  {cat.label}
                                </span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0"
                                  style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
                                  <path d="M6 9l6 6 6-6" stroke={isOpen ? "#fff" : "rgba(255,255,255,.35)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              {isOpen && (
                                <div className="pt-2 pb-1 pl-[52px] flex flex-col gap-2">
                                  {cat.signs.slice(0, 5).map((symptom) => (
                                    <button
                                      key={symptom}
                                      onClick={() => handleNavigate("problem-sign-inner")}
                                      className="text-left"
                                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.6)", background: "none", border: "none", cursor: "pointer" }}>
                                      {symptom}
                                    </button>
                                  ))}
                                  <button
                                    onClick={() => handleNavigate("service")}
                                    className="text-left"
                                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                                    View {cat.label} →
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <button
                          onClick={() => handleNavigate("services-landing")}
                          className="py-2.5 pl-3 text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                          All services →
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              // Resources → same one-level accordion pattern as Services:
              // tap to expand direct-navigate links, no hover dependency.
              if (l === "Resources") {
                return (
                  <div key="Resources" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <button
                      onClick={() => setMobileResourcesOpen((o) => !o)}
                      aria-expanded={mobileResourcesOpen}
                      className="w-full py-3 flex items-center justify-between text-left"
                      style={{ fontFamily: "'Inter',sans-serif", color: mobileResourcesOpen ? "#fff" : "rgba(255,255,255,.7)", fontSize: 15, background: "none", border: "none", cursor: "pointer" }}>
                      Resources
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        style={{ transform: mobileResourcesOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {mobileResourcesOpen && (
                      <div className="pb-3 flex flex-col gap-1">
                        <button
                          onClick={() => handleNavigate("news-blog")}
                          className="w-full py-2.5 pl-3 text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                          News / Blog
                        </button>
                        {RESOURCES_SECTIONS.map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => handleNavigate(`resources#${sec.id}`)}
                            className="w-full py-2.5 pl-3 text-left"
                            style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                            {sec.label}
                          </button>
                        ))}
                        <button
                          onClick={() => handleNavigate("resources")}
                          className="py-2.5 pl-3 text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                          Go to Resources →
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              // About → same one-level accordion pattern: the desktop dropdown's
              // 4 tabs (About/Careers/Service Area/Contact) become direct links.
              if (l === "About") {
                return (
                  <div key="About" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <button
                      onClick={() => setMobileAboutOpen((o) => !o)}
                      aria-expanded={mobileAboutOpen}
                      className="w-full py-3 flex items-center justify-between text-left"
                      style={{ fontFamily: "'Inter',sans-serif", color: mobileAboutOpen ? "#fff" : "rgba(255,255,255,.7)", fontSize: 15, background: "none", border: "none", cursor: "pointer" }}>
                      About
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        style={{ transform: mobileAboutOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {mobileAboutOpen && (
                      <div className="pb-3 flex flex-col gap-1">
                        {ABOUT_TABS.map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => handleNavigate(tab.page)}
                            className="w-full py-2.5 pl-3 text-left"
                            style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return pageKey ? (
                <button key={l} onClick={() => handleNavigate(pageKey)}
                  className="py-3 text-left"
                  style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,.7)", fontSize: 15, background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer" }}>
                  {l}
                </button>
              ) : (
                <a key={l} href="#" className="py-3 border-b border-white/5"
                  style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,.7)", fontSize: 15 }}>{l}</a>
              );
            })}
            <button onClick={openInspection} className="mt-3 py-3 text-center font-semibold text-white w-full"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14, border: "none", cursor: "pointer" }}>
              Schedule Free Inspection
            </button>
          </div>
        )}
      </nav>

      {/* Mega menu — z-[200] clears the StickyAnchorBar (z-50) that lives in the fixed header after SharedNavBar */}
      {megaOpen && (
        <div className="absolute left-0 w-full z-[200]">
          <MegaMenu onNavigate={handleNavigate} />
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
