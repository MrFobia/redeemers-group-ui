import { useState, useRef, useEffect } from "react";
import { openInspection } from "./components/InspectionModal";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, ChevronRight, Search, CheckCircle2, XCircle, Loader2, Phone } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import imgServiceAreaMap from "../assets/service-area-map.jpg";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";

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



// ─── State / City data ────────────────────────────────────────────────────────
const STATES = [
  {
    name: "Tennessee",
    abbr: "TN",
    tagline: "Our largest coverage area — from Memphis to Chattanooga.",
    cities: ["Memphis metro", "Nashville metro", "Chattanooga metro", "Jackson area"],
    services: ["Foundation repair", "Crawl space repair", "Waterproofing", "Concrete repair"],
    // rough SVG center coordinates for pin placement (% of map box)
    pinX: 38, pinY: 38,
  },
  {
    name: "Arkansas",
    abbr: "AR",
    tagline: "Serving Little Rock, Jonesboro, and surrounding communities.",
    cities: ["Little Rock metro", "Jonesboro", "Conway", "Benton"],
    services: ["Foundation repair", "Crawl space repair", "Concrete repair"],
    pinX: 28, pinY: 52,
  },
  {
    name: "Mississippi",
    abbr: "MS",
    tagline: "Jackson metro and north MS communities covered year-round.",
    cities: ["Jackson metro", "Southaven", "Olive Branch", "Tupelo"],
    services: ["Crawl space repair", "Waterproofing", "Mold prevention"],
    pinX: 42, pinY: 62,
  },
  {
    name: "Missouri",
    abbr: "MO",
    tagline: "Southeast Missouri — structural repair specialists on call.",
    cities: ["Poplar Bluff", "Cape Girardeau", "Sikeston"],
    services: ["Foundation repair", "Crawl space repair"],
    pinX: 32, pinY: 28,
  },
];

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

const METRO_AREAS = [
  {
    state: "Tennessee",
    metro: "Memphis Metro",
    cities: [
      { name: "Germantown", zip: "38139" }, { name: "Collierville", zip: "38017" }, { name: "Bartlett", zip: "38133" },
      { name: "Cordova", zip: "38018" }, { name: "Midtown", zip: "38104" }, { name: "East Memphis", zip: "38120" },
      { name: "Whitehaven", zip: "38116" }, { name: "Millington", zip: "38053" }, { name: "Lakeland", zip: "38002" },
      { name: "Munford", zip: "38058" }, { name: "Atoka", zip: "38004" }, { name: "Brighton", zip: "38011" },
      { name: "Oakland", zip: "38060" }, { name: "Piperton", zip: "38017" },
    ],
  },
  {
    state: "Tennessee",
    metro: "Nashville Metro",
    cities: [
      { name: "Brentwood", zip: "37027" }, { name: "Franklin", zip: "37064" }, { name: "Murfreesboro", zip: "37129" },
      { name: "Smyrna", zip: "37167" }, { name: "La Vergne", zip: "37086" }, { name: "Hendersonville", zip: "37075" },
      { name: "Gallatin", zip: "37066" }, { name: "Mt. Juliet", zip: "37122" }, { name: "Antioch", zip: "37013" },
      { name: "Bellevue", zip: "37221" }, { name: "Nolensville", zip: "37135" }, { name: "Spring Hill", zip: "37174" },
    ],
  },
  {
    state: "Tennessee",
    metro: "Chattanooga Metro",
    cities: [
      { name: "East Ridge", zip: "37412" }, { name: "Red Bank", zip: "37415" }, { name: "Signal Mountain", zip: "37377" },
      { name: "Hixson", zip: "37343" }, { name: "Ooltewah", zip: "37363" }, { name: "Cleveland", zip: "37311" },
      { name: "Dalton", zip: "30720" }, { name: "Ringgold", zip: "30736" }, { name: "Fort Oglethorpe", zip: "30742" },
    ],
  },
  {
    state: "Mississippi",
    metro: "Jackson Metro",
    cities: [
      { name: "Ridgeland", zip: "39157" }, { name: "Madison", zip: "39110" }, { name: "Brandon", zip: "39042" },
      { name: "Flowood", zip: "39232" }, { name: "Pearl", zip: "39208" }, { name: "Clinton", zip: "39056" },
      { name: "Byram", zip: "39272" }, { name: "Richland", zip: "39218" },
    ],
  },
  {
    state: "Arkansas",
    metro: "Little Rock Metro",
    cities: [
      { name: "North Little Rock", zip: "72114" }, { name: "Maumelle", zip: "72113" }, { name: "Conway", zip: "72032" },
      { name: "Benton", zip: "72015" }, { name: "Bryant", zip: "72022" }, { name: "Sherwood", zip: "72120" },
      { name: "Jacksonville", zip: "72076" }, { name: "Cabot", zip: "72023" },
    ],
  },
];

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
function MapSection() {
  const [activeState, setActiveState] = useState(0);
  const state = STATES[activeState];

  return (
    <section style={{ background: CHAR }} className="py-0">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_320px]" style={{ minHeight: 560, border: "1px solid rgba(255,255,255,.06)" }}>

          {/* Left — state selector */}
          <div className="flex flex-col justify-center" style={{ borderRight: "1px solid rgba(255,255,255,.06)" }}>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase", padding: "20px 20px 10px" }}>
              Select state
            </p>
            {STATES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveState(i)}
                className="relative w-full text-left transition-all duration-200 group"
                style={{
                  padding: "18px 20px",
                  cursor: "pointer",
                  background: activeState === i ? "rgba(196,171,108,.08)" : "transparent",
                  borderLeft: activeState === i ? `3px solid ${SAND}` : "3px solid transparent",
                  borderBottom: i < STATES.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                }}
              >
                <span style={{
                  fontFamily: "'Articulat CF',sans-serif",
                  fontWeight: activeState === i ? 800 : 500,
                  fontSize: 22,
                  color: activeState === i ? "#fff" : "rgba(255,255,255,.3)",
                  display: "block",
                  transition: "color .2s",
                  lineHeight: 1,
                }}>
                  {s.abbr}
                </span>
                <span style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 11,
                  color: activeState === i ? SAND : "rgba(255,255,255,.25)",
                  display: "block",
                  marginTop: 3,
                  transition: "color .2s",
                }}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>

          {/* Center — map with animated pin */}
          <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
            <ImageWithFallback
              src={imgServiceAreaMap}
              alt="Service area map"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "saturate(0.3) brightness(0.5)" }}
            />
            {/* Dark overlay with subtle gradient */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,11,20,.7) 0%, rgba(10,11,20,.4) 100%)" }} />

            {/* Animated pin */}
            <AnimatePresence mode="wait">
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: -20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: `${state.pinX}%`,
                  top: `${state.pinY}%`,
                  transform: "translate(-50%, -100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                {/* Pulse rings */}
                <motion.div
                  animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 48, height: 48,
                    background: SAND, borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <motion.div
                  animate={{ scale: [1, 2.6], opacity: [0.25, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 48, height: 48,
                    background: SAND, borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                {/* Pin circle */}
                <div style={{
                  width: 48, height: 48, background: SAND, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 0 4px rgba(196,171,108,.25), 0 8px 24px rgba(0,0,0,.5)`,
                  position: "relative", zIndex: 1,
                }}>
                  <MapPin size={22} color={DARK} strokeWidth={2.5} />
                </div>
                {/* Pin stem */}
                <div style={{ width: 2, height: 14, background: SAND, opacity: 0.6 }} />
                {/* Label */}
                <div style={{
                  background: "rgba(10,11,20,.95)", border: `1px solid ${SAND}`,
                  padding: "5px 14px", display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 13, color: "#fff" }}>
                    {state.name}
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: SAND }}>
                    {state.cities.length} metros covered
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom left: instruction */}
            <div className="absolute bottom-5 left-6 flex items-center gap-2">
              <MapPin size={13} color={SAND} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                Select a state to explore coverage
              </span>
            </div>
          </div>

          {/* Right — animated state panel */}
          <div style={{ background: DARK, borderLeft: "1px solid rgba(255,255,255,.06)", position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={state.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}
              >
                {/* State header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", lineHeight: 1 }}>
                      {state.name}
                    </span>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: SAND }}>
                      {state.abbr}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.6 }}>
                    {state.tagline}
                  </p>
                </div>

                {/* Cities */}
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                  Metro areas
                </p>
                <div className="flex flex-col gap-1 mb-6">
                  {state.cities.map((city, i) => (
                    <motion.button
                      key={city}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                      className="group flex items-center justify-between text-left px-3 py-2.5 transition-all hover:bg-white/5"
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.65)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <span className="group-hover:text-white transition-colors">{city}</span>
                      <ChevronRight size={13} color={SAND} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: 16 }} />

                {/* Services */}
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                  Services available
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {state.services.map((svc, i) => (
                    <motion.span
                      key={svc}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.28 }}
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.7)",
                        background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                        padding: "4px 10px",
                      }}
                    >
                      {svc}
                    </motion.span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <a href="#" className="group w-full flex items-center justify-center gap-2 py-3"
                    style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
                    Schedule in {state.abbr}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}


// ─── 3. ALL AREAS ─────────────────────────────────────────────────────────────
function AllAreasSection() {
  const [search, setSearch] = useState("");

  const filtered = METRO_AREAS.map((metro) => ({
    ...metro,
    cities: metro.cities.filter(
      (c) =>
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.zip.includes(search)
    ),
  })).filter((metro) => metro.cities.length > 0);

  return (
    <section style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header + filter bar */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ display: "block", width: 28, height: 2, background: SAND, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
                Coverage
              </span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
              All areas we serve
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginTop: 10, maxWidth: 480 }}>
              Every city listed below has a dedicated local page with reviews, case studies, and available services.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-stretch gap-0 shrink-0" style={{ width: 280 }}>
            <div className="flex items-center px-3" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.1)", borderRight: "none" }}>
              <Search size={15} color={MUTED} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="City or ZIP code"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff",
                background: CHAR, border: "1px solid rgba(255,255,255,.1)",
                padding: "10px 14px", flex: 1, outline: "none",
              }}
            />
          </div>
        </Reveal>

        {/* Metro groups */}
        <div className="flex flex-col gap-10">
          {filtered.map((metro, i) => (
            <Reveal key={`${metro.state}-${metro.metro}`} delay={i * 0.04}>
              <div>
                {/* Metro label */}
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={14} color={SAND} />
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 3, textTransform: "uppercase" }}>
                    {metro.state} — {metro.metro}
                  </span>
                </div>
                {/* City tags */}
                <div className="flex flex-wrap gap-2">
                  {metro.cities.map((city) => (
                    <button
                      key={city.name}
                      className="group inline-flex items-center gap-2 px-4 py-2 transition-all hover:border-white/30"
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.7)",
                        background: CHAR, border: "1px solid rgba(255,255,255,.07)",
                        cursor: "pointer",
                      }}
                    >
                      {city.name}
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>
                        {city.zip}
                      </span>
                      <ChevronRight size={12} color={SAND} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        <MapSection />
        <AllAreasSection />
        <BenefitCardsSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
