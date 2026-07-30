import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Star, X, Play } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { B, CHAR, SAND } from "../theme";

export type ReviewModalData = {
  name: string;
  loc: string;
  stars: number;
  quote: string;
  img: string;
  avatar: string;
  /** Optional — not every section tags a service or a date. */
  service?: string;
  date?: string;
};

// Single canonical review lightbox — every "What Customers Say About Us"
// carousel across the site (Home, Our Difference, Problem Sign detail,
// Reviews) opens this instead of a bare video player, so clicking a review
// always surfaces the full quote + CTA, not just the clip.
export function ReviewModal({ review, onClose, onPrev, onNext }: {
  review: ReviewModalData;
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
          <ImageWithFallback
            src={review.img}
            alt={review.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

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

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            {review.service ? (
              <span style={{
                fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
                color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
                background: "rgba(26,82,168,.85)", padding: "4px 10px",
                backdropFilter: "blur(4px)",
              }}>{review.service}</span>
            ) : <span />}

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
          <div className="flex items-center justify-end px-8 pt-7 pb-4 shrink-0">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}
            >
              <X size={14} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          <div className="flex flex-col flex-1 px-8 pb-8">
            <div className="flex gap-1 mb-5">
              {Array.from({ length: review.stars }).map((_, si) => (
                <Star key={si} size={15} fill={SAND} stroke="none" />
              ))}
            </div>

            <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(196,171,108,.2)", lineHeight: 0.55, marginBottom: 14 }}>&ldquo;</div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.78)", lineHeight: 1.8, flex: 1 }}>
              {review.quote}
            </p>

            <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "24px 0" }} />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0" style={{ background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.12)" }}>
                <ImageWithFallback src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.3 }}>{review.name}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 2 }}>
                  {review.loc}{review.date ? <>&nbsp;&nbsp;·&nbsp;&nbsp;{review.date}</> : null}
                </p>
              </div>
            </div>

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
