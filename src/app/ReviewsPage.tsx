import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight, Star, Play } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { Logo } from "./components/Logo";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ALL_REVIEWS, reviewSlug } from "./data/reviews";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_FILTERS = ["All", "Crawl Space", "Basement", "Foundation", "Concrete", "Commercial"];

const PER_PAGE = 9;

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({ r, i, onClick }: { r: typeof ALL_REVIEWS[0]; i: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (i % PER_PAGE) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="flex flex-col cursor-pointer group"
      style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, transition: "border-color .2s" }}
      whileHover={{ y: -4 }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,80,159,.35)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(62,60,73,.07)")}
    >
      {/* Thumb */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "52%" }}>
        <ImageWithFallback src={r.img} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(62,60,73,.45)" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ background: B }}>
            <Play size={16} fill="white" stroke="none" />
          </div>
        </div>
        <span style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
          color: CHAR, letterSpacing: 2, textTransform: "uppercase",
          background: "rgba(0,80,159,.85)", padding: "3px 8px",
        }}>{r.service}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: r.stars }).map((_, si) => (
            <Star key={si} size={13} fill={SAND} stroke="none" />
          ))}
        </div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 40, color: "rgba(0,80,159,.25)", lineHeight: 0.6, marginBottom: 10 }}>&ldquo;</div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.6)", lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
          {r.quote}
        </p>
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(62,60,73,.07)" }}>
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "rgba(62,60,73,.1)" }}>
            <ImageWithFallback src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>{r.name}</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.35)" }}>{r.loc}</p>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.2)" }}>{r.date}</span>
        </div>
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

// ─── ReviewsPage ──────────────────────────────────────────────────────────────
export default function ReviewsPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  // Reviews open as their own page (review/<slug>) — no modal.
  const go = onNavigate ?? (() => onBack());
  const [activeFilter, setActiveFilter] = useState("All");
  const [serviceAreaOpen, setServiceAreaOpen] = useState(false);
  const [symptomsOpen, setSymptomsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const areaRef = useRef<HTMLDivElement>(null);
  const symptomsRef = useRef<HTMLDivElement>(null);
  const [areaPos, setAreaPos] = useState<DOMRect | null>(null);
  const [symptomsPos, setSymptomsPos] = useState<DOMRect | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!serviceAreaOpen && !symptomsOpen) return;
    const close = () => { setServiceAreaOpen(false); setSymptomsOpen(false); };
    window.addEventListener("click", close, true);
    return () => window.removeEventListener("click", close, true);
  }, [serviceAreaOpen, symptomsOpen]);

  const filtered = activeFilter === "All"
    ? ALL_REVIEWS
    : ALL_REVIEWS.filter((r) => r.service === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageReviews = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    setPage(1);
  };

  const nav = onNavigate ?? (() => onBack());

  return (
    <>
      {/* Fixed header only — the filter bar used to live flush under here,
          but it read as attached to the nav instead of scoped to the grid
          below it. Client asked for it to sit right above "Showing N
          reviews" instead, in normal flow. */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={nav} active="" />
      </div>

      {/* Header height varies by breakpoint (announcement bar hides < md) */}
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>

        <PageBreadcrumb items={[{ label: "Home", onClick: () => nav("home") }, { label: "All Reviews" }]} />

        {/* ── Hero ── */}
        <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(62,60,73,.06)" }} className="py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div className="max-w-[760px]">
              {/* Stars + rating */}
              <div className="flex items-center gap-2 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={SAND} stroke="none" />
                ))}
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, marginLeft: 4 }}>4.9 on Google</span>
              </div>

              <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5vw,70px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 20 }}>
                All Customer Reviews
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,1.2vw,17px)", color: "rgba(62,60,73,.45)", lineHeight: 1.7, marginBottom: 14, maxWidth: 560 }}>
                Real results from homeowners across Tennessee, Arkansas, Mississippi, and Missouri. Every review is verified and unedited.
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.25)" }}>
                {ALL_REVIEWS.length} verified reviews &nbsp;·&nbsp; Last updated: June 2026
              </p>
            </div>
          </div>
        </section>

        {/* ── Review grid ── */}
        <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">

            {/* Filter bar — scoped to this grid, not the fixed header */}
            <div className="relative mb-8 pb-6" style={{ borderBottom: "1px solid rgba(62,60,73,.07)" }}>
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.4)", flexShrink: 0 }}>Filter by:</span>
                <div className="flex items-center gap-3 overflow-x-auto" style={{ flex: 1 }}>
                  {SERVICE_FILTERS.map((f) => (
                    <button key={f} onClick={() => handleFilterChange(f)} className="flex-shrink-0 px-4 py-2 transition-all"
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
                  <button onClick={() => { setAreaPos(areaRef.current?.getBoundingClientRect() ?? null); setServiceAreaOpen(v => !v); setSymptomsOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                    Service area <ChevronDown size={13} />
                  </button>
                </div>
                <div className="flex-shrink-0" ref={symptomsRef}>
                  <button onClick={() => { setSymptomsPos(symptomsRef.current?.getBoundingClientRect() ?? null); setSymptomsOpen(v => !v); setServiceAreaOpen(false); }}
                    className="flex items-center gap-1.5 px-4 py-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(62,60,73,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                    All Symptoms <ChevronDown size={13} />
                  </button>
                </div>
              </div>

              {/* Fixed-positioned dropdowns — escape overflow clipping */}
              {serviceAreaOpen && areaPos && (
                <div style={{ position: "fixed", top: areaPos.bottom + 4, left: areaPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(62,60,73,.5)", minWidth: 160 }}>
                  {["Tennessee", "Arkansas", "Mississippi", "Missouri"].map((s) => (
                    <button key={s} onClick={() => setServiceAreaOpen(false)} className="w-full text-left px-4 py-2.5"
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.65)", background: "transparent", border: "none", cursor: "pointer", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(62,60,73,.06)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {symptomsOpen && symptomsPos && (
                <div style={{ position: "fixed", top: symptomsPos.bottom + 4, left: symptomsPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(62,60,73,.5)", minWidth: 180 }}>
                  {["Cracked walls", "Uneven floors", "Wet basement", "Musty smell", "Sticking doors", "Sagging floor joists"].map((s) => (
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
                Showing <strong style={{ color: "rgba(62,60,73,.7)" }}>{filtered.length}</strong> reviews
                {activeFilter !== "All" && (
                  <span> ·{" "}
                    <button onClick={() => handleFilterChange("All")}
                      style={{ color: B, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>
                      Clear filter
                    </button>
                  </span>
                )}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {pageReviews.map((r, i) => (
                <ReviewCard key={`${r.name}-${i}`} r={r} i={i} onClick={() => go(`review/${reviewSlug(r)}`)} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30"
                  style={{ border: `1.5px solid ${ON_LIGHT.border}`, color: CHAR, background: "none", cursor: page === 1 ? "not-allowed" : "pointer" }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                    className="w-10 h-10 flex items-center justify-center transition-colors"
                    style={{
                      fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14,
                      background: page === p ? B : "transparent",
                      color: page === p ? DARK : "rgba(62,60,73,.5)",
                      border: `1.5px solid ${page === p ? B : "rgba(62,60,73,.15)"}`,
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 148, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30"
                  style={{ border: `1.5px solid ${ON_LIGHT.border}`, color: CHAR, background: "none", cursor: page === totalPages ? "not-allowed" : "pointer" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ background: SURFACE.base, borderTop: "1px solid rgba(62,60,73,.06)" }} className="py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div className="max-w-[640px]">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: 28, height: 2, background: B }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Ready to start?</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
                Join 400+ satisfied homeowners
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.4)", lineHeight: 1.7, marginBottom: 32 }}>
                Free inspection. No obligation. Same-week availability across TN, AR, MS & MO.
              </p>
              <button
                onClick={openInspection}
                className="inline-flex items-center gap-3 px-8 py-4 hover:opacity-90 transition-opacity"
                style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: 0.5, cursor: "pointer", border: "none" }}
              >
                Schedule Free Inspection
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <Footer onBack={onBack} />
      </div>

    </>
  );
}
