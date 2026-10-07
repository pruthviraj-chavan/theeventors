import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Particles } from "./Reveal";
import { useRouterState } from "@tanstack/react-router";
import { pageFilms } from "@/lib/media";
import { EventVideo } from "./EventVideo";

export function PageHero({ eyebrow, title, sub, img, children }: { eyebrow: string; title: ReactNode; sub: string; img: string; children?: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const film = pageFilms[path];
  return (
    <section className="bg-night grain relative overflow-hidden pt-28 pb-10 text-pearl md:pt-32 md:pb-12">
      {film ? <EventVideo film={film} priority className="absolute inset-0 h-full w-full" /> : <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/60 to-midnight/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
      <Particles count={12} />
      <div className="pointer-events-none relative mx-auto max-w-7xl px-5 sm:px-6 [&_button]:pointer-events-auto [&_input]:pointer-events-auto">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-champagne">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl md:text-6xl">{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 max-w-xl text-sm text-pearl/75">{sub}</motion.p>
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, className = "" }: { eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-[2.3rem] leading-[1.08] sm:text-5xl">{title}</h2>
    </div>
  );
}
