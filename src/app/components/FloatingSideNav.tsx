import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import type { AnchorTab } from "./StickyAnchorBar";

import { NAVY, SAND, SURFACE } from "../theme";

type FloatingSideNavProps = {
  tabs: AnchorTab[];
  active: string;
  onChange: (id: string) => void;
};

// Client QA: a fixed full-width horizontal section bar reads as a 3rd
// competing nav layer stacked under the header (global menu + this bar +
// breadcrumb). This component follows the scroll instead of the header —
// a slim vertical rail on desktop, a small collapsible anchor pill on
// mobile that never exceeds ~12% of the viewport. Added to the shared
// component library so any page with in-page anchors uses the same pattern.
export function FloatingSideNav({ tabs, active, onChange }: FloatingSideNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeLabel = tabs.find((t) => t.id === active)?.label ?? tabs[0]?.label;

  useEffect(() => {
    if (!mobileOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop: vertical rail, fixed to the viewport edge, independent of the header */}
      <div
        className="hidden lg:flex fixed z-40 flex-col gap-1 py-3 pr-1"
        style={{ top: "50%", right: 22, transform: "translateY(-50%)" }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="group relative flex items-center justify-end gap-2.5 py-1.5"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="whitespace-nowrap transition-all duration-200"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 500,
                  color: NAVY,
                  background: isActive ? "rgba(255,255,255,.9)" : "transparent",
                  padding: isActive ? "3px 8px" : 0,
                  boxShadow: isActive ? "0 2px 8px rgba(10,11,20,.15)" : "none",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(6px)",
                }}
              >
                {tab.label}
              </span>
              <span
                className="shrink-0 rounded-full transition-all duration-200"
                style={{
                  width: isActive ? 8 : 6,
                  height: isActive ? 8 : 6,
                  background: isActive ? SAND : "rgba(140,140,150,.55)",
                  boxShadow: isActive ? "none" : "0 0 0 1px rgba(255,255,255,.4)",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile: collapsible anchor pill — never a full-width bar */}
      <div ref={rootRef} className="lg:hidden fixed z-40" style={{ bottom: 18, right: 18 }}>
        {mobileOpen && (
          <div
            className="absolute bottom-full right-0 mb-2 flex flex-col overflow-hidden"
            style={{ background: "rgba(10,11,20,.97)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.1)", minWidth: 180, boxShadow: "0 12px 32px rgba(0,0,0,.5)" }}
          >
            {tabs.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { onChange(tab.id); setMobileOpen(false); }}
                  className="text-left px-4 py-3 transition-colors"
                  style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#fff" : "rgba(255,255,255,.6)",
                    background: isActive ? "rgba(196,171,108,.12)" : "none",
                    borderLeft: isActive ? `2px solid ${SAND}` : "2px solid transparent",
                    border: "none", borderBottom: "1px solid rgba(255,255,255,.06)", cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 px-4 py-2.5 transition-transform"
          style={{ background: NAVY, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", maxWidth: "42vw" }}
        >
          <span className="truncate" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: "#fff" }}>
            {activeLabel}
          </span>
          <ChevronUp size={13} color={SAND} style={{ transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }} />
        </button>
      </div>
    </>
  );
}
