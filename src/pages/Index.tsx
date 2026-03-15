import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, GraduationCap, Users, Trophy, Rocket } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { categories, events, newsItems } from "@/data/mockData";
import UpcomingEventsSlider from "@/components/UpcomingEventsSlider";
import CategorySlider from "@/components/CategorySlider";

const Index = () => {
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const upcomingEvents = events.filter((e) => e.status === "upcoming");

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[#611224] to-[#2a0810]">

        {/* Animated Background SVGs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-overlay">
          <svg className="absolute w-[800px] h-[800px] -top-32 -left-32 animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18.1,97.7,-3.1C97.4,11.9,90.2,26.4,80.8,40.1C71.3,53.8,59.6,66.6,45.3,74.5C31.1,82.4,14.3,85.4,-1.8,88.4C-17.9,91.4,-35.8,94.4,-50.1,87.6C-64.4,80.8,-75.1,64.2,-83.4,47.4C-91.8,30.6,-97.8,13.6,-96.2,-2.1C-94.6,-17.8,-85.4,-32.4,-74.6,-44C-63.8,-55.6,-51.4,-64.2,-38.3,-72C-25.2,-79.8,-11.4,-86.8,1.9,-89.4C15.2,-92,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute w-[600px] h-[600px] top-1/2 -right-32 animate-[spin_40s_linear_infinite_reverse]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M39.6,-65.4C51.6,-55.6,61.9,-43.3,69.5,-29.3C77.1,-15.3,82,0.4,79.5,14.7C77,29,67.1,41.9,55.1,51.8C43.1,61.7,29,68.6,14.2,72C-0.6,75.4,-16.1,75.3,-30.2,69.8C-44.3,64.3,-57,53.4,-66.6,40.1C-76.2,26.8,-82.7,11.1,-81.9,-4C-81.1,-19.1,-73,-33.6,-62.1,-44.6C-51.2,-55.6,-37.5,-63.1,-23.9,-68.8C-10.3,-74.5,3.2,-78.4,15.9,-76.3C28.6,-74.2,40.5,-66.1,39.6,-65.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute w-[500px] h-[500px] -bottom-48 left-1/4 animate-[spin_50s_linear_infinite]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M47.7,-68.5C61.4,-60.7,71.8,-46.8,78.2,-31.4C84.7,-16,87.2,1,83.5,16.5C79.8,32,69.9,46,57.1,55.7C44.3,65.4,28.6,70.8,12.7,73.4C-3.2,76,-19.3,75.8,-33.1,69.2C-46.9,62.6,-58.4,49.6,-66.4,35C-74.4,20.4,-78.9,4.2,-76.2,-10.9C-73.5,-26,-63.6,-40,-50.8,-48.5C-38,-57,-22.3,-60,-7.1,-60C8.1,-60,24.3,-57,47.7,-68.5Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Floating Particles/Stars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute top-[35%] right-[20%] w-3 h-3 rounded-full bg-white/30 shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-pulse delay-75" />
          <div className="absolute bottom-1/4 left-[30%] w-2 h-2 rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse delay-150" />
          <div className="absolute top-1/2 right-[35%] w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,1)] animate-pulse delay-300" />
          <div className="absolute bottom-[10%] right-[10%] w-2.5 h-2.5 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse delay-500" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up mt-10">

          <h1 className="text-5xl md:text-[5rem] lg:text-[6rem] font-display font-extrabold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
            Welcome to <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-100 via-white to-red-200 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">PCU Events</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-12 font-body max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Discover, participate, and showcase your talent through exciting university events curated just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button onClick={() => setAuthModal("register")} className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:-translate-y-1.5 hover:shadow-[0_8px_35px_rgba(255,255,255,0.35)] w-full sm:w-auto text-lg">
              Register Now
            </button>
            <Link to="/events" className="px-8 py-4 bg-primary/40 text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md w-full sm:w-auto text-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              Explore Events
            </Link>
          </div>
        </div>

        {/* Bottom wave separator for smooth transition to main content */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.22,200.5,112.5,241.6,107.56,282.51,89.5,321.39,56.44Z" className="fill-background"></path>
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
