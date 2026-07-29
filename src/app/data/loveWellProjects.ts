// ─── Love Well Initiative — project history ──────────────────────────────────
// Real history of Love Well Initiative projects (redeemersgroup.com/about-us/
// love-well-initiative.html) — a running log that grows every year. Shared
// between the Our Difference teaser carousel and the dedicated Love Well page
// so both stay in sync with a single source of truth.
import imgFloor01 from "../../assets/floor-01.jpeg";
import imgFloor02 from "../../assets/floor-02.jpeg";
import imgFloor03 from "../../assets/floor-03.jpeg";
import imgFloor04 from "../../assets/floor-04.jpeg";

export type LoveWellProject = {
  year: string;
  title: string;
  desc: string;
  cta: string;
  videoId?: string;
  img: string;
};

export const LOVE_WELL_PROJECTS: LoveWellProject[] = [
  {
    year: "2018",
    title: "Love Well 5K & Festival — Serenity Recovery Center",
    desc: "Serenity Recovery Center runs a free program with very little funding. We made them the beneficiary of the 2018 Love Well 5K & Festival to help close that gap.",
    cta: "Watch the story",
    videoId: "QB1c_89RBgg",
    img: imgFloor01,
  },
  {
    year: "2017",
    title: "Love Well 5K & Festival — Boys & Girls Club of Greater Memphis",
    desc: "Each year the festival benefits a different Memphis-based charity. In 2017 that was the Boys & Girls Club of Greater Memphis.",
    cta: "Watch the story",
    videoId: "cp3ZBiioxpw",
    img: imgFloor02,
  },
  {
    year: "2017",
    title: "Safe Families structural repair",
    desc: "Extensive structural repairs, done at no cost, on a home being rehabbed into a Safe Families house — a safe living environment for mothers in transition.",
    cta: "Watch the story",
    videoId: "EH1G9dSnjZE",
    img: imgFloor03,
  },
  {
    year: "2016",
    title: "Love Well 5K Run/Walk & Festival — Old Path Homeless Shelter",
    desc: "A run/walk benefiting the Old Path Homeless Shelter for Women and Children in Memphis, open to individuals and teams.",
    cta: "Watch the story",
    videoId: "6OY1ki0FBUE",
    img: imgFloor04,
  },
  {
    year: "2016",
    title: "Toss the Boss Challenge",
    desc: "Our leadership took the plunge — literally — to raise support for orphans and vulnerable children around the world.",
    cta: "See the challenge",
    img: imgFloor01,
  },
  {
    year: "2015",
    title: "$10,000 structural repair gift — Old Path Homeless Shelter",
    desc: "After a nomination process across several area charities, our team selected Old Path Homeless Shelter for Women and Children for a full, free structural repair.",
    cta: "Read the story",
    img: imgFloor02,
  },
];
