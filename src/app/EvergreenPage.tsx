import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import imgFloor04 from "../assets/floor-04.jpeg";

import { B, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

// Client QA (Aug 19): "The background image should be one of a forest of
// continuous evergreen trees." No forest photo exists in the asset library
// yet, so this is a stock placeholder in the same style as the other stock
// fill-ins already on the site (About, Careers, Job Stories, …) — swap for
// Redeemers' own photography if/when they send one.
const imgEvergreenForest = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1800";

// Real Certified Evergreen emblem (Tugboat Institute), sent by the client.
const imgCertifiedEvergreen = "https://cdn.treehouseinternetgroup.com/cms_images/218/Certified%20Evergreen.jpg";

function Reveal({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

// ─── Content ────────────────────────────────────────────────────────────────
// Client brief: "What Is Evergreen" page — its own interna reachable from the
// Evergreen module on Our Difference, not just a paragraph buried in the
// company-story section there.
//
// The 7Ps list + definitions are copied verbatim from the Tugboat Institute
// (tugboatinstitute.com/what-is-evergreen/), per the client's source. The
// "why this matters for you" line under each one is written copy (client:
// "we will have to write this content") — draft, pending client sign-off.
// Client QA (Aug 19): "Under each principle section, I'd like to be able to
// link to things where appropriate. For example, if we wanted to link to a
// Best Places to Work award under People First." `link` is that hook.
// TEST DATA (Aug 19): client asked for a placeholder link on every principle
// so all 7 preview the pattern in a walkthrough, even without a confirmed
// real destination for each yet — labels/pages below are best-guess
// placeholders (existing pages only, nothing fabricated), not final copy.
// Swap each `link` for the client's actual pick once she sends one per
// principle; delete any she doesn't want linked.
const SEVEN_PS: { name: string; definition: string; impact: string; link?: { label: string; page: string } }[] = [
  {
    name: "Purpose",
    definition: "Having a compelling reason for existing – a North Star above all else.",
    impact: "Every job ties back to why the company exists: protecting the homes people have built their lives around — not hitting a sales quota.",
    link: { label: "Read our story (TEST LINK)", page: "our-difference#pledge" },
  },
  {
    name: "Perseverance",
    definition: "Having the ambition and the resilience to overcome obstacles and keep pursuing the purpose indefinitely into the future.",
    impact: "We're not building to flip. The lifetime warranty only means something if we're still around to honor it decades from now.",
    link: { label: "See real homeowner stories (TEST LINK)", page: "case-studies" },
  },
  {
    name: "People First",
    definition: "Engaging a workforce of talented associates who excel as a team and are motivated by the purpose and the culture, as well as by total compensation, in the belief that, by taking care of them, they will take care of the customers, suppliers, partners, communities, and their families.",
    impact: "Take care of the crew and they take care of your home. Low turnover means the technician at your door has done this hundreds of times, not dozens.",
    link: { label: "See our Best Places to Work award", page: "awards" },
  },
  {
    name: "Private",
    definition: "Taking advantage of the ability of closely held private companies to have a longer-term view, greater confidentiality around strategies, and more operating flexibility than public or exit-oriented businesses.",
    impact: "No private-equity owner pushing quarterly targets down to your estimate. We can make the right call for your home, not the right call for a shareholder report.",
    link: { label: "Meet the team (TEST LINK)", page: "team" },
  },
  {
    name: "Profit",
    definition: "Not mistaking profit as the purpose of the business; but recognizing it is essential to survival and independence, and the most accurate measure of customer value delivered.",
    impact: "Profit funds the warranty, the training, and the next generation of the business — it's a result of doing right by you, not the reason we show up.",
    link: { label: "See our financing options (TEST LINK)", page: "pricing" },
  },
  {
    name: "Paced Growth",
    definition: "Having the discipline to focus on long-term strategy, balance short-term and long-term performance, and grow steadily and consistently from year to year.",
    impact: "We'd rather grow slow and keep the standard than grow fast and start cutting corners on materials, training, or crew quality.",
    link: { label: "Browse our project history (TEST LINK)", page: "case-studies" },
  },
  {
    name: "Pragmatic Innovation",
    definition: "Embracing a continuous-improvement process built around taking capital-efficient, calculated risks to innovate creatively within constraints.",
    impact: "New methods and materials get adopted once they're proven to hold up — not because they're trendy.",
    link: { label: "See our methods & materials (TEST LINK)", page: "resources" },
  },
];

// Section 3 of the client's brief: "What Does It Mean When a Company is
// Certified Evergreen?" Definition and criteria follow the Tugboat Institute's
// own Certified Evergreen page; the closing line about what it means for a
// homeowner is written copy, pending client sign-off.
const CERTIFIED_MEANING = [
  "Certified Evergreen is a rigorous process that validates a private company's commitment to long-term growth and success, assessed against the Evergreen 7Ps® principles. It isn't a label a company gives itself — the assessment looks at a company's values, its practices, and its people-focused culture.",
  "Certified companies prioritize sustained growth over quick profits, put Purpose and People First, and are held to continuous improvement and a positive impact on their community. In short, the certification tells you a business is built to last.",
  "For a homeowner, that's the part that matters: a warranty is only as good as the company standing behind it in ten years, and this is an outside body confirming Redeemers is built to still be here.",
];

// TODO(content): client asked for 2 awards on this page as a visual element,
// without specifying which two. These are the closest matches already in the
// site's award data (see AwardsPage.tsx) — swap for the client's picks if
// different.
const FEATURED_AWARDS = [
  { title: "2025 Best Evergreen Company", org: "Industry Recognition", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/69bc31ecc2ddc_image-8.jpg" },
  { title: "Best Place To Work 2024", org: "Industry Recognition", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb00bad945f_redeemers-12.jpg" },
];

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
// Client QA (Aug 19): the old dark PageHeroBanner ("What Is Evergreen?" title +
// generic lede) and the section right under it ("A business built to last, not
// to be sold") said the same thing twice — client: "the first section seems
// redundant." Fix folds them into one: the dark banner stays (client: "keeping
// the dark background"), but its content is now the "business built to last"
// copy that used to live below, its background becomes the evergreen-forest
// photo instead of a job-site photo, and the Certified Evergreen emblem — the
// client's "belongs at the very top of the page" — leads the section. Only one
// CTA now, where there used to be two stacked ones between this banner and the
// section below.
function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0A0B14" }}>
      <div className="absolute inset-0">
        <ImageWithFallback src={imgEvergreenForest} alt="A forest of evergreen trees" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,11,20,0.94) 0%, rgba(10,11,20,0.85) 46%, rgba(11,28,74,0.6) 100%)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-20 md:py-24 lg:py-28">
        <Reveal style={{ maxWidth: 720 }}>
          {/* Certified Evergreen emblem — real Tugboat Institute mark, sent by
              the client. Its own artwork has a white background (like the
              Love Well logo), so it sits on a white card instead of being
              dropped straight onto the dark hero. */}
          <div className="inline-flex items-center justify-center mb-8 px-5 py-4" style={{ background: "#fff" }}>
            <img src={imgCertifiedEvergreen} alt="Certified Evergreen" className="block h-[64px] md:h-[76px] w-auto" />
          </div>

          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Our Difference · Evergreen</span>
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 24 }}>
            A business built to last, not to be sold
          </h1>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.7)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 18 }}>
              Evergreen isn't a marketing label — it's a business philosophy from the Tugboat Institute, a global community of privately held companies built to endure for generations rather than be optimized for a quick exit.
            </p>
            <p>
              Evergreen companies choose purpose over a sale, and long-term thinking over quarterly targets. Redeemers Group is one of them — which is why the same crew, the same standards, and the same warranty are still here years after the work is done.
            </p>
          </div>
          <button onClick={() => openInspection()} className="group mt-8 inline-flex items-center gap-2 px-7 py-4 transition-all"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
            Schedule Free Inspection
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 2. The 7Ps ───────────────────────────────────────────────────────────────
function SevenPsSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section id="seven-ps" style={{ background: SURFACE.alt }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-8" style={{ background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>The Evergreen 7Ps&reg;</span>
            <div className="h-[2px] w-8" style={{ background: B }} />
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
            The seven principles we run on
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: MUTED, maxWidth: 640, margin: "0 auto" }}>
            Defined by the Tugboat Institute — this is what each one actually means for the people who work here and the homeowners we work for.
          </p>
        </Reveal>

        {/* Numbered ledger, not a 7-up card grid — 7 items force an
            uneven last row in any column count, and identical boxed
            cards read as the generic AI-grid template. This borrows the
            site's own numbered-row language (ProcessSection's 01–04
            steps, PledgeSection's ledger rows) instead of inventing a
            new pattern. */}
        <Reveal style={{ borderTop: `1px solid ${ON_LIGHT.border}` }}>
          {SEVEN_PS.map((p, i) => (
            <div key={p.name} className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-x-10 gap-y-4 items-start"
              style={{ padding: "36px 4px", borderBottom: `1px solid ${ON_LIGHT.border}` }}>
              <div className="flex items-center gap-4 lg:w-[200px]">
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 15, color: SAND, letterSpacing: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: CHAR, letterSpacing: "-0.3px" }}>
                  {p.name}
                </h3>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.7, fontStyle: "italic" }}>
                &ldquo;{p.definition}&rdquo;
              </p>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 11, color: B, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
                  What it means for you
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: CHAR, lineHeight: 1.65, marginBottom: p.link ? 10 : 0 }}>
                  {p.impact}
                </p>
                {p.link && (
                  <button onClick={() => onNavigate(p.link!.page)} className="group inline-flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    {p.link.label}
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ─── 3. Certified Evergreen ───────────────────────────────────────────────────
// Client QA (Aug 19): the emblem moved to the very top of the page (see
// HeroSection), which freed up this section's old text+emblem slot — and the
// client separately flagged that the video block felt "put there because
// why not," isolated in its own section with nothing to do with what was
// around it. Fix for both: the video now fills that freed-up slot, paired
// with the certification copy it's actually about (client's own video title
// is literally "What being Evergreen means to us" — that's the same claim
// this text is making). One section, one idea, instead of two disconnected
// ones.
function CertifiedSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section id="certified" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Certified Evergreen</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              What certification actually means
            </h2>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(10,11,20,.6)", lineHeight: 1.8 }}>
              {CERTIFIED_MEANING.map((para, i) => (
                <p key={i} style={{ marginBottom: i < CERTIFIED_MEANING.length - 1 ? 18 : 0 }}>{para}</p>
              ))}
            </div>
          </Reveal>

          {/* Video, TODO(asset): file hasn't come in from the client yet —
              lightbox is wired to embed it as soon as it does (same pattern
              LoveWellPage/CaseStudiesShowcase use for theirs). */}
          <Reveal delay={0.1} className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }} onClick={() => setVideoOpen(true)}>
            <ImageWithFallback src={imgFloor04} alt="What being Evergreen means to us" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "rgba(10,11,20,.4)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.35)" }}>
                <Play size={22} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                Watch
              </p>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(18px,2vw,22px)", color: "#fff", letterSpacing: "-0.3px" }}>
                What being Evergreen means to us
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {videoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10" style={{ background: "rgba(0,0,0,.88)" }} onClick={() => setVideoOpen(false)}>
          <div className="relative w-full flex flex-col items-center gap-4" style={{ maxWidth: 900 }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="self-end inline-flex items-center gap-2 px-4 py-2.5 hover:bg-white/15 transition-colors"
              style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.28)", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              <X size={15} color="#fff" />
              Close
            </button>
            <div className="w-full flex flex-col items-center justify-center gap-3 text-center" style={{ aspectRatio: "16/9", background: "#111", border: "1px solid rgba(255,255,255,.12)" }}>
              <Play size={32} color={SAND} />
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.6)", maxWidth: 360 }}>
                Video pending from the client — this lightbox is wired to embed it as soon as the file/link comes in.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── 5. Awards strip ──────────────────────────────────────────────────────────
function AwardsStripSection() {
  return (
    <section id="awards-strip" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-center gap-2 mb-10">
          <div className="w-5 h-[2px]" style={{ background: B }} />
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Recognition</span>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ maxWidth: 780 }}>
          {FEATURED_AWARDS.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.1} className="flex flex-col h-full">
              <div className="relative overflow-hidden flex-1" style={{ border: `1px solid ${ON_LIGHT.border}`, minHeight: 220 }}>
                <ImageWithFallback src={award.img} alt={award.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: CHAR, marginTop: 12, lineHeight: 1.4 }}>{award.title}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{award.org}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA banner ────────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: SURFACE.cta }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-24 text-center">
        <Reveal>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
            Built to last
          </p>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 20 }}>
            The company that fixes it<br />will still be here tomorrow.
          </h2>
          <button onClick={() => openInspection()} className="inline-flex items-center gap-2 px-8 py-4"
            style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#00519F", border: "none", cursor: "pointer" }}>
            Schedule Free Inspection
            <ArrowRight size={16} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
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

// ─── EvergreenPage ──────────────────────────────────────────────────────────────
export default function EvergreenPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Our Difference" />
      </div>
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: "Our Difference", onClick: () => onNavigate?.("our-difference") },
          { label: "Evergreen" },
        ]} />

        <HeroSection />
        <SevenPsSection onNavigate={onNavigate ?? (() => onBack())} />
        <CertifiedSection />
        <AwardsStripSection />
        <CtaBanner />

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
