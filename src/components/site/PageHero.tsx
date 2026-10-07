import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Particles } from "./Reveal";

export function PageHero({ eyebrow, title, sub, img, children }: { eyebrow: string; title: ReactNode; sub: string; img: string; children?: ReactNode }) {
  return (
    <section className="bg-night grain relative overflow-hidden pt-32 pb-16 text-pearl md:pt-40 md:pb-24">
      <img src={img} alt="" className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
      <Particles count={12} />
      <div className="light-leak -top-20 right-0 h-80 w-80 bg-magenta/25" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-champagne">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-4 max-w-3xl text-[2.7rem] leading-[1.02] sm:text-6xl md:text-7xl">{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-5 max-w-xl text-pearl/70">{sub}</motion.p>
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
