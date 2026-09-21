// ─── Customer reviews — shared source of truth ───────────────────────────────
// Moved out of ReviewsPage so the listing, the testimonial rails on other
// pages and the review detail page (work/review/<slug>) all read one list.
import imgRevThumb1 from "../../assets/rev-thumb1.jpg";
import imgRevThumb2 from "../../assets/rev-thumb2.jpg";
import imgRevThumb3 from "../../assets/rev-thumb3.jpg";
import imgRevAvatar from "../../assets/rev-avatar.png";
import { slugify } from "./serviceAreas";

export type Review = {
  name: string; loc: string; stars: number; service: string;
  quote: string; img: string; avatar: string; date: string;
};

export const ALL_REVIEWS: Review[] = [
  { name: "Victoria E.", loc: "Memphis, TN", stars: 5, service: "Crawl Space", quote: "Joe was very thorough with explaining everything and even came back a second time. I called 4 other companies — they quoted cheaper, but Redeemers gave me confidence in the long-term solution.", img: imgRevThumb1, avatar: imgRevAvatar, date: "March 2026" },
  { name: "Elizabeth N.", loc: "Collierville, TN", stars: 5, service: "Foundation", quote: "The crew was excellent communicators and hard workers. Done well within the time given. My garage lintel looks brand new. Would I recommend Redeemers? Absolutely!", img: imgRevThumb2, avatar: imgRevAvatar, date: "February 2026" },
  { name: "Melissa & Russell C.", loc: "Marked Tree, AR", stars: 5, service: "Concrete", quote: "Walking in now, it's straight. I used to slip from side to side. My bedroom closet door never closed before — I just closed it for the first time. Great job.", img: imgRevThumb3, avatar: imgRevAvatar, date: "January 2026" },
  { name: "David K.", loc: "Nashville, TN", stars: 5, service: "Basement", quote: "Had major water intrusion in my basement for years. Redeemers installed an interior drainage system and sump pump — completely dry ever since. Very professional team from start to finish.", img: imgRevThumb1, avatar: imgRevAvatar, date: "December 2025" },
  { name: "Sandra M.", loc: "Jackson, MS", stars: 5, service: "Crawl Space", quote: "They encapsulated our crawl space and installed SmartJacks. The floors stopped sagging within weeks. Team was clean, respectful, and explained every step of the process.", img: imgRevThumb2, avatar: imgRevAvatar, date: "November 2025" },
  { name: "Robert T.", loc: "Jonesboro, AR", stars: 5, service: "Foundation", quote: "Three push piers later and my foundation is level again. The lifetime warranty gave me peace of mind. Redeemers was the third company I got a quote from — I'm glad I waited for them.", img: imgRevThumb3, avatar: imgRevAvatar, date: "October 2025" },
  { name: "Patricia L.", loc: "Little Rock, AR", stars: 5, service: "Concrete", quote: "Driveway had a major trip hazard that had been there for years. Redeemers lifted it in a few hours with foam injection. Looked brand new. Incredibly fast and clean process.", img: imgRevThumb1, avatar: imgRevAvatar, date: "September 2025" },
  { name: "James W.", loc: "Germantown, TN", stars: 5, service: "Basement", quote: "Interior waterproofing system handled our wet basement perfectly. We had gotten quotes from two other companies — Redeemers was the only one who actually showed us what the water path was.", img: imgRevThumb2, avatar: imgRevAvatar, date: "August 2025" },
  { name: "Angela B.", loc: "Southaven, MS", stars: 5, service: "Crawl Space", quote: "Full crawl space encapsulation plus dehumidifier. The musty smell is completely gone. Energy bills dropped noticeably in the first month. Highly recommend for anyone in Mississippi.", img: imgRevThumb3, avatar: imgRevAvatar, date: "July 2025" },
  { name: "Michael C.", loc: "Springfield, MO", stars: 5, service: "Foundation", quote: "After the heavy rains last spring I noticed significant cracking. Redeemers came out for a free inspection and had a plan ready the same week. Installation crew was excellent.", img: imgRevThumb1, avatar: imgRevAvatar, date: "June 2025" },
  { name: "Linda H.", loc: "Bartlett, TN", stars: 5, service: "Concrete", quote: "Pool deck was severely sunken and cracked. I was expecting to replace the whole thing but Redeemers leveled it with foam lifting for a fraction of the cost. Couldn't be happier.", img: imgRevThumb2, avatar: imgRevAvatar, date: "May 2025" },
  { name: "Thomas R.", loc: "Cape Girardeau, MO", stars: 5, service: "Basement", quote: "Redeemers installed a WaterGuard system in our 1960s basement. Waterproof wall panels, drainage tiles, and a TripleSafe sump. No water issues after two full rainy seasons.", img: imgRevThumb3, avatar: imgRevAvatar, date: "April 2025" },
];

/** Stable URL slug for a review: name + city, e.g. "victoria-e-memphis-tn". */
export const reviewSlug = (r: Review) => slugify(`${r.name}-${r.loc}`);

export const REVIEW_BY_SLUG: Record<string, Review> = Object.fromEntries(
  ALL_REVIEWS.map((r) => [reviewSlug(r), r])
);
