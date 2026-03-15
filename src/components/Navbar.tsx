import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import { useTheme } from "./ThemeProvider";
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Categories", path: "/categories" },
  { label: "Past Events", path: "/past-events" },
  { label: "My History", path: "/my-history" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Floating Dock Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-gray-700/50 rounded-full p-2 flex items-center justify-between w-full max-w-7xl transition-all duration-300">
          
          {/* Logo Section (Left Pill) */}
          <Link to="/" className="flex items-center gap-3 px-4 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors group">
            <div className="relative overflow-hidden rounded-full bg-white dark:bg-gray-800 p-1 shadow-sm border border-gray-100 dark:border-gray-700">
              <img src="/assets/logo.png" alt="PCU Logo" className="h-9 w-auto relative z-10" />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold text-gray-900 dark:text-white tracking-wide transition-colors group-hover:text-primary">PCU Events</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase">Learn • Grow</p>
            </div>
          </Link>

          {/* Navigation Links (Middle Pill) */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100/60 dark:bg-gray-800/40 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full ${location.pathname === link.path
                  ? "bg-white dark:bg-gray-700 text-primary shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section (Theme Circle & Action Pills) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle (Circle) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all bg-gray-100/80 dark:bg-gray-800/80 rounded-full border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100/80 dark:bg-gray-800/80 px-5 py-2.5 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                  Hi, {user.username}
                </span>
                <button onClick={logout} className="px-6 py-2.5 text-sm font-bold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Login Button (Pill) */}
                <button onClick={() => setAuthModal("login")} className="px-6 py-2.5 text-sm font-bold bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md">
                  Login
                </button>
                {/* Register Button (Pill) */}
                <button onClick={() => setAuthModal("register")} className="px-6 py-2.5 text-sm font-bold bg-primary text-white border border-primary/20 transition-all duration-300 rounded-full hover:bg-primary/90 hover:shadow-[0_4px_15px_rgba(220,38,38,0.4)] hover:-translate-y-0.5">
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2 pr-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-x-0 top-24 z-40 px-4 transition-all duration-300 ease-in-out lg:hidden ${mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-5 py-3.5 text-sm font-bold transition-all duration-200 rounded-2xl ${location.pathname === link.path
                ? "bg-primary/10 text-primary"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full py-3.5 text-sm font-bold bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl hover:bg-red-100 transition-colors">Logout</button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => { setAuthModal("login"); setMobileOpen(false); }} className="flex-1 py-3.5 text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl hover:bg-gray-200 transition-colors">Login</button>
                <button onClick={() => { setAuthModal("register"); setMobileOpen(false); }} className="flex-1 py-3.5 text-sm font-bold bg-primary text-white rounded-2xl shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:bg-primary/90 transition-colors">Register</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={(mode) => setAuthModal(mode)} />}
    </>
  );
};

export default Navbar;
