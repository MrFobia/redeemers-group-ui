import { useState, useEffect, useRef } from "react";

const DARK = "#0A0B14";
const SAND = "#C4AB6C";
const MUTED = "#6B6E85";
const B = "#1A52A8";

export type RailItem = { id: string; label: string };

/**
 * In-page section navigation for long sections like "Our Difference", which the
 * approved sitemap gives 9 sub-sections. The old horizontal StickyAnchorBar
 * could not hold 9 labels without wrapping or scrolling sideways, and on mobile
 * it ate the vertical space the content needed.
 *
 * Wide desktop (>=1536px): a floating vertical rail pinned to the right edge
 * that rides along with the scroll, outside the content column so it costs no
 * vertical space at all. It only appears from 1536px up because the content
 * column is 1440px wide — any narrower and the rail would sit on top of it.
 * Below that (laptops, tablets, phones): a single sticky collapsed row showing
 * the current section, which expands on tap. Collapsed it is ~48px — well under
 * the 10-15% of screen the client asked us to stay within.
 */
export function SectionRail({
  items,
  active,
  onChange,
  top = 148,
}: {
  items: RailItem[];
  active: string;
  onChange: (id: string) => void;
  /** Offset of the fixed site header, so the mobile bar sticks right below it. */
  top?: number;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeItem = items.find((i) => i.id === active) ?? items[0];

  // Collapse the mobile panel on outside click — it overlays content while open.
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const select = (id: string) => {
    setOpen(false);
    onChange(id);
  };

  return (
    <>
      {/* ── Desktop: floating vertical rail ── */}
      <nav
        aria-label="Section navigation"
        className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-0.5 py-3 px-2"
        style={{ background: "rgba(10,11,20,.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.08)", maxWidth: 230 }}
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => select(item.id)}
              className="flex items-center gap-2.5 text-left px-3 py-2 transition-colors"
              style={{
                background: isActive ? "rgba(26,82,168,.22)" : "transparent",
                borderLeft: isActive ? `2px solid ${SAND}` : "2px solid transparent",
                border: "none",
                borderLeftWidth: 2,
                borderLeftStyle: "solid",
                borderLeftColor: isActive ? SAND : "transparent",
                cursor: "pointer",
              }}
            >
              <span
                className="shrink-0 rounded-full"
                style={{ width: 5, height: 5, background: isActive ? SAND : "rgba(255,255,255,.22)" }}
              />
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12.5,
                  lineHeight: 1.35,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,.55)",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Mobile / laptop: sticky collapsed selector ── */}
      <div ref={panelRef} className="2xl:hidden sticky z-50 w-full" style={{ top }}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between px-8 md:px-14 py-3"
          style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,.08)", border: "none", cursor: "pointer" }}
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Section
            </span>
            <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: SAND }}>
              {activeItem?.label}
            </span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
            <path d="M6 9l6 6 6-6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            className="absolute left-0 right-0 flex flex-col max-h-[60vh] overflow-y-auto"
            style={{ background: DARK, borderBottom: `2px solid ${B}`, boxShadow: "0 20px 40px rgba(0,0,0,.5)" }}
          >
            {items.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  onClick={() => select(item.id)}
                  className="text-left px-8 md:px-14 py-3.5 transition-colors"
                  style={{
                    background: isActive ? "rgba(26,82,168,.18)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,.05)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#fff" : "rgba(255,255,255,.65)",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
