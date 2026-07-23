import { ArrowLeft, ArrowRight, Star, FileText, HardHat, Images, MapPin, ChevronRight } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { STATE_NAME, contentForCity, zipForCity, type CityRecord } from "../data/serviceAreas";
import type { ContentItem, ContentKind } from "../data/localContent";

const B = "#1A52A8";
const SAND = "#C4AB6C";

type Row = {
  key: "reviews" | "jobStories" | "caseStudies" | "projectGallery";
  kind: ContentKind;
  label: string;
  accent: string;
  icon: typeof Star;
};

const ROWS: Row[] = [
  { key: "reviews",        kind: "review",          label: "Reviews",         accent: "#4ADE80", icon: Star },
  { key: "jobStories",     kind: "job-story",       label: "Job Stories",     accent: SAND,      icon: FileText },
  { key: "caseStudies",    kind: "case-study",      label: "Case Studies",    accent: "#A78BFA", icon: HardHat },
  { key: "projectGallery", kind: "project-gallery", label: "Project Gallery", accent: "#60A5FA", icon: Images },
];

/** Panel level 2 — a single city, its content inventory, and the map pins behind it. */
export function CityPanel({
  city, items, kindFilter, onFilter, onOpenItem, onBack,
}: {
  city: CityRecord;
  items: ContentItem[];
  kindFilter: ContentKind | null;
  onFilter: (kind: ContentKind | null) => void;
  onOpenItem: (item: ContentItem) => void;
  onBack: () => void;
}) {
  const content = contentForCity(city.slug);
  const zip = zipForCity(city.slug);
  const filtered = kindFilter ? items.filter((i) => i.kind === kindFilter) : [];

  return (
    <div className="px-7 py-7">
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2 mb-5"
        style={{ fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,.45)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
        Back to {STATE_NAME[city.state]}
      </button>

      <div className="flex items-baseline gap-3 mb-2">
        <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>
          {city.name}
        </h3>
        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: SAND }}>
          {city.state}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-7">
        <MapPin size={12} color="rgba(255,255,255,.3)" />
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.5)" }}>
          {city.county} County{zip ? ` · ZIP: ${zip}` : ""}
        </p>
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>
          Content available
        </p>
        {kindFilter && (
          <button
            onClick={() => onFilter(null)}
            style={{ fontFamily: "'Inter',sans-serif", fontSize: 11.5, color: "rgba(255,255,255,.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            className="hover:text-white/70 transition-colors"
          >
            Show all pins
          </button>
        )}
      </div>

      {content ? (
        <>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.32)", lineHeight: 1.5, marginBottom: 12 }}>
            Every item is pinned on the map — tap a row to isolate it, or a pin to open it.
          </p>

          <div className="flex flex-col gap-2 mb-6">
            {ROWS.map((row) => {
              const count = content[row.key];
              const hint = content.hints?.[row.key];
              const Icon = row.icon;
              const empty = count === 0;
              const on = kindFilter === row.kind;
              return (
                <button
                  key={row.key}
                  disabled={empty}
                  onClick={() => onFilter(on ? null : row.kind)}
                  className="flex items-center justify-between gap-3 pl-4 pr-4 py-3 text-left transition-all"
                  style={{
                    background: on ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.035)",
                    borderLeft: `3px solid ${empty ? "rgba(255,255,255,.12)" : row.accent}`,
                    border: on ? `1px solid ${row.accent}` : "1px solid transparent",
                    borderLeftWidth: 3,
                    borderLeftColor: empty ? "rgba(255,255,255,.12)" : row.accent,
                    opacity: empty ? 0.45 : 1,
                    cursor: empty ? "default" : "pointer",
                  }}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon size={15} color={empty ? "rgba(255,255,255,.35)" : row.accent} />
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", whiteSpace: "nowrap" }}>
                      {count} {row.label}
                    </span>
                  </span>
                  {hint && !on && (
                    <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)" }}>
                      {hint}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Drill-down list for the isolated kind */}
          {kindFilter && filtered.length > 0 && (
            <div className="flex flex-col gap-1.5 mb-6">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onOpenItem(item)}
                  className="group flex items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-all hover:border-white/25"
                  style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", cursor: "pointer" }}
                >
                  <span className="min-w-0">
                    <span className="block truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#fff" }}>
                      {item.title}
                    </span>
                    <span className="block" style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)" }}>
                      {item.service}
                    </span>
                  </span>
                  <ChevronRight size={13} color={SAND} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.3)", marginBottom: 18 }}>
            {items.length} items published for {city.name}.
          </p>
        </>
      ) : (
        <div className="mb-7 px-4 py-5" style={{ background: "rgba(255,255,255,.035)", border: "1px dashed rgba(255,255,255,.12)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
            We serve {city.name}, but nothing has been published for it yet. Reviews and job stories appear here as soon as they are tagged to this city.
          </p>
        </div>
      )}

      <button
        onClick={openInspection}
        className="group w-full flex items-center justify-center gap-2 py-3.5"
        style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}
      >
        Free inspection in {city.name}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
