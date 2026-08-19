import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X, Calendar, MapPin, Clock } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { LOVE_WELL_PROJECTS, LOVE_WELL_START_YEAR, type LoveWellProject } from "./data/loveWellProjects";
import imgFloor02 from "../assets/floor-02.jpeg";
import imgLoveWellLogo from "../assets/love-well-logo.jpg";

import { B, SAND, CHAR, MUTED, SURFACE, ON_LIGHT, DARK } from "./theme";

function Reveal({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

// Client QA (Aug 10): "There will be projects done for 11 years, so we need to
// be able to filter on every year back to 2015" — so the filter is built from
// the calendar, not from the projects we happen to have logged. Years with
// nothing logged yet are still selectable and show an empty state.
const LOVE_WELL_YEARS = [
  "All",
  ...Array.from({ length: new Date().getFullYear() - LOVE_WELL_START_YEAR + 1 }, (_, i) =>
    String(new Date().getFullYear() - i)
  ),
];

const FEATURED_PROJECT =
  LOVE_WELL_PROJECTS.find((p) => p.featured) ??
  [...LOVE_WELL_PROJECTS].sort((a, b) => Number(b.year) - Number(a.year))[0];

// ─── UPCOMING EVENTS ────────────────────────────────────────────────────────
// Client QA (Aug 19): "a full calendar doesn't make sense yet — clickable text
// that links out or opens an expanded window like the case studies." Placeholder
// entry below stands in until Rosie sends the real upcoming-events list; each
// item opens the same detail-panel pattern as the project cards, or — if an
// `href` is set — navigates straight to that page/site instead.
// Client QA (Aug 19): "can we add an image so it's not just text, plus an
// address and a time." `img`, `address`, `time` are optional — an event can
// still run text-only until there's a real photo/time for it.
type LoveWellEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  address?: string;
  desc: string;
  img?: string;
  href?: string;
};

// TEST DATA (Aug 19): time/address below are placeholders to preview the new
// layout — not real values. Swap for Rosie's actual 5K details before launch.
const LOVE_WELL_EVENTS: LoveWellEvent[] = [
  {
    id: "5k-festival",
    title: "Love Well 5K & Festival",
    date: "Saturday, October 17, 2026",
    time: "8:00 AM – 12:00 PM",
    location: "Memphis, TN",
    address: "4145 Walnut Grove Rd, Memphis, TN 38117 (TEST DATA)",
    desc: "Our annual 5K and festival, benefiting a different local charity each year. Registration and the full route open closer to the date — check back here or follow Redeemers on social for the announcement.",
    img: imgFloor02,
  },
];

function ProjectCard({ project, onClick }: { project: LoveWellProject; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
        <ImageWithFallback src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {/* Client QA: the sand-tinted chip read fine on white but disappeared
            over a photo — same low-contrast trap as the reviews carousel
            arrows. Solid dark chip + white text, like the Before/After
            labels elsewhere, so it holds up over any image. */}
        <span className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(10,11,20,.7)" }}>
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 1 }}>{project.year}</span>
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

// Client QA (Aug 10): "when I click on what is listed as a project, I cannot
// get back to the LWI page (or anywhere on the website)" — the old modal only
// opened for projects that had a video, and its only way out was a small dark
// X floating above the player. Now every project opens the same panel, and the
// way back is a labelled button that names where it returns you.
function ProjectModal({ project, onClose }: { project: LoveWellProject | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
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
            className="relative w-full overflow-y-auto"
            style={{ maxWidth: 960, maxHeight: "calc(100vh - 80px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10.5, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>
                Love Well Initiative · {project.year}
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2.5 hover:bg-white/15 transition-colors"
                style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.28)", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}
              >
                <X size={15} color="#fff" />
                Back to Love Well Initiative
              </button>
            </div>

            {project.videoId ? (
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`}
                  title={project.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              </div>
            ) : (
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
                <ImageWithFallback src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}

            <div className="pt-5" style={{ maxWidth: 720 }}>
              <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(19px,2vw,25px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 10 }}>
                {project.title}
              </h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.66)", lineHeight: 1.75 }}>
                {project.desc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Client feedback (Aug 19): the first pass built this as a one-off dark
// full-bleed panel, which didn't match the site's actual generic modal — the
// Radix Dialog used everywhere else (CaseStudyModal in CaseStudiesShowcase.tsx:
// white card, centered, circular dark close button, uppercase tag chip). This
// is that same shell, just without the image carousel a case study needs —
// "the expanded window the client asked for" reuses the site's real pattern.
function EventModal({ event, onClose }: { event: LoveWellEvent | null; onClose: () => void }) {
  return (
    <DialogPrimitive.Root open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50" style={{ background: "rgba(10,11,20,.78)" }} />
        <DialogPrimitive.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(94vw,640px)] max-h-[92vh] overflow-y-auto rg-scroll-thin"
          style={{ background: "#fff" }}
          aria-describedby={undefined}
        >
          {event && (
            <div className="relative">
              <DialogPrimitive.Close
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}
              >
                <X size={18} color="#fff" />
              </DialogPrimitive.Close>

              {/* Client QA (Aug 19): "add an image so it's not just text" —
                  same 16/9 photo band CaseStudyModal opens with, just without
                  the carousel (one event = one photo, not a gallery). */}
              {event.img && (
                <div className="relative w-full" style={{ aspectRatio: "16/9", background: DARK }}>
                  <ImageWithFallback src={event.img} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              )}

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="px-3 py-1" style={{ background: "rgba(26,82,168,.08)", border: `1px solid rgba(26,82,168,.2)`, fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase" }}>
                    Upcoming Event
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{event.date} · {event.location}</span>
                </div>

                <DialogPrimitive.Title style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", color: CHAR, letterSpacing: "-0.5px", marginBottom: 16 }}>
                  {event.title}
                </DialogPrimitive.Title>

                {/* Client QA (Aug 19): "plus an address and a time" — only
                    shows once Rosie sends the real ones; no placeholder
                    values invented for either. */}
                {(event.address || event.time) && (
                  <div className="flex flex-col gap-2 mb-6 pb-6" style={{ borderBottom: `1px solid ${ON_LIGHT.border}` }}>
                    {event.address && (
                      <div className="flex items-center gap-2">
                        <MapPin size={15} color={B} className="shrink-0" />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: CHAR }}>{event.address}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={15} color={B} className="shrink-0" />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: CHAR }}>{event.time}</span>
                      </div>
                    )}
                  </div>
                )}

                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.75 }}>
                  {event.desc}
                </p>
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
// Client QA (Aug 19): the white logo card read as generic, and the "Giving
// back..." headline duplicated what the stats already say better. Now the
// stats sit where the headline was, the sand eyebrow carries the client's
// "18+ years..." line instead of restating the page title (the breadcrumb
// above already says "Love Well Initiative"), and the logo moves off its
// white card to become a soft watermark behind the stats — same "photo behind
// the content" pattern the rest of the site's hero banners use, just with the
// LWI mark standing in for a photo. The logo JPEG still has a white background
// (see loveWellProjects/logo asset note), so it's faded via a radial mask
// rather than dropped in at full opacity — ask Rosie for a transparent PNG to
// sharpen this further.
function LoveWellHero() {
  const stats = [
    { k: "2015", v: "First Love Well project" },
    { k: String(new Date().getFullYear() - LOVE_WELL_START_YEAR + 1), v: "Years of giving" },
    { k: `${LOVE_WELL_PROJECTS.length}+`, v: "Community projects" },
  ];
  return (
    <section className="relative overflow-hidden" style={{ background: "#0A0B14" }}>
      <div className="absolute inset-0">
        <ImageWithFallback src={imgFloor02} alt="Love Well Initiative" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,11,20,0.95) 0%, rgba(10,11,20,0.88) 46%, rgba(11,28,74,0.72) 100%)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

      {/* LWI logo watermark, behind the stats — replaces the white logo card */}
      <img
        src={imgLoveWellLogo}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute pointer-events-none select-none"
        style={{
          right: "4%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40%",
          maxWidth: 460,
          opacity: 0.16,
          mixBlendMode: "screen",
          WebkitMaskImage: "radial-gradient(closest-side, rgba(0,0,0,.9) 0%, rgba(0,0,0,.5) 60%, transparent 100%)",
          maskImage: "radial-gradient(closest-side, rgba(0,0,0,.9) 0%, rgba(0,0,0,.5) 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-14 md:py-16 min-h-[320px] md:min-h-[400px] lg:min-h-[440px] flex items-center">
        <div style={{ maxWidth: 760 }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div style={{ width: 24, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              18+ years of investing in the community we call home
            </span>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {stats.map((s) => (
              <div key={s.v}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,68px)", color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>{s.k}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.66)", marginTop: 8 }}>{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INTRO ────────────────────────────────────────────────────────────────────
// Client QA (Aug 10): the initiative "is not centered around nominations for
// free structural repairs" — so this block explains what Love Well is and the
// nomination CTAs are gone. The projects, not the application process, are the
// point of the page.
// Client QA (Aug 19): stats moved up into the hero, so this section's old
// stat row is now "Upcoming Events" — clickable text (no full calendar yet)
// that opens the same expanded-panel pattern as the case studies, or jumps
// straight to an external/internal page when an event has a link.
function IntroSection({ onOpenEvent }: { onOpenEvent: (e: LoveWellEvent) => void }) {
  return (
    <section style={{ background: SURFACE.alt }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="max-w-3xl">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(16px,1.4vw,19px)", color: "rgba(10,11,20,.68)", lineHeight: 1.8, marginBottom: 20 }}>
            The Love Well Initiative is how Redeemers shows up for the Memphis area beyond the jobs we&rsquo;re hired for. Since 2015 it has been the umbrella for everything our team gives back — the annual Love Well 5K &amp; Festival benefiting a different local charity each year, hands-on work for shelters and family homes, and structural repairs donated where they change what a building can be used for.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.55)", lineHeight: 1.8 }}>
            Every year adds another project to the list. Below is the work itself — start with the featured story, then browse the full history by year.
          </p>

          <div className="mt-10 pt-9" style={{ borderTop: `1px solid ${ON_LIGHT.border}` }}>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10.5, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              Upcoming Events
            </p>
            <div className="flex flex-col gap-3">
              {LOVE_WELL_EVENTS.map((event) => {
                const content = (
                  <>
                    <Calendar size={17} color={B} className="shrink-0" style={{ marginTop: 2 }} />
                    <span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 15, color: CHAR }}>{event.title}</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, marginLeft: 8 }}>{event.date} · {event.location}</span>
                    </span>
                    <ArrowRight size={15} color={B} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ marginTop: 2 }} />
                  </>
                );
                const sharedStyle: React.CSSProperties = { fontFamily: "'Inter',sans-serif", cursor: "pointer" };
                return event.href ? (
                  <a key={event.id} href={event.href} target="_blank" rel="noreferrer" className="group flex items-start gap-3" style={sharedStyle}>
                    {content}
                  </a>
                ) : (
                  <button key={event.id} onClick={() => onOpenEvent(event)} className="group flex items-start gap-3 text-left" style={{ ...sharedStyle, background: "none", border: "none", padding: 0 }}>
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FEATURED PROJECT ─────────────────────────────────────────────────────────
// Client QA (Aug 10): "One featured that sits right where it turns white, and
// then the gallery right below it. I don't want the featured one to be so big
// that it's hard to tell there's a lot more to see." Hence the half-width
// image and the tight bottom padding — the gallery starts inside the fold.
function FeaturedProjectSection({ onOpen }: { onOpen: (p: LoveWellProject) => void }) {
  const project = FEATURED_PROJECT;
  if (!project) return null;
  return (
    <section style={{ background: SURFACE.base }} className="pt-16 lg:pt-20 pb-10 lg:pb-12">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-8">
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10.5, color: B, letterSpacing: 3, textTransform: "uppercase" }}>
            Featured project
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <button onClick={() => onOpen(project)} className="group relative block w-full overflow-hidden p-0"
            style={{ aspectRatio: "16/10", border: `1px solid ${ON_LIGHT.border}`, background: SURFACE.alt, cursor: "pointer" }}>
            <ImageWithFallback src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            <span className="absolute inset-0" style={{ background: "rgba(10,11,20,.28)" }} />
            {project.videoId && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: B }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            )}
          </button>

          <div>
            <span className="inline-block px-2.5 py-1 mb-4" style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)" }}>
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#8A7238", letterSpacing: 1.5 }}>{project.year}</span>
            </span>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,36px)", color: CHAR, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 14 }}>
              {project.title}
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.62)", lineHeight: 1.8, marginBottom: 22 }}>
              {project.desc}
            </p>
            <button onClick={() => onOpen(project)} className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:opacity-90"
              style={{ background: B, border: "none", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", cursor: "pointer" }}>
              {project.cta}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsGridSection({ onOpen }: { onOpen: (p: LoveWellProject) => void }) {
  const [yearFilter, setYearFilter] = useState("All");
  const filtered = yearFilter === "All" ? LOVE_WELL_PROJECTS : LOVE_WELL_PROJECTS.filter((p) => p.year === yearFilter);

  return (
    <section style={{ background: SURFACE.base }} className="pb-20 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="pt-10 mb-8" style={{ borderTop: `1px solid ${ON_LIGHT.hairline}` }}>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10.5, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
            Where the giving has gone
          </p>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,34px)", color: CHAR, letterSpacing: "-0.5px" }}>
            All Love Well projects
          </h3>
        </Reveal>

        <Reveal className="flex items-center gap-2 flex-wrap mb-10">
          {LOVE_WELL_YEARS.map((y) => (
            <button key={y} onClick={() => setYearFilter(y)} className="px-4 py-2 transition-all"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                background: yearFilter === y ? B : "transparent",
                color: yearFilter === y ? "#fff" : MUTED,
                border: `1.5px solid ${yearFilter === y ? B : ON_LIGHT.border}`,
                cursor: "pointer",
              }}>
              {y}
            </button>
          ))}
        </Reveal>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filtered.map((project, i) => (
              <Reveal key={project.title} delay={(i % 9) * 0.04}>
                <ProjectCard project={project} onClick={() => onOpen(project)} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="px-8 py-14 text-center" style={{ background: SURFACE.alt, border: `1px solid ${ON_LIGHT.border}` }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED, marginBottom: 14 }}>
              No Love Well projects logged for {yearFilter} yet.
            </p>
            <button onClick={() => setYearFilter("All")} className="inline-flex items-center gap-2"
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, padding: 0 }}>
              See every year
              <ArrowRight size={14} />
            </button>
          </div>
        )}
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
  const [openProject, setOpenProject] = useState<LoveWellProject | null>(null);
  const [openEvent, setOpenEvent] = useState<LoveWellEvent | null>(null);
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

        <LoveWellHero />

        <IntroSection onOpenEvent={setOpenEvent} />
        <FeaturedProjectSection onOpen={setOpenProject} />
        <ProjectsGridSection onOpen={setOpenProject} />

        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        <EventModal event={openEvent} onClose={() => setOpenEvent(null)} />

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
