const SAND = "#C4AB6C";

export type Crumb = {
  label: string;
  /** Omit on the last crumb — the current page is not a link. */
  page?: string;
};

/**
 * Persistent "where am I" indicator. This is the site's only local orientation
 * system besides the section anchor bar: the client reported the combination of
 * main menu + horizontal submenu + repeated titles reading as three stacked
 * menus. Kept lightweight so it costs almost no vertical space, and it stays
 * visible on mobile where the main nav collapses into a hamburger.
 */
export function Breadcrumbs({
  items,
  onNavigate,
  tone = "dark",
}: {
  items: Crumb[];
  onNavigate?: (p: string) => void;
  /** "dark" = light text over a dark hero, "light" = dark text over a pale background. */
  tone?: "dark" | "light";
}) {
  const base = tone === "dark" ? "rgba(255,255,255,.55)" : "rgba(30,34,53,.55)";
  const current = tone === "dark" ? "rgba(255,255,255,.9)" : "#1E2235";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {isLast || !item.page || !onNavigate ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: isLast ? current : base, fontWeight: isLast ? 600 : 400 }}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.page!)}
                  className="transition-opacity hover:opacity-100"
                  style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: base, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke={SAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
