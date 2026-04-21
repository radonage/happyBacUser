import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-xl transition ${
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-white/10"
    }`;

  return (
    <div className="w-64 min-h-screen bg-black/60 border-r border-white/10 p-4 backdrop-blur-xl">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-8">
        🎓 Happy Bac
      </h1>

      {/* NAV */}
      <nav className="flex flex-col gap-2">

        <Link to="/" className={linkClass("/")}>
          🏠 Dashboard
        </Link>

        <Link to="/courses" className={linkClass("/courses")}>
          📘 Courses
        </Link>

        <Link to="/exams" className={linkClass("/exams")}>
          🧪 Exams
        </Link>

        <Link to="/exercises" className={linkClass("/exercises")}>
          🧩 Exercises
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-xs text-gray-500">
        v1.0 SaaS Learning
      </div>
    </div>
  );
}