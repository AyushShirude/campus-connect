import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-background via-background/90 to-primary/5">
      <div className="relative w-full max-w-lg text-center p-8 md:p-12 rounded-3xl bg-card border border-border/80 shadow-2xl overflow-hidden group">

        {/* Glow Element */}
        <div className="absolute inset-[-10px] bg-[radial-gradient(circle_at_50%_0%,theme(colors.primary.DEFAULT/0.12)_0%,transparent_60%)] opacity-100 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Icon Container */}
          <div className="mb-6 p-4 bg-primary/10 text-primary rounded-full animate-bounce">
            <AlertCircle size={48} strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h1 className="text-7xl md:text-8xl font-display font-extrabold text-foreground mb-4 tracking-tighter drop-shadow-md">
            404
          </h1>

          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Page Not Found
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-sm mb-10 leading-relaxed">
            The page you are looking for doesn't exist or has been moved to a new address.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home size={16} />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
