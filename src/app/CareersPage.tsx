import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { FloatingSideNav } from "./components/FloatingSideNav";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Logo } from "./components/Logo";
import { openInspection } from "./components/InspectionModal";
import {
  Home, Trophy, Handshake, Sprout,
  DollarSign, HeartPulse, TrendingUp, Umbrella, GraduationCap, Truck,
  MapPin, Briefcase,
} from "lucide-react";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
import { B, DARK, NAVY, CHAR, SAND, CREAM, SURFACE, ON_LIGHT } from "./theme";
import { PageHeroBanner } from "./components/PageHeroBanner";
import imgCareersHero from "../assets/svc-foundation.jpg";

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

// ─── Page Tabs ────────────────────────────────────────────────────────────────
const PAGE_TABS = [
  { id: "culture",        label: "Culture"        },
  { id: "hiring-process", label: "Hiring Process" },
  { id: "open-positions", label: "Open Positions" },
  { id: "benefits",       label: "Benefits"       },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type JobType = {
  id: string; title: string; dept: string; location: string;
  type: string; pay: string; description: string;
  requirements: string[]; responsibilities: string[];
};

type ApplicationUpdate = { date: string; status: string; desc: string; };
type ApplicationType = {
  code: string; email: string; name: string; job: string;
  status: number; updates: ApplicationUpdate[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOCK_JOBS: JobType[] = [
  {
    id: "PR-302", title: "Foundation Repair Technician", dept: "Production",
    location: "Memphis, TN", type: "Full-time", pay: "$22.00 – $28.00 / hr",
    description: "Join our field production crew to deliver premium, engineered foundation repair and stabilization solutions for homeowners. You will work with state-of-the-art hydraulic pier systems and support equipment.",
    requirements: [
      "Valid driver's license with a clean driving record.",
      "Physical capability to lift up to 75 lbs and work in crawl spaces/basements.",
      "Team-player attitude and willingness to learn our proven methods.",
      "Prior construction or manual labor experience preferred but not required."
    ],
    responsibilities: [
      "Install push piers, helical piers, and carbon fiber wall support systems.",
      "Safely operate industrial lifting machinery and power tools.",
      "Collaborate with the Crew Lead to ensure high-quality workmanship.",
      "Maintain a clean, organized, and safe work environment at all job sites."
    ]
  },
  {
    id: "SV-401", title: "Service & Maintenance Technician", dept: "Service",
    location: "Memphis, TN", type: "Full-time", pay: "$24.00 – $30.00 / hr",
    description: "Provide annual maintenance inspections, diagnostics, and warranty services for our existing customer base. Build long-term relationships with homeowners and advise them on preventative measures.",
    requirements: [
      "Strong customer service and verbal communication skills.",
      "1–2 years experience in crawl space encapsulation, waterproofing, or foundation service.",
      "Valid driver's license and clean record.",
      "Problem-solving mindset to identify issues and recommend solutions."
    ],
    responsibilities: [
      "Perform thorough inspections of basements, crawl spaces, and foundation systems.",
      "Clean, service, and test sump pumps, dehumidifiers, and drainage lines.",
      "Accurately document findings and provide digital reports to homeowners.",
      "Offer solutions and upgrades to customers to enhance home stability."
    ]
  },
  {
    id: "SD-209", title: "System Designer (Sales Representative)", dept: "System Design",
    location: "Memphis, TN", type: "Full-time", pay: "$60,000 – $120,000 / yr (Commission)",
    description: "Meet with pre-screened homeowners who have requested structural inspections. Inspect homes, diagnose issues, and design custom permanent solutions using our software and product portfolio.",
    requirements: [
      "Proven sales or advisory experience, preferably in home services or construction.",
      "Comfortable inspecting basements and crawl spaces.",
      "Strong presentation skills and high technical aptitude.",
      "Excellent follow-up and relationship-building abilities."
    ],
    responsibilities: [
      "Conduct in-depth home evaluations and structural inspections.",
      "Draft custom repair plans using our proprietary 3D design software.",
      "Present solutions and pricing to homeowners and close contract agreements.",
      "Coordinate with production for smooth contract transitions."
    ]
  },
  {
    id: "CC-104", title: "Customer Care Specialist", dept: "Customer Care",
    location: "Memphis, TN", type: "Full-time", pay: "$18.00 – $22.00 / hr",
    description: "Serve as the first point of contact for homeowners seeking structural repairs. Answer inquiries, schedule free inspections, and support system designers and field crews with clear coordination.",
    requirements: [
      "Excellent phone presence, active listening, and empathy.",
      "Experience in a high-volume call center or customer support role.",
      "Proficiency with CRM databases and scheduling software.",
      "Highly organized with strong multitasking capability."
    ],
    responsibilities: [
      "Handle inbound inquiries via phone, email, and website forms.",
      "Qualify leads and schedule appointments for System Designers.",
      "Conduct follow-up calls to confirm schedules and gather customer feedback.",
      "Maintain detailed customer records in internal systems."
    ]
  },
  {
    id: "AC-102", title: "Accounting Assistant", dept: "Accounting",
    location: "Memphis, TN", type: "Full-time", pay: "$20.00 – $25.00 / hr",
    description: "Support financial operations by processing accounts payable, matching purchase orders, managing expense reports, and assisting with payroll preparation in a fast-paced environment.",
    requirements: [
      "Associate degree in Accounting or equivalent professional experience.",
      "Solid understanding of basic accounting principles and bookkeeping.",
      "Proficient in Excel and accounting software (QuickBooks/Sage).",
      "High attention to detail and strong organizational skills."
    ],
    responsibilities: [
      "Review, verify, and post vendor invoices and employee expense reports.",
      "Reconcile bank accounts and credit card statements monthly.",
      "Assist with weekly payroll processing and contractor billing.",
      "Provide administrative support for quarterly tax audits."
    ]
  }
];

const MOCK_APPLICATIONS: ApplicationType[] = [
  {
    code: "RG-7492", email: "candidate@example.com", name: "Alex Mercer",
    job: "Foundation Repair Technician", status: 2,
    updates: [
      { date: "Jul 05, 2026", status: "Application Received",  desc: "We've received your application and it is currently being reviewed by our recruiting team." },
      { date: "Jul 07, 2026", status: "Resume Screened",       desc: "Your qualifications match what we're looking for! Preparing next steps." },
      { date: "Jul 08, 2026", status: "Interview Scheduled",   desc: "A phone screening has been scheduled. Check your inbox for the invitation link." },
      { date: "Pending",      status: "On-Site Review & Offer", desc: "Complete the initial screen to move to on-site tour and potential offer." }
    ]
  },
  {
    code: "RG-9812", email: "test@test.com", name: "Jordan Lee",
    job: "Customer Care Specialist", status: 0,
    updates: [
      { date: "Jul 08, 2026", status: "Application Received", desc: "We've received your application and it is currently being reviewed by our recruiting team." },
      { date: "Pending",      status: "Phone Screen",         desc: "Pending initial resume review." },
      { date: "Pending",      status: "On-site Interview",    desc: "Pending phone screening." },
      { date: "Pending",      status: "Final Decision",       desc: "Pending interview completion." }
    ]
  }
];

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = {
    Services: ["Crawl space", "Waterproofing", "Foundation", "Concrete", "Commercial"],
    Company:  ["About us", "Our work", "Blog", "Careers", "Financing"],
    Locations:["Tennessee", "Missouri", "Arkansas", "Mississippi"],
    Careers:  ["Why work with us", "Job positions", "Benefits"],
    Contact:  ["(901) 555-0100", "info@redeemersgroup.com", "Schedule inspection"],
  };
  return (
    <footer style={{ background: SURFACE.footer, borderTop: "1px solid rgba(255,255,255,.06)" }} className="py-16 px-8 md:px-14">
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <PageHeroBanner
      image={imgCareersHero}
      imageAlt="Redeemers crew stabilizing a foundation"
      eyebrow="Careers at Redeemers"
      title={<>Life is short.<br />Work somewhere <span style={{ color: SAND }}>awesome.</span></>}
      lede="We don't just repair foundations — we build futures. Join a family-owned team that's been protecting homes across the Mid-South for over 18 years."
      minHeight={600}
      contentMaxWidth={1000}
    >
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => { const el = document.getElementById("open-positions"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
          className="group inline-flex items-center gap-3 px-7 py-4 font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", border: "none" }}>
          View Open Positions
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => { const el = document.getElementById("culture"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
          className="px-7 py-4 font-semibold transition-all hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.85)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", background: "none" }}>
          Our Culture
        </button>
      </div>

      {/* Stat strip — was absolutely pinned to the old hero's bottom edge; it
          now flows with the banner so the copy block can't collide with it. */}
      <div className="flex flex-wrap border-t" style={{ borderColor: "rgba(255,255,255,.1)" }}>
        {[
          ["18+", "Years in business"],
          ["12,250+", "Homes protected"],
          ["A+", "BBB rating"],
          ["4.9 ★", "Google rating"],
          ["∞", "Lifetime warranty"],
        ].map(([val, label], i) => (
          <div key={label} className="flex flex-col pr-6 py-5"
            style={{ paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(18px,2vw,26px)", color: SAND, lineHeight: 1 }}>{val}</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{label}</span>
          </div>
        ))}
      </div>
    </PageHeroBanner>
  );
}

// ─── Culture Section ───────────────────────────────────────────────────────────
function CultureSection() {
  const PHOTOS = [
    {
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
      label: "Field team — Memphis, TN", tall: true
    },
    {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
      label: "Morning crew briefing", tall: false
    },
    {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
      label: "Design & coordination team", tall: false
    },
  ];

  const VALUES: { icon: React.ReactNode; title: string; desc: string }[] = [
    { icon: <Home size={18} strokeWidth={1.6} />,      title: "Family First",           desc: "Family-owned since 2008. Every decision starts with what's right for our team and customers." },
    { icon: <Trophy size={18} strokeWidth={1.6} />,    title: "Mastery Over Mediocrity",desc: "We train, certify, and invest in every team member so they become the best at what they do." },
    { icon: <Handshake size={18} strokeWidth={1.6} />, title: "Own The Outcome",        desc: "We fix things right the first time. No shortcuts, no callbacks, no excuses." },
    { icon: <Sprout size={18} strokeWidth={1.6} />,    title: "Grow Together",          desc: "Career paths are real here. Technicians become crew leads. Leads become managers." },
  ];

  return (
    <section id="culture" className="py-20 lg:py-28" style={{ background: SURFACE.base }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        <Reveal className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 20, height: 2, background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Our Culture</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1.5px", maxWidth: 520 }}>
              More than a job — it's a mission.
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(10,11,20,.5)", lineHeight: 1.75, maxWidth: 440 }}>
              When you join Redeemers, you join a company that treats every home like it's their own. That mindset starts internally — with how we treat each other.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Photo collage */}
          <Reveal>
            <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: "320px 220px" }}>
              {/* Main tall photo — spans both rows */}
              <div className="relative overflow-hidden group row-span-2" style={{ border: `1px solid ${ON_LIGHT.border}` }}>
                <ImageWithFallback src={PHOTOS[0].src} alt={PHOTOS[0].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,11,20,.8) 0%, transparent 50%)" }} />
                <span className="absolute bottom-4 left-4 right-4" style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.6)", letterSpacing: 0.5 }}>{PHOTOS[0].label}</span>
              </div>
              {/* Two stacked photos on right */}
              {PHOTOS.slice(1).map((p) => (
                <div key={p.label} className="relative overflow-hidden group" style={{ border: `1px solid ${ON_LIGHT.border}` }}>
                  <ImageWithFallback src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,11,20,.75) 0%, transparent 60%)" }} />
                  <span className="absolute bottom-3 left-3 right-3" style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(10,11,20,.55)", letterSpacing: 0.5 }}>{p.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Values */}
          <div className="flex flex-col gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="flex gap-5 p-6 group transition-all hover:bg-white/[0.025]"
                  style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, borderLeft: `2px solid ${SAND}` }}>
                  <div className="shrink-0 mt-0.5 flex items-center justify-center w-9 h-9"
                    style={{ background: "rgba(26,82,168,.1)", border: "1px solid rgba(26,82,168,.2)", color: B }}>
                    {v.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR, marginBottom: 6 }}>{v.title}</h4>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.5)", lineHeight: 1.7 }}>{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Employee Quotes ───────────────────────────────────────────────────────────
function EmployeeQuotesSection() {
  const QUOTES = [
    {
      name: "Marcus T.",
      role: "Foundation Repair Technician",
      years: "4 years",
      quote: "I came in with zero construction experience. They trained me from scratch, got me certified, and within two years I was leading my own crew. The growth here is real.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
      dept: "Production",
    },
    {
      name: "Sarah K.",
      role: "Customer Care Specialist",
      years: "2 years",
      quote: "The culture here is different. Management actually listens. When I suggested a new scheduling process, they implemented it within a week. I feel valued every single day.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
      dept: "Customer Care",
    },
    {
      name: "David R.",
      role: "System Designer",
      years: "6 years",
      quote: "I've been in sales my whole career but never sold something I truly believed in. Knowing the repairs actually fix the problem — permanently — makes every conversation easy.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
      dept: "System Design",
    },
  ];

  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ background: SURFACE.panel }}>
      {/* Diagonal accent */}
      <div className="absolute right-0 top-0 bottom-0 w-[40%] pointer-events-none hidden lg:block"
        style={{ background: "rgba(255,255,255,.015)", transform: "skewX(-6deg)", transformOrigin: "top right" }} />

      <div className="max-w-[1440px] mx-auto px-8 md:px-14 relative z-10">
        <Reveal className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Hear From The Team</span>
          </div>
          <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px" }}>
            Don't take our word for it.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1}>
              <div className="flex flex-col h-full p-8" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
                {/* Quote mark */}
                <div style={{ fontFamily: "Georgia,serif", fontSize: 56, color: "rgba(196,171,108,.2)", lineHeight: .6, marginBottom: 16 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.8, flex: 1, marginBottom: 24 }}>
                  {q.quote}
                </p>
                <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginBottom: 20 }} />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0" style={{ border: `2px solid ${SAND}` }}>
                    <ImageWithFallback src={q.img} alt={q.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>{q.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)", marginTop: 2 }}>{q.role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="px-2.5 py-1 text-xs" style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.2)", fontFamily: "'Inter',sans-serif", fontSize: 10, color: SAND, fontWeight: 600 }}>
                      {q.years}
                    </span>
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

// ─── Hiring Process ───────────────────────────────────────────────────────────
function HiringProcessSection() {
  return (
    <section id="hiring-process" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: SURFACE.alt }}>
      {/* Background image bleed */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-14 relative z-10">
        <Reveal className="mb-14">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: 20, height: 2, background: B }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Our Process</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
                How We Hire
              </h2>
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(10,11,20,.45)", lineHeight: 1.7, maxWidth: 400 }}>
              We believe in total transparency at every step. Here's exactly what to expect from your journey with us — start to finish.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-[58px] left-[14%] right-[14%] z-0"
            style={{ borderTop: "1px dashed rgba(26,82,168,.2)" }} />
          {[
            { step: "01", name: "Apply Online",    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", desc: "Select a position and fill out our quick 5-minute application form. Attach your resume or describe your experience." },
            { step: "02", name: "Recruiter Call",  img: "https://images.unsplash.com/photo-1553484771-689f780a5a05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", desc: "A 15-minute phone chat with our talent specialist to review your qualifications and expectations." },
            { step: "03", name: "On-site Visit",   img: "https://images.unsplash.com/photo-1573496130141-209d200cebd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", desc: "Visit our local office. Meet the team, see our facility, ask all the questions you have." },
            { step: "04", name: "Get Started",     img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", desc: "Receive your offer, complete onboarding, and begin your paid training and certification program." },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 0.1} className="relative z-10">
              <div className="flex flex-col overflow-hidden" style={{ background: SURFACE.alt, border: `1px solid ${ON_LIGHT.border}` }}>
                {/* Step image */}
                <div className="relative overflow-hidden group" style={{ height: 160 }}>
                  <ImageWithFallback src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,11,20,.85) 0%, rgba(10,11,20,.2) 60%, transparent 100%)" }} />
                  {/* Step badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center"
                    style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 13, color: DARK }}>
                    {item.step}
                  </div>
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: CHAR, marginBottom: 8 }}>{item.name}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.4)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Job Board ────────────────────────────────────────────────────────────────
function JobBoardSection() {
  const [searchQuery,  setSearchQuery]  = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedJob,  setSelectedJob]  = useState<JobType | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applySuccess, setApplySuccess]  = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [applications, setApplications] = useState<ApplicationType[]>(MOCK_APPLICATIONS);

  const [firstName,    setFirstName]    = useState("");
  const [lastName,     setLastName]     = useState("");
  const [email,        setEmail]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [experience,   setExperience]   = useState("");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const DEPTS = ["All", "Production", "Service", "Customer Care", "System Design", "Accounting"];

  const filteredJobs = MOCK_JOBS.filter(job => {
    const q = searchQuery.toLowerCase();
    const matchSearch = job.title.toLowerCase().includes(q) || job.id.toLowerCase().includes(q) || job.dept.toLowerCase().includes(q);
    const matchDept   = selectedDept === "All" || job.dept === selectedDept;
    return matchSearch && matchDept;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) return;
    const code = `RG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: ApplicationType = {
      code, email: email.toLowerCase(), name: `${firstName} ${lastName}`,
      job: selectedJob?.title || "General Position", status: 0,
      updates: [
        { date: "Just now", status: "Application Received", desc: "Your application has been logged. Our recruiting specialist will contact you shortly." },
        { date: "Pending",  status: "Phone Screen",         desc: "Pending initial resume review." },
        { date: "Pending",  status: "On-site Interview",    desc: "Pending phone screening." },
        { date: "Pending",  status: "Final Decision",       desc: "Pending interview completion." },
      ]
    };
    setApplications(prev => [newApp, ...prev]);
    setGeneratedCode(code);
    setApplySuccess(true);
  };

  const handleCloseSuccess = () => {
    setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setExperience(""); setAttachedFile(null);
    setSelectedJob(null); setApplySuccess(false); setGeneratedCode(null); setShowApplyForm(false);
    setTimeout(() => {
      const el = document.getElementById("status-tracker");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <section id="open-positions" className="py-20 lg:py-28" style={{ background: SURFACE.base }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        <Reveal className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: 20, height: 2, background: B }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Opportunities</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px" }}>
                Open Positions
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.45)", marginTop: 6 }}>Find the perfect role to match your skills and ambitions.</p>
            </div>
            <div className="relative w-full md:w-80">
              <input type="text" placeholder="Search roles, code, or keyword…"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 outline-none"
                style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontSize: 13, color: CHAR }} />
              <svg className="absolute left-3.5 top-3.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(10,11,20,.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-6">
            {DEPTS.map(dept => (
              <button key={dept} onClick={() => setSelectedDept(dept)}
                className="px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all"
                style={{ background: selectedDept === dept ? B : "rgba(10,11,20,.05)", border: `1px solid ${selectedDept === dept ? B : "rgba(10,11,20,.1)"}`, color: selectedDept === dept ? "#fff" : "rgba(10,11,20,.6)", cursor: "pointer" }}>
                {dept}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.05}>
              <div onClick={() => { setSelectedJob(job); setShowApplyForm(false); setApplySuccess(false); }}
                className="p-6 cursor-pointer transition-all hover:bg-white/[0.03] flex flex-col justify-between h-full"
                style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, borderLeft: `3px solid ${SAND}` }}>
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: B, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{job.dept}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.25)" }}>#{job.id}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: CHAR, marginBottom: 8 }}>{job.title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.45)", lineHeight: 1.65, marginBottom: 16 }}>{job.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid rgba(10,11,20,.05)" }}>
                  <div className="flex gap-4">
                    <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.35)" }}><MapPin size={11} strokeWidth={1.8} /> {job.location}</span>
                    <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.35)" }}><Briefcase size={11} strokeWidth={1.8} /> {job.type}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: B }}>
                    View details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            </Reveal>
          )) : (
            <div className="col-span-2 py-14 text-center" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.3)" }}>No positions match your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Job Detail & Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-12 px-6"
            style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
            onClick={e => { if (e.target === e.currentTarget) setSelectedJob(null); }}>
            <button onClick={() => setSelectedJob(null)}
              className="fixed top-5 right-5 flex items-center justify-center transition-all hover:bg-white/10"
              style={{ width: 40, height: 40, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, cursor: "pointer", zIndex: 201 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>

            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full flex flex-col my-auto"
              style={{ maxWidth: 720, background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, borderLeft: `2px solid ${SAND}`, padding: 40, gap: 24 }}
              onClick={e => e.stopPropagation()}>

              {!applySuccess ? <>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ width: 14, height: 2, background: B }} />
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase" }}>
                      {selectedJob.dept} · #{selectedJob.id}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,3vw,32px)", color: CHAR, lineHeight: 1.2 }}>{selectedJob.title}</h2>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.45)" }}><MapPin size={13} strokeWidth={1.6} /> {selectedJob.location}</span>
                    <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.45)" }}><Briefcase size={13} strokeWidth={1.6} /> {selectedJob.type}</span>
                    <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: B, fontWeight: 600 }}><DollarSign size={13} strokeWidth={1.6} /> {selectedJob.pay}</span>
                  </div>
                </div>
                <div style={{ height: 1, background: "rgba(10,11,20,.07)" }} />

                {!showApplyForm ? (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: CHAR, marginBottom: 8 }}>About the Role</h4>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.6)", lineHeight: 1.7 }}>{selectedJob.description}</p>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: CHAR, marginBottom: 8 }}>Key Responsibilities</h4>
                      <ul className="flex flex-col gap-2.5">
                        {selectedJob.responsibilities.map((r, i) => (
                          <li key={i} className="flex gap-2.5 items-start">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: B }} />
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.6)", lineHeight: 1.6 }}>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: CHAR, marginBottom: 8 }}>Requirements</h4>
                      <ul className="flex flex-col gap-2.5">
                        {selectedJob.requirements.map((r, i) => (
                          <li key={i} className="flex gap-2.5 items-start">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: B }} />
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.6)", lineHeight: 1.6 }}>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ height: 1, background: "rgba(10,11,20,.07)" }} />
                    <button onClick={() => setShowApplyForm(true)}
                      className="w-full py-4 flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
                      style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
                      Apply Online Now
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR, marginBottom: 4 }}>Submit Your Application</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[["First name", firstName, setFirstName], ["Last name", lastName, setLastName]].map(([label, val, setter]: any) => (
                        <div key={label} className="flex flex-col gap-1.5">
                          <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(10,11,20,.6)", letterSpacing: 0.5 }}>{label} *</label>
                          <input required type="text" value={val} onChange={e => setter(e.target.value)} placeholder={label}
                            className="px-4 py-2.5 outline-none"
                            style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontSize: 13, color: CHAR, width: "100%" }} />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(10,11,20,.6)", letterSpacing: 0.5 }}>Email *</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                          className="px-4 py-2.5 outline-none"
                          style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontSize: 13, color: CHAR, width: "100%" }} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(10,11,20,.6)", letterSpacing: 0.5 }}>Phone *</label>
                        <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(901) 555-0199"
                          className="px-4 py-2.5 outline-none"
                          style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontSize: 13, color: CHAR, width: "100%" }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(10,11,20,.6)", letterSpacing: 0.5 }}>Relevant experience (optional)</label>
                      <textarea rows={3} value={experience} onChange={e => setExperience(e.target.value)} placeholder="Summarize your background…"
                        className="px-4 py-2.5 outline-none resize-none"
                        style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontSize: 13, color: CHAR, width: "100%" }} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(10,11,20,.6)", letterSpacing: 0.5 }}>Resume</label>
                      <div onClick={() => setAttachedFile("resume.pdf")}
                        className="py-5 flex flex-col items-center gap-1 cursor-pointer transition-all hover:bg-white/5"
                        style={{ border: `2px dashed ${attachedFile ? B : "rgba(10,11,20,.12)"}`, background: attachedFile ? "rgba(26,82,168,.04)" : "transparent" }}>
                        {attachedFile
                          ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={SAND} strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: B, fontWeight: 600 }}>resume.pdf attached</span></>
                          : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(10,11,20,.4)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(10,11,20,.4)" }}>Click to attach (PDF)</span></>
                        }
                      </div>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <button type="button" onClick={() => setShowApplyForm(false)}
                        className="px-5 py-3 font-semibold transition-all hover:bg-white/5"
                        style={{ border: `1px solid ${ON_LIGHT.border}`, color: "rgba(10,11,20,.6)", fontFamily: "'Inter',sans-serif", fontSize: 13, cursor: "pointer", background: "none" }}>
                        ← Back
                      </button>
                      <button type="submit"
                        className="flex-1 py-3 flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
                        style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}>
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </> : (
                <div className="flex flex-col items-center text-center py-8 gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(26,82,168,.1)", border: `2px solid ${SAND}` }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={SAND} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: CHAR, marginBottom: 8 }}>Application Submitted!</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(10,11,20,.55)", lineHeight: 1.6, maxWidth: 400 }}>
                      Thank you for applying for <strong style={{ color: CHAR }}>{selectedJob.title}</strong>. Our team will review your application and reach out soon.
                    </p>
                  </div>
                  <div className="p-5 w-full max-w-xs" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(10,11,20,.35)", textTransform: "uppercase", letterSpacing: 1.5 }}>Your Application Code</span>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 28, color: B, marginTop: 4, letterSpacing: 2 }}>{generatedCode}</p>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(10,11,20,.3)", marginTop: 4, display: "block" }}>Save this code to track your status below.</span>
                  </div>
                  <button onClick={handleCloseSuccess}
                    className="px-8 py-3.5 font-semibold text-white transition-opacity hover:opacity-85 mt-1"
                    style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 13, cursor: "pointer", border: "none" }}>
                    Copy Code & Track Status
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function BenefitsSection() {
  const PERKS: { title: string; desc: string; icon: React.ReactNode }[] = [
    { title: "Competitive Pay",           desc: "Weekly paychecks, overtime pay, and monthly performance bonuses.",          icon: <DollarSign size={18} strokeWidth={1.6} /> },
    { title: "Health Insurance",          desc: "Comprehensive medical, dental, and vision coverage for you and your family.", icon: <HeartPulse size={18} strokeWidth={1.6} /> },
    { title: "401(k) Match",              desc: "Company-sponsored retirement matching contributions up to 4%.",              icon: <TrendingUp size={18} strokeWidth={1.6} /> },
    { title: "Paid Time Off & Holidays",  desc: "Generous PTO, vacation days, and paid national holidays.",                  icon: <Umbrella size={18} strokeWidth={1.6} /> },
    { title: "Paid Training & Certs",     desc: "Classroom and field training paid by us, plus national certifications.",    icon: <GraduationCap size={18} strokeWidth={1.6} /> },
    { title: "Modern Fleet & Equipment",  desc: "Company trucks, professional uniforms, safety gear, and corporate iPads.",  icon: <Truck size={18} strokeWidth={1.6} /> },
  ];
  return (
    <section id="benefits" className="py-20 lg:py-28" style={{ background: SURFACE.alt }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Section header with image accent */}
        <div className="flex flex-col lg:flex-row gap-10 mb-14 items-start">
          <Reveal className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width: 20, height: 2, background: B }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 4, textTransform: "uppercase" }}>Workplace Perks</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
              Benefits &amp; Compensation
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(10,11,20,.5)", lineHeight: 1.7 }}>
              We take care of the people who take care of our customers. Starting from day one.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:w-1/2">
            <div className="relative overflow-hidden group" style={{ height: 220, border: `1px solid ${ON_LIGHT.border}` }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900"
                alt="Team celebration"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,34,53,0.9) 0%, transparent 60%)" }} />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: CHAR, lineHeight: 1.1, maxWidth: 280 }}>
                  A team that celebrates wins together.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.06}>
              <div
                className="relative flex flex-col gap-5 p-7 h-full group overflow-hidden transition-all duration-300"
                style={{ background: SURFACE.alt, border: `1px solid ${ON_LIGHT.border}` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(26,82,168,.4)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(10,11,20,.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${SAND}, transparent)` }} />


                <div className="relative w-12 h-12 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{ background: "linear-gradient(135deg, rgba(196,171,108,.16), rgba(196,171,108,.04))", border: "1px solid rgba(196,171,108,.25)", color: SAND }}>
                  {perk.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR, marginBottom: 8, letterSpacing: "-0.2px" }}>{perk.title}</h4>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.45)", lineHeight: 1.7 }}>{perk.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Application Tracker */}
        <Reveal className="mt-16">
          <div id="status-tracker" className="p-8 md:p-10" style={{ background: SURFACE.alt, border: `1px solid ${ON_LIGHT.border}` }}>
            <StatusTracker applications={MOCK_APPLICATIONS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Status Tracker ───────────────────────────────────────────────────────────
function StatusTracker({ applications }: { applications: ApplicationType[] }) {
  const [query,    setQuery]    = useState("");
  const [result,   setResult]   = useState<ApplicationType | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    if (!query.trim()) return;
    const clean = query.trim().toLowerCase();
    const match = applications.find(a => a.code.toLowerCase() === clean || a.email.toLowerCase() === clean);
    if (match) { setResult(match); setNotFound(false); }
    else       { setResult(null);  setNotFound(true); }
  };

  return (
    <div className="max-w-2xl">
      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase" }}>Track</span>
      <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 24, color: CHAR, marginTop: 6, marginBottom: 10 }}>My Application Status</h3>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.45)", lineHeight: 1.65, marginBottom: 20 }}>
        Enter the email address you applied with, or your application code (e.g. <span style={{ color: B }}>RG-7492</span>).
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" placeholder="Email or application code…" value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleTrack()}
          className="flex-1 px-4 py-3 outline-none"
          style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, fontFamily: "'Inter',sans-serif", fontSize: 13, color: CHAR }} />
        <button onClick={handleTrack}
          className="px-6 py-3 font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 13, cursor: "pointer", border: "none", flexShrink: 0 }}>
          Track Status
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div key={result.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }} style={{ borderTop: "1px solid rgba(10,11,20,.08)", paddingTop: 24 }}>
            <div className="flex justify-between items-start gap-4 mb-7">
              <div>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: CHAR }}>{result.name}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: B, marginTop: 3 }}>Applied for: {result.job}</p>
              </div>
              <span className="px-3 py-1 text-xs font-semibold" style={{ background: "rgba(26,82,168,.1)", border: `1.5px solid ${SAND}`, color: B }}>
                Code: {result.code}
              </span>
            </div>
            <div className="flex flex-col gap-6 pl-1">
              {result.updates.map((update, idx) => {
                const done = idx <= result.status;
                return (
                  <div key={update.status} className="flex gap-4 relative">
                    {idx < result.updates.length - 1 && (
                      <div className="absolute left-[13px] top-[26px] bottom-[-24px] w-[2px]"
                        style={{ background: idx < result.status ? B : "rgba(10,11,20,.08)" }} />
                    )}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10"
                      style={{ background: done ? B : SURFACE.base, border: `2px solid ${done ? B : "rgba(10,11,20,.12)"}` }}>
                      {done
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <span style={{ fontSize: 10, color: "rgba(10,11,20,.25)", fontWeight: 700 }}>{idx + 1}</span>
                      }
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex justify-between items-center gap-4">
                        <h5 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: done ? "#fff" : "rgba(10,11,20,.25)" }}>{update.status}</h5>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: done ? "rgba(10,11,20,.35)" : "rgba(10,11,20,.12)" }}>{update.date}</span>
                      </div>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: done ? "rgba(10,11,20,.5)" : "rgba(10,11,20,.15)", marginTop: 3, lineHeight: 1.6 }}>{update.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        {notFound && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#f43f5e" }}>
            No application found. Try "candidate@example.com" or code "RG-7492" as a demo.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CtaBanner({ onOpenInspection }: { onOpenInspection: () => void }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 380, background: SURFACE.cta }}>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-24 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div>
          <Reveal>
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width: 20, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Join the Team</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", maxWidth: 560 }}>
              Ready to build something that lasts?
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginTop: 12, maxWidth: 480 }}>
              We hire attitude and train skill. If you're driven, dependable, and ready to grow, there's a place for you here.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="shrink-0 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => { const el = document.getElementById("open-positions"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", border: "none" }}>
            See Open Positions
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a href="mailto:careers@redeemersgroup.com"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.8)", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>
            Email Us
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage({
  onBack, onNavigate, scrollTo: initialSection
}: { onBack: () => void; onNavigate: (p: string) => void; scrollTo?: string }) {
  const [activeTab, setActiveTab] = useState(initialSection ?? "culture");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (initialSection) {
      const t = setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      for (let i = PAGE_TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(PAGE_TABS[i].id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveTab(PAGE_TABS[i].id);
          return;
        }
      }
      setActiveTab("culture");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ background: SURFACE.base }}>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate} active="About" />
      </div>
      {/* Client QA: the About dropdown's Careers entry doesn't carry matching
          anchor ids, so this page follows the client's other approved option
          — a floating rail that follows scroll instead of a fixed bar. */}
      <FloatingSideNav tabs={PAGE_TABS} active={activeTab} onChange={scrollToSection} />
      <div className="pt-[68px] md:pt-[111px]">
        <HeroSection />
        <CultureSection />
        <EmployeeQuotesSection />
        <HiringProcessSection />
        <JobBoardSection />
        <BenefitsSection />
        <CtaBanner onOpenInspection={openInspection} />
        <Footer onBack={onBack} />
      </div>
    </div>
  );
}
