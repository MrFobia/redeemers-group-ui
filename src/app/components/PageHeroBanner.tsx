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

export function PageHeroBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  lede,
  children,
  minHeight = 460,
  contentMaxWidth = 760,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** CTAs, stat rows — anything that sits under the lede. */
  children?: React.ReactNode;
  minHeight?: number;
  /** Widen the copy column when `children` is a wide element (e.g. a stat strip). */
  contentMaxWidth?: number;
}) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight, background: "#0A0B14" }}>
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
        className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-14 flex flex-col justify-center"
        style={{ minHeight, paddingTop: 64, paddingBottom: 64 }}
      >
        <div style={{ maxWidth: contentMaxWidth }}>
          <div className="flex items-center gap-3 mb-6">
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
              fontSize: "clamp(38px,5.2vw,76px)",
              color: "#fff",
              lineHeight: 1.02,
              letterSpacing: "-2px",
              whiteSpace: "pre-line",
              marginBottom: lede ? 24 : children ? 32 : 0,
            }}
          >
            {title}
          </h1>

          {lede && (
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "clamp(15px,1.5vw,18px)",
                color: "rgba(255,255,255,.65)",
                lineHeight: 1.75,
                maxWidth: 580,
                marginBottom: children ? 36 : 0,
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
