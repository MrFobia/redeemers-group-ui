import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Logo } from "./components/Logo";
import {
  Phone, Mail, MapPin, Clock,
  ChevronRight,
} from "lucide-react";
import imgServiceAreaMap from "../assets/service-area-map.jpg";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B    = "#1A52A8";
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

// ─── Page Tabs ────────────────────────────────────────────────────────────────
const PAGE_TABS = [
  { id: "info",      label: "Contact Information" },
  { id: "locations", label: "Locations"           },
  { id: "form",      label: "Contact Form"        },
];

// ─── Service Area Data ────────────────────────────────────────────────────────
const AREA_DATA = [
  {
    state: "Tennessee", abbr: "TN",
    cities: ["Memphis", "Nashville", "Germantown", "Collierville", "Bartlett", "Cordova", "Millington", "Lakeland"],
    projects: 2340, tagline: "Our largest and most active service region.", highlight: "Most active market",
    phone: "(901) 555-0100",
    img: "https://images.unsplash.com/photo-1545156521-2afe1ce03db3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    state: "Mississippi", abbr: "MS",
    cities: ["Olive Branch", "Southaven", "Hernando", "Nesbit", "Walls", "Horn Lake", "Byhalia"],
    projects: 980, tagline: "Expanding rapidly across the Metro area.", highlight: "Fastest growing",
    phone: "(662) 555-0200",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    state: "Arkansas", abbr: "AR",
    cities: ["West Memphis", "Marion", "Earle", "Marked Tree", "Jonesboro", "Blytheville"],
    projects: 630, tagline: "Serving the Delta and tri-state corridor.", highlight: "Delta market",
    phone: "(870) 555-0300",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    state: "Missouri", abbr: "MO",
    cities: ["Cape Girardeau", "Sikeston", "Poplar Bluff", "Jackson", "Dexter"],
    projects: 390, tagline: "Serving the Bootheel and Southeast Missouri.", highlight: "New territory",
    phone: "(573) 555-0400",
    img: "https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = {
    Services: ["Crawl space", "Waterproofing", "Foundation", "Concrete", "Commercial"],
    Company:  ["About us", "Our work", "Blog", "Careers", "Financing"],
    Locations:["Tennessee", "Missouri", "Arkansas", "Mississippi"],
    Contact:  ["(901) 555-0100", "info@redeemersgroup.com", "Schedule inspection"],
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
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
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
    <section className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt="Redeemers team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,11,20,0.96) 0%, rgba(10,11,20,0.80) 55%, rgba(10,11,20,0.45) 100%)" }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: `linear-gradient(to bottom, transparent 10%, ${SAND} 40%, ${SAND} 60%, transparent 90%)`, opacity: 0.6 }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 flex flex-col justify-center" style={{ minHeight: "70vh" }}>
        <div className="max-w-[620px]">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <div style={{ width: 20, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Contact Us</span>
            </div>
            <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(38px,5vw,72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 20 }}>
              We're here<br />whenever you<br />need <span style={{ color: SAND }}>us.</span>
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(14px,1.4vw,17px)", color: "rgba(255,255,255,.6)", lineHeight: 1.75, maxWidth: 480, marginBottom: 36 }}>
              Whether you have a question, need a free inspection, or want to talk through a structural concern — our team is ready to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+19015550100"
                className="group inline-flex items-center gap-3 px-7 py-4 font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 14 }}>
                <Phone size={16} strokeWidth={1.8} />
                (901) 555-0100
              </a>
              <button
                onClick={() => { const el = document.getElementById("form"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="inline-flex items-center gap-2 px-7 py-4 transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.85)", fontFamily: "'Inter',sans-serif", fontSize: 14, background: "none", cursor: "pointer" }}>
                Send a message
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Information ───────────────────────────────────────────────────────
function ContactInfoSection() {
  const CHANNELS = [
    {
      icon: <Phone size={22} strokeWidth={1.6} />,
      title: "Call Us",
      desc: "Speak directly with a structural specialist. Available Monday through Friday, 7am to 6pm Central.",
      action: "(901) 555-0100",
      href: "tel:+19015550100",
    },
    {
      icon: <Mail size={22} strokeWidth={1.6} />,
      title: "Email Us",
      desc: "Send us your questions or photos of your home's concern. We respond within one business day.",
      action: "info@redeemersgroup.com",
      href: "mailto:info@redeemersgroup.com",
    },
    {
      icon: <MapPin size={22} strokeWidth={1.6} />,
      title: "Visit Us",
      desc: "Stop by our Memphis headquarters. Meet the team and walk through our product showroom.",
      action: "3210 Lamar Ave, Memphis, TN 38118",
      href: "#locations",
    },
    {
      icon: <Clock size={22} strokeWidth={1.6} />,
      title: "Office Hours",
      desc: "Our team is available during regular business hours. Emergency structural assessments available by request.",
      action: "Mon–Fri · 7:00 AM – 6:00 PM CT",
      href: undefined,
    },
  ];

  return (
    <section id="info" className="py-20 lg:py-28" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Contact Information</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,52px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px" }}>
              How to reach us.
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.75, maxWidth: 420 }}>
              Multiple ways to get in touch. Choose whichever works best for you — we respond fast.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHANNELS.map((ch, i) => (
            <Reveal key={ch.title} delay={i * 0.07}>
              <div className="flex flex-col h-full p-7" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.06)", borderTop: `2px solid ${SAND}` }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ background: "rgba(196,171,108,.08)", border: "1px solid rgba(196,171,108,.2)", color: SAND }}>
                  {ch.icon}
                </div>
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 10 }}>{ch.title}</h3>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{ch.desc}</p>
                {ch.href ? (
                  <a href={ch.href}
                    className="inline-flex items-center gap-1.5 group"
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, wordBreak: "break-word" }}>
                    {ch.action}
                    <ChevronRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </a>
                ) : (
                  <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND }}>{ch.action}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Emergency strip */}
        <Reveal delay={0.3} className="mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6"
            style={{ background: "rgba(26,82,168,.08)", border: "1px solid rgba(26,82,168,.25)", borderLeft: `3px solid ${B}` }}>
            <div>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>
                Emergency structural concern?
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)" }}>
                If you notice sudden cracks, foundation shifts, or water intrusion, call us immediately.
              </p>
            </div>
            <a href="tel:+19015550100"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontSize: 13 }}>
              <Phone size={14} strokeWidth={2} />
              Call Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Locations Map ─────────────────────────────────────────────────────────────
function LocationsMapSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const data = AREA_DATA[active];

  const goToForm = () => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="locations" ref={sectionRef} className="relative overflow-hidden" style={{ background: CREAM }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:min-h-[720px]">

        {/* ── Left ── */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 2, background: B }} />
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontSize: 10, fontWeight: 700, color: B, letterSpacing: 4, textTransform: "uppercase" }}>
                Service locations
              </p>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(38px,4.5vw,60px)", color: CHAR, lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 8 }}>
              Find us in<br />your<br />neighborhood
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.65, marginBottom: 36, maxWidth: 380 }}>
              Local crews, local knowledge. We know the soil, the climate, and the homes in your area.
            </p>

            {/* State selector */}
            <div className="flex flex-col gap-1.5 mb-8">
              {AREA_DATA.map((d, i) => (
                <motion.button
                  key={d.state}
                  onClick={() => setActive(i)}
                  layout
                  className="text-left overflow-hidden"
                  style={{
                    background: active === i ? "#fff" : "transparent",
                    borderLeft: `3px solid ${active === i ? B : "rgba(0,0,0,.1)"}`,
                    boxShadow: active === i ? "0 4px 20px rgba(0,0,0,.08)" : "none",
                    transition: "background .2s, box-shadow .2s",
                  }}
                >
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span style={{
                        fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 11,
                        color: active === i ? B : "rgba(0,0,0,.25)", letterSpacing: 2,
                      }}>{d.abbr}</span>
                      <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: active === i ? CHAR : MUTED }}>
                        {d.state}
                      </span>
                      {d.highlight && active === i && (
                        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: B, letterSpacing: 1.5, textTransform: "uppercase", background: "rgba(26,82,168,.1)", padding: "2px 7px" }}>
                          {d.highlight}
                        </span>
                      )}
                    </div>
                    <motion.div animate={{ rotate: active === i ? 90 : 0 }} transition={{ duration: 0.25 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke={active === i ? B : "rgba(0,0,0,.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED, marginTop: 12, marginBottom: 10 }}>{d.tagline}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {d.cities.map((city) => (
                              <span key={city} style={{
                                fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500,
                                color: CHAR, background: "rgba(26,82,168,.07)",
                                border: "1px solid rgba(26,82,168,.15)", padding: "3px 10px",
                              }}>{city}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: CHAR, lineHeight: 1 }}>{d.projects.toLocaleString()}+</p>
                              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED }}>projects in {d.state}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); goToForm(); }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 hover:opacity-90 transition-opacity"
                              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
                            >
                              Book in {d.abbr}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED }}>
              Don't see your city? <button onClick={goToForm} style={{ color: B, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 12 }}>Ask us — we may still serve you.</button>
            </p>
          </motion.div>
        </div>

        {/* ── Right: Map + animated info card ── */}
        <div className="relative hidden lg:block">
          <img src={imgServiceAreaMap} alt="Service area map" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(247,245,239,.15) 0%, transparent 40%)" }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={data.state}
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute flex flex-col"
              style={{ top: "28%", left: 48, background: DARK, width: 270 }}
            >
              <div style={{ height: 3, background: B }} />
              <div className="px-6 pt-5 pb-6 flex flex-col gap-4">
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 48, color: "#fff", lineHeight: 0.95, letterSpacing: "-2px" }}>{data.state}</p>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: SAND, marginTop: 4, letterSpacing: 1 }}>{data.abbr} · {data.projects.toLocaleString()}+ projects</p>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "rgba(255,255,255,.4)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Cities served</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.cities.slice(0, 5).map((city) => (
                      <span key={city} style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.6)", background: "rgba(255,255,255,.06)", padding: "2px 8px" }}>{city}</span>
                    ))}
                    {data.cities.length > 5 && (
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: SAND, padding: "2px 8px" }}>+{data.cities.length - 5} more</span>
                    )}
                  </div>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{data.tagline}</p>
                <button
                  onClick={goToForm}
                  className="w-full py-2.5 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
                >
                  Free inspection in {data.abbr}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 right-8 flex flex-col gap-2.5">
            {["Financing from $79/mo", "No money down", "Lifetime warranty"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2.5 px-4 py-2.5"
                style={{ background: "rgba(10,11,20,.82)", border: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(6px)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={SAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#fff", fontWeight: 500 }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Contact Form (same pattern as AboutPage ContactSection) ──────────────────
const SERVICES_LIST = ["Crawl Space Repair", "Basement Waterproofing", "Foundation Repair", "Concrete Services", "Commercial Services", "Other"];

function ContactFormSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const toggle = (s: string) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <section id="form" className="py-20 lg:py-28" style={{ background: DARK }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left — copy */}
          <div className="lg:w-[380px] shrink-0">
            <Reveal>
              <div className="flex items-center gap-2 mb-5">
                <div style={{ width: 20, height: 2, background: SAND }} />
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Contact form</span>
              </div>
              <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 14 }}>
                Schedule free inspection
              </h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 32 }}>
                The fastest way to get answers. No obligation.
              </p>
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
                      className="px-4 py-3 outline-none transition-all"
                      style={{ background: DARK, border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", width: "100%" }} />
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 0.5, marginBottom: 10 }}>Service needed</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES_LIST.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer">
                      <div onClick={() => toggle(s)}
                        className="w-4 h-4 flex items-center justify-center shrink-0 transition-all"
                        style={{ background: selected.includes(s) ? B : "transparent", border: `1.5px solid ${selected.includes(s) ? B : "rgba(255,255,255,.2)"}`, cursor: "pointer" }}>
                        {selected.includes(s) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.6)" }}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mb-5">
                <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 0.5 }}>Describe your problem (optional)</label>
                <textarea rows={4} placeholder="Tell us more..."
                  className="px-4 py-3 outline-none resize-none transition-all"
                  style={{ background: DARK, border: "1px solid rgba(255,255,255,.1)", fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff", width: "100%" }} />
              </div>

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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage({
  onBack, onNavigate, scrollTo: initialSection,
}: { onBack: () => void; onNavigate: (p: string) => void; scrollTo?: string }) {
  useEffect(() => {
    if (initialSection) {
      const t = setTimeout(() => {
        const el = document.getElementById(initialSection);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ background: DARK }}>
      {/* Client QA: the About/Contact hover dropdown already lists these
          exact 3 anchors (Contact information/Locations map/Contact form),
          so this page keeps only the global menu, not a 3rd fixed bar. */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate} active="About" />
      </div>
      <div className="pt-[81px] md:pt-[148px]">
        <HeroSection />
        <ContactInfoSection />
        <LocationsMapSection />
        <ContactFormSection />
        <Footer onBack={onBack} />
      </div>
    </div>
  );
}
