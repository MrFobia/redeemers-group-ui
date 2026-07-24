// ─────────────────────────────────────────────────────────────────────────────
// SERVICE AREA — canonical data model
//
// This is the single source of truth for "where do we work". Everything that is
// location-aware (job stories, reviews, case studies, city landing pages) joins
// back to a City via its `slug`, so a page never has to guess which records to
// pull — it filters by slug.
//
// Shape:  State → County → City
// Source: redeemersgroup.com/service-area (county/city table) + client ZIP list.
// ─────────────────────────────────────────────────────────────────────────────

export type StateAbbr = "TN" | "AR" | "MS" | "MO";

export type County = {
  name: string;
  state: StateAbbr;
  cities: string[];
};

export type LatLng = [number, number];

export type StateInfo = {
  abbr: StateAbbr;
  name: string;
  tagline: string;
  /** Simplified state outline in [lat, lng] — drawn as a Leaflet polygon over OSM tiles. */
  polygon: LatLng[];
  /** Where the map flies to when this state is selected. */
  center: LatLng;
  zoom: number;
  /** Headline metro areas — each points at a real city in COUNTIES below. */
  metros: { label: string; citySlug: string }[];
  services: string[];
};

export type CityMarker = { name: string; state: StateAbbr; pos: LatLng };

// ─── States ───────────────────────────────────────────────────────────────────
export const STATES: StateInfo[] = [
  {
    abbr: "TN",
    name: "Tennessee",
    tagline: "Home base. Memphis metro and West Tennessee, top to bottom.",
    polygon: [[36.50,-89.49], [36.50,-88.05], [36.61,-81.66], [36.30,-81.70], [35.90,-83.01], [35.50,-83.90], [35.20,-84.30], [35.00,-84.33], [35.00,-90.30], [35.40,-90.15], [35.80,-89.91], [36.20,-89.69]],
    center: [35.65, -89.20], zoom: 7,
    metros: [{ label: "Memphis metro", citySlug: "memphis-tn" }, { label: "Jackson area", citySlug: "jackson-tn" }, { label: "Dyersburg", citySlug: "dyersburg-tn" }, { label: "Covington", citySlug: "covington-tn" }],
    services: ["Foundation repair", "Crawl space repair", "Waterproofing", "Concrete repair"],
  },
  {
    abbr: "AR",
    name: "Arkansas",
    tagline: "Serving Little Rock, Jonesboro, and surrounding communities.",
    polygon: [[36.50,-94.62], [36.50,-90.15], [36.00,-90.15], [36.00,-89.69], [35.50,-90.20], [35.00,-90.30], [34.50,-90.60], [34.00,-90.90], [33.50,-91.10], [33.00,-91.20], [33.00,-94.04], [33.55,-94.04], [33.55,-94.47]],
    center: [34.90, -92.20], zoom: 7,
    metros: [{ label: "Little Rock metro", citySlug: "little-rock-ar" }, { label: "Jonesboro", citySlug: "jonesboro-ar" }, { label: "Conway", citySlug: "conway-ar" }, { label: "West Memphis", citySlug: "west-memphis-ar" }],
    services: ["Foundation repair", "Crawl space repair", "Concrete repair"],
  },
  {
    abbr: "MS",
    name: "Mississippi",
    tagline: "DeSoto County south through the Delta and into the Golden Triangle.",
    polygon: [[35.00,-90.30], [35.00,-88.20], [34.00,-88.20], [33.00,-88.40], [32.00,-88.40], [31.00,-88.40], [30.69,-88.44], [30.19,-89.30], [30.19,-89.59], [31.00,-89.69], [31.00,-91.60], [31.50,-91.50], [32.00,-91.20], [32.50,-91.10], [33.00,-91.20], [33.50,-91.10], [34.00,-90.90], [34.50,-90.60]],
    center: [33.60, -89.60], zoom: 7,
    metros: [{ label: "Southaven / DeSoto", citySlug: "southaven-ms" }, { label: "Oxford", citySlug: "oxford-ms" }, { label: "Tupelo", citySlug: "tupelo-ms" }, { label: "Columbus", citySlug: "columbus-ms" }],
    services: ["Crawl space repair", "Waterproofing", "Mold prevention"],
  },
  {
    abbr: "MO",
    name: "Missouri",
    tagline: "The Bootheel — Dunklin and Pemiscot counties.",
    polygon: [[40.57,-95.77], [40.57,-91.70], [40.40,-91.40], [39.70,-91.10], [38.90,-90.20], [38.00,-89.91], [37.00,-89.40], [36.50,-89.49], [36.20,-89.59], [36.00,-89.69], [36.00,-90.15], [36.50,-90.15], [36.50,-94.62], [39.01,-94.62], [39.10,-94.91], [39.99,-95.30]],
    center: [36.20, -89.90], zoom: 9,
    metros: [{ label: "Kennett", citySlug: "kennett-mo" }, { label: "Caruthersville", citySlug: "caruthersville-mo" }, { label: "Hayti", citySlug: "hayti-mo" }, { label: "Steele", citySlug: "steele-mo" }],
    services: ["Foundation repair", "Crawl space repair"],
  },
];

export const STATE_NAME: Record<StateAbbr, string> = {
  TN: "Tennessee", AR: "Arkansas", MS: "Mississippi", MO: "Missouri",
};

// ─── Anchor cities plotted on the map ─────────────────────────────────────────
export const CITY_MARKERS: CityMarker[] = [
  { name: "Memphis",         state: "TN", pos: [35.15, -90.05] },
  { name: "Jackson",         state: "TN", pos: [35.61, -88.81] },
  { name: "Dyersburg",       state: "TN", pos: [36.03, -89.39] },
  { name: "Covington",       state: "TN", pos: [35.56, -89.65] },
  { name: "Jonesboro",       state: "AR", pos: [35.84, -90.70] },
  { name: "Little Rock",     state: "AR", pos: [34.75, -92.29] },
  { name: "Conway",          state: "AR", pos: [35.09, -92.44] },
  { name: "West Memphis",    state: "AR", pos: [35.15, -90.18] },
  { name: "Southaven",       state: "MS", pos: [34.99, -90.01] },
  { name: "Oxford",          state: "MS", pos: [34.37, -89.52] },
  { name: "Tupelo",          state: "MS", pos: [34.26, -88.70] },
  { name: "Columbus",        state: "MS", pos: [33.50, -88.43] },
  { name: "Kennett",         state: "MO", pos: [36.24, -90.06] },
  { name: "Caruthersville",  state: "MO", pos: [36.19, -89.66] },
  { name: "Hayti",           state: "MO", pos: [36.23, -89.75] },
];

// ─── Cities with their own landing page (were linked on the legacy site) ──────
export const CITY_PAGES = new Set<string>([
  "stuttgart", "mountain-home", "success", "jonesboro", "bono", "brookland", "cash",
  "crawfordsville", "marion", "proctor", "west-memphis", "wynne", "conway", "greenbrier",
  "hot-springs-national-park", "hot-springs-village", "paragould", "batesville", "rosie",
  "horseshoe-bend", "melbourne", "newport", "jefferson", "pine-bluff", "redfield", "white-hall",
  "alicia", "austin", "cabot", "carlisle", "coy", "england", "lonoke", "blytheville",
  "burdette", "driver", "osceola", "wilson", "monroe", "helena", "west-helena", "harrisburg",
  "marked-tree", "weiner", "jacksonville", "little-rock", "maumelle", "north-little-rock",
  "roland", "scott", "sherwood", "pocahontas", "colt", "forrest-city", "cherokee-village",
  "hardy", "beebe", "garner", "judsonia", "searcy", "west-point", "campbell", "corinth",
  "ashland", "hickory-flat", "bovie", "cleveland", "shelby", "bruce", "carrollton", "okolona",
  "west-point-ms", "clarksdale", "hernando", "horn-lake", "nesbit", "olive-branch",
  "southaven", "walls", "grenada", "mantachie", "nettleton", "lafayette", "oxford",
  "university", "baldwyn", "belden", "guntown", "saltillo", "tupelo", "verona", "greenwood",
  "columbus", "byhalia", "holly-springs", "potts-camp", "amory", "starkville", "batesville-ms",
  "como", "sardis", "pontotoc", "booneville", "marks", "ruleville", "charleston", "coldwater",
  "senatobia", "ripley", "burnsville", "dennis", "iuka", "tunica", "blue-springs", "myrtle",
  "new-albany", "greenville", "eupora", "water-valley", "oakland", "alamo", "bells",
  "friendship", "dyersburg", "fayette", "gallaway", "macon", "moscow", "oakland-tn",
  "rossville", "somerville", "williston", "bolivar", "middleton", "pocahontas-tn",
  "savannah", "brownsville", "stanton", "halls", "henning", "adamsville", "guys", "michie",
  "ramer", "selmer", "union-city", "arlington", "bartlett", "collierville", "cordova", "eads",
  "germantown", "millington", "atoka", "brighton", "burlison", "covington", "drummonds",
  "mason", "munford", "tipton",
]);

// ─── Counties ─────────────────────────────────────────────────────────────────
export const COUNTIES: County[] = [
  // ── Arkansas ────────────────────────────────────────────────────────────────
  { name: "Arkansas", state: "AR", cities: ["Almyra", "Casscoe", "Crocketts Bluff", "De Witt", "Ethel", "Gillett", "Saint Charles", "Stuttgart", "Tichnor"] },
  { name: "Baxter", state: "AR", cities: ["Big Flat", "Clarkridge", "Cotter", "Gamaliel", "Gassville", "Henderson", "Midway", "Mountain Home", "Norfork"] },
  { name: "Clay", state: "AR", cities: ["Corning", "Datto", "Greenway", "Knobel", "Mc Dougal", "Peach Orchard", "Piggott", "Pollard", "Rector", "Saint Francis", "Success"] },
  { name: "Cleburne", state: "AR", cities: ["Concord", "Drasco", "Edgemont", "Heber Springs", "Higden", "Ida", "Prim", "Quitman", "Tumbling Shoals", "Wilburn"] },
  { name: "Conway", state: "AR", cities: ["Center Ridge", "Cleveland", "Hattieville", "Jerusalem", "Menifee", "Morrilton", "Plumerville", "Solgohachia", "Springfield"] },
  { name: "Craighead", state: "AR", cities: ["Bay", "Black Oak", "Bono", "Brookland", "Caraway", "Cash", "Egypt", "Jonesboro", "Lake City", "Monette", "State University"] },
  { name: "Crittenden", state: "AR", cities: ["Clarkedale", "Crawfordsville", "Earle", "Edmondson", "Gilmore", "Marion", "Proctor", "Turrell", "West Memphis"] },
  { name: "Cross", state: "AR", cities: ["Cherry Valley", "Hickory Ridge", "Parkin", "Vanndale", "Wynne"] },
  { name: "Faulkner", state: "AR", cities: ["Conway", "Enola", "Greenbrier", "Guy", "Mayflower", "Mount Vernon", "Vilonia", "Wooster"] },
  { name: "Fulton", state: "AR", cities: ["Bexar", "Camp", "Elizabeth", "Gepp", "Glencoe", "Mammoth Spring", "Salem", "Sturkie", "Viola"] },
  { name: "Garland", state: "AR", cities: ["Hot Springs National Park", "Hot Springs Village", "Jessieville", "Mountain Pine", "Pearcy", "Royal"] },
  { name: "Greene", state: "AR", cities: ["Beech Grove", "Delaplaine", "Lafe", "Marmaduke", "Paragould", "Walcott"] },
  { name: "Hot Spring", state: "AR", cities: ["Bismarck", "Bonnerdale", "Donaldson", "Friendship"] },
  { name: "Independence", state: "AR", cities: ["Batesville", "Charlotte", "Cord", "Cushman", "Desha", "Floral", "Locust Grove", "Magness", "Newark", "Oil Trough", "Pleasant Plains", "Rosie", "Salado", "Sulphur Rock", "Thida"] },
  { name: "Izard", state: "AR", cities: ["Brockwell", "Calico Rock", "Dolph", "Franklin", "Guion", "Horseshoe Bend", "Melbourne", "Mount Pleasant", "Oxford", "Pineville", "Sage", "Violet Hill", "Wideman", "Wiseman"] },
  { name: "Jackson", state: "AR", cities: ["Amagon", "Beedeville", "Diaz", "Grubbs", "Jacksonport", "Newport", "Swifton", "Tuckerman", "Tupelo"] },
  { name: "Jefferson", state: "AR", cities: ["Altheimer", "Humphrey", "Jefferson", "Moscow", "Pine Bluff", "Redfield", "Reydell", "Sherrill", "Tucker", "Wabbaseka", "White Hall", "Wright"] },
  { name: "Lawrence", state: "AR", cities: ["Alicia", "Black Rock", "Hoxie", "Imboden", "Lynn", "Minturn", "Portia", "Powhatan", "Ravenden", "Saffell", "Sedgwick", "Smithville", "Strawberry", "Walnut Ridge"] },
  { name: "Lee", state: "AR", cities: ["Aubrey", "Brickeys", "Haynes", "La Grange", "Marianna", "Moro"] },
  { name: "Lonoke", state: "AR", cities: ["Austin", "Cabot", "Carlisle", "Coy", "England", "Humnoke", "Keo", "Lonoke", "Ward"] },
  { name: "Mississippi", state: "AR", cities: ["Armorel", "Bassett", "Blytheville", "Burdette", "Dell", "Driver", "Dyess", "Etowah", "Frenchmans Bayou", "Gosnell", "Joiner", "Keiser", "Leachville", "Luxora", "Manila", "Osceola", "West Ridge", "Wilson"] },
  { name: "Monroe", state: "AR", cities: ["Brinkley", "Clarendon", "Holly Grove", "Monroe", "Roe"] },
  { name: "Montgomery", state: "AR", cities: ["Caddo Gap", "Mount Ida", "Norman", "Oden", "Pencil Bluff", "Sims", "Story"] },
  { name: "Perry", state: "AR", cities: ["Adona", "Bigelow", "Casa", "Houston", "Perry", "Perryville"] },
  { name: "Phillips", state: "AR", cities: ["Barton", "Crumrod", "Elaine", "Helena", "Lambrook", "Lexa", "Marvell", "Mellwood", "Oneida", "Poplar Grove", "West Helena"] },
  { name: "Poinsett", state: "AR", cities: ["Fisher", "Harrisburg", "Lepanto", "Marked Tree", "Rivervale", "Trumann", "Tyronza", "Waldenburg", "Weiner"] },
  { name: "Prairie", state: "AR", cities: ["Biscoe", "De Valls Bluff", "Des Arc", "Hazen", "Hickory Plains", "Ulm"] },
  { name: "Pulaski", state: "AR", cities: ["College Station", "Jacksonville", "Little Rock", "Little Rock Air Force Base", "Maumelle", "North Little Rock", "Roland", "Scott", "Sherwood", "Sweet Home", "Woodson", "Wrightsville"] },
  { name: "Randolph", state: "AR", cities: ["Biggers", "Maynard", "O Kean", "Pocahontas", "Ravenden Springs", "Reyno", "Warm Springs"] },
  { name: "Saint Francis", state: "AR", cities: ["Caldwell", "Colt", "Forrest City", "Goodwin", "Heth", "Hughes", "Madison", "Palestine", "Wheatley", "Widener"] },
  { name: "Saline", state: "AR", cities: ["Paron"] },
  { name: "Sharp", state: "AR", cities: ["Ash Flat", "Cherokee Village", "Evening Shade", "Hardy", "Poughkeepsie", "Sidney", "Williford"] },
  { name: "Stone", state: "AR", cities: ["Fifty Six", "Fox", "Marcella", "Mountain View", "Onia", "Pleasant Grove", "Timbo"] },
  { name: "Van Buren", state: "AR", cities: ["Bee Branch", "Choctaw", "Clinton", "Damascus", "Dennard", "Fairfield Bay", "Scotland", "Shirley"] },
  { name: "White", state: "AR", cities: ["Bald Knob", "Beebe", "Bradford", "El Paso", "Garner", "Griffithville", "Higginson", "Judsonia", "Kensett", "Letona", "Mc Rae", "Pangburn", "Romance", "Rose Bud", "Russell", "Searcy", "West Point"] },
  { name: "Woodruff", state: "AR", cities: ["Augusta", "Cotton Plant", "Gregory", "Hunter", "Mc Crory", "Patterson"] },
  { name: "Yell", state: "AR", cities: ["Belleville", "Bluffton", "Briggsville", "Centerville", "Danville", "Dardanelle", "Gravelly", "Havana", "Ola", "Plainview", "Rover"] },

  // ── Missouri ────────────────────────────────────────────────────────────────
  { name: "Dunklin", state: "MO", cities: ["Arbyrd", "Campbell", "Cardwell", "Clarkton", "Holcomb", "Hornersville", "Kennett", "Senath"] },
  { name: "Pemiscot", state: "MO", cities: ["Bragg City", "Caruthersville", "Gobler", "Hayti", "Steele", "Wardell"] },

  // ── Mississippi ─────────────────────────────────────────────────────────────
  { name: "Alcorn", state: "MS", cities: ["Corinth", "Glen", "Rienzi"] },
  { name: "Attala", state: "MS", cities: ["Mc Adams"] },
  { name: "Benton", state: "MS", cities: ["Ashland", "Hickory Flat", "Michigan City"] },
  { name: "Bolivar", state: "MS", cities: ["Alligator", "Benoit", "Beulah", "Boyle", "Cleveland", "Duncan", "Gunnison", "Merigold", "Mound Bayou", "Pace", "Rosedale", "Scott", "Shaw", "Shelby", "Winstonville"] },
  { name: "Calhoun", state: "MS", cities: ["Banner", "Big Creek", "Bruce", "Calhoun City", "Derma", "Pittsboro", "Slate Spring", "Vardaman"] },
  { name: "Carroll", state: "MS", cities: ["Carrollton", "Mc Carley", "North Carrollton"] },
  { name: "Chickasaw", state: "MS", cities: ["Houlka", "Houston", "Okolona", "Trebloc", "Van Vleet", "Woodland"] },
  { name: "Clay", state: "MS", cities: ["Cedarbluff", "Montpelier", "Pheba", "West Point"] },
  { name: "Coahoma", state: "MS", cities: ["Clarksdale", "Coahoma", "Dublin", "Farrell", "Friars Point", "Jonestown", "Lula", "Lyon", "Rena Lara", "Sherard"] },
  { name: "Desoto", state: "MS", cities: ["Hernando", "Horn Lake", "Lake Cormorant", "Nesbit", "Olive Branch", "Southaven", "Walls"] },
  { name: "Grenada", state: "MS", cities: ["Elliott", "Gore Springs", "Grenada", "Holcomb", "Tie Plant"] },
  { name: "Itawamba", state: "MS", cities: ["Fulton", "Mantachie", "Nettleton", "Tremont"] },
  { name: "Lafayette", state: "MS", cities: ["Abbeville", "Oxford", "Paris", "Taylor", "Toccopola", "University"] },
  { name: "Lee", state: "MS", cities: ["Baldwyn", "Belden", "Guntown", "Mooreville", "Plantersville", "Saltillo", "Shannon", "Tupelo", "Verona"] },
  { name: "Leflore", state: "MS", cities: ["Greenwood", "Itta Bena", "Minter City", "Schlater", "Swiftown"] },
  { name: "Lowndes", state: "MS", cities: ["Artesia", "Caledonia", "Columbus", "Crawford", "Mayhew", "Steens"] },
  { name: "Madison", state: "MS", cities: ["Sharon"] },
  { name: "Marshall", state: "MS", cities: ["Byhalia", "Holly Springs", "Lamar", "Mount Pleasant", "Potts Camp", "Red Banks", "Victoria", "Waterford"] },
  { name: "Monroe", state: "MS", cities: ["Aberdeen", "Amory", "Becker", "Gattman", "Greenwood Springs", "Hamilton", "Prairie", "Smithville"] },
  { name: "Montgomery", state: "MS", cities: ["Duck Hill", "Kilmichael", "Stewart", "Winona"] },
  { name: "Oktibbeha", state: "MS", cities: ["Mississippi State", "Starkville"] },
  { name: "Panola", state: "MS", cities: ["Batesville", "Como", "Courtland", "Crenshaw", "Pope", "Sarah", "Sardis"] },
  { name: "Pontotoc", state: "MS", cities: ["Algoma", "Ecru", "Pontotoc", "Randolph", "Sherman", "Thaxton"] },
  { name: "Prentiss", state: "MS", cities: ["Booneville", "Marietta", "New Site", "Wheeler"] },
  { name: "Quitman", state: "MS", cities: ["Crowder", "Darling", "Lambert", "Marks", "Sledge", "Vance"] },
  { name: "Sunflower", state: "MS", cities: ["Doddsville", "Drew", "Indianola", "Moorhead", "Parchman", "Rome", "Ruleville", "Sunflower"] },
  { name: "Tallahatchie", state: "MS", cities: ["Cascilla", "Charleston", "Enid", "Glendora", "Philipp", "Sumner", "Tippo", "Tutwiler", "Webb"] },
  { name: "Tate", state: "MS", cities: ["Arkabutla", "Coldwater", "Independence", "Senatobia"] },
  { name: "Tippah", state: "MS", cities: ["Blue Mountain", "Dumas", "Falkner", "Ripley", "Tiplersville", "Walnut"] },
  { name: "Tishomingo", state: "MS", cities: ["Belmont", "Burnsville", "Dennis", "Golden", "Iuka", "Tishomingo"] },
  { name: "Tunica", state: "MS", cities: ["Dundee", "Robinsonville", "Sledge", "Tunica"] },
  { name: "Union", state: "MS", cities: ["Blue Springs", "Etta", "Myrtle", "New Albany"] },
  { name: "Washington", state: "MS", cities: ["Greenville", "Leland", "Metcalfe"] },
  { name: "Webster", state: "MS", cities: ["Bellefontaine", "Eupora", "Maben", "Mantee", "Mathiston", "Walthall"] },
  { name: "Yalobusha", state: "MS", cities: ["Coffeeville", "Oakland", "Scobey", "Tillatoba", "Water Valley"] },

  // ── Tennessee ───────────────────────────────────────────────────────────────
  { name: "Crockett", state: "TN", cities: ["Alamo", "Bells", "Crockett Mills", "Friendship", "Fruitvale", "Gadsden", "Maury City"] },
  { name: "Dyer", state: "TN", cities: ["Bogota", "Dyersburg", "Finley", "Lenox", "Newbern", "Tigrett", "Trimble"] },
  { name: "Fayette", state: "TN", cities: ["Braden", "Gallaway", "La Grange", "Laconia", "Macon", "Moscow", "Oakland", "Rossville", "Somerville", "Williston"] },
  { name: "Hardeman", state: "TN", cities: ["Bolivar", "Grand Junction", "Hickory Valley", "Hornsby", "Middleton", "Pocahontas", "Saulsbury", "Silerton", "Toone", "Whiteville"] },
  { name: "Hardin", state: "TN", cities: ["Counce", "Crump", "Morris Chapel", "Savannah", "Shiloh"] },
  { name: "Haywood", state: "TN", cities: ["Brownsville", "Stanton"] },
  { name: "Lake", state: "TN", cities: ["Ridgely", "Tiptonville", "Wynnburg"] },
  { name: "Lauderdale", state: "TN", cities: ["Gates", "Halls", "Henning", "Ripley"] },
  { name: "Madison", state: "TN", cities: ["Denmark", "Medon", "Mercer"] },
  { name: "Mcnairy", state: "TN", cities: ["Adamsville", "Bethel Springs", "Guys", "Michie", "Ramer", "Selmer", "Stantonville"] },
  { name: "Obion", state: "TN", cities: ["Hornbeak", "Obion", "Rives", "Samburg", "South Fulton", "Troy", "Union City", "Woodland Mills"] },
  { name: "Shelby", state: "TN", cities: ["Arlington", "Bartlett", "Brunswick", "Collierville", "Cordova", "Eads", "Ellendale", "Germantown", "Memphis", "Millington"] },
  { name: "Tipton", state: "TN", cities: ["Atoka", "Brighton", "Burlison", "Covington", "Drummonds", "Mason", "Munford", "Tipton"] },
];

// ─── Derived indexes ──────────────────────────────────────────────────────────
export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export type CityRecord = {
  name: string;
  slug: string;
  county: string;
  state: StateAbbr;
  stateName: string;
  hasPage: boolean;
};

/** Flat, searchable list of every city we serve. */
export const ALL_CITIES: CityRecord[] = COUNTIES.flatMap((county) =>
  county.cities.map((city) => ({
    name: city,
    slug: slugify(`${city}-${county.state}`),
    county: county.name,
    state: county.state,
    stateName: STATE_NAME[county.state],
    hasPage: CITY_PAGES.has(slugify(city)),
  }))
);

export const countiesByState = (abbr: StateAbbr) =>
  COUNTIES.filter((c) => c.state === abbr).sort((a, b) => a.name.localeCompare(b.name));

export const cityCountByState = (abbr: StateAbbr) =>
  COUNTIES.filter((c) => c.state === abbr).reduce((n, c) => n + c.cities.length, 0);

export const CITY_BY_SLUG: Record<string, CityRecord> = Object.fromEntries(
  ALL_CITIES.map((c) => [c.slug, c])
);

export const TOTAL_CITIES = ALL_CITIES.length;
export const TOTAL_COUNTIES = COUNTIES.length;

/** Search across city, county and state. Returns best matches first. */
export function searchAreas(query: string, limit = 8): CityRecord[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  // Numeric query: match against known ZIP codes first (only the cities we've
  // inventoried carry a ZIP today — see CITY_CONTENT / CITY_ZIPS below).
  if (/^\d+$/.test(q)) {
    const bySlug = new Map<string, string>();
    for (const [slug, c] of Object.entries(CITY_CONTENT)) bySlug.set(slug, c.zip);
    for (const [slug, zip] of Object.entries(CITY_ZIPS)) if (!bySlug.has(slug)) bySlug.set(slug, zip);
    const hits: CityRecord[] = [];
    for (const [slug, zip] of bySlug) {
      if (zip.startsWith(q)) {
        const city = CITY_BY_SLUG[slug];
        if (city) hits.push(city);
      }
      if (hits.length >= limit) break;
    }
    if (hits.length > 0) return hits;
  }

  const starts: CityRecord[] = [];
  const contains: CityRecord[] = [];
  for (const c of ALL_CITIES) {
    const name = c.name.toLowerCase();
    if (name.startsWith(q)) starts.push(c);
    else if (name.includes(q) || c.county.toLowerCase().startsWith(q)) contains.push(c);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCATION-LINKED CONTENT
//
// Every proof item declares the city slug it belongs to. A city page filters on
// `citySlug`; a county or state page widens the filter using ALL_CITIES. This is
// the join the CMS needs — no hardcoded "pull the first 4" per template.
// ─────────────────────────────────────────────────────────────────────────────

export type ProofKind = "job-story" | "review" | "case-study";

export type LocalProof = {
  kind: ProofKind;
  citySlug: string;
  city: string;
  state: StateAbbr;
  zip: string;
  title: string;
  body: string;
  meta: string;
  service: string;
};

export const LOCAL_PROOF: LocalProof[] = [
  {
    kind: "job-story", citySlug: "memphis-tn", zip: "38104", city: "Memphis", state: "TN",
    title: "6 broken joists, 2-day turnaround", service: "Crawl Space",
    body: "Homeowner noticed soft spots in the floor. Inspection revealed 6 broken joists and active mold. Full SmartJack system plus encapsulation.",
    meta: "March 2026 · 2 days",
  },
  {
    kind: "review", citySlug: "collierville-tn", zip: "38017", city: "Collierville", state: "TN",
    title: "Elizabeth N.", service: "Foundation",
    body: "The crew were excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "germantown-tn", zip: "38139", city: "Germantown", state: "TN",
    title: "Pool deck lifted in 4 hours", service: "Concrete",
    body: "Pool deck had sunk 3 inches on one side. PolyLevel injection lifted and leveled it the same morning — no demolition, no mess.",
    meta: "2025 · Same-day completion",
  },
  {
    kind: "job-story", citySlug: "jonesboro-ar", zip: "72401", city: "Jonesboro", state: "AR",
    title: "6 push piers driven to bedrock", service: "Foundation",
    body: "Clay soil movement confirmed after three contractors disagreed on the cause. Foundation stabilized with a lifetime transferable warranty.",
    meta: "February 2026 · 1 day",
  },
  {
    kind: "review", citySlug: "marked-tree-ar", zip: "72365", city: "Marked Tree", state: "AR",
    title: "Melissa & Russell C.", service: "Crawl Space",
    body: "Walking in now, it's straight. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "little-rock-ar", zip: "72201", city: "Little Rock", state: "AR",
    title: "Driveway void filled, surface restored", service: "Concrete",
    body: "A 3-inch void under the driveway slab had been growing for five years. Foam-leveled in half a day for less than the homeowner expected.",
    meta: "2024 · 4 hours",
  },
  {
    kind: "job-story", citySlug: "southaven-ms", zip: "38671", city: "Southaven", state: "MS",
    title: "Encapsulation cut energy bills 18%", service: "Crawl Space",
    body: "Vapor barrier, drainage matting, dehumidifier and foam-sealed rim joists. The musty smell was gone within the week.",
    meta: "November 2025 · 2 days",
  },
  {
    kind: "review", citySlug: "olive-branch-ms", zip: "38654", city: "Olive Branch", state: "MS",
    title: "Diana P.", service: "Waterproofing",
    body: "The inspector found water intrusion I didn't even know I had. Fixed it before it became a major problem. Grateful for the thoroughness.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "oxford-ms", zip: "38655", city: "Oxford", state: "MS",
    title: "150-year-old home, full encapsulation", service: "Crawl Space",
    body: "Moisture was buckling antique hardwood floors. CleanSpace barrier, SmartSump pump and a SaniDry dehumidifier protected the investment.",
    meta: "2025 · 3 days",
  },
  {
    kind: "job-story", citySlug: "kennett-mo", zip: "63857", city: "Kennett", state: "MO",
    title: "Wall anchors, no excavation", service: "Foundation",
    body: "A bowing basement wall stabilized with a wall anchor system. No yard excavation required and the crew finished in a single day.",
    meta: "June 2025 · 1 day",
  },
  {
    kind: "review", citySlug: "caruthersville-mo", zip: "63830", city: "Caruthersville", state: "MO",
    title: "Carol & James W.", service: "Foundation",
    body: "We were terrified about the cost. The free inspection made everything clear and the price was fair. Should have called sooner.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "hayti-mo", zip: "63851", city: "Hayti", state: "MO",
    title: "Bootheel crawl space dried out", service: "Waterproofing",
    body: "Seasonal flooding kept re-wetting the crawl space. Interior drainage plus a battery-backed sump has kept it dry through every storm since.",
    meta: "2024 · 2 days",
  },
];

export const proofForState = (abbr: StateAbbr) => LOCAL_PROOF.filter((p) => p.state === abbr);
export const proofForCity = (slug: string) => LOCAL_PROOF.filter((p) => p.citySlug === slug);

// ─────────────────────────────────────────────────────────────────────────────
// CITY-LEVEL CONTENT INVENTORY (panel level 2)
//
// What already exists on the legacy city pages, per city. Counts drive the
// "Content available" panel; `hint` is the one-line preview beside each row.
// Only cities we have actually inventoried appear here — everything else
// renders as "nothing published yet" rather than inventing numbers.
// ─────────────────────────────────────────────────────────────────────────────

export type CityContent = {
  zip: string;
  reviews: number;
  jobStories: number;
  caseStudies: number;
  projectGallery: number;
  hints?: Partial<Record<"reviews" | "jobStories" | "caseStudies" | "projectGallery", string>>;
};

export const CITY_CONTENT: Record<string, CityContent> = {
  // Inventoried from redeemersgroup.com/…/services-in-stuttgart-ar
  "stuttgart-ar": {
    zip: "72160", reviews: 4, jobStories: 3, caseStudies: 2, projectGallery: 3,
    hints: {
      reviews: "By Renee D. and others",
      jobStories: "Crawlspace, drainage…",
      caseStudies: "Remodel discovery",
      projectGallery: "Brick wall, gap repair",
    },
  },
  "memphis-tn":        { zip: "38104", reviews: 12, jobStories: 6, caseStudies: 4, projectGallery: 9, hints: { jobStories: "SmartJack, encapsulation" } },
  "collierville-tn":   { zip: "38017", reviews: 5,  jobStories: 2, caseStudies: 1, projectGallery: 3 },
  "germantown-tn":     { zip: "38138", reviews: 4,  jobStories: 1, caseStudies: 2, projectGallery: 4, hints: { caseStudies: "Pool deck leveling" } },
  "bartlett-tn":       { zip: "38133", reviews: 3,  jobStories: 1, caseStudies: 0, projectGallery: 2 },
  "jonesboro-ar":      { zip: "72401", reviews: 7,  jobStories: 3, caseStudies: 2, projectGallery: 5, hints: { jobStories: "Push piers to bedrock" } },
  "little-rock-ar":    { zip: "72201", reviews: 6,  jobStories: 2, caseStudies: 3, projectGallery: 4 },
  "conway-ar":         { zip: "72032", reviews: 3,  jobStories: 1, caseStudies: 1, projectGallery: 2 },
  "west-memphis-ar":   { zip: "72301", reviews: 2,  jobStories: 1, caseStudies: 0, projectGallery: 1 },
  "marked-tree-ar":    { zip: "72365", reviews: 2,  jobStories: 1, caseStudies: 1, projectGallery: 2 },
  "southaven-ms":      { zip: "38671", reviews: 8,  jobStories: 4, caseStudies: 2, projectGallery: 6, hints: { jobStories: "Encapsulation, rim joists" } },
  "olive-branch-ms":   { zip: "38654", reviews: 5,  jobStories: 2, caseStudies: 1, projectGallery: 3 },
  "hernando-ms":       { zip: "38632", reviews: 3,  jobStories: 1, caseStudies: 1, projectGallery: 2 },
  "oxford-ms":         { zip: "38655", reviews: 4,  jobStories: 2, caseStudies: 3, projectGallery: 5, hints: { caseStudies: "150-year-old home" } },
  "tupelo-ms":         { zip: "38801", reviews: 3,  jobStories: 1, caseStudies: 1, projectGallery: 2 },
  "columbus-ms":       { zip: "39701", reviews: 2,  jobStories: 1, caseStudies: 0, projectGallery: 1 },
  "kennett-mo":        { zip: "63857", reviews: 3,  jobStories: 2, caseStudies: 1, projectGallery: 2, hints: { jobStories: "Wall anchors, no dig" } },
  "caruthersville-mo": { zip: "63830", reviews: 2,  jobStories: 1, caseStudies: 1, projectGallery: 1 },
  "hayti-mo":          { zip: "63851", reviews: 1,  jobStories: 1, caseStudies: 1, projectGallery: 1 },
};

/** ZIPs for cities we know, whether or not they have content yet. */
export const CITY_ZIPS: Record<string, string> = {
  "searcy-ar": "72143", "paragould-ar": "72450", "blytheville-ar": "72315",
  "pine-bluff-ar": "71601", "batesville-ar": "72501", "mountain-home-ar": "72653",
  "forrest-city-ar": "72335", "osceola-ar": "72370", "wynne-ar": "72396",
  "cordova-tn": "38016", "millington-tn": "38053", "covington-tn": "38019",
  "dyersburg-tn": "38024", "union-city-tn": "38261", "brownsville-tn": "38012",
  "bolivar-tn": "38008", "savannah-tn": "38372", "selmer-tn": "38375",
  "horn-lake-ms": "38637", "starkville-ms": "39759", "corinth-ms": "38834",
  "clarksdale-ms": "38614", "greenville-ms": "38701", "greenwood-ms": "38930",
  "grenada-ms": "38901", "senatobia-ms": "38668", "batesville-ms": "38606",
  "new-albany-ms": "38652", "holly-springs-ms": "38635", "steele-mo": "63877",
};


/** Coordinates for every city that has content — used to drop map pins. */
export const CITY_COORDS: Record<string, LatLng> = {
  "stuttgart-ar":      [34.50, -91.55],
  "memphis-tn":        [35.15, -90.05],
  "collierville-tn":   [35.04, -89.66],
  "germantown-tn":     [35.09, -89.81],
  "bartlett-tn":       [35.20, -89.87],
  "jonesboro-ar":      [35.84, -90.70],
  "little-rock-ar":    [34.75, -92.29],
  "conway-ar":         [35.09, -92.44],
  "west-memphis-ar":   [35.15, -90.18],
  "marked-tree-ar":    [35.53, -90.42],
  "southaven-ms":      [34.99, -90.01],
  "olive-branch-ms":   [34.96, -89.83],
  "hernando-ms":       [34.82, -89.99],
  "oxford-ms":         [34.37, -89.52],
  "tupelo-ms":         [34.26, -88.70],
  "columbus-ms":       [33.50, -88.43],
  "kennett-mo":        [36.24, -90.06],
  "caruthersville-mo": [36.19, -89.66],
  "hayti-mo":          [36.23, -89.75],
};

export const coordsForCity = (slug: string) => CITY_COORDS[slug];

export const zipForCity = (slug: string) => CITY_CONTENT[slug]?.zip ?? CITY_ZIPS[slug];
export const contentForCity = (slug: string) => CITY_CONTENT[slug];
