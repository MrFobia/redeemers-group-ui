import { useState, useEffect } from "react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight, ArrowRight, MapPin, Quote } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { KIND_META, type ContentItem } from "../data/localContent";

import { B, DARK, CHAR, SAND, SURFACE } from "../theme";

/**
 * One modal for every kind of local content.
 * Reviews and job stories keep the side-by-side job-story layout; case studies
 * and gallery entries use the stacked panoramic layout from Project Gallery.
 */
export function LocalContentModal({ item, onClose }: { item: ContentItem; onClose: () => void }) {
  const stacked = item.kind === "case-study" || item.kind === "project-gallery";
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: item.images.length > 1 });
  const [cur, setCur] = useState(0);
  const meta = KIND_META[item.kind];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const Gallery = (
    <div className="relative overflow-hidden h-full" ref={emblaRef} style={{ background: DARK }}>
      <div className="flex h-full">
        {item.images.map((slide, i) => (
          <div key={i} className="relative shrink-0 w-full h-full" style={stacked ? { aspectRatio: "21/9" } : undefined}>
            <ImageWithFallback src={slide.src} alt={slide.caption} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(0deg, rgba(62,60,73,.9) 0%, rgba(62,60,73,0) 100%)" }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,.85)" }}>{slide.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {item.images.length > 1 && (
        <>
          <button onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(62,60,73,.6)", border: "none", cursor: "pointer" }}>
            <ChevronLeft size={15} color="#fff" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(62,60,73,.6)", border: "none", cursor: "pointer" }}>
            <ChevronRight size={15} color="#fff" />
          </button>
          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {item.images.map((_, i) => (
              <button key={i} onClick={() => emblaApi?.scrollTo(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: cur === i ? 16 : 6, height: 6, background: cur === i ? SAND : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", padding: 0 }} />
            ))}
          </div>
        </>
      )}

      {/* Kind badge */}
      <div className="absolute top-4 left-4 px-2.5 py-1" style={{ background: meta.accent }}>
        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: DARK, letterSpacing: 2, textTransform: "uppercase" }}>
          {meta.label}
        </span>
      </div>
    </div>
  );

  const Body = (
    <div className="flex flex-col flex-1 px-7 pb-7 pt-6 overflow-y-auto rg-scroll-thin">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={12} color="rgba(255,255,255,.35)" />
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)" }}>
          {item.city}, {item.state} · {item.county} County
        </span>
      </div>

      {item.kind === "review" && item.stars && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: item.stars }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={SAND}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      )}

      <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.2vw,27px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 6 }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND, marginBottom: 20 }}>{item.service}</p>

      {item.body && (
        <div className="mb-5 p-4" style={{ background: "rgba(0,80,159,.12)", border: "1px solid rgba(0,80,159,.25)" }}>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            {item.kind === "project-gallery" ? "About this photo" : "What we did"}
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.72)", lineHeight: 1.65 }}>{item.body}</p>
        </div>
      )}

      {item.story && (
        <div className="flex flex-col gap-4 mb-6">
          {item.story.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 14.5, color: "rgba(255,255,255,.65)", lineHeight: 1.8 }}>{para}</p>
          ))}
        </div>
      )}

      {item.quote && (
        <div className="mb-4">
          <Quote size={18} color="rgba(216,203,165,.35)" style={{ marginBottom: 8 }} />
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.8 }}>
            {item.quote}
          </p>
          {item.author && (
            <div className="flex items-center gap-3 mt-4">
              {item.avatar && (
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ background: "#3E3C49" }}>
                  <ImageWithFallback src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>{item.author}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11.5, color: "rgba(255,255,255,.35)" }}>{item.meta}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "auto 0 18px" }} />

      <button onClick={() => { onClose(); openInspection(); }}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full hover:opacity-90 transition-opacity"
        style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
        Free inspection in {item.city} <ArrowRight size={14} />
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(62,60,73,.9)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full overflow-hidden ${stacked ? "max-w-[880px] max-h-[92vh] overflow-y-auto rg-scroll-thin" : "max-w-[940px] flex flex-col lg:flex-row"}`}
        style={{ background: CHAR, ...(stacked ? {} : { height: "min(85vh, 560px)" }) }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ background: "rgba(62,60,73,.65)", border: "none", cursor: "pointer" }}>
          <X size={17} color="#fff" />
        </button>

        {stacked ? (
          <>
            <div style={{ height: "auto" }}>{Gallery}</div>
            {Body}
          </>
        ) : (
          <>
            <div className="lg:w-[48%] shrink-0 relative" style={{ minHeight: 220 }}>{Gallery}</div>
            <div className="flex-1 flex flex-col" style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}>{Body}</div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
