import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import useEmblaCarousel from "embla-carousel-react";
import { StickyAnchorBar } from "./components/StickyAnchorBar";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const NAVY = "#0B1C4A";
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



// ─── Data ──────────────────────────────────────────────────────────────────────
const DEPARTMENTS = ["Accounting", "Production", "Customer Care", "System Design", "Service"];

const TEAM_MEMBERS = [
  { name: "Christopher Lowrie", title: "Customer Care Manager",    dept: "Customer Care", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Stephen Kline",      title: "Account Manager",          dept: "Customer Care", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Brandon Hunt",       title: "Project Coordinator",      dept: "Production",    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Catina McGowan",     title: "Customer Care Specialist",  dept: "Customer Care", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Kelsey Allen",       title: "Customer Care Specialist",  dept: "Customer Care", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Michael Kline",      title: "Customer Care Specialist",  dept: "Customer Care", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "David Torres",       title: "Foundation Technician",    dept: "Service",       img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Sarah Mitchell",     title: "Accounting Lead",          dept: "Accounting",    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "James Redmond",      title: "System Designer",          dept: "System Design", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
];

const PARTNERS = [
  { name: "National Association of Mold Remediators and Inspectors", abbr: "NAMRI", desc: "Certified standards for mold assessment and remediation in residential structures." },
  { name: "Apartment Association of Greater Memphis", abbr: "AAGM", desc: "Supporting multi-family housing professionals across the Greater Memphis region." },
  { name: "Arkansas Home Network", abbr: "AHN", desc: "A statewide network connecting homeowners with vetted service providers in Arkansas." },
];

const INITIATIVES = [
  {
    eyebrow: "Financing",
    title: "Financing",
    desc: "0% APR for qualified buyers. Monthly plans from $79/month. Apply in 5 minutes.",
    cta: "Read more",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={SAND} strokeWidth="1.8" strokeLinecap="round" /></svg>
    ),
  },
  {
    eyebrow: "Care Club",
    title: "Redeemers Care Club",
    desc: "Annual maintenance inspections, priority scheduling, and warranty protection for members.",
    cta: "Read more",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={SAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    eyebrow: "Initiative",
    title: "Love Well Initiative",
    desc: "Giving back to Memphis. Discounted repairs for qualifying families in underserved neighborhoods.",
    cta: "Visit",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={SAND} strokeWidth="1.8" /><path d="M12 8v4l3 3" stroke={SAND} strokeWidth="1.8" strokeLinecap="round" /></svg>
    ),
  },
];

const PAGE_TABS = [
  { id: "people",      label: "People"      },
  { id: "benefits",    label: "Benefits"    },
  { id: "contact",     label: "Contact us"  },
  { id: "initiatives", label: "Initiatives" },
];

const MODAL_REVIEWS = [
  { quote: "Everything from start to finish was done very courteous and professional.", name: "Victoria E.", loc: "Memphis, TN" },
  { quote: "The crew was excellent communicators and hard workers. Done well within the time given.", name: "Elizabeth N.", loc: "Collierville, TN" },
  { quote: "Such a professional team. Made the whole process stress-free from start to finish.", name: "Melissa C.", loc: "Marked Tree, AR" },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
];

// ─── Team Member Modal ─────────────────────────────────────────────────────────
type TeamMember = typeof TEAM_MEMBERS[0];

function TeamMemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const [galleryRef, galleryApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const [galCur, setGalCur] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!galleryApi) return;
    galleryApi.on("select", () => setGalCur(galleryApi.selectedScrollSnap()));
  }, [galleryApi]);

  const first = member.name.split(" ")[0];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-12 px-6"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 flex items-center justify-center transition-all hover:bg-white/10"
        style={{ width: 40, height: 40, background: CHAR, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", zIndex: 201 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Modal card */}
      <div
        className="relative w-full flex flex-col my-auto"
        style={{
          maxWidth: 920,
          background: DARK,
          borderLeft: `2px solid ${SAND}`,
          borderTop: "1px solid rgba(255,255,255,.07)",
          borderRight: "1px solid rgba(255,255,255,.07)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          padding: 48,
          gap: 36,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header — circular photo + name / title + dept chip */}
        <div className="flex items-center gap-6">
          <div className="shrink-0 rounded-full overflow-hidden" style={{ width: 120, height: 120, border: `2px solid ${SAND}`, boxSizing: "border-box" }}>
            <ImageWithFallback src={member.img} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            {/* Dept eyebrow */}
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 2, background: SAND, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>{member.dept}</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>{member.name}</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.5 }}>{member.title}</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)" }} />

        {/* Bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            Say hello to {first}, one of the friendly faces at Redeemers Group! As a key member of our {member.dept} team, {first} brings energy, expertise, and a genuine commitment to every homeowner we serve.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            With a strong background in {member.dept.toLowerCase()} and a knack for building trust, {first} thrives on making sure every customer feels heard and valued — from the first call all the way to project completion.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            {first} chose Redeemers Group for the people and the culture — and stayed for the impact. Every repaired home is a family whose life gets a little better, and that keeps {first} motivated every single day.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            When not helping customers or making the office a better place, {first} enjoys the outdoors and spending time with family. And yes — there's definitely a soft spot for Reese's Peanut Butter Cups.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)" }} />

        {/* Reviews */}
        <div>
          {/* Section eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <div style={{ width: 16, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Customer Reviews</span>
          </div>
          <div className="flex items-end justify-between mb-5">
            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.3px" }}>
              What customers say about me
            </h3>
            <button
              onClick={() => onNavigate("reviews")}
              className="group inline-flex items-center gap-1.5 shrink-0"
              style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Read all reviews
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MODAL_REVIEWS.map((r) => (
              <div key={r.name} className="flex flex-col" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", padding: 24, gap: 14 }}>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                {/* Giant quote mark */}
                <div style={{ fontFamily: "Georgia,serif", fontSize: 40, color: `rgba(196,171,108,.2)`, lineHeight: 0.7, marginBottom: 4 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.7, flex: 1 }}>{r.quote}</p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.2)" }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>{r.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)" }}>{r.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)" }} />

        {/* Photo Gallery */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div style={{ width: 16, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Gallery</span>
          </div>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 20, lineHeight: 1.2, letterSpacing: "-0.3px" }}>
            Photo gallery
          </h3>
          <div className="relative">
            {/* Prev arrow */}
            <button
              onClick={() => galleryApi?.scrollPrev()}
              className="absolute z-10 flex items-center justify-center -translate-y-1/2 transition-all hover:bg-white/10"
              style={{ left: -18, top: "50%", width: 36, height: 36, background: CHAR, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {/* Next arrow */}
            <button
              onClick={() => galleryApi?.scrollNext()}
              className="absolute z-10 flex items-center justify-center -translate-y-1/2 transition-all hover:bg-white/10"
              style={{ right: -18, top: "50%", width: 36, height: 36, background: CHAR, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div ref={galleryRef} className="overflow-hidden">
              <div className="flex gap-3">
                {GALLERY_IMGS.map((src, i) => (
                  <div key={i} className="shrink-0 overflow-hidden" style={{ width: "calc((100% - 24px) / 3)", aspectRatio: "1/1" }}>
                    <ImageWithFallback src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {GALLERY_IMGS.map((_, i) => (
                <button key={i} onClick={() => galleryApi?.scrollTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: galCur === i ? 24 : 8, height: 8, borderRadius: 4, padding: 0, border: "none",
                    background: galCur === i ? SAND : "rgba(255,255,255,.2)", cursor: "pointer",
                  }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36" style={{ background: DARK }}>
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(to bottom, transparent 10%, ${SAND} 40%, ${SAND} 60%, transparent 90%)`, opacity: 0.5 }} />

      <div className="max-w-[1440px] mx-auto px-8 md:px-14 relative z-10">
        <Reveal>
          <div className="flex items-center gap-2 mb-6">
            <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>About</span>
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5.5vw,80px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-2px", maxWidth: 820, marginBottom: 24 }}>
            We believe every family deserves a safe, stable home.
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px,1.5vw,18px)", color: "rgba(255,255,255,.55)", lineHeight: 1.75, maxWidth: 600, marginBottom: 40 }}>
            Redeemers Group was founded not just to repair homes — but to restore peace of mind for families across the mid-South. Since 2008, we've served over 12,000 homeowners with engineered, warrantied solutions.
          </p>
          {/* Stats row */}
          <div className="flex flex-wrap gap-0">
            {[["12,250+", "Homes protected"], ["18 yrs", "In business"], ["4.9 ★", "Google rating"], ["A+", "BBB rating"]].map(([val, label], i) => (
              <div key={label} className="flex flex-col px-8 py-4"
                style={{ borderLeft: i === 0 ? `2px solid ${SAND}` : "1px solid rgba(255,255,255,.07)", borderRight: i === 3 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,36px)", color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>{val}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}


// ─── Grid / card animation variants ──────────────────────────────────────────
const gridVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70 }),
  center: {
    opacity: 1, x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: (dir: number) => ({
    opacity: 0, x: dir * -70,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1], staggerChildren: 0.03, staggerDirection: -1 },
  }),
};

const cardVariants = {
  enter: { opacity: 0, y: 36, scale: 0.96 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.2 } },
};

// ─── 3. PEOPLE ────────────────────────────────────────────────────────────────
function PeopleSection() {
  const [activeDept, setActiveDept]     = useState("Customer Care");
  const [showAll, setShowAll]           = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [direction, setDirection]       = useState(0);

  const filtered = TEAM_MEMBERS.filter(m => m.dept === activeDept);
  const visible  = showAll ? filtered : filtered.slice(0, 6);

  const changeDept = (dept: string) => {
    if (dept === activeDept) return;
    const oldIdx = DEPARTMENTS.indexOf(activeDept);
    const newIdx = DEPARTMENTS.indexOf(dept);
    setDirection(newIdx > oldIdx ? 1 : -1);
    setActiveDept(dept);
    setShowAll(false);
  };

  const goPrev = () => {
    const i = DEPARTMENTS.indexOf(activeDept);
    changeDept(DEPARTMENTS[(i - 1 + DEPARTMENTS.length) % DEPARTMENTS.length]);
  };
  const goNext = () => {
    const i = DEPARTMENTS.indexOf(activeDept);
    changeDept(DEPARTMENTS[(i + 1) % DEPARTMENTS.length]);
  };

  return (
    <section id="people" className="py-20 lg:py-28" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Section header */}
        <Reveal className="mb-14 lg:mb-20">
          <div className="flex items-center gap-2 mb-5">
            <div style={{ width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>People</span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px" }}>
            Meet our team
          </h2>
        </Reveal>

        {/* ── Category filter — large horizontal selector ── */}
        <div className="flex items-center justify-between gap-4 mb-14 lg:mb-20">

          {/* Prev arrow */}
          <button onClick={goPrev}
            className="shrink-0 flex items-center justify-center transition-all hover:bg-white/10"
            style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,.15)", background: "none", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Labels row */}
          <div className="flex-1 flex items-end justify-center gap-6 lg:gap-10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {DEPARTMENTS.map((dept) => {
              const isActive = dept === activeDept;
              return (
                <div key={dept} className="relative shrink-0 flex flex-col items-center gap-2 cursor-pointer select-none"
                  onClick={() => changeDept(dept)}>
                  <motion.span
                    animate={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,.18)",
                      scale: isActive ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: "'Articulat CF',sans-serif", fontWeight: 800,
                      fontSize: "clamp(14px, 2vw, 30px)", lineHeight: 1.1,
                      letterSpacing: "-0.5px", display: "block", whiteSpace: "nowrap",
                      transformOrigin: "center bottom",
                    }}
                  >
                    {dept}
                  </motion.span>

                  {/* SAND underline slides between active labels */}
                  {isActive && (
                    <motion.div
                      layoutId="dept-underline"
                      style={{ height: 2, background: SAND, width: "100%", borderRadius: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button onClick={goNext}
            className="shrink-0 flex items-center justify-center transition-all hover:bg-white/10"
            style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,.15)", background: "none", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Team grid with direction-aware AnimatePresence ── */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeDept + (showAll ? "-all" : "")}
              custom={direction}
              variants={gridVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-12"
            >
              {visible.length > 0 ? visible.map((m) => (
                <motion.div
                  key={m.name}
                  variants={cardVariants}
                  className="group flex flex-col items-center gap-5 cursor-pointer"
                  onClick={() => setSelectedMember(m)}
                >
                  {/* Square image */}
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    <ImageWithFallback
                      src={m.img} alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    {/* Hover overlay with CTA */}
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      style={{ background: "linear-gradient(0deg, rgba(10,11,20,.85) 0%, rgba(26,82,168,.35) 100%)" }}
                    >
                      <span className="inline-flex items-center gap-1.5"
                        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>
                        See profile
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </motion.div>
                  </div>

                  {/* Name + title — below image, centered */}
                  <div className="flex flex-col items-center gap-1 text-center w-full">
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.3 }}>{m.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)" }}>{m.title}</p>
                  </div>
                </motion.div>
              )) : (
                <motion.div variants={cardVariants} className="col-span-3 py-16 text-center">
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)" }}>No team members listed for this department yet.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Load more */}
        {filtered.length > 6 && !showAll && (
          <div className="flex justify-center mt-2">
            <button onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 px-8 py-3 transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,.15)", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.7)", background: "none", cursor: "pointer" }}>
              Load more
            </button>
          </div>
        )}
      </div>

      {selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </section>
  );
}

// ─── 4. BENEFITS ──────────────────────────────────────────────────────────────
function BenefitsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section id="benefits">
      {/* Part 1 — Partnerships with background image */}
      <div className="relative overflow-hidden py-20 lg:py-28">
        {/* Background image + overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1800"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)" }} />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left — eyebrow + heading */}
            <div className="lg:w-[40%] shrink-0">
              <Reveal>
                <div className="flex items-center gap-2 mb-4">
                  <div style={{ width: 20, height: 2, background: SAND }} />
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Benefits</span>
                </div>
                <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
                  Built on partnerships with proven experts
                </h2>
              </Reveal>
            </div>

            {/* Right — body copy + carousel */}
            <div className="flex-1 flex flex-col min-w-0">
              <Reveal>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.65)", lineHeight: 1.75, marginBottom: 20 }}>
                  We work alongside manufacturers and organizations that share our standards for quality and integrity.
                </p>
              </Reveal>

              {/* Embla carousel */}
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-4">
                  {PARTNERS.map((p) => (
                    <div
                      key={p.abbr}
                      className="shrink-0 flex flex-col gap-4 p-6"
                      style={{
                        width: "min(calc(100% - 32px), 320px)",
                        background: "rgba(10,11,20,0.55)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,.1)",
                      }}
                    >
                      {/* Icon / abbr box */}
                      <div className="w-12 h-12 flex items-center justify-center shrink-0"
                        style={{ background: "rgba(196,171,108,.12)", border: "1px solid rgba(196,171,108,.25)" }}>
                        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 10, color: SAND, letterSpacing: 1 }}>{p.abbr}</span>
                      </div>
                      <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", lineHeight: 1.3 }}>{p.name}</p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.65 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav row: dots + arrows */}
              <div className="flex items-center gap-4 mt-5">
                <div className="flex items-center gap-2">
                  {PARTNERS.map((_, i) => (
                    <button key={i} onClick={() => emblaApi?.scrollTo(i)}
                      className="transition-all duration-300"
                      style={{
                        width: cur === i ? 24 : 8, height: 8,
                        background: cur === i ? SAND : "rgba(255,255,255,.25)",
                        border: "none", cursor: "pointer", padding: 0, borderRadius: 4,
                      }} />
                  ))}
                </div>
                <div className="flex gap-2 ml-auto">
                  <button onClick={() => emblaApi?.scrollPrev()}
                    className="flex items-center justify-center transition-all hover:bg-white/10"
                    style={{ width: 38, height: 38, border: "1px solid rgba(255,255,255,.2)", background: "none", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button onClick={() => emblaApi?.scrollNext()}
                    className="flex items-center justify-center transition-all hover:bg-white/10"
                    style={{ width: 38, height: 38, border: "1px solid rgba(255,255,255,.2)", background: "none", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2 — Manufacturers */}
      <div className="py-16 lg:py-20" style={{ background: DARK }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-14">
          <Reveal className="mb-10">
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: "#fff", lineHeight: 1.1, marginBottom: 6 }}>
              We install products engineered to last and tested in the field.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.65 }}>
              Manufacturers who stand behind their work like we stand behind ours.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {["TerraFirm", "Everdry", "Supportworks", "CleanSpace", "PolyLevel", "WaterGuard"].map((brand, i) => (
              <Reveal key={brand} delay={i * 0.05}>
                <div className="flex items-center justify-center px-6 py-4"
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", minWidth: 140 }}>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,.4)", letterSpacing: 1 }}>{brand}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. CONTACT ───────────────────────────────────────────────────────────────
const SERVICES_LIST = ["Crawl Space Repair", "Basement Waterproofing", "Foundation Repair", "Concrete Services", "Commercial Services", "Other"];

function ContactSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const toggle = (s: string) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <section id="contact" className="py-20 lg:py-28" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — copy */}
          <div className="lg:w-[380px] shrink-0">
            <Reveal>
              <div className="flex items-center gap-2 mb-5">
                <div style={{ width: 20, height: 2, background: SAND }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Contact us</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 14 }}>
                Schedule free inspection
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 32 }}>
                The fastest way to get answers. No obligation.
              </p>
              {/* Trust signals */}
              <div className="flex flex-col gap-3">
                {["Free, no-obligation assessment", "Certified structural inspectors", "Same-week appointments available", "Lifetime transferable warranty"].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.6)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal className="flex-1">
            <div className="p-8 lg:p-10" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[["First name", "text"], ["Last name", "text"], ["Email", "email"], ["Phone number", "tel"]].map(([label, type]) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 0.5 }}>{label}</label>
                    <input type={type} placeholder={label}
                      className="px-4 py-3 outline-none transition-all focus:border-blue-500"
                      style={{ background: DARK, border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", width: "100%" }} />
                  </div>
                ))}
              </div>

              {/* Service checkboxes */}
              <div className="mb-4">
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 0.5, marginBottom: 10 }}>Service needed</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES_LIST.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                      <div onClick={() => toggle(s)}
                        className="w-4 h-4 flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: selected.includes(s) ? B : "transparent",
                          border: `1.5px solid ${selected.includes(s) ? B : "rgba(255,255,255,.2)"}`,
                          cursor: "pointer",
                        }}>
                        {selected.includes(s) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.6)" }}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-1.5 mb-5">
                <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 0.5 }}>Describe your problem (optional)</label>
                <textarea rows={4} placeholder="Tell us more..."
                  className="px-4 py-3 outline-none resize-none transition-all"
                  style={{ background: DARK, border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", width: "100%" }} />
              </div>

              {/* Agree + submit */}
              <div className="flex items-center gap-2.5 mb-5 cursor-pointer" onClick={() => setAgreed(a => !a)}>
                <div className="w-4 h-4 flex items-center justify-center shrink-0"
                  style={{ background: agreed ? B : "transparent", border: `1.5px solid ${agreed ? B : "rgba(255,255,255,.2)"}`, cursor: "pointer" }}>
                  {agreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)" }}>I agree to the terms of service</span>
              </div>

              <button className="w-full py-4 flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
                Send
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 6. INITIATIVES ───────────────────────────────────────────────────────────
function InitiativesSection() {
  return (
    <section id="initiatives" className="py-20 lg:py-24" style={{ background: CHAR }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Programs</span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
            More ways we serve you
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INITIATIVES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex flex-col p-8 h-full group" style={{ background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center mb-6 shrink-0"
                  style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.2)" }}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>{item.eyebrow}</span>
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
                  {item.desc}
                </p>
                <button className="group/btn inline-flex items-center gap-2 self-start"
                  style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {item.cta}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/btn:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const cols = {
    Services: ["Crawl space", "Waterproofing vs basement", "Foundation", "Concrete", "Commercial"],
    Company: ["About us", "Our work", "Blog", "Careers", "Financing"],
    Locations: ["Tennessee", "Missouri", "Arkansas", "Mississippi"],
    Careers: ["Why work with us", "Job positions", "Chattanooga, TN"],
    Contact: ["(901) 555-0100", "info@redeemersgroup.com", "Schedule inspection", "Customer portal"],
  };
  return (
    <footer style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,.06)" }} className="py-16 px-8 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          <div className="shrink-0 lg:w-48">
            <button onClick={onBack} className="h-9 mb-5" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Logo light />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.3)", lineHeight: 1.7 }}>
              Structural solutions for homes across the Mid-South since 2008.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(cols).map(([group, links]) => (
              <div key={group}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>{group}</p>
                <div className="flex flex-col gap-2.5">
                  {links.map(l => (
                    <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)" }} className="hover:text-white/70 transition-colors">{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.2)" }}>© 2026 Redeemers Group. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy policy", "Terms of service", "Cookie settings"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.2)" }} className="hover:text-white/40 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage({ onBack, onNavigate, scrollTo: initialSection }: { onBack: () => void; onNavigate: (p: string) => void; scrollTo?: string }) {
  const [activeTab, setActiveTab] = useState(initialSection ?? "people");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll to initial section if coming from nav link
  useEffect(() => {
    if (initialSection) {
      const t = setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, []);

  // Update active tab on scroll
  useEffect(() => {
    const handler = () => {
      for (let i = PAGE_TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(PAGE_TABS[i].id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveTab(PAGE_TABS[i].id);
          return;
        }
      }
      setActiveTab("people");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ background: DARK }}>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate} active="About" />
        <StickyAnchorBar tabs={PAGE_TABS} active={activeTab} onChange={scrollToSection} />
      </div>
      <div style={{ paddingTop: 196 }}>
        <HeroSection />
        <PeopleSection />
        <BenefitsSection />
        <ContactSection />
        <InitiativesSection />
        <Footer onBack={onBack} />
      </div>
    </div>
  );
}
