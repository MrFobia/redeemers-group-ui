import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, Link2, Linkedin, Twitter, Facebook } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const CREAM = "#F7F5EF";
const MUTED = "#6B6E85";

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



// ─── Static article data ───────────────────────────────────────────────────────
const ARTICLE = {
  cat: "Foundation Repair",
  readTime: "5 min read",
  date: "Jan 11, 2025",
  title: "Signs your foundation needs professional attention",
  subtitle: "Cracks and settling can indicate serious problems beneath your home — here's what to watch for before it gets worse.",
  heroImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
  inlineImg: "https://images.unsplash.com/photo-1541205646242-30258c7485b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
  author: { name: "James Redmond", title: "Structural Inspector · Redeemers Group" },
  tags: ["Foundation", "Structural", "Home Safety", "Warning Signs"],
};

const RELATED_POSTS = [
  {
    cat: "Waterproofing", readTime: "4 min read",
    title: "Basement waterproofing: interior vs exterior systems",
    desc: "Understanding the difference helps you choose the right fix for your home's specific moisture problem.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    cat: "Crawl Space", readTime: "6 min read",
    title: "Blog title heading will go here",
    desc: "Humidity and standing water in a crawl space create compounding structural problems over time.",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    cat: "Concrete", readTime: "3 min read",
    title: "Blog title heading will go here",
    desc: "PolyLevel foam injection lifts sunken slabs without tearing out and replacing concrete.",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
];

const SYMPTOMS = [
  {
    title: "Moisture & Water",
    items: ["Water in my basement", "Damp or wet walls", "Condensation on pipes", "Puddles after rain", "Efflorescence (white stains)"],
  },
  {
    title: "Structural & Foundation",
    items: ["Cracks in foundation walls", "Sticking doors or windows", "Uneven or sloping floors", "Bowing or leaning walls", "Gaps around doors/windows"],
  },
  {
    title: "Air Quality & Smell",
    items: ["Musty odor in basement", "Visible mold or mildew", "Increased allergy symptoms", "Rotting wood smell", "Humid air throughout home"],
  },
];

const JOB_STORIES = [
  {
    title: "East Memphis Ranch Home",
    loc: "Memphis, TN",
    tag: "Crawl Space",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    title: "Midtown Duplex",
    loc: "Memphis, TN",
    tag: "Foundation",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    title: "Nashville Townhome",
    loc: "Nashville, TN",
    tag: "Waterproofing",
    img: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
];

const REVIEWS = [
  {
    quote: "Joe was very thorough with explaining everything. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.",
    name: "Victoria E.", loc: "Memphis, TN", stars: 5,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!",
    name: "Elizabeth N.", loc: "Collierville, TN", stars: 5,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    quote: "Walking in now, it's straight. The closet door never closed before — I literally just closed it for the first time. Great job.",
    name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5,
    img: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  },
];

const COST_GUIDES = [
  { title: "Crawl Space Repair Cost", sub: "Costs vary by damage type", tag: "Cost Guide" },
  { title: "Basement Waterproofing Cost", sub: "Interior vs. exterior makes a difference", tag: "Cost Guide" },
  { title: "Foundation Repair Cost", sub: "Pier type and count change everything", tag: "Cost Guide" },
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function HeroSection({ onBack, onNavigate }: { onBack: () => void; onNavigate: (p: string) => void }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2 flex-wrap">
          <button onClick={onBack} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)", background: "none", border: "none", cursor: "pointer", letterSpacing: 0.3 }} className="hover:opacity-70 transition-opacity">Home</button>
          <ChevronRight size={12} color="rgba(255,255,255,.2)" />
          <button onClick={() => onNavigate("resources")} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)", background: "none", border: "none", cursor: "pointer", letterSpacing: 0.3 }} className="hover:opacity-70 transition-opacity">Resources</button>
          <ChevronRight size={12} color="rgba(255,255,255,.2)" />
          <button onClick={() => onNavigate("news-blog")} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)", background: "none", border: "none", cursor: "pointer", letterSpacing: 0.3 }} className="hover:opacity-70 transition-opacity">Blog</button>
          <ChevronRight size={12} color="rgba(255,255,255,.2)" />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: SAND, fontWeight: 500, letterSpacing: 0.3 }}>Article</span>
        </div>
      </div>

      {/* Hero — dark editorial */}
      <section className="relative overflow-hidden" style={{ background: DARK, minHeight: 480 }}>
        <ImageWithFallback src={ARTICLE.heroImg} alt={ARTICLE.title}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(10,11,20,1) 0%,rgba(10,11,20,.85) 45%,rgba(10,11,20,.55) 100%)" }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 pt-14 pb-0">
          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1"
              style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>
              {ARTICLE.cat}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.3)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)" }}>{ARTICLE.readTime}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.3)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)" }}>{ARTICLE.date}</span>
          </div>

          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.5vw,62px)", color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", marginBottom: 16, maxWidth: 800 }}>
            {ARTICLE.title}
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 580, marginBottom: 28 }}>
            {ARTICLE.subtitle}
          </p>

          {/* Author + share row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-5"
            style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0"
                style={{ background: "rgba(26,82,168,.25)", border: "1px solid rgba(26,82,168,.4)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="rgba(255,255,255,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="rgba(255,255,255,.7)" strokeWidth="1.8" /></svg>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>By {ARTICLE.author.name}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)" }}>{ARTICLE.author.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Share</span>
              {[<Link2 size={13} />, <Linkedin size={13} />, <Twitter size={13} />, <Facebook size={13} />].map((icon, i) => (
                <button key={i} onClick={i === 0 ? copyLink : undefined}
                  className="flex items-center justify-center w-8 h-8 transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,.15)", background: "none", cursor: "pointer", color: "rgba(255,255,255,.5)" }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── 2. ARTICLE BODY ──────────────────────────────────────────────────────────
function ArticleBody() {
  return (
    <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
      <div className="max-w-[768px] mx-auto px-8 md:px-14">

        {/* Introduction */}
        <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 26, color: CHAR, lineHeight: 1.2, marginBottom: 20 }}>
          Introduction
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
          Your foundation is the most critical structural element of your home. When it begins to fail, the signs often start small — a hairline crack here, a door that sticks in summer — and are easy to dismiss. But these early warnings are your home's way of telling you that something is shifting beneath the surface, sometimes literally.
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 36 }}>
          Understanding what to look for, and when those signs cross the threshold from cosmetic to structural, can save you tens of thousands of dollars in emergency repairs. More importantly, it can protect the safety of everyone inside the home.
        </p>

        {/* Inline image */}
        <div className="mb-6">
          <div className="relative overflow-hidden w-full" style={{ aspectRatio: "768/400" }}>
            <ImageWithFallback src={ARTICLE.inlineImg} alt="Foundation inspection"
              className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <p className="mt-3" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.6, borderLeft: `2px solid ${SAND}`, paddingLeft: 12 }}>
            A certified inspector measuring differential settlement across a residential slab. Early measurement prevents late surprises.
          </p>
        </div>

        {/* Body continued */}
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 20, marginTop: 20 }}>
          Take note and act early. The sooner you identify a foundation problem, with quotes and plans in place to address it, the simpler and less expensive the repair becomes. While there are many warning signs that your foundation may have a problem, it's important to distinguish between different types of cracks and what various failure modes look like.
        </p>

        {/* Callout box */}
        <div className="my-8 p-6" style={{ background: CREAM, borderLeft: `3px solid ${SAND}` }}>
          <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            Read also
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: CHAR, lineHeight: 1.65, fontStyle: "italic" }}>
            "Horizontal cracks in basement walls are almost always more serious than vertical cracks. They indicate lateral soil pressure pushing inward — a structural emergency that gets significantly worse with time."
          </p>
        </div>

        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
          Vertical cracks in poured concrete walls are common and often result from normal concrete shrinkage as it cures. These are generally cosmetic unless they widen to more than 1/4 inch or show signs of water intrusion. Diagonal cracks, which radiate from corners of windows and doors, typically point to differential settlement — one part of the foundation sinking faster than another.
        </p>

        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
          Stair-step cracks in brick or block foundation walls follow the mortar joints in a staircase pattern. These indicate significant movement and should never be ignored. When you see this pattern combined with doors or windows that no longer open and close properly, you are very likely dealing with a foundation settlement problem that requires professional evaluation.
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 48 }}>
          Inside the home, watch for floors that slope or feel springy underfoot, drywall cracks at the corners of door and window openings, and gaps opening up between walls and the ceiling or floor. These interior symptoms often appear after the exterior signs have been present for months or years, meaning by the time you notice them inside, the problem is well established.
        </p>

        {/* Conclusion */}
        <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 26, color: CHAR, lineHeight: 1.2, marginBottom: 20 }}>
          Conclusion
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: 48 }}>
          Foundation issues don't resolve themselves. Soil conditions, drainage problems, and hydrostatic pressure all continue to work against your home 365 days a year. The good news is that when caught early, most foundation repairs are straightforward and warrantied for life. A free inspection from a certified engineer is the first and most important step.
        </p>

        {/* Tags + share */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mb-10"
          style={{ borderTop: "1px solid rgba(0,0,0,.08)" }}>
          <div className="flex flex-wrap gap-2">
            {ARTICLE.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5"
                style={{ background: "rgba(0,0,0,.05)", fontFamily: "'Inter',sans-serif", fontSize: 12, color: CHAR, fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Share</span>
            {[<Link2 size={14} />, <Linkedin size={14} />, <Twitter size={14} />, <Facebook size={14} />].map((icon, i) => (
              <button key={i} className="flex items-center justify-center w-8 h-8 transition-all hover:bg-black/8"
                style={{ border: "1px solid rgba(0,0,0,.12)", background: "none", cursor: "pointer", color: MUTED }}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Author card */}
        <div className="flex items-start gap-5 p-6" style={{ background: CREAM, border: "1px solid rgba(0,0,0,.07)" }}>
          <div className="w-14 h-14 flex items-center justify-center shrink-0"
            style={{ background: "rgba(26,82,168,.1)", border: "1px solid rgba(26,82,168,.2)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={B} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke={B} strokeWidth="1.8" /></svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: CHAR, marginBottom: 3 }}>
              {ARTICLE.author.name}
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED, marginBottom: 8 }}>{ARTICLE.author.title}</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#555", lineHeight: 1.65 }}>
              James has been inspecting residential foundations across the Mid-South for over a decade. He holds CBIS certification and has overseen more than 2,400 structural assessments.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── 3. RELATED POSTS ─────────────────────────────────────────────────────────
function RelatedPostsSection() {
  return (
    <section className="py-16 lg:py-20" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 8, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Blog</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px" }}>
              Related posts
            </h2>
          </div>
          <button className="group inline-flex items-center gap-2 shrink-0"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            View all
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RELATED_POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="flex flex-col group cursor-pointer h-full" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "405/270" }}>
                  <ImageWithFallback src={p.img} alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1"
                      style={{ background: "rgba(196,171,108,.18)", border: "1px solid rgba(196,171,108,.4)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
                      {p.cat}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)" }}>{p.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.25, marginBottom: 10, flex: 1 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.65, marginBottom: 16 }}>
                    {p.desc}
                  </p>
                  <div className="flex items-center gap-2 self-start group/btn">
                    <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND }}>Read more</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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

// ─── 4. RELATED SYMPTOMS ──────────────────────────────────────────────────────
function RelatedSymptomsSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="py-16 lg:py-20" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div style={{ width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Follow also</span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px" }}>
            Related symptoms
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SYMPTOMS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex flex-col p-7" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,2.5vw,38px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.5px", marginBottom: 20 }}>
                  {s.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {s.items.map((item) => (
                    <button key={item} onClick={() => onNavigate("problem-sign-inner")}
                      className="group flex items-center justify-between px-4 py-3 text-left transition-all hover:bg-white/5"
                      style={{ background: "rgba(255,255,255,.04)", border: "none", cursor: "pointer" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.4 }}>{item}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ml-3">
                        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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

// ─── 5. JOB STORIES / MEDIA ───────────────────────────────────────────────────
function JobStoriesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 lg:py-20 overflow-hidden" style={{ background: CHAR }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 mb-10">
        <Reveal className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 20, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Media</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1px" }}>
              Related job stories
            </h2>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={scrollPrev} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,.2)", background: "none", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={scrollNext} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,.2)", background: "none", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {JOB_STORIES.map((s) => (
            <div key={s.title} className="shrink-0 w-[min(80vw,440px)] group cursor-pointer"
              style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
              {/* Video thumb */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "440/280" }}>
                <ImageWithFallback src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.4)" }}>
                  <button className="w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1"
                    style={{ background: "rgba(196,171,108,.2)", border: "1px solid rgba(196,171,108,.4)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: SAND, letterSpacing: 2, textTransform: "uppercase" }}>
                    {s.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)" }}>{s.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. RELATED REVIEWS ───────────────────────────────────────────────────────
function RelatedReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [cur, setCur] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section className="py-16 lg:py-20 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 mb-10">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 16, height: 2, background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>Reviews</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
              Related reviews
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: MUTED, marginTop: 8 }}>
              Nothing beats hearing from Redeemers customers directly
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={scrollPrev} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-black/8"
              style={{ border: `1.5px solid ${CHAR}`, background: "none", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={scrollNext} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-black/8"
              style={{ border: `1.5px solid ${CHAR}`, background: "none", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-8 md:px-14">
        <div className="flex gap-5 ml-[max(0px,calc((100vw-1440px)/2))]">
          {REVIEWS.map((r) => (
            <div key={r.name} className="shrink-0 w-[min(85vw,500px)] flex flex-col"
              style={{ background: CREAM, border: "1px solid rgba(0,0,0,.07)" }}>
              <div className="relative" style={{ paddingBottom: "52%" }}>
                <ImageWithFallback src={r.img} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,20,.4)" }}>
                  <button className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ background: B, border: "none", cursor: "pointer" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, si) => (
                    <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 36, color: "rgba(26,82,168,.12)", lineHeight: .7, marginBottom: 8 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#555", lineHeight: 1.75, flex: 1, marginBottom: 16 }}>{r.quote}</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,.07)" }}>
                  <div className="w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ background: "rgba(26,82,168,.1)", border: "1px solid rgba(26,82,168,.2)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={B} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke={B} strokeWidth="1.8" /></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: CHAR }}>{r.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED }}>{r.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8 px-8">
        {REVIEWS.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="transition-all duration-300"
            style={{ width: cur === i ? 24 : 8, height: 8, background: cur === i ? B : "rgba(0,0,0,.15)", border: "none", cursor: "pointer", borderRadius: 4 }} />
        ))}
      </div>
    </section>
  );
}

// ─── 7. RELATED COST GUIDES ───────────────────────────────────────────────────
function RelatedCostGuidesSection() {
  return (
    <section className="py-16 lg:py-20" style={{ background: CREAM }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 16, height: 2, background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>Guides</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,42px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1px" }}>
              Related cost guides
            </h2>
          </div>
          <button className="group inline-flex items-center gap-2 shrink-0"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            View all
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {COST_GUIDES.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className="group cursor-pointer flex flex-col p-7 h-full"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,.09)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="px-2.5 py-1"
                    style={{ background: "rgba(196,171,108,.12)", border: "1px solid rgba(196,171,108,.25)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 9, color: SAND, letterSpacing: 1.5, textTransform: "uppercase" }}>
                    {g.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 19, color: CHAR, lineHeight: 1.2, marginBottom: 6, flex: 1 }}>
                  {g.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: MUTED, marginBottom: 20 }}>{g.sub}</p>
                <button className="group/btn inline-flex items-center gap-2 self-start"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Read full guide
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
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
    <footer style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,.06)" }} className="py-16 px-8 md:px-14">
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
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                {group}
              </p>
              <div className="flex flex-col gap-3">
                {links.map((l) => (
                  <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)" }}
                    className="hover:text-white/80 transition-colors">{l}</a>
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
export default function BlogInnerPage({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (p: string) => void;
}) {
  return (
    <div className="w-full min-h-screen" style={{ background: DARK }}>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate} active="Resources" />
      </div>
      <div className="pt-[81px] md:pt-[148px]">
        <HeroSection onBack={onBack} onNavigate={onNavigate} />
        <ArticleBody />
        <RelatedPostsSection />
        <RelatedSymptomsSection onNavigate={onNavigate} />
        <JobStoriesSection />
        <RelatedReviewsSection />
        <RelatedCostGuidesSection />
        <Footer onBack={onBack} />
      </div>
    </div>
  );
}
