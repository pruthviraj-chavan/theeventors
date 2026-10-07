import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playbackSource, type EventFilm } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Loads only nearby footage, chooses one rendition, and pauses offscreen. */
export function EventVideo({ film, priority = false, className = "", controls = true }: { film: EventFilm; priority?: boolean; className?: string; controls?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const manual = useRef<boolean | null>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const rendition = playbackSource(film, video, window.matchMedia("(max-width: 767px)").matches);
    const load = () => { if ((!reduced.matches && !connection?.saveData) || manual.current === true) setSrc(rendition); };
    const play = () => { if (!document.hidden && manual.current !== false && ((!reduced.matches && !connection?.saveData) || manual.current === true)) void video.play().catch(() => setPlaying(false)); };
    const loader = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) load(); }, { rootMargin: priority ? "0px" : "180px" });
    const visibility = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) play(); else video.pause(); }, { threshold: 0.15 });
    const onVisibility = () => { if (document.hidden) video.pause(); else if (video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().top < window.innerHeight) play(); };
    loader.observe(video); visibility.observe(video);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onVisibility);
    return () => { loader.disconnect(); visibility.disconnect(); video.pause(); document.removeEventListener("visibilitychange", onVisibility); reduced.removeEventListener("change", onVisibility); };
  }, [film, priority]);
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (playing) { manual.current = false; video.pause(); }
    else { manual.current = true; setSrc(playbackSource(film, video, window.matchMedia("(max-width: 767px)").matches)); void video.play().catch(() => setPlaying(false)); }
  };
  return (
    <div className={cn("relative overflow-hidden bg-midnight", className)}>
      <img src={film.thumb} alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className="absolute inset-0 h-full w-full object-cover" />
      <video ref={ref} src={failed ? undefined : src} poster={film.thumb} muted loop playsInline autoPlay={Boolean(src)} preload={priority ? "auto" : "none"} onLoadedData={() => setReady(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} aria-label={film.title} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready && !failed ? "opacity-100" : "opacity-0"}`} />
      {controls && !failed && <Button variant="ghost" size="icon" onClick={toggle} title={playing ? "Pause background video" : "Play background video"} aria-label={playing ? "Pause background video" : "Play background video"} className="absolute right-3 bottom-3 z-20 h-11 w-11 rounded-full border border-pearl/30 bg-midnight/70 text-pearl hover:bg-midnight">{playing ? <Pause /> : <Play />}</Button>}
    </div>
  );
}