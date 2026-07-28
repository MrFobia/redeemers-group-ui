import { useEffect, useRef } from "react";

import { DARK, SAND, MUTED, SURFACE } from "../theme";

export type AnchorTab = { id: string; label: string };

type StickyAnchorBarProps = {
  tabs: AnchorTab[];
  active: string;
  onChange: (id: string) => void;
  bg?: string;
  activeColor?: string;
  activeLine?: string;
};

export function StickyAnchorBar({
  tabs,
  active,
  onChange,
  bg = DARK,
  activeColor = SAND,
  activeLine,
}: StickyAnchorBarProps) {
  const lineColor = activeLine ?? activeColor;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeBtn = tabRefs.current[active];
    if (!scroller || !activeBtn) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    if (btnRect.left < scrollerRect.left || btnRect.right > scrollerRect.right) {
      const target = scroller.scrollLeft + (btnRect.left - scrollerRect.left) - (scroller.clientWidth - btnRect.width) / 2;
      scroller.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div
      className="sticky z-50 w-full"
      style={{ top: 148, background: bg, borderBottom: "1px solid rgba(255,255,255,.06)" }}
    >
      <div ref={scrollerRef} className="max-w-[1440px] mx-auto px-8 md:px-14 flex justify-start md:justify-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              onClick={() => onChange(tab.id)}
              className="relative shrink-0 px-5 py-4 transition-colors"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                color: isActive ? activeColor : MUTED,
                borderBottom: isActive ? `2px solid ${lineColor}` : "2px solid transparent",
                marginBottom: -1,
                background: "none",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
