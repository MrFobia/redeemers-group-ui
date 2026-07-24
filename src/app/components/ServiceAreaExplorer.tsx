import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, ChevronDown, ChevronRight, X, ArrowRight } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { ServiceAreaMap } from "./ServiceAreaMap";
import { CityPanel } from "./CityPanel";
import { LocalContentModal } from "./LocalContentModal";
import { contentForCityItems, type ContentItem, type ContentKind } from "../data/localContent";
import {
  STATES, STATE_NAME, TOTAL_CITIES, TOTAL_COUNTIES, CITY_BY_SLUG,
  countiesByState, cityCountByState, searchAreas, proofForState, slugify, coordsForCity,
  type StateAbbr, type CityRecord, type ProofKind,
} from "../data/serviceAreas";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";

const PROOF_TABS: { kind: ProofKind; label: string }[] = [
  { kind: "job-story", label: "Job Stories" },
  { kind: "case-study", label: "Case Studies" },
  { kind: "review", label: "Reviews" },
];

export function ServiceAreaExplorer({
  id = "explorer",
  // Lets "About > Areas served > Mississippi" open the explorer already on that
  // state instead of always starting on Tennessee.
  initialState = "TN",
}: {
  id?: string;
  initialState?: StateAbbr;
}) {
  const [activeState, setActiveState] = useState<StateAbbr>(initialState);
  const [activeCity, setActiveCity] = useState<CityRecord | null>(null);
  const [kindFilter, setKindFilter] = useState<ContentKind | null>(null);
  const [openItem, setOpenItem] = useState<ContentItem | null>(null);
  const [proofTab, setProofTab] = useState<ProofKind>("job-story");
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
  const state = STATES.find((s) => s.abbr === activeState)!;
  const tabProof = proof.filter((p) => p.kind === proofTab);

  // City drill-in: expand the counts into individual items and pin each one.
  const cityItems = useMemo(
    () => (activeCity ? contentForCityItems(activeCity.slug) : []),
    [activeCity]
  );
  const pins = kindFilter ? cityItems.filter((i) => i.kind === kindFilter) : cityItems;
  const cityPos = activeCity ? coordsForCity(activeCity.slug) : undefined;

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

  const selectState = (abbr: StateAbbr) => {
    setActiveState(abbr);
    setActiveCity(null);
    setKindFilter(null);
    setProofTab("job-story");
    setOpenCounty(null);
  };

  /** Open panel level 2 for a city. */
  const openCity = (city: CityRecord) => {
    if (city.state !== activeState) setActiveState(city.state);
    setActiveCity(city);
    setKindFilter(null);
  };

  const openCityBySlug = (slug: string) => {
    const city = CITY_BY_SLUG[slug];
    if (city) openCity(city);
  };

  const selectCity = (city: CityRecord) => {
    const countyKey = `${city.state}-${city.county}`;
    pendingScroll.current = countyKey;
    if (city.state !== activeState) setActiveState(city.state);
    setActiveCity(city);
    setKindFilter(null);
    setOpenCounty(countyKey);
    setHighlightCity(`${countyKey}-${city.name}`);
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <section id={id} style={{ background: DARK }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* ── Hero + centered search ── */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ display: "block", width: 28, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>
              Service areas
            </span>
            <span style={{ display: "block", width: 28, height: 2, background: SAND }} />
          </div>
          <h1 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,80px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 20 }}>
            We're in your neighborhood
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            Local experts across Tennessee, Mississippi, Arkansas, and Missouri. Search your city, county, or ZIP to instantly see your local team, reviews, and available services.
          </p>

          <div ref={searchRef} className="relative shrink-0 max-w-lg mx-auto text-left">
            <div className="flex items-stretch">
              <div className="flex items-center px-4" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.14)", borderRight: "none" }}>
                <Search size={16} color={SAND} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search your city, county or ZIP code…"
                style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#fff",
                  background: CHAR, border: "1px solid rgba(255,255,255,.14)",
                  padding: "15px 16px", flex: 1, outline: "none",
                }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setSearchOpen(false); }}
                  className="flex items-center px-3 hover:bg-white/5 transition-colors"
                  style={{ background: CHAR, border: "1px solid rgba(255,255,255,.14)", borderLeft: "none", cursor: "pointer" }}
                >
                  <X size={14} color="rgba(255,255,255,.5)" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {searchOpen && query.trim().length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 z-[1000] mt-1 overflow-hidden"
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

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.3)", marginTop: 14 }}>
            {TOTAL_CITIES} cities across {TOTAL_COUNTIES} counties in four states. Or pick a state on the map below.
          </p>
        </div>

        {/* ── Map + state panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_380px] gap-px" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.07)" }}>

          {/* State rail */}
          <div className="flex lg:flex-col overflow-x-auto" style={{ background: CHAR }}>
            <p className="hidden lg:block shrink-0" style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", padding: "20px 18px 12px" }}>
              Select state
            </p>
            {STATES.map((s, i) => {
              const on = s.abbr === activeState;
              return (
                <button
                  key={s.abbr}
                  onClick={() => selectState(s.abbr)}
                  className="relative text-left transition-all shrink-0"
                  style={{
                    padding: "16px 18px",
                    cursor: "pointer",
                    background: on ? "rgba(196,171,108,.08)" : "transparent",
                    borderLeft: on ? `3px solid ${SAND}` : "3px solid transparent",
                    borderBottom: i < STATES.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                    minWidth: 110,
                  }}
                >
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: on ? 800 : 500, fontSize: 20, color: on ? "#fff" : "rgba(255,255,255,.32)", display: "block", lineHeight: 1, transition: "color .2s" }}>
                    {s.abbr}
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: on ? SAND : "rgba(255,255,255,.25)", display: "block", marginTop: 4, transition: "color .2s" }}>
                    {s.name}
                  </span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.2)", display: "block", marginTop: 2 }}>
                    {cityCountByState(s.abbr)} cities
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ background: CHAR }}>
            <ServiceAreaMap
              activeState={activeState}
              onSelectState={selectState}
              cityPos={cityPos}
              contentPins={pins}
              onPinClick={setOpenItem}
            />
          </div>

          {/* State panel — keyed remount, no AnimatePresence (mode="wait" with
              siblings can wedge the exiting node in place) */}
          <motion.div
            key={activeCity ? activeCity.slug : activeState}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-y-auto rg-scroll-thin"
            style={{ background: DARK, maxHeight: 520 }}
          >
            {activeCity ? (
              <CityPanel
                city={activeCity}
                items={cityItems}
                kindFilter={kindFilter}
                onFilter={setKindFilter}
                onOpenItem={setOpenItem}
                onBack={() => { setActiveCity(null); setKindFilter(null); }}
              />
            ) : (
            <div className="px-7 py-7">
              {/* Header */}
              <div className="flex items-baseline gap-3 mb-2">
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>
                  {state.name}
                </h3>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: SAND }}>
                  {state.abbr}
                </span>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.45)", lineHeight: 1.65, marginBottom: 18 }}>
                {state.tagline}
              </p>

              <div className="flex gap-6 pb-5 mb-5" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, lineHeight: 1 }}>{counties.length}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 3 }}>Counties</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, lineHeight: 1 }}>{cityCountByState(activeState)}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 3 }}>Cities served</p>
                </div>
              </div>

              {/* Metro areas */}
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                Metro areas
              </p>
              <div className="flex flex-col gap-1.5 mb-6">
                {state.metros.map((metro) => (
                  <button
                    key={metro.citySlug}
                    onClick={() => openCityBySlug(metro.citySlug)}
                    className="group flex items-center justify-between text-left px-3.5 py-2.5 transition-all hover:border-white/25"
                    style={{
                      fontFamily: "'Inter',sans-serif", fontSize: 14,
                      color: "rgba(255,255,255,.72)",
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.06)",
                      cursor: "pointer",
                    }}
                  >
                    {metro.label}
                    <ChevronRight size={13} color={SAND} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              {/* Services */}
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                Services available
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {state.services.map((svc) => (
                  <span
                    key={svc}
                    style={{
                      fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,.7)",
                      background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                      padding: "5px 11px",
                    }}
                  >
                    {svc}
                  </span>
                ))}
              </div>

              <button
                onClick={openInspection}
                className="group w-full flex items-center justify-center gap-2 py-3.5 mb-7"
                style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}
              >
                Schedule in {state.abbr}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* Content from this area */}
              <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                  Content from this area
                </p>

                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {PROOF_TABS.map((tab) => {
                    const isOn = proofTab === tab.kind;
                    const count = proof.filter((p) => p.kind === tab.kind).length;
                    return (
                      <button
                        key={tab.kind}
                        onClick={() => setProofTab(tab.kind)}
                        className="py-2 px-2 transition-all"
                        style={{
                          fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: isOn ? 600 : 400,
                          color: isOn ? "#7EB8FF" : "rgba(255,255,255,.45)",
                          background: isOn ? "rgba(26,82,168,.22)" : "rgba(255,255,255,.03)",
                          border: `1px solid ${isOn ? "rgba(26,82,168,.6)" : "rgba(255,255,255,.06)"}`,
                          cursor: "pointer", lineHeight: 1.25,
                        }}
                      >
                        {tab.label}
                        <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,.3)", fontWeight: 400 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2">
                  {tabProof.length > 0 ? tabProof.map((p) => (
                    <button
                      key={p.title}
                      className="group text-left px-4 py-3 transition-all hover:border-white/20"
                      style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", cursor: "pointer" }}
                    >
                      <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.3, marginBottom: 4 }}>
                        {p.title}
                      </p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                        {p.city}, {p.state} &nbsp;·&nbsp; ZIP {p.zip}
                      </p>
                    </button>
                  )) : (
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.3)", padding: "10px 0" }}>
                      Nothing published here yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
            )}
          </motion.div>
        </div>

        {/* ── Full county / city browser ── */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <span style={{ display: "block", width: 20, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Every county we serve in {STATE_NAME[activeState]}
            </span>
          </div>

          <div ref={countyListRef} className="overflow-y-auto rg-scroll-thin" style={{ maxHeight: 420, border: "1px solid rgba(255,255,255,.07)", background: CHAR }}>
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
                              <button
                                key={city}
                                onClick={() => openCityBySlug(slugify(`${city}-${county.state}`))}
                                className="inline-flex items-center px-2.5 py-1 transition-all hover:border-white/30"
                                style={{
                                  fontFamily: "'Inter',sans-serif", fontSize: 12.5,
                                  color: isHit ? DARK : "rgba(255,255,255,.6)",
                                  background: isHit ? SAND : "rgba(255,255,255,.05)",
                                  border: `1px solid ${isHit ? SAND : "rgba(255,255,255,.07)"}`,
                                  fontWeight: isHit ? 700 : 400,
                                  cursor: "pointer",
                                }}
                              >
                                {city}
                              </button>
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

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
              Don&rsquo;t see your town? We still may cover it — ask and we&rsquo;ll confirm same day.
            </p>
            <button
              onClick={openInspection}
              className="group inline-flex items-center gap-2 px-6 py-3 shrink-0"
              style={{ background: "none", border: `1.5px solid ${SAND}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: SAND, cursor: "pointer" }}
            >
              Check my address
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openItem && <LocalContentModal item={openItem} onClose={() => setOpenItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
