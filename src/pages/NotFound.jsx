import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <Seo title="Page not found" description="This page doesn't exist." />
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-ink">This page took a wrong turn.</h1>
      <p className="mt-4 text-ink-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-accent mt-8">
        Back to Home
      </Link>
    </div>
  );
}
