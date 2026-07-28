import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Home, Layers, Droplets, Grid3x3, Leaf, Building2, ChevronRight } from "lucide-react";
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
import { B, DARK, SAND, SURFACE } from "./theme";

// ─── Page map ─────────────────────────────────────────────────────────────────
export const NAV_PAGE_MAP: Record<string, string> = {
  "Services":      "services-landing",
  "Problem Signs": "problem-signs",
  "Our Difference":"our-difference",
  "Resources":     "resources",
  "About":         "about",
  "Careers":       "careers",
  "Service Area":  "service-area",
};


// ─── Resources Dropdown ───────────────────────────────────────────────────────
// Exact order/labels from the approved sitemap: Project gallery, Homeowner
// education, Pricing & Cost Guides, Job stories, FAQs, Reviews & testimonials,
// News. "Downloadable resources" lives under Homeowner education on the
// sitemap but is NOT a nav-level destination — it only surfaces once inside
// the Resources page itself. Keep in sync with ResourcesPage.tsx's NAV_TABS.
const RESOURCES_SECTIONS = [
  { label: "Project gallery",        id: "gallery" },
  { label: "Homeowner education",    id: "buyer-seller" },
  { label: "Pricing & Cost Guides",  id: "cost" },
  { label: "Job stories",            id: "job-stories" },
  { label: "FAQs",                   id: "faq" },
  { label: "Reviews & testimonials", id: "reviews" },
];

// ─── Simple dropdown (used by every top-level nav item now) ───────────────────
// Our Difference / Resources / About are link lists, not visual destinations —
// a full-width mega panel for a list of text links reads as noise next to the
// Services/Problem Signs image menus. These get a compact panel anchored under
// their own nav item instead.
function SimpleDropdown({ children, width = 260 }: { children: React.ReactNode; width?: number }) {
  return (
    <motion.div
      role="menu"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
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

function SimpleDropdownItem({ label, onClick, indent }: { label: string; onClick: () => void; indent?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      role="menuitem"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
      style={{
        fontFamily: "'Inter',sans-serif", fontSize: indent ? 12.5 : 13.5,
        color: hover ? "#fff" : "rgba(255,255,255,.75)",
        background: hover ? "rgba(255,255,255,.06)" : "none",
        border: "none", cursor: "pointer",
        padding: indent ? "8px 16px 8px 30px" : "10px 16px",
      }}
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

// Row with a nested flyout submenu (opens to the right on hover), same voice
// as SimpleDropdownItem — used where a category has its own sub-list
// (Services > symptoms, Problem Signs > symptoms) instead of a photo preview.
function FlyoutItem({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        role="menuitem"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 text-left px-4 py-2.5 transition-colors hover:bg-white/[.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
        style={{
          fontFamily: "'Inter',sans-serif", fontWeight: open ? 600 : 400, fontSize: 13.5,
          color: open ? "#fff" : "rgba(255,255,255,.75)",
          background: open ? "rgba(255,255,255,.05)" : "none",
          border: "none", cursor: onClick ? "pointer" : "default",
        }}
      >
        {label}
        <ChevronRight size={13} color={open ? SAND : "rgba(255,255,255,.35)"} className="shrink-0" />
      </button>
      {open && (
        <div className="absolute top-0 left-full" style={{ paddingLeft: 4 }}>
          <div
            className="flex flex-col py-2"
            style={{
              width: 280,
              background: "rgba(10,11,20,.98)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,.5)",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
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
        <SimpleDropdownItem key={sec.label} label={sec.label} indent={sec.indent} onClick={() => onNavigate(`resources#${sec.id}`)} />
      ))}
      <div className="my-2 mx-4 h-px" style={{ background: "rgba(255,255,255,.08)" }} />
      <SimpleDropdownItem label="News" onClick={() => onNavigate("news-blog")} />
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

// Careers' own page subheader (culture, hiring process, open positions,
// benefits) — surfaced here as a flyout so it's reachable from the nav,
// same anchors CareersPage.tsx uses.
const CAREERS_SECTIONS = [
  { label: "Culture", id: "culture" },
  { label: "Hiring process", id: "hiring-process" },
  { label: "Open positions", id: "open-positions" },
  { label: "Benefits", id: "benefits" },
];

function AboutDropdown({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <SimpleDropdown>
      {ABOUT_TABS.map((tab) =>
        tab.key === "careers" ? (
          <FlyoutItem key={tab.key} label={tab.label} onClick={() => onNavigate(tab.page)}>
            {CAREERS_SECTIONS.map((sec) => (
              <SimpleDropdownItem key={sec.id} label={sec.label} onClick={() => onNavigate(`careers#${sec.id}`)} />
            ))}
          </FlyoutItem>
        ) : (
          <SimpleDropdownItem key={tab.key} label={tab.label} onClick={() => onNavigate(tab.page)} />
        )
      )}
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
  { label: "Before & after", id: "before-after" },
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
// Exact 4 categories/order from the approved sitemap — keep in sync with
// ProblemSignsPage.tsx's CATEGORIES. Plain vertical list, each category flies
// out its symptoms on hover — client asked to drop the mega menu entirely in
// favor of this simple list + flyout pattern (reference: competitor nav).
const PROBLEM_SIGNS_CATEGORIES = [
  { slug: "structural-repair",  id: "structural",    icon: Home,     iconImg: iconFoundation as string,    img: imgSvcFoundation as string },
  { slug: "crawl-space-repair", id: "crawl",         icon: Layers,   iconImg: iconCrawlspace as string,    img: imgSvcCrawlspace as string },
  { slug: "waterproofing",      id: "waterproofing", icon: Droplets, iconImg: iconWaterproofing as string, img: imgSvcWaterproofing as string },
  { slug: "concrete-services",  id: "concrete",      icon: Grid3x3,  iconImg: iconConcrete as string,      img: imgSvcConcrete as string },
].map((cat) => ({
  ...cat,
  label: SERVICES[cat.slug].name,
  // Mobile drill-in still uses the photo card; the desktop dropdown (below)
  // is a plain list and ignores these fields.
  signs: SERVICES[cat.slug].symptoms.map((s) => s.q),
}));

function ProblemSignsDropdown({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <SimpleDropdown width={260}>
      {PROBLEM_SIGNS_CATEGORIES.map((cat) => (
        // The category row itself has to be clickable: QA flagged that picking
        // a category in the menu landed nowhere. It goes to the Problem Signs
        // page scoped to that category, which renders its own CategoryHero.
        <FlyoutItem key={cat.id} label={cat.label} onClick={() => onNavigate(`problem-signs/${cat.id}`)}>
          {cat.signs.map((sign) => (
            <SimpleDropdownItem key={sign} label={sign} onClick={() => onNavigate(signRoute(sign))} />
          ))}
        </FlyoutItem>
      ))}
    </SimpleDropdown>
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

// ─── Services Dropdown ──────────────────────────────────────────────────────
// Client asked to drop the mega menu (list + photo preview) entirely in favor
// of a plain vertical list — each category flies out its symptoms on hover,
// same pattern as Problem Signs and the reference competitor nav they pointed
// to. No photos, no second surface to scan before acting.
const MEGA_MENU_SERVICES = SERVICE_CATEGORIES.slice(0, 5);

function MegaMenu({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <SimpleDropdown width={260}>
      {MEGA_MENU_SERVICES.map((c) => (
        <SimpleDropdownItem key={c.slug} label={c.label} onClick={() => onNavigate(`service/${c.slug}`)} />
      ))}
    </SimpleDropdown>
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
  // Second mobile level. QA: with every category expanded at once the 4th and
  // 5th service were unreachable, so a category now opens on its own screen.
  const [mobileCat, setMobileCat] = useState<string | null>(null);
  const openMobilePanel = (panel: typeof mobilePanel) => { setMobilePanel(panel); setMobileCat(null); };
  const navRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);

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

  const links = ["Services", "Problem Signs", "Our Difference", "Resources", "About"];

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
          <button onClick={() => handleNavigate("home")} className="h-16 lg:h-20 xl:h-24 shrink-0" style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Logo light />
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {links.map((l) => {
              const pageKey = NAV_PAGE_MAP[l];
              const isActive = l === active;

              // Each item owns a relative wrapper so its dropdown is CSS-anchored
              // directly under its own button (left:0 top:full) — no shared
              // JS-measured x offset, so switching between items can't make an
              // exiting panel snap to the newly-hovered item's position.
              if (l === "Services") {
                return (
                  <div key="Services" className="relative">
                    <button
                      ref={servicesBtnRef}
                      aria-haspopup="menu"
                      aria-expanded={megaOpen}
                      onMouseEnter={() => { setMegaOpen(true); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
                      onClick={() => { setMegaOpen(false); handleNavigate("services-landing"); }}
                      className="flex items-center gap-1 transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4AB6C]"
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
                    <div className="absolute left-0 top-full z-[200] pt-2">
                      <AnimatePresence>
                        {megaOpen && <MegaMenu key="services" onNavigate={handleNavigate} />}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }

              if (l === "Resources") {
                return (
                  <div key="Resources" className="relative">
                    <button
                      onMouseEnter={() => { setResourcesOpen(true); setMegaOpen(false); setAboutOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
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
                    <div className="absolute left-0 top-full z-[200] pt-2">
                      <AnimatePresence>
                        {resourcesOpen && <ResourcesDropdown key="res" onNavigate={handleNavigate} />}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }

              if (l === "Problem Signs") {
                return (
                  <div key="Problem Signs" className="relative">
                    <button
                      onMouseEnter={() => { setSignsOpen(true); setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setOurDiffOpen(false); }}
                      onClick={() => { setSignsOpen(false); handleNavigate("problem-signs"); }}
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
                    <div className="absolute left-0 top-full z-[200] pt-2">
                      <AnimatePresence>
                        {signsOpen && <ProblemSignsDropdown key="signs" onNavigate={handleNavigate} />}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }

              if (l === "Our Difference") {
                return (
                  <div key="Our Difference" className="relative">
                    <button
                      onMouseEnter={() => { setOurDiffOpen(true); setMegaOpen(false); setResourcesOpen(false); setAboutOpen(false); setSignsOpen(false); }}
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
                    <div className="absolute left-0 top-full z-[200] pt-2">
                      <AnimatePresence>
                        {ourDiffOpen && <OurDifferenceDropdown key="diff" onNavigate={handleNavigate} />}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }

              if (l === "About") {
                return (
                  <div key="About" className="relative">
                    <button
                      onMouseEnter={() => { setAboutOpen(true); setMegaOpen(false); setResourcesOpen(false); setOurDiffOpen(false); setSignsOpen(false); }}
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
                    <div className="absolute left-0 top-full z-[200] pt-2">
                      <AnimatePresence>
                        {aboutOpen && <AboutDropdown key="about" onNavigate={handleNavigate} />}
                      </AnimatePresence>
                    </div>
                  </div>
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
          <button className="lg:hidden p-1.5" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => { setMobileOpen((o) => !o); openMobilePanel("root"); }}>
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
          <div className="lg:hidden fixed inset-0 z-[240]" style={{ background: "rgba(0,0,0,.5)" }} onClick={() => { setMobileOpen(false); openMobilePanel("root"); }} />
        )}
        {mobileOpen && (
          <div className="lg:hidden fixed top-0 left-0 right-0 z-[250] flex flex-col overflow-y-auto" style={{ background: DARK, maxHeight: "85dvh" }}>
            <div className="flex items-center justify-between px-8 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <button onClick={() => handleNavigate("home")} className="h-14" style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Logo light />
              </button>
              <button onClick={() => { setMobileOpen(false); openMobilePanel("root"); }} className="p-1.5" style={{ background: "none", border: "none", cursor: "pointer" }}>
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

                {/* Services — two mobile levels: the 5 services first, then one
                    service's symptoms on its own screen. Everything expanded at
                    once pushed the 4th and 5th service below the fold. */}
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
                    <div className="flex flex-col gap-1">
                      {MEGA_MENU_SERVICES.map((c) => {
                        const Icon = c.icon;
                        return (
                          <button
                            key={c.slug}
                            onClick={() => handleNavigate(`service/${c.slug}`)}
                            className="w-full flex items-center gap-3 py-3.5 pl-3 pr-2 text-left"
                            style={{ background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                            <span className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24 }}>
                              {c.iconImg
                                ? <img src={c.iconImg} alt="" className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                                : <Icon size={22} color="#fff" strokeWidth={2} />}
                            </span>
                            <span className="flex-1" style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#fff", fontWeight: 600 }}>
                              {c.label}
                            </span>
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handleNavigate("services-landing")}
                        className="py-3 pl-3 mt-1 text-left"
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
                      {RESOURCES_SECTIONS.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => handleNavigate(`resources#${sec.id}`)}
                          className="w-full text-left"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: sec.indent ? 13.5 : 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer", padding: sec.indent ? "10px 12px 10px 30px" : "12px 12px 12px 12px" }}>
                          {sec.label}
                        </button>
                      ))}
                      <button
                        onClick={() => handleNavigate("news-blog")}
                        className="w-full py-3 pl-3 text-left"
                        style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                        News
                      </button>
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
                        <div key={tab.key} className="flex flex-col">
                          <button
                            onClick={() => handleNavigate(tab.page)}
                            className="w-full py-3 pl-3 text-left"
                            style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                            {tab.label}
                          </button>
                          {tab.key === "careers" && CAREERS_SECTIONS.map((sec) => (
                            <button
                              key={sec.id}
                              onClick={() => handleNavigate(`careers#${sec.id}`)}
                              className="w-full text-left"
                              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.55)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer", padding: "8px 12px 8px 30px" }}>
                              {sec.label}
                            </button>
                          ))}
                        </div>
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

                {/* Problem Signs — same two levels as Services: the 4 categories
                    first (photo cards, the visual cue the client asked for),
                    then that category's signs on their own screen. */}
                {mobilePanel === "problem-signs" && (
                  <motion.div
                    key="problem-signs"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    {(() => {
                      const cat = PROBLEM_SIGNS_CATEGORIES.find((c) => c.id === mobileCat);

                      if (cat) {
                        return (
                          <>
                            <MobileBackHeader title={cat.label} onBack={() => setMobileCat(null)} />
                            <div className="flex flex-col gap-1">
                              {cat.signs.map((sign) => (
                                <button
                                  key={sign}
                                  onClick={() => handleNavigate(signRoute(sign))}
                                  className="w-full py-3 pl-3 text-left"
                                  style={{ fontFamily: "'Inter',sans-serif", fontSize: 14.5, lineHeight: 1.35, color: "rgba(255,255,255,.75)", background: "none", border: "none", borderLeft: "2px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
                                  {sign}
                                </button>
                              ))}
                              <button
                                onClick={() => handleNavigate(`problem-signs/${cat.id}`)}
                                className="py-3 pl-3 mt-1 text-left"
                                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                                All {cat.label} signs →
                              </button>
                            </div>
                          </>
                        );
                      }

                      return (
                        <>
                          <MobileBackHeader title="Problem Signs" onBack={() => setMobilePanel("root")} />
                          <div className="flex flex-col gap-2">
                            {PROBLEM_SIGNS_CATEGORIES.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => setMobileCat(c.id)}
                                className="relative w-full overflow-hidden text-left"
                                style={{ height: 110, background: "none", border: "1px solid rgba(255,255,255,.08)", padding: 0, cursor: "pointer" }}>
                                <img src={c.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.92) 0%, rgba(10,11,20,.3) 70%)" }} />
                                <span className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2"
                                  style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
                                  {c.iconImg && <img src={c.iconImg} alt="" style={{ width: 20, height: 20, objectFit: "contain", filter: "brightness(0) invert(1)" }} />}
                                  {c.label}
                                </span>
                                <ChevronRight size={18} color="rgba(255,255,255,.7)" className="absolute right-3 bottom-3.5" />
                              </button>
                            ))}
                            <button
                              onClick={() => handleNavigate("problem-signs")}
                              className="py-3 pl-3 mt-1 text-left"
                              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
                              All problem signs →
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </>
            </div>
          </div>
        )}
      </nav>

      <InspectionModal />
    </div>
  );
}
