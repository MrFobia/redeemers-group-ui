import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, ArrowRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



// ─── Page Data ────────────────────────────────────────────────────────────────
const CAUSES = [
  {
    title: "Moisture",
    desc: "The #1 driver. Crawl space humidity causes wood to absorb water, swell, and eventually rot from the inside out.",
  },
  {
    title: "Pests",
    desc: "Termites and wood-boring insects hollow out floor joists over years, leaving them unable to bear load.",
  },
  {
    title: "Age",
    desc: "Older homes often have undersized joists by today's load-bearing standards — designed for lighter loads.",
  },
];


const TESTIMONIALS = [
  {
    quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.",
    name: "Victoria E.",
    loc: "Memphis, TN",
    stars: 5,
    img: imgFloor01,
    avatar: imgRevAvatar,
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!",
    name: "Elizabeth N.",
    loc: "Collierville, TN",
    stars: 5,
    img: imgFloor03,
    avatar: imgRevAvatar,
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.",
    loc: "Marked Tree, AR",
    stars: 5,
    img: imgFloor04,
    avatar: imgRevAvatar,
  },
];

const FAQS = [
  {
    q: "How much does it cost to fix sagging floors?",
    a: "The cost depends on how many joists are affected and whether moisture control is also needed. Most crawl space floor repairs fall between $1,500 and $6,000. We provide a full written quote after the free inspection — no commitment required.",
  },
  {
    q: "Is a sagging floor a structural emergency?",
    a: "Not always immediately, but it should be inspected soon. The underlying cause — usually moisture or pest damage — will continue to worsen over time. Early action saves significant money and prevents the issue from spreading to adjacent joists and beams.",
  },
  {
    q: "Can sagging floors be fixed without tearing up my flooring?",
    a: "Yes. In most cases we access the joists from below through the crawl space. SmartJack installation and joist sistering are both done without touching your finished floors above.",
  },
  {
    q: "How long does a crawl space floor repair take?",
    a: "Most repairs are completed in a single day. Larger jobs involving full encapsulation and multiple SmartJacks may take 2 days. We give you a specific timeline during the free inspection.",
  },
  {
    q: "Will my homeowner's insurance cover this?",
    a: "It depends on the cause and your policy. Damage from sudden events may be covered; gradual moisture damage usually isn't. We provide full documentation to help you file a claim where applicable.",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 560 }}>
      <ImageWithFallback
        src={imgFloor04}
        alt="Sagging floors"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(10,11,20,0.92) 0%,rgba(10,11,20,0.72) 55%,rgba(10,11,20,0.45) 100%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-24 lg:py-32">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
          Crawl Space Repair
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,64px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 24, maxWidth: 700 }}>
          Sagging floors
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.65)", lineHeight: 1.75, maxWidth: 560, marginBottom: 36 }}>
          Sagging floors are almost always caused by moisture damage or failing supports beneath your home — not a surface problem.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58 }}
          className="flex items-center gap-4 flex-wrap">
          <a href="#" className="group relative overflow-hidden px-7 py-4 inline-flex items-center gap-3"
            style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}>
            <span className="relative z-10">Schedule Free Inspection</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color={NAVY} />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
          </a>
          <a href="tel:+18335841049" className="px-7 py-4 inline-flex items-center gap-2 transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,.35)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,.85)" }}>
            Call local team
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Diagnostic Section (76:6107) ────────────────────────────────────────────
const RELATED_TAGS = ["I smell mold", "Wood rot", "Energy loss", "Pests / vapor"];
const OTHER_STRUCTURAL = [
  "Wall cracks",
  "Bowing walls",
  "Sticking doors/windows",
  "Tilting chimney",
  "Efflorescence (white stains)",
];

function DiagnosticSection() {
  const [dismissed, setDismissed] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <section style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* ── Left: Sidebar ── */}
          <div className="lg:w-[340px] shrink-0 flex flex-col gap-8">

            {/* Matched symptom */}
            <Reveal>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: MUTED, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                Your symptom matched
              </p>
              {!dismissed ? (
                <div className="flex items-center gap-3 px-4 py-2.5 w-fit" style={{ background: "rgba(26,82,168,.15)", border: `1.5px solid ${B}` }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: B }} />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>Sagging floors</span>
                  <button onClick={() => setDismissed(true)} className="ml-1 opacity-40 hover:opacity-80 transition-opacity" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <X size={13} color="#fff" />
                  </button>
                </div>
              ) : (
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED }}>Symptom dismissed.</p>
              )}
            </Reveal>

            <div className="h-px" style={{ background: "rgba(255,255,255,.06)" }} />

            {/* Other common symptoms (pills) */}
            <Reveal delay={0.05}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: MUTED, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>
                Other common symptoms of this issue
              </p>
              <div className="flex flex-wrap gap-2">
                {RELATED_TAGS.map((tag) => (
                  <button key={tag} className="group flex items-center gap-1.5 px-3 py-2 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.75)", cursor: "pointer" }}>
                    {tag}
                    <ChevronRight size={12} color={MUTED} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="h-px" style={{ background: "rgba(255,255,255,.06)" }} />

            {/* CTA */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3">
                <a href="#" className="group relative overflow-hidden px-6 py-3.5 inline-flex items-center justify-center gap-3 transition-opacity hover:opacity-90"
                  style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                  Schedule free inspection
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, textAlign: "center" }}>
                  or call{" "}
                  <a href="tel:+19015550100" style={{ color: SAND, fontWeight: 600 }}>(901) 555-0100</a>
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Other structural symptoms card ── */}
          <Reveal delay={0.08} className="flex-1">
            <div className="h-full flex flex-col" style={{ border: "1px solid rgba(255,255,255,.07)" }}>
              {/* Card header */}
              <div className="px-8 py-7" style={{ borderBottom: "1px solid rgba(255,255,255,.06)", background: CHAR }}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
                  Other structural symptoms
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, marginTop: 6 }}>
                  These issues often share the same root cause — inspect them together
                </p>
              </div>

              {/* Symptom rows */}
              <div className="flex flex-col flex-1" style={{ background: DARK }}>
                {OTHER_STRUCTURAL.map((symptom, i) => (
                  <button
                    key={symptom}
                    className="group flex items-center justify-between px-8 py-4 text-left w-full transition-all duration-200"
                    style={{
                      background: hoveredRow === symptom ? "rgba(26,82,168,.1)" : "transparent",
                      borderBottom: i < OTHER_STRUCTURAL.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                      borderLeft: `3px solid ${hoveredRow === symptom ? B : "transparent"}`,
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredRow(symptom)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: hoveredRow === symptom ? "#fff" : "rgba(255,255,255,.65)", fontWeight: hoveredRow === symptom ? 500 : 400 }}>
                      {symptom}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: hoveredRow === symptom ? SAND : "transparent", fontWeight: 600, transition: "color 0.2s" }}>
                        View issue
                      </span>
                      <ChevronRight size={16} color={hoveredRow === symptom ? SAND : MUTED} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Card footer */}
              <div className="px-8 py-5" style={{ background: CHAR, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <a href="#" className="group inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                  Browse all problem signs
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Self-Diagnosis Guide (76:6506) ──────────────────────────────────────────
function SelfDiagnosisSection() {
  const cards = [
    {
      label: "Can wait a few weeks",
      tone: "neutral" as const,
      items: [
        "Slight bounce in one area only, no visible slope",
        "No moisture, mold smell, or water history in crawl space",
        "Problem has been stable for months without getting worse",
      ],
    },
    {
      label: "Call us now",
      tone: "urgent" as const,
      items: [
        "Floor is visibly sloping toward one corner or wall",
        "You smell mold or see moisture in the crawl space",
        "More than one room is affected or it's getting worse",
      ],
    },
  ];

  return (
    <section style={{ background: CHAR }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-16 lg:py-20">

        {/* Header */}
        <Reveal className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{
              fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11,
              color: SAND, letterSpacing: 3.5, textTransform: "uppercase",
            }}>
              Self-diagnosis guide
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Articulat CF',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px,4vw,52px)", color: "#fff",
            lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16,
          }}>
            Is your floor situation urgent?
          </h2>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED,
            lineHeight: 1.75, maxWidth: 600,
          }}>
            Not every bouncy floor is an emergency, but some are. Use this quick checklist to understand where you stand.
          </p>
        </Reveal>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.1}>
              <div
                className="h-full flex flex-col"
                style={{
                  background: card.tone === "urgent" ? NAVY : DARK,
                  border: "1px solid rgba(255,255,255,.07)",
                  minHeight: 285,
                }}
              >
                {/* Coloured top strip */}
                <div
                  className="h-1 w-full shrink-0"
                  style={{ background: card.tone === "urgent" ? SAND : B }}
                />

                <div className="flex flex-col justify-center flex-1 px-8 py-8">
                  {/* Card title row */}
                  <div className="flex items-center gap-3 mb-5">
                    {card.tone === "urgent" ? (
                      <div className="w-7 h-7 flex items-center justify-center shrink-0"
                        style={{ background: SAND, borderRadius: 2 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-7 h-7 flex items-center justify-center shrink-0"
                        style={{ background: "rgba(196,171,108,.1)", border: `1px solid rgba(196,171,108,.3)`, borderRadius: 2 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            stroke={SAND} strokeWidth="2" />
                          <path d="M12 8v4M12 16h.01" stroke={SAND} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    <h3 style={{
                      fontFamily: "'Articulat CF',sans-serif", fontWeight: 800,
                      fontSize: 22, lineHeight: 1.15,
                      color: card.tone === "urgent" ? SAND : "#fff",
                    }}>
                      {card.label}
                    </h3>
                  </div>

                  {/* Bullet list */}
                  <ul className="flex flex-col gap-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                          style={{ background: SAND }}
                        />
                        <span style={{
                          fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.7,
                          color: "rgba(255,255,255,.65)",
                        }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Urgent CTA */}
                  {card.tone === "urgent" && (
                    <a
                      href="tel:+18335841049"
                      className="mt-7 inline-flex items-center gap-2 px-6 py-3 w-fit transition-opacity hover:opacity-90"
                      style={{ background: SAND, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: DARK }}
                    >
                      Call 1-833-584-1049
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke={DARK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Explainer Section ────────────────────────────────────────────────────────
function ExplainerSection() {
  return (
    <section style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <Reveal>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-[2px]" style={{ background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
                What's happening underneath
              </span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              Why are my floors sagging?
            </h2>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 18 }}>
                Sagging or bouncy floors are almost never a surface problem. In most cases, the real cause is underneath your home — in the crawl space. When wooden floor joists absorb moisture over time, they weaken, rot, and lose their ability to hold the weight above them.
              </p>
              <p style={{ marginBottom: 18 }}>
                This process is slow and invisible until the symptoms appear. By the time you feel the bounce or notice the slope, the structural damage is usually well underway.
              </p>
              <p>
                The good news: floor joist damage is repairable without tearing up your floors. Most jobs are completed in a single day.
              </p>
            </div>
          </Reveal>

          {/* Right: image + causes */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden mb-6" style={{ borderRadius: 2 }}>
              <ImageWithFallback
                src={imgFloor02}
                alt="Crawl space floor joists"
                className="w-full object-cover"
                style={{ height: 320 }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.65) 0%,transparent 50%)" }} />
              <div className="absolute bottom-4 left-4 px-3 py-1.5"
                style={{ background: "rgba(10,11,20,.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.1)" }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 12, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
                  Typical crawl space damage
                </span>
              </div>
            </div>

            {/* Causes */}
            <div className="flex flex-col gap-3">
              {CAUSES.map((cause, i) => (
                <div key={cause.title} className="flex gap-4 items-start px-5 py-4" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.06)" }}>
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center mt-0.5" style={{ background: B, borderRadius: 2 }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: "#fff" }}>{i + 1}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>{cause.title}: </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.65 }}>{cause.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Slider ──────────────────────────────────────────────────────
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
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)" }}>
              {/* Image thumb */}
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.45)" }}>
                  <button className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
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
                {/* Quote mark */}
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

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FaqSection() {
  const [open, setOpen] = useState<string>("");
  return (
    <section style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-[1px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>FAQs</span>
            <div className="w-6 h-[1px]" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Sagging floors frequently asked questions
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED }}>
            Find answers about our services and process
          </p>
        </Reveal>

        <div className="max-w-[768px] mx-auto">
          <style>{`
            @keyframes slideDown { from { height: 0; opacity: 0; } to { height: var(--radix-accordion-content-height); opacity: 1; } }
            @keyframes slideUp { from { height: var(--radix-accordion-content-height); opacity: 1; } to { height: 0; opacity: 0; } }
            [data-state=open].rdx-content { animation: slideDown 0.22s ease-out; }
            [data-state=closed].rdx-content { animation: slideUp 0.16s ease-in; }
          `}</style>
          <AccordionPrimitive.Root type="single" value={open} onValueChange={(v) => setOpen(v)} collapsible>
            {FAQS.map((faq, i) => (
              <AccordionPrimitive.Item key={i} value={String(i)} className="mb-3 overflow-hidden"
                style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 17, color: "#fff", flex: 1, paddingRight: 16, lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div className="shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 group-data-[state=open]:rotate-45"
                      style={{ border: `1.5px solid ${open === String(i) ? SAND : "rgba(255,255,255,.2)"}`, color: open === String(i) ? SAND : MUTED }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden rdx-content">
                  <div className="px-6 pb-6 pt-1">
                    <div className="h-px mb-4" style={{ background: "rgba(255,255,255,.06)" }} />
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>{faq.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>

          <Reveal delay={0.1}>
            <div className="mt-12 text-center p-10" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
              <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 8 }}>
                Still have questions?
              </h3>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED, marginBottom: 22 }}>
                Reach out to our team anytime
              </p>
              <a href="#" className="group inline-flex items-center gap-2 px-7 py-3.5 transition-opacity hover:opacity-85"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                Contact Us
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={imgFloor03}
          alt="Ready to fix your floors"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.84)" }} />
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
            Ready to fix your<br />sagging floors?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · Same-week availability · Lifetime warranty on every repair
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
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

// ─── Footer ───────────────────────────────────────────────────────────────────
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
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
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

// ─── ProblemSignInnerPage ─────────────────────────────────────────────────────
export default function ProblemSignInnerPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Problem Signs" />
      </div>

      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: "#0A0B14" }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2 flex-wrap">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Problem Signs</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Sagging floors</span>
          </div>
        </div>

        <HeroSection />
        <DiagnosticSection />
        <SelfDiagnosisSection />
        <ExplainerSection />
        <TestimonialsSection onNavigate={onNavigate} />
        <FaqSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
