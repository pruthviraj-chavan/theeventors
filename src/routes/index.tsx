import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Play, Pause, Heart, Briefcase, PartyPopper, Cake, Sparkles, ClipboardCheck, Users, Gem, Star, X, MapPin, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { categories, films, images, showcase, testimonials, whatsappLink } from "@/lib/data";
import { EventVideo } from "@/components/site/EventVideo";
import { FilmModal, FilmTile } from "@/components/site/FilmGallery";
import { heroFilm } from "@/lib/media";
import { Counter, Particles, Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { CardSkeleton, EmptyState, useIsDesktop, useSwitchLoading } from "@/components/site/Loader";
import { useAutoScroll } from "@/components/site/useAutoScroll";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "The Eventors — We manage बेहतर" },
      { name: "description", content: "Luxury wedding, corporate, social and birthday experiences in Kolkata and across India. Celebrations turned into memories." },
      { property: "og:title", content: "The Eventors — Events & Experiences" },
      { property: "og:description", content: "We manage बेहतर. Wedding, corporate, social and birthday experiences." },
    ],
  }),
  component: Home,
});

const catIcons = { Wedding: Heart, Corporate: Briefcase, Social: PartyPopper, Birthday: Cake };
const ease = [0.2, 0.7, 0.2, 1] as const;
type Film = (typeof films)[number];

function Home() {
  const [film, setFilm] = useState<Film | null>(null);
  return (
    <>
      <Hero onPlay={() => setFilm(films[0] ?? null)} />
      <Stats />
      <Story onPlay={() => setFilm(films[0] ?? null)} />
      <Why />
      <Process />
      <Showcase />
      <Films onOpen={setFilm} />
      <Testimonials />
      <FinalCta />
      <FilmModal film={film} onClose={() => setFilm(null)} />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onPlay }: { onPlay: () => void }) {
  const ref = useRef(null);
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const words = ["The"];
  return (
    <section ref={ref} className="grain relative overflow-hidden bg-midnight text-pearl">
      {/* layer 1: background photo / film */}
      <motion.div style={desktop ? { y: bgY } : {}} className="absolute inset-0 h-[118%]">
        <EventVideo film={heroFilm} priority className="absolute inset-0 h-full w-full" />
      </motion.div>
      {/* layer 2: cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/30 to-midnight md:bg-gradient-to-r md:from-midnight/95 md:via-midnight/55 md:to-midnight/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-midnight via-midnight/80 to-transparent" />
      {/* layer 3: moving light leaks */}
      <div className="light-leak -top-24 -left-24 h-[420px] w-[420px] bg-magenta/35" />
      <div className="light-leak top-1/3 right-[-10%] h-[380px] w-[380px] bg-gold/35" style={{ animationDelay: "-5s" }} />
      <div className="light-leak bottom-10 left-1/3 hidden h-[300px] w-[300px] bg-lavender/25 md:block" style={{ animationDelay: "-9s" }} />
      <Particles count={desktop ? 22 : 10} />

      <motion.div style={desktop ? { y: fgY, opacity: fade } : {}} className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pt-28 pb-10 sm:px-6 md:min-h-0 md:justify-start md:pt-44 md:pb-16">
        <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.32em" }} transition={{ duration: 1.4, delay: 0.3 }} className="eyebrow text-[0.62rem] text-champagne sm:text-[0.7rem]">Wedding · Corporate · Social · Birthday</motion.p>
        <h1 className="mt-5 text-[2.65rem] leading-[0.98] min-[390px]:text-[2.9rem] min-[430px]:text-[3.2rem] sm:text-7xl md:text-8xl">
          <span className="block">
            {words.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pr-[0.22em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.08, ease }}>{w}</motion.span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.9, ease }}>Eventors</motion.span>{" "}
            <motion.span className="text-gold-gradient inline-block pr-2 italic" initial={{ opacity: 0, filter: "blur(14px)", scale: 1.08 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} transition={{ duration: 1.4, delay: 1.1, ease }}></motion.span>
          </span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="font-hindi text-xl text-champagne sm:text-3xl">We manage बेहतर</motion.p>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: 0.8 }} className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-pearl/75">From intimate celebrations to grand occasions, we create experiences that stay in hearts forever.</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }} className="mt-8 grid grid-cols-1 gap-3 min-[430px]:grid-cols-[auto_auto] min-[430px]:justify-start sm:flex">
          <Link to="/events" className="btn-gold shine justify-center">Explore Our Events <ArrowRight size={16} /></Link>
          <button onClick={onPlay} className="btn-ghost-light justify-center"><span className="relative grid h-7 w-7 place-items-center rounded-full bg-pearl text-midnight"><span className="absolute inset-0 animate-ping rounded-full bg-pearl/40" /><Play size={11} fill="currentColor" /></span>Our Story</button>
        </motion.div>
      </motion.div>

      {/* floating category cards — swipe on mobile, grid on desktop */}
      <div className="relative mx-auto max-w-7xl pb-14 md:px-6 md:pb-20">
        <div className="swipe-row scroll-px-5 px-5 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
          {categories.map((c, i) => {
            const I = catIcons[c.name];
            return (
              <motion.div key={c.name} className="w-[68%] min-[430px]:w-[60%] md:w-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2 + i * 0.1, ease }}>
                <div className={desktop ? "animate-float" : ""} style={{ animationDelay: `${i * -1.5}s` }}>
                  <Link to="/events" hash={c.name.toLowerCase()} className="group glass-light block overflow-hidden rounded-2xl p-2 text-foreground shadow-soft transition-transform duration-500 md:hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-xl">
                      <img src={c.img} alt={`${c.name} event`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="bg-gold absolute -bottom-4 left-3 grid h-10 w-10 place-items-center rounded-xl text-midnight shadow-gold"><I size={18} /></span>
                    </div>
                    <div className="flex items-end justify-between gap-2 px-2 pt-6 pb-2">
                      <div className="min-w-0">
                        <h3 className="text-2xl">{c.name}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.desc}</p>
                      </div>
                      <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS (dark → light bridge) ---------------- */
function Stats() {
  const s = [
    { n: 500, suf: "+", l: "Happy Clients" },
    { n: 1000, suf: "+", l: "Events Organised" },
    { n: 4.9, suf: "/5", l: "Client Rating", d: 1 },
    { n: 10, suf: "+", l: "Years of Craft" },
  ];
  return (
    <section className="relative bg-[linear-gradient(180deg,var(--midnight)_50%,var(--ivory)_50%)] px-5 sm:px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-y-6 rounded-3xl border border-gold/20 bg-pearl px-4 py-8 shadow-soft md:grid-cols-4 md:divide-x md:divide-border md:px-6 md:py-12">
          {s.map((x) => (
            <div key={x.l} className="text-center">
              <div className="text-gold-gradient font-display text-[2.6rem] leading-none md:text-6xl"><Counter to={x.n} suffix={x.suf} decimals={x.d ?? 0} /></div>
              <p className="eyebrow mt-2 text-[0.6rem] text-muted-foreground md:text-[0.68rem]">{x.l}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- STORY (bright editorial) ---------------- */
function Story({ onPlay }: { onPlay: () => void }) {
  const desktop = useIsDesktop();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const b = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  return (
    <section ref={ref} className="overflow-hidden bg-ivory py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <p className="eyebrow text-gold">Our Story</p>
          <h2 className="mt-4 text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl">Every celebration has a <span className="text-gold-gradient italic">story.</span></h2>
          <p className="mt-6 max-w-md text-muted-foreground">From the first idea to the final moment, we turn celebrations into memories — with craft, care and an obsession for detail.</p>
          <Link to="/about" className="btn-ghost-dark mt-8">Know Our Story <ArrowRight size={16} /></Link>
        </Reveal>
        <div className="relative h-[400px] sm:h-[520px]">
          <motion.div style={desktop ? { y: a } : {}} className="absolute top-4 left-0 w-[50%] -rotate-6">
            <img src={images.wedding} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-2xl border-4 border-pearl object-cover shadow-soft" />
          </motion.div>
          <motion.div style={desktop ? { y: b } : {}} className="absolute top-0 right-0 w-[46%] rotate-[5deg]">
            <img src={images.corporate} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-2xl border-4 border-pearl object-cover shadow-soft" />
          </motion.div>
          <div className="absolute bottom-0 left-[20%] z-10 w-[58%] rotate-1">
            <img src={images.social} alt="" loading="lazy" className="aspect-[5/4] w-full rounded-2xl border-4 border-pearl object-cover shadow-soft" />
          </div>
          <button onClick={onPlay} aria-label="Play our story film" className="bg-gold absolute top-[46%] left-1/2 z-20 grid h-18 w-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-midnight shadow-gold transition-transform hover:scale-110 md:h-20 md:w-20">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
            <Play fill="currentColor" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY (soft editorial → fades into night) ---------------- */
function Why() {
  const cards = [
    { I: Sparkles, t: "Creative Concepts", d: "Unique themes tailored to your story." },
    { I: ClipboardCheck, t: "End-to-End Care", d: "From first sketch to last guest, handled." },
    { I: Users, t: "Experienced Team", d: "A team that understands your vision." },
    { I: Gem, t: "Memorable Moments", d: "We create memories, not just events." },
  ];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--ivory)_0%,var(--ivory)_70%,var(--midnight)_100%)] pt-8 pb-32 md:pb-44">
      <div className="absolute top-10 -right-32 h-96 w-96 rounded-full bg-lavender/25 blur-[100px]" />
      <div className="absolute top-40 -left-32 h-80 w-80 rounded-full bg-peach/40 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
          <Reveal><SectionHead eyebrow="Why The Eventors" title={<>More than an <span className="text-accent-gradient italic">celebration</span></>} /></Reveal>
          <Reveal delay={0.1}><p className="max-w-md text-muted-foreground">We believe every celebration has a story. Our job is to listen, understand and transform your vision into an unforgettable experience.</p></Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {cards.map(({ I, t, d }, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-gold/15 bg-pearl/80 p-5 shadow-soft transition-all duration-500 md:p-7 md:hover:-translate-y-2">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-colors duration-500 group-hover:bg-gold/35" />
                <span className="font-display absolute top-4 right-5 text-3xl text-gold/25 italic">0{i + 1}</span>
                <span className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:rotate-12"><I size={19} /></span>
                <h3 className="relative mt-5 text-xl leading-tight md:text-2xl">{t}</h3>
                <p className="relative mt-2 text-xs text-muted-foreground md:text-sm">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS (dark cinematic) ---------------- */
function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const p = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    ["Consultation", "We understand your vision"],
    ["Planning", "Ideas, themes and budgeting"],
    ["Design & Setup", "Bringing your dream to life"],
    ["Execution", "Flawless on-ground management"],
    ["The Perfect Yaad", "A celebration you'll always cherish"],
  ];
  return (
    <section ref={ref} className="grain relative -mt-px overflow-hidden bg-midnight pt-8 pb-24 text-pearl md:pb-32">
      <img src={images.lanterns} alt="" loading="lazy" className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-35 lg:block" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/30" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-midnight to-transparent" />
      <div className="light-leak top-1/2 -left-20 h-72 w-72 bg-magenta/20" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <p className="eyebrow text-champagne">Our Process</p>
          <h2 className="mt-3 text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl">From your idea to a beautiful <span className="text-gold-gradient italic">Yaad</span></h2>
        </Reveal>
        <div className="relative mt-14 md:mt-20">
          {/* desktop horizontal line */}
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-pearl/15 md:block" />
          <motion.div style={{ width: p }} className="bg-gold absolute top-6 left-0 hidden h-px md:block" />
          {/* mobile vertical line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-pearl/15 md:hidden" />
          <motion.div style={{ height: p }} className="bg-gold absolute top-0 left-6 w-px md:hidden" />
          <ol className="grid gap-9 md:grid-cols-5 md:gap-8">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <li className="flex gap-5 md:block">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold bg-midnight font-display text-lg text-champagne shadow-gold">0{i + 1}</span>
                  <div className="pt-1 md:pt-0">
                    <h3 className="text-2xl md:mt-6">{t}</h3>
                    <p className="mt-1 text-sm text-pearl/60">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="mt-14"><a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-gold shine">Let's Plan Your Event <ArrowRight size={16} /></a></Reveal>
      </div>
    </section>
  );
}

/* ---------------- EVENTS SHOWCASE (bright, swipeable) ---------------- */
function Showcase() {
  const tabs = ["All", "Wedding", "Corporate", "Social", "Birthday"];
  const [tab, setTab] = useState("All");
  const loading = useSwitchLoading(tab);
  const items = showcase.filter((s) => tab === "All" || s.cat === tab);
  const { row, paused, setPaused, reducedMotion } = useAutoScroll(tab, !loading && items.length > 1);
  const displayItems = items.length > 1 ? [...items, ...items, ...items, ...items] : items;
  const scroll = (dir: number) => row.current?.scrollBy({ left: dir * (row.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,var(--midnight),var(--ivory)_22%)] pt-24 pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><SectionHead eyebrow="Showcase" title={<>Moments we've turned into <span className="text-accent-gradient italic">memories</span></>} /></Reveal>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => { setPaused(true); scroll(-1); }} aria-label="Previous showcase events" title="Previous events" className="h-12 w-12 rounded-full border-border bg-pearl hover:border-gold hover:bg-pearl hover:text-foreground"><ChevronLeft size={18} /></Button>
            {!reducedMotion && items.length > 1 && <Button variant="outline" size="icon" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume showcase scrolling" : "Pause showcase scrolling"} title={paused ? "Resume scrolling" : "Pause scrolling"} className="h-12 w-12 rounded-full border-border bg-pearl hover:border-gold hover:bg-pearl hover:text-foreground">{paused ? <Play size={18} /> : <Pause size={18} />}</Button>}
            <Button variant="outline" size="icon" onClick={() => { setPaused(true); scroll(1); }} aria-label="Next showcase events" title="Next events" className="h-12 w-12 rounded-full border-border bg-pearl hover:border-gold hover:bg-pearl hover:text-foreground"><ChevronRight size={18} /></Button>
          </div>
        </div>
        <div role="tablist" aria-label="Filter events" className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5">
          {tabs.map((t) => (
            <Button variant="outline" role="tab" aria-selected={tab === t} key={t} onClick={() => setTab(t)} className={`min-h-11 shrink-0 rounded-full px-5 text-sm transition-all hover:bg-pearl hover:text-foreground ${tab === t ? "bg-gold text-midnight shadow-gold" : "border border-border bg-pearl/60 hover:border-gold"}`}>{t}</Button>
          ))}
        </div>
      </div>
      <div ref={row} aria-label="Event showcase" className="swipe-row auto-scroll-row relative mt-8 scroll-px-5 px-5 pb-2 md:scroll-px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-[80%] sm:w-[360px]"><CardSkeleton /></div>)
          : displayItems.map((s, i) => (
              <motion.article key={`${s.title}-${i}`} data-scroll-item data-scroll-copy={i === items.length ? "true" : undefined} aria-hidden={i >= items.length ? true : undefined} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: (i % items.length) * 0.05 }} className="group relative w-[80%] overflow-hidden rounded-2xl sm:w-[360px]">
                <img src={s.img} alt={s.title} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/15 to-transparent" />
                <span className="glass-dark eyebrow absolute top-4 left-4 rounded-full px-3 py-1.5 text-[0.6rem] text-champagne">{s.cat}</span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-pearl md:p-6">
                  <h3 className="text-[1.75rem] leading-tight md:text-3xl">{s.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-pearl/70"><MapPin size={12} />{s.loc} · {s.date}</p>
                </div>
              </motion.article>
            ))}
        {!loading && items.length === 0 && <EmptyState title="Coming soon" text="New stories in this category are on their way." />}
      </div>
      <div className="mt-10 px-5 text-center"><Link to="/gallery" className="btn-ghost-dark">View Full Gallery <ArrowRight size={16} /></Link></div>
    </section>
  );
}

/* ---------------- FILM GALLERY (dark, Netflix-like) ---------------- */
function Films({ onOpen }: { onOpen: (f: Film) => void }) {
  const [feat, ...rest] = films;
  if (!feat) return null;
  return (
    <section className="grain relative overflow-hidden bg-[linear-gradient(180deg,var(--ivory),var(--midnight)_14%,var(--navy))] pt-28 pb-24 text-pearl md:pt-40">
      <div className="light-leak top-1/3 -right-20 h-80 w-80 bg-magenta/25" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-champagne">The Eventors Films</p>
            <h2 className="mt-3 text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl">Watch the <span className="text-gold-gradient italic">moments</span></h2>
          </div>
          <p className="max-w-sm text-sm text-pearl/60">A grand welcome. A shared evening. A moment that stays.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-5">
          <Reveal><FilmCard f={feat} big onOpen={onOpen} /></Reveal>
          <div className="swipe-row -mx-5 scroll-px-5 px-5 lg:mx-0 lg:grid lg:grid-rows-5 lg:gap-5 lg:overflow-visible lg:px-0">
            {rest.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.08} className="w-[72%] sm:w-[46%] lg:w-auto"><FilmCard f={f} onOpen={onOpen} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilmCard({ f, big, onOpen }: { f: Film; big?: boolean; onOpen: (f: Film) => void }) {
  return <FilmTile film={f} onOpen={onOpen} className={big ? "aspect-[4/5] sm:aspect-video lg:h-full lg:aspect-auto lg:min-h-[600px]" : "aspect-video lg:h-full lg:min-h-[120px] lg:aspect-auto"} />;
}

/* ---------------- TESTIMONIALS (cinematic glass slate) ---------------- */
function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const visible = useInView(section, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return (
    <section ref={section} className="client-stories group/stories relative overflow-hidden bg-midnight py-20 text-pearl md:py-28" data-paused={paused || !visible ? "true" : "false"}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <img src={images.corporate} alt="" loading="lazy" className="stories-photo h-full w-full object-cover" />
        <div className="absolute inset-0 bg-midnight/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/60" />
        <div className="stories-colour-wash absolute inset-0" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="flex items-start justify-between gap-4">
          <Reveal className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3 text-champagne"><span className="h-px w-8 shrink-0 bg-gold/60" />Client Stories</p>
            <h2 className="mt-5 text-4xl leading-[1.1] sm:text-5xl md:text-6xl">People who found their <span className="italic text-champagne">memories</span> with us</h2>
          </Reveal>
          <Button variant="ghost" size="icon" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume Client Stories animation" : "Pause Client Stories animation"} title={paused ? "Resume animation" : "Pause animation"} className="mt-1 h-11 w-11 shrink-0 rounded-full border border-pearl/20 text-champagne hover:bg-pearl/10 hover:text-pearl motion-reduce:hidden">{paused ? <Play /> : <Pause />}</Button>
        </div>
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.14} className="min-w-0">
              <figure className="stories-card group/card relative flex h-full flex-col overflow-hidden rounded-lg border border-pearl/15 bg-pearl/5 p-7 backdrop-blur-md md:min-h-[330px] md:p-8">
                <Quote className="text-gold/70 transition-transform duration-500 group-hover/card:rotate-6" size={30} />
                <blockquote className="relative mt-5 flex-1 text-base leading-relaxed text-pearl/90 italic md:text-lg">{t.quote}</blockquote>
                <figcaption className="relative mt-9 flex items-center gap-4 border-t border-pearl/15 pt-6">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/15 font-display text-xl text-champagne">
                    {t.name[0]}
                    <span className="absolute -right-1 -bottom-1 grid h-5 w-5 place-items-center rounded-full border-2 border-midnight bg-gold text-midnight"><Star size={9} fill="currentColor" aria-hidden /></span>
                  </span>
                  <span className="min-w-0"><span className="block text-sm font-semibold">{t.name}</span><span className="mt-1 block text-xs text-champagne/80">{t.event}</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
