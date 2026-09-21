import { useEffect, useState } from "react";
import { DARK } from "../theme";

export interface BreadcrumbCrumb {
  label: string;
  onClick?: () => void;
}

// Measure the fixed header instead of trusting the pt-[89px]/123/139/155
// ladder every page hardcodes: the real header is 97 / 131 / 163px tall, so
// those offsets parked the breadcrumb 6-8px *under* the header and ate the
// top half of the bar — the strip looked bottom-heavy.
function useHeaderHeight() {
  const [h, setH] = useState<number | null>(null);
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("div.fixed.top-0.left-0.right-0");
    if (!header) return;
    const measure = () => setH(Math.round(header.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  return h;
}

// Single canonical breadcrumb module — spec lives in GuiaEstilosPage
// ("Breadcrumb / Migas de Pan"). Every page must use this component
// instead of a bespoke inline block.
//
// Sticky (QA #17 — "users lose context after opening a page from the
// hamburger menu"): pins right under the fixed header at the same offsets
// every page already reserves for it (pt-[89px] md:pt-[123px] lg:pt-[139px]
// xl:pt-[155px]), so the current location stays visible while scrolling
// instead of disappearing after the hero.
export function PageBreadcrumb({ items }: { items: BreadcrumbCrumb[] }) {
  const headerH = useHeaderHeight();
  const current = items[items.length - 1];
  const parent = items.length > 1 ? items[items.length - 2] : undefined;
  return (
    <div
      className={headerH === null ? "sticky z-40 top-[97px] md:top-[131px] lg:top-[147px] xl:top-[163px]" : "sticky z-40"}
      style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)", ...(headerH !== null && { top: headerH }) }}
    >
      {/* Phone: one line, one hop back. A full trail wrapped to two lines and
          left a dangling chevron, and the current page is already the H1 right
          below — so the useful part is the way back to the parent. */}
      <div className="md:hidden max-w-[1440px] mx-auto px-8 py-3 flex items-center gap-2 leading-none">
        {parent?.onClick ? (
          <button
            onClick={parent.onClick}
            className="flex items-center gap-2 min-w-0 hover:text-white transition-colors"
            style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.62)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate">{parent.label}</span>
          </button>
        ) : (
          <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.62)" }}>
            {(parent ?? current)?.label}
          </span>
        )}
      </div>

      <div className="hidden md:flex max-w-[1440px] mx-auto px-8 md:px-14 py-3 items-center gap-2 leading-none">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.onClick && !isLast ? (
                <button
                  onClick={item.onClick}
                  style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.4)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span
                  // Work detail pages can carry a sentence-long title; cap the
                  // current crumb instead of letting it wrap the bar to two
                  // lines. The full text stays available on hover.
                  title={item.label}
                  className="truncate max-w-[520px]"
                  style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 13,
                    color: isLast ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.4)",
                    fontWeight: isLast ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
