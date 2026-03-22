import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, IndianRupee, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { events } from "@/data/mockData";

const MyHistory = () => {
  const { user, registeredEvents } = useAuth();
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">My Event History</h1>
          <p className="text-lg text-muted-foreground">Please login to view your event history.</p>
        </div>
        <button onClick={() => setAuthModal("login")} className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors">
          Login
        </button>
        {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={(m) => setAuthModal(m)} />}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">My Event History</h1>
        <p className="text-lg text-muted-foreground">Events you have registered for</p>
      </div>

      {registeredEvents.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
          <Link to="/events" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors inline-block">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents.map((event, i) => {
            const eventDetails = events.find((e) => e.id === event.eventId) || events[0];
            return (
              <div key={i} className="group relative bg-card rounded-2xl p-5 border border-border overflow-hidden transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-primary/30 flex flex-col h-full font-body">
                
                {/* Shine Element overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.7)_50%,transparent_60%)] bg-[length:300%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none z-10 transition-opacity duration-300 mix-blend-overlay" />
                
                {/* Glow Element */}
                <div className="absolute inset-[-10px] bg-[radial-gradient(circle_at_50%_0%,theme(colors.primary.DEFAULT/0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative z-20 flex flex-col h-full">
                  {/* Premium floating Badge */}
                  <div className="absolute top-3 right-3 bg-[#10b981] text-white px-2 py-1 rounded-full text-[0.65em] font-extrabold shadow-md transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-30 flex items-center gap-1 uppercase tracking-wide">
                    <CheckCircle size={10} strokeWidth={3} /> {event.status}
                  </div>

                  {/* Image with scaling effect */}
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-5 relative transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1 group-hover:scale-[1.03]">
                    <img src={eventDetails.image} alt={event.eventName} className="w-full h-full object-cover" />
                    {/* Inner styling overlay like the reference */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_30%),repeating-linear-gradient(45deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_2px,transparent_2px,transparent_4px)] opacity-50" />
                  </div>

                  {/* Text Stack */}
                  <div className="flex flex-col gap-1 mb-5 flex-1">
                    <h3 className="text-[1.15em] font-display font-bold text-foreground m-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">{event.eventName}</h3>
                    <p className="text-[0.8rem] text-muted-foreground m-0 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 line-clamp-2 leading-relaxed">{eventDetails.description}</p>
                  </div>

                  {/* Footer details replicating card__footer structure */}
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-border/50">
                    <div className="text-[1em] font-bold text-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 flex flex-col gap-0.5">
                      <span className="flex items-center gap-1">₹{event.fee} <span className="text-[0.7em] text-muted-foreground font-semibold uppercase tracking-wide">Paid</span></span>
                      <span className="text-[0.65em] font-medium text-muted-foreground group-hover:text-primary/70">{event.date}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-[0_0_0_0_theme(colors.primary.DEFAULT/0.2)] group-hover:shadow-[0_0_0_4px_theme(colors.primary.DEFAULT/0.2)] transform scale-90 group-hover:scale-100 cursor-default">
                      <CheckCircle size={16} className="group-hover:animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyHistory;
