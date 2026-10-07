import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { categories, images } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Our Events — Weddings, Corporate, Social & Birthdays | Yaadein" },
      { name: "description", content: "Explore Yaadein's wedding, corporate, social and birthday experiences — different occasions, same emotion." },
      { property: "og:title", content: "Our Events | Yaadein" },
      { property: "og:description", content: "Different occasions. Same emotion — Yaadein." },
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
      <PageHero eyebrow="Event Listing" title={<>Our <span className="text-gold-gradient italic">Events</span></>} sub="Different occasions. Same emotion — Yaadein." img={images.sangeet} />
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-5 sm:px-6 md:space-y-28">
          {categories.map((c, i) => (
            <div id={c.name.toLowerCase()} key={c.name} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="group relative overflow-hidden rounded-3xl shadow-soft [perspective:1000px]">
                  <img src={c.img} alt={`${c.name} event by Yaadein`} loading="lazy" className="aspect-[5/4] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
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
                <Link to="/contact" search={{ type: c.name }} className="btn-gold mt-9">Plan a {c.name} <ArrowRight size={16} /></Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
