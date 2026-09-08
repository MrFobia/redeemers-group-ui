import { useState, useEffect, useRef, useCallback } from "react";
import { openInspection } from "./components/InspectionModal";
import { motion, useInView, animate, AnimatePresence } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft, ArrowRight, Play, Download, FileText, X, ShieldCheck, ClipboardCheck, HelpCircle } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { FloatingSideNav } from "./components/FloatingSideNav";
import imgFloor01 from "../assets/floor-01.jpeg";
import imgRevAvatar from "../assets/rev-avatar.png";
import { ReviewModal } from "./components/ReviewModal";
import imgFloor03 from "../assets/floor-03.jpeg";
import imgFloor04 from "../assets/floor-04.jpeg";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { ProjectGallery } from "./components/ProjectGallery";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, CREAM, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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




// ─── NAV TABS data ────────────────────────────────────────────────────────────
// Order/labels from the approved sitemap — keep in sync with SharedNavBar.tsx's
// RESOURCES_SECTIONS.
const NAV_TABS = [
  { id: "gallery", label: "Project Gallery" },
  { id: "buyer-seller", label: "Homeowner Education" },
  { id: "cost", label: "Pricing & Cost Guides" },
  { id: "job-stories", label: "Job Stories" },
  { id: "faq", label: "FAQs" },
  { id: "reviews", label: "Reviews & Testimonials" },
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 420 }}>
      <ImageWithFallback
        src={imgFloor01}
        alt="Resources"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(62,60,73,0.94) 0%,rgba(62,60,73,0.75) 55%,rgba(62,60,73,0.5) 100%)" }} />
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-14 py-24 lg:py-32">
        <Reveal>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-[2px]" style={{ background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Resources</span>
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.5vw,80px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 20, maxWidth: 800 }}>
            Everything you need, in one place
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.6)", lineHeight: 1.75, maxWidth: 560 }}>
            Project galleries, homeowner education, cost guides, job stories, FAQs, and reviews — everything you need to make informed decisions about your home.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


// ─── 3. PROJECT GALLERY ───────────────────────────────────────────────────────
function GallerySection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return <ProjectGallery id="gallery" onNavigate={onNavigate} />;
}

// ─── 4. PRICING (teaser) ──────────────────────────────────────────────────────
// Pricing has too many modules of its own (buyer/seller guides, cost by
// service, cost by city, financing) to live inline here without drowning the
// rest of Resources — it's its own page (PricingPage.tsx), and this is the
// single teaser module that sends visitors there. Keep in sync with
// SharedNavBar.tsx's RESOURCES_SECTIONS.
function CostGuideSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <section id="cost" style={{ background: SURFACE.panel }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <Reveal className="max-w-[640px]">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Pricing</span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
            Transparent pricing for every homeowner
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(161,205,241,.9)", lineHeight: 1.7 }}>
            Buyer &amp; seller guides, cost ranges by service and by city, and financing options — all broken down before we ever knock on your door.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="shrink-0">
          <button onClick={() => onNavigate?.("pricing")} className="group inline-flex items-center gap-3 px-8 py-4"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", border: "none", cursor: "pointer" }}>
            See pricing &amp; cost guides
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 5. DOWNLOAD RESOURCES ────────────────────────────────────────────────────
const RESOURCE_ITEMS = [
  { pages: "2 pages", title: "Symptom Checklist", desc: "Before your inspection — document every symptom you've noticed around your home." },
  { pages: "8 pages", title: "Buyer & Seller Guide", desc: "Everything you need to know about structural issues when buying or selling a home." },
  { pages: "4 pages", title: "Seasonal Maintenance Plan", desc: "Month-by-month checklist to keep your crawl space and foundation in top condition." },
  { pages: "6 pages", title: "Financing Guide", desc: "Understand all payment options and how to apply for 0% financing for qualified homeowners." },
];

function ResourcesDownloadSection() {
  return (
    <section id="resources" style={{ background: SURFACE.base }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>Resources</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
              Download what matters
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(62,60,73,.5)", lineHeight: 1.7 }}>
              Checklists, guides, and maintenance plans to keep your home strong.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCE_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="group flex flex-col h-full p-7" style={{ background: SURFACE.panel }}>
                <div className="w-11 h-11 flex items-center justify-center shrink-0 mb-6" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)" }}>
                  <FileText size={20} color="#fff" strokeWidth={1.5} />
                </div>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
                  PDF &middot; {item.pages}
                </span>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(161,205,241,.9)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{item.desc}</p>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 w-fit transition-opacity hover:opacity-85"
                  style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, border: "none", cursor: "pointer" }}>
                  <Download size={13} />
                  Download
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. HOMEOWNER EDUCATION ───────────────────────────────────────────────────
// Buyer/seller transaction guides live in the Pricing hub further down this
// page (id="cost") — this section is about living with and maintaining a
// home, not closing a real-estate deal, so it doesn't duplicate that content.
const EDUCATION_TOPICS = [
  { icon: ShieldCheck, title: "Know the warning signs", desc: "Cracks, sticking doors, uneven floors — learn what's normal wear vs. a structural problem.", cta: "See problem signs", page: "problem-signs" },
  { icon: HelpCircle, title: "What to expect from your inspection", desc: "A walkthrough of what our inspectors check, how long it takes, and what's in your report.", cta: "Our process", page: "our-difference#process" },
  { icon: ClipboardCheck, title: "Home maintenance checklist", desc: "Simple seasonal habits that catch small issues before they become expensive ones.", cta: "Get the checklist", page: "resources#resources" },
  { icon: FileText, title: "Common homeowner questions", desc: "Financing, warranties, timelines — answered plainly.", cta: "Read FAQs", page: "resources#faq" },
];

function BuyerSellerSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="buyer-seller" style={{ background: CREAM }} className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Homeowner Education</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,56px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1.5px", flex: 1 }}>
              Guides for every<br />stage of homeownership
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.7, maxWidth: 380 }}>
              Buying or selling? See our <a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.("pricing#buyer-seller"); }} style={{ color: B, textDecoration: "underline" }}>buyer &amp; seller guides</a>. Here, it's about knowing and maintaining the home you already have.
            </p>
          </div>
        </motion.div>

        {/* ── Topic cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {EDUCATION_TOPICS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.07}>
              <div className="flex flex-col h-full p-7" style={{ background: "#fff", border: "1px solid rgba(62,60,73,.1)" }}>
                <div className="w-11 h-11 flex items-center justify-center mb-6" style={{ background: "rgba(0,80,159,.12)", border: "1px solid rgba(0,80,159,.2)" }}>
                  <t.icon size={20} color={B} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 20, color: CHAR, lineHeight: 1.2, marginBottom: 10 }}>{t.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{t.desc}</p>
                <button
                  onClick={() => onNavigate?.(t.page)}
                  className="group inline-flex items-center gap-1.5 self-start"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  {t.cta}
                  <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" color={SAND} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. JOB STORIES ──────────────────────────────────────────────────────────
const JOB_STORIES = [
  { name: "Jennifer M.", type: "Crawl Space", loc: "Memphis, TN", date: "March 2026", duration: "2 days", result: "SmartJack system + full encapsulation. Floors leveled and moisture eliminated.", quote: "I could feel the difference the first morning I walked in. No more bounce, no more smell. Redeemers was worth every penny.", img: "https://images.unsplash.com/photo-1591638436281-078219f200af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800" },
  { name: "Robert T.", type: "Foundation", loc: "Jonesboro, AR", date: "February 2026", duration: "1 day", result: "6 push piers driven to bedrock. Foundation stabilized with lifetime warranty.", quote: "I had three different companies tell me three different things. Redeemers explained it clearly, showed me the evidence, and fixed it the right way.", img: "https://images.unsplash.com/photo-1708214148950-ccbb69d40e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800" },
  { name: "Jennifer M.", type: "Waterproofing", loc: "Memphis, TN", date: "January 2026", duration: "3 days", result: "Interior drainage system and dual sump pump installed. Basement stays dry through heavy rain.", quote: "After years of a damp basement, it's finally dry. The crew was professional and cleaned up everything when done.", img: "https://images.unsplash.com/photo-1646184466560-f81b1e495604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800" },
];

type PreviewStory = typeof JOB_STORIES[0];

function JobStoryPreviewModal({ story, onClose, onPrev, onNext }: {
  story: PreviewStory; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [story, onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(62,60,73,.88)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[960px] flex flex-col lg:flex-row overflow-hidden"
        style={{ background: CHAR, height: "min(85vh, 580px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — video */}
        <div className="lg:w-[52%] shrink-0 relative">
          <ImageWithFallback src={story.img} alt={story.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: playing ? "rgba(62,60,73,.85)" : "linear-gradient(to bottom, rgba(62,60,73,.1) 0%, rgba(62,60,73,.6) 100%)"
          }} />

          {playing ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)" }}>Video playing…</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={() => setPlaying(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{ width: 72, height: 72, borderRadius: "50%", background: B, border: "3px solid rgba(255,255,255,.25)", cursor: "pointer", boxShadow: "0 8px 32px rgba(62,60,73,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Play size={26} fill="white" stroke="none" style={{ marginLeft: 4 }} />
              </motion.button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <div className="flex gap-2">
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 2.5, textTransform: "uppercase", background: B, padding: "3px 8px" }}>{story.type}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.65)", background: "rgba(62,60,73,.45)", padding: "3px 8px", backdropFilter: "blur(4px)" }}>{story.loc}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={onPrev} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors" style={{ background: "rgba(62,60,73,.45)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}>
                <ChevronLeft size={15} color="#fff" />
              </button>
              <button onClick={onNext} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors" style={{ background: "rgba(62,60,73,.45)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer" }}>
                <ChevronRight size={15} color="#fff" />
              </button>
            </div>
          </div>
        </div>

        {/* Right — story content */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}>
          <div className="flex justify-end px-7 pt-6 pb-3 shrink-0">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
              <X size={14} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          <div className="flex flex-col flex-1 px-7 pb-7">
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{story.date}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "inline-block" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{story.duration}</span>
            </div>

            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 6 }}>
              {story.name}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND, marginBottom: 20 }}>{story.loc}</p>

            <div className="mb-5 p-4" style={{ background: "rgba(0,80,159,.12)", border: "1px solid rgba(0,80,159,.25)" }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>What we did</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>{story.result}</p>
            </div>

            <div style={{ fontFamily: "Georgia,serif", fontSize: 44, color: "rgba(216,203,165,.2)", lineHeight: 0.55, marginBottom: 10 }}>&ldquo;</div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.72)", lineHeight: 1.8, flex: 1 }}>{story.quote}</p>

            <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "20px 0" }} />

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

function JobStoriesSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  return (
    <section id="job-stories" style={{ background: SURFACE.alt }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-[2px]" style={{ background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>Job stories</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4vw,52px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              Real jobs, real results
            </h2>
          </div>
          <button onClick={() => onNavigate?.("job-stories")} className="group inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Read all job stories
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOB_STORIES.map((story, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex flex-col gap-0 cursor-pointer" onClick={() => setSelectedIdx(i)} style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                {/* Video thumb */}
                <div className="relative overflow-hidden group" style={{ aspectRatio: "3/2" }}>
                  <ImageWithFallback src={story.img} alt={story.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "rgba(62,60,73,.4)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: B, borderRadius: "50%" }}>
                      <Play size={20} color="#fff" fill="#fff" />
                    </div>
                  </div>
                </div>
                {/* Tags + name */}
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {[story.type, story.loc].map((t) => (
                      <span key={t} className="px-2.5 py-1" style={{ background: "rgba(62,60,73,.07)", fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(62,60,73,.6)" }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: CHAR }}>{story.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <JobStoryPreviewModal
            story={JOB_STORIES[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
            onPrev={() => setSelectedIdx((i) => i !== null ? (i - 1 + JOB_STORIES.length) % JOB_STORIES.length : null)}
            onNext={() => setSelectedIdx((i) => i !== null ? (i + 1) % JOB_STORIES.length : null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── 8. FAQ ───────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "How long does crawl space repair take?", a: "Most repairs take 1–2 days. Encapsulation on larger spaces may take 2–3 days. We'll give you a specific timeline during your inspection." },
  { q: "Do you offer financing?", a: "Yes. We work with trusted lenders to make repairs affordable. Flexible terms and competitive rates are available for qualified homeowners." },
  { q: "What areas do you serve?", a: "We serve communities across Tennessee, Arkansas, Mississippi, and Missouri — including Memphis, Nashville, Jackson, Southaven, Little Rock, Jonesboro, Springfield, and Cape Girardeau." },
  { q: "Are your installers certified?", a: "Every installer is trained and certified in our methods. We stand behind their work with a lifetime transferable warranty." },
  { q: "Is a sagging floor a structural emergency?", a: "Not always immediately, but it should be inspected soon. The underlying cause will continue to worsen over time. Early action saves money." },
  { q: "How much does basement waterproofing cost?", a: "Interior waterproofing typically runs $3,000–$10,000 depending on square footage and system type. Exterior waterproofing is more involved. We give a free written quote after inspection." },
  { q: "How are push piers installed?", a: "We drive steel piers through unstable soil to bedrock, then lift and stabilize the foundation. Most installations take 1 day and require no major excavation." },
  { q: "Will my homeowner's insurance cover this?", a: "Coverage depends on your policy and the cause of damage. We'll provide detailed documentation to help with your claim where applicable." },
];

// Unified with ServicePage.tsx / ProblemSignInnerPage.tsx's FaqSection — this
// used to be a third variant with a category-filter pill row above the
// accordion. Client QA: only one FAQ design should exist site-wide, so the
// filtering feature was dropped rather than kept as a one-off difference.
function FaqSection() {
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
          <style>{`
            @keyframes rFaqDown { from { height: 0; opacity: 0; } to { height: var(--radix-accordion-content-height); opacity: 1; } }
            @keyframes rFaqUp { from { height: var(--radix-accordion-content-height); opacity: 1; } to { height: 0; opacity: 0; } }
            [data-state=open].rfaq { animation: rFaqDown 0.22s ease-out; }
            [data-state=closed].rfaq { animation: rFaqUp 0.16s ease-in; }
          `}</style>
          <AccordionPrimitive.Root type="single" value={open} onValueChange={setOpen} collapsible>
            {FAQS.map((faq, i) => (
              <AccordionPrimitive.Item key={i} value={String(i)}
                className="overflow-hidden"
                style={{ borderBottom: "1px solid rgba(62,60,73,.1)" }}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    className="w-full flex items-center gap-5 text-left group transition-colors"
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "22px 0" }}
                  >
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
                <AccordionPrimitive.Content className="overflow-hidden rfaq">
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

// ─── 9. REVIEWS ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.",
    name: "Victoria E.", loc: "Memphis, TN", stars: 5, img: imgFloor01, avatar: imgRevAvatar,
    service: "Crawl Space", date: "March 2026",
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!",
    name: "Elizabeth N.", loc: "Collierville, TN", stars: 5, img: imgFloor03, avatar: imgRevAvatar,
    service: "Foundation", date: "February 2026",
  },
  {
    quote: "Walking in now, it's straight. I used to slip from side to side. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5, img: imgFloor04, avatar: imgRevAvatar,
    service: "Concrete", date: "January 2026",
  },
];

function ReviewsSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [cur, setCur] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section id="reviews" style={{ background: SURFACE.base }} className="py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 11, fontWeight: 600, color: B, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Reviews</p>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
              What customers say about us
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
            <button onClick={scrollPrev} aria-label="Previous review"
              className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{ border: `1.5px solid ${CHAR}`, background: "transparent", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={scrollNext} aria-label="Next review"
              className="w-11 h-11 flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{ border: `1.5px solid ${CHAR}`, background: "transparent", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,520px)] flex flex-col" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(62,60,73,.45)" }}>
                  <button onClick={() => setSelectedIdx(i)} className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
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
                <div style={{ fontFamily: "Georgia,serif", fontSize: 48, color: "rgba(0,80,159,.25)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(62,60,73,.7)", lineHeight: 1.75, flex: 1, marginBottom: 24 }}>{t.quote}</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(62,60,73,.07)" }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: B }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 13, color: "#fff" }}>{t.name.charAt(0)}</span>
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
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(62,60,73,.2)" }} />
        ))}
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <ReviewModal
            review={TESTIMONIALS[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
            onPrev={() => setSelectedIdx(i => i !== null ? (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length : null)}
            onNext={() => setSelectedIdx(i => i !== null ? (i + 1) % TESTIMONIALS.length : null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── 10. CTA ─────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: SURFACE.cta }}>
      <div className="absolute inset-0 z-0">
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
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(161,205,241,.9)", maxWidth: 480, margin: "0 auto 44px" }}>
            Free inspection · No pressure · Same-week availability
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="group relative overflow-hidden px-9 py-4 inline-flex items-center gap-3"
              style={{ background: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15, color: "#003771" }}>
              <span className="relative z-10">Schedule Free Inspection</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" color="#003771" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: SAND }} />
            </a>
            <a href="tel:+19015550100"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 15, color: "rgba(161,205,241,.9)", borderBottom: "1px solid rgba(255,255,255,.2)", paddingBottom: 2 }}>
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
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
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

// ─── ResourcesPage ────────────────────────────────────────────────────────────
export default function ResourcesPage({ onBack, onNavigate, scrollTo: initialSection }: { onBack: () => void; onNavigate?: (p: string) => void; scrollTo?: string }) {
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
      const attempt = () => {
        const el = document.getElementById(initialSection);
        if (el) {
          const offset = 145;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      const t = setTimeout(attempt, 120);
      return () => clearTimeout(t);
    }
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
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Resources" />
      </div>
      {/* Floating rail mirrors the anchors already in the "Resources" mega
          menu — added per request so deep pages have both an ambient
          scroll-position rail and the upfront dropdown list. */}
      <FloatingSideNav tabs={NAV_TABS} active={activeTab} onChange={scrollToSection} />

      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[{ label: "Home", onClick: onBack }, { label: "Resources" }]} />

        <HeroSection />
        <GallerySection onNavigate={onNavigate} />
        <BuyerSellerSection onNavigate={onNavigate} />
        <ResourcesDownloadSection />
        <CostGuideSection onNavigate={onNavigate} />
        <JobStoriesSection onNavigate={onNavigate} />
        <FaqSection />
        <ReviewsSection onNavigate={onNavigate} />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
