import { Image, LayoutDashboard, LogOut, Palette, Settings, Text, Video } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/projects", label: "Projects / Work", icon: Video },
  { to: "/admin/media", label: "Media Library", icon: Image },
  { to: "/admin/content", label: "Website Text", icon: Text },
  { to: "/admin/theme", label: "Theme", icon: Palette },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { addToast } = useToast();

  async function handleLogout() {
    await logout();
    addToast("Logged out");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#070707] text-ivory">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-black/40 p-5 backdrop-blur-xl lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Admin</p>
            <h1 className="mt-3 font-serif text-3xl leading-none">Ali Khan Films</h1>
            <p className="mt-3 text-sm text-zinc-400">{user?.email}</p>
          </div>

          <nav className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-white/[0.08] text-ivory"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        <main className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

