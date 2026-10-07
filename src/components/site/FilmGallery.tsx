import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventVideo } from "./EventVideo";
import { eventFilms, type EventFilm } from "@/lib/media";

export function FilmModal({ film, onClose }: { film: EventFilm | null; onClose: () => void }) {
  const [failed, setFailed] = useState(false);
  return <Dialog.Root open={Boolean(film)} onOpenChange={(open) => { if (!open) onClose(); setFailed(false); }}>
    {film && <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[80] bg-midnight/95 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
      <Dialog.Content aria-describedby={undefined} className="fixed top-1/2 left-1/2 z-[81] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 text-pearl outline-none data-[state=open]:animate-in data-[state=open]:zoom-in-95">
        <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close video" className="absolute -top-14 right-0 h-11 w-11 rounded-full border border-pearl/30 text-pearl"><X /></Button></Dialog.Close>
        <div className="aspect-video overflow-hidden rounded-lg bg-navy">
          {failed ? <div role="alert" className="grid h-full place-content-center gap-4 p-6 text-center"><p>This film couldn’t load.</p><Button onClick={() => setFailed(false)}>Try again</Button></div> : <video key={film.id} poster={film.thumb} autoPlay controls playsInline preload="auto" onError={() => setFailed(true)} className="h-full w-full" aria-label={`Full film: ${film.title}`}><source src={film.src} type={'video/mp4; codecs="avc1.42E01E"'} /><source src={film.webm} type="video/webm" /></video>}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><Dialog.Title className="font-display text-2xl sm:text-3xl">{film.title}</Dialog.Title><p className="text-xs text-champagne">{film.cat} · {film.duration}</p></div>
      </Dialog.Content>
    </Dialog.Portal>}
  </Dialog.Root>;
}

export function FilmTile({ film, onOpen, className = "", number }: { film: EventFilm; onOpen: (film: EventFilm) => void; className?: string; number?: number }) {
  return <article className={`group relative min-w-0 overflow-hidden rounded-lg ${className}`}>
    <EventVideo film={film} controls={false} className="absolute inset-0 h-full w-full" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/95 via-transparent to-midnight/25" />
    <span className="absolute top-4 left-4 text-xs text-champagne">{number ? `0${number} / ` : ""}{film.cat}</span>
    <span className="absolute top-4 right-4 text-xs text-pearl">{film.duration}</span>
    <Button variant="ghost" onClick={() => onOpen(film)} aria-label={`Play film: ${film.title}`} className="absolute inset-0 h-full w-full rounded-none bg-transparent p-0 hover:bg-transparent">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-pearl/60 bg-midnight/25 text-pearl transition-transform group-hover:scale-110"><Play fill="currentColor" /></span>
    </Button>
    <h3 className="pointer-events-none absolute bottom-5 left-5 max-w-[80%] font-display text-2xl leading-tight text-pearl sm:text-3xl">{film.title}</h3>
  </article>;
}

export function FilmGallery({ variant, films = eventFilms }: { variant: "about" | "events" | "gallery"; films?: EventFilm[] }) {
  const [open, setOpen] = useState<EventFilm | null>(null);
  const titles = { about: "The feeling behind Yaadein", events: "Celebrations in motion", gallery: "The moving collection" };
  return <section className={`overflow-hidden py-16 md:py-24 ${variant === "about" ? "bg-ivory text-foreground" : "bg-midnight text-pearl"}`}>
    <div className="mx-auto max-w-7xl px-5 sm:px-6">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-gold">Yaadein Films</p><h2 className="mt-3 text-4xl leading-tight sm:text-5xl">{titles[variant]}</h2></div><span className="text-xs text-gold">{films.length.toString().padStart(2, "0")} short films</span></div>
      <div className={variant === "about" ? "grid gap-5 md:grid-cols-[1.6fr_1fr]" : variant === "events" ? "swipe-row pb-3" : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
        {films.map((film, i) => <FilmTile key={film.id} film={film} onOpen={setOpen} number={i + 1} className={variant === "events" ? "aspect-[4/5] w-[84%] sm:w-[360px]" : variant === "about" && i === 0 ? "aspect-video md:row-span-2 md:aspect-auto md:min-h-[500px]" : "aspect-video"} />)}
      </div>
    </div>
    <FilmModal film={open} onClose={() => setOpen(null)} />
  </section>;
}