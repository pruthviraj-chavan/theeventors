import brandDesktop from "@/assets/videos/brand-desktop.mp4.asset.json";
import brandMobile from "@/assets/videos/brand-mobile.mp4.asset.json";
import brandPoster from "@/assets/videos/brand-poster.jpg.asset.json";
import estateDesktop from "@/assets/videos/estate-desktop.mp4.asset.json";
import estateMobile from "@/assets/videos/estate-mobile.mp4.asset.json";
import estatePoster from "@/assets/videos/estate-poster.jpg.asset.json";
import guestsDesktop from "@/assets/videos/guests-desktop.mp4.asset.json";
import guestsMobile from "@/assets/videos/guests-mobile.mp4.asset.json";
import guestsPoster from "@/assets/videos/guests-poster.jpg.asset.json";
import dandiyaDesktop from "@/assets/videos/dandiya-desktop.mp4.asset.json";
import dandiyaMobile from "@/assets/videos/dandiya-mobile.mp4.asset.json";
import dandiyaPoster from "@/assets/videos/dandiya-poster.jpg.asset.json";
import entranceDesktop from "@/assets/videos/entrance-desktop.mp4.asset.json";
import entranceMobile from "@/assets/videos/entrance-mobile.mp4.asset.json";
import entrancePoster from "@/assets/videos/entrance-poster.jpg.asset.json";
import courtyardDesktop from "@/assets/videos/courtyard-desktop.mp4.asset.json";
import courtyardMobile from "@/assets/videos/courtyard-mobile.mp4.asset.json";
import courtyardPoster from "@/assets/videos/courtyard-poster.jpg.asset.json";

export type EventFilm = { id: string; title: string; cat: string; duration: string; src: string; mobile: string; thumb: string; original: string };

export const videoLibrary = {
  brand: { id: "brand", title: "The Yaadein Signature", cat: "Brand Film", duration: "0:10", src: brandDesktop.url, mobile: brandMobile.url, thumb: brandPoster.url, original: "Gold_text_reveals_brand_title_20261007105130.mp4" },
  estate: { id: "estate", title: "Petals at the Estate", cat: "Celebration", duration: "0:10", src: estateDesktop.url, mobile: estateMobile.url, thumb: estatePoster.url, original: "Guests_celebrating_at_luxury_estate_20261007103205.mp4" },
  guests: { id: "guests", title: "An Evening Together", cat: "Social", duration: "0:10", src: guestsDesktop.url, mobile: guestsMobile.url, thumb: guestsPoster.url, original: "Guests_celebrating_at_luxury_venue_20261007104512.mp4" },
  dandiya: { id: "dandiya", title: "The Dandiya Night", cat: "Sangeet", duration: "0:10", src: dandiyaDesktop.url, mobile: dandiyaMobile.url, thumb: dandiyaPoster.url, original: "Guests_dancing_with_dandiya_sticks_20261007103229.mp4" },
  entrance: { id: "entrance", title: "A Grand Welcome", cat: "Wedding", duration: "0:10", src: entranceDesktop.url, mobile: entranceMobile.url, thumb: entrancePoster.url, original: "Luxury_celebration_venue_entranc…_1080p_20261007101522.mp4" },
  courtyard: { id: "courtyard", title: "The Palace Courtyard", cat: "Wedding", duration: "0:10", src: courtyardDesktop.url, mobile: courtyardMobile.url, thumb: courtyardPoster.url, original: "Palace_courtyard_prepared_for_ce…_20261007101335.mp4" },
} satisfies Record<string, EventFilm>;

export const heroFilm = videoLibrary.entrance;
export const eventFilms = [videoLibrary.courtyard, videoLibrary.dandiya, videoLibrary.estate, videoLibrary.guests, videoLibrary.entrance, videoLibrary.brand];

export const pageFilms: Record<string, EventFilm> = {
  "/about": videoLibrary.guests,
  "/events": videoLibrary.entrance,
  "/gallery": videoLibrary.courtyard,
  "/blog": videoLibrary.brand,
  "/contact": videoLibrary.estate,
};
