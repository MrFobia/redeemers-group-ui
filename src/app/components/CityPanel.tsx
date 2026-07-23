import { ArrowLeft, ArrowRight, Star, FileText, HardHat, Images, MapPin } from "lucide-react";
import { openInspection } from "./InspectionModal";
import { STATE_NAME, contentForCity, zipForCity, type CityRecord } from "../data/serviceAreas";

const B = "#1A52A8";
const SAND = "#C4AB6C";

type Row = {
  key: "reviews" | "jobStories" | "caseStudies" | "beforeAfter";
  label: string;
  accent: string;
  icon: typeof Star;
};

const ROWS: Row[] = [
  { key: "reviews",      label: "Reviews",      accent: "#4ADE80", icon: Star },
  { key: "jobStories",   label: "Job Stories",  accent: SAND,      icon: FileText },
  { key: "caseStudies",  label: "Case Studies", accent: "#A78BFA", icon: HardHat },
  { key: "beforeAfter",  label: "Before/After", accent: "#60A5FA", icon: Images },
];

/** Panel level 2 — a single city and everything published about it. */
export function CityPanel({ city, onBack }: { city: CityRecord; onBack: () => void }) {
  const content = contentForCity(city.slug);
  const zip = zipForCity(city.slug);
  const total = content
    ? content.reviews + content.jobStories + content.caseStudies + content.beforeAfter
    : 0;

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

      <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
        Content available
      </p>

      {content ? (
        <div className="flex flex-col gap-2 mb-7">
          {ROWS.map((row) => {
            const count = content[row.key];
            const hint = content.hints?.[row.key];
            const Icon = row.icon;
            const empty = count === 0;
            return (
              <div
                key={row.key}
                className="flex items-center justify-between gap-3 pl-4 pr-4 py-3"
                style={{
                  background: "rgba(255,255,255,.035)",
                  borderLeft: `3px solid ${empty ? "rgba(255,255,255,.12)" : row.accent}`,
                  opacity: empty ? 0.45 : 1,
                }}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon size={15} color={empty ? "rgba(255,255,255,.35)" : row.accent} />
                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", whiteSpace: "nowrap" }}>
                    {count} {row.label}
                  </span>
                </span>
                {hint && (
                  <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)" }}>
                    {hint}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-7 px-4 py-5" style={{ background: "rgba(255,255,255,.035)", border: "1px dashed rgba(255,255,255,.12)" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
            We serve {city.name}, but nothing has been published for it yet. Reviews and job stories appear here as soon as they are tagged to this city.
          </p>
        </div>
      )}

      {content && (
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.3)", marginBottom: 18 }}>
          {total} items published for {city.name}.
        </p>
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
