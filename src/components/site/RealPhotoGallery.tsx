import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { ArrowRight, Images, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { realPhotos } from "@/lib/realMedia";

export function RealPhotoGallery({ preview = false }: { preview?: boolean }) {
  const [open, setOpen] = useState<(typeof realPhotos)[number] | null>(null);
  const photos = preview ? realPhotos.filter((_, index) => [0, 5, 10, 14, 20, 26].includes(index)) : realPhotos;
  return <section className="overflow-hidden bg-ivory py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-6">
      <div className="mb-10 grid items-end gap-5 md:grid-cols-[1fr_auto]">
        <div><p className="eyebrow text-gold">Real celebrations</p><h2 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">Crafted in detail. <span className="italic text-gold">Lived in full.</span></h2></div>
        {preview ? <Button asChild variant="link" className="justify-start px-0 text-foreground"><Link to="/gallery">View Full Gallery <ArrowRight /></Link></Button> : <p className="max-w-sm text-sm text-muted-foreground">A genuine look at spaces, stages, entrances and live performances created by The Eventors.</p>}
      </div>
      <div className={preview ? "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5" : "columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4"}>
        {photos.map((photo, index) => <motion.div key={photo.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 3) * 0.06 }} className={preview ? "min-w-0" : "mb-3 break-inside-avoid md:mb-5"}>
          <Button variant="ghost" onClick={() => setOpen(photo)} aria-label={`Open ${photo.title}`} className="group relative block h-auto w-full overflow-hidden rounded-lg p-0 text-left shadow-soft hover:bg-transparent">
            <img src={photo.img} alt={photo.title} loading="lazy" decoding="async" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${preview ? "aspect-[4/5]" : index % 5 === 0 ? "aspect-[4/5]" : index % 3 === 0 ? "aspect-square" : "aspect-[3/4]"}`} />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-pearl/40 bg-midnight/35 text-pearl backdrop-blur"><Images size={15} /></span>
            <span className="absolute inset-x-0 bottom-0 whitespace-normal p-3 text-pearl sm:p-4"><span className="eyebrow text-champagne">{photo.cat}</span><span className="mt-1 block font-display text-lg leading-tight sm:text-xl">{photo.title}</span></span>
          </Button>
        </motion.div>)}
      </div>
    </div>
    <Dialog.Root open={Boolean(open)} onOpenChange={(value) => { if (!value) setOpen(null); }}>
      {open && <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-midnight/95 backdrop-blur-md" />
        <Dialog.Content aria-describedby={undefined} className="fixed left-1/2 top-1/2 z-[81] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 text-pearl outline-none">
          <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close photo" className="absolute -top-14 right-0 h-11 w-11 rounded-full border border-pearl/30 text-pearl"><X /></Button></Dialog.Close>
          <img src={open.img} alt={open.title} className="mx-auto max-h-[72svh] w-full rounded-lg object-contain" />
          <Dialog.Title className="mt-4 font-display text-2xl">{open.title}</Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>}
    </Dialog.Root>
  </section>;
}