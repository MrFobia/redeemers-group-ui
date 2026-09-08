// ─── Brand tokens ─────────────────────────────────────────────────────────────
// Single source of truth for colour. Page files should import from here rather
// than redeclaring local `const DARK = "#3E3C49"` blocks, so a palette change is
// one edit instead of eighteen.
//
// PALETA DE MARCA (Redeemers Group brand manual). Estos cinco hex son los
// únicos colores de marca permitidos. No agregar hex nuevos: cualquier matiz
// adicional debe ser una opacidad o un tinte declarado de uno de estos.
//
//   Redeemers Blue   #00509F  primario — hero color, CTAs, UI clave
//   Charcoal         #3E3C49  primario — texto, fondos, footers
//   Light Blue       #A1CDF1  texto sobre superficies primarias
//   Deep Blue        #003771  acento — fondos oscuros con texto blanco
//   Yellow Sandstone #D8CBA5  acento — highlights, reglas, callouts

export const B = "#00509F";      // Redeemers Blue — primary action blue
export const CHAR_BASE = "#3E3C49"; // Charcoal — primary text / dark surface
export const LIGHT = "#A1CDF1";  // Light Blue — text on blue/charcoal surfaces
export const NAVY = "#003771";   // Deep Blue — photo overlays, hero scrims, panels
export const SAND = "#D8CBA5";   // Yellow Sandstone — accent / eyebrow rules

// ─── Tintes derivados ─────────────────────────────────────────────────────────
// Sin hex nuevos: cada valor es un tinte declarado de un color de marca.
export const DARK = CHAR_BASE;   // Charcoal — hero surfaces
export const CHAR = "#4D4C58";   // Charcoal +8% blanco — cards sobre superficie oscura
export const CREAM = "#FAF9F4";  // Yellow Sandstone 12% sobre blanco — sección cálida
export const MUTED = "rgba(62,60,73,.58)"; // Charcoal 58% — texto secundario en claro

// ─── Section surfaces ─────────────────────────────────────────────────────────
// Taken from the Figma page designs: content sections alternate white → cream,
// and only the hero, the blue feature band, the closing CTA and the footer stay
// dark. Anything that reads as a "module" belongs on `base` or `alt`.
export const SURFACE = {
  base: "#FFFFFF",
  alt: CREAM,
  panel: NAVY,        // Deep Blue band (promises, diagnostics, stat strips)
  cta: B,             // closing call-to-action section — Redeemers Blue
  hero: DARK,         // above-the-fold surface — Charcoal
  footer: CHAR_BASE,  // Charcoal
} as const;

// ─── Foreground sets ──────────────────────────────────────────────────────────
// Pair one of these with the surface a block sits on. `ON_LIGHT` for base/alt,
// `ON_DARK` for hero/footer, `ON_BLUE` for panel/cta (Light Blue per manual).
export const ON_LIGHT = {
  heading: CHAR_BASE,
  body: "rgba(62,60,73,.80)",
  muted: MUTED,
  border: "rgba(62,60,73,.14)",
  hairline: "rgba(62,60,73,.09)",
  wash: "rgba(62,60,73,.05)",   // subtle fill for chips / inset panels
} as const;

export const ON_DARK = {
  heading: "#FFFFFF",
  body: "rgba(255,255,255,.74)",
  muted: "rgba(255,255,255,.55)",
  border: "rgba(255,255,255,.14)",
  hairline: "rgba(255,255,255,.08)",
  wash: "rgba(255,255,255,.06)",
} as const;

// Sobre Redeemers Blue / Deep Blue el manual designa Light Blue para headings,
// callouts, labels y body copy.
export const ON_BLUE = {
  heading: "#FFFFFF",
  body: LIGHT,
  muted: "rgba(161,205,241,.72)",
  border: "rgba(161,205,241,.26)",
  hairline: "rgba(161,205,241,.16)",
  wash: "rgba(161,205,241,.10)",
} as const;
