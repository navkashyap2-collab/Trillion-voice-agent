import { useEffect, useRef, useState } from "react";

// Tracks whether an element is on-screen, so continuously-animating content
// (like a WebGL canvas) can pause its render loop once scrolled out of view
// instead of burning CPU/GPU in the background for the rest of the session.
export function useInView(rootMargin = "200px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
