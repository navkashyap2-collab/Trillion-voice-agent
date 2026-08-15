import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export default function Marquee({ items, speed = 32 }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6">
        {items.map((item) => (
          <span key={item} className="text-sm font-medium text-ink-muted">
            {item}
          </span>
        ))}
      </div>
    );
  }

  const track = [...items, ...items];

  return (
    <div className="group relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
