import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Target, HeartHandshake, Users } from "lucide-react";
import { images } from "@/lib/data";
import { PageHero, SectionHead } from "@/components/site/PageHero";
import { Counter, Reveal } from "@/components/site/Reveal";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Yaadein — Turning Moments into Memories" },
      { name: "description", content: "Meet Yaadein: a passionate team crafting weddings, corporate and social experiences with heart, creativity and flawless execution." },
      { property: "og:title", content: "About Yaadein" },
      { property: "og:description", content: "Events aren't just occasions — they're emotions, connections and memories." },
    ],
  }),
  component: About,
});

function About() {
  const pillars = [
    { I: Eye, t: "Our Vision", d: "To create timeless experiences that families and teams remember for decades." },
    { I: Target, t: "Our Mission", d: "To deliver flawless events with heart — on time, on budget, beyond expectation." },
    { I: HeartHandshake, t: "Our Values", d: "Creativity, trust and excellence in every flower, light and minute." },
    { I: Users, t: "Our Team", d: "Designers, planners and producers who treat your story like their own." },
  ];
  return (
    <>
      <PageHero eyebrow="About Yaadein" title={<>Turning moments into <span className="text-gold-gradient italic">Yaadein</span></>} sub="At Yaadein, we believe events are not just occasions — they are emotions, connections and memories that stay with you forever." img={images.wedding} />
      <section className="bg-ivory py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal>
            <img src={images.team} alt="Yaadein team styling a banquet" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHead eyebrow="Who we are" title={<>A decade of <span className="text-accent-gradient italic">celebrations</span></>} />
            <p className="mt-6 text-muted-foreground">Yaadein began in Pune with a simple belief: the best events aren't the biggest — they're the ones that feel the most like you. Ten years and over a thousand celebrations later, that belief still shapes every mandap we build and every stage we light.</p>
            <p className="mt-4 text-muted-foreground">We listen first, design second, and execute with obsessive care — so you can be fully present in the moment.</p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[[500, "+", "Happy clients"], [1000, "+", "Events"], [10, "+", "Years"]].map(([n, s, l]) => (
                <div key={l as string}><div className="font-display text-4xl text-gold-gradient"><Counter to={n as number} suffix={s as string} /></div><p className="text-xs text-muted-foreground">{l}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-night grain relative py-24 text-pearl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ I, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="glass-dark h-full rounded-2xl p-7">
                  <I className="text-champagne" />
                  <h3 className="mt-5 text-2xl">{t}</h3>
                  <p className="mt-2 text-sm text-pearl/60">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20 text-center">
            <h2 className="text-4xl md:text-6xl">Every event has a story.<br /><span className="text-gold-gradient italic">Let's craft yours.</span></h2>
            <Link to="/contact" className="btn-gold mt-8">Plan Your Event <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
