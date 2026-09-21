// ─── Project gallery — shared source of truth ────────────────────────────────
// Moved out of components/ProjectGallery so the grid and the project detail
// page (project/<slug>) read the same records.
import { slugify } from "./serviceAreas";

const U = (id: string, w = 1200) => `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=${w}`;

export type GalleryImage = { src: string; caption: string };

export type GalleryItem = {
  src: string; label: string; loc: string; category: string; year: string;
  whatWeDid: string; story: string[]; products: string[]; images: GalleryImage[];
};

export const GALLERY_ITEMS: GalleryItem[] = [
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
      { src: U("photo-1720631618132-83cdab1b237e", 1400), caption: "Moldy, moisture-damaged subfloor" },
      { src: U("photo-1708214148950-ccbb69d40e25", 1400), caption: "CleanSpace™ vapor barrier installed" },
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Finished, sealed crawl space" },
    ],
  },
  {
    src: U("photo-1720631618132-83cdab1b237e", 900), label: "Floor Joist Repair", loc: "Jonesboro, AR", category: "Crawl Space", year: "2025",
    whatWeDid: "Sistered floor joists and installed SmartJack™ supports to stop sagging floors.",
    story: [
      "Sagging floors and a bouncy feeling near the kitchen led the homeowner to call for an inspection.",
      "We found several rotted floor joists caused by long-term moisture exposure. Our crew sistered new joists alongside the damaged ones and added SmartJack™ supports for extra load-bearing strength.",
      "Floors were leveled and the bounce eliminated the same day, backed by our lifetime warranty.",
    ],
    products: ["SmartJack™ Support System", "Pressure-Treated Sister Joists"],
    images: [
      { src: U("photo-1720631618132-83cdab1b237e", 1400), caption: "Rotted joists before repair" },
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
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Dual sump pump system with backup" },
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
    src: U("photo-1708214148950-ccbb69d40e25", 900), label: "Concrete Leveling", loc: "Bartlett, TN", category: "Concrete", year: "2025",
    whatWeDid: "Polyurethane foam injection to lift and level a sunken driveway slab.",
    story: [
      "One section of the driveway had sunk nearly 3 inches, creating a tripping hazard and pooling water after every rain.",
      "We drilled small injection ports and pumped expanding polyurethane foam beneath the slab, lifting it back to level in a single visit with no demolition required.",
      "The driveway was back in use the same afternoon, with water now draining away from the home as intended.",
    ],
    products: ["Polyurethane Foam Injection"],
    images: [
      { src: U("photo-1708214148950-ccbb69d40e25", 1400), caption: "Sunken driveway slab before leveling" },
      { src: U("photo-1720631618132-83cdab1b237e", 1400), caption: "Foam injection in progress" },
      { src: U("photo-1760776024932-38040caef5d1", 1400), caption: "Driveway lifted level, ready for use" },
    ],
  },
];

/** Stable URL slug: label + city, e.g. "crawl-space-encapsulation-memphis-tn". */
export const projectSlug = (g: GalleryItem) => slugify(`${g.label}-${g.loc}`);

export const PROJECT_BY_SLUG: Record<string, GalleryItem> = Object.fromEntries(
  GALLERY_ITEMS.map((g) => [projectSlug(g), g])
);
