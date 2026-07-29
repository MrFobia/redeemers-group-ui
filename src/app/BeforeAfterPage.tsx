import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { PageHeroBanner } from "./components/PageHeroBanner";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import imgFloor03 from "../assets/floor-03.jpeg";

import { B, DARK, CHAR, MUTED, SURFACE, ON_LIGHT } from "./theme";

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

// ─── Before & after slider ────────────────────────────────────────────────────
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
      <ImageWithFallback src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ImageWithFallback src={before} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <span className="absolute top-4 left-4 px-2.5 py-1 pointer-events-none" style={{ background: "rgba(10,11,20,.65)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{beforeLabel}</span>
      <span className="absolute top-4 right-4 px-2.5 py-1 pointer-events-none" style={{ background: "rgba(10,11,20,.65)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{afterLabel}</span>
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, width: 2, background: "#fff", transform: "translateX(-1px)", boxShadow: "0 0 10px rgba(0,0,0,.35)" }} />
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

// ─── Data (sourced from redeemersgroup.com/about-us/before-after.html) ───────
// This is its own page per the approved sitemap ("interna") — it used to open
// as a fullscreen modal from a teaser carousel on Our Difference. Rosie's QA
// flagged that pattern: sitemap says dedicated page, so it's a page, reached
// by simple navigation instead of a lightbox.
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

// Example dataset holds 10 of the site's 377 real cases (see BEFORE_AFTER_STATS).
// The grid + category filter + pager below is the pattern to scale to the full
// set once all 377 are scraped into a JSON file — swap BEFORE_AFTER_PROJECTS
// for that JSON and PAGE_SIZE stays 6, matching the live site's page size.
const PAGE_SIZE = 6;
const CATEGORIES = ["All", ...Array.from(new Set(BEFORE_AFTER_PROJECTS.map((p) => p.tag)))];

function BeforeAfterGridSection() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(0);

  const filtered = category === "All" ? BEFORE_AFTER_PROJECTS : BEFORE_AFTER_PROJECTS.filter((p) => p.tag === category);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const selectCategory = (c: string) => { setCategory(c); setPage(0); };

  return (
    <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px mb-10" style={{ background: "rgba(10,11,20,.06)", border: `1px solid ${ON_LIGHT.border}` }}>
          {BEFORE_AFTER_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-6 px-4 text-center" style={{ background: SURFACE.base }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.6vw,32px)", color: B, lineHeight: 1, marginBottom: 4 }}>
                {s.val}
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.45)", letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.05} className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
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
        </Reveal>

        <div className="grid grid-cols-1 gap-8">
          {paged.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="grid grid-cols-1 lg:grid-cols-5 gap-0" style={{ background: "#fff", border: `1px solid ${ON_LIGHT.border}` }}>
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
            </Reveal>
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

// ─── BeforeAfterPage ──────────────────────────────────────────────────────────
export default function BeforeAfterPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Our Difference" />
      </div>
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <button onClick={() => onNavigate?.("our-difference")}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Our Difference</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Before &amp; After</span>
          </div>
        </div>

        <PageHeroBanner
          image={imgFloor03}
          imageAlt="Before and after structural repair"
          eyebrow="Before & After"
          title="Drag to see the difference"
          lede="377 real before-and-after sets — filter by service to see the exact work done."
          minHeight={260}
        />

        <BeforeAfterGridSection />

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
