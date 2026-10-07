import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { EmptyState, useSwitchLoading } from "@/components/site/Loader";
import { images, showcase } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { FilmGallery } from "@/components/site/FilmGallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Gallery — Moments Captured, Memories Forever | Yaadein" },
      { name: "description", content: "Browse weddings, corporate galas, social evenings and birthday celebrations crafted by Yaadein." },
      { property: "og:title", content: "Yaadein Gallery" },
      { property: "og:description", content: "Every picture tells a story of Yaadein." },
    ],
  }),
  component: Gallery,
});

const spans = ["row-span-2", "", "", "col-span-2", "", "row-span-2", "", ""];

function Gallery() {
  const tabs = ["All", "Wedding", "Corporate", "Social", "Birthday"];
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState<(typeof showcase)[number] | null>(null);
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
