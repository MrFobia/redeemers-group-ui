import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Play, ArrowRight } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Logo } from "./components/Logo";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_FILTERS = ["All", "Crawl Space", "Foundation", "Waterproofing", "Concrete", "Commercial"];

const STORIES = [
  { name: "Jennifer M.", service: "Crawl Space", loc: "Memphis, TN", date: "March 2026", duration: "2 days", result: "SmartJack system + full encapsulation. Floors leveled and moisture eliminated.", quote: "I could feel the difference the first morning I walked in. No more bounce, no more smell. Redeemers was worth every penny.", img: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Robert T.", service: "Foundation", loc: "Jonesboro, AR", date: "February 2026", duration: "1 day", result: "6 push piers driven to bedrock. Foundation stabilized with lifetime warranty.", quote: "I had three different companies tell me three different things. Redeemers explained it clearly, showed me the evidence, and fixed it the right way.", img: "https://images.unsplash.com/photo-1708214148950-ccbb69d40e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Sandra M.", service: "Waterproofing", loc: "Nashville, TN", date: "January 2026", duration: "3 days", result: "Interior drainage system, dual sump pump, and WaterGuard wall panels installed.", quote: "After two flooded basements in two years, I finally have a dry space. The team was professional and cleaned up everything when done.", img: "https://images.unsplash.com/photo-1760776024932-38040caef5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Patricia L.", service: "Concrete", loc: "Little Rock, AR", date: "December 2025", duration: "4 hours", result: "Foam-leveled driveway and walkway. 3-inch void filled, surface restored.", quote: "My driveway had been sinking for five years. They fixed it in half a day for less than I expected. Looks completely new.", img: "https://images.unsplash.com/photo-1646184466560-f81b1e495604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Marcus & Angela B.", service: "Crawl Space", loc: "Southaven, MS", date: "November 2025", duration: "2 days", result: "Vapor barrier, drainage matting, dehumidifier, and foam-sealed rim joists.", quote: "Our energy bills dropped 18% the first month. The musty smell is completely gone. Highly recommend for any Mississippi homeowner.", img: "https://images.unsplash.com/photo-1720631618132-83cdab1b237e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "David K.", service: "Foundation", loc: "Springfield, MO", date: "October 2025", duration: "1 day", result: "Helical piers installed through expansive clay soil. Foundation lifted 1.5 inches.", quote: "The crack in my living room wall had been growing for two years. Redeemers diagnosed the cause correctly and fixed it permanently.", img: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Linda H.", service: "Waterproofing", loc: "Germantown, TN", date: "September 2025", duration: "2 days", result: "Exterior waterproofing membrane applied. French drain installed. Grading corrected.", quote: "The crew was on time every day, kept me informed of every step, and the basement has been dry through two major storms.", img: "https://images.unsplash.com/photo-1760776024932-38040caef5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Thomas R.", service: "Concrete", loc: "Bartlett, TN", date: "August 2025", duration: "6 hours", result: "Pool deck lifted with polyurethane foam. All four sunken sections now level.", quote: "The pool deck was a liability. Redeemers fixed it in one morning and it looks better than it did when it was new.", img: "https://images.unsplash.com/photo-1708214148950-ccbb69d40e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Melissa & Russell C.", service: "Crawl Space", loc: "Marked Tree, AR", date: "July 2025", duration: "3 days", result: "Floor joists sistered, SmartJacks installed, crawl space fully encapsulated.", quote: "Walking in now, it's straight. I used to slip from side to another side. I went into my bedroom — the closet door closed for the first time ever.", img: "https://images.unsplash.com/photo-1760776024932-38040caef5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Carol & James W.", service: "Foundation", loc: "Cape Girardeau, MO", date: "June 2025", duration: "1 day", result: "Wall anchor system stabilized bowing basement wall. No excavation required.", quote: "We were terrified about the cost. The free inspection made everything clear and the price was fair. Should have called sooner.", img: "https://images.unsplash.com/photo-1646184466560-f81b1e495604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Anthony J.", service: "Commercial", loc: "Memphis, TN", date: "May 2025", duration: "4 days", result: "16 push piers installed under commercial warehouse. Production resumed same week.", quote: "We couldn't afford downtime. Redeemers worked around our schedule and kept the warehouse operational during the entire repair.", img: "https://images.unsplash.com/photo-1720631618132-83cdab1b237e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
  { name: "Diana P.", service: "Waterproofing", loc: "Jackson, MS", date: "April 2025", duration: "2 days", result: "Crawl space waterproofed, drainage corrected, and air quality system installed.", quote: "The inspector found water intrusion I didn't even know I had. Fixed it before it became a major problem. Grateful for the thoroughness.", img: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900" },
];

const PER_PAGE = 9;

// ─── Story Modal ──────────────────────────────────────────────────────────────
type Story = typeof STORIES[0];

function StoryModal({ story, onClose, onPrev, onNext }: {
  story: Story;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [story, onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,.88)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[960px] flex flex-col lg:flex-row overflow-hidden"
        style={{ background: CHAR, height: "min(85vh, 580px)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left — video */}
        <div className="lg:w-[52%] shrink-0 relative">
          <ImageWithFallback src={story.img} alt={story.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: playing ? "rgba(0,0,0,.85)" : "linear-gradient(to bottom, rgba(0,0,0,.1) 0%, rgba(0,0,0,.6) 100%)"
          }} />

          {playing ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)" }}>Video playing…</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={() => setPlaying(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{ width: 72, height: 72, borderRadius: "50%", background: B, border: "3px solid rgba(255,255,255,.25)", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Play size={26} fill="white" stroke="none" style={{ marginLeft: 4 }} />
              </motion.button>
            </div>
          )}

          {/* Bottom: tags + nav */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <div className="flex gap-2">
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 2.5, textTransform: "uppercase", background: B, padding: "3px 8px" }}>{story.service}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.65)", background: "rgba(0,0,0,.45)", padding: "3px 8px", backdropFilter: "blur(4px)" }}>{story.loc}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={onPrev} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors" style={{ background: "rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}>
                <ChevronLeft size={15} color="#fff" />
              </button>
              <button onClick={onNext} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors" style={{ background: "rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}>
                <ChevronRight size={15} color="#fff" />
              </button>
            </div>
          </div>
        </div>

        {/* Right — story content */}
        <div className="flex-1 flex flex-col overflow-y-auto rg-scroll-thin" style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}>
          {/* Close */}
          <div className="flex justify-end px-7 pt-6 pb-3 shrink-0">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
              <X size={14} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          <div className="flex flex-col flex-1 px-7 pb-7">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{story.date}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "inline-block" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{story.duration}</span>
            </div>

            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 6 }}>
              {story.name}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND, marginBottom: 20 }}>{story.loc}</p>

            {/* Result */}
            <div className="mb-5 p-4" style={{ background: "rgba(26,82,168,.12)", border: "1px solid rgba(26,82,168,.25)" }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>What we did</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>{story.result}</p>
            </div>

            {/* Quote */}
            <div style={{ fontFamily: "Georgia,serif", fontSize: 44, color: "rgba(196,171,108,.2)", lineHeight: 0.55, marginBottom: 10 }}>&ldquo;</div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.72)", lineHeight: 1.8, flex: 1 }}>{story.quote}</p>

            <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "20px 0" }} />

            <button onClick={() => { onClose(); openInspection(); }}
              className="inline-flex items-center gap-2 px-6 py-3 hover:opacity-90 transition-opacity w-full justify-center"
              style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
              Get Your Free Inspection <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
        border: `1px solid ${hovered ? "rgba(26,82,168,.3)" : "rgba(10,11,20,.07)"}`,
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
        <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "rgba(10,11,20,.35)", opacity: hovered ? 0.7 : 0.35 }} />

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
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, color: B, background: "rgba(26,82,168,.1)", border: "1px solid rgba(26,82,168,.2)", padding: "2px 8px" }}>
            {story.service}
          </span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 11, color: "rgba(10,11,20,.4)", background: "rgba(10,11,20,.05)", border: `1px solid ${ON_LIGHT.border}`, padding: "2px 8px" }}>
            {story.loc}
          </span>
        </div>

        {/* Name + meta */}
        <div>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR, lineHeight: 1.3, marginBottom: 4 }}>{story.name}</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.3)" }}>{story.duration} · {story.date}</p>
        </div>

        {/* Result preview */}
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.4)", lineHeight: 1.6 }}>
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [areaOpen, setAreaOpen] = useState(false);
  const [symptomsOpen, setSymptomsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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
      {/* Fixed header — includes filter bar so it's flush, no gap */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={nav} active="" />
        {/* Filter bar — overflow-x-auto only on the pills row; dropdowns rendered via fixed portal below */}
        <div style={{ background: SURFACE.base, borderBottom: "1px solid rgba(10,11,20,.07)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-3">
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(10,11,20,.4)", flexShrink: 0 }}>Filter by:</span>
            <div className="flex items-center gap-3 overflow-x-auto" style={{ flex: 1 }}>
              {SERVICE_FILTERS.map((f) => (
                <button key={f} onClick={() => handleFilter(f)} className="flex-shrink-0 px-4 py-1.5 transition-all"
                  style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                    background: activeFilter === f ? B : "transparent",
                    color: activeFilter === f ? DARK : "rgba(10,11,20,.55)",
                    border: `1.5px solid ${activeFilter === f ? B : "rgba(10,11,20,.15)"}`,
                    borderRadius: 4, cursor: "pointer",
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(10,11,20,.1)", flexShrink: 0, margin: "0 4px" }} />
            {/* Service area — fixed-positioned dropdown escapes overflow clipping */}
            <div className="flex-shrink-0" ref={areaRef}>
              <button onClick={() => { setAreaPos(areaRef.current?.getBoundingClientRect() ?? null); setAreaOpen(v => !v); setSymptomsOpen(false); }}
                className="flex items-center gap-1.5 px-4 py-1.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(10,11,20,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                Service area <ChevronDown size={13} />
              </button>
            </div>
            <div className="flex-shrink-0" ref={symptomsRef}>
              <button onClick={() => { setSymptomsPos(symptomsRef.current?.getBoundingClientRect() ?? null); setSymptomsOpen(v => !v); setAreaOpen(false); }}
                className="flex items-center gap-1.5 px-4 py-1.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(10,11,20,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                All Symptoms <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown portals — fixed so they escape overflow clipping */}
        {areaOpen && areaPos && (
          <div style={{ position: "fixed", top: areaPos.bottom + 4, left: areaPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(0,0,0,.5)", minWidth: 160 }}>
            {["Tennessee", "Arkansas", "Mississippi", "Missouri"].map((s) => (
              <button key={s} onClick={() => setAreaOpen(false)} className="w-full text-left px-4 py-2.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.65)", background: "transparent", border: "none", cursor: "pointer", display: "block" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(10,11,20,.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                {s}
              </button>
            ))}
          </div>
        )}
        {symptomsOpen && symptomsPos && (
          <div style={{ position: "fixed", top: symptomsPos.bottom + 4, left: symptomsPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(0,0,0,.5)", minWidth: 190 }}>
            {["Cracked walls", "Uneven floors", "Wet basement", "Musty smell", "Sticking doors", "Sagging joists"].map((s) => (
              <button key={s} onClick={() => setSymptomsOpen(false)} className="w-full text-left px-4 py-2.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.65)", background: "transparent", border: "none", cursor: "pointer", display: "block" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(10,11,20,.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Header height varies by breakpoint (announcement bar hides < md) */}
      <div className="w-full min-h-screen pt-[164px] md:pt-[198px] lg:pt-[214px] xl:pt-[230px]" style={{ background: SURFACE.base }}>

        {/* ── Breadcrumb ── */}
        <div style={{ background: SURFACE.base, borderBottom: "1px solid rgba(10,11,20,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={() => nav("home")} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.35)", background: "none", border: "none", cursor: "pointer", padding: 0 }} className="hover:text-white/60 transition-colors">Home</button>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="rgba(10,11,20,.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <button onClick={() => nav("resources")} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.35)", background: "none", border: "none", cursor: "pointer", padding: 0 }} className="hover:text-white/60 transition-colors">Resources</button>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="rgba(10,11,20,.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.55)" }}>Job Stories</span>
          </div>
        </div>

        {/* ── Hero ── */}
        <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(10,11,20,.06)" }} className="py-16 lg:py-24">
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
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,1.2vw,17px)", color: "rgba(10,11,20,.45)", lineHeight: 1.7, maxWidth: 500 }}>
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
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.3)" }}>{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">

            <div className="flex items-center justify-between mb-10">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.3)" }}>
                Showing <strong style={{ color: "rgba(10,11,20,.7)" }}>{filtered.length}</strong> stories
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
                    onClick={() => setSelectedIdx((page - 1) * PER_PAGE + i)}
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
                      color: page === p ? DARK : "rgba(10,11,20,.5)",
                      border: `1.5px solid ${page === p ? B : "rgba(10,11,20,.15)"}`,
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
        <section style={{ background: SURFACE.base, borderTop: "1px solid rgba(10,11,20,.06)" }} className="py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div className="max-w-[600px]">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: 28, height: 2, background: B }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Your story starts here</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,4vw,50px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
                Ready to become our next success story?
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.4)", lineHeight: 1.7, marginBottom: 32 }}>
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

      {/* ── Story Modal ── */}
      <AnimatePresence>
        {selectedIdx !== null && (() => {
          const story = filtered[selectedIdx];
          if (!story) return null;
          return (
            <StoryModal
              story={story}
              onClose={() => setSelectedIdx(null)}
              onPrev={() => setSelectedIdx(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}
              onNext={() => setSelectedIdx(i => i !== null ? (i + 1) % filtered.length : null)}
            />
          );
        })()}
      </AnimatePresence>
    </>
  );
}
