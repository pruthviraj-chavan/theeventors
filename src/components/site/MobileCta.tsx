import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/data";

export function MobileCta() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 420);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const visible = show && path !== "/contact";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed inset-x-3 bottom-3 z-40 flex gap-2 pb-[env(safe-area-inset-bottom)] md:hidden">
          <Link to="/contact" className="btn-gold flex-1 justify-center !py-3.5">Enquire Now <ArrowRight size={16} /></Link>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="glass-dark grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full text-champagne"><MessageCircle size={20} /></a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
