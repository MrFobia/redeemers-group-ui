// ─── Brand tokens ─────────────────────────────────────────────────────────────
// Single source of truth for colour. Page files should import from here rather
// than redeclaring local `const DARK = "#0A0B14"` blocks, so a palette change is
// one edit instead of eighteen.

export const B = "#1A52A8";      // primary action blue (buttons, links)
export const NAVY = "#0B1C4A";   // deep navy — photo overlays, hero scrims
export const DARK = "#0A0B14";   // near-black — hero surfaces
export const CHAR = "#1E2235";   // charcoal — cards on dark surfaces
export const SAND = "#C4AB6C";   // accent / eyebrow rules
export const CREAM = "#F7F5EF";  // warm off-white section surface
export const MUTED = "#6B6E85";  // secondary text on light surfaces

// ─── Section surfaces ─────────────────────────────────────────────────────────
// Taken from the Figma page designs: content sections alternate white → cream,
// and only the hero, the blue feature band, the closing CTA and the footer stay
// dark. Anything that reads as a "module" belongs on `base` or `alt`.
export const SURFACE = {
  base: "#FFFFFF",
  alt: CREAM,
  panel: "#053770",   // deep blue band (promises, diagnostics, stat strips)
  cta: "#00519F",     // closing call-to-action section
  hero: DARK,         // above-the-fold surface
  footer: "#1B1C24",
} as const;

// ─── Foreground sets ──────────────────────────────────────────────────────────
// Pair one of these with the surface a block sits on. `ON_LIGHT` for base/alt,
// `ON_DARK` for panel/cta/hero/footer.
export const ON_LIGHT = {
  heading: DARK,
  body: "#3D4152",
  muted: MUTED,
  border: "rgba(10,11,20,.12)",
  hairline: "rgba(10,11,20,.08)",
  wash: "rgba(10,11,20,.04)",   // subtle fill for chips / inset panels
} as const;

export const ON_DARK = {
  heading: "#FFFFFF",
  body: "rgba(255,255,255,.72)",
  muted: "rgba(255,255,255,.5)",
  border: "rgba(255,255,255,.12)",
  hairline: "rgba(255,255,255,.07)",
  wash: "rgba(255,255,255,.05)",
} as const;
