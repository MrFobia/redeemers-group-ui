import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type TeamMember, MODAL_REVIEWS, GALLERY_IMGS } from "../data/team";
import { DARK, CHAR, SAND } from "../theme";

// ─── Team Member Modal ─────────────────────────────────────────────────────────
// Shared by the About page teaser (People section) and the full Team page —
// same detail view regardless of where the member was clicked from.
export function TeamMemberModal({ member, onClose, onNavigate }: { member: TeamMember; onClose: () => void; onNavigate?: (p: string) => void }) {
  const [galleryRef, galleryApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const [galCur, setGalCur] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!galleryApi) return;
    galleryApi.on("select", () => setGalCur(galleryApi.selectedScrollSnap()));
  }, [galleryApi]);

  const first = member.name.split(" ")[0];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-12 px-6"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 flex items-center justify-center transition-all hover:bg-white/10"
        style={{ width: 40, height: 40, background: CHAR, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", zIndex: 201 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Modal card */}
      <div
        className="relative w-full flex flex-col my-auto"
        style={{
          maxWidth: 920,
          background: DARK,
          border: "1px solid rgba(255,255,255,.07)",
          padding: 48,
          gap: 36,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header — circular photo + name / title + dept chip */}
        <div className="flex items-center gap-6">
          <div className="shrink-0 rounded-full overflow-hidden" style={{ width: 120, height: 120, border: `2px solid ${SAND}`, boxSizing: "border-box" }}>
            <ImageWithFallback src={member.img} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            {/* Dept eyebrow */}
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 2, background: SAND, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>{member.dept}</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>{member.name}</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.5 }}>{member.title}</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)" }} />

        {/* Bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            Say hello to {first}, one of the friendly faces at Redeemers Group! As a key member of our {member.dept} team, {first} brings energy, expertise, and a genuine commitment to every homeowner we serve.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            With a strong background in {member.dept.toLowerCase()} and a knack for building trust, {first} thrives on making sure every customer feels heard and valued — from the first call all the way to project completion.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            {first} chose Redeemers Group for the people and the culture — and stayed for the impact. Every repaired home is a family whose life gets a little better, and that keeps {first} motivated every single day.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75 }}>
            When not helping customers or making the office a better place, {first} enjoys the outdoors and spending time with family. And yes — there's definitely a soft spot for Reese's Peanut Butter Cups.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)" }} />

        {/* Reviews */}
        <div>
          {/* Section eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <div style={{ width: 16, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Customer Reviews</span>
          </div>
          <div className="flex items-end justify-between mb-5">
            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.3px" }}>
              What customers say about me
            </h3>
            {onNavigate && (
              <button
                onClick={() => onNavigate("reviews")}
                className="group inline-flex items-center gap-1.5 shrink-0"
                style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Read all reviews
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" stroke={SAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MODAL_REVIEWS.map((r) => (
              <div key={r.name} className="flex flex-col" style={{ background: CHAR, border: "1px solid rgba(255,255,255,.07)", padding: 24, gap: 14 }}>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                {/* Giant quote mark */}
                <div style={{ fontFamily: "Georgia,serif", fontSize: 40, color: `rgba(196,171,108,.2)`, lineHeight: 0.7, marginBottom: 4 }}>&ldquo;</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.7, flex: 1 }}>{r.quote}</p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.2)" }}>
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>{r.name}</p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)" }}>{r.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.07)" }} />

        {/* Photo Gallery */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div style={{ width: 16, height: 2, background: SAND }} />
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 10, color: SAND, letterSpacing: 3.5, textTransform: "uppercase" }}>Gallery</span>
          </div>
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 20, lineHeight: 1.2, letterSpacing: "-0.3px" }}>
            Photo gallery
          </h3>
          <div className="relative">
            {/* Prev arrow */}
            <button
              onClick={() => galleryApi?.scrollPrev()}
              className="absolute z-10 flex items-center justify-center -translate-y-1/2 transition-all hover:bg-white/10"
              style={{ left: -18, top: "50%", width: 36, height: 36, background: CHAR, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {/* Next arrow */}
            <button
              onClick={() => galleryApi?.scrollNext()}
              className="absolute z-10 flex items-center justify-center -translate-y-1/2 transition-all hover:bg-white/10"
              style={{ right: -18, top: "50%", width: 36, height: 36, background: CHAR, border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div ref={galleryRef} className="overflow-hidden">
              <div className="flex gap-3">
                {GALLERY_IMGS.map((src, i) => (
                  <div key={i} className="shrink-0 overflow-hidden" style={{ width: "calc((100% - 24px) / 3)", aspectRatio: "1/1" }}>
                    <ImageWithFallback src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {GALLERY_IMGS.map((_, i) => (
                <button key={i} onClick={() => galleryApi?.scrollTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: galCur === i ? 24 : 8, height: 8, borderRadius: 4, padding: 0, border: "none",
                    background: galCur === i ? SAND : "rgba(255,255,255,.2)", cursor: "pointer",
                  }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
