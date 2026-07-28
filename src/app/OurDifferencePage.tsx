import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, animate, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, ArrowRight, X } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import useEmblaCarousel from "embla-carousel-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
import { B, DARK, NAVY, CHAR, SAND, CREAM, MUTED, SURFACE, ON_LIGHT, ON_DARK } from "./theme";

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
  { id: "news-awards", label: "News & awards" },
  { id: "case-studies", label: "Featured projects / case stories" },
  { id: "before-after", label: "Before & after" },
  { id: "referral", label: "Referral program" },
  { id: "love-well", label: "Love Well Initiative" },
  { id: "certifications", label: "Affiliations & certifications" },
];

// ─── 1. HERO (DARK) ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 560 }}>
      <ImageWithFallback
        src={imgFloor04}
        alt="Our Difference" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(10,11,20,0.92) 0%,rgba(10,11,20,0.68) 55%,rgba(10,11,20,0.40) 100%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-24 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-5">
          <div className="w-5 h-[2px]" style={{ background: SAND }} />
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Our Difference</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,64px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 24, maxWidth: 760 }}>
          Why families choose Redeemers Group
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.6)", lineHeight: 1.75, maxWidth: 540, marginBottom: 44 }}>
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
    <section style={{ background: SURFACE.base, borderBottom: "1px solid rgba(10,11,20,.06)" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center gap-2">
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: B, lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.4)", letterSpacing: 1.5, textTransform: "uppercase" }}>{s.label}</p>
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
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(10,11,20,.55)" }}>Four simple steps — no surprises, no pressure.</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="group flex flex-col h-full" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={step.img} alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.6) 0%,transparent 65%)" }} />
                  <div className="absolute top-4 left-4 px-2.5 py-1" style={{ background: B }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: 1 }}>{step.n}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 18, color: CHAR, lineHeight: 1.2, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.5)", lineHeight: 1.7 }}>{step.desc}</p>
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
function StorySection() {
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
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(10,11,20,.6)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 18 }}>
                Redeemers Group started the way most small businesses do — out of frustration. Our founder had a crawl space problem that three national contractors quoted wrong, fixed halfway, or simply never called back about.
              </p>
              <p>
                So he got certified, hired locally, and built the company he wished existed: one that treats every Memphis homeowner the way you'd want a neighbor treated. Privately owned, community rooted, no franchise overhead passing costs to you.
              </p>
            </div>
            <a href="#" className="group mt-8 inline-flex items-center gap-2 px-7 py-4 transition-all hover:border-white/40"
              style={{ border: `1.5px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: CHAR }}>
              Contact Us
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="relative overflow-hidden" style={{ borderRadius: 2 }}>
              <ImageWithFallback
                src={imgFloor03}
                alt="Redeemers team" className="w-full object-cover" style={{ height: 340 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.55) 0%,transparent 55%)" }} />
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
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.4)", letterSpacing: 0.5 }}>{s.label}</p>
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

// Redesign brief: the old layout was two color-coded twin cards (sand-tinted
// "never" box mirroring a blue-tinted "always" box) — a comparison-card
// template. This version is one bordered ledger, not two boxes: a single
// sheet split by one hairline rule, with a wax-seal badge straddling the
// divider — an actual "pledge" motif — instead of matching icon chips.
function PledgeSection() {
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

        <Reveal delay={0.05}>
          <div className="relative" style={{ border: "1px solid rgba(10,11,20,.1)", background: "#fff" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* We will never */}
              <div className="px-8 md:px-12 py-10 lg:py-12" style={{ borderRight: "1px solid rgba(10,11,20,.1)" }}>
                <div className="flex items-center gap-3 mb-7">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke={MUTED} strokeWidth="1.6" opacity="0.5" />
                    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: CHAR, letterSpacing: "-0.5px" }}>
                    We will never
                  </h3>
                </div>
                <div className="flex flex-col">
                  {NEVER_DO.map((item, i) => (
                    <div key={i} className="flex gap-4 py-4" style={{ borderTop: i > 0 ? "1px solid rgba(10,11,20,.07)" : "none" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ marginTop: 3 }}>
                        <path d="M6 6l12 12M18 6L6 18" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14.5, color: CHAR, marginBottom: 3 }}>{item.title}</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* We always will */}
              <div className="px-8 md:px-12 py-10 lg:py-12">
                <div className="flex items-center gap-3 mb-7">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke={B} strokeWidth="1.6" opacity="0.5" />
                    <path d="M8 12.3l2.6 2.6L16.3 9" stroke={B} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: CHAR, letterSpacing: "-0.5px" }}>
                    We always will
                  </h3>
                </div>
                <div className="flex flex-col">
                  {ALWAYS_WILL.map((item, i) => (
                    <div key={i} className="flex gap-4 py-4" style={{ borderTop: i > 0 ? "1px solid rgba(10,11,20,.07)" : "none" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ marginTop: 3 }}>
                        <path d="M5 12.5l4.5 4.5L19 7" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14.5, color: CHAR, marginBottom: 3 }}>{item.title}</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wax-seal badge straddling the divider — the pledge motif */}
            <div className="hidden lg:flex absolute flex-col items-center justify-center" style={{
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 88, height: 88, borderRadius: "50%",
              background: NAVY, border: "4px solid #fff",
              boxShadow: "0 10px 28px rgba(10,11,20,.18)",
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
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely! Very professional company.",
    name: "Elizabeth N.", loc: "Collierville, TN", stars: 5,
    img: imgFloor03, avatar: imgRevAvatar,
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5,
    img: imgFloor04, avatar: imgRevAvatar,
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
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)" }}>
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.45)" }}>
                  <button className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
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
                <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(26,82,168,.15)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.75, flex: 1, marginBottom: 24 }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,.07)" }}>
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ background: "#eee" }}>
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
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(0,0,0,.15)", border: "none", cursor: "pointer", padding: 0 }} />
        ))}
      </div>
    </section>
  );
}

// ─── 7. CASE STUDIES — bento masonry (CREAM / light) ────────────────────────

type CaseCard = {
  title: string | null;
  items: string[];
  img: string;
  aspect: "16/9" | "1/1" | "fill";
  gallery: { img: string; caption: string }[];
  story: string[];
};

const CASE_LEFT: CaseCard[] = [
  {
    title: "Lifetime warranty",
    items: [
      "Covers all parts and labour for the life of your home",
      "Fully transferable when you sell",
      "No fine print, no annual fees",
    ],
    img: imgFloor01,
    aspect: "16/9",
    gallery: [
      { img: imgFloor01, caption: "Foundation repair completed under our lifetime warranty" },
      { img: imgFloor04, caption: "Final inspection sign-off with the homeowner" },
      { img: imgFloor03, caption: "Documentation handed over for transfer on resale" },
    ],
    story: [
      "Every job we complete is backed by a lifetime warranty covering all parts and labour — not a limited-year policy with exceptions buried in fine print.",
      "When a homeowner in this case called us back four years after the original repair with a new, unrelated concern, our crew returned at no cost, diagnosed the issue, and resolved it under the same warranty terms issued at signing.",
      "Because the warranty is fully transferable, the coverage moved with the house when it sold the following year — one less thing for the buyer and seller to negotiate.",
    ],
  },
  {
    title: "Our promise on inspections",
    items: [
      "Free, no obligation, ever",
      "No commissioned sales pressure",
      "Root-cause diagnosis, not upselling",
    ],
    img: imgFloor04,
    aspect: "1/1",
    gallery: [
      { img: imgFloor04, caption: "Initial walkthrough and crawl space assessment" },
      { img: imgFloor02, caption: "Root-cause diagnosis before any quote is written" },
      { img: imgFloor01, caption: "Plain-language report delivered same day" },
    ],
    story: [
      "Our inspectors are not paid commission on the repairs they recommend, so every inspection starts and ends with what the home actually needs.",
      "In this case, the homeowner had already been quoted a full foundation replacement by another company. Our root-cause diagnosis found a single failed downspout was the source of the moisture — a repair a fraction of the size.",
      "The inspection stayed free and obligation-free throughout, and the written report was handed over the same afternoon, no pressure to sign on the spot.",
    ],
  },
];

const CASE_RIGHT: CaseCard[] = [
  {
    title: "Satisfaction guarantee",
    items: [
      "If you are not satisfied, we come back — free of charge",
      "Dedicated post-installation follow-up call",
    ],
    img: imgFloor03,
    aspect: "1/1",
    gallery: [
      { img: imgFloor03, caption: "Installation day — crew on site" },
      { img: imgFloor01, caption: "Follow-up call two weeks after completion" },
      { img: imgFloor04, caption: "Return visit to fine-tune final leveling" },
    ],
    story: [
      "Every installation ends with a dedicated follow-up call, not an invoice and a goodbye.",
      "During that call on this project, the homeowner mentioned a door that still stuck slightly. Under our satisfaction guarantee, the same crew returned within the week, free of charge, and adjusted the leveling until it closed cleanly.",
      "No new estimate, no new invoice — just the job finished the way it was promised.",
    ],
  },
  {
    title: "Moisture & mold control",
    items: [
      "Every repair includes a full moisture assessment",
      "Encapsulation stops future damage at the source",
      "Mold remediation included when needed",
    ],
    img: imgFloor02,
    aspect: "fill",
    gallery: [
      { img: imgFloor02, caption: "Crawl space before encapsulation" },
      { img: imgFloor03, caption: "Vapor barrier and drainage matting installed" },
      { img: imgFloor04, caption: "Mold remediation in the affected joists" },
      { img: imgFloor01, caption: "Sealed, dry crawl space — job complete" },
    ],
    story: [
      "A full moisture assessment is standard on every job, whether the homeowner asked for it or not.",
      "In this case, what started as a request to fix a bouncy floor turned up active mold on two joists once we opened the crawl space. We scoped remediation and full encapsulation into the same visit rather than sending a second crew later.",
      "The result: structural repair, moisture control, and mold remediation closed out in one engagement, with drainage matting added to stop the source of the moisture for good.",
    ],
  },
];

const CASE_LEFT_MORE: CaseCard[] = [
  {
    title: "Same-day emergency response",
    items: [
      "Priority scheduling for active water intrusion or structural risk",
      "On-site within 24 hours in most service areas",
      "Temporary stabilization if full repair needs to be scheduled",
    ],
    img: imgFloor02,
    aspect: "16/9",
    gallery: [
      { img: imgFloor02, caption: "Active water intrusion at time of call" },
      { img: imgFloor03, caption: "Crew on-site within 24 hours" },
      { img: imgFloor01, caption: "Temporary stabilization while parts were ordered" },
    ],
    story: [
      "A burst supply line had flooded the crawl space overnight, and the homeowner was worried about mold setting in before anyone could get out to look at it.",
      "Our on-call crew was on-site the next morning, extracted standing water, and installed temporary drying equipment while the full encapsulation was scheduled for later that week.",
      "No mold took hold, and the permanent fix went in on the originally quoted timeline.",
    ],
  },
  {
    title: "Transparent, itemized pricing",
    items: [
      "Every quote broken down by line item, not a lump sum",
      "Financing options presented before any work begins",
      "Price shown in writing never changes once signed",
    ],
    img: imgFloor01,
    aspect: "1/1",
    gallery: [
      { img: imgFloor01, caption: "Itemized quote reviewed with the homeowner" },
      { img: imgFloor04, caption: "Financing options explained upfront" },
      { img: imgFloor02, caption: "Signed quote — price locked in" },
    ],
    story: [
      "The homeowner had been burned before by a contractor whose final invoice didn't match the verbal estimate.",
      "We walked through an itemized, written quote line by line before any work started, including financing options so there were no surprises about cost or terms.",
      "The final invoice matched the signed quote exactly — no change orders, no added fees.",
    ],
  },
];

const CASE_RIGHT_MORE: CaseCard[] = [
  {
    title: "Locally owned, not a franchise",
    items: [
      "Family-owned and operated since day one",
      "Decisions made locally, not by a corporate office",
      "Profits reinvested in local crews and equipment",
    ],
    img: imgFloor04,
    aspect: "1/1",
    gallery: [
      { img: imgFloor04, caption: "Local crew on a Memphis-area job site" },
      { img: imgFloor01, caption: "Owner reviewing a project in person" },
    ],
    story: [
      "Being locally owned means the person who answers a complaint is the same person who can actually fix it — no corporate call center in another state.",
      "When a homeowner had a scheduling conflict during a multi-day job, ownership personally rearranged the crew's schedule to work around it.",
      "That kind of flexibility is only possible because every decision is made locally.",
    ],
  },
  {
    title: "Certified & insured crews",
    items: [
      "Every technician trained and certified in our repair methods",
      "Fully licensed and insured on every job",
      "Background-checked before ever entering a home",
    ],
    img: imgFloor03,
    aspect: "16/9",
    gallery: [
      { img: imgFloor03, caption: "Certified technician on a foundation job" },
      { img: imgFloor02, caption: "Crew briefing before work begins" },
      { img: imgFloor01, caption: "Job completed to certification standard" },
    ],
    story: [
      "A homeowner asked to see proof of insurance and certification before letting a crew into a home with young children — a fair and common request.",
      "We provided documentation on the spot, and the assigned technician's certification covered the exact repair method used on the job.",
      "Every crew member on every job carries that same documentation, not just the one sent out to answer questions.",
    ],
  },
];

function CaseCard({ card, delay, onOpen }: { card: CaseCard; delay: number; onOpen: (card: CaseCard) => void }) {
  const [hovered, setHovered] = useState(false);

  const containerStyle: React.CSSProperties =
    card.aspect === "fill"
      ? { minHeight: 380, border: "1px solid rgba(0,0,0,.09)" }
      : { aspectRatio: card.aspect, minHeight: 260, border: "1px solid rgba(0,0,0,.09)" };

  return (
    <Reveal delay={delay}>
      <div
        className="relative overflow-hidden w-full cursor-pointer"
        style={containerStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(card)}
      >
        {/* Image */}
        <ImageWithFallback
          src={card.img}
          alt={card.title ?? "Project"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "transform .7s ease", transform: hovered ? "scale(1.05)" : "scale(1)" } as React.CSSProperties}
        />

        {/* Permanent bottom gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(10,11,20,.92) 0%, rgba(10,11,20,.12) 60%)" }}
        />

        {/* Hover overlay darkens upper half */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "rgba(10,11,20,.58)" }}
        />

        {/* SAND chip — top left */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1"
          style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)" }}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
            Redeemers Group
          </span>
        </motion.div>

        {/* Default state: title only, fades out on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.3px" }}>
            {card.title}
          </h3>
        </motion.div>

        {/* Hover state: full content slides up */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-7"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 14 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.3px", marginBottom: 12 }}>
            {card.title}
          </h3>
          <ul className="flex flex-col gap-2 mb-5">
            {card.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: SAND }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={(e) => { e.stopPropagation(); openInspection(); }}
            className="group/cta inline-flex items-center gap-1.5 w-fit"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Schedule free inspection
            <ChevronRight size={13} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </Reveal>
  );
}

function CaseStudyModal({ card, onOpenChange }: { card: CaseCard | null; onOpenChange: (open: boolean) => void }) {
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
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50"
          style={{ background: "rgba(10,11,20,.78)" }}
        />
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

              {/* Gallery */}
              <div className="relative overflow-hidden" ref={emblaRef} style={{ background: DARK }}>
                <div className="flex">
                  {card.gallery.map((slide, i) => (
                    <div key={i} className="relative shrink-0 w-full" style={{ aspectRatio: "16/9" }}>
                      <ImageWithFallback
                        src={slide.img}
                        alt={slide.caption}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 px-6 py-4"
                        style={{ background: "linear-gradient(0deg, rgba(10,11,20,.85) 0%, rgba(10,11,20,0) 100%)" }}
                      >
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.85)" }}>
                          {slide.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrows */}
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 right-4 flex gap-1.5">
                  {card.gallery.map((_, i) => (
                    <button key={i} onClick={() => emblaApi?.scrollTo(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: cur === i ? 18 : 6, height: 6, background: cur === i ? SAND : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", padding: 0 }} />
                  ))}
                </div>
              </div>

              {/* Text content */}
              <div className="p-8 md:p-10">
                <DialogPrimitive.Title
                  style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", color: CHAR, letterSpacing: "-0.5px", marginBottom: 20 }}
                >
                  {card.title}
                </DialogPrimitive.Title>

                <div className="flex flex-col gap-4 mb-8">
                  {card.story.map((p, i) => (
                    <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.75 }}>
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="flex flex-col gap-2 mb-8">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: B }} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

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

function CaseStudiesSection() {
  const [activeCard, setActiveCard] = useState<CaseCard | null>(null);
  const [showMore, setShowMore] = useState(false);

  const leftCards = showMore ? [...CASE_LEFT, ...CASE_LEFT_MORE] : CASE_LEFT;
  const rightCards = showMore ? [...CASE_RIGHT, ...CASE_RIGHT_MORE] : CASE_RIGHT;

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

        {/* 2-column masonry bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-12">
            {leftCards.map((card, i) => (
              <CaseCard key={card.title} card={card} delay={(i % 2) * 0.1} onOpen={setActiveCard} />
            ))}
          </div>

          {/* Right column — offset down to create stagger */}
          <div className="flex flex-col gap-12 lg:mt-16">
            {rightCards.map((card, i) => (
              <CaseCard key={card.title ?? `img-${i}`} card={card} delay={0.05 + (i % 2) * 0.1} onOpen={setActiveCard} />
            ))}
          </div>
        </div>

        {!showMore && (
          <Reveal delay={0.15} className="flex justify-center mt-14">
            <button
              onClick={() => setShowMore(true)}
              className="group inline-flex items-center gap-2 px-7 py-3.5 transition-colors hover:bg-black/[0.03]"
              style={{ border: `1.5px solid ${B}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", cursor: "pointer" }}
            >
              View more
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        )}
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
      <span className="absolute top-4 left-4 px-2.5 py-1 pointer-events-none" style={{ background: "rgba(10,11,20,.65)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{beforeLabel}</span>
      <span className="absolute top-4 right-4 px-2.5 py-1 pointer-events-none" style={{ background: "rgba(10,11,20,.65)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{afterLabel}</span>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, width: 2, background: "#fff", transform: "translateX(-1px)", boxShadow: "0 0 10px rgba(0,0,0,.35)" }} />

      {/* Drag handle */}
      <div
        className="absolute rounded-full flex items-center justify-center pointer-events-none"
        style={{ left: `${pos}%`, top: "50%", width: 44, height: 44, transform: "translate(-50%,-50%)", background: "#fff", boxShadow: "0 4px 16px rgba(10,11,20,.35)" }}
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
// BEFORE_AFTER_STATS). The grid + category filter + pager below are the
// pattern to scale to the full set once all 377 are scraped into a JSON
// file — swap BEFORE_AFTER_PROJECTS for that JSON and PAGE_SIZE stays 6,
// matching the live site's page size.
const BEFORE_AFTER_PAGE_SIZE = 6;
const BEFORE_AFTER_CATEGORIES = ["All", ...Array.from(new Set(BEFORE_AFTER_PROJECTS.map((p) => p.tag)))];

// Fullscreen gallery — opened from the "See all" button on the compact teaser
// below. Keeps the filter + pager pattern out of the main page scroll so the
// single-page "Our Difference" (9 anchor sections, per the client's Jul-24 QA
// call — see OUR_DIFFERENCE_SECTIONS in SharedNavBar.tsx) doesn't grow taller
// for this one section. Swap BEFORE_AFTER_PROJECTS for the full 377-item JSON
// here once scraped; PAGE_SIZE stays 6, matching the live site's page size.
function BeforeAfterGalleryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const filtered = category === "All" ? BEFORE_AFTER_PROJECTS : BEFORE_AFTER_PROJECTS.filter((p) => p.tag === category);
  const pageCount = Math.max(1, Math.ceil(filtered.length / BEFORE_AFTER_PAGE_SIZE));
  const paged = filtered.slice(page * BEFORE_AFTER_PAGE_SIZE, page * BEFORE_AFTER_PAGE_SIZE + BEFORE_AFTER_PAGE_SIZE);

  const selectCategory = (c: string) => { setCategory(c); setPage(0); };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] overflow-y-auto rg-scroll-thin"
      style={{ background: SURFACE.base }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-14 py-5" style={{ background: SURFACE.base, borderBottom: `1px solid ${ON_LIGHT.border}` }}>
        <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.2vw,28px)", color: CHAR }}>
          All before &amp; after sets
        </h2>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors" style={{ border: `1.5px solid ${CHAR}`, background: "none", cursor: "pointer" }}>
          <X size={16} color={CHAR} />
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px mb-10" style={{ background: "rgba(10,11,20,.06)", border: `1px solid ${ON_LIGHT.border}` }}>
          {BEFORE_AFTER_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-6 px-4 text-center" style={{ background: SURFACE.base }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,32px)", color: B, lineHeight: 1, marginBottom: 4 }}>
                {s.val}
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.45)", letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {BEFORE_AFTER_CATEGORIES.map((c) => (
            <button key={c} onClick={() => selectCategory(c)}
              className="px-4 py-2 transition-colors"
              style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer",
                background: category === c ? B : "#fff",
                color: category === c ? "#fff" : CHAR,
                border: `1.5px solid ${category === c ? B : ON_LIGHT.border}`,
              }}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {paged.map((p) => (
            <div key={p.title} className="grid grid-cols-1 lg:grid-cols-5 gap-0" style={{ background: "#fff", border: `1px solid ${ON_LIGHT.border}` }}>
              <div className="lg:col-span-3">
                <BeforeAfterSlider before={p.before} after={p.after} />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-10">
                <div className="inline-flex items-center px-2.5 py-1 mb-4 w-fit" style={{ background: "rgba(26,82,168,.1)", border: "1px solid rgba(26,82,168,.2)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase" }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: CHAR, lineHeight: 1.25, marginBottom: 10 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, marginBottom: 16 }}>
                  {p.loc || p.tag}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3D4152", lineHeight: 1.7, marginBottom: 20 }}>
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {p.workDone.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M20 6L9 17l-5-5" stroke={B} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "#3D4152", lineHeight: 1.5 }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
              className="w-11 h-11 flex items-center justify-center transition-colors"
              style={{ border: `1.5px solid ${CHAR}`, opacity: page === 0 ? 0.3 : 1, cursor: page === 0 ? "default" : "pointer", background: "none" }}>
              <ChevronLeft size={15} color={CHAR} strokeWidth={2} />
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className="w-9 h-9 flex items-center justify-center transition-colors"
                style={{
                  fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer",
                  background: page === i ? B : "none",
                  color: page === i ? "#fff" : CHAR,
                  border: `1.5px solid ${page === i ? B : ON_LIGHT.border}`,
                }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={page === pageCount - 1}
              className="w-11 h-11 flex items-center justify-center transition-colors"
              style={{ border: `1.5px solid ${CHAR}`, opacity: page === pageCount - 1 ? 0.3 : 1, cursor: page === pageCount - 1 ? "default" : "pointer", background: "none" }}>
              <ChevronRight size={15} color={CHAR} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function BeforeAfterSection() {
  // watchDrag off: the slide itself hosts a drag-to-compare slider, so the
  // carousel only advances via the arrow buttons/dots — a swipe gesture would
  // otherwise fight the before/after handle for the same pointer drag.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, watchDrag: false });
  const [cur, setCur] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
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
            <button onClick={() => setGalleryOpen(true)}
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
                <div className="inline-flex items-center px-2.5 py-1 mb-4 w-fit" style={{ background: "rgba(26,82,168,.1)", border: "1px solid rgba(26,82,168,.2)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase" }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: CHAR, lineHeight: 1.25, marginBottom: 10 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, marginBottom: 16 }}>
                  {p.loc || p.tag}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3D4152", lineHeight: 1.7, marginBottom: 20 }}>
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {p.workDone.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M20 6L9 17l-5-5" stroke={B} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "#3D4152", lineHeight: 1.5 }}>{w}</span>
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
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(0,0,0,.15)", border: "none", cursor: "pointer", padding: 0 }} />
        ))}
      </div>

      <AnimatePresence>
        <BeforeAfterGalleryModal open={galleryOpen} onClose={() => setGalleryOpen(false)} />
      </AnimatePresence>
    </section>
  );
}

// ─── 8. NEWS & AWARDS (DARK) ─────────────────────────────────────────────────
const PROJECT_STORIES = [
  {
    title: "East Memphis — 3-bed ranch",
    desc: "Homeowner noticed soft spots in the floor. Inspection revealed 6 broken joists and active mold. Full SmartJack system + encapsulation. Job complete in 2 days.",
    img: imgFloor02,
    tag: "Crawl Space",
  },
  {
    title: "Midtown — duplex rental",
    desc: "Tenant reported sticking doors and visible wall cracks. Clay soil movement confirmed. 6 push piers installed. Tenants stayed in place during work.",
    img: imgFloor01,
    tag: "Foundation",
  },
  {
    title: "Germantown — pool deck",
    desc: "Pool deck had sunk 3 inches on one side. PolyLevel injection lifted and leveled in 4 hours. No demolition, no mess, same-day use.",
    img: imgFloor03,
    tag: "Concrete",
  },
];

function ProjectStoriesSection() {
  return (
    <section id="news-awards" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>News &amp; Awards</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.5vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              News and awards
            </h2>
          </div>
          <button className="group inline-flex items-center gap-2 shrink-0"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            See all (436)
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECT_STORIES.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="flex flex-col h-full" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                <div className="relative overflow-hidden group" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={card.img} alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.5) 0%,transparent 60%)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1" style={{ background: "rgba(10,11,20,.7)", border: "1px solid rgba(196,171,108,.4)" }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>{card.tag}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: CHAR, lineHeight: 1.2, marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.55)", lineHeight: 1.7, flex: 1, marginBottom: 16 }}>{card.desc}</p>
                  <button className="group inline-flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    Read full story
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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

// ─── Awards (sourced from redeemersgroup.com/about-us/awards.html) ──────────
type Award = { title: string; org: string; year: string; img?: string; date?: string };

const AWARDS: Award[] = [
  { title: "Memphis Business Journal Small Business Awards", org: "Memphis Business Journal", year: "2026", date: "June 2, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6a202bc8c9060_small-business-awards.jpeg" },
  { title: "Top Work Places, Top 3 Small Business", org: "Top Work Places", year: "2026", date: "February 4, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9437bfd18_image-12.jpg" },
  { title: "2025 Best Evergreen Company", org: "Industry Recognition", year: "2026", date: "March 17, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/69bc31ecc2ddc_image-8.jpg" },
  { title: "Commercial Appeal Top Workplaces 2024", org: "Commercial Appeal", year: "2025", date: "February 6, 2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/67a652585c968_img8180.jpg" },
  { title: "#24 Foundation Dealer in the Supportworks Network", org: "Supportworks", year: "2025", date: "April 11, 2025" },
  { title: "#20 Concrete Dealer in the Supportworks Network", org: "Supportworks", year: "2025", date: "April 11, 2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/680120502bd76_rgtop30concrete.png" },
  { title: "Memphis Business Journal Best Places to Work", org: "Memphis Business Journal", year: "2025", date: "September 9, 2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9470a6058_image-13.jpg" },
  { title: "Best Place To Work 2024", org: "Industry Recognition", year: "2024", date: "September 10, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb00bad945f_redeemers-12.jpg" },
  { title: "#47 Total Basement Systems Sales", org: "Contractor Nation", year: "2024", date: "September 21, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb01d70bdfa_cn-47-sales.png" },
  { title: "#18 for Total CleanSpace™ Sales", org: "Contractor Nation", year: "2024", date: "September 28, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb019619b80_cn-18-sales.png" },
  { title: "Contractor Nation Platinum Appointment Center Award", org: "Contractor Nation", year: "2024", date: "September 28, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb01464e979_cc-platinum.png" },
  { title: "Supportworks 2022 Most Improved by % Increase in Foundation Sales", org: "Supportworks", year: "2023", date: "April 13, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f073826f24_img2862.jpeg" },
  { title: "Supportworks 2022 Top 30 Dealer in Total Sales for Concrete Products", org: "Supportworks", year: "2023", date: "April 13, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f06326cfe0_img2860.jpeg" },
  { title: "Supportworks 2022 Top 50 in Total Sales for Foundation Products", org: "Supportworks", year: "2023", date: "April 13, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f057ac402e_img2859.jpeg" },
  { title: "2022 Watson Seal® Certified Dealer of the Year", org: "Watson Seal", year: "2023", date: "May 15, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6463d77e825e7_lumberkote-dealer-of-the-year.jpeg" },
  { title: "Germantown Education Foundation 2023 Run for Education Crystal Sponsorship", org: "Germantown Education Foundation", year: "2023", date: "May 31, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6477a42c3e669_gef-sponsorship-award.png" },
  { title: "BBB A+ Rating and Accreditation in Arkansas", org: "BBB", year: "2023", date: "July 1, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/64de4b43a9a33_img3741.jpg" },
  { title: "Best Places to Work 2023", org: "Industry Recognition", year: "2023", date: "September 12, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6511ea84d29f8_award.jpg" },
  { title: "Best Places to Work honoree", org: "Industry Recognition", year: "2022", date: "September 26, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6358548f5b0d7_img2180.jpg" },
  { title: "Spirit Award by The Memphis Business Journal", org: "Memphis Business Journal", year: "2022", date: "September 26, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/635856168b853_32ac9ccd-d20e-409b-b78a-59d9d80d3998.jpg" },
  { title: "Supportworks #20 Concrete Dealer 2021", org: "Supportworks", year: "2022", date: "April 7, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9aa198c09_sw-20-2021-concrete.png" },
  { title: "Supportworks TOP TEN NexusPro Dealer 2021", org: "Supportworks", year: "2022", date: "April 7, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9b65e9076_sw-9-2021-nexus.png" },
  { title: "Supportworks #35 Concrete Dealer 2021", org: "Supportworks", year: "2022", date: "April 7, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9bedb3b08_sw-35-2021-found-prod.png" },
  { title: "Angi's List Super Service Award 2021", org: "Angi", year: "2022", date: "February 1, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/62470f1a76af3_angi-2021.png" },
  { title: "Proud Member of the Collierville Chamber of Commerce", org: "Collierville Chamber of Commerce", year: "2022", date: "January 1, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e92d244f51_cvill-chamb-of-comm-member.png" },
  { title: "Enerbank 2021 Rising Star", org: "Enerbank", year: "2022", date: "May 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/62828cd35fe53_rising-star-2021.png" },
  { title: "BBB A+ Rating and Accreditation", org: "BBB", year: "2022", date: "May 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8391a47b0_bbb-accred-2020.png" },
  { title: "Best Places to Work 2018", org: "Industry Recognition", year: "2022", date: "May 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7f2952595_bptw-by-mbj-2018.png" },
  { title: "Small Business of the Year Honoree", org: "Industry Recognition", year: "2022", date: "September 6, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/635856b57b5bc_sba-logo-horizontal.jpg" },
  { title: "Top 20 dealer in crawlspace encapsulation for 2021-2022", org: "Contractor Nation", year: "2022", date: "September 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6358538dd1ff7_img2181.jpg" },
  { title: "Basement Systems Top 50 dealer 2021-2022 for waterproofing", org: "Basement Systems", year: "2022", date: "September 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/635852d8cd2f9_img2182.jpg" },
  { title: "HomeAdvisor Elite Service Professional", org: "HomeAdvisor", year: "2021", date: "January 1, 2021" },
  { title: "Basement Systems Dealer 2021 - top 50 in total sales", org: "Basement Systems", year: "2021", date: "June 1, 2021", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8b42a4299_cn-2021-45-totsales.png" },
  { title: "BBB A+ Rating and Accreditation 2021", org: "BBB", year: "2021", date: "December 12, 2021", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e841ef24a8_bbb-accred-2021.png" },
  { title: "Member of the West Tennessee Home Builders Association", org: "West Tennessee Home Builders Association", year: "2020", date: "January 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e93adf07ea_wtn-hba-rg-2020.png" },
  { title: "Member of the Greater Memphis Chamber", org: "Greater Memphis Chamber", year: "2020", date: "January 31, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7f4849400_greater-mem-chamb-member.png" },
  { title: "Basement Systems - ranked top twenty in 2020", org: "Basement Systems", year: "2020", date: "June 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8bda72beb_cn-2020-18-tot-sales.png" },
  { title: "Supportworks #22 Concrete Dealer 2020", org: "Supportworks", year: "2020", date: "June 10, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e91c7c4336_sw-2020-22-conc-prod.png" },
  { title: "Supportworks Top 50 Foundation Dealers 2020", org: "Supportworks", year: "2020", date: "June 12, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e923d485e9_sw-2020-40-found-div.png" },
  { title: "HomeAdvisor Seal of Approval", org: "HomeAdvisor", year: "2020", date: "July 1, 2020" },
  { title: "HopeWorks Employer of the Year 2020", org: "HopeWorks", year: "2020", date: "October 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e78dd219c6_2020-hopeworks-eer-of-the-year.png" },
  { title: "Redeemers Group MAAR's Premier Sponsor of 2020", org: "MAAR", year: "2020", date: "November 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7ad23cf16_maar-prem-sponsor-2022.png" },
  { title: "HomeAdvisor Top-Rated Professional", org: "HomeAdvisor", year: "2020", date: "December 1, 2020" },
  { title: "2018 Angie's List Super Service Award", org: "Angie's List", year: "2019", date: "January 16, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7848a339b_angies-list-2018-supser-award.png" },
  { title: "Supportworks Top 10 SmartJack Dealers 2019", org: "Supportworks", year: "2019", date: "April 12, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9016f0376_sw-2019-10-sj.png" },
  { title: "Supportworks #29 Foundation Support Dealer", org: "Supportworks", year: "2019", date: "April 12, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8f39db8c2_sw-2019-29-found-div.png" },
  { title: "Supportworks Top 20 Concrete Dealer 2019", org: "Supportworks", year: "2019", date: "April 12, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8d626dd2b_sw-2019-19-conc-prod.png" },
  { title: "#10 Dealer in Total CleanSpace Sales", org: "Contractor Nation", year: "2019", date: "September 21, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e77e55c81f_cn-2019-10-totsales.png" },
  { title: "#37 Dealer of Total Basement System Sales", org: "Contractor Nation", year: "2019", date: "September 21, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e781c02c81_cn-2019-37-totsales.png" },
  { title: "Milestone Award - 10 years authorized dealer", org: "Contractor Nation", year: "2018", date: "January 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7b0a4d18e_cn-2018-10-yrs-auth-dealer.png" },
  { title: "2018 MAAR Award", org: "MAAR", year: "2018", date: "February 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7a3d58bf6_maar-prem-spons-2018.png" },
  { title: "CNLIVE 2018 Award", org: "CNLIVE", year: "2018", date: "March 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5c0fe35aca2e9_img1259.jpg" },
  { title: "Constant Contact All-Star Solution Provider", org: "Constant Contact", year: "2018", date: "March 14, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5abe77a365f7f_screen-shot-2018-03-30-at-122222-pm.png" },
  { title: "#1 increase in entire Supportworks network in 2017", org: "Supportworks", year: "2018", date: "April 12, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5ad4fdfc8ba49_img2779.jpg" },
  { title: "#22 in Supportworks network for 2017", org: "Supportworks", year: "2018", date: "April 12, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e796f63648_sw-2017-22-found-div.png" },
  { title: "2018 Supportworks top 20 concrete dealer", org: "Supportworks", year: "2018", date: "April 15, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8cdccbbcf_sw-2018-19-conc-prod.png" },
  { title: "Basement Systems - ranked #22 in 2018", org: "Basement Systems", year: "2018", date: "June 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e88fc55b55_cn-2018-22-totsales.png" },
  { title: "Basement Systems - ranked #47", org: "Basement Systems", year: "2018", date: "June 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e885c5ccb5_bs-2018-47-totsales.png" },
  { title: "Memphis Business Journal Pacesetter: 2018", org: "Memphis Business Journal", year: "2018", date: "September 18, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5bb3e2482246a_acbj-48477logofinal.png" },
  { title: "2017 Angie's List Super Service Award", org: "Angie's List", year: "2017", date: "December 22, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e792e65bb0_angies-list-2017-supser-award.png" },
  { title: "Top 40 Under Forty", org: "Industry Recognition", year: "2017", date: "November 9, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e82a3a1a2a_40-under-40-coo-rg.png" },
  { title: "Inc. 5000 Rankings", org: "Inc. 5000", year: "2017", date: "August 16, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/59a6f64f46be3_a0060707000011.jpg" },
  { title: "Inc. 5000 - #17th fastest growing company", org: "Inc. 5000", year: "2017", date: "August 16, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/59a6f6b1b6f7d_a0060253000011.jpg" },
  { title: "Small Business Awards Executive of the Year", org: "Memphis Business Journal", year: "2017", date: "May 18, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7c14dade4_mbj-sm-bus-award.png" },
  { title: "Memphis Business Journal: 2017 Small Business Executive of the Year", org: "Memphis Business Journal", year: "2017", date: "May 2, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7dee50ed0_mbj-2017-sm-bus-award.png" },
  { title: "Supportworks ranks Redeemers Group #44 for 2016", org: "Supportworks", year: "2017", date: "March 17, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/58d17af838f0e_dsc01989.jpg" },
  { title: "Inc. 5000 - top construction company in the U.S.", org: "Inc. 5000", year: "2017", date: "August 16, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7b614b09a_inc-500-2017-fastest-growing-cos.png" },
  { title: "2017 Memphis Business Journal Pacesetters Award", org: "Memphis Business Journal", year: "2017", date: "August 24, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7c43abece_mbj-pacesetters-2016.png" },
  { title: "Ranked #43 in Basement System dealer network for waterproofing", org: "Basement Systems", year: "2017", date: "September 17, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7b8eb444f_bs-2017-43-tot-sales.png" },
  { title: "Ranked #17 in The US and Canada for Cleanspace", org: "Contractor Nation", year: "2017", date: "September 17, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7bb1a4caf_cs-2017-17-totsales.png" },
  { title: "One Million Square Foot Award", org: "Contractor Nation", year: "2017", date: "September 18, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7a0960861_cs-2017-1mil-sq-ft-installed.png" },
  { title: "#3 fastest growing company in the Mid-South", org: "Industry Recognition", year: "2016", date: "September 30, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/57fd2a48ad706_img2178.png" },
  { title: "Memphis Business Journal's Pacesetters Award", org: "Memphis Business Journal", year: "2016", date: "August 25, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/57bc8d4ca5d9d_mbjpacesetters-logo-2016.jpg" },
  { title: "FINALIST - Memphis Business Journal Small Business of the Year", org: "Memphis Business Journal", year: "2016", date: "April 11, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/sba-logo-2016-cropped.jpg" },
  { title: "2016 Foundation Supportworks Top 50 Sales", org: "Supportworks", year: "2016", date: "April 8, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e914583a80_sw-2018-44-tot-sales.png" },
  { title: "Basement Systems - top 50 waterproofing companies", org: "Basement Systems", year: "2016", date: "August 17, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e779f9a4f5_bs-2016-50-totsales.png" },
  { title: "Top 50 foundation repair companies in the world", org: "Industry Recognition", year: "2016", date: "August 17, 2016" },
  { title: "Enerbank 2016 Rising Star", org: "Enerbank", year: "2016", date: "November 30, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e83231abb7_2016-enerbank-rising-star.png" },
  { title: "Foundation Supportworks dealer - #40 spot", org: "Supportworks", year: "2015", date: "August 20, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/55815-up-close-award.jpg" },
  { title: "Basement Systems - ranked #53 in Waterproofing", org: "Basement Systems", year: "2015", date: "June 12, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e87ca36f88_bs-2016-30-cleanspace.png" },
  { title: "Basement Systems - ranked #66 in Waterproofing", org: "Basement Systems", year: "2015", date: "June 12, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8775a9df6_bs-2015-66-waterproof.png" },
  { title: "Basement Systems - ranked #39 in CleanSpace", org: "Basement Systems", year: "2015", date: "June 12, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8706cf5c5_bs-2015-39-clenspace.png" },
  { title: "Angie's List Super Service Award 2013 - Memphis Market", org: "Angie's List", year: "2014", date: "March 1, 2014", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7cdcac0c2_angies-list-2013-supser-award.png" },
  { title: "Top 50 FSI Dealer for 2013/2014", org: "Supportworks", year: "2014", date: "August 14, 2014", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e81e7e774b_sw-2014-43-tot-sales.png" },
  { title: "Basement Systems - ranked #53 in CleanSpace", org: "Basement Systems", year: "2014", date: "November 11, 2014", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e865e663da_bs-2014-53-bs.png" },
  { title: "Basement Systems - ranked #38 in CleanSpace", org: "Basement Systems", year: "2013", date: "November 1, 2013", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e85db0eeeb_bs-2013-38-cleanspace.png" },
  { title: "Basement Systems Milestone Award - 5 years authorized dealer", org: "Basement Systems", year: "2013", date: "December 31, 2013", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e84c614dba_bs-5-yr-dealer-awa.png" },
  { title: "Supportworks - Certificate of Installment", org: "Supportworks", year: "2008", date: "January 1, 2008", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9332a7880_sw-cert-of-installment.png" },
];

const AWARD_YEARS = ["All", ...Array.from(new Set(AWARDS.map((a) => a.year))).sort((a, b) => Number(b) - Number(a))];

function AwardCard({ award, onClick, clickable }: { award: Award; onClick: () => void; clickable: boolean }) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 flex flex-col gap-3"
      style={{ width: 190, cursor: clickable ? "pointer" : "default" }}
    >
      <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "1/1", background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
        {award.img ? (
          <ImageWithFallback src={award.img} alt={award.title} className="w-full h-full object-contain p-4" />
        ) : (
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: B, letterSpacing: 0.5, textAlign: "center", padding: 12, lineHeight: 1.3 }}>
            {award.org}
          </span>
        )}
        <div className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)" }}>
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#8A7238", letterSpacing: 1 }}>{award.year}</span>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: CHAR, lineHeight: 1.4, marginBottom: 2 }}>
          {award.title.length > 48 ? award.title.slice(0, 48) + "…" : award.title}
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED }}>{award.org}</p>
      </div>
    </div>
  );
}

function AwardModal({ award, onClose }: { award: Award | null; onClose: () => void }) {
  useEffect(() => {
    if (!award) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [award, onClose]);

  if (!award) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,.88)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[960px] flex flex-col lg:flex-row overflow-hidden"
        style={{ background: CHAR, height: "min(85vh, 580px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — award image */}
        <div className="lg:w-[52%] shrink-0 relative flex items-center justify-center" style={{ background: DARK }}>
          {award.img ? (
            <ImageWithFallback src={award.img} alt={award.title} className="absolute inset-0 w-full h-full object-contain p-10" />
          ) : (
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, textAlign: "center", padding: 40 }}>{award.org}</span>
          )}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 2.5, textTransform: "uppercase", background: B, padding: "3px 8px" }}>{award.year}</span>
          </div>
        </div>

        {/* Right — award content */}
        <div className="flex-1 flex flex-col overflow-y-auto rg-scroll-thin" style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}>
          <div className="flex justify-end px-7 pt-6 pb-3 shrink-0">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
              <X size={14} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          <div className="flex flex-col flex-1 px-7 pb-7">
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{award.date ?? award.year}</span>
            </div>

            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 6 }}>
              {award.title}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND, marginBottom: 20 }}>{award.org}</p>

            <div className="mb-5 p-4" style={{ background: "rgba(26,82,168,.12)", border: "1px solid rgba(26,82,168,.25)" }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Recognition</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
                Redeemers Group was recognized with the {award.title}, awarded by {award.org} in {award.year}. This is one of 88 industry awards and affiliations the company has earned since 2008.
              </p>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "auto 0 20px" }} />

            <button onClick={() => { onClose(); openInspection(); }}
              className="inline-flex items-center gap-2 px-6 py-3 hover:opacity-90 transition-opacity w-full justify-center"
              style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
              Get Your Free Inspection <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AwardsCarousel() {
  const [yearFilter, setYearFilter] = useState("All");
  const [openAward, setOpenAward] = useState<Award | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  const filtered = yearFilter === "All" ? AWARDS : AWARDS.filter((a) => a.year === yearFilter);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [filtered, emblaApi]);

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {AWARD_YEARS.map((y) => (
            <button key={y} onClick={() => setYearFilter(y)} className="px-3 py-1.5 transition-all"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500,
                background: yearFilter === y ? SAND : "transparent",
                color: yearFilter === y ? DARK : MUTED,
                border: `1.5px solid ${yearFilter === y ? SAND : ON_LIGHT.border}`,
                cursor: "pointer",
              }}>
              {y}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous awards"
            className="w-9 h-9 flex items-center justify-center hover:bg-black/5 transition-colors"
            style={{ border: `1.5px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <ChevronLeft size={15} color={CHAR} />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Next awards"
            className="w-9 h-9 flex items-center justify-center hover:bg-black/5 transition-colors"
            style={{ border: `1.5px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <ChevronRight size={15} color={CHAR} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {filtered.map((award) => {
            const isFirst = award === AWARDS[0];
            return (
              <AwardCard
                key={award.title}
                award={award}
                clickable={isFirst}
                onClick={() => { if (isFirst) setOpenAward(award); }}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openAward && <AwardModal award={openAward} onClose={() => setOpenAward(null)} />}
      </AnimatePresence>
    </>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" style={{ background: SURFACE.alt }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8" style={{ background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Affiliations &amp; certifications
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              Credentials that matter
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.5)", lineHeight: 1.7, maxWidth: 420 }}>
              We hold industry certifications so you never have to guess about our qualifications.
            </p>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(10,11,20,.06)", border: `1px solid ${ON_LIGHT.border}` }}>
            {CERT_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-10 px-6 text-center" style={{ background: SURFACE.base }}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,52px)", color: B, lineHeight: 1, marginBottom: 8 }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.45)", letterSpacing: 0.5 }}>{s.label}</p>
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

          {/* Industry affiliations — awards slider */}
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 16 }}>
              Awards
            </p>
            <AwardsCarousel />
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
              <div key={step.n} className="flex items-start gap-5 px-7 py-6" style={{ background: "#fff", border: "1.5px solid rgba(11,28,74,.14)" }}>
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
// Real history of Love Well Initiative projects (redeemersgroup.com/about-us/
// love-well-initiative.html) — a running log that grows every year, so it's
// rendered as a scrollable carousel (same embla pattern as Testimonials/News &
// Awards) rather than a fixed grid. Newest first; add new entries here as
// they happen and the module keeps working unchanged.
const LOVE_WELL_PROJECTS = [
  {
    year: "2018",
    title: "Love Well 5K & Festival — Serenity Recovery Center",
    desc: "Serenity Recovery Center runs a free program with very little funding. We made them the beneficiary of the 2018 Love Well 5K & Festival to help close that gap.",
    cta: "Watch the story",
    videoId: "QB1c_89RBgg",
    img: imgFloor01,
  },
  {
    year: "2017",
    title: "Love Well 5K & Festival — Boys & Girls Club of Greater Memphis",
    desc: "Each year the festival benefits a different Memphis-based charity. In 2017 that was the Boys & Girls Club of Greater Memphis.",
    cta: "Watch the story",
    videoId: "cp3ZBiioxpw",
    img: imgFloor02,
  },
  {
    year: "2017",
    title: "Safe Families structural repair",
    desc: "Extensive structural repairs, done at no cost, on a home being rehabbed into a Safe Families house — a safe living environment for mothers in transition.",
    cta: "Watch the story",
    videoId: "EH1G9dSnjZE",
    img: imgFloor03,
  },
  {
    year: "2016",
    title: "Love Well 5K Run/Walk & Festival — Old Path Homeless Shelter",
    desc: "A run/walk benefiting the Old Path Homeless Shelter for Women and Children in Memphis, open to individuals and teams.",
    cta: "Watch the story",
    videoId: "6OY1ki0FBUE",
    img: imgFloor04,
  },
  {
    year: "2016",
    title: "Toss the Boss Challenge",
    desc: "Our leadership took the plunge — literally — to raise support for orphans and vulnerable children around the world.",
    cta: "See the challenge",
    img: imgFloor01,
  },
  {
    year: "2015",
    title: "$10,000 structural repair gift — Old Path Homeless Shelter",
    desc: "After a nomination process across several area charities, our team selected Old Path Homeless Shelter for Women and Children for a full, free structural repair.",
    cta: "Read the story",
    img: imgFloor02,
  },
];

function LoveWellProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [cur, setCur] = useState(0);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <div className="mt-20 lg:mt-28">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10.5, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
            Where the giving has gone
          </p>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.4vw,30px)", color: CHAR, letterSpacing: "-0.5px" }}>
            Past Love Well projects
          </h3>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous project"
            className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors"
            style={{ border: `1.5px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <ChevronLeft size={15} color={CHAR} />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Next project"
            className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors"
            style={{ border: `1.5px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <ChevronRight size={15} color={CHAR} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-stretch gap-5">
          {LOVE_WELL_PROJECTS.map((p) => (
            <div key={p.title} className="shrink-0 w-[min(85vw,340px)] flex flex-col" style={{ background: "#fff", border: `1px solid ${ON_LIGHT.border}` }}>
              <button
                onClick={() => p.videoId && setOpenVideo(p.videoId)}
                className="relative overflow-hidden shrink-0 group/thumb"
                style={{ height: 160, border: "none", padding: 0, cursor: p.videoId ? "pointer" : "default" }}
              >
                <ImageWithFallback src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" />
                <span className="absolute top-3 left-3 px-2.5 py-1" style={{ background: "rgba(10,11,20,.7)", border: "1px solid rgba(196,171,108,.4)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 1.5 }}>{p.year}</span>
                </span>
                {p.videoId && (
                  <>
                    <div className="absolute inset-0" style={{ background: "rgba(10,11,20,.25)" }} />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover/thumb:scale-110" style={{ background: B }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </span>
                  </>
                )}
              </button>
              <div className="flex flex-col flex-1 p-6">
                <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 16.5, color: CHAR, lineHeight: 1.3, marginBottom: 10 }}>
                  {p.title}
                </h4>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: MUTED, lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
                  {p.desc}
                </p>
                <button
                  onClick={() => p.videoId && setOpenVideo(p.videoId)}
                  className="group inline-flex items-center gap-1.5"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: p.videoId ? "pointer" : "default", padding: 0 }}
                >
                  {p.cta}
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        {LOVE_WELL_PROJECTS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: cur === i ? 20 : 7, height: 7, background: cur === i ? B : "rgba(10,11,20,.15)", border: "none", cursor: "pointer", padding: 0 }} />
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {openVideo && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
              style={{ background: "rgba(0,0,0,.88)" }}
              onClick={() => setOpenVideo(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
                style={{ maxWidth: 960 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpenVideo(null)}
                  aria-label="Close video"
                  className="absolute -top-11 right-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
                  style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
                >
                  <X size={16} color="#fff" />
                </button>
                <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
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
    </div>
  );
}

function LoveWellInitiativeSection() {
  return (
    <section id="love-well" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden h-full" style={{ borderRadius: 2, minHeight: 380 }}>
              <ImageWithFallback src={imgFloor02} alt="Love Well Initiative" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.55) 0%,transparent 55%)" }} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[2px] w-6" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Love Well Initiative</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 20, maxWidth: 500 }}>
              Giving back to the neighborhoods we serve
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.6)", lineHeight: 1.8, maxWidth: 480, marginBottom: 28 }}>
              Launched in 2015, the Love Well Initiative is the umbrella for every community project we take on — discounted and, in some cases, fully free structural repairs for qualifying families and charitable organizations across the Memphis area.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
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

        <LoveWellProjectsCarousel />
      </div>
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
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.86)" }} />
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
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Our Difference</span>
          </div>
        </div>

        {/* Order matches the approved sitemap: Testimonials, What to expect,
            Evergreen difference, Our pledge, News & awards, Featured projects/
            case stories, Referral program, Love Well Initiative, Affiliations
            & certifications. */}
        <HeroSection />
        <TrustBar />
        <TestimonialsSection onNavigate={onNavigate} />
        <ProcessSection />
        <StorySection />
        <PledgeSection />
        <ProjectStoriesSection />
        <CaseStudiesSection />
        <BeforeAfterSection />
        <ReferralProgramSection />
        <LoveWellInitiativeSection />
        <CertificationsSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
