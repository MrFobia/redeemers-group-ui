// ─── Team — shared source of truth ───────────────────────────────────────────
// One member list, reused by the About page teaser (People section) and the
// dedicated Team page (the full roster, no department filter, no pagination).
//
// Real people, bios, hometowns and photos come from the current site
// (redeemersgroup.com/about-us/meet-the-team, scraped 7-oct-2026); images live in
// public/team. Reviews and gallery photos are the member's own when the old
// profile had them (`reviewsAreOwn` / `galleryIsOwn`). When it had none, the
// profile shows real reviews and job photos from the rest of the crew instead,
// labelled as the team's rather than the person's, so no section sits empty and
// nothing is attributed to someone it was not written about.
export const DEPARTMENTS = ["Accounting", "Production", "Customer Care", "System Design", "Service"];

export type TeamReview = { quote: string; name: string; loc: string };

export const TEAM_MEMBERS = [
  {
    name: "Christopher Lowrie", title: "Customer Care Manager", dept: "Customer Care", hometown: "Memphis, TN",
    img: "/team/christopher-lowrie.png",
    bio: [
      "If you're looking for someone who can juggle customer care, coaching kids' sports, and quoting The Office on command, look no further than Chris. A lifelong Memphian who’s spent the past eight years in Lakeland, Chris brings a sharp mind, a huge heart, and a lot of dry sitcom references to the team.",
      "He’s been married for nearly ten years and is a proud dad to three awesome kids: Madelyn, Landon, and Brennan. He’s also dog dad to Bailey, a very photogenic Aussiedoodle. When he's not answering calls or solving problems, you’ll find him coaching baseball and basketball, leading communications for the Arlington Softball and Baseball League, or enjoying weekends with his close-knit Lakeland crew at their river house on the Tennessee.",
      "Chris has a rich background in customer service, sales, and project management — and he’s also a licensed drone pilot and a member of the Tennessee Association of Realtors’ Multimillion Dollar Club (yes, really). He originally applied for a recruiting role, but once he saw Office memes in the bathroom, he knew this was home.",
      "Snacks of choice? Edamame in teriyaki sauce. Favorite candies? Tropical Skittles and Sour Patch Kids — a sweet & sour combo that matches his energy perfectly.",
    ],
    reviews: [
      { quote: "The Customer Care representative was very friendly and helpful. The System Design Specialist was professional and friendly and informative. The Installation Crew was Hard working, professional, and did a great job. They left our property clean and neat.", name: "Melanie B.", loc: "Byhalia, MS" },
      { quote: "Very nice and professional. The crew was great! We were kept informed every step of the way. The crew was nice and professional and very productive! Not a spec of wood or dirt left behind. I will 100% recommend Redeemers Group!", name: "Ann L.", loc: "Cleveland, MS" },
      { quote: "Very informative kept me up to date with everything wonderful funny men! As for clean-up, it looks like they were never here. I chose Redeemers Group over other companies because y’all had the best price.", name: "Cassandra S.", loc: "Tupelo, MS" },
    ],
    reviewsAreOwn: false,
    gallery: [
      "/team/g-redeemers-group-block-party-1.jpeg",
      "/team/g-redeemers-group-block-party-2.jpeg",
      "/team/g-redeemers-group-block-party-3.jpeg",
      "/team/g-redeemers-group-block-party-4.jpeg",
      "/team/g-thanksgiving-potluck-2021-1.jpg",
      "/team/g-thanksgiving-potluck-2021-2.jpg",
      "/team/g-thanksgiving-potluck-2021-3.jpg",
      "/team/g-thanksgiving-potluck-2021-4.jpg",
    ],
    galleryIsOwn: false,
  },
  {
    name: "Stephen Kline", title: "Account Manager", dept: "Customer Care", hometown: "Memphis, TN",
    img: "/team/stephen-kline.png",
    bio: [
      "This is Stephen! He joined the Redeemers Structural Solutions team in fall of 2021. He brings experience working in the past as an Advertising Executive Accountant, and as a Sales Manager,",
      "Stephen has found his home as an Account Manager for Redeemers Structural Solutions. He loves the positive energy around his job, getting to talk to customers, and the camaraderie he finds on his team. He works to build beautiful relationships with customers, while offering them the best solutions possible. He works hard with his team to find success, positive growth and opportunities to learn-- all while having fun!",
      "In his spare time, Stephen loves to write and record music and play the piano. He lives here in Memphis, TN. He has an Identical twin brother, a pit bull named Bella, a daschund mix named Possum, all whom he loves dearly.",
    ],
    reviews: [
      { quote: "My experience with appointment center representative and the system design specialist was a", name: "Idanelle 2535 P.", loc: "Okolona, MS" },
      { quote: "Just want to tell you that the men who worked on my project were courteous and professional beyond my greatest expectations. Thank you for the considerate and effective way these men did their job!Will gladly recommend Redeemers Group to my friends.Thank you,Evelyn", name: "Evelyn S.", loc: "Nesbit, MS" },
      { quote: "Redeemers Group did a fantastic job fixing my garage floor. A tree root had broken the garage floor. Dalton, Randy and Chelsea worked diligently to remove the root which appeared to be partly petrified ‼️ Two different chainsaws could not cut it up.", name: "Cindy T.", loc: "Memphis, TN" },
    ],
    reviewsAreOwn: true,
    gallery: [
      "/team/g-concrete-driveway-repair-in-germantown-t-1.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-2.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-3.jpg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-1.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-2.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-3.jpeg",
      "/team/g-redeemers-group-block-party-1.jpeg",
      "/team/g-redeemers-group-block-party-2.jpeg",
      "/team/g-redeemers-group-block-party-3.jpeg",
    ],
    galleryIsOwn: true,
  },
  {
    name: "Brandon Hunt", title: "Project Coordinator", dept: "Customer Care", hometown: "Millington, TN",
    img: "/team/brandon-hunt.png",
    bio: [
      "Say hello to Brandon, or as he prefers: Ghost. Brandon joined the team at Redeemers Structural Solutions as a Warehouse Supervisor and now is a Project Coordinator. Being part of a team who cares is very important to Brandon and he feels that he has found that in his new role.",
      "Brandon is a proud husband and father of two, residing in Millington, TN. He is a certified forklift operator with a strong customer service background. He is also a music producer who plays in a band, and word on the street is that he can really jam!",
      "If you want to make Brandon happy, bring some hot chips to the jam session! (Hershey Cookies and Cream or Sour Patch candy will also suffice.)",
    ],
    reviews: [
      { quote: "Redeemers Group did a fantastic job fixing my garage floor. A tree root had broken the garage floor. Dalton, Randy and Chelsea worked diligently to remove the root which appeared to be partly petrified ‼️ Two different chainsaws could not cut it up.", name: "Cindy T.", loc: "Memphis, TN" },
    ],
    reviewsAreOwn: true,
    gallery: [
      "/team/g-tabernacle-crawl-space-disaster-in-covin-1.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-2.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-3.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-4.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-1.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-2.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-3.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-4.jpeg",
    ],
    galleryIsOwn: false,
  },
  {
    name: "Catina McGowan", title: "Customer Care Specialist", dept: "Customer Care", hometown: "Memphis, TN",
    img: "/team/catina-mcgowan.png",
    bio: [
      "Say Hello to Tina! Tina is a Customer Care Specialist on the team. She chose Redeemers Structural Solutions because she was looking for a place where she could enhance her skills and grow. She has found that here. Tina brings valuable customer service skills with extensive experience, including 6 years at Disney. Tina was born and raised in Memphis, TN, where she still resides today. She is a mother of 6, including a bonus daughter she shares with her fiancé. She’s also a grandmother of 2. In her free time, Tina enjoys watching movies, family outings, and cooking delicious meals for her family. If you want to make her day, slide her some praline pecans or a Kit Kat bar!",
    ],
    reviews: [
      { quote: "Very informative kept me up to date with everything wonderful funny men! As for clean-up, it looks like they were never here. I chose Redeemers Group over other companies because y’all had the best price.", name: "Cassandra S.", loc: "Tupelo, MS" },
      { quote: "I got 3 estimates as recommended by Angi's list.......The other two were first to give a quote, but really tried to rush the sale.....Then your people showed up and actually offered more perks for less money because THAT is how your crew does every job (all perks inclusive).....My patio was lifted,…", name: "Lynn F.", loc: "Olive Branch, MS" },
      { quote: "We have worked with Redeemers in the past (crawl space encapsulation) and have been impressed with their professionalism and the quality of their work.", name: "John F.", loc: "Olive Branch, MS" },
    ],
    reviewsAreOwn: true,
    gallery: [
      "/team/g-redeemers-group-block-party-1.jpeg",
      "/team/g-redeemers-group-block-party-2.jpeg",
      "/team/g-redeemers-group-block-party-3.jpeg",
      "/team/g-redeemers-group-block-party-4.jpeg",
      "/team/g-thanksgiving-potluck-2021-1.jpg",
      "/team/g-thanksgiving-potluck-2021-2.jpg",
      "/team/g-thanksgiving-potluck-2021-3.jpg",
      "/team/g-thanksgiving-potluck-2021-4.jpg",
    ],
    galleryIsOwn: false,
  },
  {
    name: "Katie Raves", title: "Customer Care Specialist", dept: "Customer Care", hometown: "Hayward, CA",
    img: "/team/katie-raves.png",
    bio: [
      "Katie Raves joins Redeemers Structural Solutions as a customer care specialist. Her background is in customer service for banking and healthcare. She actually was a key witness in prosecuting a local bank fraud ring. Katie found the smoking gun piece of evidence in bank security footage that linked the ring to the leader of the operation. So needless to say she’s got an eye for detail and a stick-to-it attitude. Katie joined Redeemers Structural Solutions because she wanted to expand her customer service skillset into a new industry. Katie was born in Hayward, CA but now lives in Germantown. She is the mom of one daughter who just started middle school. A fun fact about Katie is: she can clean a Sonic ice cream machine in roller skates! Outside of work, you can find Katie spending time with her daughter, swimming, or playing pickleball!",
    ],
    reviews: [
      { quote: "The Customer Care representative was very friendly and helpful. The System Design Specialist was professional and friendly and informative. The Installation Crew was Hard working, professional, and did a great job. They left our property clean and neat.", name: "Melanie B.", loc: "Byhalia, MS" },
      { quote: "My experience with appointment center representative and the system design specialist was a", name: "Idanelle 2535 P.", loc: "Okolona, MS" },
      { quote: "Very informative kept me up to date with everything wonderful funny men! As for clean-up, it looks like they were never here. I chose Redeemers Group over other companies because y’all had the best price.", name: "Cassandra S.", loc: "Tupelo, MS" },
    ],
    reviewsAreOwn: false,
    gallery: [
      "/team/g-redeemers-group-block-party-1.jpeg",
      "/team/g-redeemers-group-block-party-2.jpeg",
      "/team/g-redeemers-group-block-party-3.jpeg",
      "/team/g-redeemers-group-block-party-4.jpeg",
      "/team/g-concrete-driveway-repair-in-germantown-t-1.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-2.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-3.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-4.jpg",
    ],
    galleryIsOwn: false,
  },
  {
    name: "Nicole Thomas", title: "Customer Care Specialist", dept: "Customer Care", hometown: "Memphis, TN",
    img: "/team/nicole-thomas.png",
    bio: [
      "Meet Nicole! She joined Redeemers Structural Solutions in the winter of 2021. She has lived in Oakland CA, Boise ID, and ultimately landed in Cordova TN, where she lives with her three daughters, who are, by all accounts, excellent human beings.",
      "She brings many lovely skills to the table working at Redeemers Structural Solutions. She is Food Safety Certified and has made dozens of wedding cakes. In the past, she served at St. Jude Children's Hospital, making sure the families there were heard and cared for. When she wasn't helping them by problem-solving or listening to their concerns, she often ran errands for them. We are thankful for Nicole's kind heart and generous spirit.",
      "Nicole decided to join the Redeemers Structural Solutions team based on our excellent work culture and reputation for helping out our customers. Nicole has found the entire team to be built up of wonderful people, and she is excited to \"join up with the best, to provide for the best!\"",
      "In her free time, Nicole loves entertaining, reading, listening to music or podcasts, and pursuing any type of creative effort.",
    ],
    reviews: [
      { quote: "I have called other companies and I'm lucky if I actually get to speak to someone, let alone be greeted by such an angel and godsend as Nicole. I have Nicole as a contact in my phone and I'm thankful to have someone like her to call whenever I need an appointment for a property.", name: "Paige D.", loc: "Oxford, MS" },
      { quote: "Very nice and professional. The crew was great! We were kept informed every step of the way. The crew was nice and professional and very productive! Not a spec of wood or dirt left behind. I will 100% recommend Redeemers Group!", name: "Ann L.", loc: "Cleveland, MS" },
      { quote: "The Customer Care representative was very friendly and helpful. The System Design Specialist was professional and friendly and informative. The Installation Crew was Hard working, professional, and did a great job. They left our property clean and neat.", name: "Melanie B.", loc: "Byhalia, MS" },
    ],
    reviewsAreOwn: true,
    gallery: [
      "/team/g-repairing-a-devastated-crawl-space-in-co-1.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-2.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-3.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-4.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-5.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-6.jpeg",
    ],
    galleryIsOwn: true,
  },
  {
    name: "Jacen Berry", title: "Service Technician", dept: "Service", hometown: "Memphis, TN",
    img: "/team/jacen-berry.png",
    bio: [
      "Born and raised in Memphis, Jacen brings a strong work ethic, positive attitude, and team-first mindset to Redeemers Structural Solutions. He’s married and proudly considers his dog, Max, his daughter — and yes, Max absolutely counts as family 🐶.",
      "Jacen joined Redeemers Structural Solutions after hearing great things about the team and the work environment. He was excited by the chance to be part of a company with strong personalities, great culture, and people who genuinely enjoy working together.",
      "Before joining Redeemers, Jacen worked as a power generator for the National Guard, gaining hands-on experience and technical knowledge that he’s excited to carry into his role here.",
      "When he’s not at work, Jacen enjoys staying active by working out, relaxing with movies, and playing games with his wife. He’s also fueled by dumbbell protein bars and Reese’s — and if candy’s involved, peach rings, Whoppers, or anything chocolate will do just fine.",
      "We’re excited to have Jacen on the team and glad he’s part of the Redeemers Structural Solutions family!",
    ],
    reviews: [
      { quote: "Just want to tell you that the men who worked on my project were courteous and professional beyond my greatest expectations. Thank you for the considerate and effective way these men did their job!Will gladly recommend Redeemers Group to my friends.Thank you,Evelyn", name: "Evelyn S.", loc: "Nesbit, MS" },
      { quote: "Redeemers Group did a fantastic job fixing my garage floor. A tree root had broken the garage floor. Dalton, Randy and Chelsea worked diligently to remove the root which appeared to be partly petrified ‼️ Two different chainsaws could not cut it up.", name: "Cindy T.", loc: "Memphis, TN" },
      { quote: "Tyler and Brennan were super. Everything looks really great. I've had neighbors stop by and comment on how great it looks.", name: "Don D.", loc: "Bartlett, TN" },
    ],
    reviewsAreOwn: false,
    gallery: [
      "/team/g-damaged-concrete-driveway-in-olive-branc-1.jpg",
      "/team/g-damaged-concrete-driveway-in-olive-branc-2.jpg",
      "/team/g-damaged-concrete-driveway-in-olive-branc-3.jpg",
      "/team/g-damaged-concrete-driveway-in-olive-branc-4.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-1.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-2.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-3.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-4.jpg",
    ],
    galleryIsOwn: false,
  },
  {
    name: "Morgan Noe", title: "Accounting Manager", dept: "Accounting", hometown: "Southaven, MS",
    img: "/team/morgan-noe.png",
    bio: [
      "Morgan is the Accounting Manager here at Redeemers Structural Solutions. Originally from Ripley, MS, she currently lives in Southaven, MS. She brings her past experience from being a subshop manager for 3 years, as well as retail experience to our team! Morgan enjoys working with people! She decided to join our team because of the great values she saw!! Morgan noticed that our team strives to do better every day, and that we are passionate about the work we do! She also was a huge fan of the one team mentality that our office has, and how we build each other up.",
      "Morgan is passionate about a lot of things, ranging from the environment, other’s happiness, and her family! When she’s not at work, you can find her spending time indoors: reading, writing, or playing video games, or outdoors: playing basketball, volleyball, or hiking! A handful of her favorites include strawberries, cool weather, and flowers.",
      "An interesting fact about Morgan is that she owns tarantulas! We are so happy to have Morgan on our team!",
    ],
    reviews: [
      { quote: "The guys were GREAT! They communicated everything with me, they were on time, and had everything they needed! [Redeemers Group has an] EXCELLENT Customer Service operation and [they] are very engaged in what they do!", name: "Shannon B.", loc: "Memphis, TN" },
    ],
    reviewsAreOwn: true,
    gallery: [
      "/team/g-repairing-a-devastated-crawl-space-in-co-1.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-2.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-3.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-4.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-5.jpeg",
      "/team/g-repairing-a-devastated-crawl-space-in-co-6.jpeg",
      "/team/g-thanksgiving-potluck-2021-1.jpg",
      "/team/g-thanksgiving-potluck-2021-2.jpg",
      "/team/g-thanksgiving-potluck-2021-3.jpg",
    ],
    galleryIsOwn: true,
  },
  {
    name: "Alex Hacker", title: "System Design Specialist", dept: "System Design", hometown: "Memphis, TN",
    img: "/team/alex-hacker.png",
    bio: [
      "Say hello to Alex, one of the latest additions to the Redeemers Structural Solutions team! A native of Memphis now living in Medina, Alex brings over 15 years of experience in management, customer service, and sales—starting way back when he was selling knives door-to-door and later honing his skills with insurance at Enterprise. With a deep appreciation for the family-first atmosphere and Clint’s vision for the company, Alex knew this was the right place to grow and make an impact.",
      "At home, Alex is all about family. He and his wife are raising three energetic boys—two of whom are in middle school, both dedicated to soccer and baseball (and, apparently, very skilled at house demolition!). Alex doesn’t just cheer from the sidelines—he coaches their soccer teams while his wife holds down the fort with their spirited 3-year-old.",
      "When he’s not closing deals or chasing after his kids, Alex enjoys watching sports, spending time outdoors with his crew, and planning date nights with his wife to discover new and interesting restaurants. His snack game? Strong. Pretzels keep him going, and Reese’s are his ultimate candy treat.",
      "With his heart for people and a wealth of experience, Alex fits right in. We’re lucky to have him on the team!",
    ],
    reviews: [
      { quote: "I got 3 estimates as recommended by Angi's list.......The other two were first to give a quote, but really tried to rush the sale.....Then your people showed up and actually offered more perks for less money because THAT is how your crew does every job (all perks inclusive).....My patio was lifted,…", name: "Lynn F.", loc: "Olive Branch, MS" },
      { quote: "We have worked with Redeemers in the past (crawl space encapsulation) and have been impressed with their professionalism and the quality of their work.", name: "John F.", loc: "Olive Branch, MS" },
      { quote: "Tyler, Brennan, Tommy and Jamal are a great crew. They answered all my questions as to work progressed. Alex did a great job of explaining the contract to me. The work looks great and professionally done. Best is that the pool deck is level and waterproof!", name: "Marc G.", loc: "Germantown, TN" },
    ],
    reviewsAreOwn: true,
    gallery: [
      "/team/g-concrete-driveway-repair-in-germantown-t-1.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-2.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-3.jpg",
      "/team/g-concrete-driveway-repair-in-germantown-t-4.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-1.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-2.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-3.jpg",
      "/team/g-crawl-space-in-wynne-ar-has-moisture-dam-4.jpg",
    ],
    galleryIsOwn: false,
  },
  {
    name: "Joe Sanders", title: "Production Manager", dept: "Production", hometown: "Olive Branch, MS",
    img: "/team/joe-sanders.png",
    bio: [
      "Joe Sanders joins Redeemers Structural Solutions as our Production Manager. His background is in management for industrial facilities and mechanical retail. He worked for Connector Specialists collectively for almost 13 years in management. During his time with Connector, Joe oversaw the merger of a local Memphis company into the Connector Specialists organization. He trained each employee and implemented processes and structure within the new location. He also was able to secure the contract for and produce over $2mil of product for the xAI data center on a tight deadline. He has led many teams in the past and also offers a wide variety of mechanical and construction knowledge. Joe decided to join Redeemers Structural Solutions because of the type of work we do and the company culture. Joe is originally from Byhalia MS but now lives in Olive Branch. Joe’s parents have celebrated 41 years of marriage, and he is 1 of 3 siblings. Joe is a proud father to his daughter and son and a proud uncle to his niece and nephew. In his free time, you can find Joe fishing, hunting, or working in his garden. Welcome to Redeemers Structural Solutions, Joe!",
    ],
    reviews: [
      { quote: "Tyler, Brennan, Tommy and Jamal are a great crew. They answered all my questions as to work progressed. Alex did a great job of explaining the contract to me. The work looks great and professionally done. Best is that the pool deck is level and waterproof!", name: "Marc G.", loc: "Germantown, TN" },
      { quote: "Tyler and Brennan were super. Everything looks really great. I've had neighbors stop by and comment on how great it looks.", name: "Don D.", loc: "Bartlett, TN" },
      { quote: "Just want to tell you that the men who worked on my project were courteous and professional beyond my greatest expectations. Thank you for the considerate and effective way these men did their job!Will gladly recommend Redeemers Group to my friends.Thank you,Evelyn", name: "Evelyn S.", loc: "Nesbit, MS" },
    ],
    reviewsAreOwn: false,
    gallery: [
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-1.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-2.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-3.jpeg",
      "/team/g-repairing-a-crawl-space-inharrisburg-ar-4.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-1.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-2.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-3.jpeg",
      "/team/g-tabernacle-crawl-space-disaster-in-covin-4.jpeg",
    ],
    galleryIsOwn: false,
  },
];

export type TeamMember = typeof TEAM_MEMBERS[0];
