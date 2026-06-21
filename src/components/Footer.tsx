import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed to newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="gradient-maroon text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="relative overflow-hidden rounded-full bg-white p-1 shadow-sm border border-gray-100">
                <img src="/assets/logo.png" alt="PCU Logo" className="h-10 w-auto relative z-10" />
              </div>
              <div className="leading-tight">
                <p className="text-lg font-bold text-white tracking-wide transition-colors">PCU Events</p>
                <p className="text-[10px] text-white/80 font-medium tracking-widest uppercase">Learn • Grow</p>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Discover, participate, and celebrate. The official campus event hub for Pimpri Chinchwad University students and faculty.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Events", path: "/events" },
                { label: "Categories", path: "/categories" },
                { label: "Current Events", path: "/current-events" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+91 20 2098 69845</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>info@pcuevents.edu.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Pimpri Chinchwad University, Pune, Maharashtra</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm opacity-80 mb-3">Stay updated with the latest events and news.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 w-[1%] px-3 py-2 rounded-md text-sm bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-foreground/40"
              />
              <button type="submit" className="px-4 py-2 bg-primary-foreground text-primary text-sm font-medium rounded-md hover:bg-primary-foreground/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex justify-end">
          <div className="text-sm opacity-60">
            © 2026 Pimpri Chinchwad University. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
