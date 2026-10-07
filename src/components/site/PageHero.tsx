import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Particles } from "./Reveal";

export function PageHero({ eyebrow, title, sub, img, children }: { eyebrow: string; title: ReactNode; sub: string; img: string; children?: ReactNode }) {
  return (
    <section className="bg-night grain relative overflow-hidden pt-36 pb-24 text-pearl">
      <img src={img} alt="" className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
      <Particles count={12} />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-champagne">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-4 max-w-3xl text-5xl leading-[1.02] md:text-7xl">{title}</motion.h1>
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
      <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
    </div>
  );
}
