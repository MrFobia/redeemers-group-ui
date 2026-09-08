// ─── Shared form field styles ────────────────────────────────────────────────
// One input/label style used by every form on the site (Free Inspection modal,
// job application form, contact forms, etc.) so they never drift apart again.
import type { CSSProperties } from "react";

export const FORM_LABEL_STYLE: CSSProperties = {
  fontFamily: "'Inter',sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "rgba(255,255,255,.45)",
};

// Border is handled via className (see FORM_INPUT_CLASS) so :focus can be a
// plain CSS pseudo-class instead of onFocus/onBlur state in every field.
export const FORM_INPUT_STYLE: CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: 4,
  padding: "10px 12px",
  fontFamily: "'Inter',sans-serif",
  fontSize: 14,
  color: "#fff",
  outline: "none",
  width: "100%",
};

// SAND is hardcoded here (not interpolated) so Tailwind's JIT scanner can see
// the literal class name at build time.
export const FORM_INPUT_CLASS = "border border-white/10 focus:border-[#D8CBA5] transition-colors";
