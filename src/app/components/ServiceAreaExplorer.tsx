import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, ChevronDown, ChevronRight, X, ArrowRight, Quote } from "lucide-react";
import { openInspection } from "./InspectionModal";
import {
  STATES, STATE_NAME, CITY_MARKERS, TOTAL_CITIES, TOTAL_COUNTIES,
  countiesByState, cityCountByState, searchAreas, proofForState,
  type StateAbbr, type CityRecord,
} from "../data/serviceAreas";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";

const KIND_LABEL: Record<string, string> = {
  "job-story": "Job story",
  "review": "Review",
  "case-study": "Case study",
};

export function ServiceAreaExplorer({ id = "explorer" }: { id?: string }) {
  const [activeState, setActiveState] = useState<StateAbbr>("TN");
  const [hoverState, setHoverState] = useState<StateAbbr | null>(null);
  const [openCounty, setOpenCounty] = useState<string | null>(null);
  const [highlightCity, setHighlightCity] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const countyListRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<string | null>(null);

  const results = useMemo(() => searchAreas(query), [query]);
  const counties = useMemo(() => countiesByState(activeState), [activeState]);
  const proof = useMemo(() => proofForState(activeState), [activeState]);
  const stateInfo = STATES.find((s) => s.abbr === activeState)!;

  // Close the search dropdown on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const close = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [searchOpen]);

  // Clear the city highlight after a moment so it reads as a flash, not a state
  useEffect(() => {
    if (!highlightCity) return;
    const t = setTimeout(() => setHighlightCity(null), 2600);
    return () => clearTimeout(t);
  }, [highlightCity]);

  // Scroll the county row to the top of the list once the accordion has finished
  // expanding. Done as an effect (not inline in the click handler) so it runs
  // after commit, and on the container only — scrollIntoView would bubble up and
  // drag the whole document with it.
  useEffect(() => {
    const target = pendingScroll.current;
    if (!target) return;
    const t = setTimeout(() => {
      const box = countyListRef.current;
      const row = box?.querySelector(`[data-county="${target}"]`);
      if (box && row) {
        const delta = row.getBoundingClientRect().top - box.getBoundingClientRect().top;
        box.scrollTop = box.scrollTop + delta;
      }
      pendingScroll.current = null;
    }, 320);
    return () => clearTimeout(t);
  }, [openCounty]);

  const selectCity = (city: CityRecord) => {
    const countyKey = `${city.state}-${city.county}`;
    pendingScroll.current = countyKey;
    setActiveState(city.state);
    setOpenCounty(countyKey);
    setHighlightCity(`${countyKey}-${city.name}`);
    setQuery("");
    setSearchOpen(false);
  };

  const selectState = (abbr: StateAbbr) => {
    setActiveState(abbr);
    setOpenCounty(null);
  };

  return (
    <section id={id} style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ display: "block", width: 28, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
                Coverage
              </span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 12 }}>
              Find your city
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 520 }}>
              {TOTAL_CITIES} cities across {TOTAL_COUNTIES} counties in four states. Search yours, or pick a state on the map.
            </p>
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative shrink-0 w-full lg:w-[380px]">
            <div className="flex items-stretch">
              <div className="flex items-center px-4" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.12)", borderRight: "none" }}>
                <Search size={16} color={SAND} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search your city or county…"
                style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#fff",
                  background: CHAR, border: "1px solid rgba(255,255,255,.12)",
                  padding: "14px 16px", flex: 1, outline: "none",
                }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setSearchOpen(false); }}
                  className="flex items-center px-3 hover:bg-white/5 transition-colors"
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.12)", borderLeft: "none", cursor: "pointer" }}
                >
                  <X size={14} color="rgba(255,255,255,.5)" />
                </button>
              )}
            </div>

            {/* Results dropdown */}
            <AnimatePresence>
              {searchOpen && query.trim().length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 z-30 mt-1 overflow-hidden"
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 16px 48px rgba(0,0,0,.6)" }}
                >
                  {results.length > 0 ? (
                    results.map((c) => (
                      <button
                        key={`${c.state}-${c.county}-${c.name}`}
                        onClick={() => selectCity(c)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
                        style={{ background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer" }}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <MapPin size={13} color={SAND} className="shrink-0" />
                          <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#fff" }}>
                            {c.name}
                          </span>
                        </span>
                        <span className="shrink-0" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)" }}>
                          {c.county} Co. · {c.state}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-5">
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 10 }}>
                        No match for &ldquo;{query}&rdquo; in our service area.
                      </p>
                      <button
                        onClick={() => { setSearchOpen(false); openInspection(); }}
                        className="inline-flex items-center gap-2"
                        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        Ask us about your address
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Map + county browser ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-px" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.07)" }}>

          {/* Map */}
          <div className="relative p-6 md:p-10" style={{ background: CHAR }}>
            <svg viewBox="0 0 1010 910" className="w-full h-auto" style={{ display: "block", maxHeight: 520, margin: "0 auto" }}>
              {STATES.map((s) => {
                const isActive = s.abbr === activeState;
                const isHover = s.abbr === hoverState;
                return (
                  <g key={s.abbr}
                    onClick={() => selectState(s.abbr)}
                    onMouseEnter={() => setHoverState(s.abbr)}
                    onMouseLeave={() => setHoverState(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d={s.path}
                      fill={isActive ? "rgba(26,82,168,.55)" : isHover ? "rgba(196,171,108,.16)" : "rgba(255,255,255,.05)"}
                      stroke={isActive ? SAND : "rgba(255,255,255,.18)"}
                      strokeWidth={isActive ? 3 : 1.5}
                      strokeLinejoin="round"
                      style={{ transition: "fill .25s ease, stroke .25s ease" }}
                    />
                    <text
                      x={s.labelX} y={s.labelY}
                      textAnchor="middle"
                      style={{
                        fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 38,
                        fill: isActive ? "#fff" : "rgba(255,255,255,.4)",
                        pointerEvents: "none", transition: "fill .25s ease",
                      }}
                    >
                      {s.abbr}
                    </text>
                  </g>
                );
              })}

              {/* Anchor city pins for the active state */}
              {CITY_MARKERS.filter((m) => m.state === activeState).map((m) => (
                <g key={m.name} style={{ pointerEvents: "none" }}>
                  <circle cx={m.x} cy={m.y} r={20} fill={SAND} opacity={0.16}>
                    <animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.28;0;0.28" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={m.x} cy={m.y} r={8} fill={SAND} stroke={DARK} strokeWidth={3} />
                  <text
                    x={m.x + 16} y={m.y + 6}
                    style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 21, fill: "#fff" }}
                  >
                    {m.name}
                  </text>
                </g>
              ))}
            </svg>

            <div className="flex items-center gap-2 mt-4">
              <MapPin size={13} color={SAND} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                Tap a state to browse its counties
              </span>
            </div>
          </div>

          {/* County browser */}
          <div className="flex flex-col" style={{ background: DARK }}>
            {/* State header — keyed remount, no AnimatePresence (mode="wait" with
                siblings can wedge the exiting node in place) */}
            <motion.div
                key={activeState}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="px-7 pt-7 pb-5 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>
                    {STATE_NAME[activeState]}
                  </h3>
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: SAND }}>
                    {activeState}
                  </span>
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.6, marginBottom: 14 }}>
                  {stateInfo.tagline}
                </p>
                <div className="flex gap-6">
                  <div>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, lineHeight: 1 }}>
                      {counties.length}
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 3 }}>Counties</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, lineHeight: 1 }}>
                      {cityCountByState(activeState)}
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 3 }}>Cities served</p>
                  </div>
                </div>
              </motion.div>

            {/* County accordion */}
            <div ref={countyListRef} className="flex-1 overflow-y-auto" style={{ maxHeight: 430 }}>
              {counties.map((county) => {
                const key = `${county.state}-${county.name}`;
                const isOpen = openCounty === key;
                return (
                  <div key={key} data-county={key} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <button
                      onClick={() => setOpenCounty(isOpen ? null : key)}
                      className="w-full flex items-center justify-between px-7 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
                      style={{ background: isOpen ? "rgba(255,255,255,.03)" : "none", border: "none", cursor: "pointer" }}
                    >
                      <span className="flex items-center gap-3">
                        <ChevronDown
                          size={14}
                          color={isOpen ? SAND : "rgba(255,255,255,.3)"}
                          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .2s" }}
                        />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: isOpen ? 600 : 500, fontSize: 14, color: isOpen ? "#fff" : "rgba(255,255,255,.7)" }}>
                          {county.name} County
                        </span>
                      </span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.28)" }}>
                        {county.cities.length}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="flex flex-wrap gap-1.5 px-7 pb-4 pt-1">
                            {county.cities.map((city) => {
                              const isHit = highlightCity === `${county.state}-${county.name}-${city}`;
                              return (
                                <span
                                  key={city}
                                  data-highlight={isHit || undefined}
                                  className="inline-flex items-center px-2.5 py-1 transition-all"
                                  style={{
                                    fontFamily: "'Inter',sans-serif", fontSize: 12.5,
                                    color: isHit ? DARK : "rgba(255,255,255,.6)",
                                    background: isHit ? SAND : "rgba(255,255,255,.05)",
                                    border: `1px solid ${isHit ? SAND : "rgba(255,255,255,.07)"}`,
                                    fontWeight: isHit ? 700 : 400,
                                  }}
                                >
                                  {city}
                                </span>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Not listed CTA */}
            <div className="px-7 py-5 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,.07)", background: CHAR }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.6, marginBottom: 10 }}>
                Don&rsquo;t see your town? We still may cover it — ask and we&rsquo;ll confirm same day.
              </p>
              <button
                onClick={openInspection}
                className="group inline-flex items-center gap-2 px-5 py-2.5"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", border: "none", cursor: "pointer" }}
              >
                Check my address
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Location-linked proof ── */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <span style={{ display: "block", width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Recent work in {STATE_NAME[activeState]}
            </span>
          </div>

          <motion.div
              key={activeState}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {proof.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col p-6"
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 2, textTransform: "uppercase", background: B, padding: "3px 8px" }}>
                      {KIND_LABEL[p.kind]}
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: SAND }}>
                      {p.service}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={12} color="rgba(255,255,255,.35)" />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)" }}>
                      {p.city}, {p.state}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>
                    {p.title}
                  </h4>

                  {p.kind === "review" && (
                    <Quote size={16} color="rgba(196,171,108,.3)" style={{ marginBottom: 6 }} />
                  )}

                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.5)", lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
                    {p.body}
                  </p>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>
                      {p.meta}
                    </span>
                    <ChevronRight size={13} color={SAND} />
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
