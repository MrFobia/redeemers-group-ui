import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, Play, ArrowRight } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { Logo } from "./components/Logo";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { STORIES, jobStorySlug, type JobStory } from "./data/jobStories";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_FILTERS = ["All", "Crawl Space", "Foundation", "Waterproofing", "Concrete", "Commercial"];


const PER_PAGE = 9;

// Story detail now lives at job-story/<slug> (see WorkInnerPage) — the old
// StoryModal was removed so a story can be linked, shared and indexed.
export type Story = JobStory;

// ─── Story Card ───────────────────────────────────────────────────────────────
function StoryCard({ story, index, onClick }: { story: Story; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % PER_PAGE) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col cursor-pointer group"
      style={{
        background: SURFACE.base,
        border: `1px solid ${hovered ? "rgba(0,80,159,.3)" : "rgba(62,60,73,.07)"}`,
        transition: "border-color .2s",
      }}
      whileHover={{ y: -5 }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "66%" }}>
        <ImageWithFallback
          src={story.img} alt={story.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "rgba(62,60,73,.35)", opacity: hovered ? 0.7 : 0.35 }} />

        {/* Play button — visible always, grows on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.75 }}
            transition={{ duration: 0.25 }}
            style={{ width: 48, height: 48, borderRadius: "50%", background: B, border: "2px solid rgba(255,255,255,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Play size={18} fill="white" stroke="none" style={{ marginLeft: 3 }} />
          </motion.div>
        </div>

        {/* Service badge top-left */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
          color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
          background: B, padding: "3px 8px",
        }}>{story.service}</span>

        {/* "View story" on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute", bottom: 12, right: 12,
            fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600,
            color: B, letterSpacing: 1, textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          View story <ChevronRight size={12} color={SAND} />
        </motion.div>
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, color: B, background: "rgba(0,80,159,.1)", border: "1px solid rgba(0,80,159,.2)", padding: "2px 8px" }}>
            {story.service}
          </span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, color: "rgba(62,60,73,.4)", background: "rgba(62,60,73,.05)", border: `1px solid ${ON_LIGHT.border}`, padding: "2px 8px" }}>
            {story.loc}
          </span>
        </div>

        {/* Name + meta */}
        <div>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR, lineHeight: 1.3, marginBottom: 4 }}>{story.name}</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.3)" }}>{story.duration} · {story.date}</p>
        </div>

        {/* Result preview */}
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.4)", lineHeight: 1.6 }}>
          {story.result.length > 75 ? story.result.slice(0, 75) + "…" : story.result}
        </p>
      </div>
    </motion.div>
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
    <footer style={{ background: SURFACE.footer }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="lg:w-72 shrink-0">
            <button onClick={onBack} className="h-20 mb-5 block"><Logo light /></button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>The steady, local authority when something foundational is wrong.</p>
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

// ─── JobStoriesPage ───────────────────────────────────────────────────────────
export default function JobStoriesPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  // Stories open as their own page (job-story/<slug>) — no modal.
  const go = onNavigate ?? (() => onBack());
  const [activeFilter, setActiveFilter] = useState("All");
  const [areaOpen, setAreaOpen] = useState(false);
  const [symptomsOpen, setSymptomsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const areaRef = useRef<HTMLDivElement>(null);
  const symptomsRef = useRef<HTMLDivElement>(null);
  const [areaPos, setAreaPos] = useState<DOMRect | null>(null);
  const [symptomsPos, setSymptomsPos] = useState<DOMRect | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!areaOpen && !symptomsOpen) return;
    const close = () => { setAreaOpen(false); setSymptomsOpen(false); };
    window.addEventListener("click", close, true);
    return () => window.removeEventListener("click", close, true);
  }, [areaOpen, symptomsOpen]);

  const nav = onNavigate ?? (() => onBack());

  const filtered = activeFilter === "All" ? STORIES : STORIES.filter(s => s.service === activeFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageStories = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: string) => { setActiveFilter(f); setPage(1); };

  return (
    <>
      {/* Fixed header only — the filter bar used to be flush under here;
          client asked for it to sit right above "Showing N stories"
          instead, in normal flow, so it reads as scoped to the grid. */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={nav} active="" />
      </div>

      {/* Header height varies by breakpoint (announcement bar hides < md) */}
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>

        <PageBreadcrumb items={[
          { label: "Home", onClick: () => nav("home") },
          { label: "Resources", onClick: () => nav("resources") },
          { label: "Job Stories" },
        ]} />

        {/* ── Hero ── */}
        <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(62,60,73,.06)" }} className="py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div ref={heroRef} className="flex flex-col lg:flex-row lg:items-end gap-10">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 28 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: 28, height: 2, background: B }} />
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Job Stories</span>
                </div>
                <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,72px)", color: CHAR, lineHeight: 0.98, letterSpacing: "-2px", marginBottom: 20 }}>
                  Real jobs,<br />real results
                </h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,1.2vw,17px)", color: "rgba(62,60,73,.45)", lineHeight: 1.7, maxWidth: 500 }}>
                  Every story below is a real project from a real homeowner. No actors, no staged photos — just honest work and lasting results across Tennessee, Arkansas, Mississippi, and Missouri.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-10 shrink-0"
                initial={{ opacity: 0, x: 20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[["127+", "Projects completed"], ["4.9★", "Average rating"], ["12 yrs", "In business"]].map(([n, l]) => (
                  <div key={l}>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: B, lineHeight: 1, letterSpacing: "-1px", marginBottom: 4 }}>{n}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.3)" }}>{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">

            {/* Filter bar — scoped to this grid, not the fixed header */}
            <div className="relative mb-8 pb-6" style={{ borderBottom: "1px solid rgba(62,60,73,.07)" }}>
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.4)", flexShrink: 0 }}>Filter by:</span>
                <div className="flex items-center gap-3 overflow-x-auto" style={{ flex: 1 }}>
                  {SERVICE_FILTERS.map((f) => (
                    <button key={f} onClick={() => handleFilter(f)} className="flex-shrink-0 px-4 py-2 transition-all"
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                        background: activeFilter === f ? B : "transparent",
                        color: activeFilter === f ? "#fff" : MUTED,
                        border: `1.5px solid ${activeFilter === f ? B : ON_LIGHT.border}`,
                        cursor: "pointer",
                      }}>
                      {f}
                    </button>
                  ))}
                </div>
                <div style={{ width: 1, height: 20, background: "rgba(62,60,73,.1)", flexShrink: 0, margin: "0 4px" }} />
                <div className="flex-shrink-0" ref={areaRef}>
                  <button onClick={() => { setAreaPos(areaRef.current?.getBoundingClientRect() ?? null); setAreaOpen(v => !v); setSymptomsOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                    Service area <ChevronDown size={13} />
                  </button>
                </div>
                <div className="flex-shrink-0" ref={symptomsRef}>
                  <button onClick={() => { setSymptomsPos(symptomsRef.current?.getBoundingClientRect() ?? null); setSymptomsOpen(v => !v); setAreaOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                    All Symptoms <ChevronDown size={13} />
                  </button>
                </div>
              </div>

              {/* Dropdown portals — fixed so they escape overflow clipping */}
              {areaOpen && areaPos && (
                <div style={{ position: "fixed", top: areaPos.bottom + 4, left: areaPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(62,60,73,.5)", minWidth: 160 }}>
                  {["Tennessee", "Arkansas", "Mississippi", "Missouri"].map((s) => (
                    <button key={s} onClick={() => setAreaOpen(false)} className="w-full text-left px-4 py-2.5"
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.65)", background: "transparent", border: "none", cursor: "pointer", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(62,60,73,.06)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {symptomsOpen && symptomsPos && (
                <div style={{ position: "fixed", top: symptomsPos.bottom + 4, left: symptomsPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(62,60,73,.5)", minWidth: 190 }}>
                  {["Cracked walls", "Uneven floors", "Wet basement", "Musty smell", "Sticking doors", "Sagging joists"].map((s) => (
                    <button key={s} onClick={() => setSymptomsOpen(false)} className="w-full text-left px-4 py-2.5"
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.65)", background: "transparent", border: "none", cursor: "pointer", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(62,60,73,.06)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-10">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.3)" }}>
                Showing <strong style={{ color: "rgba(62,60,73,.7)" }}>{filtered.length}</strong> stories
                {activeFilter !== "All" && (
                  <span> · <button onClick={() => handleFilter("All")} style={{ color: B, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>Clear</button></span>
                )}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter + page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
              >
                {pageStories.map((story, i) => (
                  <StoryCard
                    key={`${story.name}-${i}`}
                    story={story}
                    index={i}
                    onClick={() => go(`job-story/${jobStorySlug(story)}`)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center disabled:opacity-30"
                  style={{ border: `1.5px solid ${ON_LIGHT.border}`, color: CHAR, background: "none", cursor: page === 1 ? "not-allowed" : "pointer" }}>
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14,
                      background: page === p ? B : "transparent",
                      color: page === p ? DARK : "rgba(62,60,73,.5)",
                      border: `1.5px solid ${page === p ? B : "rgba(62,60,73,.15)"}`,
                      cursor: "pointer",
                    }}>
                    {p}
                  </button>
                ))}
                <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center disabled:opacity-30"
                  style={{ border: `1.5px solid ${ON_LIGHT.border}`, color: CHAR, background: "none", cursor: page === totalPages ? "not-allowed" : "pointer" }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: SURFACE.base, borderTop: "1px solid rgba(62,60,73,.06)" }} className="py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div className="max-w-[600px]">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: 28, height: 2, background: B }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Your story starts here</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,4vw,50px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
                Ready to become our next success story?
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.4)", lineHeight: 1.7, marginBottom: 32 }}>
                Free inspection. No obligation. Same-week availability across TN, AR, MS & MO.
              </p>
              <button onClick={openInspection}
                className="inline-flex items-center gap-3 px-8 py-4 hover:opacity-90 transition-opacity"
                style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: 0.5, cursor: "pointer", border: "none" }}>
                Schedule Free Inspection <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <Footer onBack={onBack} />
      </div>

    </>
  );
}
