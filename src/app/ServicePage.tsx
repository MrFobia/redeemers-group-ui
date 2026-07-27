import { useState, useEffect, useRef } from "react";
import { openInspection } from "./components/InspectionModal";
import { motion, useInView } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ChevronRight, ArrowRight, Building2 } from "lucide-react";
import { getService, type ServiceDef, type Solution, type CostRange } from "./data/services";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { FloatingSideNav } from "./components/FloatingSideNav";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { ProjectGallery } from "./components/ProjectGallery";

// ─── Brand Tokens (matches homepage) ─────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";


// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
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

// ─── Top bar ──────────────────────────────────────────────────────────────────

// ─── Hero: Problem Signs Section ──────────────────────────────────────────────
// Symptom copy comes from data/services.ts, which mirrors the approved sitemap
// verbatim — never hardcode symptom labels here.
function SymptomAccordion({ svc, onNavigate }: { svc: ServiceDef; onNavigate?: (p: string) => void }) {
  const [open, setOpen] = useState<string>(svc.symptoms[0]?.id ?? "");
  return (
    <AccordionPrimitive.Root type="single" value={open} onValueChange={(v) => setOpen(v || "")}>
      {svc.symptoms.map((s) => (
        <AccordionPrimitive.Item key={s.id} value={s.id} style={{ marginBottom: 8 }}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className="w-full flex items-center justify-between px-4 transition-colors text-left group"
              style={{
                height: 45,
                background: open === s.id ? B : "#fff",
                borderRadius: open === s.id ? "4px 4px 0 0" : 4,
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: open === s.id ? "#fff" : CHAR }}>
                {s.q}
              </span>
              <ChevronDown
                size={16}
                className="shrink-0 ml-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                color={open === s.id ? "rgba(255,255,255,.8)" : MUTED}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden rdx-accordion-content">
            <div className="px-4 py-3"
              style={{
                background: "rgba(26,82,168,0.25)",
                border: `1px solid ${B}`,
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
              }}>
              {/* Photo of the symptom — the panel has to show what it looks
                  like, not just describe it. */}
              <div className="flex gap-4 mb-4">
                <div className="relative overflow-hidden shrink-0" style={{ width: 104, height: 78 }}>
                  <ImageWithFallback src={s.img} alt={s.q} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", lineHeight: 1.7, margin: 0 }}>{s.a}</p>
              </div>
              <button
                onClick={() => onNavigate?.("problem-sign-inner")}
                className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-85"
                style={{
                  background: SAND, color: DARK, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700,
                  padding: "9px 16px", border: "none", cursor: "pointer",
                }}
              >
                See full solution
                <ArrowRight size={14} />
              </button>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

function HeroSection({ svc, onNavigate }: { svc: ServiceDef; onNavigate?: (p: string) => void }) {
  return (
    <section
      id="overview"
      className="relative w-full overflow-hidden"
      style={{ minHeight: 680 }}
    >
      {/* Background image */}
      <img
        src={svc.heroImg}
        alt={svc.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay — dark left, fades right */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(120.41deg, rgba(10,11,20,0.88) 8.49%, rgba(10,11,20,0.55) 54.15%, rgba(10,11,20,0.20) 91.51%)" }}
      />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-20 lg:py-28">
        <div style={{ maxWidth: 587 }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="flex items-center justify-center shrink-0" style={{ width: 34, height: 34 }}>
              {svc.iconImg
                ? <img src={svc.iconImg} alt="" className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                : <Building2 size={30} color="#fff" strokeWidth={1.8} />}
            </span>
            <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>
              {svc.name}
            </span>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(38px,4.5vw,68px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 32, whiteSpace: "pre-line" }}>
            {svc.heroHeadline}
          </h1>

          {/* Accordion — services with no Problem Signs node in the sitemap
              (Commercial) get a direct CTA instead of a symptom list. */}
          {svc.symptoms.length > 0 ? (
            <>
              <SymptomAccordion svc={svc} onNavigate={onNavigate} />
              <p style={{ marginTop: 20, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                {"Can't find your symptom? "}
                <button
                  onClick={() => onNavigate?.("problem-signs")}
                  style={{ color: "#fff", fontWeight: 600, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 13 }}
                >
                  View all problem signs →
                </button>
              </p>
            </>
          ) : (
            <button
              onClick={() => openInspection()}
              className="group inline-flex items-center gap-3 px-8 py-4"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", border: "none", cursor: "pointer" }}
            >
              Request a bid
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions / Services Grid ────────────────────────────────────────────────
function SolutionCard({ sol, size }: { sol: Solution; size: "lg" | "sm" | "wide" }) {
  const imgH = size === "lg" ? 381 : 200;
  const titleSize = size === "sm" ? 24 : 34;
  const pad = size === "sm" ? "28px 32px 32px" : "40px 40px 44px";

  const body = (
    <div className="flex flex-col flex-1 justify-center" style={{ padding: size === "wide" ? "48px 40px 52px" : pad }}>
      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: size === "sm" ? 12 : 16 }}>
        Solution
      </span>
      <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: titleSize, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 12px" }}>
        {sol.title}
      </h3>
      {/* Sitemap flags a couple of concrete services as not yet launched — the
          label has to survive on the page, not just in the sitemap. */}
      {sol.note && (
        <span className="inline-flex items-center w-fit px-2.5 py-1 mb-3"
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: SAND, background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.25)", letterSpacing: ".3px" }}>
          {sol.note}
        </span>
      )}
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: size === "sm" ? 14 : 15, color: "rgba(255,255,255,.55)", lineHeight: 1.75, margin: "0 0 24px", maxWidth: size === "wide" ? 480 : undefined }}>
        {sol.blurb}
      </p>
      <button
        onClick={() => openInspection()}
        className="inline-flex items-center gap-2"
        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: SAND, background: "none", border: "none", padding: 0, cursor: "pointer", width: "fit-content" }}
      >
        Schedule now
        <ChevronRight size={16} color={SAND} />
      </button>
    </div>
  );

  if (size === "wide") {
    return (
      <div className="flex flex-col md:flex-row overflow-hidden h-full" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", minHeight: 340 }}>
        {body}
        <div className="relative overflow-hidden shrink-0 w-full md:w-[45%] h-56 md:h-auto" style={{ minHeight: 280 }}>
          <ImageWithFallback src={sol.img} alt={sol.title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden h-full" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
      <div className="relative overflow-hidden shrink-0" style={{ height: imgH }}>
        <ImageWithFallback src={sol.img} alt={sol.title} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      {body}
    </div>
  );
}

// The template row is "1 large card + 2 stacked". Services carry 2–5 solutions
// per the sitemap, so rows are packed: groups of 3 first, then a pair, then a
// single full-width card — never a half-empty row.
function packRows(solutions: Solution[]): Solution[][] {
  const rows: Solution[][] = [];
  let rest = [...solutions];
  while (rest.length >= 3) {
    rows.push(rest.slice(0, 3));
    rest = rest.slice(3);
  }
  if (rest.length) rows.push(rest);
  return rows;
}

function SolutionsSection({ svc }: { svc: ServiceDef }) {
  const rows = packRows(svc.solutions);

  return (
    <section id="solutions" style={{ background: DARK }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Section header */}
        <Reveal className="mb-14">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ display: "block", width: 32, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              {svc.name}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,58px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>
            {svc.solutionsHeadline}
          </h2>
        </Reveal>

        <div className="flex flex-col" style={{ gap: 20 }}>
          {rows.map((row, ri) => (
            <Reveal key={row[0].title} delay={ri * 0.08}>
              {row.length === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 20 }}>
                  <SolutionCard sol={row[0]} size="lg" />
                  <div className="flex flex-col" style={{ gap: 20 }}>
                    <SolutionCard sol={row[1]} size="sm" />
                    <SolutionCard sol={row[2]} size="sm" />
                  </div>
                </div>
              )}
              {row.length === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 20 }}>
                  <SolutionCard sol={row[0]} size="lg" />
                  <SolutionCard sol={row[1]} size="lg" />
                </div>
              )}
              {row.length === 1 && <SolutionCard sol={row[0]} size="wide" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem Signs Section (sitemap: "CTA per symptom") ───────────────────────
// One card per symptom straight from the sitemap list — the earlier version
// invented three category buckets ("Moisture & Water", etc.) that exist nowhere
// in the approved sitemap.
function ProblemSignsSection({ svc, onNavigate }: { svc: ServiceDef; onNavigate?: (p: string) => void }) {
  if (!svc.symptoms.length) return null;
  return (
    <section id="signs" style={{ background: CHAR }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Problem Signs
          </p>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
            What are you noticing?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED, maxWidth: 560, margin: "0 auto" }}>
            Select a symptom to find the right solution for your home
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {svc.symptoms.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <div className="group h-full flex flex-col" style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
                {/* Photo first: homeowners recognize the problem by sight before
                    they read the label. */}
                <div className="relative overflow-hidden shrink-0" style={{ height: 190 }}>
                  <ImageWithFallback
                    src={s.img}
                    alt={s.q}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.55) 0%, rgba(10,11,20,0) 55%)" }} />
                </div>
                <div className="flex flex-col flex-1 px-7 py-7">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.25, marginBottom: 12 }}>
                    {s.q}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.75, marginBottom: 22, flex: 1 }}>
                    {s.a}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button
                      onClick={() => openInspection()}
                      className="inline-flex items-center gap-2 px-5 py-2.5"
                      style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
                    >
                      Free inspection
                      <ArrowRight size={13} />
                    </button>
                    <button
                      onClick={() => onNavigate?.("problem-sign-inner")}
                      className="group inline-flex items-center gap-1.5"
                      style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    >
                      See full solution
                      <ChevronRight size={14} color={SAND} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
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

// ─── Cost Guide Section ───────────────────────────────────────────────────────
// Light module (client QA: break up the all-dark rhythm). Replaces the generic
// "progress bar" pricing pattern with a plain priced list — the bar had no real
// proportional meaning, it was just decoration.
function CostRow({ item, i }: { item: CostRange; i: number }) {
  return (
    <div className="flex items-center justify-between gap-6" style={{ padding: "18px 0", borderBottom: "1px solid rgba(10,11,20,.1)" }}>
      <div className="flex items-center gap-4">
        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 12, color: SAND, flexShrink: 0 }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: CHAR }}>{item.label}</span>
      </div>
      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 16, color: B, whiteSpace: "nowrap" }}>{item.range}</span>
    </div>
  );
}

function CostSection({ svc, onNavigate }: { svc: ServiceDef; onNavigate?: (p: string) => void }) {
  // Sitemap: only services with a "Cost guide" child render this section.
  if (!svc.cost) return null;
  const cost = svc.cost;
  return (
    <section id="cost" style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + priced list */}
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase", margin: 0 }}>
                Cost Guide
              </p>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,3.5vw,48px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
              {cost.headline}
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.75, marginBottom: 32 }}>
              {cost.intro}
            </p>
            <div className="flex flex-col mb-10">
              {cost.ranges.map((item, i) => (
                <CostRow key={item.label} item={item} i={i} />
              ))}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button onClick={() => onNavigate?.("pricing")} className="group inline-flex items-center justify-center gap-2 px-7 py-3.5"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
                See full cost guide
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => onNavigate?.("pricing")} className="inline-flex items-center gap-2"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                Financing options
                <ArrowRight size={14} />
              </button>
            </div>
          </Reveal>

          {/* Right: Image + callout */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative overflow-hidden" style={{ border: "1px solid rgba(10,11,20,.1)" }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1745865448615-aa1905c6db7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cost estimation"
                  className="w-full object-cover"
                  style={{ height: 420 }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.75) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
                    {cost.calloutLabel}
                  </p>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", lineHeight: 1.1, whiteSpace: "pre-line" }}>
                    {cost.calloutValue}
                  </p>
                </div>
              </div>
              {/* Financing chip — dark accent on the light section, same move as the FAQ closing panel */}
              <div className="absolute -bottom-4 right-4 px-5 py-3 flex items-center gap-3"
                style={{ background: DARK, border: `1px solid ${SAND}30` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND }}>Financing from $79/month available</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Project Gallery ──────────────────────────────────────────────────────────
function GallerySection() {
  return <ProjectGallery id="gallery" />;
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
// Light module (client QA: break up the all-dark rhythm). Rows replace the
// boxed +/- accordion (generic template pattern) with a numbered list divided
// by rules, matching the Cost Guide list next to it and the TypeRow pattern
// from the style guide.
function FaqSection({ svc, onNavigate }: { svc: ServiceDef; onNavigate?: (p: string) => void }) {
  const [open, setOpen] = useState<string>("");
  return (
    <section id="faq" style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase", margin: 0 }}>
              FAQs
            </p>
            <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
            Frequently asked questions
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED }}>
            Find answers about our services and process
          </p>
        </Reveal>

        <div className="max-w-[768px] mx-auto">
          <AccordionPrimitive.Root type="single" value={open} onValueChange={(v) => setOpen(v)} collapsible>
            {svc.faqs.map((faq, i) => (
              <AccordionPrimitive.Item key={i} value={String(i)}
                className="overflow-hidden"
                style={{ borderBottom: "1px solid rgba(10,11,20,.1)" }}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    className="w-full flex items-center gap-5 text-left group transition-colors"
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "22px 0" }}
                  >
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 12, color: SAND, flexShrink: 0, width: 22 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 17, color: CHAR, flex: 1, paddingRight: 16, lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div className="shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 group-data-[state=open]:rotate-45"
                      style={{ color: open === String(i) ? B : MUTED }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden rdx-accordion-content">
                  <div className="pb-6" style={{ paddingLeft: 42, paddingRight: 40 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.8 }}>{faq.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CtaBanner({ svc }: { svc: ServiceDef }) {
  return (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      {/* BG image overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt={svc.ctaHeadline.replace("\n", " ")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,28,74,.82)" }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-8" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Get started today</span>
            <div className="h-[1px] w-8" style={{ background: SAND }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 16, whiteSpace: "pre-line" }}>
            {svc.ctaHeadline}
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · Same-week availability · Lifetime warranty
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: NAVY }}>
              <span className="relative z-10">{svc.symptoms.length ? "Schedule Free Inspection" : "Request a Bid"}</span>
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
            <button onClick={onBack} className="h-20 mb-5 block">
              <Logo light />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              Free Inspection
              <ArrowRight size={13} />
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

// ─── ServicePage ──────────────────────────────────────────────────────────────
export default function ServicePage({ onBack, onNavigate, scrollTo, slug }: { onBack: () => void; onNavigate?: (p: string) => void; scrollTo?: string; slug?: string }) {
  const svc = getService(slug);
  const tabs = svc.tabs;
  const [activeTab, setActiveTab] = useState(scrollTo ?? "overview");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 160;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Scroll to initial section if coming from nav link
  useEffect(() => {
    if (scrollTo) {
      const attempt = () => {
        const el = document.getElementById(scrollTo);
        if (el) {
          const offset = 160;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      // Delay so page has rendered
      const t = setTimeout(attempt, 120);
      return () => clearTimeout(t);
    }
  }, []);

  // Track active tab on scroll
  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const handler = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY + 160 >= sections[i].offsetTop) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [tabs]);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{`
        @keyframes rdx-slideDown {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes rdx-slideUp {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        [data-state=open].rdx-accordion-content {
          animation: rdx-slideDown 0.24s ease-out;
        }
        [data-state=closed].rdx-accordion-content {
          animation: rdx-slideUp 0.18s ease-in;
        }
      `}</style>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Services" />
      </div>
      {/* Client QA: replaces the fixed horizontal section bar (a 3rd competing
          nav layer). This page has no main-nav dropdown that already covers
          its internal anchors, so per the client's alternative it becomes a
          floating rail that follows the scroll instead of stacking under the header. */}
      <FloatingSideNav tabs={tabs} active={activeTab} onChange={scrollToSection} />
      <div className="w-full min-h-screen pt-[81px] md:pt-[148px]" style={{ background: "#0A0B14" }}>
        {/* Breadcrumb */}
        <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2">
            <button onClick={onBack}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <button onClick={() => onNavigate?.("services-landing")}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-white transition-colors">Services</button>
            <ChevronRight size={14} color="rgba(255,255,255,.3)" />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>{svc.name}</span>
          </div>
        </div>
        <HeroSection svc={svc} onNavigate={onNavigate} />
        <SolutionsSection svc={svc} />
        <ProblemSignsSection svc={svc} onNavigate={onNavigate} />
        <CostSection svc={svc} onNavigate={onNavigate} />
        <GallerySection />
        <FaqSection svc={svc} onNavigate={onNavigate} />
        <CtaBanner svc={svc} />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
