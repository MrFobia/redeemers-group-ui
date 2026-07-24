import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, animate, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, ArrowRight, CheckCircle, XCircle, X, Gift, Heart } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import useEmblaCarousel from "embla-carousel-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import imgFloor01 from "../assets/floor-01.jpeg";
import imgFloor02 from "../assets/floor-02.jpeg";
import imgFloor03 from "../assets/floor-03.jpeg";
import imgFloor04 from "../assets/floor-04.jpeg";
import imgRevAvatar from "../assets/rev-avatar.png";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";

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
    <section style={{ background: CHAR, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center gap-2">
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: SAND, lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1.5, textTransform: "uppercase" }}>{s.label}</p>
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
    <section id="process" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>What to expect</span>
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.5vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Your experience, start to finish
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.55)" }}>Four simple steps — no surprises, no pressure.</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="group flex flex-col h-full" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={step.img} alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.6) 0%,transparent 65%)" }} />
                  <div className="absolute top-4 left-4 px-2.5 py-1" style={{ background: B }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: 1 }}>{step.n}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{step.desc}</p>
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
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 4. STORY (DARK) ─────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section id="story" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>The Evergreen difference</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              A family business, built on one bad experience
            </h2>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 18 }}>
                Redeemers Group started the way most small businesses do — out of frustration. Our founder had a crawl space problem that three national contractors quoted wrong, fixed halfway, or simply never called back about.
              </p>
              <p>
                So he got certified, hired locally, and built the company he wished existed: one that treats every Memphis homeowner the way you'd want a neighbor treated. Privately owned, community rooted, no franchise overhead passing costs to you.
              </p>
            </div>
            <a href="#" className="group mt-8 inline-flex items-center gap-2 px-7 py-4 transition-all hover:border-white/40"
              style={{ border: "1.5px solid rgba(255,255,255,.2)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
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
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,3.5vw,48px)", color: SAND, lineHeight: 1, marginBottom: 6 }}>
                    {s.raw ? s.raw : <Counter to={(s as { val: number; suffix: string }).val} suffix={(s as { val: number; suffix: string }).suffix} />}
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", letterSpacing: 0.5 }}>{s.label}</p>
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

function PledgeSection() {
  return (
    <section id="pledge" style={{ background: CHAR }} className="py-20 lg:py-28">
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
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 420 }}>
              Most contractors have fine print. Ours works the other way — here's what we explicitly commit to not doing.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal delay={0.05}>
            <div className="h-full flex flex-col" style={{ border: "1px solid rgba(196,171,108,.2)", background: "rgba(196,171,108,.04)" }}>
              <div className="flex items-center gap-3 px-8 py-6" style={{ borderBottom: "1px solid rgba(196,171,108,.12)" }}>
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: "rgba(196,171,108,.15)", border: "1px solid rgba(196,171,108,.3)" }}>
                  <XCircle size={16} color={SAND} />
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.5px" }}>
                  We will never
                </h3>
              </div>
              <div className="flex flex-col flex-1 px-8 py-6 gap-6">
                {NEVER_DO.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 shrink-0 mt-1.5 self-stretch rounded-full" style={{ background: "rgba(196,171,108,.3)", minHeight: 16 }} />
                    <div>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>{item.title}</p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full flex flex-col" style={{ border: "1px solid rgba(26,82,168,.4)", background: "rgba(26,82,168,.08)" }}>
              <div className="flex items-center gap-3 px-8 py-6" style={{ borderBottom: "1px solid rgba(26,82,168,.2)" }}>
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: "rgba(26,82,168,.3)", border: "1px solid rgba(26,82,168,.5)" }}>
                  <CheckCircle size={16} color="#7EB8FF" />
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.5px" }}>
                  We always will
                </h3>
              </div>
              <div className="flex flex-col flex-1 px-8 py-6 gap-6">
                {ALWAYS_WILL.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#7EB8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>{item.title}</p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
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
    <section id="news-awards" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>News &amp; Awards</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4.5vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              News and awards
            </h2>
          </div>
          <button className="group inline-flex items-center gap-2 shrink-0"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            See all (436)
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECT_STORIES.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="flex flex-col h-full" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="relative overflow-hidden group" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={card.img} alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.5) 0%,transparent 60%)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1" style={{ background: "rgba(196,171,108,.15)", border: "1px solid rgba(196,171,108,.35)" }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>{card.tag}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7, flex: 1, marginBottom: 16 }}>{card.desc}</p>
                  <button className="group inline-flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
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
  { val: "5",   label: "Industry affiliations" },
];

// ─── Awards (sourced from redeemersgroup.com/about-us/awards.html) ──────────
type Award = { title: string; org: string; year: string; img?: string; date?: string };

const AWARDS: Award[] = [
  { title: "Memphis Business Journal Small Business Awards", org: "Memphis Business Journal", year: "2026", date: "June 2, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6a202bc8c9060_small-business-awards.jpeg" },
  { title: "Top Work Places, Top 3 Small Business", org: "Top Work Places", year: "2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9437bfd18_image-12.jpg" },
  { title: "2025 Best Evergreen Company", org: "Industry Recognition", year: "2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/69bc31ecc2ddc_image-8.jpg" },
  { title: "Commercial Appeal Top Workplaces 2024", org: "Commercial Appeal", year: "2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/67a652585c968_img8180.jpg" },
  { title: "#24 Foundation Dealer in the Supportworks Network", org: "Supportworks", year: "2025" },
  { title: "#20 Concrete Dealer in the Supportworks Network", org: "Supportworks", year: "2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/680120502bd76_rgtop30concrete.png" },
  { title: "Memphis Business Journal Best Places to Work", org: "Memphis Business Journal", year: "2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9470a6058_image-13.jpg" },
  { title: "Best Place To Work 2024", org: "Industry Recognition", year: "2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb00bad945f_redeemers-12.jpg" },
  { title: "#47 Total Basement Systems Sales", org: "Contractor Nation", year: "2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb01d70bdfa_cn-47-sales.png" },
  { title: "#18 for Total CleanSpace™ Sales", org: "Contractor Nation", year: "2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb019619b80_cn-18-sales.png" },
  { title: "Contractor Nation Platinum Appointment Center Award", org: "Contractor Nation", year: "2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb01464e979_cc-platinum.png" },
  { title: "Supportworks 2022 Most Improved by % Increase in Foundation Sales", org: "Supportworks", year: "2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f073826f24_img2862.jpeg" },
];

const AWARD_YEARS = ["All", ...Array.from(new Set(AWARDS.map((a) => a.year))).sort((a, b) => Number(b) - Number(a))];

function AwardCard({ award, onClick, clickable }: { award: Award; onClick: () => void; clickable: boolean }) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 flex flex-col gap-3"
      style={{ width: 190, cursor: clickable ? "pointer" : "default" }}
    >
      <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "1/1", background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
        {award.img ? (
          <ImageWithFallback src={award.img} alt={award.title} className="w-full h-full object-contain p-4" />
        ) : (
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: SAND, letterSpacing: 0.5, textAlign: "center", padding: 12, lineHeight: 1.3 }}>
            {award.org}
          </span>
        )}
        <div className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)" }}>
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: SAND, letterSpacing: 1 }}>{award.year}</span>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: "#fff", lineHeight: 1.4, marginBottom: 2 }}>
          {award.title.length > 48 ? award.title.slice(0, 48) + "…" : award.title}
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)" }}>{award.org}</p>
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
                color: yearFilter === y ? DARK : "rgba(255,255,255,.55)",
                border: `1.5px solid ${yearFilter === y ? SAND : "rgba(255,255,255,.15)"}`,
                cursor: "pointer",
              }}>
              {y}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous awards"
            className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ border: "1.5px solid rgba(255,255,255,.15)", background: "none", cursor: "pointer" }}>
            <ChevronLeft size={15} color="rgba(255,255,255,.7)" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Next awards"
            className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ border: "1.5px solid rgba(255,255,255,.15)", background: "none", cursor: "pointer" }}>
            <ChevronRight size={15} color="rgba(255,255,255,.7)" />
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
    <section id="certifications" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header */}
        <Reveal className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Affiliations &amp; certifications
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              Credentials that matter
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 420 }}>
              We hold industry certifications so you never have to guess about our qualifications.
            </p>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.06)" }}>
            {CERT_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-10 px-6 text-center" style={{ background: CHAR }}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,52px)", color: SAND, lineHeight: 1, marginBottom: 8 }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)", letterSpacing: 0.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Certifications chips + Affiliations grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Certification badges */}
          <Reveal>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 16 }}>
              Certifications
            </p>
            <div className="flex flex-col gap-3">
              {CERT_CHIPS.map((chip) => (
                <div key={chip.label} className="flex items-center gap-4 px-5 py-4"
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 16, color: SAND }}>{chip.icon}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", fontWeight: 500 }}>{chip.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Industry affiliations — awards slider */}
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 16 }}>
              Industry affiliations
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
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: "rgba(26,82,168,.08)", border: "1.5px dashed rgba(26,82,168,.35)" }}>
                <Gift size={20} color={B} />
              </div>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: CHAR }}>$100 for you. $100 for them.</p>
            </div>
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
function LoveWellInitiativeSection() {
  return (
    <section id="love-well" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden" style={{ borderRadius: 2 }}>
              <ImageWithFallback src={imgFloor02} alt="Love Well Initiative" className="w-full object-cover" style={{ height: 380 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.55) 0%,transparent 55%)" }} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "rgba(196,171,108,.12)", border: "1.5px dashed rgba(196,171,108,.5)" }}>
                <Heart size={16} color={SAND} />
              </div>
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Love Well Initiative</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 20, maxWidth: 500 }}>
              Giving back to the neighborhoods we serve
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.6)", lineHeight: 1.8, maxWidth: 480, marginBottom: 28 }}>
              A structural problem doesn't wait for a family to be able to afford it. Through the Love Well Initiative, we set aside discounted and, in some cases, free repairs for qualifying families in underserved Memphis-area neighborhoods.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              {["Discounted repairs", "Qualifying families", "Underserved neighborhoods", "Community-first"].map((tag) => (
                <div key={tag} className="px-4 py-3" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)", fontWeight: 500 }}>{tag}</span>
                </div>
              ))}
            </div>
            <a href="tel:+18335841049" className="group inline-flex items-center gap-2 px-7 py-4 transition-all hover:border-white/40"
              style={{ border: "1.5px solid rgba(255,255,255,.2)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
              See if you qualify
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
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
    <footer style={{ background: "#060710" }}>
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


  return (
    <>
      {/* Client QA: a fixed horizontal section bar here read as a 3rd
          competing nav layer (global menu + this bar + breadcrumb). The
          "Our Difference" hover dropdown already surfaces all 9 anchors
          before the user commits to a click, so this page keeps only the
          global menu + breadcrumb for local orientation. */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Our Difference" />
      </div>

      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: DARK }}>
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
        <ReferralProgramSection />
        <LoveWellInitiativeSection />
        <CertificationsSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
