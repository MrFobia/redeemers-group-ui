import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";

// ─── Gallery data ─────────────────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200", label: "Crawl Space Encapsulation", loc: "Memphis, TN", category: "Crawl Space", year: "2025" },
  { src: "https://images.unsplash.com/photo-1766497278321-dff63e463f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "Floor Joist Repair", loc: "Jonesboro, AR", category: "Crawl Space", year: "2025" },
  { src: "https://images.unsplash.com/photo-1708214148950-ccbb69d40e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "SmartJack Installation", loc: "Little Rock, AR", category: "Foundation", year: "2024" },
  { src: "https://images.unsplash.com/photo-1760776024932-38040caef5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "Vapor Barrier System", loc: "Nashville, TN", category: "Waterproofing", year: "2025" },
  { src: "https://images.unsplash.com/photo-1646184466560-f81b1e495604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "Interior Drainage System", loc: "Jackson, MS", category: "Waterproofing", year: "2024" },
  { src: "https://images.unsplash.com/photo-1720631618132-83cdab1b237e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "Mold Remediation", loc: "Collierville, TN", category: "Mold", year: "2025" },
  { src: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "Push Pier Foundation Repair", loc: "Springfield, MO", category: "Foundation", year: "2024" },
  { src: "https://images.unsplash.com/photo-1766497278321-dff63e463f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900", label: "Concrete Leveling", loc: "Bartlett, TN", category: "Concrete", year: "2025" },
];

const CATEGORIES = ["All", "Crawl Space", "Foundation", "Waterproofing", "Concrete", "Mold"];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }: {
  items: typeof GALLERY_ITEMS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1100px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <ImageWithFallback src={item.src} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 50%)" }} />

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
            <div>
              <span style={{
                display: "inline-block", marginBottom: 8,
                fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
                color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
                background: B, padding: "4px 10px",
              }}>{item.category}</span>
              <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
                {item.label}
              </h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.55)", marginTop: 4 }}>
                {item.loc} · {item.year}
              </p>
            </div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,.3)" }}>
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Prev / Next */}
        <button onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}>
          <ChevronLeft size={20} color="#fff" />
        </button>
        <button onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}>
          <ChevronRight size={20} color="#fff" />
        </button>

        {/* Close */}
        <button onClick={onClose}
          className="absolute -top-12 right-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}>
          <X size={16} color="#fff" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ item, index, onClick, featured = false }: {
  item: typeof GALLERY_ITEMS[0];
  index: number;
  onClick: () => void;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: featured ? 32 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden cursor-pointer group"
      style={{ height: featured ? "100%" : "100%" }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Image with subtle parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-[-4%]"
          animate={{ x: `${(mouse.x - 50) * -0.04}%`, y: `${(mouse.y - 50) * -0.04}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 30, mass: 0.5 }}
        >
          <ImageWithFallback
            src={item.src}
            alt={item.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.2) 0%, transparent 35%, rgba(0,0,0,.65) 100%)" }} />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ background: "rgba(26,82,168,.18)" }}
      />

      {/* Top: index + category */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span style={{
          fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 11,
          color: "rgba(255,255,255,.4)", letterSpacing: 2,
        }}>{String(index + 1).padStart(2, "0")}</span>
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          whileHover={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
            color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
            background: B, padding: "3px 9px",
          }}
        >{item.category}</motion.span>
      </div>

      {/* Bottom: label + CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          animate={{ y: 8, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 mb-2"
        >
          <ZoomIn size={13} color={SAND} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: SAND, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>View project</span>
        </motion.div>

        <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: featured ? 22 : 15, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>
          {item.label}
        </h4>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.5)" }}>
          {item.loc} · {item.year}
        </p>
      </div>

      {/* Corner accent on hover */}
      <motion.div
        className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center"
        animate={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{ background: B }}
      >
        <ArrowUpRight size={16} color="#fff" />
      </motion.div>
    </motion.div>
  );
}

// ─── ProjectGallery (shared component) ───────────────────────────────────────
export function ProjectGallery({ id = "gallery", darkBg = true }: { id?: string; darkBg?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const filtered = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === activeCategory);

  const bg = darkBg ? DARK : DARK;

  return (
    <section id={id} style={{ background: bg }} className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Project Gallery</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px" }}>
              Work that speaks<br />for itself
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {[["127+", "Projects"], ["4", "States"], ["12 yrs", "Experience"]].map(([n, l]) => (
              <div key={l} className="text-center lg:text-right">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 28, color: SAND, lineHeight: 1, letterSpacing: "-1px" }}>{n}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filter chips */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 transition-all"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                background: activeCategory === cat ? SAND : "transparent",
                color: activeCategory === cat ? DARK : "rgba(255,255,255,.45)",
                border: `1.5px solid ${activeCategory === cat ? SAND : "rgba(255,255,255,.14)"}`,
                borderRadius: 4, cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length > 0 && (
              <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "280px" }}>
                {/* Featured card — first item, spans 2 cols + 2 rows */}
                <div className="col-span-2 row-span-2">
                  <GalleryCard item={filtered[0]} index={0} featured onClick={() => setLightboxIdx(0)} />
                </div>

                {/* Side cards */}
                {filtered.slice(1, 3).map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 1} onClick={() => setLightboxIdx(i + 1)} />
                  </div>
                ))}

                {/* Bottom row — remaining cards */}
                {filtered.slice(3, 6).map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 3} onClick={() => setLightboxIdx(i + 3)} />
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.3)" }}>No projects in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom: view all CTA */}
        <motion.div
          className="flex items-center justify-between mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.3)" }}>
            Showing {Math.min(filtered.length, 6)} of {filtered.length} projects
          </p>
          <button className="group inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
            View all projects
            <ArrowUpRight size={14} color={SAND} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}
            onNext={() => setLightboxIdx(i => i !== null ? (i + 1) % filtered.length : null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
