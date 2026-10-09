import type { EventFilm } from "./media";

import photo01 from "@/assets/real/photos/event-01.webp.asset.json";
import photo02 from "@/assets/real/photos/event-02.webp.asset.json";
import photo03 from "@/assets/real/photos/event-03.webp.asset.json";
import photo04 from "@/assets/real/photos/event-04.webp.asset.json";
import photo05 from "@/assets/real/photos/event-05.webp.asset.json";
import photo06 from "@/assets/real/photos/event-06.webp.asset.json";
import photo07 from "@/assets/real/photos/event-07.webp.asset.json";
import photo08 from "@/assets/real/photos/event-08.webp.asset.json";
import photo09 from "@/assets/real/photos/event-09.webp.asset.json";
import photo10 from "@/assets/real/photos/event-10.webp.asset.json";
import photo11 from "@/assets/real/photos/event-11.webp.asset.json";
import photo12 from "@/assets/real/photos/event-12.webp.asset.json";
import photo13 from "@/assets/real/photos/event-13.webp.asset.json";
import photo14 from "@/assets/real/photos/event-14.webp.asset.json";
import photo15 from "@/assets/real/photos/event-15.webp.asset.json";
import photo16 from "@/assets/real/photos/event-16.webp.asset.json";
import photo17 from "@/assets/real/photos/event-17.webp.asset.json";
import photo18 from "@/assets/real/photos/event-18.webp.asset.json";
import photo19 from "@/assets/real/photos/event-19.webp.asset.json";
import photo20 from "@/assets/real/photos/event-20.webp.asset.json";
import photo21 from "@/assets/real/photos/event-21.webp.asset.json";
import photo22 from "@/assets/real/photos/event-22.webp.asset.json";
import photo23 from "@/assets/real/photos/event-23.webp.asset.json";
import photo24 from "@/assets/real/photos/event-24.webp.asset.json";
import photo25 from "@/assets/real/photos/event-25.webp.asset.json";
import photo26 from "@/assets/real/photos/event-26.webp.asset.json";
import photo27 from "@/assets/real/photos/event-27.webp.asset.json";
import photo28 from "@/assets/real/photos/event-28.webp.asset.json";
import photo29 from "@/assets/real/photos/event-29.webp.asset.json";
import real01Mp4 from "@/assets/real/videos/real-01.mp4.asset.json";
import real01Webm from "@/assets/real/videos/real-01.webm.asset.json";
import real01Poster from "@/assets/real/videos/real-01.jpg.asset.json";
import real02Mp4 from "@/assets/real/videos/real-02.mp4.asset.json";
import real02Webm from "@/assets/real/videos/real-02.webm.asset.json";
import real02Poster from "@/assets/real/videos/real-02.jpg.asset.json";
import real03Mp4 from "@/assets/real/videos/real-03.mp4.asset.json";
import real03Webm from "@/assets/real/videos/real-03.webm.asset.json";
import real03Poster from "@/assets/real/videos/real-03.jpg.asset.json";
import decorPdf from "@/assets/real/guides/decor.pdf.asset.json";
import decorCover from "@/assets/real/guides/decor-cover.jpg.asset.json";
import poolBarPdf from "@/assets/real/guides/pool-bar-menu.pdf.asset.json";
import poolBarCover from "@/assets/real/guides/pool-bar-menu-cover.jpg.asset.json";
import cocktailsPdf from "@/assets/real/guides/pool-cocktails.pdf.asset.json";
import cocktailsCover from "@/assets/real/guides/pool-cocktails-cover.jpg.asset.json";
import poolEventsPdf from "@/assets/real/guides/pool-events.pdf.asset.json";
import poolEventsCover from "@/assets/real/guides/pool-events-cover.jpg.asset.json";

const photos = [photo01, photo02, photo03, photo04, photo05, photo06, photo07, photo08, photo09, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20, photo21, photo22, photo23, photo24, photo25, photo26, photo27, photo28, photo29];
const titles = ["Heritage Story Wall", "A Regal Welcome", "Vintage Garden Detail", "Botanical Tablescape", "Vintage Garden", "Golden Banquet", "Candlelit Celebration", "A Walk Through Light", "Celebration Details", "Enchanted Floral Ring", "The Floral Stage", "Festive Centrepiece", "Wedding Welcome", "Marigold Canopy", "Traditional Wedding Stage", "Ceremonial Entrance", "Wedding Pavilion", "Wedding Stage", "Sound & Light", "Modern Lounge", "The Blue Welcome", "Corporate Entry", "Stage in Blue", "Conference Night", "Floral Passage", "The Grand Entry", "Live Performance", "A Night of Dance", "Cinematic Celebration"];

export const realPhotos = photos.map((asset, index) => ({
  id: `real-${index + 1}`,
  title: titles[index] ?? `The Eventors Moment ${index + 1}`,
  cat: index < 13 ? "Decor" : index < 18 ? "Wedding" : index < 26 ? "Corporate" : "Live Experiences",
  img: asset.url,
}));

export const realFilms: EventFilm[] = [
  { id: "real-film-01", title: "Inside the Celebration", cat: "Real Event", duration: "0:42", src: real01Mp4.url, mobile: real01Mp4.url, webm: real01Webm.url, mobileWebm: real01Webm.url, thumb: real01Poster.url, original: "WhatsApp Video 2026-10-07 at 11.18.39.mp4" },
  { id: "real-film-02", title: "Details in Motion", cat: "Real Event", duration: "0:30", src: real02Mp4.url, mobile: real02Mp4.url, webm: real02Webm.url, mobileWebm: real02Webm.url, thumb: real02Poster.url, original: "WhatsApp Video 2026-10-07 at 11.18.42.mp4" },
  { id: "real-film-03", title: "The Eventors Experience", cat: "Real Event", duration: "1:17", src: real03Mp4.url, mobile: real03Mp4.url, webm: real03Webm.url, mobileWebm: real03Webm.url, thumb: real03Poster.url, original: "WhatsApp Video 2026-10-07 at 11.20.21.mp4" },
];

export const eventGuides = [
  { title: "Décor Lookbook", eyebrow: "21-page collection", description: "Stages, entrances, mandaps, floral installations and atmospheric décor concepts.", cover: decorCover.url, href: decorPdf.url },
  { title: "Pool Events", eyebrow: "15-page experience guide", description: "Poolside styling, entertainment, lighting, personalised details and celebration ideas.", cover: poolEventsCover.url, href: poolEventsPdf.url },
  { title: "Pool Cocktails", eyebrow: "17-page inspiration book", description: "Colourful drinks, tropical presentation and poolside bar styling inspiration.", cover: cocktailsCover.url, href: cocktailsPdf.url },
  { title: "Pool Bar Menu", eyebrow: "5-page menu guide", description: "A curated pool-party beverage and cocktail menu presentation.", cover: poolBarCover.url, href: poolBarPdf.url },
] as const;