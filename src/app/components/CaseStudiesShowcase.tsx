import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { CaseStudy } from "../data/caseStudies";
import { B, DARK, CHAR, SAND, MUTED } from "../theme";

// ─── Shared case-studies visual language ─────────────────────────────────────
// One design (hero split banner + alternating medium cards) and one detail
// modal (gallery + story), reused by the Home teaser, the Our Difference
// teaser, and the full case-studies listing page so all three stay in sync.

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

function HeroCase({ c, num, onOpen }: { c: CaseStudy; num: number; onOpen: () => void }) {
  return (
    <Reveal>
      <div className="relative flex flex-col lg:flex-row overflow-hidden lg:h-[580px] cursor-pointer" onClick={onOpen}>
        <div className="order-1 lg:order-2 relative lg:flex-1 overflow-hidden group h-56 sm:h-72 lg:h-full">
          <ImageWithFallback src={c.img} alt={c.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        </div>

        <div className="order-2 lg:order-1 relative flex flex-col justify-between w-full lg:w-[44%] lg:shrink-0 z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          style={{ background: "#053770" }}>
          <div>
            <div className="flex items-center gap-3 mb-5 lg:mb-10">
              <span className="px-3 py-1" style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>{c.tag}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.45)" }}>{c.loc}</span>
              <span className="ml-auto hidden sm:inline" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 13, color: "rgba(255,255,255,.1)", letterSpacing: 2 }}>{String(num).padStart(2, "0")}</span>
            </div>
            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,60px)", color: "#fff", lineHeight: 0.98, letterSpacing: "-1px", textTransform: "uppercase", marginBottom: 16 }}>
              {c.title}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
              {c.desc}
            </p>
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="flex gap-6 lg:gap-10 mb-6 lg:mb-8 pt-5 lg:pt-7" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
              {c.stats.map(([val, label]) => (
                <div key={val + label}>
                  <div style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(22px,3vw,34px)", color: SAND, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{label}</div>
                </div>
              ))}
            </div>
            <span className="group inline-flex items-center gap-2"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
              Read story
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// Photo on top, blue content panel below — the wider (7-col) half of a row.
function MediumCaseA({ c, num, onOpen }: { c: CaseStudy; num: number; onOpen: () => void }) {
  return (
    <div className="overflow-hidden group cursor-pointer flex flex-col h-[300px] sm:h-[340px] lg:h-[400px]" onClick={onOpen}>
      <div className="relative overflow-hidden flex-1">
        <ImageWithFallback src={c.img} alt={c.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 sm:gap-3">
          <span className="px-3 py-1" style={{ background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.35)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{c.tag}</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#fff" }}>{c.loc}</span>
        </div>
        <div className="hidden lg:block absolute top-2 right-4" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 110, color: "rgba(255,255,255,.05)", lineHeight: 1, letterSpacing: "-4px" }}>{String(num).padStart(2, "0")}</div>
      </div>
      <div className="shrink-0 px-6 py-5 lg:px-8 lg:py-6 flex flex-col gap-2" style={{ background: "#053770" }}>
        <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(24px,3vw,42px)", color: "#fff", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.5px" }}>{c.title}</h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{c.desc}</p>
        <span className="inline-flex items-center gap-2 group/link mt-1"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
          Read story
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/link:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// Navy card, image strip on top, bold type below — the narrower (5-col) half.
function MediumCaseB({ c, num, onOpen }: { c: CaseStudy; num: number; onOpen: () => void }) {
  return (
    <div className="relative overflow-hidden group cursor-pointer flex flex-col h-[300px] sm:h-[340px] lg:h-[400px]" style={{ background: "#053770" }} onClick={onOpen}>
      <div className="relative overflow-hidden shrink-0 h-[48%]">
        <ImageWithFallback src={c.img} alt={c.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1" style={{ background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.35)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{c.tag}</span>
        </div>
        <div className="hidden lg:block absolute top-2 right-3" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 80, color: "rgba(255,255,255,.06)", lineHeight: 1 }}>{String(num).padStart(2, "0")}</div>
      </div>
      <div className="flex flex-col justify-between flex-1 px-5 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
        <div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)", display: "block", marginBottom: 4 }}>{c.loc}</span>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(22px,3vw,34px)", color: "#fff", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.5px", marginBottom: 8 }}>{c.title}</h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>{c.desc}</p>
        </div>
        <span className="group/link inline-flex items-center gap-2"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
          Read story
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/link:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function CaseStudyModal({ card, onOpenChange }: { card: CaseStudy | null; onOpenChange: (open: boolean) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setCur(0);
    emblaApi.scrollTo(0);
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi, card]);

  return (
    <DialogPrimitive.Root open={!!card} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50" style={{ background: "rgba(10,11,20,.78)" }} />
        <DialogPrimitive.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(94vw,980px)] max-h-[92vh] overflow-y-auto rg-scroll-thin"
          style={{ background: "#fff" }}
          aria-describedby={undefined}
        >
          {card && (
            <div className="relative">
              <DialogPrimitive.Close
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}
              >
                <X size={18} color="#fff" />
              </DialogPrimitive.Close>

              <div className="relative overflow-hidden" ref={emblaRef} style={{ background: DARK }}>
                <div className="flex">
                  {card.gallery.map((slide, i) => (
                    <div key={i} className="relative shrink-0 w-full" style={{ aspectRatio: "16/9" }}>
                      <ImageWithFallback src={slide.img} alt={slide.caption} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.85) 0%, rgba(10,11,20,0) 100%)" }}>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.85)" }}>{slide.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button onClick={() => emblaApi?.scrollNext()} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <div className="absolute bottom-3 right-4 flex gap-1.5">
                  {card.gallery.map((_, i) => (
                    <button key={i} onClick={() => emblaApi?.scrollTo(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: cur === i ? 18 : 6, height: 6, background: cur === i ? SAND : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", padding: 0 }} />
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1" style={{ background: "rgba(26,82,168,.08)", border: `1px solid rgba(26,82,168,.2)`, fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase" }}>{card.tag}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{card.loc}</span>
                </div>
                <DialogPrimitive.Title style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", color: CHAR, letterSpacing: "-0.5px", marginBottom: 20 }}>
                  {card.title}
                </DialogPrimitive.Title>

                <div className="flex flex-col gap-4 mb-8">
                  {card.story.map((p, i) => (
                    <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.75 }}>{p}</p>
                  ))}
                </div>

                <div className="flex gap-8 mb-8 pt-6" style={{ borderTop: "1px solid rgba(0,0,0,.08)" }}>
                  {card.stats.map(([val, label]) => (
                    <div key={val + label}>
                      <div style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: B, lineHeight: 1 }}>{val}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED, marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{label}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={openInspection}
                  className="inline-flex items-center gap-2 px-7 py-3.5"
                  style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}
                >
                  Schedule Free Inspection
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Renders items[0] as the hero split banner, then the rest in alternating
// medium-card rows (7/5 split). Used identically by the Home teaser, the Our
// Difference teaser, and the full case-studies listing page.
const PAGE_SIZE = 12;

export function CaseStudiesGrid({ items, onOpen }: { items: CaseStudy[]; onOpen: (c: CaseStudy) => void }) {
  const [page, setPage] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  const pageStart = page * PAGE_SIZE;
  const pageItems = items.slice(pageStart, pageStart + PAGE_SIZE);
  const [hero, ...rest] = pageItems;
  const rows: CaseStudy[][] = [];
  for (let i = 0; i < rest.length; i += 2) rows.push(rest.slice(i, i + 2));

  const goToPage = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-3" ref={topRef}>
      {hero && (
        <Reveal delay={0}>
          <HeroCase c={hero} num={pageStart + 1} onOpen={() => onOpen(hero)} />
        </Reveal>
      )}
      {rows.map((row, ri) => {
        // Alternate which side is the wide card each row, so the grid doesn't
        // read as a repeating template — small-left/large-right on odd rows.
        const swapped = ri % 2 === 1;
        const left = swapped ? row[1] : row[0];
        const right = swapped ? row[0] : row[1];
        const leftNum = pageStart + 2 + ri * 2 + (swapped ? 1 : 0);
        const rightNum = pageStart + 2 + ri * 2 + (swapped ? 0 : 1);
        return (
          <div key={ri} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            <Reveal delay={0.1} className={swapped ? "sm:col-span-1 lg:col-span-5" : "sm:col-span-1 lg:col-span-7"}>
              {left && (swapped
                ? <MediumCaseB c={left} num={leftNum} onOpen={() => onOpen(left)} />
                : <MediumCaseA c={left} num={leftNum} onOpen={() => onOpen(left)} />)}
            </Reveal>
            {right && (
              <Reveal delay={0.2} className={swapped ? "sm:col-span-1 lg:col-span-7" : "sm:col-span-1 lg:col-span-5"}>
                {swapped
                  ? <MediumCaseA c={right} num={rightNum} onOpen={() => onOpen(right)} />
                  : <MediumCaseB c={right} num={rightNum} onOpen={() => onOpen(right)} />}
              </Reveal>
            )}
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button onClick={() => goToPage(Math.max(0, page - 1))} disabled={page === 0}
            aria-label="Previous page"
            className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors hover:bg-black/5"
            style={{ border: "1.5px solid rgba(0,0,0,.12)", background: "none", cursor: page === 0 ? "default" : "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => goToPage(i)}
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{
                border: `1.5px solid ${i === page ? B : "rgba(0,0,0,.12)"}`,
                background: i === page ? B : "none",
                color: i === page ? "#fff" : CHAR,
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1}
            aria-label="Next page"
            className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-colors hover:bg-black/5"
            style={{ border: "1.5px solid rgba(0,0,0,.12)", background: "none", cursor: page === totalPages - 1 ? "default" : "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
