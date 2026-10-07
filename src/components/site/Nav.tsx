import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blogs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-pearl">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <path d="M16 4c3 4 3 8 0 12-3-4-3-8 0-12Zm0 12c4-2 8-1 11 2-4 2-8 1-11-2Zm0 0c-4-2-8-1-11 2 4 2 8 1 11-2Zm0 0v12" fill="none" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" />
        <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#F4D58D" /><stop offset="1" stopColor="#D9A441" /></linearGradient></defs>
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.6rem]">Yaadein</span>
        <span className="block text-[0.55rem] tracking-[0.3em] text-champagne/80 uppercase">Events & Experiences</span>
      </span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-5"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 sm:px-5 transition-all duration-500 ${scrolled ? "glass-dark mx-3 py-2 shadow-soft md:mx-auto" : "py-2"}`}>
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }} className="text-sm text-pearl/75 transition-colors hover:text-champagne" activeProps={{ className: "!text-champagne" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">Plan Your Event <ArrowRight size={16} /></Link>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-pearl/25 text-pearl lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="bg-night grain fixed inset-0 z-[60] flex flex-col p-6" initial={{ clipPath: "circle(0% at 95% 4%)" }} animate={{ clipPath: "circle(150% at 95% 4%)" }} exit={{ clipPath: "circle(0% at 95% 4%)" }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}>
            <div className="flex items-center justify-between">
              <Logo />
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-pearl/25 text-pearl"><X size={18} /></button>
            </div>
            <div className="light-leak -right-20 top-1/3 h-72 w-72 bg-magenta/30" />
            <nav aria-label="Mobile" className="relative mt-14 flex flex-col">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
                  <Link to={l.to} onClick={() => setOpen(false)} activeOptions={{ exact: l.to === "/" }} activeProps={{ className: "!text-champagne" }} className="flex items-baseline gap-4 border-b border-pearl/10 py-3.5 font-display text-[2.6rem] leading-none text-pearl"><span className="font-sans text-xs text-champagne/60">0{i + 1}</span>{l.label}</Link>
                </motion.div>
              ))}
            </nav>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold relative mt-auto justify-center">Plan Your Event <ArrowRight size={16} /></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
