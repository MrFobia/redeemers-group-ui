import { useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import SharedNavBar from "./SharedNavBar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { PageHeroBanner } from "./components/PageHeroBanner";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { CtaSection, Footer } from "./ServiceAreaPage";
import { SERVICES, type ServiceDef } from "./data/services";
import { getProblemSignByLabel } from "./data/problemSigns";
import { ALL_CITIES, CITY_BY_SLUG, CITY_CONTENT, STATE_NAME, type StateAbbr } from "./data/serviceAreas";
import { contentForCityItems, KIND_META, type ContentItem } from "./data/localContent";
import { workPath } from "./data/workContent";
import {
  LOCATION_BY_CITY, LOCATION_BY_COUNTY, LOCATION_BY_SLUG, locationName, locationPath,
  type LocationPage as LocationPageDef,
} from "./data/locationPages";
import imgHero from "../assets/case-duplex.jpg";

import { B, CHAR, MUTED, SURFACE, ON_LIGHT } from "./theme";

// ─── Location page (city / county) ────────────────────────────────────────────
// SEO: the legacy site's thin city pages ("Bay AR Crawl Space Repair") rank and
// drive real traffic, and the service-area map alone only shows that content in
// a panel with no URL of its own. Every legacy location page therefore gets a
// route here, keeping its title, meta description and H2s verbatim, and every
// piece of local proof is a real <a href> to its own page so crawlers can reach
// it. Section *order* follows the legacy page; body copy is placeholder until
// the content matrix lands.

const CF = "'Articulat CF',sans-serif";
const INTER = "'Inter',sans-serif";

// The four residential services, in the order the legacy pages list them.
const RESIDENTIAL = ["crawl-space-repair", "waterproofing", "structural-repair", "concrete-services"] as const;

// Legacy H2 → service. A heading like "Arlington Crawl Space Waterproofing" or
// "Basement & Crawl Space Waterproofing" names two services; the one named
// FIRST is what the heading is about, so matches are ranked by position.
const SERVICE_KEYWORDS: [RegExp, (typeof RESIDENTIAL)[number]][] = [
  [/crawl ?space/i, "crawl-space-repair"],
  [/basement|waterproof|wet basement|leak/i, "waterproofing"],
  [/foundation|structural|wall brace/i, "structural-repair"],
  [/concrete|leveling|lifting|polylevel/i, "concrete-services"],
];
// Company-level headings ("Alamo Home Waterproofing & Structural Repair
// Company") describe the whole business — they lead the intro, not a service.
const INTRO_HEADING = /company|since \d{4}|protecting|responsible|dependable/i;

function servicesInHeading(h: string) {
  return SERVICE_KEYWORDS
    .map(([re, svc]) => ({ svc, at: h.search(re) }))
    .filter((m) => m.at >= 0)
    .sort((a, b) => a.at - b.at)
    .map((m) => m.svc);
}

const signRoute = (label: string) => {
  const sign = getProblemSignByLabel(label);
  return sign ? `problem-sign-inner/${sign.slug}` : "problem-sign-inner";
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/** Hash link that still routes through the SPA navigate(). */
function RouteLink({ to, onNavigate, className, style, children }: {
  to: string; onNavigate?: (p: string) => void; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  return (
    <a href={`#${to}`} className={className} style={style}
      onClick={(e) => { if (!onNavigate) return; e.preventDefault(); onNavigate(to); }}>
      {children}
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ display: "block", width: 28, height: 2, background: B }} />
      <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 11, color: B, letterSpacing: 4, textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

const h2Style: React.CSSProperties = { fontFamily: CF, fontWeight: 800, fontSize: "clamp(30px,3.4vw,46px)", color: CHAR, lineHeight: 1.08, letterSpacing: "-0.8px", margin: 0 };

// Keeps the legacy <title> and meta description while the page is mounted.
function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !tag;
    if (!tag) { tag = document.createElement("meta"); tag.name = "description"; document.head.appendChild(tag); }
    const prevDesc = tag.content;
    document.title = title;
    tag.content = description;
    return () => {
      document.title = prevTitle;
      if (created) tag!.remove(); else tag!.content = prevDesc;
    };
  }, [title, description]);
}

// Round-robin across kinds so a strip never shows six reviews and nothing else.
function mixKinds(items: ContentItem[], limit: number): ContentItem[] {
  const byKind = new Map<string, ContentItem[]>();
  for (const it of items) byKind.set(it.kind, [...(byKind.get(it.kind) ?? []), it]);
  const queues = [...byKind.values()];
  const out: ContentItem[] = [];
  while (out.length < limit && queues.some((q) => q.length)) {
    for (const q of queues) if (q.length && out.length < limit) out.push(q.shift()!);
  }
  return out;
}

/** Local proof for the page; falls back to the nearest published work in the same state. */
function proofFor(page: LocationPageDef): { items: ContentItem[]; local: boolean } {
  const slugs = page.kind === "city"
    ? [page.citySlug!]
    : ALL_CITIES.filter((c) => c.county === page.county && c.state === page.state).map((c) => c.slug);
  const local = slugs.flatMap(contentForCityItems).filter((i) => i.kind !== "project-gallery");
  if (local.length) return { items: mixKinds(local, 6), local: true };
  const state: StateAbbr | undefined = page.kind === "city" ? CITY_BY_SLUG[page.citySlug!]?.state : page.state;
  const near = Object.keys(CITY_CONTENT)
    .filter((s) => CITY_BY_SLUG[s]?.state === state)
    .flatMap(contentForCityItems)
    .filter((i) => i.kind !== "project-gallery");
  return { items: mixKinds(near, 6), local: false };
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function ServiceBlock({ svc, heading, place, onNavigate }: { svc: ServiceDef; heading: string; place: string; onNavigate?: (p: string) => void }) {
  const signs = svc.symptoms.slice(0, 3);
  return (
    <div className="flex flex-col h-full" style={{ background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}` }}>
      <div className="relative overflow-hidden shrink-0" style={{ height: 180 }}>
        <ImageWithFallback src={svc.heroImg} alt={`${svc.name} in ${place}`} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col flex-1 p-7">
        <h3 style={{ fontFamily: CF, fontWeight: 800, fontSize: 22, color: CHAR, lineHeight: 1.2, margin: "0 0 12px" }}>{heading}</h3>
        <p style={{ fontFamily: INTER, fontSize: 14.5, color: MUTED, lineHeight: 1.7, margin: "0 0 18px" }}>{svc.heroLede}</p>
        {signs.length > 0 && (
          <ul className="flex flex-col mb-6" style={{ gap: 6, listStyle: "none", padding: 0, margin: "0 0 22px" }}>
            {signs.map((s) => (
              <li key={s.id}>
                <RouteLink to={signRoute(s.q)} onNavigate={onNavigate} className="inline-flex items-start gap-1.5 hover:underline"
                  style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: B, lineHeight: 1.4, textDecoration: "none" }}>
                  <ChevronRight size={14} className="shrink-0 mt-[2px]" />{s.q}
                </RouteLink>
              </li>
            ))}
          </ul>
        )}
        <RouteLink to={`service/${svc.slug}`} onNavigate={onNavigate} className="group mt-auto inline-flex items-center gap-2"
          style={{ fontFamily: INTER, fontWeight: 700, fontSize: 14, color: B, textDecoration: "none" }}>
          {svc.name} services
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </RouteLink>
      </div>
    </div>
  );
}

function ProofCard({ item, onNavigate }: { item: ContentItem; onNavigate?: (p: string) => void }) {
  const meta = KIND_META[item.kind];
  const text = item.quote ?? item.body ?? item.story?.[0] ?? "";
  return (
    <RouteLink to={workPath(item.kind, item.id)} onNavigate={onNavigate}
      className="group flex flex-col h-full transition-colors hover:bg-black/[0.02]"
      style={{ border: `1px solid ${ON_LIGHT.border}`, background: SURFACE.base, textDecoration: "none" }}>
      <div className="relative overflow-hidden shrink-0" style={{ height: 150 }}>
        <ImageWithFallback src={item.images[0]?.src} alt={item.images[0]?.caption ?? item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <span style={{ fontFamily: CF, fontWeight: 700, fontSize: 10, color: B, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
          {meta.label} · {item.city}, {item.state}
        </span>
        <p style={{ fontFamily: CF, fontWeight: 700, fontSize: 17, color: CHAR, lineHeight: 1.3, margin: "0 0 8px" }}>{item.title}</p>
        {text && (
          <p className="line-clamp-3" style={{ fontFamily: INTER, fontSize: 13.5, color: MUTED, lineHeight: 1.65, margin: 0 }}>{text}</p>
        )}
        <span className="inline-flex items-center gap-1.5 mt-4" style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: B }}>
          Read more <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </RouteLink>
  );
}

function PlaceList({ title, names, onNavigate }: { title: string; names: { label: string; to?: string }[]; onNavigate?: (p: string) => void }) {
  return (
    <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Eyebrow>Nearby</Eyebrow>
        <h2 style={{ ...h2Style, fontSize: "clamp(26px,2.8vw,36px)", marginBottom: 28 }}>{title}</h2>
        <ul className="flex flex-wrap" style={{ gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
          {names.map((n) => (
            <li key={n.label}>
              {n.to ? (
                <RouteLink to={n.to} onNavigate={onNavigate} className="inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors hover:bg-black/[0.04]"
                  style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13.5, color: B, border: `1px solid ${ON_LIGHT.border}`, textDecoration: "none" }}>
                  <MapPin size={12} />{n.label}
                </RouteLink>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5" style={{ fontFamily: INTER, fontSize: 13.5, color: MUTED, background: "rgba(62,60,73,.04)" }}>
                  {n.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LocationPage({ slug, onBack, onNavigate }: { slug?: string; onBack: () => void; onNavigate?: (p: string) => void }) {
  const page = slug ? LOCATION_BY_SLUG[slug] : undefined;
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  useDocumentMeta(page?.title ?? "Service Area | Redeemers", page?.description ?? "");

  const data = useMemo(() => {
    if (!page) return null;
    const name = locationName(page);
    const city = page.kind === "city" ? CITY_BY_SLUG[page.citySlug!] : undefined;
    const state = (city?.state ?? page.state)!;
    const county = city?.county ?? page.county!;
    const shortPlace = city?.name ?? `${county} County`;

    // Assign each legacy H2 to at most one service; the rest become section titles.
    const serviceHeading: Partial<Record<string, string>> = {};
    const loose: string[] = [];
    for (const raw of page.headings) {
      const h = raw.replace(/:\s*$/, "");
      const svc = INTRO_HEADING.test(h) ? undefined : servicesInHeading(h).find((s) => !serviceHeading[s]);
      if (svc) serviceHeading[svc] = h; else loose.push(h);
    }
    const pick = (re: RegExp) => loose.find((h) => re.test(h));
    const introHeading = loose.find((h) => !/review|work request|before and after|free estimate|services we offer|repair services/i.test(h))
      ?? `Protecting ${shortPlace} homes since 2007`;
    const servicesHeading = pick(/services we offer|repair services|services/i) ?? `Repair services we offer in ${shortPlace}`;
    const reviewsHeading = pick(/review/i) ?? `Reviews from our customers in ${name}`;

    const countyPage = LOCATION_BY_COUNTY[`${state}-${county}`];
    const countyCities = ALL_CITIES.filter((c) => c.county === county && c.state === state && c.slug !== page.citySlug);
    const nearby = countyCities.map((c) => {
      const lp = LOCATION_BY_CITY[c.slug];
      return { label: c.name, to: lp ? locationPath(lp) : undefined };
    }).sort((a, b) => Number(!!b.to) - Number(!!a.to) || a.label.localeCompare(b.label));

    return { name, state, county, shortPlace, serviceHeading, introHeading, servicesHeading, reviewsHeading, countyPage, nearby, proof: proofFor(page) };
  }, [page]);

  if (!page || !data) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-[100]"><AnnouncementBar /><SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="About" /></div>
        <div className="w-full min-h-screen pt-[135px] px-8 py-24 text-center" style={{ background: SURFACE.base }}>
          <p style={{ fontFamily: INTER, color: MUTED, marginBottom: 20 }}>We couldn&rsquo;t find that location.</p>
          <RouteLink to="service-area" onNavigate={onNavigate} style={{ fontFamily: INTER, fontWeight: 700, color: B }}>See every area we serve</RouteLink>
        </div>
      </>
    );
  }

  const { name, state, county, shortPlace, serviceHeading, introHeading, servicesHeading, reviewsHeading, countyPage, nearby, proof } = data;

  const crumbs = [
    { label: "Home", onClick: onBack },
    { label: "Service Area", onClick: () => onNavigate?.("service-area") },
    ...(page.kind === "city" && countyPage ? [{ label: `${county} County`, onClick: () => onNavigate?.(locationPath(countyPage)) }] : []),
    { label: name },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="About" />
      </div>
      <div className="w-full min-h-screen pt-[75px] md:pt-[109px] lg:pt-[122px] xl:pt-[135px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={crumbs} />
        <PageHeroBanner image={imgHero} imageAlt={`Redeemers crew at work near ${name}`} eyebrow={name} title={page.title} lede={page.h1} align="end">
          <button onClick={() => openInspection()} className="group inline-flex items-center gap-3 px-8 py-4"
            style={{ background: B, fontFamily: INTER, fontWeight: 700, fontSize: 15, color: "#fff", border: "none", cursor: "pointer" }}>
            Get a free estimate in {shortPlace}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </PageHeroBanner>

        {/* Intro — legacy lead H2 + meta description as the lede */}
        <section style={{ background: SURFACE.base }} className="py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{STATE_NAME[state]} · {county} County</Eyebrow>
              <h2 style={h2Style}>{introHeading}</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 flex items-end">
              <p style={{ fontFamily: INTER, fontSize: 17, color: MUTED, lineHeight: 1.75, margin: 0 }}>{page.description}</p>
            </Reveal>
          </div>
        </section>

        {/* Services — one block per residential service, headed by the legacy H2 */}
        <section style={{ background: SURFACE.alt }} className="py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14">
            <Reveal className="mb-12">
              <Eyebrow>Services</Eyebrow>
              <h2 style={h2Style}>{servicesHeading}</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {RESIDENTIAL.map((s, i) => (
                <Reveal key={s} delay={i * 0.06}>
                  <ServiceBlock svc={SERVICES[s]} heading={serviceHeading[s] ?? `${SERVICES[s].name} in ${name}`} place={name} onNavigate={onNavigate} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Local proof — every card is a crawlable link to its own page */}
        {proof.items.length > 0 && (
          <section style={{ background: SURFACE.base }} className="py-16 lg:py-24">
            <div className="max-w-[1440px] mx-auto px-8 md:px-14">
              <Reveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <Eyebrow>{proof.local ? "Local work" : "Recent work nearby"}</Eyebrow>
                  <h2 style={h2Style}>{proof.local ? reviewsHeading : `Recent work near ${shortPlace}`}</h2>
                </div>
                <RouteLink to="service-area" onNavigate={onNavigate} className="group inline-flex items-center gap-2 shrink-0"
                  style={{ fontFamily: INTER, fontWeight: 700, fontSize: 14, color: B, textDecoration: "none" }}>
                  Explore the service-area map <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </RouteLink>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {proof.items.map((it, i) => (
                  <Reveal key={it.id} delay={(i % 3) * 0.06}><ProofCard item={it} onNavigate={onNavigate} /></Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {nearby.length > 0 && (
          <PlaceList
            title={page.kind === "county" ? `Cities we serve in ${county} County` : `Also serving ${county} County`}
            names={nearby}
            onNavigate={onNavigate}
          />
        )}

        <CtaSection />
        <Footer onBack={onBack} />
      </div>
    </>
  );
}
