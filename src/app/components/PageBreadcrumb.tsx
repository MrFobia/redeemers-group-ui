import { DARK } from "../theme";

export interface BreadcrumbCrumb {
  label: string;
  onClick?: () => void;
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
  return (
    <div
      className="sticky z-40 top-[89px] md:top-[123px] lg:top-[139px] xl:top-[155px]"
      style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.06)" }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 py-3 flex items-center gap-2 flex-wrap">
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
                <span style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 13,
                  color: isLast ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.4)",
                  fontWeight: isLast ? 500 : 400,
                }}>
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
