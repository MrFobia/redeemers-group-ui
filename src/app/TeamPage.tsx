import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { PageHeroBanner } from "./components/PageHeroBanner";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { TeamMemberModal } from "./components/TeamMemberModal";
import { DEPARTMENTS, TEAM_MEMBERS, type TeamMember } from "./data/team";
import imgAboutHero from "../assets/svc-concrete.jpg";

import { B, CHAR, SURFACE, ON_LIGHT } from "./theme";

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

// ─── Full team roster ─────────────────────────────────────────────────────────
// Its own page per the sitemap — the About page's "Meet our team" module is a
// filtered teaser (one department at a time); this shows the whole roster with
// no pagination, but keeps the same department slider so visitors can still
// narrow it down. Same detail modal as the teaser.
const DEPT_TABS = ["All", ...DEPARTMENTS];

function TeamGridSection({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeDept, setActiveDept] = useState("All");

  const visible = activeDept === "All" ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.dept === activeDept);

  const goPrev = () => {
    const i = DEPT_TABS.indexOf(activeDept);
    setActiveDept(DEPT_TABS[(i - 1 + DEPT_TABS.length) % DEPT_TABS.length]);
  };
  const goNext = () => {
    const i = DEPT_TABS.indexOf(activeDept);
    setActiveDept(DEPT_TABS[(i + 1) % DEPT_TABS.length]);
  };

  return (
    <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* ── Department filter — same slider as the About page teaser ── */}
        <div className="flex items-center justify-between gap-4 mb-14">
          <button onClick={goPrev}
            className="shrink-0 flex items-center justify-center transition-all hover:bg-black/5"
            style={{ width: 44, height: 44, border: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex-1 flex items-end justify-center gap-6 lg:gap-10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {DEPT_TABS.map((dept) => {
              const isActive = dept === activeDept;
              return (
                <div key={dept} className="relative shrink-0 flex flex-col items-center gap-2 cursor-pointer select-none"
                  onClick={() => setActiveDept(dept)}>
                  <span style={{
                    fontFamily: "'Articulat CF',sans-serif", fontWeight: 800,
                    fontSize: "clamp(14px, 1.6vw, 24px)", lineHeight: 1.1,
                    letterSpacing: "-0.5px", whiteSpace: "nowrap",
                    color: isActive ? CHAR : "rgba(10,11,20,.28)",
                    transition: "color 0.3s ease",
                  }}>
                    {dept}
                  </span>
                  {isActive && (
                    <div style={{ height: 2, background: B, width: "100%", borderRadius: 1 }} />
                  )}
                </div>
              );
            })}
          </div>

          <button onClick={goNext}
            className="shrink-0 flex items-center justify-center transition-all hover:bg-black/5"
            style={{ width: 44, height: 44, border: `1px solid ${ON_LIGHT.border}`, background: "none", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={CHAR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {visible.map((m, i) => (
            <Reveal key={m.name} delay={(i % 6) * 0.05} className="group flex flex-col items-center gap-5 cursor-pointer">
              <div onClick={() => setSelectedMember(m)} className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <ImageWithFallback
                  src={m.img} alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: "linear-gradient(0deg, rgba(10,11,20,.85) 0%, rgba(26,82,168,.35) 100%)" }}
                >
                  <span className="inline-flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#C4AB6C" }}>
                    See profile
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="#C4AB6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </motion.div>
              </div>
              <div className="flex flex-col items-center gap-1 text-center w-full">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: CHAR, lineHeight: 1.3 }}>{m.name}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(10,11,20,.4)" }}>{m.title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: B, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{m.dept}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} onNavigate={onNavigate} />
      )}
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

// ─── TeamPage ─────────────────────────────────────────────────────────────────
export default function TeamPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="About" />
      </div>
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: "About", onClick: () => onNavigate?.("about") },
          { label: "Team" },
        ]} />

        <PageHeroBanner
          image={imgAboutHero}
          imageAlt="The Redeemers Group team"
          eyebrow="People"
          title="Meet our team"
          lede={`${TEAM_MEMBERS.length} people across Accounting, Production, Customer Care, System Design, and Service — the crew behind every job.`}
        />

        <TeamGridSection onNavigate={onNavigate} />

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
