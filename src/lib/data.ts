import wedding from "@/assets/wedding.jpg";
import corporate from "@/assets/corporate.jpg";
import birthday from "@/assets/birthday.jpg";
import social from "@/assets/social.jpg";
import sangeet from "@/assets/sangeet.jpg";
import lanterns from "@/assets/lanterns.jpg";
import team from "@/assets/team.jpg";
import hero from "@/assets/hero.jpg";
import catWedding from "@/assets/categories/wedding-events.jpg";
import catTraditional from "@/assets/categories/traditional-cultural.jpg";
import catPreWedding from "@/assets/categories/pre-wedding.jpg";
import catBirthday from "@/assets/categories/birthday.jpg";
import catFamily from "@/assets/categories/family-celebrations.jpg";
import catCorporate from "@/assets/categories/corporate-events.jpg";
import catCollege from "@/assets/categories/college-events.jpg";
import catEntertainment from "@/assets/categories/entertainment.jpg";
import catReligious from "@/assets/categories/religious-spiritual.jpg";
import catExhibitions from "@/assets/categories/exhibitions-brand.jpg";
import catSports from "@/assets/categories/sports-community.jpg";
import catConcerts from "@/assets/categories/concerts-entertainment.jpg";
import catHaldi from "@/assets/categories/haldi-prewedding.jpg";
import { eventFilms, heroFilm } from "./media";

export const images = { wedding, corporate, birthday, social, sangeet, lanterns, team, hero };

export const CONTACT = {
  phone: "+91 98044 89525",
  phoneRaw: "919804489525",
  email: "hello@yaadein.events",
  city: "Flat No. 3, Golden Residency, Co-operative Building, Jheel Bagan, Hatiara, Baguihati, Kolkata - 700157",
};

export const whatsappLink = (msg = "Hi The Eventors! I'd like to enquire about an event.") =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(msg)}`;

export type Category = "Wedding" | "Corporate" | "Social" | "Birthday";

export const categories: { name: Category; desc: string; img: string; long: string }[] = [
  { name: "Wedding", desc: "Once-in-a-lifetime moments, beautifully crafted.", img: wedding, long: "Mandaps, sangeets, receptions and destination weddings — designed around your love story, down to the last marigold." },
  { name: "Corporate", desc: "Professional events that create new opportunities.", img: corporate, long: "Conferences, galas, product launches and offsites with flawless production and a story your team remembers." },
  { name: "Social", desc: "Get-togethers, anniversaries & celebrations.", img: social, long: "Anniversaries, engagements, baby showers and soirées — intimate or grand, always deeply personal." },
  { name: "Birthday", desc: "Because every age deserves a party.", img: birthday, long: "From first birthdays to milestone sixtieths — themed, joyful and full of little surprises." },
];

/** Indian event category catalog with local imagery. */
export const eventCatalog = [
  { id: "weddings", title: "Wedding Events", image: catWedding, alt: "A grand Indian palace wedding mandap at dusk", description: "From intimate vows to grand destination celebrations.", examples: ["Grand weddings", "Destination weddings", "Royal weddings", "Wedding receptions", "Intimate weddings", "Court-marriage celebrations"] },
  { id: "traditional-cultural", title: "Traditional & Cultural Events", image: catTraditional, alt: "Dandiya night with colourful dancers and bright lights", description: "Celebrate India's colour, rituals and regional traditions.", examples: ["Dandiya nights", "Garba nights", "Navratri", "Ganesh Chaturthi", "Diwali parties", "Holi", "Makar Sankranti", "Onam", "Pongal", "Baisakhi"] },
  { id: "pre-wedding", title: "Pre-Wedding Functions", image: catPreWedding, alt: "Women celebrating at a colourful mehendi ceremony", description: "Every joyful gathering in the lead-up to the wedding.", examples: ["Haldi", "Mehendi", "Sangeet", "Roka", "Engagement", "Cocktail nights", "Bridal showers", "Bachelor parties", "Bachelorette parties"] },
  { id: "birthdays", title: "Birthday Celebrations", image: catBirthday, alt: "Guests celebrating at a luxury birthday party", description: "Thoughtful themes and joyful details for every age.", examples: ["Kids' birthdays", "First birthdays", "Milestone birthdays", "18th and 21st birthdays", "50th birthdays", "Surprise parties", "Themed birthday parties"] },
  { id: "family-celebrations", title: "Family & Personal Celebrations", image: catFamily, alt: "A family celebrating together at a festive gathering", description: "Meaningful milestones shared with the people closest to you.", examples: ["Baby showers", "Godh Bharai", "Naming ceremonies", "Annaprashan", "Housewarming (Griha Pravesh)", "Anniversaries", "Retirement parties", "Family reunions"] },
  { id: "corporate-events", title: "Corporate Events", image: catCorporate, alt: "Attendees at a grand corporate gala with blue-lit stage", description: "Polished experiences for teams, partners and brands.", examples: ["Annual functions", "Conferences", "Product launches", "Award ceremonies", "Team-building activities", "Dealer meets", "Business networking", "Company anniversaries"] },
  { id: "college-education", title: "College & Educational Events", image: catCollege, alt: "A grand stage setup for a college celebration", description: "Memorable moments for schools, colleges and alumni.", examples: ["Freshers' parties", "Farewells", "Annual days", "College fests", "Cultural programs", "Alumni meets", "Graduations", "School functions", "Sports days", "Talent shows"] },
  { id: "entertainment", title: "Entertainment & Live Shows", image: catEntertainment, alt: "A luxury ballroom set for a live entertainment evening", description: "Big-stage energy, live performance and nights to remember.", examples: ["Live concerts", "Celebrity appearances", "DJ nights", "Comedy shows", "Musical evenings", "Fashion shows", "Talent competitions", "Award nights"] },
  { id: "religious-spiritual", title: "Religious & Spiritual Events", image: catReligious, alt: "A serene temple courtyard with devotees and diyas at dusk", description: "Warm, considered settings for devotional gatherings.", examples: ["Bhajan Sandhya", "Jagran", "Satyanarayan Puja", "Bhagwat Katha", "Ram Katha", "Temple inaugurations", "Satsang", "Spiritual gatherings"] },
  { id: "school-college", title: "School & College Events", image: catHaldi, alt: "A decorated stage ready for a school annual day", description: "Celebrate academic milestones with colour and energy.", examples: ["Annual days", "Freshers' parties", "Farewell parties", "Cultural festivals", "Graduations", "Sports days", "Talent shows"] },
  { id: "concerts", title: "Concerts & Entertainment", image: catConcerts, alt: "A spectacular Bollywood night concert with massive crowd", description: "Live music, big crowds and unforgettable stage nights.", examples: ["Live music concerts", "DJ nights", "Bollywood nights", "Celebrity shows", "Comedy nights", "Fashion shows", "Dance competitions"] },
  { id: "exhibitions-brand", title: "Exhibitions & Brand Events", image: catExhibitions, alt: "A traditional festival setting transformed for a brand showcase", description: "Bring products, ideas and audiences together with impact.", examples: ["Trade fairs", "Business expos", "Product launches", "Promotional campaigns", "Roadshows", "Brand activations", "Store openings"] },
  { id: "sports-community", title: "Sports & Community Events", image: catSports, alt: "A vibrant community cricket tournament under floodlights", description: "Bring neighbours, teams and communities together.", examples: ["Cricket tournaments", "Kabaddi competitions", "Marathons", "Society gatherings", "Charity events", "Public awareness campaigns"] },
] as const;

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
  { quote: "From decoration to entertainment, everything was perfect. We created beautiful memories!", name: "Sneha Kulkarni", event: "Birthday Celebration, Pune" },
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
