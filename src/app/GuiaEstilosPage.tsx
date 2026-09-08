import React from "react";

import { B, DARK, NAVY, CHAR, CHAR_BASE, LIGHT, SAND, CREAM, MUTED, SURFACE } from "./theme";
const WHITE = "#FFFFFF";

const CF = "'Articulat CF',sans-serif";
const INTER = "'Inter',sans-serif";

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, bg = "#fff", children }: { title: string; bg?: string; children: React.ReactNode }) {
  return (
    <section style={{ background: bg, padding: "64px 56px", borderBottom: "1px solid rgba(62,60,73,.08)" }}>
      <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: MUTED, letterSpacing: 4, textTransform: "uppercase", marginBottom: 32 }}>
        {title}
      </p>
      {children}
    </section>
  );
}

function Swatch({ hex, name, variable }: { hex: string; name: string; variable: string }) {
  const isLight = ["#FAF9F4", "#FFFFFF"].includes(hex);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 140 }}>
      <div style={{
        width: "100%", height: 80, background: hex,
        border: isLight ? "1px solid rgba(62,60,73,.1)" : "none",
      }} />
      <div>
        <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 13, color: CHAR, marginBottom: 2 }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: MUTED, marginBottom: 1 }}>{hex}</p>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, opacity: 0.6 }}>{variable}</p>
      </div>
    </div>
  );
}

function TypeRow({ label, sample, spec }: { label: string; sample: React.ReactNode; spec: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 32, paddingBottom: 24, borderBottom: "1px solid rgba(62,60,73,.06)", marginBottom: 24 }}>
      <div style={{ minWidth: 160, flexShrink: 0 }}>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED }}>{label}</p>
        <p style={{ fontFamily: INTER, fontSize: 10, color: MUTED, opacity: 0.6 }}>{spec}</p>
      </div>
      <div>{sample}</div>
    </div>
  );
}

export default function GuiaEstilosPage() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM }}>

      {/* Header */}
      <div style={{ background: DARK, padding: "48px 56px" }}>
        <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
          Redeemers Group
        </p>
        <h1 style={{ fontFamily: CF, fontWeight: 800, fontSize: 56, color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
          Guía de Estilos
        </h1>
        <p style={{ fontFamily: INTER, fontSize: 16, color: "rgba(255,255,255,.5)" }}>
          Sistema de diseño y tokens visuales del sitio web
        </p>
      </div>

      {/* Colors */}
      <Section title="Colores / Color Tokens">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <Swatch hex={B}         name="Redeemers Blue"   variable="B — Primario · CTAs, links, UI clave" />
          <Swatch hex={CHAR_BASE} name="Charcoal"         variable="CHAR_BASE — Primario · texto, hero, footer" />
          <Swatch hex={LIGHT}     name="Light Blue"       variable="LIGHT — Texto sobre superficies azules" />
          <Swatch hex={NAVY}      name="Deep Blue"        variable="NAVY — Acento · bandas y scrims" />
          <Swatch hex={SAND}      name="Yellow Sandstone" variable="SAND — Acento · reglas y eyebrows" />
          <Swatch hex={WHITE}     name="White"            variable="Superficie base y texto sobre oscuro" />
        </div>
        {/* Status / UI colors */}
        <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: MUTED, letterSpacing: 4, textTransform: "uppercase", margin: "40px 0 20px" }}>
          Tintes derivados (sin hex nuevos)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <Swatch hex={CHAR}  name="Charcoal +8%"  variable="CHAR — tinte · cards sobre oscuro" />
          <Swatch hex={CREAM} name="Sandstone 12%" variable="CREAM — tinte · sección alterna" />
          <Swatch hex={MUTED} name="Charcoal 58%"  variable="MUTED — texto secundario en claro" />
          <Swatch hex="rgba(216,203,165,.2)" name="Sandstone 20%" variable="Badge BG" />
        </div>

        {/* Section surfaces — the rhythm every page follows, straight from the
            Figma page designs. Defined once in src/app/theme.ts as SURFACE. */}
        <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: MUTED, letterSpacing: 4, textTransform: "uppercase", margin: "40px 0 20px" }}>
          Superficies de sección
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <Swatch hex={SURFACE.base}   name="Base"   variable="SURFACE.base — sección blanca" />
          <Swatch hex={SURFACE.alt}    name="Alt"    variable="SURFACE.alt — sección crema" />
          <Swatch hex={SURFACE.panel}  name="Panel"  variable="SURFACE.panel — banda azul" />
          <Swatch hex={SURFACE.cta}    name="CTA"    variable="SURFACE.cta — cierre" />
          <Swatch hex={SURFACE.hero}   name="Hero"   variable="SURFACE.hero — above the fold" />
          <Swatch hex={SURFACE.footer} name="Footer" variable="SURFACE.footer" />
        </div>
      </Section>

      {/* Typography — Titles */}
      <Section title="Tipografía — Títulos (Articulat CF)">
        <TypeRow
          label="H1 / Hero"
          spec="Articulat CF Bold · 72px max · tracking -1px"
          sample={<h1 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>Protecting Homes, One Foundation at a Time.</h1>}
        />
        <TypeRow
          label="H2 / Sección"
          spec="Articulat CF Bold · 56px max · tracking -1px"
          sample={<h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(28px,4vw,56px)", color: CHAR, lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>What Customers Say About Us</h2>}
        />
        <TypeRow
          label="H3 / Tarjeta"
          spec="Articulat CF Bold · 40px max · tracking -0.5px"
          sample={<h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,3vw,40px)", color: CHAR, lineHeight: 1.1, letterSpacing: "-0.5px", margin: 0 }}>East Memphis Ranch Home</h3>}
        />
        <TypeRow
          label="H4 / Subtítulo"
          spec="Articulat CF Bold · 24px max"
          sample={<h4 style={{ fontFamily: CF, fontWeight: 700, fontSize: "clamp(16px,2vw,24px)", color: CHAR, lineHeight: 1.3, margin: 0 }}>Family-Owned Since 2008</h4>}
        />
        <TypeRow
          label="Eyebrow / Label"
          spec="Articulat CF Bold · 11px · tracking 4px · uppercase"
          sample={<p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", margin: 0 }}>Featured Projects</p>}
        />
      </Section>

      {/* Typography — Body */}
      <Section title="Tipografía — Cuerpo (Inter)">
        <TypeRow
          label="Body Large"
          spec="Inter Regular · 18px · line-height 1.7"
          sample={<p style={{ fontFamily: INTER, fontSize: 18, color: CHAR, lineHeight: 1.7, maxWidth: 560, margin: 0 }}>Crawl space, basement waterproofing, foundation repair and concrete leveling — backed by a lifetime warranty from a family-owned company since 2008.</p>}
        />
        <TypeRow
          label="Body Default"
          spec="Inter Regular · 16px · line-height 1.65"
          sample={<p style={{ fontFamily: INTER, fontSize: 16, color: CHAR, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.</p>}
        />
        <TypeRow
          label="Body Small"
          spec="Inter Regular · 14px · line-height 1.6"
          sample={<p style={{ fontFamily: INTER, fontSize: 14, color: MUTED, lineHeight: 1.6, maxWidth: 560, margin: 0 }}>SmartJack + full encapsulation. Done in 2 days. Solutions designed to last, not bandaids.</p>}
        />
        <TypeRow
          label="Caption / Meta"
          spec="Inter Regular · 12px"
          sample={<p style={{ fontFamily: INTER, fontSize: 12, color: MUTED, margin: 0 }}>Memphis, TN · Collierville, TN · Marked Tree, AR</p>}
        />
        <TypeRow
          label="Micro"
          spec="Inter Regular · 10–11px · tracking 1.5px · uppercase"
          sample={<p style={{ fontFamily: INTER, fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>Homes Protected</p>}
        />
        <TypeRow
          label="Stat Number"
          spec="Articulat CF Black · 40px · accent in SAND"
          sample={
            <p style={{ fontFamily: CF, fontWeight: 800, fontSize: 40, color: CHAR, lineHeight: 1, margin: 0 }}>
              12,250<span style={{ color: SAND }}>+</span>
            </p>
          }
        />
      </Section>

      {/* Buttons */}
      <Section title="Botones / Buttons">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          {/* Primary */}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: B, fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "#fff", padding: "14px 24px", textDecoration: "none" }}>
            Schedule Free Inspection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          {/* Dark */}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: CHAR, fontFamily: INTER, fontWeight: 600, fontSize: 14, color: "#fff", padding: "12px 22px", textDecoration: "none" }}>
            View all service areas
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          {/* White */}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", fontFamily: INTER, fontWeight: 600, fontSize: 15, color: NAVY, padding: "14px 24px", textDecoration: "none" }}>
            View all projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          {/* Ghost text link */}
          <a href="#" style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            Read story
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          {/* Call link */}
          <a href="tel:+19015550100" style={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, color: MUTED, borderBottom: `1px solid ${MUTED}`, paddingBottom: 2, textDecoration: "none" }}>
            or call (901) 555-0100
          </a>
        </div>
      </Section>

      {/* Badges & Tags */}
      <Section title="Badges & Etiquetas">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <span style={{ display: "inline-block", padding: "5px 14px", background: "rgba(216,203,165,.2)", border: "1px solid rgba(216,203,165,.4)", fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>
            Crawl Space
          </span>
          <span style={{ display: "inline-block", padding: "5px 14px", background: "rgba(216,203,165,.18)", border: "1px solid rgba(216,203,165,.4)", fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>
            Foundation Repair
          </span>
          <span style={{ display: "inline-block", padding: "7px 16px", background: "#00509F", border: "1px solid rgba(255,255,255,.1)", fontFamily: INTER, fontSize: 12, color: "#fff" }}>
            ✓ Financing from $79/mo
          </span>
          <span style={{ display: "inline-block", padding: "7px 16px", background: "rgba(216,203,165,.2)", border: "1px solid #D8CBA5", fontFamily: INTER, fontSize: 12, color: "#fff" }}>
            $ Financing from $79/month · 0% for qualified homeowners
          </span>
        </div>
      </Section>

      {/* Spacing scale */}
      <Section title="Espaciado / Spacing Scale">
        {[4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96].map(sp => (
          <div key={sp} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <div style={{ width: sp, height: 16, background: B, flexShrink: 0 }} />
            <span style={{ fontFamily: INTER, fontSize: 12, color: MUTED }}>{sp}px</span>
          </div>
        ))}
      </Section>

      {/* Section backgrounds */}
      <Section title="Fondos de Sección / Section BGs">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
          {[
            { label: "DARK — Hero, Features, Why", color: DARK },
            { label: "NAVY — Deep sections", color: NAVY },
            { label: "#003771 — Blue panels", color: "#003771" },
            { label: "#00509F — CTA", color: "#00509F" },
            { label: "CHAR — Cards", color: CHAR },
            { label: "CREAM — Light sections", color: CREAM },
          ].map(s => (
            <div key={s.label} style={{ flex: "1 0 200px", minHeight: 80, background: s.color, padding: "16px 20px", display: "flex", alignItems: "flex-end" }}>
              <span style={{ fontFamily: INTER, fontSize: 11, color: s.color === CREAM ? CHAR : "rgba(255,255,255,.7)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Service Cards */}
      <Section title="Tarjetas de Servicio / Service Cards" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 32 }}>
          Títulos fijos por slot (no clamp). 4 columnas: 42 / 34 / 30 / 27px.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {[
            { size: 42, cat: "Crawl Space" },
            { size: 34, cat: "Waterproofing" },
            { size: 30, cat: "Foundation Repair" },
            { size: 27, cat: "Concrete Services" },
          ].map(({ size, cat }) => (
            <div key={cat} style={{ flex: "1 0 180px", background: CHAR, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ display: "inline-block", padding: "5px 14px", background: "rgba(216,203,165,.2)", border: "1px solid rgba(216,203,165,.4)", fontFamily: CF, fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>
                {cat}
              </span>
              <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: size, color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", margin: 0 }}>
                Service Title Here
              </h3>
              <p style={{ fontFamily: INTER, fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>
                Body description text. Inter 14px / MUTED.
              </p>
              <a href="#" style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                Explore service
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <p style={{ fontFamily: INTER, fontSize: 10, color: MUTED, marginTop: 4 }}>Title: Articulat CF 800 · {size}px fixed</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Case Study Stats */}
      <Section title="Stats de Caso / Case Study Stats" bg={CHAR}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 32 }}>
          Número grande en SAND + micro-label Inter. Usados en tarjetas de casos.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
          {[
            { value: "12,250+", label: "Homes Protected" },
            { value: "17", label: "Years in Business" },
            { value: "4.9★", label: "Average Rating" },
            { value: "$79/mo", label: "Financing From" },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <p style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: SAND, lineHeight: 1, margin: 0 }}>
                {value}
              </p>
              <p style={{ fontFamily: INTER, fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 24, opacity: 0.7 }}>
          Articulat CF 800 · clamp(22px, 3vw, 34px) · SAND — Label: Inter 10px · MUTED · tracking 1.5px · uppercase
        </p>
      </Section>

      {/* Decorative Quote Mark */}
      <Section title="Comilla Decorativa / Decorative Quote Mark" bg={CREAM}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 48, color: SAND, lineHeight: 1, display: "block" }}>"</span>
          <div>
            <p style={{ fontFamily: INTER, fontSize: 14, color: MUTED, margin: "0 0 8px" }}>Georgia serif · 48px · SAND</p>
            <p style={{ fontFamily: INTER, fontSize: 13, color: CHAR, lineHeight: 1.6, maxWidth: 400, margin: 0 }}>
              Joe was very thorough with explaining everything and even came back a second time.
            </p>
          </div>
        </div>
      </Section>

      {/* State Selector Button */}
      <Section title="Selector de Estado / State Selector">
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          Articulat CF 800 · 18px · usado en service area section.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Mississippi", "Tennessee", "Arkansas", "Missouri"].map((state, i) => (
            <button key={state} style={{
              fontFamily: CF, fontWeight: 800, fontSize: 18, color: i === 1 ? WHITE : MUTED,
              background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              borderBottom: i === 1 ? `2px solid ${SAND}` : "2px solid transparent",
              letterSpacing: "-0.3px",
            }}>
              {state}
            </button>
          ))}
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Active: WHITE + SAND border-bottom. Inactive: MUTED. No background.
        </p>
      </Section>

      {/* Glassmorphism Hero Card */}
      <Section title="Tarjeta Glassmorphism / Hero Right Panel" bg={NAVY}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          Usada en hero banner lado derecho. Background rgba blur + border white.
        </p>
        <div style={{ maxWidth: 280, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", margin: 0 }}>
            Featured Project
          </p>
          <h4 style={{ fontFamily: CF, fontWeight: 800, fontSize: 20, color: WHITE, lineHeight: 1.15, margin: 0 }}>
            East Memphis Ranch Home
          </h4>
          <p style={{ fontFamily: INTER, fontSize: 15, color: "rgba(255,255,255,.65)", lineHeight: 1.55, margin: 0 }}>
            SmartJack + full encapsulation. Done in 2 days.
          </p>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: B, fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "#fff", padding: "10px 18px", textDecoration: "none", marginTop: 4 }}>
            Read story
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 16 }}>
          Title: Articulat CF 800 · 20px · WHITE — Body: Inter 15px · rgba(255,255,255,.65) — BG: rgba(255,255,255,.06) + blur(12px)
        </p>
      </Section>

      {/* Breadcrumb Dark */}
      <Section title="Breadcrumb / Migas de Pan" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          Estático, sobre DARK bg, debajo del fixed header. Inter 13px.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["Home", "Services", "Crawl Space Repair"].map((crumb, i, arr) => (
            <React.Fragment key={crumb}>
              <span style={{
                fontFamily: INTER, fontSize: 13,
                color: i === arr.length - 1 ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.4)",
                fontWeight: i === arr.length - 1 ? 500 : 400,
                cursor: i < arr.length - 1 ? "pointer" : "default",
              }}>{crumb}</span>
              {i < arr.length - 1 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Inter 13px · Inactive: rgba(255,255,255,.4) · Active/last: rgba(255,255,255,.85) weight 500 · Separator: rgba(255,255,255,.3)
        </p>
      </Section>

      {/* Sticky Anchor Tabs */}
      <Section title="Pestañas de Sección / Sticky Anchor Tabs" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          sticky top-[107px]. DARK bg. Inter 14px. Activo: B + border-bottom 2px B. Inactivo: MUTED.
        </p>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          {["Crawl Space Repair", "Problem Signs", "Cost Guide", "Project Gallery", "FAQs"].map((tab, i) => (
            <div key={tab} style={{
              padding: "16px 20px",
              fontFamily: INTER,
              fontWeight: i === 0 ? 600 : 400,
              fontSize: 14,
              color: i === 0 ? B : MUTED,
              borderBottom: i === 0 ? `2px solid ${B}` : "2px solid transparent",
              marginBottom: -1,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}>{tab}</div>
          ))}
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Inter 400/600 · 14px · Active: B color + 2px B border-bottom · Inactive: MUTED · bg: DARK
        </p>
      </Section>

      {/* Hero Full-Bleed Banner */}
      <Section title="Hero Full-Bleed Banner" bg={CHAR}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          Imagen full-bleed. Overlay gradiente direccional. Contenido izquierda máx 587px.
        </p>
        <div style={{ position: "relative", height: 220, background: "#4D4C58", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120.41deg, rgba(62,60,73,0.88) 8.49%, rgba(62,60,73,0.55) 54.15%, rgba(62,60,73,0.20) 91.51%)" }} />
          <div style={{ position: "relative", padding: "32px 40px", maxWidth: 380 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 20, height: 2, background: SAND, flexShrink: 0 }} />
              <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>Crawl Space Repair</span>
            </div>
            <h1 style={{ fontFamily: CF, fontWeight: 800, fontSize: 32, color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", margin: 0 }}>
              Is your home showing<br />these signs?
            </h1>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Overlay: linear-gradient(120.41deg, rgba(62,60,73,.88) 8.49%, rgba(62,60,73,.55) 54.15%, rgba(62,60,73,.20) 91.51%) · Content maxWidth 587px · Eyebrow: 20×2px SAND line + CF 700 11px SAND · H1: CF 800 clamp(38px,4.5vw,68px) white
        </p>
      </Section>

      {/* Symptom Accordion */}
      <Section title="Acordeón de Síntomas / Symptom Accordion" bg={CHAR}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          Usado en hero. Cerrado: blanco 45px. Abierto: B header + rgba(0,80,159,.25) contenido.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
          {/* Open item */}
          <div>
            <div style={{ height: 45, background: B, borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
              <span style={{ fontFamily: INTER, fontSize: 14, fontWeight: 700, color: "#fff" }}>My floors are sagging or bouncy</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(180deg)" }}><path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ background: "rgba(0,80,159,0.25)", border: `1px solid ${B}`, borderTop: "none", borderRadius: "0 0 4px 4px", padding: "12px 16px" }}>
              <p style={{ fontFamily: INTER, fontSize: 14, color: "#fff", lineHeight: 1.7, margin: 0 }}>This typically indicates deteriorating floor joists...</p>
            </div>
          </div>
          {/* Closed item */}
          <div style={{ height: 45, background: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
            <span style={{ fontFamily: INTER, fontSize: 14, fontWeight: 700, color: CHAR }}>Moisture or standing water</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Open header: B bg · white Inter 700 14px · Closed: white bg · CHAR text · 45px height · Content: rgba(0,80,159,.25) + 1px B border (no top)
        </p>
      </Section>

      {/* Solution Card */}
      <Section title="Tarjeta de Solución / Solution Card" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          CHAR bg. Imagen + overlay gradiente. SAND eyebrow. CF 800 white. Cuerpo rgba(255,255,255,.5).
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Narrow card */}
          <div style={{ width: 280, background: CHAR, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 160, background: "#4D4C58" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(77,76,88,1) 100%)" }} />
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ height: 1, width: 20, background: SAND }} />
                <span style={{ fontFamily: CF, fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>Solution</span>
              </div>
              <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.1, margin: 0 }}>Floor Joist Repair</h3>
              <p style={{ fontFamily: INTER, fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, margin: 0 }}>Body description text here.</p>
              <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, display: "inline-flex", alignItems: "center", gap: 6 }}>
                Schedule now
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </div>
          </div>
          {/* Wide card — split layout */}
          <div style={{ flex: "1 0 320px", background: CHAR, display: "flex", minHeight: 200, overflow: "hidden" }}>
            <div style={{ width: "45%", background: "#4D4C58", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 40%, rgba(77,76,88,1) 100%)" }} />
            </div>
            <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ height: 1, width: 20, background: SAND }} />
                <span style={{ fontFamily: CF, fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>Solution</span>
              </div>
              <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", color: "#fff", lineHeight: 1.1, margin: 0 }}>Encapsulation System</h3>
              <p style={{ fontFamily: INTER, fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, margin: 0 }}>Full vapor barrier.</p>
              <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, display: "inline-flex", alignItems: "center", gap: 6 }}>
                Schedule now
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
              </span>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Card bg: CHAR · Image overlay: gradient toward content · Eyebrow: 1px SAND line + CF 600 10px SAND · H3: CF 800 clamp(24px,2.5vw,36px) white · Body: Inter 14px rgba(255,255,255,.5) · CTA: Inter 600 13px SAND
        </p>
      </Section>

      {/* Category List Card (Problem Signs) */}
      <Section title="Tarjeta de Categoría / Category List Card" bg={CHAR}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          Usada en "Problem Signs". Card DARK con header SAND icon bg. Ítems: glass buttons.
        </p>
        <div style={{ maxWidth: 320, background: DARK, border: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ width: 48, height: 48, background: "rgba(216,203,165,.1)", border: "1px solid rgba(216,203,165,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 style={{ fontFamily: CF, fontWeight: 700, fontSize: 20, color: "#fff", margin: 0 }}>Moisture & Water</h3>
          </div>
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
            {["Water in my basement", "Damp or wet walls", "Condensation on pipes"].map(item => (
              <div key={item} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 4, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: INTER, fontSize: 14, color: "rgba(255,255,255,.7)" }}>{item}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Card: DARK bg + 1px rgba(255,255,255,.07) · Icon bg: rgba(216,203,165,.1) + rgba(216,203,165,.2) border · H3: CF 700 22px white · Item: rgba(255,255,255,.04) bg + rgba(255,255,255,.06) border · Text: Inter 14px rgba(255,255,255,.7)
        </p>
      </Section>

      {/* Cost Guide Bars */}
      <Section title="Barras de Costo / Cost Guide Bars" bg={NAVY}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          NAVY bg. Label Inter 14px rgba(255,255,255,.7). Rango CF 700 15px SAND. Track rgba(255,255,255,.1). Fill B→SAND gradiente animado.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 540 }}>
          {[
            { label: "Basic Moisture Control", range: "$1,500 – $3,500", pct: 25 },
            { label: "Partial Encapsulation", range: "$3,500 – $6,000", pct: 50 },
            { label: "Full Encapsulation + Drainage", range: "$6,000 – $10,000", pct: 75 },
            { label: "Full Repair + SmartJack System", range: "$10,000 – $18,000", pct: 100 },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: INTER, fontSize: 14, color: "rgba(255,255,255,.7)" }}>{item.label}</span>
                <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 15, color: SAND }}>{item.range}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,.1)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${item.pct}%`, borderRadius: 99, background: `linear-gradient(90deg, ${B}, ${SAND})` }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 20, opacity: 0.8 }}>
          Section bg: NAVY · Label: Inter 14px rgba(255,255,255,.7) · Range: CF 700 15px SAND · Track: h-1.5 rgba(255,255,255,.1) · Fill: linear-gradient(90deg, B→SAND) · Animated on inView
        </p>
      </Section>

      {/* FAQ Accordion Dark */}
      <Section title="Acordeón FAQ / FAQ Accordion Dark" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          CHAR bg items. Pregunta Inter 600 17px white. Toggle + icon (rota 45° abierto). SAND border cuando abierto.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
          {/* Closed item */}
          <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
              <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 17, color: "#fff", flex: 1, paddingRight: 16, lineHeight: 1.4 }}>
                How long does crawl space repair take?
              </span>
              <div style={{ width: 24, height: 24, border: "1.5px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
            </div>
          </div>
          {/* Open item */}
          <div style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
              <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 17, color: "#fff", flex: 1, paddingRight: 16, lineHeight: 1.4 }}>
                Do you offer financing?
              </span>
              <div style={{ width: 24, height: 24, border: `1.5px solid ${SAND}`, display: "flex", alignItems: "center", justifyContent: "center", color: SAND, flexShrink: 0, transform: "rotate(45deg)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
            </div>
            <div style={{ padding: "0 24px 24px" }}>
              <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: 16 }} />
              <p style={{ fontFamily: INTER, fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.8, margin: 0 }}>
                Yes. We work with trusted lenders to make repairs affordable.
              </p>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Item: CHAR bg + 1px rgba(255,255,255,.07) · Question: Inter 600 17px white · Toggle closed: 24×24 1.5px rgba(255,255,255,.2) + icon MUTED · Toggle open: 1.5px SAND border + rotate(45deg) + SAND icon · Divider: rgba(255,255,255,.06) · Answer: Inter 15px rgba(255,255,255,.6)
        </p>
      </Section>

      {/* Gallery Carousel Controls */}
      <Section title="Controles de Carrusel / Carousel Controls" bg={CREAM}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          Sobre fondos claros (CREAM). Flechas DARK. Dots: activo SAND pill 24px, inactivo DARK rgba circle 8px.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ width: 44, height: 44, border: "1px solid rgba(62,60,73,.25)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke={DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button style={{ width: 44, height: 44, border: "1px solid rgba(62,60,73,.25)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          {/* Dot pagination */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 24, height: 8, background: SAND, borderRadius: 99 }} />
            {[0, 0, 0, 0, 0].map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, background: "rgba(62,60,73,.2)", borderRadius: 99 }} />
            ))}
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Arrows: 44×44 · 1px rgba(62,60,73,.25) border · DARK icon · hover: rgba(62,60,73,.08) bg · Dots: active=SAND 24×8px pill · inactive=rgba(62,60,73,.2) 8×8px circle
        </p>
      </Section>

      {/* Gallery Image Chip */}
      <Section title="Chip de Índice / Image Index Chip" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          Overlay en esquina superior izquierda de imágenes de carrusel. Blur backdrop.
        </p>
        <div style={{ position: "relative", width: 200, height: 120, background: "#4D4C58" }}>
          <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", background: "rgba(62,60,73,.6)", backdropFilter: "blur(6px)" }}>
            <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 12, color: SAND }}>01</span>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          CF 700 · 12px · SAND · bg: rgba(62,60,73,.6) + blur(6px) · padding 4px 10px
        </p>
      </Section>

      {/* CTA Banner */}
      <Section title="Banner CTA / Full-Width CTA" bg={NAVY}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          NAVY bg + imagen overlay + grain texture. Texto centrado. Eyebrow SAND. H2 white. Dos botones.
        </p>
        <div style={{ position: "relative", padding: "56px 48px", textAlign: "center", background: NAVY, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,55,113,.82)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ height: 1, width: 32, background: SAND }} />
              <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Free Inspection</span>
              <div style={{ height: 1, width: 32, background: SAND }} />
            </div>
            <h2 style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 16 }}>
              Ready to fix your crawl space?
            </h2>
            <p style={{ fontFamily: INTER, fontSize: 17, color: "rgba(255,255,255,.6)", marginBottom: 36 }}>
              Get a free, no-obligation inspection and quote.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: B, fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "#fff", padding: "14px 28px", textDecoration: "none" }}>
                Schedule Free Inspection
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              </a>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,.7)", padding: "14px 0", textDecoration: "none" }}>
                or call (901) 555-0100
              </a>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 16, opacity: 0.8 }}>
          Section: NAVY + bg-image + rgba(0,55,113,.82) overlay + grain SVG opacity .05 · Eyebrow: SAND line 32px + CF 700 11px SAND · H2: CF 800 clamp(28px,4vw,52px) white · Body: Inter 17px rgba(255,255,255,.6) · Primary btn: B bg · Secondary: ghost text rgba(255,255,255,.7)
        </p>
      </Section>

      {/* Financing Chip */}
      <Section title="Chip de Financiamiento / Financing Chip" bg={NAVY}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
          Overlay flotante en imagen del cost guide. DARK bg + SAND border.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 20px", background: DARK, border: `1px solid rgba(216,203,165,.3)` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: INTER, fontSize: 13, color: SAND }}>Financing from $79/month available</span>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 16, opacity: 0.8 }}>
          bg: DARK · border: 1px rgba(216,203,165,.3) · icon: SAND · text: Inter 13px SAND
        </p>
      </Section>

      {/* Services Landing — TrustBar */}
      <Section title="Barra de Confianza / Trust Bar" bg={CHAR}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          Usada en ServicesLandingPage. 4 stats horizontales. CHAR bg. Dividers rgba(255,255,255,.08).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[
            { value: "12,250+", label: "Homes Protected" },
            { value: "17 yrs", label: "In Business" },
            { value: "4.9★", label: "Rating" },
            { value: "Lifetime", label: "Warranty" },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{
              flex: "1 0 140px",
              padding: "28px 24px",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}>
              <p style={{ fontFamily: CF, fontWeight: 800, fontSize: "clamp(24px,3vw,40px)", color: SAND, lineHeight: 1, margin: 0 }}>{stat.value}</p>
              <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          CHAR bg · Stat: CF 800 clamp(24-40px) SAND · Label: Inter 11px MUTED tracking 1.5px uppercase · Divider: 1px rgba(255,255,255,.08) vertical
        </p>
      </Section>

      {/* Services Landing — Bento Card */}
      <Section title="Tarjeta Bento / Bento Service Card" bg={DARK}>
        <p style={{ fontFamily: INTER, fontSize: 13, color: MUTED, marginBottom: 24 }}>
          Usada en ServicesLandingPage grid. CHAR bg. Imagen + gradiente overlay. Badge SAND. H3 white. Hover: scale imagen.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 260, background: CHAR, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 180, background: "#4D4C58" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(62,60,73,.8) 0%, rgba(62,60,73,.2) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px" }}>
                <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(216,203,165,.15)", border: "1px solid rgba(216,203,165,.35)", marginBottom: 10 }}>
                  <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 9, color: SAND, letterSpacing: 2.5, textTransform: "uppercase" }}>Crawl Space</span>
                </div>
                <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.1, margin: 0 }}>Crawl Space Repair</h3>
              </div>
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <p style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.65, marginBottom: 16 }}>Encapsulation, joist repair, moisture control.</p>
              <a href="#" style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: SAND, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                Explore
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" /></svg>
              </a>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 16, opacity: 0.7 }}>
          Card bg: CHAR · Image overlay: gradient 0deg DARK 80%→transparent · Badge: rgba(216,203,165,.15) + rgba(216,203,165,.35) border · H3: CF 800 varies (42/34/30/27px by slot) white · Body: Inter 13px rgba(255,255,255,.55) · CTA: Inter 600 13px SAND
        </p>
      </Section>

      {/* Footer Patterns */}
      <Section title="Footer / Pie de Página" bg={DARK}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
          <div style={{ minWidth: 160 }}>
            <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
              Services
            </p>
            {["Crawl Space", "Waterproofing", "Foundation Repair", "Concrete Leveling"].map(link => (
              <p key={link} style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1, marginBottom: 12, cursor: "pointer" }}>
                {link}
              </p>
            ))}
          </div>
          <div style={{ minWidth: 200 }}>
            <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
              Company
            </p>
            {["About Us", "Our Difference", "Resources", "Contact"].map(link => (
              <p key={link} style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1, marginBottom: 12, cursor: "pointer" }}>
                {link}
              </p>
            ))}
          </div>
          <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 20, marginTop: 8 }}>
            <p style={{ fontFamily: INTER, fontSize: 12, color: "rgba(255,255,255,.3)", margin: 0 }}>
              © 2024 Redeemers Group. All rights reserved.
            </p>
          </div>
        </div>
        <p style={{ fontFamily: INTER, fontSize: 11, color: MUTED, marginTop: 24, opacity: 0.7 }}>
          Section heading: Articulat CF 700 · 11px · SAND · tracking 4px · uppercase — Links: Inter 13px · rgba(255,255,255,.55) — Copyright: Inter 12px · rgba(255,255,255,.3)
        </p>
      </Section>

    </div>
  );
}
