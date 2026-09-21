import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowUpRight, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { openInspection } from "./InspectionModal";
import { GALLERY_ITEMS, projectSlug, type GalleryItem } from "../data/projects";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, SURFACE } from "../theme";

// Gallery records live in data/projects.ts so the grid here and the project
// detail page (project/<slug>) read the same list.

const CATEGORIES = ["All", "Crawl Space", "Foundation", "Waterproofing", "Concrete", "Mold"];

// The old ProjectModal was removed: a project now opens at project/<slug>
// (WorkInnerPage) so it can be linked, shared and indexed.

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ item, index, onClick, featured = false }: {
  item: GalleryItem;
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(62,60,73,.2) 0%, transparent 35%, rgba(62,60,73,.65) 100%)" }} />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ background: "rgba(0,80,159,.18)" }}
      />

      {/* Top: index + category */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
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
// `limit` caps how many cards render before the special 6-slot masonry
// layout (featured + side + bottom row) runs out of slots — pass none (or
// Infinity) for the standalone "all projects" page, where every match should
// show instead of teasing 6 and dead-ending.
export function ProjectGallery({ id = "gallery", darkBg = true, limit = 6, onNavigate }: { id?: string; darkBg?: boolean; limit?: number; onNavigate?: (p: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const filtered = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === activeCategory);
  const visible = filtered.slice(0, limit);
  // The featured masonry layout below only has 6 hardcoded slots, so
  // "overflow" is whatever's left after those 6 — not after `limit`. On the
  // teaser (limit=6) that's the same set filtered() already trimmed to nothing
  // extra; on the full page (limit=Infinity) this is what makes items 7+
  // actually render instead of silently vanishing.
  const overflow = visible.slice(6);

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
                background: activeCategory === cat ? B : "transparent",
                color: activeCategory === cat ? "#fff" : "rgba(255,255,255,.45)",
                border: `1.5px solid ${activeCategory === cat ? B : "rgba(255,255,255,.14)"}`,
                cursor: "pointer",
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
            {visible.length > 0 && (
              <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "280px" }}>
                {/* Featured card — first item, spans 2 cols + 2 rows */}
                <div className="col-span-2 row-span-2">
                  <GalleryCard item={visible[0]} index={0} featured onClick={() => onNavigate?.(`project/${projectSlug(visible[0])}`)} />
                </div>

                {/* Side cards */}
                {visible.slice(1, 3).map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 1} onClick={() => onNavigate?.(`project/${projectSlug(item)}`)} />
                  </div>
                ))}

                {/* Bottom row — remaining cards */}
                {visible.slice(3, 6).map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 3} onClick={() => onNavigate?.(`project/${projectSlug(item)}`)} />
                  </div>
                ))}
              </div>
            )}

            {/* Everything past the featured 6-slot layout — plain uniform
                grid, only reached from the standalone "all projects" page
                (limit={Infinity}). */}
            {overflow.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3" style={{ gridAutoRows: "280px" }}>
                {overflow.map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 6} onClick={() => onNavigate?.(`project/${projectSlug(item)}`)} />
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

        {/* Bottom: view all CTA — only on the teaser (limited) view. The
            standalone all-projects page IS this state, so it has nothing
            to link onward to. Previously this button had no onClick at
            all and used a different link style than the rest of the site. */}
        {Number.isFinite(limit) && (
          <div
            className="flex items-center justify-between mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
          >
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.3)" }}>
              Showing {visible.length} of {filtered.length} projects
            </p>
            <button onClick={() => onNavigate?.("project-gallery")} className="group inline-flex items-center gap-1.5"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              View all projects
              <ChevronRight size={14} color={SAND} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
