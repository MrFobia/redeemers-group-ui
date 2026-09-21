import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, ChevronDown, ChevronRight, X, ArrowRight } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { ServiceAreaMap } from "./ServiceAreaMap";
import { CityPanel } from "./CityPanel";
import { contentForCityItems, type ContentItem, type ContentKind } from "../data/localContent";
import { workPath } from "../data/workContent";
import {
  STATES, STATE_NAME, TOTAL_CITIES, TOTAL_COUNTIES, CITY_BY_SLUG,
  countiesByState, cityCountByState, searchAreas, proofForState, slugify, coordsForCity,
  type StateAbbr, type CityRecord, type ProofKind,
} from "../data/serviceAreas";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
import { B, DARK, CHAR, SAND, SURFACE, ON_LIGHT } from "../theme";

const PROOF_TABS: { kind: ProofKind; label: string }[] = [
  { kind: "job-story", label: "Job Stories" },
  { kind: "case-study", label: "Case Studies" },
  { kind: "review", label: "Reviews" },
];

export function ServiceAreaExplorer({ id = "explorer", onNavigate }: { id?: string; onNavigate?: (p: string) => void }) {
  // A map pin or panel row opens the piece of proof on its own page
  // (review/<slug>, job-story/<slug>, …) instead of the old LocalContentModal.
  const openWork = (item: ContentItem) => onNavigate?.(workPath(item.kind, item.id));
  const [activeState, setActiveState] = useState<StateAbbr>("TN");
  const [activeCity, setActiveCity] = useState<CityRecord | null>(null);
  const [kindFilter, setKindFilter] = useState<ContentKind | null>(null);
  const [proofTab, setProofTab] = useState<ProofKind>("job-story");
  const [openCounty, setOpenCounty] = useState<string | null>(null);
  const [highlightCity, setHighlightCity] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  // Counties expanded inside the state panel — picking one no longer throws
  // the page down to the browser below. Everything happens where you clicked.
  const [panelCounty, setPanelCounty] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const countyListRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchAreas(query), [query]);
  const counties = useMemo(() => countiesByState(activeState), [activeState]);
  const proof = useMemo(() => proofForState(activeState), [activeState]);
  const state = STATES.find((s) => s.abbr === activeState)!;
  // QA: picking a state showed "nothing published" even when it had content.
  // `proofTab` is sticky across states, so landing on a state with zero job
  // stories left the panel empty. Fall back to the first kind that has items.
  const activeProofTab = proof.some((p) => p.kind === proofTab)
    ? proofTab
    : (PROOF_TABS.find((t) => proof.some((p) => p.kind === t.kind))?.kind ?? proofTab);
  const tabProof = proof.filter((p) => p.kind === activeProofTab);

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

  const selectState = (abbr: StateAbbr) => {
    setActiveState(abbr);
    setActiveCity(null);
    setKindFilter(null);
    setProofTab("job-story");
    setOpenCounty(null);
    setPanelCounty(null);
  };

  /** Put the map + panel row under the fixed header. Only used when a click
      opens something that lives *above* the click (a city chip in the browser
      loads the panel up top); nothing ever scrolls the page downward. */
  const scrollPanelIntoView = () => {
    const box = panelRef.current;
    if (!box) return;
    const header = document.querySelector<HTMLElement>("div.fixed.top-0.left-0.right-0");
    const offset = (header?.getBoundingClientRect().height ?? 0) + 20;
    const y = box.getBoundingClientRect().top + window.scrollY - offset;
    if (box.getBoundingClientRect().top < offset) window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  /** Open panel level 2 for a city. */
  const openCity = (city: CityRecord, scrollUp = false) => {
    if (city.state !== activeState) setActiveState(city.state);
    setActiveCity(city);
    setKindFilter(null);
    if (scrollUp) requestAnimationFrame(scrollPanelIntoView);
  };

  const openCityBySlug = (slug: string, scrollUp = false) => {
    const city = CITY_BY_SLUG[slug];
    if (city) openCity(city, scrollUp);
  };

  /** County rows inside the state panel expand in place. They used to jump the
      page down to the browser below, which meant going down to come back up. */
  const togglePanelCounty = (countyName: string) => {
    setPanelCounty((cur) => (cur === countyName ? null : countyName));
  };

  /** Accordion header in the browser below — pure open/close, no scrolling.
      Any automatic repositioning here read as "it moved me to the counties
      underneath". */
  const toggleCounty = (key: string) => {
    setOpenCounty(openCounty === key ? null : key);
  };

  const selectCity = (city: CityRecord) => {
    if (city.state !== activeState) setActiveState(city.state);
    setActiveCity(city);
    setKindFilter(null);
    setOpenCounty(`${city.state}-${city.county}`);
    setPanelCounty(city.county);
    setHighlightCity(`${city.state}-${city.county}-${city.name}`);
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <section id={id} style={{ background: SURFACE.base }} className="py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* ── Centered search ──
            The page's own <PageHeroBanner> carries the title and lede, so this
            block starts at the search box instead of repeating them. */}
        <div className="text-center mb-16">
          <div ref={searchRef} className="relative shrink-0 max-w-lg mx-auto text-left">
            <div className="flex items-stretch">
              <div className="flex items-center px-4" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, borderRight: "none" }}>
                <Search size={16} color={SAND} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search your city, county or ZIP code…"
                style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 16, color: CHAR,
                  background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`,
                  padding: "15px 16px", flex: 1, outline: "none",
                }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setSearchOpen(false); }}
                  className="flex items-center px-3 hover:bg-white/5 transition-colors"
                  style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, borderLeft: "none", cursor: "pointer" }}
                >
                  <X size={14} color="rgba(62,60,73,.5)" />
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
                  style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 16px 48px rgba(62,60,73,.6)" }}
                >
                  {results.length > 0 ? (
                    results.map((c) => (
                      <button
                        key={`${c.state}-${c.county}-${c.name}`}
                        onClick={() => selectCity(c)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
                        style={{ background: "none", border: "none", borderBottom: "1px solid rgba(62,60,73,.05)", cursor: "pointer" }}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <MapPin size={13} color={SAND} className="shrink-0" />
                          <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: CHAR }}>
                            {c.name}
                          </span>
                        </span>
                        <span className="shrink-0" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.35)" }}>
                          {c.county} Co. · {c.state}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-5">
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(62,60,73,.6)", marginBottom: 10 }}>
                        No match for &ldquo;{query}&rdquo; in our service area.
                      </p>
                      <button
                        onClick={() => { setSearchOpen(false); openInspection(); }}
                        className="inline-flex items-center gap-2"
                        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: B, background: "none", border: "none", cursor: "pointer", padding: 0 }}
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

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.3)", marginTop: 14 }}>
            {TOTAL_CITIES} cities across {TOTAL_COUNTIES} counties in four states. Or pick a state on the map below.
          </p>
        </div>

        {/* State picker — the old left rail carried a per-state city count and
            read as "too much to read"; four chips do the same job in one line,
            and the map polygons stay clickable. */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {STATES.map((st) => {
            const on = st.abbr === activeState;
            return (
              <button
                key={st.abbr}
                onClick={() => selectState(st.abbr)}
                style={{
                  fontFamily: "'Inter',sans-serif", fontWeight: on ? 600 : 400, fontSize: 13,
                  color: on ? "#fff" : ON_LIGHT.body,
                  background: on ? B : "transparent",
                  border: `1px solid ${on ? B : ON_LIGHT.border}`,
                  padding: "8px 16px", cursor: "pointer",
                }}
              >
                {st.name}
              </button>
            );
          })}
        </div>

        {/* ── Map + state panel ── */}
        <div ref={panelRef} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-px" style={{ background: "rgba(62,60,73,.07)", border: `1px solid ${ON_LIGHT.border}` }}>

          <div style={{ background: SURFACE.base }}>
            <ServiceAreaMap
              activeState={activeState}
              onSelectState={selectState}
              cityPos={cityPos}
              contentPins={pins}
              onPinClick={openWork}
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
            style={{ background: SURFACE.base, maxHeight: 520 }}
          >
            {activeCity ? (
              <CityPanel
                city={activeCity}
                items={cityItems}
                kindFilter={kindFilter}
                onFilter={setKindFilter}
                onOpenItem={openWork}
                onBack={() => { setActiveCity(null); setKindFilter(null); }}
              />
            ) : (
            <div className="px-7 py-7">
              {/* Header */}
              <div className="flex items-baseline gap-3 mb-2">
                <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: CHAR, lineHeight: 1, letterSpacing: "-0.5px" }}>
                  {state.name}
                </h3>
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: B }}>
                  {state.abbr}
                </span>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(62,60,73,.45)", lineHeight: 1.65, marginBottom: 18 }}>
                {state.tagline}
              </p>

              <div className="flex gap-6 pb-5 mb-5" style={{ borderBottom: "1px solid rgba(62,60,73,.08)" }}>
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: B, lineHeight: 1 }}>{counties.length}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.35)", marginTop: 3 }}>Counties</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: B, lineHeight: 1 }}>{cityCountByState(activeState)}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.35)", marginTop: 3 }}>Cities served</p>
                </div>
              </div>

              {/* Counties — every county in this state, one click from its full
                  city list below. Replaces the old "metro areas" shortcut,
                  which only surfaced 3-4 headline cities and let Memphis look
                  like its own entry instead of living inside Shelby County. */}
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                Counties ({counties.length})
              </p>
              <div className="flex flex-col gap-1.5 mb-6 overflow-y-auto rg-scroll-thin" style={{ maxHeight: 240 }}>
                {counties.map((county) => {
                  const isOpen = panelCounty === county.name;
                  return (
                    <div key={county.name}>
                      <button
                        onClick={() => togglePanelCounty(county.name)}
                        className="group w-full flex items-center justify-between text-left px-3.5 py-2.5 transition-all"
                        style={{
                          fontFamily: "'Inter',sans-serif", fontSize: 14,
                          fontWeight: isOpen ? 600 : 400,
                          color: isOpen ? CHAR : "rgba(62,60,73,.72)",
                          background: isOpen ? "rgba(0,80,159,.06)" : "rgba(62,60,73,.03)",
                          border: `1px solid ${isOpen ? "rgba(0,80,159,.35)" : ON_LIGHT.border}`,
                          cursor: "pointer",
                        }}
                      >
                        <span>{county.name} County</span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(62,60,73,.3)" }}>{county.cities.length}</span>
                          <ChevronRight
                            size={13}
                            color={isOpen ? B : SAND}
                            style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }}
                            className={isOpen ? "" : "opacity-0 group-hover:opacity-100 transition-opacity"}
                          />
                        </span>
                      </button>

                      {/* Cities expand right here — picking a county no longer
                          throws the page down to the browser below. */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="flex flex-wrap gap-1.5 px-1 pt-2 pb-1">
                              {county.cities.map((city) => (
                                <button
                                  key={city}
                                  onClick={() => openCityBySlug(slugify(`${city}-${county.state}`))}
                                  className="inline-flex items-center px-2.5 py-1 transition-all hover:border-black/20"
                                  style={{
                                    fontFamily: "'Inter',sans-serif", fontSize: 12.5,
                                    color: "rgba(62,60,73,.65)",
                                    background: "rgba(62,60,73,.05)",
                                    border: "1px solid rgba(62,60,73,.07)",
                                    cursor: "pointer",
                                  }}
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Services */}
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
                Services available
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {state.services.map((svc) => (
                  <span
                    key={svc}
                    style={{
                      fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(62,60,73,.7)",
                      background: "rgba(62,60,73,.05)", border: `1px solid ${ON_LIGHT.border}`,
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
              <div className="pt-6" style={{ borderTop: "1px solid rgba(62,60,73,.08)" }}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                  Content from this area
                </p>

                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {PROOF_TABS.map((tab) => {
                    const isOn = activeProofTab === tab.kind;
                    const count = proof.filter((p) => p.kind === tab.kind).length;
                    return (
                      <button
                        key={tab.kind}
                        onClick={() => setProofTab(tab.kind)}
                        className="py-2 px-2 transition-all"
                        // Light Blue label on a pale blue tint was a dark-theme
                        // leftover — unreadable here. The active tab is now
                        // solid Redeemers Blue with white type.
                        style={{
                          fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: isOn ? 600 : 400,
                          color: isOn ? "#FFFFFF" : ON_LIGHT.body,
                          background: isOn ? B : "rgba(62,60,73,.03)",
                          border: `1px solid ${isOn ? B : ON_LIGHT.hairline}`,
                          cursor: "pointer", lineHeight: 1.25,
                        }}
                      >
                        {tab.label}
                        <span style={{ display: "block", fontSize: 10, color: isOn ? "rgba(255,255,255,.75)" : "rgba(62,60,73,.45)", fontWeight: 400 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2">
                  {tabProof.length > 0 ? tabProof.map((p) => (
                    <button
                      key={p.title}
                      className="group text-left px-4 py-3 transition-all hover:border-white/20"
                      style={{ background: "rgba(62,60,73,.03)", border: `1px solid ${ON_LIGHT.border}`, cursor: "pointer" }}
                    >
                      <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 14, color: CHAR, lineHeight: 1.3, marginBottom: 4 }}>
                        {p.title}
                      </p>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.4)" }}>
                        {p.city}, {p.state} &nbsp;·&nbsp; ZIP {p.zip}
                      </p>
                    </button>
                  )) : (
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(62,60,73,.3)", padding: "10px 0" }}>
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
            <span style={{ display: "block", width: 20, height: 2, background: B }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: B, letterSpacing: 3.5, textTransform: "uppercase" }}>
              Every county we serve in {STATE_NAME[activeState]}
            </span>
          </div>

          <div ref={countyListRef} className="overflow-y-auto rg-scroll-thin" style={{ maxHeight: 420, border: `1px solid ${ON_LIGHT.border}`, background: SURFACE.base }}>
            {counties.map((county) => {
              const key = `${county.state}-${county.name}`;
              const isOpen = openCounty === key;
              return (
                <div key={key} data-county={key} style={{ borderBottom: "1px solid rgba(62,60,73,.05)" }}>
                  <button
                    onClick={() => toggleCounty(key)}
                    className="w-full flex items-center justify-between px-7 py-3.5 text-left transition-colors hover:bg-black/[0.03]"
                    style={{ background: isOpen ? "rgba(62,60,73,.03)" : "none", border: "none", cursor: "pointer" }}
                  >
                    <span className="flex items-center gap-3">
                      <ChevronDown
                        size={14}
                        color={isOpen ? B : "rgba(62,60,73,.3)"}
                        style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .2s" }}
                      />
                      {/* Light theme: the open row used #fff and vanished into
                          the panel. The open county now reads as the darkest
                          label in the list, not the lightest. */}
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: isOpen ? 600 : 500, fontSize: 14, color: isOpen ? CHAR : "rgba(62,60,73,.7)" }}>
                        {county.name} County
                      </span>
                    </span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(62,60,73,.28)" }}>
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
                                // The city panel lives at the top of the
                                // explorer, so this is the one click that has
                                // to move the page — upward, to what opened.
                                onClick={() => openCityBySlug(slugify(`${city}-${county.state}`), true)}
                                className="inline-flex items-center px-2.5 py-1 transition-all hover:border-black/20"
                                style={{
                                  fontFamily: "'Inter',sans-serif", fontSize: 12.5,
                                  color: isHit ? DARK : "rgba(62,60,73,.6)",
                                  background: isHit ? B : "rgba(62,60,73,.05)",
                                  border: `1px solid ${isHit ? B : "rgba(62,60,73,.07)"}`,
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
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(62,60,73,.45)", lineHeight: 1.6 }}>
              Don&rsquo;t see your town? We still may cover it — ask and we&rsquo;ll confirm same day.
            </p>
            <button
              onClick={openInspection}
              className="group inline-flex items-center gap-2 px-6 py-3 shrink-0"
              style={{ background: "none", border: `1.5px solid ${SAND}`, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5, color: B, cursor: "pointer" }}
            >
              Check my address
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
