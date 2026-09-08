import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowUpRight, Award as AwardIcon, Newspaper, X } from "lucide-react";
import { openInspection } from "./components/InspectionModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SharedNavBar from "./SharedNavBar";
import { PageHeroBanner } from "./components/PageHeroBanner";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { Logo } from "./components/Logo";
import { AnnouncementBar } from "./components/AnnouncementBar";
import imgFloor02 from "../assets/floor-02.jpeg";

import { B, DARK, NAVY, CHAR, SAND, MUTED, SURFACE, ON_LIGHT, ON_DARK } from "./theme";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── Awards (sourced from redeemersgroup.com/about-us/awards.html) ──────────
// This is its own page per the approved sitemap ("interna") — it used to be
// a small carousel buried inside the Certifications module on Our Difference,
// which read as inconsistent with the sitemap's dedicated Awards node.
// Client QA (Aug 19): "would like the awards to be clickable where there are
// news articles associated with them" (example: Small Business of the Year).
// `articleUrl` is the hook for that. TEST DATA (Aug 19): 3 awards below got a
// placeholder articleUrl on example.com — a domain reserved for
// documentation/testing (IANA), not a real news outlet — so the badge + modal
// link preview without pointing at a fabricated "real" article. Swap for
// Rosie's actual links once she sends the list of which awards have one.
type Award = { title: string; org: string; year: string; img?: string; date?: string; articleUrl?: string };

const AWARDS: Award[] = [
  { title: "Memphis Business Journal Small Business Awards", org: "Memphis Business Journal", year: "2026", date: "June 2, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6a202bc8c9060_small-business-awards.jpeg", articleUrl: "https://example.com/test-article/mbj-small-business-awards-2026" },
  { title: "Top Work Places, Top 3 Small Business", org: "Top Work Places", year: "2026", date: "February 4, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9437bfd18_image-12.jpg" },
  { title: "2025 Best Evergreen Company", org: "Industry Recognition", year: "2026", date: "March 17, 2026", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/69bc31ecc2ddc_image-8.jpg" },
  { title: "Commercial Appeal Top Workplaces 2024", org: "Commercial Appeal", year: "2025", date: "February 6, 2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/67a652585c968_img8180.jpg" },
  { title: "#24 Foundation Dealer in the Supportworks Network", org: "Supportworks", year: "2025", date: "April 11, 2025" },
  { title: "#20 Concrete Dealer in the Supportworks Network", org: "Supportworks", year: "2025", date: "April 11, 2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/680120502bd76_rgtop30concrete.png" },
  { title: "Memphis Business Journal Best Places to Work", org: "Memphis Business Journal", year: "2025", date: "September 9, 2025", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/699c9470a6058_image-13.jpg" },
  { title: "Best Place To Work 2024", org: "Industry Recognition", year: "2024", date: "September 10, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb00bad945f_redeemers-12.jpg" },
  { title: "#47 Total Basement Systems Sales", org: "Contractor Nation", year: "2024", date: "September 21, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb01d70bdfa_cn-47-sales.png" },
  { title: "#18 for Total CleanSpace™ Sales", org: "Contractor Nation", year: "2024", date: "September 28, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb019619b80_cn-18-sales.png" },
  { title: "Contractor Nation Platinum Appointment Center Award", org: "Contractor Nation", year: "2024", date: "September 28, 2024", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/66fb01464e979_cc-platinum.png" },
  { title: "Supportworks 2022 Most Improved by % Increase in Foundation Sales", org: "Supportworks", year: "2023", date: "April 13, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f073826f24_img2862.jpeg" },
  { title: "Supportworks 2022 Top 30 Dealer in Total Sales for Concrete Products", org: "Supportworks", year: "2023", date: "April 13, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f06326cfe0_img2860.jpeg" },
  { title: "Supportworks 2022 Top 50 in Total Sales for Foundation Products", org: "Supportworks", year: "2023", date: "April 13, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/643f057ac402e_img2859.jpeg" },
  { title: "2022 Watson Seal® Certified Dealer of the Year", org: "Watson Seal", year: "2023", date: "May 15, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6463d77e825e7_lumberkote-dealer-of-the-year.jpeg" },
  { title: "Germantown Education Foundation 2023 Run for Education Crystal Sponsorship", org: "Germantown Education Foundation", year: "2023", date: "May 31, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6477a42c3e669_gef-sponsorship-award.png" },
  { title: "BBB A+ Rating and Accreditation in Arkansas", org: "BBB", year: "2023", date: "July 1, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/64de4b43a9a33_img3741.jpg" },
  { title: "Best Places to Work 2023", org: "Industry Recognition", year: "2023", date: "September 12, 2023", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6511ea84d29f8_award.jpg" },
  { title: "Best Places to Work honoree", org: "Industry Recognition", year: "2022", date: "September 26, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6358548f5b0d7_img2180.jpg" },
  { title: "Spirit Award by The Memphis Business Journal", org: "Memphis Business Journal", year: "2022", date: "September 26, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/635856168b853_32ac9ccd-d20e-409b-b78a-59d9d80d3998.jpg", articleUrl: "https://example.com/test-article/mbj-spirit-award-2022" },
  { title: "Supportworks #20 Concrete Dealer 2021", org: "Supportworks", year: "2022", date: "April 7, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9aa198c09_sw-20-2021-concrete.png" },
  { title: "Supportworks TOP TEN NexusPro Dealer 2021", org: "Supportworks", year: "2022", date: "April 7, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9b65e9076_sw-9-2021-nexus.png" },
  { title: "Supportworks #35 Concrete Dealer 2021", org: "Supportworks", year: "2022", date: "April 7, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9bedb3b08_sw-35-2021-found-prod.png" },
  { title: "Angi's List Super Service Award 2021", org: "Angi", year: "2022", date: "February 1, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/62470f1a76af3_angi-2021.png" },
  { title: "Proud Member of the Collierville Chamber of Commerce", org: "Collierville Chamber of Commerce", year: "2022", date: "January 1, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e92d244f51_cvill-chamb-of-comm-member.png" },
  { title: "Enerbank 2021 Rising Star", org: "Enerbank", year: "2022", date: "May 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/62828cd35fe53_rising-star-2021.png" },
  { title: "BBB A+ Rating and Accreditation", org: "BBB", year: "2022", date: "May 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8391a47b0_bbb-accred-2020.png" },
  { title: "Best Places to Work 2018", org: "Industry Recognition", year: "2022", date: "May 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7f2952595_bptw-by-mbj-2018.png" },
  { title: "Small Business of the Year Honoree", org: "Industry Recognition", year: "2022", date: "September 6, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/635856b57b5bc_sba-logo-horizontal.jpg", articleUrl: "https://example.com/test-article/small-business-of-the-year-2022" },
  { title: "Top 20 dealer in crawlspace encapsulation for 2021-2022", org: "Contractor Nation", year: "2022", date: "September 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/6358538dd1ff7_img2181.jpg" },
  { title: "Basement Systems Top 50 dealer 2021-2022 for waterproofing", org: "Basement Systems", year: "2022", date: "September 16, 2022", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/635852d8cd2f9_img2182.jpg" },
  { title: "HomeAdvisor Elite Service Professional", org: "HomeAdvisor", year: "2021", date: "January 1, 2021" },
  { title: "Basement Systems Dealer 2021 - top 50 in total sales", org: "Basement Systems", year: "2021", date: "June 1, 2021", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8b42a4299_cn-2021-45-totsales.png" },
  { title: "BBB A+ Rating and Accreditation 2021", org: "BBB", year: "2021", date: "December 12, 2021", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e841ef24a8_bbb-accred-2021.png" },
  { title: "Member of the West Tennessee Home Builders Association", org: "West Tennessee Home Builders Association", year: "2020", date: "January 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e93adf07ea_wtn-hba-rg-2020.png" },
  { title: "Member of the Greater Memphis Chamber", org: "Greater Memphis Chamber", year: "2020", date: "January 31, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7f4849400_greater-mem-chamb-member.png" },
  { title: "Basement Systems - ranked top twenty in 2020", org: "Basement Systems", year: "2020", date: "June 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8bda72beb_cn-2020-18-tot-sales.png" },
  { title: "Supportworks #22 Concrete Dealer 2020", org: "Supportworks", year: "2020", date: "June 10, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e91c7c4336_sw-2020-22-conc-prod.png" },
  { title: "Supportworks Top 50 Foundation Dealers 2020", org: "Supportworks", year: "2020", date: "June 12, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e923d485e9_sw-2020-40-found-div.png" },
  { title: "HomeAdvisor Seal of Approval", org: "HomeAdvisor", year: "2020", date: "July 1, 2020" },
  { title: "HopeWorks Employer of the Year 2020", org: "HopeWorks", year: "2020", date: "October 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e78dd219c6_2020-hopeworks-eer-of-the-year.png" },
  { title: "Redeemers Group MAAR's Premier Sponsor of 2020", org: "MAAR", year: "2020", date: "November 1, 2020", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7ad23cf16_maar-prem-sponsor-2022.png" },
  { title: "HomeAdvisor Top-Rated Professional", org: "HomeAdvisor", year: "2020", date: "December 1, 2020" },
  { title: "2018 Angie's List Super Service Award", org: "Angie's List", year: "2019", date: "January 16, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7848a339b_angies-list-2018-supser-award.png" },
  { title: "Supportworks Top 10 SmartJack Dealers 2019", org: "Supportworks", year: "2019", date: "April 12, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9016f0376_sw-2019-10-sj.png" },
  { title: "Supportworks #29 Foundation Support Dealer", org: "Supportworks", year: "2019", date: "April 12, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8f39db8c2_sw-2019-29-found-div.png" },
  { title: "Supportworks Top 20 Concrete Dealer 2019", org: "Supportworks", year: "2019", date: "April 12, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8d626dd2b_sw-2019-19-conc-prod.png" },
  { title: "#10 Dealer in Total CleanSpace Sales", org: "Contractor Nation", year: "2019", date: "September 21, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e77e55c81f_cn-2019-10-totsales.png" },
  { title: "#37 Dealer of Total Basement System Sales", org: "Contractor Nation", year: "2019", date: "September 21, 2019", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e781c02c81_cn-2019-37-totsales.png" },
  { title: "Milestone Award - 10 years authorized dealer", org: "Contractor Nation", year: "2018", date: "January 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7b0a4d18e_cn-2018-10-yrs-auth-dealer.png" },
  { title: "2018 MAAR Award", org: "MAAR", year: "2018", date: "February 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7a3d58bf6_maar-prem-spons-2018.png" },
  { title: "CNLIVE 2018 Award", org: "CNLIVE", year: "2018", date: "March 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5c0fe35aca2e9_img1259.jpg" },
  { title: "Constant Contact All-Star Solution Provider", org: "Constant Contact", year: "2018", date: "March 14, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5abe77a365f7f_screen-shot-2018-03-30-at-122222-pm.png" },
  { title: "#1 increase in entire Supportworks network in 2017", org: "Supportworks", year: "2018", date: "April 12, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5ad4fdfc8ba49_img2779.jpg" },
  { title: "#22 in Supportworks network for 2017", org: "Supportworks", year: "2018", date: "April 12, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e796f63648_sw-2017-22-found-div.png" },
  { title: "2018 Supportworks top 20 concrete dealer", org: "Supportworks", year: "2018", date: "April 15, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8cdccbbcf_sw-2018-19-conc-prod.png" },
  { title: "Basement Systems - ranked #22 in 2018", org: "Basement Systems", year: "2018", date: "June 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e88fc55b55_cn-2018-22-totsales.png" },
  { title: "Basement Systems - ranked #47", org: "Basement Systems", year: "2018", date: "June 1, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e885c5ccb5_bs-2018-47-totsales.png" },
  { title: "Memphis Business Journal Pacesetter: 2018", org: "Memphis Business Journal", year: "2018", date: "September 18, 2018", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/5bb3e2482246a_acbj-48477logofinal.png" },
  { title: "2017 Angie's List Super Service Award", org: "Angie's List", year: "2017", date: "December 22, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e792e65bb0_angies-list-2017-supser-award.png" },
  { title: "Top 40 Under Forty", org: "Industry Recognition", year: "2017", date: "November 9, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e82a3a1a2a_40-under-40-coo-rg.png" },
  { title: "Inc. 5000 Rankings", org: "Inc. 5000", year: "2017", date: "August 16, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/59a6f64f46be3_a0060707000011.jpg" },
  { title: "Inc. 5000 - #17th fastest growing company", org: "Inc. 5000", year: "2017", date: "August 16, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/59a6f6b1b6f7d_a0060253000011.jpg" },
  { title: "Small Business Awards Executive of the Year", org: "Memphis Business Journal", year: "2017", date: "May 18, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7c14dade4_mbj-sm-bus-award.png" },
  { title: "Memphis Business Journal: 2017 Small Business Executive of the Year", org: "Memphis Business Journal", year: "2017", date: "May 2, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7dee50ed0_mbj-2017-sm-bus-award.png" },
  { title: "Supportworks ranks Redeemers Group #44 for 2016", org: "Supportworks", year: "2017", date: "March 17, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/58d17af838f0e_dsc01989.jpg" },
  { title: "Inc. 5000 - top construction company in the U.S.", org: "Inc. 5000", year: "2017", date: "August 16, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7b614b09a_inc-500-2017-fastest-growing-cos.png" },
  { title: "2017 Memphis Business Journal Pacesetters Award", org: "Memphis Business Journal", year: "2017", date: "August 24, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7c43abece_mbj-pacesetters-2016.png" },
  { title: "Ranked #43 in Basement System dealer network for waterproofing", org: "Basement Systems", year: "2017", date: "September 17, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7b8eb444f_bs-2017-43-tot-sales.png" },
  { title: "Ranked #17 in The US and Canada for Cleanspace", org: "Contractor Nation", year: "2017", date: "September 17, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7bb1a4caf_cs-2017-17-totsales.png" },
  { title: "One Million Square Foot Award", org: "Contractor Nation", year: "2017", date: "September 18, 2017", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7a0960861_cs-2017-1mil-sq-ft-installed.png" },
  { title: "#3 fastest growing company in the Mid-South", org: "Industry Recognition", year: "2016", date: "September 30, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/57fd2a48ad706_img2178.png" },
  { title: "Memphis Business Journal's Pacesetters Award", org: "Memphis Business Journal", year: "2016", date: "August 25, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/57bc8d4ca5d9d_mbjpacesetters-logo-2016.jpg" },
  { title: "FINALIST - Memphis Business Journal Small Business of the Year", org: "Memphis Business Journal", year: "2016", date: "April 11, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/sba-logo-2016-cropped.jpg" },
  { title: "2016 Foundation Supportworks Top 50 Sales", org: "Supportworks", year: "2016", date: "April 8, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e914583a80_sw-2018-44-tot-sales.png" },
  { title: "Basement Systems - top 50 waterproofing companies", org: "Basement Systems", year: "2016", date: "August 17, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e779f9a4f5_bs-2016-50-totsales.png" },
  { title: "Top 50 foundation repair companies in the world", org: "Industry Recognition", year: "2016", date: "August 17, 2016" },
  { title: "Enerbank 2016 Rising Star", org: "Enerbank", year: "2016", date: "November 30, 2016", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e83231abb7_2016-enerbank-rising-star.png" },
  { title: "Foundation Supportworks dealer - #40 spot", org: "Supportworks", year: "2015", date: "August 20, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/55815-up-close-award.jpg" },
  { title: "Basement Systems - ranked #53 in Waterproofing", org: "Basement Systems", year: "2015", date: "June 12, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e87ca36f88_bs-2016-30-cleanspace.png" },
  { title: "Basement Systems - ranked #66 in Waterproofing", org: "Basement Systems", year: "2015", date: "June 12, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8775a9df6_bs-2015-66-waterproof.png" },
  { title: "Basement Systems - ranked #39 in CleanSpace", org: "Basement Systems", year: "2015", date: "June 12, 2015", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e8706cf5c5_bs-2015-39-clenspace.png" },
  { title: "Angie's List Super Service Award 2013 - Memphis Market", org: "Angie's List", year: "2014", date: "March 1, 2014", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e7cdcac0c2_angies-list-2013-supser-award.png" },
  { title: "Top 50 FSI Dealer for 2013/2014", org: "Supportworks", year: "2014", date: "August 14, 2014", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e81e7e774b_sw-2014-43-tot-sales.png" },
  { title: "Basement Systems - ranked #53 in CleanSpace", org: "Basement Systems", year: "2014", date: "November 11, 2014", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e865e663da_bs-2014-53-bs.png" },
  { title: "Basement Systems - ranked #38 in CleanSpace", org: "Basement Systems", year: "2013", date: "November 1, 2013", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e85db0eeeb_bs-2013-38-cleanspace.png" },
  { title: "Basement Systems Milestone Award - 5 years authorized dealer", org: "Basement Systems", year: "2013", date: "December 31, 2013", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e84c614dba_bs-5-yr-dealer-awa.png" },
  { title: "Supportworks - Certificate of Installment", org: "Supportworks", year: "2008", date: "January 1, 2008", img: "https://cdn.treehouseinternetgroup.com/uploads/awards/1447/medium/627e9332a7880_sw-cert-of-installment.png" },
];

const AWARD_YEARS = ["All", ...Array.from(new Set(AWARDS.map((a) => a.year))).sort((a, b) => Number(b) - Number(a))];

// Derived — never fabricated: counted straight off the AWARDS list above.
const YEAR_NUMS = AWARDS.map((a) => Number(a.year));
const AWARDS_SINCE_YEAR = Math.min(...YEAR_NUMS);
const AWARDS_ORG_COUNT = new Set(AWARDS.map((a) => a.org)).size;
const FEATURED_AWARDS = AWARDS.slice(0, 3);

function AwardCard({ award, onClick }: { award: Award; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1"
        style={{ aspectRatio: "1/1", background: SURFACE.base, border: `1px solid ${ON_LIGHT.border}`, boxShadow: "0 0 0 rgba(62,60,73,0)" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 32px rgba(62,60,73,.12)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 rgba(62,60,73,0)")}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: SAND }} />
        {award.img ? (
          <ImageWithFallback src={award.img} alt={award.title} className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: B, letterSpacing: 0.5, textAlign: "center", padding: 12, lineHeight: 1.3 }}>
            {award.org}
          </span>
        )}
        <div className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(216,203,165,.18)", border: "1px solid rgba(216,203,165,.4)" }}>
          <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#00509F", letterSpacing: 1 }}>{award.year}</span>
        </div>
        {award.articleUrl && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: B }} title="News article available">
            <Newspaper size={12} color="#fff" />
          </div>
        )}
      </div>
      <div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: CHAR, lineHeight: 1.4, marginBottom: 2 }}>
          {award.title.length > 56 ? award.title.slice(0, 56) + "…" : award.title}
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: MUTED }}>{award.org}</p>
      </div>
    </div>
  );
}

// ─── Featured strip — the 3 most recent recognitions, larger treatment ──────
function FeaturedAwardsSection({ onOpen }: { onOpen: (a: Award) => void }) {
  return (
    <section style={{ background: DARK }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-[2px]" style={{ background: SAND }} />
              <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 600, fontSize: 11, color: SAND, letterSpacing: 4, textTransform: "uppercase" }}>Most Recent</span>
            </div>
            <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.2vw,42px)", color: "#fff", letterSpacing: "-1px", lineHeight: 1.05 }}>
              Latest recognition
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <div>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1 }}>{AWARDS.length}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: ON_DARK.muted, letterSpacing: 0.5 }}>Total awards</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1 }}>{AWARDS_ORG_COUNT}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: ON_DARK.muted, letterSpacing: 0.5 }}>Awarding bodies</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1 }}>{AWARDS_SINCE_YEAR}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: ON_DARK.muted, letterSpacing: 0.5 }}>Recognized since</p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED_AWARDS.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.08}>
              <button onClick={() => onOpen(award)}
                className="w-full text-left flex flex-col gap-0 group transition-all"
                style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${ON_DARK.border}`, cursor: "pointer" }}>
                <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "16/10", background: "rgba(255,255,255,.04)" }}>
                  {award.img ? (
                    <ImageWithFallback src={award.img} alt={award.title} className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <AwardIcon size={40} color={SAND} strokeWidth={1.4} />
                  )}
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 1.5 }}>{award.year}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.25)" }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: ON_DARK.muted }}>{award.org}</span>
                  </div>
                  <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", lineHeight: 1.3 }}>
                    {award.title}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-1" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12, color: SAND }}>
                    View details <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardModal({ award, onClose }: { award: Award | null; onClose: () => void }) {
  useEffect(() => {
    if (!award) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [award, onClose]);

  if (!award) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(62,60,73,.88)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[960px] flex flex-col lg:flex-row overflow-hidden"
        style={{ background: CHAR, height: "min(85vh, 580px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:w-[52%] shrink-0 relative flex items-center justify-center" style={{ background: DARK }}>
          {award.img ? (
            <ImageWithFallback src={award.img} alt={award.title} className="absolute inset-0 w-full h-full object-contain p-10" />
          ) : (
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: SAND, textAlign: "center", padding: 40 }}>{award.org}</span>
          )}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 9, color: "#fff", letterSpacing: 2.5, textTransform: "uppercase", background: B, padding: "3px 8px" }}>{award.year}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto rg-scroll-thin" style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}>
          <div className="flex justify-end px-7 pt-6 pb-3 shrink-0">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer" }}>
              <X size={14} color="rgba(255,255,255,.7)" />
            </button>
          </div>

          <div className="flex flex-col flex-1 px-7 pb-7">
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{award.date ?? award.year}</span>
            </div>

            <h3 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 6 }}>
              {award.title}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: SAND, marginBottom: 20 }}>{award.org}</p>

            <div className="mb-5 p-4" style={{ background: "rgba(0,80,159,.12)", border: "1px solid rgba(0,80,159,.25)" }}>
              <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: B, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Recognition</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
                Redeemers Group was recognized with the {award.title}, awarded by {award.org} in {award.year}. This is one of {AWARDS.length} industry awards and affiliations the company has earned since 2008.
              </p>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "auto 0 20px" }} />

            {award.articleUrl && (
              <a href={award.articleUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 mb-3 hover:opacity-90 transition-opacity w-full"
                style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.18)", fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: 0.3 }}>
                Read the News Article <ArrowUpRight size={14} />
              </a>
            )}

            <button onClick={() => { onClose(); openInspection(); }}
              className="inline-flex items-center gap-2 px-6 py-3 hover:opacity-90 transition-opacity w-full justify-center"
              style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
              Get Your Free Inspection <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Client QA (Aug 19): "filter by buttons seem generic ... would prefer the
// banner example from the tradeshow banner screenshot instead of the basic
// boxes" — a flag/ribbon shape (flat left edge, pointed right edge), not a
// plain rounded pill. Color follows the client's rule: white/blue on light
// sections (high contrast), sand/white/light-blue on dark sections. Built
// once here so it can be reused anywhere else on the site with the same
// "generic filter button" complaint.
function FlagFilterButton({ label, count, active, onClick, tone = "light" }: {
  label: string; count?: number; active: boolean; onClick: () => void; tone?: "light" | "dark";
}) {
  const point = 12;
  const activeBg = tone === "light" ? B : SAND;
  const activeFg = tone === "light" ? "#fff" : DARK;
  const idleFg = tone === "light" ? B : "#fff";
  const idleBorder = tone === "light" ? B : "rgba(255,255,255,.4)";
  // Section this filter sits on — the inner layer's fill has to match it so
  // the "border" ring reads correctly. Only light/white (SURFACE.base) is
  // wired today since that's the one section using this so far.
  const surfaceBg = SURFACE.base;
  const bw = 1.5; // border thickness
  const labelNode = (
    <>
      {label}
      {count !== undefined && <span style={{ opacity: 0.65, fontWeight: 600 }}>{count}</span>}
    </>
  );
  const textStyle: React.CSSProperties = { fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.3 };

  if (active) {
    return (
      <button onClick={onClick} className="inline-flex items-center gap-1.5 transition-all"
        style={{ ...textStyle, padding: `9px ${point + 16}px 9px 16px`, background: activeBg, color: activeFg, border: "none",
          clipPath: `polygon(0 0, calc(100% - ${point}px) 0, 100% 50%, calc(100% - ${point}px) 100%, 0 100%)`, cursor: "pointer" }}>
        {labelNode}
      </button>
    );
  }

  // Client QA (Aug 19): "adjust the flags" — on iPad/Safari, a plain
  // `border` combined with `clip-path` doesn't clip the border to the
  // pointed shape; it leaves a full rectangle plus a stray notch mark
  // instead of a clean flag outline. Fix: two stacked solid-fill shapes
  // instead of a stroked one — clip-path on a flat fill has no such bug.
  // Outer layer is the border color; inner layer is inset by `bw` and
  // filled with the section's own background, leaving only a thin ring
  // of the outer color showing — a "border" with no `border` property.
  return (
    <button onClick={onClick} className="relative inline-flex items-stretch transition-all" style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
      <span className="absolute inset-0" style={{ background: idleBorder, clipPath: `polygon(0 0, calc(100% - ${point}px) 0, 100% 50%, calc(100% - ${point}px) 100%, 0 100%)` }} />
      <span className="relative inline-flex items-center gap-1.5" style={{
        ...textStyle, margin: bw, padding: `${9 - bw}px ${point + 16 - bw}px ${9 - bw}px ${16 - bw}px`,
        background: surfaceBg, color: idleFg,
        clipPath: `polygon(0 0, calc(100% - ${point - bw}px) 0, 100% 50%, calc(100% - ${point - bw}px) 100%, 0 100%)`,
      }}>
        {labelNode}
      </span>
    </button>
  );
}

function AwardsGridSection({ onOpen }: { onOpen: (a: Award) => void }) {
  const [yearFilter, setYearFilter] = useState("All");

  // "All" reads as a ledger — one section per year, newest first, so 90+
  // entries don't dump into one undifferentiated wall of cards. Picking a
  // single year just narrows the ledger to that one section.
  const groups = (yearFilter === "All" ? AWARD_YEARS.slice(1) : [yearFilter]).map((year) => ({
    year,
    items: AWARDS.filter((a) => a.year === year),
  }));

  return (
    <section style={{ background: SURFACE.base }} className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-8 md:px-14">
        <Reveal className="flex items-center gap-3 flex-wrap mb-16">
          {AWARD_YEARS.map((y) => {
            const count = y === "All" ? AWARDS.length : AWARDS.filter((a) => a.year === y).length;
            return (
              <FlagFilterButton key={y} label={y} count={count} active={yearFilter === y} onClick={() => setYearFilter(y)} tone="light" />
            );
          })}
        </Reveal>

        <div className="flex flex-col gap-16">
          {groups.map((group) => (
            <div key={group.year}>
              <Reveal className="flex items-baseline gap-4 mb-8">
                <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: CHAR, letterSpacing: "-1px" }}>
                  {group.year}
                </span>
                <div className="flex-1" style={{ height: 1, background: ON_LIGHT.border }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: MUTED, whiteSpace: "nowrap" }}>
                  {group.items.length} {group.items.length === 1 ? "award" : "awards"}
                </span>
              </Reveal>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
                {group.items.map((award, i) => (
                  <Reveal key={award.title} delay={(i % 12) * 0.03}>
                    <AwardCard award={award} onClick={() => onOpen(award)} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onBack }: { onBack: () => void }) {
  const cols = [
    { h: "Services", ls: ["Crawl Space", "Basement Waterproofing", "Foundation Repair", "Concrete Leveling", "Mold Prevention", "Insulation"] },
    { h: "Company", ls: ["About Us", "Our Difference", "Resources", "Careers", "Contact"] },
    { h: "Service Areas", ls: ["Mississippi", "Tennessee", "Arkansas", "Missouri"] },
    { h: "Our Difference", ls: ["Case Studies", "Before & After", "Awards", "Job Stories"] },
  ];
  return (
    <footer style={{ background: SURFACE.footer }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="lg:w-72 shrink-0">
            <button onClick={onBack} className="h-20 mb-5 block">
              <Logo light />
            </button>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20 }}>
              The steady, local authority when something foundational is wrong.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); openInspection(); }} className="inline-flex items-center gap-2 px-5 py-3"
              style={{ background: B, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
              Free Inspection <ArrowRight size={13} />
            </a>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.h}>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.9)", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>
                  {col.h}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.ls.map((l) => (
                    <li key={l}>
                      <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.35)" }} className="hover:text-white/70 transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}>
            © 2026 Redeemers Structural Solutions. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }} className="hover:text-white/40 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── AwardsPage ───────────────────────────────────────────────────────────────
export default function AwardsPage({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (p: string) => void }) {
  const [openAward, setOpenAward] = useState<Award | null>(null);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <AnnouncementBar />
        <SharedNavBar onNavigate={onNavigate ?? (() => onBack())} active="Our Difference" />
      </div>
      <div className="w-full min-h-screen pt-[89px] md:pt-[123px] lg:pt-[139px] xl:pt-[155px]" style={{ background: SURFACE.base }}>
        <PageBreadcrumb items={[
          { label: "Home", onClick: onBack },
          { label: "Our Difference", onClick: () => onNavigate?.("our-difference") },
          { label: "Awards" },
        ]} />

        <PageHeroBanner
          image={imgFloor02}
          imageAlt="Redeemers Group award recognition"
          eyebrow="Awards"
          title="Awards & Recognition"
          lede={`Since ${AWARDS_SINCE_YEAR}, ${AWARDS_ORG_COUNT} different organizations have recognized the work — ${AWARDS.length} awards and counting.`}
        >
          <button onClick={openInspection}
            className="inline-flex items-center gap-2 px-6 py-3.5 hover:opacity-90 transition-opacity"
            style={{ background: B, fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
            Get Your Free Inspection <ArrowRight size={14} />
          </button>
        </PageHeroBanner>

        <FeaturedAwardsSection onOpen={setOpenAward} />
        <AwardsGridSection onOpen={setOpenAward} />

        {openAward && <AwardModal award={openAward} onClose={() => setOpenAward(null)} />}

        <Footer onBack={onBack} />
      </div>
    </>
  );
}
