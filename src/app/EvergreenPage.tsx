import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Play, Award as AwardIcon } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { PageHeroBanner } from "./components/PageHeroBanner";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import imgFloor03 from "../assets/floor-03.jpeg";
import imgFloor04 from "../assets/floor-04.jpeg";

import { B, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

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

// ─── Content ────────────────────────────────────────────────────────────────
// Client brief: "What Is Evergreen" page — its own interna reachable from the
// Evergreen module on Our Difference, not just a paragraph buried in the
// company-story section there.
//
// The 7Ps list + definitions are copied verbatim from the Tugboat Institute
// (tugboatinstitute.com/what-is-evergreen/), per the client's source. The
// "why this matters for you" line under each one is written copy (client:
// "we will have to write this content") — draft, pending client sign-off.
const SEVEN_PS: { name: string; definition: string; impact: string }[] = [
  {
    name: "Purpose",
    definition: "Having a compelling reason for existing – a North Star above all else.",
    impact: "Every job ties back to why the company exists: protecting the homes people have built their lives around — not hitting a sales quota.",
  },
  {
    name: "Perseverance",
    definition: "Having the ambition and the resilience to overcome obstacles and keep pursuing the purpose indefinitely into the future.",
    impact: "We're not building to flip. The lifetime warranty only means something if we're still around to honor it decades from now.",
  },
  {
    name: "People First",
    definition: "Engaging a workforce of talented associates who excel as a team and are motivated by the purpose and the culture, as well as by total compensation, in the belief that, by taking care of them, they will take care of the customers, suppliers, partners, communities, and their families.",
    impact: "Take care of the crew and they take care of your home. Low turnover means the technician at your door has done this hundreds of times, not dozens.",
  },
  {
    name: "Private",
    definition: "Taking advantage of the ability of closely held private companies to have a longer-term view, greater confidentiality around strategies, and more operating flexibility than public or exit-oriented businesses.",
    impact: "No private-equity owner pushing quarterly targets down to your estimate. We can make the right call for your home, not the right call for a shareholder report.",
  },
  {
    name: "Profit",
    definition: "Not mistaking profit as the purpose of the business; but recognizing it is essential to survival and independence, and the most accurate measure of customer value delivered.",
    impact: "Profit funds the warranty, the training, and the next generation of the business — it's a result of doing right by you, not the reason we show up.",
  },
  {
    name: "Paced Growth",
    definition: "Having the discipline to focus on long-term strategy, balance short-term and long-term performance, and grow steadily and consistently from year to year.",
    impact: "We'd rather grow slow and keep the standard than grow fast and start cutting corners on materials, training, or crew quality.",
  },
  {
    name: "Pragmatic Innovation",
    definition: "Embracing a continuous-improvement process built around taking capital-efficient, calculated risks to innovate creatively within constraints.",
    impact: "New methods and materials get adopted once they're proven to hold up — not because they're trendy.",
  },
];

// TODO(content): the client's brief for this section ("What Does It Mean
// When a Company is Certified Evergreen?") pointed to text to reuse but the
// message cut off before it arrived — this paragraph is a safe placeholder
// draft, not final client copy. Swap it out once the client sends the text.
const CERTIFIED_MEANING = "Certified Evergreen recognizes companies that put these seven principles into practice — not just onto a mission statement. It's an outside look at how the business is actually run: purpose-driven, privately held, and built to operate this way for the long run, not a label a company gives itself.";

// TODO(content): client asked for 2 awards on this page as a visual element,
// without specifying which two. These are the closest matches already in the
// site's award data (see AwardsPage.tsx) — swap for the client's picks if
// different.
const FEATURED_AWARDS = [
  { title: "2025 Best Evergreen Company", org: "Industry Recognition", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/69bc31ecc2ddc_image-8.jpg" },
  { title: "Best Place To Work 2024", org: "Industry Recognition", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb00bad945f_redeemers-12.jpg" },
];

// ─── 1. What Is Evergreen ─────────────────────────────────────────────────────
function WhatIsSection() {
  return (
    <section id="what-is" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>What is Evergreen?</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              A business built to last, not to be sold
            </h2>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(10,11,20,.6)", lineHeight: 1.8 }}>
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

          <Reveal delay={0.1} className="relative overflow-hidden" style={{ borderRadius: 2 }}>
            <ImageWithFallback src={imgFloor03} alt="Redeemers team on site" className="w-full object-cover" style={{ height: 460 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,.5) 0%,transparent 55%)" }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 2. The 7Ps ───────────────────────────────────────────────────────────────
function SevenPsSection() {
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
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: CHAR, lineHeight: 1.65 }}>
                  {p.impact}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ─── 3. Certified Evergreen ───────────────────────────────────────────────────
function CertifiedSection() {
  return (
    <section id="certified" style={{ background: SURFACE.base }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Emblem — TODO(asset): client flagged they still need to send a
              high-quality file for the Certified Evergreen emblem. Bordered
              placeholder holds the spot instead of a fake/stock badge. */}
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <div className="flex items-center justify-center" style={{ height: 340, background: SURFACE.alt, border: `1px dashed ${ON_LIGHT.border}` }}>
              <div className="flex flex-col items-center gap-3 text-center px-8">
                <AwardIcon size={40} color={SAND} strokeWidth={1.4} />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
                  Certified Evergreen emblem<br />— pending high-res file from client
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Certified Evergreen</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              What certification actually means
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(10,11,20,.6)", lineHeight: 1.8 }}>
              {CERTIFIED_MEANING}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Video + Awards strip ──────────────────────────────────────────────────
// Client: "these are just items that can visually spice up the page — video,
// 2 awards, Certified Evergreen emblem." Emblem lives with the certification
// copy above (it's the visual for that claim); video + awards get their own
// closing strip so the page doesn't end on a wall of text.
function VideoAwardsSection() {
  return (
    <section id="video-awards" style={{ background: SURFACE.alt }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video placeholder — TODO(asset): client hasn't sent the video
              file yet. Play-button overlay on a still marks the spot. */}
          <Reveal className="relative overflow-hidden group cursor-pointer" style={{ minHeight: 320 }}>
            <ImageWithFallback src={imgFloor04} alt="Evergreen story video" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "rgba(10,11,20,.45)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.35)" }}>
                <Play size={22} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 12, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                Watch
              </p>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>
                What being Evergreen means to us
              </p>
            </div>
          </Reveal>

          {/* 2 featured awards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURED_AWARDS.map((award, i) => (
              <Reveal key={award.title} delay={i * 0.1} className="flex flex-col h-full">
                <div className="relative overflow-hidden flex-1" style={{ border: `1px solid ${ON_LIGHT.border}`, minHeight: 260 }}>
                  <ImageWithFallback src={award.img} alt={award.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: CHAR, marginTop: 12, lineHeight: 1.4 }}>{award.title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>{award.org}</p>
              </Reveal>
            ))}
          </div>
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

        <PageHeroBanner
          image={imgFloor03}
          imageAlt="Redeemers Group — Evergreen certified"
          eyebrow="Our Difference"
          title="What Is Evergreen?"
          lede="A business philosophy built on seven principles, and the reason Redeemers Group is still standing behind every job it's ever done."
        >
          <button onClick={() => openInspection()}
            className="inline-flex items-center gap-2 px-6 py-3.5 hover:opacity-90 transition-opacity"
            style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
            Get Your Free Inspection <ArrowRight size={14} />
          </button>
        </PageHeroBanner>

        <WhatIsSection />
        <SevenPsSection />
        <CertifiedSection />
        <VideoAwardsSection />
        <CtaBanner />

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
