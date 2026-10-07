import wedding from "@/assets/wedding.jpg";
import corporate from "@/assets/corporate.jpg";
import birthday from "@/assets/birthday.jpg";
import social from "@/assets/social.jpg";
import sangeet from "@/assets/sangeet.jpg";
import lanterns from "@/assets/lanterns.jpg";
import team from "@/assets/team.jpg";
import hero from "@/assets/hero.jpg";
import { eventFilms, heroFilm } from "./media";

export const images = { wedding, corporate, birthday, social, sangeet, lanterns, team, hero };

export const CONTACT = {
  phone: "+91 98765 43210",
  phoneRaw: "919876543210",
  email: "hello@yaadein.events",
  city: "Pune, Maharashtra, India",
};

export const whatsappLink = (msg = "Hi Yaadein! I'd love to plan an event with you.") =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(msg)}`;

export type Category = "Wedding" | "Corporate" | "Social" | "Birthday";

export const categories: { name: Category; desc: string; img: string; long: string }[] = [
  { name: "Wedding", desc: "Once-in-a-lifetime moments, beautifully crafted.", img: wedding, long: "Mandaps, sangeets, receptions and destination weddings — designed around your love story, down to the last marigold." },
  { name: "Corporate", desc: "Professional events that create new opportunities.", img: corporate, long: "Conferences, galas, product launches and offsites with flawless production and a story your team remembers." },
  { name: "Social", desc: "Get-togethers, anniversaries & celebrations.", img: social, long: "Anniversaries, engagements, baby showers and soirées — intimate or grand, always deeply personal." },
  { name: "Birthday", desc: "Because every age deserves a party.", img: birthday, long: "From first birthdays to milestone sixtieths — themed, joyful and full of little surprises." },
];

export const showcase = [
  { title: "The Palace Pheras", cat: "Wedding", loc: "Udaipur", date: "Feb 2026", img: hero },
  { title: "Global Leaders Summit", cat: "Corporate", loc: "Mumbai", date: "Jan 2026", img: corporate },
  { title: "Rang Sangeet Night", cat: "Wedding", loc: "Pune", date: "Dec 2025", img: sangeet },
  { title: "Chandelier Garden Dinner", cat: "Social", loc: "Lonavala", date: "Nov 2025", img: social },
  { title: "Blush & Gold Sweet Sixteen", cat: "Birthday", loc: "Pune", date: "Oct 2025", img: birthday },
  { title: "Lantern Lake Vows", cat: "Wedding", loc: "Nainital", date: "Sep 2025", img: lanterns },
  { title: "Rahul & Meera", cat: "Wedding", loc: "Jaipur", date: "Aug 2025", img: wedding },
  { title: "Grand Ballroom Gala", cat: "Corporate", loc: "Bengaluru", date: "Jul 2025", img: team },
] as const;

export const testimonials = [
  { quote: "They turned our dream wedding into a magical reality. Truly unforgettable!", name: "Priya & Rohit", event: "Wedding, Pune" },
  { quote: "Their planning and creativity made our corporate event a huge success.", name: "Amit Sharma", event: "Corporate Event, Mumbai" },
  { quote: "From decoration to entertainment, everything was perfect. We created beautiful yaadein!", name: "Sneha Kulkarni", event: "Birthday Celebration, Pune" },
];

export const posts = [
  { title: "10 Trending Wedding Themes for 2026", cat: "Wedding Tips", date: "Oct 1, 2026", read: "5 min", img: wedding, excerpt: "From heritage palace pheras to modern pastel mandaps — themes that make your day unmistakably yours." },
  { title: "How to Plan a Stress-Free Event", cat: "Event Planning", date: "Sep 22, 2026", read: "6 min", img: team, excerpt: "A simple checklist and timeline to help you enjoy the journey as much as the celebration." },
  { title: "Why Corporate Events Matter", cat: "Corporate", date: "Sep 10, 2026", read: "4 min", img: corporate, excerpt: "Build stronger teams and lasting brand impressions with thoughtfully produced experiences." },
  { title: "Creative Birthday Ideas for All Ages", cat: "Birthday Ideas", date: "Aug 28, 2026", read: "5 min", img: birthday, excerpt: "Make every birthday feel special — themes, décor and surprises guests will talk about." },
  { title: "The Magic of a Sangeet Night", cat: "Wedding Tips", date: "Aug 12, 2026", read: "4 min", img: sangeet, excerpt: "Choreography, colour and music — how to plan the most joyful night of the wedding week." },
  { title: "Lighting That Tells a Story", cat: "Trends", date: "Jul 30, 2026", read: "6 min", img: lanterns, excerpt: "Candles, lanterns and chandeliers — why light is the most emotional element of any event." },
];

export const HERO_VIDEO = heroFilm.src;
export const films = eventFilms;
