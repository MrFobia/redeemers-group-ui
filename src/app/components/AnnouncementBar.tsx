import { DARK, SAND, SURFACE } from "../theme";

export function AnnouncementBar() {
  return (
    <div className="hidden md:flex items-center justify-between w-full px-16 py-2" style={{ background: DARK }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)", letterSpacing: 1 }}>
        Serving Tennessee, Arkansas, Mississippi &amp; Missouri
      </p>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: SAND }} />
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: SAND }}>
          40 inspections booked this week
        </p>
      </div>
    </div>
  );
}
