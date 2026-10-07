import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { images, posts } from "@/lib/data";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FinalCta } from "@/components/site/FinalCta";
import { CardSkeleton, EmptyState, useSwitchLoading } from "@/components/site/Loader";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Blog — Ideas & Inspiration for Your Next Celebration | The Eventors" },
      { name: "description", content: "Wedding themes, event planning tips, corporate event ideas and birthday inspiration from the The Eventors team." },
      { property: "og:title", content: "The Eventors Blog" },
      { property: "og:description", content: "Insights, ideas and inspiration for your next celebration." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.cat)))];
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = posts.filter((p) => (cat === "All" || p.cat === cat) && p.title.toLowerCase().includes(q.toLowerCase()));
  const loading = useSwitchLoading(cat + "|" + q, 400);
  const [feat, ...rest] = list;
  return (
    <>
      <PageHero eyebrow="Our Blog" title={<>Stories & <span className="text-gold-gradient italic">inspiration</span></>} sub="Insights, ideas and inspiration for your next celebration." img={images.lanterns}>
        <label className="glass-dark mt-10 flex max-w-md items-center gap-3 rounded-full px-5 py-3">
          <Search size={16} className="text-champagne" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" aria-label="Search articles" className="w-full bg-transparent text-base text-pearl sm:text-sm outline-none placeholder:text-pearl/40" />
        </label>
      </PageHero>
      <section className="bg-ivory py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div role="tablist" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} role="tab" aria-selected={cat === c} className={`min-h-11 shrink-0 rounded-full px-5 text-sm transition-all ${cat === c ? "bg-gold text-midnight shadow-gold" : "border border-border hover:border-gold"}`}>{c}</button>
            ))}
          </div>
          {loading && <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} ratio="aspect-[16/10]" />)}</div>}
          {!loading && !feat && <EmptyState title="No stories found" text="Try a different word or category." action={<button onClick={() => { setQ(""); setCat("All"); }} className="btn-ghost-dark">Clear filters</button>} />}
          {!loading && feat && (
            <Reveal className="mt-12">
              <article className="group grid overflow-hidden rounded-3xl bg-pearl shadow-soft md:grid-cols-2">
                <img src={feat.img} alt="" loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <span className="eyebrow text-magenta">{feat.cat}</span>
                  <h2 className="mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">{feat.title}</h2>
                  <p className="mt-4 text-muted-foreground">{feat.excerpt}</p>
                  <p className="mt-6 text-xs text-muted-foreground">{feat.date} · {feat.read} read</p>
                </div>
              </article>
            </Reveal>
          )}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {!loading && rest.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="group h-full overflow-hidden rounded-2xl bg-pearl shadow-soft transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="overflow-hidden"><img src={p.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="p-6">
                    <span className="eyebrow text-magenta">{p.cat}</span>
                    <h3 className="mt-2 text-2xl leading-tight">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>{p.date} · {p.read} read</span><ArrowUpRight size={16} className="text-gold" /></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
