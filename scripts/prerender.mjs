// Runs after `vite build`. GitHub Pages serves static files only — the SPA
// sets <title>/description via a useEffect (src/components/Seo.jsx), which
// never runs for crawlers or link-preview bots that don't execute JS. This
// script fixes that by writing a real dist/<route>/index.html for every
// route, with the correct title/description/OG tags already baked in.
// The React app still boots and takes over client-side navigation as normal.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SEO_ROUTES } from "../src/data/seoRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
// TODO: switch to https://smartdialsolutions.com.au once the custom domain is live and DNS is pointed here
const siteUrl = "https://navkashyap2-collab.github.io/Trillion-voice-agent";
const siteName = "Smartdial Solutions";
const ogImage = `${siteUrl}/og-image.png`; // add this file to /public before launch

const shellPath = join(distDir, "index.html");
const shell = readFileSync(shellPath, "utf-8");

function pageHtml(route) {
  const fullTitle = route.path === "/" ? siteName : `${route.title} | ${siteName}`;
  const canonical = `${siteUrl}${route.path === "/" ? "" : route.path}`;

  let html = shell;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${fullTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${route.description}" />`,
  );

  const extraTags = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${ogImage}" />
  </head>`;
  html = html.replace("</head>", extraTags);

  return html;
}

for (const route of SEO_ROUTES) {
  const html = pageHtml(route);
  if (route.path === "/") {
    writeFileSync(shellPath, html);
  } else {
    const outDir = join(distDir, route.path.replace(/^\//, ""));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
  }
}

console.log(`Prerendered ${SEO_ROUTES.length} routes with per-page SEO tags.`);
