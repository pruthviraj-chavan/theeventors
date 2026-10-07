import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Continuous preview movement; direct interaction always takes precedence. */
export function useAutoScroll(resetKey: string, enabled: boolean) {
  const row = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = row.current;
    if (!el || !enabled || reducedMotion || paused) return;
    let frame = 0;
    let previous = 0;
    let visible = false;
    let hovering = false;
    let touching = false;
    let resumeAt = 0;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    }, { threshold: 0.15 });
    observer.observe(el);
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") hovering = true; };
    const leave = () => { hovering = false; touching = false; resumeAt = performance.now() + 2000; };
    const down = () => { touching = true; };
    const up = () => { touching = false; resumeAt = performance.now() + 3500; };
    const interact = () => { resumeAt = performance.now() + 3500; };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    el.addEventListener("wheel", interact, { passive: true });
    const tick = (now: number) => {
      const delta = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (visible && !document.hidden && !hovering && !touching && !el.contains(document.activeElement) && now > resumeAt) {
        const first = el.querySelector<HTMLElement>("[data-scroll-item]");
        const duplicate = el.querySelector<HTMLElement>("[data-scroll-copy]");
        if (first && duplicate) {
          const loopWidth = duplicate.offsetLeft - first.offsetLeft;
          if (loopWidth > 0) {
            el.scrollLeft += delta * 0.035;
            if (el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth;
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("wheel", interact);
    };
  }, [resetKey, enabled, paused, reducedMotion]);

  useEffect(() => { if (row.current) row.current.scrollLeft = 0; }, [resetKey]);
  return { row, paused, setPaused, reducedMotion: !!reducedMotion };
}