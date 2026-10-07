import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Linkedin, Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "./Nav";
import { CONTACT, whatsappLink } from "@/lib/data";
import { useState } from "react";

export function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="bg-night grain relative overflow-hidden text-pearl/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">We don't just plan events. We craft yaadein that stay forever.</p>
          <p className="font-hindi mt-2 text-champagne/80">यादें जो हमेशा रहें</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube, Linkedin].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-pearl/15 transition hover:border-gold hover:text-champagne"><I size={15} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow text-champagne">Explore</h4>
          <ul className="mt-5 space-y-2.5 text-sm">
            {([["/", "Home"], ["/about", "About"], ["/events", "Events"], ["/gallery", "Gallery"], ["/blog", "Blogs"], ["/contact", "Contact"]] as const).map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-champagne">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-champagne">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-2"><Phone size={15} className="mt-0.5 text-gold" />{CONTACT.phone}</li>
            <li className="flex gap-2"><Mail size={15} className="mt-0.5 text-gold" />{CONTACT.email}</li>
            <li className="flex gap-2"><MapPin size={15} className="mt-0.5 text-gold" />{CONTACT.city}</li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-champagne hover:underline"><MessageCircle size={15} />Chat on WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-champagne">Newsletter</h4>
          <p className="mt-5 text-sm">Stories, ideas and offers — occasionally.</p>
          {sent ? (
            <p className="mt-4 text-sm text-champagne">Thank you — welcome to the family.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-4 flex rounded-full border border-pearl/15 p-1">
              <input required type="email" placeholder="Your email" aria-label="Email" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-pearl outline-none placeholder:text-pearl/40" />
              <button aria-label="Subscribe" className="bg-gold grid h-9 w-9 place-items-center rounded-full text-midnight"><ArrowRight size={15} /></button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-pearl/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs sm:flex-row">
          <span>© 2026 Yaadein Events & Experiences. All rights reserved.</span>
          <span>Crafted with love for beautiful yaadein.</span>
        </div>
      </div>
    </footer>
  );
}
