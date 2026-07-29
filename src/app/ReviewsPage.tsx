import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight, Star, X, Play } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Logo } from "./components/Logo";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import imgRevThumb1 from "../assets/rev-thumb1.jpg";
import imgRevThumb2 from "../assets/rev-thumb2.jpg";
import imgRevThumb3 from "../assets/rev-thumb3.jpg";
import imgRevAvatar from "../assets/rev-avatar.png";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_FILTERS = ["All", "Crawl Space", "Basement", "Foundation", "Concrete", "Commercial"];

const ALL_REVIEWS = [
  { name: "Victoria E.", loc: "Memphis, TN", stars: 5, service: "Crawl Space", quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.", img: imgRevThumb1, avatar: imgRevAvatar, date: "March 2026" },
  { name: "Elizabeth N.", loc: "Collierville, TN", stars: 5, service: "Foundation", quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!", img: imgRevThumb2, avatar: imgRevAvatar, date: "February 2026" },
  { name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5, service: "Concrete", quote: "Walking in now, it's straight. I used to slip from side to side. My bedroom closet door never closed before — I just closed it for the first time. Great job.", img: imgRevThumb3, avatar: imgRevAvatar, date: "January 2026" },
  { name: "David K.", loc: "Nashville, TN", stars: 5, service: "Basement", quote: "Had major water intrusion in my basement for years. Redeemers installed an interior drainage system and sump pump — completely dry ever since. Very professional team from start to finish.", img: imgRevThumb1, avatar: imgRevAvatar, date: "December 2025" },
  { name: "Sandra M.", loc: "Jackson, MS", stars: 5, service: "Crawl Space", quote: "They encapsulated our crawl space and installed SmartJacks. The floors stopped sagging within weeks. Team was clean, respectful, and explained every step of the process.", img: imgRevThumb2, avatar: imgRevAvatar, date: "November 2025" },
  { name: "Robert T.", loc: "Jonesboro, AR", stars: 5, service: "Foundation", quote: "Three push piers later and my foundation is level again. The lifetime warranty gave me peace of mind. Redeemers was the third company I got a quote from — I'm glad I waited for them.", img: imgRevThumb3, avatar: imgRevAvatar, date: "October 2025" },
  { name: "Patricia L.", loc: "Little Rock, AR", stars: 5, service: "Concrete", quote: "Driveway had a major trip hazard that had been there for years. Redeemers lifted it in a few hours with foam injection. Looked brand new. Incredibly fast and clean process.", img: imgRevThumb1, avatar: imgRevAvatar, date: "September 2025" },
  { name: "James W.", loc: "Germantown, TN", stars: 5, service: "Basement", quote: "Interior waterproofing system handled our wet basement perfectly. We had gotten quotes from two other companies — Redeemers was the only one who actually showed us what the water path was.", img: imgRevThumb2, avatar: imgRevAvatar, date: "August 2025" },
  { name: "Angela B.", loc: "Southaven, MS", stars: 5, service: "Crawl Space", quote: "Full crawl space encapsulation plus dehumidifier. The musty smell is completely gone. Energy bills dropped noticeably in the first month. Highly recommend for anyone in Mississippi.", img: imgRevThumb3, avatar: imgRevAvatar, date: "July 2025" },
  { name: "Michael C.", loc: "Springfield, MO", stars: 5, service: "Foundation", quote: "After the heavy rains last spring I noticed significant cracking. Redeemers came out for a free inspection and had a plan ready the same week. Installation crew was excellent.", img: imgRevThumb1, avatar: imgRevAvatar, date: "June 2025" },
  { name: "Linda H.", loc: "Bartlett, TN", stars: 5, service: "Concrete", quote: "Pool deck was severely sunken and cracked. I was expecting to replace the whole thing but Redeemers leveled it with foam lifting for a fraction of the cost. Couldn't be happier.", img: imgRevThumb2, avatar: imgRevAvatar, date: "May 2025" },
  { name: "Thomas R.", loc: "Cape Girardeau, MO", stars: 5, service: "Basement", quote: "Redeemers installed a WaterGuard system in our 1960s basement. Waterproof wall panels, drainage tiles, and a TripleSafe sump. No water issues after two full rainy seasons.", img: imgRevThumb3, avatar: imgRevAvatar, date: "April 2025" },
];

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
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(26,82,168,.35)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(10,11,20,.07)")}
    >
      {/* Thumb */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "52%" }}>
        <ImageWithFallback src={r.img} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.45)" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ background: B }}>
            <Play size={16} fill="white" stroke="none" />
          </div>
        </div>
        <span style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
          color: CHAR, letterSpacing: 2, textTransform: "uppercase",
          background: "rgba(26,82,168,.85)", padding: "3px 8px",
        }}>{r.service}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: r.stars }).map((_, si) => (
            <Star key={si} size={13} fill={SAND} stroke="none" />
          ))}
        </div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 40, color: "rgba(26,82,168,.25)", lineHeight: 0.6, marginBottom: 10 }}>&ldquo;</div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.6)", lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
          {r.quote}
        </p>
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(10,11,20,.07)" }}>
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "rgba(10,11,20,.1)" }}>
            <ImageWithFallback src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>{r.name}</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.35)" }}>{r.loc}</p>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.2)" }}>{r.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Review Modal ─────────────────────────────────────────────────────────────
type Review = typeof ALL_REVIEWS[0];

function ReviewModal({ review, onClose, onPrev, onNext }: {
  review: Review;
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
  }, [review, onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
      style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[960px] flex flex-col lg:flex-row overflow-hidden"
        style={{ background: CHAR, height: "min(82vh, 560px)" }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Left: video fills full height ── */}
        <div className="lg:w-[52%] shrink-0 relative">
          {/* Image fills entire left column */}
          <ImageWithFallback
            src={review.img}
            alt={review.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay — bottom-heavy for text readability */}
          <div className="absolute inset-0" style={{
            background: playing
              ? "rgba(0,0,0,.85)"
              : "linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.1) 40%, rgba(0,0,0,.7) 100%)"
          }} />

          {playing ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)" }}>Video playing…</p>
            </div>
          ) : (
            /* Play button centered */
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={() => setPlaying(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center justify-center"
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: B, border: "3px solid rgba(255,255,255,.25)",
                  cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,.5)"
                }}
              >
                <Play size={26} fill="white" stroke="none" style={{ marginLeft: 4 }} />
              </motion.button>
            </div>
          )}

          {/* Bottom bar: service tag + prev/next */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <span style={{
              fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
              color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
              background: "rgba(26,82,168,.85)", padding: "4px 10px",
              backdropFilter: "blur(4px)",
            }}>{review.service}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                className="w-9 h-9 flex items-center justify-center transition-colors hover:bg-white/20"
                style={{ background: "rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer", backdropFilter: "blur(4px)" }}
              >
                <ChevronLeft size={16} color="#fff" />
              </button>
              <button
                onClick={onNext}
                className="w-9 h-9 flex items-center justify-center transition-colors hover:bg-white/20"
                style={{ background: "rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer", backdropFilter: "blur(4px)" }}
              >
                <ChevronRight size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: review content ── */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}>

          {/* Header row: close button */}
          <div className="flex items-center justify-end px-8 pt-7 pb-4 shrink-0">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}
            >
              <X size={14} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          {/* Content body */}
          <div className="flex flex-col flex-1 px-8 pb-8">
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: review.stars }).map((_, si) => (
                <Star key={si} size={15} fill={SAND} stroke="none" />
              ))}
            </div>

            {/* Quote mark + text */}
            <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(196,171,108,.2)", lineHeight: 0.55, marginBottom: 14 }}>&ldquo;</div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.78)", lineHeight: 1.8, flex: 1 }}>
              {review.quote}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "24px 0" }} />

            {/* Avatar row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0" style={{ background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.12)" }}>
                <ImageWithFallback src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.3 }}>{review.name}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 2 }}>
                  {review.loc}&nbsp;&nbsp;·&nbsp;&nbsp;{review.date}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => { onClose(); openInspection(); }}
              className="inline-flex items-center gap-2 px-6 py-3 hover:opacity-90 transition-opacity w-full justify-center"
              style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}
            >
              Get Your Free Inspection <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [serviceAreaOpen, setServiceAreaOpen] = useState(false);
  const [symptomsOpen, setSymptomsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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
      {/* Fixed header + filter bar flush */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={nav} active="" />
        <div style={{ background: SURFACE.base, borderBottom: "1px solid rgba(10,11,20,.07)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-3">
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(10,11,20,.4)", flexShrink: 0 }}>Filter by:</span>
            <div className="flex items-center gap-3 overflow-x-auto" style={{ flex: 1 }}>
              {SERVICE_FILTERS.map((f) => (
                <button key={f} onClick={() => handleFilterChange(f)} className="flex-shrink-0 px-4 py-1.5 transition-colors"
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
            <div className="flex-shrink-0" ref={areaRef}>
              <button onClick={() => { setAreaPos(areaRef.current?.getBoundingClientRect() ?? null); setServiceAreaOpen(v => !v); setSymptomsOpen(false); }}
                className="flex items-center gap-1.5 px-4 py-1.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(10,11,20,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                Service area <ChevronDown size={13} />
              </button>
            </div>
            <div className="flex-shrink-0" ref={symptomsRef}>
              <button onClick={() => { setSymptomsPos(symptomsRef.current?.getBoundingClientRect() ?? null); setSymptomsOpen(v => !v); setServiceAreaOpen(false); }}
                className="flex items-center gap-1.5 px-4 py-1.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(10,11,20,.55)", border: `1.5px solid ${ON_LIGHT.border}`, borderRadius: 4, cursor: "pointer", background: "transparent" }}>
                All Symptoms <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Fixed-positioned dropdowns — escape overflow clipping */}
        {serviceAreaOpen && areaPos && (
          <div style={{ position: "fixed", top: areaPos.bottom + 4, left: areaPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(0,0,0,.5)", minWidth: 160 }}>
            {["Tennessee", "Arkansas", "Mississippi", "Missouri"].map((s) => (
              <button key={s} onClick={() => setServiceAreaOpen(false)} className="w-full text-left px-4 py-2.5"
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.65)", background: "transparent", border: "none", cursor: "pointer", display: "block" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(10,11,20,.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                {s}
              </button>
            ))}
          </div>
        )}
        {symptomsOpen && symptomsPos && (
          <div style={{ position: "fixed", top: symptomsPos.bottom + 4, left: symptomsPos.left, zIndex: 200, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 8px 32px rgba(0,0,0,.5)", minWidth: 180 }}>
            {["Cracked walls", "Uneven floors", "Wet basement", "Musty smell", "Sticking doors", "Sagging floor joists"].map((s) => (
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
            <button
              onClick={() => nav("home")}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.35)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              className="hover:text-white/60 transition-colors"
            >
              Home
            </button>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="rgba(10,11,20,.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.55)" }}>All Reviews</span>
          </div>
        </div>

        {/* ── Hero ── */}
        <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(10,11,20,.06)" }} className="py-20 lg:py-24">
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
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,1.2vw,17px)", color: "rgba(10,11,20,.45)", lineHeight: 1.7, marginBottom: 14, maxWidth: 560 }}>
                Real results from homeowners across Tennessee, Arkansas, Mississippi, and Missouri. Every review is verified and unedited.
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.25)" }}>
                {ALL_REVIEWS.length} verified reviews &nbsp;·&nbsp; Last updated: June 2026
              </p>
            </div>
          </div>
        </section>

        {/* ── Review grid ── */}
        <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">

            <div className="flex items-center justify-between mb-10">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.3)" }}>
                Showing <strong style={{ color: "rgba(10,11,20,.7)" }}>{filtered.length}</strong> reviews
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
              {pageReviews.map((r, i) => {
                const globalIdx = (page - 1) * PER_PAGE + i;
                return (
                  <ReviewCard key={`${r.name}-${i}`} r={r} i={i} onClick={() => setSelectedIdx(globalIdx)} />
                );
              })}
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
                      color: page === p ? DARK : "rgba(10,11,20,.5)",
                      border: `1.5px solid ${page === p ? B : "rgba(10,11,20,.15)"}`,
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
        <section style={{ background: SURFACE.base, borderTop: "1px solid rgba(10,11,20,.06)" }} className="py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <div className="max-w-[640px]">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: 28, height: 2, background: B }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Ready to start?</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
                Join 400+ satisfied homeowners
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.4)", lineHeight: 1.7, marginBottom: 32 }}>
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

      {/* ── Review Modal ── */}
      <AnimatePresence>
        {selectedIdx !== null && (() => {
          const allFiltered = activeFilter === "All" ? ALL_REVIEWS : ALL_REVIEWS.filter(r => r.service === activeFilter);
          const review = allFiltered[selectedIdx];
          if (!review) return null;
          return (
            <ReviewModal
              review={review}
              onClose={() => setSelectedIdx(null)}
              onPrev={() => setSelectedIdx(i => i !== null ? (i - 1 + allFiltered.length) % allFiltered.length : null)}
              onNext={() => setSelectedIdx(i => i !== null ? (i + 1) % allFiltered.length : null)}
            />
          );
        })()}
      </AnimatePresence>
    </>
  );
}
