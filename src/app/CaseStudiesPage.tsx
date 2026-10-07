import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { CASE_STUDIES, caseStudySlug, type CaseStudy } from "./data/caseStudies";

import { B, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Case studies ─────────────────────────────────────────────────────────────
// Laid out like Job Stories (client request): hero with stats, a "Filter by"
// service bar scoped to the grid, a uniform 3-up card grid with pagination and a
// closing CTA. Each card shows the service next to the city — the city name is
// what makes a homeowner in that town recognise the job. A card opens
// case-study/<slug>. The Home and Our Difference teasers keep using
// components/CaseStudiesShowcase.tsx.
const PER_PAGE = 9;

// Raw tags roll up to the same service names the Job Stories filter uses.
const SERVICE_OF: Record<string, string> = { "Concrete Leveling": "Concrete" };
const serviceOf = (c: CaseStudy) => SERVICE_OF[c.tag] ?? c.tag;
const SERVICE_ORDER = ["Crawl Space", "Foundation", "Waterproofing", "Concrete", "Commercial"];
// Only services that have at least one case study get a pill — an empty filter is a dead end.
const FILTERS = ["All", ...SERVICE_ORDER.filter((svc) => CASE_STUDIES.some((c) => serviceOf(c) === svc))];

function CaseCard({ c, index, onClick }: { c: CaseStudy; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const service = serviceOf(c);

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
      style={{ background: SURFACE.base, border: `1px solid ${hovered ? "rgba(0,80,159,.3)" : "rgba(62,60,73,.07)"}`, transition: "border-color .2s" }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: "66%" }}>
        <ImageWithFallback src={c.img} alt={c.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute inset-0" style={{ background: "rgba(62,60,73,.2)" }} />
        {/* Service + city together on the photo */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
          color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
          background: B, padding: "3px 8px",
        }}>{service} · {c.loc}</span>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute", bottom: 12, right: 12, fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}
        >
          Read story <ChevronRight size={12} color={SAND} />
        </motion.div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, color: B, background: "rgba(0,80,159,.1)", border: "1px solid rgba(0,80,159,.2)", padding: "2px 8px" }}>
            {service}
          </span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, color: "rgba(62,60,73,.55)", background: "rgba(62,60,73,.05)", border: `1px solid ${ON_LIGHT.border}`, padding: "2px 8px" }}>
            {c.loc}
          </span>
        </div>
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR, lineHeight: 1.3, margin: 0 }}>{c.title}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.5)", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
        {c.stats.length > 0 && (
          <div className="flex gap-6 mt-auto pt-4" style={{ borderTop: `1px solid ${ON_LIGHT.border}` }}>
            {c.stats.slice(0, 3).map(([val, label]) => (
              <div key={val + label}>
                <div style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: B, lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10.5, color: "rgba(62,60,73,.45)", marginTop: 4, lineHeight: 1.35, whiteSpace: "pre-line" }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = [
    { h: "Services", ls: ["Crawl Space", "Basement Waterproofing", "Foundation Repair", "Concrete Leveling", "Mold Prevention", "Insulation"] },
    { h: "Company", ls: ["About Us", "Our Difference", "Resources", "Careers", "Contact"] },
    { h: "Service Areas", ls: ["Mississippi", "Tennessee", "Arkansas", "Missouri"] },
    { h: "Our Difference", ls: ["Case Studies", "Before & After", "Awards", "Job Stories"] },
  ];
  return (
    <footer style={{ background: SURFACE.footer }}>
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

// ─── CaseStudiesPage ──────────────────────────────────────────────────────────
export default function CaseStudiesPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  const nav = onNavigate ?? (() => onBack());
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = activeFilter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => serviceOf(c) === activeFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const handleFilter = (f: string) => { setActiveFilter(f); setPage(1); };
  const countOf = (f: string) => (f === "All" ? CASE_STUDIES.length : CASE_STUDIES.filter((c) => serviceOf(c) === f).length);
  const cities = new Set(CASE_STUDIES.map((c) => c.loc)).size;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={nav} active="Resources" />
      </div>

      <div className="w-full min-h-screen pt-[57px] sm:pt-[65px] md:pt-[109px] lg:pt-[122px] wide:pt-[135px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: "Resources", onClick: () => nav("resources") },
          { label: "Case Studies" },
        ]} />

        {/* ── Hero ── */}
        <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(62,60,73,.06)" }} className="py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div ref={heroRef} className="flex flex-col lg:flex-row lg:items-end gap-10">
              <motion.div className="flex-1" initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: 28, height: 2, background: B }} />
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Case Studies</span>
                </div>
                <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,72px)", color: CHAR, lineHeight: 0.98, letterSpacing: "-2px", marginBottom: 20 }}>
                  Real homes,<br />real results
                </h1>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,1.2vw,17px)", color: "rgba(62,60,73,.55)", lineHeight: 1.7, maxWidth: 520 }}>
                  {CASE_STUDIES.length} in-depth project stories — commitments we put in writing, not just talking points. Filter by service, then open any card for the full story.
                </p>
              </motion.div>
              <motion.div className="flex gap-10 shrink-0" initial={{ opacity: 0, x: 20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}>
                {[[String(CASE_STUDIES.length), "Case studies"], [String(cities), "Cities"], ["4", "States served"]].map(([n, l]) => (
                  <div key={l}>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: B, lineHeight: 1, letterSpacing: "-1px", marginBottom: 4 }}>{n}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.5)" }}>{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div className="relative mb-8 pb-6" style={{ borderBottom: "1px solid rgba(62,60,73,.07)" }}>
              <div role="group" aria-label="Filter case studies by service" className="flex items-center gap-3 flex-wrap">
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.5)", flexShrink: 0 }}>Filter by:</span>
                <div className="flex items-center gap-3 overflow-x-auto" style={{ flex: 1 }}>
                  {FILTERS.map((f) => (
                    <button key={f} onClick={() => handleFilter(f)} aria-pressed={activeFilter === f} className="flex-shrink-0 px-4 py-2 transition-all"
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                        background: activeFilter === f ? B : "transparent",
                        color: activeFilter === f ? "#fff" : MUTED,
                        border: `1.5px solid ${activeFilter === f ? B : ON_LIGHT.border}`,
                        cursor: "pointer",
                      }}>
                      {f} <span style={{ opacity: 0.65, marginLeft: 2 }}>{countOf(f)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-10">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.5)" }}>
                Showing <strong style={{ color: "rgba(62,60,73,.8)" }}>{filtered.length}</strong> case {filtered.length === 1 ? "study" : "studies"}
                {activeFilter !== "All" && (
                  <span> · <button onClick={() => handleFilter("All")} style={{ color: B, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>Clear filter</button></span>
                )}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeFilter + page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                {pageItems.map((c, i) => (
                  <CaseCard key={caseStudySlug(c)} c={c} index={i} onClick={() => nav(`case-study/${caseStudySlug(c)}`)} />
                ))}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 148, behavior: "smooth" }); }} disabled={page === 1} aria-label="Previous page"
                  className="w-10 h-10 flex items-center justify-center disabled:opacity-30"
                  style={{ border: `1.5px solid ${ON_LIGHT.border}`, color: CHAR, background: "none", cursor: page === 1 ? "not-allowed" : "pointer" }}>
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14,
                      background: page === n ? B : "transparent", color: page === n ? "#fff" : "rgba(62,60,73,.5)",
                      border: `1.5px solid ${page === n ? B : "rgba(62,60,73,.15)"}`, cursor: "pointer",
                    }}>
                    {n}
                  </button>
                ))}
                <button onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 148, behavior: "smooth" }); }} disabled={page === totalPages} aria-label="Next page"
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
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Your home is next</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,4vw,50px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
                Ready to see what we can do for yours?
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.55)", lineHeight: 1.7, marginBottom: 32 }}>
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
