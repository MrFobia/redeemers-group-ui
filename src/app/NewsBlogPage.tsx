import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { ReviewModal } from "./components/ReviewModal";
import imgRevAvatar from "../assets/rev-avatar.png";

import { B, DARK, CHAR, SAND, MUTED, SURFACE, ON_LIGHT } from "./theme";

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

const CATEGORIES = ["All topics", "Foundation", "Waterproofing", "Crawl Space", "Concrete"];

type Article = {
  id: number; cat: string; readTime: string; date: string;
  title: string; desc: string; img: string; featured?: boolean;
};

const FEATURED_ARTICLES: Article[] = [
  {
    id: 1, cat: "Foundation Repair", readTime: "5 min read", date: "May 2025",
    title: "Why your driveway is sinking and what to do",
    desc: "Soil erosion and poor drainage are the most common culprits behind sinking concrete. Learn how PolyLevel foam lifts slabs permanently.",
    img: "https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    featured: true,
  },
  {
    id: 2, cat: "Waterproofing", readTime: "4 min read", date: "May 2025",
    title: "Basement waterproofing problems solved with proper drainage",
    desc: "Interior drainage systems and sump pump placement make all the difference between a dry basement and recurring flooding.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 3, cat: "Foundation", readTime: "3 min read", date: "May 2025",
    title: "Signs your foundation needs professional attention",
    desc: "Horizontal cracks, bowing walls, and sticking doors are early warnings that shouldn't wait.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 4, cat: "Crawl Space", readTime: "6 min read", date: "Apr 2025",
    title: "When does concrete cracking mean trouble?",
    desc: "Not every crack is a crisis — but some are. We break down the difference between cosmetic and structural cracks.",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
];

const BLOG_ARTICLES: Article[] = [
  { id: 9, cat: "Crawl Space", readTime: "5 min read", date: "May 12, 2025", title: "Driveways settle and sink over time", desc: "Granular soils compact and moisture cycling accelerates the process — learn what causes it and how to stop it.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
  { id: 10, cat: "Foundation", readTime: "4 min read", date: "May 8, 2025", title: "Not all basements need drainage systems", desc: "Understanding when interior drainage is necessary and when surface grading is sufficient.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
  { id: 11, cat: "Waterproofing", readTime: "6 min read", date: "May 3, 2025", title: "Vapor barriers: science behind encapsulation", desc: "Encapsulation vapor barriers stop moisture intrusion before it starts. Learn what's involved and how long it lasts.", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
  { id: 12, cat: "Crawl Space", readTime: "4 min read", date: "Apr 28, 2025", title: "Humidity creates conditions for mold growth", desc: "Relative humidity above 60% is all it takes. How to measure, monitor, and fix moisture in your crawl space.", img: "https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
  { id: 13, cat: "Foundation", readTime: "5 min read", date: "Apr 22, 2025", title: "Catch structural issues before they worsen", desc: "Early-stage foundation movement is treatable. Waiting makes it exponentially more expensive.", img: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
  { id: 14, cat: "Concrete", readTime: "3 min read", date: "Apr 15, 2025", title: "Settlement patterns tell you something important", desc: "Read the ground like an inspector — the direction of cracks tells you exactly what's happening below.", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
];

const TESTIMONIALS = [
  { quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.", name: "Victoria E.", loc: "Memphis, TN", stars: 5, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", avatar: imgRevAvatar, service: "Crawl Space", date: "March 2026" },
  { quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!", name: "Elizabeth N.", loc: "Collierville, TN", stars: 5, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", avatar: imgRevAvatar, service: "Foundation", date: "February 2026" },
  { quote: "Walking in now, it's straight. The closet door never closed before — I literally just closed it for the first time. Great job.", name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5, img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", avatar: imgRevAvatar, service: "Concrete", date: "January 2026" },
];

// ─── Dark article card — vertical (image top) ─────────────────────────────────
function DarkCard({ article, delay = 0, onNavigate }: { article: Article; delay?: number; onNavigate?: (p: string) => void }) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col group cursor-pointer h-full" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}
        onClick={() => onNavigate?.("blog-inner")}>
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <ImageWithFallback src={article.img} alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(62,60,73,.5) 0%,transparent 60%)" }} />
          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1"
              style={{ background: "rgba(0,80,159,.18)", border: "1px solid rgba(0,80,159,.4)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: B, letterSpacing: 2, textTransform: "uppercase" }}>
              {article.cat}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.35)" }}>{article.date}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(62,60,73,.2)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.35)" }}>{article.readTime}</span>
          </div>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: CHAR, lineHeight: 1.25, marginBottom: 10, flex: 1 }}>
            {article.title}
          </h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.45)", lineHeight: 1.65, marginBottom: 18 }}>
            {article.desc}
          </p>
          <div className="flex items-center gap-2 self-start group/btn">
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: B, letterSpacing: 0.5 }}>Read more</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Dark horizontal card — image left ───────────────────────────────────────
function DarkHorizontalCard({ article, onNavigate }: { article: Article; onNavigate?: (p: string) => void }) {
  return (
    <div className="flex gap-0 group cursor-pointer" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}
      onClick={() => onNavigate?.("blog-inner")}>
      <div className="relative shrink-0 overflow-hidden" style={{ width: 140, minHeight: 140 }}>
        <ImageWithFallback src={article.img} alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-center px-5 py-5 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: B, letterSpacing: 2, textTransform: "uppercase" }}>{article.cat}</span>
          <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(62,60,73,.2)", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(62,60,73,.35)" }}>{article.readTime}</span>
        </div>
        <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: CHAR, lineHeight: 1.3, marginBottom: 10 }}>
          {article.title}
        </h4>
        <div className="flex items-center gap-1.5 group/btn">
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11, color: B }}>Read</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function HeroSection({ onBack, onNavigate }: { onBack: () => void; onNavigate: (p: string) => void }) {
  return (
    <section className="relative overflow-hidden" style={{ background: DARK, minHeight: 560 }}>
      <ImageWithFallback src={FEATURED_ARTICLES[0].img} alt="Hero"
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(62,60,73,.97) 0%,rgba(62,60,73,.88) 50%,rgba(62,60,73,.45) 100%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />

      <div className="relative z-10">
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: "Resources", onClick: () => onNavigate("resources") },
          { label: "News & Blog" },
        ]} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-20 lg:pt-20 lg:pb-28">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-5">
          <div style={{ width: 32, height: 2, background: SAND, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
            News &amp; Blog
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(42px,6vw,88px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 20, maxWidth: 700 }}>
          Stories worth<br />reading
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
          Straight talk from the field — what's happening beneath your home and what to do about it.
        </motion.p>

        {/* Featured article preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-0 cursor-pointer group max-w-[520px]"
          style={{ background: "rgba(77,76,88,.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.1)" }}
          onClick={() => onNavigate("blog-inner")}>
          <div className="flex flex-col p-5 flex-1">
            <span className="inline-flex items-center gap-2 mb-3">
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>{FEATURED_ARTICLES[0].cat}</span>
              <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,.3)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)" }}>{FEATURED_ARTICLES[0].readTime}</span>
            </span>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>
              {FEATURED_ARTICLES[0].title}
            </p>
            <div className="flex items-center gap-1.5 group/btn mt-auto">
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND }}>Read article</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-8 mt-12 flex-wrap">
          {[["120+", "Articles published"], ["5", "Categories"], ["Weekly", "New content"]].map(([val, label]) => (
            <div key={label}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, lineHeight: 1 }}>{val}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 3 }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. CATEGORY TABS ────────────────────────────────────────────────────────
function CategoryTabs({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="sticky z-40 overflow-x-auto top-[68px] md:top-[111px]" style={{ background: SURFACE.base, borderBottom: `1px solid ${ON_LIGHT.hairline}` }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 flex items-center gap-2 py-3" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => onChange(cat)}
            className="shrink-0 px-4 py-2 transition-all whitespace-nowrap"
            style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13,
              color: active === cat ? "#fff" : MUTED,
              background: active === cat ? B : "transparent",
              border: `1.5px solid ${active === cat ? B : ON_LIGHT.border}`,
              cursor: "pointer",
            }}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 3. FEATURED ARTICLES ─────────────────────────────────────────────────────
function FeaturedSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="py-20 lg:py-24" style={{ background: SURFACE.base }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 8, height: 2, background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>Latest</span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
            Hot off the press
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Hero article */}
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden group cursor-pointer flex flex-col lg:h-[560px]"
              style={{ background: SURFACE.base }} onClick={() => onNavigate("blog-inner")}>
              <div className="relative overflow-hidden flex-1" style={{ minHeight: 280 }}>
                <ImageWithFallback src={FEATURED_ARTICLES[0].img} alt={FEATURED_ARTICLES[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(62,60,73,.92) 0%,rgba(62,60,73,.1) 60%,transparent 100%)" }} />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1"
                    style={{ background: "rgba(0,80,159,.2)", border: "1px solid rgba(0,80,159,.45)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: B, letterSpacing: 2.5, textTransform: "uppercase" }}>
                    {FEATURED_ARTICLES[0].cat}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.4)", marginBottom: 10 }}>{FEATURED_ARTICLES[0].date} · {FEATURED_ARTICLES[0].readTime}</p>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", color: CHAR, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 10 }}>
                    {FEATURED_ARTICLES[0].title}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.55)", lineHeight: 1.65 }}>
                    {FEATURED_ARTICLES[0].desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-7 py-4" style={{ borderTop: "1px solid rgba(62,60,73,.07)" }}>
                <div className="flex items-center gap-2 group/btn">
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B }}>Read article</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3 side articles stacked */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {FEATURED_ARTICLES.slice(1).map((a, i) => (
              <Reveal key={a.id} delay={i * 0.07}>
                <DarkHorizontalCard article={a} onNavigate={onNavigate} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. BLOG GRID ─────────────────────────────────────────────────────────────
function BlogGridSection({ activeCategory, onNavigate }: { activeCategory: string; onNavigate: (p: string) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const filtered = activeCategory === "All topics"
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter((a) => a.cat === activeCategory);

  return (
    <section className="py-20 lg:py-24" style={{ background: SURFACE.alt }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 8, height: 2, background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>Articles</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,46px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
              More from our blog
            </h2>
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.3)" }}>{filtered.length} pieces</span>
        </Reveal>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {filtered.map((a, i) => (
              <DarkCard key={a.id} article={a} delay={i * 0.06} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-16 mb-12">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.3)" }}>No articles in this category yet.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="w-9 h-9 flex items-center justify-center transition-all hover:bg-white/10"
            style={{ border: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}
              className="w-9 h-9 flex items-center justify-center transition-all"
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: currentPage === i + 1 ? 600 : 400, color: currentPage === i + 1 ? DARK : "rgba(62,60,73,.5)", background: currentPage === i + 1 ? B : "none", border: `1px solid ${currentPage === i + 1 ? B : "rgba(62,60,73,.15)"}`, cursor: "pointer" }}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="w-9 h-9 flex items-center justify-center transition-all hover:bg-white/10"
            style={{ border: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── 5. REVIEWS ──────────────────────────────────────────────────────────────
function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [cur, setCur] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ background: SURFACE.base }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 8, height: 2, background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Reviews</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
              What our customers say
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(62,60,73,.45)", marginTop: 10, maxWidth: 400, lineHeight: 1.65 }}>
              All reviews from verified customers on Google and Facebook.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={scrollPrev} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={scrollNext} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="shrink-0 w-[min(85vw,500px)] flex flex-col"
              style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(62,60,73,.45)" }}>
                  <button onClick={() => setSelectedIdx(i)} className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 42, color: `rgba(0,80,159,.2)`, lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(62,60,73,.75)", lineHeight: 1.75, flex: 1, marginBottom: 20 }}>{t.quote}</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(62,60,73,.07)" }}>
                  <div className="w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,80,159,.2)", border: "1px solid rgba(0,80,159,.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="rgba(62,60,73,.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="rgba(62,60,73,.6)" strokeWidth="1.8" /></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: CHAR }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.4)" }}>{t.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8 px-8">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(62,60,73,.2)", border: "none", cursor: "pointer", borderRadius: 4 }} />
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

// ─── 6. CTA ───────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-20 lg:py-24" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 lg:p-14"
            style={{ border: "1px solid rgba(255,255,255,.07)", background: CHAR }}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 8, height: 2, background: SAND }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Free inspection</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,46px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 10 }}>
                Have a specific question?
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.45)", lineHeight: 1.65, maxWidth: 460 }}>
                Talk directly with one of our specialists. We'll answer your questions and schedule a free on-site assessment.
              </p>
            </div>
            <a href="tel:+18335841049"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 shrink-0"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", textDecoration: "none" }}>
              Schedule free inspection
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const FOOTER_LINKS = {
    Services: ["Foundation Repair", "Crawl Space Repair", "Waterproofing", "Concrete Services", "Mold Prevention"],
    Company: ["About Us", "Our Difference", "Careers", "Partners"],
    Resources: ["Blog & News", "Cost Guides", "FAQs", "Project Gallery"],
    Contact: ["Free Inspection", "1-833-584-1049", "Service Areas", "Financing"],
  };
  return (
    <footer style={{ background: SURFACE.footer, borderTop: "1px solid rgba(255,255,255,.06)" }} className="py-16 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <button onClick={onBack} className="h-20 mb-5 block" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Logo light />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.3)", lineHeight: 1.7, maxWidth: 200 }}>
              Structural solutions for homes across the Mid-South. Family-owned since 2008.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>{group}</p>
              <div className="flex flex-col gap-3">
                {links.map((l) => (
                  <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)" }}
                    className="hover:text-white/70 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.2)" }}>
            © 2025 Redeemers Structural Solutions · All rights reserved
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Accessibility", "Cookie Policy"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.2)" }}
                className="hover:text-white/40 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NewsBlogPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: (p: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All topics");

  return (
    <div className="w-full min-h-screen" style={{ background: SURFACE.base }}>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate} active="Resources" />
      </div>
      <div className="pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]">
        <HeroSection onBack={onBack} onNavigate={onNavigate} />
        <FeaturedSection onNavigate={onNavigate} />
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <BlogGridSection activeCategory={activeCategory} onNavigate={onNavigate} />
        <ReviewsSection />
        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </div>
  );
}
