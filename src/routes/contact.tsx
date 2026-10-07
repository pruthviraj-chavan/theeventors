import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, Zap, MessageSquare, Package, AlertCircle } from "lucide-react";
import { CONTACT, images, whatsappLink } from "@/lib/data";
import { Particles, Reveal } from "@/components/site/Reveal";
import { LoadingDots, SuccessCheck } from "@/components/site/Loader";
import { AnimatePresence, motion } from "motion/react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { type?: string } => (typeof s['type'] === "string" ? { type: s['type'] as string } : {}),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact The Eventors — Let's Create Your Next Yaad" },
      { name: "description", content: "Enquire about your wedding, corporate, social or birthday event. Free consultation, quick response within 24 hours." },
      { property: "og:title", content: "Contact The Eventors" },
      { property: "og:description", content: "Tell us about your event and let our experts make it unforgettable." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{8,16}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  type: z.string(),
  date: z.string().optional(),
  guests: z.string().max(10).optional(),
  message: z.string().trim().max(1000).optional(),
});

const field = "w-full rounded-xl border border-pearl/15 bg-pearl/5 px-4 py-3.5 text-base text-pearl outline-none transition focus:border-gold sm:text-sm placeholder:text-pearl/35";

function Contact() {
  const { type } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      setSummary("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setSummary("");
    const d = r.data;
    const msg = `Hi The Eventors! Enquiry:\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nEvent: ${d.type}\nDate: ${d.date || "-"}\nGuests: ${d.guests || "-"}\n${d.message || ""}`;
    setBusy(true);
    const w = window.open("", "_blank");
    setTimeout(() => {
      if (w) w.location.href = whatsappLink(msg);
      else window.location.href = whatsappLink(msg);
      setBusy(false);
      setDone(true);
    }, 900);
  };

  return (
    <>
    <PageHero eyebrow="Contact The Eventors" title={<>Your next <span className="text-gold-gradient italic">celebration</span></>} sub="Every beautiful memory begins with a conversation." img={images.hero} />
    <section className="bg-night grain relative overflow-hidden pt-12 pb-24 text-pearl md:pt-16">
      <img src={images.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 to-midnight" />
      <Particles count={10} />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="eyebrow text-champagne">Contact</p>
           <h2 className="mt-4 text-[2.7rem] leading-[1.02] sm:text-6xl">Let's create your <span className="text-gold-gradient italic">Next Yaad</span></h2>
          <p className="mt-5 max-w-md text-pearl/70">Tell us about your event and let our experts make it unforgettable.</p>
          <ul className="mt-8 space-y-5">
            {[
              { I: Phone, l: "WhatsApp us", v: CONTACT.phone, h: whatsappLink() },
              { I: Mail, l: "Email us", v: CONTACT.email, h: `mailto:${CONTACT.email}` },
              { I: MapPin, l: "Visit us", v: CONTACT.city },
            ].map(({ I, l, v, h }) => (
              <li key={l} className="flex items-center gap-4">
                <span className="bg-gold grid h-12 w-12 place-items-center rounded-full text-midnight"><I size={18} /></span>
                <div><p className="text-xs text-pearl/50">{l}</p>{h ? <a href={h} className="text-lg hover:text-champagne">{v}</a> : <p className="text-lg">{v}</p>}</div>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
            {[[Zap, "Quick Response", "Within 24 hours"], [MessageSquare, "Free Consultation", "Talk to our experts"], [Package, "Custom Packages", "Tailored to budget"]].map(([I, t, d]) => {
              const Icon = I as typeof Zap;
              return (
                <div key={t as string} className="glass-dark rounded-2xl p-3 sm:p-4"><Icon size={18} className="text-champagne" /><p className="mt-3 text-xs font-semibold sm:text-sm">{t as string}</p><p className="hidden text-xs text-pearl/50 sm:block">{d as string}</p></div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass-dark rounded-3xl p-5 shadow-soft sm:p-8">
            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-14 text-center">
                <SuccessCheck />
                <h2 className="mt-5 text-4xl">Thank you!</h2>
                <p className="mt-3 text-pearl/70">Your enquiry is ready in WhatsApp — send it and we'll reply within 24 hours.</p>
                <button onClick={() => setDone(false)} className="btn-ghost-light mt-8">Send another enquiry</button>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
                <h2 className="text-3xl sm:col-span-2">Enquire about your event</h2>
                <AnimatePresence>{summary && (
                  <motion.p role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-pearl sm:col-span-2"><AlertCircle size={16} className="text-magenta" />{summary}</motion.p>
                )}</AnimatePresence>
                {[
                  { n: "name", l: "Your name *", t: "text" },
                  { n: "phone", l: "Phone number *", t: "tel" },
                  { n: "email", l: "Email address *", t: "email" },
                ].map((f) => (
                  <label key={f.n} className="text-xs text-pearl/60">{f.l}
                    <input name={f.n} type={f.t} autoComplete={f.n === "name" ? "name" : f.n === "phone" ? "tel" : "email"} aria-invalid={!!errors[f.n]} className={`${field} mt-1.5 ${errors[f.n] ? "!border-magenta" : ""}`} />
                    {errors[f.n] && <span className="mt-1 block text-magenta">{errors[f.n]}</span>}
                  </label>
                ))}
                <label className="text-xs text-pearl/60">Event type
                  <select name="type" defaultValue={type ?? "Wedding"} className={`${field} mt-1.5 [&>option]:bg-navy`}>
                    {["Wedding", "Corporate", "Social", "Birthday", "Other"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <label className="text-xs text-pearl/60">Event date<input name="date" type="date" className={`${field} mt-1.5 [color-scheme:dark]`} /></label>
                <label className="text-xs text-pearl/60">Expected guests<input name="guests" type="number" min={1} className={`${field} mt-1.5`} /></label>
                <label className="text-xs text-pearl/60 sm:col-span-2">Your message<textarea name="message" rows={4} placeholder="Tell us about your event, ideas, requirements…" className={`${field} mt-1.5 resize-none`} /></label>
                <button disabled={busy} aria-busy={busy} className="btn-gold min-h-13 justify-center disabled:opacity-80 sm:col-span-2">{busy ? <><LoadingDots label="Sending" /> Sending your enquiry</> : <>Send Enquiry <Send size={16} /></>}</button>
                <p className="text-center text-xs text-pearl/45 sm:col-span-2">Your enquiry opens in WhatsApp so you can send it instantly.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}
