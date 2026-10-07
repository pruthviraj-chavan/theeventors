import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { images, whatsappLink } from "@/lib/data";
import { Particles, Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-midnight py-28 text-center md:py-36 text-pearl">
      <img src={images.lanterns} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/40 to-midnight" />
      <div className="light-leak top-1/4 left-1/4 h-72 w-72 bg-gold/25" />
      <Particles count={14} />
      <Reveal className="relative mx-auto max-w-3xl px-6">
        <p className="eyebrow text-champagne">We manage बेहतर</p>
        <h2 className="mt-4 text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl">Next Beautiful <span className="text-gold-gradient italic">Yaad</span></h2>
        <p className="mx-auto mt-5 max-w-md text-pearl/70">Tell us about your event and let our experts make it unforgettable.</p>
        <div className="mt-9 grid gap-3 sm:flex sm:justify-center sm:gap-4">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-gold shine justify-center">Enquire Now <ArrowRight size={16} /></a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost-light justify-center"><MessageCircle size={16} /> Chat on WhatsApp</a>
        </div>
      </Reveal>
    </section>
  );
}
