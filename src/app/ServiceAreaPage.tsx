import { useState, useRef, useEffect } from "react";
import { openInspection } from "./components/InspectionModal";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, ChevronRight, Search, CheckCircle2, XCircle, Loader2, Phone } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { ServiceAreaExplorer } from "./components/ServiceAreaExplorer";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const MUTED = "#6B6E85";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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




// ─── ZIP lookup table (subset — for demo) ─────────────────────────────────────
const ZIP_DB: Record<string, { city: string; state: string; metro: string; services: string[] }> = {
  "38139": { city: "Germantown", state: "Tennessee", metro: "Memphis Metro", services: ["Foundation repair", "Crawl space repair", "Waterproofing", "Concrete repair"] },
  "38017": { city: "Collierville", state: "Tennessee", metro: "Memphis Metro", services: ["Foundation repair", "Crawl space repair", "Waterproofing"] },
  "38133": { city: "Bartlett", state: "Tennessee", metro: "Memphis Metro", services: ["Crawl space repair", "Waterproofing", "Concrete repair"] },
  "38018": { city: "Cordova", state: "Tennessee", metro: "Memphis Metro", services: ["Foundation repair", "Crawl space repair"] },
  "38002": { city: "Lakeland", state: "Tennessee", metro: "Memphis Metro", services: ["Foundation repair", "Crawl space repair", "Concrete repair"] },
  "37027": { city: "Brentwood", state: "Tennessee", metro: "Nashville Metro", services: ["Foundation repair", "Crawl space repair", "Waterproofing"] },
  "37064": { city: "Franklin", state: "Tennessee", metro: "Nashville Metro", services: ["Foundation repair", "Crawl space repair"] },
  "37129": { city: "Murfreesboro", state: "Tennessee", metro: "Nashville Metro", services: ["Crawl space repair", "Waterproofing", "Concrete repair"] },
  "37412": { city: "East Ridge", state: "Tennessee", metro: "Chattanooga Metro", services: ["Foundation repair", "Crawl space repair"] },
  "37343": { city: "Hixson", state: "Tennessee", metro: "Chattanooga Metro", services: ["Crawl space repair", "Waterproofing"] },
  "39157": { city: "Ridgeland", state: "Mississippi", metro: "Jackson Metro", services: ["Crawl space repair", "Waterproofing", "Mold prevention"] },
  "39110": { city: "Madison", state: "Mississippi", metro: "Jackson Metro", services: ["Crawl space repair", "Mold prevention"] },
  "39042": { city: "Brandon", state: "Mississippi", metro: "Jackson Metro", services: ["Foundation repair", "Crawl space repair"] },
  "72114": { city: "North Little Rock", state: "Arkansas", metro: "Little Rock Metro", services: ["Foundation repair", "Crawl space repair", "Concrete repair"] },
  "72032": { city: "Conway", state: "Arkansas", metro: "Little Rock Metro", services: ["Foundation repair", "Crawl space repair"] },
  "72015": { city: "Benton", state: "Arkansas", metro: "Little Rock Metro", services: ["Crawl space repair", "Concrete repair"] },
};


// ─── 1. HERO + ZIP CHECKER ────────────────────────────────────────────────────
type ZipStatus = "idle" | "loading" | "found" | "not-found";

function HeroSection() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<ZipStatus>("idle");
  const [result, setResult] = useState<typeof ZIP_DB[string] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = () => {
    const clean = zip.trim();
    if (clean.length < 5) { inputRef.current?.focus(); return; }
    setStatus("loading");
    // Simulate async lookup with 900ms delay
    setTimeout(() => {
      const match = ZIP_DB[clean];
      if (match) { setResult(match); setStatus("found"); }
      else { setResult(null); setStatus("not-found"); }
    }, 900);
  };

  const handleReset = () => { setZip(""); setStatus("idle"); setResult(null); setTimeout(() => inputRef.current?.focus(), 50); };

  return (
    <section style={{ background: DARK, position: "relative", overflow: "hidden" }} className="py-20 lg:py-28">
      {/* Subtle radial glow behind input */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(26,82,168,.12) 0%, transparent 70%)" }} />

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ display: "block", width: 28, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Service areas
            </span>
            <span style={{ display: "block", width: 28, height: 2, background: SAND }} />
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,80px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 20 }}>
            We're in your neighborhood
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>
            Local experts across Tennessee, Mississippi, and Arkansas. Enter your ZIP to instantly see your local team, reviews, and available services.
          </p>
        </Reveal>

        {/* ZIP input + button */}
        <Reveal delay={0.1}>
          <div className="flex items-stretch justify-center gap-0 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={zip}
                onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); if (status !== "idle") setStatus("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="Enter ZIP code (e.g. 38139)"
                maxLength={5}
                disabled={status === "loading"}
                style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#fff", width: "100%",
                  background: CHAR,
                  border: status === "found" ? `1px solid ${SAND}` : status === "not-found" ? "1px solid rgba(239,68,68,.5)" : "1px solid rgba(255,255,255,.14)",
                  borderRight: "none",
                  padding: "15px 18px",
                  outline: "none",
                  transition: "border-color .2s",
                  letterSpacing: zip.length > 0 ? 3 : 0,
                }}
              />
            </div>
            <motion.button
              onClick={handleCheck}
              disabled={status === "loading" || zip.length < 5}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff",
                background: status === "loading" ? "rgba(26,82,168,.6)" : B,
                border: "none", padding: "15px 28px", cursor: zip.length < 5 ? "not-allowed" : "pointer",
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8,
                opacity: zip.length < 5 ? 0.5 : 1, transition: "opacity .2s, background .2s",
              }}
            >
              {status === "loading"
                ? <><Loader2 size={15} className="animate-spin" /> Checking…</>
                : "Check my area"}
            </motion.button>
          </div>

          {/* Helper hint */}
          <AnimatePresence mode="wait">
            {status === "idle" && zip.length === 0 && (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.25)", marginTop: 10 }}>
                Try: 38139, 37027, 72114, 39157
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Result card */}
        <AnimatePresence mode="wait">
          {status === "found" && result && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto mt-8"
              style={{ background: CHAR, border: `1px solid ${SAND}`, textAlign: "left" }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ background: "rgba(196,171,108,.15)", border: `1px solid ${SAND}` }}>
                    <CheckCircle2 size={16} color={SAND} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", margin: 0 }}>
                      {result.city}, {result.state}
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: SAND, margin: 0 }}>
                      {result.metro} · ZIP {zip}
                    </p>
                  </div>
                </div>
                <button onClick={handleReset} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)", background: "none", border: "none", cursor: "pointer" }}>
                  Try another ZIP
                </button>
              </div>

              {/* Services */}
              <div className="px-6 py-5 flex flex-col gap-4">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 3, textTransform: "uppercase" }}>
                  Services available in your area
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.services.map((svc, i) => (
                    <motion.span
                      key={svc}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#fff",
                        background: "rgba(26,82,168,.25)", border: "1px solid rgba(26,82,168,.45)",
                        padding: "5px 12px",
                      }}
                    >
                      {svc}
                    </motion.span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-1 flex-wrap">
                  <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group inline-flex items-center gap-2 px-6 py-3"
                    style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>
                    Schedule Free Inspection
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="tel:+19015550100" className="inline-flex items-center gap-2"
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)", borderBottom: "1px solid rgba(255,255,255,.15)", paddingBottom: 1 }}>
                    <Phone size={13} /> (901) 555-0100
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {status === "not-found" && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto mt-8"
              style={{ background: CHAR, border: "1px solid rgba(239,68,68,.3)", textAlign: "left", padding: "24px 28px" }}
            >
              <div className="flex items-start gap-4">
                <XCircle size={20} color="rgba(239,68,68,.8)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 6 }}>
                    We don't serve ZIP {zip} yet
                  </p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.65, marginBottom: 16 }}>
                    Leave your contact info and we'll notify you when we expand to your area.
                  </p>
                  <div className="flex items-center gap-3">
                    <button onClick={handleReset}
                      style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      Try another ZIP
                    </button>
                    <span style={{ color: "rgba(255,255,255,.15)" }}>·</span>
                    <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.5)" }}>
                      Get notified
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── 2. MAP SECTION ───────────────────────────────────────────────────────────



// ─── 4. BENEFIT CARDS ─────────────────────────────────────────────────────────
const BENEFIT_CARDS = [
  {
    eyebrow: "Financing",
    title: "Financing",
    desc: "0% APR for qualified buyers. Monthly plans from $79/month. Apply in 8 minutes.",
    cta: "Read more",
  },
  {
    eyebrow: "Redeemers Care Club",
    title: "Redeemers Care Club",
    desc: "Annual maintenance inspections, priority scheduling, and warranty protection.",
    cta: "Read more",
  },
  {
    eyebrow: "Love Well Initiative",
    title: "Love Well Initiative",
    desc: "Giving back to Memphis. Discounted repairs for qualifying families in underserved neighborhoods.",
    cta: "Visit",
  },
];

function BenefitCardsSection() {
  return (
    <section style={{ background: CHAR }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BENEFIT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="flex flex-col h-full p-8" style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 16 }}>
                  {card.eyebrow}
                </span>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
                  {card.desc}
                </p>
                <button className="group inline-flex items-center gap-1.5"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {card.cta}
                  <ChevronRight size={14} color={SAND} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.86)" }} />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Get started today
            </span>
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

// ─── ServiceAreaPage ──────────────────────────────────────────────────────────
export default function ServiceAreaPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="About" />
      </div>
      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: DARK }}>
        <HeroSection />
        <ServiceAreaExplorer id="coverage" />
        <BenefitCardsSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
