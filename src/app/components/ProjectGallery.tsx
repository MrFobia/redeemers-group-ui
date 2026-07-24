import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight, ZoomIn, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { openInspection } from "./InspectionModal";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = "#1A52A8";
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";

// ─── Gallery data ─────────────────────────────────────────────────────────────
const U = (id: string, w = 1200) => `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=${w}`;

type GalleryImage = { src: string; caption: string };

export const GALLERY_ITEMS: {
  src: string; label: string; loc: string; category: string; year: string;
  whatWeDid: string; story: string[]; products: string[]; images: GalleryImage[];
}[] = [
  {
    src: U("photo-1591638436281-078219f200af"), label: "Crawl Space Encapsulation", loc: "Memphis, TN", category: "Crawl Space", year: "2025",
    whatWeDid: "Full crawl space encapsulation with CleanSpace™ moisture barrier, SmartSump™ pump, and SaniDry™ dehumidifier.",
    story: [
      "The homeowner had a decades-old crawl space with standing moisture that had caused floor buckling and mold growth on the hardwood above.",
      "Our crew removed the old, torn vapor barrier, sealed the vents, and installed a full CleanSpace™ encapsulation system with a SmartSump™ pump and SaniDry™ dehumidifier to keep humidity under control year-round.",
      "The result: a sealed, dry crawl space, no more musty smell in the home, and a lifetime transferable warranty on the system.",
    ],
    products: ["CleanSpace™ Moisture Barrier", "SmartSump™ Pump", "SaniDry™ Dehumidifier"],
    images: [
      { src: U("photo-1591638436281-078219f200af", 1400), caption: "Old crawl space wall before encapsulation" },
      { src: U("photo-1766497278321-dff63e463f72", 1400), caption: "Moldy, moisture-damaged subfloor" },
      { src: U("photo-1708214148950-ccbb69d40e25", 1400), caption: "CleanSpace™ vapor barrier installed" },
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Finished, sealed crawl space" },
    ],
  },
  {
    src: U("photo-1766497278321-dff63e463f72", 900), label: "Floor Joist Repair", loc: "Jonesboro, AR", category: "Crawl Space", year: "2025",
    whatWeDid: "Sistered floor joists and installed SmartJack™ supports to stop sagging floors.",
    story: [
      "Sagging floors and a bouncy feeling near the kitchen led the homeowner to call for an inspection.",
      "We found several rotted floor joists caused by long-term moisture exposure. Our crew sistered new joists alongside the damaged ones and added SmartJack™ supports for extra load-bearing strength.",
      "Floors were leveled and the bounce eliminated the same day, backed by our lifetime warranty.",
    ],
    products: ["SmartJack™ Support System", "Pressure-Treated Sister Joists"],
    images: [
      { src: U("photo-1766497278321-dff63e463f72", 1400), caption: "Rotted joists before repair" },
      { src: U("photo-1591638436281-078219f200af", 1400), caption: "Sistering new joists in place" },
      { src: U("photo-1646184466560-f81b1e495604", 1400), caption: "SmartJack™ supports installed" },
    ],
  },
  {
    src: U("photo-1708214148950-ccbb69d40e25", 900), label: "SmartJack Installation", loc: "Little Rock, AR", category: "Foundation", year: "2024",
    whatWeDid: "SmartJack™ system installed to stabilize a sinking floor structure.",
    story: [
      "The homeowner noticed doors that no longer closed properly and visible gaps between the floor and baseboards.",
      "Inspection revealed the support posts under the home had deteriorated. We installed adjustable SmartJack™ supports on new footings to permanently stabilize the structure.",
      "The floor was lifted back to level and every door in the home now closes correctly.",
    ],
    products: ["SmartJack™ Support System", "Concrete Footings"],
    images: [
      { src: U("photo-1708214148950-ccbb69d40e25", 1400), caption: "Deteriorated support posts" },
      { src: U("photo-1720631618132-83cdab1b237e", 1400), caption: "New footings poured" },
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "SmartJack™ supports installed and leveled" },
    ],
  },
  {
    src: U("photo-1760776024932-38040caef5d1", 900), label: "Vapor Barrier System", loc: "Nashville, TN", category: "Waterproofing", year: "2025",
    whatWeDid: "Heavy-duty vapor barrier and drainage matting installed to eliminate crawl space moisture.",
    story: [
      "High humidity in the crawl space was causing condensation on ductwork and a persistent musty odor upstairs.",
      "We installed drainage matting along the perimeter and a 20-mil vapor barrier across the entire crawl space floor and walls, directing water to a sump discharge point.",
      "Humidity levels dropped immediately and the homeowner reported the odor was gone within a week.",
    ],
    products: ["20-mil Vapor Barrier", "Drainage Matting"],
    images: [
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Bare dirt crawl space before treatment" },
      { src: U("photo-1646184466560-f81b1e495604", 1400), caption: "Drainage matting installed along perimeter" },
      { src: U("photo-1591638436281-078219f200af", 1400), caption: "Vapor barrier sealed and finished" },
    ],
  },
  {
    src: U("photo-1646184466560-f81b1e495604", 900), label: "Interior Drainage System", loc: "Jackson, MS", category: "Waterproofing", year: "2024",
    whatWeDid: "Interior perimeter drain and dual sump pump system installed to keep the basement dry.",
    story: [
      "Two flooded basements in two years pushed the homeowner to look for a permanent fix rather than another shop-vac session.",
      "We installed an interior perimeter drainage channel connected to a dual sump pump system with battery backup, plus a vapor barrier on the walls.",
      "The basement has stayed dry through every major storm since, including a week-long heavy rain event.",
    ],
    products: ["Interior Perimeter Drain", "Dual Sump Pump with Battery Backup"],
    images: [
      { src: U("photo-1646184466560-f81b1e495604", 1400), caption: "Water intrusion along the basement wall" },
      { src: U("photo-1708214148950-ccbb69d40e25", 1400), caption: "Perimeter drain channel installed" },
      { src: U("photo-1766497278321-dff63e463f72", 1400), caption: "Dual sump pump system with backup" },
    ],
  },
  {
    src: U("photo-1720631618132-83cdab1b237e", 900), label: "Mold Remediation", loc: "Collierville, TN", category: "Mold", year: "2025",
    whatWeDid: "Full mold remediation and moisture-source correction in an affected crawl space.",
    story: [
      "A routine encapsulation inspection turned up active mold growth on two floor joists that the homeowner didn't know about.",
      "We scoped and completed mold remediation in the same visit — treating the affected wood, correcting the moisture source, and encapsulating the space to prevent recurrence.",
      "Air quality testing after the job came back clean, and the encapsulation now keeps the space dry going forward.",
    ],
    products: ["Antimicrobial Treatment", "CleanSpace™ Encapsulation"],
    images: [
      { src: U("photo-1720631618132-83cdab1b237e", 1400), caption: "Active mold found on floor joists" },
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Antimicrobial treatment applied" },
      { src: U("photo-1591638436281-078219f200af", 1400), caption: "Crawl space encapsulated after remediation" },
    ],
  },
  {
    src: U("photo-1591638436281-078219f200af", 900), label: "Push Pier Foundation Repair", loc: "Springfield, MO", category: "Foundation", year: "2024",
    whatWeDid: "Steel push piers driven to bedrock to stabilize a settling foundation corner.",
    story: [
      "A growing crack in the living room wall and a noticeably tilted floor pointed to foundation settlement in one corner of the home.",
      "We excavated at the affected corner and drove steel push piers to load-bearing bedrock, then transferred the home's weight onto the piers to lift and stabilize the foundation.",
      "The foundation was lifted back to its original position, and the wall crack has stayed closed since.",
    ],
    products: ["Steel Push Piers", "Foundation Brackets"],
    images: [
      { src: U("photo-1591638436281-078219f200af", 1400), caption: "Foundation crack before repair" },
      { src: U("photo-1708214148950-ccbb69d40e25", 1400), caption: "Push piers driven to bedrock" },
      { src: U("photo-1646184466560-f81b1e495604", 1400), caption: "Foundation lifted and stabilized" },
    ],
  },
  {
    src: U("photo-1766497278321-dff63e463f72", 900), label: "Concrete Leveling", loc: "Bartlett, TN", category: "Concrete", year: "2025",
    whatWeDid: "Polyurethane foam injection to lift and level a sunken driveway slab.",
    story: [
      "One section of the driveway had sunk nearly 3 inches, creating a tripping hazard and pooling water after every rain.",
      "We drilled small injection ports and pumped expanding polyurethane foam beneath the slab, lifting it back to level in a single visit with no demolition required.",
      "The driveway was back in use the same afternoon, with water now draining away from the home as intended.",
    ],
    products: ["Polyurethane Foam Injection"],
    images: [
      { src: U("photo-1766497278321-dff63e463f72", 1400), caption: "Sunken driveway slab before leveling" },
      { src: U("photo-1720631618132-83cdab1b237e", 1400), caption: "Foam injection in progress" },
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Driveway lifted level, ready for use" },
    ],
  },
];

const CATEGORIES = ["All", "Crawl Space", "Foundation", "Waterproofing", "Concrete", "Mold"];

// ─── Project Modal (gallery on top, content below) ───────────────────────────
function ProjectModal({ items, index, onClose, onPrev, onNext }: {
  items: typeof GALLERY_ITEMS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [imgCur, setImgCur] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    if (!emblaApi) return;
    setImgCur(0);
    emblaApi.scrollTo(0);
    emblaApi.on("select", () => setImgCur(emblaApi.selectedScrollSnap()));
  }, [emblaApi, item]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[880px] max-h-[92vh] overflow-y-auto rg-scroll-thin"
        style={{ background: CHAR }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}>
          <X size={18} color="#fff" />
        </button>

        {/* Image gallery — rectangular, panoramic */}
        <div className="relative overflow-hidden" ref={emblaRef} style={{ background: DARK }}>
          <div className="flex">
            {item.images.map((slide, i) => (
              <div key={i} className="relative shrink-0 w-full" style={{ aspectRatio: "21/9" }}>
                <ImageWithFallback src={slide.src} alt={slide.caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(0deg, rgba(10,11,20,.85) 0%, rgba(10,11,20,0) 100%)" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.85)" }}>{slide.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}>
            <ChevronLeft size={16} color="#fff" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(10,11,20,.55)", border: "none", cursor: "pointer" }}>
            <ChevronRight size={16} color="#fff" />
          </button>

          {/* Image dots + counter */}
          <div className="absolute bottom-3 right-4 flex items-center gap-3">
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.6)" }}>
              {String(imgCur + 1).padStart(2, "0")} / {String(item.images.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {item.images.map((_, i) => (
                <button key={i} onClick={() => emblaApi?.scrollTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: imgCur === i ? 18 : 6, height: 6, background: imgCur === i ? SAND : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", padding: 0 }} />
              ))}
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 2.5, textTransform: "uppercase", background: B, padding: "4px 10px" }}>
              {item.category}
            </span>
          </div>
        </div>

        {/* Content — below the gallery */}
        <div className="p-8 md:p-10">
          <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 6 }}>
            {item.label}
          </h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: SAND, marginBottom: 24 }}>{item.loc} · {item.year}</p>

          <div className="mb-6 p-4" style={{ background: "rgba(26,82,168,.12)", border: "1px solid rgba(26,82,168,.25)" }}>
            <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>What we did</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>{item.whatWeDid}</p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            {item.story.map((p, i) => (
              <p key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,.65)", lineHeight: 1.8 }}>{p}</p>
            ))}
          </div>

          {item.products.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-8">
              {item.products.map((p) => (
                <li key={p} className="px-3 py-1.5" style={{ background: "rgba(196,171,108,.1)", border: "1px solid rgba(196,171,108,.25)" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: SAND, fontWeight: 500 }}>{p}</span>
                </li>
              ))}
            </ul>
          )}

          <button onClick={() => { onClose(); openInspection(); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 hover:opacity-90 transition-opacity"
            style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", border: "none", cursor: "pointer" }}>
            Schedule Free Inspection
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>

      {/* Project prev/next (outside card, over backdrop) */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center hidden lg:flex"
        style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}>
        <ChevronLeft size={18} color="#fff" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center hidden lg:flex"
        style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }}>
        <ChevronRight size={18} color="#fff" />
      </button>
    </motion.div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ item, index, onClick, featured = false }: {
  item: typeof GALLERY_ITEMS[0];
  index: number;
  onClick: () => void;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: featured ? 32 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden cursor-pointer group"
      style={{ height: featured ? "100%" : "100%" }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Image with subtle parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-[-4%]"
          animate={{ x: `${(mouse.x - 50) * -0.04}%`, y: `${(mouse.y - 50) * -0.04}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 30, mass: 0.5 }}
        >
          <ImageWithFallback
            src={item.src}
            alt={item.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.2) 0%, transparent 35%, rgba(0,0,0,.65) 100%)" }} />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ background: "rgba(26,82,168,.18)" }}
      />

      {/* Top: index + category */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span style={{
          fontFamily: "'Articulat CF',sans-serif", fontWeight: 900, fontSize: 11,
          color: "rgba(255,255,255,.4)", letterSpacing: 2,
        }}>{String(index + 1).padStart(2, "0")}</span>
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          whileHover={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9,
            color: "#fff", letterSpacing: 2.5, textTransform: "uppercase",
            background: B, padding: "3px 9px",
          }}
        >{item.category}</motion.span>
      </div>

      {/* Bottom: label + CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          animate={{ y: 8, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 mb-2"
        >
          <ZoomIn size={13} color={SAND} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: SAND, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>View project</span>
        </motion.div>

        <h4 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: featured ? 22 : 15, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>
          {item.label}
        </h4>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.5)" }}>
          {item.loc} · {item.year}
        </p>
      </div>

      {/* Corner accent on hover */}
      <motion.div
        className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center"
        animate={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{ background: B }}
      >
        <ArrowUpRight size={16} color="#fff" />
      </motion.div>
    </motion.div>
  );
}

// ─── ProjectGallery (shared component) ───────────────────────────────────────
export function ProjectGallery({ id = "gallery", darkBg = true }: { id?: string; darkBg?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const filtered = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === activeCategory);

  const bg = darkBg ? DARK : DARK;

  return (
    <section id={id} style={{ background: bg }} className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">

        {/* Header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 2, background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Project Gallery</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-1.5px" }}>
              Work that speaks<br />for itself
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {[["127+", "Projects"], ["4", "States"], ["12 yrs", "Experience"]].map(([n, l]) => (
              <div key={l} className="text-center lg:text-right">
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 28, color: SAND, lineHeight: 1, letterSpacing: "-1px" }}>{n}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filter chips */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 transition-all"
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500,
                background: activeCategory === cat ? SAND : "transparent",
                color: activeCategory === cat ? DARK : "rgba(255,255,255,.45)",
                border: `1.5px solid ${activeCategory === cat ? SAND : "rgba(255,255,255,.14)"}`,
                borderRadius: 4, cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length > 0 && (
              <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "280px" }}>
                {/* Featured card — first item, spans 2 cols + 2 rows */}
                <div className="col-span-2 row-span-2">
                  <GalleryCard item={filtered[0]} index={0} featured onClick={() => setLightboxIdx(0)} />
                </div>

                {/* Side cards */}
                {filtered.slice(1, 3).map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 1} onClick={() => setLightboxIdx(i + 1)} />
                  </div>
                ))}

                {/* Bottom row — remaining cards */}
                {filtered.slice(3, 6).map((item, i) => (
                  <div key={item.label + i}>
                    <GalleryCard item={item} index={i + 3} onClick={() => setLightboxIdx(i + 3)} />
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.3)" }}>No projects in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom: view all CTA */}
        <motion.div
          className="flex items-center justify-between mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.3)" }}>
            Showing {Math.min(filtered.length, 6)} of {filtered.length} projects
          </p>
          <button className="group inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: SAND, background: "none", border: "none", cursor: "pointer" }}>
            View all projects
            <ArrowUpRight size={14} color={SAND} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <ProjectModal
            items={filtered}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}
            onNext={() => setLightboxIdx(i => i !== null ? (i + 1) % filtered.length : null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
