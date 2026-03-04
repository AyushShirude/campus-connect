import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import logo from "@/assets/pcu-logo.webp";

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

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card shadow-card border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="PCU Logo" className="h-10 w-auto" />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-foreground">PCET's Pimpri Chinchwad University</p>
              <p className="text-xs text-muted-foreground">Learn | Grow | Achieve</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-maroon-light"
                    : "text-foreground hover:text-primary hover:bg-maroon-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Hi, {user.username}</span>
                <button onClick={logout} className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setAuthModal("login")} className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
                  Login
                </button>
                <button onClick={() => setAuthModal("register")} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-accent transition-colors">
                  Register
                </button>
              </>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card px-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3">
              {user ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full py-2 text-sm border border-primary text-primary rounded-md">Logout</button>
              ) : (
                <>
                  <button onClick={() => { setAuthModal("login"); setMobileOpen(false); }} className="flex-1 py-2 text-sm border border-primary text-primary rounded-md">Login</button>
                  <button onClick={() => { setAuthModal("register"); setMobileOpen(false); }} className="flex-1 py-2 text-sm bg-primary text-primary-foreground rounded-md">Register</button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={(mode) => setAuthModal(mode)} />}
    </>
  );
};

export default Navbar;
