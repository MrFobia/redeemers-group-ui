import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, animate, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, ArrowRight, X } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import useEmblaCarousel from "embla-carousel-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { FloatingSideNav } from "./components/FloatingSideNav";
import imgFloor01 from "../assets/floor-01.jpeg";
import imgFloor02 from "../assets/floor-02.jpeg";
import imgFloor03 from "../assets/floor-03.jpeg";
import imgFloor04 from "../assets/floor-04.jpeg";
import imgRevAvatar from "../assets/rev-avatar.png";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { ReviewModal } from "./components/ReviewModal";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
import { B, DARK, NAVY, CHAR, SAND, CREAM, MUTED, SURFACE, ON_LIGHT, ON_DARK } from "./theme";
import { LOVE_WELL_PROJECTS } from "./data/loveWellProjects";
import { CASE_STUDIES, type CaseStudy } from "./data/caseStudies";
import { CaseStudiesGrid, CaseStudyModal } from "./components/CaseStudiesShowcase";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix; } });
    return ctrl.stop;
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}



// Exact 9 items + order from the approved Figma sitemap (Our Difference
// branch) — do not rename or reorder without updating the sitemap first.
const NAV_TABS = [
  { id: "reviews", label: "Testimonials" },
  { id: "process", label: "What to expect" },
  { id: "story", label: "The Evergreen difference" },
  { id: "pledge", label: "Our pledge" },
  { id: "case-studies", label: "Featured projects / case stories" },
  { id: "before-after", label: "Before & after" },
  { id: "referral", label: "Referral program" },
  { id: "love-well", label: "Love Well Initiative" },
  { id: "certifications", label: "Awards" },
];

// ─── 1. HERO (DARK) ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-[320px] md:min-h-[360px] lg:min-h-[400px]">
      <ImageWithFallback
        src={imgFloor04}
        alt="Our Difference" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(62,60,73,0.92) 0%,rgba(62,60,73,0.68) 55%,rgba(62,60,73,0.40) 100%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-10 md:py-12 min-h-[320px] md:min-h-[360px] lg:min-h-[400px] flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-4 md:mb-6">
          <div className="w-5 h-[2px]" style={{ background: SAND }} />
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Our Difference</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4.4vw,60px)", color: "#fff", lineHeight: 1.02, letterSpacing: "-2px", marginBottom: 18, maxWidth: 760 }}>
          Why families choose Redeemers Group
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(14px,1.3vw,17px)", color: "rgba(255,255,255,.6)", lineHeight: 1.7, maxWidth: 540, marginBottom: 24 }}>
          From our first call to your final follow-up, here is what sets us apart.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-3">
          <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-8 py-4 inline-flex items-center gap-3"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
            <span className="relative z-10">Schedule Free Inspection</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
          </a>
          <a href="tel:+19015550100"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: "rgba(255,255,255,.5)", borderBottom: "1px solid rgba(255,255,255,.2)", paddingBottom: 2 }}>
            or call (901) 555-0100
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. TRUST BAR (CHAR) ─────────────────────────────────────────────────────
const TRUST_STATS = [
  { val: "12,000+", label: "Homes Protected" },
  { val: "A+ BBB", label: "Rated" },
  { val: "Lifetime", label: "Warranty" },
  { val: "18+ yrs", label: "In Business" },
];

function TrustBar() {
  return (
    <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(62,60,73,.06)" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center gap-2">
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: B, lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.4)", letterSpacing: 1.5, textTransform: "uppercase" }}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── 3. PROCESS STEPS (DARK) ─────────────────────────────────────────────────
const STEPS = [
  {
    n: "01", title: "Schedule a free inspection",
    desc: "We come to you — no obligation, no pressure, same-week availability.",
    img: imgFloor04,
  },
  {
    n: "02", title: "Inspection & assessment",
    desc: "Our specialist walks through the home and identifies the root cause.",
    img: imgFloor02,
  },
  {
    n: "03", title: "Custom solution proposal",
    desc: "We present a clear, itemised quote — no hidden costs.",
    img: imgFloor01,
  },
  {
    n: "04", title: "Installation day",
    desc: "Certified crew arrives on time and cleans up after the job.",
    img: imgFloor03,
  },
];

function ProcessSection() {
  return (
    <section id="process" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-5 h-[2px]" style={{ background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>What to expect</span>
            <div className="w-5 h-[2px]" style={{ background: B }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.5vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Your experience, start to finish
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(62,60,73,.55)" }}>Four simple steps — no surprises, no pressure.</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="group flex flex-col h-full" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={step.img} alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(62,60,73,.6) 0%,transparent 65%)" }} />
                  <div className="absolute top-4 left-4 px-2.5 py-1" style={{ background: B }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: 1 }}>{step.n}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 18, color: CHAR, lineHeight: 1.2, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.5)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="flex justify-center">
          <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-8 py-4 inline-flex items-center gap-3"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
            <span className="relative z-10">Schedule free inspection</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: B }} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 4. STORY (DARK) ─────────────────────────────────────────────────────────
// Client QA: this section only led to "Contact Us" — the Evergreen module
// needs its own interna where the 7Ps, what certification means, and the
// video/awards live, not just this origin-story paragraph.
function StorySection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <section id="story" style={{ background: SURFACE.alt }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>The Evergreen difference</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              A family business, built on one bad experience
            </h2>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(62,60,73,.6)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 18 }}>
                Redeemers Group started the way most small businesses do — out of frustration. Our founder had a crawl space problem that three national contractors quoted wrong, fixed halfway, or simply never called back about.
              </p>
              <p>
                So he got certified, hired locally, and built the company he wished existed: one that treats every Memphis homeowner the way you'd want a neighbor treated. Privately owned, community rooted, no franchise overhead passing costs to you.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap mt-8">
              <button onClick={() => onNavigate?.("evergreen")} className="group inline-flex items-center gap-2 px-7 py-4 transition-all"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
                What Is Evergreen?
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a href="#" className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:border-white/40"
                style={{ border: `1.5px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>
                Contact Us
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="relative overflow-hidden" style={{ borderRadius: 2 }}>
              <ImageWithFallback
                src={imgFloor03}
                alt="Redeemers team" className="w-full object-cover" style={{ height: 340 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(62,60,73,.55) 0%,transparent 55%)" }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val: 12000, suffix: "+", label: "Satisfied customers" },
                { raw: "20+ yrs", label: "In business" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,3.5vw,48px)", color: B, lineHeight: 1, marginBottom: 6 }}>
                    {s.raw ? s.raw : <Counter to={(s as { val: number; suffix: string }).val} suffix={(s as { val: number; suffix: string }).suffix} />}
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.4)", letterSpacing: 0.5 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 5. PLEDGE (CHAR) ────────────────────────────────────────────────────────
const NEVER_DO = [
  { title: "Upsell during the inspection", desc: "Our inspector's job is to diagnose, not to sell. They don't work on commission." },
  { title: "Quote work you don't need", desc: "If we inspect and find nothing serious, we'll tell you that — and we won't charge for the visit." },
  { title: "Use scare tactics", desc: "We show you photos and explain what we found. No manufactured urgency, no worst-case-scenario framing." },
  { title: "Send a different crew than promised", desc: "The team we describe is the team that shows up. No subcontracting your job to an unknown crew." },
  { title: "Disappear after the job", desc: "Every job ends with a follow-up call. If something isn't right, we come back — no questions asked." },
];

const ALWAYS_WILL = [
  { title: "Give you a written quote before any work starts", desc: "Itemised, no hidden fees, no verbal-only pricing." },
  { title: "Explain what we found in plain language", desc: "No jargon. We show you photos and walk you through every finding before we recommend anything." },
  { title: "Honor our lifetime warranty — no exceptions", desc: "Transferable. No annual fees. No fine print that voids coverage." },
  { title: "Respect your time and your home", desc: "We arrive on time, protect your floors and walls, and clean up completely before we leave." },
];

// One column of pledge items (used by both the desktop ledger and the
// mobile slide) — kept as a single source so the two layouts never drift.
function PledgeColumn({ heading, items, tone }: { heading: string; items: { title: string; desc: string }[]; tone: "never" | "always" }) {
  const iconColor = tone === "never" ? MUTED : B;
  return (
    <>
      <div className="flex items-center gap-3 mb-7">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={iconColor} strokeWidth="1.6" opacity="0.5" />
          {tone === "never"
            ? <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
            : <path d="M8 12.3l2.6 2.6L16.3 9" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
        <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: CHAR, letterSpacing: "-0.5px" }}>
          {heading}
        </h3>
      </div>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 py-4" style={{ borderTop: i > 0 ? "1px solid rgba(62,60,73,.07)" : "none" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ marginTop: 3 }}>
              {tone === "never"
                ? <path d="M6 6l12 12M18 6L6 18" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" />
                : <path d="M5 12.5l4.5 4.5L19 7" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14.5, color: CHAR, marginBottom: 3 }}>{item.title}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Redesign brief: the old layout was two color-coded twin cards (sand-tinted
// "never" box mirroring a blue-tinted "always" box) — a comparison-card
// template. Desktop is one bordered ledger, not two boxes: a single sheet
// split by one hairline rule, with a wax-seal badge straddling the divider —
// an actual "pledge" motif. On mobile the two columns used to just stack,
// forcing a long scroll through both lists back to back — client QA asked
// for a slider instead, so each side gets its own full-width slide.
function PledgeSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSlide(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const slides = [
    { key: "never", heading: "We will never", items: NEVER_DO, tone: "never" as const },
    { key: "always", heading: "We always will", items: ALWAYS_WILL, tone: "always" as const },
  ];

  return (
    <section id="pledge" style={{ background: SURFACE.panel }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-[2px]" style={{ background: SAND }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Our Pledge</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.5vw,56px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", maxWidth: 600 }}>
                Things we promise we'll never do
              </h2>
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: ON_DARK.body, lineHeight: 1.7, maxWidth: 420 }}>
              Most contractors have fine print. Ours works the other way — here's what we explicitly commit to not doing.
            </p>
          </div>
        </Reveal>

        {/* Desktop / tablet — one ledger, split by a hairline rule + wax seal */}
        <Reveal delay={0.05} className="hidden lg:block">
          <div className="relative" style={{ border: "1px solid rgba(62,60,73,.1)", background: "#fff" }}>
            <div className="grid grid-cols-2">
              <div className="px-8 md:px-12 py-10 lg:py-12" style={{ borderRight: "1px solid rgba(62,60,73,.1)" }}>
                <PledgeColumn heading="We will never" items={NEVER_DO} tone="never" />
              </div>
              <div className="px-8 md:px-12 py-10 lg:py-12">
                <PledgeColumn heading="We always will" items={ALWAYS_WILL} tone="always" />
              </div>
            </div>

            {/* Wax-seal badge straddling the divider — the pledge motif */}
            <div className="flex absolute flex-col items-center justify-center" style={{
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 88, height: 88, borderRadius: "50%",
              background: NAVY, border: "4px solid #fff",
              boxShadow: "0 10px 28px rgba(62,60,73,.18)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={SAND}>
                <path d="M12 2l2.6 6.1 6.6.5-5 4.4 1.6 6.4L12 16l-5.8 3.4 1.6-6.4-5-4.4 6.6-.5z" />
              </svg>
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 8.5, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginTop: 3 }}>
                Pledge
              </span>
            </div>
          </div>
        </Reveal>

        {/* Mobile — swipeable, one side per slide */}
        <Reveal delay={0.05} className="lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((s) => (
                <div key={s.key} className="flex-[0_0_100%] min-w-0 pr-1">
                  <div className="px-6 py-9" style={{ border: "1px solid rgba(62,60,73,.1)", background: "#fff" }}>
                    <PledgeColumn heading={s.heading} items={s.items} tone={s.tone} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots + prev/next — same voice as the Testimonials/Benefits carousels */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => emblaApi?.scrollPrev()}
              className="shrink-0 flex items-center justify-center transition-all"
              style={{ width: 36, height: 36, border: `1px solid ${ON_DARK.border}`, background: "none", cursor: "pointer" }}>
              <ChevronLeft size={15} color="rgba(255,255,255,.6)" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button key={s.key} onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={s.heading}
                  style={{ width: slide === i ? 22 : 7, height: 7, background: slide === i ? SAND : "rgba(255,255,255,.25)", border: "none", cursor: "pointer", padding: 0, borderRadius: 4, transition: "all .3s" }} />
              ))}
            </div>
            <button onClick={() => emblaApi?.scrollNext()}
              className="shrink-0 flex items-center justify-center transition-all"
              style={{ width: 36, height: 36, border: `1px solid ${ON_DARK.border}`, background: "none", cursor: "pointer" }}>
              <ChevronRight size={15} color="rgba(255,255,255,.6)" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 6. TESTIMONIALS (DARK) — Embla carousel ─────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Joe was very thorough with explaining everything and even came back a second time to clarify. I called 3 or 4 other companies — while they did quote cheaper prices, I wasn't convinced their solutions were a long-term fix. Redeemers gave me confidence.",
    name: "Victoria E.", loc: "Memphis, TN", stars: 5,
    img: imgFloor01, avatar: imgRevAvatar,
    service: "Crawl Space", date: "March 2026",
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely! Very professional company.",
    name: "Elizabeth N.", loc: "Collierville, TN", stars: 5,
    img: imgFloor03, avatar: imgRevAvatar,
    service: "Foundation", date: "February 2026",
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5,
    img: imgFloor04, avatar: imgRevAvatar,
    service: "Concrete", date: "January 2026",
  },
];

function TestimonialsSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [cur, setCur] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section id="reviews" style={{ background: CREAM }} className="py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Reviews</p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              What Customers Say About Us
            </h2>
            {onNavigate && (
              <button
                onClick={() => onNavigate("reviews")}
                className="group inline-flex items-center gap-1.5 mt-4"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Read all reviews
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => emblaApi?.scrollPrev()}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{ border: `1.5px solid ${CHAR}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => emblaApi?.scrollNext()}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{ border: `1.5px solid ${CHAR}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: "#fff", border: "1px solid rgba(62,60,73,.07)" }}>
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(62,60,73,.45)" }}>
                  <button onClick={() => setSelectedIdx(i)} className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(0,80,159,.15)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.80)", lineHeight: 1.75, flex: 1, marginBottom: 24 }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(62,60,73,.07)" }}>
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "rgba(62,60,73,.09)" }}>
                    <ImageWithFallback src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{t.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10 px-8">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(62,60,73,.15)", border: "none", cursor: "pointer", padding: 0 }} />
        ))}
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <ReviewModal
            review={TESTIMONIALS[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
            onPrev={() => setSelectedIdx(i => i !== null ? (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length : null)}
            onNext={() => setSelectedIdx(i => i !== null ? (i + 1) % TESTIMONIALS.length : null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── 7. CASE STUDIES — shared design (see components/CaseStudiesShowcase.tsx)
// Full case set + per-case detail live on their own page (CaseStudiesPage.tsx)
// per the approved sitemap ("Featured projects / case stories" — an
// "interna"). This teaser previews the first 3 and sends the rest of the
// site to the dedicated page instead of a client-side "view more" toggle.
function CaseStudiesSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [activeCard, setActiveCard] = useState<CaseStudy | null>(null);
  const featured = CASE_STUDIES.slice(0, 3);

  return (
    <section id="case-studies" style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-6" style={{ background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Featured projects / case stories
            </span>
            <div className="h-[1px] w-6" style={{ background: B }} />
          </div>
          <h2
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px,4.5vw,56px)",
              color: CHAR,
              lineHeight: 1.05,
              letterSpacing: "-1px",
              marginBottom: 12,
            }}
          >
            In-depth project stories
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED }}>
            Commitments we put in writing — not just talking points.
          </p>
        </Reveal>

        <CaseStudiesGrid items={featured} onOpen={setActiveCard} />

        <Reveal delay={0.15} className="flex justify-center mt-14">
          <button
            onClick={() => onNavigate?.("case-studies")}
            className="group inline-flex items-center gap-2 px-7 py-3.5 transition-colors hover:bg-black/[0.03]"
            style={{ border: `1.5px solid ${B}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", cursor: "pointer" }}
          >
            View all case stories
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>

      <CaseStudyModal card={activeCard} onOpenChange={(open) => !open && setActiveCard(null)} />
    </section>
  );
}

// ─── 7b. BEFORE & AFTER — draggable comparison slider ────────────────────────
function BeforeAfterSlider({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const handleUp = () => { draggingRef.current = false; };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ aspectRatio: "4/3", cursor: "ew-resize", touchAction: "none" }}
      onPointerDown={(e) => { e.stopPropagation(); draggingRef.current = true; updateFromClientX(e.clientX); }}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After — full image, base layer */}
      <ImageWithFallback src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Before — clipped to the slider position */}
      <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ImageWithFallback src={before} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 px-2.5 py-1 pointer-events-none" style={{ background: "rgba(62,60,73,.65)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{beforeLabel}</span>
      <span className="absolute top-4 right-4 px-2.5 py-1 pointer-events-none" style={{ background: "rgba(62,60,73,.65)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{afterLabel}</span>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, width: 2, background: "#fff", transform: "translateX(-1px)", boxShadow: "0 0 10px rgba(62,60,73,.35)" }} />

      {/* Drag handle */}
      <div
        className="absolute rounded-full flex items-center justify-center pointer-events-none"
        style={{ left: `${pos}%`, top: "50%", width: 44, height: 44, transform: "translate(-50%,-50%)", background: "#fff", boxShadow: "0 4px 16px rgba(62,60,73,.35)" }}
      >
        <ChevronLeft size={13} color={CHAR} strokeWidth={2.5} style={{ marginRight: -5 }} />
        <ChevronRight size={13} color={CHAR} strokeWidth={2.5} style={{ marginLeft: -5 }} />
      </div>
    </div>
  );
}

// ─── Before & after (sourced from redeemersgroup.com/about-us/before-after.html) ──
const BEFORE_AFTER_STATS = [
  { val: "377", label: "Total sets" },
  { val: "134", label: "Concrete repair" },
  { val: "101", label: "Crawl space repair" },
  { val: "51",  label: "Concrete leveling" },
  { val: "15",  label: "Basement waterproofing" },
  { val: "12",  label: "Foundation repair" },
];

const BEFORE_AFTER_PROJECTS = [
  {
    tag: "Concrete Repair",
    title: "Extreme Concrete Repair in Bartlett, TN",
    loc: "Bartlett, TN",
    desc: "Jennifer purchased a new home and was concerned about severe driveway damage with voids underneath. Specialist Dante inspected the property, and expert Brennan applied the 3-part protection system to lift, seal, and protect the concrete.",
    workDone: ["PolyLevel foam injection to lift and level", "NexusPro joint sealant to divert water", "SealantPro surface protection"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/149664-before-image.jpeg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/149664-after-image.jpeg",
  },
  {
    tag: "Concrete Repair",
    title: "Amazing Sidewalk Repair in Bartlett, TN",
    loc: "Bartlett, TN",
    desc: "Paulette had a sunken sidewalk section — nearly 3 inches — creating a tripping hazard. Experts Dalton and Javier used the PolyLevel concrete injection system to lift and level the slab, then sealed the joints against water intrusion.",
    workDone: ["PolyLevel injection to lift the slab", "NexusPro joint sealant", "Trip hazard eliminated the same day"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/668c0c6864da7_before2.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/668c0c69a0e17_after2.jpg",
  },
  {
    tag: "Crawl Space Repair",
    title: "Vapor Barrier System",
    loc: "",
    desc: "A dirt crawl space experiencing extreme moisture and constant flooding needed a way to control the conditions underneath the home. A full vapor barrier system was installed to seal the space from ground moisture.",
    workDone: ["Vapor barrier installation", "Moisture sealed at the ground", "Crawl space conditions stabilized"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/57f5510269dd9_crawl.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/57f55104b6a94_finished.jpg",
  },
  {
    tag: "Foundation Repair",
    title: "Cracked Brick Wall",
    loc: "",
    desc: "Concrete and brick materials expanding and contracting at different rates left visible cracking in the wall. Push piers were installed to stabilize the foundation and close the gap.",
    workDone: ["Push piers driven to stable bearing soil", "Wall stabilized and crack closed", "Foundation movement stopped"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/5824af43de08d_before.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/5824af40906cd_after.jpg",
  },
  {
    tag: "Crawl Space Repair",
    title: "Crawlspace Encapsulation",
    loc: "",
    desc: "A damp crawl space with falling, saturated insulation needed full encapsulation to stop the moisture problem at its source.",
    workDone: ["Old, saturated insulation removed", "Full crawl space encapsulation installed", "Moisture problem resolved at the source"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/58824de3c4d8c_35446036-b109-4bd1-8887-2d6b0c59ab1f.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/58824de287500_22b187fd-2275-4224-9a4e-cee3402c9532.jpg",
  },
  {
    tag: "Crawl Space Repair",
    title: "Crawlspace Door",
    loc: "",
    desc: "The old crawl space access door had failed, leaving the opening damaged and exposed. It was replaced with a new sealed door built for the job.",
    workDone: ["Damaged access door removed", "New insulated crawl space door installed", "Opening properly sealed"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/58d29ca057be6_ed68df6d-a24c-422f-af93-1c0e4c8bfabd.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/58d29c9f5007b_7287adcb-0d7f-488b-920a-55a420cbaa75.jpg",
  },
  {
    tag: "Concrete Leveling",
    title: "INCREDIBLE PolyLEVEL Job",
    loc: "",
    desc: "A slab had dropped 2¼ inches out of grade. Foreman Aaron Stevens' crew used PolyLevel injection to lift it back into place in a single visit.",
    workDone: ["PolyLevel foam injection", "2¼\" of drop corrected", "Slab releveled to grade"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/5c0fffbf3c93a_screenshot20181210-123039gallery.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/5c0fffc1b59be_20181210123014.jpg",
  },
  {
    tag: "Concrete Repair",
    title: "New Looking Concrete after NexusPro Injection",
    loc: "",
    desc: "Weather damage on a hillside driveway had left the concrete cracked and worn. Foreman Shane Garrett's team used NexusPro injection to restore the surface and seal it against further damage.",
    workDone: ["NexusPro joint and crack injection", "Driveway surface restored", "Sealed against future weather damage"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/5c1a67cdd5a65_20181217113628.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/5c1a67d72b580_20181218145353.jpg",
  },
  {
    tag: "Crawl Space Repair",
    title: "Crawl Space Restoration in Bolivar, TN",
    loc: "Bolivar, TN",
    desc: "James and Christy's water-saturated crawl space was at risk for mold and wood rot. A full encapsulation with LumberKote wood sealant stopped the moisture and protected the structure above.",
    workDone: ["Full crawl space encapsulation", "LumberKote wood sealant applied", "Mold and rot risk eliminated"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/65382371944de_before.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/65382373d8cd6_after.jpg",
  },
  {
    tag: "Foundation Repair",
    title: "Foundation Repair in Cordova, TN",
    loc: "Cordova, TN",
    desc: "Keri's home had settled enough to crack exterior walls and block new flooring installation. A push pier system stabilized and lifted the foundation, while Thor helical ties and NexusPro closed and repaired the cracks.",
    workDone: ["Push pier system installed", "Thor helical ties for crack repair", "NexusPro crack sealant applied"],
    before: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/640a41220ddb4_before.jpg",
    after: "https://cdn.treehouseinternetgroup.com/uploads/before_after/1447/medium/640a412904fd5_after.jpg",
  },
];

// This example dataset only holds 10 of the site's 377 real cases (see
// BEFORE_AFTER_STATS) — the full set lives on BeforeAfterPage.tsx.

// Full grid + category filter + pager live on their own page
// (BeforeAfterPage.tsx) per the approved sitemap — this used to open as a
// fullscreen modal from this teaser. Rosie's QA flagged that pattern: sitemap
// says dedicated page, so "See all" now navigates instead of opening a
// lightbox.
function BeforeAfterSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  // watchDrag off: the slide itself hosts a drag-to-compare slider, so the
  // carousel only advances via the arrow buttons/dots — a swipe gesture would
  // otherwise fight the before/after handle for the same pointer drag.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, watchDrag: false });
  const [cur, setCur] = useState(0);
  const teaser = BEFORE_AFTER_PROJECTS.slice(0, 3);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section id="before-after" style={{ background: SURFACE.base }} className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-6" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>
                Before &amp; After
              </span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              Drag to see the difference
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => onNavigate?.("before-after")}
              className="group inline-flex items-center gap-2 shrink-0"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              See all (377)
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <div className="flex gap-3">
              <button onClick={() => emblaApi?.scrollPrev()}
                className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
                style={{ border: `1.5px solid ${CHAR}` }}>
                <ChevronLeft size={15} color={CHAR} strokeWidth={2} />
              </button>
              <button onClick={() => emblaApi?.scrollNext()}
                className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
                style={{ border: `1.5px solid ${CHAR}` }}>
                <ChevronRight size={15} color={CHAR} strokeWidth={2} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-8 ml-[max(0px,calc((100vw-1440px)/2))]">
          {teaser.map((p) => (
            <div key={p.title} className="shrink-0 w-[min(92vw,1160px)] grid grid-cols-1 lg:grid-cols-5 gap-0" style={{ background: "#fff", border: `1px solid ${ON_LIGHT.border}` }}>
              <div className="lg:col-span-3">
                <BeforeAfterSlider before={p.before} after={p.after} />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-10">
                <div className="inline-flex items-center px-2.5 py-1 mb-4 w-fit" style={{ background: "rgba(0,80,159,.1)", border: "1px solid rgba(0,80,159,.2)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase" }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: CHAR, lineHeight: 1.25, marginBottom: 10 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, marginBottom: 16 }}>
                  {p.loc || p.tag}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.80)", lineHeight: 1.7, marginBottom: 20 }}>
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {p.workDone.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M20 6L9 17l-5-5" stroke={B} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(62,60,73,.80)", lineHeight: 1.5 }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-10 px-8">
        {teaser.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(62,60,73,.15)", border: "none", cursor: "pointer", padding: 0 }} />
        ))}
      </div>

    </section>
  );
}

// ─── 9. CERTIFICATIONS ───────────────────────────────────────────────────────
const CERT_CHIPS = [
  { label: "BBB Accredited",     icon: "★" },
  { label: "BAS Certified",      icon: "✓" },
  { label: "NAWSRC Member",      icon: "◆" },
  { label: "Angi Top Pro",       icon: "★" },
  { label: "HomeAdvisor Elite",  icon: "✓" },
];

const CERT_STATS = [
  { val: "20+", label: "Years certified" },
  { val: "8",   label: "Certifications held" },
  { val: "4.9", label: "Google rating" },
  { val: "88",  label: "Awards" },
];

const AWARDS_PREVIEW = [
  { title: "Memphis Business Journal Small Business Awards", org: "Memphis Business Journal", year: "2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6a202bc8c9060_small-business-awards.jpeg" },
  { title: "Top Work Places, Top 3 Small Business", org: "Top Work Places", year: "2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9437bfd18_image-12.jpg" },
  { title: "2025 Best Evergreen Company", org: "Industry Recognition", year: "2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/69bc31ecc2ddc_image-8.jpg" },
];

function CertificationsSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <section id="certifications" style={{ background: SURFACE.alt }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8" style={{ background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Awards
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              Credentials that matter
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.5)", lineHeight: 1.7, maxWidth: 420 }}>
              We hold industry certifications so you never have to guess about our qualifications.
            </p>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(62,60,73,.06)", border: `1px solid ${ON_LIGHT.border}` }}>
            {CERT_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-10 px-6 text-center" style={{ background: SURFACE.base }}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,52px)", color: B, lineHeight: 1, marginBottom: 8 }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.45)", letterSpacing: 0.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Certifications chips + Affiliations grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Certification badges */}
          <Reveal>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 16 }}>
              Certifications
            </p>
            <div className="flex flex-col gap-3">
              {CERT_CHIPS.map((chip) => (
                <div key={chip.label} className="flex items-center gap-4 px-5 py-4"
                  style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 16, color: B }}>{chip.icon}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: CHAR, fontWeight: 500 }}>{chip.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Awards — full grid + detail lives on its own page (AwardsPage.tsx)
              per the approved sitemap. This is a teaser + link, not the
              module itself. */}
          <Reveal delay={0.1}>
            <div className="flex items-end justify-between mb-4">
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
                Awards
              </p>
              <button onClick={() => onNavigate?.("awards")}
                className="group inline-flex items-center gap-2"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                See all (88)
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {AWARDS_PREVIEW.map((award) => (
                <button key={award.title} onClick={() => onNavigate?.("awards")}
                  className="group flex flex-col gap-2 text-left" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "1/1", background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                    <ImageWithFallback src={award.img} alt={award.title} className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(216,203,165,.18)", border: "1px solid rgba(216,203,165,.4)" }}>
                      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#00509F", letterSpacing: 1 }}>{award.year}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11, color: CHAR, lineHeight: 1.4 }}>
                    {award.title.length > 40 ? award.title.slice(0, 40) + "…" : award.title}
                  </p>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

// ─── REFERRAL PROGRAM (CREAM) ────────────────────────────────────────────────
// Added to match the approved sitemap — was missing from the built page entirely.
const REFERRAL_STEPS = [
  { n: "01", title: "Send their name", desc: "Give us a friend, family member, or neighbor who mentioned a crack, a damp basement, or an uneven floor." },
  { n: "02", title: "We inspect, free", desc: "No cost, no obligation. If we don't find a real structural issue, we tell them that." },
  { n: "03", title: "You both get rewarded", desc: "The moment they book a repair with us, a $100 credit lands on your account and theirs." },
];

function ReferralProgramSection() {
  return (
    <section id="referral" style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-center">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Referral program</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 20, maxWidth: 480 }}>
              Know someone with a cracked wall or a wet crawl space?
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.75, maxWidth: 460, marginBottom: 32 }}>
              Send them our way. If they book a repair, you both get a $100 credit — no limit on how many neighbors you refer.
            </p>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: CHAR, marginBottom: 32 }}>$100 for you. $100 for them.</p>
            <a href="tel:+18335841049" className="group inline-flex items-center gap-2 px-7 py-4 transition-opacity hover:opacity-90"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>
              Call to refer a neighbor
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            {REFERRAL_STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-5 px-7 py-6" style={{ background: "#fff", border: "1.5px solid rgba(0,55,113,.14)" }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 13, color: SAND, letterSpacing: 1.5, paddingTop: 2 }}>{step.n}</span>
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 17, color: CHAR, marginBottom: 6 }}>{step.title}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── LOVE WELL INITIATIVE (DARK) ─────────────────────────────────────────────
// Added to match the approved sitemap — was missing from the built page entirely.
// Full project history + video playback live on the dedicated Love Well page
// (LoveWellPage.tsx) per the approved sitemap — the "Past Love Well projects"
// carousel used to duplicate that list here and was removed.
function LoveWellInitiativeSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [showVideo, setShowVideo] = useState(false);
  const heroVideoId = LOVE_WELL_PROJECTS[0].videoId;

  return (
    <section id="love-well" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          <Reveal className="order-2 lg:order-1">
            <button onClick={() => heroVideoId && setShowVideo(true)}
              className="relative overflow-hidden h-full w-full group/hero"
              style={{ borderRadius: 2, minHeight: 380, border: "none", padding: 0, cursor: heroVideoId ? "pointer" : "default" }}>
              <ImageWithFallback src={imgFloor02} alt="Love Well Initiative" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(62,60,73,.55) 0%,transparent 55%)" }} />
              {heroVideoId && (
                <>
                  <div className="absolute inset-0" style={{ background: "rgba(62,60,73,.2)" }} />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover/hero:scale-110" style={{ background: B }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </span>
                </>
              )}
            </button>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[2px] w-6" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Love Well Initiative</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12, maxWidth: 500 }}>
              Giving back to the neighborhoods we serve
            </h2>
            <button onClick={() => onNavigate?.("love-well")}
              className="group inline-flex items-center gap-1.5 mb-8"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              See the full initiative
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.6)", lineHeight: 1.8, maxWidth: 480, marginBottom: 28 }}>
              Since 2015, the Love Well Initiative has been the umbrella for everything our team gives back to the Memphis area — the annual Love Well 5K &amp; Festival benefiting a different local charity each year, hands-on work for shelters and family homes, and donated structural repairs.
            </p>
            {/* Client QA (Aug 10): the initiative "is not centered around
                nominations for free structural repairs" — the projects are the
                point, so the tags and the CTA point at the work, not at an
                application process. */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              {["Love Well 5K & Festival", "Shelters & family homes", "Donated structural repairs", "A new project every year"].map((tag) => (
                <div key={tag} className="px-4 py-3" style={{ background: "rgba(62,60,73,.04)", border: `1px solid ${ON_LIGHT.border}` }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.65)", fontWeight: 500 }}>{tag}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate?.("love-well")}
                className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:opacity-90"
                style={{ background: B, border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                See every Love Well project
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {showVideo && heroVideoId && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
              style={{ background: "rgba(62,60,73,.88)" }}
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
                style={{ maxWidth: 960 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo(false)}
                  aria-label="Close video"
                  className="absolute -top-11 right-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
                  style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
                >
                  <X size={16} color="#fff" />
                </button>
                <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#3E3C49" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1`}
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
      )}
    </section>
  );
}

// ─── 10. CTA (NAVY) ──────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback src={imgFloor03}
          alt="Start today" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(0,55,113,.86)" }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Get started today</span>
            <div className="h-[1px] w-8" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 16 }}>
            Ready to protect<br />your home?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · No pressure · Same-week availability
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}>
              <span className="relative z-10">Schedule Free Inspection</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color={NAVY} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
            </a>
            <a href="tel:+19015550100"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,.55)", borderBottom: "1px solid rgba(255,255,255,.2)", paddingBottom: 2 }}>
              or call (901) 555-0100
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
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

// ─── OurDifferencePage ────────────────────────────────────────────────────────
export default function OurDifferencePage({ onBack, onNavigate, scrollTo: initialSection }: { onBack: () => void; onNavigate?: (p: string) => void; scrollTo?: string }) {
  const [activeTab, setActiveTab] = useState(initialSection ?? NAV_TABS[0].id);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 145;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (initialSection) {
      const t = setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) {
          const offset = 145;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 120);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, []);

  // Track active tab on scroll — feeds the floating side rail.
  useEffect(() => {
    const sections = NAV_TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const handler = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY + 160 >= sections[i].offsetTop) {
          setActiveTab(NAV_TABS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Our Difference" />
      </div>
      {/* Floating rail mirrors the anchors already in the "Our Difference"
          mega menu — added per request so deep pages have both an ambient
          scroll-position rail and the upfront dropdown list. */}
      <FloatingSideNav tabs={NAV_TABS} active={activeTab} onChange={scrollToSection} />

      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[{ label: "Home", onClick: onBack }, { label: "Our Difference" }]} />

        {/* Order matches the approved sitemap: Testimonials, What to expect,
            Evergreen difference, Our pledge, Featured projects/case stories,
            Referral program, Love Well Initiative, Affiliations &
            certifications. News section removed per client request. */}
        <HeroSection />
        <TrustBar />
        <TestimonialsSection onNavigate={onNavigate} />
        <ProcessSection />
        <StorySection onNavigate={onNavigate} />
        <PledgeSection />
        <CaseStudiesSection onNavigate={onNavigate} />
        <BeforeAfterSection onNavigate={onNavigate} />
        <ReferralProgramSection />
        <LoveWellInitiativeSection onNavigate={onNavigate} />
        <CertificationsSection onNavigate={onNavigate} />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
