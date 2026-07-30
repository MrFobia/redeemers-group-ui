import { SAND } from "../theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── Page hero banner ─────────────────────────────────────────────────────────
// The one banner treatment shared by the secondary pages (About, Careers,
// Service Area) so they read as the same family: a real Redeemers job photo
// full-bleed, a dark scrim that stays heaviest behind the copy and lets the
// photo breathe on the right, the blueprint grid, and the gold edge rule.
//
// Home keeps its own slider — this is for pages that sit under the 148px nav
// offset and need a single static banner.

// Client QA: every secondary-page banner must be the same height — they were
// drifting between 260px and 600px depending on the page. One fixed,
// responsive height now, no per-page override.
const HERO_HEIGHT_CLASS = "min-h-[320px] md:min-h-[360px] lg:min-h-[400px]";

export function PageHeroBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  lede,
  children,
  contentMaxWidth = 760,
  align = "center",
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** CTAs, stat rows — anything that sits under the lede. */
  children?: React.ReactNode;
  /** Widen the copy column when `children` is a wide element (e.g. a stat strip). */
  contentMaxWidth?: number;
  /** "center" (default) balances the copy block in the banner. "end" anchors
   *  it to the bottom edge instead — use this when `children` varies in
   *  height page to page (e.g. a CTA row that gains/loses a button), so the
   *  gap to the section below stays constant instead of drifting with it. */
  align?: "center" | "end";
}) {
  return (
    <section className={`relative overflow-hidden ${HERO_HEIGHT_CLASS}`} style={{ background: "#0A0B14" }}>
      <div className="absolute inset-0">
        <ImageWithFallback src={image} alt={imageAlt} className="w-full h-full object-cover" />
        {/* Scrim: opaque behind the copy, thinning toward the photo side. Same
            stops on every page so the three banners feel stamped from one mould. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,11,20,0.95) 0%, rgba(10,11,20,0.82) 46%, rgba(11,28,74,0.55) 100%)",
          }}
        />
      </div>

      {/* Blueprint grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />


      <div
        className={`relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 py-10 md:py-12 flex flex-col ${align === "end" ? "justify-end" : "justify-center"} ${HERO_HEIGHT_CLASS}`}
      >
        <div style={{ maxWidth: contentMaxWidth }}>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div style={{ width: 24, height: 2, background: SAND, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Articulat CF',sans-serif",
                fontWeight: 600,
                fontSize: 11,
                color: SAND,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Articulat CF',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px,4.4vw,60px)",
              color: "#fff",
              lineHeight: 1.02,
              letterSpacing: "-2px",
              whiteSpace: "pre-line",
              marginBottom: lede ? 18 : children ? 24 : 0,
            }}
          >
            {title}
          </h1>

          {lede && (
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "clamp(14px,1.3vw,17px)",
                color: "rgba(255,255,255,.65)",
                lineHeight: 1.7,
                maxWidth: 580,
                marginBottom: children ? 24 : 0,
              }}
            >
              {lede}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
