import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Home, Search } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import imgFloor02 from "../assets/floor-02.jpeg";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, MUTED, SURFACE } from "./theme";

const SIGNS = [
  { label: "Walls bowing inward", note: "also known as: a broken link" },
  { label: "Uneven floors", note: "also known as: a typo in the URL" },
  { label: "Musty smell", note: "also known as: this page hasn't existed since 2019" },
  { label: "Visible cracks", note: "also known as: the one you're looking at right now" },
];

const QUICK_LINKS = [
  { label: "Services", page: "services-landing" },
  { label: "Our Difference", page: "our-difference" },
  { label: "Resources", page: "resources" },
  { label: "Contact", page: "contact" },
];

export default function NotFoundPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const nav = onNavigate ?? (() => onBack());

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={nav} active="" />
      </div>

      <div className="w-full min-h-screen pt-[68px] md:pt-[111px] relative overflow-hidden" style={{ background: SURFACE.base }}>
        <ImageWithFallback
          src={imgFloor02}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,20,.4) 0%, rgba(10,11,20,.96) 55%, rgba(10,11,20,1) 100%)" }} />

        <div className="relative max-w-[1000px] mx-auto px-8 md:px-14 py-20 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-6 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Error 404 &middot; Structural Assessment
            </span>
            <div className="w-6 h-[2px]" style={{ background: SAND }} />
          </motion.div>

          {/* Cracked 404 numeral */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block mb-4"
          >
            <h1
              style={{
                fontFamily: "'Articulat CF',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(96px,18vw,220px)",
                color: "#fff",
                lineHeight: 0.9,
                letterSpacing: "-6px",
                position: "relative",
              }}
            >
              404
            </h1>
            {/* Crack overlay */}
            <svg
              viewBox="0 0 600 200"
              className="absolute left-0 top-1/2 w-full pointer-events-none"
              style={{ transform: "translateY(-50%)", opacity: 0.9 }}
              preserveAspectRatio="none"
            >
              <path
                d="M0,110 L90,95 L110,130 L150,80 L180,120 L230,70 L260,115 L300,90 L340,125 L380,75 L420,118 L460,88 L500,122 L540,92 L600,105"
                fill="none"
                stroke={SAND}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.2vw,38px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 16 }}
          >
            This page has some serious settlement issues.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 44px" }}
          >
            The link you followed sank somewhere we can't reach. Unlike a cracked foundation, this one's a little beyond a free inspection.
          </motion.p>

          {/* Diagnostic checklist */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-left mb-12"
            style={{ background: CHAR, border: "1px solid rgba(255,255,255,.08)", maxWidth: 560, margin: "0 auto 48px" }}
          >
            <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <Search size={14} color={SAND} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
                Signs this page is structurally unsound
              </span>
            </div>
            <div className="flex flex-col">
              {SIGNS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-start gap-3 px-6 py-4"
                  style={{ borderBottom: i < SIGNS.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: SAND }} />
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{s.label}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={onBack}
              className="group relative overflow-hidden px-8 py-4 inline-flex items-center gap-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", border: "none", cursor: "pointer" }}
            >
              <Home size={16} className="relative z-10" />
              <span className="relative z-10">Back to Solid Ground</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
            </button>
            <button
              onClick={openInspection}
              className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:border-white/40"
              style={{ border: "1.5px solid rgba(255,255,255,.2)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", background: "none", cursor: "pointer" }}
            >
              Schedule a Free Inspection (for your house, not this page)
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2"
          >
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.35)" }}>Or explore something that isn't sinking:</span>
            {QUICK_LINKS.map((l, i) => (
              <span key={l.page} className="flex items-center gap-2">
                <button
                  onClick={() => nav(l.page)}
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  className="hover:underline"
                >
                  {l.label}
                </button>
                {i < QUICK_LINKS.length - 1 && <span style={{ color: "rgba(255,255,255,.2)" }}>·</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
