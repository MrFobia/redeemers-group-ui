import React, { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView, animate, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Home, Hammer, BadgeCheck, ShieldCheck, Users, Leaf } from "lucide-react";
import ServicePage from "./ServicePage";
import { getSymptomImage } from "./data/services";
import { getProblemSignByLabel } from "./data/problemSigns";
import ProblemSignsPage from "./ProblemSignsPage";
import ProblemSignInnerPage from "./ProblemSignInnerPage";
import OurDifferencePage from "./OurDifferencePage";
import ResourcesPage from "./ResourcesPage";
import PricingPage from "./PricingPage";
import NewsBlogPage from "./NewsBlogPage";
import BlogInnerPage from "./BlogInnerPage";
import AboutPage from "./AboutPage";
import CareersPage from "./CareersPage";
import ServiceAreaPage from "./ServiceAreaPage";
import GuiaEstilosPage from "./GuiaEstilosPage";
import ServicesLandingPage from "./ServicesLandingPage";
import ReviewsPage from "./ReviewsPage";
import JobStoriesPage from "./JobStoriesPage";
import ContactPage from "./ContactPage";
import NotFoundPage from "./NotFoundPage";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";

import imgHeroBg from "../assets/hero-slide1.png";
import imgHeroSlide2 from "../assets/svc-waterproofing.jpg";
import imgRevThumb1 from "../assets/rev-thumb1.jpg";
import imgRevThumb2 from "../assets/rev-thumb2.jpg";
import imgRevThumb3 from "../assets/rev-thumb3.jpg";
import imgRevAvatar from "../assets/rev-avatar.png";
import imgCaseRanch from "../assets/case-ranch.jpg";
import imgCaseDuplex from "../assets/case-duplex.jpg";
import imgCaseTownhome from "../assets/case-townhome.jpg";
import imgServiceAreaMap from "../assets/service-area-map.jpg";
import imgSvcCrawlspace from "../assets/svc-crawlspace.jpg";
import imgSvcFoundation from "../assets/svc-foundation.jpg";
import imgSvcWaterproofing from "../assets/svc-waterproofing.jpg";
import imgSvcConcrete from "../assets/svc-concrete.jpg";
import imgSvcMold from "../assets/svc-mold.jpg";
import imgSvcInsulation from "../assets/svc-insulation.jpg";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { openInspection } from "./components/InspectionModal";

import { B, DARK, NAVY, CHAR, SAND, CREAM, MUTED, SURFACE, ON_DARK } from "./theme";

// ─── Fade-up scroll animation wrapper ─────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}


// ─── Announcement Bar ─────────────────────────────────────────────────────────

// ─── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  { num: "12,250", gold: "+",  label: "Homes protected" },
  { num: "18",     gold: " yrs", label: "In business" },
  { num: "4.9",    gold: "★",  label: "Google rating" },
  { num: "A",      gold: "+",  label: "BBB rating" },
  { num: "Lifetime", gold: " ∞", label: "Warranty" },
];

// ─── Hero Slider ──────────────────────────────────────────────────────────────
type HeadlineLine = string | [string, string]; // [white-part, gold-part]

const SLIDES: {
  img: string;
  eyebrow: string;
  headline: HeadlineLine[];
  sub: string;
  cta: string;
  ctaAction: "modal" | string;
  overlay: string;
  card: { eyebrow: string; title: string; body: string };
}[] = [
  {
    img: imgHeroBg,
    eyebrow: "Foundation & Structural Repair",
    headline: ["Protecting Homes,", ["One ", "Foundation"], "at a Time."],
    sub: "Crawl space, basement waterproofing, foundation repair and concrete leveling — backed by a lifetime warranty.",
    cta: "Schedule Free Inspection",
    ctaAction: "modal",
    overlay: "linear-gradient(113deg,rgba(10,11,20,0.88) 8%,rgba(10,11,20,0.55) 54%,rgba(10,11,20,0.2) 91%)",
    card: {
      eyebrow: "Why homeowners choose us",
      title: "Family-owned since 2008",
      body: "Our repairs are warrantied for the life of your home and pass to the next owner. That's a promise no quick-fix contractor can match.",
    },
  },
  {
    img: imgHeroSlide2,
    eyebrow: "18+ Years Serving the Mid-South",
    headline: ["Stop the Water.", "Save the", "Structure."],
    sub: "Interior drainage, sump pumps, and membrane systems designed to permanently keep water out of your home.",
    cta: "Explore Waterproofing",
    ctaAction: "service/waterproofing",
    overlay: "linear-gradient(113deg,rgba(10,28,74,0.90) 8%,rgba(10,28,74,0.60) 54%,rgba(10,28,74,0.15) 91%)",
    card: {
      eyebrow: "Over 12,250 homes protected",
      title: "Permanent solutions, not patches",
      body: "Every job uses engineered systems with a lifetime transferable warranty. We don't just fix symptoms — we solve the root cause.",
    },
  },
  {
    img: "https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
    eyebrow: "Tennessee · Mississippi · Arkansas",
    headline: ["Real Solutions.", "Engineered to", "Last Forever."],
    sub: "Family-owned since 2008. Every installer certified. Every job backed by our lifetime transferable warranty.",
    cta: "Our Difference",
    ctaAction: "our-difference",
    overlay: "linear-gradient(113deg,rgba(30,10,50,0.88) 8%,rgba(30,10,50,0.55) 54%,rgba(30,10,50,0.15) 91%)",
    card: {
      eyebrow: "Certified & accredited",
      title: "A+ BBB rated since day one",
      body: "We hold the industry's top certifications and have maintained an A+ BBB rating for 18 consecutive years. Your home deserves that standard.",
    },
  },
];

function HeroSlider({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const rafRef = useRef(0);
  const INTERVAL = 5500;

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  useEffect(() => {
    const tick = () => {
      const elapsed = (Date.now() - startRef.current) % INTERVAL;
      setProgress((elapsed / INTERVAL) * 100);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const goTo = (i: number) => { emblaApi?.scrollTo(i); startRef.current = Date.now(); };
  const prev = () => { emblaApi?.scrollPrev(); startRef.current = Date.now(); };
  const next = () => { emblaApi?.scrollNext(); startRef.current = Date.now(); };

  const slide = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden h-[calc(100dvh-110px)] min-h-[560px] md:h-[calc(100dvh-200px)] md:min-h-[760px]">
      {/* Embla carousel */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full" style={{ touchAction: "pan-y" }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="relative shrink-0 w-full h-full">
              <ImageWithFallback src={s.img} alt={s.eyebrow} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: s.overlay }} />
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main content — overlaid, left column. justify-start (not center): on
          short viewports (mobile landscape, short windows) the stacked
          headline/subtitle/CTA content can be taller than the space left
          after clearing the fixed header — centering would then push the
          top of the text up past paddingTop and under the nav. Anchoring to
          the top guarantees the header clearance always holds. */}
      <div className="absolute inset-0 flex flex-col justify-center sm:justify-start px-8 md:px-14 pt-24 pb-16 sm:pt-[168px] sm:pb-[120px]">
        {/* md/lg (laptop and below): widened to reach the same right edge as
            the stats bar below ("hasta donde termina Lifetime"). xl+ keeps
            the narrower 50% so the headline doesn't run under the floating
            glassmorphism card on the right. */}
        <div className="w-full max-w-full md:max-w-[76%] lg:max-w-[72%] xl:max-w-[50%]">

          {/* Eyebrow */}
          <motion.div
            key={`eyebrow-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .1 }}
            className="flex items-center gap-3 mb-3 md:mb-5"
          >
            <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              {slide.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4 md:mb-5">
            {slide.headline.map((line, li) => (
              <motion.div
                key={`h-${current}-${li}`}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .8, delay: .2 + li * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="block"
                style={{
                  fontFamily: "'Articulat CF',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(30px, 4.8vw, 72px)",
                  color: "#fff",
                  lineHeight: 1.08,
                  letterSpacing: "-1px",
                }}
              >
                {Array.isArray(line) ? (
                  <>{line[0]}<span style={{ color: SAND }}>{line[1]}</span></>
                ) : line}
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .45 }}
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,.72)", lineHeight: 1.65, maxWidth: 620, marginBottom: "clamp(18px, 2.5vw, 28px)" }}
          >
            {slide.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .6 }}
            className="flex items-center gap-3 sm:gap-5 flex-wrap mb-3 md:mb-4"
          >
            <a href="#" onClick={(e) => { e.preventDefault(); slide.ctaAction === "modal" ? openInspection() : onNavigate(slide.ctaAction); }} className="group relative overflow-hidden inline-flex items-center gap-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "clamp(13px, 1.4vw, 15px)", color: "#fff", padding: "13px 22px" }}>
              <span className="relative z-10">{slide.cta}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-10 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,255,255,0.12)" }} />
            </a>
            <a href="tel:+19015550100" className="hidden sm:inline"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: "rgba(255,255,255,.65)", borderBottom: "1px solid rgba(255,255,255,.25)", paddingBottom: 2 }}>
              or call (901) 555-0100
            </a>
          </motion.div>

          {/* Financing badge — sm+ */}
          <motion.div
            key={`fin-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .6, delay: .75 }}
            className="hidden sm:flex items-center gap-2 w-fit"
            style={{ background: "rgba(196,171,108,.2)", border: "1px solid #C4AB6C", padding: "8px 14px" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#fff" }}>Financing from $79/month · 0% for qualified homeowners</span>
          </motion.div>

          {/* Mobile credibility strip — hidden sm+ */}
          <motion.div
            key={`cred-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .8 }}
            className="flex sm:hidden flex-wrap gap-2 mt-2"
          >
            {[
              { icon: "★", text: "4.9 Google" },
              { icon: "✓", text: "A+ BBB" },
              { icon: "18+", text: "años" },
              { icon: "∞", text: "Garantía" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 px-3 py-1.5"
                style={{
                  background: "rgba(10,11,20,.65)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(196,171,108,.35)",
                }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: SAND }}>{b.icon}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#fff", fontWeight: 500, letterSpacing: 0.3 }}>{b.text}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Stats bar — absolute bottom, 24px from section edge, aligned to content padding */}
      <motion.div
        key={`stats-${current}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6, delay: .85 }}
        className="absolute hidden md:flex flex-wrap left-8 md:left-14"
        style={{ bottom: 24, background: "rgba(10,11,20,.72)", backdropFilter: "blur(18px)", borderLeft: "1px solid rgba(255,255,255,.07)", borderTop: "1px solid rgba(255,255,255,.07)" }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center justify-center gap-1"
            style={{ padding: "10px 20px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px, 2.8vw, 38px)", color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>
              {s.num}<span style={{ color: SAND }}>{s.gold}</span>
            </span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,.4)", letterSpacing: 1.5, textTransform: "uppercase" }}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Right glassmorphism card */}
      <motion.div
        key={`card-${current}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .7, delay: .3 }}
        className="absolute hidden xl:flex flex-col gap-6"
        style={{
          // Was pinned at 18%, floating well above the headline block; QA read
          // the gap under it as the end of the page ("falso final"). Anchored to
          // the vertical middle instead, less the stats bar at the bottom.
          // Centring lives on `top`/`marginTop`, not `transform` — motion owns
          // transform here for the slide-in and would drop a translate we set.
          top: "50%",
          marginTop: -206,
          right: "5%",
          width: "clamp(300px, 26vw, 400px)",
          background: "rgba(255,255,255,.18)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(198,198,198,.35)",
          padding: 29,
        }}
      >
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(61,61,72,.9)", letterSpacing: 2, textTransform: "uppercase" }}>
          {slide.card.eyebrow}
        </p>
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.5 }}>
          {slide.card.title}
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.65 }}>
          {slide.card.body}
        </p>
        <button className="group inline-flex items-center gap-1.5 self-start"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(61,61,72,.8)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          Explore
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dot indicators + prev/next */}
        <div className="flex items-center justify-between pt-1">
          {/* Vertical dots (rotated) */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{ width: 2, height: current === i ? 32 : 16, background: current === i ? "rgba(61,61,72,.9)" : "rgba(255,255,255,.3)", borderRadius: 2, border: "none", cursor: "pointer" }} />
            ))}
          </div>
          {/* Prev / Next */}
          <div className="flex gap-3">
            <button onClick={prev}
              className="flex items-center justify-center transition-all hover:bg-white/20"
              style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,.25)", background: "none", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={next}
              className="flex items-center justify-center transition-all hover:bg-white/20"
              style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,.25)", background: "none", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile controls — dots + arrows (hidden on lg where card controls show) */}
      <div className="absolute lg:hidden left-8 flex items-center gap-5" style={{ bottom: 28 }}>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
              style={{ width: current === i ? 26 : 8, height: 4, background: current === i ? SAND : "rgba(255,255,255,.3)", borderRadius: 2, border: "none", cursor: "pointer" }} />
          ))}
        </div>
        <div className="flex gap-2.5">
          <button onClick={prev} aria-label="Previous slide"
            className="flex items-center justify-center transition-all active:bg-white/20"
            style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,.25)", background: "rgba(10,11,20,.4)", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={next} aria-label="Next slide"
            className="flex items-center justify-center transition-all active:bg-white/20"
            style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,.25)", background: "rgba(10,11,20,.4)", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      {/* Bottom SAND progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,.1)" }}>
        <div className="h-full transition-none" style={{ width: `${progress}%`, background: SAND }} />
      </div>
    </section>
  );
}

// ─── Services Bento ───────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "crawl",
    cat: "Crawl Space",
    title: "My floors are sagging",
    desc: "SmartJack systems, encapsulation, and moisture control that restore structural integrity from the ground up.",
    img: imgSvcCrawlspace as string,
    span: "lg:col-span-2 lg:row-span-2",
    tall: true,
  },
  {
    id: "found",
    cat: "Foundation Repair",
    title: "I see wall cracks",
    desc: "Push piers and wall anchors stop movement permanently.",
    img: imgSvcFoundation as string,
    span: "lg:col-span-2",
  },
  {
    id: "water",
    cat: "Waterproofing",
    title: "My basement is wet",
    desc: "Interior drainage and membranes keep water where it belongs.",
    img: imgSvcWaterproofing as string,
    span: "lg:col-span-2",
  },
  {
    id: "conc",
    cat: "Concrete Services",
    title: "Uneven concrete / driveway",
    desc: "PolyLevel foam lifts sunken slabs without full replacement. Fast, clean, and permanent.",
    img: imgSvcConcrete as string,
    span: "lg:col-span-2",
  },
  {
    id: "mold",
    cat: "Mold Prevention",
    title: "I smell something musty",
    desc: "Mold hides before you can see it. We find the moisture source and treat it before it spreads through your home.",
    img: imgSvcMold as string,
    span: "lg:col-span-2",
  },
  {
    id: "ins",
    cat: "Insulation",
    title: "My home is always too hot or cold",
    desc: "Poor insulation forces your HVAC to work overtime. We seal the gaps so you stay comfortable and cut energy bills.",
    img: imgSvcInsulation as string,
    span: "lg:col-span-2",
  },
];

function ServiceCard({ s, onNavigate }: { s: typeof SERVICES[0]; onNavigate?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative overflow-hidden group cursor-pointer ${s.span}`}
      style={{ minHeight: s.tall ? 480 : 260 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onNavigate}
    >
      <ImageWithFallback src={s.img} alt={s.cat} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {/* Default dark gradient */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "linear-gradient(0deg,rgba(10,11,20,.92) 0%,rgba(10,11,20,.3) 60%,transparent 100%)", opacity: hovered ? 0 : 1 }} />
      {/* Hover blue overlay */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{ background: `linear-gradient(0deg,${NAVY} 0%,rgba(26,82,168,.8) 100%)`, opacity: hovered ? 1 : 0 }} />

      {/* Category chip */}
      <div className="absolute top-5 left-5 px-3 py-1"
        style={{ background: "rgba(196,171,108,.2)", border: "1px solid rgba(196,171,108,.4)" }}>
        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>{s.cat}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: s.tall ? 32 : 22, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
          {s.title}
        </h3>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: .3 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.6, marginBottom: 16 }}
        >
          {s.desc}
        </motion.p>
        <motion.button
          onClick={onNavigate}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: .3, delay: .05 }}
          className="inline-flex items-center gap-2"
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, letterSpacing: .5, background: "none", border: "none", cursor: "pointer" }}
        >
          Explore solution
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.button>
      </div>
    </div>
  );
}

// ─── Signs / Problem Selector ─────────────────────────────────────────────────
// Sitemap: Home > "SYMPTOM ENTRY POINTS" — these four labels are verbatim from
// the sitemap; the category and route point at the owning service page.
const SIGNS = [
  { cat: "Crawl Space Repair", slug: "crawl-space-repair", label: "My floors are sinking",     img: getSymptomImage("My floors are sagging, bouncy, or buckling.") },
  { cat: "Waterproofing",      slug: "waterproofing",      label: "My basement is wet",        img: getSymptomImage("Water getting in to basement or other.") },
  { cat: "Structural Repair",  slug: "structural-repair",  label: "I see wall cracks",         img: getSymptomImage("Cracks in exterior or interior walls") },
  { cat: "Concrete Services",  slug: "concrete-services",  label: "Uneven concrete / driveway", img: getSymptomImage("Uneven concrete slabs") },
];

function SignsSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="py-20 px-8 md:px-14" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto flex flex-col gap-14">
        <Reveal>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
            What are you dealing with?
          </p>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.8vw,62px)", color: ON_DARK.heading, lineHeight: 1.0, letterSpacing: "-1px" }}>
            What are you dealing with?
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNS.map((s, i) => (
            <Reveal key={s.cat} delay={i * 0.07}>
              <div onClick={() => onNavigate(`service/${s.slug}#signs`)} className="flex flex-col cursor-pointer group overflow-hidden"
                style={{ background: CHAR, border: "1px solid rgba(255,255,255,.12)" }}>
                {/* Photo first — homeowners pick their problem by sight. */}
                <div className="relative overflow-hidden shrink-0" style={{ height: 150 }}>
                  <ImageWithFallback src={s.img} alt={s.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(30,34,53,.85) 0%, rgba(30,34,53,0) 60%)" }} />
                </div>
                <div className="flex flex-col gap-2 p-7">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
                  {s.cat}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", lineHeight: 1.3, whiteSpace: "pre-line" }}>
                    {s.label}
                  </p>
                  <div className="shrink-0 flex items-center justify-center w-11 h-11 transition-colors group-hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,.25)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Overview (sitemap: Home > "Services Overview (cards)") ─────────
// The sitemap's Home node lists three overview cards. Their labels there
// ("Foundation repair") predate the Services branch, so the cards carry the
// official service names and route to the matching service page.
const HOME_SERVICE_CARDS = [
  {
    slug: "structural-repair",
    cat: "Structural Repair",
    // Symptom-led headline, verbatim from the sitemap's home symptom entry points.
    title: "I see wall cracks",
    desc: "Push piers, wall anchors, and slab repair that stop foundation movement permanently.",
    img: imgSvcFoundation as string,
    tags: ["Slab Repair", "Wall Stabilization", "Lintel Repair"],
  },
  {
    slug: "waterproofing",
    cat: "Waterproofing",
    title: "My basement is wet",
    desc: "Interior drainage and exterior membranes keep water where it belongs.",
    img: imgSvcWaterproofing as string,
    tags: [],
  },
  {
    slug: "concrete-services",
    cat: "Concrete Services",
    title: "Uneven concrete / driveway",
    desc: "Foam injection lifts sunken slabs without full replacement. Fast, clean, permanent.",
    img: imgSvcConcrete as string,
    tags: [],
  },
];

function ServicesSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [lead, ...rest] = HOME_SERVICE_CARDS;
  return (
    <section style={{ background: CREAM }} className="py-24 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
              Services
            </p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(40px,4.5vw,64px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
              What We Repair<br />and Restore
            </h2>
          </div>
          <button onClick={() => onNavigate("services-landing")} className="group inline-flex items-center gap-2 px-6 py-3 shrink-0"
            style={{ border: `1.5px solid ${CHAR}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: CHAR, background: "none", cursor: "pointer" }}>
            All services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* Lead card — horizontal: image LEFT · content RIGHT */}
          <Reveal delay={0} className="lg:col-span-2">
            <div className="relative overflow-hidden group cursor-pointer flex flex-col lg:flex-row lg:h-[500px]" style={{ background: CHAR }}
              onClick={() => onNavigate(`service/${lead.slug}`)}>
              <div className="relative shrink-0 overflow-hidden h-52 sm:h-64 lg:h-full lg:w-1/2">
                <ImageWithFallback src={lead.img} alt={lead.cat}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(26,82,168,0.08) 0%, transparent 60%)" }} />
              <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-[1px]" style={{ background: SAND }} />
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>{lead.cat}</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", lineHeight: 1.08, marginBottom: 14 }}>{lead.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.52)", lineHeight: 1.7, marginBottom: 22 }}>
                  {lead.desc}
                </p>
                <div className="flex flex-col gap-2 mb-7">
                  {lead.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-2 px-3 py-1.5 w-fit"
                      style={{ background: "rgba(196,171,108,.07)", border: "1px solid rgba(196,171,108,.22)" }}>
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: SAND }} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(196,171,108,.8)", letterSpacing: 1 }}>{tag}</span>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                  <span>Explore</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Remaining cards — vertical: image TOP · content BOTTOM */}
          {rest.map((card, i) => (
            <Reveal key={card.slug} delay={0.08 + i * 0.08}>
              <div className="relative overflow-hidden group cursor-pointer flex flex-col h-[420px] lg:h-[500px]" style={{ background: CHAR }}
                onClick={() => onNavigate(`service/${card.slug}`)}>
                <div className="relative overflow-hidden shrink-0" style={{ height: "42%" }}>
                  <ImageWithFallback src={card.img} alt={card.cat}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, rgba(26,82,168,0.12) 0%, transparent 50%)" }} />
                <div className="flex flex-col justify-between flex-1 p-6 pt-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-[1px]" style={{ background: SAND }} />
                      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>{card.cat}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 27, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>{card.title}</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.48)", lineHeight: 1.65 }}>
                      {card.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                    <span>Explore</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Section ──────────────────────────────────────────────────────────────
const WHY_PILLARS = [
  { title: "Family-Owned",       desc: "Independent since 2008, not a franchise",              icon: <Home size={26} strokeWidth={1.6} />,       highlight: true  },
  { title: "Engineered",         desc: "Solutions designed to last, not bandaids",             icon: <Hammer size={26} strokeWidth={1.6} />,     highlight: false },
  { title: "Certified",          desc: "Every installer trained and certified",                icon: <BadgeCheck size={26} strokeWidth={1.6} />, highlight: false },
  { title: "Guaranteed",         desc: "Lifetime transferable warranty on every job",          icon: <ShieldCheck size={26} strokeWidth={1.6} />,highlight: false },
  { title: "12,000+",            desc: "Satisfied customers",                                  icon: <Users size={26} strokeWidth={1.6} />,      highlight: false },
  { title: "Evergreen difference",desc: "Caring for every home as if it were our own.",        icon: <Leaf size={26} strokeWidth={1.6} />,       highlight: false },
];

function WhySection() {
  return (
    <section className="relative overflow-hidden py-24 px-8 md:px-14" style={{ background: "#053770" }}>
      {/* Decorative diagonal */}
      <div className="absolute right-[-96px] top-0 h-full w-[55%] hidden lg:block pointer-events-none"
        style={{ background: "rgba(255,255,255,.02)", transform: "skewX(-8deg)", transformOrigin: "top right" }} />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left — text */}
          <div className="lg:w-[46%] shrink-0 flex flex-col gap-6 justify-center">
            <Reveal>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 700, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
                Why Redeemers Structural
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(40px,4.8vw,62px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
                The steady, local authority on structural problems.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.55)", lineHeight: 1.75 }}>
                Family-owned since 2008. We focus on one thing: fixing the root cause of structural and water problems <strong style={{ color: "rgba(255,255,255,.75)", fontWeight: 700 }}>permanently</strong>, not temporarily.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#" className="group inline-flex items-center gap-3 self-start"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", padding: "16px 28px" }}>
                Meet the Team
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>

          {/* Right — 2×3 card grid */}
          <div className="lg:w-[46%] grid grid-cols-2 gap-4">
            {WHY_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 + i * 0.06}>
                <div className="flex flex-col h-full justify-center" style={{
                  background: p.highlight ? CHAR : "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.07)",
                  padding: "28px",
                  minHeight: 205,
                }}>
                  {/* Icon box */}
                  <div className="flex items-center justify-center mb-6 shrink-0"
                    style={{
                      width: 44, height: 44,
                      background: p.highlight ? "rgba(255,255,255,.15)" : "rgba(196,171,108,.1)",
                      border: `1px solid ${p.highlight ? "rgba(255,255,255,.25)" : "rgba(196,171,108,.25)"}`,
                    }}>
                    {React.cloneElement(p.icon as React.ReactElement, { color: p.highlight ? "#fff" : SAND })}
                  </div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>{p.title}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Slider ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.",
    name: "Victoria E.",
    loc: "Memphis, TN",
    stars: 5,
    img: imgRevThumb1,
    avatar: imgRevAvatar,
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!",
    name: "Elizabeth N.",
    loc: "Collierville, TN",
    stars: 5,
    img: imgRevThumb2,
    avatar: imgRevAvatar,
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.",
    loc: "Marked Tree, AR",
    stars: 5,
    img: imgRevThumb3,
    avatar: imgRevAvatar,
  },
];

function TestimonialsSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section style={{ background: CREAM }} className="py-24 overflow-hidden">
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
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)" }}>
              {/* Video / image thumb */}
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img as string} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.45)" }}>
                  <button className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                {/* Giant quote mark */}
                <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(26,82,168,.15)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.75, flex: 1, marginBottom: 24 }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,.07)" }}>
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "#eee" }}>
                    <ImageWithFallback src={t.avatar as string} alt={t.name} className="w-full h-full object-cover" />
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

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10 px-8">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(0,0,0,.15)" }} />
        ))}
      </div>
    </section>
  );
}

// ─── Case Studies (Photo Grid with Hover) ────────────────────────────────────
const CASES = [
  { tag: "Crawl Space", loc: "Memphis, TN", title: "East Memphis Ranch Home", desc: "SmartJack + full encapsulation. Done in 2 days.", img: imgCaseRanch, wide: true },
  { tag: "Foundation", loc: "Memphis, TN", title: "Midtown Duplex", desc: "6 push piers. Clay soil corrected. Lifetime warranty.", img: imgCaseDuplex, wide: false },
  { tag: "Concrete", loc: "Nashville, TN", title: "Nashville Townhome", desc: "Interior drainage + sump. Zero water in 3 years.", img: imgCaseTownhome, wide: false },
];

function CaseCard({ c, i }: { c: typeof CASES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={i * 0.1} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ height: i === 0 ? 520 : 248 }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <ImageWithFallback src={c.img as string} alt={c.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.9) 0%,rgba(10,11,20,.2) 60%,transparent 100%)" }} />
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{ background: `linear-gradient(0deg,${NAVY} 0%,rgba(26,82,168,.5) 100%)`, opacity: hov ? 1 : 0 }} />
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="px-3 py-1" style={{ background: "rgba(196,171,108,.2)", border: "1px solid rgba(196,171,108,.35)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>{c.tag}</span>
          <span className="px-3 py-1" style={{ background: "rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.65)" }}>{c.loc}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: i === 0 ? 28 : 20, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>{c.title}</h3>
          <motion.p animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 10 }} transition={{ duration: .25 }}
            style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 12 }}>
            {c.desc}
          </motion.p>
          <motion.a href="#" animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: .25, delay: .05 }}
            className="inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
            Read story
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.a>
        </div>
      </div>
    </Reveal>
  );
}

function CaseStudiesSection() {
  return (
    <section className="py-24 px-8 md:px-14" style={{ background: SURFACE.base }}>
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
              Featured Projects
            </p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(40px,4.5vw,64px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
              Real Homes, Real Results
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 shrink-0"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, borderBottom: `1px solid ${B}`, paddingBottom: 2 }}>
            View all projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
        <div className="flex flex-col gap-3">

          {/* ── CASE 1 — Hero Split: stacks on mobile, side-by-side on desktop ── */}
          <Reveal delay={0}>
            <div className="relative flex flex-col lg:flex-row overflow-hidden lg:h-[580px]">

              {/* Image — top on mobile, right on desktop */}
              <div className="order-1 lg:order-2 relative lg:flex-1 overflow-hidden group h-56 sm:h-72 lg:h-full">
                <ImageWithFallback src={CASES[0].img as string} alt={CASES[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>

              {/* Content panel — bottom on mobile, left on desktop */}
              <div className="order-2 lg:order-1 relative flex flex-col justify-between w-full lg:w-[44%] lg:shrink-0 z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
                style={{ background: "#053770" }}>

                <div>
                  <div className="flex items-center gap-3 mb-5 lg:mb-10">
                    <span className="px-3 py-1" style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>{CASES[0].tag}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.45)" }}>{CASES[0].loc}</span>
                    <span className="ml-auto hidden sm:inline" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 13, color: "rgba(255,255,255,.1)", letterSpacing: 2 }}>01</span>
                  </div>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,72px)", color: "#fff", lineHeight: 0.93, letterSpacing: "-1px", textTransform: "uppercase", marginBottom: 16 }}>
                    East<br />Memphis<br />Ranch<br />Home
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
                    {CASES[0].desc}
                  </p>
                </div>

                <div className="mt-6 lg:mt-0">
                  <div className="flex gap-6 lg:gap-10 mb-6 lg:mb-8 pt-5 lg:pt-7" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                    {[["2", "Days to\ncomplete"], ["100%", "Moisture\neliminated"], ["∞", "Lifetime\nwarranty"]].map(([val, label]) => (
                      <div key={val + label}>
                        <div style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(22px,3vw,34px)", color: SAND, lineHeight: 1 }}>{val}</div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <a href="#" className="group inline-flex items-center gap-2"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                    Read story
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── ROW 2 — Cases 2 + 3: stack on mobile, side by side on desktop ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">

            {/* Case 2 — Photo top, blue panel bottom */}
            <Reveal delay={0.1} className="sm:col-span-1 lg:col-span-7">
              <div className="overflow-hidden group cursor-pointer flex flex-col h-[300px] sm:h-[340px] lg:h-[400px]">
                {/* Photo */}
                <div className="relative overflow-hidden flex-1">
                  <ImageWithFallback src={CASES[1].img as string} alt={CASES[1].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1" style={{ background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.35)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{CASES[1].tag}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#fff" }}>{CASES[1].loc}</span>
                  </div>
                  <div className="hidden lg:block absolute top-2 right-4" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 110, color: "rgba(255,255,255,.05)", lineHeight: 1, letterSpacing: "-4px" }}>02</div>
                </div>
                {/* Blue content panel */}
                <div className="shrink-0 px-6 py-5 lg:px-8 lg:py-6 flex flex-col gap-2" style={{ background: "#053770" }}>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(24px,3vw,42px)", color: "#fff", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.5px" }}>{CASES[1].title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{CASES[1].desc}</p>
                  <a href="#" className="inline-flex items-center gap-2 group/link mt-1"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                    Read story
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/link:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Case 3 — Navy split: image strip top, bold type bottom */}
            <Reveal delay={0.2} className="sm:col-span-1 lg:col-span-5">
              <div className="relative overflow-hidden group cursor-pointer flex flex-col h-[300px] sm:h-[340px] lg:h-[400px]" style={{ background: "#053770" }}>
                {/* Image strip */}
                <div className="relative overflow-hidden shrink-0 h-[48%]">
                  <ImageWithFallback src={CASES[2].img as string} alt={CASES[2].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1" style={{ background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.35)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{CASES[2].tag}</span>
                  </div>
                  <div className="hidden lg:block absolute top-2 right-3" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 80, color: "rgba(255,255,255,.06)", lineHeight: 1 }}>03</div>
                </div>
                {/* Content */}
                <div className="flex flex-col justify-between flex-1 px-5 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
                  <div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)", display: "block", marginBottom: 4 }}>{CASES[2].loc}</span>
                    <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(22px,3vw,34px)", color: "#fff", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.5px", marginBottom: 8 }}>{CASES[2].title}</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>{CASES[2].desc}</p>
                  </div>
                  <a href="#" className="group/link inline-flex items-center gap-2"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                    Read story
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/link:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* View all projects CTA */}
        <div className="flex justify-center mt-14">
          <a href="#" className="group inline-flex items-center gap-4 px-7 py-4"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 15, color: "#fff" }}>
            View all projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

// ─── Service Area ─────────────────────────────────────────────────────────────
const AREA_DATA = [
  {
    state: "Tennessee", abbr: "TN",
    cities: ["Memphis", "Nashville", "Germantown", "Collierville", "Bartlett", "Brentwood", "Cordova"],
    projects: 2340, tagline: "From Memphis metro to Greater Nashville",
    highlight: "Most active market",
    phone: "(901) 555-0100",
  },
  {
    state: "Mississippi", abbr: "MS",
    cities: ["Jackson", "Southaven", "Olive Branch", "Horn Lake", "Hattiesburg"],
    projects: 847, tagline: "Delta region & Gulf Coast coverage",
    highlight: "Same-week availability",
    phone: "(601) 555-0100",
  },
  {
    state: "Arkansas", abbr: "AR",
    cities: ["Little Rock", "Jonesboro", "Fort Smith", "Conway", "Marked Tree"],
    projects: 1120, tagline: "Statewide service across Arkansas",
    highlight: "Free estimates",
    phone: "(501) 555-0100",
  },
  {
    state: "Missouri", abbr: "MO",
    cities: ["Springfield", "Cape Girardeau", "Joplin", "Poplar Bluff"],
    projects: 634, tagline: "Southeast Missouri & Ozarks coverage",
    highlight: "Expanding coverage",
    phone: "(417) 555-0100",
  },
];

function ServiceAreaSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const data = AREA_DATA[active];

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: CREAM }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:min-h-[720px]">

        {/* ── Left ── */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 2, background: B }} />
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 10, fontWeight: 700, color: B, letterSpacing: 4, textTransform: "uppercase" }}>
                We're in your neighborhood
              </p>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(38px,4.5vw,60px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 8 }}>
              Serving the<br />Mid-South<br />Since 2008
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.65, marginBottom: 36, maxWidth: 380 }}>
              Local crews, local knowledge. We know the soil, the climate, and the homes in your area.
            </p>

            {/* State selector */}
            <div className="flex flex-col gap-1.5 mb-8">
              {AREA_DATA.map((d, i) => (
                <motion.button
                  key={d.state}
                  onClick={() => setActive(i)}
                  layout
                  className="text-left overflow-hidden"
                  style={{
                    background: active === i ? "#fff" : "transparent",
                    borderLeft: `3px solid ${active === i ? B : "rgba(0,0,0,.1)"}`,
                    boxShadow: active === i ? "0 4px 20px rgba(0,0,0,.08)" : "none",
                    transition: "background .2s, box-shadow .2s",
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span style={{
                        fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 11,
                        color: active === i ? B : "rgba(0,0,0,.25)", letterSpacing: 2,
                      }}>{d.abbr}</span>
                      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: active === i ? CHAR : MUTED }}>
                        {d.state}
                      </span>
                      {d.highlight && active === i && (
                        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: B, letterSpacing: 1.5, textTransform: "uppercase", background: "rgba(26,82,168,.1)", padding: "2px 7px" }}>
                          {d.highlight}
                        </span>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: active === i ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke={active === i ? B : "rgba(0,0,0,.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED, marginTop: 12, marginBottom: 10 }}>{d.tagline}</p>
                          {/* City chips */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {d.cities.map((city) => (
                              <span key={city} style={{
                                fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500,
                                color: CHAR, background: "rgba(26,82,168,.07)",
                                border: "1px solid rgba(26,82,168,.15)", padding: "3px 10px",
                              }}>{city}</span>
                            ))}
                          </div>
                          {/* Stats + CTA */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: CHAR, lineHeight: 1 }}>{d.projects.toLocaleString()}+</p>
                              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED }}>projects in {d.state}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); openInspection(); }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 hover:opacity-90 transition-opacity"
                              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
                            >
                              Book in {d.abbr}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>
              Don't see your city? <button onClick={openInspection} style={{ color: B, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 12 }}>Ask us — we may still serve you.</button>
            </p>
          </motion.div>
        </div>

        {/* ── Right: Map + animated info card ── */}
        <div className="relative hidden lg:block">
          <img src={imgServiceAreaMap} alt="Service area map" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(247,245,239,.15) 0%, transparent 40%)" }} />

          {/* Animated state card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={data.state}
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute flex flex-col"
              style={{ top: "28%", left: 48, background: DARK, width: 270 }}
            >
              {/* Top accent bar */}
              <div style={{ height: 3, background: B }} />
              <div className="px-6 pt-5 pb-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 48, color: "#fff", lineHeight: 0.95, letterSpacing: "-2px" }}>{data.state}</p>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: SAND, marginTop: 4, letterSpacing: 1 }}>{data.abbr} · {data.projects.toLocaleString()}+ projects</p>
                  </div>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
                {/* Cities */}
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "rgba(255,255,255,.4)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Cities served</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.cities.slice(0, 5).map((city) => (
                      <span key={city} style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.6)", background: "rgba(255,255,255,.06)", padding: "2px 8px" }}>{city}</span>
                    ))}
                    {data.cities.length > 5 && (
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: SAND, padding: "2px 8px" }}>+{data.cities.length - 5} more</span>
                    )}
                  </div>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{data.tagline}</p>
                <button
                  onClick={openInspection}
                  className="w-full py-2.5 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
                >
                  Free inspection in {data.abbr}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust pills bottom-right */}
          <div className="absolute bottom-10 right-8 flex flex-col gap-2.5">
            {["Financing from $79/mo", "No money down", "Lifetime warranty"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2.5 px-4 py-2.5"
                style={{ background: "rgba(10,11,20,.82)", border: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(6px)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={SAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#fff", fontWeight: 500 }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative overflow-hidden py-32 px-8 md:px-14" style={{ background: "#00519F" }}>
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: "clamp(160px,25vw,340px)", fontWeight: 800, color: "rgba(255,255,255,.03)", lineHeight: 1, userSelect: "none", whiteSpace: "nowrap" }}>
        Get Ready
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
            Get started today
          </p>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 20 }}>
            Ready to Protect<br />Your Home?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.5)", lineHeight: 1.65, maxWidth: 480, marginBottom: 44 }}>
            Free inspection · No pressure · Same-week availability
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}>
              Schedule Free Inspection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { h: "Services", ls: ["Crawl Space", "Basement Waterproofing", "Foundation Repair", "Concrete Leveling", "Mold Prevention", "Insulation"] },
    { h: "Company", ls: ["About Us", "Our Work", "Blog", "Careers", "Financing", "Contact"] },
    { h: "Service Areas", ls: ["Mississippi", "Tennessee", "Arkansas", "Missouri"] },
    { h: "Careers", ls: ["Why Work With Us", "Job Positions", "Benefits", "Training Program"] },
  ];
  return (
    <footer style={{ background: SURFACE.footer }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-10">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="lg:w-72 shrink-0">
            <div className="h-20 mb-5"><Logo light /></div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              Free Inspection
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.9)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>{col.h}</p>
                <ul className="flex flex-col gap-2">
                  {col.ls.map((l) => (
                    <li key={l}>
                      <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.35)" }}
                        className="hover:text-white/70 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}>
            © 2026 Redeemers Structural Solutions. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}
                className="hover:text-white/40 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const initPage = window.location.hash.replace("#", "") || "home";
  const [page, setPage] = useState<"home" | "service" | "services-landing" | "problem-signs" | "problem-sign-inner" | "our-difference" | "resources" | "pricing" | "news-blog" | "blog-inner" | "about" | "careers" | "service-area" | "reviews" | "job-stories" | "contact" | "guiaestilos">(initPage.split("#")[0].split("/")[0] as any);
  // Increments on every navigate call — used as key prop to force page re-mount
  // even when navigating to the same page (e.g. service → service via megamenu).
  const [pageKey, setPageKey] = useState(0);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  // Routes look like "page", "page#anchor" or "page/<slug>#anchor" — the slug
  // picks which service definition ServicePage renders, or which problem sign
  // ProblemSignInnerPage renders.
  const [routeSlug, setRouteSlug] = useState<string | null>(() => {
    const [, slug] = initPage.split("#")[0].split("/");
    return slug ?? null;
  });

  const navigate = (p: string) => {
    const [route, anchor] = p.split("#");
    const [pageName, slug] = route.split("/");
    window.scrollTo(0, 0);
    window.location.hash = pageName === "home" ? "" : route;
    setPage(pageName as typeof page);
    setRouteSlug(slug ?? null);
    setScrollTarget(anchor ?? null);
    setPageKey((k) => k + 1);
  };

  if (page === "services-landing") {
    return <ServicesLandingPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  if (page === "service") {
    return <ServicePage key={pageKey} onBack={() => navigate("services-landing")} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} slug={routeSlug ?? undefined} />;
  }

  if (page === "problem-signs") {
    return <ProblemSignsPage key={pageKey} onBack={() => navigate("home")} onSignClick={(label) => {
      const sign = label ? getProblemSignByLabel(label) : undefined;
      navigate(sign ? `problem-sign-inner/${sign.slug}` : "problem-sign-inner");
    }} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} category={routeSlug ?? undefined} />;
  }

  if (page === "problem-sign-inner") {
    return <ProblemSignInnerPage key={pageKey} onBack={() => navigate("problem-signs")} onNavigate={navigate} slug={routeSlug ?? undefined} />;
  }

  if (page === "our-difference") {
    return <OurDifferencePage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} />;
  }

  if (page === "resources") {
    return <ResourcesPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} />;
  }

  if (page === "pricing") {
    return <PricingPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  if (page === "news-blog") {
    return <NewsBlogPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  if (page === "blog-inner") {
    return <BlogInnerPage key={pageKey} onBack={() => navigate("news-blog")} onNavigate={navigate} />;
  }

  if (page === "about") {
    return <AboutPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} />;
  }

  if (page === "careers") {
    return <CareersPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} />;
  }

  if (page === "service-area") {
    return <ServiceAreaPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  if (page === "reviews") {
    return <ReviewsPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  if (page === "job-stories") {
    return <JobStoriesPage key={pageKey} onBack={() => navigate("resources")} onNavigate={navigate} />;
  }

  if (page === "contact") {
    return <ContactPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} scrollTo={scrollTarget ?? undefined} />;
  }

  if (page === "guiaestilos") {
    return (
      <div>
        <button onClick={() => navigate("home")}
          style={{ position: "fixed", top: 16, left: 16, zIndex: 1000, background: "#1E2235", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 13 }}>
          ← Volver
        </button>
        <GuiaEstilosPage />
      </div>
    );
  }

  const KNOWN_PAGES = [
    "home", "service", "services-landing", "problem-signs", "problem-sign-inner",
    "our-difference", "resources", "pricing", "news-blog", "blog-inner", "about",
    "careers", "service-area", "reviews", "job-stories", "contact", "guiaestilos",
  ];

  if (!KNOWN_PAGES.includes(page)) {
    return <NotFoundPage key={pageKey} onBack={() => navigate("home")} onNavigate={navigate} />;
  }

  return (
    <>
      {/* Fixed header — sits above everything, transparent on hero, glassmorphism on scroll */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={navigate} transparent />
      </div>

      {/* Page content — hero starts at viewport top, header overlays it */}
      <div className="w-full min-h-screen bg-white">
        <HeroSlider onNavigate={navigate} />
        <SignsSection onNavigate={navigate} />
        <ServicesSection onNavigate={navigate} />
        <WhySection />
        <TestimonialsSection onNavigate={navigate} />
        <CaseStudiesSection />
        <ServiceAreaSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
