import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images, eventCatalog, whatsappLink } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { FilmGallery } from "@/components/site/FilmGallery";
import { Reveal } from "@/components/site/Reveal";
import { motion } from "motion/react";

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

    {/* -------- EVENT CATEGORY GALLERY -------- */}
    <section className="overflow-hidden bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 grid items-end gap-5 md:grid-cols-[1fr_auto]">
          <div><p className="eyebrow text-gold">Our celebrations</p><h2 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">Crafted in detail. <span className="italic text-gold">Lived in full.</span></h2></div>
          <p className="max-w-sm text-sm text-muted-foreground">A look at the events, stages, celebrations and experiences created by The Eventors.</p>
        </div>
        <div className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
          {eventCatalog.map((cat, index) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 3) * 0.06 }} className="mb-3 break-inside-avoid md:mb-5">
              <a href={whatsappLink(`Hi The Eventors! I'm interested in ${cat.title}.`)} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-lg shadow-soft">
                <img src={cat.image} alt={cat.alt} loading="lazy" decoding="async" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index % 5 === 0 ? "aspect-[4/5]" : index % 3 === 0 ? "aspect-square" : "aspect-[3/4]"}`} />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 whitespace-normal p-3 text-pearl sm:p-4">
                  <span className="eyebrow text-champagne">{cat.examples.slice(0, 2).join(" · ")}</span>
                  <span className="mt-1 block font-display text-lg leading-tight sm:text-xl">{cat.title}</span>
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <FinalCta />
  </>;
}
