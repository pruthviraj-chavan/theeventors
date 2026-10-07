import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "@/assets/eventors-logo-light.png";

export function LogoMark({ size = 56, draw = false }: { size?: number; draw?: boolean }) {
  return <motion.img src={logo} alt="" width={size} height={size} className="object-contain" initial={draw ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} />;
}

/** Luxury intro: shown once per session. */
export function IntroLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("memories-intro")) { setShow(false); return; }
    const t = setTimeout(() => { setShow(false); sessionStorage.setItem("memories-intro", "1"); }, 2300);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div role="status" aria-label="Loading The Eventors" className="bg-night grain fixed inset-0 z-[100] grid place-items-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}>
          <div className="flex flex-col items-center text-pearl">
            <LogoMark size={220} draw />
            <div className="mt-5 overflow-hidden">
              <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} className="font-display text-5xl tracking-wide">The Eventors</motion.p>
            </div>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 1 }} className="bg-gold mt-4 block h-px w-40 origin-left" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="eyebrow mt-4 text-champagne/80">We manage बेहतर</motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LoadingDots({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => <span key={i} className="loading-dot" style={{ animationDelay: `${i * 0.15}s` }} />)}
    </span>
  );
}

export function SuccessCheck() {
  return (
    <svg width="76" height="76" viewBox="0 0 52 52" className="mx-auto" aria-hidden>
      <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#D9A441" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
      <motion.path d="M15 27l7 7 15-16" fill="none" stroke="#F4D58D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
    </svg>
  );
}

export function CardSkeleton({ dark = false, ratio = "aspect-[3/4]" }: { dark?: boolean; ratio?: string }) {
  const s = dark ? "skeleton-dark" : "skeleton";
  return (
    <div aria-hidden className="w-full overflow-hidden rounded-2xl">
      <div className={`${s} ${ratio} w-full`} />
      <div className="space-y-2 py-4">
        <div className={`${s} h-3 w-1/4 rounded-full`} />
        <div className={`${s} h-5 w-3/4 rounded-full`} />
        <div className={`${s} h-3 w-1/2 rounded-full`} />
      </div>
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40"><LogoMark size={30} /></div>
      <h3 className="mt-5 text-3xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/** Briefly shows skeletons whenever `key` changes (filter switches). */
export function useSwitchLoading(key: string, ms = 450) {
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (first) { setFirst(false); return; }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return loading;
}

export function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const on = () => setD(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return d;
}
