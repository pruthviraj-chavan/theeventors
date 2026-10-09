import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Download } from "lucide-react";
import { categories, images, whatsappLink } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FinalCta } from "@/components/site/FinalCta";
import { FilmGallery } from "@/components/site/FilmGallery";
import { videoLibrary } from "@/lib/media";
import { eventGuides } from "@/lib/realMedia";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Events — Weddings, Corporate, Social & Birthdays | The Eventors" },
      { name: "description", content: "Explore The Eventors's wedding, corporate, social and birthday experiences — different occasions, same emotion." },
      { property: "og:title", content: "Our Events | The Eventors" },
      { property: "og:description", content: "Different occasions. Same emotion — The Eventors." },
    ],
  }),
  component: Events,
});

const extras: Record<string, string[]> = {
  Wedding: ["Mandap & décor design", "Sangeet & mehendi", "Destination weddings", "Guest hospitality"],
  Corporate: ["Conferences & summits", "Award nights & galas", "Product launches", "Team offsites"],
  Social: ["Anniversaries", "Engagements", "Baby showers", "Private soirées"],
  Birthday: ["Kids' theme parties", "Milestone birthdays", "Surprise celebrations", "Entertainment & cakes"],
};

function Events() {
  return (
    <>
      <PageHero eyebrow="Event Listing" title={<>Our <span className="text-gold-gradient italic">Events</span></>} sub="Different occasions. Same emotion — The Eventors." img={images.sangeet} />
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-5 sm:px-6 md:space-y-28">
          {categories.map((c, i) => (
            <div id={c.name.toLowerCase()} key={c.name} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="group relative overflow-hidden rounded-3xl shadow-soft [perspective:1000px]">
                  <img src={c.img} alt={`${c.name} event by The Eventors`} loading="lazy" className="aspect-[5/4] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <span className="glass-dark eyebrow absolute top-5 left-5 rounded-full px-4 py-2 text-champagne">0{i + 1} / 04</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow text-gold">{c.name} Events</p>
                <h2 className="mt-3 text-[2.2rem] leading-[1.05] sm:text-5xl md:text-6xl">{c.desc}</h2>
                <p className="mt-5 max-w-md text-muted-foreground">{c.long}</p>
                <ul className="mt-7 grid gap-3 text-sm min-[390px]:grid-cols-2">
                  {(extras[c.name] ?? []).map((e) => <li key={e} className="flex items-center gap-2"><Check size={15} className="text-gold" />{e}</li>)}
                </ul>
                <a href={whatsappLink(`Hi The Eventors! I would like to enquire about a ${c.name} event.`)} target="_blank" rel="noreferrer" className="btn-gold mt-9">Plan a {c.name} <ArrowRight size={16} /></a>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <section className="overflow-hidden bg-midnight py-16 text-pearl md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-10 max-w-3xl"><p className="eyebrow text-gold">Event inspiration library</p><h2 className="mt-3 text-4xl leading-tight sm:text-5xl md:text-6xl">Explore our <span className="italic text-gold">experience guides</span></h2><p className="mt-5 max-w-2xl text-sm leading-relaxed text-pearl/65 sm:text-base">Open the original The Eventors lookbooks for décor, pool events, cocktails and menu inspiration.</p></Reveal>
          <div className="swipe-row pb-4 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible">
            {eventGuides.map((guide, index) => (
              <Reveal key={guide.title} delay={index * 0.08} className="w-[82%] min-[430px]:w-[72%] md:w-auto">
                <article className="group overflow-hidden rounded-lg border border-pearl/15 bg-navy">
                  <a href={guide.href} target="_blank" rel="noreferrer" className="relative block overflow-hidden" aria-label={`Open ${guide.title}`}>
                    <img src={guide.cover} alt={`${guide.title} cover`} loading="lazy" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />
                    <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-pearl/35 bg-midnight/45 text-pearl backdrop-blur transition-transform group-hover:-translate-y-1"><BookOpen size={18} /></span>
                  </a>
                  <div className="p-5"><p className="eyebrow text-champagne">{guide.eyebrow}</p><h3 className="mt-2 text-2xl">{guide.title}</h3><p className="mt-3 min-h-16 text-sm leading-relaxed text-pearl/60">{guide.description}</p><a href={guide.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-champagne transition-colors hover:text-gold">View PDF <Download size={15} /></a></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FilmGallery variant="events" films={[videoLibrary.entrance, videoLibrary.courtyard, videoLibrary.dandiya, videoLibrary.estate]} />
      <FinalCta />
    </>
  );
}
