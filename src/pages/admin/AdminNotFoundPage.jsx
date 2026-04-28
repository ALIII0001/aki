import { Link } from "react-router-dom";

export default function AdminNotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl leading-none">Page not found</h1>
      <Link to="/admin/dashboard" className="cinema-button mt-8">
        Back to dashboard
      </Link>
    </div>
  );
}

