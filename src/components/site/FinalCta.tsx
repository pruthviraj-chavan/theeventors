import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { images, whatsappLink } from "@/lib/data";
import { Particles, Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-midnight py-32 text-center text-pearl">
      <img src={images.lanterns} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/40 to-midnight" />
      <Particles count={14} />
      <Reveal className="relative mx-auto max-w-3xl px-6">
        <p className="eyebrow text-champagne">Let's create your</p>
        <h2 className="mt-4 text-5xl md:text-7xl">Next Beautiful <span className="text-gold-gradient italic">Yaad</span></h2>
        <p className="mx-auto mt-5 max-w-md text-pearl/70">Tell us about your event and let our experts make it unforgettable.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-gold">Enquire Now <ArrowRight size={16} /></Link>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost-light"><MessageCircle size={16} /> Chat on WhatsApp</a>
        </div>
      </Reveal>
    </section>
  );
}
