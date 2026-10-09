import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Images, X } from "lucide-react";
import { EmptyState, useSwitchLoading } from "@/components/site/Loader";
import { images, showcase } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { FilmGallery } from "@/components/site/FilmGallery";
import { realFilms, realPhotos } from "@/lib/realMedia";

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

const spans = ["row-span-2", "", "", "col-span-2", "", "row-span-2", "", ""];
type GalleryMoment = { title: string; cat: string; loc: string; date: string; img: string };

function Gallery() {
  const tabs = ["All", "Wedding", "Corporate", "Social", "Birthday"];
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState<GalleryMoment | null>(null);
  const loading = useSwitchLoading(tab);
  const items = showcase.filter((s) => tab === "All" || s.cat === tab);
  return (
    <>
      <PageHero eyebrow="Our Gallery" title={<>Moments captured, <span className="text-gold-gradient italic">memories forever</span></>} sub="A glimpse into the celebrations we've been honoured to craft." img={images.social}>
        <div role="tablist" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} role="tab" aria-selected={tab === t} className={`min-h-11 shrink-0 rounded-full px-5 text-sm transition-all ${tab === t ? "bg-gold text-midnight" : "border border-pearl/25 text-pearl hover:border-champagne"}`}>{t}</button>
          ))}
        </div>
      </PageHero>
      <FilmGallery variant="gallery" />
      <section className="overflow-hidden bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 grid items-end gap-5 md:grid-cols-[1fr_auto]">
            <div><p className="eyebrow text-gold">Real celebrations</p><h2 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">Crafted in detail. <span className="italic text-gold">Lived in full.</span></h2></div>
            <p className="max-w-sm text-sm text-muted-foreground">A genuine look at spaces, stages, entrances and live performances created by The Eventors.</p>
          </div>
          <div className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
            {realPhotos.map((photo, index) => (
              <motion.button key={photo.id} onClick={() => setOpen({ title: photo.title, cat: photo.cat, loc: "Kolkata", date: "The Eventors", img: photo.img })} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 4) * 0.06 }} className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg text-left shadow-soft md:mb-5">
                <img src={photo.img} alt={photo.title} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index % 5 === 0 ? "aspect-[4/5]" : index % 3 === 0 ? "aspect-square" : "aspect-[3/4]"}`} />
                <span className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-pearl/40 bg-midnight/35 text-pearl backdrop-blur"><Images size={15} /></span>
                <span className="absolute inset-x-0 bottom-0 p-3 text-pearl sm:p-4"><span className="eyebrow text-champagne">{photo.cat}</span><span className="mt-1 block font-display text-lg leading-tight sm:text-xl">{photo.title}</span></span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      <FilmGallery variant="gallery" films={realFilms} eyebrow="Real Event Films" title="The celebrations, as they happened" />
      <section className="bg-ivory py-14 md:py-20">
        {loading ? (
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 sm:gap-4 sm:px-6 md:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton aspect-square rounded-2xl" />)}</div>
        ) : items.length === 0 ? (
          <EmptyState title="No moments yet" text="We're curating this collection. Check back soon." action={<button onClick={() => setTab("All")} className="btn-ghost-dark">Show all</button>} />
        ) : (
        <motion.div layout className="mx-auto grid max-w-7xl auto-rows-[170px] grid-flow-dense grid-cols-2 gap-3 px-5 sm:auto-rows-[220px] sm:gap-4 sm:px-6 md:auto-rows-[240px] md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((s, i) => (
              <motion.button layout key={s.title} onClick={() => setOpen(s)} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4 }} className={`group relative overflow-hidden rounded-2xl text-left ${tab === "All" ? spans[i] : ""}`} aria-label={`Open ${s.title}`}>
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
                <div className="absolute bottom-0 p-3 text-pearl transition-opacity duration-500 group-hover:opacity-100 sm:p-5 md:opacity-0">
                  <span className="eyebrow text-champagne">{s.cat}</span>
                  <p className="font-display text-lg leading-tight sm:text-2xl">{s.title}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </section>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-midnight/90 p-6 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button aria-label="Close" className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-pearl/30 text-pearl"><X /></button>
            <motion.figure initial={{ scale: 0.92 }} animate={{ scale: 1 }} className="max-w-5xl text-pearl">
              <img src={open.img} alt={open.title} className="max-h-[78vh] rounded-2xl object-contain" />
              <figcaption className="mt-4 font-display text-2xl">{open.title} <span className="text-base text-pearl/60">— {open.loc}, {open.date}</span></figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
      <FinalCta />
    </>
  );
}
