import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight, X } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { PageHeroBanner } from "./components/PageHeroBanner";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { LOVE_WELL_PROJECTS, type LoveWellProject } from "./data/loveWellProjects";
import imgFloor02 from "../assets/floor-02.jpeg";

import { B, DARK, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const LOVE_WELL_YEARS = ["All", ...Array.from(new Set(LOVE_WELL_PROJECTS.map((p) => p.year))).sort((a, b) => Number(b) - Number(a))];

function ProjectCard({ project, onClick }: { project: LoveWellProject; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
        <ImageWithFallback src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)" }}>
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#8A7238", letterSpacing: 1 }}>{project.year}</span>
        </span>
        {project.videoId && (
          <>
            <div className="absolute inset-0" style={{ background: "rgba(10,11,20,.2)" }} />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: B }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
          </>
        )}
      </div>
      <div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: CHAR, lineHeight: 1.4, marginBottom: 4 }}>
          {project.title}
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{project.desc}</p>
      </div>
    </div>
  );
}

function VideoModal({ videoId, onClose }: { videoId: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!videoId) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [videoId, onClose]);

  return createPortal(
    <AnimatePresence>
      {videoId && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,.88)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ maxWidth: 960 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-11 right-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
            >
              <X size={16} color="#fff" />
            </button>
            <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Love Well Initiative video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function IntroSection() {
  return (
    <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="max-w-2xl">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.6)", lineHeight: 1.8, marginBottom: 28 }}>
            Launched in 2015, the Love Well Initiative is the umbrella for every community project we take on — discounted and, in some cases, fully free structural repairs for qualifying families and charitable organizations across the Memphis area.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {["Discounted repairs", "Qualifying families", "Underserved neighborhoods", "Community-first"].map((tag) => (
              <div key={tag} className="px-4 py-3" style={{ background: "rgba(10,11,20,.04)", border: `1px solid ${ON_LIGHT.border}` }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.65)", fontWeight: 500 }}>{tag}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+18335841049" className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:border-white/40"
              style={{ border: `1.5px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>
              See if you qualify
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="tel:+18335841049" className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:opacity-90"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
              Nominate a charity
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsGridSection() {
  const [yearFilter, setYearFilter] = useState("All");
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const filtered = yearFilter === "All" ? LOVE_WELL_PROJECTS : LOVE_WELL_PROJECTS.filter((p) => p.year === yearFilter);

  return (
    <section style={{ background: SURFACE.alt }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-10">
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10.5, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
            Where the giving has gone
          </p>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,34px)", color: CHAR, letterSpacing: "-0.5px" }}>
            All Love Well projects
          </h3>
        </Reveal>

        <Reveal className="flex items-center gap-2 flex-wrap mb-12">
          {LOVE_WELL_YEARS.map((y) => (
            <button key={y} onClick={() => setYearFilter(y)} className="px-3.5 py-2 transition-all"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                background: yearFilter === y ? SAND : "transparent",
                color: yearFilter === y ? DARK : MUTED,
                border: `1.5px solid ${yearFilter === y ? SAND : ON_LIGHT.border}`,
                cursor: "pointer",
              }}>
              {y}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filtered.map((project, i) => (
            <Reveal key={project.title} delay={(i % 9) * 0.04}>
              <ProjectCard project={project} onClick={() => project.videoId && setOpenVideo(project.videoId)} />
            </Reveal>
          ))}
        </div>

        <VideoModal videoId={openVideo} onClose={() => setOpenVideo(null)} />
      </div>
    </section>
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

// ─── LoveWellPage ─────────────────────────────────────────────────────────────
export default function LoveWellPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Our Difference" />
      </div>
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: "Our Difference", onClick: () => onNavigate?.("our-difference") },
          { label: "Love Well Initiative" },
        ]} />

        <PageHeroBanner
          image={imgFloor02}
          imageAlt="Love Well Initiative"
          eyebrow="Love Well Initiative"
          title="Giving back to the neighborhoods we serve"
          lede={`${LOVE_WELL_PROJECTS.length} community projects and counting — discounted and, in some cases, fully free structural repairs for qualifying families and charities across the Memphis area.`}
          minHeight={320}
        />

        <IntroSection />
        <ProjectsGridSection />

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
