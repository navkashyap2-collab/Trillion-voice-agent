const PATHS = {
  phone: "M6.6 10.8c1.4 2.9 3.7 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1l-2.2 2.2z",
  calendar: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4|M9 14l2 2 4-4",
  target: "circle:12,12,8|circle:12,12,4|dot:12,12",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z|M9 12l2 2 4-4",
  chart: "M4 20V10M11 20V4M18 20v-7M3 20h18",
  users: "circle:9,8,3|M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6|M16 6.5a3 3 0 010 5.9M21 20c0-2.6-1.9-4.8-4.5-5.7",
  check: "M5 13l4 4L19 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  mail: "M4 5h16v14H4zM4 6l8 7 8-7",
  clock: "circle:12,12,9|M12 7v5l3.5 2",
  building: "M4 21V4h9v17M13 21V9h7v12M8 8h1M8 12h1M8 16h1",
  home: "M4 11l8-7 8 7M6 10v10h12V10",
  medical: "circle:12,12,9|M12 8v8M8 12h8",
  bag: "M6 8h12l1 13H5zM9 8V6a3 3 0 016 0v2",
  child: "circle:12,7,3|M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  compass: "circle:12,12,9|M14.5 9.5l-2 5-5 2 2-5z",
};

function renderPart(part, i) {
  if (part.startsWith("circle:")) {
    const [cx, cy, r] = part.slice(7).split(",");
    return <circle key={i} cx={cx} cy={cy} r={r} />;
  }
  if (part.startsWith("dot:")) {
    const [cx, cy] = part.slice(4).split(",");
    return <circle key={i} cx={cx} cy={cy} r="0.6" fill="currentColor" stroke="none" />;
  }
  return <path key={i} d={part} strokeLinecap="round" strokeLinejoin="round" />;
}

export default function Icon({ name, className = "h-6 w-6" }) {
  const spec = PATHS[name] ?? PATHS.spark;
  const parts = spec.split("|");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      {parts.map(renderPart)}
    </svg>
  );
}

export function IconBadge({ name, className = "" }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/15 to-teal/10 text-accent-strong ${className}`}
    >
      <Icon name={name} />
    </div>
  );
}
