import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, GraduationCap, Users, Trophy, Rocket } from "lucide-react";
import confetti from "canvas-confetti";
import { categories, newsItems, events as mockEvents } from "@/data/mockData";
import UpcomingEventsSlider from "@/components/UpcomingEventsSlider";
import CategorySlider from "@/components/CategorySlider";
import { apiClient } from "@/lib/api";

const Index = () => {
  const [eventsList, setEventsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiClient("/events");
        const mapped = data.map((e: any) => ({
          id: String(e.id),
          name: e.name,
          category: e.category?.slug || "",
          description: e.description,
          date: new Date(e.date).toLocaleDateString('en-CA'),
          time: e.time,
          location: e.location,
          fee: e.fee,
          image: e.imageUrl || e.category?.imageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80",
          status: e.status,
          highlights: e.highlights || []
        }));
        setEventsList(mapped);
      } catch (err) {
        console.error("Failed to load events for landing page, falling back to mock data:", err);
        setEventsList(mockEvents);
      }
    };
    fetchEvents();
  }, []);

  const upcomingEvents = eventsList.filter((e) => e.status === "upcoming");

  useEffect(() => {
    // Oscar-style confetti cannon after the text has started appearing
    const timeoutId = setTimeout(() => {
      const duration = 4500;
      const end = Date.now() + duration;
      const colors = ['#ffffff', '#ffccd5', '#d4113e', '#85162f']; // Theme colors

      // Massive central explosion to cover the entire page (lasts ~3s)
      confetti({
        particleCount: 200,
        spread: 360,
        origin: { x: 0.5, y: 0.4 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2,
        startVelocity: 45,
        ticks: 200, // ~3 seconds
        zIndex: 60
      });
      // Left flanking burst
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2,
        startVelocity: 40,
        ticks: 200,
        zIndex: 60
      });
      // Right flanking burst
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2,
        startVelocity: 40,
        ticks: 200,
        zIndex: 60
      });
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[#611224] to-[#2a0810]">

        <style>
          {`
            @keyframes pop-in {
              0% { opacity: 0; transform: scale(0.95) translateY(30px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes light-beam {
              0% { opacity: 0; transform: rotate(-15deg) translateX(-100%); }
              30%, 70% { opacity: 0.15; }
              100% { opacity: 0; transform: rotate(-15deg) translateX(100%); }
            }
          `}
        </style>

        {/* Background Spotlights */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-50">
          <div className="absolute top-0 left-1/4 w-[150%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent origin-top-left" style={{ animation: 'light-beam 6s ease-in-out infinite alternate' }} />
          <div className="absolute top-0 right-1/4 w-[150%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent origin-top-right" style={{ animation: 'light-beam 7s ease-in-out infinite alternate-reverse' }} />
        </div>

        {/* Main Content */}
        <div className="relative z-20 px-4 max-w-5xl mt-10 w-full flex flex-col items-center animate-[pop-in_1.2s_cubic-bezier(0.2,0.8,0.2,1)_forwards]">

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8 w-full text-center md:text-left">
            {/* Logo Container (Left Box) */}
            <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-4 shadow-[0_8px_30px_rgba(255,255,255,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center border border-white/20 transition-transform duration-300 hover:scale-105">
              <img src="/assets/logo.png" alt="PCU Logo" className="w-full h-auto object-contain" />
            </div>

            {/* Title Container (Right Box) */}
            <div className="flex flex-col justify-center">
              <span className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-red-100 tracking-wider uppercase mb-1 drop-shadow-md">
                Welcome to
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-100 via-white to-red-200 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] leading-none tracking-tight">
                PCU Events
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-white/95 mb-10 font-body max-w-2xl text-center font-light leading-relaxed drop-shadow-md">
            Discover, participate, and showcase your talent through exciting university events curated just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/auth?mode=register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:-translate-y-1.5 hover:shadow-[0_8px_35px_rgba(255,255,255,0.35)] w-full sm:w-auto text-lg pointer-events-auto text-center">
              Register Now
            </Link>
            <Link to="/events" className="px-8 py-4 bg-primary/40 text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md w-full sm:w-auto text-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)] pointer-events-auto">
              Explore Events
            </Link>
          </div>
        </div>

        {/* Animated Bottom wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg
            className="relative block w-full h-[60px] md:h-[120px]"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <style>
              {`
                .parallax > use {
                  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
                }
                .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
                .parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
                .parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
                .parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }
                @keyframes move-forever {
                  0% { transform: translate3d(-90px,0,0); }
                  100% { transform: translate3d(85px,0,0); }
                }
              `}
            </style>
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" className="fill-background/30" />
              <use href="#gentle-wave" x="48" y="3" className="fill-background/50" />
              <use href="#gentle-wave" x="48" y="5" className="fill-background/70" />
              <use href="#gentle-wave" x="48" y="7" className="fill-background" />
            </g>
          </svg>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="flex items-center justify-between mb-2 relative z-20">
          <h2 className="text-3xl font-display font-bold text-foreground">Upcoming Events</h2>
          <Link to="/events" className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Events
          </Link>
        </div>
        <p className="text-muted-foreground mb-8 relative z-20">Stay updated with the latest events happening at Pimpri Chinchwad University.</p>

        <div className="-mx-4 sm:mx-0 mt-8 relative z-10">
          <UpcomingEventsSlider events={upcomingEvents} />
        </div>
      </section>

      {/* Why Attend */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground mb-10 text-center">Why Attend PCU Events?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Learn & Grow", desc: "Gain valuable knowledge and skills from expert speakers and workshops." },
              { icon: Users, title: "Connect & Network", desc: "Meet and interact with fellow students, faculty, and industry professionals." },
              { icon: Trophy, title: "Achieve & Celebrate", desc: "Participate in exciting events and showcase your talents." },
              { icon: Rocket, title: "Launch & Share", desc: "Participate in exciting events and showcase your talents." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <div className="p-3 rounded-full bg-maroon-light text-primary shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="relative z-20">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Event Categories</h2>
          <p className="text-muted-foreground mb-8">Browse events by category</p>
        </div>

        <div className="-mx-4 sm:mx-0 mt-8 relative z-10">
          <CategorySlider categories={categories} />
        </div>
      </section>

      {/* News */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-display font-bold text-foreground">Latest News & Highlights</h2>
            <Link to="/current-events" className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
              View All News
            </Link>
          </div>
          <p className="text-muted-foreground mb-8">Stay informed about campus happenings</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((news) => (
              <div key={news.id} className="bg-background rounded-lg overflow-hidden shadow-card">
                <div className="h-40 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary">{news.type}</span>
                  <h3 className="font-display font-bold text-foreground text-sm mt-1 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{news.description}</p>
                  <p className="text-xs text-muted-foreground">{news.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
