import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Play, Heart, Briefcase, PartyPopper, Cake, Sparkles, ClipboardCheck, Users, Gem, Star, X, MapPin, Quote } from "lucide-react";
import { categories, images, showcase, testimonials } from "@/lib/data";
import { Counter, Particles, Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yaadein — We don't plan events. We craft yaadein." },
      { name: "description", content: "Luxury wedding, corporate, social and birthday experiences in Pune and across India. Celebrations turned into memories." },
      { property: "og:title", content: "Yaadein — Events & Experiences" },
      { property: "og:description", content: "We don't plan events. We craft yaadein. यादें जो हमेशा रहें." },
    ],
  }),
  component: Home,
});

const catIcons = { Wedding: Heart, Corporate: Briefcase, Social: PartyPopper, Birthday: Cake };

function Home() {
  const [video, setVideo] = useState(false);
  return (
    <>
      <Hero onPlay={() => setVideo(true)} />
      <Stats />
      <Why />
      <Story onPlay={() => setVideo(true)} />
      <Process />
      <Showcase />
      <Testimonials />
      <FinalCta />
      <AnimatePresence>
        {video && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-midnight/90 p-6 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideo(false)}>
            <button aria-label="Close video" className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-pearl/30 text-pearl"><X /></button>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl shadow-soft" onClick={(e) => e.stopPropagation()}>
              <iframe className="h-full w-full" src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" title="Our story" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero({ onPlay }: { onPlay: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const line = { hidden: { opacity: 0, y: 40 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 + i * 0.15, ease: [0.2, 0.7, 0.2, 1] as const } }) };
  return (
    <section ref={ref} className="grain relative overflow-hidden bg-midnight text-pearl">
      <motion.img style={{ y }} src={images.hero} alt="Candlelit floral mandap at a palace wedding" width={1920} height={1088} fetchPriority="high" className="animate-slow-zoom absolute inset-0 h-[115%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-midnight to-transparent" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-magenta/20 blur-[120px]" />
      <Particles />
      <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-16 md:pt-48">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow text-champagne">Wedding · Corporate · Social · Birthday</motion.p>
        <h1 className="mt-6 text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
          <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block">We don't plan events.</motion.span>
          <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
            We craft <span className="text-gold-gradient pr-2 text-[1.35em] italic">yaadein</span>
          </motion.span>
        </h1>
        <motion.p custom={2} variants={line} initial="hidden" animate="show" className="font-hindi mt-3 text-2xl text-champagne md:text-3xl">यादें जो हमेशा रहें</motion.p>
        <motion.p custom={3} variants={line} initial="hidden" animate="show" className="mt-6 max-w-md text-pearl/75">From intimate celebrations to grand occasions, we create experiences that stay in hearts forever.</motion.p>
        <motion.div custom={4} variants={line} initial="hidden" animate="show" className="mt-9 flex flex-wrap gap-4">
          <Link to="/events" className="btn-gold">Explore Our Events <ArrowRight size={16} /></Link>
          <button onClick={onPlay} className="btn-ghost-light"><span className="grid h-7 w-7 place-items-center rounded-full bg-pearl text-midnight"><Play size={12} fill="currentColor" /></span>Watch Our Story</button>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c, i) => {
            const I = catIcons[c.name];
            return (
              <motion.div key={c.name} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 + i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}>
                <Link to="/events" hash={c.name.toLowerCase()} className="group glass-light block overflow-hidden rounded-2xl p-2 text-foreground shadow-soft transition-transform duration-500 hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src={c.img} alt={`${c.name} event`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="bg-gold absolute -bottom-4 left-3 grid h-10 w-10 place-items-center rounded-xl text-midnight shadow-gold"><I size={18} /></span>
                  </div>
                  <div className="flex items-end justify-between gap-2 px-2 pt-6 pb-2">
                    <div>
                      <h3 className="text-2xl">{c.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const s = [
    { n: 500, suf: "+", l: "Happy Clients" },
    { n: 1000, suf: "+", l: "Events Organised" },
    { n: 4.9, suf: "/5", l: "Client Satisfaction", d: 1 },
    { n: 10, suf: "+", l: "Years Experience" },
  ];
  return (
    <section className="relative bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {s.map((x) => (
            <Reveal key={x.l} className="py-4 text-center">
              <div className="font-display text-5xl text-gold-gradient md:text-6xl"><Counter to={x.n} suffix={x.suf} decimals={x.d ?? 0} /></div>
              <p className="eyebrow mt-2 text-muted-foreground">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const cards = [
    { I: Sparkles, t: "Creative Concepts", d: "Unique themes tailored to your story." },
    { I: ClipboardCheck, t: "End-to-End Management", d: "From planning to execution, we handle it all." },
    { I: Users, t: "Experienced Team", d: "A passionate team that understands your vision." },
    { I: Gem, t: "Memorable Experiences", d: "Because we create yaadein, not just events." },
  ];
  return (
    <section className="relative overflow-hidden bg-ivory py-24">
      <div className="absolute top-10 -right-32 h-96 w-96 rounded-full bg-lavender/25 blur-[100px]" />
      <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-peach/40 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <Reveal><SectionHead eyebrow="Why Yaadein" title={<>More than an <span className="text-accent-gradient italic">Event Planner</span></>} /></Reveal>
          <Reveal delay={0.1}><p className="max-w-md text-muted-foreground">We believe every celebration has a story. Our job is to listen, understand and transform your vision into an unforgettable experience.</p></Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ I, t, d }, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="group glass-light relative h-full overflow-hidden rounded-2xl p-7 shadow-soft transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold/0 blur-3xl transition-colors duration-500 group-hover:bg-gold/30" />
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:rotate-12"><I size={20} /></span>
                <h3 className="relative mt-6 text-2xl">{t}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story({ onPlay }: { onPlay: () => void }) {
  return (
    <section className="bg-ivory pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-gold">Our Story</p>
          <h2 className="mt-4 text-5xl leading-[1.02] md:text-7xl">Every celebration has a <span className="text-gold-gradient italic">story.</span></h2>
          <p className="mt-6 max-w-md text-muted-foreground">From the first idea to the final moment, we turn celebrations into memories — with craft, care and an obsession for detail.</p>
          <Link to="/about" className="btn-ghost-dark mt-8">Know Our Story <ArrowRight size={16} /></Link>
        </Reveal>
        <div className="relative h-[520px] [perspective:1200px]">
          {[
            { img: images.wedding, c: "left-0 top-6 w-[48%] -rotate-6" },
            { img: images.corporate, c: "right-4 top-0 w-[46%] rotate-[5deg]" },
            { img: images.social, c: "left-[22%] bottom-0 w-[56%] rotate-1 z-10" },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 60, rotateX: 15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }} className={`absolute ${p.c}`}>
              <img src={p.img} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-2xl border-4 border-pearl object-cover shadow-soft" />
            </motion.div>
          ))}
          <button onClick={onPlay} aria-label="Play our story" className="bg-gold absolute top-1/2 left-1/2 z-20 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-midnight shadow-gold transition-transform hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
            <Play fill="currentColor" />
          </button>
          <p className="animate-float absolute -bottom-6 -left-2 z-20 max-w-[12rem] font-display text-xl text-magenta italic">"Because every celebration deserves to be extra special"</p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 50%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    ["Consultation", "We understand your vision"],
    ["Planning", "Ideas, themes and budgeting"],
    ["Design & Setup", "Bringing your dream to life"],
    ["Execution", "Flawless on-ground management"],
    ["The Perfect Yaad", "A celebration you'll always cherish"],
  ];
  return (
    <section ref={ref} className="bg-night grain relative overflow-hidden py-28 text-pearl">
      <img src={images.lanterns} alt="" loading="lazy" className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-30 lg:block" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow text-champagne">Our Process</p>
          <h2 className="mt-3 text-4xl md:text-6xl">From your idea to a beautiful <span className="text-gold-gradient italic">Yaad</span></h2>
        </Reveal>
        <div className="relative mt-20">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-pearl/15 md:block" />
          <motion.div style={{ width: w }} className="bg-gold absolute top-6 left-0 hidden h-px md:block" />
          <div className="grid gap-10 md:grid-cols-5">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.12}>
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-gold bg-midnight font-display text-lg text-champagne shadow-gold">0{i + 1}</span>
                <h3 className="mt-6 text-2xl">{t}</h3>
                <p className="mt-1 text-sm text-pearl/60">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-16"><Link to="/contact" className="btn-gold">Let's Plan Your Event <ArrowRight size={16} /></Link></Reveal>
      </div>
    </section>
  );
}

function Showcase() {
  const tabs = ["All", "Wedding", "Corporate", "Social", "Birthday"];
  const [tab, setTab] = useState("All");
  const items = showcase.filter((s) => tab === "All" || s.cat === tab);
  return (
    <section className="overflow-hidden bg-ivory py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><SectionHead eyebrow="Showcase" title={<>Moments we've turned into <span className="text-accent-gradient italic">Yaadein</span></>} /></Reveal>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm transition-all ${tab === t ? "bg-gold text-midnight shadow-gold" : "border border-border hover:border-gold"}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 flex snap-x gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <AnimatePresence mode="popLayout">
          {items.map((s) => (
            <motion.article layout key={s.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[380px]">
              <img src={s.img} alt={s.title} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-pearl">
                <span className="eyebrow text-champagne">{s.cat}</span>
                <h3 className="mt-2 text-3xl">{s.title}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-pearl/70"><MapPin size={12} />{s.loc} · {s.date}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-10 text-center"><Link to="/gallery" className="btn-gold">View Full Gallery <ArrowRight size={16} /></Link></div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ivory pb-28">
      <div className="absolute top-0 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-lavender/20 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal><SectionHead eyebrow="Client Stories" title={<>People who found their <span className="text-gold-gradient italic">Yaadein</span> with us</>} /></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="glass-light h-full rounded-2xl p-8 shadow-soft">
                <Quote className="text-gold" size={28} />
                <blockquote className="mt-4 font-display text-2xl leading-snug">"{t.quote}"</blockquote>
                <div className="mt-5 flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" />)}</div>
                <figcaption className="mt-5 border-t border-border pt-5">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.event}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
