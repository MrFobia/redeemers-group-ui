import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
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
import { SERVICES, SERVICE_ORDER, getSymptomImage } from "./data/services";
import { getProblemSignByLabel } from "./data/problemSigns";

/** Route for a symptom label — lands on that sign's own page, not the default. */
const signRoute = (label: string) => {
  const sign = getProblemSignByLabel(label);
  return sign ? `problem-sign-inner/${sign.slug}` : "problem-sign-inner";
};

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
const RESOURCES_SECTIONS = [
  { label: "Project gallery",    id: "gallery" },
  { label: "Cost guide",         id: "cost" },
  { label: "Buyer & Seller guides", id: "buyer-seller" },
  { label: "Job stories",        id: "job-stories" },
  { label: "FAQs",               id: "faq" },
  { label: "Reviews",            id: "reviews" },
];

// NewsBlogPage has no anchor ids (client-side topic filter, not deep-linkable
// sections) — these route to the page itself, same as Careers/Service Area below.
const NEWS_SECTIONS = [
  { label: "Latest articles" },
  { label: "Foundation" },
  { label: "Waterproofing" },
  { label: "Crawl Space" },
];

// ─── Shared dropdown building blocks ──────────────────────────────────────────
// One visual system for every nav dropdown. Two shapes on top of the same
// shell: a 2-col "hub" (rail + preview, for nav items covering several
// destination pages — Services/Resources/About) and a flat grid (for nav
// items that are anchors on one page — Our Difference/Problem Signs).
function DropdownShell({
  eyebrow, onGoToPage, goToLabel = "Go to the page", children,
}: { eyebrow: string; onGoToPage: () => void; goToLabel?: string; children: React.ReactNode }) {
  return (
    <div
      role="menu"
      aria-label={eyebrow}
      style={{
        background: "rgba(10,11,20,.98)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-8">
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
            {eyebrow}
          </p>
          <button
            onClick={onGoToPage}
            className="group inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {goToLabel}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="mb-6 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
        <div className="flex gap-0">{children}</div>
      </div>
    </div>
  );
}

// Left-rail item — selects/navigates a destination (Services category, Resources/About tab)
function DropdownRailItem({
  label, active, icon: Icon, iconImg, onMouseEnter, onClick,
}: { label: string; active: boolean; icon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; iconImg?: string; onMouseEnter?: () => void; onClick: () => void }) {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="group flex items-center gap-3 w-full px-3 py-3 text-left transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
      style={{
        background: active ? "rgba(26,82,168,.2)" : "transparent",
        borderLeft: active ? `2px solid ${B}` : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {(Icon || iconImg) && (
        <span className="flex items-center justify-center shrink-0" style={{ width: 22, height: 22 }}>
          {iconImg
            ? <img src={iconImg} alt="" className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(1)", opacity: active ? 1 : 0.7 }} />
            : Icon ? <Icon size={20} color="#fff" strokeWidth={2} /> : null}
        </span>
      )}
      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: active ? 600 : 400, fontSize: 14, color: active ? "#fff" : "rgba(255,255,255,.6)", flex: 1 }}>
        {label}
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 transition-opacity" style={{ opacity: active ? 1 : 0 }}>
        <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ─── Simple (non-mega) dropdown ───────────────────────────────────────────────
// Our Difference / Resources / About are link lists, not visual destinations —
// a full-width mega panel for a list of text links reads as noise next to the
// Services/Problem Signs image menus. These get a compact panel anchored under
// their own nav item instead.
function SimpleDropdown({ children, width = 260 }: { children: React.ReactNode; width?: number }) {
  return (
    <motion.div
      role="menu"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ width }}
    >
      <div
        className="flex flex-col py-2"
        style={{
          background: "rgba(10,11,20,.98)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function SimpleDropdownItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className="w-full text-left px-4 py-2.5 transition-colors hover:bg-white/[.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
      style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.75)", background: "none", border: "none", cursor: "pointer" }}
    >
      {label}
    </button>
  );
}

function SimpleDropdownLabel({ label }: { label: string }) {
  return (
    <p
      className="px-4 pt-3 pb-1.5"
      style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}
    >
      {label}
    </p>
  );
}

type ResourcesDropdownProps = {
  onNavigate: (p: string) => void;
};

// Shared dropdown shell: same header row, same divider, same rail width
// (w-64) and same list-item voice across Services/Resources/About/Our
// Difference/Problem Signs — client QA: "parece que estuviéramos usando 3
// layouts distintos, no hay consistencia." One 2-col "hub" template (rail +
// preview) for nav items covering multiple destination pages, one flat-grid
// template for nav items that are anchors on a single page. See DropdownShell.
function ResourcesDropdown({ onNavigate }: ResourcesDropdownProps) {
  return (
    <SimpleDropdown>
      <SimpleDropdownLabel label="Resources" />
      {RESOURCES_SECTIONS.map((sec) => (
        <SimpleDropdownItem key={sec.label} label={sec.label} onClick={() => onNavigate(`resources#${sec.id}`)} />
      ))}
      <div className="my-2 mx-4 h-px" style={{ background: "rgba(255,255,255,.08)" }} />
      <SimpleDropdownLabel label="News / Blog" />
      {NEWS_SECTIONS.map((sec) => (
        <SimpleDropdownItem key={sec.label} label={sec.label} onClick={() => onNavigate("news-blog")} />
      ))}
    </SimpleDropdown>
  );
}

// ─── About Dropdown ───────────────────────────────────────────────────────────
const ABOUT_TABS = [
  { key: "about" as const,        label: "About",        page: "about" },
  { key: "careers" as const,      label: "Careers",      page: "careers" },
  { key: "service-area" as const, label: "Service Area", page: "service-area" },
  { key: "contact" as const,      label: "Contact us",   page: "contact" },
];


function AboutDropdown({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <SimpleDropdown>
      {ABOUT_TABS.map((tab) => (
        <SimpleDropdownItem key={tab.key} label={tab.label} onClick={() => onNavigate(tab.page)} />
      ))}
    </SimpleDropdown>
  );
}

// ─── Our Difference Dropdown ──────────────────────────────────────────────────
// Client QA call (Jul 24): "Our difference" has 9 items on the sitemap, too
// many for a horizontal sub-nav, and their explicit preference is "a vertical
// list view when you hover over the main navigation." Exact 9 labels/order
// from the sitemap — keep in sync with OurDifferencePage.tsx's NAV_TABS.
const OUR_DIFFERENCE_SECTIONS = [
  { label: "Testimonials", id: "reviews" },
  { label: "What to expect", id: "process" },
  { label: "The Evergreen difference", id: "story" },
  { label: "Our pledge", id: "pledge" },
  { label: "News & awards", id: "news-awards" },
  { label: "Featured projects / case stories", id: "case-studies" },
  { label: "Referral program", id: "referral" },
  { label: "Love Well Initiative", id: "love-well" },
  { label: "Affiliations & certifications", id: "certifications" },
];

function OurDifferenceDropdown({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <SimpleDropdown width={290}>
      {OUR_DIFFERENCE_SECTIONS.map((sec) => (
        <SimpleDropdownItem key={sec.id} label={sec.label} onClick={() => onNavigate(`our-difference#${sec.id}`)} />
      ))}
    </SimpleDropdown>
  );
}

// ─── Problem Signs Dropdown ───────────────────────────────────────────────────
// "Problem Signs" had no dropdown at all — a plain nav link with no preview,
// unlike every other top-level section. Exact 4 categories/order from the
// approved sitemap — keep in sync with ProblemSignsPage.tsx's CATEGORIES.
// Image cards, not a text grid: the symptom categories are what a homeowner
// recognizes at a glance ("our consumer doesn't wanna read, they wanna see"),
// same visual language as the Services mega menu.
const PROBLEM_SIGNS_CATEGORIES = [
  { slug: "structural-repair",  id: "structural",    icon: Home,     iconImg: iconFoundation as string,    img: imgSvcFoundation as string },
  { slug: "crawl-space-repair", id: "crawl",         icon: Layers,   iconImg: iconCrawlspace as string,    img: imgSvcCrawlspace as string },
  { slug: "waterproofing",      id: "waterproofing", icon: Droplets, iconImg: iconWaterproofing as string, img: imgSvcWaterproofing as string },
  { slug: "concrete-services",  id: "concrete",      icon: Grid3x3,  iconImg: iconConcrete as string,      img: imgSvcConcrete as string },
].map((cat) => ({
  ...cat,
  label: SERVICES[cat.slug].name,
  // First three symptoms from the sitemap — the full list lives on the service page.
  signs: SERVICES[cat.slug].symptoms.slice(0, 3).map((s) => s.q),
}));


function ProblemSignsDropdown({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <DropdownShell eyebrow="Problem Signs" onGoToPage={() => onNavigate("problem-signs")}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {PROBLEM_SIGNS_CATEGORIES.map((cat) => (
          <div key={cat.id} className="group flex flex-col">
            <button
              onClick={() => onNavigate(`problem-signs/${cat.id}`)}
              className="relative overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
              style={{ height: 190, border: "1px solid rgba(255,255,255,.08)", background: "none", padding: 0, cursor: "pointer", width: "100%" }}
            >
              <img
                src={cat.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 transition-opacity" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.94) 0%, rgba(10,11,20,.35) 60%, rgba(10,11,20,.15) 100%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-center gap-2.5">
                {cat.iconImg
                  ? <img src={cat.iconImg} alt="" style={{ width: 26, height: 26, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                  : <cat.icon size={24} color="#fff" strokeWidth={2} />}
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1.15 }}>{cat.label}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: B }} />
            </button>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {cat.signs.map((sign) => (
                <button
                  key={sign}
                  onClick={() => onNavigate(signRoute(sign))}
                  className="text-left transition-colors hover:text-white hover:border-white/25"
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 12.5,
                    lineHeight: 1.2,
                    color: "rgba(255,255,255,.75)",
                    background: "rgba(10,11,20,.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 999,
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  {sign}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DropdownShell>
  );
}

// ─── Mega Menu data ────────────────────────────────────────────────────────────
// Labels and symptom lists come from data/services.ts, which mirrors the
// approved sitemap verbatim — the nav must never drift from the service pages.
// Icon per category for visual scanning; accent color stays on-brand (SAND/B),
// not a per-category rainbow — client flagged that as off-brand ("no lo veo
// dentro del lenguaje visual de la página").
const CATEGORY_CHROME: Record<string, { icon: typeof Home; iconImg: string | null; img: string; tagline: string }> = {
  "structural-repair":   { icon: Home,      iconImg: iconFoundation as string,    img: imgSvcFoundation as string,    tagline: "Stop the cracks before they spread." },
  "crawl-space-repair":  { icon: Layers,    iconImg: iconCrawlspace as string,    img: imgSvcCrawlspace as string,    tagline: "Dry, sealed, and structurally sound below your home." },
  "waterproofing":       { icon: Droplets,  iconImg: iconWaterproofing as string, img: imgSvcWaterproofing as string, tagline: "Keep water out of your basement for good." },
  "concrete-services":   { icon: Grid3x3,   iconImg: iconConcrete as string,      img: imgSvcConcrete as string,      tagline: "Level driveways, walkways, and slabs." },
  "commercial-services": { icon: Building2, iconImg: null,                        img: imgSvcMold as string,          tagline: "Structural repair for commercial properties." },
};

const SERVICE_CATEGORIES = SERVICE_ORDER.map((slug) => {
  const svc = SERVICES[slug];
  const chrome = CATEGORY_CHROME[slug];
  return {
    slug,
    label: svc.name,
    icon: chrome.icon,
    iconImg: chrome.iconImg,
    img: chrome.img,
    tagline: chrome.tagline,
    signs: svc.symptoms.map((sym) => sym.q),
  };
});

// ─── Mega Menu ─────────────────────────────────────────────────────────────────
// Client QA call (Jul 24) rejected the image-card version explicitly: "I have
// not seen a version where if I hover over services, there is a list coming
// off of the menu... those choices would be the launching point." The ask was
// a simple vertical list you can click immediately — modeled on a competitor
// (Baird) they pointed to — not cards that need a second hover to reveal
// anything. The list is now the primary surface; the photo panel is a
// secondary preview that follows the hovered row, not a prerequisite to act.
const MEGA_MENU_SERVICES = SERVICE_CATEGORIES.slice(0, 5);

function MegaMenu({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [hovered, setHovered] = useState(0);
  const active = MEGA_MENU_SERVICES[hovered];

  return (
    <DropdownShell eyebrow="Services" onGoToPage={() => onNavigate("services-landing")}>
      {/* Col 1 — the click-first list. Every category is one click away, no hover required to reveal it. */}
      <div className="w-64 shrink-0 flex flex-col gap-1" style={{ borderRight: "1px solid rgba(255,255,255,.07)" }}>
        {MEGA_MENU_SERVICES.map((c, i) => (
          <DropdownRailItem
            key={c.label}
            label={c.label}
            active={i === hovered}
            icon={c.icon}
            iconImg={c.iconImg ?? undefined}
            onMouseEnter={() => setHovered(i)}
            onClick={() => onNavigate(`service/${c.slug}`)}
          />
        ))}
      </div>

      {/* Col 2 — photo preview of the hovered category, secondary to the list, not required to act on it */}
      <div className="flex-1 pl-8 flex flex-col">
        <div className="relative overflow-hidden flex-1" style={{ minHeight: 280, border: "1px solid rgba(255,255,255,.08)" }}>
          <img src={active.img} alt={active.label} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.92) 0%, rgba(10,11,20,.25) 55%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 8 }}>{active.label}</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: active.signs.length ? 16 : 0, maxWidth: 420 }}>{active.tagline}</p>
            {active.signs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {active.signs.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => onNavigate(signRoute(symptom))}
                    className="text-left transition-colors hover:text-white hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 12,
                      color: "rgba(255,255,255,.85)",
                      background: "rgba(10,11,20,.5)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,.18)",
                      borderRadius: 999,
                      padding: "7px 14px",
                      cursor: "pointer",
                    }}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DropdownShell>
  );
}

// ─── Mobile drill-in back header ──────────────────────────────────────────────
function MobileBackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button onClick={onBack} className="flex items-center gap-2 py-3 -ml-1" style={{ background: "none", border: "none", cursor: "pointer" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: ".5px", textTransform: "uppercase" }}>
          Back
        </span>
      </button>
      <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", margin: "4px 0 20px" }}>{title}</h3>
    </>
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
  const [ourDiffOpen, setOurDiffOpen] = useState(false);
  const [signsOpen, setSignsOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"root" | "services" | "resources" | "about" | "our-difference" | "problem-signs">("root");
  const navRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  // Compact dropdowns (Resources/Our Difference/About) render outside the <nav>
  // — inside it they get clipped — so they need their trigger's x offset.
  const [anchorLeft, setAnchorLeft] = useState(0);
  const anchorTo = (e: React.MouseEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    setAnchorLeft(e.currentTarget.getBoundingClientRect().left - nav.getBoundingClientRect().left);
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!megaOpen && !resourcesOpen && !aboutOpen && !ourDiffOpen && !signsOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
        setResourcesOpen(false);
        setAboutOpen(false);
        setOurDiffOpen(false);
        setSignsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [megaOpen, resourcesOpen, aboutOpen, ourDiffOpen, signsOpen]);

  // Escape closes any open dropdown and restores focus to the Services trigger
  useEffect(() => {
    if (!megaOpen && !resourcesOpen && !aboutOpen && !ourDiffOpen && !signsOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setResourcesOpen(false);
        setAboutOpen(false);
        setOurDiffOpen(false);
        setSignsOpen(false);
        servicesBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [megaOpen, resourcesOpen, aboutOpen, ourDiffOpen, signsOpen]);

  const handleNavigate = (p: string) => {
    setMegaOpen(false);
    setResourcesOpen(false);
    setAboutOpen(false);
    setOurDiffOpen(false);
    setSignsOpen(false);
    setMobileOpen(false);
    setMobilePanel("root");
    onNavigate(p);
  };

  const isTransparent = transparent && !scrolled && !megaOpen && !resourcesOpen && !aboutOpen && !ourDiffOpen && !signsOpen && !mobileOpen;

  const links = ["Services", "Problem Signs", "Our Difference", "Resources", "Pricing", "About"];

  return (
    <div
      ref={navRef}
      className="relative"
      onMouseLeave={() => { setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
    >
      <nav
        className="relative z-[300] w-full transition-all duration-300"
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
                    onMouseEnter={() => { setMegaOpen(true); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
                    onClick={() => { setMegaOpen((prev) => !prev); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
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
                    onMouseEnter={(e) => { anchorTo(e); setResourcesOpen(true); setMegaOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
                    onClick={() => { setResourcesOpen((prev) => !prev); setMegaOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
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

              if (l === "Problem Signs") {
                return (
                  <button
                    key="Problem Signs"
                    onMouseEnter={() => { setSignsOpen(true); setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); }}
                    onClick={() => { setSignsOpen((prev) => !prev); setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); }}
                    className="flex items-center gap-1 transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                      color: signsOpen || isActive ? "#fff" : "rgba(255,255,255,.75)",
                      letterSpacing: ".3px", background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? `2px solid ${SAND}` : signsOpen ? `2px solid ${SAND}` : "2px solid transparent",
                      paddingBottom: 2,
                    }}
                  >
                    Problem Signs
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      style={{ transform: signsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              }

              if (l === "Our Difference") {
                return (
                  <button
                    key="Our Difference"
                    onMouseEnter={(e) => { anchorTo(e); setOurDiffOpen(true); setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setSignsOpen(false); }}
                    onClick={() => { setOurDiffOpen((prev) => !prev); setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setSignsOpen(false); }}
                    className="flex items-center gap-1 transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
                      color: ourDiffOpen || isActive ? "#fff" : "rgba(255,255,255,.75)",
                      letterSpacing: ".3px", background: "none", border: "none", cursor: "pointer",
                      borderBottom: isActive ? `2px solid ${SAND}` : ourDiffOpen ? `2px solid ${SAND}` : "2px solid transparent",
                      paddingBottom: 2,
                    }}
                  >
                    Our Difference
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      style={{ transform: ourDiffOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              }

              if (l === "About") {
                return (
                  <button
                    key="About"
                    onMouseEnter={(e) => { anchorTo(e); setAboutOpen(true); setMegaOpen(false); setResourcesOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
                    onClick={() => { setAboutOpen((prev) => !prev); setMegaOpen(false); setResourcesOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
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
          <button className="lg:hidden p-1.5" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => { setMobileOpen((o) => !o); setMobilePanel("root"); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {mobileOpen
                ? <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                : <path d="M3 7h18M3 12h18M3 17h18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu — full-screen overlay, drill-in to a 2nd screen for
            anything with a desktop dropdown (Services/Resources/About) instead
            of an inline accordion. Client: "una esperiencia mucha más mobile". */}
        {mobileOpen && (
          <div className="lg:hidden fixed top-0 left-0 right-0 z-[250] flex flex-col overflow-y-auto" style={{ background: DARK, height: "100dvh" }}>
            <div className="flex items-center justify-between px-8 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <button onClick={() => handleNavigate("home")} className="h-14" style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Logo light />
              </button>
              <button onClick={() => { setMobileOpen(false); setMobilePanel("root"); }} className="p-1.5" style={{ background: "none", border: "none", cursor: "pointer" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex flex-col px-8 py-5 overflow-x-hidden overflow-y-auto">
              <>
                {mobilePanel === "root" && (
                  <motion.div
                    key="root"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col flex-1"
                  >
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>
                      Menu
                    </p>
                    <div className="flex flex-col gap-2">
                      {links.map((l) => {
                        const pageKey = NAV_PAGE_MAP[l];
                        const drillPanel: Record<string, "services" | "resources" | "about" | "our-difference" | "problem-signs"> = {
                          "Services": "services", "Resources": "resources", "About": "about", "Our Difference": "our-difference", "Problem Signs": "problem-signs",
                        };
                        const hasDrill = l in drillPanel;
                        return (
                          <button
                            key={l}
                            onClick={() => hasDrill ? setMobilePanel(drillPanel[l]) : pageKey && handleNavigate(pageKey)}
                            className="w-full flex items-center justify-between text-left transition-colors hover:bg-white/[.07]"
                            style={{
                              fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,.85)", fontSize: 16,
                              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 4,
                              padding: "14px 18px", cursor: "pointer",
                            }}>
                            {l}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
                              <path d={hasDrill ? "M9 18l6-6-6-6" : "M5 12h14M13 6l6 6-6 6"} stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-auto pt-6 flex flex-col items-center gap-3">
                      <a href="tel:+18335841049" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.6)" }}>
                        1-833-584-1049
                      </a>
                      <button onClick={openInspection} className="py-3.5 text-center font-semibold text-white w-full"
                        style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14, border: "none", cursor: "pointer" }}>
                        Schedule Free Inspection
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Services — drill-in: all 5 protagonist services shown already expanded
                    with their symptom sub-links, no tap-to-expand needed. */}
                {mobilePanel === "services" && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <MobileBackHeader title="Services" onBack={() => setMobilePanel("root")} />
                    <div className="flex flex-col gap-5">
                      {MEGA_MENU_SERVICES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div key={cat.label} style={{ borderLeft: "2px solid rgba(255,255,255,.1)" }}>
                            <div className="pl-3 flex items-center gap-3 mb-2.5">
                              <span className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24 }}>
                                {cat.iconImg
                                  ? <img src={cat.iconImg} alt="" className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                                  : <Icon size={22} color="#fff" strokeWidth={2} />}
                              </span>
                              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#fff", fontWeight: 600 }}>
                                {cat.label}
                              </span>
                            </div>
                            <div className="pl-[50px] flex flex-col gap-2.5">
                              <div className="flex flex-wrap gap-1.5">
                                {cat.signs.slice(0, 5).map((symptom) => (
                                  <button
                                    key={symptom}
                                    onClick={() => handleNavigate(signRoute(sign))}
                                    className="text-left"
                                    style={{
                                      fontFamily: "'Inter',sans-serif",
                                      fontSize: 12.5,
                                      lineHeight: 1.2,
                                      color: "rgba(255,255,255,.8)",
                                      background: "rgba(10,11,20,.55)",
                                      backdropFilter: "blur(6px)",
                                      WebkitBackdropFilter: "blur(6px)",
                                      border: "1px solid rgba(255,255,255,.15)",
                                      borderRadius: 999,
                                      padding: "6px 12px",
                                      cursor: "pointer",
                                    }}>
                                    {symptom}
                                  </button>
                                ))}
                              </div>
                              <button
                                onClick={() => handleNavigate(`service/${cat.slug}`)}
                                className="text-left"
                                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                                View {cat.label} →
                              </button>
                            </div>
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
                  </motion.div>
                )}

                {/* Resources — drill-in: direct-navigate links */}
                {mobilePanel === "resources" && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <MobileBackHeader title="Resources" onBack={() => setMobilePanel("root")} />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleNavigate("news-blog")}
                        className="w-full py-3 pl-3 text-left"
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                        News / Blog
                      </button>
                      {RESOURCES_SECTIONS.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => handleNavigate(`resources#${sec.id}`)}
                          className="w-full py-3 pl-3 text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                          {sec.label}
                        </button>
                      ))}
                      <button
                        onClick={() => handleNavigate("resources")}
                        className="py-3 pl-3 text-left"
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                        Go to Resources →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* About — drill-in: the desktop dropdown's 4 tabs become direct links */}
                {mobilePanel === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <MobileBackHeader title="About" onBack={() => setMobilePanel("root")} />
                    <div className="flex flex-col gap-1">
                      {ABOUT_TABS.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => handleNavigate(tab.page)}
                          className="w-full py-3 pl-3 text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {mobilePanel === "our-difference" && (
                  <motion.div
                    key="our-difference"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <MobileBackHeader title="Our Difference" onBack={() => setMobilePanel("root")} />
                    <div className="flex flex-col gap-1">
                      {OUR_DIFFERENCE_SECTIONS.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => handleNavigate(`our-difference#${sec.id}`)}
                          className="w-full py-3 pl-3 text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {mobilePanel === "problem-signs" && (
                  <motion.div
                    key="problem-signs"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <MobileBackHeader title="Problem Signs" onBack={() => setMobilePanel("root")} />
                    <div className="flex flex-col gap-1">
                      {PROBLEM_SIGNS_CATEGORIES.map((cat) => (
                        <div key={cat.id} className="flex flex-col gap-1 mb-3">
                          <button
                            onClick={() => handleNavigate(`problem-signs/${cat.id}`)}
                            className="relative w-full overflow-hidden text-left"
                            style={{ height: 110, background: "none", border: "1px solid rgba(255,255,255,.08)", padding: 0, cursor: "pointer" }}>
                            <img src={cat.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.92) 0%, rgba(10,11,20,.3) 70%)" }} />
                            <span className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2"
                              style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
                              {cat.iconImg && <img src={cat.iconImg} alt="" style={{ width: 20, height: 20, objectFit: "contain", filter: "brightness(0) invert(1)" }} />}
                              {cat.label}
                            </span>
                          </button>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.signs.map((sign) => (
                              <button
                                key={sign}
                                onClick={() => handleNavigate(signRoute(sign))}
                                className="text-left"
                                style={{
                                  fontFamily: "'Inter',sans-serif",
                                  fontSize: 12.5,
                                  lineHeight: 1.2,
                                  color: "rgba(255,255,255,.8)",
                                  background: "rgba(10,11,20,.55)",
                                  backdropFilter: "blur(6px)",
                                  WebkitBackdropFilter: "blur(6px)",
                                  border: "1px solid rgba(255,255,255,.15)",
                                  borderRadius: 999,
                                  padding: "6px 12px",
                                  cursor: "pointer",
                                }}>
                                {sign}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            </div>
          </div>
        )}
      </nav>

      {/* Mega menu — z-[200] clears the StickyAnchorBar (z-50) that lives in the fixed header after SharedNavBar */}
      {megaOpen && (
        <div className="absolute left-0 w-full z-[200]">
          <MegaMenu onNavigate={handleNavigate} />
        </div>
      )}

      {/* Resources / Our Difference / About — compact panels anchored to their
          own nav item's x offset. Only Services and Problem Signs get the
          full-width mega panel. */}
      <div className="absolute z-[200] pt-2" style={{ left: anchorLeft }}>
        <AnimatePresence>
          {resourcesOpen && <ResourcesDropdown key="res" onNavigate={handleNavigate} />}
          {ourDiffOpen && <OurDifferenceDropdown key="diff" onNavigate={handleNavigate} />}
          {aboutOpen && <AboutDropdown key="about" onNavigate={handleNavigate} />}
        </AnimatePresence>
      </div>

      {/* Problem Signs dropdown */}
      {signsOpen && (
        <div className="absolute left-0 w-full z-[200]">
          <ProblemSignsDropdown onNavigate={handleNavigate} />
        </div>
      )}

      <InspectionModal />
    </div>
  );
}
