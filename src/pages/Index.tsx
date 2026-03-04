import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, GraduationCap, Users, Trophy, Rocket } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import AuthModal from "@/components/AuthModal";
import { categories, events, newsItems } from "@/data/mockData";

const Index = () => {
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[520px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="University Event" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-maroon-overlay" />
        <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4 leading-tight">
            Welcome to<br />PCU Events
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 font-body">
            Discover, participate, and showcase your talent through exciting university events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setAuthModal("register")} className="px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-md hover:bg-primary-foreground/90 transition-colors">
              Register Now
            </button>
            <Link to="/events" className="px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-md hover:bg-primary-foreground/10 transition-colors">
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-display font-bold text-foreground">Upcoming Events</h2>
          <Link to="/events" className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Events
          </Link>
        </div>
        <p className="text-muted-foreground mb-8">Stay updated with the latest events happening at Pimpri Chinchwad University.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-44 overflow-hidden">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">
                  {event.status === "ongoing" ? "ONGOING" : "UPCOMING"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-foreground mb-2">{event.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Calendar size={12} /> {event.date}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin size={12} /> {event.location}
                </div>
                <Link to={`/category/${event.category}`} className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
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
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">Event Categories</h2>
        <p className="text-muted-foreground mb-8">Browse events by category</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="h-36 overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-display font-bold text-foreground text-sm">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-display font-bold text-foreground">Latest News & Highlights</h2>
            <Link to="/past-events" className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
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

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={(m) => setAuthModal(m)} />}
    </div>
  );
};

export default Index;
