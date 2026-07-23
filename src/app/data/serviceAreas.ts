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

export type StateInfo = {
  abbr: StateAbbr;
  name: string;
  tagline: string;
  /** Simplified geographic outline, projected into the shared 1010×910 viewBox. */
  path: string;
  /** Label anchor inside the shape. */
  labelX: number;
  labelY: number;
};

export type CityMarker = { name: string; state: StateAbbr; x: number; y: number };

// ─── States ───────────────────────────────────────────────────────────────────
export const STATES: StateInfo[] = [
  {
    abbr: "TN",
    name: "Tennessee",
    tagline: "Home base. Memphis metro and West Tennessee, top to bottom.",
    path: "M444,352 L546,352 L996,343 L993,369 L901,404 L838,438 L810,464 L808,481 L387,481 L398,447 L415,412 L430,378 Z",
    labelX: 700, labelY: 415,
  },
  {
    abbr: "AR",
    name: "Arkansas",
    tagline: "Jonesboro, Little Rock and the Delta counties across the river.",
    path: "M83,352 L398,352 L398,395 L430,395 L394,438 L387,481 L366,524 L345,567 L331,610 L324,653 L124,653 L124,606 L94,606 Z",
    labelX: 210, labelY: 490,
  },
  {
    abbr: "MS",
    name: "Mississippi",
    tagline: "DeSoto County south through the Delta and into the Golden Triangle.",
    path: "M387,481 L535,481 L535,567 L521,653 L521,739 L521,825 L518,851 L458,894 L437,894 L430,825 L296,825 L303,782 L324,739 L331,696 L324,653 L331,610 L345,567 L366,524 Z",
    labelX: 425, labelY: 690,
  },
  {
    abbr: "MO",
    name: "Missouri",
    tagline: "The Bootheel — Dunklin and Pemiscot counties.",
    path: "M2,3 L289,3 L310,17 L331,77 L394,146 L415,223 L451,309 L444,352 L437,378 L430,395 L398,395 L398,352 L83,352 L83,137 L63,129 L35,52 Z",
    labelX: 210, labelY: 190,
  },
];

export const STATE_NAME: Record<StateAbbr, string> = {
  TN: "Tennessee", AR: "Arkansas", MS: "Mississippi", MO: "Missouri",
};

// ─── Anchor cities plotted on the map ─────────────────────────────────────────
export const CITY_MARKERS: CityMarker[] = [
  { name: "Memphis",         state: "TN", x: 405, y: 468 },
  { name: "Jackson",         state: "TN", x: 492, y: 429 },
  { name: "Jonesboro",       state: "AR", x: 359, y: 409 },
  { name: "Little Rock",     state: "AR", x: 247, y: 503 },
  { name: "Southaven",       state: "MS", x: 408, y: 486 },
  { name: "Oxford",          state: "MS", x: 442, y: 535 },
  { name: "Tupelo",          state: "MS", x: 500, y: 545 },
  { name: "Columbus",        state: "MS", x: 519, y: 610 },
  { name: "Kennett",         state: "MO", x: 404, y: 375 },
  { name: "Caruthersville",  state: "MO", x: 420, y: 372 },
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

export const TOTAL_CITIES = ALL_CITIES.length;
export const TOTAL_COUNTIES = COUNTIES.length;

/** Search across city, county and state. Returns best matches first. */
export function searchAreas(query: string, limit = 8): CityRecord[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
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
  title: string;
  body: string;
  meta: string;
  service: string;
};

export const LOCAL_PROOF: LocalProof[] = [
  {
    kind: "job-story", citySlug: "memphis-tn", city: "Memphis", state: "TN",
    title: "6 broken joists, 2-day turnaround", service: "Crawl Space",
    body: "Homeowner noticed soft spots in the floor. Inspection revealed 6 broken joists and active mold. Full SmartJack system plus encapsulation.",
    meta: "March 2026 · 2 days",
  },
  {
    kind: "review", citySlug: "collierville-tn", city: "Collierville", state: "TN",
    title: "Elizabeth N.", service: "Foundation",
    body: "The crew were excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "germantown-tn", city: "Germantown", state: "TN",
    title: "Pool deck lifted in 4 hours", service: "Concrete",
    body: "Pool deck had sunk 3 inches on one side. PolyLevel injection lifted and leveled it the same morning — no demolition, no mess.",
    meta: "2025 · Same-day completion",
  },
  {
    kind: "job-story", citySlug: "jonesboro-ar", city: "Jonesboro", state: "AR",
    title: "6 push piers driven to bedrock", service: "Foundation",
    body: "Clay soil movement confirmed after three contractors disagreed on the cause. Foundation stabilized with a lifetime transferable warranty.",
    meta: "February 2026 · 1 day",
  },
  {
    kind: "review", citySlug: "marked-tree-ar", city: "Marked Tree", state: "AR",
    title: "Melissa & Russell C.", service: "Crawl Space",
    body: "Walking in now, it's straight. I went into my bedroom — the closet door never closed before. I literally just closed it for the first time.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "little-rock-ar", city: "Little Rock", state: "AR",
    title: "Driveway void filled, surface restored", service: "Concrete",
    body: "A 3-inch void under the driveway slab had been growing for five years. Foam-leveled in half a day for less than the homeowner expected.",
    meta: "2024 · 4 hours",
  },
  {
    kind: "job-story", citySlug: "southaven-ms", city: "Southaven", state: "MS",
    title: "Encapsulation cut energy bills 18%", service: "Crawl Space",
    body: "Vapor barrier, drainage matting, dehumidifier and foam-sealed rim joists. The musty smell was gone within the week.",
    meta: "November 2025 · 2 days",
  },
  {
    kind: "review", citySlug: "olive-branch-ms", city: "Olive Branch", state: "MS",
    title: "Diana P.", service: "Waterproofing",
    body: "The inspector found water intrusion I didn't even know I had. Fixed it before it became a major problem. Grateful for the thoroughness.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "oxford-ms", city: "Oxford", state: "MS",
    title: "150-year-old home, full encapsulation", service: "Crawl Space",
    body: "Moisture was buckling antique hardwood floors. CleanSpace barrier, SmartSump pump and a SaniDry dehumidifier protected the investment.",
    meta: "2025 · 3 days",
  },
  {
    kind: "job-story", citySlug: "kennett-mo", city: "Kennett", state: "MO",
    title: "Wall anchors, no excavation", service: "Foundation",
    body: "A bowing basement wall stabilized with a wall anchor system. No yard excavation required and the crew finished in a single day.",
    meta: "June 2025 · 1 day",
  },
  {
    kind: "review", citySlug: "caruthersville-mo", city: "Caruthersville", state: "MO",
    title: "Carol & James W.", service: "Foundation",
    body: "We were terrified about the cost. The free inspection made everything clear and the price was fair. Should have called sooner.",
    meta: "5 stars · Verified customer",
  },
  {
    kind: "case-study", citySlug: "hayti-mo", city: "Hayti", state: "MO",
    title: "Bootheel crawl space dried out", service: "Waterproofing",
    body: "Seasonal flooding kept re-wetting the crawl space. Interior drainage plus a battery-backed sump has kept it dry through every storm since.",
    meta: "2024 · 2 days",
  },
];

export const proofForState = (abbr: StateAbbr) => LOCAL_PROOF.filter((p) => p.state === abbr);
export const proofForCity = (slug: string) => LOCAL_PROOF.filter((p) => p.citySlug === slug);
