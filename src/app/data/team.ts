// ─── Team — shared source of truth ───────────────────────────────────────────
// One member list, reused by the About page teaser (People section) and the
// dedicated Team page (the full roster, no department filter, no pagination).
export const DEPARTMENTS = ["Accounting", "Production", "Customer Care", "System Design", "Service"];

export const TEAM_MEMBERS = [
  { name: "Christopher Lowrie", title: "Customer Care Manager",    dept: "Customer Care", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Stephen Kline",      title: "Account Manager",          dept: "Customer Care", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Brandon Hunt",       title: "Project Coordinator",      dept: "Production",    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Catina McGowan",     title: "Customer Care Specialist",  dept: "Customer Care", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Kelsey Allen",       title: "Customer Care Specialist",  dept: "Customer Care", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Michael Kline",      title: "Customer Care Specialist",  dept: "Customer Care", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "David Torres",       title: "Foundation Technician",    dept: "Service",       img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "Sarah Mitchell",     title: "Accounting Lead",          dept: "Accounting",    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
  { name: "James Redmond",      title: "System Designer",          dept: "System Design", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400" },
];

export type TeamMember = typeof TEAM_MEMBERS[0];

export const MODAL_REVIEWS = [
  { quote: "Everything from start to finish was done very courteous and professional.", name: "Victoria E.", loc: "Memphis, TN" },
  { quote: "The crew was excellent communicators and hard workers. Done well within the time given.", name: "Elizabeth N.", loc: "Collierville, TN" },
  { quote: "Such a professional team. Made the whole process stress-free from start to finish.", name: "Melissa C.", loc: "Marked Tree, AR" },
];

export const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
];
