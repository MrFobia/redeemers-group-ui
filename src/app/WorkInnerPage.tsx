import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowLeft, Star, MapPin, Clock, Calendar, Wrench, Phone } from "lucide-react";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { Logo } from "./components/Logo";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  getWorkItem, relatedWork, workPath, KIND_LABEL, KIND_INDEX,
  type WorkItem, type WorkKind,
} from "./data/workContent";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, NAVY, CHAR, SAND, CREAM, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─────────────────────────────────────────────────────────────────────────────
// WORK INNER PAGE — the single detail page behind every piece of proof.
//
// Reviews, job stories, case studies and project-gallery entries used to open
// in four separate modals. A modal is the wrong container for this content: it
// cannot be linked, shared, indexed or reached with the back button, and the
// longest of them (case studies) already scrolled inside a scroll container.
// One page template now serves all four kinds, with the sections each kind
// actually has — the quote leads for a review, the write-up leads for a case
// study, the gallery leads for a project.
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function Stars({ n, size = 15, color = SAND }: { n: number; size?: number; color?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < n ? color : "transparent"} color={color} strokeWidth={1.5} aria-hidden />
      ))}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ item }: { item: WorkItem }) {
  const lead = item.images[0];
  return (
    <section style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,46%)] gap-10 lg:gap-14 items-center py-12 lg:py-16">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1" style={{ background: "rgba(216,203,165,.16)", border: `1px solid rgba(216,203,165,.42)`, fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>
              {KIND_LABEL[item.kind]}
            </span>
            {item.loc && (
              <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,.55)" }}>
                <MapPin size={13} color={SAND} aria-hidden /> {item.loc}
              </span>
            )}
            {item.date && (
              <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,.4)" }}>
                <Calendar size={13} aria-hidden /> {item.date}
              </span>
            )}
          </div>

          {item.kind === "review" && item.stars ? <div className="mb-4"><Stars n={item.stars} size={18} /></div> : null}

          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(30px,4.4vw,56px)", color: "#fff", lineHeight: 1.02, letterSpacing: "-1px", marginBottom: 18 }}>
            {item.title}
          </h1>

          {item.summary && (
            <p className="max-w-[52ch]" style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
              {item.summary}
            </p>
          )}

          {item.author && item.kind !== "review" && (
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.45)", marginTop: 16 }}>
              Homeowner: {item.author}
            </p>
          )}
        </div>

        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", background: NAVY }}>
          <ImageWithFallback src={lead.src} alt={lead.caption} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

// ─── Facts card ───────────────────────────────────────────────────────────────
function Facts({ item }: { item: WorkItem }) {
  const rows: { icon: React.ReactNode; label: string; value: string }[] = [];
  rows.push({ icon: <Wrench size={14} color={B} aria-hidden />, label: "Service", value: item.service });
  if (item.loc) rows.push({ icon: <MapPin size={14} color={B} aria-hidden />, label: "Location", value: item.loc });
  if (item.duration) rows.push({ icon: <Clock size={14} color={B} aria-hidden />, label: "Time on site", value: item.duration });
  if (item.date) rows.push({ icon: <Calendar size={14} color={B} aria-hidden />, label: "Completed", value: item.date });

  return (
    <div className="lg:sticky lg:top-[220px]">
      <div style={{ background: SURFACE.alt, border: `1px solid ${ON_LIGHT.border}` }} className="p-6">
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>
          Job details
        </p>
        <dl className="flex flex-col">
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-start gap-3 py-3" style={{ borderTop: i === 0 ? "none" : `1px solid ${ON_LIGHT.hairline}` }}>
              <span className="mt-0.5 shrink-0">{r.icon}</span>
              <div>
                <dt style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED, marginBottom: 2 }}>{r.label}</dt>
                <dd style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 14, color: ON_LIGHT.heading }}>{r.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {item.products && item.products.length > 0 && (
          <div className="pt-4 mt-1" style={{ borderTop: `1px solid ${ON_LIGHT.hairline}` }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED, marginBottom: 8 }}>Systems installed</p>
            <ul className="flex flex-col gap-1.5">
              {item.products.map((p) => (
                <li key={p} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: ON_LIGHT.body }}>· {p}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={openInspection}
          className="group w-full flex items-center justify-center gap-2 py-3.5 mt-5"
          style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}
        >
          Schedule free inspection
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
        </button>
        <a href="tel:18335841049" className="w-full flex items-center justify-center gap-2 py-3 mt-2"
          style={{ border: `1.5px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: ON_LIGHT.heading }}>
          <Phone size={14} color={B} aria-hidden /> 1-833-584-1049
        </a>
      </div>
    </div>
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────
function Body({ item }: { item: WorkItem }) {
  const quoteLeads = item.kind === "review";
  return (
    <section style={{ background: SURFACE.base }} className="py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-16">
        <div>
          {quoteLeads && item.quote && (
            <Reveal>
              <blockquote className="mb-10">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.6vw,32px)", color: ON_LIGHT.heading, lineHeight: 1.35, letterSpacing: "-0.4px" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3 mt-6">
                  {item.avatarSrc && (
                    <ImageWithFallback src={item.avatarSrc} alt="" className="w-11 h-11 rounded-full object-cover" />
                  )}
                  <span>
                    <span className="block" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: ON_LIGHT.heading }}>{item.author}</span>
                    <span className="block" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: MUTED }}>Verified customer · {item.loc}</span>
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          )}

          {item.stats && item.stats.length > 0 && (
            <Reveal>
              <div className="flex flex-wrap gap-8 lg:gap-12 pb-8 mb-8" style={{ borderBottom: `1px solid ${ON_LIGHT.hairline}` }}>
                {item.stats.map(([val, label]) => (
                  <div key={val + label}>
                    <div style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(28px,3.4vw,40px)", color: B, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11.5, color: MUTED, marginTop: 6, lineHeight: 1.4, whiteSpace: "pre-line" }}>{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {item.story && item.story.length > 0 && (
            <Reveal delay={0.05}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>
                {item.kind === "review" ? "The job behind this review" : "What happened"}
              </p>
              <div className="flex flex-col gap-5 max-w-[68ch]">
                {item.story.map((p, i) => (
                  <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 16.5, color: ON_LIGHT.body, lineHeight: 1.78 }}>{p}</p>
                ))}
              </div>
            </Reveal>
          )}

          {/* One-photo items (most reviews) never reach the gallery section
              below, which left the column short and the page half empty —
              show the single job photo inline instead. */}
          {item.images.length === 1 && (
            <Reveal delay={0.08}>
              <figure className="mt-10">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", background: DARK }}>
                  <ImageWithFallback src={item.images[0].src} alt={item.images[0].caption} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <figcaption style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: MUTED, marginTop: 8 }}>
                  {item.images[0].caption}
                </figcaption>
              </figure>
            </Reveal>
          )}

          {!quoteLeads && item.quote && (
            <Reveal delay={0.1}>
              <blockquote className="mt-10 p-7" style={{ background: CREAM }}>
                {/* Oversized quote mark instead of a coloured side rule — the
                    same device the testimonial rails already use. */}
                <span aria-hidden style={{ display: "block", fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(0,80,159,.18)", lineHeight: 0.7, marginBottom: 10 }}>&ldquo;</span>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: "clamp(18px,2vw,24px)", color: ON_LIGHT.heading, lineHeight: 1.45 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED }}>
                  {item.author ? `${item.author} · ` : ""}{item.loc}
                </footer>
              </blockquote>
            </Reveal>
          )}
        </div>

        <Facts item={item} />
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
// Big frame + thumbnail rail. No lightbox: the whole point of this page is that
// content stops opening in overlays, and the frame here is already full-width.
function Gallery({ images }: { images: WorkItem["images"] }) {
  const [cur, setCur] = useState(0);
  if (images.length < 2) return null;
  const active = images[Math.min(cur, images.length - 1)];

  return (
    <section style={{ background: SURFACE.alt }} className="py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="flex items-center gap-3 mb-6">
          <span style={{ display: "block", width: 20, height: 2, background: B }} />
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
            On the job ({images.length} photos)
          </h2>
        </div>

        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", background: DARK }}>
          <ImageWithFallback src={active.src} alt={active.caption} className="absolute inset-0 w-full h-full object-cover" />
          <p className="absolute left-0 right-0 bottom-0 px-6 py-4"
            style={{ background: "linear-gradient(0deg, rgba(62,60,73,.88) 0%, rgba(62,60,73,0) 100%)", fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.9)" }}>
            {active.caption}
          </p>
        </div>

        <div className="flex gap-2 mt-2 overflow-x-auto rg-scroll-thin pb-1">
          {images.map((img, i) => {
            const on = i === (cur % images.length);
            return (
              <button
                key={img.src + i}
                onClick={() => setCur(i)}
                aria-label={`Show photo ${i + 1}: ${img.caption}`}
                aria-current={on}
                className="relative shrink-0 overflow-hidden transition-opacity"
                style={{ width: 132, height: 88, border: `2px solid ${on ? B : "transparent"}`, opacity: on ? 1 : 0.62, background: DARK, cursor: "pointer", padding: 0 }}
              >
                <ImageWithFallback src={img.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Related ──────────────────────────────────────────────────────────────────
function Related({ item, onNavigate }: { item: WorkItem; onNavigate: (p: string) => void }) {
  const items = relatedWork(item);
  if (items.length === 0) return null;
  const index = KIND_INDEX[item.kind];

  return (
    <section style={{ background: SURFACE.base }} className="py-14 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.6vw,32px)", color: ON_LIGHT.heading, letterSpacing: "-0.5px" }}>
            More {index.label.toLowerCase()}
          </h2>
          <button onClick={() => onNavigate(index.route)} className="group inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            See all {index.label.toLowerCase()}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.06}>
              <button
                onClick={() => onNavigate(workPath(w.kind, w.slug))}
                className="group w-full h-full text-left flex flex-col transition-colors hover:border-black/25"
                style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, cursor: "pointer", padding: 0 }}
              >
                <span className="relative block w-full overflow-hidden" style={{ aspectRatio: "16/10", background: DARK }}>
                  <ImageWithFallback src={w.images[0].src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-col gap-2 p-5">
                  <span className="flex items-center gap-2">
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9.5, color: B, letterSpacing: 2, textTransform: "uppercase" }}>{w.service}</span>
                    {w.loc && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11.5, color: MUTED }}>· {w.loc}</span>}
                  </span>
                  {w.stars ? <Stars n={w.stars} size={13} color={B} /> : null}
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: ON_LIGHT.heading, lineHeight: 1.35 }}>
                    {w.kind === "review" && w.quote ? `“${w.quote.slice(0, 92)}${w.quote.length > 92 ? "…" : ""}”` : w.title}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function Cta() {
  return (
    <section style={{ background: SURFACE.cta }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(26px,3.4vw,42px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.8px", marginBottom: 10 }}>
            Seeing the same thing at your house?
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15.5, color: "rgba(161,205,241,.9)", lineHeight: 1.65 }}>
            Free inspection, written diagnosis, and a fixed price before any work starts.
          </p>
        </div>
        <button onClick={openInspection} className="group inline-flex items-center justify-center gap-2 px-8 py-4 shrink-0"
          style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: B, border: "none", cursor: "pointer" }}>
          Schedule free inspection
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
        </button>
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
    <footer style={{ background: SURFACE.footer }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="lg:w-72 shrink-0">
            <button onClick={onBack} className="h-20 mb-5 block"><Logo light /></button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <button onClick={openInspection} className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}>
              Free Inspection <ArrowRight size={13} aria-hidden />
            </button>
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

// ─── Not found ────────────────────────────────────────────────────────────────
function Missing({ kind, onNavigate }: { kind: WorkKind; onNavigate: (p: string) => void }) {
  const index = KIND_INDEX[kind];
  return (
    <section style={{ background: SURFACE.base }} className="py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: "clamp(28px,3.4vw,44px)", color: ON_LIGHT.heading, letterSpacing: "-0.8px", marginBottom: 12 }}>
          We couldn&rsquo;t find that {KIND_LABEL[kind].toLowerCase()}
        </h1>
        <p className="max-w-[54ch]" style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: ON_LIGHT.body, lineHeight: 1.7, marginBottom: 24 }}>
          The link may be out of date. Everything we&rsquo;ve published is on the {index.label.toLowerCase()} page.
        </p>
        <button onClick={() => onNavigate(index.route)} className="group inline-flex items-center gap-2 px-7 py-3.5"
          style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
          Go to {index.label}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
    </section>
  );
}

// Highlight the same nav item the listing page for this kind highlights.
const NAV_ACTIVE: Record<WorkKind, string> = {
  "review": "",
  "job-story": "",
  "case-study": "Resources",
  "project-gallery": "Our Difference",
};

// ─── WorkInnerPage ────────────────────────────────────────────────────────────
export default function WorkInnerPage({ kind, slug, onBack, onNavigate }: {
  kind: WorkKind;
  slug?: string;
  onBack: () => void;
  onNavigate?: (p: string) => void;
}) {
  useEffect(() => { window.scrollTo(0, 0); }, [kind, slug]);
  const go = onNavigate ?? (() => onBack());
  const item = getWorkItem(kind, slug);
  const index = KIND_INDEX[kind];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={go} active={NAV_ACTIVE[kind]} />
      </div>

      <div className="w-full min-h-screen pt-[97px] md:pt-[131px] lg:pt-[147px] xl:pt-[163px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: index.label, onClick: () => go(index.route) },
          { label: item ? item.title : "Not found" },
        ]} />

        {item ? (
          <>
            <Hero item={item} />
            <Body item={item} />
            <Gallery images={item.images} />

            <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-8" style={{ background: SURFACE.base }}>
              <button onClick={() => go(index.route)} className="group inline-flex items-center gap-2"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" aria-hidden />
                Back to {index.label.toLowerCase()}
              </button>
            </div>

            <Related item={item} onNavigate={go} />
          </>
        ) : (
          <Missing kind={kind} onNavigate={go} />
        )}

        <Cta />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
