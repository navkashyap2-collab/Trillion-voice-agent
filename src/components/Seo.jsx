import { useEffect } from "react";

const SITE_NAME = "Smartdial Solutions";

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
