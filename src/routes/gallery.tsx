import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { FilmGallery } from "@/components/site/FilmGallery";
import { RealPhotoGallery } from "@/components/site/RealPhotoGallery";
import { realFilms } from "@/lib/realMedia";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Gallery — Moments Captured, Memories Forever | The Eventors" },
      { name: "description", content: "Browse weddings, corporate galas, social evenings and birthday celebrations crafted by The Eventors." },
      { property: "og:title", content: "The Eventors Gallery" },
      { property: "og:description", content: "Every picture tells a story of The Eventors." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return <>
    <PageHero eyebrow="Our Gallery" title={<>Moments captured, <span className="text-gold-gradient italic">memories forever</span></>} sub="A glimpse into the celebrations we've been honoured to craft." img={images.social} />
    <FilmGallery variant="gallery" />
    <RealPhotoGallery />
    <FilmGallery variant="gallery" films={realFilms} eyebrow="Real Event Films" title="The celebrations, as they happened" />
    <FinalCta />
  </>;
}
